    var AvdetailsObj = new PageController({
	   'name': 'Avdetails',
	   'tpl' : 'template/football/Avdetails.html',
       'pullDistance': 220
    });

    AvdetailsObj.defBannerImgProportion = 375/500;

    AvdetailsObj.createBannerHeight = function(){
        var bodyWidth = $("body").width();
        var height= bodyWidth/this.defBannerImgProportion;
        this.bannerImgObj.css("height",height+"px");
        this.bannerDivObj.css("height",height+"px");
    }
    AvdetailsObj.createBanner = function (typ) {
        var data = typ.image;
        var vido = typ.video;
        var post = typ.poster;
        // console.log(data)
        var imgHtml = [];
        var navHtml = [];
        // var vidImg = ''
        /*if (vido != '') {
            imgHtml.push('<li style="background:#000;"><video controls="controls" id="" poster="'+ post +'" src="video.mp4"></video></li>');
            //  data-t="videoDeta"   vide{position: absolute;width: 100%;left: 50%;top: 50%;transform: translate(-50%,-50%);}
        }*/
        data.forEach(function (v, i) {
            mathliveObj()
            var url = v['jump_url'];
            /*if (vido != '') {
                imgHtml.push('<li data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><video controls="true" poster="'+ post +'" src="'+ vido +'"></video></li>');
            }else{
                imgHtml.push('<li style="background:url('+ livImg +');background-size:100% 100%;" data-d="'+v['id']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ v +')no-repeat center;background-size:cover;height:100%;width:100%;bottom:0;"><p></li>');
            }*/
            // imgHtml.push('<li data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img src="' + v + '"></li>');
            // vidImg += '<li style="" data-d="'+v['id']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '">'
            // if (true) {}
            // vidImg += '<p style="background:url('+ v +')no-repeat center;background-size:cover;height:100%;width:100%;bottom:0;"><p></li>'
            imgHtml.push('<li style="background:url('+ livImg +');background-size:100% 100%;" data-d="'+v['id']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ v +')no-repeat center;background-size:cover;height:100%;width:100%;bottom:0;"><p></li>');
            navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
        });
        this.bannerImgObj.html(imgHtml.join(''));
        // console.log(typ)
        var narWrapObj = $('#home_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        gifNone()
        // delete this.ajaxData.bannel;
        /*$('#videoDeta').unbind('tap').tap(function() {
            console.log(49)
        })*/
    }
    AvdetailsObj.bannerSwipeSlide = function () {
        this.bannerDivObj.swipeSlide({
            continuousScroll: true,
            speed: 2000,
            lazyLoad: true,
            // autoSwipe:true,
            autoSwipe:false,
            callback : function(i){
                AvdetailsObj.bannerNavObj.removeClass('on');
                AvdetailsObj.bannerNavObj.eq(i).addClass('on');
                // $('video')[0].pause()
            }
        });
    }

    AvdetailsObj.createDomObj = function(){
    	this.ClickObj = $(".AVdeta_Fan");
        this.hedsetObj = $("#Avdeta"); 
        this.hideObj = $("#divGift"); 
        this.bannerImgObj = $("#deti_bannerImgObj"); //轮播  hgcp
        this.bannerDivObj = this.bannerImgObj.parent();
    }
    AvdetailsObj.bannerEvent = function (e) {
        var LiObj = $.oto_checkEvent(e, "LI");
        console.log(55)
        if (LiObj) {
            var thisObj = $(LiObj);
            var v = thisObj.attr('data-v');
            var X = thisObj.attr('data-x');
            var D = thisObj.attr('data-d');
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
                AvdetailsObj.gohomeObj(D)
            } else {
                var ret = parseSimpleUrl(v);
                if(ConfigObj.display){
                // console.log(ret.path)
                    if (ret.path == '/sporttery/jczq') this.gotoJczqBet(); //竟足
                    else if (ret.path == 'news') AvdetailsObj.goNewsDetail(ret.args.newsId);
                    else Global.open(v);
                }
            }
            Global.pv('banner', {url: v});
        }
    }
    AvdetailsObj.bannerObj = function(){
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
                    // AvdetailsObj.createBanner(res.info)
                }else{
                    // console.log(res.err)
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  fixed

            }
        })
    }

    
    AvdetailsObj.createEvent = function(){
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            AvdetailsObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            AvdetailsObj.goBack(scoTops)
        })
        this.hideObj.unbind('tap').tap(function(e){
            $('#fixed_money').hide()
        })
    }
    AvdetailsObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Ayhyx" : AvdetailsObj.goyhyx(thisObj);return true; //用户印象 
                case "Agift" : AvdetailsObj.gogift(thisObj);return true; //礼物柜 
                case "givingGift" : AvdetailsObj.givingObj(thisObj);return true; //发送礼物页面按钮  
                case "sub_gift" : AvdetailsObj.gogiftObj(thisObj);return true; //发送按钮   
                case "goTvideo" : AvdetailsObj.goTvideoObj(thisObj);return true; //跟他視頻  
                case "go_space" : AvdetailsObj.go_spaceObj(thisObj);return true; //他的空間  
                case "Aguzhu" : footballObj.goimgFoll(thisObj);return true; //关注   
                case "kjmoney" : AvdetailsObj.gokjmoney(thisObj);return true; //快捷充值   
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Aslw" : AvdetailsObj.AslwObj(thisObL);return true; // 送礼物列表
                case "goImus" : AvdetailsObj.goImus(thisObL);return true; //  去im聊天 
                case "videoDeta" : AvdetailsObj.govideo(thisObL);return true; //  去im聊天 
            }
        }
    }
    AvdetailsObj.gokjmoney = function(){
        moneyObj.goBack = function(){
            moneyObj.destroy();
            AvdetailsObj.show();
            $('.giftListuser').hide()
        }
        moneyObj.show(true,function(){
            moneyObj.mobileObj(ConfigObj.iphon)
        }); 
    }
    AvdetailsObj.govideo = function(obj) {
        console.log(198)
        $(obj).find('video')[0].play()
    }
    AvdetailsObj.detaObj = function(id,scoTop){
        window.scrollTo(0,0)
        // console.log(zd)
        ueiD = id 
        scoTops = scoTop
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:'android',
            anchor_id:id,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/info', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    zhiD = res.info.basic.anchor_no
                    typX = res.info.basic.type
                    and_Id = res.info.basic.anchor_id
                    and_nm = res.info.basic.nickname
                    and_ig = res.info.basic.avatar_url
                    // and_Id = res.info.basic.anchor_id
                    AvdetailsObj.createBanner(res.info.backdrop)
                    AvdetailsObj.htmlTxet(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    AvdetailsObj.go_spaceObj = function(obj){
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        var thisG = obj.attr('data-g')
        // console.log(thisD +'久久'+thisN+'接口'+thisG)
        spaceObj.goBack = function(){
            spaceObj.destroy();
            AvdetailsObj.show();
            // Global.fixd()
        }
        spaceObj.show(true,function(){
            spaceObj.ajaxdeta(thisD,thisN,thisG)
        });
    }
    AvdetailsObj.givingObj = function(obj){
        $('#fixed_money').show()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:'android',
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/gift_list', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    AvdetailsObj.givinghtml(res.info)
                    // feedbackObj.gohtmltex(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    AvdetailsObj.gogiftObj = function(obj){
        // console.log(zhiD)
        if (!$('#givingUl').find('li').hasClass('after')) {
            $.alertMsg('请选择要发送的礼物')
            return false;
        }
        var lwId = $('#givingUl').find('li.after').attr('data-d')
        var thisN = $('#givingUl').find('li.after').attr('data-n')
        var thisG = $('#givingUl').find('li.after').attr('data-g')
        // console.log(thisG)
        
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:'android',
            anchor_id:ueiD,
            anchor_no:zhiD,
            gift_id:lwId,
            mold:typX
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/give_gift', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    $.alertMsg(res.suc)
                    $('#hz_money').html('金币：'+res.info.current_gold)
                    if (ConfigObj.platForm == 'android') {
                         android_obj.sendGiftMsg(zhiD,and_ig,and_nm,lwId,thisN,thisG,typX,and_Id)
                    }else if(ConfigObj.platForm == 'ios'){
                         ios_obj.sendGiftMsg(zhiD,and_ig,and_nm,lwId,thisN,thisG,typX,and_Id)
                    }else{}
                    // $('#fixed_money').hide(300)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    AvdetailsObj.goTvideoObj = function(obj){
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        gifJson()
        var thisL = obj.attr('data-l')
        if (thisL == '1V1') {
            sendCallMsg(zhiD,and_ig,and_nm,typX,and_Id)
        }
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:ueiD,
            role:'user',
            anchor_no:zhiD,
            mold:thisL,
            handle:'before',
        }
        console.log(postData)        
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/build_connect', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    if (thisL == '1V1') {
                        if (ConfigObj.platForm == 'android') {
                            android_obj.doOneLive(zhiD,ueiD,res.result)
                        }else{
                            ios_obj.doOneLive(zhiD,ueiD,res.result)
                        }
                    }else{
                        if (ConfigObj.platForm == 'android') {
                            android_obj.doLive("2", zhiD, ConfigObj.meId, ueiD, ConfigObj.usName, thisF,res.result,ConfigObj.pic)
                        }else{
                            ios_obj.doLive("2", zhiD, ConfigObj.meId, ueiD, ConfigObj.usName, thisF,res.result,ConfigObj.pic)
                        }
                    }
                    gifNone()
                }else{
                    if (res.err == '余额不足') {
                        $('.moneyAlert').show()
                        $('.Agomoney').attr('data-l','AvdetailsObj')
                    }else{
                       $.alertMsg(res.err) 
                    }
                    gifNone()
                }
            }
        })
    }
    AvdetailsObj.htmlTxet = function(res){
        // console.log(res)
        var basic = res.basic
        var evalu = res.evaluate
        var gifts = res.gift_cabinet
        var forte = ''
        var label = res.basic.label.split(',')
        console.log(res.basic.label)
        console.log(label)

        $('#im_my_tou').html('<p style="background:url(images/room/log.png)no-repeat center;background-size:cover;height:84px;width:84px;border-radius: 6px;"><i class="link" style="background:url('+ basic.avatar_url +')no-repeat center;background-size:cover;height:84px;width:84px;border-radius: 6px;"></i></p>')
        // star
        html ='<p class="pNmae">'+ basic.nickname +'<i class="i_woman"></i></p>\
                <p class="pNmae" style="margin-top: -4px;">'
                    for (var i = 0; i < label.length; i++) {
                        html += '<span>'+ label[i]+'</span>'
                    }
                    html += '<a data-t="Aguzhu" data-d="'+ basic.anchor_id +'" data-h="'+ basic.anchor_no +'" href="javascript:void(0)"><span class="fr Agz '+ (basic.followed == '1' ? 'sp_tex_gz' : '') +'">'+ (basic.followed == '1' ? '已關注' : '+關注')+'</a></span>\
                </p>\
                <p class="link w40">';
                    switch (basic.star){
                        case 1:
                    html += '<img src="images/room/wu.png" alt=""><img src="images/room/wei.png" alt=""><img src="images/room/wei.png" alt=""><img src="images/room/wei.png" alt=""><img src="images/room/wei.png" alt="">'
                        break; 
                        case 2:
                    html += '<img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wei.png" alt=""><img src="images/room/wei.png" alt=""><img src="images/room/wei.png" alt="">'
                        break; 
                        case 3:
                    html += '<img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wei.png" alt=""><img src="images/room/wei.png" alt="">'
                        break; 
                        case 4:
                    html += '<img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wei.png" alt="">'
                        break; 
                        case 5:
                    html += '<img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt=""><img src="images/room/wu.png" alt="">'
                        break; 
                    }
            html += '</p>\
                <p class="link w58"><a class="center" id="AbasicId" data-t="go_space" data-d="'+ basic.anchor_id +'" data-n="'+ basic.nickname +'" data-g="'+ basic.followed +'" href="javascript:void(0)">Ta的空間<span class="sp_rig_tx">く</span></a></p>\
                <p class="tex_posa">'+ basic.craft +'</p>';

        $('#txName').html(html)
        htm2 ='<li class="w33 center">\
                    <p style="margin-left: -26px;" class="p_r12">'+ basic.fens +'</p><p style="margin-left: -26px;" class="p_r11">关注</p>\
                </li>\
                <li class="w33 center">\
                    <p class="p_r12">'+ basic.fee +'币</p><p class="p_r11">通话/分钟</p>\
                </li>\
                <li class="w33 center">\
                    <p style="margin-right: -40px;" class="p_r12">'+ (basic.connect_rate == '0'? '100' : basic.connect_rate) +'%</p><p style="margin-right: -40px;" class="p_r11">接通率</p>\
                </li>';
        $('#ul_leix').html(htm2)
        htm3 ='<img src="'+ (basic.type == '1VN' ? 'images/room/rz.png' : (basic.type == '1V1' ?'images/room/rz2.png' : 'images/room/r3.png')) +'" alt="">';
        $('#img_leix').html(htm3)
        var times = basic.slot.replace(',','~')
        // basic.region
        var regi = basic.region.split(',')
            if (regi.length == '2') {
                var chengshi = regi[1]
            }else{
                var chengshi = basic.region
            }
            // console.log(basic.birthday.replace(/\-/g,','))
            var yue = basic.birthday.substring(6,7)
            var day = basic.birthday.substring(9,10)
            getAstro(yue,day)
        htm4 ='<li class="w48"><span class="col9B">在线时段:</span>'+ times +'</li>\
                <li class="w48"><span class="col9B">当前状态:</span>'+ (basic.online == 'on' ? '在线' : '离线') +'</li>\
                <li class="w48"><span class="col9B">感情状态:</span>'+ basic.emotion +'</li>\
                <li class="w48"><span class="col9B">兴趣爱好:</span>'+ basic.hobby +'</li>\
                <li class="w48"><span class="col9B">城市:</span>'+ chengshi +'</li>\
                <li class="w48"><span class="col9B">星座:</span>'+arrxing+'座</li>';
        $('#ul_grzl').html(htm4)
        var htm5 = ''
        console.log(gifts)
        if(gifts.length == '0'){
            $('#aft_sold').hide()
        }else if (gifts.length >= '6') {
            $('#aft_sold').show()
            for (var i = 0; i < 6; i++) {
                htm5 += '<li class="li_lw"><img src="'+ gifts[i].image +'" alt=""></li>'
            }
        }else{
            $('#aft_sold').show()
            for (var i = 0; i < gifts.length; i++) {
                htm5 += '<li class="li_lw"><img src="'+ gifts[i].image +'" alt=""></li>'
            }
        }
        if (basic.type == '1VN') {
            $('#sp_Tasp').html('去Ta直播間')
            // $('#sp_Tasp').html('去Ta直播間').removeClass('LVLsp')
            $('#Atypsp').attr('data-l','1VN').addClass('LVLsp').find('img').attr('src','images/room/lix.png')
            $('.div_yhpj').hide()
        }else{
            $('.div_yhpj').show()
            $('#Atypsp').attr('data-l','1V1').addClass('LVLsp').find('img').attr('src','images/room/lix.png')
            $('#sp_Tasp').html('跟Ta視頻')
        }
        $('#giftNum').html('('+ gifts.length +')')
        $('#ul_lwg').html(htm5)
        for (var i = 0; i < evalu.length; i++) { 
            var str = evalu[i].label;
            var a = str.split(',');
            forte += '<li class="li_yhpj">\
                        <p class="link p_name"><img style="background:url(images/room/log.png);background-size:100% 100%;" onerror="javascript:this.src='+"\'images/room/log.png\'"+'" class="img_tx" src="'+ evalu[i].avatar_url +'" alt="">'+ evalu[i].nickname +'</p>\
                        <p class="link p_list">'
            for (var j = 0; j < a.length; j++) {
                forte +='<span class="sText">'+a[j]+'</span>'
            }
            forte += '</p></li>'
        }
        $('#ul_uspj').html(forte)
        $('#liMyIm').attr({'data-d':basic.anchor_no,'data-n':basic.nickname,'data-g':basic.avatar_url,'data-I':basic.anchor_id,'data-l':basic.type})
    }
    AvdetailsObj.givinghtml = function(res){
        var html = ''
        var tex = res.gift
        for (var i = 0; i < tex.length; i++) {
            html += '<li data-t="Aslw" data-d="'+ tex[i].id +'" data-n="'+ tex[i].title +'" data-g="'+ tex[i].image +'" class="gift_fixed center ">\
                        <img style="width:36px;height:36px;border-radius:0;" src="'+ tex[i].image +'" alt="">\
                        <p class="gi_text">'+ tex[i].title+'</p>\
                        <p class="gi_mone">'+ tex[i].gold +'金币</p>\
                    </li>'
        }
        $('#givingUl').html(html)
        $('#hz_money').html("金币："+ res.current_gold)
    }
    function getAstro(month,day){
        var s="魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯";
        var arr=[20,19,21,21,21,22,23,23,23,23,22,22];
        return arrxing =  s.substr(month*2-(day<arr[month-1]?2:0),2);
    }
    AvdetailsObj.AslwObj = function(obj){
        obj.addClass('after').siblings().removeClass('after')
        // obj. sub_gift
        // 
    }
    AvdetailsObj.goyhyx = function(obj){
        AyhxyObj.goBack = function(){
            AyhxyObj.destroy();
            AvdetailsObj.show();
            // Global.fixd()
        }
        AyhxyObj.show(true,function(){
        });
    }
    AvdetailsObj.goImus = function(obj){
        imLogin(obj)
        /*// imLogin()
        // var thisD = obj.attr('data-d')
        chatdetailObj.goBack = function(){
            // imLogout()
            chatdetailObj.destroy();
            AvdetailsObj.show();
            // Global.fixd()
        }
        chatdetailObj.show(true,function(){
            chatdetailObj.AgoraRTMObj(thisD,thisN,thisG,thisI,thisL)
            // AvdetailsObj.goewm(invitationCode) client
        });*/
    }
    AvdetailsObj.gogift = function(obj){
       giftObj.goBack = function(){
            giftObj.destroy();
            AvdetailsObj.show();
            // Global.fixd() ueiD
        }
        giftObj.show(true,function(){
            giftObj.bannerObj(ueiD)
        });
    }
    AvdetailsObj.onloadExecution = function(){
    	AvdetailsObj.createDomObj()
        AvdetailsObj.createEvent()
        AvdetailsObj.bannerObj()
        AvdetailsObj.createBannerHeight()
    }
    AvdetailsObj.init = function(){
	 	AvdetailsObj.onloadExecution()
    }