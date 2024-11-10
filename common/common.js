import {
	ajaxRequest
} from '@/common/ajax/ajaxRequest.js';

// post请求 - 登录
export function login(data) {
	const options = {
		url: '', // 登录URL
		method: "POST",
		data: data,
		// token: loginToken
	}
	return ajaxRequest(options)
}

// get请求 - 获取配置
export function getConfig() {
	const options = {
		url: '',
		method: "GET",
		data: {
			// format: 'json'
		},
		// token: getStorage('token')
	}
	return ajaxRequest(options).then((res) => {
		// const r = mapConfig(res);
		return Promise.resolve(res);
	}).catch((e) => {
		return Promise.reject(e);
	});
}