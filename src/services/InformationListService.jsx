import Xhr from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class InformationListService {

    /**
     * 查询领域列表
     * @param 无
     * @return {修改动态}
     */
    QueryInformationList(params) {
        if(Config.testData){
          return Simulation.QueryInformationList();
        }else{
          var res = Xhr.post('/area/qryArea.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('查询领域列表出错');
          }
        }
    }
    /**
     * 查询审核词根列表
     * @param 无
     * @return {修改动态}
     */
    QueryRootList(params) {
        if(Config.testData){
          return Simulation.QueryRootList();
        }else{
          var res = Xhr.post('/root/qryRootList.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('查询审核词根列表出错');
          }
        }
    }
    /**
     * 添加领域
     * @param 无
     * @return {修改动态}
     */
    AddArea(params) {
        if(Config.testData){
          console.log("测试账号登陆，启动模拟数据=================");
          global.$publicMethod.Hint("提示",true,"新增成功");
          hashHistory.push("/InformationList");
        }else{
          var res = Xhr.post('/area/insertArea.do', params, false);
          if(res.result) {
              global.$publicMethod.Hint("提示",true,"新增成功");
              hashHistory.push("/InformationList");
          } else {
              Message.error('添加领域出错');
          }
        }
    }
    /**
    * 添加词根
    * @param 无
    * @return {修改动态}
    */
    AddRoot(params) {
        if(Config.testData){
          console.log("测试账号登陆，启动模拟数据=================");
          global.$publicMethod.Hint("提示",true,"新增成功");
          hashHistory.push("/InformationList");
        }else{
          var res = Xhr.post('/root/insertRoot.do', params, false);
          if(res.result) {
              global.$publicMethod.Hint("提示",true,"新增成功");
              hashHistory.push("/InformationList");
          } else {
              Message.error('添加词根出错');
          }
        }
    }
    /**
    * 词根审核
    * @param 无
    * @return {修改动态}
    */
    RootAudit(params) {
        if(Config.testData){
          console.log("测试账号登陆，启动模拟数据=================");
          global.$publicMethod.Hint("提示",true,"审核成功");
          hashHistory.push("/RootAudit");
        }else{
          var res = Xhr.post('/XXX/XXX', params, false);
          if(res.result) {
              global.$publicMethod.Hint("提示",true,"审核成功");
              hashHistory.push("/RootAudit");
          } else {
              Message.error('词根审核出错');
          }
        }
    }

    /**
    * 词根搜索 - 关键词联想
    * @param 无
    * @return {修改动态}
    */
    KeywordsAssociate(params) {
        if(Config.testData){
          return Simulation.KeywordsAssociate();
        }else{
          var res = Xhr.post('/root/keywordsAssociate.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('关键词联想出错');
          }
        }
    }


}

// 实例化再导出
export default new InformationListService();
