<template>
  <div class="Echarts">
    <div id="main" style="width:80vw;height:50vh;"></div>
  </div>
</template>

<script>
let myChart
export default {
  name: 'Echarts',
  data() {
    return {
      data: {},
      articlecout: {
        datax: [],
        datay: [],
      },
    }
  },
  mounted() {
    this.getArticleCount()
  },
  methods: {
    // 获取用户每月发布文章的数目
    async getArticleCount() {
      const username = window.sessionStorage.getItem('nowuser')
      const { data: res } = await this.$http.get('getcount?username=' + username)
      console.log(res)
      if (res.code == 200) {
        console.log(res)
        for (let i = 0; i < 12; i++) {
          this.articlecout.datax[i] = i + 1 + '月'
          for (let j = 0; j < res.obj.length; j++) {
            if (i + 1 == res.obj[j].month) {
              this.articlecout.datay[i] = res.obj[j].count
              break
            } else {
              this.articlecout.datay[i] = 0
            }
          }
        }
        this.myEcharts()
        return this.$message.success(res.message)
      } else {
        return this.$message.error(res.message)
      }
    },
    myEcharts() {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose()
      }
      // 基于准备好的dom，初始化echarts实例
      myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: ' 每月发文数量（单位为:篇）',
          x: 'center',
        },
        tooltip: {
          //提示框组件
          trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        color: ['#c23531', '#2f4554', '#61a0a8'],
        xAxis: {
          data: this.articlecout.datax,
          axisTick: { show: false },
        },
        yAxis: {},
        series: [
          {
            name: '发文数量',
            type: 'bar',
            data: this.articlecout.datay,
          },
        ],
      }
      //清空画布,防止缓存
      myChart.clear()
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)

      //根据窗口的大小变动图表 --- 重点
      window.onresize = function () {
        myChart.resize()
      }
    },
  },
  // mounted() {
  // 为什么这里获取不到数据
  //   console.log(this.data)
  //   this.myEcharts()
  // },
}
</script>

<style>
</style>
