;(function(M){
	var a = "";
	var b = "";
	var	callback1 = null;
	var	callback2 = null;
	var cdk_mousewheel = function(type,callback){
		var tmp = typeof(type) === "string" ? type:"1";
		
		//alert(tmp);
		if(tmp == "1"){
			a ="1";
			callback1 = callback;
		}
		if(tmp == "2"){
			b ="2";
			callback2 = callback;
		}
		var scrollFunc = function(event) {
			event = event || window.event;
			if(event.wheelDelta < 0) {
				motion(true);
			} else {
				motion(false);
			}
		};
		//FF使用DOMMouseScroll，其他浏览器都是用mousewheel
		if(document.addEventListener) {
			document.addEventListener('DOMMouseScroll', scrollFunc, false);
		}
		
		//js滚轮事件
		document.onmousewheel = scrollFunc;
		
		function motion(direction) {
			if(direction == true) {
				if(a == "1"){
					(callback && typeof(callback) === "function") && callback1(a);
				}
				//alert(a);
				//alert("up");
			} else {
				if(b == "2"){
				(callback && typeof(callback) === "function") && callback2(b);
				}
				//alert(b);
				//alert("down");
			}
		};
		document.onkeydown = function(event) {
			event = event || window.event;
			var c = event.keyCode;
			if(c == 40 || c == 32 || c == 39) {
				motion(true);
			} else if(c == 38 || c == 37) {
				motion(false);
			}
		}
		
	}
	window.cdk_mousewheel = cdk_mousewheel;
})(this)
