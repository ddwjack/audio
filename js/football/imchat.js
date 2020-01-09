    var imchatObj = new PageController({
	   'name': 'imchat',
	   'tpl' : 'template/football/imchat.html'
    });
    imchatObj.createDomObj = function(){
    	this.ClickObj = $(".imFan");
        this.hedsetObj = $("#imchat") 
        this.followObj = $(".aAbsolute") 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            imchatObj.goBack()
        })
        /*this.chListObj.unbind('taphold').tap(function(e){ //返回
            console.log($(this))
            imchatObj.goBack()
        })*/
        
    }

    
    imchatObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            imchatObj.sectionEvent(e);
        });
        this.followObj.unbind('tap').tap(function(e){ //关注
            imfollowObj.goBack = function(){
                imfollowObj.destroy();
                imchatObj.show(true);
                // Global.fixd()
            }
            imfollowObj.show(true,function(){
                // AvdetailsObj.goewm(invitationCode)
            });
        })
        $.fn.longPress = function(fn) {
            var timeout = undefined;
            var $this = this;
            for(var i = 0;i<$this.length;i++){
                $this[i].addEventListener('longTap', function(event) {
                    var ths = $(this)
                    $(ths).css('background','#F0F2F5').siblings().css('background','#fff')
                    $(ths).find('.div_remove').show(500).parent('.chat_list').siblings().find('.div_remove').hide()
                }, false);
                $this[i].addEventListener('tap', function(event) {
                    var ths = $(this)
                    $('.div_remove').hide()
                    $(ths).css('background','#F0F2F5').siblings().css('background','#fff')
                }, false);
            }
        }
     
        $('.chat_list').longPress(function(e){
            console.log(e)
         });
        $('.deletefont').on('touchend',function(){
            $('.p_hider').remove();
            $('.deletefont').remove();
        })                      
    }
    imchatObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : imchatObj.gofollow(thisObj);return true; //
                case "a_tuij" : imchatObj.gotuij(thisObj);return true; //  
                case "a_kuoz" : imchatObj.gokuoz(thisObj);return true; //  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                // case "userimde" : this.gouserimde(thisObL);return true; //*  进入聊天 暂时取消

            }
        }
    }
    imchatObj.gofollow = function(obj){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('active');
        obj.addClass('active');
        $('.center_gz').show().siblings('.center_tj').hide()
        // var clId = $('.kjTitleObj').find('li.on').attr('data-v')
    }
    imchatObj.gouserimde = function(obj){
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        // var thisD = obj.attr('data-d')
        chatdetailObj.goBack = function(){
            chatdetailObj.destroy();
            imchatObj.show(true);
            // Global.fixd()
        }
        chatdetailObj.show(true,function(){
            // chatdetailObj.AgoraRTMObj(thisD,thisN)
            // chatdetailObj.rtmuserLt(thisD)
            // AvdetailsObj.goewm(invitationCode) client
        });
    }
    imchatObj.onloadExecution = function(){
    	imchatObj.createDomObj()
        imchatObj.createEvent()
    }
    imchatObj.init = function(){
	 	imchatObj.onloadExecution()
    }