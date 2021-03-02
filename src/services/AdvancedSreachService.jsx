import Xhr from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class HomeService {

    /**
     * 查询领域词根出错
     * @param 无
     * @return {修改动态}
     */
    QueryRootDetail(params) {
        if(Config.testData){
          return Simulation.QueryRootDetail();
        }else{
          var res = Xhr.post('/root/qryRoot.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('查询领域词根出错');
          }
        }
    }
}

// 实例化再导出
export default new HomeService();
