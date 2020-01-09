    var xgwordObj = new PageController({
       'name': 'xgword',
       'tpl' : 'template/user/xgword.html'
    });
    xgwordObj.createDomObj = function(){
        this.ClickObj = $(".xiugFan");
        this.hedsetObj = $("#xgword") 

        this.imeiObj = $("#goyzm") //获取验证码
        this.userNameObj = $('#bdiphone')  //手机号 
        this.pwdDivObj = $('#bdpasswrd')  //密码*/
        this.submitloginObj = $('#bdqueren') //注册 
        this.pwdyzmObj = $("#bdyzm"); 
    }
    
    xgwordObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            xgwordObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            xgwordObj.goBack()
        })
        this.imeiObj.unbind('tap').tap(function(){
            createCode()
            // xgwordObj.getMsg()
        })
        this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
                xgwordObj.submitlogin();
        });
    }
    xgwordObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : xgwordObj.gofollow(thisObj);return true; //
                // case "a_tuij" : xgwordObj.gotuij(thisObj);return true; //  
                case "Alogin" : xgwordObj.AloginObj(thisObj);return true; //  
            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "upd" : this.updateType(thisObL);return true; //* 
                case "whdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //* 
            }
        }
    }
    xgwordObj.submitlogin = function(){ //修改密码 getUserInfo 
            var userData = this.createUserData();
            var invit = $('#input_yqm').val()
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            console.log($('#goyzm').html())
            console.log($('#bdyzm').val())
            if ($('#bdyzm').val() != $('#goyzm').html()) {
                $.alertMsg('请输入正确的验证码')
                return false;
            }
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                user_id:ConfigObj.meId,
                client:client,
                mobile: userData[0],
                event:'bind_mobile',
                code: userData[2],
                password: userData[1],
                invitation_code:invit
            }
            console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/user/bind_mobile',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
                console.log(obj)
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    AccountObj.destroy()
                    mypageObj.show(true)
                    Global.fixd()
                }else{
                    
                    $.alertMsg(obj.err )
                }
            // loginObj.socialAuth()
            },
            error : function(obj){
            alert('綁定失败'+ obj)
            }
        });
    }

    xgwordObj.getMsg = function () { //regist_updateMsg info
      if ($('#goyzm').hasClass('alreadysend')) return;  
        var userName = $('#bdiphone').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        var passwos = $('#bdpasswrd').val();
        if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}

        $('#goyzm').html('發送');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            client:client,
            mobile: userName,
            type: 'user',
            event:'bind_mobile'
        }
        var info = Global.encrypt(postData);
        // http://120.27.68.38:9001/common/sendCode
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                return false;
            }
            // else $.alertMsg(req.err);
            $('#goyzm').html('60s');
            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    $('#goyzm').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#goyzm').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    xgwordObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord,yzm);
    }
    xgwordObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //login_submitlogin
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };
    xgwordObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    xgwordObj.AloginObj = function(obj){
        loginObj.goBack = function(){
            xgwordObj.show();
            loginObj.destroy();
        }
        loginObj.show(true,function(){
            $('#bdiph').hide()
        });
    }
    function createCode(){/* 生成验证码的函数 */
        var code="";
        var codeLength=4;
        var checkCode=document.getElementById("goyzm");
        checkCode.value="";
        var selectChar=new Array(1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','X','Y','Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
        for(var i=0;i<codeLength;i++){
            var charIndex=Math.floor(Math.random()*61);
            code+= selectChar[charIndex];
        }
        if (code.length != codeLength) {
            createCode();
            // console.log(code)
            // checkCode.innerHTML=code;
        }else{
            console.log(code)
            checkCode.innerHTML=code;    
        }
        
    }
    xgwordObj.onloadExecution = function(){
        xgwordObj.createDomObj()
        xgwordObj.createEvent()
        createCode()
    }
    xgwordObj.init = function(){
        xgwordObj.onloadExecution()
    }