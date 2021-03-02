import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import StatisticAnalysisService from '../../services/StatisticAnalysisService';
import styles from './style/StatisticAnalysis.less';
import { Icon, Row, Col, Card, Tag, Divider  } from 'antd';


/* 以类的方式创建一个组件 */
class StatisticNumber extends Component {
 	componentWillMount(){
    var self = this;
    var returnResult = StatisticAnalysisService.QueryCurdStat({});
    console.log("returnResult===",returnResult);
    var total = returnResult.total;
    var CurdStat = returnResult.data;
		var CurdData =[];
    var operationTotal = "";
		CurdStat.forEach((item,index)=>{
			var operation = ""
			if(item.operation == 'insertRoot'){
				operation = "新增"
        operationTotal = item.total;
			}else if(item.operation == 'updateRoot'){
				operation = "修改"
			}else if(item.operation == 'delete'){
				operation = "删除"
			}
			CurdData.push({
				operation:operation,
        total:item.total,
        count_root:item.count_root,
        proportion:parseInt(item.count_root/item.total*100)
			});

		})
    console.log("CurdData========",CurdData);
		//总词根数
		CurdData.push({
      operation:"总词根数",
      total:total,
      count_root:operationTotal,
      proportion:parseInt(operationTotal/total*100)
    })
    self.setState({CurdData});
  }
	render() {
    var self = this;
		var { CurdData } = self.state;
		return (
        <Row>

					{
						CurdData.map((item,index)=>{
							return (
								<Col xs={24} sm={24} md={24} lg={12} xl={6} key={index}>
			            <div className="StatisticNumber">
			              <Card className="StatisticAnalysis-Card2">
			                <p style={{color:'#87d068'}}>{item.operation}词根数</p>
			                <p className="StatisticAnalysis-p1">{item.total}</p>
			                <p>本月{item.operation}：{item.proportion}%</p>
			                <Divider/>
			                <p className="StatisticAnalysis-p2">本月{item.operation}数目：{item.count_root}个</p>
			              </Card>
			            </div>
			          </Col>
							)
						})
					}
        </Row>
		);
	}
}

export default StatisticNumber;
// <Col xs={24} sm={24} md={24} lg={12} xl={6}>
// 	<div className="StatisticNumber">
// 		<Card className="StatisticAnalysis-Card2">
// 			<p style={{color:'#87d068'}}>总词根数</p>
// 			<p className="StatisticAnalysis-p1">126,560</p>
// 			<p>本月新增：5%</p>
// 			<Divider/>
// 			<p className="StatisticAnalysis-p2">本月新增数目：500个</p>
// 		</Card>
// 	</div>
// </Col>
// <Col xs={24} sm={24} md={24} lg={12} xl={6}>
// 	<div className="StatisticNumber">
// 		<Card className="StatisticAnalysis-Card2">
// 			<p style={{color:'#2db7f5'}}>新增词根数</p>
// 			<p className="StatisticAnalysis-p1">1200</p>
// 			<p>本月新增：5%</p>
// 			<Divider/>
// 			<p className="StatisticAnalysis-p2">本月新增数目：500个</p>
// 		</Card>
// 	</div>
// </Col>
// <Col xs={24} sm={24} md={24} lg={12} xl={6}>
// 	<div className="StatisticNumber">
// 		<Card className="StatisticAnalysis-Card2">
// 			<p style={{color:'#108ee9'}}>修改词根数</p>
// 			<p className="StatisticAnalysis-p1">460</p>
// 			<p>本月新增：5%</p>
// 			<Divider/>
// 			<p className="StatisticAnalysis-p2">本月修改数目：500个</p>
// 		</Card>
// 	</div>
// </Col>
// <Col xs={24} sm={24} md={24} lg={12} xl={6}>
// 	<div className="StatisticNumber">
// 		<Card className="StatisticAnalysis-Card2">
// 			<p style={{color:'#f50'}}>删除词根数</p>
// 			<p className="StatisticAnalysis-p1">251</p>
// 			<p>本月新增：5%</p>
// 			<Divider/>
// 			<p className="StatisticAnalysis-p2">本月删除数目：500个</p>
// 		</Card>
// 	</div>
// </Col>
//
// <Col xs={24} sm={24} md={24} lg={12} xl={6}>
//   <div className="StatisticNumber">
//     <Card className="StatisticAnalysis-Card2">
//       <p style={{color:'#87d068'}}>总词根数</p>
//       <p className="StatisticAnalysis-p1">126,560</p>
//       <p>本月新增：5%</p>
//       <Divider/>
//       <p className="StatisticAnalysis-p2">本月新增数目：500个</p>
//     </Card>
//   </div>
// </Col>
