<template>
<el-container>
    <el-aside width="200px" style="background-color: #e5f6ff">
    </el-aside>
    <el-container>
        <el-header height="50px">        
            <div style="border-bottom:1px solid #ddd;">          
                <el-button 
                    type="text"
                    title="Open" 
                    style="font-size:16px"
                    @click="flowVisible=true"
                    icon="el-icon-folder-opened"
                ></el-button>  
                <el-button 
                    type="text"
                    title="New" 
                    style="font-size:16px"
                    icon="el-icon-document-add"
                ></el-button>         
                <el-button 
                    type="text"
                    title="Save" 
                    style="font-size:16px"
                    icon="el-icon-folder"
                ></el-button>
                <el-button 
                    type="text"
                    title="Delete" 
                    style="font-size:16px"
                    icon="el-icon-delete"
                ></el-button>
                <span style="margin-left:20px">{{ title }}</span>
                <el-dialog 
                    title="Open Pipeline" 
                    :visible.sync="flowVisible"
                    width="580px"
                ><el-table :data="flowData" size="mini" @row-click="handleRowClick" :row-style="rowStyle">
                    <el-table-column prop="pipelineName" label="Pipeline"></el-table-column>
                </el-table>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="flowVisible=false" size="mini">Cancel</el-button>
                    <el-button type="primary" size="mini" @click="flowChange(selectedRow)">Open</el-button>
                </div>
                </el-dialog>
            </div>  
        </el-header>
        <el-main style="padding:0">        
            <Flow v-if="showFlow" :flowList="flowList" @stepClick="stepClick"></Flow>
        </el-main>
    </el-container>
    <el-aside width="250px" style="background-color: #e5f6ff;">
        <div style="padding: 10px;color:#409EFF">{{ stepTitle }}</div>
    </el-aside>
</el-container>
</template>

<script>
import Flow from "@/components/echart/Flow"
import { getFlowList, getFlowTable } from "@/request/pipeline"

export default {
    data() {
        return {
            //????????????????????????????????????
            showFlow: false,
            //??????????????????
            flowList: [],
            //????????????
            title: '',
            //??????????????????
            stepTitle: '',
            //?????????????????????????????????
            flowVisible: false,
            //??????????????????
            flowData: [],
            //??????????????????????????????
            selectedRow: '',
        }
    },
    components: {
        Flow,
    },
    created() {
        this.getTable()
    },
    methods: {
        /**
        * ????????????????????????
        * 
        */
        getTable(){
            getFlowTable().then((res) => {
                if (res.success) {
                    let arr = []
                    let _arr = []
                    for(var i in res.data.list){
                        if(arr.indexOf(res.data.list[i].pipelineId) == -1){
                            arr.push(res.data.list[i].pipelineId)
                            _arr.push(res.data.list[i])
                        }
                    } 
                    this.flowData = _arr  
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        /**
        * ???????????????????????????
        * 
        */
        handleRowClick(row) {
            this.selectedRow = row.pipelineId
        },
        /**
        * ???????????????????????????????????????
        * @param {string} value ???????????????ID
        */
        flowChange(value){
            if(value == ""){
                this.$message({
                    message: 'Please select pipeline!',
                    type: 'warning'
                });
                return false;
            }else{
                this.showFlow = false
                this.flowVisible = false
                let data ={flow: value}
                getFlowList(data).then((res) => {
                    if (res.success) {
                        let _flowList = []
                        let tempList = res.data.list
                        for (var i=0; i<tempList.length; i++) {
                            _flowList.push(tempList[i].pipelineStep)
                        }                   
                        this.flowList = _flowList
                        this.title = tempList[0].pipelineName
                        this.showFlow = true
                    } else {
                        this.$message.error(res.message)
                    }
                })
            }
        },
        /**
        * ???????????????????????????????????????
        * @param {string} stepName ????????????
        */
        stepClick(stepName) {
            this.stepTitle = stepName
        },
        /**
        * ??????????????????????????????
        * 
        */
        rowStyle({row,rowIndex}){
            if(this.selectedRow === row.pipelineId){
                return {'background-color':'#e5f6ff', 'cursor':'pointer'}
            }
            return {'cursor':'pointer'}
        },
    }
}
</script>
<style scoped>
.el-form-item__label-wrap{
    margin-left: 0 !important
}
.el-form-item__label{
    font-size: 6px
}
.el-radio__label {
    font-size: 6px;
}
</style>