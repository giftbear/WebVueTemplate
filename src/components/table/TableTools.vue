<template>
    <div class="table-tools-wrapper">
        <!-- 左边工具栏:增导改删 -->
        <div class="basic-tools">
            <el-dropdown>
            <el-button
                v-if="buttonVisible.cartButton"
                title="Cart" 
                size="mini" 
                type="primary" 
                icon="el-icon-shopping-cart-2"
            ></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addFile()">Add Files</el-dropdown-item>
                <el-dropdown-item @click.native="cartVisible=true">Cart</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            <el-button 
                v-if="buttonVisible.newButton" 
                title="New" 
                size="mini" 
                type="success" 
                icon="el-icon-plus"
                @click="newItem()"
            >New</el-button>
            <el-button 
                v-if="buttonVisible.importButton" 
                title="Import" 
                size="mini" 
                type="primary" 
                icon="el-icon-upload2"
                @click="importVisible = true"
            >Import</el-button>
            <el-button 
                v-if="buttonVisible.editButton" 
                title="Edit" 
                size="mini" 
                type="warning" 
                icon="el-icon-edit"
                @click="updateTable()"
            >Edit</el-button>
            <el-button 
                v-if="buttonVisible.deleteButton" 
                title="Delete" 
                size="mini" 
                type="danger" 
                icon="el-icon-delete" 
                @click="deleteBatch(deleteApi)"
            >Delete</el-button>
        </div>
        <!-- 右边工具栏:查导筛 -->
        <el-input
            v-if="buttonVisible.searchButton"
            class="search-input"
            size="mini"
            placeholder=""
            v-model="searchContent"
            :clearable="true"
            @clear="$emit('getTable')"
            @change="handleSearchInputChange"
            @keyup.enter.native="handleSearchInputChange(searchContent)"
        ><i
            slot="prefix"
            class="el-input__icon el-icon-search"
            title="Search"
            @click="handleSearchInputChange(searchContent)"
        ></i></el-input>  
        <el-dropdown style="margin-right: 10px">
            <el-button 
                v-if="buttonVisible.exportButton" 
                title="Export" 
                size="mini" 
                icon="el-icon-download" 
                circle
            ></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="exportExcel(tableName)">Export All</el-dropdown-item>
                <el-dropdown-item>Export Selected</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!-- <el-popover v-model="popoverVisible">
            <div style="font-size:8px;">Arrange Columns<el-divider></el-divider></div>
            <el-checkbox-group v-model="selectedColumn">
                <div v-for="item in columnData">
				    <el-checkbox
                        :key="item.prop"
                        :label="item.prop"
                    >{{ item.label }}</el-checkbox>
                </div>
			</el-checkbox-group>
            <div style="text-align: right; margin-top: 10px">
                <el-button size="mini" type="text" @click="popoverVisible = false">Cancel</el-button>
                <el-button type="primary" size="mini" @click="popoverOk()">OK</el-button>
            </div>
            <el-button 
                v-if="buttonVisible.arrangeButton" 
                slot="reference" 
                title="Arrange Columns"
                size="mini" 
                icon="el-icon-menu" 
                circle
            ></el-button>
        </el-popover> -->
        <!-- 导入数据对话框 -->
        <el-dialog 
            title="Import" 
            :visible.sync="importVisible"
            width="480px"
        >
        <el-upload :action="uploadApi">
            <el-button type="success">Upload Template</el-button>
            <el-button size="mini" type="text" @click="downloadTemplate()">Download Template</el-button>
            <div slot="tip" style="margin-top:15px"><i class="el-icon-s-opportunity" style="color:#e6a23c"></i>
            You can download the template first to fill the content and then upload the completed template to complete import data.</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
            <el-button @click="importVisible = false" icon="el-icon-close">Close</el-button>  
        </div>         
        </el-dialog>
        <el-dialog 
            title="Cart" 
            :visible.sync="cartVisible"
            width="580px"
        ><el-table :data="cartData" size="mini">
            <el-table-column prop="fileName" label="File"></el-table-column>
            <el-table-column label="Operation">
                <template slot-scope="scope">
                    <el-button title="Delete" type="text" icon="el-icon-circle-close" style="color:#F56C6C"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="">Clear Cart</el-button>
            <el-button type="success" size="mini" @click="newVisible=true">Create Dataset</el-button>
            <el-button type="primary" size="mini" @click="">Download</el-button>
        </div>
        </el-dialog>
        <el-dialog title="Create Dataset" :visible.sync="newVisible" width="580px" @close="closeNew">
        <el-form :model="newform" :rules="formRules" ref="newForm" label-position="top" size="mini">
            <el-form-item label="Dataset ID" prop="datasetId">
                <el-input v-model="newform.datasetId"></el-input>
            </el-form-item>
            <el-form-item label="Dataset Name" prop="datasetName">
                <el-input v-model="newform.datasetName"></el-input>
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
import { get, post } from '@/request/http'
import { utils, write } from 'xlsx'
import FileSaver from 'file-saver'

