    var myfreeObj = new PageController({
	   'name': 'myfree',
	   'tpl' : 'template/user/myfree.html'
    });
    myfreeObj.createDomObj = function(){
    	this.ClickObj = $(".free_fan");
        this.hedsetObj = $("#myfree") 
    }

    myfreeObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            myfreeObj.goBack()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            myfreeObj.sectionEvent(e);
        });
        // console.log()
    }
    myfreeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//
            switch (thisT){
                case "yqhy" : myfreeObj.goyqhy(thisObj);return true; //   

            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//
            switch (thisT){
                case "jysj" : myfreeObj.gojysj(thisObL);return true; //   校验手机  
                case "yqhy" : myfreeObj.goyqhy(thisObL);return true; //   分享好友  
                case "band" : myfreeObj.goband(thisObL);return true; //   绑定邀请码  
                case "liType" : myfreeObj.gozhiType(thisObL);return true; //  充值金額    
                case "moneyType" : myfreeObj.gomoneyType(thisObL);return true; //  充值方式    
                case "Customer" : myfreeObj.goCustomer(thisObL);return true; //  聯繫客服    
                case "purchase" : myfreeObj.gopurchase(thisObL);return true; //  確認購買    
            }
        }
    }
    myfreeObj.gojysj = function (obj) {
        if (ConfigObj.auth_mobile != '0') {
            $.alertMsg('请勿重复校验') 
           return false;
        }
        checkObj.goBack = function(){
            checkObj.destroy()
            myfreeObj.show();
        }
        checkObj.show(true,function(){
        });
    }

    myfreeObj.goyqhy = function (obj) {
        dyShareObj.goBack = function(){
            dyShareObj.destroy();
            myfreeObj.show();
        }
        dyShareObj.show();
        Global.fixd()
    }
    myfreeObj.goband = function (obj) {
        InvitationObj.goBack = function(){  // 绑定邀请码
            InvitationObj.destroy();
            myfreeObj.show();
        }
        InvitationObj.show(true); 
    }
    myfreeObj.gozhiType = function (obj) {
        obj.addClass('xz_icon_img').siblings().removeClass('xz_icon_img')
        $('#span_money_gm').html('￥'+obj.attr('data-m'))
    }
    myfreeObj.gomoneyType = function (obj) {
        obj.addClass('active').siblings().removeClass('active')
    }
    // 聯繫客服
    myfreeObj.goCustomer = function (obj) {
        gifJson()
        if (ConfigObj.platForm === 'android') {  
            // android_obj.goPayWToKf(thisM)  
            android_obj.goToKf()  
            gifNone()
        }else if(ConfigObj.platForm === 'ios'){
            // ios_obj.goPayWToKf(thisM)
            ios_obj.goToKf()
            gifNone()
        }else{
            gifNone()
        }
    }
    myfreeObj.gopurchase = function(obj) {
        if (!$('.ul_payle_type').find('li').hasClass('active')) {
            $.alertMsg('请先选择充值方式');
            return false;
        }
        gifJson()
        var thisM = $('#ul_vip_list').find('li.xz_icon_img').attr('data-m')
        var thisI = $('#ul_vip_list').find('li.xz_icon_img').attr('data-d')
        var thisV = $('#ul_vip_list').find('li.xz_icon_img').attr('data-v')
        var thisG = $('#ul_vip_list').find('li.xz_icon_img').attr('data-g')
        var thisD = $('#moneyType_list').find('li.active').attr('data-d')
        // console.log(thisM)
        if (thisV == '1') {
            var htText = 'VIP月卡,'
        }else if (thisV == '2') {
            var htText = 'VIP季卡,'
        }else if(thisV == '3'){
            var htText = 'VIP永久卡,'
        }else{
            // if (ConfigObj.expiry) {}
            $('#p_nm_cis').html(ConfigObj.pNum+'/'+ConfigObj.pwat+'次')
            $('#imgTextdr').html('當日有效')
        }
        if ( thisD == 'agent') {
            // console.log(htText+thisM)
            if (ConfigObj.platForm === 'android') {  
                android_obj.goPayWToKf(htText+thisM)
                gifNone()
            }else if(ConfigObj.platForm === 'ios'){
                ios_obj.goPayWToKf(htText+thisM)
                gifNone()
            }else{
                gifNone()
                console.log(htText+thisM)
                // console.log(24)
            }
        }else{
            myfreeObj.goMoneyObj(thisM,thisD,thisI,thisV,thisG)
        }
    }
    myfreeObj.timeObj = function(time,over){
        console.log(time)
            // var over = '2019-12-22 12:04:48'
        if (over == '') {
            return timeDay = '0'
        }else{
            // var over = '2019-12-22 12:04:48'
            var curTime = new Date(parseInt(time) * 1000);
            var postTime = new Date(over.replace(/-/g,'/'));
            var timeDiff = postTime.getTime() - curTime.getTime();
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
            if (exceedMin < 0) {
                return timeDay = '0'
            }else{
                if(exceedWeek > 0){
                    return timeDay = (exceedDay+1) 
                }else{
                    if(exceedDay < 7 && exceedDay > 0){
                        return timeDay = (exceedDay+1)
                    }else{
                        if(exceedHour < 24 && exceedHour > 0){
                        // return timeDay = exceedHour
                        return timeDay = '1'
                        }else{
                            // return timeDay = exceedMin
                            return timeDay = '1'
                        }
                    }
                }
            }
        }
    }
    myfreeObj.goewm = function(dc,zc){
        /*ConfigObj.power = res.info.power
                    ConfigObj.pNum = res.info.surplus_num
                    ConfigObj.pwat = res.info.more_watch*/
        /*if (ConfigObj.power == '1') {
            $('#imgTextdr').html('永久有效')
            $('#p_nm_cis').html('無限次數')
        }else{
            $('#p_nm_cis').html(dc+'/'+zc+'次')
            $('#imgTextdr').html('當日有效')
        }*/
    }
    myfreeObj.gohtmltext = function (AtimeObj,res) {
        myfreeObj.timeObj(AtimeObj,ConfigObj.expiry)
        console.log(timeDay)
        // ConfigObj.pwat = res.info.more_watch  // 總觀看次數
        var html = ''
        var htm = ''
        var Avip = res.vip
        var expi = res.expiry
        var list = res.list
        var payT = res.method
        console.log(200)
        // substring
        if (ConfigObj.power == '1' || ConfigObj.Avip != '0') {
            if (Avip == '1') {
                $('#imgTextdr').html('月卡')
                $('#p_nm_cis').html('截止日期到：'+expi)
            }else if(Avip == '2'){
                $('#imgTextdr').html('季卡')
                $('#p_nm_cis').html('截止日期到：'+expi)
            }else if(Avip == '3'){
                $('#imgTextdr').html('尊享永久版')
                $('#p_nm_cis').html('永久有效')
            }else{
                $('#p_nm_cis').html(timeDay+'日有效')
                $('#imgTextdr').html('VIP体验卡')
            }
        }else{
            $('#p_nm_cis').html(ConfigObj.pNum+'/'+ConfigObj.pwat+'次')
            $('#imgTextdr').html('當日有效')
            
        }
        for (var i = 0; i < list.length; i++) {
            var lst = list[i]
            if (lst.vip != '3') {
                html += '<li data-t="liType" data-m="'+ lst.money +'" data-d="'+ lst.id +'" data-v="'+ lst.vip +'" data-g="'+ lst.give +'">\
                        <p class="p_url_ty">'+( lst.vip == '1' ? '月卡' : (lst.vip == '2' ? '季卡' : '')) +' <span>￥'+ lst.money +'</span></p>\
                        <p class="p_zs_jb">'+lst.extra+'</p>\
                        <p class="p_jd_typ">'+( lst.vip == '1' ? '1' : '3' )+'個月不限次觀看</p>\
                    </li>'
            }else{
                html += '<li data-t="liType" data-m="'+ lst.money +'" data-d="'+ lst.id +'" data-v="'+ lst.vip +'" data-g="'+ lst.give +'" class="div_back_color xz_icon_img">\
                            <i class="i_icon_tjian"></i>\
                            <p class="p_title_tex">尊享永久版<span>￥'+ lst.money +'</span></p>\
                            <p class="p_zs_mony">'+lst.extra+'<span> | 永久免費觀看</span></p>\
                        </li>'
            }  
        }
        $('#ul_vip_list').html(html)

        for (var i in payT) {
            htm += '<li data-t="moneyType" data-d="'+ payT[i] +'" class="'+(i == '0' ? 'active' : '')+'">\
                <img style="display: '+(payT[i] == 'agent' ? 'none;' : 'inline-block')+'" src="'+ (payT[i] == 'alipay'? 'images/my/ali.png' : (payT[i] == 'tobank' ? 'images/my/yinlian.png' : ( payT[i] == 'wechat' ? 'images/my/wech.png' : '')))+'" alt="#">\
                '+ (payT[i] == 'wechat'? '微信' : (payT[i] == 'tobank' ? '銀行卡' : ( payT[i] == 'alipay' ? '支付寶' : '代理充值'))) +'</li>'
        }
        $('#moneyType_list').html(htm)
        $('#span_money_gm').html('￥'+$('#ul_vip_list').find('li.xz_icon_img').attr('data-m'))
        gifNone()
    }
    /*myfreeObj.nameObj = function(){
        nextNameObj.goBack = function(){
            nextNameObj.destroy();
            myfreeObj.show(true);
        }
        nextNameObj.show(true);
    }*/
    myfreeObj.updatePlay = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:'',
            mold:'vip'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/cashier', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    var AtimeObj = res.time
                    myfreeObj.gohtmltext(AtimeObj,res.info)

                    // console.log(AtimeObj)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myfreeObj.goMoneyObj = function(rm,ty,thisI,thisV,thisG){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:'',
            money:rm,
            pay_type:ty,
            card_id:thisI,
            mold:'vip',
            vip:thisV,
            gold:thisG
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/payment', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info.url)
                    // window.location.href = res.info.url  
                    if (ConfigObj.platForm == 'android') {
                        android_obj.domyPay(res.info.url)
                    }else if(ConfigObj.platForm == 'ios'){
                        ios_obj.domyPay(res.info.url)
                    }else{
                        // window.location.href = res.info.url
                    }
                    gifNone()
                }else{
                    gifNone()
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myfreeObj.onloadExecution = function(){
    	myfreeObj.createDomObj()
        myfreeObj.createEvent()
        myfreeObj.updatePlay()
    }
    myfreeObj.init = function(){
	 	myfreeObj.onloadExecution()
    }