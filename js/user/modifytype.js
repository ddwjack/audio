    var modifytypeObj = new PageController({
	   'name': 'modifytype',
	   'tpl' : 'template/user/modifytype.html',
    });

    modifytypeObj.createDomObj = function(){
    	this.ClickObj = $(".moditpFan");
        this.hedsetObj = $("#modTp");
        // this.stupObj = $("#gosetup");
    }
    modifytypeObj.bannerObj = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'1'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Api/bannel_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    
    modifytypeObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            modifytypeObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            modifytypeObj.goBack()
        })
    }
    modifytypeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Aqhzg" : modifytypeObj.goqhzhs(thisObj);return true; //切换账号 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "modypad" : modifytypeObj.modypad(thisObL);return true; //修改密碼 
                case "modytal" : modifytypeObj.modytal(thisObL);return true; //修改手機號 
                case "mocheck" : modifytypeObj.gocheck(thisObL);return true; //校驗手機 
            }
        }
    }
    modifytypeObj.modypad = function(obj){
        pwdloginObj.goBack = function(){
            pwdloginObj.destroy();
            modifytypeObj.show();
        }
        // setupeeObj.show();  
        pwdloginObj.show();
        modifytypeObj.destroy();
        /*xgpaswordObj.goBack = function(){
            xgpaswordObj.destroy();
            modifytypeObj.show();
        }
        // setupeeObj.show();  
        xgpaswordObj.show();
        modifytypeObj.destroy();*/
    }
    modifytypeObj.modytal = function(obj){
        console.log('修改手機號')
        xgwordsObj.goBack = function(){
            xgwordsObj.destroy();
            modifytypeObj.show();
        }
        // setupeeObj.show();  
        xgwordsObj.show();
        modifytypeObj.destroy();
        /*protocolObj.goBack = function(){
            protocolObj.destroy();
            modifytypeObj.show();
            Global.fixd()
        }
        // setupeeObj.show();  
        protocolObj.show();
        modifytypeObj.destroy();*/
    }
    modifytypeObj.gocheck = function() {
        if (ConfigObj.auth_mobile == '1') {
            $.alertMsg('請勿重複校驗') 
            return false;
        }
        checkObj.goBack = function(){
            checkObj.destroy();
            modifytypeObj.show();
        }
        // setupeeObj.show();  
        checkObj.show();
        modifytypeObj.destroy();
    }
    modifytypeObj.onloadExecution = function(){
    	modifytypeObj.createDomObj()
        modifytypeObj.createEvent()
        // modifytypeObj.createBannerHeight()
    }
    modifytypeObj.init = function(){
	 	modifytypeObj.onloadExecution()
    }