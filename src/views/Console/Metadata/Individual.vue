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
    <!-- <div class="main-panel">
        <div class="left-panel"> -->
            <Table
                :tableData="tableData" 
                :columnData="columnData"
                :pageData="pageData"
                :loading.sync="loading"
                @getTable="getTable"
            ></Table> 
        <!-- </div>
        <div class="right-panel">
            <DetailList
                :columnData="columnData"
                :tempData="tempData"
                :title="title"
                :titleClass="titleClass"
                :uploadFiles="uploadFiles"
                ></DetailList>
        </div>
    </div> -->
    <el-dialog :title="title" :visible.sync="newVisible" width="580px" @close="closeNew">
        <el-form :model="newform" :rules="formRules" ref="newForm" label-position="top" size="mini">
            <el-form-item label="ID" prop="id" required>
                <el-input v-model="newform.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="name">
                <el-input v-model="newform.name"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model="newform.gender">
                    <el-radio v-for="(item, index) in genderList" :label="item.metaPropName" :key="index"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Age" required>
                <el-col :span="11">
                    <el-form-item prop="age">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="newform.age"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>          
            <el-form-item label="Disease/Symptoms" prop="disease">
                <el-input type="textarea" v-model="newform.disease"></el-input>
            </el-form-item>
            <el-form-item label="Treatment" prop="treatment">
                <el-input type="textarea" v-model="newform.treatment"></el-input>
            </el-form-item>
            <el-form-item label="Survival Time" prop="survivalTime">
                <el-input type="textarea" v-model="newform.survivalTime"></el-input>
            </el-form-item>
            <el-form-item label="Family History" prop="familyHistory">
                <el-input type="textarea" v-model="newform.familyHistory"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closeNew">Cancel</el-button>
            <el-button type="primary" @click="submitForm('newForm')">OK</el-button>
        </div>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="editVisible" width="580px" @close="closeEdit">
        <el-form :model="editform" :rules="formRules" ref="editForm" label-position="top" size="mini">
            <el-form-item label="ID" prop="id" required>
                <el-input v-model="editform.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Name" prop="name">
                <el-input v-model="editform.name"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model="editform.gender">
                    <el-radio v-for="(item, index) in genderList" :label="item.metaPropName" :key="index"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Age" required>
                <el-col :span="11">
                    <el-form-item prop="age">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="editform.age"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>          
            <el-form-item label="Disease/Symptoms" prop="disease">
                <el-input type="textarea" v-model="editform.disease"></el-input>
            </el-form-item>
            <el-form-item label="Treatment" prop="treatment">
                <el-input type="textarea" v-model="editform.treatment"></el-input>
            </el-form-item>
            <el-form-item label="Survival Time" prop="survivalTime">
                <el-input type="textarea" v-model="editform.survivalTime"></el-input>
            </el-form-item>
            <el-form-item label="Family History" prop="familyHistory">
                <el-input type="textarea" v-model="editform.familyHistory"></el-input>
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
// import DetailList from "@/components/table/DetailList"

import { getIndividual, generateID, getOptions, newIndividual, editIndividual, searchIndividual } from "@/request/metadata"

export default {
    name: "Individual",
    components: {
        TableTools,
        Table,
        // DetailList,
    },
    data(){
        return{            
            //????????????
            buttonVisible: {
                newButton: true,
                importButton: true,
                editButton: true,
                deleteButton: true,
                searchButton: true,
                exportButton: true,
            },
            //????????????????????????????????????
            deleteApi: '/metadata/deleteIndividual',
            //?????????????????????????????????
            uploadApi: '/metadata/importIndividual',
            //????????????
            tableName: 'Individual_Info',
            //???????????????
            columnData:[
                {
                    label:"ID",
                    prop:"id",
                },
                {
                    label:"Name",
                    prop:"name",
                },
                {
                    label:"Gender",
                    prop:"gender",
                },
                {
                    label:"Age",
                    prop:"age",
                },
                {
                    label:"Disease/Symptoms",
                    prop:"disease",
                },
                {
                    label:"Treatment",
                    prop:"treatment",
                },
                {
                    label:"Survival Time",
                    prop:"survivalTime",
                },
                {
                    label:"Family History",
                    prop:"familyHistory",
                }
            ],
            //????????????
            tableData: [],
            //????????????
            pageData: {
                currentPage: 1,
                pageCount: 20,
                total: 0
            },
            //??????????????????
            loading: true,
            //??????????????????????????????
            // tempData: [],
            //???????????????????????????
            title: "Individual Info",
            // titleClass: 'el-icon-s-custom',
            //???????????????????????????
            uploadFiles: '/metadata/uploadIndividual',
            //????????????????????????
            newVisible: false,
            //????????????????????????
            editVisible: false,
            //????????????
            newform: {
                id: '',
                name: '',
                gender: '',
                age: '',
                disease: '',
                treatment: '',
                survivalTime: '',
                familyHistory: '',
            },
            //????????????
            editform: {
                id: '',
                name: '',
                gender: '',
                age: '',
                disease: '',
                treatment: '',
                survivalTime: '',
                familyHistory: '',
            },
            //??????????????????
            formRules: {
                name: [{ required: true, message: 'Please input name!', trigger: 'blur' }],
                gender: [{ required: true, message: 'Please select gender!', trigger: 'change' }],
                age: [{ required: true, message: 'Please select birth date!', trigger: 'change' }],
                disease: [{ required: true, message: 'Please input disease or symptoms!', trigger: 'blur' }]
            },
            //??????????????????
            genderList: [],
        }
    },
    created() {
        this.getTable(),
        this.getOption()
    },
    methods: {
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
            getIndividual(data).then((res) => {
                if (res.success) {
                    let arr = []
                    let _arr = []
                    for(var i in res.data.list){
                        if(arr.indexOf(res.data.list[i].id) == -1){
                            arr.push(res.data.list[i].id)
                            _arr.push(res.data.list[i])
                        }
                    }                 
                    this.tableData = _arr
                    this.pageData.total = Number(res.data.total)
                    this.loading = false
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /**
        * ????????????
        * 
        */
        getOption(){
            getOptions().then((res) => {
                if (res.success) {
                    let _arr = []
                    for(var i in res.data.option){
                        if(res.data.option[i].metaName == "Gender"){
                            _arr.push(res.data.option[i])
                        }
                    }
                    this.genderList = _arr                   
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
            searchIndividual({
                currentPage: this.pageData.currentPage,
                pageCount: this.pageData.pageCount,
                content: content
            }).then((res) => {               
                if (res.success) {   
                    let arr = []
                    let _arr = []
                    for(var i in res.data.list){
                        if(arr.indexOf(res.data.list[i].id) == -1){
                            arr.push(res.data.list[i].id)
                            _arr.push(res.data.list[i])
                        }
                    }                 
                    this.tableData = _arr              
                    this.pageData.total = Number(res.data.total)
                    this.loading = false
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /**
         * ??????????????????????????????????????????????????????
         * @param {[]} rowdata ???????????????
         */
        rowData(rowdata){
            this.tempData = rowdata
        },
        /**
        * ????????????
        * 
        */
        newDialog() {
            generateID().then((res) => {
                if (res.success) {
                    this.newform.id = res.data.uid
                    this.newVisible = true                                   
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /**
        * ????????????????????????????????????
        * @param {string} formName ????????????ref
        */
        submitForm(formName) {          
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.newVisible = false
                    newIndividual(this.newform).then((res) => {                      
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
        * ????????????
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
                    editIndividual(this.editform).then((res) => {                      
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