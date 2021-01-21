<template>
    <div class="back-home">
        <defaultDetail :tabList="tabList">
            <Formbox title="栏目标题一" slot="formbox1" :ItemList="itemList" :formData.sync="formData" @EventHandler="EventHandler" inline />
            <Formbox title="栏目标题一" slot="formbox2" :ItemList="itemList" :formData.sync="formData" @EventHandler="EventHandler" controlType='see' />
            <Formbox title="栏目标题一" slot="formbox3" :ItemList="itemList" :formData.sync="formData" @EventHandler="EventHandler" type-class="searchbox" />
            <tableForm slot="Table" v-bind="{...tableParams}" >
                <div slot="header" slot-scope="slotProps">
                    <span class="theme-color">总数：{{slotProps.data.total}}</span>
                </div>
            </tableForm>
            <avie-step slot="step" :active="active" :data="steps"></avie-step>
            <Ttable slot="table" :tableHead="tableParams.tableHeads" :tableData="tableData" />
        </defaultDetail>
        <el-dialog title="新增" :visible.sync="visible" :close-on-click-modal="false" >
            <defaultDetail :tabList="tabList" type-class="dialog">
                <Formbox title="栏目标题一" slot="formbox1" :ItemList="itemList" :formData.sync="formData" @EventHandler="EventHandler" inline controlType='see' />
                <Formbox title="栏目标题一" slot="formbox2" :ItemList="itemList" :formData.sync="formData" @EventHandler="EventHandler" />
                <Formbox title="栏目标题一" slot="formbox3" :ItemList="itemList" :formData.sync="formData" @EventHandler="EventHandler" type-class="searchbox" />
                <tableForm slot="Table" v-bind="{...tableParams}" >
                    <div slot="header">
                        slot自定义
                    </div>
                </tableForm>
                <avie-step slot="step" :active="active" :data="steps"></avie-step>
            </defaultDetail>
            <div class="footer" slot="footer">
                <el-button type="primary" size="small">确定</el-button>
                <el-button  size="small">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import Formbox from '@/components/Formbox'
