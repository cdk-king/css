;(function(global) {

    //开启严格模式，规范代码，提高浏览器运行效率    "use strict";

    //定义一个类，通常首字母大写
    var MyPlugin = function(options) {

    };

    //覆写原型链，给继承者提供方法
    MyPlugin.prototype = {
        init: function() {

        }
    };

    //兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) module.exports = MyPlugin;

    //兼容AMD/CMD规范
    if (typeof define === 'function') define(function() { return MyPlugin; });

    //注册全局变量，兼容直接使用script标签引入该插件
    global.MyPlugin = MyPlugin;
//this，在浏览器环境指window，在nodejs环境指global//使用this而不直接用window/global是为了兼容浏览器端和服务端//将this传进函数体，使全局变量变为局部变量，可缩短函数访问全局变量的时间
})(this);
接下来动手开发一个可以修改div背景颜色的插件
modify_div_bg.js
;(function(global) {    "use strict";
    var M = function(el) {
        this.el = typeof el === "string" ? document.querySelector(el) : el;
    };

    M.prototype = {
        setBg: function(bg) {
            this.el.style.background = bg;
        }
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = M;
    if (typeof define === 'function') define(function() { return M; });
    global.ModifyDivBg = M;

})(this);
