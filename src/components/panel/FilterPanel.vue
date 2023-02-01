<template>
<div>
    <el-collapse v-model="activeNames" style="border: 1px solid #ddd;">
        <el-collapse-item title="Search Files" name="searchfile">
            <el-input
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
        </el-collapse-item>
        <el-collapse-item  
            v-for="item in filterList"                  
            :title="item.title" 
            :name="item.id" 
            :key="item.id"              
        >
            <el-checkbox-group 
                v-model="checkedOptions"
                @change="changeCheckbox"
            >
                <div v-for="temp in item.options" class="item">
                    <el-checkbox :label="temp.id" :key="temp.id">{{ temp.name }}</el-checkbox>
                    <a class="item-count">{{ temp.value }}</a>
                </div>
            </el-checkbox-group>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    name: 'FilterPanel',
    data() {
        return {
            searchContent: '',
            checkedOptions: [],
        }
    },
    props: {
        //筛选类目列表
        filterList: {
            type: Array,
            required: true
        },
    },
    computed: {
        //设置筛选面板全部展开
        activeNames() {
            let activeNames = []
            activeNames.push('searchfile')
            for(var i=0; i<this.filterList.length; i++){
                activeNames.push(this.filterList[i].id)
            }
            return activeNames
        }
    },
    methods: {
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
		* 多选框状态发生变化时的事件
		* @param {[]} val 多选框选中的值列表
		*/
        changeCheckbox(val) {
            console.log(val)

        },
    },
}
</script>

<style lang="stylus" scoped>
>>>.el-collapse-item__header {  
    background-image: linear-gradient(190deg, #fdfeff, #e5f6ff);
    color: #606266;
    border: none;
    padding-left: 20px;  
    font-weight: bold;
    height: 40px;
}
>>>.el-collapse-item__content {
    padding: 10px 10px;
}
.search-input {
    width: 250px;
    .el-icon-search {
        cursor: pointer;
        font-size: 16px;
        &:hover {
            color: #409EFF;
        }
    }
}
.item{
    display: flex;
    padding: 2px 0;
    .item-count {
        margin-left: auto;
        background-image: linear-gradient(190deg, #fdfeff, #e5f6ff);
        color: #409EFF;
        font-size: 12px;       
        height: 20px;
        cursor: pointer    
    }
}
</style>