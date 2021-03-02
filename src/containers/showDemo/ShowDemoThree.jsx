import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Menu from '../../component/Menu/Menu';
import './style/ShowDemoIndex.less'
import { Row, Col } from 'antd';

/* 以类的方式创建一个组件 */
class Main extends Component {
  constructor(props) {
  	super(props);
  }
  componentWillMount(){

  }
	render() {
		return (
  		<div className="ShowDemo-input">
        <Row>
          <Col span={24}><Menu/></Col>
        </Row>
  		</div>
		);
	}
}

export default Main;
