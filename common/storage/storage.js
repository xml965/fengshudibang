/** 注意！若存入图片缓存数据请使用imageCache.js内相关方法，此文件内方法一般储存文本/列表数据 */
// import {USERINFO, LOGINSTATE, HEADER_TOKEN, IS_FIRST_INTO} from '../envVar/globalVar.js'
// import {mallidUtils} from '../utils/weChatUtils.js'

export function setStorage(storage_key, content, isSync = true, callback) {
	// 指定key本地储存
	try {
		if (storage_key) {
			const conType = typeof content
			let storeCon = {
				value: content,
				type: conType
			}
			if (isSync) {
				uni.setStorageSync(storage_key, storeCon);
				callback && callback()
			} else {
				uni.setStorage({
					key: storage_key,
					data: storeCon,
					success: () => {
						callback && callback()
					}
				})
			}
		} else {
			uni.showModal({
				title: '储存提示',
				content: '未传入storeKey',
			})
			callback && callback()
		}
	} catch (e) {
		// error
		uni.showModal({
			title: '储存提示',
			content: e.toString(),
		})
		callback && callback()
	}
}
function getStoreTypeVal(storageVal) {
	return storageVal.value
}
export function getStorage(storage_key, noneHope = false, isSync = true, callback) {
	// 获取指定本地储存
	if (storage_key) {
		try {
			if (isSync) {
				const value = uni.getStorageSync(storage_key)
				if (value) {
					return getStoreTypeVal(value)
				} else {
					return noneHope
				}
			} else {
				uni.getStorage({
					key: storage_key,
					success: (res) => {
						let noSyncStor = null
						if (res.data) {
							noSyncStor = getStoreTypeVal(res.data)
						} else {
							noSyncStor = noneHope
						}
						callback && callback(noSyncStor)
					},
					fail: () => {
						console.log('fail')
					}
				});
			}
		} catch (e) {
			// error
			uni.showModal({
				title: '获取失败',
				content: e.toString(),
			})
			callback && callback(noneHope)
		}
	} else {
		uni.showModal({
			title: '获取失败',
			content: '未传入storeKey',
		})
		callback && callback(noneHope)
	}
}

export function removeStorage(storage_key, isSync = true, callback) {
	// 从本地缓存中异步移除指定 key。
	try {
		if (isSync) {
			uni.removeStorageSync(storage_key);
		} else {
			uni.removeStorage({
				key: storage_key,
				success: (res) => {
					console.log('removesuccess');
					callback && callback()
				}
			})
		}
	} catch (e) {
			// error
		uni.showModal({
			title: '缓存移除',
			content: e.toString(),
		})
		callback && callback()
	}
}

export function clearStorage(isSync = true, isAllCache = true) {
	// 清除所有本地储存(注意！如果只是想清除图片缓存用imagecache.js里的方法)
	// isAllCache = true 时，要重新登录，此时除地理位置，图片前缀，商场号外全部清空, 
	try {
		let userInfoCache = null
		let loginStaCache = null
		let userTokenCache = null
		
		if (isAllCache) {
			uni.clearStorageSync()
			uni.clearStorage()
		} else {
			if (isSync) {
				uni.clearStorageSync()
			} else {
				uni.clearStorage()
			}
		}
		// setStorage(USERINFO, {})
		// setStorage(LOGINSTATE, false)
		// setStorage(HEADER_TOKEN, '')
		// setStorage(IS_FIRST_INTO, false)
		// mallidUtils.set(mallId)
	} catch (e) {
		uni.showModal({
			title: '缓存清除',
			content: e.toString(),
		})
	}
}

export function getStorageInfo() {
	// uni-app坑b之一，app环境下没法支持读取缓存信息所以这一项gg
}