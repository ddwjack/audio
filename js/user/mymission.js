    var mymissionObj = new PageController({
	   'name': 'mymission',
	   'tpl' : 'template/user/mymission.html'
    });
    mymissionObj.createDomObj = function(){
    	this.ClickObj = $(".miss_fan");
        this.hedsetObj = $("#mission")
    }

    mymissionObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            mymissionObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回
            mymissionObj.goBack()
        })
    }
    mymissionObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "qian" : mymissionObj.qianObj(thisObj);return true; //簽到
                case "yiqian" : mymissionObj.yiqianObj(thisObj);return true; //已簽到
                case "Lmoney" : mymissionObj.LmoneyObj(thisObj);return true; //充值
                case "Lgift" : mymissionObj.LgiftObj(thisObj);return true; //送禮物 參與直播 關注主播
                case "Lbann" : mymissionObj.LbannObj(thisObj);return true; //點擊廣告
                case "Lfxian" : mymissionObj.LfxianObj(thisObj);return true; //分享個好友
                case "Lvidk" : mymissionObj.LvidkObj(thisObj);return true; //看視頻
                case "Lbooks" : mymissionObj.LbooksObj(thisObj);return true; //聽書
            }
        }

        /*var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                case "account" : mymissionObj.accountRecord();return true; //账户管理
            }
        }*/
    }
    
    mymissionObj.LmoneyObj = function(obj){
        moneyObj.goBack = function(){
            moneyObj.destroy();
            mymissionObj.show(true);
        }
        moneyObj.show(true,function(){
            moneyObj.mobileObj(ConfigObj.iphon)
        });
    }
    mymissionObj.LgiftObj = function(obj){
        footballObj.goBack = function(){
            footballObj.destroy();
            mymissionObj.show(true);
        }
        footballObj.show(true,function(){
            Global.fixd()
        });
    }
    mymissionObj.LbannObj = function(obj){
        $.alertMsg('敬请期待')
        /*AdvertisingObj.goBack = function(){
            AdvertisingObj.destroy();
            mymissionObj.show(true);
        }
        AdvertisingObj.show(true,function(){
        });*/
    }   
    mymissionObj.LfxianObj = function(obj){
        mycodeObj.goBack = function(){
            mycodeObj.destroy();
            mymissionObj.show(true);
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(invitationCode,ConfigObj.yshare_url,ConfigObj.yshare)
        });
    }
    mymissionObj.LvidkObj = function(obj){
        // homeObj.show(true)
        // Global.fixd()
        homeObj.goBack = function(){
            homeObj.destroy();
            mymissionObj.show(true);
        }
        homeObj.show(true,function(){
            homeObj.onloadExecution();
            homeObj.setDefConfig();
            Global.fixd()
        });
    }
    mymissionObj.LbooksObj = function(obj){
        kaijiangIndexObj.goBack = function(){
            kaijiangIndexObj.destroy();
            mymissionObj.show(true);
        }
        kaijiangIndexObj.show(true,function(){
            Global.fixd()
        });
    }
    mymissionObj.miscontObj = function(){
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/user/task_center',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    mymissionObj.gomissiontext(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    mymissionObj.qianObj = function(obj){
        // gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/user/sign',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    $.alertMsg('+'+res.info.exp+'經驗&nbsp;&nbsp;&nbsp;&nbsp;<p>簽到成功</p>')
                        var htm2 = '<a class="A_tap" href="javascript:void(0)">已簽到</a>'
                        $('#sp_qiandao').attr('data-t','yiqian')
                        $('#sp_qiandao').html(htm2)
                    gifNone()
                    // mymissionObj.miscontObj() '+ res.info.exp +'
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    mymissionObj.yiqianObj = function(obj){
        $.alertMsg('您已簽到')
    }
    mymissionObj.gomissiontext = function(res){
        console.log(res)
        gifNone()
        $('#img_myuser').attr('src',ConfigObj.pic)
        var exp = res.exp
        var Mexp = res.level.max_exp
        var prop = exp/Mexp
        var sign = res.sign
        var hand = res.handles
        // console.log(res)
        $('#img_pic').attr('src',ConfigObj.pic)
        $('#p_VIP').html('Lv.'+res.grade)
        $('#sp_exp').html(exp+'/'+Mexp)
        $('#i_pro_bi').css('width',(prop*100)+'%')
        $('#p_day').html(sign)
        // if (sign =='1') {}
        // console.log(sign)
        var html ='<p style="width:'+(sign >= '3' ?'16%;' :(sign >= '7' ? '32%' :(sign >= '10' ? '48%' :(sign >= '15' ? '54%;' : (sign>= '28' ? '80%;' : '0')))))+'" class="p_wid_bai"></p>\
                <li class="li_mission"><img class="img_mission" src="'+( sign >= '1' ? 'images/me/day1.png' : 'images/me/mis1.png')+'" alt="#"><p>1天</p></li>\
                <li class="li_mission"><img class="img_mission" src="'+( sign >= '3' ? 'images/me/day2.png' : 'images/me/mis1.png')+'" alt="#"><p>3天</p></li>\
                <li class="li_mission"><img class="img_mission" src="'+( sign >= '7' ? 'images/me/day3.png' : 'images/me/mis1.png')+'" alt="#"><p>7天</p></li>\
                <li class="li_mission"><img class="img_mission" src="'+( sign >= '10' ? 'images/me/day4.png' : 'images/me/mis1.png')+'" alt="#"><p>10天</p></li>\
                <li class="li_mission"><img class="img_mission" src="'+( sign >= '15' ? 'images/me/day5.png' : 'images/me/mis1.png')+'" alt="#"><p>15天</p></li>\
                <li class="li_mission"><img class="img_mission" src="'+( sign >= '28' ? 'images/me/day6.png' : 'images/me/mis1.png')+'" alt="#"><p>28天</p></li>'

        $('#ul_jibie_lt').html(html)
        if (hand.ToSign.attain == '0') {
            /*var htm2 = '<a class="A_tap" href="javascript:void(0)">簽到</a>'
            $('#sp_qiandao').attr('data-t','qian')*/
            var htm2 = '<a class="A_tap" href="javascript:void(0)">已簽到</a>'
            $('#sp_qiandao').attr('data-t','yiqian')
            mymissionObj.qianObj()
            // alert(1)
        }else{
            var htm2 = '<a class="A_tap" href="javascript:void(0)">已簽到</a>'
            $('#sp_qiandao').attr('data-t','yiqian')
        }
        $('#sp_qiandao').html(htm2)

       /* var rad = hand.ToReload
        $('#sp_gift').html(rad.attain+'/'+rad.max)*/

        var gif = hand.GiveGift
        $('#sp_gift').html(gif.attain+'/'+gif.max)

        var liv = hand.ClickAdvertise
        $('#sp_guan').html(liv.attain+'/'+liv.max)

        var lis = hand.ToShare
        $('#sp_fenx').html(lis.attain+'/'+lis.max)


        var hav = hand.HaveLiving
        $('#sp_cany').html(hav.attain+'/'+hav.max)

        var fol = hand.FollowAnchor
        $('#sp_gzhu').html(fol.attain+'/'+fol.max)

        var wat = hand.WatchVideo
        $('#sp_vide').html(wat.attain+'/'+wat.max)

        var nov = hand.ListenNovel
        $('#sp_book').html(nov.attain+'/'+nov.max)

    }
    mymissionObj.misloadObj = function() {
        setTimeout(function() {
            mymissionObj.createDomObj()
            mymissionObj.createEvent()
            mymissionObj.miscontObj()
        },100)
    }
    mymissionObj.onloadExecution = function(){
    	mymissionObj.misloadObj()
    }
    mymissionObj.init = function(){
	 	mymissionObj.onloadExecution()
    }