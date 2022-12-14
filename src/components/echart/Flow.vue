<template>
    <div id="flow" style="height:100%;width:100%;"></div>
</template>

<script>
export default {
    name: 'Flow',
    props: {
        //流程列表
        flowList: {
            type: Array,
            required: true
        },
    },
    methods: {
        drawFlow(){
            var _data = []
            var _link = []
            for(var i=0; i<this.flowList.length; i++){
                let dic = {'name': this.flowList[i],'x': 10,'y':10+10*i}
                let link_dict = {'source': this.flowList[i],'target': this.flowList[i+1]}
                _data.push(dic)
                _link.push(link_dict)
            }
            let flowChart = this.$echarts.init(document.querySelector('#flow'))
            let option = {
                series: [{
                    type: 'graph',
                    roam: true,
                    symbol: 'roundRect',    
                    symbolSize: [210,30],               
                    edgeSymbol: ['none', 'none'],
                    edgeSymbolSize: 10,
                    label: {
                        show: true,
                        color: '#409EFF',
                        fontFamily: 'Arial',                       
                    },
                    itemStyle: {
                        color: '#ecf5ff',               
                    },
                    lineStyle: {
                        color: '#409EFF',
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#d3e8f2',
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: _data,
                    links: _link,
                }]
            }
            flowChart.setOption(option)
            // flowChart.setOption({
            //     graphic: this.$echarts.util.map(option.series[0].data, (dataItem,dataIndex)=>{
            //         var tmpPos=flowChart.convertToPixel({'seriesIndex': 0},[dataItem.x,dataItem.y])
            //         return {
            //             type: 'circle',
            //             position: tmpPos,
            //             shape: {
            //                 r:15,
            //             },
            //             invisible: true,
            //             draggable: true,
            //             z: 100, //使图层在最高层
            //             ondrag: this.$echarts.util.curry(onPointDragging, dataIndex)                      
            //         }                    
            //     })
            // })
            // window.addEventListener('resize', updatePosition)
            // function updatePosition() {  //更新节点定位的函数
            //     flowChart.setOption({
            //         graphic: this.$echarts.util.map(option.series[0].data, (item, dataIndex)=> {
            //             var tmpPos=flowChart.convertToPixel({'seriesIndex': 0},[item.x,item.y])
            //             return {
            //                 position: tmpPos
            //             }
            //         })
            //     })
            // }
            // function onPointDragging(dataIndex) {  //节点上图层拖拽执行的函数
            //     var tmpPos=flowChart.convertFromPixel({'seriesIndex': 0},this.position)
            //     option.series[0].data[dataIndex].x = tmpPos[0]
            //     option.series[0].data[dataIndex].y = tmpPos[1]
            //     flowChart.setOption(option)
            //     updatePosition()
            // }
            flowChart.on('click', params =>{
                if(params.dataType=="node"){
                    this.$emit("stepClick",params.data.name)
                }
            })
        },
    },
    mounted () {
        this.drawFlow()
    },
}
</script>