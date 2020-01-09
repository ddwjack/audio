var Global = {

    cache: {},

    // lotteryTypeCn: { 'dlt': '大乐透', 'pl3': '排列三', 'pl5': '排列五', 'qxc': '七星彩', 'ftbrqspf': '竞彩足球胜平负', 'ftspf': '竞彩足球胜平负', 'ftfh': '竞足混投', 'spf14': '胜负彩', 'spf9': '任选9', 'tjsyy': '11选5', 'gd11x5': '广东11选5', 'gx11x5': '广西11选5','jx11x5': '江西11选5','hub11x5': '湖北11选5', 'sd11x5': '山东11选5', 'hn4j1': '海南4+1' },
    //全局页面回收，重置页面变量，删除页面内容 ConfigObj.share  Global.getDataPrefCache
    GC: function(arr) {
        var extArr = ['home','login','kaijiangIndex','dynamic','football']; //保留页面，目前只是首页与登录页()  ,'football' 丰 kaijiangIndex 与ios 聊天冲突
        // var extArr = ['home','login','kaijiangIndex','dynamic','dyShare']; //保留页面，目前只是首页与登录页()  ,'football' 丰
        if (arr && arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if ($.inArray(arr[i], extArr) == -1) {
                    extArr.push(arr[i]);
                }
            }
        }
        //socialAuthCallBack
        var pages = $(document.body).children('div.page');
        var tempArr = [];
        for (var i = 0; i < pages.length; i++) {
            var itm = pages[i];
            if (itm.getAttribute('id')) {
                var pageId = itm.getAttribute('id');
                if ($.inArray(pageId, extArr) == -1) {
                    if (window[pageId + 'Obj']) {
                        if ($('#' + pageId).length > 0 && window[pageId + 'Obj'].destroy) {
                            window[pageId + 'Obj'].destroy();
                            tempArr.push(pageId);
                        }
                    }
                }
            }
        }
//      //console.log('Global.GC销毁页面', tempArr); overlayerOk
    },

    //获取当前显示的一级页面[class=page]
    getActivePage: function() {
        if (ConfigObj.platForm === 'android') {
            client = 'android'
        }else if(ConfigObj.platForm === 'ios'){
            client = 'ios'
        }else{
            client = 'android'
        }
        var pages = $(document.body).children('.page');
        // console.log(pages)
        var arr = [];
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].style.display != 'none') {
                arr.push(pages[i]);
                // $('#onLin').css('display','none');
                //return pages[i];	
            }
        }
        return arr;
    },
    playVideo:function(typ,cla,ig){  //跳转到观看视频
        gifJson()
        Global.channelId(2,typ,cla,ig)
        // console.log(typ)
        // console.log(cla)
        // console.log(ig)
        /*if (ConfigObj.platForm === 'android') {
            android_obj.playVideo(typ,cla,ig)
        }else if (ConfigObj.platForm === 'ios'){
            ios_obj.playVideo(typ,cla,ig)
        }*/
    },
    /*新增配置应用名   sendCallMsg 加密*/
    apkName:function(obj){
        var html2 = '(协议版本V2.3.6)'
        apkNam = ''
        $('#video_js').html(html2)   
        // plusObj(50)  
        // lessObj(10)
        // Global.usNoceshi() //測試接口的
        // Global.channelId()  ConfigObj.showWhere 
        // Global.mobi('before','1')
        // Global.usNoetu()
        // evaluate('before','1') //评价的
        $('.im_log_no').unbind('tap').tap(function(){
            gifNone()
        })
        /*$('.div_scrollTop').unbind('tap').tap(function(){
            var currentY = document.documentElement.scrollTop || document.body.scrollTop
            scrollAnimation(currentY, 0)
        })*/
    },

    /*获取评价信息*/
    mobi:function(typ,id,xn,lab){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:'android',
            anchor_id:id,
            star:xn,
            label:lab,
            handle:typ
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/evaluate', 
            // url: 'http://38.27.103.12/v2/common/gift_list',  
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (res.suc) {
                    $.alertMsg(res.suc) 
                    $('#div_pj').hide(500)
                    // feedbackObj.gohtmltex(res.info)
                }else{
                    res.info = $.parseJSON(Global.crypt(res.result));
                    var payT = res.info.label
                    Global.texObj(payT,id)
                }
            },error:function(res){
                $.alertMsg('網絡異常，請稍後重試')
                $('#onLin').css('display','block')
                if (typ == 'before') {
                    setTimeout(function(){
                        Global.mobi(handles,usidsis)
                    },2000)
                }else{

                }
            }
        })
    },
    gotoMoney:function(){
        $('.Agoquxiao').unbind('tap').tap(function(){
            $('.moneyAlert').hide()
        }) 
        // 關閉去充值
        $('.gotochongz').unbind('tap').tap(function(){
            $('.goMoneyHide').hide()
        })
        //  去充值
        $('.Agochongz').unbind('tap').tap(function(){
            $('.goMoneyHide').hide()
            myfreeObj.goBack = function(){
                myfreeObj.destroy();
                mypageObj.show(true);
                Global.fixd()
            }
            myfreeObj.show(true,function(){
                // myfreeObj.goewm(ConfigObj.pNum,ConfigObj.pwat)
            });
        })

        // 关闭去注册 
        $('.gotozhuc').unbind('tap').tap(function(){
            $('.goZhuceHide').hide()
        })
        //  去注册
        $('.Agozhuce').unbind('tap').tap(function(){
            $('.goZhuceHide').hide()
            xgwordObj.goBack = function(){
                xgwordObj.destroy();
                mypageObj.show(true);
                Global.fixd()
            }
            xgwordObj.show(true);
        })
        $('.Agomoney').unbind('tap').tap(function(){
            $('.moneyAlert').hide()
            var thisL = $(this).attr('data-l')
            console.log(thisL)
            if (thisL == 'footballObj') {
                moneyObj.goBack = function(){
                    moneyObj.destroy();
                    footballObj.show();
                    Global.fixd()
                }
            }else{
                moneyObj.goBack = function(){
                    moneyObj.destroy();
                    AvdetailsObj.show();
                }
            }
            moneyObj.show(true,function(){
                moneyObj.mobileObj(ConfigObj.iphon)
            }); 
        })
    },
    texObj:function(payT,id){
        var html = ''
        for (var i in payT) {
            html += '<li data-v="'+ payT[i] +'" class="lflex"><span class="spatex">'+ payT[i] +'</span></li>'
        }
        $('#ullabel').html(html)
        var lickObj = $('#ullabel').find('li')
        var numAid = ''
        $(lickObj).unbind('tap').tap(function(){
            $(this).toggleClass('activpj')
            var arry = []
            var thing = $('li.activpj')
            if (thing.length <= '3') {
                for (var i = 0; i < thing.length; i++) {
                    var title = $(thing[i]).attr('data-v')
                    arry[i] = title
                }
                numAid = arry.join(',')
            }else{
                $.alertMsg('只能选择三个')
                $(this).removeClass('activpj')
                return false;
            }
        })
        $('#pjsub').unbind('tap').tap(function(){
            console.log($('#ullabel').find('li.activpj'))
            var xin = $("#mydiv1").find('li.xing').length
            if ( xin== '0') {
                $.alertMsg('请选择评价级别');
                return false;
            }
            if ($('#ullabel').find('li.activpj').length == '0') {
                $.alertMsg('请选择标签');
                return false;
            }
            Global.mobi('after',id,xin,numAid)
            // evaluate('after',id,xin,numAid)
            // Global.mobi('after',id,numAid)
            // Global.mobi('before')
        })
    },
    usNoceshi:function(){ //調試接口的
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            user_id:ConfigObj.meId,
            client:client,
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite+'/Video/video_comment',
            url: ConfigObj.localSite+'/api/share',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    },
    shareObj:function(){ //調試接口的
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            version:ConfigObj.version,
            user_id:ConfigObj.meId,
            client:client,
            mobile:'user'
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite+'/Video/video_comment',
            url: ConfigObj.localSite+'/api/share',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    ConfigObj.yshare_url = res.info.url //分享地址 
                    ConfigObj.yshare = res.info.title //分享文字
                    ConfigObj.dowand = res.info.download
                    ConfigObj.userNum = res.info.users
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    },
    usNoetu:function(arr){ //修改個人資料的
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            param:arr,
            // handle:'after'
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/user/profile',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (!res.err) {
                    $.alertMsg(res.suc)
                    AccountObj.loadAjaxObj()
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    // feedbackObj.gohtmltex(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    },
    goanchors:function(id,ha,lx,thisF,name){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:id,
            role:'user',
            anchor_no:ha,
            mold:lx,
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
                gifNone()
                if (res.err == undefined) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    if (ConfigObj.platForm == 'android') {
                        // if (lx == '1VN') {
                            android_obj.doLive("2",ha, ConfigObj.meId, id, ConfigObj.usName, thisF,res.result,ConfigObj.pic)
                        /*}else{
                            android_obj.doOneLive(ha,id,res.result)
                        }  */ 
                    }else{
                        // if (lx == '1VN') {
                            ios_obj.doLive("2", ha, ConfigObj.meId, id, ConfigObj.usName, thisF,res.result,ConfigObj.pic)
                        /*}else{
                            ios_obj.doOneLive(ha,id,res.result)
                        }*/
                    }
                }else{
                    console.log(280)
                    AvdetailsObj.goBack = function(){
                        AvdetailsObj.destroy();
                        name.show();
                        Global.fixd()
                    }
                    AvdetailsObj.show(true,function(){
                        AvdetailsObj.detaObj(id,ha)
                    });
                   // $.alertMsg(res.err) 
                }
            },
            error:function (err) {
                gifNone()
                $.alertMsg('網絡異常，請稍後重試') 
            }
        })
    },
    bookImgObj:function (ig,id) {
        if (ConfigObj.iphon == '') {$('.goZhuceHide').show();return false;}
        gifJson()
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(ig)
            android_obj.playMusic(id)
            gifNone()
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(ig)
            ios_obj.playMusic(id)
            gifNone()
        }else{
            console.log(ig)
            gifNone()
        }
    },
    /*根据渠道id获取id号 加密*/
    channelId:function(tp,typ,cla,ig){
        //  typ,cla,ig 观看视频用
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            imei:ConfigObj.Iemid,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/User/user_info_no',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res.time)
                if (res.err == undefined) {
                    // alert(JSON.stringify(res))  expiry
                    // plusObj(1)  
                    res.info = $.parseJSON(Global.crypt(res.result));
                    Moneys = ''
                    console.log(res.info) 
                    ConfigObj.power = res.info.power
                    ConfigObj.pNum = res.info.surplus_num  // 可用觀看次數
                    ConfigObj.pwat = res.info.more_watch  // 總觀看次數
                    ConfigObj.iphon = res.info.mobile // 手機號 vip
                    ConfigObj.Avip = res.info.vip
                    ConfigObj.auth_mobile = res.info.auth_mobile
                    ConfigObj.be_invited = res.info.be_invited // 是否绑定邀请码
                    if (ConfigObj.auth_mobile == '0') { // 校驗手機號不需要密碼
                        $('#ul_molid').show().siblings().hide()
                    }else{
                        $('#ul_molid').hide().siblings().show()
                    }
                    /*if (ConfigObj.power == '1' || ConfigObj.Avip != '0') {
                        $('#home_cishu').html('無限次數')
                    }else{
                        $('#home_cishu').html(ConfigObj.pwat+'次')
                    }*/
                    if (tp == '2') { // 增加VIP功能
                        // $('#home_cishu').html(ConfigObj.pwat+'次')
                        // palyVideoObj(typ,cla,ig)
                        if (ConfigObj.iphon == '') {
                            $('.goZhuceHide').show()
                            // $('#home_cishu').html(ConfigObj.pwat+'次')
                        }else{
                            if (ConfigObj.power == '1' || ConfigObj.Avip != '0') {
                                palyVideoObj(typ,cla,ig)
                            }else{
                                if (ConfigObj.pNum == '0') {
                                    $('.goMoneyHide').show()
                                    // $('#home_cishu').html('0'+'次')
                                }else{
                                    // $('#home_cishu').html(ConfigObj.pwat+'次')
                                    palyVideoObj(typ,cla,ig)
                                }
                            }
                        }
                    }
                    gifNone()
                    ConfigObj.usName = res.info.nickname
                    ConfigObj.pic = res.info.avatar_url
                    ConfigObj.expiry = res.info.expiry
                    //monType = ''
                    invitationCode = res.info.invitation_code
                    // moreWatch = res.info.more_watch  加密
                    // ConfigObj.ewm = res.info
                    // localStorage.setItem("mobile", res.info.mobile)
                    // ConfigObj.appDLUrl = res.info.share
                    Global.shareObj()  // 分享的
                    wetherLoginObj() // 改 1000 和1001狀態為0
                    userTouNam() //传头像和名字
                    loginObj.isLogin = true;
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  overlayerOk

            }
        })
    },
    /* ------------------------------------ 多级路由相关 ---------------------------------- */

    getAddGoBackNum: function(controllerobj) {
        for (var i = 1; i <= 10000; i++) {
            if (controllerobj['goBack' + i] == undefined || controllerobj['goBack' + i] == null) {
                break;
            }
        }
        return i; //返回结果为当前可以添加的多级goBack函数序号
    },

    getDelGoBackNum: function(controllerobj) {
        for (var i = 10000; i >= 1; i--) {
            if (controllerobj['goBack' + i] == undefined || controllerobj['goBack' + i] == null) {

            } else {
                break;
            }
        }
        return i; //如果返回为0，则当前没有设置过多级goBack函数
    },

    clearAllGoBackNum: function(controllerobj) {
        for (var i = 1; i <= 10000; i++) {
            controllerobj['goBack' + i] = null;
        }
    },

    /* ------------------------------------ 多级路由相关 END ---------------------------------- */

    //判断token是否有效 [免登陆功能]  user_info_no
    checkToken: function(func) {
        // console.log(func) 
     /*   var usId = localStorage.getItem("numId")
        if (usId == null) { 
            localStorage.setItem("numId", '3');
            var nam_Img = android_obj.getUserID();
            localStorage.setItem("numId", '1');
            var usId = localStorage.getItem("numId")

            // loginObj.isLogin = false;
        }else{
            loginObj.isLogin = true;
        }*/
        /*console.log(loginObj.userInfo)
        var token = localStorage[ConfigObj.appName + 'access_token'];
        console.log(ConfigObj.appName + 'access_token')
        if (token && token != "") {
         console.log('[App checkToken]token已存');
            loginObj.access_token = token;
            loginObj.getUserInfo();
            loginObj.goForward = function() {
                loginObj.tokenWin(token);
                if (func) {
                    func();
                }
            };
        } else {
            console.log(231)
            if (func) func();
        }*/
    }, 
	
    checkUpdate: function(isTip) {
        if (ConfigObj.platForm === 'android') {
            // var client = 'android'
             client = 'android'
        }else if(ConfigObj.platForm === 'ios'){
             client = 'ios'
        }else{
             client = 'ios'
            // var client = 'ios'
        }
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/AppInfo/app_info',
            // http://38.27.103.12/v2/AppInfo/app_info
            data: secretData,
            type: "post",
            dataType: "json",
            async:false,
            beforeSend:function(){
            },
            success: function(msg) {
                // homeObj.show();
                // console.log(msg)
                if (!msg.err) {
                    msg.info = $.parseJSON(Global.crypt(msg.result));
                    console.log(msg.info)
                    var arrp = msg.info.service_mb.split(",")
                    var List = msg.info.desc.split(";")
                    ConfigObj.tel = arrp[0]
                    ConfigObj.qq = msg.info.service_qq
                    ConfigObj.wx = arrp[1]
                    ConfigObj.pot = arrp[2]
                    // console.log(msg.info.version)
                    // ConfigObj.share = msg.info.share
                    // ConfigObj.appDLUrl = msg.info.spread_url
                    // ConfigObj.share = 'Y'
                    var overlayerStr = '';		
                    // homeObj.creaAlert()
                    /*overlayerStr += '<div class="overlayer" id="getVersionLayer" data-t="hideLog">'+
									'<div class="bottomcon" data-t="nohide">'+
										'<div class="playtip">'+
											'<h3>升级版本</h3>'+
											'<p class="font14 center">点击确认升级到最新版本</p>'+
										'</div>'+
										'<p class="btn_simple">'+
											'<a href="javascript:void(0);" id="overlayerCancel" class="w50"><span class="first">取消</span></a><a href="javascript:void(0);" id="overlayerOk" class="w50"><span>确定</span></a>'+
										'</p>'+
									'</div>'+
								'</div>'*/
                    overlayerStr += '<div class="overlayer" id="getVersionLayer" data-t="hideLog">\
                                        <div class="bottomcons" data-t="nohide">\
                                        <img id="overlayerCancel" class="gx_none" src="images/my/guanbi.png" alt="" />\
                                        <img class="img_gx" src="images/home/gx.png" alt="" />\
                                        <div class="gx_text">\
                                            <h2>版本升级</h2>'
                                for (var i = 0; i < List.length; i++) {
                                    overlayerStr += '<p class="p_lef">'+ List[i] +'</p>'
                                }
                    overlayerStr += '<a href="javascript:void(0)" id="overlayerOk">立即更新</a>\
                                        </div>\
                                    </div>\
                                </div>'
                    // if (ConfigObj.version > msg.info.pla_version) {
                    if (msg.info.version > ConfigObj.version) {
                        // $('#home_regnewBonus').hide()
                    	$("body").append(overlayerStr)
                    	setTimeout(function(){
                    		//关闭的方法
                            // console.log(msg.info.force)
                            if (msg.info.force == 'Y') {
                                $('#overlayerCancel').hide()
                            }else{
                                $("#getVersionLayer,#overlayerCancel").unbind("tap").bind("tap",function(){
                                    homeObj.onloadExecution();
                                    homeObj.setDefConfig();
                                    $(".overlayer").remove()
                                })
                            }
                    		//跳转的方法
	                    	$("#overlayerOk").unbind("tap").bind("tap",function(){
	                    		Global.getNewPackage(msg.info.pla_version, msg.info.down_url);
	                    		$(".overlayer").remove()
                                homeObj.onloadExecution();
                                homeObj.setDefConfig();
	                    	})
	                    	//阻止冒泡，删除后点击弹窗的任何地方都会关闭！！
                    		$("#getVersionLayer .bottomcon").unbind("tap").bind("tap",function(){
                    			return false;
                    		})
                    	},200)
                    } else {
                        if (isTip) {
                            $.alertMsg('已经是最新版本');
                            // Global.fixd()
                            // $('#home_regnewBonus').hide()
                        }else{
                            setTimeout(function () {
                                homeObj.onloadExecution();
                                homeObj.setDefConfig();
                            },800); 
                        }
                    }
                } else {
                    $.alertMsg(msg.err);
                    setTimeout(function(){
                        $.alertMsg(ConfigObj.version);
                    },2000)
                }
                // $('#onLin').css('display','none') 
            },
            error:function(ms){
                $.alertMsg('網絡異常，請稍後重試')
                $('#onLin').css('display','block')
                setTimeout(function(){
                    Global.checkUpdate(isTip)
                },5000)
            }
        });
    },

    /**
     * 获取最新包
     * @param newVersion 版本号 checkUpdate
     * @param url 应用地址   
     */
    getNewPackage: function (newVersion, url) {
        if (!url) return;
        if (typeof android_obj != 'undefined') android_obj.downLoadApk(newVersion, url);
        else if (typeof ios_obj != 'undefined') ios_obj.callbrowser(url);
        else Global.openUrl(url);
    },

    /*底部导航条*/
    fixd:function(){ //initNav
        $('#home_navObj').css('display','block')
        $('.ul_jiu li.me_ul').removeClass('activ')
        $('.sec_fica,.sec_foot').find('i.opactiy').css('display','none')
        // $('.chan_opac').hide()
        // $('#hom_sow,#ul_zxp').find('i.new_opac').css('display','none')
    },

    

    /**
     * 打开页面，自动区分内链和外链
     * @param url
     * @param show 打开操作，重写以替换默认操作
     * @param back 返回操作，重写以替换默认操作
     */
    open: function (url, show, back) {//cashier.excep.immediate_match
        url = (!url || url === null) ? window.location.href : url;
            var platFormNo = 1;
            if (ConfigObj.platForm === 'ios') {
                platFormNo = 3
            } else if(ConfigObj.platForm === 'android'){
                platFormNo = 2
            }else(
                platFormNo = 1
            );
            var postData = {
                'channel_number': ConfigObj.zdid,
                'terminal_id': platFormNo,
            };
            var secretData = {
                'para' : Global.encrypt(postData)
            };
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
            var ret = parseSimpleUrl(url);
            // base64 编码后传递过来的 JSON 串，用于特殊逻辑
            if (ret.args._base64obj) {
                try {
                    ret.args = unserialize(ret.args._base64obj);

                } catch (e) {
                    ret.args.pageName = 'home';
                }
            }
            if (ret.args && ret.args.pageName) {
                Global.GC();
                Global.checkToken();
                // APP 内部链接处理
                var page = ret.args.pageName;
                if (window[page + 'Obj']) {
                    var pageObj = window[page + 'Obj'];
    
                    delete ret.args.pageName;
                    (back && typeof back === 'function') ? pageObj.goBack = function () {
                        back(pageObj);
                    } : pageObj.goBack = function () {
                        pageObj.destroy();
                        homeObj.show();
                        Global.fixd()
                    };
    
                    show = (show && typeof show === 'function') ? function () {
                        show(pageObj);
                    } : function () {
                        pageObj.dirShow(ret.args); // 显示 app 页面，需要页面配置 dirShow
                    };
                    show();
                } else {
                    // 对应的页面没有 JS 控制器
                    homeObj.show();
                    Global.fixd()
                }
            } else if (ret.path && (ret.path.indexOf('127.0.0.1') !== -1 || ret.path.indexOf('http://') === -1 || ret.path.indexOf('https://') === -1)) {
                        if (ConfigObj.showWhere) {
                            homeObj.show();
                            Global.fixd()
                        } else{
                            GifImg()
                            console.log(ConfigObj.meId)
                            if (ConfigObj.platForm == 'android') {
                                if (android_obj.wetherLogin() == '0') {
                                    Global.checkUpdate();  //检查版本更新 channelId
                                    Global.channelId()
                                    Global.fixd()
                                    homeObj.show();
                                }else if(android_obj.wetherLogin() == '1000'){
                                    loginObj.show()
                                    gifNone()
                                    return false;
                                }else if(android_obj.wetherLogin() == '1001'){
                                    registeredObj.show()  
                                    gifNone()
                                    return false;
                                }
                            }else if(ConfigObj.platForm == 'ios'){
                                if (ios_obj.wetherLogin() == '0') {
                                    Global.checkUpdate();  //检查版本更新
                                    Global.channelId()
                                    Global.fixd()
                                    homeObj.show();
                                }else if(ios_obj.wetherLogin() == '1000'){
                                    loginObj.show()
                                    gifNone()
                                    return false;
                                }else if(ios_obj.wetherLogin() == '1001'){
                                    registeredObj.show()  //registered
                                    gifNone()
                                    return false;
                                }
                            }else{
                                // registeredObj.show()
                                // ConfigObj.iphon = '15888888889' 
                                // loginObj.show() 
                                Global.checkUpdate();  //检查版本更新
                                Global.channelId()
                                Global.fixd()
                                homeObj.show();
                            }
                        };
            } else if (ret.path.indexOf('http://') === 1 || ret.path.indexOf('https://') === 1) Global.openUrl(url);
    },
	openUrl: function(_url) {
        // console.log(_url)
        if (ConfigObj.isPcWeb) {
            window.open(_url, '_blank');
        } else {
            if (ConfigObj.platForm == 'web') { //网页
                window.open(_url, '_blank');
            }
            if (ConfigObj.platForm == 'ios') { //苹果
                ios_obj.openUrl(_url)
                // window.open(_url, '_blank', 'location=no');
            }
            if (ConfigObj.platForm == 'android') { //安卓
                navigator.app.loadUrl(_url, { openExternal: true });
            }
        }
    },
    checkConnect: function() {
        ////console.log(navigator.network);
        ////console.log(Connection);
        ////console.log(Connection.NONE);
        if (navigator.network) {
            var networkState = navigator.network.connection.type;
            //			var states = {};
            //			states[Connection.UNKNOWN]  = 'Unknown connection';
            //			states[Connection.ETHERNET] = 'Ethernet connection';
            //			states[Connection.WIFI]     = 'WiFi connection';
            //			states[Connection.CELL_2G]  = 'Cell 2G connection';
            //			states[Connection.CELL_3G]  = 'Cell 3G connection';
            //			states[Connection.CELL_4G]  = 'Cell 4G connection';
            //			states[Connection.NONE]     = 'No network connection';
            if (networkState == Connection.NONE) {
                $.alertMsg('请检查您的网络');
            }
        }
    },

    'pageSwitch': function(pageIn, pageOut) {
    	
//      //console.log(pageIn, pageOut);
        // var navArr = ['home','numKaijiang','discover','userCenter'];
        var navArr = ['home', 'kaijiangIndex','dynamic','football','mypage'];
        // var navArr = ['home', 'kaijiangIndex', 'newsIdx', 'userCenter','hemaiIndex','searchSite','football'];
        // console.log(navArr)
        if ($.inArray(pageIn.attr('id'), navArr) != -1) {
     	// console.log(ConfigObj.showWhere)
			if(ConfigObj.showWhere){
    			$('#home_navObj').show();
			};
            var pageName = pageIn.attr('id');
            $('#home_navObj li').removeClass('on');
            $('#home_navObj a[data-t="' + pageName + '"]').parents('li').addClass('on');
            // console.log(650)
            localStorage.removeItem('Zbask');
        } else {
        // console.log(ConfigObj.showWhere)  checkRoute
            $('#home_navObj').hide();
        }

        /**
         * 干掉其他页面，每次只能显示一个页面
         */
        var clearOtherPages = function() {
            var pages = Global.getActivePage();
//          //console.log(pages);
            if (pages.length > 1) {
                for (var i = 0; i < pages.length - 1; i++) {
                    pages[i].style.display = 'none';
                }
            }
        };

        if (pageOut.length > 1) {
            $(pageOut).hide();
            $(pageIn).show();
            clearOtherPages();
        } else {
            if (pageIn.length == 1 && pageOut.length == 1 && pageIn.attr('id') == pageOut.attr('id')) {} else {
            		/* bcy
                $(pageOut).fadeOut(200, function() {
                    $(pageIn).fadeIn(400, function() {
                        clearOtherPages();
                    });
                });
                */
                 $(pageOut).fadeOut(1, function() {
                    $(pageIn).fadeIn(1, function() {
                        clearOtherPages();
                    });
                });
            }
        }

        /*setTimeout(function(){
            console.warn('pageSwitch setTimeout');
            console.log(691)
        		//防止点击过快产生的动画异常效果
        		var pages = Global.getActivePage();
        		////console.log(pages);
        		if(pages.length > 0){
        			for(var i=0;i<pages.length;i++){
        				$(pages[i]).css({'transform':''})
        			}
        		}else{
        			Global.GC();
        			homeObj.show();
        		}
        },1700)*/
    },

    //页面slide切换
    'pageSlide': function(pageIn, pageOut) {
        var id_out = pageOut.attr('id');
        var id_in = pageIn.attr('id');
        var outObj = window[id_out + 'Obj'];
        var inObj = window[id_in + 'Obj'];
        var back = false;
        if (outObj.fromPage == id_in) {
            back = true;
        }
        if (back) {
            pageIn.css({ 'display': 'block', '-webkit-transform': 'translate3d(-100%,0,0)' });
        } else {
            pageIn.css({ 'display': 'block', '-webkit-transform': 'translate3d(100%,0,0)' });
        }

        setTimeout(function() {
            if (back) {
                pageOut.css({ '-webkit-transform': 'translate3d(100%,0,0)', '-webkit-transition': '-webkit-transform 100ms ease-out 0ms' });
            } else {
                pageOut.css({ '-webkit-transform': 'translate3d(-100%,0,0)', '-webkit-transition': '-webkit-transform 100ms ease-out 0ms' });
            }
            pageIn.css({ '-webkit-transform': 'translate3d(0,0,0)', '-webkit-transition': '-webkit-transform 200ms ease-out 0ms' });
        }, 20);

        //滑动发生后重置样式
        setTimeout(function() {
            pageIn.css({ '-webkit-transform': '', '-webkit': '' });
            pageOut.css({ 'display': 'none', '-webkit-transform': '', '-webkit-transition': '' });
        }, 300);

    },

    'initNav': function() {
        $('#home_navObj').unbind('tap').tap(function(e) {
            var aObj = $.oto_checkEvent(e, "A");
            if (aObj) {
                var thisObj = $(aObj);
                var thisT = thisObj.attr("data-t");
                // alert(thisT)
                switch (thisT) {
                    /*case "userCenter":
                        Global.goUserCenter(thisObj.parents('li'));
                        return true;*/
                    case "mypage":
                        Global.mypage(thisObj.parents('li'));
                        return true;
                    case "kaijiangIndex":
                        Global.kaijiangIndex(thisObj.parents('li'));
                        return true;
                    case "football":
                        Global.goFind(thisObj.parents('li'));
                        return true;
                    case "dynamic":
                        Global.godynamic(thisObj.parents('li'));
                        return true;
                    case "home":
                        Global.goHome(thisObj.parents('li'));
                        return true;
                }
                return false;
            }
            // Global.navEvent(e);
        });
    },

    // 'navEvent': function(e) {
    //     var aObj = $.oto_checkEvent(e, "A");
    //     if (aObj) {
    //         var thisObj = $(aObj);
    //         var thisT = thisObj.attr("data-t");
    //         // alert(thisT)
    //         switch (thisT) {
    //             case "userCenter":
    //                 this.goUserCenter(thisObj.parents('li'));
    //                 return true;
    //             case "kaijiangIndex":
    //                 this.kaijiangIndex(thisObj.parents('li'));
    //                 return true;
    //             case "hemaiIndex":
    //                 this.goHemai(thisObj.parents('li'));
    //                 return true;
    //             case "newsIdx":
    //                 this.goDiscover(thisObj.parents('li'));
    //                 return true;
    //             /*case "searchSite":
    //                 this.goFind(thisObj.parents('li'));
    //                 return true;*/
    //             case "football":
    //                 this.goFind(thisObj.parents('li'));
    //                 return true;
    //             case "home":
    //                 this.goHome(thisObj.parents('li'));
    //                 return true;
    //         }
    //         return false; Global.fixd()
    //     }
    // },

    'vidPause':function(){
        // footballObj.destroy();
        /*clearInterval(footballObj.ti_times)
        if (document.getElementById('sec_fa') == null) {

        }else{
            var testLi=document.getElementById('sec_fa').getElementsByTagName('video');
            for(var i=0;i<testLi.length;i++) {
                 testLi[i].pause()
            }
        }*/
    },
    'goHome': function(obj) {
        window.scrollTo(0,0) 
        if (obj.hasClass('on')) return;
        Global.GC();
        // Global.vidPause()
        // clearInterval(footballObj.ti_times)
        homeObj.show();
        Global.fixd()
    },
    'goFind': function(obj) {
        window.scrollTo(0,0)
            if (obj.hasClass('on')) return;
            footballObj.goBack = function(){
                footballObj.destroy();
                homeObj.show();
                Global.fixd()
            }
            footballObj.show();
            kaijiangIndexObj.destroy();
            mypageObj.destroy();
        },
    'godynamic': function(obj) {
        window.scrollTo(0,0)
            if (obj.hasClass('on')) return;
            dynamicObj.goBack = function(){
                dynamicObj.destroy();
                homeObj.show();
                Global.fixd()
            }
            dynamicObj.show();
            footballObj.destroy();
            kaijiangIndexObj.destroy();
            mypageObj.destroy();
        },
    'goUserCenter': function(obj) {
        window.scrollTo(0,0)
        if (obj.hasClass('on')) return;
        // if (obj.hasClass('selected')) return; 
        userCenterObj.goBack = function() {
            userCenterObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        userCenterObj.show();
    },
    'mypage': function(obj) {
        window.scrollTo(0,0)
        if (obj.hasClass('on')) return;
        // if (obj.hasClass('selected')) return; 
        mypageObj.goBack = function() {
            mypageObj.destroy();
            homeObj.show();
            Global.fixd()
        }
        // footballObj.destroy();
        // kaijiangIndexObj.destroy();
        Global.fixd();
        mypageObj.show();
        dyShareObj.destroy();
    },

    'kaijiangIndex': function(obj) {
        window.scrollTo(0,0)
        if (obj.hasClass('on')) return;
        // 显示开奖一级页面  
        kaijiangIndexObj.goBack = function() {
            kaijiangIndexObj.destroy();
            homeObj.show();
            Global.fixd()
        };
        // Global.vidPause()
        // clearInterval(footballObj.ti_times)
        kaijiangIndexObj.show();
        // footballObj.destroy();
        mypageObj.destroy();
        // dyShareObj.destroy();
    },

//  'checkBack': function() { checkUpdate
//      //if($('#home').length == 0)return;
//      var pageId = Global.getActivePage()[0].id;
//      switch (pageId){
//          case 'home':
//				clickCount++;
//				currentTime = new Date();
//				if (clickCount == 1) {
//					firstTime=currentTime.getSeconds()+currentTime.getMinutes()*60+currentTime.getHours()*3600;
//				} else if(clickCount == 2){
//					secondTime=currentTime.getSeconds()+currentTime.getMinutes()*60+currentTime.getHours()*3600;
//					if(secondTime-firstTime<2){  
//						navigator.app.exitApp();
//		            }else {  
//		                clickCount=0;  
//		            }; 
//				};
//              break;
//          default:
//              if (window[pageId + 'Obj']) {
//                  window[pageId + 'Obj'].goBack();
//              } else {
//                  homeObj.show();
//              }
//              break;
//      }
//  },

    'backLottery': function(type) {
        var nameObj = {
            '超级大乐透': 'dlt',
            '排列三': 'pl3',
            '排列五': 'pl5',
            '七星彩': 'qxc',
            '11选5': 'tjsyy',
            '海南4+1': 'hn4j1',
            '竞足混投': 'soccerMix',
            '竞足-2选1': 'soccer2x1',
            '任选九': 'soccerR9',
            '胜负彩': 'soccerToto',
            '11选5': 'fastBet',
            '广东11选5': 'fastBet',
            '竞篮混投': 'basketMix'
        }
        if (ConfigObj.from == 'ios') {
            ConfigObj.from = '';
            var pageName = nameObj[type] ? nameObj[type] : 'home';
            location.href = ConfigObj.iosAppSite + '?pageName=' + pageName; //跳回到iosApp 
        } else {
            Global.GC();
            var pageName = nameObj[type] ? nameObj[type] : 'home';
            if (type == '竞足混投' || type == '竞足-2选1' || type == '任选九' || type == '胜负彩') {
                window[pageName + 'Obj'].show('reload', function() {
                    window[pageName + 'Obj'].getData();
                });
            } else {
                window[pageName + 'Obj'].show('reload');
            }
        }
    },

    checkRoute: function () {
        Global.checkToken();
//      console.log(location.href) 加密
        Global.open(location.href);
    },

    checkScrollEnd: function() {
        var scrollTop = document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight;
        if (scrollTop + clientHeight > scrollHeight - 1) {
            return true;
        } else {
            return false;
        }
    },
//Global.socialShare
    socialShare: function(obj) {
   	// console.log(obj);
        var pageId = (obj && obj.domId) ? obj.domId : '';
        var message = {
            'title': obj.title ? obj.title : '千万梦想，触手可及',
            'content': obj.content ? obj.content : '彩种玩法精彩纷呈，赛事数据全面覆盖，让梦想成为可能。',
            //'url': obj.url ? obj.url : ConfigObj.touchWebSite  + 'System/DownLoad/page?sharefrom=app',
            'url': obj.url ? obj.url + (obj.url.indexOf('?') >= 0 ? '&tpid=' + ConfigObj.appName : '?tpid=' + ConfigObj.appName) : ConfigObj.appDLUrl,
            'imagePath': obj.imagePath ? obj.imagePath : ConfigObj.touchWebSite + 'Public/images/aishishareicon.jpg'
        }
            // console.log(url)

        Global.shareMessage = message;

//        console.log(message);

        /**
        if (ConfigObj.platForm == 'ios') {
            // ShareSDK.share(message,function(){loginObj.addScore('share',pageId);},null);
            ios_obj.shareContent(message.title, message.content, message.url, message.imagePath, message.pageId);
            return false;
        } else {
            message.pageId = pageId;
        }
        **/

        message.pageId = pageId;

        var parent = $('#' + obj.domId);
        var html = '<div class="share-bot socialshare" style="display:none;" id="global_shareWrap">' +
            '<ul class="share-list clearfix">' +
            '<li data-t="wx">' +
            '<p><span class="share weixin" ></span></p>' +
            '<p>微信好友</p>' +
            '</li>' +
            '<li data-t="wxq">' +
            '<p><span class="share friend"></span></p>' +
            '<p>朋友圈</p>' +
            '</li>' +
//          '<li data-t="qq">' +
//          '<p><span class="share qq"></span></p>' +
//          '<p>QQ好友</p>' +
//          '</li>' +
//          '<li data-t="qzone">' +
//          '<p><span class="share qqzone"></span></p>' +
//          '<p>QQ空间</p>' +
//          '</li>' +
            '</ul>' +
            '<p class="paybot paybot1">' +
            '<a data-t="close" href="javascript:void(0)">取消</a>' +
            '</p>' +
            '</div>';
        var shareWrap = parent.find('#global_shareWrap');
        if (shareWrap.length > 0) {
            if (shareWrap.css('display') == 'none') {
                addBgLayer();
                shareWrap.show();
            } else {
                $('#global_shareWrap').hide();
                $('#global_bgLayer').remove();
            }
        } else {
            shareWrap = $(html);
            parent.append(shareWrap);
            shareWrap.show();
            addBgLayer();
            $('#global_shareWrap').unbind('tap').tap(function(e) {
                var liObj = $.oto_checkEvent(e, "LI");
                if (liObj) {
                    var thisObj = $(liObj);
                    var thisT = thisObj.attr("data-t");
                    switch (thisT) {
                        case 'wx':
                            shareFun('wx');
                            return true;
                        case 'wxq':
                            shareFun('wxq');
                            return true;
                        case 'qq':
                            shareFun('qq');
                            return true;
                        case 'qzone':
                            shareFun('qzone');
                            return true;
                    }
                }
                var aObj = $.oto_checkEvent(e, 'A');
                if (aObj) {
                    var thisObj = $(aObj);
                    var thisT = thisObj.attr('data-t');
                    switch (thisT) {
                        case 'close':
                            $('#global_shareWrap').hide();
                            $('#global_bgLayer').remove();
                            return true;
                    }
                }
            });
        }

        function shareFun(type) {
            var obj = { 'wx': 1, 'wxq': 2, 'qq': 3, 'qzone': 4 }
            var num = obj[type];
            //if(typeOf(android_obj) != 'undefined'){

            ////console.log(message);
            //loginObj.addScore('share',pageId); 
            $('#global_shareWrap').hide();
            $('#global_bgLayer').remove();
            var message = Global.shareMessage;
            console.log(type)
            console.log(message)
            console.log(message.url)
            if (ConfigObj.platForm == 'android') android_obj.shareContent(num, message.title, message.content, message.url, message.imagePath, message.pageId);
            else if (ConfigObj.platForm == 'ios') ios_obj.shareContent(num, message.title, message.content, message.url, message.imagePath, message.pageId);
            //}  
        };

        function addBgLayer() {
            var bg = '<div style="width:100%;height:100%;background:transparent;position:absolute;left:0;top:0;z-index:90" id="global_bgLayer"></div>';
            if ($('#global_bgLayer').length == 0) {
                parent.append(bg);
                $('#global_bgLayer').css({ 'height': document.documentElement.scrollHeight || document.body.scrollHeight })
                $('#global_bgLayer').unbind('tap').tap(function() {
                    $('#global_shareWrap').hide();
                    $('#global_bgLayer').remove();
                })
            }
        }

    },
//user.activity.regSendBonus
    socialShare2: function (obj) {
        var height = document.documentElement.scrollHeight || document.body.scrollHeight;
        var html = '<div class="share-bot socialshare"><ul class="share-list clearfix"><li data-t="wx"><p><span class="share weixin" ></span></p><p>微信好友</p></li><li data-t="wxq"><p><span class="share friend"></span></p><p>朋友圈</p></li><li data-t="qq"><p><span class="share qq"></span></p><p>QQ好友</p></li><li data-t="qzone"><p><span class="share qqzone"></span></p><p>QQ空间</p></li></ul><p class="paybot paybot1"><a data-t="close">取消</a></div>' +
                   '<div data-t="close" style="width: 100%; background: transparent; position: absolute; left: 0px; top: 0px; z-index: 102; height: ' + height + 'px;"></div>';

        var sharefn = obj.sharefn || function () {};

        var elem = document.createElement('DIV');
        elem.innerHTML = html;
        document.body.appendChild(elem);

        var plaftorm = {wx: 1, wxq: 2, qq: 3, qzone: 4};

        $(elem).on('tap', function (e) {
            var liObj = $.oto_checkEvent(e, 'LI');
            if (liObj) {
                liObj = $(liObj);
                var t = liObj.attr('data-t');
                switch (t) {
                    case 'wx': sharefn(plaftorm.wx); if (elem.parentNode)  elem.parentNode.removeChild(elem); break;
                    case 'wxq': sharefn(plaftorm.wxq); if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                    case 'qq': sharefn(plaftorm.qq); if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                    case 'qzone': sharefn(plaftorm.qzone); if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                }
            }

            var aObj = $.oto_checkEvent(e, 'A');
            if (aObj) {
                aObj = $(aObj);
                var t = aObj.attr('data-t');
                switch (t) {
                    case 'close': if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                }
            }

            var divObj = $.oto_checkEvent(e, 'DIV');
            if (divObj) {
                divObj = $(divObj);
                var t = divObj.attr('data-t');
                switch (t) {
                    case 'close': if (elem.parentNode) elem.parentNode.removeChild(elem); break;
                }
            }
        });
    },

    /**
     * 优先从缓存中获取数据
     * get data preferring from sessionStorage  window.scr
     * @param url
     * @param data 请求参数
     * @param getCacheFn 从缓存中获取数据后的回调函数
     * @param diffFn 缓存数据和接口返回数据不同时的处理函数，没有设置时默认调用 getCacheFn
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     */
    getDataPrefCache: function(url, data, getCacheFn, diffFn, cacheType) {
        var ss = cacheType == 0 ? window.sessionStorage : window.localStorage;
        var sslen = 0; // 已缓存字符数

        for (var i in ss) {
            if (ss.hasOwnProperty(i))
                sslen += ss[i].length;
        }
        var item = ss.getItem(url);
        if (item) {
            if (getCacheFn && typeof getCacheFn == 'function') getCacheFn(JSON.parse(item));
        }
		// console.log(ConfigObj.localSite + url);
        $.ajax({
            url: ConfigObj.localSite + url,
            type: 'post',
            data: data,
            dataType: 'text',
            timeout: 10000,
            beforeSend:function(){
                $('#onLin').css('display','block')
            },
            success: function(data, status, xhr) {
                if (data != item) {
                    if (diffFn && typeof diffFn == 'function') diffFn(JSON.parse(data));
                    else if (getCacheFn && typeof getCacheFn == 'function') getCacheFn(JSON.parse(data));
                    // 2097152 字符，避免超出大小
                    if (sslen + data.length < 2097152) ss.setItem(url, data);
                }
                $('#onLin').css('display','none')
            },
            error: function(xhr, type) {
                $('#onLin').css('display','none')
                // $.alertMsg('網絡異常，請稍後重試。');
            }
        });
    },
    
    
     /**
     * 设置缓存
     * @param key
     * @param value
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     */
    setCache: function (key, value, cacheType) {
        var ss = cacheType === 0 ? window.sessionStorage : window.localStorage;
        var sslen = 0; // 已缓存字符数

        for (var i in ss) {
            if (ss.hasOwnProperty(i))
                sslen += ss[i].length;
        }

        if (key) {
            var v = value || {};
            v = JSON.stringify(v);

            // 2097152 字符，避免超出大小
            if (sslen + v.length < 2097152) ss.setItem(key, v);
            else console.error('out of cache size');
        }
    },

    /**
     * 获取缓存
     * @param key 缓存的 key
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     * @returns {*}
     */
    getCache: function (key, cacheType) {
        var ss = cacheType === 0 ? window.sessionStorage : window.localStorage;
        var v;
        if (key) v = JSON.parse(ss.getItem(key));
        return v;
    },   
    
    
    
    

    /**
     * 干掉缓存
     * @param key 缓存的 key
     * @param cacheType 缓存类型，0 window.sessionStorage，1 window.localStorage
     */
    delCache: function(key, cacheType) {
        var ss = cacheType === 0 ? window.sessionStorage : window.localStorage;
        if (key) ss.removeItem(key);
        else ss.clear();
    },

    /**
     * post 数据
     * @param url
     * @param data
     * @param sucFn
     * @param errFn
     * @param timeOut
     */
    post: function(url, data, sucFn, errFn, timeOut) {
     // console.log(url);
        $.ajax({
            url: ConfigObj.localSite + url,
            type: 'post',
            data: data,
            dataType: 'json',
            timeout: timeOut || 30000,
            success: function(data, status, xhr) {
//              //console.log('接口数据', data);
                if (sucFn && typeof sucFn == 'function')
                    sucFn(data);
            },
            error: function(xhr, type) {
                if (errFn && typeof errFn == 'function') errFn(xhr, type);
                else $.alertMsg('網絡異常，請稍後重試。');
            }
        });
    },
    postceshi: function(url, data, sucFn, errFn, timeOut) {
     console.log(1126);
        $.ajax({
            url: ConfigObj.localSite + url,
            type: 'post',
            data: data,
            dataType: 'json',
            timeout: timeOut || 30000,
            success: function(data, status, xhr) {
//              //console.log('接口数据', data);
                if (sucFn && typeof sucFn == 'function')
                    sucFn(data);
            },
            error: function(xhr, type) {
                if (errFn && typeof errFn == 'function') errFn(xhr, type);
                else $.alertMsg('網絡異常，請稍後重試。');
            }
        });
    },
    /**
     * 检查实名状态
     * @param {{}} obj
     * obj.yes 已实名的回调函数
     * obj.ing 审核中的回调函数，默认操作是提示实名认证正在审核中
     * obj.not 未实名的回调函数，默认操作是在底部显示认证对话框
     * obj.fail 审核失败的回调函数，默认操作和 obj.not 相同
     * obj.reload 设为 true 时将会重新获取用户信息
     * obj.realAuthBack 从实名认证页面返回时的回调函数
     * obj.from 用于指示进入实名认证页面的状态
     */
    checkRealStatus: function(obj) {
        loginObj.goForward = function() {};

        if (!loginObj.userInfo) return;

        if (!obj) obj = {};
        if (obj.reload) {
            loginObj.getUserInfo(function() {
                handle(loginObj.userInfo.real_status, obj);
            });
        } else {
            handle(loginObj.userInfo.real_status, obj);
        }

        function not() {
            if (Global.isShowRealAuthDiv) return;

            var realAuthDiv = document.createElement('DIV');

            realAuthDiv.innerHTML = '' +
                '<div class="overlayer">' +
                '<div class="bottomcon" data-t="nohide">' +
                '<div class="playtip">' +
                '<h3>提示</h3>' +
                '<p class="font14 center">请完善实名认证，才可以继续操作！</p>' +
                '</div>' +
                '<p class="btn_simple">' +
                '<a data-t="clearAuthTips" class="w50"><span class="first">取消</span></a>' +
                '<a data-t="toAuthTips" class="w50"><span>确定</span></a>' +
                '</p>' +
                '</div>' +
                '</div>';

            document.body.appendChild(realAuthDiv);

            Global.isShowRealAuthDiv = true;

            $(realAuthDiv).on('tap', function(e) {
                var aObj = $.oto_checkEvent(e, 'A');
                if (!aObj) return;
                aObj = $(aObj);
                var t = aObj.attr('data-t');
                if (t == 'clearAuthTips') {
                    realAuthDiv.parentNode.removeChild(realAuthDiv);
                    Global.isShowRealAuthDiv = false;
                }
                if (t == 'toAuthTips') {
                    realAuthDiv.parentNode.removeChild(realAuthDiv);
                    Global.isShowRealAuthDiv = false;

                    regRealNameObj.goBack = function() {
                        regRealNameObj.destroy();
                        if (obj.realAuthBack && typeof obj.realAuthBack == 'function') obj.realAuthBack();
                    };

                    regRealNameObj.show(true, function() {
                        regRealNameObj.setData({
                            'accountName': loginObj.userInfo.user_name,
                            'from': obj.from ? from : 'buy'
                        });
                    });
                }
            });
        }

        function handle(realStatus) {
            if (realStatus == 'Y') {
                if (obj.yes && typeof obj.yes == 'function') obj.yes();
            } else if (realStatus == 'Ing') {
                if (obj.ing && typeof obj.ing == 'function') obj.ing();
                else $.alertMsg('您的实名认证正在审核中');
            } else if (realStatus == 'N') {
                if (obj.not && typeof obj.not == 'function') obj.not();
                else not();
            } else if (realStatus == 'Fail') {
                if (obj.fail && typeof obj.fail == 'function') obj.fail();
                else not();
            }
        }
    },

    tips: function(obj) {
        if (Global.isShowTipsDiv) return;

        obj = obj || {};
        var tipsDiv = document.createElement('DIV');

        tipsDiv.innerHTML = '' +
            '<div class="overlayer">' +
            '<div class="bottomcon" data-t="nohide">' +
            '<div class="playtip">' +
            '<h3>提示</h3>' +
            '<p class="font14 center">' + (obj.text ? obj.text : '确认继续吗？') + '</p>' +
            '</div>' +
            '<p class="btn_simple">' +
            '<a data-t="cancel" class="w50"><span class="first">取消</span></a>' +
            '<a data-t="confirm" class="w50"><span>确定</span></a>' +
            '</p>' +
            '</div>' +
            '</div>';

        document.body.appendChild(tipsDiv);

        Global.isShowTipsDiv = true;

        $(tipsDiv).on('tap', function(e) {

            var aObj = $.oto_checkEvent(e, 'A');
            if (!aObj) return;
            aObj = $(aObj);
            var t = aObj.attr('data-t');
            if (t == 'cancel') {
                Global.isShowTipsDiv = false;
                tipsDiv.parentNode.removeChild(tipsDiv);
            }
            if (t == 'confirm') {
                Global.isShowTipsDiv = false;
                tipsDiv.parentNode.removeChild(tipsDiv);
                if (obj.confirm && typeof obj.confirm == 'function') obj.confirm();
            }
        });
    },

    /**
     * 简单加载层
     */
    simpleLoading: {
        /**
         * 显示加载层
         * @param {Object} [obj] 配置对象
         *				   obj.timeOut 自动关闭时间，默认不会自动关闭
         * @returns {Element}
         */
        open: function(obj) {
            obj = obj || {};

            var img = 'data:image/gif;base64,R0lGODlhNgA3APMAAP///zAyOJKTlkdJTzw+RN/g4XV2euPj5M/Q0WtscaChpDAyODAyODAyODAyODAyOCH5BAkKAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAANgA3AAAEzBDISau9OOvNu/9gKI5kaZ4lkhBEgqCnws6EApMITb93uOqsRC8EpA1Bxdnx8wMKl51ckXcsGFiGAkamsy0LA9pAe1EFqRbBYCAYXXUGk4DWJhZN4dlAlMSLRW80cSVzM3UgB3ksAwcnamwkB28GjVCWl5iZmpucnZ4cj4eWoRqFLKJHpgSoFIoEe5ausBeyl7UYqqw9uaVrukOkn8LDxMXGx8ibwY6+JLxydCO3JdMg1dJ/Is+E0SPLcs3Jnt/F28XXw+jC5uXh4u89EQAh+QQJCgAAACwAAAAANgA3AAAEzhDISau9OOvNu/9gKI5kaZ5oqhYGQRiFWhaD6w6xLLa2a+iiXg8YEtqIIF7vh/QcarbB4YJIuBKIpuTAM0wtCqNiJBgMBCaE0ZUFCXpoknWdCEFvpfURdCcM8noEIW82cSNzRnWDZoYjamttWhphQmOSHFVXkZecnZ6foKFujJdlZxqELo1AqQSrFH1/TbEZtLM9shetrzK7qKSSpryixMXGx8jJyifCKc1kcMzRIrYl1Xy4J9cfvibdIs/MwMue4cffxtvE6qLoxubk8ScRACH5BAkKAAAALAAAAAA2ADcAAATOEMhJq7046827/2AojmRpnmiqrqwwDAJbCkRNxLI42MSQ6zzfD0Sz4YYfFwyZKxhqhgJJeSQVdraBNFSsVUVPHsEAzJrEtnJNSELXRN2bKcwjw19f0QG7PjA7B2EGfn+FhoeIiYoSCAk1CQiLFQpoChlUQwhuBJEWcXkpjm4JF3w9P5tvFqZsLKkEF58/omiksXiZm52SlGKWkhONj7vAxcbHyMkTmCjMcDygRNAjrCfVaqcm11zTJrIjzt64yojhxd/G28XqwOjG5uTxJhEAIfkECQoAAAAsAAAAADYANwAABM0QyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhhh8XDMk0KY/OF5TIm4qKNWtnZxOWuDUvCNw7kcXJ6gl7Iz1T76Z8Tq/b7/i8qmCoGQoacT8FZ4AXbFopfTwEBhhnQ4w2j0GRkgQYiEOLPI6ZUkgHZwd6EweLBqSlq6ytricICTUJCKwKkgojgiMIlwS1VEYlspcJIZAkvjXHlcnKIZokxJLG0KAlvZfAebeMuUi7FbGz2z/Rq8jozavn7Nev8CsRACH5BAkKAAAALAAAAAA2ADcAAATLEMhJq7046827/2AojmRpnmiqrqwwDAJbCkRNxLI42MSQ6zzfD0Sz4YYfFwzJNCmPzheUyJuKijVrZ2cTlrg1LwjcO5HFyeoJeyM9U++mfE6v2+/4PD6O5F/YWiqAGWdIhRiHP4kWg0ONGH4/kXqUlZaXmJlMBQY1BgVuUicFZ6AhjyOdPAQGQF0mqzauYbCxBFdqJao8rVeiGQgJNQkIFwdnB0MKsQrGqgbJPwi2BMV5wrYJetQ129x62LHaedO21nnLq82VwcPnIhEAIfkECQoAAAAsAAAAADYANwAABMwQyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhhh8XDMk0KY/OF5TIm4qKNWtnZxOWuDUvCNw7kcXJ6gl7Iz1T76Z8Tq/b7/g8Po7kX9haKoAZZ0iFGIc/iRaDQ40Yfj+RepSVlpeYAAgJNQkIlgo8NQqUCKI2nzNSIpynBAkzaiCuNl9BIbQ1tl0hraewbrIfpq6pbqsioaKkFwUGNQYFSJudxhUFZ9KUz6IGlbTfrpXcPN6UB2cHlgfcBuqZKBEAIfkECQoAAAAsAAAAADYANwAABMwQyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhhh8XDMk0KY/OF5TIm4qKNWtnZxOWuDUvCNw7kcXJ6gl7Iz1T76Z8Tq/b7yJEopZA4CsKPDUKfxIIgjZ+P3EWe4gECYtqFo82P2cXlTWXQReOiJE5bFqHj4qiUhmBgoSFho59rrKztLVMBQY1BgWzBWe8UUsiuYIGTpMglSaYIcpfnSHEPMYzyB8HZwdrqSMHxAbath2MsqO0zLLorua05OLvJxEAIfkECQoAAAAsAAAAADYANwAABMwQyEmrvTjrzbv/YCiOZGmeaKqurDAMAlsKRE3EsjjYxJDrPN8PRLPhfohELYHQuGBDgIJXU0Q5CKqtOXsdP0otITHjfTtiW2lnE37StXUwFNaSScXaGZvm4r0jU1RWV1hhTIWJiouMjVcFBjUGBY4WBWw1A5RDT3sTkVQGnGYYaUOYPaVip3MXoDyiP3k3GAeoAwdRnRoHoAa5lcHCw8TFxscduyjKIrOeRKRAbSe3I9Um1yHOJ9sjzCbfyInhwt3E2cPo5dHF5OLvJREAOw==';
            var loadDiv = document.createElement('DIV');
            loadDiv.innerHTML = '<div style="position: fixed; top: 44px; left: 0; width: 100vw; height: 100vh; text-align: center; z-index: 9999; background-color: rgba(220,220 , 220, 0.5); "><img src="' + img + '" style="margin-top: 50%; width: 15%;"><p>' + (obj.content || '') + '</p></div>';

            // 下载更新时禁止页面滚动
            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, true);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            document.body.appendChild(loadDiv);

            if (obj.timeOut) {
                setTimeout(function() {
                    if (loadDiv.parentNode) loadDiv.parentNode.removeChild(loadDiv);
                }, Number(obj.timeOut));
            }

            return loadDiv;
        },
        close: function(loading) {
            document.body.style.overflow = 'visible';
            if (loading.parentNode) loading.parentNode.removeChild(loading);
        }
    },

    /**
     * 提示消息
     */
    msg: function() {
        var msg = '';
        var timeOut = 2000;
        var a0 = arguments[0];
        var a1 = arguments[1];
        if (typeof a0 === 'string') msg = a0;
        if (typeof a1 === 'number') timeOut = a1;
        var msgDiv = document.createElement('DIV');
        msgDiv.innerHTML = '' +
            '<div style="position: fixed; top: 40vh; height: 40px; width: 100vw; text-align: center">' +
            '<span style="display: inline-block; width: 60vw; height: 40px; line-height :40px; color: #fff; background-color: rgba(0, 0, 0, 0.6); border-radius: 3px">' + msg + '</span>' +
            '</div>';

        document.body.appendChild(msgDiv);

        setTimeout(function() {
            msgDiv.parentNode.removeChild(msgDiv);
        }, timeOut);
    },

    /**
     * 日期事件格式化
     * @example formatDate(); formatDate('yyyyMMdd_hhmmss'); formatDate('yyyyMMdd_hhmmss', '2006-07-02 08:09:04')
     * @param fmt
     * @param dateStr
     * @returns {*|string}
     */
    formatDate: function (fmt, dateStr) {
        var date = dateStr ? new Date(Date.parse(dateStr.replace(/-/g, '/'))) : new Date();

        fmt = fmt || 'yyyy-MM-dd hh:mm:ss';

        var o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds() // 毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    iosBuy: function(obj) {
//      //console.log(obj);
        var buyStr = '';
        buyStr += '&product_id=' + obj.product_id +
            '&product_type=' + obj.product_type +
            '&lotteryType=' + obj.lotteryType +
            '&lotteryNo=' + obj.lotteryNo +
            '&access_token=' + loginObj.access_token +
            '&from=' + 'ios' +
            '&appName=' + ConfigObj.appName +
            '&iosAppSite=' + ConfigObj.iosAppSite +
            '&version=' + ConfigObj.version +
            '&rnd=' + new Date().getTime()
            //window.open(ConfigObj.iosWebSite + '?pageName=buyConfirm' + encodeURI(buyStr),'_system');  //测试代码 zhangw
            //cordova.InAppBrowser.open(ConfigObj.iosWebSite + '?pageName=buyConfirm' + encodeURI(buyStr),'_blank','location=no,closebuttoncaption=返回');
        cordova.InAppBrowser.open(ConfigObj.iosWebSite + '?pageName=buyConfirm' + encodeURI(buyStr), '_system');
    },

    //统计
    pv: function(type, obj) {
        //console.log('pv', type, obj);
        if (ConfigObj.platForm == 'android') {
            if (typeof android_obj != 'undefined') {
                android_obj.onEventValue(type, JSON.stringify(obj));
            }
        } else if (ConfigObj.platForm == 'ios') {
            if (typeof ios_obj != 'undefined') {
                ios_obj.onEventValue(type, JSON.stringify(obj));
            }
        }
    },
    /*encrypt:function(data){ //正式的加密
        var postData = JSON.stringify(data);
        var srcs = CryptoJS.enc.Utf8.parse(postData);
        var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse("MUGNHU3FG5RE8F4F"), { iv: CryptoJS.enc.Utf8.parse("0ELFZI7HPQT1OW4L"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var postDataHexStr = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString().toUpperCase());
        var postDataEnd = CryptoJS.enc.Base64.stringify(postDataHexStr);
        var str = b64EncodeUnicode(postDataEnd);
        return str;
    },
    crypt:function(data){
        // console.log(data)
        var data = b64DecodeUnicode(data);
        var decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse("MUGNHU3FG5RE8F4F"), { iv: CryptoJS.enc.Utf8.parse("0ELFZI7HPQT1OW4L"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },*/
    encrypt:function(data){ //正式的加密
        var postData = JSON.stringify(data);
        var srcs = CryptoJS.enc.Utf8.parse(postData);
        var encrypted = CryptoJS.AES.encrypt(srcs, CryptoJS.enc.Utf8.parse("AUCj067VsOWgmyFR"), { iv: CryptoJS.enc.Utf8.parse("MNZuDexL4UHGCfyW"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var postDataHexStr = CryptoJS.enc.Hex.parse(encrypted.ciphertext.toString().toUpperCase());
        var postDataEnd = CryptoJS.enc.Base64.stringify(postDataHexStr);
        var str = b64EncodeUnicode(postDataEnd);
        return str;
    },
    crypt:function(data){
        // console.log(data)
        var data = b64DecodeUnicode(data);
        var decrypt = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse("AUCj067VsOWgmyFR"), { iv: CryptoJS.enc.Utf8.parse("MNZuDexL4UHGCfyW"),mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    },
}

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

/* 
从浏览器跳到 app上的url处理函数

*/
function handleOpenURL(url) {
//  //console.log(url);
    //if(ConfigObj.platForm != 'ios') return;
    setTimeout(function() {
        if (url.indexOf('?') != -1) { //特定页面网址
            var arr = url.split('?');
            var paramObj = {};
            if (arr[1]) {
                var paramArr = arr[1].split('&');
                for (var i = 0, len = paramArr.length; i < len; i++) {
                    var itm = paramArr[i];
                    var key = itm.split('=')[0];
                    var value = itm.split('=')[1];
                    paramObj[key] = value;
                }
//              //console.log(paramObj);
            }
            var keepArr = [];
            if (paramObj.pageName && paramObj.pageName == 'regByMobile') {
                keepArr.push(paramObj.pageName);
            }
            Global.GC(keepArr);
            //Global.GC();
            if (paramObj.pageName) {
                var page = paramObj.pageName;
                if (window[page + 'Obj']) {
                    window[page + 'Obj'].goBack = function() {
                        window[page + 'Obj'].destroy();
                        if (page == 'stationDetail') { //根据需求，特殊处理
                            // userCenterObj.show();
                            mypageObj.show()
                        } else {
                            homeObj.show();
                            Global.fixd()
                        }

                    }
                    var func = function() {
                        window[page + 'Obj'].dirShow(paramObj); //直接从网址导入显示 ，需要可以直接跳转的页面配置dirShow函数	
                    }
                    Global.checkToken(func);
                }
            } else {
                homeObj.show('reload');
                Global.checkToken();
                Global.fixd()
            }
        }
    }, 0)
}

//分享成功后加积分,用于安卓原生回调
function shareSucAddScore(pageId) {
    loginObj.addScore('share', pageId);
}

// 从原生获取 clientId
function getPushClientIdCallBack(id) {
    if (id) {
        loginObj.setClientId(id);
    }
}

//获取wifi状态回调
function getWifiStatusCallBack(isWifi, wifiName) {
    //alert(wifiName);
    /*
    if(isWifi == 1){
    	if($('#home_wifiStatus').length == 1){
    		$('#home_wifiStatus').html('<span class="wifiIcon"></span> 已连接: '+ wifiName).show();
    		$('#home_wifiStatus').parents('header').addClass('header_1');
    	}
    }else{ user_info_no
    	$('#home_wifiStatus').hide();	
    	$('#home_wifiStatus').parents('header').removeClass('header_1');
    }
    */
}

//获取聊天数量回调
function getImNumCallBack(num) {
    if (loginObj.isLogin) {
        if (num > 0) {
            $('#home_imNum').html(num).show();
            $('#userCenter_imNum').html(num).show();
        } else {
            $('#home_imNum').html('').hide();
            $('#userCenter_imNum').html('').hide();
        }
    } else {
        $('#home_imNum').html('').hide();
        $('#userCenter_imNum').html('').hide();
    }
}

//type:station修改站点信息 type:card|photo实名认证
function getCamraImageCallback(img, num, type) {
    if (type == 'card' || type == 'photo') {
        regRealNameObj.addImg(img, num);
    } else if (type == 'station') {
        modifyStationInfoObj.addImg(img, num);
    }
}

/**
 * 微信充值回调
 * @param {String} errcode 微信返回状态，0 成功，-1 失败，-2 用户取消
 */
function getPayWeixinCallback(errcode) {
    // alert('errcode:' + errcode);
    $.post(ConfigObj.localSite + '?version=1&m=cashier.return.interrupt', {
        pay_id: ConfigObj.pay_id,
        status_code: errcode,
        third_channel: 'wechatpayApp'
    }, function() {});

    if (errcode == '-2') {
        // 用户取消时先直接改变充值状态页面
        payStatusObj.setCancelStatus()
    }

}

/**
 * 微信 web 支付充值回调
 */
function wechatPayWebReturnCallback(args) {}

/**
 * 扫描二维码后的回调函数
 * @param type 类型，register 注册
 * @param value 站点/代理编号
 */
function getScanQRCodeCallback(type, value) {
    if (type === 'register') {
        registerObj.setSid(value);
    }

}

/**
 * 第三方认证回调，获取用户信息后进行第三方登录
 * @param platform 平台
 * @param uid 用户唯一标识
 * @param name name 用户昵称
 * @param iconurl iconurl 用户头像
 */

function socialAuthCallBack(type, platform, uid, name, iconurl) {
// console.log(123)
    if (type == 'auth') loginObj.socialAuth(platform, uid, name, iconurl);  //登录
    if (type == 'bind') userInfoObj.doBindSocial(platform, uid, name, iconurl);  //绑定
}

function socialAuthCallBack1() { // 客戶端次數用完跳轉到vip充值
    gifJson()
    ConfigObj.pNum = '0'
    myfreeObj.goBack = function(){
        myfreeObj.destroy();
        Global.channelId()
        homeObj.onloadExecution();
        homeObj.setDefConfig();
        homeObj.show();
        Global.fixd()
    }
    myfreeObj.show(true);
    /*mycodeObj.goBack = function(){
        mycodeObj.destroy();
        mypageObj.show()
        $('.right').css('background','transparent')
        Global.fixd()
    }
    mycodeObj.show(true,function(){
        mycodeObj.goewm(invitationCode,ConfigObj.yshare_url,ConfigObj.yshare)
    });*/
}

/**/
/**
 * ios的友盟渠道id回调
 * @param id 友盟渠道id
 */
function getUmengCallBack(id) {
console.log(455)
   ConfigObj.umengChannel = id;
}

/**
 * ios的回调
 * @param a1 k的值
 * @param a2 v的值
 */
function getAesKeyAndIv(a1, a2) {
	ConfigObj.a1 = a1;
	ConfigObj.a2 = a2;
}

function setHeaderPosition(){
	$("input,textarea").off("blur,focus")
	$(document).on("focus","input,textarea",function(){
		$(".header").css({"position":"absolute"})
	})
	$(document).on("blur","input,textarea",function(){
		 $(".header").css({"position":"fixed"})
	})
}
// 元素失去焦点隐藏iphone的软键盘
function objBlur(tagName, time) {
    if (typeof tagName != 'string') throw new Error('objBlur()参数错误');
    var obj = document.getElementsByTagName(tagName);
    // //console.log(obj);
    time = time || 0;
    docTouchend = function(event) {
        if (event.target != obj) {
            for (var i = 0; i < obj.length; i++) {
                obj[i].blur();
                // //console.log("blur======================")
            }
            document.removeEventListener('touchend', docTouchend, false);
        }
    };
    if (obj) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].addEventListener('focus', function() {
                document.addEventListener('touchend', docTouchend, false);
            }, false);
        }
    } else {
        throw new Error('objBlur()没有找到元素');
    }
}

