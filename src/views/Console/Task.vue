<template>
<div>
    <TableTools       
        :buttonVisible="buttonVisible"
        :deleteApi="deleteApi"
        :tableName="tableName"               
        @getTable="getTable"
        @getSearchTable="getSearchTable"    
        @newDialog="newDialog"   
        @editDialog="editDialog"         
    ></TableTools>
    <div class="operation-wrapper">
        <el-button-group>
            <el-button
                title="Run" 
                size="mini" 
                type="primary" 
                icon="el-icon-caret-right"
            ></el-button>
            <el-button
                title="Terminate" 
                size="mini" 
                type="primary" 
                icon="el-icon-video-pause"
            ></el-button>
            <el-button
                title="Rerun" 
                size="mini" 
                type="primary" 
                icon="el-icon-refresh-right"
            ></el-button>
        </el-button-group>
    </div>
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
            <el-form-item label="Task ID" prop="taskId" required>
                <el-input v-model="newform.taskId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Task Name" prop="taskName">
                <el-input v-model="newform.taskName"></el-input>
            </el-form-item>
            <el-form-item label="Task File" prop="taskFile">
                <el-select v-model="newform.taskFile" placeholder="Please select file">
                    <el-option v-for="(item,index) in taskFileList" :label="item.datasetName" :value="item.datasetName" :key="index"></el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="Task Flow" prop="taskFlow">
                <el-select v-model="newform.taskFlow" placeholder="Please select flow">
                    <el-option v-for="(item,index) in taskFlowList" :label="item.pipelineName" :value="item.pipelineName" :key="index"></el-option>
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
            <el-form-item label="Task ID" prop="taskId" required>
                <el-input v-model="editform.taskId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Task Name" prop="taskName">
                <el-input v-model="editform.taskName"></el-input>
            </el-form-item>
            <el-form-item label="Task File" prop="taskFile">
                <el-select v-model="editform.taskFile" placeholder="Please select file">
                    <el-option v-for="(item,index) in taskFileList" :label="item.datasetName" :value="item.datasetName" :key="index"></el-option>
                </el-select>
            </el-form-item> 
            <el-form-item label="Task Flow" prop="taskFlow">
                <el-select v-model="editform.taskFlow" placeholder="Please select flow">
                    <el-option v-for="(item,index) in taskFlowList" :label="item.pipelineName" :value="item.pipelineName" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeEdit">Cancel</el-button>
            <el-button type="primary" @click="updateForm('editForm')">OK</el-button>
        </div>
    </el-dialog>   
</div>             
</template>

<script>
import TableTools from "@/components/table/TableTools"
import Table from "@/components/table/Table"
import { getTask, searchTask, newTask, editTask, generateID } from "@/request/console"

export default {
    data() {
        return {
            //????????????
            buttonVisible: {
                newButton: true,
                importButton: false,
                editButton: true,
                deleteButton: true,
                searchButton: true,
                exportButton: true,
            },
            //???????????????????????????
            newVisible: false,
            //???????????????????????????
            editVisible: false,
            //??????-????????????????????????
            taskFileList: [],
            //??????-????????????????????????
            taskFlowList: [],
            //????????????
            newform: {
                taskId: '',
                taskName: '',
                taskFile: '',
                taskFlow: '',
            },
            //????????????
            editform: {
                taskId: '',
                taskName: '',
                taskFile: '',
                taskFlow: '',
            },
            //??????????????????
            formRules: {
                taskName: [{ required: true, message: 'Please input task name!', trigger: 'blur' }],
                taskFile: [{ required: true, message: 'Please select file!', trigger: 'change' }],
                taskFlow: [{ required: true, message: 'Please select flow!', trigger: 'change' }],
            },
            //????????????????????????????????????
            deleteApi: '/task/deleteTask',
            //????????????
            tableName: 'Task',
            //????????????
            tableData: [],
            //???????????????
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
            //????????????
            pageData: {
                currentPage: 1,
                pageCount: 20,
                total: 0
            },
            //??????????????????
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
        * ????????????
        * 
        */
        newDialog() {
            generateID().then((res) => {
                if (res.success) {
                    this.newform.taskId = res.data.uid
                    this.newVisible = true                                   
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /**
        * ??????????????????????????????
        * 
        */
        getTaskFile() {
            
        },
        /**
        * ??????????????????????????????
        * 
        */
        getTaskFlow() {
            
        },
        /**
        * ????????????????????????????????????
        * @param {string} formName ????????????ref
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
        * ???????????????????????????
        * 
        */
        closeNew() {
            this.$refs['newForm'].resetFields()
            this.newVisible = false        
        },
        /**
        * ??????????????????
        * 
        */
        editDialog() {
            this.editVisible = true
            this.editform = this.$store.state.tableList.selectedRows[0]
        },
        /**
        * ??????????????????????????????
        * @param {string} formName ????????????ref
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
        * ???????????????????????????
        * 
        */
        closeEdit() {
            this.$refs['editForm'].resetFields()  
            this.editVisible = false       
        },
        /**
        * ??????????????????
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
         * ???????????????????????????
         * @param {string} content ????????????
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

<style scoped>
.operation-wrapper {
    padding: 0 10px 16px 10px;
}
</style>