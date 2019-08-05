document.getElementById('content2Submit').addEventListener('click', function() {
    //下一行代码无法运行script脚本
    //document.getElementById("iframeResult").contentWindow.document.body.innerHTML = document.getElementById('textareaCode').value;
    document.getElementById("iframeResult").contentWindow.document.open();
    document.getElementById("iframeResult").contentWindow.document.write(document.getElementById('textareaCode').value);
    document.getElementById("iframeResult").contentWindow.document.close();
});

var html3 = "";
var content2SubmitEl = document.getElementById('content2Submit');
var textareaCodeEl = document.getElementById('textareaCode');
var textareaCodeValue = textareaCodeEl.value;
var htmlCode1El = document.getElementById('htmlCode1');
var htmlCode1Value = htmlCode1El.innerHTML;
var htmlCode2El = document.getElementById('htmlCode2');
var htmlCode2Value = htmlCode2El.innerHTML;

//需要优化成链式操作 
//.then{}
writerHtmlCode(textareaCodeEl,htmlCode1Value,0,0,0,function(){
    content2SubmitEl.click();
    var str = textareaCodeEl.value;
    var index1 = str.indexOf("</head>");
    var index2 = str.length-index1;
    html3 = "";
    writerHtmlCode(textareaCodeEl,htmlCode2Value,0,index1,index2,function(){
        var htmlCode3El = document.getElementById('htmlCode3');
        var htmlCode3Value = htmlCode3El.innerHTML;

        content2SubmitEl.click();
        var str = textareaCodeEl.value;
        var index1 = str.indexOf("</body>");
        var index2 = str.length-index1;
        html3 = "";
        writerHtmlCode(textareaCodeEl,htmlCode3Value,0,index1,index2,function(){
            var htmlCode4El = document.getElementById('htmlCode4');
            var htmlCode4Value = htmlCode4El.innerHTML;

            content2SubmitEl.click();
            var str = textareaCodeEl.value;
            var index1 = str.indexOf("</scri");
            var index2 = str.length-index1;
            html3 = "";
            writerHtmlCode(textareaCodeEl,htmlCode4Value,0,index1,index2,function(){
                content2SubmitEl.click();

                var htmlCode5El = document.getElementById('htmlCode5');
                var htmlCode5Value = htmlCode5El.innerHTML;
                var str = textareaCodeEl.value;
                var index1 = str.indexOf("树叶f")+4;
                var index2 = str.length-index1;
                html3 = "";
                writerHtmlCode(textareaCodeEl,htmlCode5Value,0,index1,index2,function(){
                    content2SubmitEl.click();

                    var htmlCode6El = document.getElementById('htmlCode6');
                    var htmlCode6Value = htmlCode6El.innerHTML;
                    var str = textareaCodeEl.value;
                    var index1 = str.indexOf("花f")+3;
                    var index2 = str.length-index1;
                    html3 = "";
                    writerHtmlCode(textareaCodeEl,htmlCode6Value,0,index1,index2,function(){
                        content2SubmitEl.click();

                        var htmlCode7El = document.getElementById('htmlCode7');
                        var htmlCode7Value = htmlCode7El.innerHTML;
                        var str = textareaCodeEl.value;
                        var index1 = str.indexOf("太阳f")+4;
                        var index2 = str.length-index1;
                        html3 = "";
                        writerHtmlCode(textareaCodeEl,htmlCode7Value,0,index1,index2,function(){
                            content2SubmitEl.click();
                        });
                    });
                });
            });
        });
    });
},function(){
    //content2SubmitEl.click();
});

function getScrollTop(str){
    var count = 0;
    var len = str.length; 
    while(len--){
        var char = str.substring(len-1,len);
        if(char=="\n"){
            count++;
        } 
    }
    return count;
}

function writerHtmlCode(el,data,dataIndex,elIndex1,elIndex2,callback,stepcallback){
    var oochar = data.substring(dataIndex-1,dataIndex);
    var ochar = data.substring(dataIndex,dataIndex+1);
    var nchar = data.substring(dataIndex+1,dataIndex+2);

    html3 += data.substring(dataIndex,dataIndex+1);
    var len = el.value.length;
    var len2 = html3.length;
    el.innerHTML = el.value.substring(0,elIndex1-1)+html3+el.value.substring(len-elIndex2,len);
    dataIndex++;
    if(dataIndex<data.length){
        var char = data.substring(dataIndex-1,dataIndex);
        if(typeof(stepcallback)=="function"){
            stepcallback();
        }
        if(false){
            setTimeout(function(){
                writerHtmlCode(el,data,dataIndex,elIndex1,elIndex2,callback,stepcallback);
                el.scrollTop = el.scrollHeight;
                
            },40)
        }else{
            setTimeout(function(){
                writerHtmlCode(el,data,dataIndex,elIndex1,elIndex2,callback,stepcallback);
                //el.scrollTop = el.scrollHeight;
                //console.log(el.scrollTop);
                var count = getScrollTop(el.value.substring(0,elIndex1-1)+html3);
                el.scrollTop = ((count-25)*23);
                //console.log(count);
                //console.log(count*23+"/"+el.scrollHeight);
            },20)
        }
    }else{
        if(typeof(callback)=="function"){
            callback();
        }
    }
    return this;//实现链式
}