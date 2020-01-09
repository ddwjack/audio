    var VdetailObj = new PageController({
	   'name': 'Vdetail',
	   'tpl' : 'template/football/Vdetail.html'
    });
    VdetailObj.createDomObj = function(){
    	this.ClickObj = $(".detilsFan");
        this.hedsetObj = $("#Vdetail") 
        this.hedplObj = $("#p_fpl")  //发评论 
        this.plhideObj = $("#pl_hide")  //取消评论   im_zanno
        this.goplbutObj = $("#but_pl")  //发送评论  
        this.imzanObj = $("#vid_dz")  //  
        this.IfanhuiObj = $("#im_fanhui")  //  關閉充值

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            clearInterval(VdetailObj.ti_timers);
            VdetailObj.goBack()
        })
        $('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
            // console.log($(this).attr('data-t')) //video_comment
            var datv = $(this).attr('data-t')
            VdetailObj.vicomment('8',datv)
        })
    }

    VdetailObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            VdetailObj.sectionEvent(e);
        });
        this.hedplObj.unbind('tap').tap(function(){
            $('#di_pl').show()
        })
        this.plhideObj.unbind('tap').tap(function(){
            $('#di_pl').hide()
        })
        this.goplbutObj.unbind('tap').tap(function(){
            VdetailObj.Ajaxs('2')
        })
        this.IfanhuiObj.unbind('tap').tap(function(){
            Global.channelId()
            $('#div_money').hide()
            if (Refrs) {
                VdetailObj.updatePlay(vid_id,Vid_cla,Vid_img)
            }
            
            // VdetailObj.updatePlay
        /*vid_id = typ
        Vid_cla = cla
        Vid_img = img*/
        })
        
    }
    /*VdetailObj.Refresh = function(){
        console.log(monType)
        if (monType == '3') {
            VdetailObj.updatePlay(vid_id,Vid_cla,Vid_img)
        }
    }*/
    var Refrs
    VdetailObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisZ = thisObj.attr("data-z");
            var thisV = thisObj.attr("data-v");
            var thisC = thisObj.attr("data-c");
            var thisI = thisObj.attr("data-i");
            // console.log(thisT)//account caching current protocol updatePlay
            switch (thisT){
                case "Vsig" : VdetailObj.gosiginObj();return true; //跳轉登錄 
                case "lixl" : VdetailObj.golovObj(thisObj);return true; //确定   im_zan 
                // case "lixl" : VdetailObj.Ajaxs(1);return true; //确定   im_zan 
                case "Lcnxh" : clearInterval(VdetailObj.ti_timers);VdetailObj.updatePlay(thisV,thisC,thisI);return true; //确定  
                case "dexia" : VdetailObj.xiaPlay(thisObj);return true; // 正在下載   
                case "fenand" : VdetailObj.fenPlay(thisObj);return true; //分享   
            }
        }
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol updatePlay
            switch (thisT){
                case "Amoney" : VdetailObj.goAmoney(thisObj);return true; //充值會員
                case "Azuan" : VdetailObj.vipAzuan(thisObj);return true;  //钻石抵扣  
                case "Azuanbu" : VdetailObj.vipAzuanbu();return true;  //钻石不足  
                case "Asigin" : VdetailObj.goAsiginss();return true;  //登录  
                case "Achong" : VdetailObj.moneydeta();return true;  //登录   
                case "A_Gua" : VdetailObj.goA_Gua();return true;  //   
            }
        }
    }
    VdetailObj.goA_Gua = function(){
        mycodeObj.goBack = function(){
            mycodeObj.destroy();
            VdetailObj.show();
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(invitationCode)
        });
    }
    VdetailObj.goAmoney = function(obj){ //充值會員
        // obj.addClass('color').parent().addClass('color')
        obj.addClass('color').parent().siblings().find('a').removeClass('color')
        $('#cz_gif2').show()
        this.count = 0;
        //  金额  类型 渠道 userCenter_userName 3
        var thv = obj.attr('data-v');
        var thd = obj.attr('data-d');
        var thl = obj.attr('data-l');
        var postData ={
            money:thv,
            user_id:ConfigObj.meId,
            channel:ConfigObj.zdid,
            order_type:thl,
            goods_id:thd
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Orderpay/order_add',
            data: secretData,
            type: "post",
            dataType: "json",
            timeout : 5000,
            success:function(res){
                    Refrs = '2'
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    ConfigObj.pay_id = res.info.order_id
                    if (res.info.type == 1) {
                        VdetailObj.startTimer(res.info.order_id)
                        $('#vieform').html(res.info.url)
                        document.alipaysubmit.submit()
                    }else{
                        if (ConfigObj.platForm == 'android') {
                            android_obj.domyPay(res.info.url,res.info.order_id)
                        }
                    }
                    
                    $('#cz_gif2').hide()
                    obj.removeClass('color').parent().siblings().find('.A_mo').attr('data-t','Amoney') 
                    obj.removeClass('color').parent().siblings().find('.a_gun').attr('data-t','A_Gua') 
                }else{
                    $('#div_money').hide()
                    $('#cz_gif2').hide()
                   $.alertMsg(res.err) 
                }
            },
            error:function(res){
                $('#div_money').hide()
                $('#cz_gif2').hide()
                $.alertMsg('請求失敗，請稍後重試')
            },
            complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
                console.log(status)
        　　　　if(status=='timeout'){//超时,status还有success,error等值的情况  
         // 　　　　　 ajaxTimeoutTest.abort();
                    $('#div_money').hide()
                    $('#cz_gif2').hide()
        　　　　　  alert("請求超時，稍後重試");
        　　　　}
        　　}
        })
    }
    VdetailObj.startTimer = function () {
        setTimeout(function () {
            VdetailObj.getPayStatus('first');
        }, 200);
        VdetailObj.ticket_timer = setInterval(function () {
            VdetailObj.getPayStatus();  
        }, 2000);
    }
    VdetailObj.getPayStatus = function (type) {
        console.log(ConfigObj.pay_id)
        // return false; div_money_use
        var self = this;
        var postData ={
            order_id:ConfigObj.pay_id
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        console.log(postData)
        self.count = self.count + 1;
        // console.log(Global.crypt('1524019326112054005ad6b07e1b615'))  0 失败 1是成功
        $.ajax({
            url: ConfigObj.localSite+'/Orderpay/order_info',
            type: 'post',
            data: secretData,
            dataType: 'json',
            success: function (obj) {
                if (obj.ok == true) {
                    obj.info = $.parseJSON(Global.crypt(obj.result));
                    console.log(obj.info)
                    if (obj.info.status == '0') {
                        var tempObj = {
                            time: 0
                        };
                        self.updateStatus('process', obj.info);
                        console.log(self.count)
                        if (self.count > 10) {
                            clearInterval(self.ticket_timer);
                            self.updateStatus('process', tempObj);
                            $('#M_recharge').hide()
                         } else {
                         self.updateStatus('process', tempObj);
                         }
                    }if (obj.info.status == '1') {
                        self.updateStatus('success', obj.info);
                        if (ConfigObj.platForm === 'android') {
                            var timeOut = self.timeOut, timeOutBack = self.timeOutBack;
                            var source = '';
                            var money = "";
                            if(obj.info.channel == "alipayWap"){
                                source = "2";
                                money = obj.info.package_list.alipaywap.channel_amount;
                            }else if(obj.info.channel == "wechatpayWap"){
                                source = "1";
                                money = obj.info.package_list.wechatpaywap.channel_amount;
                            }
                            // alert(source)
                            android_obj.payStatistics(money,source);
                            
                            if (timeOut && timeOutBack) {
                                // 自动跳转
                                $('#payStatus_autoJumpTip').show();
                                setTimeout(function () {
                                    self.setDefConfig();
                                    Global.open(timeOutBack);
                                }, timeOut);
                            }
                        } else if (ConfigObj.platForm === 'ios') {
                            // 自动跳转
                            $('#payStatus_autoJumpTip').show();
                            setTimeout(function () {
                                if (self.from === 'account') {
                                    accountObj.show(true);
                                } else if (self.from === 'userCenter') {
                                    VdetailObj.show(true);
                                } else if (self.from === 'buyConfirm') {
                                    var data = buyConfirmObj.data;
                                    buyConfirmObj.show(true, function () {
                                        buyConfirmObj.setData(data);
                                    });
                                }
                            }, 2000);
                        }
                    } else if (obj.info.status == 'fail') {
                        // alert(3)
                        self.updateStatus('fail', obj.info);
                        if (self.ticket_timer) {
                            clearInterval(self.ticket_timer);
                            self.ticket_timer = '';
                        }
                    } else if (obj.info.status == 'delay') {
                        // alert(4) img_hide
                        self.updateStatus('delay', obj.info);
                        if (self.ticket_timer) {
                            clearInterval(self.ticket_timer);
                            self.ticket_timer = '';
                        }
                    } 
                } else {
                }
            }
        })
    }
    VdetailObj.updateStatus = function (type, itm) {
        console.log(type)
        var self = this;
        var html = '';
        if (type == 'success') { //成功 user_info_no
            console.log(454)
            $('#M_recharge').hide()
            $.alertMsg('充值成功')
            clearInterval(VdetailObj.ticket_timer);
        } else if (type == 'process') {
            $.alertMsg('充值失敗')
        }
    }
    VdetailObj.vipAzuan = function(obj){
        var thv = obj.attr('data-v');
        var thd = obj.attr('data-d');
        var thY = obj.attr('data-y');
        var thZ = obj.attr('data-z');
        var postData ={
            deductible_money:thv,
            user_id:ConfigObj.meId,
            type:thd,
            day:thY,
            goods_name:thZ
        }
        // console.log(postData) video_comment
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Orderpay/deductible',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) VdetailObj.updatePlay
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    $('#div_money').hide()
                    $.alertMsg('抵扣成功')
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    VdetailObj.vipAzuanbu = function(){
        alert('鑽石不足請選擇其它充值方式') 
    }
    VdetailObj.goAsiginss = function(){
        mycodeObj.goBack = function(){
            mycodeObj.destroy();
            VdetailObj.show();
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(invitationCode)
        });
        // extensionObj.goBack = function(){
        //     extensionObj.destroy();
        //     VdetailObj.show();
        // }
        // extensionObj.show(true,function(){
        //     // $('#bdiph').hide() VdetailObj.updatePlay
        // }); 
    }
    VdetailObj.golovObj = function(obj){
        if (obj.hasClass('hLove')) return false;
        obj.addClass('hLove')
        VdetailObj.Ajaxs(1)
    }
    VdetailObj.gosiginObj = function(){
        $.alertMsg('請先登錄')
        signInObj.goBack = function(){
            signInObj.destroy();
            VdetailObj.show();
            Global.fixd()
        }
        // setupeeObj.show();
        signInObj.show();
    }
    VdetailObj.xiacols = function(obj){
        var odds_1 = obj.attr('data-v');
        var sibingObj = obj.siblings();
        sibingObj.removeClass('deimg');
        obj.addClass('deimg');
        // footballObj.goVlove(odds_1)
    }
    VdetailObj.fenPlay = function(rd){
        var thisC = rd.attr("data-c");
        if (rd.hasClass('hom')) return false;
        rd.addClass('hom')
        rd.find('img').attr('src','images/find/send_press.png')
        VdetailObj.Vajaxplay()
    }
    VdetailObj.xiaPlay = function(obj){
        if (obj.hasClass('nole')) return false;
        obj.addClass('nole')
        // var usId = localStorage.getItem("numId")
        var postData ={
            user_id:ConfigObj.meId,
            video_id:Vid
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/api/caching_num',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    $('#de_img').attr('src','images/find/download_press.png')
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    var url = res.info.download_url
                    android_obj.downLoadVideo(url,Vid)
                    if (url == '') return false;
                    $.alertMsg('正在下載')
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  video_comment_add
            }
        })
    }
    VdetailObj.updatePlay = function(typ,cla,img){
        console.log(typ)
        console.log(cla)
        Ecount = 0
        Refrs =''
        if (ConfigObj.platForm === 'android') {
            /*if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                return false;
            }*/
        }
        VdetailObj.vidmath(typ,cla,img)
        VdetailObj.vidNum(typ)
        Global.channelId()
    }
    VdetailObj.vidNum = function(typ){
        /*var pasword = {
            video_id:typ,
            channel:ConfigObj.zdid,
            type:'2',
            user_id:ConfigObj.meId
        }
        var secretData = {
            'info' : Global.encrypt(pasword)
        };
        // console.log(pasword)
        $.ajax({
            url:ConfigObj.localSite+'/api/click_stat',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){ video_watch
                // if (true) {}
                // res.info = $.parseJSON(Global.crypt(res.result));
                // res.info = $.parseJSON(Global.crypt(res.result));
                // console.log(res) dexia
                // console.log(res.info) 
            }
        })*/
    }
    VdetailObj.vidmath = function(typ,cla,img){
        isVideoFullScreen = false
        if (ConfigObj.platForm === 'android') {
            /*if (android_obj.isNetWork() == false) {
                alert('網絡鏈接不可用，請重新鏈接網絡')
            }*/
        } 
        vid_id = typ
        Vid_cla = cla
        Vid_img = img
        console.log(typ)
        var postData ={
            user_id:ConfigObj.meId,
            video_id:typ,
            domain_name_api:ConfigObj.localSite,
            domain_name_video:ConfigObj.hrefSite,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/video_watch',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)  video_comment_add
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    VdetailObj.videts(res.info)
                    console.log(res.info)
                    VdetailObj.vicomment(res.info,'1')
                    xzpl = res.info
                    // VdetailObj.Ajaxs('')
                    VdetailObj.vidand(res.info)
                    $('#deta_gif').show()
                }else if(res.ok == false){
                    res.info = $.parseJSON(Global.crypt(res.result));
                    VdetailObj.videts(res.info)
                    // console.log(res.info)
                    VdetailObj.vicomment('8','1')
                    VdetailObj.vidand(res.info);
                }else{
                    VdetailObj.vicomment('8','1')
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  video_comment_add
            }
        })
    }
    VdetailObj.vidand = function(typ){
        document.getElementById("bideo").addEventListener('click', function(){
            //window.setTimeout('InVideoScreen();', 500);
            // $('#deta_gif').show()
        });
        document.getElementById("bideo").addEventListener('play', function(){
            $('#deta_gif').show()
            // setTimeout(function(){ document.getElementById("bideo").currentTime  = 1 }, 200);
            // document.getElementById("bideo").currentTime  = 1
        });

        document.getElementById("bideo").addEventListener('error', function(){
            setTimeout(function(){ VdetailObj.vddsq();}, 3000);
            countsst = 0;
            // VdetailObj.startTimers()
        });
        document.getElementById("bideo").addEventListener('waiting', function(){
            $('#deta_gif').show()
            clearInterval(VdetailObj.ti_timers);
            // setTimeout(function(){ $('#deta_gif').hide(); }, 2000);
        });
        document.getElementById("bideo").addEventListener('canplay', function(){
            $('#deta_gif').show()
            // alert('缓冲')
            // myFunction()

        });
        document.getElementById("bideo").addEventListener("timeupdate",function(){
            var timeDisplay;
            timeDisplay = Math.floor(document.getElementById("bideo").currentTime);
            var more_watch = typ.more_watch
            // console.log(typ)
            if (timeDisplay) {
                $('#deta_gif').hide()
            }else{
                $('#deta_gif').show()
            }
            if (monType != '3') {
                if (more_watch == '0') {
                    if(timeDisplay >= 60){
                        document.getElementById("bideo").pause()  
                        document.getElementById("bideo").controls = false
                        if(ConfigObj.platForm === 'android'){
                            android_obj.setOrPort()
                            document.webkitCancelFullScreen() 
                        }
                        $('#deta_gif').hide()
                        VdetailObj.goshikan()
                        $('#div_money').show()
                        VdetailObj.moneydeta()
                        // setTimeout(function(){ VdetailObj.moneydeta() }, 1000);
                        return false;
                    }
                }
            }
        },false);
        
        document.getElementById("bideo").addEventListener('canplaythrough', function(num){
            // setTimeout(function(){ $('#deta_gif').hide(); }, 3000); 
        });

        document.getElementById("bideo").addEventListener('resize', function(){
            // console.log('resize!');
        });
        document.getElementById("bideo").addEventListener('webkitfullscreenchange', function(){
            VdetailObj.ToggleVideoSize();
        });
    }
    VdetailObj.goshikan = function(){
        $('#div_shikan').show()
        this.hedsetObj.on('tap','#div_shikan .p_zhi',function(){
            // console.log(this.hedsetObj) 
            $('#deta_gif').hide()
            $('#div_money').show()
            VdetailObj.moneydeta()
        })
    }
    VdetailObj.startTimers = function () {
        VdetailObj.ti_timers = setInterval(function () {
            $.alertMsg('資源加載中')
            VdetailObj.vddsq()
        }, 4000);
    }
    VdetailObj.vddsq = function(){
        var self = this;
        countsst = countsst + 1
        isVideoFullScreen = false
        var postData ={
            user_id:ConfigObj.meId,
            video_id:vid_id,
            domain_name_api:ConfigObj.localSite,
            domain_name_video:ConfigObj.hrefSite,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Video/video_watch',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info) 
                    VdetailObj.videts(res.info)
                    xzpl = res.info
                    $('#deta_gif').show()
                }
            }
        })
        // VdetailObj.vidmath(vid_id,Vid_cla,Vid_img) 
        if (countsst > 4) {
            if (self.ti_timers) {
                clearInterval(self.ti_timers);
                $.alertMsg('資源加載失敗請稍後重試')
            }
        }
    }
    VdetailObj.vicomment = function(rsd,tye){
        if (rsd == '8') { //video_comment_add lixl  updatePlay
            var Clas = Vid_cla
        }else{
            var Clas = rsd.class
        }
         Vid = vid_id
        var postData ={
            class:Clas,
            video_id:Vid,
            page:'1',
            type:tye,
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Video/video_comment',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) sp_acti Vnone
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    VdetailObj.viCommen(res.info)
                    VdetailObj.messObj(res.info)
                    console.log(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    VdetailObj.videts = function(red){
        // console.log(red)
        // console.log(Vid_img)
        if (red.addtime == undefined) {
            var LmatB = ''
        }else{
            var LmatB = red.addtime.substring(0,11)
        }
        var Nzan = red.liked_num
        var Ncai = red.step
        if (Nzan == '0' && Ncai == '0') {
            var Anumber = '100'
        }else{
            var nmm = (Nzan/(Nzan+Ncai))*100
            var Anumber = Math.round(nmm*Math.pow(10,1))/Math.pow(10,1)
        }
        //'+ (red.video_url == undefined ? '' : red.video_url)+' updatePlay
        // var Ljian = red.briefing.substring(0,7) lixl Vnone
        var html = '<div id="'+(red.video_url == undefined ? 'Vnone' : 'imgno')+'" class="hed_vid">\
                    <img class="vi_img '+(red.video_url == undefined ? 'imghid' : 'imgno')+'" src="'+Vid_img +'" alt="">\
                    <img class="img_bf '+(red.video_url == undefined ? 'imghid' : 'imgno')+'" src="images/find/video_play_normal.png" alt="">\
                    <video id="bideo"  class="'+(red.video_url == undefined ? 'vino' : 'vihid')+'" poster="'+ (red.cover_one == undefined ? Vid_img : red.cover_one)+'" controls="true" autoplay src="'+ (red.video_url == undefined ? '' : red.video_url)+'"></video>\
                    <img style="display:none;" id="deta_gif" src="images/gif/vid_gif.gif" alt="" />\
                    <div id="div_shikan" class="di_shikan center"><div class="div_abs"><p class="p_jie">試看結束，充值VIP會員觀看完整版視頻</p><a data-t="Achong" href="javascript:void(0)" class="p_zhi">'+(ConfigObj.share == 'Z' ? '免費獲取' : '充值會員')+'</a></div></div>\
                </div>\
                <div class="two_tit">\
                    <div class="div_w50 w60">\
                        <b>'+ red.title +'</b>\
                        <p>'+ LmatB +' · <span>'+ red.play_num +'</span>萬次播放</p>\
                    </div>\
                    <div class="div_w50 d_comment">\
                        <img id="'+(red.fabulous_inf == '' ? 'vid_dz' : '')+'" class="fl" src="'+(red.fabulous_inf == '1' ? 'images/find/zan_s.png' : 'images/find/praise_unpress.png' )+'" alt="">\
                        <p style="margin-top:10px;" class="p_line"> <span> '+ Anumber +'%覺得很贊</span><i class="i_abs"><i style="width:'+ Anumber +'%;" class="i_aftr"></i></i></p>\
                        <img id="'+(red.fabulous_inf == '' ? 'vid_cai' : '')+'" style="margin-top:8px;" class="fr" src="'+(red.fabulous_inf == '2' ? 'images/find/unpraise_press.png' : 'images/find/unpraise_unpress.png' )+'" alt="">\
                    </div>\
                </div>\
                <div class="d_pj">\
                    <div class="div_gray">\
                        <p class="p_w70">'+ red.briefing +'</p>\
                        <p class="p_w30">\
                            简介\
                        </p>\
                    </div>\
                </div>';
        var rep = '<li class="li_w7"><img src="images/find/common.png" alt="">&nbsp;&nbsp;<span>'+ red.comment_num+'熱評</span></li>\
                    <li class="li_w3" data-t="'+( red.user_fabulous == '' ? 'lixl' : '')+'"><img id="img_xh" src="'+(red.user_fabulous == '' ? 'images/find/favor_nopress.png' : 'images/find/favor_press.png')+'" alt=""></li>\
                    <li style="display:none;" class="li_w3" data-t="dexia"><img id="de_img" src="images/find/download_nopress.png" alt=""></li>\
                    <li class="li_w3" data-t="fenand" data-c="'+ ConfigObj.appDLUrl +'">\
                        <img src="images/find/send_nopress.png" alt="">\
                    </li>'
        $('#div_vio').html(html)
        $('#ul_rp').html(rep)
       /* video.onloadedmetadata = function () {  成功
            var vLength = video.duration;  Lcnxh
            console.log(vLength); 
        }*/
    }
    function myFunction(){
        var tim = $('#bideo')[0].duration 
        // console.log(tim)
        var hour = Math.floor (tim / 3600);
        var other = tim % 3600;
        var minute = Math.floor (other / 60);
        var second = (other % 60).toFixed ();
        if(minute<10) minute = '0' + minute;
        if(second<10) second = '0' + second;
        console.log(hour + ':' + minute + ':' + second)
        // document.getElementById ('duration').innerHTML = hour + '时' + minute + '分' + second + '秒';
            // var vLength = video.duration; 
            // console.log(vLength); 
    }
    VdetailObj.viCommen = function(sid){
        // console.log(sid) vid_dz updatePlay  addEventListener
        var Vlis = sid.video
        var html = ''
        for (var i = 0; i < Vlis.length; i++) {
            var vlist = Vlis[i]
            html += '<li data-t="Lcnxh" data-v="'+ vlist.id+'" data-i="'+ vlist.cover_one+'" data-c="'+vlist.class+'">\
                        <div class="li_div di_img">\
                            <img src="'+ vlist.cover_one +'" alt="">\
                        </div>\
                        <div class="li_div di_text">\
                            <b class="title">'+ vlist.briefing+'</b>\
                            <p class="p_bq">\
                                <span>年輕少婦</span>\
                                <span>家庭劇</span>\
                                <span>國產</span>\
                            </p>\
                            <p class="p_bf">'+ vlist.play_num+'萬次播放</p>\
                        </div>\
                    </li>'
        }
        gifNone()
        $('#vicnxh').html(html)
    }
    VdetailObj.messObj = function(re){
        // console.log(re.comment) image_comment_zan_focus
        var comen = re.comment
        var html = ''
        for (var i = 0; i < comen.length; i++) {
            var ime = comen[i]
            // var iph = ime.comment_user.substring(0,3)
            // var iph2 = ime.comment_user.substring(8,11) 
            var tim = ime.addtime.substring(11,20) 
            html += '<li class="li_me" data-t="dzan" data-v="'+ ime.user_id+'" data-z="'+ ime.id+'">\
                    <div class="div_link">\
                        <div class="dv w_10"><img class="im_w44" src="images/my/ic_head_s.png" alt=""></div>\
                        <div class="dv w_60">\
                            <p>***</p>\
                            <p class="p_gr">'+ tim +'</p>\
                        </div>\
                        <div class="dv w_20">\
                            <p> <span class="p_gr fl">'+ime.liked_num+'</span> <img data-z="'+ ime.id+'" data-v="'+ime.user_id+'" id="'+(ime.liked_num == '0' ? 'im_zans' : 'im_zanno')+'" class="im_zan" src="'+(ime.liked_num == '0' ? 'images/find/zan.png' : 'images/find/zan_s.png')+'" alt=""></p>\
                        </div>\
                    </div>\
                    <p class="p_cent">'+ ime.message+'</p>\
                </li>'
        }
        $('#lis_pl').html(html)
    }

    VdetailObj.Ajaxs = function(ty,Ud){
        // var usId = localStorage.getItem("numId") VdetailObj.updatePlay
        // var mobile = localStorage.getItem("mobile")
        // console.log(mobile)
        // console.log($('#textare').val()) img_xh
        console.log(ty)
        var mess = $('#textare').val()
        if (ty == '2') {
            if (mess == '') {$.alertMsg("請輸入評論內容");return false;}
            var postData ={
                user_id:ConfigObj.meId,
                video_id:vid_id,
                comment_user:ConfigObj.iphon,
                type:ty,
                comment_id:Ud,
                message:mess
            }
        }else if(ty == '3'){
            if (Ud == '5') {
                var postData ={
                    user_id:ConfigObj.meId,
                    video_id:vid_id,
                    type:ty,
                    video_type:'1'
                }
            }else if(Ud == '6'){
                var postData ={
                    user_id:ConfigObj.meId,
                    video_id:vid_id,
                    type:ty,
                    video_type:'2'
                }
            }else{
                var postData ={
                    user_id:ConfigObj.meId,
                    type:ty,
                    comment_id:Ud,
                }
            }
        }else{
            $('#img_xh').attr('src','images/find/favor_press.png')
            var postData ={
                user_id:ConfigObj.meId,
                video_id:vid_id,
                comment_user:ConfigObj.iphon,
                type:ty,
                comment_id:Ud,
                message:mess
            } 
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'Videointerface/video_comment_add',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    $('#di_pl').hide()
                    $('#textare').val('')
                    // if (ty == '3') {return false;}
                    if (res.info == '成功') {
                        // $.alertMsg(res.info) fenand
                        // console.log(ty)
                        if (ty == '1') {
                            $.alertMsg('收藏成功')
                        }else if(ty == '2'){
                            $.alertMsg('評論成功')
                        }else{
                            $.alertMsg('點讚成功')
                        }
                        // $.alertMsg(res.info)
                        VdetailObj.vicomment('8','1')
                    }else{
                        VdetailObj.vicomment(xzpl,'1')
                    }
                    // VdetailObj.show(true,function(){ vid_dz
                    // });
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id); 

            }
        })
    }
    
    VdetailObj.yzmQd = function(){ //点赞  
        $('#lis_pl').on('tap','#im_zans',function(){
            var thisZ = $(this).attr('data-z')
            var thisV = $(this).attr('data-v')
            if (thisV == ConfigObj.meId) {
                $.alertMsg('點讚失敗，不能給自己點讚')
                return false;
            }
            VdetailObj.Ajaxs('3',thisZ)
            // $(this).attr('src','images/find/image_comment_zan_focus.png')
            // VdetailObj.Ajaxs(3,5) Orderpay
        })
        $('#div_vio').on('tap','#vid_dz',function(){
            if ($(this).hasClass('clas') == true) {
                $.alertMsg('您已點讚')
                return false;
            }else{
                VdetailObj.Ajaxs(3,5)
            }
            $(this).addClass('clas')
            $(this).attr('src','images/find/zan_s.png')
            $.alertMsg('點讚成功')
        })
        $('#div_vio').on('tap','#vid_cai',function(){
             if ($(this).hasClass('cais') == true) {
                $.alertMsg('您已點讚')
                return false;
            }else{
                VdetailObj.Ajaxs(3,6)
            }
            $(this).addClass('cais')
            $(this).attr('src','images/find/unpraise_press.png')
            $.alertMsg('點讚成功')
        })
        $('#div_vio').on('tap','#Vnone',function(){
            if (loginObj.isLogin == false) {
                $.alertMsg('請先登錄'); 
                signInObj.goBack = function(){
                    signInObj.destroy();
                    VdetailObj.show();
                    Global.fixd()
                }
                signInObj.show();
                return false;
            }else{
                $.alertMsg('觀看次數已用完請先充值')
                $('#div_money').show()
                // console.log(arrs)
                VdetailObj.moneydeta()
                /*hedSetupObj.goBack = function(){
                    hedSetupObj.destroy();
                    VdetailObj.show();
                    // Global.fixd() hedSetupObj.goBack detilsFan
                }
                hedSetupObj.show(true,function(){
                    hedSetupObj.gochong()
                });*/
            }
            
        })
    }
    VdetailObj.moneydeta = function(){
        var obj = arrs
        var html = '';
         html += '<li id="ve_match" class="li_money">\
                        <a data-t="A_Gua" class="A_mon a_gun A_pad_tamin" href="javascript:void(0)"><i class="i_antime"></i>觀看次數不足，邀請好友免費看</a>\
                    </li>'; 
        if (ConfigObj.share == 'Z') {
            var re = arrs[0]
            html += '<li class="li_money">\
                        <a data-t="Amoney" data-v="'+ re.goods_price +'" data-d="'+ re.id+'" data-y="'+re.day+'" data-l="Alipay" class="A_mon a_data" href="javascript:void(0)">'+ re.goods_name+'</a>\
                    </li>';
        }else{
            for (var i = 0; i < arrs.length; i++) {
                var re = arrs[i]
                html += '<li class="li_money">\
                            <a data-t="Amoney" data-v="'+ re.goods_price +'" data-d="'+ re.id+'" data-y="'+re.day+'" data-l="Alipay" class="A_mon a_data" href="javascript:void(0)">'+ re.goods_name+'</a>\
                        </li>';
            }
        }
        // <a data-t="'+(Moneys >= re.goods_price ? 'Azuan' : 'Azuanbu')+'" data-v="'+ re.goods_price +'" data-y="'+re.day+'" data-z="'+re.goods_name+'" data-d="'+ re.id+'" data-l="Alipay" class="A_zuan '+(Moneys >= re.goods_price ? '' : 'shi_no')+'" href="javascript:void(0)">'+( Moneys >= re.goods_price ? '鑽石抵扣' : '鑽石不足')+'</a>\
        $('#ul_numbe').html(html)
        if (ConfigObj.share == 'Z') {
            $('#ve_match').show()
        }else{
            $('#ve_match').hide()
        }
    }
    VdetailObj.Vajaxplay = function(){
        var postData ={
            channel:ConfigObj.zdid,
            type:'3',
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/api/notice_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info.message)
                    if (ConfigObj.platForm === 'android') {
                        android_obj.sharePic(res.info.message)
                        // $.alertMsg('分享成功')
                    }
                }else{
                    console.log(res.err)
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    VdetailObj.ToggleVideoSize = function(){
        if(isVideoFullScreen)
        {
            // console.log('退出全屏'); fenand
            if(ConfigObj.platForm === 'android'){
                android_obj.setOrPort()
                // document.webkitCancelFullScreen()
            }
        }else
        {
            // console.log('进入全屏！');
            if(ConfigObj.platForm === 'android'){
                android_obj.setOrLand()
                // element.webkitRequestFullScreen()
            }
        }
        isVideoFullScreen=!isVideoFullScreen;
    }

    VdetailObj.onloadExecution = function(){
    	VdetailObj.createDomObj()
        VdetailObj.createEvent()
        VdetailObj.yzmQd()
        gifJson()
        
        if (ConfigObj.share == 'N') {
            $('#ve_show').hide()
        }else if(ConfigObj.share == 'Z'){
            $('#ve_show').hide()
        }else{

        }
    }
    VdetailObj.init = function(){
	 	VdetailObj.onloadExecution()
    }