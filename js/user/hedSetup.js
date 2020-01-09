    var hedSetupObj = new PageController({
	   'name': 'hedSetup',
	   'tpl' : 'template/user/hedSetup.html'
    });
    hedSetupObj.createDomObj = function(){
    	// this.ClicklisObj = $(".hed_tuijl");
        this.hedsetObj = $("#hedSetup") //
        this.gofanhuObj = $("#im_fanhui") //

        
    }

    hedSetupObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            hedSetupObj.sectionEvent(e);
        });
        this.gofanhuObj.unbind('tap').tap(function(){
            // console.log(202)
            hedSetupObj.goBack()
        })
       /* this.ClicklisObj.unbind('tap').tap(function(){ //返回  protocol
            console.log(1111111)
            // hedSetupObj.goBack()
        })*/
    }
    hedSetupObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol 
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "Amoney" : hedSetupObj.goAmoney(thisObj);return true; //充值會員
                case "Azuan" : hedSetupObj.goAzuan(thisObj);return true; //鑽石充值 
                case "Asigin" : hedSetupObj.goAsiginss();return true; //會員登錄 
            }
        }
    }

    
    hedSetupObj.goAmoney = function(obj){
        this.count = 0;
        obj.addClass('color').siblings().removeClass('color')
        // var usId = localStorage.getItem("numId")
        //  金额  类型 渠道 userCenter_userName 3
        var thv = obj.attr('data-v');
        var thd = obj.attr('data-d');
        var thl = obj.attr('data-l');
        var postData ={
            money:thv,
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            order_type:thl,
            goods_id:thd
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Orderpay/order_add',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) userCenterObj. Asigin 
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    console.log(res.info.url)
                    // ordId = res.info.order_id
                    // hedSetupObj.startTimer(res.info.order_id)
                    if (ConfigObj.platForm == 'android') {
                        android_obj.domyPay(res.info.url,res.info.order_id)
                    }
                }else{
                    console.log(res.err)
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    hedSetupObj.startTimer = function () {
        setTimeout(function () {
            hedSetupObj.getPayStatus('first');
        }, 200);
        hedSetupObj.ticket_timer = setInterval(function () {
            hedSetupObj.getPayStatus();  
        }, 3000);
    }
    hedSetupObj.getPayStatus = function (type) {
        
    }
    hedSetupObj.updateStatus = function (type, itm) {
        console.log(type)
        var self = this;
        var html = '';
        if (type == 'success') { //成功 user_info_no
            // $('#M_recharge').hide()
            $.alertMsg('充值成功')
            clearInterval(hedSetupObj.ticket_timer);
        } else if (type == 'process') {
            // $.alertMsg('正在充值')
            console.log(310)
        }
    }
    hedSetupObj.goAzuan = function(){
        console.log('鑽石抵扣')
    }
    hedSetupObj.goAsiginss = function(){
        console.log(171)
        signInObj.goBack = function(){
            console.log(174)
            signInObj.destroy();
            hedSetupObj.show();
            // Global.fixd()
        }
        signInObj.show(true,function(){
            // $('#bdiph').hide()
        }); 
    }
    hedSetupObj.gochong = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
        // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', ciphertext
            url: ConfigObj.localSite+'/Orderpay/goods_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    hedSetupObj.titType(res.info)
                }else{
                    console.log(res.err)
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  

            }
        })
    }
    hedSetupObj.titType = function(obj){
        console.log(obj)
        var html = ''
        for (var i = 0; i < obj.length; i++) {
            var re = obj[i]
            html += '<li class="li_money">\
                        <a data-t="Amoney" data-v="'+ re.goods_price +'" data-d="'+ re.id+'" data-l="Alipay" class="A_mon" href="javascript:void(0)">'+ re.goods_name+'</a>\
                        <a data-t="Azuan" data-v="'+ re.goods_price +'" data-d="'+ re.id+'" data-l="Alipay" class="A_zuan" href="javascript:void(0)">'+( Moneys >= re.goods_price ? '鑽石抵扣' : '鑽石不足')+'</a>\
                    </li>';
        }
        $('#ul_numbe').html(html)
    }

    hedSetupObj.onloadExecution = function(){
    	hedSetupObj.createDomObj()
        hedSetupObj.createEvent()
    }
    hedSetupObj.init = function(){
	 	hedSetupObj.onloadExecution()
    }