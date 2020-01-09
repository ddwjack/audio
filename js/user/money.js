    var moneyObj = new PageController({
	   'name': 'money',
	   'tpl' : 'template/user/money.html'
    });
    moneyObj.createDomObj = function(){
    	this.ClickObj = $(".monFan");
        this.hedsetObj = $("#money") 
        this.gokfObj = $("#gotoKf") //聯繫客服
        // this.followObj = $(".aAbsolute") 

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            moneyObj.goBack()
        })
    }
    moneyObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            moneyObj.sectionEvent(e);
        });
        this.gokfObj.unbind('tap').tap(function() {
            goToKf()
        })
        /*this.followObj.unbind('tap').tap(function(e){ //关注
            imfollowObj.goBack = function(){
                imfollowObj.destroy();
                moneyObj.show(true);
                // Global.fixd()
            }
            imfollowObj.show(true,function(){
                // AvdetailsObj.goewm(invitationCode)
            });
        })*/
    }
    moneyObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                case "Agoumai" : moneyObj.goAgoumai(thisObj);return true; // 
                case "A_records" : moneyObj.gorecords(thisObj);return true; // 充值記錄
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "goplay" : moneyObj.goplay(thisObL);return true; //* 
                case "playTy" : moneyObj.playTy(thisObL);return true; //*
            }
        }
    }
    moneyObj.goplay = function(obj){
        obj.addClass('activ').siblings().removeClass('activ')
        $('#sp_jezs').html('￥'+obj.attr('data-m'))
    }
    moneyObj.gorecords = function(obj){
        rechargeObj.goBack = function(){
            rechargeObj.destroy();
            moneyObj.show();
        }
        rechargeObj.show(true,function(){
            // AvdetailsObj.goewm(invitationCode)
        });
    }
    moneyObj.playTy = function(obj){
        if (!$('#ulPlay').find('li').hasClass('activ')) {
            $.alertMsg('请先选择充值金额');
            return false;
        }
        obj.addClass('borLid').siblings().removeClass('borLid')
    }
    moneyObj.goAgoumai = function(obj){
        var thisM = $('#ulPlay').find('li.activ').attr('data-m')
        var thisI = $('#ulPlay').find('li.activ').attr('data-d')
        var thisL = $('#ulPlay').find('li.activ').attr('data-l')
        var thisG = $('#ulPlay').find('li.activ').attr('data-g')
        var thisD = $('#ulWechat').find('li.borLid').attr('data-d')
        var Gold = (thisL*1)+(thisG*1)
        console.log(Gold)
        // console.log(thisM)
        if (!$('#ulWechat').find('li').hasClass('borLid')) {
            $.alertMsg('请先选择充值方式');
            return false;
        }
        gifJson()
        if ( thisD == 'agent') {
            if (ConfigObj.platForm === 'android') {  
                android_obj.goPayWToKf(thisM)
                gifNone()
            }else if(ConfigObj.platForm === 'ios'){
                ios_obj.goPayWToKf(thisM)
                gifNone()
            }else{
                gifNone()
                console.log(24)
            }
        }else{
            moneyObj.goMoneyObj(thisM,thisD,thisI,Gold)
        }
    }
    /*moneyObj.updateType = function(obj){
        // setTimeout(function(){ $('#wh_ul').find('.new_opac').hide()},1000);
    }*/
    moneyObj.updatePlay = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:'1',
            mold:'gold'
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
                    moneyObj.gohtmltext(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    moneyObj.goMoneyObj = function(rm,ty,thisI,Gold){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:'1',
            money:rm,
            pay_type:ty,
            card_id:thisI,
            mold:'gold',
            gold:Gold
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
                    // console.log(res.info.url)
                    // window.location.href = res.info.url
                    if (ConfigObj.platForm == 'android') {
                        // window.location.href = 
                        android_obj.domyPay(res.info.url)
                    }else{
                        ios_obj.domyPay(res.info.url)
                    }
                    gifNone()
                    // moneyObj.gohtmltext(res.info)
                }else{
                    gifNone()
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    moneyObj.mobileObj = function(re){
        gifJson()
        console.log(re)
        if (re == '') {
            $('#mobli_hm').html('暫未綁定手機號')
        }else{
            $('#mobli_hm').html(re)
        }
    }
    moneyObj.gohtmltext = function(res){
        console.log(res.gold)
        var num = res.gold
        var list = res.list
        var payT = res.method
        var html = ''
        for (var i = 0; i < list.length; i++) {
            html += '<li class="w48 li_my_lt '+(i == '0'?'activ' : '')+'" data-t="goplay" data-m="'+ list[i].money+'" data-d="'+ list[i].id +'" data-l="'+ list[i].gold +'" data-g="'+ list[i].give +'">\
                        <span class="sp_left_fl"><b class="b_with">'+ list[i].gold +'金幣</b>￥'+ list[i].money +'</span>\
                        <span style="display:'+(list[i].extra == '' ? 'none' : 'block')+'" class="fr span_righ_fr">'+ list[i].extra +'</span>\
                    </li>'
        }
        $('#ulPlay').html(html)
        // console.log(payT)
        var htm = ''
        for (var i in payT) {
            // console.log(i)
            // console.log(payT)
            htm += '<li class="center '+(i == '0'?'borLid' : '')+'" data-t="playTy" data-d="'+ payT[i] +'">\
                        <img class="im_borno" src="'+ (payT[i] == 'alipay'? 'images/my/ali.png' : (payT[i] == 'tobank' ? 'images/my/yinlian.png' : ( payT[i] == 'wechat' ? 'images/my/wech.png' : '')))+'" alt="">\
                        <span>'+ (payT[i] == 'wechat'? '微信' : (payT[i] == 'tobank' ? '銀行卡' : ( payT[i] == 'alipay' ? '支付寶' : '代理充值'))) +'</span>\
                    </li>'
        }
        // console.log(num)
        var string =""+ num +"";//将数字转换成字符串形式  
        // console.log(string)
        format_number(string)
    　　/*var arr = string.split('.');//分割逗号;
    　　var num1 = arr[0]; 
    　　var reg = /(\d+)(\d{3})/;
        console.log(numbel)
    　　var Don = num1.replace(reg,'$1'+','+'$2')*/
        $('#ulWechat').html(htm)
        $('#sp_mony').html(numbel)
        $('#sp_jezs').html('￥'+list[0].money)
        gifNone()
    }
    function format_number(n) {
        if (n<1000) {
            return numbel = n
        }else{
            var b = parseInt(n).toString();
            var len = b.length;
            if (len <= 3) { return b; }
            var r = len % 3;
            return numbel =  r > 0 ? b.slice(0, r) + "," + b.slice(r, len).match(/\d{3}/g).join(",") : b.slice(r, len).match(/\d{3}/g).join(",");
        }
        
    }
    moneyObj.monloadObj = function() {
        setTimeout(function() {
            moneyObj.createDomObj()
            moneyObj.createEvent()
            moneyObj.updatePlay()
        },100)
    }
    moneyObj.onloadExecution = function(){
        moneyObj.monloadObj()
    }
    moneyObj.init = function(){
	 	moneyObj.onloadExecution()
    }