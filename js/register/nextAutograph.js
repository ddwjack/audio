    var nextAutographObj = new PageController({
	   'name': 'nextAutograph',
	   'tpl' : 'template/register/nextAutograph.html'
    });
    nextAutographObj.createDomObj = function(){
    	this.ClickObj = $(".autoFan");
        this.hedsetObj = $("#nextAutograph") 
        window.scrollTo(0,0)
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextAutographObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextAutographObj.submitlogin = function(){ //登录 getUserInfo 
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
                // var nam_Img = obj.info.user_id
                // ConfigObj.meId = nam_Img
                // ConfigObj.iphon = obj.info.mobile
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
    nextAutographObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextAutographObj.goBack()
        })
        /*this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            nextAutographObj.sectionEvent(e);
        });
        
    }
    nextAutographObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "autqued" : nextAutographObj.goautqued();return true; //密码显示*  
            }
        }
    }
    nextAutographObj.goautqued = function(){
        var valu = $('#text_gxqm').val()
        if ( valu== '') {$.alertMsg('请填写您的个性签名');return false;}
            var arrNm = {'craft':valu}
            Global.usNoetu(arrNm)
        // localStorage.setItem("gxqmId", $('#text_gxqm').val());
            // var gxqms = localStorage.getItem("gxqmId")
        nextAutographObj.goBack()
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
    nextAutographObj.onloadExecution = function(){
    	nextAutographObj.createDomObj()
        nextAutographObj.createEvent()
        // nextAutographObj.submitlogin()
    }
    nextAutographObj.init = function(){
	 	nextAutographObj.onloadExecution()
    }