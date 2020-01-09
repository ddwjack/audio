    var detailsObj = new PageController({
	   'name': 'details',
	   'tpl' : 'template/user/details.html'
    });
    detailsObj.createDomObj = function(){
    	this.ClickObj = $(".deta_fan");
        this.hedsetObj = $("#detail")
        this.potaObj = $("#A_potato")

        this.ClickObj.tap(function(e){ //返回
            detailsObj.goBack()
        })
    }

    detailsObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            detailsObj.sectionEvent(e);
        });
    }
    detailsObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"IMG");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "paswo" : detailsObj.paswo();return true; //密码显示*
            }
        }
    }
    detailsObj.goajplay = function(){
        detailsObj.ajaxplay()
    }
    detailsObj.ajaxplay = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'2'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/AppInfo/inform',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    detailsObj.gohtml(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    detailsObj.gohtml = function(res){
        $('#pTitle').html(res.title)
        $('#diCenter').html(res.content)
        $('#diCenter a.acte').unbind('tap').tap(function(){
            if (ConfigObj.platForm === 'android') {
                android_obj.intoPatato('https://lynnconway.me/kdvideo')
            }else{
                ios_obj.intoPatato('https://lynnconway.me/kdvideo')
            }
        })
    }
    detailsObj.onloadExecution = function(){
    	detailsObj.createDomObj()
        detailsObj.createEvent()
    }
    detailsObj.init = function(){
	 	detailsObj.onloadExecution()
    }