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
     * 查询领域词根最新修改动态
     * @param 无
     * @return {修改动态}
     */
    QueryDynamicInformation(params) {
        if(Config.testData){
          return Simulation.QueryDynamicInformation();
        }else{
          var res = Xhr.post('/log/statOperateLog.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('查询领域词根最新修改动态出错');
          }
        }
    }
    /**
     * 统计饼图
     * @param 无
     * @return {修改动态}
     */
    QueryPieChart(params) {
        if(Config.testData){
          return Simulation.QueryPieChart();
        }else{
          var res = Xhr.post('/root/pieChart.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('查询统计饼图出错');
          }
        }
    }
    /**
     * 词根审核情况
     * @param 无
     * @return {修改动态}
     */
    QueryUploadRoot(params) {
        if(Config.testData){
          return Simulation.QueryUploadRoot();
        }else{
          var res = Xhr.post('/root/statRootState.do', params, false);
          if(res.result) {
              return res;
          } else {
              Message.error('查询词根审核情况出错');
          }
        }
    }
}

// 实例化再导出
export default new HomeService();
