;
		(function(M) {
			var show = function(el) {
				this.el = typeof(el) === "string" ? document.getElementById(el) : el;
				var oDiv = document.createElement('div');
				oDiv.innerHTML = '<div id="bag" class="bag"><div><a id="bag_a" onclick="noshow()">⇦</a></div><img id="bag_img" src="" /></div>';
				document.body.appendChild(oDiv);
				tips1();
				document.getElementById('bag').addEventListener('click',function (){
						document.getElementById('bag').style.top = "100%";
				})
				this.el.addEventListener('click', function(e) {
					if(e.target.src != undefined) {
						//alert(e.target.src);
						document.getElementById('bag').style.top = "0px";
						var img = document.getElementById('bag_img');

						var im = document.createElement('img');
						im.src = e.target.src;
						img.style.position = 'absolute';
						img.style.height = "";
						img.style.width = '';
						img.style.top = document.documentElement.clientHeight * 0.5 + "px";
						img.style.left = document.documentElement.clientWidth * 0.5 + "px";
						img.style.marginLeft = im.width * -0.5 + "px";
						img.style.marginTop = im.height * -0.5 + "px";
						document.getElementById('bag_img').src = e.target.src;
						if(im.height > document.documentElement.clientHeight * 0.8) {
							//alert(im.height);
							document.getElementById('bag_img').style.height = "80%"; //width有变化
							document.getElementById('bag_img').style.width = "";
							document.getElementById('bag_img').style.top = document.documentElement.clientHeight * 0.5 + "px";
							document.getElementById('bag_img').style.marginTop = document.documentElement.clientHeight * 0.8 * -0.5 + "px";
							img.style.left = document.documentElement.clientWidth * 0.5 + "px";
							img.style.marginLeft = img.width * -0.5 + "px";
						} else if(im.width > document.documentElement.clientWidth * 0.8) {
							//alert(im.width);
							document.getElementById('bag_img').style.height = "";
							document.getElementById('bag_img').style.width = "80%"; //height有变化
							document.getElementById('bag_img').style.left = document.documentElement.clientWidth * 0.5 + "px";
							document.getElementById('bag_img').style.marginLeft = document.documentElement.clientWidth * 0.8 * -0.5 + "px";
							img.style.top = document.documentElement.clientHeight * 0.5 + "px";
							img.style.marginTop = img.height * -0.5 + "px";
						}
					}
					//document.getElementById('bag_img').style.display = "inherit";
				});
			}

			function noshow() {
				document.getElementById('bag').style.top = "100%";
			}
			var tips1 = function() {
				var body = document.body;
				body.style.overflow = "hidden";
				body.style.height = '100%';
				body.style.width = '100%';
				var para = document.getElementById('bag');
				para.style.height = '100%';
				para.style.width = '100%';
				para.style.background = "#333";
				para.style.position = 'absolute';
				para.style.color = '#fff';
				para.style.fontSize = '40px';
				para.style.top = '100%';
				para.style.left = '0px';
				para.style.zIndex = '0';
				para.style.transition = 'all 0.4s ';
				para.style.webkitTransition = 'all 0.4s ';

				var img = document.getElementById('bag').getElementsByTagName('img');

				for(var i = 0; i < img.length; i++) {
					img[i].style.position = 'absolute';
					//img[i].style.width = '80%';
					img[i].style.top = '10%';
					img[i].style.left = '50%';
					img[i].style.marginLeft = '-40%';
				}
				var a = document.getElementById('bag').getElementsByTagName('a');
				for(var i = 0; i < img.length; i++) {
					a[i].style.position = 'absolute';
					a[i].style.cursor = "pointer";
					a[i].style.marginLeft = "10px";
					a[i].style.fontSize = "40px";
					a[i].style.color = "#fff";
				}
			}
			window.show = show;
			window.noshow = noshow;
		})(this)