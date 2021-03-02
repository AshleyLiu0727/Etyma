import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import user from './style/user.png'
import styles from './style/AdvancedSreachIndex.less';
import { Icon, Row, Col, Card,Avatar,Input,List,Tag,message,Spin  } from 'antd';

/* 以类的方式创建一个组件 */
class SreachResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DynamicList:[]
    }
  }

	render() {
    var self = this;
    var { DynamicList } = self.state;
    var rootData = self.props.rootData;
    console.log("rootData=====",rootData);
    var listData =[];
    if(JSON.stringify(rootData) != "{}"){
      rootData.forEach((item,index)=>{
        var databaseRule = item.databaseRule;//数据库规范
        console.log("databaseRule=====",databaseRule)
        var groupByArea = item.groupByArea;//相关词根
        var codeRule = item.codeRule;//代码规范
        listData.push({
          title: `${item.root_name} （${item.area_name}）`,
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          description: <p>
                          数据库规范：{databaseRule.format} | {databaseRule.type} | {databaseRule.length}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          java规范：{codeRule.format} | {codeRule.type} | {codeRule.length}
                       </p>,
          content: <div style={{marginTop:-20}}>{item.description}</div>,
          users_name:item.users_name,
          gmtCreate:item.gmtCreate,
          root_name:item.root_name,
          groupByArea:groupByArea,
        });
      })
    }
    const pagination = {
      pageSize: 5,
      current: 1,
      total: listData.length,
      onChange: (() => {}),
    };

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );
		return (
      <List
        itemLayout="vertical"
        size="large"
        pagination={pagination}
        dataSource={listData}
        renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<p><span>{item.users_name}</span>&nbsp;在{item.gmtCreate} 创建词根 {item.root_name}</p>]}
              extra={
                <Card title="领域相关词根">
                {
                  item.groupByArea.map((groupByAreaItem,index)=>{
                    if(index%2 ==0){
                      return (
                        <span key={index}><a>{groupByAreaItem.root_name}</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      )
                    }else{
                      return (
                        <span key={index}><a>{groupByAreaItem.root_name}</a><br/></span>
                      )
                    }
                  })
                }
                </Card>
              }
            >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={item.title}
              description={<div>
                <p>
                  <Tag color="#f50">标签1</Tag>
                  <Tag color="#2db7f5">标签2</Tag>
                  <Tag color="#87d068">标签3</Tag>
                  <Tag color="#108ee9">标签4</Tag>
                </p>
                <p className="SreachResult-p">{item.description}</p>
              </div>}
            />
            {item.content}
          </List.Item>
        )}
      />
		);
	}
}

export default SreachResult;
