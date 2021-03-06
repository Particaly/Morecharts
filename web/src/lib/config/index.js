import axios from 'axios'
import qs from 'qs'
import store from '../../store';
import router from '../../router';

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
// 添加请求拦截器
axios.interceptors.request.use((config) => {
	let token = window.localStorage.getItem('Ltoken');
	if(token){
		config.headers.Authorization = token;
	}
	if(!config.headers){
		config.headers = {'Content-Type':'application/x-www-form-urlencoded'};
		config.data = qs.stringify(config.data, {arrayFormat: 'brackets'});
	}
	return config;
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// 对响应数据做点什么
	let d = response.data;
	if(router.currentRoute.name === 'login'){
		return response
	}else{
		if(d.loginInfo.status!==1){
			store.commit('changeLoginStatus',false);
			if(router.currentRoute?.meta?.encryption){
				router.push('/login')
			}
		}
	}
	return response;
}, function (error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});

if (process.env.VUE_APP_ENVIROMENT === 'serve'){
	
	window.apiURL = '/app/';
	
}else if (process.env.VUE_APP_ENVIROMENT === 'build-dev'){
	
	console.log('running in development');
	window.apiURL = 'http://localhost:3000/morecharts/api/';
	
}else if (process.env.VUE_APP_ENVIROMENT === 'build'){
	
	console.log('running in production');
	window.apiURL = 'http://118.24.108.165:3000/morecharts/api/';
	
}

window.baseurl = process.env.BASE_URL;

export { axios, store, router }
