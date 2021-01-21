<template>
  <div>
    <Ttable slot="table" :tableHead="tableHeads" :tableData="tableData" @EventHandler="EventHandler" >
      <template slot-scope="scope" slot="time">
        <span>{{scope.row.startTime}}</span>
      </template>
    </Ttable>
  </div>
</template>

<script>
import Ttable from '@/components/Table'
export default {
  components: {
    Ttable
  },
  data () {
    return {
      tableHeads: [
          {
              prop: 'projectName',
              label: '项目名称',
              formatter ({projectName}) {
                  const arr = ['a', 'dsf']
                  return arr[projectName]
              }
          },
          {
              prop: 'name',
              label: '姓名',
              editable: true,
              editCellFramwork: 'Input'
          },
          {
              prop: 'name1',
              label: '姓名',
              editable: true,
              editCellFramwork: 'Number'
          },
          {
            label: '类型',
            prop: 'type',
            editable: true,
            editCellFramwork: 'Select',
            editCellParams: () => {
              return {
                options: [
                  {
                    label: '1',
                    value: '1'
                  },
                  {
                    label: '2',
                    value: '2'
                  }
                ]
              }
            }
          },
          {
            label: '类型1',
            prop: 'type1',
            editable: true,
            editCellFramwork: 'Cascader',
            editCellParams: () => {
              return {
                options: [
                  {
                    label: '1',
                    value: '1',
                    children: [
                      {
                        label: '1-1',
                        value: '1-1'
                      }
                    ]
                  },
                  {
                    label: '2',
                    value: '2'
                  }
                ]
              }
            }
          },
          {
              width: '180',
              prop: 'startTime',
              label: '开始时间',
              slotName: 'time'
          },
          {
              width: '180',
              prop: 'endTime',
              label: '结束时间',
              editable: true,
              editCellFramwork: 'Time'
          },
      ],
      tableData: [
          {
              projectName: '1',
              name: 'sdf',
              name1: 2,
              type: '1',
              type1: '2',
              startTime: '2008-09-10',
              endTime: '2008-09-10'
          }
      ]
    }
  },
  methods: {
    EventHandler (type, prop, value) {
      console.log(type, prop, value)
      console.log(this.tableData)
    }
  }
}
</script>

