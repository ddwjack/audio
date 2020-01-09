cordova.define("com.lotterywifi.a.getPhoto",
    function(require, exports, module) {
        var exec = require("cordova/exec");
        module.exports = {
            getPhoto: function(content){
                exec(
                function(message){//成功回调function
                    console.log(message);
                },
                function(message){//失败回调function
                    console.log(message);
                },
                "getPhoto",//feature name
                "getPhoto",//action
                [content]//要传递的参数，json格式
                );
            }
        }
});