    var nextGenderObj = new PageController({
	   'name': 'nextGender',
	   'tpl' : 'template/register/nextGender.html'
    });
    nextGenderObj.createDomObj = function(){
    	this.ClickObj = $(".genFan");
        this.hedsetObj = $("#nextGender")  
        window.scrollTo(0,0)
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextGenderObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextGenderObj.submitlogin = function(){ //登录 getUserInfo 
            var userData = this.createUserData();
            if (!this.checkUserName(userData[0])) return;
            if (!this.checkPassword(userData[1])) return;
            // var pwd = hex_md5(userData[1]);  //加密屏蔽  请输入用户名
            var postData = {
                mobile: userData[0],
                pwd: userData[1],
                imei:ConfigObj.Iemid,
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                user_id:ConfigObj.meId,
            }
        
      $('.but_sign').text('正在登錄中...');
        var secretData = {
          'info' : Global.encrypt(postData),
          'isdjis':'jdasjd'
        };
        $.ajax({
          url : ConfigObj.localSite+"/api/user_login",
          data : secretData,
          type : "post",
          dataType : "json",
          success : function(obj){
              if(obj.ok == true){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                var nam_Img = obj.info.user_id
                ConfigObj.meId = nam_Img
                ConfigObj.iphon = obj.info.mobile
                if (ConfigObj.platForm == 'android') {
                    android_obj.getSaveUserID(nam_Img)
                }
                loginObj.isLogin = true;
                // loginObj.getUserInfo(nam_Img,'2');
              }else{
                    $('.but_sign').text('登錄');
                    $.alertMsg(obj.err)
              }
        // loginObj.socialAuth()
          },
        error : function(obj){
          alert('登录失败'+ obj)
          $('.but_sign').text('登錄');
        }
        });
    }
    nextGenderObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextGenderObj.goBack()
        })
        /*this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            nextGenderObj.sectionEvent(e);
        });
    }
    nextGenderObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "xbqued" : nextGenderObj.goxbqued(thisObj);return true; //密码显示*   
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "li_xzxb" : nextGenderObj.goxbzb(thisObj);return true; //密码显示*   
            }
        }
    }
    nextGenderObj.goxbqued = function(obj){
            var gensd = $('li.li_active').attr('data-x')
            var arrNm = {'sex':gensd}
            Global.usNoetu(arrNm)
            // localStorage.setItem("yhxbId", gensd);
            nextGenderObj.goBack()
    }
    nextGenderObj.goxbzb = function(obj){
        obj.addClass('li_active').siblings().removeClass('li_active')
        // gande = obj.attr('data-x')
    }
    /*function changepic() {
        var reads= new FileReader();
        f=document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            console.log(this.result)
            document.getElementById('show').src=this.result;
        }
    }*/
    nextGenderObj.onloadExecution = function(){
    	nextGenderObj.createDomObj()
        nextGenderObj.createEvent()
        // nextGenderObj.submitlogin()
    }
    nextGenderObj.init = function(){
	 	nextGenderObj.onloadExecution()
    }