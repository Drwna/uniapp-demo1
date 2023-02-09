export const getRandomInt = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const blurBgH5 = (div) => {
	if (!div) return;
	const width = div.offsetWidth;
	const height = div.offsetHeight;
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');
	// 生成随机的干扰线
	for (let i = 0; i < 50; i++) {
		ctx.beginPath();
		ctx.moveTo(Math.random() * width, Math.random() * height);
		ctx.lineTo(Math.random() * width, Math.random() * height);
		ctx.strokeStyle =
			`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`;
		ctx.stroke();
	}
	// 生成随机的干扰点
	for (let i = 0; i < 800; i++) {
		ctx.beginPath();
		// radius:1
		ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, 2 * Math.PI);
		ctx.fillStyle =
			`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`;
		ctx.fill();
	}
	div.style.backgroundImage = `url(${canvas.toDataURL('image/png', 0.8)})`;
};


export const blurBg = (canvasInstance) => {
		if(!canvasInstance) {
			throw new Error('canvasInstance is undefined')
		}
		let canvasId, parentEl
		// #ifdef H5
		canvasId = canvasInstance.value?.id || canvasInstance.value?.canvasId
		parentEl = canvasInstance.value?.$parent?.$el
		// #endif
		// #ifdef APP-PLUS ||MP
		canvasId = canvasInstance.value.attributes['canvas-id'] || canvasInstance.value.attributes['id']
		parentEl = canvasInstance.value?.parentNode
		// #endif
		if(!canvasId) {
			throw new Error('canvasId is undefined')
		}
		let width, height
		// #ifdef H5
		const query = uni.createSelectorQuery().in(canvasInstance.value);
		query.select('#bg').boundingClientRect(data => {
			width = data.width
			height = data.height
		}).exec()
		// #endif
		// #ifdef APP-PLUS ||MP
     width = 362
		 height = 182
		// #endif

		const ctx = uni.createCanvasContext(canvasId, canvasInstance.value);
		// 生成随机的干扰线
		for (let i = 0; i < 50; i++) {
			ctx.beginPath();
			ctx.moveTo(Math.random() * width, Math.random() * height);
			ctx.lineTo(Math.random() * width, Math.random() * height);
			ctx.setStrokeStyle(
				`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`
			);
			ctx.stroke();
		}
		// 生成随机的干扰点
		for (let i = 0; i < 800; i++) {
			ctx.beginPath();
			// radius:1
			ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, 2 * Math.PI);
			ctx.setFillStyle(
				`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`
			);
			ctx.fill();
		}
		ctx.draw(true, ret => {
			uni.canvasToTempFilePath({
				canvasId: canvasId, // canvas id
				success: res => {
					parentEl && (parentEl.style.backgroundImage = `url(${res.tempFilePath})`)
				},
				fail: err => {
					console.log(err)
				}
			});
		})
	}



export const blurBg2 = (canvasId) => {
	if(!canvasId) return
	const ctx = uni.createCanvasContext(canvasId);
	let width, height
	const query = uni.createSelectorQuery()
	query.select(`#${canvasId}`).boundingClientRect( rect => {
	}).exec((res)=>{
		width = res[0].width || 300
		height = res[0].height || 200
		ctx.fillStyle = '#fff'
		ctx.fillRect(0, 0, width, height)
		for (let i = 0; i < 50; i++) {
			ctx.beginPath();
			ctx.moveTo(Math.random() * width, Math.random() * height);
			ctx.lineTo(Math.random() * width, Math.random() * height);
			ctx.setStrokeStyle(
				`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`
			);
			ctx.stroke();
		}
		for (let i = 0; i < 800; i++) {
			ctx.beginPath();
			// radius:1
			ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, 2 * Math.PI);
			ctx.setFillStyle(
				`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`
			);
			ctx.fill();
		}

		ctx.draw(true);

	})
}


export const generateBg = (canvasId) => {
	if(!canvasId) return
	console.log('canvasId ===========================', canvasId)
	return new Promise((resolve, reject) => {
		const ctx = uni.createCanvasContext(canvasId);
		let width, height
		const query = uni.createSelectorQuery()
		query.select(`#${canvasId}`).boundingClientRect( rect => {
		}).exec((res)=>{
			console.log('file=>',res)
			width = res[0].width || 300
			height = res[0].height || 200
			console.log(width, height)
			console.log('promise ')
			ctx.fillStyle = '#fff'
			ctx.fillRect(0, 0, width, height)
			for (let i = 0; i < 50; i++) {
				ctx.beginPath();
				ctx.moveTo(Math.random() * width, Math.random() * height);
				ctx.lineTo(Math.random() * width, Math.random() * height);
				ctx.setStrokeStyle(
					`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`
				);
				ctx.stroke();
			}
			for (let i = 0; i < 800; i++) {
				ctx.beginPath();
				// radius:1
				ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, 2 * Math.PI);
				ctx.setFillStyle(
					`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`
				);
				ctx.fill();
			}
			ctx.draw(true, ret => {
				uni.canvasToTempFilePath({
					canvasId: canvasId, // canvas id
					success: res => {
						resolve(res.tempFilePath)
					},
					fail: err => {
						reject(err)
					}
				})
			})
		})
	})
}