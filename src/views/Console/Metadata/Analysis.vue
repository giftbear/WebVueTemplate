<template>
<div>
    <TableTools       
        :buttonVisible="buttonVisible"
        :deleteApi="deleteApi"
        :uploadApi="uploadApi"
        :tableName="tableName"              
        @getTable="getTable"
        @getSearchTable="getSearchTable"    
        @newDialog="newVisible = true"   
        @editDialog="editDialog"         
    ></TableTools>

    <div class="main-panel">
        <div class="left-panel">
            <Table
                :tableData="tableData" 
                :columnData="columnData"
                :pageData="pageData"
                :loading.sync="loading"
                @getTable="getTable"
                :detailShow="true"
                @rowData="rowData"
            ></Table> 
        </div>
        <div class="right-panel">
            <DetailList
                :columnData="columnData"
                :tempData="tempData"
                :title="title"
                :titleClass="titleClass"
                :uploadFiles="uploadFiles"
            ></DetailList>
        </div>
    </div>
    <el-dialog :title="title" :visible.sync="newVisible" width="580px" @close="closeNew">
        <el-form :model="newform" :rules="formRules" ref="newForm" label-position="top" size="mini">
            <el-form-item label="ID" prop="id">
                <el-input v-model="newform.id"></el-input>
            </el-form-item>
            <el-form-item label="Access" prop="access">
                <el-radio-group v-model="newform.access">
                    <el-radio label="Open"></el-radio>
                    <el-radio label="Controlled"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="File UUID" prop="fileUuid">
                <el-input v-model="newform.fileUuid"></el-input>
            </el-form-item>
            <el-form-item label="File Name" prop="fileName">
                <el-input v-model="newform.fileName"></el-input>
            </el-form-item>
            <el-form-item label="File Type" prop="fileType">
                <el-select v-model="newform.fileType" placeholder="Please select file type">
                    <el-option label="Mapped Data" value="map"></el-option>
                    <el-option label="Proteome Profile" value="proteome"></el-option>
                </el-select>
            </el-form-item>       
            <el-form-item label="File Format" prop="fileFormat">
                <el-select v-model="newform.fileFormat" placeholder="Please select file format">
                    <el-option label="txt" value="txt"></el-option>
                    <el-option label="fastq" value="fastq"></el-option>
                </el-select>
            </el-form-item>        
            <el-form-item label="File Size" prop="fileSize">
                <el-input v-model="newform.fileSize"></el-input>
            </el-form-item>              
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeNew">Cancel</el-button>
            <el-button type="primary" @click="submitForm('newForm')">OK</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import TableTools from "@/components/table/TableTools"
import Table from "@/components/table/Table"
import DetailList from "@/components/table/DetailList"

export default {
    name: "Analysis",
    components: {
        TableTools,
        Table,
        DetailList,
    },
    data(){
        return{
            //表格工具
            buttonVisible: {
                newButton: true,
                importButton: true,
                editButton: true,
                deleteButton: true,
                searchButton: true,
                exportButton: true,
            },
            //删除表格所选行的接口地址
            deleteApi: '/metadata/deleteAnalysis',
            //上传导入模板的接口地址
            uploadApi: '/metadata/importAnalysis',
            //表格名字
            tableName: 'Analysis_Info',
            //表格列属性
            columnData:[
                {
                    label:"ID",
                    prop:"id",
                },
                {
                    label:"Access",
                    prop:"access",
                }, 
                {
                    label:"File UUID",
                    prop:"fileUuid",
                },
                {
                    label:"File Name",
                    prop:"fileName",
                },
                {
                    label:"File Type",
                    prop:"fileType",
                },
                {
                    label:"File Format",
                    prop:"fileFormat",
                },
                {
                    label:"File Size",
                    prop:"fileSize",
                },                   
            ],
            //表格数据
            tableData: [],
            //分页数据
            pageData: {
                currentPage: 1,
                pageCount: 20,
                total: 0
            },
            //表格加载状态
            loading: true,
            //表格详细信息列表数据
            tempData: [],
            //详细信息列表的标题
            title: "Analysis Info",
            titleClass: 'el-icon-s-platform',
            //上传文件的接口地址
            uploadFiles: '/metadata/uploadAnalysis',
            //新增表单是否可见
            newVisible: false,
            //新增表单
            newform: {
                id: '',
                access: '',
                fileUuid: '',
                fileName: '',
                fileType: '',
                fileFormat: '',
                fileSize: '',
            },
            //新增表单验证规则
            formRules: {
                id: [{ required: true, message: 'Please input ID!', trigger: 'blur' }],
                access: [{ required: true, message: 'Please select access!', trigger: 'change' }],
                fileUuid: [{ required: true, message: 'Please input file UUID!', trigger: 'blur' }],
                fileName: [{required: true, message: 'Please input file name!', trigger: 'blur' }],  
                fileType: [{ required: true, message: 'Please select file type!', trigger: 'change' }],
                fileFormat: [{ required: true, message: 'Please select file format!', trigger: 'change' }], 
                fileSize: [{required: true, message: 'Please input file size!', trigger: 'blur' }],      
            },
        }
    },
    methods:{
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
            getAnalysis(data).then((res) => {
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
            searchAnalysis({
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
        /**
         * 通过父组件将表格的行数据传给详细列表
         * @param {[]} rowdata 表格行数据
         */
        rowData(rowdata){
            this.tempData = rowdata
        },
        /**
        * 提交新增表单确定按钮事件
        * @param {string} formName 新增表单ref
        */
        submitForm(formName) {          
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.newVisible = false
                    newAnalysis(this.newform).then((res) => {                      
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
    }
}   
</script>

<style lang="stylus" scoped>
.main-panel{
    display: flex;
    width: 100%;
    .left-panel{
        width:78%
        flex:1;
    }
    .right-panel{
        margin-left: 10px;
        width:22%
        flex:1;
    }
}
</style>