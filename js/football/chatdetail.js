    var chatdetailObj = new PageController({
	   'name': 'chatdetail',
	   'tpl' : 'template/football/chatdetail.html'
    });
    chatdetailObj.createDomObj = function(){
    	this.ClickObj = $(".chdetFan");
        this.hedsetObj = $("#chatdetail") 
        this.hideObj = $("#giftdetal");
        // this.followObj = $(".aAbsolute") 
    }

    
    chatdetailObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            chatdetailObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            chatdetailObj.goBack()
        })
        this.hideObj.unbind('tap').tap(function(e){
            $('#fixed_chatli').hide()
        })
        /*this.followObj.unbind('tap').tap(function(e){ //关注
            imfollowObj.goBack = function(){
                imfollowObj.destroy();
                chatdetailObj.show(true);
                // Global.fixd()
            }
            imfollowObj.show(true,function(){
                // AvdetailsObj.goewm(invitationCode)
            });
        })*/
    }
    chatdetailObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "myIm_gift" : chatdetailObj.gogiftObj(thisObj);return true; //发送按钮   
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                case "liGift" : chatdetailObj.liGiftList(thisObL);return true; //* 
                case "Aslw" : chatdetailObj.AslwObj(thisObL);return true; //
            }
        }
    }
    
    chatdetailObj.updatePlay = function(typ,id,nub){
        var postData ={  
            state:'1', 
            page:'1',
            class_name:'',
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            id:tyId,
            keyword:''
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/search_video',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    chatdetailObj.Vlist(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    chatdetailObj.liGiftList = function(obj){
        console.log(88)
        $('#fixed_chatli').show()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:'android',
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/gift_list', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    chatdetailObj.givinghtml(res.info)
                    // feedbackObj.gohtmltex(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    chatdetailObj.gogiftObj = function(obj){
        // console.log(zhiD)
        if (!$('#giftlistUl').find('li').hasClass('after')) {
            $.alertMsg('请选择要发送的礼物')
            return false;
        }
        var lwId = $('#giftlistUl').find('li.after').attr('data-d')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:'android',
            anchor_id:anhId,
            anchor_no:ueid,
            gift_id:lwId,
            mold:typLe
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/common/give_gift', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    $.alertMsg(res.suc)
                    $('#fixed_chatli').hide(500)
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    chatdetailObj.AslwObj = function(obj){
        obj.addClass('after').siblings().removeClass('after')
    }
    chatdetailObj.givinghtml = function(res){
        var html = ''
        var tex = res.gift
        for (var i = 0; i < tex.length; i++) {
            html += '<li data-t="Aslw" data-d="'+ tex[i].id +'" class="gift_fixed center ">\
                        <img style="width:36px;height:36px;border-radius:0;" src="'+ tex[i].image +'" alt="">\
                        <p class="gi_text">'+ tex[i].title+'</p>\
                        <p class="gi_mone">'+ tex[i].gold +'海珠</p>\
                    </li>'
        }
        $('#giftlistUl').html(html)
        $('#Im_hz_money').html("海珠："+ res.current_gold)
    }
    chatdetailObj.AgoraRTMObj = function(id,nm,ig,anchId,thL){
        // chatdetailObj.rtmuserLt(id,ig)
        /*$('#sp_name').html(nm)
        ueid = id
        ueImg = ig
        anhId =  anchId
        typLe = thL
        $('#fason').unbind('tap').tap(function(){
            text = $('#goval').val()
            if (text == '') {
                $.alertMsg('请输入内容');
                return false;
            }else{
                $('#goval').val('')
                var html = '<div class="xxcont anchor_right">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat anchor_img" src="'+ ConfigObj.pic +'" alt="">\
                    </a>\
                    <span class="p_content anchor_text">'+ text +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            }
            console.log(ueid)*/
            /*clientuser.sendMessageToPeer({text:text},ueid).then(function(sendResult){
                if (sendResult.hasPeerReceived) {
                    console.log('发送成功')
                    $('#im_userct').append('<p data-d="'+ ConfigObj.meId +'" data-l="'+ ueid +'">'+ text +'</p>')
                    console.log($('#im_userct'))
                } else {
                    console.log('发送中')
                }
            },function(error){
                console.log('发送失败')
            })
        })*/
        /*clientuser.on('MessageFromPeer',function(text, peerId){
                  const msg = {
                    userName: peerId,
                    content: text
                  };
            if (msg.userName == ueid) {
                var html ='<div class="xxcont user_left">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat user_img" src="'+ ueImg +'" alt="">\
                    </a>\
                    <span class="p_content uesr_text">'+ msg.content.text +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            }
        })*/
    }
    chatdetailObj.rtmuserLt = function(id,ing){
        // console.log(id)
        var musId = 'zb'+id  // 主播号
        var mchId =  ConfigObj.meId // 用户id
        var textLouse =  localStorage.getItem('chatUsId')
        console.log(musId)
        console.log(mchId)
        if (textLouse) {
            var txt = textLouse.split(',')
            var html = ''
            for (var i = 0; i < txt.length; i++) {
                // console.log(txt[i].split(';'))
                var cont = txt[i].split(';')
                console.log(cont[1])
                if (musId == cont[1] ) {
                    console.log('这是1'+cont[1])
                    html +='<div class="xxcont user_left">\
                        <a class="A_afte" href="javascript:void(0)">\
                            <img class="img_chat user_img" src="'+ ing +'" alt="">\
                        </a>\
                        <span class="p_content uesr_text">'+ cont[0] +'</span>\
                    </div>'
                    
                }else if(mchId == cont[1] && musId == cont[2]){
                    console.log('这是2'+cont[1])
                    html += '<div class="xxcont anchor_right">\
                        <a class="A_afte" href="javascript:void(0)">\
                            <img class="img_chat anchor_img" src="'+ ConfigObj.pic +'" alt="">\
                        </a>\
                        <span class="p_content anchor_text">'+ cont[0] +'</span>\
                    </div>'

                }else{
                    console.log(3)
                }
            }
            $('#myusers').html($('#myusers').html()+html)

            setTimeout(function(){
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
                // window.scrollTo(0,796);
            },70)
            // console.log(html)
        }
    }
    chatdetailObj.onloadExecution = function(){
    	chatdetailObj.createDomObj()
        chatdetailObj.createEvent()
        // chatdetailObj.AgoraRTMObj()
    }
    chatdetailObj.init = function(){
	 	chatdetailObj.onloadExecution()
    }