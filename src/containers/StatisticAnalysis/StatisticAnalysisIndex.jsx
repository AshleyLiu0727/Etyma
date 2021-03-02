import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import StatisticAnalysisService from '../../services/StatisticAnalysisService';
import styles from './style/StatisticAnalysis.less';
import { Icon, Row, Col, Card, Tag, Divider  } from 'antd';
import StatisticNumber from './StatisticNumber';
import BarChart from '../../component/echarts/BarChart';
import DynamicInformation from '../home/DynamicInformation';
import Statistics from '../home/Statistics';
import QueueAnim from 'rc-queue-anim';

/* 以类的方式创建一个组件 */
class Main extends Component {

	componentWillMount(){
    var self = this;
    var BarData = StatisticAnalysisService.QueryBarGraph({});
		console.log("BarData=============",BarData);
    self.setState({BarData});
  }
	render() {
    var self = this;
		var { BarData } = self.state;
		return (
        <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
          <div key="a">
          	<StatisticNumber/>
					</div>
					<div key="b">
          	<BarChart BarData = {BarData}/>
					</div>
					<div key="c">
	          <Row>
	            <Col xs={24} sm={24} md={24} lg={12} xl={14}>
	              <Card title= "领域词根最新修改动态" className="Card3">
	                <DynamicInformation/>
	              </Card>
	            </Col>
	            <Col xs={24} sm={24} md={24} lg={12} xl={10}>
	              <Statistics/>
	            </Col>
	          </Row>
					</div>
        </QueueAnim>
		);
	}
}

export default Main;
