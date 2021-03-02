import React, { Component } from 'react';
import { Icon, Row, Col, Card, Tag, Divider, Avatar  } from 'antd';
import './style/ChartStyle';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/title';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/graphic';
import 'echarts/lib/component/grid';

class BarChart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        BarChartList:[]
      }
    }
    componentWillMount(){
        var self = this;
        var BarData = self.props.BarData;
        self.setState({ BarData });
    }
    componentDidMount() {
        var self = this;
        var BarData = self.state.BarData;
        var dataAxisData = [];
        var chartData =[];
        BarData.data.forEach((item,index)=>{
          dataAxisData.push(item.creator);
          chartData.push(item.root_count);
        })
        var dataAxis = dataAxisData;
        var data = chartData;
        var yMax = BarData.total;
        var dataShadow = [];

        for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('BarChart'));
        // 绘制图表
        myChart.setOption({
             // title: {
             //      text: '1',
             //      subtext: '2'
             //  },
              xAxis: {
                  data: dataAxis,
                  axisLabel: {
                      inside: true,
                      textStyle: {
                          color: '#fff'
                      }
                  },
                  axisTick: {
                      show: false
                  },
                  axisLine: {
                      show: false
                  },
                  z: 10
              },
              yAxis: {
                  axisLine: {
                      show: false
                  },
                  axisTick: {
                      show: false
                  },
                  axisLabel: {
                      textStyle: {
                          color: '#999'
                      }
                  }
              },
              dataZoom: [
                  {
                      type: 'inside'
                  }
              ],
              series: [
                  { // For shadow
                      type: 'bar',
                      itemStyle: {
                          normal: {color: 'rgba(0,0,0,0.05)'}
                      },
                      barGap:'-100%',
                      barCategoryGap:'40%',
                      data: dataShadow,
                      animation: false
                  },
                  {
                      type: 'bar',
                      itemStyle: {
                          normal: {
                              color: new echarts.graphic.LinearGradient(
                                  0, 0, 0, 1,
                                  [
                                      {offset: 0, color: '#83bff6'},
                                      {offset: 0.5, color: '#188df0'},
                                      {offset: 1, color: '#188df0'}
                                  ]
                              )
                          },
                          emphasis: {
                              color: new echarts.graphic.LinearGradient(
                                  0, 0, 0, 1,
                                  [
                                      {offset: 0, color: '#2378f7'},
                                      {offset: 0.7, color: '#2378f7'},
                                      {offset: 1, color: '#83bff6'}
                                  ]
                              )
                          }
                      },
                      data: data
                  }
              ]
        });
        var zoomSize = 6;
        window.addEventListener("resize", function () {
            myChart.resize();
        });
        myChart.on('click', function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
            myChart.dispatchAction({
                type: 'dataZoom',
                startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            });
        });
    }
    render() {
        var self = this;
        var { BarData } = this.state;
        return (
            <Card className="BarChart-Card">
              <Row className="Bar-rootDiv">
                <Col xs={24} sm={24} md={24} lg={15} xl={17} className="pie-main">
                  <p className="BarChart-p">本月新增词根统计(Top10)</p>
                  <div className="BarChart" id="BarChart"></div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={9} xl={7}>
                  <div className="Bar-div">
                    {
                      BarData.data.map((item,index)=>{
                        if(index%2 == 0){
                          return (
                            <span key={index}>
                              <span className="pie-p">
                                <span className="Avatar">{index+1}  </span>
                                {item.creator} | {item.root_count}个
                              </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                          )
                        }else{
                          return (
                            <span key={index}>
                              <span className="pie-p">
                                <span className="Avatar">{index+1}  </span>
                                {item.creator} | {item.root_count}个
                              </span><br/>
                            </span>
                          )
                        }
                      })
                    }
                  </div>
                </Col>
              </Row>
            </Card>
        );
    }
}

export default BarChart;
