    var myloveObj = new PageController({
	   'name': 'mylove',
	   'tpl' : 'template/user/mylove.html'
    });
    myloveObj.createDomObj = function(){
    	this.ClickObj = $(".lov_fan");
        this.hedsetObj = $("#mylove")

        this.ClickObj.tap(function(e){ //返回 VdetailObj 
            myloveObj.goBack()
        })
    }

    myloveObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            myloveObj.sectionEvent(e);
        });
        var page = 1;
        var size = 10;
        $('#mylove').dropload({  
            scrollArea : window,
            distance : 20,
            loadDownFn:function(me){
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                var thisD = $('#loveSc').find('a.cur').attr('data-d')
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    page:page,
                    type:2,
                }
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                switch(thisD) {
                    case '1':
                        var Url = '/VideoInterface/video_record'
                        break;
                    case '2':
                        var Url = '/novel/collect_list'
                        break;
                    default:
                        var Url = '/live/enclosure_collect_record'
                } 
                console.log(Url)
                $.ajax({
                    url: ConfigObj.localSite+'/VideoInterface/video_record',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        // var fo = Global.crypt(res)
                        if (res.ok == true) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            console.log(res.info)
                            var dat = res.info
                            var arrLen = res.info.length;
                            if(arrLen > 0){
                               for(var i=0; i<arrLen; i++){
                                randomObj()
                                result += '<li class="li_vid" data-t="recdet" data-d="'+ dat[i].class_id +'" data-g="'+ dat[i].cover_one +'" data-v="'+ dat[i].video_id +'">\
                                        <i class="opactiy rec_opac"></i><img class="img_vi fl" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ dat[i].cover_one +'" alt="">\
                                        <p class="p_top">'+ dat[i].title+'</p>\
                                        <p class="p_bot"></p>\
                                    </li>'
                                $('#no_lov').css('display','none')
                                }
                            }else{
                                console.log(67)
                                me.lock();
                                $.alertMsg('已經到底了，沒有更多視頻了')
                                $('#love_hide').show()
                            }
                                $('#ul_lov').append(result);
                                var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.3)
                                $('#ul_lov .img_vi').css('height',imag)
                                $('#ul_lov i.opactiy').css('height',imag)
                                me.resetload();
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        me.resetload();
                    }
                })
            }
        }) 
    }
    myloveObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisC = thisObj.attr("data-c");
            // console.log(thisT)
            switch (thisT){
                case "A_love_my" : myloveObj.goMylove(thisObj);return true; //视频1 听书2 动态3*
                case "Aflooat" : myloveObj.goflooat(thisObj);return true; //動態關注
                case "listlove" : myloveObj.golistlove(thisC);return true; //观看视频 
                case "ALovesc" : myloveObj.goALovesc(thisObj);return true; //收藏 
                case "anch_detail" : myloveObj.goanchdetail(thisObj);return true; //主播空间动态 
                case "user_detail" : myloveObj.goxxi(thisObj);return true; //详细动态 
                case "sCang" : myloveObj.cancelObj(thisObj);return true; //取消視頻收藏 
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisD = thisObj.attr("data-d");
            var thisV = thisObj.attr("data-v");
            var thisG = thisObj.attr("data-g");
            // console.log(thisT)//account caching current VdetailObj
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "lovme" : myloveObj.godetaObj(thisV,thisD,thisG,thisObj);return true; //视频播放
                case "img_deta" : myloveObj.goimgDeta(thisObj);return true; //*  动态图片详情
            }
        }
        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : myloveObj.goimgDeta(thisObL);return true; //* 
            }
        }
    }
    myloveObj.golistlove = function(id){
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        if (ConfigObj.platForm === 'android') {
            android_obj.playMusic(id)
        }else{
            ios_obj.playMusic(id)
        }
    }
    myloveObj.goanchdetail = function(obj){
        offTop = obj[0].offsetTop
        // localStorage.setItem("offTops", offTop);
        var thisD = obj.attr('data-d')
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            myloveObj.show(false,function(){
            });
            myloveObj.scrTop(offTop)
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(thisD,offTop)
        });
    }
    myloveObj.goimgDeta = function(obj){
        offTop = obj[0].offsetTop
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z') 
        nodisturbObj.goBack = function(){
            myloveObj.show(false);
            nodisturbObj.destroy();
            myloveObj.scrTop(offTop)
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(thisM,thisG,offTop,thisZ)
        });
    }
    myloveObj.goxxi = function(obj){
        offTop = obj[0].offsetTop
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            myloveObj.show(false,function(){
            });
            myloveObj.scrTop(offTop)
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN,offTop)
        });
    }
    myloveObj.goALovesc = function(obj){
        var thisC = obj.attr('data-c')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            client:client,
            novel_id:thisC,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite+'/Book/category_book',
            url: ConfigObj.localSite+'/novel/collect',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    myloveObj.bookObj('/novel/collect_list',2)
                    // $(obj).parent('li.loveand').hide() A_love_my
                    // console.log($(obj).parent('li.loveand'))
                    /*if (res.suc == '收藏成功') {
                        $(obj).find('.sp_scts').html('已收藏')
                    }else{
                        $(obj).find('.sp_scts').html('+收藏')
                    }*/
                    $.alertMsg(res.suc)
                    // kaijiangIndexObj.lisAjax(1)
                    // res.info = $.parseJSON(Global.crypt(res.result)); 
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myloveObj.goajaxPlay = function(){
        // var usId = localStorage.getItem("numId")
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            page:1,
            type:2
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/video_record',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                // var fo = Global.crypt(res) VdetailObj
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    // userCenterObj.userInfo = res.info;
                    myloveObj.updatePlay(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myloveObj.bookObj = function(urls,typ){
        gifJson()
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
            url: ConfigObj.localSite+urls,
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    if (typ == '2') {
                        myloveObj.lvBookObj(res.info)
                    }else{
                        myloveObj.dynacmObj(res.info)
                    }
                    // console.log(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myloveObj.goflooat = function(obj){
        var thisD = obj.attr('data-d')
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:thisD
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
                    $(obj).parents('.div_namic').hide()
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
    myloveObj.cancelObj = function(obj){
        gifJson()
        var thisD = obj.attr('data-d')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            type:'1',
            video_id:thisD
        }
        console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/VideoInterface/video_comment_add',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                // var fo = Global.crypt(res)
                if (!res.err) {
                    $.alertMsg(res.suc)
                    $(obj).parent('ul.ul_video').hide()
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    gifNone()
                    // myloveObj.goajaxPlay()
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    myloveObj.godetaObj = function(typ,cla,ig,obj){
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        obj.find('.rec_opac').show()
        obj.siblings().find('.rec_opac').hide()
        Global.playVideo(typ,cla,ig)
    }
    myloveObj.goMylove = function(obj){
        var typ = obj.attr('data-d')
        obj.addClass('cur').siblings().removeClass('cur')
        myloveObj.createEvent()
        if (typ == '1') {
            $('.div_video_lt').show().siblings('.div_audio_lt,.div_dynam_lt').hide()
            myloveObj.goajaxPlay()
        }else if(typ == '2'){
            $('.div_audio_lt').show().siblings('.div_video_lt,.div_dynam_lt').hide()
            myloveObj.bookObj('/novel/collect_list',2)
        }else{
            $('.div_dynam_lt').show().siblings('.div_audio_lt,.div_video_lt').hide()
            myloveObj.bookObj('/live/enclosure_collect_record',3)
        }
    }
    myloveObj.updatePlay = function(obj){
        console.log(obj)
        if (obj.length == '0') {
            console.log(15)
            $('#no_lov').css('display','block')
        }
        var html = ''
        for (var i = 0; i < obj.length; i++) {
            randomObj()
            var rs = obj[i]
            var Vbe = obj[i].label
            var lab = Vbe.split('|')
            html += '<div>\
                    <a href="javascript:void(0)"></a>\
                    <ul class="ul_video">\
                        <li data-t="lovme" data-d="'+ rs.class_id +'" data-g="'+ rs.cover_one +'" data-v="'+ rs.video_id +'" class="w49">\
                            <img class="w100 img_love_hg" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ rs.cover_one +'" alt="">\
                        </li>\
                        <li data-t="lovme" data-d="'+ rs.class_id +'" data-g="'+ rs.cover_one +'" data-v="'+ rs.video_id +'" class="w49">\
                            <p class="p_love_clamp ">'+ rs.title +' </p>\
                            <p class="p_bq_span">'
                    if (lab.length != 0) {
                        for (var z = 0; z < 1; z++) {
                            html +='<span class="sp_bq">'+lab[z] +'</span>'
                        }
                    }
                html += '</p>\
                            <p><span>'+ rs.class_name +'</span><span class="fr"><img class="im_gk_lov" src="images/room/bofang-3.png" alt="#">'+ rs.play_num +'</span></p>\
                        </li><a data-t="sCang" data-d="'+ rs.video_id +'" class="A_shouca" href="javascript:void(0)"><img class="img_can" src="images/room/wu.png" alt="#" /></a>\
                    </ul>\
                </div>';
            $('#no_lov').css('display','none')
        }
        $('#ul_lov').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.3)
        $('.img_love_hg').css('height',imag)
        $('#ul_lov i.opactiy').css('height',imag)
    }
    myloveObj.lvBookObj = function(res){
        var html = ''
        console.log(res)
        if (res.length == '0') {
            console.log(15)
            $('#no_lov').css('display','block')
        }
        for (var i = 0; i < res.length; i++) {
            mathbookObj()
            var re = res[i]
                html += '<li class="li_cont loveand" data-v="'+ re.title+'" data-g="'+ re.poster +'">\
                        <a class="showNow" href="javascript:void(0)" data-t="listlove" data-g="'+ re.poster +'" data-v="'+ re.title+'" data-c="'+ re.novel_id +'">\
                            <div class="link d_left">\
                                <p class="p_number">\
                                    <img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ re.play +'</span>\
                                </p>\
                                <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;height: 219px;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ re.poster +'" alt="">\
                                <p class="center p_tit_book"><span>'+ re.title+'</span></p>\
                            </div>\
                        </a>\
                        <a href="javascript:void(0)" data-t="ALovesc" data-c="'+ re.novel_id +'"><p class="p_offOn"><img class="img_xing" src=" images/audio/heart-br.png " alt=""></p></a>\
                    </li>'
                $('#no_lov').css('display','none')
        }
        $('#ul_book').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        gifNone()
        var thing = $('li.loveand')
        var arry = []
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    myloveObj.dynacmObj = function(res){
        var html = ''
        console.log(res)
        if (res.length == '0') {
            console.log(15)
            $('#no_lov').css('display','block')
        }else{
            for (var i = 0; i < res.length; i++) {
                var re = res[i]
                var tim = re.created_date.substring(11,19)
                var str = re.images;
                var img = str.split(',');
                html += '<div class="div_namic" style="padding-bottom:10px;">\
                    <div class="p_user">\
                        <a data-t="anch_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                            <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                            <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                            <p class="p_lx">'+ re.craft +'</p>\
                        </a>';
                        html += '<a data-t="Aflooat" data-d="'+ re.enclosure_id +'" data-w="A" class="link awid18" href="javascript:void(0)"><img class="img_xing" src=" images/audio/heart-br.png " alt=""></a>'
                        /*if (re.followed == '0') { 
                            html += '<a data-t="Aflooat" data-d="'+ re.anchor_id +'" data-w="A" class="link w12" href="javascript:void(0)">+關注</a>'
                        }else{
                            html += '<a data-t="Aflooat" data-d="'+ re.anchor_id +'" data-w="A" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                        }*/
                    html += '</div><div><p class="texCent">'+ re.message +'</p></div>'
                        /*if (re.video != '') {
                            html += '<video id="dy_video"  class="" poster="#" controls="true"  src="'+ re.video +'"></video>'
                        }*/
                        // console.log(img.length-3)
                        if (img.length == '1' && img != '') {
                            var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                            html +='<ul class="ul_img">\
                                        <li data-t="img_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="W100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                    </ul>'
                        }else if(img.length == '2'){
                            var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                            html +='<ul class="ul_img">\
                                        <li data-t="img_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                        <li data-t="img_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    </ul>'
                        }else if(img.length >= '3'){
                            var len = img.length - '3'
                            var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                            var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                            html += '<ul class="ul_img">\
                                        <li data-t="img_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                        <li class="w28">\
                                            <p data-t="img_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                                <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                            <p style="height: .7rem;"></p>\
                                            <p data-t="img_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                        </li>\
                                    </ul>'
                        }
                    html += '<p class="bot_A"><li></li>\
                        <a data-t="user_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn></a>\
                        <a data-t="user_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn></a>\
                        <a data-t="user_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                    </p>\
                </div>'
            }
            $('#dynacmtai').html(html)
            $('#no_lov').css('display','none')
        }
        gifNone()
    }
    myloveObj.scrTop = function(tp){
        setTimeout(function(){
            window.scrollTo(0,tp-300)
        },70)
    }
    myloveObj.lovloadObj = function() {
        setTimeout(function() {
            myloveObj.createDomObj()
            myloveObj.createEvent()
            myloveObj.goajaxPlay()
        },100)
    }
    myloveObj.onloadExecution = function(){
        myloveObj.lovloadObj()
    }
    myloveObj.init = function(){
	 	myloveObj.onloadExecution()
    }