import Xhr from './xhr/index';
import Config from '../Config/index';
import { hashHistory } from 'react-router';
import { Message } from 'antd';
import { Simulation } from './SimulationService';
/**
 * 封装ajax请求
 * @param {any}
 */

class StatisticAnalysisService {

    /**
     * 查询词统计各词根占比量(条形统计图 - 按人分组)
     * @param 无
     * @return {词统计各词根占比量数据}
     */
    QueryBarGraph(params) {
        if(Config.testData){
          return Simulation.QueryBarGraph();
        }else{
          var res = Xhr.post('/root/barGraph.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('条形统计图出错');
          }
        }
    }
    /**
     * 增删改统计
     * @param 无
     * @return {增删改统计数据}
     */
    QueryCurdStat(params) {
        if(Config.testData){
          return Simulation.QueryCurdStat();
        }else{
          var res = Xhr.post('/log/curdStat.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('增删改统计出错');
          }
        }
    }
}

// 实例化再导出
export default new StatisticAnalysisService();
