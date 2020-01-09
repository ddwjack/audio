    var InvitationObj = new PageController({
	   'name': 'Invitation',
	   'tpl' : 'template/user/Invitation.html'
    });
    InvitationObj.createDomObj = function(){
    	this.ClickObj = $(".invit_fan");
        this.hedsetObj = $("#Invitation") 
        // this.butYqmObj = $("#but_yqm") 

        this.ClickObj.tap(function(e){ //返回 
            InvitationObj.goBack()
        })
    }
    InvitationObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            InvitationObj.sectionEvent(e);
        });
    }
    InvitationObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol 
            switch (thisT){
                // case "account" : InvitationObj.accountRecord();return true; //账户管理
                case "Abangding" : InvitationObj.Abgdcode(thisObj);return true; //绑定邀请码
                case "shareYou" : InvitationObj.AshareYou(thisObj);return true; //分享好友
                case "moneyVip" : InvitationObj.AmoneyVip(thisObj);return true; //购买VIP
            }
        }
    }
    InvitationObj.Abgdcode = function(obj) {
        $(obj).css('background','green')
        setTimeout(function(){ $(obj).css('background','#f4725b') }, 2000);
        InvitationObj.goinyqm()
    }
    InvitationObj.AshareYou = function(obj) {
        dyShareObj.goBack = function(){
            dyShareObj.destroy();
            InvitationObj.show();
        }
        dyShareObj.show();
        Global.fixd()
    }
    InvitationObj.AmoneyVip = function(obj) {
        myfreeObj.goBack = function(){
            myfreeObj.destroy();
            InvitationObj.show();
        }
        myfreeObj.show();
    }
    InvitationObj.vitatText = function(){
        var inpCode = ConfigObj.be_invited
        var inpTxt = $('#p_input_yq').find('input')
        var attrObj = []
        if (inpCode != '') {
            for (var i = 0; i < inpCode.length; i++) {
                attrObj[i] = inpCode[i]
            }
            // console.log(attrObj)
            $(inpTxt[0]).val(attrObj[0])
            $(inpTxt[1]).val(attrObj[1])
            $(inpTxt[2]).val(attrObj[2])
            $(inpTxt[3]).val(attrObj[3])
            $(inpTxt[4]).val(attrObj[4])
            $(inpTxt).attr('disabled','disabled')
            $('#but_yqm').html('已綁定').attr('data-t','yibangd')
        }
    }
    InvitationObj.goinyqm = function(){
        var Adata = $('input.input_cod')
        var inp = []
        Adata.forEach(function(v , i) {
            inp[i] = $(v).val()
        })
        if (inp[0] == '' || inp[1] == '' || inp[2] == '' || inp[3] == '' || inp[4] == '') {
            $.alertMsg('请输入正确的邀请码')
            return false;
        }
        InvitationObj.goyqmAjax(inp[0]+inp[1]+inp[2]+inp[3]+inp[4])
    }
    InvitationObj.goyqmAjax = function(Value) {
        console.log(Value)
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
                    // $('#inYqm').val('')
                    Global.channelId()
                    InvitationObj.goBack()
                    // feedbackObj.gohtmltex(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    InvitationObj.onloadExecution = function(){
    	InvitationObj.createDomObj()
        InvitationObj.createEvent()
        InvitationObj.vitatText()
    }
    InvitationObj.init = function(){
	 	InvitationObj.onloadExecution()
    }