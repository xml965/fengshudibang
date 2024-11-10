// import {
// 	getStorage
// } from "../storage/storage"

/**
 * 这是数据请求的公用模板
 * 任何请求 最终都会通过本文件中的代码进行相应的访问
 * @param {* 访问配置参数} options 
 * url：链接。。。token：是否传token。。。data：参数数据集。。。method：请求类型
 */
export const ajaxRequest = (options) => {
	console.log('options', options)
	let headerData = {
		'content-type': options.contentType || 'application/json',
		// 'Authorization': options.token ? options.token : '' + getStorage('token')
	}
	let ajaxUrl = options.url
	let header = {
		'content-type': options.contentType || 'application/json' // 默认值
	}
	if (options.method === 'get') {
		let queryString = ''
		if (!isEmpty(options.data)) {
			for (let k in options.data) {
				let val = options.data[k] !== undefined ? options.data[k] : ''
				queryString += `&${k}=${val}`
			}
			console.log('这里', queryString)
			queryString = queryString ? queryString.substring(1) : ''
			ajaxUrl += (ajaxUrl.indexOf('?') < 0 ? '?' : '&') + queryString,
				console.log('这里', ajaxUrl)
		}
		options.data = {}
	}
	if (!!options.token) {
		header = headerData
	}
	
	return new Promise((resolve, reject) => {
		const request = uni.request({
			url: ajaxUrl,
			method: options.method,
			data: options.data,
			header: header,
			responseType: options.responseType ? options.responseType : '',
			success(res) {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					resolve(res.data);
				} else {
					reject(res.data);
				}
			},
			fail(res) {
				console.log('请求失败fail：', res);
				reject(res);
			},
			complete(res) {
				console.log('complete', res)
				if (res.statusCode < 200 && res.statusCode >= 300) {
					reject(res.data || '');
				}
			}
		});
	});
}

function isEmpty(obj) {
	for (let name in obj) {
		return false
	}
	return true
}