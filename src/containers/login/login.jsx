import React, { Component } from 'react'; // 引入了React
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { initialState, goLogin } from '../../redux/action/login/loginAction';
import styles from './style/login.less';
import logo from './style/logo.png';
import { Spin, Form, Input, Button, message,Icon,Checkbox,Tabs  } from 'antd';
import LoginService from '../../services/loginService';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
/* 以类的方式创建一个组件 */
class Login extends Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		passwordDirty: false,
    		loginBtnText: '登录'
    	};
    }
    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
    componentDidMount() {
        const {actions} = this.props;
        // 初始化数据
        actions.initialState();
    }
  	handleSubmit = (e) => { // 登录
      console.log("登录");
    	e.preventDefault();
      const {actions, form} = this.props;
	    form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        usersName: username,
                        usersPassword: password
                    };
		        LoginService.goLogin(loginParams);
		    }
	    });
	}
  callback(key) {
    console.log(key);
  }
	render() {
    const { loading, loginInfo, form } = this.props;
    const getFieldDecorator = form.getFieldDecorator;
		return (
      <div className="login-container">
        <div className="top">
          <div className="header">
            <img alt="logo" className="logo" src={logo} />
            <span className="title">领域词根表管理工具</span>
          </div>
          <div className="desc">仅限中科软员工内部使用</div>
        </div>
        <div className="main">
          <Spin tip="载入中..." spinning={loading}>
            <Tabs  defaultActiveKey="1" onChange={this.callback}>
              <TabPane tab="账户密码登录" key="1">
                  <Form style={{ marginTop:5}} onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('username')(
                            <Input className="username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="用户名" maxLength="10" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password')(
                            <Input className="password" type="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)',fontSize:16 }} />} placeholder="密码" maxLength="10" />
                        )}
                    </FormItem>
                    <div>
                      <Checkbox className="Checkbox">自动登录</Checkbox>
                      <a style={{ float: 'right' }} href="">忘记密码</a>
                    </div>
                    <FormItem>
                        <Button size="large" className="clsString" type="primary" htmlType="submit" loading={loginInfo.length > 0 ? true : false}>
                         {loginInfo.length > 0 ? '登录中...' : '登录'}
                        </Button>
                    </FormItem>
                    <div className="login-account">
                    </div>
                  </Form>
              </TabPane>
              <TabPane tab="QQ登录" key="2">
                  <Form style={{ marginTop:10}} onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Input disabled className="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="暂未开放" maxLength="10" />
                    </FormItem>
                    <FormItem>
                        <Input disabled className="password" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="暂未开放" maxLength="10" />
                    </FormItem>
                    <FormItem>
                        <Button size="large" disabled className="clsString" type="primary">登录</Button>
                    </FormItem>
                  </Form>
              </TabPane>
            </Tabs>
           </Spin>
        </div>
        <div className="globalFooter">
          <div className="copyright">Copyright <Icon type="copyright" /> 中科软科技股份有限公司</div>
        </div>
  		</div>
		);
	}
}

const LoginForm = Form.create()(Login);

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let { Common, Login } = state;
    return {
        loading: Common.loading,
        loginInfo: Login.loginInfo
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => ({
    actions: bindActionCreators({ initialState, goLogin }, dispatch)
});

const Main = connect(mapStateToProps, mapDispatchToProps)(LoginForm); // 连接redux

export default Main;
