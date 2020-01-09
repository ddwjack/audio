    var dynamicObj = new PageController({
       'name': 'dynamic',
       'tpl' : 'template/dynamic/dynamic.html'
    });
    dynamicObj.createDomObj = function(){
        // this.ClickObj = $(".wholeFan");
        this.hedsetObj = $("#dynamic") //  
        this.dynalObj = $("#img_ldtst") //   
        this.shuxObj = $("#dtShuax") //   
        this.bangbObj = $("#dynam_ban_gb") //   关闭banner 
        this.danimgObj = $("#dynam_gbs") //   单张关闭 
        this.bannerImgObj = $("#namic_bannerImgObj"); //轮播  hgcp
        this.bannerDivObj = this.bannerImgObj.parent(); 
        // console.log($('#img_ldtst'))
        /*this.ClickObj.unbind('tap').tap(function(e){ //返回
            dynamicObj.goBack()
        })*/
    }

    dynamicObj.createBanner = function (typ,ig,ind) {
        // console.log(typ)
        var data = typ;
        var imgHtml = [];
        var navHtml = [];
        data.forEach(function (v, i) {
            var url = v['jump_url'];
            var html = ''
            // html += '<li style="height:70%;" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ ig +')no-repeat center;background-size:cover;height:70%;width:100%;"><p></li>'
            imgHtml.push('<li style="'+(v == ig ? '' : '')+'" data-n="'+ (i == 0 ? " onl" : "") +'" data-l="'+ (i+1) +'" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url(images/channel/dynam2.png);background-size:100% 100%;min-height:200px;" onerror="javascript:this.src='+"\'images/channel/dynam2.png\'"+'" src="'+ v +'" alt="#" /></li>');
            navHtml.push('<a data-l="'+ (i+1) +'" class="dot' + (i == 0 ? " on" : "") + '"></a>');
        });
        this.bannerImgObj.html(imgHtml.join(''));
        var narWrapObj = $('#dynam_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        gifNone()
        $('#img_numbert').html($('#dynam_NavWarpObj').find('a.on').attr('data-l')+'/'+ $('#dynam_NavWarpObj').find('a').length)
    }

    dynamicObj.bannerSwipeSlide = function () {
        this.bannerDivObj.swipeSlide({
            continuousScroll: false,
            speed: 3000,
            lazyLoad: false,
            autoSwipe:false,
            callback : function(i){
                dynamicObj.bannerNavObj.removeClass('on');
                dynamicObj.bannerNavObj.eq(i).addClass('on');
                var znum = $('#dynam_NavWarpObj').find('a').length
                var dnum = $('#dynam_NavWarpObj').find('a.on').attr('data-l')
                if (dnum == undefined) {
                    var dnumb = $('#dynam_NavWarpObj').find('a').length
                }else{
                    var dnumb = dnum
                }
                $('#img_numbert').html(dnumb+'/'+znum)
            }
        });
    }

    dynamicObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            dynamicObj.sectionEvent(e);
        });
        this.dynalObj.unbind('tap').tap(function(){
            searchObj.goBack = function(){
                dynamicObj.show(true);
                Global.fixd()
            }
            searchObj.show(true,function(){
                searchObj.publicObj(4)
            });
        })
        this.shuxObj.unbind('tap').tap(function(){
            dynamicObj.shuaxinObj()
            // dynamicObj.onloadExecution()
        })
        this.bangbObj.unbind('tap').tap(function () {
            // $('#namic_bannerImgObj').html("").css({'transition':'all 0s ease-in 0s','transform':' translate3d(0px, 0px, 0px)'})
            $('.duoImg').hide(500)
            // console.log($('#namic_bannerImgObj').find('li'))
            gifNone()
        })
        this.danimgObj.unbind('tap').tap(function() {
            $('.dan_Img').hide(500)
            gifNone()
        })
        this.swiperObj()
        var page = 1;
        var size = 10;
        $('#dynamic').dropload({ 
            scrollArea : window,
            distance : 100,
            loadUpFn:function(me){
                var typ = $('#p_tjgz').find('li.on').attr('data-l')
                dynamicObj.pullLoad = me;
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                dynamicObj.updatePlay()
                me.resetload(); 
            },
        }); 
        $('#leftTabBox').dropload({ 
            scrollArea : window,
            distance : 50,
            loadDownFn:function(me){
                dynamicObj.pullLoad = me
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                var postData ={  
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    client:client,
                    mold:'hot',
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
                                dynamicObj.loadtext(res,page)
                            /*}else{
                                dynamicObj.loadfollow(res,page)
                            }*/
                            // dynamicObj.loadtext(res.info,mold)
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
    dynamicObj.bannerEvents = function (obj) {
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
                Global.openUrl(v);
            } else {
                var ret = parseSimpleUrl(v);
                console.log(ret);  //页面跳转显示 whole
                // console.log(ret.args.id) ret.args.typ ret.args.img
                if(ConfigObj.display){
                    // /video?id=視頻id&typ=視頻class分類&img=視頻圖片 Global.playVideo(typ,cla,ig)  視頻需要傳 視頻id 視頻圖片 視頻class類 
                    // /audio?id=音頻id&img=音頻圖片 android_obj.playMusic(thisC)  聽書需要傳 聽書class類
                    // /football?id=主播id&typ=主播類型&ha=主播號&nam=房間名稱
                    if (ret.path == 'video') Global.playVideo(ret.args[0],ret.args[1],ret.args[2]); //播放視頻
                    else if (ret.path == 'football') Global.goanchors(ret.args[0],ret.args[1],ret.args[2],ret.args[3],'dynamicObj') /*footballObj.show()*/; 
                    else if (ret.path == 'audio') android_obj.playMusic(ret.args[0]);  // 聽書詳情
                    else if (ret.path == 'home') {
                        kaijiangIndexObj.show()
                    }
                    // else if (ret.path == 'news') homeObj.goNewsDetail(ret.args.newsId); //原稿
                    else Global.open(v);
                }
            }
            Global.pv('banner', {url: v});
        }
    } 
    dynamicObj.shuaxinObj = function(){
        gifJson()
        dynamicObj.updatePlay('2')
    
    }
    dynamicObj.goswiperObj = function(){
        var startPosition, endPosition, moveLength;  
        $(document).bind('touchstart', function (e) {
            var touch = e.touches[0];
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
        });
        $(document).bind('touchmove', function (e) {
            var touch = e.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            }

            deltaX = endPosition.x - startPosition.x;
            deltaY = endPosition.y - startPosition.y;
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        })
        $('#dynamic').swipeUp(function(){
           if(Math.abs(moveLength)>80){
                $('.sec_foot').css('height','50px')
                // footballObj.Afollow()
            }
        })
    }
    dynamicObj.swiperObj = function () {
        $('#items li').swipe(function(){
            $('.delete').hide()
            $('.delete', this).show()
        })
    }
    dynamicObj.sousu = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            dynamicObj.show(true);
            Global.fixd()

        }
        searchObj.show(2);
    }
    dynamicObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : dynamicObj.gongyouObj();dynamicObj.gofollow(thisObj);return true; //关注
                case "a_tuij" : dynamicObj.gongyouObj();dynamicObj.gotuij(thisObj);return true; //推荐  
                case "user_detail" : dynamicObj.goxxi(thisObj);return true; //详细动态  
                case "Adyflooat" : dynamicObj.goAdyflooat(thisObj);return true; //添加關注  
                case "anch_detail" : dynamicObj.goanchdetail(thisObj);return true; //主播空间动态 
                case "dtfollows" : dynamicObj.dtfolObj(thisObL);return true; //* 我的關注 

            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : dynamicObj.goimgDeta(thisObL);return true; //* 
                case "anch_gao" : dynamicObj.bannerEvents(thisObL);return true; //* 廣告 

            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : dynamicObj.goimgDeta(thisObL);return true; //* 

            }
        }
    }
    dynamicObj.dtfolObj = function (obj) {
        offTop = (document.documentElement.scrollTop+250)
        console.log()
        dtfollowObj.goBack = function(){
            dtfollowObj.destroy();
            dynamicObj.show(false);
            // window.scrollTo(0,offTop)
            dynamicObj.scrTop(offTop)
            Global.fixd()
        }
        dtfollowObj.show(true,function(){
        });
    }
    dynamicObj.gongyouObj = function(){
        dynamicObj.createEvent()
        $('#dyna_hide').hide()
        window.scrollTo(0,0)
    }
    dynamicObj.goxxi = function(obj){
        offTop = obj[0].offsetTop
        // localStorage.setItem("offTops", offTop);
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            dynamicObj.show(false);
            dynamicObj.scrTop(offTop)
            Global.fixd()
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN,offTop)
        });
    }
    dynamicObj.goanchdetail = function(obj){
        offTop = obj[0].offsetTop
        var thisD = obj.attr('data-d')
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            dynamicObj.show(false);
            dynamicObj.scrTop(offTop)
            Global.fixd()
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(thisD,offTop)
        });
    }
    dynamicObj.goimgDeta = function(obj){
        gifJson()
        // offTop = obj[0].offsetTop
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z') 
        var thisN = obj.attr('data-n') 
        // console.log(thisN.split(','))
        // dynamicObj.Imgdetail(thisM,thisG,thisZ)
        if (thisN.split(',').length == '1') {
            console.log(1)
            $('#one_numbert').html('1/1')
            $('.dan_Img').show().find('#div_img_one').html('<img class="img_one_ban" src="'+ thisN.split(',')[0] +'" alt="" />')
            // $('#namic_bannerImgObj').html('<img src="'+ thisN.split(',')[0] +'" alt="" />')
        }else{
            $('.duoImg').show()
            console.log(2)
            dynamicObj.createBanner(thisN.split(','))
        }
        /*nodisturbObj.goBack = function(){
            dynamicObj.show(false);
            nodisturbObj.destroy();
            dynamicObj.scrTop(offTop)
            Global.fixd()
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(thisM,thisG,offTop,thisZ)
        });*/
    }
    dynamicObj.Imgdetail = function(id,ig,ind){
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:id
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/enclosure_image',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    dynamicObj.createBanner(res.info,ig,ind)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    dynamicObj.scrTop = function(tp){
        setTimeout(function(){
            // window.scrollTo(0,tp)
            window.scrollTo(0,tp-300)
        },70)
    }
    dynamicObj.updatePlay = function(ty){
        // console.log(ty)
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            mold:'hot',
            page:'0'
        } 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/anchor_enclosure',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    localStorage.setItem("resInfo", res.result);
                    // res.in = $.parseJSON(Global.crypt(res.result));
                    // dynamicObj.Vlist(res.in)
                    dynamicObj.Vlist(res,ty)
                    // $('#p_none_dt').html("<span>"+ res.result +"</span>")
                    //  推荐存缓存  
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }

    // 添加關注
    dynamicObj.goAdyflooat = function(obj){
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
                $('#leftTabBox').find('.tempWrap').css('height','80vh');
            }else{
                // $('#leftTabBox').find('.tempWrap').css('height',$('#ul_guzhu')[0].clientHeight);
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
    dynamicObj.Vlist = function(obj,ty){
        var tims = obj.time
        var resInf = $.parseJSON(Global.crypt(obj.result))
        // console.log(resInf)
        var reg = resInf
        if (resInf.banner) {
            var reg = resInf.enclosure
            if (resInf.banner.length != '0') {
                var gao = resInf.banner[0]
                var tex = ['4','5','6','7','8','9','10','4','5','6','8','7','9','4','5','6']
                var sui = tex[Math.floor(Math.random()*tex.length)]
                // console.log(resInf)
                var fruits = reg;
                fruits.splice(sui,0,gao);
            }
        }
        // console.log(reg)
        var html = ''
            for (var i = 0; i < reg.length; i++) {
                var re = reg[i]
                // console.log(re)
                dynamicObj.timeObj(tims,re.created_date)
                var str = re.images;
                console.log(sui)
                if (i == sui) { //广告
                    var parseSimUrl = function (url) {
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
                    var ret = parseSimUrl(re.target);
                    if (ret.path == 'audio') {
                        if (ConfigObj.platForm === 'android') {
                            android_obj.downloadCover(ret.args.img)
                        }else if(ConfigObj.platForm === 'ios'){
                            ios_obj.downloadCover(ret.args.img)
                        }
                    }
                    html += '<li data-t="anch_gao" data-r="'+ re.target +'" class="div_namic w100">\
                        <div class="p_user">\
                            <a data-t="" class="link w86" href="javascript:void(0)">\
                                <img class="img_user fl" src="images/room/log.png" alt="#">\
                                <p class="p_font">'+ re.title +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                                <p class="p_lx">'+ re.memo +'</p>\
                            </a>';
                            
                                html += '<a class="link w12" style="background:#F0F2F5;color:#000" href="javascript:void(0)">廣 告</a>'
                            /*if (re.video != '') {
                                html += '<video id="dy_video"  class="" poster="'+ re.poster +'" controls="true"  src="'+ re.video +'"></video>'
                            }*/
                            var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                            html +='<ul class="ul_img" style="margin-top:10px;">\
                                        <li data-z="1" data-t="anch_gao" data-r="'+ re.target +'" class="w100" style="background:url('+ re.url +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                        </li>\
                                    </ul>'
                        html += '</li>'
                }else{
                    var img = str.split(',');
                    html += '<li class="div_namic w100">\
                        <div class="p_user">\
                            <a data-t="anch_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                                <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                                <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                                <p class="p_lx">'+ re.craft +'</p>\
                            </a>';
                            if (re.followed == '0') {
                                html += '<a data-t="Adyflooat" data-d="'+ re.anchor_id +'" class="link w12" href="javascript:void(0)">+關注</a>'
                            }else{
                                html += '<a data-t="Adyflooat" data-d="'+ re.anchor_id +'" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                            }
                        html += '</div><div><a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" href="javascript:void(0)"><p class="texCent">'+ re.message +'</p></a></div>'
                            /*if (re.video != '') { // 隐藏视频
                                html += '<video id="dy_video"  class="" poster="'+ re.poster +'" controls="true"  src="'+ re.video +'"></video>'
                            }*/
                            // console.log(img.length-3)
                            if (img.length == '1' && img != '') {
                                var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                                html +='<ul class="ul_img">\
                                            <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                                <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                        </ul>'
                            }else if(img.length == '2'){
                                var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                                html +='<ul class="ul_img">\
                                            <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                                <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                            <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                                <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                        </ul>'
                            }else if(img.length >= '3'){
                                var len = img.length - '3'
                                var hie1 = Math.floor(((document.documentElement.clientWidth - 32)*0.7)/1.2)
                                var hie2 = Math.floor(((document.documentElement.clientWidth - 32)*0.29)/1)
                                html += '<ul class="ul_img">\
                                            <li data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                            <li class="w28">\
                                                <p data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                                <p style="height: 3px;"></p>\
                                                <p data-t="img_deta" data-n="'+ img +'" data-m="'+ re.id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                            </li>\
                                        </ul>'
                            }
                        html += '<p class="bot_A"><ul><li></li></ul>\
                            <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn></a>\
                            <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn></a>\
                            <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20 padri20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                        </p>\
                    </li>'
                }
            }
            $('#ul_tjians').html(html)
            // console.log($('#ul_tjians')[0].clientHeight)
            var addr = $('#ul_tjians').find('li.div_namic')
        dynamicObj.webresi()
        setTimeout(function(){
            gifNone()
        },70)
        // $('#dynamic_zhu').html(html)
    }
    dynamicObj.getText = function(){
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
    dynamicObj.Vlistfolw = function(obj,ty){
        var resInf = $.parseJSON(Global.crypt(obj.result))
        var res = resInf.enclosure
        console.log(res)
        if (resInf.length == '0') {
            $('#flowList').show()
            gifNone()
            $('#leftTabBox').find('.tempWrap').css('height','80vh');
            $('#ul_guzhu').html('')
        }else{
            $('#flowList').hide()
            var htm2 = ''
            for (var i = 0; i < res.length; i++) {
                var re = res[i]
                var tim = re.created_date.substring(11,19)
                var str = re.images;
                var img = str.split(',');
                // console.log(re)
                htm2 += '<li class="div_namic w100">\
                    <div class="p_user">\
                        <a data-t="anch_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                            <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                            <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
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
            dynamicObj.webresi()
            setTimeout(function(){
                gifNone()
            },70)
        }
        // $('#dynamic_zhu').html(html) 
    }
    dynamicObj.loadtext = function(obj,moid){
        console.log(665)
        // res.info = $.parseJSON(Global.crypt(res.result));
        var tims = obj.time
        var resInf = $.parseJSON(Global.crypt(obj.result))
        console.log(resInf)
        if (resInf.length == '0') {
            var dat = resInf
        }else{
            var dat = resInf
            console.log(dat)
            if (resInf.banner) {
                var dat = resInf.enclosure
                console.log(moid-1)
                var gao = resInf.banner[moid-1]
                console.log(gao)
                if (gao != undefined) {
                    var tex = ['4','5','6','7','8','9','10','4','5','6','8','7','9','4','5','6']
                    var sui = tex[Math.floor(Math.random()*tex.length)]
                    var fruits = dat;
                    fruits.splice(sui,0,gao);
                }
            }
            
        }
        var re = dat
        var arrLen = dat.length;
        var result = ''
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){
                var str = re[i].images;
                if (str == undefined) {
                    var img = '';
                }else{
                    var img = str.split(',');
                }
                dynamicObj.timeObj(tims,re[i].created_date)
                if (i == sui) {
                    var parseSUrl = function (url) {
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
                    var ret = parseSUrl(re[i].target);
                    if (ret.path == 'audio') {
                        if (ConfigObj.platForm === 'android') {
                            android_obj.downloadCover(ret.args.img)
                        }else if(ConfigObj.platForm === 'ios'){
                            ios_obj.downloadCover(ret.args.img)
                        }
                    }
                    result += '<li data-t="anch_gao" data-r="'+ re[i].target+'" class="div_namic w100">\
                        <div class="p_user">\
                            <a data-t="" class="link w86" href="javascript:void(0)">\
                                <img class="img_user fl" src="images/room/log.png" alt="#">\
                                <p class="p_font">'+ re[i].title +'<i class="i_gender"></i><span class="sp_font">'+ timeDay +'</span></p>\
                                <p class="p_lx">'+ re[i].memo +'</p>\
                            </a>';
                            result += '<a data-t="" style="background:#F0F2F5;color:#000" class="link w12" href="javascript:void(0)">廣告</a>'
                            
                            result += '</div>'
                            /*if (re[i].video != '') {
                                result += '<video id="dy_video"  class="" poster="'+ re[i].poster +'" controls="true"  src="'+ re[i].video +'"></video>'
                            }*/
                            var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                            result +='<ul class="ul_img">\
                                    <li data-z="1" data-t="anch_gao" data-r="'+ re[i].target+'" class="w100" style="background:url('+ re[i].url +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                    </li>\
                                </ul>'
                            result += '</li>';
                }else{
                    result += '<li class="div_namic w100">\
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
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
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
                        result += '<p class="bot_A"><li></li>\
                            <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re[i].view +'</sapn></a>\
                            <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re[i].reply +'</sapn></a>\
                            <a data-t="user_detail" data-d="'+ re[i].id +'" data-n="'+ re[i].nickname +'" class="A_foot_dny w20 padri20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re[i].thumbs +'</sapn></a>\
                        </p>\
                    </li>';
                }
            }
        }else{
            dynamicObj.pullLoad.lock();
            $('#dyna_tjh').show()
            $.alertMsg('已經到底了，沒有更多了')
        }
        // if (typl == 'hot') {
            $('#ul_tjians').append(result);
            // var bds = document.getElementById("tabBox1-bd");
            dynamicObj.getText()
            // $('#leftTabBox').find('.tempWrap').css('height',bd.children[i].children[0].offsetHeight);
            // $('#leftTabBox').find('.tempWrap').css('height',$('#ul_tjians')[0].clientHeight);
            /*TouchSlide( { slideCell:"#leftTabBox",
                endFun:function(i){ //高度自适应
                    var bd = document.getElementById("tabBox1-bd");
                    bd.parentNode.style.height = bd.children[i].children[0].offsetHeight+"px";
                    // $(bd).parents('.tempWrap').css('height',$(bd)[0].clientHeight)
                    // console.log(bd.children[i].children[1].offsetHeight+"px";)
                    if(i>0)bd.parentNode.style.transition="200ms";//添加动画效果
                }
            })*/
        // $('#dynamic_tui').append(result);
        dynamicObj.webresi()
        dynamicObj.pullLoad.resetload();
    }
    dynamicObj.timeObj = function(time,over){
        var curTime = new Date(parseInt(time) * 1000);
        var postTime = new Date(over.replace(/-/g,'/'));
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
    dynamicObj.webresi = function(vid){ 
        var testLi=document.getElementById('leftTabBox').getElementsByTagName('video');
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
    dynamicObj.timesObj = function(time,over){
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
    dynamicObj.vidpauseObj = function(){ 
        var testLi=document.getElementById('sec_cent').getElementsByTagName('video');
        for(var i=0;i<testLi.length;i++) {
            // console.log(testLi[i])
            testLi[i].pause()
        }
    }
    dynamicObj.loadObj = function() {
        setTimeout(function(){
            gifJson()
            dynamicObj.updatePlay('hot')
        },100)
    }
    dynamicObj.onloadExecution = function(){
        dynamicObj.createDomObj()
        dynamicObj.createEvent()
        dynamicObj.loadObj()
        // var offTop = localStorage.getItem("offTops")
        // dynamicObj.scrTop(offTop)
    }
    dynamicObj.init = function(){
        dynamicObj.onloadExecution()
    }