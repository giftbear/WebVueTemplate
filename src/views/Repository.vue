<template>
	<div class="repository-wrapper">
		<el-container>
			<el-aside width="350px">
				<FilterPanel
                    :filterList="filterList"
                    @getTable="getTable"
                    @getSearchTable="getSearchTable"
                ></FilterPanel>
			</el-aside>
            <el-main class="el-main">
                <Pie v-if="showPie" :filterList="filterList"></Pie>
                <TableTools       
                    :buttonVisible="buttonVisible"
                    :tableName="tableName"    
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
	</div>
</template>

<script>
import FilterPanel from "@/components/panel/FilterPanel"
import Pie from "@/components/echart/Pie"
import Table from "@/components/table/Table"
import TableTools from "@/components/table/TableTools"
import { getFile, searchFile, getFilter } from "@/request/repository"

export default {
	components: {
		FilterPanel,
        Pie,
        Table,
        TableTools,
	},
    data() {
        return {
            //表格工具
            buttonVisible: {
                cartButton: true,
                newButton: false,
                importButton: false,
                editButton: false,
                deleteButton: false,
                searchButton: false,
                exportButton: true,
            },
            //表格名字
            tableName: 'Metadata',
            //数据筛选列表
            filterList: [],
            //表格数据
            tableData: [],
            //表格列属性
            columnData: [
                {
                    label: "Access",
                    prop: "access",
                },
                {
                    label: "File UUID",
                    prop: "fileUuid",
                },
                {
                    label: "File Name",
                    prop: "fileName",
                },
                {
                    label: "Sequencing Type",
                    prop: "strategy",
                },
                {
                    label: "Data Type",
                    prop: "fileType",
                },
                {
                    label: "File Format",
                    prop: "fileFormat",
                },         
                {
                    label: "File Size",
                    prop: "fileSize",
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
            //后台获取数据后渲染饼图
            showPie: false,        
        }
    },
    created() {
        this.getTable(),
        this.getFilterList()
    },
    methods: {
        /**
        * 获取筛选列表数据
        * 
        */
        getFilterList() {
            getFilter().then((res) => {
                if (res.success) {
                    let tempList = res.data.list
                    let initValue = tempList[0].metaName
                    let childType = []
                    let _filterList = []
                    for(var i in tempList){    
                        if(tempList[i].metaName == initValue){
                            var temp = {"id": tempList[i].metaPropId, "name": tempList[i].metaPropName, "value": tempList[i].metaPropNum}
                            childType.push(temp)
                        }
                        if(tempList[i].metaName != initValue){                       
                            var temp1 = {"id": tempList[i-1].metaId, "title": tempList[i-1].metaName, "options": childType}
                            _filterList.push(temp1)
                            initValue = tempList[i].metaName
                            var temp = {"id": tempList[i].metaPropId, "name": tempList[i].metaPropName,"value":tempList[i].metaPropNum}
                            childType=[]
                            childType.push(temp)
                        }
                        if(i == tempList.length-1 && childType.length>0){
                            var temp1 = {"id": tempList[i].metaId, "title": tempList[i].metaName, "options": childType}
                            _filterList.push(temp1)
                        }                       
                    }
                    this.filterList = _filterList
                    this.showPie = true
                } else {
                    this.$message.error(res.message)
                }
            })
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
            getFile(data).then((res) => {
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
            searchFile({
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

<style lang="stylus" scoped>
.el-aside {
    margin-top: 10px
}

.el-main {
  padding: 0 8px 0 16px !important;
  margin-top: 10px
}
</style>