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
                @newDialog="newVisible = true"   
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
                title="New Task" 
                :visible.sync="newVisible"
                width="580px"
                @close="closeNew"
            >
                <el-form
                    :model="newform"
                    :rules="formRules"
                    ref="newForm"
                    size="mini"
                    label-position="top"
                >
                    <el-form-item label="Task ID" prop="taskId">
                        <el-input v-model="newform.taskId"></el-input>
                    </el-form-item>
                    <el-form-item label="Task Name" prop="taskName">
                        <el-input v-model="newform.taskName"></el-input>
                    </el-form-item>
                    <el-form-item label="Task File" prop="taskFile">
                        <el-select v-model="taskFileList.name" placeholder="Please select file">
                            <el-option v-for="item in taskFileList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="Task Flow" prop="taskFlow">
                        <el-select v-model="taskFlowList.name" placeholder="Please select flow">
                            <el-option v-for="item in taskFlowList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
			        <el-button @click="closeNew">Cancel</el-button>
			        <el-button type="primary" @click="submitForm('newForm')">OK</el-button>
		        </div>
            </el-dialog>  
            <el-dialog 
                title="Edit Task" 
                :visible.sync="editVisible"
                width="580px"
                @close="closeEdit"
            >
                <el-form
                    :model="editform"
                    :rules="formRules"
                    ref="editForm"
                    size="mini"
                    label-position="top"
                >
                    <el-form-item label="Task ID" prop="taskId">
                        <el-input v-model="editform.taskId"></el-input>
                    </el-form-item>
                    <el-form-item label="Task Name" prop="taskName">
                        <el-input v-model="editform.taskName"></el-input>
                    </el-form-item>
                    <el-form-item label="Task File" prop="taskFile">
                        <el-select v-model="taskFileList.name" placeholder="Please select file">
                            <el-option v-for="item in taskFileList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item> 
                    <el-form-item label="Task Flow" prop="taskFlow">
                        <el-select v-model="taskFlowList.name" placeholder="Please select flow">
                            <el-option v-for="item in taskFlowList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
			        <el-button @click="closeEdit">Cancel</el-button>
			        <el-button type="primary" @click="updateForm('editForm')">OK</el-button>
		        </div>
            </el-dialog>                
        </el-main>    
    </el-container>
</el-container>
</template>

<script>
import TableTools from "@/components/table/TableTools"
import Table from "@/components/table/Table"
import { getTask, searchTask, newTask, editTask } from "@/request/task"

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
            //新增对话框是否可见
            newVisible: false,
            //修改对话框是否可见
            editVisible: false,
            //新增-任务文件列表选项
            taskFileList: [],
            //新增-任务流程列表选项
            taskFlowList: [],
            //新增表单
            newform: {
                taskId: '',
                taskName: '',
            },
            //修改表单
            editform: {
                taskId: '',
                taskName: '',
            },
            //表单校验规则
            formRules: {
                taskId: [{ required: true, message: 'Please input task ID!', trigger: 'blur' }],
                taskName: [{ required: true, message: 'Please input task name!', trigger: 'blur' }],
                taskFile: [{ required: false, message: 'Please select file!', trigger: 'change' }],
                taskFlow: [{ required: false, message: 'Please select flow!', trigger: 'change' }],
            },
            //删除表格所选行的接口地址
            deleteApi: '/task/deleteTask',
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
        this.getTable(),
        this.getTaskFile(),
        this.getTaskFlow()
    },
    methods: {
        /**
        * 获取新增任务文件列表
        * 
        */
        getTaskFile() {
            
        },
        /**
        * 获取新增任务流程列表
        * 
        */
        getTaskFlow() {
            
        },
        /**
        * 提交新增表单确定按钮事件
        * @param {string} formName 新增表单ref
        */
        submitForm(formName) {          
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.newVisible = false
                    newTask(this.newform).then((res) => {                      
                        if (res.success) {
                            this.$message.success('Add data successfully!')
                            this.getTable()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    return false
                }
            })            
        },
        /**
        * 关闭新增对话框事件
        * 
        */
        closeNew() {
            this.$refs['newForm'].resetFields()
            this.newVisible = false        
        },
        /**
        * 修改表格数据
        * 
        */
        editDialog() {
            this.editVisible = true
            this.editform = this.$store.state.tableList.selectedRows[0]
        },
        /**
        * 修改表单确定按钮事件
        * @param {string} formName 修改表单ref
        */
        updateForm(formName) {
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.editVisible = false
                    editTask(this.editform).then((res) => {                      
                        if (res.success) {
                            this.$message.success('Edit data successfully!')
                            this.getTable()
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    return false
                }
            })
        },
        /**
        * 关闭修改对话框事件
        * 
        */
        closeEdit() {
            this.$refs['editForm'].resetFields()  
            this.editVisible = false       
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
            getTask(data).then((res) => {
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

<style lang="stylus">
.el-dialog__header {
    background-color: #4F7DE2;
    .el-dialog__title {
        color: #fff;
    }
}
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