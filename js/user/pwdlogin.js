    var pwdloginObj = new PageController({
       'name': 'pwdlogin',
       'tpl' : 'template/user/pwdlogin.html'
    });
    pwdloginObj.createDomObj = function(){
        this.ClickObj = $(".pwdFan");
        this.hedsetObj = $("#pwdlogin") 

        this.imeiObj = $("#goinyzm") //获取验证码
        this.userNameObj = $('#Xiphone')  //手机号 
        this.pwdDivObj = $('#Xpasswrd')  //密码*/
        this.pwdyzmObj = $("#Xyzm"); 
        this.dlztObj = $("#i_dlzt");  // 登錄狀態
    }
    
    pwdloginObj.createEvent = function(){
        if (ConfigObj.bdType == '2') {
            $('#i_dlzt').addClass('imgshow_type')
        }else{
            $('#i_dlzt').removeClass('imgshow_type')
        }
        $('#Xiphone').val(ConfigObj.iphon)
        this.hedsetObj.unbind('tap').tap(function(e){
            pwdloginObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            pwdloginObj.goBack()
        })
        this.imeiObj.unbind('tap').tap(function(){
            pwdloginObj.getMsg()
        })
        this.dlztObj.unbind('tap').tap(function(){
            $(this).toggleClass('imgshow_type')
            if ($('#i_dlzt').hasClass('imgshow_type')) {
                ConfigObj.bdType = '2'
            }else{
                ConfigObj.bdType = '1'
            }
            console.log(ConfigObj.bdType)
            bdTypeObj(ConfigObj.bdType)
        })
    }
    pwdloginObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "Ahrefpwd" : pwdloginObj.gopwdMobi();return true; // 更換手機和密碼 
                case "Xqueren" : pwdloginObj.goXqueren();return true; // 提交註冊
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
    pwdloginObj.gopwdMobi = function() {
        pwIphonObj.goBack = function(){
            pwIphonObj.destroy();
            pwdloginObj.show();
        }
        pwdloginObj.destroy();
        pwIphonObj.show();
    }
    pwdloginObj.goXqueren = function(obj) {
        pwdloginObj.submitlogin();
    }
    pwdloginObj.submitlogin = function(){ //修改密码 getUserInfo 
        // pwdloginObj.goBack()
            var userData = this.createUserData();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkcode(userData[2])) return;
            if (!this.checkPassword(userData[1])) return;
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                user_id:ConfigObj.meId,
                client:client,
                mobile: userData[0],
                event:'reset_pwd',
                code: userData[2],
                password: userData[1]
            }
            // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
          url : ConfigObj.localSite+'/user/reset_pwd',
          data : secretData,
          type : "post",
          dataType : "json",
            success : function(obj){
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    // pwIphonObj.goBack()
                    if ($('#i_dlzt').hasClass('imgshow_type')) {
                        ConfigObj.bdType = '2'
                    }else{
                        ConfigObj.bdType = '1'
                    }
                    bdTypeObj(ConfigObj.bdType)
                    
                    pwdloginObj.goBack()
                    /*obj.info = $.parseJSON(Global.crypt(obj.result));
                    console.log(obj.info)
                    ConfigObj.meId = obj.info.anchor_id;  
                    ConfigObj.anchor = obj.info.anchor_no
                    if (ConfigObj.platForm == 'android') {
                        android_obj.setChoID(ConfigObj.meId,ConfigObj.anchor)
                    }else if(ConfigObj.platForm == 'ios'){
                        ios_obj.setChoID(ConfigObj.meId,ConfigObj.anchor)
                    }else{}
                    localStorage.setItem("anchor_id", obj.info.anchor_id);*/
                }else{
                    $('.but_sign').text('注册');
                    $.alertMsg(obj.err )
                }
        // loginObj.socialAuth()
          },
        error : function(obj){
          alert('注册失败'+ obj)
          $('.but_sign').text('注册');
        }
        });
    }

    pwdloginObj.getMsg = function () { //regist_updateMsg info
        if ($('#goinyzm').hasClass('alreadysend')) return;  
        var userName = $('#Xiphone').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        // var passwos = $('#register_smsCode').val();
        // if (passwos.length == 0) {$.alertMsg('請填写密码'); return false;}

        $('#goinyzm').html('發送');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            client:client,
            mobile: userName,
            type: 'user',
            event:'reset_pwd'
        }
        var info = Global.encrypt(postData);
        Global.post('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                return false;
            }
            // else $.alertMsg(req.err);
            $('#goinyzm').html('60s');
            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    $('#goinyzm').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#goinyzm').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    pwdloginObj.createUserData = function(){
        var userName = this.userNameObj.val();
        var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord,yzm);
    }
    pwdloginObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //login_submitlogin
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };
    pwdloginObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    pwdloginObj.checkcode = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入驗證碼') 
            return false;
        } 
        return true;
    };
    pwdloginObj.onloadExecution = function(){
        pwdloginObj.createDomObj()
        pwdloginObj.createEvent()
    }
    pwdloginObj.init = function(){
        pwdloginObj.onloadExecution()
    }