import defaultDetail from '@/components/DefaultDetail'
import tableForm from '@/components/TableForm'
import avieStep from '@/components/Avie-step'
import Ttable from '@/components/table/table'
export default {
    components: {
        Formbox,
        defaultDetail,
        tableForm,
        avieStep,
        Ttable
    },
    data() {
        return {
            tabList: [
                {
                    name: '表单',
                    type: 'formbox1',
                    show: true,
                },
                {
                    name: '表单2',
                    type: 'formbox2',
                    show: true,
                },
                {
                    name: '表单3',
                    type: 'formbox3',
                    show: true,
                },
                {
                    name: 'Table',
                    type: 'Table',
                    show: true,
                },
                {
                    name: 'avie-step',
                    type: 'step',
                    show: true,
                },
                {
                    name: 'table',
                    type: 'table',
                    show: true,
                }
            ],
            visible: false,
            themeStyle: '',
            value: 0,
            itemList: [
                {
                    type: 'Txt',
                    label: '项目名称',
                    prop: 'a'
                },
                {
                    type: 'Input',
                    label: '项目名称',
                    prop: 'b'
                },
                {
                    type: 'Button',
                    label: '项目名称',
                    buttonName: '添加',
                    prop: 'show'
                },
                {
                    type: 'ButtonShow',
                    label: '项目名称',
                    buttonName: '添加人员',
                    prop: 'add',
                    disabled: false,
                    prop: 'people',
                    defaultProps: {
                        label: 'name',
                        value: 'id'
                    }
                },
                {
                    type: 'Cascader',
                    label: '项目名称',
                    prop: 'e',
                    options: [
                        {
                            label: 'sd',
                            value: 'd',
                            children: [
                                {
                                    label: 'd',
                                    value: 'sdfsd',
                                    children: null
                                }
                            ]
                        },
                        {
                            label: 'sd',
                            value: 'sd',
                            children: [
                                {
                                    label: 'd',
                                    value: 'ssdfsd',
                                    children: null
                                }
                            ]
                        }
                    ],
                },
                {
                    type: 'CheckBox',
                    label: '项目名称',
                    options: [
                        {
                            label: '复选框选我',
                            value: 'd'
                        },
                        {
                            label: '复选框选我1',
                            value: 'd1'
                        },
                        {
                            label: '复选框选我2',
                            value: 'd2'
                        }
                    ],
                    prop: 'f'
                },
                {
                    type: 'Date',
                    label: '项目名称',
                    prop: 'g'
                },
                {
                    type: 'Number',
                    label: '项目名称',
                    prop: 'h'
                },
                {
                    type: 'Radio',
                    label: '项目名称',
                    prop: 'i',
                    options: [
                        {
                            label: 'd',
                            value: 'd'
                        },
                        {
                            label: 'd1',
                            value: 'd1'
                        }
                    ],
                },
                {
                    type: 'Select',
                    label: '项目名称',
                    prop: 'j',
                    options: [
                        {
                            label: '选我',
                            value: 'd'
                        },
                        {
                            label: '选我1',
                            value: 'd1'
                        }
                    ],
                },
                {
                    type: 'Textarea',
                    label: '项目名称',
                    prop: 'k'
                },
                // {
                //     type: 'Time',
                //     label: '项目名称',
                //     prop: 'l'
                // },
                {
                    type: 'TimeGroup',
                    label: '项目名称',
                    prop: 'm'
                },
                {
                    type: 'TimePicker',
                    label: '项目名称',
                    prop: 'n'
                }
            ],
            formData: {
                a: 'd',
                b: 'dsf',
                e: 'd,sdfsd',
                f: 'd,d1',
                g: '2020-05-27',
                j: 'd',
                k: 'sdfjsldfjsldfjsldfkj',
                m: ['2020-5-28','2020-5-30'],
                n: '05:33:33',
                people: [{name: 'sdf',id: 'dsf'},{name: 'sdf1',id: 'ds2f'}]
            },
            tableParams: {
                searchList: [
                    {
                        type: 'Input',
                        label: '项目名称',
                        prop: 'projectName'
                    },
                    {
                        type: 'Select',
                        label: '项目名称',
                        prop: 'j',
                        options: [
                            {
                                label: 'd',
                                value: 'd'
                            },
                            {
                                label: 'd1',
                                value: 'd1'
                            }
                        ],
                    },
                    {
                        type: 'TimeGroup',
                        label: '项目名称',
                        prop: 'm'
                    },
                ],
                options: [
                    {
                        name: '新增',
                        type: 'add',
                        method: ({searchData}) => {
                            this.addFormData = {
                                contents: '',
                                isStatus: 0,
                                title: ''
                            }
                            if (this.type == '1' && !this.currentCommunity.id) {
                                this.$message('请先选择需要添加话题的社区')
                                return
                            } 
                            this.fileList = []
                            this.photoList = []
                            this.isAdd = true
                            this.visible = true
                        },
                        showCondition: true
                    },
                    {
                        name: '删除',
                        type: 'delete',
                        method: ({selection}) => {
                            console.log(selection)
                            if (selection.length < 1) {
                                this.$message('请选择需要删除的数据')
                                return
                            }
                            let ids = selection.map(item => item.id).join(',')
                            this.deleteTableData(ids)
                        },
                        showCondition: true
                    },
                    {
                        name: '发布',
                        type: 'publish',
                        method: ({selection, searchData}) => {
                            console.log(selection,searchData)
                        }
                    },
                    {
                        name: '下载',
                        type: 'donwload',
                        method: ({selection}) => {

                        }
                    },
                    {
                        name: '提交审核',
                        type: 'submit',
                        method: ({selection}) => {

                        }
                    },
                    {
                        name: '提交审核',
                        icon: '',
                        method: ({selection}) => {

                        }
                    }
                ],
                tableMethed: [
                    {
                        name: '查看',
                        method: (row) => {
                            if (this.type == '2') {
                                this.$router.push('/CommunityManage/KnowledgeQADetail?type=2&communityOpicId='+row.id)
                            } else {
                                this.$router.push('/CommunityManage/KnowledgeQADetail?communityOpicId='+row.id)
                            }
                        },
                        showCondition: true
                    },
                    {
                        name: '修改',
                        method: (row) => {
                            console.log(row, row.enclosure)
                            for (let i in this.addFormData) {
                                this.addFormData[i] = row[i]
                            }
                            this.fileList = row.enclosure && typeof(row.enclosure) == 'string' ? JSON.parse(row.enclosure) : []
                            this.photoList = row.photo ? row.photo.split(',').map(item => {
                                return {
                                    name: item,
                                    url: item
                                }
                            }) : []
                            this.visible = true
                            this.isAdd = false
                        },
                        showCondition: true
                    },
                    {
                        name: '置顶',
                        method: (row) => {
                            const params = {
                                isTop: 1,
                                id: row.id,
                            }
                            this.Popups('提示', '确定要置顶该话题').then(res => {
                                if (res == 'confirm') {
                                    this.saveOrEditeOpic(params)
                                }
                            })
                            
                        },
                        showCondition: true
                    },
                    {
                        name: '热门',
                        method: (row) => {
                            const params = {
                                id: row.id,
                                isFire: 1
                            }
                            this.Popups('提示', '确定要热门该话题').then(res => {
                                if (res == 'confirm') {
                                    this.saveOrEditeOpic(params) 
                                }
                            })
                            

                        },
                        showCondition: true
                    },
                    {
                        name: '删除',
                        method: (row) => {
                            this.deleteTableData(row.id)
                        },
                        showCondition: true
                    }
                ],
                loadDataUrl: {
                    api: 'Login',
                    url: 'list'
                },
                tableHeadName: this.type == '1' ? 'KnowledgeCommunityManagementHead' : 'KnowledgeQAManagementHead',
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
                        slot: 'name',
                        editCellFramwork: 'input'
                    },
                    {
                        width: '180',
                        prop: 'startTime',
                        label: '开始时间'
                    },
                    {
                        width: '180',
                        prop: 'endTime',
                        label: '结束时间'
                    },
                ]
            },
            active: 2,
            steps: ['步骤1', '步骤2', '步骤3'],
            tableData: [
                {
                    projectName: '1',
                    name: 'sdf',
                    startTime: '2008-09-10',
                    endTime: '2008-09-10'
                }
            ]
        }
    },
    created() {
        console.log(this)
        const form = new FormData()
        form.append('pageSize', 100)
        this.Login.getlist(form).then(res => {
            console.log(res)
        })
    //   this.Login.login({username: 'admin'}).then(res => {
    //       console.log(res)
    //   })
    },
    methods: {
        EventHandler(type,prop) {
            if (type == 'click' && prop == 'show') {
                console.log(this.formData, 'aa')
            }
        },
        change(val) {
            console.log(val)
            this.$store.commit('setItem', {key: 'themeStyle', val: val})
            this.changeColor('teal')
        },
        changeColor(color = 'teal') {
            document.documentElement.style.setProperty("$--color-primary",color);
        },
        ClearInfo() {
            console.log(this.formData,'ClearInfo')
        },
        InquireInfo(v) {
            console.log(v,'InquireInfo')
        }
    }
}
</script>

<style lang="scss">
.back-home{
    height: 100%;
    display:flex;
    flex-direction: column;
}
</style>


