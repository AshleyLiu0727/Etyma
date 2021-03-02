import Xhr from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class UserSeivice {

    /**
     * 添加用户
     * @param 无
     * @return {修改动态}
     */
    AddUser(params) {
        if(Config.testData){
          console.log("测试账号登陆，启动模拟数据=================");
          global.$publicMethod.Hint("提示",true,"修改成功");
          hashHistory.push("/User");
        }else{
          var res = Xhr.post('/users/insertSelectiveUsers.do', params, false);
          if(res.result) {
              global.$publicMethod.Hint("添加",true,"添加成功");
              hashHistory.push("/User");
          } else {
              global.$publicMethod.Hint("添加",false,"添加失败");
          }
        }
    }
    /**
     * 查询用户信息
     * @param 无
     * @return {修改动态}
     */
    QueryUserData(params) {
      if(Config.testData){
        return Simulation.QueryUserData();
      }else{
        var res = Xhr.post('/users/selectUsers.do', params, false);
        if(res.result) {
            return res;
        } else {
            Message.error('查询用户信息出错');
        }
      }
    }
}

// 实例化再导出
export default new UserSeivice();
