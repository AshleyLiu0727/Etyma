import React, { Component, PropTypes } from 'react';
import { is, fromJS } from 'immutable';
import Config from '../../config/index';
import { Router, Route, IndexRoute, browserHistory, Link } from 'react-router';
import { Layout, Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
export class Lmenu extends Component {
	constructor(props, context) {
		super(props, context); //后才能用this获取实例化对象
		const openKeys = Config.localItem('OPENKEY') ? [Config.localItem('OPENKEY')] : [];
		this.state = {
			openKeys: openKeys
		};
	}
    onOpenChange = (openKeys) => {
	    const state = this.state;
	    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
	    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    Config.localItem('OPENKEY', nextOpenKeys);
	    this.setState({ openKeys: nextOpenKeys });
	}
  	getAncestorKeys = (key) => {
	    const map = {
	      sub3: ['sub2'],
	    };
	    return map[key] || [];
	}
	render() {
		const defaultSelectedKey = process.env.NODE_ENV !== 'production' ? [location.pathname.split('/')[location.pathname.split('/').length - 1] || 'home'] : [location.hash.split('/')[location.hash.split('/').length - 1].split('?')[0] || 'home'];
		return (
			<Menu
				openKeys={this.state.openKeys}
				onOpenChange={this.onOpenChange}
				theme="dark" mode={this.props.mode}
				defaultSelectedKeys={defaultSelectedKey}
			>
				<Menu.Item key="InformationList">
					<Link to="/InformationList">
						<Icon type="laptop" />
						{!this.props.collapsed && <span className="nav-text">知识库浏览</span>}
					</Link>
				</Menu.Item>
				<Menu.Item key="AdvancedSreachIndex">
					<Link to="/AdvancedSreachIndex">
						<Icon type="laptop" />
						{!this.props.collapsed && <span className="nav-text">高级搜索</span>}
					</Link>
				</Menu.Item>
				<Menu.Item key="StatisticAnalysis">
					<Link to="/StatisticAnalysis">
						<Icon type="laptop" />
						{!this.props.collapsed && <span className="nav-text">统计分析</span>}
					</Link>
				</Menu.Item>
				<Menu.Item key="user">
					<Link to="/User">
						<Icon type="user" />
						{!this.props.collapsed && <span className="nav-text">用户管理</span>}
					</Link>
				</Menu.Item>
				<SubMenu key="demo" title={<span><Icon type="laptop" /><span className="nav-text">例子展示</span></span>}>
							<Menu.Item key="ShowDemoOne"><Link to="/ShowDemoOne">内嵌表格</Link></Menu.Item>
							<Menu.Item key="ShowDemoTwo"><Link to="/ShowDemoTwo">联想框</Link></Menu.Item>
							<Menu.Item key="ShowDemoThree"><Link to="/ShowDemoThree">动态菜单</Link></Menu.Item>
							<Menu.Item key="ShowDemoFour"><Link to="/ShowDemoFour">表单</Link></Menu.Item>
				</SubMenu>
			</Menu>
		)
	}
}
// {
// 		Data.menuList.map((item,index)=>{
// 				return (<SubMenu key={item.key} title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}>
// 										{item.subItem.map((itemTwo,indexTwo)=>(
// 												 <Menu.Item key={itemTwo.key}>{itemTwo.name}</Menu.Item>
// 										))}
// 								</SubMenu>)
// 		})
// }
