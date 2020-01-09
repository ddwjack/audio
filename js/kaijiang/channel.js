    var channelObj = new PageController({
       'name': 'channel',
       'tpl' : 'template/kaijiang/channel.html'
    });
    channelObj.createDomObj = function(){
        this.ClickObj = $(".channelFan");
        this.hedsetObj = $("#channel") 
        this.scrollObj = $("#numKaijiang_scrollObj");
        this.ClickObj.unbind('tap').tap(function(e){ //返回 cent
            channelObj.goBack()
        })
        $('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
        })
    }
    
    channelObj.createEvent = function(){
        var page = 1;
        var size = 10;
        $('#channel').dropload({  
            scrollArea : window,
            distance : 50,
            loadDownFn:function(me){
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                var postData ={
                    label:labl,
                    page:page,
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                }
                // console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/Video/label_video',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        // var fo = Global.crypt(res)
                        if (res.ok == true) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            // console.log(res.info)
                            var dat = res.info
                            var arrLen = res.info.length;
                            if(arrLen > 0){
                               for(var i=0; i<arrLen; i++){
                                randomObj()
                                result += '<li style="position:relative" class="ch_li" data-t="chdetail" data-v="'+ dat[i].id +'" data-c="'+ dat[i].class +'" data-g="'+ dat[i].cover_one +'">\
                                            <i class="opactiy chan_opac"></i><img class="Im_non" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ dat[i].cover_one+'" alt="">\
                                            <p class="p_text">'+ dat[i].title +'</p>\
                                        </li>';
                                }
                                }else{
                                    me.lock();
                                    $.alertMsg('已經到底了，沒有更多視頻了')
                                    $('#chel_hide').show()
                                    // me.noData(); chanTitle
                                }
                                    $('#chaList').append(result);
                                    var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.6)
                                    $('#chaList img').css('height',imag)
                                    // $('#ul_zxp i.opactiy').css('height',imag)
                                    me.resetload();
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        me.resetload();
                    }
                })
            }
        }) 
        this.hedsetObj.unbind('tap').tap(function(e){
            channelObj.sectionEvent(e);
        });
    }
    channelObj.sectionEvent = function(e){
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v"); 
            var thisC = thisObL.attr("data-c"); 
            var thisG = thisObL.attr("data-g"); 
            console.log(thisT)//account caching current 
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "chdetail" : this.chanlType(thisV,thisC,thisG,thisObL);return true; //*
            }
        }
    }
    channelObj.uptitlePlay = function(type,im,tex){
        var hei = Math.floor(document.documentElement.clientWidth/1.6)
        $('#hed_curl').css('height',hei)
        // $('#chanTitle').html(type)
        if (!im) {
            $('#hed_curl').css('display','none')
        }else{
            $('#hed_curl').attr('src',im)
        }
        // $('#hed_curl').css({'background':'url('+im+')','background-size':'100% 100%','height':'90px'})
        $('#cent').html(tex)
    }
    channelObj.gochann = function(type,im,tex){
        channelObj.loadingObj(type)
        // uptitlePlay
    } 
    channelObj.loadingObj = function(type) {
        setTimeout(function() {
            channelObj.updatePlay(type,1);
            labl = type
        },800)
    }
    channelObj.updatePlay = function(typ,id){
        var postData ={
            label:typ,
            page:id,
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
        // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', ciphertext
            url: ConfigObj.localSite+'/Video/label_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) hed_curl
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    channelObj.chlis(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    channelObj.chanlType = function(typ,cla,im,obj){
        obj.find('.chan_opac').show()
        obj.siblings().find('.chan_opac').hide()
        setTimeout(function(){$('#chaList').find('.chan_opac').hide()},1000);
        Global.playVideo(typ,cla,im)
        /*if (ConfigObj.platForm === 'android') {
            android_obj.playVideo(typ,cla,im)
        }else if (ConfigObj.platForm === 'ios'){
            ios_obj.playVideo(typ,cla,im)
        }else{
            VdetailObj.goBack=function(){
                VdetailObj.destroy();
                channelObj.show(); 
            }
            VdetailObj.show(true,function(){
                console.log(typ)
                console.log(cla)
                // alert(typ) user_id
                VdetailObj.updatePlay(typ,cla,im)
            });
        }*/
    }

    channelObj.chlis = function(rq){
        if (rq.length == 0) {
            $('#img_chenl').show()
        }else{
            $('#img_chenl').hide()
        }
        var html = ''
        for (var i = 0; i < rq.length; i++) {
            randomObj()
            var itm = rq[i]
            html += '<li style="position:relative" class="ch_li" data-t="chdetail" data-v="'+ itm.id +'" data-c="'+ itm.class +'" data-g="'+ itm.cover_one +'">\
                        <i class="opactiy chan_opac"></i><img class="Im_non" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ itm.cover_one+'" alt="">\
                        <p class="p_text">'+ itm.title +'</p>\
                    </li>'

        }
        gifNone()
        $('#chaList').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.6)
        $('#chaList img').css('height',imag)
        // $('#ul_zxp i.opactiy').css('height',imag)
    }
    channelObj.yzmQd = function(){ //验证码确定发送
        changeObj.goBack = function(){
            changeObj.destroy();
            channelObj.show();
        }
        changeObj.show();
    }

    channelObj.onloadExecution = function(){
        channelObj.createDomObj()
        channelObj.createEvent()
        gifJson()
          window.scrollTo(0,0)
    }
    channelObj.init = function(){
        channelObj.onloadExecution()
    }