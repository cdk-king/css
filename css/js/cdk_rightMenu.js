;(function(){
	var rightMenu = function(el){
		this.el = typeof(el) === "string" ? document.getElementById(el) : el;
		var myMenu = this.el;
		tips1(myMenu);
		document.addEventListener("contextmenu", function(event){
		    event.preventDefault();
		    myMenu.style.display = "block";
		    //获取鼠标视口位置
		    myMenu.style.top = event.clientY + "px";
		    myMenu.style.left = event.clientX + "px";
		});
		document.addEventListener("click", function(event){
		    myMenu.style.display = "none";
		});
		
		
	}
	var tips1 = function (myMenu) {
			
			myMenu.style.margin = "0px";
			myMenu.style.padding = "0px";
			myMenu.style.listStyle = "none";
			myMenu.style.width = "150px";
			myMenu.style.position = "absolute"
			myMenu.style.display = "none";
			myMenu.style.border = "1px solid #e9ecf3";
			myMenu.style.boxShadow = "0px 0px 15px -4px rgba(0, 0, 0, 0.5)";
			myMenu.style.width = "150px";
			var li = myMenu.getElementsByTagName("li");
			for(var i= 0;i<li.length;i++){
				li[i].style.padding = "10px";
				li[i].style.cursor = "pointer";
				li[i].style.fontSize = "14px";
				li[i].style.fontFamily = "微软雅黑";
				li[i].addEventListener("mouseover",function(){
					this.style.backgroundColor ="#e9ecf3";
				})
				li[i].addEventListener("mouseout",function(){
					this.style.backgroundColor ="#fff";
				})
			}
			
		}
	window.rightMenu = rightMenu;
})(this)
