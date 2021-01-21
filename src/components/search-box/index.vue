<template>
  <div class="search-box">
    <div class="left-form">
      <el-form :model="searchForm" inline  label-width="100px">
        <el-form-item v-for="(item, index) in searchFactors" :key="index" :label="item.name+':'">
          <template v-if="item.type==='input'">
            <el-input v-model="searchForm[item.key]" :placeholder="'请输入' + item.name" size="small"></el-input>
          </template>
          <template v-if="item.type==='dataTime'">
            <div v-if="item.pickerType">
              <el-date-picker v-model="searchForm[item.key]" :type="item.pickerType || 'datetime'" placeholder="选择日期" 
                             size="small"></el-date-picker>
            </div>
            <div v-else>
              <el-date-picker v-model="searchForm.createTime" :type="item.pickerType || 'datetime'" placeholder="选择日期" :picker-options="pickerBeginDateBefore"
                              value-format="yyyy-MM-dd HH:mm:ss" size="small"></el-date-picker>
              -
              <el-date-picker v-model="searchForm.updateTime" :type="item.pickerType || 'datetime'" placeholder="选择日期" :picker-options="pickerBeginDateAfter"
                              value-format="yyyy-MM-dd HH:mm:ss" size="small"></el-date-picker>
            </div>
          </template>
          <template v-if="item.type==='multiSelect'">
            <div class="MultiSelect">
              <span v-for="(_item, _index) in item.options"
                    :key="_index"
                    :class="{'active': searchForm[item.key].includes(_item.value) === true}"
                    @click="chooseOptions(item.key, _item)">{{ _item.label }}</span>
            </div>
          </template>
          <template v-if="item.type==='select'">
            <el-select v-model="searchForm[item.key]" clearable size="small">
              <el-option v-for="(_item, _index) in item.options" :key="_index" :label="_item.label" :value="_item.value"></el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="right-handle">
      <el-button type="primary" size="small" @click="search">查找</el-button>
      <el-button type="primary" size="small" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    searchFactors: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchForm: {},
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.searchForm.stopTime;
          if (beginDateVal) {
            return time.getTime() > new Date(beginDateVal).getTime();
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.searchForm.beginTime;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime() ;
          }
        }
      },
    }
  },
  computed: {
  },
  created() {
    this.searchFactors.forEach(item => {
      if (item.type === 'multiSelect') {
        // this.searchForm[item.key] = []
        this.$set(this.searchForm, item.key, ['-1'])
      }
    })
  },
  watch: {
    searchForm(value) {
    }
  },
  methods: {
    chooseOptions(key, item) {
      if (this.searchForm[key].includes(item.value)) {
        if (item.value == '-1') {
          this.searchForm[key] = []
        }
        this.searchForm[key].splice(this.searchForm[key].indexOf(item.value), 1)
      } else {
        if (item.value === '-1') {
          this.searchForm[key] = ['-1']
        }
        if (this.searchForm[key].includes('-1')) {
          this.searchForm[key].splice(this.searchForm[key].indexOf('-1'), 1)
        }
        this.searchForm[key].push(item.value)
      }
    },
    search() {
      const form = {...this.searchForm}
      this.searchFactors.forEach(item => {
        if (item.type === 'multiSelect') {
          if(form[item.key].includes('-1')) {
            delete form[item.key]
          } else {
            form[item.key] = form[item.key].join(',')
          }
        }
      })
      this.$emit('searchChange', form)
      // this.loadData()
    },
    reset() {
      this.searchForm = {}
      this.searchFactors.forEach(item => {
        if (item.type === 'multiSelect') {
          // this.searchForm[item.key] = []
          this.$set(this.searchForm, item.key, [])
        }
      })
      this.$emit('searchChange', {})
      // this.loadData()
    },
    isActive(key, item) {
      if (!this.searchForm[key]){
        this.searchForm[key] = ['0']
      }
      return this.searchForm[key].includes(item.vlaue)
    }
  }
}
</script>

<style lang="scss">
.search-box{
  .MultiSelect{
    span+span{
      margin-left: 6px;
    }
    span{
      padding: 4px 10px;
      cursor: pointer;
      color: #666;
      &:hover{
        color: #409EFF
      }
      &.active{
        // color: #409EFF;
        background: #409EFF;
        color: #fff;
        border-radius: 4px;
      }
    }
  }
}
</style>

