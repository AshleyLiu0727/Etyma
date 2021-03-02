import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { IndexRoute, browserHistory } from 'react-router';
import { connect } from 'react-redux';
// 公共面包屑
import { Bcrumb } from '../../component/bcrumb/bcrumb';
import user from './style/user.png'
import styles from './style/home.less';
import DynamicInformation from './DynamicInformation';
import Statistics from './Statistics';
import UploadRoot from './UploadRoot';
import QuickSreach from './QuickSreach';
import QueueAnim from 'rc-queue-anim';

import { Icon, Row, Col, Card, Steps, Button, message,Avatar,Input,List } from 'antd';
const Step = Steps.Step;
const Search = Input.Search;

/* 以类的方式创建一个组件 */
class Main extends Component {
  constructor(props) {
  	super(props);
      this.state = {
           current: 0
      };
  }
  componentWillMount(){
    var usersLevel= localStorage.getItem("usersLevel");
    console.log("usersLevel====",usersLevel);
    this.setState({usersLevel})
  }
	render() {
    var { usersLevel } = this.state;
    const pageHeaderContent = (
      <div className="pageHeaderContent">
        <div className="avatar">
          <Avatar src={user} />
        </div>
        <div className="content">
          <div className="contentTitle">早安，{localStorage.getItem("userName")}，祝你开心每一天！</div>
          <div>中科软 | 信息一部员工</div>
        </div>
      </div>
    );
    const extraContent = (
      <div className="extraContent">
        <div className="statItem">
          <p>所属小组</p>
          <p>{localStorage.getItem("areaName")}</p>
        </div>
        <div className="statItem">
          <p>qq</p>
          <p>{localStorage.getItem("QQ")}</p>
        </div>
      </div>
    );
    var HomeDiv = <div/>
    //（1.管理员权限，2.组长权限，3.浏览权限）
    if(usersLevel == "1" || usersLevel == "2"){
      HomeDiv = <Row>
                  <Col xs={24} sm={24} md={24} lg={12} xl={6}>
                    <Card className="Card2" title="词根审核" extra={<a onClick={()=> browserHistory.push("/RootAudit")}>详情</a>}>
                      <UploadRoot/>
                    </Card>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={12} xl={18}>
                    <Card className="Card2">
                      <p className="sreachText">快速搜索</p>
                        <QuickSreach/>
                      </Card>
                  </Col>
                </Row>
    }else{
      HomeDiv = <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card className="Card2">
                      <p className="sreachText">快速搜索</p>
                        <QuickSreach/>
                      </Card>
                  </Col>
                </Row>
    }
		return (
        <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
            <div key="a">
              <Row>
              	<Col span={24}>
                  <Card className="Card1">
                  <Bcrumb title="首页" />
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={12} xl={12}>{pageHeaderContent}</Col>
                      <Col xs={0} sm={0} md={0} lg={12} xl={12}>{extraContent}</Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div>
            <div key="b">
              {HomeDiv}
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
