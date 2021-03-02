import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import SearchInput from '../../component/SearchInput/SearchInput';
import SearchInputTwo from '../../component/SearchInput/SearchInputTwo';
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
          <Col span={12}><SearchInput/></Col>
          <Col span={12}><SearchInputTwo/></Col>
        </Row>
  		</div>
		);
	}
}

export default Main;
