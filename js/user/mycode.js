    var mycodeObj = new PageController({
	   'name': 'mycode',
	   'tpl' : 'template/user/mycode.html'
    });
    mycodeObj.createDomObj = function(){
    	this.ClickObj = $(".feed_fan");
        this.hedsetObj = $("#mycode") 
        this.butImg = $("#but_img")    
        this.codefen = $("#code_fen")   // 分享  

        this.ClickObj.tap(function(e){ //返回   goewm
            mycodeObj.goBack()
        })
        console.log(ConfigObj.yshare_url)
        this.codefen.unbind('tap').tap(function () {
            gifJson()
            sharePicObj(ConfigObj.yshare+ConfigObj.yshare_url)
        })
        this.butImg.unbind('tap').tap(function(){
            // console.log(url)
            // var imgUrl = $('#xiaImg').attr('src')
            $('#but_img').css('background','#fe829e')
            setTimeout(function(){$('#but_img').css({'background':'#dcb482','color':'#ededed'})},1000);
            if (ConfigObj.platForm === 'android') {
                android_obj.savePic(ConfigObj.yshare_url)
            }else{
                // alert(ConfigObj.yshare_url)
                ios_obj.savePic(ConfigObj.yshare_url)
            }
        })
        if (ConfigObj.be_invited == '') {

        }else{
            $('#inYqm').val(ConfigObj.be_invited).attr('disabled','disabled').css('background','#fff')
            $('#but_yqm').html('已綁定').attr('data-t','yibangd')
        }
    }
    /*mycodeObj.ajaxsplay = function(url,tex){
        // url = url
        // console.log(url)
        // console.log(tex)
        // var texUrl = tex+url
        $('#Awm').click(function(){
            $('#Awm').css({'background':'#fe829e','color':'#fff'})
            setTimeout(function(){$('#Awm').css({'background':'#fff','color':'#dcb482'})},1000);
            if (ConfigObj.platForm === 'android') {
                android_obj.sharePic(texUrl)
            }else{
                console.log(texUrl)
                ios_obj.sharePic(texUrl)
            }
        })
    }*/
    mycodeObj.goewm = function(obj,url,tex,typ){
        // console.log(obj,url,tex,typ)
        // titcode = obj
        // urlcode = url
        // texcode = tex 
        if (typ == '1') {
            $('#Abdyqm').addClass('actCode').siblings().removeClass('actCode')
            $('.sec_bdyqm').show().siblings('.ces_code_cont').hide()
        }
            $('#H_thm').html(obj)
            $('#Awm').attr('data-clipboard-text',obj)
            /*$('#qrcode').qrcode({
                 render    : "canvas",
                 text    : url,
                 width : "200",               //二维码的宽度
                 height : "200",              //二维码的高度
                 background : "#ffffff",       //二维码的后景色
                 foreground : "#000000",        //二维码的前景色
                 src: ''             //二维码中间的图片
            }); */
            $('#qrcode').qrcode(url);
            var clipboard = new ClipboardJS(document.getElementById('Awm'));
            clipboard.on('success', function(e) {
                var ms = e.trigger.getAttribute('aria-label');
                $.alertMsg(ms,true)
                e.clearSelection();
            });
            // mycodeObj.ajaxsplay(url,tex)
    }
   /* mycodeObj.goewm = function(obj,url,tex){
        $('#qrcode').qrcode(url);
        mycodeObj.canvObj(obj,url,tex)
    }*/
    // mycodeObj.canvObj = function(obj,url,tex){
    //     var ctx = document.getElementsByTagName('canvas')[0];
    //     var asd = convertCanvasToImage(ctx)
    //     function convertCanvasToImage(aaa) {
    //         var image = new Image();
    //         image.src = aaa.toDataURL("image/png");
    //         console.log(aaa.toDataURL("images/png"))
    //         console.log(image.src)
    //         console.log(image)
    //         return image;
    //     }
    // }
    
    mycodeObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            mycodeObj.sectionEvent(e);
        });
    }
    mycodeObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "a_fenxi" : mycodeObj.gofenxiang(thisObj);return true; //账户管理
                case "a_bangd" : mycodeObj.gobangding(thisObj);return true; //账户管理 
                case "Abangding" : mycodeObj.Abgdcode(thisObj);return true; //账户管理 Abangding
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "account" : mycodeObj.accountRecord();return true; //账户管理
            }
        }
    }
    mycodeObj.gofenxiang = function(obj){
        obj.addClass('actCode').siblings().removeClass('actCode')
        $('.ces_code_cont').show().siblings('.sec_bdyqm').hide()
        // titcode = obj  urlcode = url texcode = tex 
    }
    mycodeObj.gobangding = function(obj){
        obj.addClass('actCode').siblings().removeClass('actCode')
        $('.sec_bdyqm').show().siblings('.ces_code_cont').hide()
    }
    mycodeObj.Abgdcode = function(){
        $('#but_yqm').css('background','green')
        setTimeout(function(){ $('#but_yqm').css('background','#f4725b') }, 2000);
        mycodeObj.goinyqm()
    }
    mycodeObj.goinyqm = function(){
        // console.log($('#inYqm').val())
        var Value =  $('#inYqm').val()
        if (Value == '') {
            $.alertMsg('請輸入邀請碼')
            return false;
        }
        var postData ={ //1 是查詢 2是添加
            type:'2',
            invitation_code:Value,
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/api/Invitation_code_add',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (!res.err) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    $.alertMsg(res.suc)
                    $('#inYqm').val('')
                    // InvitationObj.goBack()
                    // feedbackObj.gohtmltex(res.info)
                }else{  
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    /*mycodeObj.goewmajax = function(){
        $('#qrcode').qrcode(res.info[0].pic_url);
        var postData ={
            channel:ConfigObj.zdid,
            type:'4'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Api/bannel_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info[0].pic_url)
                    // $('#xiaImg').attr('src',res.info[0].pic_url)
                    $('#qrcode').qrcode(res.info[0].pic_url);
                    // $('#qrcode').qrcode({width: 164,height: 164,text: "size doesn't matter"});
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }*/
    mycodeObj.onloadExecution = function(){
    	mycodeObj.createDomObj()
        mycodeObj.createEvent()
        // mycodeObj.goewmajax()
        // mycodeObj.ajaxsplay()
    }
    mycodeObj.init = function(){
	 	mycodeObj.onloadExecution()
    }