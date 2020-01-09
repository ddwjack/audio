    var userdetailsObj = new PageController({
	   'name': 'userdetails',
	   'tpl' : 'template/dynamic/userdetails.html'
    });
    userdetailsObj.createDomObj = function(){
    	this.ClickObj = $(".useFan");
        this.hedsetObj = $("#userdetails") 
        this.formplObj = $("#inplun") 
        this.fenxiangObj = $("#img_fenx") // 分享
    }

    
    userdetailsObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            userdetailsObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            userdetailsObj.goBack(usscTop)
        })
        this.fenxiangObj.unbind('tap').tap(function() {
            gifJson()
            sharePicObj(ConfigObj.yshare+ConfigObj.yshare_url)
        })
        /*this.formplObj.unbind('tap').tap(function(e){ //返回
            userdetailsObj.goBack()
        })*/
        this.formplObj.bind('keyup', function(event) {
            if (event.keyCode == "13") {
                userdetailsObj.subplObj()
            }
        });
        $('#inplun').focus(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()+300)
            $('body').scrollTop(300)
            }
        })
        // 失去焦点时重新回到原来的状态
        $('#inplun').blur(function(e){
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if(isAndroid){
            $('body').height( $('body').height()-300)
            $('body').scrollTop(0)
            }
        })
        /*this.formplObj.onsubmit = function(){
            alert(23)
            userdetailsObj.replyObj()
            // $scope.searchOrder();
        };*/
    }
    /*userdetailsObj.sousu = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            userdetailsObj.show();
        }
        searchObj.show(2);
    }*/
    userdetailsObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_follow" : userdetailsObj.gofollow(thisObj);return true; //最多播放
                case "a_tuij" : userdetailsObj.gotuij(thisObj);return true; //最近更新  
                case "a_kuoz" : userdetailsObj.gokuoz(thisObj);return true; //最多喜欢  
                case "userdian" : userdetailsObj.userdian(thisObj);return true; //点赞动态   
                case "lyzan" : userdetailsObj.golyzan(thisObj);return true; //点赞留言    
                case "Adyflooat" : userdetailsObj.Adyflooat(thisObj);return true; //关注
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "reply" : userdetailsObj.replyObj(thisObL);return true; //*  
                case "img_deta" : userdetailsObj.goimgDeta(thisObL);return true; //*  

            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "reply" : userdetailsObj.replyObj(thisObL);return true; //*  
                case "img_deta" : userdetailsObj.goimgDeta(thisObL);return true; //*  

            }
        }
    }
    userdetailsObj.gofollow = function(obj){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('active');
        obj.addClass('active');
        $('.center_gz').show().siblings('.center_tj').hide()
        // var clId = $('.kjTitleObj').find('li.on').attr('data-v')
    }
    userdetailsObj.dtalmessag = function(res){
        // console.log(res)
        anchorId = res.anchor_id
        var html = '' 
        var re = res
        var tim = re.created_date.replace(12,19)
        var str = re.images;
        var img = str.split(',');
        html += '<div class="p_user">\
            <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="link w86" href="javascript:void(0)">\
                <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                <p class="p_lx">'+ re.craft +'</p>\
            </a>';
            if (re.followed == '0') {
                html += '<a data-t="Adyflooat" data-d="'+ re.anchor_id +'" class="link w12" href="javascript:void(0)">+關注</a>'
            }else{
                html += '<a data-t="Adyflooat" data-d="'+ re.anchor_id +'" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
            }
        html += '</div>\
        <div><p class="texCent">'+ re.message +'</p></div>'
            /*if (re.video != '') {
                html += '<video id="dy_video"  class="" poster controls="true"  src="'+ re.video +'"></video>'
            }*/
            if (img.length == '1' && img != '') {
                    var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                        html +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-z="1" data-g="'+ img[0]+'" class="W100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                </ul>'
            }else if(img.length == '2'){
                var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                        html +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-z="1" data-g="'+ img[0]+'" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-z="2" data-g="'+ img[1]+'" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                </ul>'
            }else if(img.length >= '3'){
                var len = img.length - '3'
                var hie1 = Math.floor(((document.documentElement.clientWidth - 32)*0.7)/1.2)
                var hie2 = Math.floor(((document.documentElement.clientWidth - 32)*0.29)/1)
                html += '<ul class="ul_img">\
                            <li data-t="img_deta" data-m="'+ re.id +'" data-z="1" data-g="'+ img[0]+'" class="w70" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                            <li class="w28">\
                                <p data-t="img_deta" data-m="'+ re.id +'" data-z="2" data-g="'+ img[1]+'" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                <p style="height: 3px;"></p>\
                                <p data-t="img_deta" data-m="'+ re.id +'" data-z="3" data-g="'+ img[2]+'" class="pAfter" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                            </li>\
                        </ul>'
            }
        html += '<p class="center">\
                    <a data-t="userdian" href="javascript:void(0)"><img id="imdian" class="img_pad" src="'+ (re.thumbed == '0' ? 'images/room/zan.png' : 'images/room/wzan.png') +'" alt=""></a><br/>\
                    <span id="spanNum" class="col_num">'+ re.thumbs +'</span>\
                </p>'
                console.log(re.collected)
        if (re.collected == '0') {
            $('#img_shouc').attr('src','images/room/wei.png')
        }else{
            $('#img_shouc').attr('src','images/room/wu.png')
        }
        $('#livedynam').html(html)
        $('#user_img').attr('src',ConfigObj.pic)
    }
    userdetailsObj.pinglist = function(res){
        var html = ''
        // thumbed  0是未点赞 1 是用戶已點讚
            html += '<p class="p_zxpl"><img class="mar10" src="images/dynamic/pinglun.png" alt="">最新评论&nbsp;&nbsp;('+ res.length +')</p>'
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i])
            var re = res[i]
            var tim = re.created_date.substring(11,19)
            html += '<div class="div_after pl_list">\
                        <ul>\
                            <li class="w100 div_namic">\
                                <a class="link w49 names" href="javascript:void(0)">\
                                    <img class="img_user fl" src="'+ re.avatar_url+'" alt="">\
                                    <p class="p_font">'+ re.nickname+'</p>\
                                    <p class="p_lx">'+ tim +'</p>\
                                </a>\
                                <a data-t="lyzan" data-d="'+ re.id +'" class="link w49 numbers" href="javascript:void(0)">\
                                    <img style="width:14px;" src="'+ (re.thumbed == '0' ? 'images/dynamic/zan.png' : 'images/dynamic/zans.png') +'" alt=""><span class="page">'+ re.thumbs +'</span></a>\
                            </li>\
                        </ul>\
                        <p class="w70">'+ re.message +'</p>\
                    </div>'
        }
        $('#plunList').html(html)
        gifNone()
    }
    userdetailsObj.detail = function(id,nm,scTop){
        $('#spmynmz').html('@'+nm)
        enclosureId = id
        usscTop = scTop
    }
    userdetailsObj.goimgDeta = function(obj){
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z')
        // console.log(enclosureId)
        // console.log(thisG)
        nodisturbObj.goBack = function(){
            nodisturbObj.destroy();
            userdetailsObj.show();
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(enclosureId,thisG,0,thisZ)
        });
    }
    userdetailsObj.ajadeta = function(){
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:enclosureId
        } 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/live/enclosure_detail',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    userdetailsObj.dtalmessag(res.info)
                    userdetailsObj.pinglist(res.info.reply_list)
                    // userdetailsObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    userdetailsObj.replyObj = function(obj){
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:enclosureId
        } 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/enclosure_collect',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    if (res.suc == '取消收藏') {
                        $('#img_shouc').attr('src','images/room/wei.png')
                    }else{
                        $('#img_shouc').attr('src','images/room/wu.png')
                    }
                    $.alertMsg(res.suc)
                    
                    // $('#inplun').val('')
                    // userdetailsObj.ajadeta()
                    // res.info = $.parseJSON(Global.crypt(res.result));
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    userdetailsObj.subplObj = function(obj){
        var valmes = $('#inplun').val()
        if (valmes == '') {
            $.alertMsg('請輸入評論內容');
            return false;
        }
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:anchorId,
            message:valmes,
            enclosure_id:enclosureId
        } 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/enclosure_reply',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    $.alertMsg(res.suc)
                    $('#inplun').val('')
                    userdetailsObj.ajadeta()
                    // res.info = $.parseJSON(Global.crypt(res.result));
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    userdetailsObj.userdian = function(obj){
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:enclosureId
        } 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/live/enclosure_thumbs',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (!res.err) {
                    $.alertMsg(res.suc)
                    userdetailsObj.ajadeta()
                    /*if (res.suc == '点赞成功') {
                        $('#imdian').attr('src','images/room/wzan.png')
                    }else{
                        $('#imdian').attr('src','images/room/zan.png')
                    }*/
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    userdetailsObj.golyzan = function(obj){
        var thisD = obj.attr('data-d')
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            reply_id:thisD
        } 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/live/reply_thumbs',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                if (!res.err) {
                    $.alertMsg(res.suc)
                    userdetailsObj.ajadeta()
                    // userdetailsObj.ajadeta()
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    userdetailsObj.Adyflooat = function(obj){
        var thisD = obj.attr('data-d')
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:thisD,
            role: "user",
        } 
        // console.log(postData) 
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/setFollow',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    // console.log(188)
                    // dynamicObj.updatePlay('hot')
                    if (res.suc == '關注成功') {
                        obj.addClass('colGray').html('已關注')
                    }else{
                        obj.removeClass('colGray').html('+關注')
                    }
                    $.alertMsg(res.suc) 
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    userdetailsObj.useloadObj = function() {
        setTimeout(function() {
            userdetailsObj.createDomObj()
            userdetailsObj.createEvent()
            window.scrollTo(0,0)
            gifJson() // enclosure_detail
            userdetailsObj.ajadeta()
        },100)
    }
    userdetailsObj.onloadExecution = function(){
        userdetailsObj.useloadObj()
    }
    userdetailsObj.init = function(){
	 	userdetailsObj.onloadExecution()
    }