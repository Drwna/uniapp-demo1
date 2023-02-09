const $request = (url, data = {}, method = 'POST', headers = "application/json;") => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '数据加载中',
			icon: 'loading',
			mask: true
		});
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				'Content-Type': headers
			},
			success(res) {
				resolve(res.data)
				uni.hideLoading();
			},
			fail(error) {
				reject(error);
				throw new Error(error);
				uni.hideLoading();
			},
			complete() {
				uni.hideLoading();
			}
		})
	})
}
//get请求
const $get = (url, data) => {
	return $request(url, data, 'GET')
}
//post请求
const $post = (url, data) => {
	return $request(url, data, 'POST')
}
//给uniapp原生的requset赋值
//记得要在mian.js中引用
uni.$request = $request
uni.$get = $get
uni.$post = $post
