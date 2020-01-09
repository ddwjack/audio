    var dtfollowObj = new PageController({
       'name': 'dtfollow',
       'tpl' : 'template/dynamic/dtfollow.html'
    });
    dtfollowObj.createDomObj = function(){
        this.ClickObj = $(".dtgzFan");
        this.hedsetObj = $("#dtfollow") //  
        this.bangbObj = $("#fol_ban_gb") //   关闭banner 
        this.danimgObj = $("#folo_gbs") //   单张关闭 
        this.followbanImgObj = $("#follo_bannerImgObj"); //轮播  hgcp
        this.bannerDivObj = this.followbanImgObj.parent(); 
        window.scrollTo(0,0)
        // this.dynalObj = $("#img_ldtst") //   
        // this.shuxObj = $("#dtShuax") //   
        // console.log($('#img_ldtst'))
        /*this.ClickObj.unbind('tap').tap(function(e){ //返回
            dtfollowObj.goBack()
        })*/
    }

    dtfollowObj.createBanner = function (typ,ig,ind) {
        console.log(typ)
        var data = typ;
        var imgHtml = [];
        var navHtml = [];
        data.forEach(function (v, i) {
            var url = v['jump_url'];
            var html = ''
            // html += '<li style="height:70%;" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ ig +')no-repeat center;background-size:cover;height:70%;width:100%;"><p></li>'
            imgHtml.push('<li style="'+(v == ig ? '' : '')+'" data-n="'+ (i == 0 ? " onl" : "") +'" data-l="'+ (i+1) +'" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url(images/channel/dynam3.png);background-size:100% 100%;images/channel/dynam2.png" onerror="javascript:this.src='+"\'images/channel/dynam2.png\'"+'" src="'+ v +'" alt="" /></li>');
            navHtml.push('<a data-l="'+ (i+1) +'" class="dot' + (i == 0 ? " on" : "") + '"></a>');
        });
        this.followbanImgObj.html(imgHtml.join(''));
        var narWrapObj = $('#guanzh_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        gifNone()
        $('#img_folo_numbert').html($('#guanzh_NavWarpObj').find('a.on').attr('data-l')+'/'+ $('#guanzh_NavWarpObj').find('a').length)
        /*data.forEach(function (v, i) {
            console.log(v)
            var url = v['jump_url'];
            var html = ''
            // html += '<li style="height:70%;" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ ig +')no-repeat center;background-size:cover;height:70%;width:100%;"><p></li>'
            imgHtml.push('<li style="'+(v == ig ? '' : '')+'" data-n="'+ (i == 0 ? " onl" : "") +'" data-l="'+ (i+1) +'" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img src="'+ v +'" alt="" /></li>');
            navHtml.push('<a data-l="'+ (i+1) +'" class="dot' + (i == 0 ? " on" : "") + '"></a>');
        });
        this.followbanImgObj.html(imgHtml.join(''));
        var narWrapObj = $('#guanzh_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        gifNone()
        $('#img_folo_numbert').html($('#guanzh_NavWarpObj').find('a.on').attr('data-l')+'/'+ $('#guanzh_NavWarpObj').find('a').length)*/
    }

    dtfollowObj.bannerSwipeSlide = function () {
        this.bannerDivObj.swipeSlide({
            continuousScroll: false,
            speed: 3000,
            lazyLoad: false,
            autoSwipe:false,
            callback : function(i){
                dtfollowObj.bannerNavObj.removeClass('on');
                dtfollowObj.bannerNavObj.eq(i).addClass('on');
                var znum = $('#guanzh_NavWarpObj').find('a').length
                var dnum = $('#guanzh_NavWarpObj').find('a.on').attr('data-l')
                if (dnum == undefined) {
                    var dnumb = $('#guanzh_NavWarpObj').find('a').length
                }else{
                    var dnumb = dnum
                }
                $('#img_folo_numbert').html(dnumb+'/'+znum)
            }
        });
    }

    dtfollowObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            dtfollowObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){
            dtfollowObj.goBack();
        });
        this.bangbObj.unbind('tap').tap(function () {
            // $('#namic_bannerImgObj').html("").css({'transition':'all 0s ease-in 0s','transform':' translate3d(0px, 0px, 0px)'})
            $('.duo_fol_Img').hide(500)
            // console.log($('#namic_bannerImgObj').find('li'))
            gifNone()
        })
        this.danimgObj.unbind('tap').tap(function() {
            $('.follow_ban_Img').hide(500)
            gifNone()
        })
        var page = 1;
        var size = 10;
        $('#dtfollow').dropload({ 
            scrollArea : window,
            distance : 100,
            loadUpFn:function(me){
                var typ = $('#p_tjgz').find('li.on').attr('data-l')
                dtfollowObj.pullLoad = me;
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
               
                dtfollowObj.updfollPlay()
                me.resetload(); 
            },
        }); 
        $('#dtfollow').dropload({ 
            scrollArea : window,
            distance : 50,
            loadDownFn:function(me){
                dtfollowObj.pullLoad = me
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                /*var cous = $('#p_tjgz').find('li.on').attr('data-l') 
                if (cous == '0') {
                    var mold = 'hot'
                }else{
                    var mold = 'follow'
                }*/
                var postData ={  
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    client:client,
                    mold:'follow',
                    page:page
                } 
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/live/anchor_enclosure',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (res.ok == true) {
                            // res.info = $.parseJSON(Global.crypt(res.result));
                            var arrt = []
                            // if (mold == 'hot') {
                                // $('#p_none_dt').append('<span>'+ res.result +'</span>')
                                // localStorage.setItem("resInfo", $('#p_none_dt').html());
                            dtfollowObj.loadfollow(res,res.time)
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        me.resetload();
                    }
                })
            }
        }); 
    }
    dtfollowObj.bannerEvents = function (obj) {
        var LiObj = obj
        if (LiObj) {
            var thisObj = $(LiObj);
            var v = thisObj.attr('data-r');
            // var v = '/football?id=63&typ=1VN&ha=cv460358&nam=非凡哥';
            var parseSimpleUrl = function (url) {
                var tmp = url.split('?');
                var path = tmp[0];
                var args = {};
                if (tmp[1] && tmp[1].length) {
                    var tmp2 = tmp[1].split('&');
                    tmp2.forEach(function (v) {
                        var tmp3 = v.split('=');
                        args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
                    })
                }
                return {path: path, args: args};
            };
            if (v.indexOf('http://') == 0 || v.indexOf('https://') == 0) {
                // 外部链接
                Global.openUrl(v);
            } else {
                var ret = parseSimpleUrl(v);
                console.log(ret);  //页面跳转显示 whole
                // console.log(ret.args.id) ret.args.typ ret.args.img
                if(ConfigObj.display){
                    // /video?id=視頻id&typ=視頻class分類&img=視頻圖片 Global.playVideo(typ,cla,ig)  視頻需要傳 視頻id 視頻圖片 視頻class類 
                    // /audio?id=音頻id&img=音頻圖片 android_obj.playMusic(thisC)  聽書需要傳 聽書class類
                    // /football?id=主播id&typ=主播類型&ha=主播號&nam=房間名稱
                    if (ret.path == '/video') Global.playVideo(ret.args.id,ret.args.typ,ret.args.img); //播放視頻
                    else if (ret.path == '/football') Global.goanchors(ret.args.id,ret.args.ha,ret.args.typ,ret.args.nam,'dtfollowObj') /*footballObj.show()*/; 
                    else if (ret.path == '/audio') android_obj.playMusic(ret.args.id);  // 聽書詳情
                    else if (ret.path == '/home') {
                        kaijiangIndexObj.show()
                    }
                    // else if (ret.path == 'news') homeObj.goNewsDetail(ret.args.newsId); //原稿
                    else Global.open(v);
                }
            }
            Global.pv('banner', {url: v});
        }
    } 
    dtfollowObj.shuaxinObj = function(){
        gifJson()
        // dtfollowObj.updatePlay('2')
        // dtfollowObj.updfollPlay('2')
        var typ = $('#p_tjgz').find('li.on').attr('data-l')
        if (typ == '0') {
            dtfollowObj.updatePlay('2')
            // $('#gzleftTabBox').find('.tempWrap').css('height',$('#ul_tjians')[0].clientHeight);
        }else{
            dtfollowObj.updfollPlay('2')
            // $('#gzleftTabBox').find('.tempWrap').css('height',$('#ul_guzhu')[0].clientHeight);
        }
    }
    dtfollowObj.sousu = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            dtfollowObj.show(true);
            // Global.fixd()

        }
        searchObj.show(2);
    }
    dtfollowObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : dtfollowObj.gongyouObj();dtfollowObj.gofollow(thisObj);return true; //关注
                case "a_tuij" : dtfollowObj.gongyouObj();dtfollowObj.gotuij(thisObj);return true; //推荐  
                case "user_detail" : dtfollowObj.goxxi(thisObj);return true; //详细动态  
                case "Adyflooat" : dtfollowObj.goAdyflooat(thisObj);return true; //添加關注  
                case "anch_detail" : dtfollowObj.goanchdetail(thisObj);return true; //主播空间动态 
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : dtfollowObj.goimgDeta(thisObL);return true; //* 
                case "anch_gao" : dtfollowObj.bannerEvents(thisObL);return true; //* 廣告

            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : dtfollowObj.goimgDeta(thisObL);return true; //* 

            }
        }
    }
    dtfollowObj.gongyouObj = function(){
        dtfollowObj.createEvent()
        $('#dyna_hide').hide()
        window.scrollTo(0,0)
    }
    dtfollowObj.goxxi = function(obj){
        offTop = obj[0].offsetTop
        // localStorage.setItem("offTops", offTop);
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            dtfollowObj.show(false);
            dtfollowObj.scrTop(offTop)
            // Global.fixd()
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN,offTop)
        });
    }
    dtfollowObj.goanchdetail = function(obj){
        offTop = obj[0].offsetTop
        var thisD = obj.attr('data-d')
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            dtfollowObj.show(false);
            dtfollowObj.scrTop(offTop)
            // Global.fixd()
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(thisD,offTop)
        });
    }
    dtfollowObj.goimgDeta = function(obj){
        // offTop = obj[0].offsetTop
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z') 
        var thisN = obj.attr('data-n') 
        if (thisN.split(',').length == '1') {
            console.log(1)
            $('#one_folow_numbert').html('1/1')
            $('.follow_ban_Img').show().find('#follow_img_one').html('<img class="img_one_ban" src="'+ thisN.split(',')[0] +'" alt="" />')
            // $('#namic_bannerImgObj').html('<img src="'+ thisN.split(',')[0] +'" alt="" />')
        }else{
            $('.duo_fol_Img').show()
            console.log(2)
            dtfollowObj.createBanner(thisN.split(','))
        }
        /*nodisturbObj.goBack = function(){
            dtfollowObj.show(false);
            nodisturbObj.destroy();
            dtfollowObj.scrTop(offTop)
            Global.fixd()
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(thisM,thisG,offTop,thisZ)
        });*/
    }
    dtfollowObj.scrTop = function(tp){
        setTimeout(function(){
            window.scrollTo(0,tp-300)
        },80)
    }
    dtfollowObj.updatePlay = function(ty){
        
    }

    dtfollowObj.updfollPlay = function(ty){
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            mold:'follow',
            page:'0'
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/anchor_enclosure',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    dtfollowObj.Vlistfolw(res,res.time)
                    // console.log(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    // 添加關注
    dtfollowObj.goAdyflooat = function(obj){
        var thisD = obj.attr('data-d')
        var thisL = obj.attr('data-l')
        var texd = $('#ul_tjians li.div_namic').find('a.w12')
        var arrId = []
        if ($(obj).html() == '已關注') {
            for (var i = 0; i < texd.length; i++) {
                var poster = $(texd[i]).attr('data-d')
                if (thisD == poster) {
                    $(texd[i]).removeClass('colGray').html('+關注')
                }
            }
        }else{
            for (var i = 0; i < texd.length; i++) {
                var poster = $(texd[i]).attr('data-d')
                if (thisD == poster) {
                    $(texd[i]).addClass('colGray').html('已關注')
                }
            }
            // $(obj).addClass('colGray').html('已關注')
        }
        if (thisL == '1') {
            var text = $('#ul_guzhu li.div_namic').find('a.w12')
            for (var i = 0; i < text.length; i++) {
                var poster = $(text[i]).attr('data-d')
                if (thisD == poster) {
                    $(text[i]).addClass('colGray').html('+關注')
                    $(text[i]).parents('li.div_namic').hide()
                }
            }
            if ($('#ul_guzhu')[0].clientHeight == '0') {
                $('.img_nulgon').show()
                $('#gzleftTabBox').find('.tempWrap').css('height','80vh');
            }else{
                $('#gzleftTabBox').find('.tempWrap').css('height',$('#ul_guzhu')[0].clientHeight);
            }
            // obj.parents('li.div_namic').hide()
            $('#p_none_dt').append('<span>'+ thisD +'</span>')
        }else{

        }
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:thisD,
            role: "user",
        } 
        // console.log(postData) 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/setFollow',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    console.log($(obj).html())
                    if ($(obj).html() == '已關注') {
                        $.alertMsg('關注成功') 
                    }else{
                        $.alertMsg('取消成功') 
                    }
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    dtfollowObj.getText = function(){
        var spappe =  $('#p_none_dt').find('span')
        var arrImg = []
        var html = ''
        $('#ul_tjians').find('a.w12')
        var texList = $('#ul_tjians').find('a.w12')
        for (var i = 0; i < texList.length; i++) {
            // console.log($(texList[i]).attr('data-d'))
            var dynaId = $(texList[i]).attr('data-d')
            for (var j = 0; j < spappe.length; j++) {
                // console.log($(spappe[j]).html())
                if ($(texList[i]).attr('data-d') == $(spappe[j]).html()) {
                    $(texList[i]).html('+關注').removeClass('colGray')
                }
            }
        }
    }
    dtfollowObj.Vlistfolw = function(obj,timew){
        var resInf = $.parseJSON(Global.crypt(obj.result))
        var res = resInf.enclosure
        if (resInf.length == '0') {
            $('#flowList').show()
            gifNone()
            $('#gzleftTabBox').find('.tempWrap').css('height','80vh');
            $('#ul_guzhu').html('')
        }else{
            $('#flowList').hide()
            var htm2 = ''
            for (var i = 0; i < res.length; i++) {
                var re = res[i]
                var tim = re.created_date.substring(11,19)
                var str = re.images;
                var img = str.split(',');
                dtfollowObj.timeObj(timew,re.created_date)

                // console.log(re)
                htm2 += '<li class="div_namic w100" style="padding-top: 10px;">\
                    <div class="p_user">\
                        <a data-t="anch_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                            <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                            <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                            <p class="p_lx">'+ re.craft +'</p>\
                        </a>';
                        if (re.followed == '0') {
                            htm2 += '<a data-t="Adyflooat" data-d="'+ re.anchor_id +'" class="link w12" href="javascript:void(0)">+關注</a>'
                        }else{
                            htm2 += '<a data-t="Adyflooat" data-l="1" data-d="'+ re.anchor_id +'" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                        }
                    htm2 += '</div><div><a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" href="javascript:void(0)"><p class="texCent">'+ re.message +'</p></a></div>'
                        /*if (re.video != '') {
                            htm2 += '<video id="dy_video"  class="" poster="'+ re.poster +'" controls="true"  src="'+ re.video +'"></video>'
                        }*/
                        if (img.length == '1' && img != '') {
                            var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                            htm2 +='<ul class="ul_img">\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    </ul>'
                        }else if(img.length == '2'){
                            var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                            htm2 +='<ul class="ul_img">\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    </ul>'
                        }else if(img.length >= '3'){
                            var len = img.length - '3'
                            var hie1 = Math.floor(((document.documentElement.clientWidth - 32)*0.7)/1.2)
                            var hie2 = Math.floor(((document.documentElement.clientWidth - 32)*0.29)/1)
                            htm2 += '<ul class="ul_img">\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                        <li class="w28">\
                                            <p data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                                <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                            <p style="height: 3px;"></p>\
                                            <p data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                        </li>\
                                    </ul>'
                        }
                    htm2 += '<p class="bot_A"><ul><li></li></ul>\
                        <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn></a>\
                        <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn></a>\
                        <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20 padri20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                    </p>\
                </li>'
            }
            $('#ul_guzhu').html(htm2)
            dtfollowObj.webresi()
            setTimeout(function(){
                gifNone()
            },70)
        }
        // $('#dynamic_zhu').html(html) 
    }
    
    dtfollowObj.loadfollow = function(obj,times){
        if ($('#ul_guzhu').find('li.div_namic').length == '0') {
            $('#flowList').show()
            $('#gzleftTabBox').find('.tempWrap').css('height','80vh');
            $('#ul_guzhu').html('')
            dtfollowObj.pullLoad.lock();
            $('#dyna_guaz').show()
        }else{
            var resInf = $.parseJSON(Global.crypt(obj.result))
            var dat = resInf.enclosure
            var re = dat
            var arrLen = dat.length;
            var result = ''
            if(arrLen > 0){
                for(var i=0; i<arrLen; i++){
                    var tim = re[i].created_date.substring(11,19)
                    dtfollowObj.timeObj(times,re[i].created_date)
                    // console.log(tim)
                    var str = re[i].images;
                    var img = str.split(',');
                    result += '<li class="div_namic w100" style="padding-top: 10px;">\
                        <div class="p_user">\
                            <a data-t="anch_detail" data-d="'+ re[i].anchor_id +'" data-n="'+ re[i].nickname +'" data-g="'+ re[i].followed +'" class="link w86" href="javascript:void(0)">\
                                <img class="img_user fl" src="'+ re[i].avatar_url +'" alt="#">\
                                <p class="p_font">'+ re[i].nickname +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                                <p class="p_lx">'+ re[i].craft +'</p>\
                            </a>';
                            if (re[i].followed == '0') {
                                result += '<a data-t="Adyflooat" data-d="'+ re[i].anchor_id +'" class="link w12" href="javascript:void(0)">+關注</a>'
                            }else{
                                result += '<a data-t="Adyflooat" data-d="'+ re[i].anchor_id +'" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                            }
                        result += '</div>\
                        <div><p class="texCent">'+ re[i].message +'</p></div>'
                            /*if (re[i].video != '') {
                                result += '<video id="dy_video"  class="" poster="'+ re[i].poster +'" controls="true"  src="'+ re[i].video +'"></video>'
                            }*/
                            if (img.length == '1' && img != '') {
                                // <img class="w100" src="'+ img[0] +'" alt="#">\
                                var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                                result +='<ul class="ul_img">\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re[i].id +'" data-g="'+ img[0]+'" data-z="1" class="w100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    </ul>'
                            }else if(img.length == '2'){
                                var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                                result +='<ul class="ul_img">\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re[i].id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                        <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re[i].id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    </ul>'
                            }else if(img.length >= '3'){
                                var len = img.length - '3'
                                var hie1 = Math.floor(((document.documentElement.clientWidth - 32)*0.7)/1.2)
                                var hie2 = Math.floor(((document.documentElement.clientWidth - 32)*0.29)/1)
                                result += '<ul class="ul_img">\
                                            <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re[i].id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                                <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                        <li class="w28">\
                                            <p data-t="img_deta" data-n="'+ img +'" data-m="'+ re[i].id +'" data-g="'+ img[1]+'" data-z="2"  style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                            <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                            <p style="height: 3px;"></p>\
                                            <p data-t="img_deta" data-n="'+ img +'" data-m="'+ re[i].id +'" data-g="'+ img[2]+'" data-z="3"  class="pAfter" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                        </li>\
                                    </ul>'
                            }
                        result += '<p class="bot_A"><ul><li></li></ul>\
                            <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re[i].view +'</sapn></a>\
                            <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re[i].reply +'</sapn></a>\
                            <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="A_foot_dny w20 padri20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re[i].thumbs +'</sapn></a>\
                        </p>\
                    </li>';
                }
            }else{
                dtfollowObj.pullLoad.lock();
                $('#dyna_guaz').show()
                $.alertMsg('已經到底了，沒有更多了')
            }
            $('#ul_guzhu').append(result);
        }
        dtfollowObj.webresi()
        dtfollowObj.pullLoad.resetload();
    }
    dtfollowObj.timeObj = function(time,over){
        // console.log(628)
        var curTime = new Date(parseInt(time) * 1000);
        var postTime = new Date(over.replace(/-/g,'/'));
        var timeDiff = curTime.getTime() - postTime.getTime();
        // var curTime = new Date(parseInt(time) * 1000);
        // var postTime = new Date(over);
        // var timeDiff = curTime.getTime() - postTime.getTime();
        // 单位换算
        var min = 60 * 1000;
        var hour = min * 60;
        var day = hour * 24;
        var week = day * 7;
        // 计算发布时间距离当前时间的周、天、时、分
        var exceedWeek = Math.floor(timeDiff/week);
        var exceedDay = Math.floor(timeDiff/day);
        var exceedHour = Math.floor(timeDiff/hour);
        var exceedMin = Math.floor(timeDiff/min);
        // 最后判断时间差到底是属于哪个区间，然后return
        if(exceedWeek > 0){
            return timeDay = exceedDay + '天前'
        }else{
            if(exceedDay < 7 && exceedDay > 0){
                return timeDay = exceedDay + '天前'
            }else{
                if(exceedHour < 24 && exceedHour > 0){
                return timeDay = exceedHour+ '小時前'
                }else{
                    return timeDay = exceedMin+ '分鐘前'
                }
            }
        }
    }
    dtfollowObj.webresi = function(vid){ 
        var testLi=document.getElementById('gzleftTabBox').getElementsByTagName('video');
         for(var i=0;i<testLi.length;i++) {
            testLi[i].addEventListener('play', function(num){
                // num.target.play()
            });
            testLi[i].addEventListener('resize', function(){
            });
            testLi[i].addEventListener('playing', function(num){
                console.log(num.target.offsetTop)
                var this1=this;
                this.play();
                for(var b=0;b<testLi.length;b++){
                    var this2=testLi[b];
                    if(this1!==this2){
                        this2.pause();
                    }
                }
            });
            testLi[i].addEventListener('canplay', function(num){
                // var gif = num.target.nextElementSibling
            });
        }
    }
    dtfollowObj.timesObj = function(time,over){
        var curTime = new Date(parseInt(time) * 1000);
        var postTime = new Date(over);
        var timeDiff = curTime.getTime() - postTime.getTime();
        // 单位换算
        var min = 60 * 1000;
        var hour = min * 60;
        var day = hour * 24;
        var week = day * 7;
        // 计算发布时间距离当前时间的周、天、时、分
        var exceedWeek = Math.floor(timeDiff/week);
        var exceedDay = Math.floor(timeDiff/day);
        var exceedHour = Math.floor(timeDiff/hour);
        var exceedMin = Math.floor(timeDiff/min);
        // 最后判断时间差到底是属于哪个区间，然后return
        if(exceedWeek > 0){
            return timeDay = exceedDay + '天前'
        }else{
            if(exceedDay < 7 && exceedDay > 0){
                return timeDay = exceedDay + '天前'
            }else{
                if(exceedHour < 24 && exceedHour > 0){
                return timeDay = exceedHour+ '小時前'
                }else{
                    return timeDay = exceedMin+ '分鐘前'
                }
            }
        }
    }
    dtfollowObj.vidpauseObj = function(){ 
        var testLi=document.getElementById('sec_cent').getElementsByTagName('video');
        for(var i=0;i<testLi.length;i++) {
            // console.log(testLi[i])
            testLi[i].pause()
        }
    }
    dtfollowObj.tloadObj = function() {
        setTimeout(function() {
            dtfollowObj.createDomObj()
            dtfollowObj.createEvent()
            gifJson()
            dtfollowObj.updfollPlay()
        },100)
    }
    dtfollowObj.onloadExecution = function(){
        dtfollowObj.tloadObj()
    }
    dtfollowObj.init = function(){
        dtfollowObj.onloadExecution()
    }