    var mycollectionObj = new PageController({
	   'name': 'mycollection',
	   'tpl' : 'template/user/mycollection.html',
       'pullDistance': 220
    });

    mycollectionObj.createDomObj = function(){
    	this.ClickObj = $(".collFan");
        this.hedsetObj = $("#collection");
    }
    mycollectionObj.bannerObj = function(){
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

    
    mycollectionObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            mycollectionObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            mycollectionObj.goBack()
        })
    }
    mycollectionObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Agift" : mycollectionObj.gogift(thisObj);return true; //礼物柜 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "lVlLive" : mycollectionObj.golive(thisObL);return true; //用户印象 
                case "xbqx" : $('#sex').hide();return true; //性别取消
            }
        }
    }
    mycollectionObj.golive = function(obj){
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
    }
    mycollectionObj.onloadExecution = function(){
    	mycollectionObj.createDomObj()
        mycollectionObj.createEvent()
        mycollectionObj.bannerObj()
        // mycollectionObj.createBannerHeight()
    }
    mycollectionObj.init = function(){
	 	mycollectionObj.onloadExecution()
    }