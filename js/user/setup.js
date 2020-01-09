    var setupObj = new PageController({
	   'name': 'setup',
	   'tpl' : 'template/user/setup.html',
    });

    setupObj.createDomObj = function(){
    	this.ClickObj = $(".setupFan");
        this.hedsetObj = $("#setup");
        this.stupObj = $("#gosetup"); 
        this.IsetObj = $("#i_xtsz"); 
    }
    setupObj.bannerObj = function(){
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

    
    setupObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        if (ConfigObj.bdType == '2') {
            $('#i_xtsz').addClass('imgshow_type')
        }else{
            $('#i_xtsz').removeClass('imgshow_type')
        }
        this.hedsetObj.unbind('tap').tap(function(e){
            setupObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            /*if ($('#i_xtsz').hasClass('imgshow_type')) {
                ConfigObj.bdType = '2'
            }else{
                ConfigObj.bdType = '1'
            }
            bdTypeObj(ConfigObj.bdType)*/
            setupObj.goBack()
        })
        this.IsetObj.unbind('tap').tap(function(e) {
            $(this).toggleClass('imgshow_type')
        })
        $('#sp_banben').html(ConfigObj.version)
    }
    setupObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Aqhzg" : setupObj.goqhzhs(thisObj);return true; //切换账号 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "yhxy" : setupObj.goyhxy(thisObL);return true; //用户协议
                case "jcgx" : Global.checkUpdate(true);return true; //检查更新
                case "xttz" : setupObj.goxttz(thisObL);return true; //系统通知
            }
        }
    }
    setupObj.goyhxy = function(obj){
        protocolObj.goBack = function(){
            protocolObj.destroy();
            setupObj.show();
            // Global.fixd()
        }
        // setupeeObj.show();  
        protocolObj.show();
        setupObj.destroy();
    }
    setupObj.goxttz = function(obj){
        // $.alertMsg('敬请期待')
        detailsObj.goBack = function(){
            detailsObj.destroy();
            setupObj.show();
        }
        detailsObj.show(true,function(){
            detailsObj.goajplay()
        });
    }
    setupObj.goqhzhs = function(){
        // $.alertMsg('該功能暫未開放')
        loginObj.goBack = function(){ 
            setupObj.show();
            loginObj.destroy();
        }
        loginObj.show()
        /*kaijiangIndexObj.destroy()
            mypageObj.destroy()
            dynamicObj.destroy();
        gifJson()
        localStorage.setItem("Imtexts", '0');
        $('#i_ImNum').html('0')
        loginObj.show(true,function(){
            if (ConfigObj.platForm == 'android') {
                android_obj.doMeLogout()
                gifNone()
            }else if(ConfigObj.platForm == 'ios'){
                ios_obj.doMeLogout()
                gifNone()
            }else{
                console.log(106)
                // gifNone()
            }
            $('#bdiph').hide()
        });*/
    }
    /*setupObj.golive = function(obj){
        var thisL = obj.attr('data-l')
        obj.addClass('activ').siblings().removeClass('activ')
        if (thisL == 'lvl') {
            console.log(1)
            $('.live_LVL').show().siblings('.div_live').hide()
            var ighe = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
            $('img.imHeig').css('height',ighe)
        }else{
            $('.div_live').show().siblings('.live_LVL').hide()
            var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.6)
            $('img.img_nam').css('height',imag)
        }
    }*/
    setupObj.onloadExecution = function(){
    	setupObj.createDomObj()
        setupObj.createEvent()
        // setupObj.createBannerHeight()
    }
    setupObj.init = function(){
	 	setupObj.onloadExecution()
    }