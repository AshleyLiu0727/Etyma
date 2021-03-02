/* ------------------------------------------------------------
    author : fuguolin
    create:2018-01-15
    descreption:词根添加
    ------------------------------------------------------------ */
import React,{ Component } from 'react'
import { Row, Col,Menu, Icon,Table, Button,Input,Form,DatePicker,Radio,Select,Card,Popconfirm  } from 'antd';
import Data from '../../component/Data';
import QueueAnim from 'rc-queue-anim';
import { browserHistory } from 'react-router';
import ColItem from '../../component/Form/ColItem';
import AdvancedSreachService from '../../services/AdvancedSreachService';
import InformationListService from '../../services/InformationListService';
import styles from './style/InformationListIndex.less';
const createForm = Form.create;
const { TextArea } = Input;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const data = [];
data.push({
  key:1,
  territoryType:'数据库',
  name:'',
  type: '',
  length: '',
  required:''
});
data.push({
  key: 2,
  territoryType:"JAVA",
  name: '',
  type: '',
  length: '',
  required:''
});
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? value
      : <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    }
  </div>
);
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '领域应用类型',
      dataIndex: 'territoryType',
      width: '15%',

      render: (text, record) => this.renderColumns(text, record, 'territoryType'),
    }, {
      title: '单词命名',
      dataIndex: 'name',
      width: '20%',
      render: (text, record) => this.renderColumns(text, record, 'name'),
    },  {
      title: '类型',
      dataIndex: 'type',
      width: '15%',
      render: (text, record) => this.renderColumns(text, record, 'type'),
    },{
      title: '长度',
      dataIndex: 'length',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'length'),
    },  {
      title: '是否必填',
      dataIndex: 'required',
      width: '10%',
      render: (text, record) => this.renderColumns(text, record, 'required'),
    },
  ];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  render() {
    return <Table bordered dataSource={this.state.data} columns={this.columns} pagination={false}/>;
  }
}

