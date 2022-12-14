<template>
<div>
    <TableTools       
        :buttonVisible="buttonVisible"
        :deleteApi="deleteApi"
        :uploadApi="uploadApi"
        :tableName="tableName"              
        @getTable="getTable"
        @getSearchTable="getSearchTable"    
        @newDialog="newDialog"   
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
            <div style="padding: 10px; display:flex">
                <div>{{ sample }}</div>
                <div style="margin-left:auto">
                    <el-button 
                        title="Upload" 
                        type="success" 
                        size="mini" 
                        icon="el-icon-upload" 
                        @click="handleClick" 
                        circle></el-button>
                </div>            
            </div>
            <Upload ref="child"></Upload>
        </div>
    </div>
    <el-dialog :title="title" :visible.sync="newVisible" width="580px" @close="closeNew">
        <el-form :model="newform" :rules="formRules" ref="newForm" label-position="top" size="mini">
            <el-form-item label="ID" prop="id" required>
                <el-input v-model="newform.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Sample Name" prop="sampleName">
                <el-input v-model="newform.sampleName"></el-input>
            </el-form-item>
            <el-form-item label="Tissue" prop="tissue">
                <el-select v-model="newform.tissue" placeholder="Please select tissue">
                    <el-option v-for="(item,index) in tissueList" :label="item.metaPropName" :value="item.metaPropName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Collection Date">
                <el-col :span="11">
                    <el-form-item prop="collectionDate">
                        <el-date-picker value-format="yyyy-MM-dd" placeholder="Please select collection date" v-model="newform.collectionDate"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>          
            <el-form-item label="Biomaterial Provider" prop="biomaterialProvider">
                <el-input v-model="newform.biomaterialProvider"></el-input>
            </el-form-item>          
            <el-form-item label="Platform" prop="platform">
                <el-select v-model="newform.platform" placeholder="Please select platform">
                    <el-option v-for="(item,index) in platformList" :label="item.metaPropName" :value="item.metaPropName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Library Construction" prop="libraryConstruction">
                <el-input type="textarea" v-model="newform.libraryConstruction"></el-input>
            </el-form-item>
            <el-form-item label="Strategy" prop="strategy">
                <el-select v-model="newform.strategy" placeholder="Please select strategy">
                    <el-option v-for="(item,index) in strategyList" :label="item.metaPropName" :value="item.metaPropName" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeNew">Cancel</el-button>
            <el-button type="primary" @click="submitForm('newForm',flag)">OK</el-button>
        </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="editVisible" width="580px" @close="closeEdit">
        <el-form :model="editform" :rules="formRules" ref="editForm" label-position="top" size="mini">
            <el-form-item label="ID" prop="id" required>
                <el-input v-model="editform.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Sample Name" prop="sampleName">
                <el-input v-model="editform.sampleName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Tissue" prop="tissue">
                <el-select v-model="editform.tissue" placeholder="Please select tissue">
                    <el-option v-for="(item,index) in tissueList" :label="item.metaPropName" :value="item.metaPropName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Collection Date">
                <el-col :span="11">
                    <el-form-item prop="collectionDate">
                        <el-date-picker value-format="yyyy-MM-dd" placeholder="Please select collection date" v-model="editform.collectionDate"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>          
            <el-form-item label="Biomaterial Provider" prop="biomaterialProvider">
                <el-input v-model="editform.biomaterialProvider"></el-input>
            </el-form-item>          
            <el-form-item label="Platform" prop="platform">
                <el-select v-model="editform.platform" placeholder="Please select platform">
                    <el-option v-for="(item,index) in platformList" :label="item.metaPropName" :value="item.metaPropName" :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Library Construction" prop="libraryConstruction">
                <el-input type="textarea" v-model="editform.libraryConstruction"></el-input>
            </el-form-item>
            <el-form-item label="Strategy" prop="strategy">
                <el-select v-model="editform.strategy" placeholder="Please select strategy">
                    <el-option v-for="(item,index) in strategyList" :label="item.metaPropName" :value="item.metaPropName" :key="index"></el-option>
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
import Upload from "@/components/upload/Upload"

import { getExperiment, getOptions, newExperiment, newExperiments, editExperiment, searchExperiment } from "@/request/metadata"

