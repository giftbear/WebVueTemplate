<template>
<el-container>
    <el-header>Header</el-header>
    <el-container>
        <el-aside width="200px"></el-aside>
        <el-main>
            <TableTools
                :buttonVisible="buttonVisible"
                :deleteApi="deleteApi"
                :tableName="tableName"
                :columnData="columnData"               
                @getTable="getTable"
                @getSearchTable="getSearchTable"                
            ></TableTools>
            <Table 
                :tableData="tableData" 
                :columnData="columnData"
                :pageData="pageData"
                :loading.sync="loading"
                @getTable="getTable"
            ></Table>                   
        </el-main>    
    </el-container>
</el-container>
</template>

<script>
import TableTools from "@/components/table/TableTools"
import Table from "@/components/table/Table"
import { getTaskData, searchTask } from "@/request/table"

export default {
    data() {
        return {
            //表格工具
            buttonVisible: {
                newButton: true,
                importButton: false,
                editButton: true,
                deleteButton: true,
                searchButton: true,
                exportButton: true,
                arrangeButton: true,
            },
            //删除表格所选行的接口地址
            deleteApi: '/table/deleteTask',
            //表格名字
            tableName: 'Task',
            //表格数据
            tableData: [],
            //表格列属性
            columnData: [
                {
                    label: "Task ID",
                    prop: "taskId",
                },
                {
                    label: "Task Name",
                    prop: "taskName",
                },
                {
                    label: "Task File",
                    prop: "taskFile",
                },
                {
                    label: "Task Flow",
                    prop: "taskFlow",
                },
                {
                    label: "Task Status",
                    prop: "taskStatus",
                },
                {
                    label: "Task Run Status",
                    prop: "taskRunStatus",
                },
                {
                    label: "Task Begain Time",
                    prop: "taskBegainTime",
                },
                {
                    label: "Task End Time",
                    prop: "taskEndTime",
                },
                {
                    label: "Task Result",
                    prop: "taskResultUrl",
                },
            ],
            //分页数据
            pageData: {
                currentPage: 1,
                pageCount: 20,
                total: 0
            },
            //表格加载状态
            loading: true,
        }
    },
    components: {
        TableTools,
        Table,    
    },
    created() {
        this.getTable()
    },
    methods: {
        /**
        * 获取表格数据
        * 
        */
        getTable() {
            this.loading = true
            let data = {
                currentPage: this.pageData.currentPage,
                pageCount: this.pageData.pageCount
            }
            getTaskData(data).then((res) => {
                if (res.success) {
                    this.tableData = res.data.list
                    this.pageData.total = Number(res.data.total)
                    this.loading = false
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /**
         * 获取搜索后表格数据
         * @param {string} content 搜索内容
         */
        getSearchTable(content) {
            this.loading = true
            searchTask({
                currentPage: this.pageData.currentPage,
                pageCount: this.pageData.pageCount,
                content: content
            }).then((res) => {
                this.loading = false
                if (res.success) {
                    this.tableData = res.data.map((item) => {
                        return {
                            ...item,
                            highlightFields: item.highLight.taskName[0]
                        }
                    })
                    this.pageData.total = res.data.totalHits
                } else {
                    this.$message.error(res.message)
                }
            })
        },
    },
}
</script>

<style>
/*滚动条样式*/
::-webkit-scrollbar {
    width: 8px; 
    height: 8px;
}
::-webkit-scrollbar-thumb {
    background-color: #409EFF;
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    background-color: #ecf5ff;
    border-radius: 10px;         
}
</style>