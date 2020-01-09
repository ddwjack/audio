    var recordsObj = new PageController({
	   'name': 'records',
	   'tpl' : 'template/user/records.html'
    });
    recordsObj.createDomObj = function(){
    	this.ClickObj = $(".recor_fan");
        this.hedsetObj = $("#recor")

        this.ClickObj.tap(function(e){ //返回 VdetailObj
            recordsObj.goBack()
        })
       /* $('.ul_reco li').unbind('tap').tap(function(){
            $(this).addClass('act').siblings().removeClass('act')
            $('.d_ty_sh .D_reco').eq($(this).index()).show().siblings().hide()
        })*/
    }

    recordsObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            recordsObj.sectionEvent(e);
        });
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.3)
        $('.img_love_hg').css('height',imag)
        var page = 1;
        var size = 10;
        $('#recor').dropload({  
            scrollArea : window,
            distance : 20,
            loadDownFn:function(me){
                recordsObj.pullLoad = me;
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                var thisU = $('#tab_title').find('a.cur').attr('data-u')
                var thisD = $('#tab_title').find('a.cur').attr('data-d')
                if (thisD == '1') {
                    var tpy = '2'
                }else{
                    var tpy = '1'
                }
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    client:client,
                    type:tpy,
                    page:page
                }
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+thisU,
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (!res.err) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            console.log(res.info)
                            if (thisD == '1') {
                                recordsObj.videoload(res.info)
                            }else if(thisD == '2'){
                                recordsObj.bookload(res.info)
                            }else{
                                recordsObj.dynamload(res.info)
                            }
                        }else{
                           $.alertMsg(res.err) 
                        }
                    }
                })
            }
        }) 
    }

    recordsObj.gorecodPlay = function(){
        window.scrollTo(0,0)
        recordsObj.goajaxPlay()
    }
    recordsObj.goajaxPlay = function(){
        // var usId = localStorage.getItem("numId") recdet
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            page:1,
            type:1,

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
                // var fo = Global.crypt(res)
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    // userCenterObj.userInfo = res.info;
                    recordsObj.updatePlay(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    recordsObj.booksObj = function(urls,typ){
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            type:'2',
            page:'1'
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
                        recordsObj.lvBookObj(res.info)
                    }else{
                        console.log(res.info)
                        recordsObj.dynacmObj(res.info)
                    }
                    // console.log(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    recordsObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisC = thisObj.attr("data-c");
            // console.log(thisT)
            switch (thisT){
                case "A_cords_my" : recordsObj.goMycords(thisObj);return true; // 视频1 听书2 动态3* 
                case "Afoat" : footballObj.goimgFoll(thisObj);return true; // 动态关注 footballObj.goimgFoll(obj) 
                case "an_detail" : recordsObj.goandetail(thisObj);return true; //主播空间动态 
                case "reco_detail" : recordsObj.goxxi(thisObj);return true; //详细动态  
                case "Areco" : recordsObj.goArecoObj(thisObj);return true; //详细动态  
                case "listreco" : recordsObj.golistsear(thisC);return true; //进入听书    
                case "Abianj" : recordsObj.goAbianj(thisObj);return true; //  編輯 视频1 听书2 动态3     
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisD = thisObj.attr("data-d");
            var thisV = thisObj.attr("data-v");
            var thisG = thisObj.attr("data-g");
            // console.log(thisT)//account caching current protocol recdet  
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "recdet" : recordsObj.gorecdet(thisV,thisD,thisG,thisObj);return true; //密码显示*
                case "imgs_deta" : recordsObj.goimgDeta(thisObj);return true; //*  动态图片详情
            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                case "imgs_deta" : recordsObj.goimgDeta(thisObL);return true; //* 
            }
        }
    }
    recordsObj.goandetail = function(obj){
        offTop = obj[0].offsetTop
        // localStorage.setItem("offTops", offTop);
        var thisD = obj.attr('data-d')
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            recordsObj.show(false,function(){
            });
            recordsObj.scrTop(offTop)
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(thisD,offTop)
        });
    }
    recordsObj.goimgDeta = function(obj){
        offTop = obj[0].offsetTop
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z') 
        nodisturbObj.goBack = function(){
            recordsObj.show(false);
            nodisturbObj.destroy();
            recordsObj.scrTop(offTop)
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(thisM,thisG,offTop,thisZ)
        });
    }
    recordsObj.goxxi = function(obj){
        offTop = obj[0].offsetTop
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            recordsObj.show(false,function(){
            });
            recordsObj.scrTop(offTop)
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN,offTop)
        });
    }
    recordsObj.goArecoObj = function(obj){
        var thisC = obj.attr('data-c')
        kaijiangIndexObj.Love(thisC,obj)
    }
    recordsObj.golistsear = function(id){
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
    recordsObj.updatePlay = function(res){
        var html = ''
        if (res.length == '0') {
            $('#di_wei').css('display','block')
        }
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            randomObj()
            // console.log(res)
            var rs = res[i]
            var Vbe = res[i].label
            var lab = Vbe.split('|')
            html += '<div class="div_Icon_sc">\
                    <a class="" href="javascript:void(0)"><img class="AImgrem" src="images/my/wxz.png" alt="" /></a>\
                    <ul class="ul_video">\
                        <li data-t="recdet" data-d="'+ rs.class_id +'" data-g="'+ rs.cover_one +'" data-v="'+ rs.video_id +'" class="w49">\
                            <img class="w100 img_love_hg" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ rs.cover_one +'" alt="">\
                        </li>\
                        <li data-t="recdet" data-d="'+ rs.class_id +'" data-g="'+ rs.cover_one +'" data-v="'+ rs.video_id +'" class="w49">\
                            <p class="p_love_clamp ">'+ rs.title +' </p>\
                            <p class="p_bq_span">'
                    if (lab.length != 0) {
                        for (var z = 0; z < 1; z++) {
                            html +='<span class="sp_bq">'+lab[z] +'</span>'
                        }
                    }    
                html += '</p>\
                            <p><span>'+ rs.class_name +'</span><span class="fr"><img class="im_gk_lov" src="images/room/bofang-3.png" alt="#">'+ rs.play_num +'</span></p>\
                        </li>\
                    </ul>\
                </div>'
            $('#di_wei').css('display','none')
        }
        $('#ul_history').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.3)
        $('.img_love_hg').css('height',imag)
        $('#ul_history i.opactiy').css('height',imag)
    }
    recordsObj.lvBookObj = function(res){
        var html = ''
        if (res.length == '0') {
            $('#di_wei').css('display','block')
        }else{
            for (var i = 0; i < res.length; i++) {
                mathbookObj()
                var re = res[i]
                console.log(re.collected)
                html += '<li class="li_cont recoand" data-v="'+ re.title+'" data-g="'+ re.poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="listreco" data-g="'+ re.poster +'" data-v="'+ re.title+'" data-c="'+ re.novel_id +'">\
                                <div class="link d_left">\
                                    <p class="p_number">\
                                        <img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ re.play +'</span>\
                                    </p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;height: 219px;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ re.poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ re.title+'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="Areco" data-c="'+ re.novel_id +'"><p class="p_offOn"><img class="img_xing" src=" '+( re.collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
            $('#ul_lishi').html(html)
            $('#di_wei').css('display','none')
        }
        
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        gifNone()
        var thing = $('li.recoand')
        var arry = []
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        // console.log(arryObj)
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    recordsObj.dynacmObj = function(res){
        var html = ''
        if (res.length == '0') {
            $('#di_wei').css('display','block')
        }
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            var re = res[i]
            var tim = re.created_date.substring(11,19)
            var str = re.images;
            var img = str.split(',');
            html += '<div class="div_namic">\
                <div class="p_user">\
                    <a data-t="an_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                        <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                        <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                        <p class="p_lx">'+ re.craft +'</p>\
                    </a>';
                    if (re.followed == '0') {
                        html += '<a data-t="Afoat" data-d="'+ re.anchor_id +'" data-w="A" class="link w12" href="javascript:void(0)">+關注</a>'
                    }else{
                        html += '<a data-t="Afoat" data-d="'+ re.anchor_id +'" data-w="A" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                    }
                html += '</div><div><p class="texCent">'+ re.message +'</p></div>'
                    /*if (re.video != '') {
                        html += '<video id="dy_video"  class="" poster="#" controls="true"  src="'+ re.video +'"></video>'
                    }*/
                    // console.log(img.length-3)
                    if (img.length == '1' && img != '') {
                        var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                        html +='<ul class="ul_img">\
                                    <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="W100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                </ul>'
                    }else if(img.length == '2'){
                        var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                        html +='<ul class="ul_img">\
                                    <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                </ul>'
                    }else if(img.length >= '3'){
                        var len = img.length - '3'
                        var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                        var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                        html += '<ul class="ul_img">\
                                    <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                    <li class="w28">\
                                        <p data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                        <p style="height: .7rem;"></p>\
                                        <p data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                    </li>\
                                </ul>'
                    }
                html += '<p class="bot_A"><li></li>\
                    <a data-t="reco_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn></a>\
                    <a data-t="reco_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn></a>\
                    <a data-t="reco_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                </p>\
            </div>'
        }
        $('#di_wei').css('display','none')
        $('#lidynam').html(html)
        gifNone()
    }
    //下拉刷新
    recordsObj.videoload = function(res){
        console.log(res)
        var dat = res
        var arrLen = res.length;
        var result = ''
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            randomObj()
            var rs = dat[i]
            var Vbe = dat[i].label
            var lab = Vbe.split('|')
            result += '<div class="div_Icon_sc">\
                    <a class="" href="javascript:void(0)"><img class="AImgrem" src="images/my/wxz.png" alt="" /></a>\
                    <ul class="ul_video">\
                        <li data-t="recdet" data-d="'+ dat[i].class_id +'" data-g="'+ dat[i].cover_one +'" data-v="'+ dat[i].video_id +'" class="w49">\
                            <img class="w100 img_love_hg" style="background:url('+ sui +');background-size:100% 100%;"  onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ dat[i].cover_one +'" alt="">\
                        </li>\
                        <li data-t="recdet" data-d="'+ dat[i].class_id +'" data-g="'+ dat[i].cover_one +'" data-v="'+ dat[i].video_id +'" class="w49">\
                            <p class="p_love_clamp ">'+ dat[i].title +' </p>\
                            <p class="p_bq_span">'
                    if (lab.length != 0) {
                        for (var z = 0; z < 1; z++) {
                            result +='<span class="sp_bq">'+lab[z] +'</span>'
                        }
                    }    
                result += '</p>\
                            <p><span>'+ dat[i].class_name +'</span><span class="fr"><img class="im_gk_lov" src="images/room/bofang-3.png" alt="#">'+ dat[i].play_num +'</span></p>\
                        </li>\
                    </ul>\
                </div>'
            }
        }else{
            recordsObj.pullLoad.lock();
            $.alertMsg('已經到底了，沒有更多視頻了')
            $('#reco_hide').show()
        }
            $('#ul_history').append(result)
            var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/1.3)
            $('.img_love_hg').css('height',imag)
            $('#ul_history i.opactiy').css('height',imag)
            recordsObj.pullLoad.resetload();
    }
    recordsObj.bookload = function(res){
        console.log(res)
        var dat = res
        var arrLen = res.length;
        var result = ''
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            mathbookObj()
            result += '<li class="li_cont recoand" data-v="'+ dat[i].title+'" data-g="'+ dat[i].poster +'">\
                    <a class="showNow" href="javascript:void(0)" data-t="listreco" data-g="'+ dat[i].poster +'" data-v="'+ dat[i].title+'" data-c="'+ dat[i].novel_id +'">\
                        <div class="link d_left">\
                            <p class="p_number">\
                                <img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ dat[i].play +'</span>\
                            </p>\
                            <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;height: 219px;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ dat[i].poster +'" alt="" >\
                            <p class="center p_tit_book"><span>'+ dat[i].title+'</span></p>\
                        </div>\
                    </a>\
                    <a href="javascript:void(0)" data-t="Areco" data-c="'+ dat[i].novel_id +'"><p class="p_offOn"><img class="img_xing" src=" '+( dat[i].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                </li>'
            }
        }else{
            recordsObj.pullLoad.lock();
            $.alertMsg('已經到底了，沒有更多了')
            $('#reco_hide').show()
        }
            $('#ul_lishi').append(result)
            var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
            $('.imgfan').css('height',imag)
            var thing = $('li.recoand')
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
            recordsObj.pullLoad.resetload();
    }
    recordsObj.dynamload = function(res){
        console.log(res)
        var dat = res
        var arrLen = res.length;
        var result = ''
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){
                var re = dat[i]
                var tim = re.created_date.substring(11,19)
                var str = re.images;
                var img = str.split(',');
                result += '<div class="div_namic">\
                    <div class="p_user">\
                        <a data-t="an_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                            <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                            <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                            <p class="p_lx">'+ re.craft +'</p>\
                        </a>';
                        if (re.followed == '0') {
                            result += '<a data-t="Afoat" data-d="'+ re.anchor_id +'" data-w="A" class="link w12" href="javascript:void(0)">+關注</a>'
                        }else{
                            result += '<a data-t="Afoat" data-d="'+ re.anchor_id +'" data-w="A" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                        }
                    result += '</div><div><p class="texCent">'+ re.message +'</p></div>'
                        /*if (re.video != '') {
                            result += '<video id="dy_video"  class="" poster="#" controls="true"  src="'+ re.video +'"></video>'
                        }*/
                        // console.log(img.length-3)
                        if (img.length == '1' && img != '') {
                            var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                            result +='<ul class="ul_img">\
                                        <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="W100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                    </ul>'
                        }else if(img.length == '2'){
                            var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                            result +='<ul class="ul_img">\
                                        <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                        <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                            <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    </ul>'
                        }else if(img.length >= '3'){
                            var len = img.length - '3'
                            var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                            var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                            result += '<ul class="ul_img">\
                                        <li data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                            <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                        <li class="w28">\
                                            <p data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                            <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                            <p style="height: .7rem;"></p>\
                                            <p data-t="imgs_deta" data-m="'+ re.enclosure_id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                        </li>\
                                    </ul>'
                        }
                    result += '<p class="bot_A"><li></li>\
                        <a data-t="reco_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn></a>\
                        <a data-t="reco_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn></a>\
                        <a data-t="reco_detail" data-d="'+ re.enclosure_id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                    </p>\
                </div>'
            }
        }else{
            recordsObj.pullLoad.lock();
            $.alertMsg('已經到底了，沒有更多了')
            $('#reco_hide').show()
        }
            $('#lidynam').append(result)
            recordsObj.pullLoad.resetload();
    }
    recordsObj.gorecdet = function(typ,cla,ig,obj){
        obj.find('.rec_opac').show()
        obj.siblings().find('.rec_opac').hide()
        Global.playVideo(typ,cla,ig)
    }
    recordsObj.goMycords = function(obj){
        var typ = obj.attr('data-d')
        obj.addClass('cur').siblings().removeClass('cur')
        recordsObj.createEvent()
        $('#reco_hide').hide()
        if (typ == '1') {
            recordsObj.goajaxPlay()
            $('#binajiA').attr('data-l','1')
            $('.div_video_re').show().siblings('.div_audio_re,.div_dynam_re').hide()
        }else if(typ == '2'){
            $('#binajiA').attr('data-l','2')
            $('.div_audio_re').show().siblings('.div_video_re,.div_dynam_re').hide()
            recordsObj.booksObj('/novel/play_record',2)
        }else{
            $('#binajiA').attr('data-l','3')
            $('.div_dynam_re').show().siblings('.div_audio_re,.div_video_re').hide()
             recordsObj.booksObj('/live/enclosure_collect_record',3)
        }
    }
    recordsObj.goAbianj = function(obj){
        var thisL = obj.attr('data-l')
        if (thisL == '1') {
            console.log('這是視頻')
        }else if(thisL == '2'){
            console.log('這是聽書')
        }else{
            console.log('這是動態')
        }
    }
    recordsObj.bookLsjl = function(typ){
        window.scrollTo(0,0)
        if (typ == '1') {
            $('.div_video_re').show().siblings('.div_audio_re,.div_dynam_re').hide()
            $('#Acur_one').addClass('cur').siblings().removeClass('cur')
        }else if(typ == '2'){
            $('#Acur_two').addClass('cur').siblings().removeClass('cur')
            $('.div_audio_re').show().siblings('.div_video_re,.div_dynam_re').hide()
            recordsObj.booksObj('/novel/play_record',2)
        }else{
            $('#Acur_three').addClass('cur').siblings().removeClass('cur')
            $('.div_dynam_re').show().siblings('.div_audio_re,.div_video_re').hide()
             recordsObj.booksObj('/live/enclosure_collect_record',3)
        }
    }
    recordsObj.scrTop = function(tp){
        setTimeout(function(){
            window.scrollTo(0,tp-300)
        },70)
    }
    recordsObj.onloadExecution = function(){
    	recordsObj.createDomObj()
        recordsObj.createEvent()
    }
    recordsObj.init = function(){
	 	recordsObj.onloadExecution()
    }