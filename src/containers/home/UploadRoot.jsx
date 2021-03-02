import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import user from './style/user.png'
import styles from './style/home.less';
import { Icon, Row, Col, Radio, Card } from 'antd';
import HomeService from '../../services/HomeService';
/* 以类的方式创建一个组件 */
class UploadRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentWillMount(){
    var self = this;
    var params = {rootState:"1,2,3"}
    var returnResult = HomeService.QueryUploadRoot(params);
    var passValue = returnResult.passValue;
    var notPassValue = returnResult.notPassValue;
    var auditing = returnResult.auditing;
    self.setState({passValue,notPassValue,auditing});
  }
	render() {
    var { passValue,notPassValue,auditing } = this.state;
		return (
        <div>
          <Row className="UploadRoot-row">
            <Col span={8}>
              <p className="UploadRoot-p1">通过</p>
              <p className="UploadRoot-p2">{passValue}</p>
            </Col>
            <Col span={8}>
              <p className="UploadRoot-p1">未通过</p>
              <p className="UploadRoot-p2">{notPassValue}</p>
            </Col>
            <Col span={8}>
              <p className="UploadRoot-p1">正在审核</p>
              <p className="UploadRoot-p2">{auditing}</p>
            </Col>
          </Row>
        </div>

		);
	}
}

export default UploadRoot;
