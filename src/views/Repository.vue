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
                <Pie :filterList="filterList"></Pie>
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
import FilterPanel from "@/components/nav/FilterPanel"
import Pie from "@/components/echart/Pie"
import Table from "@/components/table/Table"
import { getFile, searchFile } from "@/request/repository"

export default {
	components: {
		FilterPanel,
        Pie,
        Table,
	},
    data() {
        return {
            filterList: [
                {
                    id: 'a',
                    title: 'Data Category',
                    options: [
                        {
                            id: '1',
                            name: 'sequencing reads',
                            value: '67'
                        },
                        {
                            id: '2',
                            name: 'structural variations',
                            value: '4270'
                        },
                    ]
                },
                {
                    id: 'b',
                    title: 'Data Category',
                    options: [
                        {
                            id: '3',
                            name: 'sequencing reads',
                            value: '234'
                        },
                        {
                            id: '4',
                            name: 'structural variations',
                            value: '427'
                        },
                    ]
                },
                {
                    id: 'c',
                    title: 'Data Category',
                    options: [
                        {
                            id: '3',
                            name: 'sequencing reads',
                            value: '234'
                        },
                        {
                            id: '4',
                            name: 'structural variations',
                            value: '427'
                        },
                    ]
                },
                {
                    id: 'd',
                    title: 'Data Category',
                    options: [
                        {
                            id: '3',
                            name: 'sequencing reads',
                            value: '234'
                        },
                        {
                            id: '4',
                            name: 'structural variations',
                            value: '427'
                        },
                    ]
                },
                {
                    id: 'e',
                    title: 'Data Category',
                    options: [
                        {
                            id: '3',
                            name: 'sequencing reads',
                            value: '234'
                        },
                        {
                            id: '4',
                            name: 'structural variations',
                            value: '427'
                        },
                    ]
                },
                {
                    id: 'f',
                    title: 'Data Category',
                    options: [
                        {
                            id: '3',
                            name: 'sequencing reads',
                            value: '234'
                        },
                        {
                            id: '4',
                            name: 'structural variations',
                            value: '427'
                        },
                    ]
                },
            ],
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
                    prop: "seqType",
                },
                {
                    label: "Data Type",
                    prop: "dataType",
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
        }
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