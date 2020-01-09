    var dyShareObj = new PageController({
	   'name': 'dyShare',
	   'tpl' : 'template/dynamic/dyShare.html',
       'pullDistance': 220
    });

    dyShareObj.createDomObj = function(){
        this.hedsetObj = $("#Ashare");
    }
    
    dyShareObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            dyShareObj.sectionEvent(e);
        });
        console.log(15)
    }
    dyShareObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Aandroid" : dyShareObj.gosharObj(thisObj);return true; //分享 
                case "AhrefPag" : dyShareObj.goHrefObj(thisObj);return true; //跳转页面 
                case "Abaocun" : dyShareObj.gobaocun(thisObj);return true; //保存二维码 
                case "Acopy" : dyShareObj.gocopy(thisObj);return true; //复制二维码 
            }
        }
    }
       
    dyShareObj.gosharObj = function() {
        gifJson()
        sharePicObj(ConfigObj.yshare+ConfigObj.yshare_url)
    }
    dyShareObj.goHrefObj = function() {
        InvitationObj.goBack = function(){  // 绑定邀请码
            InvitationObj.destroy();
            dyShareObj.show();
            Global.fixd()
        }
        InvitationObj.show(true); 
    }
    dyShareObj.gobaocun = function(obj) {
        if (ConfigObj.platForm === 'android') {
            android_obj.savePic(ConfigObj.yshare_url)
        }else{
            ios_obj.savePic(ConfigObj.yshare_url)
        }
    }
    dyShareObj.dycopy = function (argument) {
        dyShareObj.vipTime()
        // console.log(timeDay)
    }
    dyShareObj.timeObj = function(time,over){
        console.log(over)
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
    dyShareObj.vipTime = function () {
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
                var newTime = res.time
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    ConfigObj.yshare_url = res.info.url //分享地址 
                    ConfigObj.yshare = res.info.title //分享文字
                    ConfigObj.dowand = res.info.download
                    ConfigObj.userNum = res.info.users
                    console.log(newTime)
                    $('#span_number').html(ConfigObj.userNum)
                    dyShareObj.timeObj(newTime,ConfigObj.expiry)
                    console.log(timeDay)
                    if (ConfigObj.userNum != '0') {
                        if (timeDay <= '0') {
                            $('#vipDay').html('VIP体验卡<span>0</span>天')
                            $('#timeDay').html('邀请好友，赢取会员')
                        }else{
                            $('#vipDay').html('VIP体验卡<span>'+timeDay+'</span>天')
                            $('#timeDay').html('有效期至:'+ConfigObj.expiry.replace(/-/g,'/'))
                        }
                    }else{
                        $('#vipDay').html('VIP体验卡<span>0</span>天')
                        $('#timeDay').html('邀请好友，赢取会员')
                    }
                    $('#shareCode').qrcode(ConfigObj.yshare_url);
                    $('#span_yqm').html(invitationCode)
                    $('#Acopy_but').attr('data-clipboard-text',ConfigObj.yshare+ConfigObj.yshare_url)
                    var clipboard = new ClipboardJS(document.getElementById('Acopy_but'));
                    clipboard.on('success', function(e) {
                        var ms = e.trigger.getAttribute('aria-label');
                        $.alertMsg(ms,true)
                        e.clearSelection();
                    });
                    
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    dyShareObj.onloadExecution = function(){
    	dyShareObj.createDomObj()
        dyShareObj.createEvent()
        dyShareObj.dycopy()
    }
    dyShareObj.init = function(){
	 	dyShareObj.onloadExecution()
    }    