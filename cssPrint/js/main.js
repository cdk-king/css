var game = {
    pageIndex:1,
    pageCount:3,
    init:function(){

        this.initQueue();
        createPage();
        changePage();

        this.startContent1();
    },
    initQueue:function(){
        this.queue = new Queue();
        this.queue.addItem(homeEl);
		this.queue.addItem(content1El);
		this.queue.addItem(content2El);
        this.queue.addItem(content3El);
        this.queue.update(0);
    },
    resize:function(){
        if(typeof (this.queue)!='undefined'){
            this.queue.update(0);
        }else{
            this.initQueue();
        }

        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        var scale = Math.min(width/1280,height/732);

        // var gameContainer = document.getElementById("container");
        // gameContainer.style.transform = "translate(-50%, -50%) " + "scale(" + scale + ")";

        //console.log(scale);
    },
    turnLeft:function(){

    },
    turnRight:function(){
        
    },
    startContent1:function(){
        writerCss(styleText,css1,0);
    },
    startContent2:function(){

    }
}

//
var Queue = function(){
    this.index = 0;
    this.length = 0;
    this.arr = [];
    this.addItem = function(el){
        for(var i = 0;i<this.arr.length;i++){
            var item = this.arr[i];
            if(item===el){
                return;
            }
        }
        this.arr.push(el);
        this.length++;
    };
    this.update = function(num){
        var tmp = num+this.index;
        if(tmp<0 || tmp>(this.length-1)){
            return;
        }
        this.index = tmp;
        this.reloadStyle();
    },
    this.reloadStyle = function(){
        for(var i = 0;i<this.arr.length;i++){
            var item = this.arr[i];
            var n = i - this.index;
            var width =document.body.clientWidth;
            if(n<0){
                item.style.marginLeft = n*width+"px";
                item.style.marginRight = "";
            }else{
                item.style.marginLeft = n*width+"px";
                item.style.marginRight = "";
            }
            item.style.position = "absolute";
        }
    }
}