export default {
    name: 'TableTools',
    data() {
        return {
            //购物车对话框是否可见
            cartVisible: false,
            //创建数据集对话框是否可见
            newVisible: false,
            //导入对话框是否可见
            importVisible: false,
            //搜索内容
			searchContent: '',
            //表格列显隐弹出框
            // popoverVisible: false,
            //表格被选中的列
            // selectedColumn: this.$store.getters.selectedColumnList,
            //购物车中的数据
            cartData: [],
            //新增数据集表单
            newform: {
                datasetId: '',
                datasetName: '',
            },
            //新增表单验证规则
            formRules: {
                datasetId: [{ required: true, message: 'Please input dataset ID!', trigger: 'blur' }],
                datasetName: [{ required: true, message: 'Please input dataset Name!', trigger: 'blur' }],    
            },
        }     
    },
    props: {
        //表格工具的控制
        buttonVisible: {
            required: true
        },
        //上传导入模板的接口地址
        uploadApi: '',
        //删除表格所选行的接口地址
        deleteApi: '',
        //导出表格的名字
        tableName: '',
        //表格列显隐的筛选项
        // columnData: {
        //     type: Array,
        //     required: true
        // },
    },
    methods: {
        /**
        * 添加/下载数据集到购物车
        * 
        */
        addFile() {
            const selectedRows = this.$store.state.tableList.selectedRows
            if (selectedRows.length === 0) {
                this.$message({
                    message: 'Please select file to cart!',
                    type: 'warning'
                });
                return false;
            }
            // this.cartData = this.$store.state.tableList.selectedRows[0]
            
        },
        /**
        * 提交新增表单确定按钮事件
        * @param {string} formName 新增表单ref
        */
        submitForm(formName) {          
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.newVisible = false
                    newDataset(this.newform).then((res) => {                      
                        if (res.success) {
                            this.$message.success('Add data successfully!')
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
        * 新增表格内容
        * 
        */
        newItem() {
            this.$emit('newDialog')
        },
        /**
        * 下载导入数据的模板
        * 
        */
        downloadTemplate () {
            window.location.href="/downloadTemplate"
        },
        /**
        * 修改表格内容
        * 
        */
        updateTable() {
            const selectedRows = this.$store.state.tableList.selectedRows
            if (selectedRows.length === 0) {
                this.$message({
                    message: 'Please select one item to edit!',
                    type: 'warning'
                });
                return false;
            }  else if (selectedRows.length > 1) {
                this.$message({
                    message: 'Only one item is allowed to edit at a time!',
                    type: 'warning'
                });
                return false;
            }
            this.$emit('editDialog')
        },
        /**
        * 批量删除表格选中的行
        * 
        */
        deleteBatch(api) {
            const selectedRows = this.$store.state.tableList.selectedRows
            if (selectedRows.length === 0) {
                this.$message({
                    message: 'Please select item to delete!',
                    type: 'warning'
                });
                return false;
            }          
            this.$confirm('Are you sure to delete?', 'Confirmation', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                post(api, {rows: JSON.stringify(selectedRows)}).then((res) => {        
                    if (res.success) {
                        this.$message.success('Deleted successfully!')
                        this.$emit('getTable')
                    } else {
                        this.$message.error('Delete failed!' + res.message)
                    }
                })
            }).catch(() => {
                return false;
            })
        },
        /**
		* 搜索输入框搜索事件
		* @param {string} value 搜索内容
		*/
		handleSearchInputChange(value) {
			if (value === '') {
				this.$emit('getTable')
			} else {
				this.$emit('getSearchTable', value)
			}
		},
        /**
		* 导出表格数据
		* @param {string} tableName 表格名字
		*/
        exportExcel(tableName) {
            var xlsxParam = { raw: true }
            // var table = document.querySelector('#tabledemo').cloneNode(true)
            // table.removeChild(table.querySelector('.el-table__fixed'))
            var table = document.querySelector('#tabledemo')
            var wb = utils.table_to_book(table, xlsxParam)
            var wbout = write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
            try {
                FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), tableName + '.xlsx')
            } catch (e) {               
            }
            return wbout
        },
        /**
		* 表格显隐列确定按钮点击事件
		* @description 通过提交mutation更新表格显示列并关闭弹出框
		*/
        popoverOk() {
			this.$store.commit('changeSelectedColumnList', this.selectedColumn)
			this.popoverVisible = false
		},
    },
}
</script>

<style lang="stylus" scoped>
.table-tools-wrapper {
    padding: 16px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .basic-tools {
        flex: 1;
    }
    .search-input {
        margin-right: 12px;
        width: 250px;
        .el-icon-search {
            cursor: pointer;
            font-size: 16px;
            &:hover {
                color: #409EFF;
            }
        }
    }
}
.el-divider--horizontal {
    margin: 8px 0;
}
</style>