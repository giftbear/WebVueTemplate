<template>
    <div class="pie-container">
	    <div 
            v-for="item in filterList" 
            :key="item.id" 
            :id="item.id" 
            style="height:150px;width:20%;"
        ></div>
    </div>
</template>

<script>
export default {
    name: 'Pie',
    props: {
        //筛选类目列表
        filterList: {
            type: Array,
            required: true
        },
    },
    methods: {
        drawPie() {
            for(var i=0; i<this.filterList.length; i++){
                let new_data = this.filterList[i].options
                let pieId = this.filterList[i].id          
                this.$echarts.init(document.querySelector('#'+ pieId)).setOption({
                    title: {
                        text: this.filterList[i].title,
                        left: 'center',
                        textStyle: {
                            fontSize: 12,
                            fontFamily: 'Arial',
                            fontWeight: 'normal',
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        confine: true, //将tooltip限制在图表内显示
                        formatter: function(params) {
                            return `<span>${params.data.name}</span><br/><span>${params.data.value}</span>`
                        }
                    },
                    series: [
                        {
                            type: "pie",
                            radius: '70%',
                            data: new_data,
                            label: {
                                show: false,
                            },       
                            labelLine: {
                                show: false,                      
                            },
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                        }
                    ]
                })
            }
        },
    },
    mounted () {
        this.drawPie()
    },
}
</script>

<style lang="stylus" scoped>
.pie-container {
    display:flex;
    justify-content:flex-start;
    flex-wrap:wrap;
    width:100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);    
}
</style>