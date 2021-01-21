<template>
  <div class="pagination" v-if="pagination.total > 0">
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"
                     :current-page="page.current" :page-size="pagination.size" :page-sizes="pageAllSize"
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import { constants } from 'crypto';
export default {
  name: 'Pagination',
  props: {
    pageAllSize: {
      type: Array,
      default: () => [10, 20, 40, 60, 80, 100],
      required: false
    },
    loadDataMethod: {
      type: Function,
      required: true
    },
    page: {
      type: Object,
      default: () => {
        return {
          current: 1,
          size: 10
        }
      }
    }
  },
  data() {
    return {
      pagination: {}
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    handleCurrentChange(page) {
      this.page.current = page
      this.$emit('update:page',this.page)
      this.loadData()
    },
    handleSizeChange(pageSize) {
      this.page.size = pageSize
      this.page.current = 1
      this.$emit('update:page',this.page)
      this.loadData()
    },
    async loadData() {
      const data = await this.loadDataMethod(this.page.current, this.page.size)
      if (data) {
        this.pagination = {
          total: +data.totalElements,
          size: +data.size
        }
      }
      
    }

  }
}
</script>


<style lang="scss">
.pagination{
  margin-top: 20px;
  text-align: right
}
</style>
