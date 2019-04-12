;(function(M) {
	var moveDiv = function(el, txt) {
		this.txt = typeof(txt) === "string" ? txt : "cdk";
		this.el = typeof(el) === "string" ? document.getElementById(el) : el;
		// 获取元素和初始值
		var oBox = this.el,
			disX = 0,
			disY = 0;
		// 容器鼠标按下事件
		oBox.onmousedown = function(e) {
			var e = e || window.event;
			//获取按下鼠标到div left  top的距离
			disX = e.clientX - this.offsetLeft;
			disY = e.clientY - this.offsetTop;
			//添加鼠标按下事件
			document.onmousemove = function(e) {
				var e = e || window.event;
				oBox.style.position  = 'absolute';
				oBox.style.left = (e.clientX - disX) + 'px';
				oBox.style.top = (e.clientY - disY) + 'px';
				//left  当小于等于零时，设置为零 防止div拖出document之外
//				if(e.clientX - disX <= 0) {
//					oBox.style.left = 0 + 'px';
//				}
//				if(e.clientY - disY <= 0) {
//					oBox.style.top = 0 + 'px';
//				}
//				if(e.clientX - disX >= document.documentElement.clientWidth - oBox.offsetWidth) {
//
//					oBox.style.left = document.documentElement.clientWidth - oBox.offsetWidth + 'px';
//				}
//				if(e.clientY - disY >= document.documentElement.clientHeight - oBox.offsetHeight) {
//					oBox.style.top = document.documentElement.clientHeight - oBox.offsetHeight + 'px';
//				}
			};
			//添加鼠标抬起事件
			document.onmouseup = function() {
				//清空事件
				document.onmousemove = null;
				document.onmouseup = null;
			};
			return false;
		};
	}

	window.moveDiv = moveDiv;
})(this)