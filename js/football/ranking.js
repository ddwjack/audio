    var rankingObj = new PageController({
       'name': 'ranking',
       'tpl' : 'template/football/ranking.html'
    });
    rankingObj.createDomObj = function(){
        this.ClickObj = $(".ranFan");
        this.hedsetObj = $("#ranking")
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                rankingObj.show();
            }
            signUpObj.show();
        })*/
    }
    rankingObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            rankingObj.goBack()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            rankingObj.sectionEvent(e);
        });
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
    }
    
    rankingObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                case "Aguanzhu" : rankingObj.goAguanzhu(thisObj);return true; //关注* 
                case "chaDetai" : rankingObj.gochaDetai(thisObj);return true; //跳转主播详情* 
            }
        }


        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "bangdan" : rankingObj.gobangdan(thisObj);return true; // 
                case "chaDetai" : rankingObj.gochaDetai(thisObj);return true; //跳转主播详情* 
                case "li_guanzhu" : rankingObj.goAguanzhu(thisObj);return true; //跳转主播详情* 
            }
        }
    }
    rankingObj.goAguanzhu = function(obj){
        var thisD = obj.attr('data-d')
        var thisH = obj.attr('data-h')
        var thisW = obj.attr('data-w')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            role:'user',
            anchor_id:thisD,
            anchor_no:thisH,
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
                if (res.code == '0') {
                    if (thisW == 'A') {
                        if ($(obj).find('p.ran_guan').html() == '已關注') {
                            $(obj).find('p.ran_guan').html('+關注')
                        }else{
                            $(obj).find('p.ran_guan').html('已關注')
                        }
                    }else{
                        var txtObj = obj.find('span.ran_gz')
                        if ($(txtObj).html() == '已關注') {
                            $(txtObj).html('+關注').removeClass('ran_ygz')
                        }else{
                            $(txtObj).html('已關注').addClass('ran_ygz')
                        }
                    }
                    $.alertMsg(res.suc) 
                    // footballObj.followgz(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    rankingObj.gobangdan = function(obj){
        obj.addClass('active_sp').siblings().removeClass('active_sp')
        var thisL = obj.attr("data-l");
        var thisD = obj.attr("data-d"); 
        rankingObj.ranAjax(thisL,thisD)
    }
    rankingObj.gochaDetai = function(obj){
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            rankingObj.show();
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(obj.attr('data-d'),obj.attr('data-z'))
        });
    }
    rankingObj.goportraits = function(){
        nextportraitObj.goBack = function(urls){
            nextportraitObj.destroy();
            rankingObj.show(true,function(){
                rankingObj.xinxiOBj()
            });

        }
        nextportraitObj.show(true,function(){
            nextportraitObj.urlNam($('#yhtxUrl').attr('src'))
        });
    }
    rankingObj.ranAjax = function(typ,day){
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            order:day,
            mold:typ
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/charm_chart', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    if (typ == '1VN') {
                        $('#liveType').html('直播間主播排行榜')
                        // $('#ulLive').find('li').attr('data-l','1VN')
                    }else{
                        $('#liveType').html('1V1主播排行榜')
                        // $('#ulLive').find('li').attr('data-l','1V1')
                    }
                    if (res.info.length == '0') {
                        $('#livethree,#liveOne,#liveTwo,#rankLis').html('')
                        $('#div_nul_img').show()
                    }else if(res.info.length <=3){
                        $('#div_nul_img').hide()
                        if (res.info[0]) {
                            var html = '<p class="link img_wid1"><a href="javascript:void(0)" data-t="chaDetai" data-d="'+ res.info[0].anchor_id+'" data-z="'+ res.info[0].anchor_no+'"><img class="im_wid" style="width:78px;height:78px;" src="'+ res.info[0].avatar_url+'" alt="#"></a></p>\
                                        <p class="ran_name">'+ res.info[0].nickname+'</p>\
                                        <p class="ran_numb">'+ (res.info[0].charm <= '0' ? '0' : res.info[0].charm)+'</p>\
                                        <a href="javascript:void(0)" data-t="Aguanzhu" data-w="A" data-d="'+ res.info[0].anchor_id+'"><p class="ran_guan">'+ (res.info[0].followed == '0' ? '+關注' : '已關注')+'</p></a>';
                            $('#liveOne').html(html)
                            $('#liveTwo').html('')
                            $('#livethree').html('')
                            $('#rankLis').html('')
                            console.log(165)
                        }
                        if (res.info[1]) {
                            var html = '<p class="link img_wid2"><a href="javascript:void(0)" data-t="chaDetai" data-d="'+ res.info[1].anchor_id+'" data-z="'+ res.info[1].anchor_no+'"><img class="im_wid" src="'+ res.info[1].avatar_url+'" alt="#"></a></p>\
                                        <p class="ran_name">'+ res.info[1].nickname+'</p>\
                                        <p class="ran_numb">'+ (res.info[1].charm <= '0' ? '0' : res.info[1].charm)+'</p>\
                                        <a href="javascript:void(0)" data-t="Aguanzhu" data-w="A" data-d="'+ res.info[1].anchor_id+'"><p class="ran_guan">'+ (res.info[1].followed == '0' ? '+關注' : '已關注')+'</p></a>';
                            $('#liveTwo').html(html)
                            $('#livethree').html('')
                            $('#rankLis').html('')
                        }
                        if (res.info[2]) {
                            var html = '<p class="link img_wid3"><a href="javascript:void(0)" data-t="chaDetai" data-d="'+ res.info[2].anchor_id+'" data-z="'+ res.info[2].anchor_no+'"><img class="im_wid" src="'+ res.info[2].avatar_url+'" alt="#"></a></p>\
                                        <p class="ran_name">'+ res.info[2].nickname+'</p>\
                                        <p class="ran_numb">'+ (res.info[2].charm <= '0' ? '0' : res.info[2].charm)+'</p>\
                                        <a href="javascript:void(0)" data-t="Aguanzhu" data-w="A" data-d="'+ res.info[2].anchor_id+'"><p class="ran_guan">'+ (res.info[2].followed == '0' ? '+關注' : '已關注')+'</p></a>';
                            $('#livethree').html(html)
                            $('#rankLis').html('')

                        }
                    }else{
                        $('#div_nul_img').hide()
                        // console.log(183)
                        rankingObj.liveObj(res.info)
                    }
                    $('#ulLive').find('li').attr('data-l',typ)
                    gifNone()
                    // console.log(res.info) //没有数据长度等于0
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    rankingObj.liveObj = function(info){
        // console.log(info)
        var html = ''
        for (var i = 3; i < info.length; i++) {
            var tex1 = '<p class="link img_wid1"><a href="javascript:void(0)" data-t="chaDetai" data-d="'+ info[0].anchor_id+'" data-z="'+ info[0].anchor_no+'"><img style="width:78px;height:78px;" class="im_wid" src="'+ info[0].avatar_url+'" alt="#"></a></p>\
                        <p class="ran_name">'+ info[0].nickname+'</p>\
                        <p class="ran_numb">'+ (info[0].charm <= '0' ? '0' : info[0].charm)+'</p>\
                        <a href="javascript:void(0)" data-t="Aguanzhu" data-w="A" data-d="'+ info[0].anchor_id+'"><p class="ran_guan">'+ (info[0].followed == '0' ? '+關注' : '已關注')+'</p></a>';
            
            var tex2 = '<p class="link img_wid2"><a href="javascript:void(0)" data-t="chaDetai" data-d="'+ info[1].anchor_id+'" data-z="'+ info[1].anchor_no+'"><img class="im_wid" src="'+ info[1].avatar_url+'" alt="#"></a></p>\
                        <p class="ran_name">'+ info[1].nickname+'</p>\
                        <p class="ran_numb">'+ (info[1].charm <= '0' ? '0' : info[1].charm)+'</p>\
                        <a href="javascript:void(0)" data-t="Aguanzhu" data-w="A" data-d="'+ info[1].anchor_id+'"><p class="ran_guan">'+ (info[1].followed == '0' ? '+關注' : '已關注')+'</p></a>';
            
            var tex3 = '<p class="link img_wid3"><a href="javascript:void(0)" data-t="chaDetai" data-d="'+ info[2].anchor_id+'" data-z="'+ info[2].anchor_no+'"><img class="im_wid" src="'+ info[2].avatar_url+'" alt="#"></a></p>\
                        <p class="ran_name">'+ info[2].nickname+'</p>\
                        <p class="ran_numb">'+ (info[2].charm <= '0' ? '0' : info[2].charm)+'</p>\
                        <a href="javascript:void(0)" data-t="Aguanzhu" data-w="A" data-d="'+ info[2].anchor_id+'"><p class="ran_guan">'+ (info[2].followed == '0' ? '+關注' : '已關注')+'</p></a>';
            // console.log(info[i])
            html += '<div class="ran_list">\
                    <ul>\
                        <li class="dan_li_lt li_wi60" data-t="chaDetai" data-d="'+ info[i].anchor_id+'" data-z="'+ info[i].anchor_no+'"><img style="background:url(images/room/log.png)no-repeat center;background-size:cover;" class="ranToux" src="'+ info[i].avatar_url+'" alt="#"><span>'+ info[i].nickname+'</span></li>\
                        <li class="dan_li_lt li_wi20 center"><img style="width: 24px;" src="images/room/xin.png" alt="#">&nbsp;&nbsp;<span>'+ (info[i].charm <= '0' ? '0' : info[i].charm)+'</span></li>\
                        <li data-t="li_guanzhu" data-d="'+ info[i].anchor_id +'" class="dan_li_lt li_wi30"><span class="ran_gz">'+ (info[i].followed == '0' ? '+關注' : '已關注')+'</span></li>\
                    </ul>\
                </div>'
        }
        $('#rankLis').html(html)
        $('#liveOne').html(tex1)
        $('#liveTwo').html(tex2)
        $('#livethree').html(tex3)
    }
    rankingObj.onloadExecution = function(){
        rankingObj.createDomObj()
        rankingObj.createEvent()
        // rankingObj.setItemObj()
    }
    rankingObj.init = function(){
        rankingObj.onloadExecution()
    }