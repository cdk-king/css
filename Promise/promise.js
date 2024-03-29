var resultEl = document.getElementById("result");

    var consoleLog = function(el){
        this.el = el;
        this.value = "";
        this.print = function(str){
            console.log(str);
            this.value = this.value + "<p>"+str + "</p>";
            this.el.innerHTML = this.value;
        }
    }
    
    window.consoleLog = new consoleLog(resultEl);
    
    function getUserName(){
        return new Promise(function(resolve){
            //异步请求
            setTimeout(function(){
                consoleLog.print("start-getUserName");
                resolve("cdk");
            },500);
            
        });
    }

    getUserName().then(function(name){
        //一些处理
        consoleLog.print(name);
    }).then(getUserJobByName);

    function getUserJobByName(name){
        return new Promise(function(resolve){
            //异步请求
            setTimeout(function(){
            consoleLog.print("start-getUserJobByName");
            consoleLog.print("king");
            resolve("king");
            },500);
        });
    }
    // Promise1.0
    // function Promise(fn){
    //     var state = "pending";
    //     var value = null;
    //     var callbacks = [];
    //     this.then = function(onFulfilled){
    //         //fulfilled前
    //         if(state === "pending"){
    //             callbacks.push(onFulfilled);
    //             return this;
    //         }
    //         //fulfilled后
    //         onFulfilled(value);
    //         return this;  
    //     };
    //     function resolve(newValue){
    //         value = newValue;
    //         state = "fulfilled";
    //         //事件后置，放置在js任务队列末尾,异步回调,确保顺序,正常传参
    //         setTimeout(function(){
    //             callbacks.forEach(function(callback){
    //                 callback(value);
    //             });
    //         },0);
    //     }
    //     fn(resolve);
    // }

    // Promise2.0
    function Promise(fn){
        var state = "pending";
        var value = null;
        var callbacks = [];
        this.then = function(onFulfilled){
            console.log(onFulfilled);
            return new Promise(function(resolve){
                //桥梁Promise取消运行resolve,直接handle传递resolve和onFulfilled
                handle({
                    onFulfilled: onFulfilled || null,
                    resolve: resolve
                });
            });
        };
        //callback(包括onFulfilled和resolve)
        function handle(callback){
            
            if(state === "pending"){
                callbacks.push(callback);
                return;
            }
            if(!callback.onFulfilled){
                callback.resolve(value);
                return;
            }
            var ret = callback.onFulfilled(value);
            callback.resolve(ret);
        };
        function resolve(newValue){
            if(newValue && (typeof newValue === 'object' || typeof newValue === 'function')){
                var then = newValue.then;
                if(typeof then === 'function'){
                    //桥接Promise
                    then.call(newValue,resolve);
                    return;
                }
            }

            value = newValue;
            state = "fulfilled";
            setTimeout(function(){
                callbacks.forEach(function(callback){
                    handle(callback);
                });
            },0);
        }
        fn(resolve);
    }