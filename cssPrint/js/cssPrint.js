		var pageCount = 3;
		var pageIndex = 1;

		var startCss = true;
		var startMdCss = false;
		var isInside = false;
		var isComment = false;
		var startSelect = false;
		var startKey = false;
		var isKey = false;
		var startValue = false;
		var data = "";
		var html1 = "";
		var html2 = "";
		var div = document.getElementById("div");
		var styleText = document.getElementById("style-text");

		
		
		var content1El = document.getElementById("content1");

		var content2El = document.getElementById("content2");

		var content3El = document.getElementById("content3");


		var css0El = document.getElementById("css0");
		var css0  = css0El.innerHTML;
		var css1El= document.getElementById("css1");
		var css1  = css1El.innerHTML;

		var css2El= document.getElementById("css2");
		var css2  = css2El.innerHTML;

		var workText = document.getElementById("workText");
		var workTextEl = document.getElementById("work-text");
		var mdEl = document.getElementById("md");
		var testTextEl = document.getElementById("test-text");
		var textEl = document.getElementById("text");

		var inputTextEl = document.getElementById("input-text");
		var inputEl = document.getElementById("input");

		var buttonEl = document.getElementById("button");

		var mdCssEl = document.getElementById("mdCss");
		var mdCss = mdCssEl.innerHTML;

		var time1 = setInterval(function(){
			if(startCss == false){
				isInside = false;
				isComment = false;
				startSelect = false;
				startKey = false;
				isKey = false;
				startValue = false;
				data = "";
				html1 = "";
				console.log("startWorkText");
				workTextEl.style.opacity = "1";
				testTextEl.style.opacity = "1";
				mdEl.style.display = "block";
				textEl.style.display = "block";
				writerMarkdown(mdEl,workText.innerHTML,0);
				writerText(textEl,workText.innerHTML,0);
				clearInterval(time1);
			}
			
		},1000);

		var time_id1;
		var time_id2;

		var time2 = setInterval(function(){
			if(startMdCss){
				console.log("startMdCss");
				isInside = false;
				isComment = false;
				startSelect = false;
				startKey = false;
				isKey = false;
				startValue = false;
				data = "";
				html1 = styleText.innerHTML;
				var len = css1.length;
				var str = css1+mdCss;

				scrollToTop(workTextEl,time_id1);
				scrollToTop(testTextEl,time_id2);

				var callback = function(){
					transformTestText();
					inputTextEl.style.opacity = "1";

					startMdCss = false;
					startCss = true;
					isInside = false;
					isComment = false;
					startSelect = false;
					startKey = false;
					isKey = false;
					startValue = false;
					data = "";
					html1 = styleText.innerHTML;
					
					var str = css1+mdCss;
					var len = str.length;
					str = str + css2;

					var callback = function(){
						buttonEl.disabled = false;
						//content1El.className = "translateX1105";
						//todo
						setTimeout(function(){
							turnRight();
						},2000);
						setTimeout(function(){
							//startContent2Print();
						},3000);
						
					}

					writerCss(styleText,str,len,callback);
				}
				
				writerCss(styleText,str,len,callback);
				clearInterval(time2);
			}
		},1000);

		function transformTestText(){
			var oClass = testTextEl.className;
			if(oClass==""){
				testTextEl.className ="translateX1095";
				workTextEl.className ="translateY1105rotateY010";
				inputTextEl.className = "translateY0105rotateY0010";
			}else{
				testTextEl.className ="";
				workTextEl.className ="translateY0105rotateY0010";
				inputTextEl.className ="translateY0155rotateY0010";
			}
		}

		function scrollToTop(el,time_id){
			time_id = setInterval(function(){
			var top = el.scrollTop;
			//console.log(top);
			top = top-50;
			el.scrollTop = top;
			if (el.scrollTop  <= 0) {
				el.scrollTop  = 0;
				clearInterval(time_id);
			}
			}, 30);
		}

		var  mdSign1 = true;
		var  mdSign2 = false;
		var  mdLastLastSignValue = "";
		var  mdLastSignValue = "";
		var  mdSignValue = "";
		var  isMd = false;
		var  isUl = false;

		function writerMarkdown(el,data,index,callback){
			var oochar = data.substring(index-1,index);
			var ochar = data.substring(index,index+1);
			var nchar = data.substring(index+1,index+2);
			if(ochar=="\n"){

				if(isMd){		
					var count = mdSignValue.length;
					html1 = html1.substring(0,html1.length-count);
					isMd = false;
				}

				if(mdSignValue.indexOf("*")!=-1 && mdLastSignValue.indexOf("*")==-1){
					var str = mdSignValue.replace("*","");
					html1 = html1.replace(mdSignValue,"<ul><li>"+str+"</li>");
					isUl = true;
					
				}else if(mdSignValue.indexOf("*")!=-1 ){
					var str = mdSignValue.replace("*","");
					html1 = html1.replace(mdSignValue,"<li>"+str+"</li>");
				}else{
					if(isUl){
						html1+="</ul>"
						isUl = false;
					}
				}

				mdLastLastSignValue = mdLastSignValue;
				mdLastSignValue = mdSignValue;
				mdSignValue = "";
				
			}else{
				
				mdSignValue += data.substring(index,index+1);
				
			}
			//--------
			if(ochar=="-" && nchar=="-" && !isMd && (mdLastSignValue.indexOf("-")==-1)){//&& (mdLastSignValue.indexOf("-")<0)
				//console.log(mdLastSignValue);		
				html1 = html1.replace(mdLastSignValue,"<h2>"+mdLastSignValue+"</h2>");
				isMd = true;
			}

			//--------
			//--------
			if(ochar=="-" && nchar=="-" && !isMd && (mdLastSignValue.indexOf("-")!=-1)){//
				//console.log(mdLastSignValue);
				var str = mdLastLastSignValue.replace("h2>","h1>");
				html1 = html1.replace(mdLastLastSignValue,str);
				isMd = true;
			}

			if(ochar=="=" && nchar=="=" && !isMd){//&& (mdLastSignValue.indexOf("-")<0)
				html1 = html1.replace(mdLastSignValue,"<h1>"+mdLastSignValue+"</h1>");
				isMd = true;
			}


			html1 += data.substring(index,index+1);
			el.innerHTML = html1;
			index++;
			if(index<data.length){
				var char = data.substring(index-1,index);
				if(char=="," || char=="，" || char=="。" || char=="." || char==";"){
					setTimeout(function(){
						writerMarkdown(el,data,index,callback);
						//console.log(el.scrollHeight);
						workTextEl.scrollTop = el.scrollHeight;
						//el.style.marginTop = el.scrollHeight+"px";
					},40)
				}else{
					setTimeout(function(){
						writerMarkdown(el,data,index,callback);
						workTextEl.scrollTop = el.scrollHeight;
						//el.style.marginTop = el.scrollHeight+"px";
					},20)
				}
			}else{
				startMdCss = true;
			}
		}

		function writerText(el,data,index,callback){
			var oochar = data.substring(index-1,index);
			var ochar = data.substring(index,index+1);
			var nchar = data.substring(index+1,index+2);
			
			html2 += data.substring(index,index+1);
			el.innerHTML = html2;
			index++;
			if(index<data.length){
				var char = data.substring(index-1,index);

				if(char=="," || char=="，" || char=="。" || char=="." || char==";"){
					setTimeout(function(){
						writerText(el,data,index,callback);
						testTextEl.scrollTop = el.scrollHeight;
					},40)
				}else{
					setTimeout(function(){
						writerText(el,data,index,callback);
						testTextEl.scrollTop = el.scrollHeight;
					},20)
				}
			}else{
				
			}
		}

		var signValue = "";
		var lastSignValue = "";
		var lastLastSignValue = "";


		function addCss(el,data,index,callback){
			
			var oochar = data.substring(index-1,index);
			var ochar = data.substring(index,index+1);
			var nchar = data.substring(index+1,index+2);

			if(ochar == "\n"){
				lastLastSignValue = lastSignValue;
				lastSignValue = signValue;
				signValue = "";
			}

			if(ochar=="{" && !isInside && !isComment){
				isInside = true;
				startSelect=false;
				startKey = true;
				html1 +="</span>";
			}	
			if(ochar=="}" && isInside && !isComment){
				isInside = false; 
				startKey = false;
				startValue = false;
				
			}
			
			if(ochar==":" && isInside && !isComment){
				isInside = true;
				startSelect=false;
				startValue = true;
				startKey = false;
				html1 +="</span>";
			}
			if(ochar==";" && !isComment){
				isInside = true;
				startSelect=false;
				startValue = false;
				startKey = true;
				html1 +="</span>";
			}

			if((ochar+nchar)=="/*"){
				isComment=true;
				html1 +="<span class='comment'>"+ data.substring(index,index+1);
			}else if((oochar+ochar)=="*/"){
				isComment=false;
				html1 += data.substring(index,index+1)+"</span>";
			}
			else{
				html1 += data.substring(index,index+1);
				mdSignValue += data.substring(index,index+1);
				
			}

			if(!isInside && !isComment && !startSelect){
				//选择器
				startSelect=true;
				html1 +="<span class='selector'>";
			}

			if(isInside && !isComment && !startSelect && startKey && !startValue){
				//key
				startSelect=false;
				startKey = false;
				html1 +="<span class='key'>";
			}
			
			if(isInside && !isComment && !startSelect  && !startKey && startValue){
				//value
				startSelect=false;
				startValue = false;
				html1 +="<span class='value'>";
			}
			
			index++;
			if(index<data.length){
				var char = data.substring(index-1,index);

				if(char=="," || char=="，" || char=="。" || char=="." || char==";"){
					addCss(el,data,index,callback);
					//el.scrollTop = el.scrollHeight;
				}else{
					addCss(el,data,index,callback);
					//el.scrollTop = el.scrollHeight;
				}
			}else{
				el.innerHTML = html1;
				el.scrollTop = el.scrollHeight;
				if(typeof(callback)=="function"){
					callback();
				}
				
				startCss = false;
				startMdCss = false;
			}
		}
		
		function writerCss(el,data,index,callback){
			
			
			if(startCss){
				updateCss(css0+data.substring(0,index+1));
			}else if(startMdCss){
				updateCss(css0+data.substring(0,index+1));
			}
			
			var oochar = data.substring(index-1,index);
			var ochar = data.substring(index,index+1);
			var nchar = data.substring(index+1,index+2);

			if(ochar=="{" && !isInside && !isComment){
				isInside = true;
				startSelect=false;
				startKey = true;
				html1 +="</span>";
			}	
			if(ochar=="}" && isInside && !isComment){
				if(isKey){
					isKey = false;
					startKey = false;
					html1 +="</span>";
				}
				isInside = false; 
				startKey = false;
				startValue = false;
			}
			
			if(ochar==":" && isInside && !isComment){
				isInside = true;
				startSelect=false;
				startValue = true;
				startKey = false;
				isKey = false;
				html1 +="</span>";
			}
			if(ochar==";" && !isComment && isInside){
				isInside = true;
				startSelect=false;
				startValue = false;
				startKey = true;
				isKey = true;
				html1 +="</span>";
			}
			if(ochar=="\n" && isKey){
				//console.log(ochar);
				//console.log(startKey);
			}

			if(isInside){

			}

			if((ochar+nchar)=="/*"){
				isComment=true;
				html1 +="<span class='comment'>"+ data.substring(index,index+1);
			}else if((oochar+ochar)=="*/"){
				isComment=false;
				html1 += data.substring(index,index+1)+"</span>";
			}
			else{
				html1 += data.substring(index,index+1);
			}

			if(!isInside && !isComment && !startSelect && !startKey){
				//选择器
				startSelect=true;
				html1 +="<span class='selector'>";
			}

			if(isInside && !isComment && !startSelect && startKey && !startValue){
				//key
				startSelect=false;
				startKey = false;
				html1 +="<span class='key'>";
			}
			
			if(isInside && !isComment && !startSelect  && !startKey && startValue){
				//value
				startSelect=false;
				startValue =false;
				html1 +="<span class='value'>";
			}

			el.innerHTML = html1;
			index++;
			if(index<data.length){
				
				var char = data.substring(index-1,index);

				if(char=="," || char=="，" || char=="。" || char=="." || char==";"){
					setTimeout(function(){
						writerCss(el,data,index,callback);
						el.scrollTop = el.scrollHeight;
						var par = el.parentNode;
						if(par.className=="pre" && el.scrollHeight>par.scrollHeight){
							par.scrollTop = el.scrollHeight;
						}
					},40)
				}else{
					setTimeout(function(){
						writerCss(el,data,index,callback);
						el.scrollTop = el.scrollHeight;
						var par = el.parentNode;
						if(par.className=="pre"){
							par.scrollTop = el.scrollHeight;
						}
					},20)
				}
			}else{
				//console.log(typeof(callback));
				startCss = false;
				startMdCss = false;

				if(typeof(callback)=="function"){
					callback();
				}
				
			}
			
		}	
		function updateCss(data){
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML=data;
			var parent=document.getElementsByTagName('HEAD').item(0);
			var childs=parent.getElementsByTagName("style");
			if(childs.length>0){
				parent.removeChild(childs[0]);
			}
			
			document.getElementsByTagName('HEAD').item(0).appendChild(style);
		}
		function mapData(data){
			
			
		}
		function checkSymbol(data){
			
			
		}



		document.addEventListener("click",function(ev){
			//console.log("click");
			//console.log(ev);
			//console.log(ev.target);
			
			if( ev.target==mdEl || ev.target==textEl){
				transformTestText();
			}
			
		});

		styleText.addEventListener("input",function(ev){

			isInside = false;
			isComment = false;
			startSelect = false;
			startKey = false;
			isKey = false;
			startValue = false;
			data = "";
			html1 = "";

			var str1 = css0+styleText.innerText;
			var str2 = styleText.innerText;

			//var top = styleText.scrollHeight;
			var top = styleText.scrollTop;
			var len = str2.length-1;
			var callback = function(){
				styleText.scrollTop = Math.floor(top);
			}
			
			//addCss(styleText,str2,len,callback);
			updateCss(str1);
		});


		styleText.onkeydown=function(event){
            
            var e = event || window.event || arguments.callee.caller.arguments[0];
            var currKey=e.keyCode||e.which||e.charCode;
			//console.log(currKey.toString());
			
			var keynum;
			var keychar;

			keynum = window.event ? e.keyCode : e.which;
			keychar = String.fromCharCode(keynum);

            if(e){ 
                //console.log(keynum+':'+keychar);
			}
		}

		var textareaEl = document.getElementById("textarea");
		var textareaValue = textareaEl.value;

		buttonEl.addEventListener("click",function(ev){
			//console.log("buttonClick");
			textareaValue = textareaEl.value;
			//console.log(textareaValue);
			
			var len = styleText.innerText.length;
			var str = styleText.innerText+"\n"+textareaValue;

			startCss = true;
			isInside = false;
			isComment = false;
			startSelect = false;
			startKey = false;
			isKey = false;
			startValue = false;
			data = "";
			html1 = styleText.innerHTML;
			var callback = function(){
				var str1 = css0+styleText.innerText;
				updateCss(str1);
			}
			writerCss(styleText,str,len);
			
		});

		//键盘事件
		window.addEventListener('keydown', function(e) {
			//console.log(e.keyCode);
		    if (e.keyCode === 38 || e.keyCode === 37) { //up
				content1El.className = "";
				if(pageIndex>1){
					pageIndex--;
					changePage();
				}
		    } else if (e.keyCode === 40 || e.keyCode === 39) {
				content1El.className = "translateX1105";
				if(pageIndex<pageCount){ 
					pageIndex++;
					changePage();
				}
		    }
		}, false);
		
		//滚轮事件
		var mouseScroll = function(event) {
			event = event || window.event;
			if(event.wheelDelta < 0) {
				content1El.className = "";
				if(pageIndex>1){
					pageIndex--;
					changePage();
				}
			} else {
				content1El.className = "translateX1105";
				if(pageIndex<pageCount){ 
					pageIndex++;
					changePage();
				}
			}
		};
		//FF使用DOMMouseScroll，其他浏览器都是用mousewheel
		if(document.addEventListener) {
			//document.addEventListener('DOMMouseScroll', mouseScroll, false);
		}
		
		//js滚轮事件
		//document.onmousewheel = mouseScroll;

		
		

		var navigationLeftEl = document.getElementById("navigationLeft");
		var navigationRightEl = document.getElementById("navigationRight");
		var turnLeft = function(){
			// content1El.className = "";
			// content2El.className = "translateX0105";
			if(pageIndex>1){
				pageIndex--;
				changePage();
			}
			game.queue.update(-1);
		}
		var turnRight = function(){
			// content1El.className = "translateX1105";
			// content2El.className = "";
			if(pageIndex<pageCount){ 
				pageIndex++;
				changePage();
			}
			game.queue.update(1);
		}
		navigationLeftEl.addEventListener("click",turnLeft);
		navigationRightEl.addEventListener("click",turnRight);

		var pageEl = document.getElementById("page");

		var createPage = function(){
			var div1 = document.createElement('div');
			div1.id = "pageContaint";
			div1.className = "pageContaint";
			for(var i = 0;i<pageCount;i++){
				var div = document.createElement('div');
				div.id = "page"+(i+1);
				div.className = "pageNum";
				div1.appendChild(div);
			}
			pageEl.appendChild(div1);
		}

		var changePage = function(){
			var tem = document.getElementById("pageContaint");
			var count = tem.childNodes.length;
			for(var i = 0;i<count;i++){
				var child = tem.children[i];
				child.className = "pageNum";
			}

			var str = "page"+pageIndex;
			var el = document.getElementById(str);
			el.className = "pageNum pageSelect";

		}