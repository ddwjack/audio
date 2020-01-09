    var wholeObj = new PageController({
	   'name': 'whole',
	   'tpl' : 'template/football/whole.html'
    });
    wholeObj.createDomObj = function(){
    	this.ClickObj = $(".wholeFan");
        this.hedsetObj = $("#whole") 
        this.butUpObj = $("#but_up")  //退出登录  num_kjTitleObj
        this.spaUpObj = $(".sp_sub")  //提交资料
        this.scrollObj = $("#numKaijiang_scrollObj"); 
        this.sountryObj = $("#country_scrollObj"); 
        this.imsouObj = $("#im_sou");  //搜索

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            wholeObj.goBack()
        })

        $('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
        })
    }

    
    wholeObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            wholeObj.sectionEvent(e);
        });
        this.butUpObj.unbind('tap').tap(function(e){
            wholeObj.secbutUp(e);
        });
        this.imsouObj.unbind('tap').tap(function(){
            wholeObj.sousu()
        })

        var page = 1;
        var size = 10;
        $('#whol_scro').dropload({ 
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
                var cous = $('#num_kjTitleObj').find('li.on').attr('data-n')  //获取上面点击的国家
                var tip = $('#numKaijiang_kjTitleObj').find('li.on').attr('data-m') //获取下面点击的标签分类
                var word = $('#p_tit_who a.Active').attr('data-v')
                if (cous == null) {var cous = ''}
                if (tip == null) {var tip = ''}
                if (thisM == null) {var thisM = ''}
                var postData ={  
                    state:word, 
                    page:page,
                    class_name:tip,
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    id:cous,
                    keyword:''
                } 
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
                            // console.log(res.info)
                            var dat = res.info
                            var arrLen = res.info.length;
                            if(arrLen > 0){
                               for(var i=0; i<arrLen; i++){
                                randomObj()
                                result += '<li data-t="whdetail" data-v="'+ dat[i].id +'" data-c="'+ dat[i].class +'" data-g="'+ dat[i].cover_one +'">\
                                            <i class="opactiy new_opac"></i><img style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ dat[i].cover_one+'" alt="">\
                                            <p class="p_nubm" style="color:transparent;">7.8</p>\
                                            <p class="p_tex">'+ dat[i].title+'</p>\
                                        </li>';
                                }
                                }else{
                                    me.lock();
                                    $('#whole_hide').show()
                                    $.alertMsg('已經到底了，沒有更多視頻了')
                                    // me.noData();
                                }
                                    $('#wh_ul').append(result);
                                    var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.485)/1.6)
                                    $('#wh_ul img').css('height',imag)
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
              // sowingObj.pullLoad = me; titlist
              // homeObj.getData(2)
            }
        }); 
    }
    wholeObj.sousu = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            wholeObj.show();
        }
        searchObj.show(2);
    }
    wholeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "zdbf" : wholeObj.gozuiduo(thisObj,thisT,'1');return true; //最多播放
                case "zjgx" : wholeObj.gozuiduo(thisObj,thisT,'3');return true; //最近更新  
                case "zdxh" : wholeObj.gozuiduo(thisObj,thisT,'2');return true; //最多喜欢  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            var thisC = thisObL.attr("data-c");
            var thisG = thisObL.attr("data-g");
            var thisD = thisObL.attr("data-d");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "upd" : this.updateType(thisObL);return true; //* 
                case "whdetail" : this.wholeType(thisV,thisC,thisG,thisObL);return true; //* 

            }
        }
    }
    wholeObj.gozuiduo = function(obj,thisT,ei){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('Active');
        obj.addClass('Active');
        // var clId = $('#numKaijiang_kjTitleObj').find('li.on').attr('data-v') 
        var clId = $('.kjTitleObj').find('li.on').attr('data-v')
        wholeObj.whoilPlay(clId,thisT,ei)
    }
    wholeObj.updateType = function(obj){
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
        wholeObj.whoilPlay(thisV,thisN,'3',thisD,thisM)   //
        this.titleScrollVal();
    }
    wholeObj.wholeType = function(typ,cla,im,obj){
        obj.find('.new_opac').show()
        obj.siblings().find('.new_opac').hide()
        setTimeout(function(){ $('#wh_ul').find('.new_opac').hide()},1000);
        Global.playVideo(typ,cla,im)
    }
    wholeObj.titleScroll = function () {
      this.myScroll = new iScroll(this.scrollObj[0], {
          hScrollbar: false,
          hScroll: true,
          vScroll: false
      });
    }
    wholeObj.initIScroll = function () {
        wholeObj.titleScroll();
        setTimeout(function () {
            wholeObj.myScroll.refresh();
            wholeObj.titleScrollVal();
        }, 300);
    };
    wholeObj.titleScrollVal = function(){
        var width = 0;
        var clientWidth = document.documentElement.clientWidth;
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
        }
    }

    wholeObj.titleScrolls = function () {
      this.myScroll = new iScroll(this.sountryObj[0], {
          hScrollbar: false,
          hScroll: true,
          vScroll: false
      });
    }
    wholeObj.initIScrolls = function () {
        wholeObj.titleScroll();
        setTimeout(function () {
            wholeObj.myScroll.refresh();
            wholeObj.titleScrollVal();
        }, 300);
    };
    wholeObj.titlist = function(typ,cunt){
        var postData ={
            user_id:typ,
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
        // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', 
            url: ConfigObj.localSite+'/Video/video_class_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    wholeObj.lilist(typ,res.info,cunt)
                    // console.log(res.info) 
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    wholeObj.updatePlay = function(typ,id,nub){
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
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/search_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res) video_class_list titlist
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info) 
                    wholeObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  wholeObj.titlist
            }
        })
    }

    wholeObj.whoilPlay = function(typ,clas,nub,id,thisM){
        $('#whole_hide').hide()
        wholeObj.createEvent()
        // console.log(nub) -447
        var cous = $('#num_kjTitleObj').find('li.on').attr('data-n')  //获取上面点击的国家
        var tip = $('#numKaijiang_kjTitleObj').find('li.on').attr('data-m') //获取下面点击的标签分类
        var word = $('#p_tit_who a.Active').attr('data-v')
        if (cous == null) {
            var cous = ''
        }
        if (tip == null) {
            var tip = ''
        }else{

        }
        if (thisM == null) {var thisM = ''}
        
        var postData ={  
            state:word, 
            page:'1',
            class_name:tip,
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            id:cous,
            keyword:''
        } 
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/search_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) video_class_list
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info) 
                    wholeObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  numKaijiang_scrollObj
            }
        })
    }
    wholeObj.lilist = function(tp,rs,cun){
        console.log(cun)
        var html = ''
        var html2 = ''
        html += '<li style="width:46px;" data-v="" data-t="upd" data-d="1" data-c="2" class="'+(cun == '3' ? 'on' :  '')+'"><span>全部</span></li>'
        html2 += '<li style="width:46px;" data-v="" data-t="upd" data-d="2" data-c="1" class="'+(cun == '1' ? 'on' : (cun == '3' ? 'on' : ''))+'"><span>全部</span></li>'
        for (var i = 0; i < rs.indexs.length; i++) {
            var Lis = rs.indexs[i]
            html += '<li style="width:66px;" data-n="'+ Lis.id +'" data-d="1" data-t="upd" data-c="'+ Lis.type+'" class="'+(tp == Lis.id ? 'on' : '' )+'"><span>'+ Lis.class_name+'</span></li>'
        }
        for (var i = 0; i < rs.frequens.length; i++) {
            var Lis = rs.frequens[i]
            html2 += '<li style="width:66px;" data-v="'+ Lis.id +'" data-m="'+ Lis.class_name +'" data-d="2" data-t="upd" data-c="'+ Lis.type+'" class="'+(tp == Lis.id ? 'on' : '' )+'"><span>'+ Lis.class_name+'</span></li>'
        }
        $('#numKaijiang_kjTitleObj').html(html2)
        $('#num_kjTitleObj').html(html)
    }
    wholeObj.Vlist = function(red){
        if (red.length == 0) {
            $('#img_whol').show()
        }else{
            $('#img_whol').hide()
        }
        var html = ''
        for (var i = 0; i < red.length; i++) {
                randomObj()
            var rd = red[i]
            html += '<li data-t="whdetail" data-v="'+ rd.id +'" data-c="'+ rd.class +'" data-g="'+ rd.cover_one +'">\
                        <i class="opactiy new_opac"></i><img style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ rd.cover_one+'" alt="">\
                        <p class="p_nubm" style="color:transparent;">7.8</p>\
                        <p class="p_tex">'+ rd.title+'</p>\
                    </li>'
        }
        gifNone()
        $('#wh_ul').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.485)/1.6)
        $('#wh_ul img').css('height',imag)
    }
    wholeObj.yzmQd = function(){ //验证码确定发送
        changeObj.goBack = function(){
            changeObj.destroy();
            wholeObj.show();
        }
        changeObj.show();
    }

    wholeObj.onloadExecution = function(){
          window.scrollTo(0,0)
    	wholeObj.createDomObj()
        wholeObj.createEvent()
        wholeObj.initIScroll()
        gifJson()
        // wholeObj.titlist()
    }
    wholeObj.init = function(){
	 	wholeObj.onloadExecution()

    }