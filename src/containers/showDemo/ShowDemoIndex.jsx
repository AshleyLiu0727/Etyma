import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { connect } from 'react-redux';
import { is, fromJS } from 'immutable';
import Table from '../../component/Table/Table';
import './style/ShowDemoIndex.less'

/* 以类的方式创建一个组件 */
class Main extends Component {
  constructor(props) {
  	super(props);
  }
  componentWillMount(){

  }
	render() {
		return (
  		<div className="ShowDemo-table">
        <Table/>
  		</div>
		);
	}
}

export default Main;
