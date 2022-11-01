<template>
    <div class="table-wrapper">
        <!-- 表格 -->
        <div class="tablelist-wrapper">
            <el-table  
                ref="tableDemo"
                id="tabledemo"
                :data="tableData"
                size="mini"            
                :header-cell-style="{'background-color':'#ecf5ff','color':'#409EFF'}"
                @selection-change="handleSelectRow"
            >
                <el-table-column
                    type="selection"
                    width="55"
                    align="center"               
                ></el-table-column>
                <template v-for="(item, index) in columnData">
                    <el-table-column
                        :label="item.label" 
                        :key="item.prop" 
                        :prop="item.prop"
                        sortable 
                        align="center"
                        show-overflow-tooltip
                        v-if="selectedColumnList.includes(item.prop)"
                        :render-header="renderHeader"
                    ></el-table-column>
                </template>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination-wrapper">
            <div class="current-page-count">Total entries: {{ tableData.length }}</div>
            <el-pagination
                :current-page="pageData.currentPage"
                :page-size="pageData.pageCount"
                :total="pageData.total"
                :page-sizes="[20, 40, 60, 80, 100]"
                layout='sizes, prev, pager, next, jumper'                       
            >
            </el-pagination>
        </div> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Table',
    // data() {
    //     return {
    //         tableHeight: 300
    //     }
    // },   
    //父组件向子组件传值
    props: {
        //表格数据
        tableData: {
            type: Array,
            required: true
        },
        //表格列属性
        columnData: {
            type: Array,
            required: true
        },
        //分页数据
        pageData: {
            required: true
        },
    },
    computed: {
        //表格动态显隐选择的列
		...mapGetters(['selectedColumnList']),
    },
    // mounted() {
    //     //表格高度屏幕自适应
    //     this.$nextTick(()=>{
    //         // this.$refs.tableDemo.$el.getBoundingClientRect().top           
    //         this.tableHeight = window.innerHeight - this.$refs.tableDemo.$el.offsetTop - 80     
    //         window.onresize = ()=>{
    //             this.tableHeight = window.innerHeight - this.$refs.tableDemo.$el.offsetTop - 80
    //         }
    //     })
    // },
    methods: {
        /**
        * 设置表头宽度自适应
        * 
        */
        renderHeader (h, { column, $index }) {
            let span = document.createElement('span')
            span.innerText = column.label
            document.body.appendChild(span)
            column.minWidth = span.getBoundingClientRect().width + 35
            document.body.removeChild(span)
            return h('span', column.label)
        },
        /**
        * 表格选择项发生变化时的回调函数
        * @param {[]} selection 勾选的行数据
        */
        handleSelectRow(selection) {
            this.$store.commit('changeSelectedRows', selection)
        },
    }
}
</script>

<style lang="stylus" scoped>
.pagination-wrapper {
    position: relative;
    height: 44px;
    line-height: 44px;
    text-align: center;

    .current-page-count {
        position: absolute;
        left: 16px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        color: #606266;
    }
}
</style>