    var giftObj = new PageController({
	   'name': 'gift',
	   'tpl' : 'template/football/gift.html',
       'pullDistance': 220
    });

    giftObj.createDomObj = function(){
    	this.ClickObj = $(".giftFan");
        this.hedsetObj = $("#gift");
        this.bannerImgObj = $("#deti_bannerImgObj"); //轮播  hgcp
        this.bannerDivObj = this.bannerImgObj.parent();
    }
    giftObj.bannerObj = function(id){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            role:'user',
            anchor_id:id,
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/gift_cabinet', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (res.err == undefined) {
                     res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    giftObj.textObj(res.info.list)
                    // $.alertMsg(res.err) 
                    // footballObj.followgz(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    giftObj.textObj = function(res){
        var html = ''
        for (var i = 0; i < res.length; i++) {
            html += '<li class="li_gift center">\
                    <img class="img_gift" src="'+ res[i].image +'" alt="">\
                    <p class="gift_text">'+ res[i].title +'</p>\
                    <p class="gift_numb">X'+ res[i].num +'</p>\
                </li>'
        }
        $('#giftLis').html(html)
    }
    
    giftObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            giftObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            giftObj.goBack()
        })
    }
    giftObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Ayhyx" : giftObj.goyhyx(thisObj);return true; //用户印象 
                case "Agift" : giftObj.gogift(thisObj);return true; //礼物柜 
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
    
    giftObj.onloadExecution = function(){
    	giftObj.createDomObj()
        giftObj.createEvent()
        window.scrollTo(0,0)
        // giftObj.bannerObj()
        // giftObj.createBannerHeight()
    }
    giftObj.init = function(){
	 	giftObj.onloadExecution()
    }