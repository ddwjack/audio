    var searchObj = new PageController({
       'name': 'search',
       'tpl' : 'template/kaijiang/search.html'
    });
    searchObj.createDomObj = function(){
        this.hedsetObj = $("#searc") 
        this.qxButObj = $(".qx_but")  //取消搜索 dl_lsjl
        this.souButObj = $(".sou_suo")  //开始搜索
        this.formpseabj = $('#inp_sear_cont')
    }
    
    searchObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            searchObj.sectionEvent(e);
        });
        this.qxButObj.unbind('tap').tap(function(){
           searchObj.goBack()
            $('#sear_show').show().siblings('#sear_hide').hide()
            // searchObj.sbutSub()
        })
        /*this.formpseabj.bind('keyup', function(event) {
            if (event.keyCode == "13") {
                searchObj.publiAjaxObj(typLei,Aurl,'after')
            }
        });*/
        this.formpseabj.bind('input porpertychange',function(){
            if ($('#inp_sear_cont').val() != '') {
                $('.a_sea_hed').show()
                $('#a_sea_qx').attr('data-t','searc_A').html('搜索')
            }else{
                $('#a_sea_qx').attr('data-t','search_qux').html('取消')
                $('.a_sea_hed').hide()
            }
　　　　});
        // addEventListener("input",fn,false)
        /*$("#inp_sear_cont").focus(function(){
            $('#a_sea_qx').attr('data-t','searc_A').html('搜索')
        });*/
        this.souButObj.unbind('tap').tap(function(){
            if (ConfigObj.platForm === 'android') {
                if (android_obj.isVPN() == true) {
                    $.alertMsg('當前訪問人數過多，請稍後訪問')
                    return false;
                }
            }
            searchObj.sousuObj()
        })
        // img_sear_hg
    }
    searchObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            var thisC = thisObj.attr("data-c");
            switch (thisT){
                case "A_remov" : searchObj.goremove(thisObj);return true; //刪除   
                case "ArzLVN" : $('.search_alt').hide();return true; //取消   
                case "Axiaci" : searchObj.Axiaci(thisObj);return true; //取消   
                case "over_remov" : searchObj.overObj(thisObj);return true; //取消   
                case "search_qux" : searchObj.goBack();return true; //取消搜索   
                case "searc_A" : searchObj.ONsearch(thisObj);return true; //开始搜索     
                case "A_inp_nul" : searchObj.inpVal(thisObj);return true; //清空搜索     
                case "ALove" : searchObj.goALoveObj(thisObj);return true; //收藏    
                case "Aguau" : footballObj.goimgFoll(thisObj);return true; //关注主播    
                // case "Aguau" : dynamicObj.goAdyflooat(thisObj);return true; //关注主播     
                case "listsear" : searchObj.golistsear(thisC);return true; //进入听书    
                case "anch_detail" : searchObj.goanchdetail(thisObj);return true; //主播空间动态 
                case "user_detail" : searchObj.goxxi(thisObj);return true; //详细动态  

            }
        }
        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            var thisV = thisObL.attr("data-v");
            var thisC = thisObL.attr("data-c");
            var thisG = thisObL.attr("data-g");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                 case "liLabel" : searchObj.liLabelObj(thisObL);searchObj.ONsearch(thisObj);return true; //熱門搜索 
                case "Lireco" : searchObj.liLabelObj(thisObL);searchObj.ONsearch(thisObj);return true; //搜索歷史  
               /* case "liLabel" : searchObj.liLabelObj(thisObL);return true; //熱門搜索 
                case "Lireco" : searchObj.liLabelObj(thisObL);return true; //搜索歷史  */
                case "goVide" : searchObj.goVideObj(thisV,thisC,thisG);return true; //观看视频  Global.playVideo(typ,cla,ig) 
                case "detasear" : searchObj.detasearObj(thisObL);return true; //查看主播详情
                case "img_deta" : searchObj.goimgDeta(thisObL);return true; //*  动态图片详情

            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "img_deta" : searchObj.goimgDeta(thisObL);return true; //* 

            }
        }
    }
    searchObj.goVideObj = function(thV,thC,thG){
        Global.playVideo(thV,thC,thG)
    }
    searchObj.golistsear = function(id){
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
    searchObj.inpVal = function(obj){
        $('#a_sea_qx').attr('data-t','search_qux').html('取消')
        $('#inp_sear_cont').val('')
        $('.a_sea_hed').hide()
    }
    searchObj.ONsearch = function(obj){
        searchObj.publiAjaxObj(typLei,Aurl,'after')
    }
    searchObj.detasearObj = function(obj){
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            searchObj.show();
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(obj.attr('data-d'),obj.attr('data-f'),obj.attr('data-l'))
        });
    }
    searchObj.goanchdetail = function(obj){
        offTop = obj[0].offsetTop
        // localStorage.setItem("offTops", offTop);
        var thisD = obj.attr('data-d')
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            searchObj.show(false,function(){
            });
            searchObj.scrTop(offTop)
        }
        AvdetailsObj.show(true,function(){
            AvdetailsObj.detaObj(thisD,offTop)
        });
    }
    searchObj.goimgDeta = function(obj){
        offTop = obj[0].offsetTop
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z') 
        nodisturbObj.goBack = function(){
            searchObj.show(false);
            nodisturbObj.destroy();
            searchObj.scrTop(offTop)
        }
        nodisturbObj.show(true,function(){
            nodisturbObj.Imgdetail(thisM,thisG,offTop,thisZ)
        });
    }
    searchObj.goxxi = function(obj){
        offTop = obj[0].offsetTop
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            searchObj.show(false,function(){
            });
            searchObj.scrTop(offTop)
            Global.fixd()
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN,offTop)
        });
    }
    searchObj.goremove = function(obj){
        var thisV = obj.attr('data-v')
        var thisd = obj.attr('data-d')
        var thisL = obj.attr('data-l')
        $('#p_titl_jl').html('刪除歷史記錄')
        $('#conten_jl').html('確認刪除該條記錄')
        $('#sp_sc').html('刪除')
        $('#A_sc_th').attr('data-d',thisd)
        // obj.parent().hide()
        $('.search_alt').show()
    }
    function removeres(val,arr,typ){
        console.log(arr)
        var arrA = arr.split(",");  
        var arrNew = new Array();  
        //从数组中删除指定str  
        for(var i = 0; i < arrA.length; i++){                 
            if(val != arrA[i]) {  
                arrNew.push(arrA[i]);  
            }   
        }  
        var hash = arrNew.toString()
        if (hash == '') {$('#lishi').hide()}
        switch(typ) {
            case '1':
                localStorage.setItem('vide',hash);
                break;
            case '2':
                localStorage.setItem('book',hash);
                break;
            case '3':
                localStorage.setItem('auch',hash);
                break;
            default:
                localStorage.setItem('dynacm',hash);
                break;
        }
    }
    searchObj.overObj = function(obj){
        var thisd = obj.attr('data-d')
        var thisL = obj.attr('data-l')
        $('#sp_sc').html('清空')
        $('#A_sc_th').attr('data-d',thisd)
        $('#A_sc_th').attr('data-l',thisL)
        // obj.parent().hide()
        $('.search_alt').show()
    }
    searchObj.Axiaci = function(obj){
        var thisD = obj.attr('data-d')
        var thisL = obj.attr('data-l')
        if (!thisD) {
            $('#lishi').hide()
            if (thisL == '1') {
                localStorage.removeItem('vide')
            }else if(thisL == '2'){
                localStorage.removeItem('book')
            }else if(thisL == '3'){
                localStorage.removeItem('auch')
            }else{
                localStorage.removeItem('dynacm')
            }
        }else{
            $('.seac_ls').find('li').eq(thisD).hide()
            var thisL = $('.seac_ls').find('li').eq(thisD).attr('data-l')
            var thisV = $('.seac_ls').find('li').eq(thisD).attr('data-v')
            searchObj.switchObj(thisL,thisV)
        }
        $('.search_alt').hide(500)
    }
    searchObj.switchObj= function(thisL,thisV){
        // console.log(thisL)
        switch(thisL) {
            case '1':
                var Avideo = localStorage.getItem("vide")
                removeres(thisV,Avideo,thisL)
                break;
            case '2':
                var Abook = localStorage.getItem("book")
                removeres(thisV,Abook,thisL)
                break;
            case '3':
                var Aauch = localStorage.getItem("auch")
                removeres(thisV,Aauch,thisL)
                break;
            default:
                var Adynacm = localStorage.getItem("dynacm")
                removeres(thisV,Adynacm,thisL)
                break;
        }
    }
    searchObj.liLabelObj = function(obj){
        var thisV = obj.attr('data-v')
        $('#inp_sear_cont').val(thisV)
        $('#a_sea_qx').attr('data-t','searc_A').html('搜索')
        $('.a_sea_hed').show()
    }
    searchObj.publicObj = function(typ){
        searchObj.timeType(typ)
    }
    searchObj.timeType = function(typ) {
        setTimeout(function() {
            typLei = typ
            if(typLei == '1'){
                var tyUrl = '/VideoInterface/search'
                searchObj.publiAjaxObj(typLei,tyUrl,'before')
            }else if (typLei == '2') {
                var tyUrl = '/novel/search'
                console.log(282)
                searchObj.publiAjaxObj(typLei,tyUrl,'before')
            }else if(typLei == '3'){
                var tyUrl = '/live/search_anchor'
                searchObj.publiAjaxObj(typLei,tyUrl,'before')
            }else{
                var tyUrl = '/live/search_enclosure'
                searchObj.publiAjaxObj(typLei,tyUrl,'before')
            }
            Aurl = tyUrl
            searchObj.seaeacah(typLei)
        },100)
    }
    searchObj.seaeacah = function(typ){
        switch(typ) {
            case 1:
                var Avideo = localStorage.getItem("vide")
                searchObj.recordSearch(Avideo,1)
                break;
            case 2:
                var Abook = localStorage.getItem("book")
                searchObj.recordSearch(Abook,2)
                break;
            case 3:
                var Aauch = localStorage.getItem("auch")
                searchObj.recordSearch(Aauch,3)
                break;
            default:
                var Adynacm = localStorage.getItem("dynacm")
                searchObj.recordSearch(Adynacm,4)
                break;
        }
    }
    searchObj.recordSearch = function(re,id){
        if (re) {
            var html = ''
            var htm2 = ''
            var txt = re.split(',')
            html += '<p class="p_title_search">搜索歷史<a data-t="over_remov" data-l="'+ id +'" class="fr" href="javascript:void(0)"><img class="img_schu" src="images/home/shanchu.png" alt="#"></a></p>\
                <ul id="ul_recha_sea" class="seac_ls">'
            if (txt.length >= 4) {
                for (var i = 0; i < 4; i++) {
                    html += '<li data-t="Lireco" data-v="'+txt[i]+'" data-l="'+ id +'" class="w100 li_sea_ls">\
                            <span class="span_title">'+txt[i]+'</span>\
                            <a data-t="A_remov" data-d="'+ i +'" data-v="'+txt[i]+'" data-l="'+ id +'" class="fr A_fr_gb" href="javascript:void(0)"><i class="i_icon_x"></i></a>\
                        </li>'
                    htm2 += '<span>'+ txt[i]+'</span>'
                }
            }else{
                for (var i = 0; i < txt.length; i++) {
                    html += '<li data-t="Lireco" data-v="'+txt[i]+'" data-l="'+ id +'" class="w100 li_sea_ls">\
                            <span class="span_title">'+txt[i]+'</span>\
                            <a data-t="A_remov" data-d="'+ i +'" data-v="'+txt[i]+'"  data-l="'+ id +'" class="fr A_fr_gb" href="javascript:void(0)"><i class="i_icon_x"></i></a>\
                        </li>'
                    htm2 += '<span>'+ txt[i]+'</span>'
                }
            }
            html += '</ul>'
            $('#lishi').html(html)
            $('#p_nul_text').html(htm2)
            
        }else{
            $('#lishi').hide()
        }
    }
    searchObj.publiAjaxObj = function(typ,url,hand){
        if (hand == 'after') {
            var valmes = $('#inp_sear_cont').val()
            if (valmes == '') {
                $.alertMsg('請輸入搜索內容');
                return false;
            }else{
                var keyword = valmes
                searchObj.setSearch(keyword,typ)
            }
        }
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            keyword:keyword,
            page:'1',
            rows:'10',
            handle:hand,
        }
        console.log(typ)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+url,
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    gifNone()
                    // console.log(res.info)
                    if (hand == 'before') {
                        searchObj.labelObj(res.info)
                        if (typ == '1') {
                            searchObj.videosObj(res.info.guess)
                        }else if(typ == '2'){
                            searchObj.contentObj(res.info)
                        }else if(typ == '3'){
                            searchObj.achoursObj(res.info.guess)
                        }else{
                            searchObj.dynacm(res.info.guess)
                        }
                    }else{
                        if (typ == '1') {
                            searchObj.videosObj(res.info,'aft')
                        }else if (typ == '2') {
                            searchObj.bookrecodObj(res.info)
                        }else if(typ == '3'){
                            searchObj.achoursObj(res.info,'aft')
                        }else{
                            searchObj.dynacm(res.info,'aft')
                        }
                        // $('#inp_sear_cont').val('')
                        // $('#a_sea_qx').attr('data-t','search_qux').html('取消')
                    }
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    searchObj.goALoveObj = function(obj){
        var thisD = obj.attr('data-c')
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            client:client,
            novel_id:thisD,
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
                    if (res.suc == '收藏成功') {
                        $(obj).find('.img_xing').attr('src','images/audio/heart-br.png')
                    }else{
                        $(obj).find('.img_xing').attr('src','images/audio/wei.png')
                    }
                    $.alertMsg(res.suc)
                    // kaijiangIndexObj.lisAjax(1)
                    // res.info = $.parseJSON(Global.crypt(res.result)); 
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    searchObj.setSearch = function(keyword,typ){
        $('#p_nul_text').prepend('<span>'+ keyword+'</span>')
        // localStorage.setItem('vide',hash)
        var thing = $('#p_nul_text').find('span')
        var arry = []
        for (var i = 0; i < thing.length; i++) {
            var title = thing[i].innerHTML
            arry[i] = title
        }
        var hash=[];
        for (var i = 0; i < arry.length; i++) {
            if(hash.indexOf(arry[i])==-1){
                hash.push(arry[i]);
            }
        }
        switch(typ) {
            case 1:
                localStorage.setItem('vide',hash);
                break;
            case 2:
                localStorage.setItem('book',hash);
                break;
            case 3:
                localStorage.setItem('auch',hash);
                break;
            default:
                localStorage.setItem('dynacm',hash);
                break;
        }
    }
    searchObj.labelObj = function(res){
        var html = ''
        var lab = res.labels
        var gue = res.guess
        for (var i = 0; i < lab.length; i++) {
            html += '<li data-t="liLabel" data-v="'+ lab[i]+'" class="li_sea_rm"><span class="span_rm">'+ lab[i]+'</span></li>'
        }
        $('#ul_labels').html(html)
    }
    searchObj.videosObj = function(res,ty){
        if (ty == 'aft') {
            $('.searNone').hide()
            $('#div_sea_vide').css('padding-top','44px;')
        }
        var html = ''
        for (var i = 0; i < res.length; i++) {
            randomObj()
            var vid = res[i]
            var Vbe = res[i].label
            var lab = Vbe.split('|')
            html += '<ul class="ul_video">\
                <li data-t="goVide" data-v="'+ vid.id +'" data-c="'+vid.class+'" data-g="'+ vid.cover_one +'" class="w35">\
                    <img class="w100 img_sear_hg" style="background:url('+ sui +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+sui+"\'"+'" src="'+ vid.cover_one+'" alt="">\
                </li>\
                <li data-t="goVide" data-v="'+ vid.id +'" data-c="'+vid.class+'" data-g="'+ vid.cover_one +'" class="w61">\
                    <p class="p_sea_clamp ">'+ vid.title +' </p>\
                    <p class="p_bq_span">'
                    if (lab.length != 0) {
                        for (var z = 0; z < 1; z++) {
                            html +='<span class="sp_bq">'+lab[z] +'</span>'
                        }
                    }
            html += '</p>\
                    <p><span>'+ vid.class_name +'</span><span class="fr"><img class="im_gk_lov" src="images/room/bofang-3.png" alt="#">'+ vid.play_num +'</span></p>\
                </li>\
            </ul>'
        }
        $('#div_sea_vide').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth - 32) *0.35)/1.3)
        $('.img_sear_hg').css('height',imag)
    }
    searchObj.contentObj = function(res){
        var htm2 = ''
        var gue = res.guess
        for (var i = 0; i < gue.length; i++) {
            mathbookObj()
            var gues = gue[i]
            htm2 += '<li class="li_cont searand" data-v="'+ gues.title+'" data-g="'+ gues.poster +'">\
                        <a class="showNow" href="javascript:void(0)" data-t="listsear" data-g="'+ gues.poster +'" data-v="'+ gues.title+'" data-c="'+ gues.id +'">\
                            <div class="link d_left">\
                                <p class="p_number">\
                                    <img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ gues.play +'</span>\
                                </p>\
                                <img class="w100 imgfan" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ gues.poster +'" alt="" style="background:url('+ bookImg +');background-size:100% 100%;height: 219px;">\
                                <p class="center p_tit_book"><span>'+ gues.title+'</span></p>\
                            </div>\
                        </a>\
                        <a href="javascript:void(0)" data-t="ALove" data-c="'+ gues.id +'"><p class="p_offOn"><img class="img_xing" src=" '+( gues.collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                    </li>'
        }
        $('#ul_Lists').html(htm2)
        var thing = $('li.searand')
        var arry = []
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        // console.log(arryObj) 
        // $('.d_right').css('height',imag)
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }else{
            console.log(556)
        }
    }
    searchObj.achoursObj = function(res,ty){
        if (ty == 'aft') {
            $('.searNone').hide()
            $('#sea_achou').css('padding-top','44px;')
        }
        var html = ''
        // console.log(res)
        for (var i = 0; i < res.length; i++) {
            var re = res[i]
            html += '<ul class="ul_sea_lis">\
                        <li data-t="detasear" data-d="'+ re.anchor_id+'" data-l="'+ re.type +'" data-h="'+ re.anchor_no +'" class="li_vate w17">\
                            <img class="img_wid" src="'+ re.avatar_url +'" alt="#">\
                        </li>\
                        <li data-t="detasear" data-d="'+ re.anchor_id+'" data-l="'+ re.type +'" data-h="'+ re.anchor_no +'" class="li_vate w60">\
                            <p class="p_sea_nam">'+ re.nickname +'<span class="sp_sea_ty">'
                            if (re.living == 'ON') {
                                html +='<i class="i_sa_icon "></i>在線'
                            }else if(re.online == 'OFF'){
                                html +='<i class="i_sa_icon  i_lixian"></i>離線'
                            }
                    html += '</span></p><p>'
                            // html +='<i class="i_sa_icon i_mlz i_zaix i_lixian"></i>在線'  lis[i].living == 'OFF' ? '空闲' : '忙线')
                            // onLin.online == 'OFF' ? '离线' : '在线'  onLin.living =='ON'  LVN onLin.living =='ON'  直播中
                    if (re.type == '1VN') {
                        html += '<span class="i_type i_ty_zbj">直播間</span>'
                    }else if(re.type == '1V1'){
                        html += '<span class="i_type i_ty_ydy">一對一</span>'
                    }else{
                        html += '<span class="i_type i_ty_zbj">直播間</span><span class="i_type i_ty_ydy">一對一</span>'
                    }
            html += '</p>\
                        </li>\
                        <li class="li_vate w23">\
                            <p class="p_sea_boot"><img class="im_wi_xin" src="images/room/xin.png" alt=""><span class="sp_gz_num">'+ re.charm +'</span></p>\
                            <p>'
                    if (re.followed == '0') {
                        html += '<a data-t="Aguau" data-d="'+ re.anchor_id +'" href="javascript:void(0)" class="sp_sa_gz"><span class="Agz ">+關注</span></a>'
                    }else{
                        html += '<a data-t="Aguau" data-d="'+ re.anchor_id +'" href="javascript:void(0)" class="sp_sa_gz"><span class="Agz sp_tex_gz">已關注</span></a>'
                    }
            html += '</p>\
                        </li>\
                    </ul>'
        }
        $('#sea_achou').html(html)
    }
    searchObj.dynacm = function(res,ty){
        if (ty == 'aft') {
            $('.searNone').hide()
            $('#sea_dynam').css('padding-top','54px')
        }
        var html = ''
        for (var i = 0; i < res.length; i++) {
            var re = res[i]
            var tim = re.created_date.substring(11,19)
            var str = re.images;
            var img = str.split(',');
            console.log(re)
            console.log(re.followed)
            html += '<div class="div_namic" style="padding-bottom:10px;">\
                <div class="p_user">\
                    <a data-t="anch_detail" data-d="'+ re.anchor_id +'" data-n="'+ re.nickname +'" data-g="'+ re.followed +'" class="link w86" href="javascript:void(0)">\
                        <img class="img_user fl" src="'+ re.avatar_url +'" alt="#">\
                        <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                        <p class="p_lx">'+ re.craft +'</p>\
                    </a>';
                    if (re.followed == '0') {
                        html += '<a data-t="Aguau" data-w="s" data-d="'+ re.anchor_id +'" class="link w12" href="javascript:void(0)">+關注</a>'
                    }else{
                        html += '<a data-t="Aguau" data-w="s" data-d="'+ re.anchor_id +'" class="link w12 colGray" href="javascript:void(0)">已關注</a>'
                    }
                html += '</div><div><p class="texCent">'+ re.message +'</p></div>'
                    /*if (re.video != '') {
                        html += '<video id="dy_video"  class="" poster="#" controls="true"  src="'+ re.video +'"></video>'
                    }*/
                    // console.log(img.length-3)
                    if (img.length == '1' && img != '') {
                        var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                        html +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="W100" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie+'px;width:100%;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></i></li>\
                                </ul>'
                    }else if(img.length == '2'){
                        var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                        html +='<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w49" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" class="w49" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;"></i></li>\
                                </ul>'
                    }else if(img.length >= '3'){
                        var len = img.length - '3'
                        var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                        var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                        html += '<ul class="ul_img">\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[0]+'" data-z="1" class="w70" style="background:url(images/channel/dynam2.png)no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                        <i class="link w100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;"></i></li>\
                                    <li class="w28">\
                                        <p data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[1]+'" data-z="2" style="background:url(images/channel/dynam3.png)no-repeat center;background-size:cover;height:'+hie2+'px;">\
                                        <i class="link w100" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i></p>\
                                        <p style="height: .7rem;"></p>\
                                        <p data-t="img_deta" data-m="'+ re.id +'" data-g="'+ img[2]+'" data-z="3" class="pAfter" style="background:url(images/channel/mor.png)no-repeat center;background-size:cover;height:'+hie2+'px;"><i class="link w100" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></i><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                    </li>\
                                </ul>'
                    }
                html += '<p class="bot_A"><li></li>\
                    <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w60" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/chakan-3.png" alt="#"><sapn class="sp_rel">'+ re.view +'</sapn></a>\
                    <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/qipao.png" alt="#"><sapn class="sp_rel">'+ re.reply +'</sapn></a>\
                    <a data-t="user_detail" data-d="'+ re.id +'" data-n="'+ re.nickname +'" class="A_foot_dny w20" href="javascript:void(0)"><img class="A_img_icon" src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re.thumbs +'</sapn></a>\
                </p>\
            </div>'
        }
        $('#sea_dynam').html(html)
    }
    searchObj.bookrecodObj = function(res){
        $('.searNone').hide()
        $('.con_patop').css('padding-top','44px;')
        var html = ''
        for (var i = 0; i < res.length; i++) {
            mathbookObj()
            var gues = res[i]
            html += '<li class="li_cont searand" data-v="'+ gues.title+'" data-g="'+ gues.poster +'">\
                    <a class="showNow" href="javascript:void(0)" data-t="listsear" data-g="'+ gues.poster +'" data-v="'+ gues.title+'" data-c="'+ gues.id +'">\
                        <div class="link d_left">\
                            <p class="p_number">\
                                <img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ gues.play +'</span>\
                            </p>\
                            <img class="w100 imgfan" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ gues.poster +'" alt="" style="height: 219px;background:url('+ bookImg +');background-size:100% 100%;">\
                            <p class="center p_tit_book"><span>'+ gues.title+'</span></p>\
                        </div>\
                    </a>\
                    <a href="javascript:void(0)" data-t="ALove" data-c="'+ gues.id +'"><p class="p_offOn"><img class="img_xing" src=" '+( gues.collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                </li>'
        }
        $('#ul_Lists').html(html)
        var thing = $('li.searand')
        var arry = []
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        // $('.d_right').css('height',imag)
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    searchObj.scrTop = function(tp){
        setTimeout(function(){
            window.scrollTo(0,tp-300)
        },70)
    }
    searchObj.seloadObj = function() {
        setTimeout(function() {
            searchObj.createDomObj()
            searchObj.createEvent()
            window.scrollTo(0,0) // search
        },100)
    }
    searchObj.onloadExecution = function(){
        searchObj.seloadObj()
    }
    searchObj.init = function(){
        searchObj.onloadExecution()
    }