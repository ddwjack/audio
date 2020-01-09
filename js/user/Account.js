    var AccountObj = new PageController({
	   'name': 'Account',
	   'tpl' : 'template/user/Account.html'
    });
    AccountObj.createDomObj = function(){
    	this.ClickObj = $(".account_fan");
        this.hedsetObj = $("#Accout") 
    }

    AccountObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            AccountObj.goBack()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            AccountObj.sectionEvent(e);
        });
        AccObg()
        timeriObj()
    }
    AccountObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//
            switch (thisT){
                case "qx" : $('#sec_xgnc').hide();return true; //取消*
                case "bdiphone" : AccountObj.gobdiphone(thisObj);return true; //   绑定手机号
                case "A_img_tou" : AccountObj.goportra(thisObj);return true; //   
                case "xgiphone" : AccountObj.goxgiphone(thisObj);return true; //   修改手机号

            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)//
            switch (thisT){
                case "Ac_name" : AccountObj.nameObj(thisObj);return true; //昵称*  
                case "Ac_gxqm" : AccountObj.gxqmObj(thisObj);return true; //個性簽名*  
                case "Ac_xb" : AccountObj.xbObj(thisObj);return true; //性別*  
                case "A_xg" : AccountObj.jzxgObj(thisObj);return true; //性別修改過*  
                // case "Ac_szd" : AccountObj.szdObj(thisObj);return true; //所在地  
                case "Ac_xqah" : AccountObj.xqahObj(thisObj);return true; //興趣愛好  
                // case "Ac_sr" : timeriObj();return true; //生日  
                case "Ac_gqzk" : AccountObj.gqzkObj(thisObj);return true; //感情狀況  

            }
        }
    }
    function AccObg(){
        var area1 = new LArea();
        area1.value=[1,13];//控制初始位置，注意：该方法并不会影响到input的value
        var area2 = new LArea();
        area2.init({
            'trigger': '#demo4',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data]
        });
    }
    function timeriObj(){
        var currYear = (new Date()).getFullYear();  
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
            theme: 'android-ics light', //皮肤样式
            display: 'modal', //显示方式 
            mode: 'scroller', //日期选择模式
            dateFormat: 'yyyy-mm-dd',
            lang: 'zh',
            showNow: true,
            nowText: "今天",
            startYear: currYear - 50, //开始年份
            endYear: currYear + 10 //结束年份
        };
        $("#USER_RI").mobiscroll($.extend(opt['date'], opt['default']));
    }
    AccountObj.nameObj = function(){
        nextNameObj.goBack = function(){
            nextNameObj.destroy();
            AccountObj.show(true);
        }
        nextNameObj.show(true);
    }
    AccountObj.gxqmObj = function(){
        nextAutographObj.goBack = function(){
            nextAutographObj.destroy();
            AccountObj.show(true);
        }
        nextAutographObj.show(true);
    }
    AccountObj.xbObj = function(){
        nextGenderObj.goBack = function(){
            nextGenderObj.destroy();
            AccountObj.show(true);
        }
        nextGenderObj.show(true);
    }
    AccountObj.jzxgObj = function(){
        $.alertMsg('請勿重複修改')
    }
    AccountObj.xqahObj = function(){
        nextHobbyObj.goBack = function(){
            nextHobbyObj.destroy();
            AccountObj.show(true);
        }
        nextHobbyObj.show(true);
    }
    AccountObj.gqzkObj = function(){
        nextFeelingObj.goBack = function(){
            nextFeelingObj.destroy();
            AccountObj.show(true);
        }
        nextFeelingObj.show(true);
    }
    AccountObj.paqd = function(){//确定修改昵称
        $('#spName').html($('#inName').val())
        $('#sec_xgnc').hide()
    }
    AccountObj.goportra = function(obj){
        /*nextportraitObj.goBack = function(){
            nextportraitObj.destroy();
            AccountObj.show(true);
        }
        nextportraitObj.show(true);*/
    }
    AccountObj.gobdiphone = function(obj){  //綁定手機號
        xgwordObj.goBack = function(){
            xgwordObj.destroy();
            AccountObj.show(true);
        }
        xgwordObj.show(true);
    }
    AccountObj.goxgiphone = function(obj){  //修改手机号
        /*xgwordsObj.goBack = function(){
            xgwordsObj.destroy();
            AccountObj.show(true);
        }
        xgwordsObj.show(true);*/
        modifytypeObj.goBack = function(){
            modifytypeObj.destroy();
            AccountObj.show(true);
        }
        modifytypeObj.show(true);
    }
    AccountObj.loadAjaxObj = function(){
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            imei:ConfigObj.Iemid,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        // console.log(postData)
        $.ajax({
            url: ConfigObj.localSite+'/User/user_info_no',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    AccountObj.userxinxi(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    AccountObj.userxinxi = function(res){
        // console.log(res)
        var html = ''
        var htm2 = ''
        html += '<a data-t="A_img_tou" href="javascript:void(0)"><img class="img_nam" style="background:url(images/room/log.png);background-size:100% 100%;" onerror="javascript:this.src='+"\'images/room/log.png\'"+'" src="'+ res.avatar_url +'" alt="#"></a>\
                    <p class="p_iphone">'
                if (res.mobile == '') {
                    html += '<a class="colgry A_iphone_no" href="javascript:void(0)"><img class="img_iphon" src="images/my/shouji.png" alt="#">未綁定手機號</a>'
                }else{
                    html += '<a class="colgry A_iphone_yes" href="javascript:void(0)"><img class="img_iphon" src="images/my/shouji.png" alt="#">'+ res.mobile +'</a>'
                }
        html +='</p>'
                if (res.mobile == '') {
                    html += '<p class="p_iphone_hide"><a data-t="bdiphone" href="javascript:void(0)">去綁定</a></p>'
                }else{
                    html += '<p class="p_iphone_show"><a data-t="xgiphone" href="javascript:void(0)">修改</a></p>'
                }
        $('#sp_user_nick').html(res.nickname)
        $('#sp_user_qm').html(res.craft)
        console.log(res.created_date)
        if (res.created_date == undefined) {
            var tims = res.created_date
        }else{
            var tim = res.created_date.replace(" ",',')
            var tims = tim.replace(/-/g,'/')
        }
        $('#span_time').html(tims)
        $('#span_us_id').html(res.invitation_code)
        if (res.sex == '') {
            $('#li_waman').attr('data-t','Ac_xb')
        }else{
            $('#li_waman').attr('data-t','A_xg')
        }
        $('#span_sex').html(res.sex)
        $('#span_xqah').html(res.hobby)
        $('#span_gqkz_s').html(res.emotion)
        // console.log(res.region)
        // if (!res.region) {
            // console.log(1)
            var regi = res.region.split(',')
            if (regi.length == '2') {
                $('#demo4').val(regi[1])
                $('#demo4').attr('placeholder',regi[1])
            }else{
                $('#demo4').val(res.region)
                $('#demo4').attr('placeholder',res.region)
            }
        /*}else{
            console.log(2)
            $('#demo4').val(res.region)
            $('#demo4').attr('placeholder',res.region)
        }*/
        
        var timtwo = res.birthday.replace(" ",',')
        var timtwos = timtwo.replace(/-/g,'/')
        $('#div_uesr_tou').html(html)
        $('#USER_RI').val(timtwos)
        $('#USER_RI').attr('placeholder',timtwos)
        /*var wapd = $('#demo4').val()
            var arrNm = {'region':wapd}
            Global.usNoetu(arrNm)*/
    }
    AccountObj.onloadExecution = function(){
    	AccountObj.createDomObj()
        AccountObj.createEvent()
        AccountObj.loadAjaxObj()
        // Global.channelId()
        // console.log(userCenterObj.userInfo)
        // AccountObj.spanSub(userCenterObj.userInfo)
        // console.log()
    }
    AccountObj.init = function(){
	 	AccountObj.onloadExecution()
    }