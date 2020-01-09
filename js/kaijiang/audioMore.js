    var audioMoreObj = new PageController({
       'name': 'audioMore',
       'tpl' : 'template/kaijiang/audioMore.html'
    });
    audioMoreObj.createDomObj = function(){
        this.ClickObj = $(".aud_fan");
        this.hedsetObj = $("#audioMore") 
        this.butUpObj = $("#but_up")  //退出登录  numKaijiang_kjTitleObj
        this.spaUpObj = $(".sp_sub")  //提交资料
        this.scrollObj = $("#audio_scrollObj"); 
        this.gosowObj = $("#sow_sou"); 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
        // console.log(datV)
            audioMoreObj.goBack(datV,datG,datD)
        })

        $('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
        })
    }

    
    audioMoreObj.createEvent = function(){
        var page = 1;
        var size = 10;
        $('#audioMore').dropload({ 
            scrollArea : window,
            distance : 50,
            loadDownFn:function(me){
                audioMoreObj.pullLoad = me;
              if (ConfigObj.platForm === 'android') {
                  if (android_obj.isVPN() == true) {
                      $.alertMsg('當前訪問人數過多，請稍後訪問')
                      return false;
                  }
              }
                page++;
                var result = '';
                var cls = $('#numaudio_kjTitleObj').find('li.on').attr('data-v')
                var postData ={
                    page:page,
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    category_id:cls,
                }
                // console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', audiodetail
                    url: ConfigObj.localSite+'/Book/book_list',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        // var fo = Global.crypt(res)
                        if (res.ok == true) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            // console.log(res.info)
                            var imag = Math.floor((document.documentElement.clientWidth *0.3)*1.6)
                            var dat = res.info,
                                arry = [];
                            var arrLen = res.info.length;
                            if(arrLen > 0){
                               for(var i=0; i<arrLen; i++){
                                      result += '<li class="li_vid li_w30" data-t="audiodetail" data-v="'+ dat[i].title+'" data-g="'+ dat[i].poster+'" data-c="'+ dat[i].id +'">\
                                            <i style="height:'+ imag+'px;" class="opactiy audi_opac"></i>\
                                            <img style="height:'+imag+'px" class="img_vi fl wi10" src="'+ dat[i].poster +'" alt="">\
                                            <p class="p_posab">'+ dat[i].title +'</p>\
                                            <p class="aud_bot c_gray"></p>\
                                        </li>';
                                        // arry[i] = dat[i].poster+","+dat[i].title
                                }
                            }else{
                                $('#aud_hide').show()
                                me.lock(); //<p class="p_spa">視頻簡介\</p>\
                                $.alertMsg('已經到底了，沒有更多視頻了')
                                // me.noData();
                            }
                                $('#sowaudio').append(result);
                                $('.wi10').css('height',imag)
                                datV = ''
                                datG = ''
                                datD = ''
                                var things = $('li.li_vid')
                                for (var i = 0; i < things.length; i++) {
                                    var poster = $(things[i]).attr('data-g')
                                    var title = $(things[i]).attr('data-v')
                                    arry[i] = poster+","+title
                                }
                                // console.log(arry.join(';'))
                                if (ConfigObj.platForm === 'android') {
                                    android_obj.downloadCover(arry.join(';'))
                                }else{
                                    ios_obj.downloadCover(arry.join(';'))
                                }
                                if (audioMoreObj.pullLoad) {
                                    audioMoreObj.pullLoad.resetload();
                                }
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        me.resetload();
                    }
                })
              // audioMoreObj.pullLoad = me;
              // homeObj.getData(2)
            }
        }); 
        this.hedsetObj.unbind('tap').tap(function(e){
            audioMoreObj.sectionEvent(e);
        });
        this.butUpObj.unbind('tap').tap(function(e){
            audioMoreObj.secbutUp(e);
        });
        this.spaUpObj.unbind('tap').tap(function(){
            audioMoreObj.spanSub()
        })
        this.gosowObj.unbind('tap').tap(function(){
          audioMoreObj.sousus()
        })
    }
    audioMoreObj.ajaxsObj = function(id){
        // console.log(id)
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            category_id:id,
            page:'1'
        }
        // keyword  内容 user_id 用户 channel  渠道 class_name 空 id空 page  1  state 0
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/Book/book_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    var obj = res.info
                    // console.log(obj)
                    // kaijiangIndexObj.ajaxData = res.info
                    audioMoreObj.listHtml(id,obj)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    audioMoreObj.listHtml = function(id,obj){
        var html = ''
        var arr = []
        // console.log(id)
        var imag = Math.floor((document.documentElement.clientWidth *0.3)*1.6)
        // console.log(imag)
        for (var i = 0; i < obj.length; i++) {
            // console.log(obj[i])
            arr[i] = obj[i].poster+","+obj[i].title
            html += '<li class="li_vid li_w30" data-t="audiodetail" data-v="'+ obj[i].title+'" data-g="'+ obj[i].poster+'" data-c="'+ obj[i].id +'">\
                        <i style="height:'+ imag+'px;" class="opactiy audi_opac"></i>\
                        <img style="height:'+imag+'px" class="img_vi fl wi10" src="'+ obj[i].poster +'" alt="">\
                        <p class="p_posab">'+ obj[i].title +'</p>\
                        <p class="aud_bot c_gray"></p>\
                    </li>'
        }
        $('#sowaudio').html(html)
        $('.wi10').css('height',imag)
        datV = ''
        datG = ''
        datD = ''
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arr.join(';'))
        }else{
            ios_obj.downloadCover(arr.join(';'))
        }
    }
    audioMoreObj.sectionEvent = function(e){
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            var thisC = thisObL.attr("data-c");
            var thisG = thisObL.attr("data-g");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "upd" : this.updateType(thisObL);return true; //*
                case "audiodetail" : this.wholeType(thisC,thisObL);return true; //性别取消

            }
        }
    }
    audioMoreObj.updateType = function(obj){
        // console.log(obj) '+ obj[i].id+'
        var sibingObj = obj.siblings();
        sibingObj.removeClass('on');
        obj.addClass('on');
        var thisV = obj.attr("data-v");
        audioMoreObj.ajaxsObj(thisV)
        // audioMoreObj.createEvent()
        $('#aud_hide').hide()
        audioMoreObj.createEvent()
    }
    audioMoreObj.detaNum = function(obj,id){
        // console.log(obj)
        audioMoreObj.audcent(obj,id)
    }
    audioMoreObj.audcent = function(obj,id){
        // console.log(id)
        var html = ''
        var htm2 = ''
            // html += '<li class="overday" data-t="upd" data-v="" style="width:80px;"><span>全部</span></li>'
        for (var i = 0; i < obj.length; i++) {
            // console.log(obj[i])
            html += '<li style="width:80px;" data-t="upd" data-v="'+ obj[i].category_id+'" class="liList '+( id == obj[i].category_id ? 'on' : '')+'"><span>'+ obj[i].name +'</span></li>'
        }
        $('#numaudio_kjTitleObj').html(html)
        $('#numaudio_kjTitleObj').css('width',('80'*(obj.length+1))+'px')
        // $('#div_content').html(htm2) 
    }
    audioMoreObj.wholeType = function(cla,obj){
        datV = obj.attr('data-v')
        datG = obj.attr('data-g')
        datD = obj.attr('data-c')
        // console.log(datV)
        obj.find('.audi_opac').show()
        obj.siblings().find('.audi_opac').hide()
        setTimeout(function(){$('#sowaudio').find('.audi_opac').hide()},1000);
        if (ConfigObj.platForm === 'android') {
            android_obj.playMusic(cla)
        }else if (ConfigObj.platForm === 'ios'){
            ios_obj.playMusic(cla)
        }
    }
    audioMoreObj.titleScroll = function () {
    // console.log(this.scrollObj[0])
      this.myScroll = new iScroll(this.scrollObj[0], {
          hScrollbar: false,
          hScroll: true,
          vScroll: false
      });
      // console.log(this.myScroll)
  }
  audioMoreObj.initIScroll = function () {
      audioMoreObj.titleScroll();

      setTimeout(function () {
          audioMoreObj.myScroll.refresh();
      }, 300);
  };

    /*audioMoreObj.lilists = function(tp,res){
        var imag = Math.floor(((document.documentElement.clientWidth - 10) *0.4)/1.6)
        $('#sowaudio img').css('height',imag)
        $('#sowaudio i.opactiy').css('height',imag)
    }*/
    audioMoreObj.onloadExecution = function(){
        audioMoreObj.createDomObj()
        audioMoreObj.createEvent()
        audioMoreObj.initIScroll()
        // $('.div_log').show()
        $('.div_log').hide()
    }
    audioMoreObj.init = function(){
        audioMoreObj.onloadExecution()
    }