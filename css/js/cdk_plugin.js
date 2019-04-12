;
(function(M) {
	var a = "";
	var i = 0;
	var tmp = 3;
	var p = 3;
	var t;
	var isTips = false;
	var tips = function() {
		var usernameEle = document.getElementById("b1");
		//var childs = usernameEle.getElementsByClassName("list");
		var childs = usernameEle.getElementsByTagName("div");
		
		for(var i = 0; i <= childs.length - 1; i++) {
			a = a + i.toString() + childs[i].nodeName + "--";
			document.getElementById("div3").innerHTML = a;
			//需要创建i个
			var para = document.createElement("p");
			var node = document.createTextNode("这是第"+(i+1)+"张图片。");
			para.appendChild(node);
			childs[i].appendChild(para);
			
		}
	};

	//var tips = $('<div class="tips"></div>').css('opacity', 0.6).appendTo(wrapper);
	//var title = $('<div class="title"></div>').html(function(){
	//var active = ul.find('li.active').find('a'), text = active.attr('title'), href = active.attr('href');
	//return $('<a>').attr('href', href).text(text);
	//}).appendTo(tips);

	var cdk2 = function(p) {
		if(!isTips) {
			tips();
			isTips = true;
		}
		var obj1 = document.getElementById("b1");

		obj1.onmouseover = function(e) {
			//避免鼠标在DIV里面移动时也会可能触发onmouseover或onmouseout。	
			if(!e) e = window.event;
			var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;
			while(reltg && reltg != this) reltg = reltg.parentNode;
			if(reltg != this) {
				// 这里可以编写 onmouseenter 事件的处理代码  
				stop();
			}

			this.style.background = "#65CBFF";
			return true;
		}

		obj1.onmouseout = function(e) {
			//避免鼠标在DIV里面移动时也会可能触发onmouseover或onmouseout。		
			if(!e) e = window.event;
			var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
			while(reltg && reltg != this) reltg = reltg.parentNode;
			if(reltg != this) {
				// 这里可以编写 onmouseleave 事件的处理代码  
				Interval(p);
			}
			this.style.background = "#EEEEEE";
			return true;
		}

		p = p || 3;

		if(i != (p - 1)) {
			i++;
			document.getElementById("b1").style.left = "-" + i * 100 + "%";
			document.getElementById("p1").innerHTML = i;
			//document.getElementById("c").innerText=i;
			//document.getElementById("b1").style.left="100px";
			return;
		}

		if(i == (p - 1)) {
			i = 0;
			document.getElementById("b1").style.left = "0%";
			document.getElementById("p1").innerHTML = i;
			//document.getElementById("c").innerText=i;
			//document.getElementById("b1").style.left="100px";

			return;
		}

	};

	//停止轮播
	var stop = function() {
		clearTimeout(t);
	};
	//鼠标经过事件

	//自调用
	function Interval(p) {
		cdk2(p);
		//两种方法都可以
		t = setTimeout('Interval(' + p + ')', 5000);
		//循环执行，每隔3秒钟执行一次cdk2（
		//window.setInterval(cdk2, 3000);
	};
	//循环执行，每隔3秒钟执行一次cdk2（） 
	//window.setInterval(cdk2, 3000);

	direction = true;
	var options = {
		id: null,
		width: null,
		height: null,
		background: null
	};

	var scrollFunc = function(event) {
		event = event || window.event;

		if(event.wheelDelta < 0) {
			motion(true);
		} else {
			motion(false);
		}
	};
	//鼠标滚动事件
	document.onmousewheel = scrollFunc;

	function motion(direction) {
		if(direction == true) {
			alert("up");
		} else {
			alert("down");
		}
	};

	var cdk = function(el) {
		this.el = typeof(el) === "string" ? document.querySelector(el) : el;
	};

	cdk.prototype = {
		setBg: function(bg) {
			this.el.style.background = bg;
		},
		setHeight: function(height) {
			this.el.style.height = height;
		},
		setWidth: function(width) {
			this.el.style.width = width;
		}
	};
	var cdk1 = function(options) {
		var settings = options;
		var wrapper = document.getElementById(settings.id);
		var li_height = settings.height;
		var li_width = settings.width;
		wrapper.style.height = settings.height + 'px';
		wrapper.style.width = settings.width + 'px';
		wrapper.style.background = settings.background;
	}
	//方法注册
	window.cdk1 = cdk1;
	window.cdk2 = cdk2;
	window.cdk = cdk;
	window.Interval = Interval;
})(this);