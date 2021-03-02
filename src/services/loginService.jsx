import Tool from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message  } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class LoginService {

    /**
     * 登录界面
     * @param {username} 用户名
     * @param {password} 密码
     * @return {登录信息}
     */
    goLogin(params) {
        if(Config.testData){
            Config.localItem(Config.localKey.userToken, (new Date()).getTime()); // 模拟登录成功返回的Token
            Simulation.login();
            hashHistory.push('/home');
        }else{
            console.log("-------------");
            var res = Tool.post('/users/usersLogin.do', params, false);
            console.log("res.result",res.result);
            if(res.result) {
                console.log("登录成功");
                Config.localItem(Config.localKey.userToken, (new Date()).getTime()); // 模拟登录成功返回的Token
                localStorage.setItem("userName", params.usersName);
                localStorage.setItem("usersPassword", params.usersPassword);
                localStorage.setItem("usersLevel", res.data.users_level);
                localStorage.setItem("areaName", res.data.area_name);
                localStorage.setItem("pkArea", res.data.pk_users);
                localStorage.setItem("QQ", "1183283664");
                global.userInfo = {userName:res.data.users_name,usersLevel:res.data.users_level,areaName:res.data.area_name,pkArea:res.data.pk_users,QQ:"1183283664"}
                hashHistory.push('/home');
            } else {
                Message.error('用户名或密码错误');
            }
        }
    }
}

// 实例化再导出
export default new LoginService();
