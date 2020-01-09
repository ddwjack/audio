    var xgwordsObj = new PageController({
       'name': 'xgwords',
       'tpl' : 'template/user/xgwords.html'
    });
    xgwordsObj.createDomObj = function(){
        this.ClickObj = $(".xiugFan");
        this.hedsetObj = $("#xgword") 

        this.imeiObj = $("#goyzm") //获取验证码
        this.userNameObj = $('#bdiphone')  //手机号 
        this.pwdDivObj = $('#bdpasswrd')  //密码*/
        this.submitloginObj = $('#bdqueren') //注册 
        this.pwdyzmObj = $("#bdyzm"); 
    }
    
    xgwordsObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            xgwordsObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            xgwordsObj.goBack()
        })
        this.imeiObj.unbind('tap').tap(function(){
            xgwordsObj.getMsg()
        })
        this.submitloginObj.unbind('tap').tap(function(){ //登录 login_wxlogin
                xgwordsObj.submitlogin();
        });
    }
    xgwordsObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : xgwordsObj.gofollow(thisObj);return true; //
                // case "a_tuij" : xgwordsObj.gotuij(thisObj);return true; //  
                case "Alogin" : xgwordsObj.AloginObj(thisObj);return true; //  
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
    xgwordsObj.submitlogin = function(){ //修改密码 getUserInfo 
            var userData = this.createUserData();
            var invit = $('#input_yqm').val()
            console.log(57)
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                user_id:ConfigObj.meId,
                client:client,
                mobile: userData[0],
                event:'change_mobile',
                code: userData[1],
                // password: userData[1],
                // invitation_code:invit
            }
            console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url : ConfigObj.localSite+'/user/change_mobile',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
                console.log(obj)
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    ConfigObj.iphon = userData[0]
                    xgwordsObj.goBack()
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

    xgwordsObj.getMsg = function () { //regist_updateMsg info
      if ($('#goyzm').hasClass('alreadysend')) return;  
        var userName = $('#bdiphone').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
       /* var passwos = $('#bdpasswrd').val();
        if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}*/

        $('#goyzm').html('發送');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            user_id:ConfigObj.meId,
            client:client,
            mobile: userName,
            type: 'user',
            event:'change_mobile'
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
                return false;
            }
            // else $.alertMsg(req.err);
            $('#goyzm').html('60s');
            var i = 60;
            xgwordsObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(xgwordsObj.msgInterval);
                    $('#goyzm').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#goyzm').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    xgwordsObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,yzm);
    }
    xgwordsObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入驗證碼'); //login_submitlogin
            return false;
        } /*else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } */
        return true;
    };
    xgwordsObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    xgwordsObj.AloginObj = function(obj){
        loginObj.goBack = function(){
            xgwordsObj.show();
            loginObj.destroy();
        }
        loginObj.show(true,function(){
            $('#bdiph').hide()
        });
    }
    xgwordsObj.onloadExecution = function(){
        xgwordsObj.createDomObj()
        xgwordsObj.createEvent()
    }
    xgwordsObj.init = function(){
        xgwordsObj.onloadExecution()
    }