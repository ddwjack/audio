    var extensionObj = new PageController({
	   'name': 'extension',
	   'tpl' : 'template/user/extension.html'
    });
    extensionObj.createDomObj = function(){
    	this.ClickObj = $(".extsi_fan");
        this.hedsetObj = $("#feedback")
        this.butontgObj = $(".but_tg") //立即推广  
        this.motiongObj = $(".sp_right") //我的推广   
        this.golikfObj = $(".but_kf") //聯繫客服   

        this.ClickObj.tap(function(e){ //返回
            extensionObj.goBack()
        })
        this.golikfObj.unbind('tap').tap(function(){
            feedbackObj.goBack = function(){
                feedbackObj.destroy();
                extensionObj.show();
            }
            feedbackObj.show();
        })
        this.butontgObj.tap(function(){
            mycodeObj.goBack = function(){
                mycodeObj.destroy();
                extensionObj.show();
                // Global.fixd()
            }
            // setupeeObj.show();
            mycodeObj.show(true,function(){
                mycodeObj.goewm(ewm)
            });
        })
        this.motiongObj.tap(function(){
            mypromotionObj.goBack = function(){
                mypromotionObj.destroy();
                extensionObj.show();
                // Global.fixd()
            }
            // setupeeObj.show();
            mypromotionObj.show();
        })

        $('.feed_ul li').tap(function(){
            $(this).addClass('active').siblings().removeClass('active')
            $('.div_feed div.not_div').eq($(this).index()).show().siblings().hide()
        })
    }

    extensionObj.goyao = function(obj){
        ewm = obj
        console.log(obj)
        $('#im_yq').html('<img class="im_code" src="images/xiazai.png" alt="">\
                        <p class="p_yao">我的邀請碼:'+obj+'</p>')
    }
    extensionObj.createEvent = function(){
        // console.log(userCenterObj.userInfo)
        this.hedsetObj.unbind('tap').tap(function(e){
            extensionObj.sectionEvent(e);
        });
    }
    extensionObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_tg
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "account" : extensionObj.accountRecord();return true; //账户管理
                case "caching" : extensionObj.cachingRecord();return true; //清理缓存
                case "current" : extensionObj.currentRecord();return true;  //版本更新
                case "protocol" : extensionObj.protocolRecord();return true;  //用户协议
            }
        }
    }

    extensionObj.onloadExecution = function(){
    	extensionObj.createDomObj()
        extensionObj.createEvent()
    }
    extensionObj.init = function(){
	 	extensionObj.onloadExecution()
    }