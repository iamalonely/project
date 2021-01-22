<template>
  <el-table-column
    :label="label"
    :prop="prop"
    :width="width"
    :fixed="fixed"
    :formatter="formatter ? formatter : null"
    :align="align">
      <template slot-scope="scope"  >
        <template v-if="!slotName">
          <template v-if="editable">
            <render :renderFnc="renderFnc($createElement, scope)" v-if="renderFnc" />
            <component :is="Components[componentFrame]"
              v-else
              v-model="scope.row[prop]" @change="change($event, scope)"
              @EventHandler="EventHandler" v-bind="{...cellParasm, prop}" />
          </template>
          <p v-else>{{formatter ? formatter(scope.row) : scope.row[prop]}}</p>
        </template>
        <slot v-bind="scope" v-else></slot>
        
      </template>
    </el-table-column>
</template>

<script>
import * as Components from '@/components/BaseComponents'
import render from './render'
import Render from './render.vue'
export default {
  name: 'Column',
  components: {
    render
  },
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    },
    editable: {
      type: Boolean,
      default: false
    },
    editCellFramwork: {
      type: [String, Function]
    },
    editCellParams: {
      type: [Object, Function]
    },
    width: {
      type: String
    },
    fixed: {
      type: String
    },
    formatter: {
      type: Function
    },
    align: {
      type: String,
      default: 'left'
    },
    slotName: {
      type:String
    }
  },
  data () {
    return {
      Components,
      value: '',
      isRedner: false,
      renderFnc: null
    }
  },
  computed: {
    componentFrame () {
      console.log(this.editCellFramwork)
      let componentFrame
      if ( typeof(this.editCellFramwork) === 'string') {
        this.isRedner = false
        componentFrame = this.editCellFramwork
      }
      if (typeof(this.editCellFramwork) === 'function') {
        this.isRedner = true
        console.log(this.$scopedSlots.default, this.$createElement, 'scopedSlots')
        this.renderFnc = (h, scope) => {
          return this.editCellFramwork(h, scope)
        }
      }
      console.log(componentFrame)
      return componentFrame
    },
    cellParasm () {
      let cellParasm
      if (typeof(this.editCellParams) === 'object'){
        cellParasm = this.editCellParams
      }
      if (typeof(this.editCellParams) === 'function') {
        cellParasm = this.editCellParams()
      }
      console.log(cellParasm)
      return cellParasm
    }
  },
  created () {
    console.log(Components)
  },
  methods: {
    EventHandler (type, prop, value) {
      console.log(type, value)
      this.$emit('EventHandler', type, prop, value)
    },
    change (a, b) {
      console.log('change---event')
      console.log(a, b)
    }
  }
}
</script>
