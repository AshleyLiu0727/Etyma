import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import user from './style/user.png'
import styles from './style/home.less';
import { Icon, Row, Col, Radio, Card } from 'antd';
import { browserHistory } from 'react-router';
import HomeService from '../../services/HomeService';
// 引入折线图
import PieChart from '../../component/echarts/PieChart';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

/* 以类的方式创建一个组件 */
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieList:[]
    }
  }
  componentWillMount(){
    var self = this;
    var returnResult = HomeService.QueryPieChart({});
    var totalCount = returnResult.total;
    var pieList = returnResult.data;
    self.setState({pieList,totalCount});
  }
  pieCount(value){
    var self = this;
    return parseInt(value/self.state.totalCount*100)
  }
	render() {
    var { pieList,totalCount } = this.state;
		return (
        <Card className="Card4" extra={<a onClick={()=> browserHistory.push("/StatisticAnalysis")}>更多</a>} title={
          <div>
            <p>领域词根分布情况</p>
          </div>}
        >
          <Row className="pie-rootDiv">
            <Col xs={16} sm={14} md={16} lg={20} xl={19} className="pie-main"><PieChart pieList={pieList}/></Col>
            <Col xs={8} sm={10} md={8} lg={4} xl={5}>
              <div className="pie-div">
                {
                  pieList.map((item, index) => {
                    return(
                      <div key={index}>
                        <p className="pie-p">{item.area_name} <span className="pie-span">|{this.pieCount(item.root_count)}%</span> {item.root_count}个</p><br/>
                      </div>
                    )
                  })
                }
              </div>
            </Col>
          </Row>
        </Card>
		);
	}
}

export default Statistics;
