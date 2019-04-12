
;(function(global) {    
    var cdk = function(el) {
        this.el = typeof(el) === "string" ? document.querySelector(el) : el;
    };

    cdk.prototype = {
        setBg: function(bg) {
            this.el.style.background = bg;
        },
        setHeight:function(height){
        	this.el.style.height = height; 
        },
        setWidth:function(width){
        	this.el.style.width = width; 
        }
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = M;
    if (typeof define === 'function') define(function() { return M; });
    window.CdkDivBg = cdk;

})(this);
