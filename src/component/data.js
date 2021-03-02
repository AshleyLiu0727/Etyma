/* ------------------------------------------------------------
    author : fuguolin
    create:2017-09-28
    descreption:该页面所有数据项以后都要改成从后台服务获取！！！！！！！！！！！！！！
    ------------------------------------------------------------ */
import React from 'react' ;  // user react render
import { Select } from 'antd';
import Config from '../Config/index';
const Option = Select.Option;
import InformationListService from '../services/InformationListService';
var Data =[];
Data.permissionLevel  =[
  //<Option key="1" value={1}>管理员权限</Option>,
  <Option key="2" value={2}>组长权限</Option>,
  <Option key="3" value={3}>浏览权限</Option>
];
Data.menuList = [
  {
    'key': 'InformationList',
    'to':'InformationList',
    'icon':'laptop',
    'name': '一级菜单1111',
    'children':[
      { 'key': 'InformationList2', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单1'},
      { 'key': 'InformationList3', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单2'}
    ]
  },
  {
    'key': 'InformationList11',
    'to':'InformationList11',
    'icon':'laptop',
    'name': '一级菜单2222',
    'children':[
      { 'key': 'InformationList1111', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单1'},
      { 'key': 'InformationList1112', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单2'},
      { 'key': 'InformationList1113', 'to':'InformationList', 'icon':'laptop', 'name': '二级菜单3'}
    ]
  },
  {
    'key': 'InformationList331',
    'to':'InformationList11',
    'icon':'laptop',
    'name': '一级菜单3333',
    'children':[
      {
        'key': 'InformationList33',
        'to':'InformationList11',
        'icon':'laptop',
        'name': '二级菜单333',
        'children':[
          { 'key': 'InformationList2-1', 'to':'InformationList', 'icon':'laptop', 'name': '三级菜单1'},
          { 'key': 'InformationList2-2', 'to':'InformationList', 'icon':'laptop', 'name': '三级菜单2'},
          { 'key': 'InformationList2-3', 'to':'InformationList', 'icon':'laptop', 'name': '三级菜单3'}
        ]
      }
    ]
  },
]
//获取领域下拉框
function queryAreaList(){
  var AreaList = [];
  if(Config.testData){
      AreaList = [
        <Option key="0" value="0">分级诊疗0</Option>,
        <Option key="1" value="1">分级诊疗1</Option>
      ]
      return AreaList;
  }else{
      var returnResult = InformationListService.QueryInformationList({areaState:1});
      console.log("returnResult11========",returnResult);
      if(!returnResult.result){
        global.$publicMethod.Hint("查询",false,"查询失败");
      }else{
        console.log("查询领域列表服务，返回参数为 {}",returnResult);
        console.table(returnResult.data);
        returnResult.data.forEach((record,index)=>{
          AreaList.push(
            <Option key={index} value={record.pk_area}>{record.area_name}</Option>
          )
        })
        return AreaList;
      }
  }
};
Data.AreaList = queryAreaList();
module.exports = Data;
