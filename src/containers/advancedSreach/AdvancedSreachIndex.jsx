import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import AdvancedSreachService from '../../services/AdvancedSreachService';
import InformationListService from '../../services/InformationListService';
import QuickSreach from '../home/QuickSreach';
import SreachResult from './SreachResult';
import styles from './style/AdvancedSreachIndex.less';
import QueueAnim from 'rc-queue-anim';
import { Icon, Row, Col, Card, Button, message,Avatar,Input,Menu,Divider,Table,Pagination,Tabs,Radio,Checkbox,Select  } from 'antd';
const TabPane = Tabs.TabPane;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
function callback(key) {
  console.log(key);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
/* 以类的方式创建一个组件 */
class Main extends Component {
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  state = {
    openKeys: ['sub1'],
    menuList:[],
  };
  componentWillMount(){
    var self = this;
    var InformationListResult = InformationListService.QueryInformationList({areaState:1});
    var menuList = InformationListResult.data;
    self.setState({menuList});
    var rootData = this.props.params;
    console.log("rootData====================",rootData);
    if(rootData == undefined || rootData == "" || JSON.stringify(rootData) == "{}" ){
      console.log("----------------");
      var params ={ currentPage:1,pageSize:10,rootState:1 }
      var returnResult = AdvancedSreachService.QueryRootDetail(params);
      rootData = returnResult.data;
    }else{
      rootData = JSON.parse(rootData.rootData);
      console.log("rootData",rootData);
    }
    self.setState({rootData});
  }
  RadioGrouponChange=(e) => {
    var self = this;
    console.log('checked = ', e.target.value);
    var params ={
      currentPage:1,
      pageSize:5,
      rootState:1,//1.可用，2.不可用，3.审核中,
      fkArea:e.target.value
    }
    console.log("详细查询词根，参数为",params);
    var returnResult = AdvancedSreachService.QueryRootDetail(params);
    var rootData = returnResult.data;
    self.setState({rootData});
  }
	render() {
    var self = this;
    var { menuList ,rootData} = self.state;
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
      { label: 'Orange', value: 'Orange' },
    ];
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
		return (
        <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
          <div key="a">
              <Row>
                <Col span={24}>
                  <Card className="Advanced-Card" key="e">
                    <p className="Advanced-sreachText">高级搜索</p>
                    <QuickSreach />
                  </Card>
                  <Card className="Advanced-div" key="f">
                    <Tabs className="Tabs" defaultActiveKey="1" onChange={callback}>
                        <TabPane className="TabPane" tab="词根" key="1">
                          <Card className="Advanced-Card2">
                            <div>
                              <span>所属领域：</span>
                              <span>
                                <RadioGroup onChange={self.RadioGrouponChange} defaultValue="a">
                                    {
                                      menuList.map((item, index) => {
                                        return  (<RadioButton className="RadioButton" key ={index} value={item.pk_area}>{item.area_name}</RadioButton>)
                                      })
                                    }
                                </RadioGroup>
                              </span>
                            </div>
                          </Card>
                          <Card className="Advanced-Card3" loading={false}>
                            <SreachResult rootData={rootData}/>
                          </Card>
                        </TabPane>
                        <TabPane className="TabPane" tab="标签" key="2"><Card className="Advanced-Card2">暂未开放</Card></TabPane>
                        {/*<TabPane className="TabPane" tab="领域" key="3"><Card className="Advanced-Card2">123</Card></TabPane>*/}
                    </Tabs>
                  </Card>
                </Col>
              </Row>
          </div>
        </QueueAnim>
		);
	}
}

export default Main;
// <div className="Advanced-div2">
//   <span>所属标签：</span>
//   <span>
//   <Select
//     mode="multiple"
//     style={{ width: '50%' }}
//     placeholder="Please select"
//     defaultValue={['a10', 'c12']}
//     onChange={handleChange}
//   >
//     {children}
//   </Select>
//   </span>
// </div>
