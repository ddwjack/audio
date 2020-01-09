    var registeredObj = new PageController({
     'name': 'registered',
     'tpl' : 'template/user/registered.html'
    });
    registeredObj.createDomObj = function(){
      // this.ClickObj = $(".login_fans");
        this.hedsetObj = $("#Aregist")
        this.butregObj = $('#Abutton_pwd') //密码登录登录
        this.useriphoneObj = $('#Alogin_pwdObj')  //手机号 login_pwdObj  
        this.pwdDivObj = $('#Aregister_pwd')  //密码*/ 
        this.yhxyObj = $("#i_regyhxy");  // 用戶協議 
        this.TyyhxyObj = $("#regYhxy");  // 同意用戶協議 
        this.logtypObj = $("#i_reg_typ");  // 是否記住密碼 
    }
    registeredObj.submitlogin = function(){ //登录 getUserInfo 
            var invit = $('#inp_reg_yqm').val()
            var userData = this.createUserpwd();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            if (!$('#regYhxy').hasClass('i_Off')) {
                $.alertMsg('請同意用戶協議')
                return false;
            }
            gifJson()
            var postData = {
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                version:ConfigObj.version,
                user_id:ConfigObj.meId,
                client:client,
                mobile: userData[0],
                event:'bind_mobile',
                code: '',
                password: userData[1],
                invitation_code:invit
            }
      // return false;
    //    //console.log(ConfigObj.localSite + "?m=user.account.login"); but_zc
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // return false;
        $.ajax({
            url : ConfigObj.localSite+'/user/bind_mobile',
            // url : ConfigObj.localSite + "?version=1&m=user.account.login", login_submitlogin
            data : secretData,
            type : "post",
            dataType : "json",
            beforeSend:function(argument) {
                $('#Abutton_pwd').text('快速注册中');
            },
            success : function(obj){
            // obj.info = $.parseJSON(Global.crypt(obj.result));
                if(!obj.err){
                    $.alertMsg(obj.suc)
                    if ($('#i_reg_typ').hasClass('lgshow')) {
                        ConfigObj.bdType = '2'
                    }else{
                        ConfigObj.bdType = '1'
                    }
                    // alert(1)
                    bdTypeObj(ConfigObj.bdType)
                    // obj.info = $.parseJSON(Global.crypt(obj.result)); 
                    // console.log(obj.info)
                    registeredObj.isLogin = true;
                    /*alert(2)
                    if (ConfigObj.platForm == 'android') {
                        android_obj.getSaveUserID(nam_usId)
                    }else if(ConfigObj.platForm == 'ios'){
                        ios_obj.getSaveUserID(nam_usId)
                    }
                    alert(3)*/
                    homeObj.show();
                    Global.checkUpdate();  //检查版本更新
                    Global.channelId()
                    Global.fixd()
                    getUnRead()
                    // registeredObj.pwdDivObj.children('input').val('');   // 清空密码域
                    // mypageObj.show(true)
                    // localStorage.setItem("Imtexts", '0');
                    // gifJson()
                }else{
                    $('#Abutton_pwd').text('快速注册');
                    // $('.but_zc').text('注册');
                    $.alertMsg(obj.err )
                    gifNone()
              }
        // registeredObj.socialAuth()
          },
        error : function(obj){
          alert('網絡異常，請稍後重試')
        }
        });
    }
    registeredObj.gouserRZ = function(){
        zbrzoneObj.goBack = function(){
            zbrzoneObj.destroy();
            registeredObj.show(true);
        }
        zbrzoneObj.show(true);
    }
    registeredObj.iphon = function(){
        $('#bdiph').hide()
    }
    registeredObj.createUserData = function(){
        var userName = this.userNameObj.val();
        // console.log(userName)
        // var passWord = this.pwdDivObj.val();
        var yzm = this.pwdyzmObj.val();
        return new Array(userName,yzm);
    }
    registeredObj.createUserpwd = function(){
        var userName = this.useriphoneObj.val();
        // console.log(userName)
        var passWord = this.pwdDivObj.val();
        // var yzm = this.pwdyzmObj.val();
        return new Array(userName,passWord);
    }

    registeredObj.checkUserName = function (name) {
        console.log(name)
        if (name.length == 0) {
            $.alertMsg('請輸入手机号码') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };

    registeredObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };

    registeredObj.createEvent = function(){
        if (ConfigObj.bdType == '2') {
            $('#i_reg_typ').addClass('lgshow')
        }else{
            $('#i_reg_typ').removeClass('lgshow')
        }
        $('#login_pwdObj').val(ConfigObj.iphon)
        this.hedsetObj.unbind('tap').tap(function(e){
            registeredObj.sectionEvent(e);
        });
        /*this.ClickObj.tap(function(e){ //返回
            registeredObj.goBack()
        })*/
        $(".zc_center").bind('input propertychange',function (e) {
            console.log(157)
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            // console.log(162)
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
        var iOSPagescrollTimer = null;
        $("body").on("focus","select,input[type=text],input[type=password]",function(){
            console.log(167)
            var agent = navigator.userAgent.toLocaleLowerCase();
            if(agent.indexOf("micromessenger") != -1 && agent.indexOf("iphone") != -1 && !$(this).attr("readonly")){
                clearTimeout(iOSPagescrollTimer);
            }
        })
        /*$("#Alogin_pwdObj").focus(function(){ // 手机号
            $('#Aregister_pwd,#inp_reg_yqm').attr('disabled','disabled')
        })
        $("#Alogin_pwdObj").blur(function(){ // 手机号
            setTimeout(function() {
                $('#Aregister_pwd,#inp_reg_yqm').removeAttr('disabled')
            },400)
        }) 

        $("#Aregister_pwd").focus(function(){ // 密码
            $('#Alogin_pwdObj,#inp_reg_yqm').attr('disabled','disabled')
        })
        $("#Aregister_pwd").blur(function(){ // 密码
            setTimeout(function() {
                $('#Alogin_pwdObj,#inp_reg_yqm').removeAttr('disabled')
            },400)
        }) 
        
        $("#inp_reg_yqm").focus(function(){ // 邀请码
            $('#Aregister_pwd,#Alogin_pwdObj').attr('disabled','disabled')
        })
        $("#inp_reg_yqm").blur(function(){   // 邀请码
            setTimeout(function() {
                $('#Aregister_pwd,#Alogin_pwdObj').removeAttr('disabled')
            },400)
        }) */

        $("body").on("blur","select,input[type=text],input[type=password]",function(){
            console.log(183)
            var agent = navigator.userAgent.toLocaleLowerCase();
            if(agent.indexOf("micromessenger") != -1 && agent.indexOf("iphone") != -1 && !$(this).attr("readonly")){
                iOSPagescrollTimer = setTimeout(function(){
                    $(window).scrollTop($(window).scrollTop()+2)
                },500);
            }
        })
        /*this.imeiObj.unbind('tap').tap(function(){
            registeredObj.getMsg()
        })*/
        this.butregObj.unbind('tap').tap(function(){
            console.log(175)
            registeredObj.submitlogin(2)
        })
        this.yhxyObj.unbind('tap').tap(function() { // 用戶協議
            protocolObj.goBack = function(){
                protocolObj.destroy();
                registeredObj.show();
            }
            protocolObj.show();
        })
        this.TyyhxyObj.unbind('tap').tap(function() {
            $(this).toggleClass('i_Off')
        })
        this.logtypObj.unbind('tap').tap(function() {
            $(this).toggleClass('lgshow')
        })
    }
    registeredObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "paswo" : registeredObj.paswo();return true; //密码显示*
                // case "patex" : registeredObj.patex();return true; //显示密码
                case "Aregist" : registeredObj.AregistObj();return true;  //验证码登录 
                case "Ammlogin" : registeredObj.AmmregisteredObj();return true;  //密码登录 
                case "Awjpwd" : registeredObj.AwjpwdObj();return true;  //密码登录  
                case "Agozc" : registeredObj.AgozcObj();return true;  //密码登录  修改手機號碼不需要 password  修改手機號和密碼需要 password
            }
        }
    }
    registeredObj.AregistObj = function(obj){
        loginObj.goBack = function(){
            loginObj.destroy();
            registeredObj.show();
        }
        loginObj.show();
        /*$('.goyzmdl').css('display','none')
        $('.gommdl').css('display','block')*/
    }
    registeredObj.AmmregisteredObj = function(obj){
        $('.goyzmdl').css('display','block')
        $('.gommdl').css('display','none')
    }
    registeredObj.AwjpwdObj = function(){
        pwdregisteredObj.goBack = function(){
            pwdregisteredObj.destroy();
            registeredObj.show();
        }
        pwdregisteredObj.show();
    }
    registeredObj.AgozcObj = function(){
        zregisterObj.goBack = function(){
            zregisterObj.destroy();
            registeredObj.show();
        }
        zregisterObj.show();
    }
    registeredObj.getMsg = function () { //regist_updateMsg info
      if ($('#imeihq').hasClass('alreadysend')) return;  
        var userName = $('#login_iphoneObj').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}
        $('#imeihq').html('發送中');
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            client:client,
            mobile: userName,
            type: 'user',
            event:'login'
        }
        // console.log(postData)
        var info = Global.encrypt(postData);
        Global.postceshi('/common/sendCode',{info:info}, function (req) {
            // console.log(req);
            if (!req.err) {
                $.alertMsg('短信驗證碼發送成功', true);
            }else{
                $.alertMsg(req.err);
                $('#imeihq').html('重新获取');
                return false;
            }
            $('#imeihq').html('60s');
            var i = 60;
            registeredObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(registeredObj.msgInterval);
                    $('#imeihq').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#imeihq').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    registeredObj.onloadExecution = function(){
      registeredObj.createDomObj()
        registeredObj.createEvent()
        gifNone()
    }
    registeredObj.init = function(){
        registeredObj.onloadExecution()
    }