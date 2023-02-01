<template>
    <div>
        <TableTools       
            :buttonVisible="buttonVisible"
            :deleteApi="deleteApi"
            :tableName="tableName"              
            @getTable="getTable"
            @getSearchTable="getSearchTable"    
            @newDialog="newVisible=true"   
            @editDialog="editDialog"         
        ></TableTools>
        <Table
            :tableData="tableData" 
            :columnData="columnData"
            :pageData="pageData"
            :loading.sync="loading"
            @getTable="getTable"
        ></Table> 
        <el-dialog
            title="Confirmation"
            :visible.sync="newVisible"
        >
            <span>You will jump to pipeline page to create pipeline!</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newVisible = false">Cancel</el-button>
                <el-button type="primary" @click="$router.push({name: 'Pipeline'})">OK</el-button>
            </span>
        </el-dialog>  
    </div>
</template>

<script>
import TableTools from "@/components/table/TableTools"
import Table from "@/components/table/Table"
import { getFlow, searchFlow } from "@/request/console"

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
            },
            //删除表格所选行的接口地址
            deleteApi: '/flow/deleteFlow',
            //表格名字
            tableName: 'Flow',
            //表格数据
            tableData: [],
            //表格列属性
            columnData: [
                {
                    label: "Flow ID",
                    prop: "pipelineId",
                },
                {
                    label: "Flow Name",
                    prop: "pipelineName",
                },
                {
                    label: "Flow Details",
                    prop: "pipelineStep",
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
            //新增对话框是否可见
            newVisible: false,
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
        * 新增表格数据
        * 
        */
        newDialog() {

        },
        /**
        * 编辑表格数据
        * 
        */
        editDialog() {

        },
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
            getFlow(data).then((res) => {
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
            searchFlow({
                currentPage: this.pageData.currentPage,
                pageCount: this.pageData.pageCount,
                content: content
            }).then((res) => {               
                if (res.success) {
                    this.tableData = res.data.list
                    this.pageData.total = Number(res.data.total)
                    this.loading = false
                } else {
                    this.$message.error(res.message)
                }
            })
        },
    },
}
</script>