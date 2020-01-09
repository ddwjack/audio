    var checkObj = new PageController({
       'name': 'check',
       'tpl' : 'template/user/check.html'
    });
    checkObj.createDomObj = function(){
        this.ClickObj = $(".xiugFan");
        this.hedsetObj = $("#xgword") 

        this.imeiObj = $("#checkhq") //获取验证码
        this.userNameObj = $('#chiphone')  //手机号 
        // this.pwdDivObj = $('#bdpasswrd')  //密码*/
        this.submitloginObj = $('#chequeren') //注册 
        this.pwdyzmObj = $("#chyzm"); 
    }
    
    checkObj.createEvent = function(){
        $('#chiphone').val(ConfigObj.iphon)
        this.hedsetObj.unbind('tap').tap(function(e){
            checkObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            checkObj.goBack()
        })
        this.imeiObj.unbind('tap').tap(function(){
            checkObj.getMsg()
        })
        this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
                checkObj.submitlogin();
        });
    }
    checkObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : checkObj.gofollow(thisObj);return true; //
                // case "a_tuij" : checkObj.gotuij(thisObj);return true; //  
                case "Alogin" : checkObj.AloginObj(thisObj);return true; //  
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
    checkObj.submitlogin = function(){ //修改密码 getUserInfo 
            var userData = this.createUserData();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                user_id:ConfigObj.meId,
                client:client,
                mobile: userData[0],
                event:'auth_mobile',
                code: userData[1],
                // password: userData[1],
                // invitation_code:invit
            }
            console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/user/auth_mobile',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
                console.log(obj)
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    ConfigObj.iphon = userData[0]
                    checkObj.goBack()
                    Global.channelId()
                    // mypageObj.show(true)
                    // Global.fixd()
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

    checkObj.getMsg = function () { //regist_updateMsg info
      if ($('#checkhq').hasClass('alreadysend')) return;  
        var userName = $('#chiphone').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
       /* var passwos = $('#bdpasswrd').val();
        if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}*/

        $('#checkhq').html('發送中');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            user_id:ConfigObj.meId,
            client:client,
            mobile: userName,
            type: 'user',
            event:'auth_mobile'
        }
        var info = Global.encrypt(postData);
        console.log(postData)
        // http://120.27.68.38:9001/common/sendCode
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                 $('#checkhq').removeClass('alreadysend').html('重新獲取');
                return false;
            }
            // else $.alertMsg(req.err);
            $('#checkhq').html('60s');
            var i = 60;
            checkObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(checkObj.msgInterval);
                    $('#checkhq').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#checkhq').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    checkObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,yzm);
    }
    checkObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入驗證碼'); //login_submitlogin
            return false;
        } /*else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } */
        return true;
    };
    checkObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    checkObj.AloginObj = function(obj){
        loginObj.goBack = function(){
            checkObj.show();
            loginObj.destroy();
        }
        loginObj.show(true,function(){
            $('#bdiph').hide()
        });
    }
    checkObj.onloadExecution = function(){
        checkObj.createDomObj()
        checkObj.createEvent()
    }
    checkObj.init = function(){
        checkObj.onloadExecution()
    }