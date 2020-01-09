    var imfollowObj = new PageController({
	   'name': 'imfollow',
	   'tpl' : 'template/football/imfollow.html'
    });
    imfollowObj.createDomObj = function(){
    	this.ClickObj = $(".imFan");
        this.hedsetObj = $("#imfollow") 
        // this.chListObj = $(".chat_list") 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            imfollowObj.goBack()
        })
        /*this.chListObj.unbind('taphold').tap(function(e){ //返回
            console.log($(this))
            imfollowObj.goBack()
        })*/
        
    }

    
    imfollowObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            imfollowObj.sectionEvent(e);
        });
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
    imfollowObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : imfollowObj.gofollow(thisObj);return true; //
                case "a_tuij" : imfollowObj.gotuij(thisObj);return true; //  
                case "a_kuoz" : imfollowObj.gokuoz(thisObj);return true; //  
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
                case "upd" : this.updateType(thisObL);return true; //* 
                case "whdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //* 

            }
        }
    }
    imfollowObj.gofollow = function(obj){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('active');
        obj.addClass('active');
        $('.center_gz').show().siblings('.center_tj').hide()
        // var clId = $('.kjTitleObj').find('li.on').attr('data-v')
    }
    imfollowObj.updateType = function(obj){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('on');
        obj.addClass('on');
        var thisV = obj.attr("data-v");
        var thisN = obj.attr("data-n");
        var thisC = obj.attr("data-c");
        var thisD = obj.attr("data-d");
        var thisM = obj.attr("data-m");
        // console.log(thisC)
        this.nowLotteryType = thisV;
        this.nowPage = 0;
        imfollowObj.whoilPlay(thisV,thisN,'3',thisD,thisM)   //
        this.titleScrollVal();
        // setTimeout(function(){ $('#wh_ul').find('.new_opac').hide()},1000);
    }
    imfollowObj.updatePlay = function(typ,id,nub){
        if (id == null) {
            var tyId = ''
        }else{
            var tyId = id
        }
        var postData ={  
            state:'1', 
            page:'1',
            class_name:'',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            id:tyId,
            keyword:''
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/search_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    imfollowObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    imfollowObj.onloadExecution = function(){
    	imfollowObj.createDomObj()
        imfollowObj.createEvent()
    }
    imfollowObj.init = function(){
	 	imfollowObj.onloadExecution()
    }    