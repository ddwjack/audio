    var AyhxyObj = new PageController({
	   'name': 'Ayhxy',
	   'tpl' : 'template/football/Ayhxy.html',
       'pullDistance': 220
    });

    AyhxyObj.createDomObj = function(){
    	this.ClickObj = $(".yhxyFan");
        this.hedsetObj = $("#Ayhxy");
        this.bannerImgObj = $("#deti_bannerImgObj"); //轮播  hgcp
        this.bannerDivObj = this.bannerImgObj.parent();
    }
    AyhxyObj.bannerObj = function(){
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
                    // AyhxyObj.createBanner(res.info)
                }else{
                    // console.log(res.err)
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  fixed

            }
        })
    }

    
    AyhxyObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            AyhxyObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            AyhxyObj.goBack()
        })
    }
    AyhxyObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Ayhyx" : AyhxyObj.goyhyx(thisObj);return true; //用户印象 
                case "Agift" : AyhxyObj.gogift(thisObj);return true; //礼物柜 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "xbqx" : $('#sex').hide();return true; //性别取消
            }
        }
    }
    
    AyhxyObj.onloadExecution = function(){
    	AyhxyObj.createDomObj()
        AyhxyObj.createEvent()
        AyhxyObj.bannerObj()
        // AyhxyObj.createBannerHeight()
    }
    AyhxyObj.init = function(){
	 	AyhxyObj.onloadExecution()
    }    