import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Router, Route, IndexRoute, browserHistory, History, Link } from 'react-router';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';
import styles from './style/InformationListIndex.less';
import InformationListService from '../../services/InformationListService';
import ColItem from '../../component/Form/ColItem';
import Data from '../../component/Data';
import QuickSreach from '../home/QuickSreach';
import { Icon, Row, Col, Card, Button,Input,Menu,Divider,Table,Modal,Form,Pagination  } from 'antd';
const { TextArea } = Input;
const createForm = Form.create;
const FormItem = Form.Item;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const confirm = Modal.confirm;

/* 以类的方式创建一个组件 */
class InformationListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: ['sub1'],
      menuList:[],
      rootData:[],
      visible:false,
      total:0
    };
  };
  componentWillMount(){
    var self = this;
    var returnResult = InformationListService.QueryInformationList({areaState:1});
    var menuList = returnResult.data;
    console.log("menuList==========",menuList);
    self.setState({ menuList });
    //默认第一个选项
    self.queryRootData(menuList[0].pk_area);
  }
  queryRootData = (pk_area) =>{
    console.log("fkArea=============",pk_area);
    var self = this;
    var params = {
      currentPage:1,
      pageSize:10,
      rootState:1,//1.可用，2.不可用，3.审核中
      fkArea:pk_area
    }
    var rootDataResult = InformationListService.QueryRootList(params);
    var rootData = rootDataResult.data;
    var total = rootDataResult.total;
    console.log("rootData=====",rootData);
    self.setState({rootData,total});
  }
  rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  setModal1Visible = (visible) =>{
    var self = this;
    console.log("123123");
    self.setState({visible});
  }
  handleOk = () => {
    var self = this;
    var params = {
      areaCode:"领域代码",
      areaName:"领域名称",
      creator:"创建者id",
      resume:"摘要",
      description:"描述",
      version:"版本号(v1.0)"
    }
    var rootDataResult = InformationListService.AddArea(params);
    self.setState({visible: false});
  };
  handleClick = (e) => {
    var self = this;
    console.log('click ', e.key);
    self.queryRootData(e.key);
  }
  // 提交表单
  handleSubmit = (e) => {
    const self = this;
    let values;
    e.preventDefault();
    self.props.form.validateFieldsAndScroll((errors, fieldsValue) => {
      console.log("表单验证errors {}",errors);
      console.log("表单验证fieldsValue {}",fieldsValue);
      if(errors){
        global.$publicMethod.Hint("提示",'info',"请填写表单必填项");
        return;
      }
      let values = {
        ...fieldsValue,
        creator:global.userInfo.userName
      }
      InformationListService.AddArea(values);
      self.setState({visible: false});
    });
  };
  PaginationOnChange=(current, pageSize)=>{
    console.log(current, pageSize);
    this.queryClientUser(current, pageSize);
  }
	render() {
    var self = this;
    var { menuList, rootData, visible, total} = self.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 17 } };
    const columns = [
        { title: <p className="table-p">词根代码</p>,dataIndex: 'root_code',width: '250px' },
        { title: <p className="table-p">词根名称</p>,dataIndex: 'root_name',width: '250px' },
        { title: <p className="table-p">版本号</p>,dataIndex: 'version',width: '250px' },
        { title: <p className="table-p">摘要</p>,dataIndex: 'resume',width: '450px' },
        { title: <p className="table-p">操作</p>,key: 'operation',width: '150px',
        render: (text, record) => (
          <span>
            <a onClick={()=> { browserHistory.push('/AdvancedSreachIndex/'+record.rootName) }}>详情</a>
            {/*<Divider type="vertical" />
            <a onClick={()=>this.confirmDelete(record.username)}>删除</a>
            <Divider type="vertical" />
            <a style={{}} onClick={()=>this.confirmReset(record.username)}>修改</a>*/}
          </span>
        )}
    ];
		return (
        <QueueAnim delay={0} className="queue-simple" type={['right', 'left']}>
            <div key="a">
              <Row>
              	<Col span={24}>
                  <Card className="Advanced-Card" key="e">
                    <p className="Advanced-sreachText">词根搜索</p>
                    <QuickSreach/>
                  </Card>
                </Col>
              </Row>
            </div>
            <div key="b">
                <Row>
                	<Col xs={24} sm={24} md={6} lg={6} xl={4}>
                    <div className="InformationListIndex-fixed">
                      <div className="InformationListIndex-Card0">
                        <Row>
                          <Col xs={16} sm={16} md={16} lg={16} xl={18}>领域列表</Col>
                          <Col xs={8} sm={8} md={8} lg={8} xl={6}>
                            <span className="InformationListIndex-span">
                              <a onClick={()=>{self.setModal1Visible(true)}}>新增</a>
                              {/*&nbsp;|&nbsp;
                              <a onClick={()=>{self.setModal1Visible(true)}}>修改</a>*/}
                            </span>
                          </Col>
                        </Row>
                      </div>
                      <Menu
                        mode="inline"
                        openKeys={self.state.openKeys}
                        onClick={this.handleClick}
                        defaultOpenKeys={['sub1','sub2','sub3']}
                        style={{ paddingLeft:5}}
                        className="InformationListIndex-Card1"
                      >
                        {
                          menuList.map((item, index) => {
                            return  (<Menu.Item key={item.pk_area}><a className="Menu-p">{item.area_name}</a></Menu.Item>)
                          })
                        }
                      </Menu>
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={18} lg={18} xl={20}>
                    <Card className="InformationListIndex-Card4">
                      <Row>
                        <Col xs={0} sm={0} md={18} lg={20} xl={22}></Col>
                        <Col xs={24} sm={24} md={6} lg={4} xl={2}>
                          <Button type="primary" onClick={()=>{ browserHistory.push('/RootAdd') }} className="addButton">新增词根</Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}><Table columns={columns} dataSource={rootData} pagination={false} size="middle" /></Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Pagination showSizeChanger onChange={self.PaginationOnChange} defaultCurrent={1} total={total} className="Pagination"/>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>
                <Modal title="请填写领域信息" className="InformationListModal"  okText="确定" cancelText="取消" visible={visible} footer={null}>
                  <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
                      <QueueAnim type="left">
                        <div>
                        <ColItem
                          LeftColName={"领域代码"}
                          LeftItem={getFieldDecorator('areaCode') (<Input placeholder="请填写领域代码" required/>)}
                          rightColName={"领域名称"}
                          rightItem={ getFieldDecorator('areaName') (<Input placeholder="请填写领域名称" required/>)}
                        />
                        <ColItem
                          LeftColName={"领域摘要"}
                          LeftItem={getFieldDecorator('resume')(<Input placeholder="请填写领域摘要" required />)}
                          rightColName={"版本号"}
                          rightItem={getFieldDecorator('version')(<Input placeholder="请填写版本号" required />)}
                        />
                        <Row>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <FormItem style={{marginLeft:-10}} {...formItemLayout} label={"详细描述:"} hasFeedback >
                              {getFieldDecorator('description')(<TextArea placeholder="请填写描领域述" autosize={{ minRows: 2, maxRows: 6 }} required/>)}
                            </FormItem>
                          </Col>
                        </Row>
                        <Row>
                          <Col offset={6} span={18}>
                            <Button type="primary" className="UserAdd-button" htmlType="submit">提交</Button>
                            <Button className="UserAdd-button" onClick={() =>{ self.props.form.resetFields() }}>清除</Button>
                            <Button className="UserAdd-button" onClick={()=>{ self.setState({visible: false}) }}>取消</Button>
                          </Col>
                        </Row>
                        </div>
                      </QueueAnim>
                  </Form>
        				</Modal>
                {/*<a href="#top" target="_self" className="returnTop"><Button type="primary" className="returnTopButton">UP</Button></a>*/}
            </div>
        </QueueAnim>
		);
	}
}
InformationListIndex = createForm()(InformationListIndex);
export default InformationListIndex;
