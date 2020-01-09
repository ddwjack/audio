    var changeObj = new PageController({
	   'name': 'change',
	   'tpl' : 'template/user/change.html'
    });
    changeObj.createDomObj = function(){
    	this.ClickObj = $(".chan_fan");
        this.hedsetObj = $("#chang") 
        this.butUpObj = $(".but_suc")  //完成 
        this.XmimaObj = $("#X_ahuo")  //获取 

        this.ClickObj.tap(function(e){ //返回
            changeObj.goBack()
        })
    }

    changeObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            changeObj.sectionEvent(e);
        });
        this.butUpObj.unbind('tap').tap(function(e){
            changeObj.secbutUp(e);
        });
        this.XmimaObj.unbind('tap').tap(function(){
            changeObj.getMsg()
        })
    }
    changeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"IMG");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "passWord" : changeObj.Iword();return true; //取消*
                case "I_text" : changeObj.Itext();return true; //确定 
            }
        }
    }

    changeObj.secbutUp = function(){
        // if (true) {}
        console.log(46)
        var userData = this.createUserData();
        if (!this.checkUserName(userData[0])) return;
        if (!this.checkyzm(userData[1])) return;
        if (!this.checkPassword(userData[2])) return;

        var postData ={
            code:userData[1],
            mobile:userData[0],
            pwd:userData[2],
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
        // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', ciphertext
            url: ConfigObj.localSite+'/api/findpwd',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    $.alertMsg(res.info) 
                }else{
                    console.log(res.err)
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id); 

            }
        })
    }
    changeObj.createUserData = function(){
        var userName = $('#Xipho').val();
        var passWord = $('.xiu_wod').val();
        var imgCode = $('#xiu_mi').val(); 
        return new Array(userName,imgCode,passWord);
    }
    changeObj.checkUserName = function (name) {
        if (name.length == 0) {
            $.alertMsg('請輸入手機號') 
            return false;
        } else if (!/^1\d{10}$/g.test(name)) {
            $.alertMsg('手機號碼格式錯誤');
            return false;
        } 
        return true;
    };
    changeObj.checkyzm = function (yzm) {
      if (yzm.length == 0) {$.alertMsg('請輸入驗證碼');return false;} 
      return true;
    };
    changeObj.checkPassword = function (password) {
        if (password.length === 0) {
            $.alertMsg('請輸入密碼'); //login_submitlogin
            return false;
        } else if (!/^[\dA-Za-z]{6,16}$/g.test(password)) {
            $.alertMsg('密碼格式錯誤');
            return false;
        } 
        return true;
    };
    changeObj.getMsg = function () { //regist_updateMsg info
        console.log(45)
      if ($('#X_ahuo').hasClass('alreadysend')) return;  
        var userName = $('#Xipho').val();
        if (userName.length == 0) {$.alertMsg('請先填寫手機號碼'); return false;}
        if (!/^1\d{10}$/g.test(userName)) {$.alertMsg('手機號碼格式錯誤'); return false;}

        $('#X_ahuo').html('發送');
        var postData ={
            mobile: userName,
            type: 'findpwd',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var info = Global.encrypt(postData);
        Global.post('/api/Code',{info:info}, function (req) {
            console.log(req);
            if (req.ok == true) $.alertMsg('短信驗證碼發送成功', true);
            else $.alertMsg(req.err);
            // else $.alertMsg(req.err);
            console.log(127)
            $('#X_ahuo').html('60s');
            var i = 60;
            loginObj.msgInterval = setInterval(function () {
                if (i == 0) {
                    clearInterval(loginObj.msgInterval);
                    $('#X_ahuo').removeClass('alreadysend').html('獲取');
                    return;
                }
                $('#X_ahuo').addClass('alreadysend').html(--i + 's');
            }, 1000);
        }, function () {})
    }

    changeObj.Iword = function(){
        $('.p_show').hide().siblings('.p_hide').show()
        $('.textVal').val($('.wordVal').val())
    }
    changeObj.Itext = function(){
        $('.p_hide').hide().siblings('.p_show').show()
        $('.textVal').val($('.wordVal').val())
        console.log($('.wordVal').val())
    }
    changeObj.onloadExecution = function(){
    	changeObj.createDomObj()
        changeObj.createEvent()
    }
    changeObj.init = function(){
	 	changeObj.onloadExecution()
    }