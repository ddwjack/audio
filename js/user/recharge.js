    var rechargeObj = new PageController({
	   'name': 'recharge',
	   'tpl' : 'template/user/recharge.html'
    });
    rechargeObj.createDomObj = function(){
    	this.ClickObj = $(".rec_fan");
        this.hedsetObj = $("#recharge")
        // this.butfzObj = $(".but_nul_fz")
    }

    rechargeObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            rechargeObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回 VdetailObj
            rechargeObj.goBack()
        })
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.3)
        $('.img_love_hg').css('height',imag)
        var page = 1;
        var size = 10;
        $('#recharge').dropload({  
            scrollArea : window,
            distance : 20,
            loadDownFn:function(me){
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                var thisD = $('.ul_lei_zt').find('li.Liactive').attr('data-d');
                var Ares = []
                console.log()
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    client:client,
                    status:thisD,
                    page:page,
                    rows:'10',
                }
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/common/recharge_record',
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
                               for(var j=0; j<arrLen; j++){
                                result += '<div class="di_list_jl">\
                                            <ul class="ul_pad_rig">\
                                                <li class="w70 li_lis_char">\
                                                    <p class="p_money_re">充值'+ dat[j].money +'元\
                                                        <span class="sp_type_cz">【'+ ( dat[j].pay_type == 'alipay' ? '支付寶' : (dat[j].pay_type == 'wechat' ? '微信' : (dat[j].pay_type == 'tobank' ? '銀行卡' : '代理充值' ) ))+'】</span></p>\
                                                    <p class="p_time_re">'+ dat[j].created_date+'</p>\
                                                </li>\
                                                <li class="w30 li_lis_char"><p class="p_re_zt '+ (dat[j].status == '1' ? 'p_zt_ywc' : 'p_zt_wwc') +' ">'+ (dat[j].status == '1' ? '已完成' : '未完成') +'</p></li>\
                                            </ul>\
                                            <div class="di_ord_but">\
                                                <p class="p_hao link">訂單號：'+ dat[j].order_id +' \
                                                </p>\
                                                <p class="p_fuzhi link">[複製]\
                                                    <button class="but_nul_fz" data-l="1" id="btn_iphlod'+ j +'" data-clipboard-text="'+ dat[j].order_id +'" aria-label="複製成功！"></button>\
                                                </p>\
                                            </div>\
                                        </div>'
                                        Ares[j] = j
                                // $('#no_lov').css('display','none')
                                }
                            }else{
                                me.lock();
                                $.alertMsg('已經到底了，沒有更多了')
                                $('#love_hide').show()
                            }
                                $('#charg_list').append(result);
                                for (var i = 0; i < Ares.length; i++) {
                                    // console.log(Ares[i])
                                    var clipboards = new ClipboardJS(document.getElementById('btn_iphlod'+Ares[i]));
                                    clipboards.on('success', function(e) {
                                        var ms = e.trigger.getAttribute('aria-label');
                                        $.alertMsg(ms,true)
                                        e.clearSelection();
                                    });
                                }
                                me.resetload();
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        me.resetload();
                    }
                })
            }
        }) 
    }
    rechargeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                case "AgoKF" : rechargeObj.goKFim(thisObj);return true; //联系客服
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current VdetailObj
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "lovme" : rechargeObj.godetaObj();return true; //密码显示* 
                case "Licharge" : rechargeObj.goLicharge(thisObj);return true; //密码显示* 
            }
        }

    }

    /*rechargeObj.goMylove = function(obj){
        var typ = obj.attr('data-d')
        obj.addClass('cur').siblings().removeClass('cur')
        if (typ == '1') {
            $('.div_video_lt').show().siblings('.div_audio_lt,.div_dynam_lt').hide()
        }else if(typ == '2'){
            $('.div_audio_lt').show().siblings('.div_video_lt,.div_dynam_lt').hide()
        }else{
            $('.div_dynam_lt').show().siblings('.div_audio_lt,.div_video_lt').hide()
        }
    } */
    rechargeObj.goKFim = function () {
        goToKf()
    }
    rechargeObj.goLicharge = function(obj){
        var typ = obj.attr('data-d')
        obj.addClass('Liactive').siblings().removeClass('Liactive')
        rechargeObj.createEvent()
        console.log(typ)
        if (typ == '0') {
            rechargeObj.czhijlObj('-1')
        }else if(typ == '1'){
            rechargeObj.czhijlObj('1')
        }else{
            rechargeObj.czhijlObj('0')
        }
    }
    rechargeObj.czhijlObj = function(typ){
        // typ -1 全部  0 未完成 1  已完成
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            status:typ,
            page:'1',
            rows:'10',
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/recharge_record',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    rechargeObj.htmlList(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    rechargeObj.htmlList = function(res){
        var html = ''
        var Aarr = []
        for (var i = 0; i < res.length; i++) {
            html += '<div class="di_list_jl">\
                    <ul class="ul_pad_rig">\
                        <li class="w70 li_lis_char">\
                            <p class="p_money_re">充值'+ res[i].money +'元\
                                <span class="sp_type_cz">【'+ ( res[i].pay_type == 'alipay' ? '支付寶' : (res[i].pay_type == 'wechat' ? '微信' : (res[i].pay_type == 'tobank' ? '銀行卡' : '代理充值' ) ))+'】</span></p>\
                            <p class="p_time_re">'+ res[i].created_date+'</p>\
                        </li>\
                        <li class="w30 li_lis_char"><p class="p_re_zt '+ (res[i].status == '1' ? 'p_zt_ywc' : 'p_zt_wwc') +' ">'+ (res[i].status == '1' ? '已完成' : '未完成') +'</p></li>\
                    </ul>\
                    <div class="di_ord_but">\
                        <p class="p_hao link">訂單號：'+ res[i].order_id +' \
                        </p>\
                        <p class="p_fuzhi link">[複製]\
                            <button class="but_nul_fz" data-l="1" id="btn_iph'+ i +'" data-clipboard-text="'+ res[i].order_id +'" aria-label="複製成功！"></button>\
                        </p>\
                    </div>\
                </div>'
            Aarr[i] = i
        }
        // <input id="inpOrd" class="inp_order" type="text" value="'+ res[i].order_id +'">\
        //  <button id="btn_iph" data-clipboard-text="" aria-label="複製成功！" class="in_but">複製微信號</button>
        $('#charg_list').html(html)
        for (var i = 0; i < Aarr.length; i++) {
            var clipboards = new ClipboardJS(document.getElementById('btn_iph'+Aarr[i]));
            clipboards.on('success', function(e) {
                var ms = e.trigger.getAttribute('aria-label');
                $.alertMsg(ms,true)
                e.clearSelection();
            });
        }
        /*var clipboards = new ClipboardJS(document.getElementById('btn_iph'));
        clipboards.on('success', function(e) {
            var ms = e.trigger.getAttribute('aria-label');
            $.alertMsg(ms,true)
            e.clearSelection();
        });*/
        gifNone()
    }
    rechargeObj.reloadObj = function() {
        setTimeout(function() {
            rechargeObj.createDomObj()
            rechargeObj.createEvent()
            rechargeObj.czhijlObj('-1')
            gifJson()
        },100)
    }
    rechargeObj.onloadExecution = function(){
        rechargeObj.reloadObj()
    }
    rechargeObj.init = function(){
	 	rechargeObj.onloadExecution()
    }