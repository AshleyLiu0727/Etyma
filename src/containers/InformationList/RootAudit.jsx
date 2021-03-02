/* ------------------------------------------------------------
    author : fuguolin
    create:2017-09-05
    descreption:运维医院添加
    ------------------------------------------------------------ */
import React,{ Component } from 'react'
import { Row, Col,Menu, Icon,Table, Button,Input,Card,Steps  } from 'antd';
import Data from '../../component/Data';
import QueueAnim from 'rc-queue-anim';
import { hashHistory } from 'react-router';
import RootAdd from './RootAdd';
import styles from './style/InformationListIndex.less';
import InformationListService from '../../services/InformationListService';
import AdvancedSreachService from '../../services/AdvancedSreachService';
const Step = Steps.Step;

class RootAudit extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			menuList:[]
    };
  };
  componentWillMount(){
    var self = this;
		var params = {
      "rootState":3//1.可用，2.不可用，3.审核中
		}
    var returnResult = InformationListService.QueryRootList(params);
		console.log("InformationListService.QueryRootList",returnResult)
		var menuList = returnResult.data;
    self.setState({ menuList });
		if(menuList.length == 0){

		}else{
			//默认第一个选项
	    self.queryRootData(menuList[0].root_name);
		}
  }
	queryRootData(rootName){
    var self = this;
    var params = {
      currentPage:1,
      pageSize:1,
      rootState:3,//1.可用，2.不可用，3.审核中
			rootName:rootName
    }
		console.log("queryRootDataparams=====",params);
    var returnResult = AdvancedSreachService.QueryRootDetail(params);//精确查询
		console.log("returnResult============",returnResult);
    var rootData = returnResult.data;
		console.log("rootData============",rootData[0].root_state);
		var current = "";
		if(rootData[0].root_state == 3){
			current = 2;//正在审核中
			status = "process";
		}else if(rootData[0].root_state == 2){
    	current = 3;//审核不通过
			status = "error";
		}else{
    	current = 3;//审核通过
			status = "finish"
		}
    self.setState({rootData:rootData[0]});
  }
	render = () => {
    const self = this;
		var { menuList,rootData } = self.state;
		return (
      <div>
          <Row>
            <Col xs={24} sm={24} md={24} lg={6} xl={6}>
              <Card className="RootAudit-Card1" title="审核词根列表">
								{
									menuList.map((item, index) => {
										return  (<p key={index}>{item.root_name}（{item.root_state}）</p>)
									})
								}
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={18} xl={18}>
              <Card className="RootAudit-Card2" title="流程进度">
                  <Steps current={3} status="finish" className="RootAudit-Steps">
                    <Step title="发布" description="发布人：付国霖" />
                    <Step title="审核中" description="审核人：付国霖" />
                    <Step title="审核未通过" description="2018年1月1日" />
                  </Steps>
                  <RootAdd rootData={rootData}/>
              </Card>
            </Col>
          </Row>

			</div>
		);
		}
	}
export default RootAudit;
