    var myNoticeObj = new PageController({
	   'name': 'myNotice',
	   'tpl' : 'template/user/myNotice.html'
    });
    myNoticeObj.createDomObj = function(){
    	this.ClickObj = $(".not_fan");
        this.hedsetObj = $("#notice")

        this.ClickObj.tap(function(e){ //返回
            myNoticeObj.goBack()
        })
    }

    myNoticeObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            myNoticeObj.sectionEvent(e);
        });
        $('.not_ul li').tap(function(){
            $(this).addClass('active').siblings().removeClass('active')
            $('.div_list div.not_div').eq($(this).index()).show().siblings().hide()
        })
    }
    myNoticeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisV = thisObj.attr("data-v");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "detai" : myNoticeObj.detaiRecord(thisV);return true; //公告详情
            }
        }
    }
    myNoticeObj.detaiRecord = function(e){
        detailsObj.goBack = function(){
            detailsObj.destroy();
            myNoticeObj.show();
        }
        detailsObj.show();
    }

    myNoticeObj.onloadExecution = function(){
    	myNoticeObj.createDomObj()
        myNoticeObj.createEvent()
    }
    myNoticeObj.init = function(){
	 	myNoticeObj.onloadExecution()
    }