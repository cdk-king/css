;(function(M){
	var FollowCursor = function(el,txt){
		this.txt = typeof(txt) === "string" ? txt:"cdk";
		this.el = typeof(el) === "string" ? document.getElementById(el) : el;
		var a =this.el;
		a.onmousemove = function(e){
			var x = event.clientX;
			var y = event.clientY;
			tips1();
			var h =document.getElementById("h");
			h.style.display= "inherit";
			h.style.top = y+25+"px";
			h.style.left = x+15+"px";
		}
		a.onmouseout = function(e){
			var h =document.getElementById("h");
			h.style.display= "none";
		}
		a.onmouseover = function(e) {
			//避免鼠标在DIV里面移动时也会可能触发onmouseover或onmouseout。		
			if(!e) e = window.event;
			var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
			while(reltg && reltg != this) reltg = reltg.parentNode;
			if(reltg != this) {
				// 这里可以编写 onmouseleave 事件的处理代码
				//alert("fuck");
				
				//tips1();	
			}
			return true;
		}
	}
		
		
		var tips1 = function() {
			var para = document.createElement("div");
			para.id = 'h';
			para.style.height = '40px';
			para.style.height = this.height;
			para.style.width = '100px';
			para.style.width = this.width;
			para.style.background = "#007AFF";
			para.style.opacity = "0.9";
			para.style.borderRadius="4px";
			para.style.background = this.background2;
			para.style.textAlign = 'center';
			para.style.lineHeight = '40px';
			para.style.lineHeight = this.height;
			para.style.position  = 'absolute';
			para.style.color = '#fff';
			para.style.fontSize = '25px';
			para.style.top = '-50px';	
			para.style.left = '0px';
			para.style.zIndex = '0';
			//para.style.transition = 'all 0.3s linear';
			//para.style.webkitTransition = 'all 0.3s linear';
			var node = document.createTextNode(this.txt);
			para.appendChild(node);
			document.body.appendChild(para);
		}
		window.FollowCursor = FollowCursor;
})(this)