/**
 * 序列化
 * @param obj
 * @returns {string}
 */
function serialize(obj) {
    var base64str = btoa(JSON.stringify(obj));
    return base64str.replace(/\//g, '_').replace(/\+/g, '-').replace(/=/g, '.');
}

/**
 * 反序列化
 * @param str
 * @returns {*}
 */
function unserialize(str) {
    str = str.replace(/_/g, '/').replace(/-/g, '+').replace(/\./g, '=');
    return JSON.parse(atob(str));
}

/**
 * 在控制台打印消息并退出
 * @param msg
 */
function exit(msg) {
    // 屏蔽错误
    window.onerror = function () {
        return true;
    };

    console.clear();
    for (var i = 0; i < arguments.length; i++) {
        //console.log(JSON.stringify(arguments[i]));
    }

    throw new Error('Ending execution');
}

/**
 * canvas画圆环
 * @param option
 */
function drawCircle(_options){
    var options = _options || {};    
    options.angle = options.angle || 1;   
    options.color = options.color || '#fff';    
    options.lineWidth = options.lineWidth || 10;    
    options.lineCap = options.lineCap || 'round';    
 
    var oBoxOne = document.getElementById(options.id);
    var sCenter = oBoxOne.width / 2;   
    var ctx = oBoxOne.getContext('2d');
    var nBegin = Math.PI / 2;    
    var nEnd = Math.PI * 2;   
 
    ctx.textAlign = 'center';    
    ctx.font = 'normal normal bold 20px Arial';    
    ctx.fillStyle = options.color;
    ctx.lineCap = options.lineCap;
    ctx.strokeStyle = options.color;
    ctx.lineWidth = options.lineWidth;
 
    ctx.beginPath();   
    ctx.strokeStyle = '#f8ba61';
    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
    ctx.stroke();
 
    var imd = ctx.getImageData(0, 0, 240, 240);
    function draw(current) {  
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = options.color;
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
        ctx.stroke();
    }
 
    var t = 0;
    var timer = null;
    function loadCanvas(angle) {   
        timer = setInterval(function(){
            if (t > angle) {
                draw(options.angle);
                clearInterval(timer);
            }else{
                draw(t);
                t += 0.02;
            }
        }, 20);
    }
    loadCanvas(options.angle);  
    timer = null;
}
    function initEvent() {
        var tds = $("#mydiv1 ul li");
        for (var i = 0; i < tds.length; i++) {
            var td = tds[i];
            // console.log(td)
            $(td).unbind('tap').tap(function(){
                var num = $(this).attr("num");
                change(num);
            })
        }
    }
    // 图片懒加载
    //判断一个元素是不是出现在窗口(视野)
    function isShow($node,liImg){

        // return $node.offset().top <= $('li.li_acth2')[0].offsetHeight + $('li.li_acth2').scrollTop()
        return $node.offset().top <= $(liImg)[0].offsetHeight*4 + $(window).scrollTop()
    }
    //加载图片
    function loadImg($img){
        $img.attr('src', $img.attr('data-src')) //把data-src的值 赋值给src
        $img.attr('data-isLoaded', 1)//已加载的图片做标记
    }
    function change(num) {
        var tds = $("#mydiv1 ul li");
        for (var i = 0; i < num; i++) {
            var td = tds[i];
            $(td).find("img").attr("src","images/room/yell.png");
            $(td).addClass('xing');
        }
        var tindex = $("#mydiv1").attr("currentIndex");
        tindex = tindex==0?0:tindex+1;
        for (var j = num; j < tindex; j++) {
            var td = tds[j];
            $(td).find("img").attr("src","images/room/gray.png");
            $(td).removeClass('xing');
        }
        $("#mydiv1").attr("currentIndex",num);
    }
    function evaluate(handls,id){
        // $.alertMsg(handls + id)
        handles = handls
        usidsis = id
        $('#div_pj').show()
        initEvent()
        Global.mobi(handles,usidsis)
    }
    function imLogin(obj){ //  進入到im聊天對話框
        console.log('对话框')
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        gifJson()
        var thisI = obj.attr('data-I') //主播id
        var mPeerId = obj.attr('data-d') //主播房间号用做im聊天id
        var mName = obj.attr('data-n') // 主播姓名
        var mPic = obj.attr('data-g') //主播头像
        var thisL = obj.attr('data-l') //直播间类型
        if (ConfigObj.platForm == 'android') {
            // android_obj.sendMessageToPeer(String mPeerId, String mPic, String mName)
            android_obj.sendMessageToPeer(mPeerId,mPic,mName,thisL,thisI)
            gifNone()
        }else if(ConfigObj.platForm == 'ios'){
            ios_obj.sendMessageToPeer(mPeerId,mPic,mName,thisL,thisI)
            gifNone()
        }else{
            gifNone()
        }
    }
    function imLogout(){ //進入到im列表頁面
        console.log('列表')
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            gifNone()
            return false;
        }
        if (ConfigObj.platForm == 'android') {
            android_obj.intoIM()
            gifNone()
        }else if(ConfigObj.platForm == 'ios'){
            ios_obj.intoIM()
            gifNone()
        }else{
            gifNone()
        }
        // clientuser.logout()
    }
    function goToKf() {
        gifJson()
        if (ConfigObj.platForm === 'android') {
            android_obj.goToKf()
            gifNone()
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.goToKf()
            gifNone()
        }else{
            gifNone()
            console.log(24)
        }
    }
    function userTouNam(){
        // console.log(ConfigObj.usName)
        if (ConfigObj.platForm == 'android') {
            android_obj.myPIc(ConfigObj.pic)
            android_obj.myMyName(ConfigObj.usName)
        }else if(ConfigObj.platForm == 'ios'){
            ios_obj.myPIc(ConfigObj.pic)
            ios_obj.myMyName(ConfigObj.usName)
        }else{
        }
    }
    function goToLogin(){
        loginObj.show()
    }
    function getItemuser(){
        var textLoca =  localStorage.getItem('chatUsId')
        if (textLoca) {
            var txt = textLoca.split(',')
            var html = ''
            for (var i = 0; i < txt.length; i++) {
                var cont = txt[i].split(';')
                html += '<p data-d="'+ cont[1] +'" data-l="'+ cont[2] +'">'+ cont[0] +'</p>'
            }
            $('#im_userct').html(html)
        }else{
            console.log(2)
        }
    }
    function achordetail(id,hao){ //進入到主播詳情頁面
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(id,hao)
        });
    }
    function sendCallMsg(ih,ig,nm,ty,id){
        console.log(id)
        console.log(nm)
        if (ConfigObj.platForm == 'android') {
            android_obj.sendCallMsg(ih,ig,nm,ty,id)
        }else if(ConfigObj.platForm == 'ios'){
            ios_obj.sendCallMsg(ih,ig,nm,ty,id)
        }else{}
    }
    function shuaxpage(){
        footballObj.show(true)
    }
    function GifImg(){
        var animData = {
            wrapper: document.getElementById('bodymovin'),
            animType: 'canvas',
            loop: true,
            prerender: true,
            autoplay: true,
            path: 'images/gif/data.json'
        };
        var anim = bodymovin.loadAnimation(animData);
    }
    function gifJson(){ // gifJsonlive()
        $('#bodymovin').show()
    }
    function gifNone(){ // gifNonelive()
        $('#bodymovin').hide()
    }
    function plusObj(num){
        // alert(num+'加')
        // console.log(num+'加')
        // console.log($('#i_ImNum').html() + '本地')
        // alert($('#i_ImNum').html() + '本地')
        var Imtext = ($('#i_ImNum').html()*1) + (num*1)
        // alert(Imtext)
        // setTimeout(function(){ 
            if (Imtext <= '0') {
                $('#sp_Imnum').css('display','none')
                localStorage.setItem("Imtexts", '0');
                $('#i_ImNum').html('0')
                $('#p_myIm').html('0')
            }else if (Imtext >= '99') {
                $('#sp_Imnum').html('<i id="i_ImNum">99</i>'+'+')
                $('#sp_Imnum').css('display','inline-block')
                localStorage.setItem("Imtexts", '99');
                $('#p_myIm').html('99+')
            }else{
                // alert(2185)
                // alert($('#sp_Imnum')[0].innerHTML)
                // console.log($('#sp_Imnum'))
                $('#sp_Imnum').css('display','inline-block')
                 // console.log(($('#i_ImNum').html()*1)+Imtext)
                $('#i_ImNum').html(Imtext)
                $('#p_myIm').html(Imtext)
                localStorage.setItem("Imtexts", Imtext);
            } 
        // }, 1000);
    }
    function lessObj(num){
        // alert(num + '减')
        // alert($('#i_ImNum').html() + '本地減')
        var Imtext = ($('#i_ImNum').html()*1) - (num*1)
        // setTimeout(function(){
            if (Imtext <= '0') {
                $('#sp_Imnum').css('display','none')
                localStorage.setItem("Imtexts", '0');
                $('#i_ImNum').html('0')
                $('#p_myIm').html('0')
            }else if (Imtext >= '99') {
                $('#sp_Imnum').html('<i id="i_ImNum">99</i>'+'+')
                // $('#i_ImNum').html('99')
                $('#sp_Imnum').css('display','inline-block')
                localStorage.setItem("Imtexts", '99');
                $('#p_myIm').html('99+')
            }else{
                $('#i_ImNum').html(Imtext)
                localStorage.setItem("Imtexts", Imtext);
                $('#p_myIm').html(Imtext)
                $('#sp_Imnum').css('display','inline-block')
            }
        // },1000)
    }
    function goRecharge(){
        moneyObj.goBack = function(){
            moneyObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        moneyObj.show(true,function(){
        }); 
    }
    function sharePicObj(url) {
        if (ConfigObj.platForm == 'android') {
            android_obj.sharePic(url)
            gifNone()
        }else if(ConfigObj.platForm == 'ios'){
            ios_obj.sharePic(url)
            gifNone()
        }else{
            gifNone()
            console.log(url)
        }
    }
    function getUnRead(){
         if (ConfigObj.platForm == 'android') {
            // alert(android_obj.getUnRead() + '2243')
            var androidNum = android_obj.getUnRead()
            if (androidNum == '0') {
                // $('#sp_Imnum').hide()
                $('#i_ImNum').html('0')
                localStorage.setItem("Imtexts", '0');
                $('#p_myIm').html('0')
                $('#sp_Imnum').css('display','none')
            }else if(androidNum >= '99'){
                $('#sp_Imnum').show()
                $('#sp_Imnum').html('<i id="i_ImNum">99</i>'+'+')
                // $('#i_ImNum').html('99')
                localStorage.setItem("Imtexts", '99');
                $('#p_myIm').html('99')
            }else{
                // alert(android_obj.getUnRead() + '2256')
                $('#sp_Imnum').show()
                $('#i_ImNum').html(androidNum)
                localStorage.setItem("Imtexts", androidNum);
                $('#p_myIm').html(androidNum)
            } 
        }else if(ConfigObj.platForm == 'ios'){
            var userImlist = ios_obj.getUnRead()
            if (userImlist == '0') {
                $('#sp_Imnum').hide()
                $('#i_ImNum').html('0')
                localStorage.setItem("Imtexts", '0');
                $('#p_myIm').html('0')
            }else if(userImlist >= '99'){
                $('#sp_Imnum').show()
                $('#sp_Imnum').html('<i id="i_ImNum">99</i>'+'+')
                // $('#i_ImNum').html('99')
                localStorage.setItem("Imtexts", '99');
                $('#p_myIm').html('99')
            }else{
                $('#sp_Imnum').show()
                $('#i_ImNum').html(userImlist)
                localStorage.setItem("Imtexts", userImlist);
                $('#p_myIm').html(userImlist)
            } 
        }else{
            // $('#sp_Imnum').show()
            // gifNone()
            console.log(2266)
        }
    }
    function palyVideoObj(typ,cla,ig) {
        if (ConfigObj.platForm === 'android') {
            android_obj.playVideo(typ,cla,ig)
            gifNone()
        }else if (ConfigObj.platForm === 'ios'){
            ios_obj.playVideo(typ,cla,ig)
            gifNone()
        }else{
            console.log(435)
        }
    }
    function Goanchor(id,ha,typ,nam,dynam) {  // 輪播廣告調整到直播間或者視頻聊天
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        Global.goanchors(id,ha,typ,nam,dynam)
    }
    function bdTypeObj(type) {// 2 是記住密碼 1 是為記住密碼
        if (ConfigObj.platForm === 'android') {
            android_obj.savePwd(type+"")
            gifNone()
        }else if (ConfigObj.platForm === 'ios'){
            ios_obj.savePwd(type+"")
            gifNone()
        }else{
            console.log(type)
            gifNone()
        }
    }
    function wetherLoginObj() {
        if (ConfigObj.platForm === 'android') {
            android_obj.saveLoginType()
        }else if (ConfigObj.platForm === 'ios'){
            ios_obj.saveLoginType()
        }else{
            // console.log('狀態0')
        }
    }
/*function scrollAnimation(currentY, targetY) {
  var currentY = document.documentElement.scrollTop || document.body.scrollTop

  // 计算需要移动的距离
  var needScrollTop = targetY - currentY
  var _currentY = currentY
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    var dist = Math.ceil(needScrollTop / 10)
    _currentY += dist
    window.scrollTo(_currentY, currentY)
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY)
    } else {
      window.scrollTo(_currentY, targetY)
    }
  }, 1)
}*/
