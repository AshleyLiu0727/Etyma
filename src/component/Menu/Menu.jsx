import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import { browserHistory } from 'react-router';
import { Menu, Icon, Switch } from 'antd';
const { SubMenu } = Menu;
import Data from '../Data';

class Sider extends React.Component {
  state = {
    mode: 'inline',
    theme: 'light',
  }
  changeMode = (value) => {
    this.setState({
      mode: value ? 'vertical' : 'inline',
    });
  }
  changeTheme = (value) => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  }
  recursion(dataSource) {
    var self = this;
    return (
      dataSource.map((menu, index) => {
        if (menu.children) {
          return (
            <SubMenu key={menu.key} title={menu.name}>
              {self.recursion(menu.children)}
            </SubMenu>
          )
        } else {
          return (<Menu.Item key={menu.key}>{menu.name}</Menu.Item>)
        }
      })
    )
  }
  render() {
    return (
      <div>
        <Switch onChange={this.changeMode} /> 改变模式
        <span className="ant-divider" style={{ margin: '0 1em' }} />
        <Switch onChange={this.changeTheme} /> 改变颜色
        <br />
        <br />
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={this.state.mode}
          theme={this.state.theme}
        >
          {
            this.recursion(Data.menuList)
          }
        </Menu>
      </div>
    );
  }
}
module.exports = Sider
