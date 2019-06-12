var drawingLineObj = {
	init: function () {
		this.draw()
		this.btnFn()
		this.context.lineCap = 'round' //改变吓尿其实和结尾的样式
		this.context.lineJoin = 'round' //改变线条转弯时的样式
	},

	cavs: $('.cavs'),
	context: $('.cavs').get(0).getContext('2d'),
	colorBoard: $('#colorBoard'),
	cleanBoard: $('#cleanBoard'),
	eraser: $('#eraser'),
	rescind: $('#rescind'),
	lineRuler: $('#lineRuler'),
	arrImg: [],

	draw: function () {
		var cavs = this.cavs,
			self = this;
		var c_x = cavs.offset().left,
			c_y = cavs.offset().top;

			cavs.mousedown(function (e) {
				self.bool = true
				e = e||window.event
				var m_x = e.pageX - c_x,
					m_y = e.pageY - c_y;

				self.context.beginPath();
				self.context.moveTo(m_x,m_y);



				cavs.mousemove(function (e) {
					if (self.bool) {
						self.context.lineTo(e.pageX-c_x,e.pageY-c_y);
						self.context.stroke();
					}
				})

				cavs.mouseup(function (e) {
					self.context.closePath()
					self.bool = false

				})

				cavs.mouseleave(function (e) {
					self.context.closePath()
					self.bool = false
				})


				// 每次鼠标按下的时候，就抓取整张画布,存到一个数组中，注意:鼠标按下抓取到的上一次的画布
				var imgData = self.context.getImageData(0,0,self.cavs[0].width,self.cavs[0].height)
				self.arrImg.push(imgData)
				console.log(self.arrImg)
			})
	},

	btnFn: function () {
		// 利用事件委托机制，点击事件绑定在父元素上
		var self = this // 事件处理函数中的 this 指向绑定的 dom 元素，但是我们需要它指向 drowingLineBoj 这个对象
		$('.btn-list').on('click', function (e) {
			e = e || window.event
			switch (e.target.id) {
				case 'clearBoard': self.context.clearRect(0,0,1000,1000)
				break;

				case 'eraser': self.context.strokeStyle = '#fff' 
				break;

				case 'rescind': if (self.arrImg.length > 0) {
					// 数组 pop 方法，剪切出来数组最后一项，当数组剪切完了，就表示不用撤销了。数组保存的都是上一次的画布
					self.context.putImageData(self.arrImg.pop(),0,0)
				}
				break;
			}
		})

		this.colorBoard.change(function (e) { //当颜色变化时候，改变笔触颜色
			self.context.strokeStyle = $(this).val()
		})

		this.lineRuler.change(function (e) { //当线条粗细变化时候，改变笔触颜色
			self.context.lineWidth = $(this).val()
			console.log($(this).val())
		})
	}

}

drawingLineObj.init()
