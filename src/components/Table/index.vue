<template>
  <el-table
        ref="Table"
        :data="tableData"
        class="Avie_table_normal"
        :show-header="ShowHeader"
        :height="Height"
        :header-cell-style="HeaderStyle"
        border
        style="width: 100%;"
    >
        <el-table-column
            type="selection"
            width="50px"
            align="center"
        ></el-table-column>
        <Tcolumn
          v-for="(el,index) in tableHead"
          :key="index"
          v-bind="{...el}"
          v-on="$listeners"
        >
        <div slot-scope="scope" v-if="el.slotName">
          <slot :name="el.slotName" v-bind="scope"></slot>
        </div>
        </Tcolumn>
    </el-table>
</template>

<script>
import Tcolumn from './column'
export default {
  components: {
    Tcolumn
  },
  props: {
    HeaderStyle: {
      type: [Function,Object],
      default: () => () => true
    },
    tableData: {
      type: Array,
      default: () => []
    },
    tableHead: {
      type: Array,
      default: () => []
    },
    SelectionSwitch: {
      type: Boolean,
      default: false
    },
    ShowHeader: {
      type: Boolean,
      default: true
    },
    Height: {
      type: String,
      default: "100%"
    },
    allSelection: {
      type: Boolean,
      default: false
    },
    ClassificationIndex: {
      type: Number,
      default: 0
    },
    IndexSwitch: {
      type: Boolean,
      default: false
    },
    selectableMethod: {
      type: Function,
      default: () => () => true
    },
    showOption: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    console.log(this.tableHead)
  }
}
</script>