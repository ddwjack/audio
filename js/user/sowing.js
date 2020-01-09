    var sowingObj = new PageController({
       'name': 'sowing',
       'tpl' : 'template/user/sowing.html'
    });
    sowingObj.createDomObj = function(){
        this.ClickObj = $(".sow_fan");
        this.hedsetObj = $("#sowing") 
        this.butUpObj = $("#but_up")  //退出登录  numKaijiang_kjTitleObj
        this.spaUpObj = $(".sp_sub")  //提交资料
        this.scrollObj = $("#numKaijiang_scrollObj"); 
        this.gosowObj = $("#sow_sou"); 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            sowingObj.goBack()
        })

        $('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
        })
    }

    
    sowingObj.createEvent = function(){
        var page = 1;
        var size = 10;
        $('#Sowins').dropload({ 
            scrollArea : window,
            distance : 50,
            /*loadUpFn:function(me){
              // homeObj.pullLoad = me;
              // homeObj.getData(2);
              // homeObj.getData(2)
              //me.resetload(); p_more wholeObj.updatePlay
            }*/
            loadDownFn:function(me){
              if (ConfigObj.platForm === 'android') {
                  if (android_obj.isVPN() == true) {
                      $.alertMsg('當前訪問人數過多，請稍後訪問')
                      return false;
                  }
              }
                page++;
                var result = '';
                var cls = $('#numKaijiang_kjTitleObj').find('li.on').attr('data-v')
                console.log(cls)
                var postData ={
                    state:'',
                    page:page,
                    class_name:cls,
                    id:'',
                    keyword:'',
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                }
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', sowdetail
                    url: ConfigObj.localSite+'/VideoInterface/search_video',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        // var fo = Global.crypt(res)
                        if (res.ok == true) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            console.log(res.info)
                            var dat = res.info
                            var arrLen = res.info.length;
                            if(arrLen > 0){
                               for(var i=0; i<arrLen; i++){
                                    randomObj()
                                      result += '<li class="li_vid" data-t="sowdetail" data-v="'+ dat[i].id +'" data-g="'+ dat[i].cover_one +'" data-c="'+ dat[i].class +'">\
                                              <i class="opactiy sow_opac"></i><img class="img_vi fl he10" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ dat[i].cover_one+'" alt="">\
                                              <p class="p_top ovhidden">'+ dat[i].title+'</p>\
                                              <p class="p_bot c_gray">\
                                                <span class="sp_link">無碼</span>\
                                            </p>\
                                          </li>';
                                }
                            }else{
                                $('#sow_hide').show()
                                 me.lock(); //<p class="p_spa">視頻簡介\</p>\
                                $.alertMsg('已經到底了，沒有更多視頻了')
                                // me.noData();
                            }
                                $('#sowvideo').append(result);
                                var imag = Math.floor(((document.documentElement.clientWidth - 10) *0.4)/1.6)
                                $('#sowvideo img').css('height',imag)
                                $('#sowvideo i.opactiy').css('height',imag)
                                me.resetload();
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        me.resetload();
                    }
                })
              // sowingObj.pullLoad = me;
              // homeObj.getData(2)
            }
        }); 
        this.hedsetObj.unbind('tap').tap(function(e){
            sowingObj.sectionEvent(e);
        });
        this.butUpObj.unbind('tap').tap(function(e){
            sowingObj.secbutUp(e);
        });
        this.spaUpObj.unbind('tap').tap(function(){
            sowingObj.spanSub()
        })
        this.gosowObj.unbind('tap').tap(function(){
          sowingObj.sousus()
        })
    }
    sowingObj.sousus = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            sowingObj.show();
        }
        searchObj.show();
    }
    sowingObj.sectionEvent = function(e){
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
                case "sowdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //性别取消

            }
        }
    }
  sowingObj.updateType = function(obj){
    // console.log(obj)
    var sibingObj = obj.siblings();
    sibingObj.removeClass('on');
    obj.addClass('on');
    var thisV = obj.attr("data-v");
    this.nowLotteryType = thisV;
    this.nowPage = 0;
    // this.kjListObj.html('<p class="loading_1"></p>');
    this.getLotteryData(thisV);
    this.titleScrollVal();
    sowingObj.createEvent()
    $('#sow_hide').hide()
    //setTimeout(function(){
    //  $('#numKaijiang .loading_1').remove();
    //},1000);
  }
  sowingObj.getLotteryData = function(ty){
    sowingObj.updatePlay(ty,'3')
  }
    sowingObj.wholeType = function(typ,cla,im,obj){
        obj.find('.sow_opac').show()
        obj.siblings().find('.sow_opac').hide()
        setTimeout(function(){$('#sowvideo').find('.sow_opac').hide()},1000);
        Global.playVideo(typ,cla,im)
    }
  sowingObj.titleScroll = function () {
    // console.log(this.scrollObj[0])
      this.myScroll = new iScroll(this.scrollObj[0], {
          hScrollbar: false,
          hScroll: true,
          vScroll: false
      });
      // console.log(this.myScroll)
  }
  sowingObj.initIScroll = function () {
      sowingObj.titleScroll();

      setTimeout(function () {
          sowingObj.myScroll.refresh();
          sowingObj.titleScrollVal();
      }, 300);
  };
    sowingObj.titleScrollVal = function(){
        // var width = 0;
        /*var clientWidth = document.documentElement.clientWidth;
        var titleWidth = this.scrollObj.children('ul').width();
        // console.log(titleWidth)
        var allLiObj = this.scrollObj.find('li');
        for(var i=0,ilen=allLiObj.length;i<ilen;i++){
          var thisT = allLiObj.eq(i).attr("data-v");
          width += allLiObj.eq(i).width();
    //    //console.log(allLiObj.eq(i).width()); 
          if(thisT == this.nowLotteryType)break;
        }
        if(width > clientWidth/2 && this.myScroll){
          if(titleWidth - width < clientWidth/2){
            this.myScroll.scrollTo((titleWidth-clientWidth)*-1,0,800,false);
          }else{
            // this.myScroll.scrollTo((width-clientWidth/2)*-1,0,800,false); 
          }
        }else{
          this.myScroll.scrollTo(0,0,800,false);
        }*/
    }
  sowingObj.titlist = function(typ){
        // console.log($('#numKaijiang_kjTitleObj').find('li').eq(0).addClass('on'))
        // $('#numKaijiang_kjTitleObj').find('li').eq(0).addClass('on')
        var postData ={
            user_id:typ,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
        // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', ciphertext
            url: ConfigObj.localSite+'/Video/video_class_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    sowingObj.lilists(typ,res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id); 

            }
        })
    }
    sowingObj.updatePlay = function(typ,nub){
        var postData ={
            class_name:typ,
            page:'1',
            state:'',
            id:'',
            keyword:'',
            channel:ConfigObj.zdid
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
        // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', video_class_list
            url: ConfigObj.localSite+'/VideoInterface/search_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    sowingObj.Vlists(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id); 

            }
        })
    }

    sowingObj.lilists = function(tp,res){
        var html = ''
          html += '<li class="on" data-t="upd" data-v="" style="width:80px;" ><span>全部</span></li>'
        for (var i = 0; i < res.frequens.length; i++) {
            var Lis = res.frequens[i]
              html += '<li style="width:80px;" data-v="'+ Lis.class_name +'" data-t="upd" class="'+(tp == Lis.id ? 'on' : '' )+'"><span>'+ Lis.class_name+'</span></li>'
        }
        $('#numKaijiang_kjTitleObj').html(html)
    }
    sowingObj.Vlists = function(obj){
      // console.log(obj)
        if (obj.length == 0) {
            $('#img_none').show();
        }else{
            $('#img_none').hide();
        }
        //红，绿，蓝三原色，10进制码转16进制，随机数1到256之间
        var red = parseInt(Math.random()*257).toString(16);
        var blue = parseInt(Math.random()*257).toString(16);
        var green= parseInt(Math.random()*257).toString(16);
        var yellow= parseInt(Math.random()*257).toString(16);
        var pink= parseInt(Math.random()*257).toString(16);
        var orange= parseInt(Math.random()*257).toString(16);
        var purple= parseInt(Math.random()*257).toString(16);
        var slateblue= parseInt(Math.random()*257).toString(16);
        // console.log(Math.random())
        var color0 = '#'+red+blue+green;
        var color1 = '#'+red+yellow+pink;
        var color2 = '#'+orange+slateblue+purple;
        var color3 = '#'+red+orange+green;
        var color4 = '#'+slateblue+blue+orange;
        var test = [color0,color1,color2,color3,color4]; 
        // var color1 = '#'+blue+red+yellow;
        // var color2 = '#'+green+red+pink;
        var html = ''
        for (var i = 0; i < obj.length; i++) {
            var rd = obj[i]
            randomObj()
                var cour = test[Math.floor(Math.random()*test.length)]
            html += '<li class="li_vid" data-t="sowdetail" data-v="'+ rd.id +'" data-g="'+ rd.cover_one +'" data-c="'+ rd.class +'">\
                          <i class="opactiy sow_opac"></i><img class="img_vi fl he10" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ rd.cover_one+'" alt="">\
                          <p class="p_top ovhidden">'+ rd.title+'</p>\
                          <p class="p_bot c_gray">\
                            <span style="background:'+ cour +'" class="sp_link">無碼</span>\
                          </p>\
                      </li>'
        }
        gifNone()
        $('#sowvideo').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 10) *0.4)/1.6)
        $('#sowvideo img').css('height',imag)
        $('#sowvideo i.opactiy').css('height',imag)
    }
    sowingObj.onloadExecution = function(){
        sowingObj.createDomObj()
        sowingObj.createEvent()
        sowingObj.initIScroll()
        gifJson()
          window.scrollTo(0,0)
    }
    sowingObj.init = function(){
        sowingObj.onloadExecution()
    }