    var OfflineObj = new PageController({
	   'name': 'Offline',
	   'tpl' : 'template/user/Offline.html'
    });
    OfflineObj.createDomObj = function(){
    	this.ClickObj = $(".offline_fan");
        this.hedsetObj = $("#offline")

        this.ClickObj.tap(function(e){ //返回
            OfflineObj.goBack()
        })

        $('.feed_ul li').tap(function(){
            $(this).addClass('active').siblings().removeClass('active')
            $('.div_feed div.not_div').eq($(this).index()).show().siblings().hide()
        })
    }

    OfflineObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            OfflineObj.sectionEvent(e);
        });
    }
    OfflineObj.setVideo = function(){
        /*if (ConfigObj.platForm == 'android') {
            var usId = localStorage.getItem("numId")
            var postData ={
                user_id:usId
            }
        }else{*/
            var postData ={
                channel:ConfigObj.zdid,
                app_key:ConfigObj.appkey,
                user_id:ConfigObj.meId,
            }
        // }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite + '?version=1&m=system.AppInfo.getapp_new', ciphertext
                url: ConfigObj.localSite+'/api/user_watch_caching',
                data: secretData,
                type: "post",
                dataType: "json",
                success:function(res){
                    // var fo = Global.crypt(res)
                    if (res.ok == true) {
                        res.info = $.parseJSON(Global.crypt(res.result));
                        OfflineObj.setText(res.info)
                    }else{
                       $.alertMsg(res.err) 
                    }
                    // localStorage.setItem("channel", res.info.channel_id);  fixed

                }
            })
    }
    OfflineObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "account" : OfflineObj.accountRecord();return true; //账户管理
            }
        }
    }

    OfflineObj.setText = function(re){
        var ht = android_obj.getVideoUrl()
        // var ht = '/storagisp/46.mp4,/storasp/164.mp4,/stoeo/isp/144.mp4'
        if (ht == '') {
            return false;
        }else{
            var s = ht;
            var ss = s.split(",");// 在每个逗号(,)处进行分解  
            var St3 = ht.match(/\d+\./g);
        }
        var html = ''

        // console.log(St3.length)
        for (var i = 0; i < re.length; i++) {
            // console.log(St3[i].length)
            var res = re[i]
            html += '<li class="div_cen" style="width:100%; '+( ss[i] == undefined ? 'display:none' : '')+'" >\
                        <div class="div_slid">\
                            <video style="width:100%;max-height:240px;" class="video" poster="'+ res.cover_one+'" controls src="'+(ss[i] == undefined ? '' : ss[i])+'"></video>\
                        </div>\
                        <div class="div_text">\
                        <div class="div_ink d_cs" style="width:54%;">\
                            <p id="p_over" class="p_cs">'+ res.title +' </p>\
                        </div>\
                        <div class="div_ink div_icon" style="width:40%;">\
                            <p class="p_right">0.4萬次播放</p>\
                        </div>\
                    </div>\
                </li>'
        }
        $('#ul_set').html(html)
    }

    OfflineObj.onloadExecution = function(){
    	OfflineObj.createDomObj()
        OfflineObj.createEvent()
        OfflineObj.setVideo()
    }
    OfflineObj.init = function(){
	 	OfflineObj.onloadExecution()
    }