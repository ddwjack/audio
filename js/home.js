
  //首页js
  var homeObj = new PageController({
     'name': 'home',
     'tpl' : 'template/home.html',
     'pullDistance': 220
  });

  //banner比例
  // homeObj.defBannerImgProportion = 640/280;

  // 默认彩种数据，已删除，liuchao awardObj 
  homeObj.defLotteryData = [];

  //彩种权重数据 me
  homeObj.lotterySortData = window.localStorage.getItem("homeObj_lotteryStor_data");
  homeObj.lotterySortData = homeObj.lotterySortData ? $.parseJSON(homeObj.lotterySortData) : {};


  //ajax返回数据
  homeObj.ajaxData = new Object();
  homeObj.ajaxkaij = new Object();

  
  //自动生成banner高度
  homeObj.createBannerHeight = function(){
    var bodyWidth = $("body").width();
    var height= bodyWidth/this.defBannerImgProportion ;
    this.bannerImgObj.css("height",height+"px");
    this.bannerDivObj.css("height",height+"px");
  }

  //生成banner  lottery.schedule.getRecommendSchedule inSearch
  homeObj.createBanner = function (rgb) {
      var data = rgb;
      // console.log(data) 
      var imgHtml = [];
      var navHtml = [];
      var html = ''
      data.forEach(function (v, i) {
        // console.log(v)
            mathbannerObj()
            var url = v['jump_url'];
            //  /
            // imgHtml.push('<li  data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') ' + v['target'] + '   + '"><img src="http://47.93.204.144/uploads/bannel/20181026/8f8029b540ff608aa6e7c4c18418e0bc.jpg"></li>');
            imgHtml.push('<li data-d="'+v['id']+'" data-g="'+ v['message']+'" data-v="bannerIform?https://img02.tieus.org/four" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url('+ bannImg +');background-size:100% 100%;" src="' + v['url'] + '"></li>');
            navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
      });
      
      this.bannerImgObj.html(imgHtml.join(''));
      var narWrapObj = $('#home_bannerNavWarpObj').html(navHtml.join(''));
      this.bannerNavObj = narWrapObj.children('a');
      gifNone()
      this.bannerSwipeSlide();
      delete this.ajaxData.bannel;
  }

  //banner轮播
  homeObj.bannerSwipeSlide = function () {
      this.bannerDivObj.swipeSlide({
          continuousScroll: true,
          speed: 3000,
          lazyLoad: true,
          callback : function(i){
            // console.log(i)
          homeObj.bannerNavObj.removeClass('on');
          homeObj.bannerNavObj.eq(i).addClass('on');
        }
      });
  }
  
  /**
   * banner 触摸事件处理
   * @param {Event} e
   * @returns {boolean}
   */
  homeObj.bannerEvent = function (e) {
      var LiObj = $.oto_checkEvent(e, "LI");
      if (LiObj) {
          var thisObj = $(LiObj);
          var v = thisObj.attr('data-v');
          var G = thisObj.attr('data-g');
          var D = thisObj.attr("data-d");
          var parseSimpleUrl = function (url) {
            console.log(url)
              var tmp = url.split('?');
              var path = tmp[0];
              var args = {};
                if (tmp[1] && tmp[1].length) {
                    var tmp2 = tmp[1].split(',');
                    tmp2.forEach(function (v,index) {
                        var tmp3 = v.split('=');
                        args[index] = tmp3[0] ? tmp3[0] : null;
                    })
                }
              /*if (tmp[1] && tmp[1].length) {
                  var tmp2 = tmp[1].split('&');
                  tmp2.forEach(function (v) {
                      var tmp3 = v.split('=');
                      args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
                  })
              }*/
              return {path: path, args: args};
          };
          if (v.indexOf('http://') == 0 || v.indexOf('https://') == 0) {
              // 外部链接
              // console.log(v)
              // homeObj.gohomeObj(D)
            Global.openUrl(v);
          } else {
              var ret = parseSimpleUrl(v);
        console.log(ret);  //页面跳转显示 whole
      if(ConfigObj.display){ 
        // homeObj.gohomeObj(D) 
            if (ret.path == 'video')  Global.playVideo(ret.args[0],ret.args[1],ret.args[2]); //播放視頻
            else if (ret.path == 'football') Goanchor(ret.args[0],ret.args[1],ret.args[2],ret.args[3],'dynamicObj') /*footballObj.show()*/; 
            else if (ret.path == 'audio') Global.bookImgObj(ret.args[0],ret.args[1]);/*android_obj.playMusic(ret.args.id);*/  // 聽書詳情
            else if (ret.path == 'home') {kaijiangIndexObj.show()}
            else if (ret.path == 'money') {
                moneyObj.goBack = function(){
                    moneyObj.destroy();
                    homeObj.show();
                    Global.fixd()
                }
                moneyObj.show(true,function(){
                    moneyObj.mobileObj(ConfigObj.iphon)
                }); 
            }
            else if (ret.path == 'vip') {
                myfreeObj.goBack = function(){
                    myfreeObj.destroy();
                    homeObj.show();
                    Global.fixd()
                }
                myfreeObj.show(true,function(){}); 
            }
            else if(ret.path == 'bannerIform'){ // /bannerIform?url=http://192.168.0.110/H5/Anchor/one/
                bannerIformObj.goBack = function(){
                    bannerIformObj.destroy();
                    homeObj.show();
                    Global.fixd()
                }
                bannerIformObj.show(true,function(){
                    bannerIformObj.urlObj(ret.args[0])
                });
            }
                // else if (ret.path == 'news') homeObj.goNewsDetail(ret.args.newsId); //原稿
              else Global.open(v);
            }
          }
          Global.pv('banner', {url: v});
        }
    } 
    
    
    homeObj.hobannerObj = function(){
        //  1是首页轮播图  2是频道  3是闪屏  4是二维码  5是个人中心  6是播放页面
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'1'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Api/bannel_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    homeObj.createBanner(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  liDeta
            }
        })
    }
    function start(){ // AV_list
        console.log(186)
        $('.img_src_atr').not('[data-isLoaded]').each(function(){
            var $node = $(this)
            if(isShow($node,'.show_imgsrc') ){
                loadImg($node)
            }
        })
    }
  //请求数据
    homeObj.getData = function (su) {
      // var usId = localStorage.getItem("numId")
        function updatePage(msg){
            // console.log(msg)
            /*var date = localStorage.getItem("/Video/video_list")*/
                if (msg.ok == true) {
                    console.log(msg)
                    msg.info = $.parseJSON(Global.crypt(msg.result));
                    console.log(msg.info)
                    homeObj.ajaxData = msg.info;
                    homeObj.ajaxSuccessFun();
                } else {
                    $.alertMsg(msg.err);
                }
                if (homeObj.pullLoad) { 
                    homeObj.pullLoad.resetload();
                }
        }
        if (su == '2') {
            var postData ={
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                user_id:ConfigObj.meId,
                imei:ConfigObj.Iemid
            }
        }else{
            var postData ={
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                user_id:ConfigObj.meId,
                imei:ConfigObj.Iemid,
                most:'1'
            }
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        Global.getDataPrefCache('/Video/video_list', secretData, function (req) {
          // console.log(req)
          updatePage(req);
        }, function (req) {
          // console.log(req)
          updatePage(req);
        }, 1);
    }
    homeObj.invitationCode = function(exten){
        mycodeObj.goBack = function(){
            mycodeObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(exten)
            // console.log(exten) video_list

        });
    }
    //数据返回后回调函数 liDeta
    homeObj.ajaxSuccessFun = function(){
        // $('.div_log').hide()
        // this.createBanner(); im_most
        this.createNews();
        this.creasowing();
        this.createkaiObg();
    }
    homeObj.createNews = function(){
        if(homeObj.ajaxData.class){
         var html = '';
         var data = homeObj.ajaxData.class;
         // console.log(data) onerror="javascript:this.src='+"\'images.png\'"+'"
        for(var i=0;i<data.length;i++){
            mathlabelObj()
            // console.log(i)
            var itm = data[i];
            html += '<li data-t="whol" data-p="'+ itm.id +'" data-n="'+ itm.id +'" class="Li" data-c="'+itm.type+'">\
                      <i class="opactiy i_opac"></i><img class="L_img" style="background:url('+ labImg +');background-size:100% 100%;height:50px;" src="'+ itm.picture+'" onerror="javascript:this.src='+"\'"+labImg+"\'"+'"  alt="#" ><br/><span class="L_span">'+ itm.class_name+'</span>\
                    </li>'
        }
          html += '<li data-t="whol" data-v="" data-c="3" class="Li">\
                      <i class="opactiy i_opac"></i><img class="L_img" src="images/home/wm.png" alt="#"><br/><span class="L_span">全部</span>\
                    </li>'
         $('#hom_type').html(html)
         // console.log(html)
        }
    } 
    homeObj.createkaiObg = function(){  //开奖页面推荐 
        if(homeObj.ajaxkaij){
            var data = homeObj.ajaxkaij;
            // console.log(data)
            // console.log(ConfigObj.localSite +''+ data[0].picture)
            var html2 = ''
            var ht1 = '';
            html2 += '<dt><img class="img_hom_icon" src="images/home/icon.png" alt="">推荐</dt>'
            for(var i=0;i<data.length;i++){
                var itm = data[i];
                randomObj()
                // console.log(itm.state) sw
                if (itm.category == '1') {
                  ht1 += '<li class="show_imgsrc" data-t="hgcp" data-v="'+itm.class_name+'" data-i="'+itm.picture+'" data-c="'+itm.message+'">\
                                <a class="a_img" href="javascript:void(0)">\
                                    <i class="i_opact"></i>\
                                    <img class="img_height img_src_atr" style="background:url('+ sui +');background-size:100% 100%;" data-src="'+ itm.picture+'" src="'+ sui +'" onerror="javascript:this.src='+"\'"+sui+"\'"+'" alt="#">\
                                </a><br/>\
                                <span class="span_te">'+itm.class_name+'</span>\
                            </li>'
                }else{
                  html2 += '<dd data-t="sw" data-v="'+itm.class_name+'" data-i="'+itm.picture+'" data-c="'+itm.message+'"><i class="i_opact"></i><img style="background:url('+ sui +');background-size:100% 100%;" src="'+ itm.picture+'" onerror="javascript:this.src='+"\'"+sui+"\'"+'" alt="#"><br/><span>'+itm.class_name+'</span></dd>'
                }
            }
            // console.log(html2)
            $('#dl_tj').html(html2)
            // console.log(lov2)
            $('#kai_re').html(ht1)
            // console.log(Math.floor((document.documentElement.clientWidth * 0.33 * 0.9)/1.6))
            var imag = Math.floor((document.documentElement.clientWidth * 0.33 * 0.9)/1.3)
            $('#home_wrapObj img.img_height').css('height',imag)
            $('#home_wrapObj i.i_opact').css('height',imag)
        }
    }
    homeObj.createalbum = function(obj){
      // console.log(obj)
        var html = ''
        for (var i = 0; i < obj.length; i++) {
            var res = obj[i]
            var lis = res.video_list
            var windo = Math.floor((document.documentElement.clientWidth - 30)*0.49)
            var wid = (lis.length*windo)+(windo/2+20)
            randomObj()
            html += '<div class="div_sold"><a class="A_nu_list" data-t="Actress" data-c="'+ res.album_id +'" data-v="'+ res.brief +'" data-i="'+ res.poster +'" href="javascript:void(0)">\
                    <i class="i_icon">'+res.total+'部電影</i>\
                    <img class="nu_img" src="'+ (res.avt_url == ''  ? 'images/me/hg_wd1_07.png' : res.avt_url)+'" onerror="javascript:this.src='+"\'"+sui+"\'"+'" alt="#">\
                    <p class="nv_title">'+ res.album_name +'</p>\
                    <p class="nv_text">'+ (res.brief == '' ? res.album_name : res.brief) +'</p>\
                </a>';
            html += '<div class="Div_Ul"><ul class="ul_rqny" style="width:'+ wid +'px;">'
            if (lis.length >= 40) {
                var listtxt = 40
            }else{
                var listtxt = lis.length
            }
            for (var j = 0; j < listtxt; j++) {
                randomObj()
                var tex = lis[j]
                html += '<li class="li_ny" style="width:'+ windo +'px" data-t="actVideo" data-v="'+ tex.id+'" data-c="'+ tex.class +'" data-i="'+ tex.cover_one +'">\
                            <i class="opactiy new_opac" ></i><img style="background:url('+ sui +');background-size:100% 100%;" class="ny_img img_src_atr" data-src="'+ tex.cover_one +'" src="'+ sui +'" onerror="javascript:this.src='+"\'"+ sui +"\'"+'" alt="#">\
                            <p class="nu_jian">'+ tex.title +'</p>\
                        </li>'
            }
            html += '</ul></div></div>'
        }
        $('#AV_list').html(html)
        this.scrollsObj = $(".Div_Ul"); //专辑列表滑动
        homeObj.initIScroll()
        // gifNone()
    }

    homeObj.creasowing = function(){
    if(homeObj.ajaxData.most){
        var html = '';
        var data = homeObj.ajaxData.most;
        // console.log(ConfigObj.localSite +''+ data[0].picture)
        for(var i=0;i<data.length;i++){
            randomObj()
            var inew = data[i];
            html += '<li data-t="liDeta " data-c="'+inew.class+'" data-g="'+ inew.cover_one+'" data-v="'+ inew.id +'" class="Li_zx">\
                <i class="opactiy new_opac"></i><img class="img_src_atr" style="background:url('+ sui +');background-size:100% 100%;" data-src="'+ inew.cover_one +'" src="'+ sui +'" onerror="javascript:this.src='+"\'"+sui+"\'"+'" alt="#"><br/><span>'+ inew.title+'</span>\
              </li>'
        }
        $('#hom_sow').html(html)
        // console.log(html)
        var imag = Math.floor((document.documentElement.clientWidth *0.485)/1.6)
        $('#hom_sow img').css('height',imag)
        // $('#hom_sow i.opactiy').css('height',imag)
    }

    if(homeObj.ajaxData.new){
      // console.log(homeObj.ajaxData.new)
     var html2 = '';
     var dat = homeObj.ajaxData.new;
     // console.log(ConfigObj.localSite +''+ data[0].picture) div_log
     for(var i=0;i<dat.length;i++){
        randomObj()
        var inw = dat[i];
        html2 += '<li data-t="liDeta" data-c="'+inw.class+'" data-g="'+inw.cover_one+'" data-v="'+ inw.id +'" class="Li_zx show_imgsrc">\
                <i class="opactiy new_opac"></i><img class="img_src_atr" style="background:url('+ sui +');background-size:100% 100%;" data-src="'+ inw.cover_one+'" src="'+ sui+'" onerror="javascript:this.src='+"\'"+sui+"\'"+'" alt="#"><br/><span>'+ inw.title+'</span>\
              </li>'
      }
     $('#ul_zxp').html(html2)
      // console.log(html2)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.485)/1.6)
        $('#ul_zxp img').css('height',imag)
        $('#ul_zxp li').css('height',imag+37)
        // $('#ul_zxp i.opactiy').css('height',imag)
    }
  }


  //创建dom对象
    homeObj.createDomObj = function(){
        this.wrapObj = $("#home_wrapObj");
        this.bannerImgObj = $("#home_bannerImgObj"); //轮播
        this.bannerDivObj = this.bannerImgObj.parent();
        //  this.navObj = $("#home_navObj");
        // this.bonusObj = $('#home_regnewBonus'); //立即领取红包 div_log
        this.moreObj = $('.p_more');  //最新片源
        this.sowiObj = $('.zbrb_more');  //重磅热播 
        this.AvliObj = $('.Avli');  //人气女优
        this.wdhcObj = $('#img_wdhc');  //我的缓存
        this.lsjlObj = $('#img_lsjl');  //历史记录 
        this.iSearObj = $('#inSearch,.I_sear');  //搜索 
        this.img_lObj = $('#img_ldt');  //歷史記錄 
        this.mostObj = $('#im_most');  //换一批 
        this.codeObj = $('#a_Mycode');  //换一批  
        this.regBonObj = $('.but_close'); //关闭弹窗广告
        this.potaObj = $('#i_potato'); //跳转到potato  
        this.shuaxObj = $('#homshuaxin'); //跳转到potato  
        // $('#home_wrapObj').css('height',document.documentElement.clientHeight-57)
    }

    homeObj.createEvent = function(){
        $('#home_wrapObj').dropload({  
            scrollArea : window,
            distance : 200,
            loadUpFn:function(me){
                homeObj.pullLoad = me;
                // homeObj.getData(2);
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                homeObj.getData(2)
                kaijiangIndexObj.destroy()
                footballObj.destroy()
                me.resetload(); 
            }
        })   
        $(window).scroll(function(event){
            if ($('#home').css("display")!="none") {
                start()
            }
        })

        this.potaObj.unbind('tap').tap(function(){
            if (ConfigObj.platForm === 'android') {
                android_obj.intoPatato('https://lynnconway.me/kdvideo')
            }else{
                ios_obj.intoPatato('https://lynnconway.me/kdvideo')
            }
        })
        this.shuaxObj.unbind('tap').tap(function(){
            gifJson()
            Global.channelId()
            homeObj.onloadExecution();
            homeObj.setDefConfig();
        })
        this.wrapObj.unbind('tap').tap(function(e){
            homeObj.updateMoneyEvent(e);
        });
        this.bannerDivObj.unbind('tap').tap(function(e){
            homeObj.bannerEvent(e);
        })
        this.moreObj.unbind('tap').tap(function(){
            homeObj.gowholes('') //whol liDeta
        })
        this.sowiObj.unbind('tap').tap(function(){
            homeObj.Sowings('')
        })
        this.codeObj.unbind('tap').tap(function(){
            homeObj.invitationCode(invitationCode)
        })
        this.regBonObj.unbind('tap').tap(function(){
            $('#home_regnewBonus').hide()
        })
        this.AvliObj.unbind('tap').tap(function(){
            AvlistObj.goBack = function(){
                AvlistObj.destroy();
                homeObj.show();
                Global.fixd()
            }
            AvlistObj.show();  
        })
        this.wdhcObj.unbind('tap').tap(function(){
            $('#img_wdhc').css('background','rgba(0,0,0,0.25)')
            OfflineObj.goBack = function(){
                OfflineObj.destroy();
                homeObj.show();
                $('#img_wdhc').css('background','transparent')
                Global.fixd()
            }
            OfflineObj.show(); 
        })
        this.lsjlObj.unbind('tap').tap(function(){
            $('#img_lsjl').css('background','rgba(0,0,0,0.25)')
            recordsObj.goBack = function(){
                recordsObj.destroy();
                homeObj.show();
                $('#img_lsjl').css('background','transparent')
                Global.fixd()
            }
            recordsObj.show(true,function(){
                recordsObj.goajaxPlay()
            });
        })
        this.iSearObj.unbind('tap').tap(function(){
            searchObj.goBack = function(){
                searchObj.destroy();
                homeObj.show();
                Global.fixd()
            }
            searchObj.show(true,function(){
                searchObj.publicObj(1)
            }); 
        })
        this.img_lObj.unbind('tap').tap(function(){
            recordsObj.goBack = function(){
                recordsObj.destroy();
                homeObj.show();
                Global.fixd()
            }
            recordsObj.show(true,function(){
                recordsObj.gorecodPlay()
            }); 
        })
        this.mostObj.unbind('tap').tap(function(){
            if($('#im_most').attr('src').indexOf('qh0') >= 0 ) {
                $('#im_most').attr('src' , 'images/home/qh.png');
            } else {
                $('#im_most').attr('src' , 'images/home/qh0.png');
            }
            if (ConfigObj.platForm === 'android') {
                if (android_obj.isVPN() == true) {
                  $.alertMsg('當前訪問人數過多，請稍後訪問')
                  return false;
                }
            }
            homeObj.getData(1)
            homeObj.getDatass()
        })
  }
    homeObj.updateMoneyEvent = function(e){
        var sObj = $.oto_checkEvent(e,"SPAN");
        if(sObj){
          var thisObj = $(sObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "buy_0" : this.buyA(thisObj);return true;
            case "buy_1" : this.buyB(thisObj);return true;
          }
        }

        var dObj = $.oto_checkEvent(e,"DL");
        if(dObj){
          var thisObj = $(dObj);
          var thisT = thisObj.attr("data-t");
          switch(thisT){
            case "odds0" : this.selectOdds_1(thisObj);return true;
            case "odds1" : this.selectOdds_2(thisObj);return true;
          }
        }
        var liObj = $.oto_checkEvent(e,"LI");
        if(liObj){
          var thisObj = $(liObj);
          var thisT = thisObj.attr("data-t");
          var thisV = thisObj.attr("data-v");
          var thisC = thisObj.attr("data-c");
          var thisM = thisObj.attr("data-g");
          var thisI = thisObj.attr("data-i");
          // console.log(thisV) 
          switch(thisT){
            case "liDeta" : this.godetails(thisV,thisC,thisM);homeObj.opact(thisObj,2);return true;
            case "avdet" : this.goavdet();return true;
            case "whol" : this.gowhol(thisObj);homeObj.opact(thisObj,1);return true; 
            case "lida" : homeObj.chansobj(thisV,thisI,thisC);return true; 
            case "hgcp" : homeObj.chansobj(thisV,thisI,thisC,thisObj,1);return true; //  
            case "actVideo" : homeObj.acvideobj(thisV,thisC,thisI,thisObj);return true;
            case "hom_fen" : homeObj.tuiguangObj();return true;   // 分享 和vip  
            case "hom_molid" : homeObj.AmolidObj();return true;   // 校验手机号  
          }
          return false;
        }
        var dObj = $.oto_checkEvent(e,"DD");
        if(dObj){
            var thisObj = $(dObj);
            var thisT = thisObj.attr("data-t");
            var thisV = thisObj.attr("data-v");
            var thisC = thisObj.attr("data-c");
            var thisI = thisObj.attr("data-i");
            console.log(thisT)
            switch (thisT){
                case "sw" : homeObj.chansobj(thisV,thisI,thisC,thisObj,2);return true; //
            }
        }
        var dObj = $.oto_checkEvent(e,"A");
        if(dObj){
            var thisObj = $(dObj);
            var thisT = thisObj.attr("data-t");
            var thisV = thisObj.attr("data-v");
            var thisC = thisObj.attr("data-c");
            var thisI = thisObj.attr("data-i");
            switch (thisT){
                case "Actress" : homeObj.Actressobj(thisC,thisI,thisV);return true; //
            }
        }
    }
    homeObj.Actressobj = function(thisC,thisI,thisV){
        actressObj.goBack = function(){
            actressObj.destroy();
            homeObj.show(); 
            Global.fixd()
            // $('#dl_tj,#kai_re').find('i').css('display','none')
        }
        actressObj.show(true,function(){
            if (ConfigObj.platForm === 'android') {
                if (android_obj.isVPN() == true) {
                    $.alertMsg('當前訪問人數過多，請稍後訪問')
                    return false;
                }
            }
            actressObj.uptitlePlay(thisC,thisI,thisV);
        })
    }
    homeObj.acvideobj = function(typ,cla,ig,obj){
        // console.log(obj.find('.new_opac'))
        obj.find('.new_opac').show()
        obj.siblings().find('.new_opac').hide()
        setTimeout(function(){$('#AV_list').find('.new_opac').hide()},1000);
        Global.playVideo(typ,cla,ig)
    }
    homeObj.tuiguangObj = function(){
        gifJson()
        myfreeObj.goBack = function(){
            myfreeObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        myfreeObj.show(true);
        /*mycodeObj.goBack = function(){
            mycodeObj.destroy()
            homeObj.show();
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(invitationCode,ConfigObj.yshare_url,ConfigObj.yshare)
        });*/
    }
    homeObj.AmolidObj = function() { //校驗返回刷新
        checkObj.goBack = function(){
            checkObj.destroy()
            Global.channelId()
            homeObj.onloadExecution();
            homeObj.setDefConfig();
            homeObj.show();
            Global.fixd()
        }
        checkObj.show(true,function(){
            // mycodeObj.goewm(invitationCode,ConfigObj.yshare_url,ConfigObj.yshare)
        });
    }
    homeObj.opacit = function(obj,typ){
        if (typ == '1') {
            $('#dl_tj').find('i.i_opact').css('display','none')
        }else{
            $('#kai_re').find('i.i_opact').css('display','none')
        }
        obj.find('i').css('display','block')
        obj.siblings().find('i').css('display','none')
    }
    homeObj.chansobj = function(type,im,tex){
        // console.log(type +'二'+im+'三'+tex)
        channelObj.goBack = function(){
            channelObj.destroy();
            homeObj.show(); 
            Global.fixd()
         }
        channelObj.show(true,function(){
          if (ConfigObj.platForm === 'android') {
              if (android_obj.isVPN() == true) {
                  $.alertMsg('當前訪問人數過多，請稍後訪問')
                  return false;
              }
          }
          channelObj.gochann(type);
          channelObj.uptitlePlay(type,im,tex);
        })
    }
    homeObj.chansobj = function(type,im,tex,obj,typ){
        // console.log(type +'二'+im+'三'+tex)
        // return false;
        homeObj.opacit(obj,typ)
        channelObj.goBack = function(){
            channelObj.destroy();
            homeObj.show(); 
            Global.fixd()
            $('#dl_tj,#kai_re').find('i').css('display','none')
         }
         // return false;
        channelObj.show(true,function(){
          if (ConfigObj.platForm === 'android') {
              if (android_obj.isVPN() == true) {
                  $.alertMsg('當前訪問人數過多，請稍後訪問')
                  return false;
              }
          }
          channelObj.gochann(type);
          channelObj.uptitlePlay(type,im,tex);
        })
    }
    homeObj.actreObj = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/video_album',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    homeObj.createalbum(res.info)
                }else{
                    // console.log(res.err)
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  fixed

            }
        })
    }
    homeObj.getDatass = function () {
      // console.log(614)
        function updatePageho(msg){
            if (msg.ok == true) {
                msg.info = $.parseJSON(Global.crypt(msg.result));
                homeObj.ajaxkaij = msg.info;
                // console.log(msg.info)
                homeObj.ajaxSuccessFun();
                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {}
                if (msg.info.analysis_cate_id) {
                    ConfigObj.analysis_cate_id = msg.info.analysis_cate_id
                }
            } else {
                $.alertMsg(msg.err);
            }
        }
        var postData ={
            state:'1',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
            'info' : Global.encrypt(postData)
        };
        Global.getDataPrefCache('/Video/label_list', secretData, function (req) {
          updatePageho(req);
        }, function (req) {
          updatePageho(req);
        }, 1);
    }
    homeObj.titleScroll = function () {
        var scro = this.scrollsObj
        for (var i = 0; i < scro.length; i++) {
            this.myScroll = new iScroll(scro[i], {
                hScrollbar: false,
                hScroll: true,
                vScroll: false
            });
            // console.log(this.myScroll) dl_tj
        }
    }
    homeObj.initIScroll = function () {
        homeObj.titleScroll();
        setTimeout(function () {
            // homeObj.myScroll.refresh();
            // kaijiangIndexObj.titleScrollVal();
        }, 300);
    };
    homeObj.gowhol = function(obj){
        /*footballObj.goBack = function(){
            homeObj.show();
            Global.fixd()
        }
        footballObj.show();*/
        var datV = obj.attr("data-v")
        var datP = obj.attr("data-p")
        var datN = obj.attr("data-n")
        var datC = obj.attr("data-c")
        wholeObj.goBack = function(){
            wholeObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        wholeObj.show(true,function(){
          if (ConfigObj.platForm === 'android') {
              if (android_obj.isVPN() == true) {
                  $.alertMsg('當前訪問人數過多，請稍後訪問')
                  return false;
              }
          }
          wholeObj.updatePlay(datC,datN,'3') //  
          wholeObj.titlist(datP,datC)
        });  
    }
    homeObj.opact = function(obj,typ){
        if (typ == '1') {
            $('#hom_sow,#ul_zxp').find('i.new_opac').css('display','none')
        }else{
            $('#hom_type').find('i.i_opac').css('display','none')
            $('#hom_sow,#ul_zxp').find('i.new_opac').css('display','none')
        }
        obj.find('i').css('display','block')
        obj.siblings().find('i').css('display','none')
        setTimeout(function(){ $('.new_opac').hide()},1000);
    }
    homeObj.gowholes = function(){
        wholeObj.goBack = function(){
            wholeObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        wholeObj.show(true,function(){
          if (ConfigObj.platForm === 'android') {
              if (android_obj.isVPN() == true) {
                  $.alertMsg('當前訪問人數過多，請稍後訪問')
                  return false;
              }
          }
          var datV = ''
          var datN = ''
          var datP = ''
          var datC = '3'
          wholeObj.updatePlay(datV,datN,'3')
          wholeObj.titlist(datP,datC)
          // wholeObj.updatePlay(datC,datN,'3')
          // console.log(datC) im_most
          // wholeObj.titlist(datP,datC)
        });  
    }
    homeObj.Sowings = function(typ){
        sowingObj.goBack = function(){
            sowingObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        sowingObj.show(true,function(){
            sowingObj.updatePlay(typ,'3')
            sowingObj.titlist(typ)
        });  
    }
  //跳转到详情 goajaxPlay video_list img_wdhc
    homeObj.godetails = function(typ,cla,ig){
        gifJson()
      // console.log(typ)
      // console.log(cla)
      // console.log(ig)
        Global.playVideo(typ,cla,ig)
        /*if (ConfigObj.platForm === 'android') {
            android_obj.playVideo(typ,cla,ig)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.playVideo(typ,cla,ig)
        }else{
            VdetailObj.goBack=function(){
                VdetailObj.destroy();
                if(ConfigObj.platForm === 'android'){
                    android_obj.setOrPort()
                }
                homeObj.show(); 
                Global.fixd()
            }
            VdetailObj.show(true,function(){
                VdetailObj.updatePlay(typ,cla,ig)
            });
        }*/
    }

homeObj.selectOdds_1 = function(obj){
  var odds_1 = obj.attr('data-v');
  this.k_1 = obj.attr('data-k');
//  console.log(this.k_1)
  this.odds_1 = odds_1;
  $("#homeObj_rec dl").removeClass('on');
  obj.attr('data-v',odds_1).addClass('on');
  var bonus_1 = this.firstMoney * odds_1;
  bonus_1 = bonus_1.toFixed(2);
  $('#recomList_bonus_0').html(bonus_1+"元");
}

homeObj.selectOdds_2 = function(obj){
  var odds_2 = obj.attr('data-v');
  this.k_2 = obj.attr('data-k');
  this.odds_2 = odds_2;
  // console.log(this.k_2)
  $("#homeObj_rec dl").removeClass('on');
  obj.attr('data-v',odds_2).addClass('on');
  var bonus_2 = this.secondMoney * odds_2;
  bonus_2 = bonus_2.toFixed(2);
  $('#recomList_bonus_1').html(bonus_2+"元");
}
  homeObj.goRegister = function(){
   registerObj.goBack = function(){
      userCenterObj.show(); 
    }
    registerObj.goForward = function(){
      userCenterObj.show(); 
    }
    loginObj.goBack = function(){
      userCenterObj.show(); 
    }
    loginObj.goForward = function(){
      userCenterObj.show(); 
    }
    registerObj.show(true);
  }

    homeObj.creaAlert = function(){
        // console.log(644)
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'1'
        }
        // keyword  内容 user_id 用户 channel  渠道 class_name 空 id空 page  1  state 0
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/AppInfo/inform',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    var obj = res.info
                    console.log(obj)
                    // alert(android_obj.isOpenAdv()+'/'+918)
                    if (obj.length == 0) {
                        $('#home_regnewBonus').hide()
                    }else{
                        if (ConfigObj.platForm == 'android') {
                            if (android_obj.isOpenAdv() == '0') {
                                $('#home_regnewBonus').show()
                                $('#lisTxt').html(obj.content)
                                if (obj.content == undefined || obj.content == '' || obj.content == null) {
                                    $('#guanTitle').html('<p class="p_title"></p>')
                                }else{
                                    $('#guanTitle').html('<p class="p_title">'+ obj.title +'</p>')
                                }
                                android_obj.doOpenAdv()
                            }else{
                                $('#home_regnewBonus').hide()
                            }
                        }else if(ConfigObj.platForm == 'ios'){
                            if (ios_obj.isOpenAdv() == '0') {
                                $('#home_regnewBonus').show()
                                $('#lisTxt').html(obj.content)
                                if (obj.content == undefined || obj.content == '' || obj.content == null) {
                                    $('#guanTitle').html('<p class="p_title"></p>')
                                }else{
                                    $('#guanTitle').html('<p class="p_title">'+ obj.title +'</p>')
                                }
                                ios_obj.doOpenAdv()
                            }else{
                                $('#home_regnewBonus').hide()
                            }
                        }else{
                            $('#home_regnewBonus').show()
                                $('#lisTxt').html(obj.content)
                                if (obj.content == undefined || obj.content == '' || obj.content == null) {
                                    $('#guanTitle').html('<p class="p_title"></p>')
                                }else{
                                    $('#guanTitle').html('<p class="p_title">'+ obj.title +'</p>')
                                }
                            // console.log(953)
                        }
                        var Vurl = $('#lisTxt').find('a').html()
                        var Vtex = $('#lisTxt').find('a')
                        Vtex.attr('href','javascript:void(0)')
                        Vtex.unbind('tap').tap(function(e){ //返回
                            Global.openUrl(Vurl)
                        })
                    }
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    function randomObj() {
        var tex = [
            'images/channel/home1.png',
            'images/channel/home2.png',
            'images/channel/home3.png',
            'images/channel/home4.png',
            'images/channel/home5.png',
            'images/channel/home6.png',
        ]
        return sui = tex[Math.floor(Math.random()*tex.length)]
    }
    function mathbannerObj() {
        var tex = [
            'images/channel/chan_00.png',
            'images/channel/chan_002.png',
            'images/channel/chan_003.png',
            'images/channel/chan_004.png',
            'images/channel/chan_005.png',
            'images/channel/chan_006.png',
        ]
        return bannImg = tex[Math.floor(Math.random()*tex.length)]
    }
    function mathlabelObj() {
        var tex = [
            'images/channel/lab1.png',
            'images/channel/lab2.png',
            'images/channel/lab3.png',
            'images/channel/lab4.png',
            'images/channel/lab5.png',
        ]
        return labImg = tex[Math.floor(Math.random()*tex.length)]
    }
    //onlaod后执行函数
    homeObj.onloadExecution = function(){
        $("#home_appName").html(ConfigObj.appName);
        /*setTimeout(function(){
            // console.log(939)
            if (ConfigObj.power == '1' || ConfigObj.Avip != '0') {
                $('#home_cishu').html('無限次數')
            }else{
                $('#home_cishu').html(ConfigObj.pwat+'次')
            }
        },500)*/

        this.createDomObj();
        this.getData(2);
        this.getDatass()
        this.hobannerObj()
        this.createEvent();
        this.createBannerHeight();
        this.creaAlert()
        this.actreObj()
        start()
        // 加载图片
    }
  
  homeObj.setDefConfig = function(){
    this.firstMoney = 50;
    this.secondMoney = 50;
    this.odds_1 = '';
    this.odds_2 = '';
    this.bonus_1 = 0;
    this.bonus_2 = 0;
    this.k_1 = '';
    this.k_2 = '';
  }
  
  homeObj.init = function(){ // false 
      /*homeObj.onloadExecution();
      homeObj.setDefConfig();*/
  }
