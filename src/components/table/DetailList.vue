<template>
<div class="detail-wrapper">
    <el-descriptions :column="1" direction="horizontal" size="mini">  
        <template slot="title">
            <i :class="titleClass"></i>
            <span>{{ title }}</span>
        </template>
        <el-descriptions-item  
            v-for="(item, index) in columnData" 
            :key="index"
            :label="item.label" 
            :labelStyle="{'color':'#909399'}"
        >
            <span v-for="temp in tempData">{{ temp[item.prop] }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="Files" :labelStyle="{'color':'#909399'}">
            <el-upload
                :action="uploadFiles"
                :before-remove="beforeRemove"
                multiple
                :file-list="fileList"
            >
            <el-button title="Upload" type="primary" size="mini" icon="el-icon-upload">Upload Files</el-button>
            </el-upload>
        </el-descriptions-item>
    </el-descriptions>
</div>
</template>

<script>
export default {
    name: "DetailList",
    props: {
        title: '',
        titleClass: '',
        columnData: {
            type: Array,
            required: true
        },
        tempData: {
            type: Array,
            required: true
        },
        //上传文件的接口地址
        uploadFiles: '',
    }
}
</script>

<style lang="stylus" scoped>
>>>.el-descriptions__header{
    background-image: linear-gradient(190deg, #e5f6ff, #fdfeff);
    border-bottom: 1px solid #eee;
    margin-bottom: 0;
    height: 69px;
    border-left: 1px solid #eee;
    color: #666666;
}
>>>.el-descriptions__body {
    height: calc(100vh - 220px);
    border-left: 1px solid #eee;
    background-image: linear-gradient(190deg, #fdfeff, #e5f6ff);
}
</style>