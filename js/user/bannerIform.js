    var bannerIformObj = new PageController({
	   'name': 'bannerIform',
	   'tpl' : 'template/user/bannerIform.html'
    });
    bannerIformObj.createEvent = function(){
        // this.hedsetObj.unbind('tap').tap(function(e){
        //     bannerIformObj.sectionEvent(e);
        // });
    }
    bannerIformObj.urlObj = function(url) {
        // console.log(url)
        // $('#iframeObj').attr('src',url)
        // document.write(url)
        $('#iframeObj').attr('src',url)
    }
    bannerIformObj.createDomObj = function(){
        this.ClickObj = $(".banner_fan");  

        this.ClickObj.tap(function(e){ //返回   goewm
            bannerIformObj.goBack()
        })
    }
    bannerIformObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "Abangding" : bannerIformObj.Abgdcode(thisObj);return true; //账户管理 Abangding
            }
        }
    }
    bannerIformObj.onloadExecution = function(){
    	bannerIformObj.createDomObj()
        bannerIformObj.createEvent()
    }
    bannerIformObj.init = function(){
	 	bannerIformObj.onloadExecution()
    }