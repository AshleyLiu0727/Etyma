import '../style/antdpro.css';
import React, {Component, PropTypes} from 'react'; // react核心
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router'; // 创建route所需
import Config from '../config/index';
import layout from '../component/layout/layout'; // 布局界面
import login from '../containers/login/login'; // 登录界面
import '../services/PublicMethod'; // 公共方法
/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
	render() {
		// 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
		return (
			<div>{this.props.children}</div>
		);
	}
}
const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;
// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

// 控制台
const Home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/HomeIndex').default)
    }, 'Home');
}

// 百度图表-折线图
const chartLine = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/charts/lines').default)
    }, 'chartLine');
}

// 用户管理
const User = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/user/UserIndex').default)
    }, 'User');
}
// 用户新增
const UserAdd = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/user/UserAdd').default)
    }, 'UserAdd');
}

// 知识点浏览
const InformationList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/InformationList/InformationListIndex').default)
    }, 'InformationList');
}

// 登录验证
const requireAuth = (nextState, replace) => {
	let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
	if(token > 7200000) { // 模拟Token保存2个小时
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

// 高级搜索
const AdvancedSreachIndex = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/advancedSreach/AdvancedSreachIndex').default)
    }, 'AdvancedSreachIndex');
}

// 统计分析
const StatisticAnalysis = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/StatisticAnalysis/StatisticAnalysisIndex').default)
    }, 'StatisticAnalysisIndex');
}

// 词根添加
const RootAdd = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/InformationList/RootAdd').default)
    }, 'RootAdd');
}

// 词根添加
const RootAudit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/InformationList/RootAudit').default)
    }, 'RootAudit');
}

// 例子展示--table
const ShowDemoOne = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/showDemo/ShowDemoIndex').default)
    }, 'ShowDemoOne');
}

// 例子展示--联想框
const ShowDemoTwo = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/showDemo/ShowDemoTwo').default)
    }, 'ShowDemoTwo');
}

// 例子展示--动态菜单
const ShowDemoThree = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/showDemo/ShowDemoThree').default)
    }, 'ShowDemoThree');
}

// 例子展示--表单
const ShowDemoFour = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/showDemo/ShowDemoFour').default)
    }, 'ShowDemoFour');
}

global.$history = hashHistory;
const RouteConfig = (
	<Router history={$history}>
		<Route path="/Home" component={layout} onEnter={requireAuth}>
			<IndexRoute getComponent={Home} onEnter={requireAuth} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
			<Route path="/Home" getComponent={Home} onEnter={requireAuth} />
      <Route path="/chart/line" getComponent={chartLine} onEnter={requireAuth} />
      <Route path="/User" getComponent={User} onEnter={requireAuth} />
			<Route path="/UserAdd" getComponent={UserAdd} onEnter={requireAuth} />
			<Route path="/InformationList" getComponent={InformationList} onEnter={requireAuth} />
			<Route path="/AdvancedSreachIndex" getComponent={AdvancedSreachIndex} onEnter={requireAuth} />
			<Route path="/AdvancedSreachIndex/:rootData" getComponent={AdvancedSreachIndex} onEnter={requireAuth} />
			<Route path="/StatisticAnalysis" getComponent={StatisticAnalysis} onEnter={requireAuth} />
			<Route path="/RootAdd" getComponent={RootAdd} onEnter={requireAuth} />
			<Route path="/RootAudit" getComponent={RootAudit} onEnter={requireAuth} />
			<Route path="/ShowDemoOne" getComponent={ShowDemoOne} onEnter={requireAuth} />
			<Route path="/ShowDemoTwo" getComponent={ShowDemoTwo} onEnter={requireAuth} />
			<Route path="/ShowDemoThree" getComponent={ShowDemoThree} onEnter={requireAuth} />
			<Route path="/ShowDemoFour" getComponent={ShowDemoFour} onEnter={requireAuth} />
		</Route>
		<Route path="/login" component={Roots}> // 所有的访问，都跳转到Roots
			<IndexRoute component={login} />
		</Route>
		<Redirect from="*" to="/Home" />
	</Router>
);

export default RouteConfig;