class RootAdd extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			rootData:[],
      pkRoot:"",
      queryState:false,
    };
  };
  componentWillMount(){
    var self = this;
    var rootData = self.props.rootData;
    if(rootData !=undefined && rootData != ""){
      self.setState({rootData:rootData})
    }
    var usersLevel= localStorage.getItem("usersLevel");
    console.log("usersLevel====",usersLevel);
    this.setState({usersLevel})
  };
  rootAudit(pkRoot,rootState){
		var params = {
			pkRoot:pkRoot,
			rootState:rootState
		}
	  AdvancedSreachService.QueryRootDetail(params);//精确查询
	};
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
      values = {
        ...fieldsValue,
        creator:global.userInfo.userName
      }
      console.log("添加词根服务准备的json {}",values);
      InformationListService.AddRoot(values);
    });
  };
  //清除表单
  clear(){
    this.props.form.resetFields();
  }
	render = () => {
    const self = this;
    var { rootData,pkRoot,usersLevel,queryState } = self.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 17 } };
    var ButtonDiv =<div/>;
    //（1.管理员权限，2.组长权限，3.浏览权限）
    if(usersLevel == "2"){
      ButtonDiv = <Row>
                    <Col xs={24} sm={24} md={24} lg={14} xl={17}></Col>
                    <Col xs={24} sm={24} md={24} lg={10} xl={7}>
                      <Button type="primary" className="RootAdd-button" htmlType="submit">提交</Button>
                      <Button className="RootAdd-button" onClick={() =>{ self.clear() }}>清除</Button>
                      <Button className="RootAdd-button" onClick={()=>{ browserHistory.push("/User") }}>返回</Button>
                    </Col>
                  </Row>
    }else if(usersLevel == "1"){
      ButtonDiv = <Row>
                    <Col offset={16} span={10}>
                      <Button type="primary" className="RootAdd-button" onClick={()=>{self.rootAudit(pkRoot,1)}}>通过</Button>
                      <Button type="primary" className="RootAdd-button" onClick={()=>{self.rootAudit(pkRoot,2)}}>不通过</Button>
                      <Button className="RootAdd-button" onClick={()=>{ browserHistory.push("/User") }}>返回</Button>
                    </Col>
                  </Row>
    }
		return (
      <div className="RootAdd-Div">
          <Form horizontal form={this.props.form} onSubmit={this.handleSubmit}>
              <QueueAnim type="left">
              <Card key="first" className="RootAdd-Card1" title="请填写基本信息">
                <ColItem
                  LeftColName={"词根名称"}
                  LeftItem={getFieldDecorator('rootCode') (<Input placeholder="请填写医院名称" disabled={queryState} required/>)}
                  rightColName={"基本单词"}
                  rightItem={getFieldDecorator('rootName') (<Input placeholder="请填写基本单词" disabled={queryState} required/>)}
                />
                <ColItem
                  LeftColName={"版本号"}
                  LeftItem={ getFieldDecorator('version')(<Input placeholder="请填写版本号" disabled={queryState} required />)}
                  rightColName={"所属领域"}
                  rightItem={ getFieldDecorator('orgLevel')
                              (
                                <Select placeholder="请选择所属领域" required disabled={queryState}>
                                  {Data.AreaList}
                                </Select>
                              )
                            }
                />
                <ColItem
                  LeftColName={"概要描述"}
                  LeftItem={ getFieldDecorator('resume')(<Input placeholder="请填写概要描述" disabled={queryState} required />)}
                />
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <FormItem style={{marginLeft:-10}} {...formItemLayout} label={"详细描述:"} hasFeedback >
                      {getFieldDecorator('description')(<TextArea placeholder="请填写详细描述" autosize={{ minRows: 2, maxRows: 6 }} required/>)}
                    </FormItem>
                  </Col>
                </Row>
              </Card>
              <Card key="second" className="RootAdd-Card1" title="请填写应用领域信息">、
                <p style={{fontSize:18}}>数据库规范:</p>
                <ColItem
                  LeftColName={"缩写规则"}
                  LeftItem={getFieldDecorator('dbAcronym') (<Input placeholder="请填写缩写规则" disabled={queryState} required/>)}
                  rightColName={"书写格式"}
                  rightItem={getFieldDecorator('dbFormat') (<Input placeholder="请填写书写格式" disabled={queryState} required/>)}
                />
                <ColItem
                  LeftColName={"类型"}
                  LeftItem={getFieldDecorator('dbType') (<Input placeholder="请填写类型" disabled={queryState} required/>)}
                  rightColName={"长度"}
                  rightItem={getFieldDecorator('dbLength') (<Input placeholder="请填写长度" disabled={queryState} required/>)}
                />
                <ColItem
                  LeftColName={"是否为空"}
                  LeftItem={getFieldDecorator('dbIs_null') (<Input placeholder="请选择是否为空" disabled={queryState} required/>)}
                  rightColName={"验证规则"}
                  rightItem={getFieldDecorator('dbVerify_rule') (<Input placeholder="请填写基本单词" disabled={queryState} required/>)}
                />
                <p style={{fontSize:18}}>代码规范:</p>
                <ColItem
                  LeftColName={"缩写规则"}
                  LeftItem={getFieldDecorator('codeAcronym') (<Input placeholder="请填写缩写规则" disabled={queryState} required/>)}
                  rightColName={"书写格式"}
                  rightItem={getFieldDecorator('codeFormat') (<Input placeholder="请填写书写格式" disabled={queryState} required/>)}
                />
                <ColItem
                  LeftColName={"类型"}
                  LeftItem={getFieldDecorator('codeType') (<Input placeholder="请填写类型" disabled={queryState} required/>)}
                  rightColName={"长度"}
                  rightItem={getFieldDecorator('codeLength') (<Input placeholder="请填写长度" disabled={queryState} required/>)}
                />
                <ColItem
                  LeftColName={"是否为空"}
                  LeftItem={getFieldDecorator('codeIs_null') (<Input placeholder="请选择是否为空" disabled={queryState} required/>)}
                  rightColName={"验证规则"}
                  rightItem={getFieldDecorator('codeVerify_rule') (<Input placeholder="请填写基本单词" disabled={queryState} required/>)}
                />
                {ButtonDiv}
              </Card>
              </QueueAnim>
          </Form>
			</div>
		);
		}
	}
RootAdd = createForm()(RootAdd);
export default RootAdd;
//<EditableTable />
