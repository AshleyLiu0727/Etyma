import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import user from './style/user.png'
import styles from './style/home.less';
import { Icon, Row, Col, Card,Avatar,Input,List } from 'antd';
import { browserHistory } from 'react-router';
import HomeService from '../../services/HomeService';
/* 以类的方式创建一个组件 */
class DynamicInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DynamicList:[]
    }
  }
  componentWillMount(){
    var self = this;
    var DynamicList = HomeService.QueryDynamicInformation({});
    console.log("DynamicList========",DynamicList);
    var newDynamicList =[];
    for(var index = 0;index<5;index++){
      var item = DynamicList.data[index];
      var operationName="";
      switch (item.operation) {
        case "insertRoot":operationName = "新增词根";break;
        case "deleteRoot":operationName = "删除词根";break;
        case "updateRoot":operationName = "修改词根";break;
        case "insertArea":operationName = "新增领域";break;
        case "deleteArea":operationName = "删除领域";break;
        case "updateArea":operationName = "修改领域";break;
        default:expression:operationName = "未知操作";break;
      }
      console.log("operationName===",operationName);
      if(item.operation.substr(6,4) == "Root"){
        newDynamicList.push({
          name:item.name,
          gmt_create:item.gmt_create,
          operation:operationName,
          root_name:item.root_name,
          users_name:item.users_name,
        })
      }else{
        newDynamicList.push({
          name:item.name,
          gmt_create:item.gmt_create,
          operation:operationName,
          root_name:item.area_name,
          users_name:item.users_name,
        })
      }

    }
    console.log("newDynamicList====",newDynamicList);
    self.setState({DynamicList:newDynamicList});
  }
  dataDifference(date){
    var day1 = new Date(date);
    var newDay1 = day1.getFullYear();
    console.log("day1=====",newDay1);
    var day2 = new Date();
    return parseInt((day2 - day1) / (1000 * 60 * 60 * 24));
  }
	render() {
    var self = this;
    var { DynamicList } = self.state;
		return (
        <List size="large">
          <div className="activitiesList">
            {
              DynamicList.map((item, index) => {
                return  (
                  <List.Item key={index}>
                  <List.Item.Meta
                    avatar={<Avatar src={user} />}
                    title={
                      <span>
                        <span className="username">{item.users_name}</span>&nbsp;在&nbsp;
                        <span className="event">{item.gmt_create}</span>&nbsp;{item.operation}&nbsp;
                        <a className="event2" onClick={()=>browserHistory.push('/AdvancedSreachIndex')}>{item.root_name}</a>
                      </span>
                    }
                    description={
                      <span className="datetime">
                        {self.dataDifference(item.gmt_create)}天前
                      </span>
                    }
                  />
                </List.Item>)
              })
            }
          </div>
        </List>
		);
	}
}

export default DynamicInformation;
