var game = {
    pageIndex:1,
    pageCount:3,
    init:function(){

        
        initQueue();
        createPage();
        changePage();

        this.startContent1();
    },
    initQueue:function(){
        console.log();
        this.queue = new Queue();
		this.queue.addItem(content1El);
		this.queue.addItem(content2El);
		this.queue.addItem(content3El);
    },
    resize:function(){
        
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