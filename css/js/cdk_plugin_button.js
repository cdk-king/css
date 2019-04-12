;(function(M){
	var options = {
		id: null,
		txt:null,
		width: null,
		height: null,
		background1: null,
		background2: null
		};
	var type1 = function(options,type,fn, callback){
		this.options = options;
		this.tx = typeof(options.txt) === "string" ? options.txt:"cdk";
		this.el = typeof(options.id) === "string" ? document.getElementById(options.id) : el;
		this.width = options.width.toString();
		this.height = options.height.toString();
		this.background1 =options.background1;
		this.background2 =options.background2;
		this.el.style.height = '50px';
		this.el.style.height = options.height;
		this.el.style.width = '100px';
		this.el.style.width = options.width;
		this.el.style.background = "#fff";
		this.el.style.border = "1px solid #ff0";
		this.el.style.position = 'relative';
		this.el.style.overflow = 'hidden';
		this.el.style.textAlign = 'center';
		this.el.style.cursor = 'pointer';
		tips1();
		tips2();
		var h = document.getElementById("h");
		var i = document.getElementById("i");
		(callback && typeof(callback) === "function") && callback();
		
		if(window.addEventListener) {
				this.el.addEventListener(type, fn);
			} else if(window.attachEvent) {
				this.el.attachEvent("onclick", fn);
			}
		this.el.onmouseover = function(e) {
			//避免鼠标在DIV里面移动时也会可能触发onmouseover或onmouseout。		
			if(!e) e = window.event;
			var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
			while(reltg && reltg != this) reltg = reltg.parentNode;
			if(reltg != this) {
				// 这里可以编写 onmouseleave 事件的处理代码  
				//this.style.background = "#000";
				h.style.top="0px";
				i.style.top=options.height;
			}
			//this.style.background = "#000";
			return true;
		}
			this.el.onmouseout = function(e) {
			//避免鼠标在DIV里面移动时也会可能触发onmouseover或onmouseout。		
			if(!e) e = window.event;
			var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
			while(reltg && reltg != this) reltg = reltg.parentNode;
			if(reltg != this) {
				// 这里可以编写 onmouseleave 事件的处理代码  
				//this.style.background = "#fff";
				h.style.top="-"+options.height ;
				i.style.top="0px" ;
			}
			//this.style.background = "#fff";
			return true;
		}
	}
	
	type1.prototype = {

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
	
	var tips1 = function() {
			var para = document.createElement("div");
			para.id = 'h';
			para.style.height = '50px';
			para.style.height = this.height;
			para.style.width = '100px';
			para.style.width = this.width;
			para.style.background = "#0062CC";
			para.style.background = this.background2;
			para.style.textAlign = 'center';
			para.style.lineHeight = this.height;
			para.style.position  = 'absolute';
			para.style.color = '#fff';
			para.style.fontSize = '30px';
			para.style.top = '-50px';
			para.style.top = "-"+options.height;
			para.style.left = '0px';
			para.style.zIndex = '0';
			para.style.transition = 'all 0.3s linear';
			para.style.webkitTransition = 'all 0.3s linear';
			var node = document.createTextNode(this.tx);
			para.appendChild(node);
			this.el.appendChild(para);
		}
	
	var tips2 = function() {
			var para = document.createElement("div");
			para.id = 'i';
			para.style.height = '50px';
			para.style.height = this.height;
			para.style.width = '100px';
			para.style.width = this.width;
			para.style.background = "#1E90FF";
			para.style.background = this.background1;
			para.style.textAlign = 'center';
			para.style.lineHeight = this.height;
			
			para.style.position  = 'absolute';
			para.style.color = '#fff';
			para.style.fontSize = '30px';
			para.style.top = '0px';
			para.style.left = '0px';
			para.style.zIndex = '0';
			para.style.transition = 'all 0.3s linear';
			para.style.webkitTransition = 'all 0.3s linear';
			var node = document.createTextNode(this.tx);
			para.appendChild(node);
			this.el.appendChild(para);
	}
	window.type1 = type1;
})(this)
