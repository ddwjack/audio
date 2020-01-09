    var myfollowObj = new PageController({
	   'name': 'myfollow',
	   'tpl' : 'template/user/myfollow.html',
       'pullDistance': 220
    });

    myfollowObj.createDomObj = function(){
    	this.ClickObj = $(".myfollFan");
        this.hedsetObj = $("#myfollow");
    }
    myfollowObj.bannerObj = function(){
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/followed', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    myfollowObj.followgz(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myfollowObj.goimgFoll = function(obj){
        gifJson()
        var thisD = obj.attr('data-d')
        var thisH = obj.attr('data-h')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            role:'user',
            anchor_id:thisD,
            anchor_no:thisH,
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/setFollow', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (res.code == '0') {
                    console.log(66)
                    myfollowObj.bannerObj()
                    // $(obj).parents('li').hide()
                    $.alertMsg(res.suc) 
                    // footballObj.followgz(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    myfollowObj.followgz = function(res){
        console.log(res)
        // console.log(res) data-l="1VN" data-I="'+ onLin.anchor_id +'" data-d="'+ onLin.anchor_no +'" data-n="'+ onLin.nickname +'" data-g="'+ onLin.avatar_url +'"
        var html = ''
        var hLVL = ''
        var zaim = res.online.multiple,lixm = res.offline.multiple,zais = res.online.single,lixs = res.offline.single
        if (zaim.length == '0' && lixm.length == '0') {
            $('#myLVN_wei').css('display','block')
            $('#followList').html('')
        }else{
            for (var i = 0; i < zaim.length; i++) {
                mathliveObj()
                html += '<li class="w100 page" style="margin-bottom:10px;">\
                        <p class="p_relo"><span><i class=""></i>直播中</span><a data-t="goIm" data-l="1VN" data-I="'+ zaim[i].anchor_id +'" data-d="'+ zaim[i].anchor_no +'" data-n="'+ zaim[i].nickname +'" data-g="'+ zaim[i].avatar_url +'" href="javascript:void(0)"><img class="fr im_w20" src="images/room/message.png" alt=""></a></p>\
                        <a class="diflex" data-t="goroom" data-d="'+ zaim[i].anchor_id +'" data-f="'+ zaim[i].studio_name +'" data-l="1VN" data-h="'+ zaim[i].anchor_no+'" href="javascript:void(0)">\
                            <img class="w100 fl_img_wid" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ zaim[i].cover_y +'" alt="#">\
                        </a>\
                        <div class="vid_bot">\
                            <a class="block" data-w="sp_tex_gz" data-t="imgFoll" data-d="'+ zaim[i].anchor_id +'" data-h="'+ zaim[i].anchor_no +'" href="javascript:void(0)">\
                                <ul>\
                                    <li class="w80">\
                                        <p class="r13">'+ zaim[i].nickname +'\
                                        </p>\
                                        <p class="r12">'+ zaim[i].craft +'</p>\
                                    </li>\
                                    <li class="w19 center" style="line-height:50px;">\
                                        <span class="Agz sp_tex_gz">已關注</span>\
                                    </li>\
                                </ul>\
                            </a>\
                        </div>\
                    </li>'
            }
            for (var i = 0; i < lixm.length; i++) {
                mathliveObj()
                html += '<li class="w100 page" style="margin-bottom:10px;">\
                                <p class="p_relo"><span><i class="gray"></i>未開播</span><a data-t="goIm" data-l="1VN" data-I="'+ lixm[i].anchor_id +'" data-d="'+ lixm[i].anchor_no +'" data-n="'+ lixm[i].nickname +'" data-g="'+ lixm[i].avatar_url +'" href="javascript:void(0)"><img class="fr im_w20" src="images/room/message.png" alt=""></a></p>\
                                <a class="diflex" data-t="Adeta" data-d="'+ lixm[i].anchor_id +'" data-l="1VN" data-z="'+ lixm[i].anchor_no+'" href="javascript:void(0)">\
                                    <img class="w100 fl_img_wid" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ lixm[i].cover_y +'" alt="#">\
                                </a>\
                                <div class="vid_bot">\
                                    <a class="block" data-w="sp_tex_gz" data-t="imgFoll" data-d="'+ lixm[i].anchor_id +'" data-h="'+ lixm[i].anchor_no +'" href="javascript:void(0)">\
                                        <ul>\
                                            <li class="w80">\
                                                <p class="r13">'+ lixm[i].nickname +'\
                                                </p>\
                                                <p class="r12">'+ lixm[i].craft +'</p>\
                                            </li>\
                                            <li class="w19 center" style="line-height:50px;">\
                                                <span class="Agz sp_tex_gz">已關注</span>\
                                            </li>\
                                        </ul>\
                                    </a>\
                                </div>\
                            </li>'
            }
            $('#followList').html(html)
            $('#myLVN_wei').css('display','none')
            var imag = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
            $('.fl_img_wid').css('height',imag)
        }
        if (zais.length == '0' && lixs.length == '0') {
            $('#myLVL_wei').css('display','block')
            $('#ulfollowlx').html('')
        }else{
            for (var i = 0; i < zais.length; i++) {
                mathliveObj()
                hLVL += '<li class="w48 page LV_img_wid" style="margin-bottom:10px">\
                            <p class="p_relo"><span><i class="'+ (zais[i].online == 'OFF' ? 'gray' : '') +'"></i>'+ (zais[i].online == 'OFF' ? '离线' : ( zais[i].living == 'OFF' ? '空闲' : '忙线'))+'</span><a class="A_LVL_gz" data-w="A" data-t="imgFoll" data-d="'+ zais[i].anchor_id +'" data-h="'+ zais[i].anchor_no +'" href="javascript:void(0)"><img class="fr" src="images/room/off.png" alt="" /></a></p>\
                            <a data-t="Adeta" data-d="'+ zais[i].anchor_id +'" data-l="1V1" data-z="'+ zais[i].anchor_no+'" href="javascript:void(0)">\
                                <img class="w100 img_HeiLVL" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ zais[i].cover_y +'" alt="">\
                            </a>\
                            <div class="vid_bot">\
                                <a class="block A_col_te" data-t="goroom" data-n="'+ zais[i].nickname +'" data-g="'+ zais[i].avatar_url +'" data-d="'+ zais[i].anchor_id +'" data-f="'+ zais[i].studio_name +'" data-l="1V1" data-h="'+ zais[i].anchor_no+'"  href="javascript:void(0)">\
                                    <ul>\
                                        <li class="wid_li wid40">\
                                            <span>'+ zais[i].nickname+'</span>\
                                        </li>\
                                        <li class="wid_li wid40 center">\
                                            <span style="font-size:1rem;">'+ zais[i].fee+'币/分</span>\
                                        </li>\
                                        <li class="wid_li wid20">\
                                            <img style="width:26px;" src="'+ (zais[i].online == 'OFF' ? 'images/room/lix.png' : ( zais[i].living == 'OFF' ? 'images/room/camera.png' : 'images/room/lix.png'))+'" alt="">\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
            }
            for (var i = 0; i < lixs.length; i++) {
                mathliveObj()
                // console.log(lixs[i])
                hLVL += '<li class="w48 page LV_img_wid" style="margin-bottom:10px">\
                        <p class="p_relo"><span><i class="'+ (lixs[i].online == 'OFF' ? 'gray' : '') +'"></i>'+ (lixs[i].online == 'OFF' ? '离线' : ( lixs[i].living == 'OFF' ? '空闲' : '忙线'))+'</span><a class="A_LVL_gz" data-w="A" data-t="imgFoll" data-d="'+ lixs[i].anchor_id +'" data-h="'+ lixs[i].anchor_no +'" href="javascript:void(0)"><img class="fr" src="images/room/off.png" alt="" /></a></p>\
                        <a data-t="Adeta" data-d="'+ lixs[i].anchor_id +'" data-l="1V1" data-z="'+ lixs[i].anchor_no+'" href="javascript:void(0)">\
                            <img class="w100 img_HeiLVL" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ lixs[i].cover_y +'" alt="">\
                        </a>\
                        <div class="vid_bot">\
                            <a class="block A_col_te" data-t="goroom" data-n="'+ lixs[i].nickname +'" data-g="'+ lixs[i].avatar_url +'" data-d="'+ lixs[i].anchor_id +'" data-f="'+ lixs[i].studio_name +'" data-l="1V1" data-h="'+ lixs[i].anchor_no+'"  href="javascript:void(0)">\
                                <ul>\
                                    <li class="wid_li wid40">\
                                        <span>'+ lixs[i].nickname+'</span>\
                                    </li>\
                                    <li class="wid_li wid40 center">\
                                        <span style="font-size:1rem;">'+ lixs[i].fee+'币/分</span>\
                                    </li>\
                                    <li class="wid_li wid20">\
                                        <img style="width:26px;" src="'+ (lixs[i].online == 'OFF' ? 'images/room/lix.png' : ( lixs[i].living == 'OFF' ? 'images/room/camera.png' : 'images/room/lix.png'))+'" alt="">\
                                    </li>\
                                </ul>\
                            </a>\
                        </div>\
                    </li>'
            }
            $('#ulfollowlx').html(hLVL)
            var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
            $('#myLVL_wei').css('display','none')
            $('.img_HeiLVL').css('height',ighe)
        }
        gifNone()
    }
    myfollowObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            myfollowObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            myfollowObj.goBack()
        })
    }
    myfollowObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "Agift" : myfollowObj.gogift(thisObj);return true; //礼物柜
                case "goIm" : myfollowObj.goImchat(thisObj);return true;   // im聊天  
                case "imgFoll" : myfollowObj.goimgFoll(thisObj);return true;   // 關注   
                case "Adeta" : myfollowObj.Adeta(thisObj);return true;   //详细信息 
                case "goroom" : footballObj.goroomOb(thisObj);return true;   //    
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "lVlLive" : myfollowObj.golive(thisObL);return true; //用户印象 
                case "xbqx" : $('#sex').hide();return true; //性别取消
            }
        }
    }
    myfollowObj.goImchat = function(obj){
        imLogin(obj)
        /*imchatObj.goBack = function(){
            imchatObj.destroy();
            // imLogout()
            myfollowObj.show();
        }
        imchatObj.show(true,function(){
            // imLogin()
            // AvdetailsObj.goewm(invitationCode)
        });*/
    }
    myfollowObj.Adeta = function(obj){
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            myfollowObj.show();
            Global.fixd()
        }
        AvdetailsObj.show(true,function(){
            //  doOneLive
            AvdetailsObj.detaObj(obj.attr('data-d'),obj.attr('data-z'),obj.attr('data-l'))
        });
    }

    myfollowObj.golive = function(obj){
        var thisL = obj.attr('data-l')
        obj.addClass('activ').siblings().removeClass('activ')
        if (thisL == 'lvl') {
            $('.live_LVL').show().siblings('.div_live').hide()
            var ighe = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
            $('img.imHeig').css('height',ighe)
            console.log(ighe)
        }else{
            $('.div_live').show().siblings('.live_LVL').hide()
            var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
            $('img.img_nam').css('height',imag)
            console.log(imag)
        }
    }
    myfollowObj.foloadObj = function() {
        setTimeout(function() {
            myfollowObj.createDomObj()
            myfollowObj.createEvent()
            myfollowObj.bannerObj()
        },100)
    }
    myfollowObj.onloadExecution = function(){
        myfollowObj.foloadObj()
        // myfollowObj.createBannerHeight()
    }
    myfollowObj.init = function(){
	 	myfollowObj.onloadExecution()
    }