export default {
    name: "Experiment",
    components: {
        TableTools,
        Table,
        Upload
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
            deleteApi: '/metadata/deleteExperiment',
            //上传导入模板的接口地址
            uploadApi: '/metadata/importExperiment',
            //表格名字
            tableName: 'Experiment_Info',
            //表格列属性
            columnData:[
                {
                    label:"ID",
                    prop:"id",
                },
                {
                    label:"Sample Name",
                    prop:"sampleName",    
                },
                {
                    label:"Tissue",
                    prop:"tissue",    
                },
                {
                    label:"Collection Date",
                    prop:"collectionDate",      
                },
                {
                    label:"Biomaterial Provider",
                    prop:"biomaterialProvider",             
                },
                {
                    label:"Platform",
                    prop:"platform",          
                },
                {
                    label:"Library Construction",
                    prop:"libraryConstruction",     
                },
                {
                    label:"Strategy",
                    prop:"strategy",           
                }
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
            //详细信息列表的标题
            title: "Experiment Info",
            //上传文件的接口地址
            uploadFiles: '/metadata/uploadExperiment',
            //新增表单是否可见
            newVisible: false,
            //修改表单是否可见
            editVisible: false,
            //新增表单
            newform: {
                id: '',
                sampleName: '',
                tissue: '',
                collectionDate: '',
                biomaterialProvider: '',
                platform: '',
                libraryConstruction: '',
                strategy: '',
            },
            //修改表单
            editform: {
                id: '',
                sampleName: '',
                tissue: '',
                collectionDate: '',
                biomaterialProvider: '',
                platform: '',
                libraryConstruction: '',
                strategy: '',
            },
            //新增表单验证规则
            formRules: {
                sampleName: [{ required: true, message: 'Please input sample name!', trigger: 'blur' }],
                tissue: [{ required: true, message: 'Please select tissue!', trigger: 'change' }],
                strategy: [{required: true, message: 'Please select strategy!', trigger: 'change' }]          
            },
            //是否对同一ID进行新增的标志
            flag: false,
            //测序类型选项列表
            strategyList: [],
            //组织类型选项列表
            tissueList: [],
            //测序平台选项列表
            platformList: [],
            //实验样本名称
            sample: '',
        }
    },
    created() {
        this.getTable(),
        this.getOption()
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
            getExperiment(data).then((res) => {
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
        * 获取参数
        * 
        */
        getOption(){
            getOptions().then((res) => {
                if (res.success) {
                    let _arr = []
                    let _arr1 = []
                    let _arr2 = []
                    for(var i in res.data.option){
                        if(res.data.option[i].metaName == "Sequencing Type"){
                            _arr.push(res.data.option[i])
                        }
                        if(res.data.option[i].metaName == "Primary Site"){
                            _arr1.push(res.data.option[i])
                        }
                        if(res.data.option[i].metaName == "Platform"){
                            _arr2.push(res.data.option[i])
                        }                       
                    }
                    this.strategyList = _arr
                    this.tissueList = _arr1
                    this.platformList = _arr2                    
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
            searchExperiment({
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
            this.sample = rowdata[0].sampleName
        },
        /**
        * 新增数据
        * 
        */
        newDialog() {
            const selectedRows = this.$store.state.tableList.selectedRows
            if (selectedRows.length === 0) {
                this.$message({
                    message: 'Please select one item to add!',
                    type: 'warning'
                });
                return false;
            }  else if (selectedRows.length > 1) {
                this.$message({
                    message: 'Only one item is allowed to add at a time!',
                    type: 'warning'
                });
                return false;
            } 
            this.newform.id = this.$store.state.tableList.selectedRows[0].id
            if (this.$store.state.tableList.selectedRows[0].sampleName != null) {
                this.$confirm('Are you sure to create a new item for ' + this.newform.id + '?', 'Confirmation', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.newVisible = true
                    this.flag = true
                }).catch(() => {
                    return false;
                })
            }
            else {
                this.newVisible = true
                this.flag = false
            }    
        },
        /**
        * 提交新增表单确定按钮事件
        * @param {string} formName 新增表单ref 
        * @param {boolean} mark 是否为同一id增加条目的标志
        */
        submitForm(formName, mark) {          
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.newVisible = false
                    if (mark) {
                        for (var i in this.$store.state.tableList.selectedRows[0]){
                            if (this.newform.hasOwnProperty(i)){}
                            else{
                                this.newform[i] = this.$store.state.tableList.selectedRows[0][i]}
                            }
                        newExperiments(this.newform).then((res) => {                      
                            if (res.success) {
                                this.$message.success('Add data successfully!')
                                this.getTable()
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }
                    else {
                        newExperiment(this.newform).then((res) => {                      
                            if (res.success) {
                                this.$message.success('Add data successfully!')
                                this.getTable()
                            } else {
                                this.$message.error(res.message)
                            }
                        })
                    }
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
        * 修改数据
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
                    editExperiment(this.editform).then((res) => {                      
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
        * 点击上传按钮时触发上传组件的上传按钮点击
        * 
        */
        handleClick() {
            this.$refs.child.clickbtn()
        }
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
        width:22%
        flex:1;
        height: calc(100vh - 150px);
        border-left: 1px solid #eee;
        background-image: linear-gradient(190deg, #fdfeff, #e5f6ff);
    }
}
</style>