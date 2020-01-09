    var actressObj = new PageController({
       'name': 'actress',
       'tpl' : 'template/kaijiang/actress.html'
    });
    actressObj.createDomObj = function(){
        this.ClickObj = $(".acteFan");
        this.hedsetObj = $("#actress") 
        // this.scrollObj = $("#numKaijiang_scrollObj");
        this.ClickObj.unbind('tap').tap(function(e){ //返回 cent
            actressObj.goBack()
        })
        /*$('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
        })*/
    }
    
    actressObj.createEvent = function(){
        var page = 1;
        var size = 10;
        $('#actre').dropload({  
            scrollArea : window,
            distance : 20,
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
                    album_id:vidId,
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
                    url: ConfigObj.localSite+'/VideoInterface/video_album_list',
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
                            var red = parseInt(Math.random()*257).toString(16);
                            var blue = parseInt(Math.random()*257).toString(16);
                            var green= parseInt(Math.random()*257).toString(16);
                            var gray= parseInt(Math.random()*257).toString(16);
                            var pink= parseInt(Math.random()*257).toString(16);
                            var orange= parseInt(Math.random()*257).toString(16);
                            var purple= parseInt(Math.random()*257).toString(16);
                            var slateblue= parseInt(Math.random()*257).toString(16);
                            var winered = parseInt(Math.random()*257).toString(16);
                            var color0 = '#'+red+blue+orange;
                            var color1 = '#'+blue+red+gray;
                            var color2 = '#'+green+orange+red;
                            var color3 = '#'+pink+gray+green;
                            var color4 = '#'+red+orange+pink;
                            var color5 = '#'+blue+green+orange;
                            var color6 = '#'+purple+pink+green;
                            var color7 = '#'+red+slateblue+winered;
                            var color8 = '#'+winered+purple+green;
                            var color9 = '#'+slateblue+pink+purple;
                            var test = [color0,color1,color2,color3,color4,color5,color6,color7,color8,color9]; 
                            if(arrLen > 0){
                               for(var i=0; i<arrLen; i++){
                                randomObj()
                                var labe = dat[i].label.split("|")
                                result += '<li class="li_vid" data-t="actobj" data-v="'+ dat[i].id +'" data-g="'+ dat[i].cover_one +'" data-c="'+ dat[i].class +'">\
                                    <i class="opactiy act_opac" ></i>\
                                    <img class="img_vi fl he10" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ dat[i].cover_one + '" alt="" >\
                                    <p class="p_top ovhidden">'+ dat[i].title +'</p>\
                                    <p class="p_bot c_gray">';
                                    for (var j = 0; j < labe.length; j++) {
                                        var cour = test[Math.floor(Math.random()*test.length)]
                                        result += '<span style="background:'+ cour +'" class="sp_link">'+ labe[j]+'</span>'
                                    }
                                    result += '</p></li>'
                                }
                            }else{
                                $.alertMsg('已經到底了，沒有更多視頻了')
                                $('#acte_hide').show()
                                me.lock();
                                // me.noData(); chanTitle
                            }
                                $('#acters').append(result);
                                var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.4)/1.6)
                                $('#acters img').css('height',imag)
                                $('#acters i.opactiy').css('height',imag)
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
            actressObj.sectionEvent(e);
        });
    }
    actressObj.sectionEvent = function(e){
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
                case "actobj" : this.chanlType(thisV,thisC,thisG,thisObL);return true; //*
            }
        }
    }
    actressObj.uptitlePlay = function(type,thisI,thisV){
        console.log(128)
        actressObj.cssObj(type,thisI,thisV)
        actressObj.Avajax(type)
        gifJson()
    }
    actressObj.cssObj = function(type,thisI,thisV){
        $('#hed_act').attr('src',thisI)
        $('#cents').html(thisV)
        var hei = Math.floor(document.documentElement.clientWidth/1.6)
        $('#hed_act').css('height',hei)
        gifNone()
    }
    actressObj.Avajax = function(obj){
        // console.log(obj)
        vidId = obj
        actressObj.createEvent()
        var postData ={
            album_id:vidId,
            page:'1',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/video_album_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) acters
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    actressObj.chlis(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    actressObj.chanlType = function(typ,cla,ig,obj){
        // console.log(obj.find('.act_opac'))
        obj.find('.act_opac').show()
        obj.siblings().find('.act_opac').hide()
        setTimeout(function(){$('#acters').find('.act_opac').hide()},1000);
        Global.playVideo(typ,cla,ig)
    }

    actressObj.chlis = function(rq){
        var html = ''
        // var arrp = rq.label.split(",")
        //红，绿，蓝三原色，10进制码转16进制，随机数1到256之间
        var red = parseInt(Math.random()*257).toString(16);
        var blue = parseInt(Math.random()*257).toString(16);
        var green= parseInt(Math.random()*257).toString(16);
        var gray= parseInt(Math.random()*257).toString(16);
        var pink= parseInt(Math.random()*257).toString(16);
        var orange= parseInt(Math.random()*257).toString(16);
        var purple= parseInt(Math.random()*257).toString(16);
        var slateblue= parseInt(Math.random()*257).toString(16);
        var winered = parseInt(Math.random()*257).toString(16);
        // console.log(Math.random())
        var color0 = '#'+red+blue+orange;
        var color1 = '#'+blue+red+gray;
        var color2 = '#'+green+orange+red;
        var color3 = '#'+pink+gray+green;
        var color4 = '#'+red+orange+pink;
        var color5 = '#'+blue+green+orange;
        var color6 = '#'+purple+pink+green;
        var color7 = '#'+red+slateblue+winered;
        var color8 = '#'+winered+purple+green;
        var color9 = '#'+slateblue+pink+purple;
        var test = [color0,color1,color2,color3,color4,color5,color6,color7,color8,color9]; 
        for (var i = 0; i < rq.length; i++) {
            randomObj()
            var itm = rq[i]
            // console.log(itm.label.split("|"))
            var labe = itm.label.split("|")
            html += '<li class="li_vid" data-t="actobj" data-v="'+ itm.id +'" data-g="'+ itm.cover_one +'" data-c="'+ itm.class +'">\
                <i class="opactiy act_opac" ></i>\
                <img class="img_vi fl he10" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ itm.cover_one + '" alt="" >\
                <p class="p_top ovhidden">'+ itm.title +'</p>\
                <p class="p_bot c_gray"> '
            for (var j = 0; j < labe.length; j++) {
                var cour = test[Math.floor(Math.random()*test.length)]
                // console.log(cour)
                html += '<span style="background:'+ cour +'" class="sp_link color'+ j +'">'+ labe[j]+'</span>'
            }
            html += '</p></li>'

        }
        gifNone()
        $('#acters').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.4)/1.6)
        $('#acters img').css('height',imag)
        $('#acters i.opactiy').css('height',imag)
    }
    actressObj.yzmQd = function(){ //验证码确定发送
        changeObj.goBack = function(){
            changeObj.destroy();
            actressObj.show();
        }
        changeObj.show();
    }

    actressObj.onloadExecution = function(){
        actressObj.createDomObj()
        // setTimeout(function(){$('#sec_fa').find('.new_opac').hide()},1000);
        // actressObj.createEvent()
    }
    actressObj.init = function(){
        actressObj.onloadExecution()
        gifJson()

    }