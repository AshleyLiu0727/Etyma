import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import user from './style/user.png'
import styles from './style/home.less';
import { Icon, Row, Col, Card, Input, AutoComplete,Button  } from 'antd';
import { Router, Route, IndexRoute, hashHistory, History, Link } from 'react-router';
import InformationListService from '../../services/InformationListService';
import AdvancedSreachService from '../../services/AdvancedSreachService';

const Search = Input.Search;
const Option = AutoComplete.Option

function onSelect(value) {
  console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}


/* 以类的方式创建一个组件 */
class QuickSreach extends Component {
  constructor(props) {
  	super(props);
      this.state = {
        value: "",
        dataSource: [],
        defaultValue:"请输入要搜索的词根",
      };
  }
  componentWillMount(){
    this.setState({
      defaultValue:global.SearchText
    })
  }
  searchResult(query) {
    console.log("模糊查询词根为",query);
    this.setState({ value:query })
    var returnResult = InformationListService.KeywordsAssociate({rootName:query});
    var list = [];
    if(returnResult.data!=undefined && returnResult.data!=""){
      returnResult.data.forEach((item,index)=>{
        list.push({
          root_name:item.root_name
        })
      })
    }
    return list
  }
  Search(){
    console.log("value",this.state.value);
    var params ={ currentPage:1,pageSize:1,rootState:1,rootName:this.state.value }
    console.log("精确查询",params);
    var returnResult = AdvancedSreachService.QueryRootDetail(params);//精确查询
    var rootData = returnResult.data;
    var json = JSON.stringify(rootData);
    // console.log("gj===shuju",json);
    // this.setState({
    //   rootData:json,
    // })
    hashHistory.push("/AdvancedSreachIndex/"+json);
  };
  handleSearch = (value) => {
    this.setState({
      dataSource: value ? this.searchResult(value) : [],
    });
  }
  renderOption(item) {
    return (
      <Option key={item.root_name} text={item.root_name}>
        {item.root_name}
      </Option>
    );
  }
  /** 键盘绑定enter事件**/
  handlerKeyUp(event) {
    var self = this;
    if (event.keyCode === 13) {
      self.Search();
    }
  };
	render() {
    var { dataSource,defaultValue } = this.state;
		return (
        <Row className="sreach">
          <Col span={20} offset={2}>
            <AutoComplete
              className="global-search"
              size="large"
              style={{ width: '100%' }}
              dataSource={dataSource.map(this.renderOption)}
              onSelect={onSelect}
              onSearch={this.handleSearch}
              placeholder={defaultValue}
              optionLabelProp="text"
              defaultActiveFirstOption
            >
              <Input
                suffix={(
                  <Button className="search-btn" size="large" type="primary" onClick={()=>this.Search()}>
                    搜索
                  </Button>
                )}
              />
            </AutoComplete>
          </Col>
        </Row>
		);
	}
}

export default QuickSreach;
