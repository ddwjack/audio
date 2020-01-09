    var chatdetailObj = new PageController({
	   'name': 'chatdetail',
	   'tpl' : 'template/football/chatdetail.html'
    });
    chatdetailObj.createDomObj = function(){
    	this.ClickObj = $(".chdetFan");
        this.hedsetObj = $("#chatdetail") 
        // this.followObj = $(".aAbsolute") 
    }

    
    chatdetailObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            chatdetailObj.sectionEvent(e);
        });
         this.ClickObj.unbind('tap').tap(function(e){ //返回
            chatdetailObj.goBack()
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
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//account caching current zdbf
            switch (thisT){
                // case "fasong" : this.gofasong();return true; //*  
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
    chatdetailObj.AgoraRTMObj = function(id,nm){
        $('#sp_name').html(nm)
        var ueid = id
        /*client.on('ConnectionStateChange', (newState, reason) => {
            console.log(87)
            console.log('on connection state changed to ' + state + ' reason: ' + reason);
        });*/
          /*client.on("ConnectionStateChanged", (newState, reason) => {
            console.log(92)
            let type = 'info';
            if (newState === 'ABORTED') {
                console.log(95)
              type = 'error';
            } else if (newState === 'CONNECTED') {
                console.log(98)
              type = 'success';
            } else if (newState === 'RECONNECTING') {
                console.log(101)
              type = 'warning';
            } else if (newState === 'DISCONNECTED') {
                console.log(104)
              type = 'warning';
            }
          })*/

        /*client.login({ uid: ""+accountName+"" }).then(() => {
          console.log('AgoraRTM client login success');
        }).catch(err => {
          console.log('AgoraRTM client login failure', err);
        }); */

        $('#fason').unbind('tap').tap(function(){
            var text = $('#goval').val()
            console.log($('#goval').val())
            if (text == '') {
                $.alertMsg('请输入内容');
                return false;
            }else{
                $('#goval').val('')
                var html = '<div class="xxcont anchor_right">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat anchor_img" src="http://img0.imgtn.bdimg.com/it/u=3293099503,606929711&fm=26&gp=0.jpg" alt="">\
                    </a>\
                    <span class="p_content anchor_text">'+ text +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                // $('#myanchor').append(html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            }
            console.log(ueid)
            client.sendMessageToPeer(
                { text:text}, // 一个 RtmMessage 对象。
                ueid, // 对端用户的 uid。
            ).then(sendResult => {
                if (sendResult.hasPeerReceived) {
                    console.log('发送成功')
                // 你的代码：远端用户收到消息事件。
                } else {
                    console.log('发送中')
                }
            }).catch(error => {
                console.log('发送失败')
            });

            
        })
        client.on('MessageFromPeer', ({text}, peerId) => {
                  const msg = {
                    userName: peerId,
                    content: text
                  };
          console.log(msg);
          if (msg.userName == ueid) {
                var html ='<div class="xxcont user_left">\
                    <a class="A_afte" href="javascript:void(0)">\
                        <img class="img_chat user_img" src="http://img0.imgtn.bdimg.com/it/u=3293099503,606929711&fm=26&gp=0.jpg" alt="">\
                    </a>\
                    <span class="p_content uesr_text">'+ msg.content +'</span>\
                </div>'
                $('#myusers').html($('#myusers').html()+html)
                var h = $(document).height()-$(window).height();
                $(document).scrollTop(h);
            // $('#myusers').append(html)
          }
        })
    }
    chatdetailObj.onloadExecution = function(){
    	chatdetailObj.createDomObj()
        chatdetailObj.createEvent()
        // chatdetailObj.AgoraRTMObj()
    }
    chatdetailObj.init = function(){
	 	chatdetailObj.onloadExecution()
    }