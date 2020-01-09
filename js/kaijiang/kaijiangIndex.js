var kaijiangIndexObj = new PageController({
    'name': 'kaijiangIndex',
    'tpl': 'template/kaijiang/kaijiangIndex.html',
});
    kaijiangIndexObj.ajaxData = new Object();
    kaijiangIndexObj.createDomObj = function(){
        this.bannerImgObj = $("#kaijiangIndex"); //轮播  SongName
        this.pageAObj = $("#returnPageA"); //轮播  SongName 
        this.nestsObj = $("#pageB_nextSong,#PageA_NextSong"); //下一首 
        this.textsObj = $("#pageB_preSong,#pageB_preSongss"); //上一首 
        this.playsObj = $("#plays,#play"); //播放 
        this.pauesObj = $("#paue,#paues"); //暂停 
        this.playMode = $("#playMode"); //播放模式  
        // this.pagetime = $("#pageA_timeLine"); //进度条  
        this.nowsongs = $("#nowSong_information,#pageA_SingerImg"); //跳轉播放頁面 ul_typ
        this.seaInpu = $('#search_input') //搜索
        this.sealsjl = $('#lsjl_sear')  //歷史記錄  
        this.shuaxin = $('#homshuax')  //點擊刷新  
        // this.moreObjs = $(".p_more"); //更多
    }
    kaijiangIndexObj.createEvent = function(){
        this.bannerImgObj.unbind('tap').tap(function(e){
            kaijiangIndexObj.sectionEvent(e)
        })
        this.pageAObj.unbind('tap').tap(function(){
            $('#pageB').css('transform','translate3d(0px, 100%, 0px)')
        })
        this.nestsObj.unbind('tap').tap(function(){
            if (ConfigObj.platForm === 'android') {
                android_obj.musicNext()
            }else{
                ios_obj.musicNext()
            }
        })
        this.seaInpu.unbind('tap').tap(function(){
            searchObj.goBack = function(){
                searchObj.destroy()
                kaijiangIndexObj.show();
                Global.fixd()
            }
            searchObj.show(true,function(){
                searchObj.publicObj(2)
            });
        })
        this.sealsjl.unbind('tap').tap(function(){
            recordsObj.goBack = function(){
                recordsObj.destroy()
                kaijiangIndexObj.show(true);
                Global.fixd()
            }
            recordsObj.show(true,function(){
                recordsObj.bookLsjl(2)
            });
        })
        this.shuaxin.unbind('tap').tap(function(){
            // $('.div_log').show()
            gifJson()
            Global.channelId()
            var tabId = $('#ul_typ').find('li.on').attr('data-d')
            if (tabId == '1') {
                kaijiangIndexObj.lisAjax(1)
            }else if(tabId == '2'){
                kaijiangIndexObj.lisAjax(2)
            }else if(tabId == '3'){
                kaijiangIndexObj.lisAjax(3)
            }else{
                kaijiangIndexObj.lisAjax(4)
            }
            // kaijiangIndexObj.onloadExecution();
            // kaijiangIndexObj.show(true)
        })
        this.textsObj.unbind('tap').tap(function(){
            if (ConfigObj.platForm === 'android') {
                android_obj.musicPrev()
            }else{
                ios_obj.musicPrev()
            }
        })
        this.playsObj.unbind('tap').tap(function(){
            // console.log('33')
            $('#play').hide().siblings().css('display','block')
            if (ConfigObj.platForm === 'android') {
                android_obj.musicPlay()
            }else{
                ios_obj.musicPlay()
            }
        })
        this.pauesObj.unbind('tap').tap(function(){
            $('#paue').hide().siblings().css('display','block')
            console.log(90)
            // bookNmae('1')
            if (ConfigObj.platForm === 'android') {
                android_obj.musicPlay()
            }else{
                ios_obj.musicPlay()
            }
            // console.log('38')
        })
        this.playMode.unbind('tap').tap(function(){
            var obj = $(this).find('i');
            playModeNum++;
            if( playModeNum > obj.length -1 ){
                playModeNum = 0;
            }
            obj.eq(playModeNum).show().siblings().hide();
            kaijiangIndexObj.plauMode()
        })
        this.nowsongs.unbind('tap').tap(function(){
            console.log(thisId)
            if (ConfigObj.platForm === 'android') {
                android_obj.playMusic(thisId)
            }else{
                ios_obj.playMusic(thisId)
            }
        })

        var page = 1;
        var size = 10;
        $('#kailistObj').dropload({  
            scrollArea : window,
            distance : 50,
            loadDownFn:function(me){
                kaijiangIndexObj.pullLoad = me
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var result = '';
                var id = $('#ul_typ').find('li.on').attr('data-d')
                if (id == '1') {
                    var typl = $('#ul_book_one').find('li.active').attr('data-l')
                }else if(id == '2'){
                    var typl = $('#ul_book_two').find('li.active').attr('data-l')
                }else if(id == '3'){
                    var typl = $('#ul_book_three').find('li.active').attr('data-l')
                }else{
                    var typl = $('#ul_book_four').find('li.active').attr('data-l')
                }
                // console.log($('#ul_typ').find('li.active').attr('data-d'))
                var postData ={
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    user_id:ConfigObj.meId,
                    category_id:id,
                    page :page,
                    rows :'10',
                    order :typl,
                    sort:'',
                    client:client,
                }
                // console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    // url: ConfigObj.localSite+'/Video/label_video',
                    url: ConfigObj.localSite+'/novel/index',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    timeout:11000,
                    success:function(res){
                        if (res.err == undefined) { 
                            res.info = $.parseJSON(Global.crypt(res.result));
                            // console.log(res.info)
                            if (id == '1') {
                                kaijiangIndexObj.playList(res.info)
                            }else if(id == '2'){
                                kaijiangIndexObj.creatList(res.info)
                            }else if(id == '3'){
                                kaijiangIndexObj.oversList(res.info)
                            }else{
                                kaijiangIndexObj.fourList(res.info)
                            }
                            /*if (typl == 'play') {
                                kaijiangIndexObj.playList(res.info)
                            }else if(typl == 'created_date'){
                                kaijiangIndexObj.creatList(res.info)
                            }else{
                                kaijiangIndexObj.oversList(res.info)
                            }   */                        
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, status){
                        if(status=='timeout'){//超时,status还有success,error等值的情况
                            $.alertMsg('連接超时！请稍后重试。')
                            kaijiangIndexObj.pullLoad.resetload();
                            return false;
                　　　　}
                            $.alertMsg('網絡異常，請稍後重試')
                        kaijiangIndexObj.pullLoad.resetload();
                    }
                })
            }
        })
    }
    function palyObj(typ){
        if (typ == 1) {
            $('#play').hide().siblings().show()
            // $('#paue').hide().siblings().show()
        }else{
            $('#paue').hide().siblings().show()
            // $('#play').hide().siblings().show()
        }
    }
    /*audstart()
    // 加载图片
    audfunction audstart(){ // AV_list
        console.log(186)
        $('.img_src_atr').not('[data-isLoaded]').each(function(){
            var $node = $(this)
            if(isShow($node,'.show_imgsrc') ){
                loadImg($node)
            }
        })
    }
    $(window).scroll(function(event){
        audstart()
    })*/
    kaijiangIndexObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "audiotype" : kaijiangIndexObj.AmoreObj(thisObj);return true; 
                case "overs" : kaijiangIndexObj.oversObj(thisObj);return true; 
                case "zuiduo" : kaijiangIndexObj.zuiduoObj(thisObj);return true; 
                case "zuijin" : kaijiangIndexObj.zuijinObj(thisObj);return true; 
            }
        }
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//
            switch (thisT){
                case "list" : kaijiangIndexObj.listObj(thisObj);return true; 
                case "ALove" : kaijiangIndexObj.ALoveObj(thisObj);return true;  
                case "lovNo" : $.alertMsg('您已点赞');return true;  
            }
        }
    }
    kaijiangIndexObj.oversObj = function(obj){  //全部
        obj.addClass('active').siblings().removeClass('active')
        var id = $('#ul_typ').find('li.on').attr('data-d')
        kaijiangIndexObj.lisAjax(id)
        // AswiperId = id
        // kaijiangIndexObj.loatbootm(id)
        /*if (id == '0') {
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_one')[0].clientHeight);
        }else if(id == '1'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_two')[0].clientHeight);
        }else if(id == '2'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_three')[0].clientHeight);
        }else if(id == '3'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_four')[0].clientHeight);
        }*/
    }
    kaijiangIndexObj.zuiduoObj = function(obj){  //最多
        obj.addClass('active').siblings().removeClass('active')
        var id = $('#ul_typ').find('li.on').attr('data-d')
        kaijiangIndexObj.lisAjax(id,'play')
        // AswiperId = id
        // kaijiangIndexObj.loatbootm(id)
        /*if (id == '0') {
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_one')[0].clientHeight);
        }else if(id == '1'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_two')[0].clientHeight);
        }else if(id == '2'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_three')[0].clientHeight);
        }else if(id == '3'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_four')[0].clientHeight);
        }*/
    }
    kaijiangIndexObj.zuijinObj = function(obj){  //最新
        obj.addClass('active').siblings().removeClass('active')
        var id = $('#ul_typ').find('li.on').attr('data-d')
        kaijiangIndexObj.lisAjax(id,'created_date','created_date')
        // AswiperId = id
        // kaijiangIndexObj.loatbootm(id)
    }
    kaijiangIndexObj.loatbootm = function(id){
        // console.log(262)
        // console.log(id)
        kaijiangIndexObj.createEvent()
        if (id == '1') {
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_one')[0].clientHeight);
        }else if(id == '2'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_two')[0].clientHeight);
        }else if(id == '3'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_three')[0].clientHeight);
        }else if(id == '4'){
            $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_four')[0].clientHeight);
        }
    }
    kaijiangIndexObj.listObj = function(obj){
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        var thisC = obj.attr('data-c')
        var thisV = obj.attr('data-v')
        var thisG = obj.attr('data-g')
        thisId = thisC
        if ($('#oneButton').css('display') == 'none') {
            $('#oneButton').show()
        }
        $('#pageA_SingerImg').find('img').attr('src',thisG)
        $('#pageA_singerName').html(thisV)
        // setimelie(20,364000)  play
        if (ConfigObj.platForm === 'android') {
            android_obj.playMusic(thisC)
        }else{
            ios_obj.playMusic(thisC)
        }
    }
    kaijiangIndexObj.ALoveObj = function(obj){
        // obj.addClass('activeaft')
        var thisC = obj.attr('data-c')
        kaijiangIndexObj.Love(thisC,obj)
    }
    /*kaijiangIndexObj.AmoreObj = function(obj){
        var sibingObj = obj.siblings();
        sibingObj.removeClass('active');
        obj.addClass('active');
        var thisD = obj.attr('data-d')
        kaijiangIndexObj.lisAjax(thisD)
        window.scrollTo(0,0) 
        kaijiangIndexObj.createEvent()
        $('#kaij_hide').hide()
    }*/
    function setimelie(res,time){
        var tim = res/1000,
            son = parseInt(time/1000).toFixed(0),
            bai = parseInt((tim/son)*100).toFixed(2),
            minute = parseInt(tim/60),
            second = parseInt((tim%60).toFixed(2));
            if( minute < 10 ){
                minute = '0' + minute;
            }
            if( second < 10 ){
                second = '0' + second;
            }

            zongte = parseInt(son/60),
            songnd = parseInt((son%60).toFixed(2));
            if( zongte < 10 ){
                zongte = '0' + zongte;
            }
            if( songnd < 10 ){
                songnd = '0' + songnd;
            }
            // console.log(bai+'%')
            // return minute + ':' + second;
        $('.pageTimeLine,.pageB_line').find('div').css('width',bai+'%')
        $('#nowTimes').html(minute + ':' + second)
        $('#allTimes').html(zongte + ':' + songnd)
        AllTime = son
        // console.log(AllTime)
    }
    function zongtime(){
        var lines = document.getElementById('pageA_timeLine'),
            // docut = document.documentElement.clientWidth*0.15;
            endX = 0,
            AllWidth = $('#pageA_timeLine').width();
        function MoveTouch(e){
            // e.preventDefault();
            e.stopPropagation();
            var touches = e.touches[0];
                // endX    = touches.pageX - docut;
                endX = touches.pageX;
        }
        function endTouch(){
            Audio.currentTime = parseInt(endX/AllWidth*AllTime);
            // console.log(Audio.currentTime*1000)
            var zonTime = parseInt(((Audio.currentTime/AllTime)*100).toFixed(2))+'%'
            $('#pageA_timeLine').find('div').css('width',zonTime)
            setimelie(Audio.currentTime*1000,AllTime*1000)
            if (ConfigObj.platForm === 'android') {
                android_obj.doSeekBar(Audio.currentTime*1000)
            }else{
                ios_obj.doSeekBar(Audio.currentTime*1000)
            }
            lines.removeEventListener('touchmove',MoveTouch,false);  
            lines.removeEventListener('touchend',endTouch,false);
        }
        function startTouch(e){
            var touches = e.touches[0];
                // endX    = touches.pageX - docut;
                endX = touches.pageX;
            lines.addEventListener('touchmove',MoveTouch,false); 
            lines.addEventListener('touchend',endTouch,false);   
        }
        lines.addEventListener('touchstart',startTouch,false);
    }
    function singNmae(res){
        $('#pageA_songName').html(res)
    }
    function bookNmae(res,nam,img,id) {
        /*alert(res)
        alert(nam)
        alert(img)
        alert(id)*/
        // console.log(res)
        $('#pageA_songName').html(res)
        $('#pageA_singerName').html(nam)
        $('#pageA_SingerImg').find('img').attr('src',img)
        thisId = id
    }
    kaijiangIndexObj.lisAjax = function(id,od,st){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            category_id:id,
            page :'1',
            rows :'10',
            order :od,
            sort:st,
            client:client,
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/novel/index',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    var obj = res.info
                    if (id == '1') {
                        kaijiangIndexObj.listHtml(obj,id)
                    }else if(id == '2'){
                        kaijiangIndexObj.listbfzd(obj,id)
                    }else if(id == '3'){
                        kaijiangIndexObj.listzjgx(obj,id)
                    }else{
                        kaijiangIndexObj.listthree(obj,id)
                    }
                    $('.ul_title').show()
                    setTimeout(function(){
                        gifNone()
                    },500)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    
    kaijiangIndexObj.titleHtml = function (res) {
        console.log(res)
        var html = ''
        for (var i = 0; i < res.length; i++) {
            html += '<li data-t="audiotype" data-d="'+ res[i].category_id +'" class="">'+ res[i].name+'</li>'
        }
        $('#ul_typ').html(html)
        $('#ul_typ').find('li').eq(0).addClass('active')
    }
    kaijiangIndexObj.listHtml = function(res){
        mathbookObj()
        var html = ''
        var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
        for (var j = 0; j < res.length; j++) {
            cour = test[Math.floor(Math.random()*test.length)]
            html += '<li class="li_cont" data-v="'+ res[j].title +'" data-g="'+ res[j].poster +'">\
                        <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ res[j].poster +'" data-v="'+ res[j].title +'" data-c="'+ res[j].id +'">\
                            <div class="link d_left">\
                                <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ res[j].play +'</span></p>\
                                <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ res[j].poster +'" alt="">\
                                <p class="center p_tit_book"><span>'+ res[j].title +'</span></p>\
                            </div>\
                        </a>\
                        <a href="javascript:void(0)" data-t="ALove" data-c="'+ res[j].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( res[j].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                    </li>'
        }
        $('#ul_List').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        // if (id == '1') {
            kaijiangIndexObj.touchSds()
        // }
        // kaijiangIndexObj.andrObj() 
    }

    kaijiangIndexObj.touchSds = function(){
        TouchSlide( { slideCell:"#kailistObj",
            endFun:function(i){ //高度自适应
                var bd = document.getElementById("tabBox1-kj");
                bd.parentNode.style.height = bd.children[i].children[0].offsetHeight+"px";
                if(i>0)bd.parentNode.style.transition="200ms";//添加动画效果
                // console.log(461)
                window.scrollTo(0,0)
                if (i == '0') {
                    $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_one')[0].clientHeight);
                }else if(i == '1'){
                    $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_two')[0].clientHeight);
                    // kaijiangIndexObj.lisAjax(3)
                }else if(i == '2'){
                    $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_three')[0].clientHeight);
                    // kaijiangIndexObj.lisAjax(4)
                }else if(i == '3'){
                    $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_four')[0].clientHeight);
                }
                // $('#ul_book_one').find('li')
                var typ = $('.ul_book_list').find('li.on').attr('data-l')
                if (typ == 'play') {
                    kaijiangIndexObj.andrObj(typ)
                }else if(typ == 'created_date'){
                    kaijiangIndexObj.andrObj(typ)
                }else{
                    kaijiangIndexObj.andrObj(typ)
                }
                kaijiangIndexObj.createEvent()
            }
        })
    }

    kaijiangIndexObj.listbfzd = function(res,id){
        var html = ''
            var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
            for (var j = 0; j < res.length; j++) {
                mathbookObj()
                cour = test[Math.floor(Math.random()*test.length)]
                html += '<li class="li_cont" data-v="'+ res[j].title +'" data-g="'+ res[j].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ res[j].poster +'" data-v="'+ res[j].title +'" data-c="'+ res[j].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ res[j].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ res[j].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ res[j].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ res[j].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( res[j].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        $('#ul_bfdo').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        kaijiangIndexObj.loatbootm(id)
        // if (id == '1') {
            // kaijiangIndexObj.touchSds()
        // $('#ul_bfdo').html(html)
    }
    kaijiangIndexObj.listzjgx = function(res,id){
        var html = ''
            var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
            for (var j = 0; j < res.length; j++) {
                mathbookObj()
                cour = test[Math.floor(Math.random()*test.length)]
                html += '<li class="li_cont" data-v="'+ res[j].title +'" data-g="'+ res[j].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ res[j].poster +'" data-v="'+ res[j].title +'" data-c="'+ res[j].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ res[j].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ res[j].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ res[j].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ res[j].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( res[j].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        $('#ul_zjxn').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        kaijiangIndexObj.loatbootm(id)
        // if (id == '1') {
        // kaijiangIndexObj.touchSds()
    }
    kaijiangIndexObj.listthree = function(res,id){
        var html = ''
            var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
            for (var j = 0; j < res.length; j++) {
                mathbookObj()
                cour = test[Math.floor(Math.random()*test.length)]
                html += '<li class="li_cont" data-v="'+ res[j].title +'" data-g="'+ res[j].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ res[j].poster +'" data-v="'+ res[j].title +'" data-c="'+ res[j].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ res[j].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ res[j].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ res[j].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ res[j].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( res[j].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        $('#ul_thre').html(html)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        kaijiangIndexObj.loatbootm(id)
        // if (id == '1') {
        // kaijiangIndexObj.touchSds()
    }
    kaijiangIndexObj.playList = function(res){
        console.log(res)
        var dat = res
        var arrLen = res.length;
        var result = ''
        var arry = []
        var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            mathbookObj()
            var cour = test[Math.floor(Math.random()*test.length)]
                result += '<li class="li_cont" data-v="'+ dat[i].title +'" data-g="'+ dat[i].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ dat[i].poster +'" data-v="'+ dat[i].title +'" data-c="'+ dat[i].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ dat[i].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ dat[i].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ dat[i].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ dat[i].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( dat[i].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        }else{
            // me.lock();
            $.alertMsg('已經到底了，沒有更多了')
            kaijiangIndexObj.pullLoad.lock();
            // $('#kaij_hide').show()
        }
        $('#ul_List').append(result)
        kaijiangIndexObj.pullLoad.resetload();
        var thing = $('li.li_cont')
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        $('.d_right').css('height',imag)
        $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_one')[0].clientHeight);
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    kaijiangIndexObj.creatList = function(res){
        var dat = res
        var arrLen = res.length;
        var result = ''
        var arry = []
        var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            mathbookObj()
            var cour = test[Math.floor(Math.random()*test.length)]
                result += '<li class="li_cont" data-v="'+ dat[i].title +'" data-g="'+ dat[i].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ dat[i].poster +'" data-v="'+ dat[i].title +'" data-c="'+ dat[i].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ dat[i].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ dat[i].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ dat[i].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ dat[i].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( dat[i].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        }else{
            // me.lock();
            $.alertMsg('已經到底了，沒有更多了')
            kaijiangIndexObj.pullLoad.lock();
            // $('#kaij_hide').show()
        }
        $('#ul_bfdo').append(result)
        kaijiangIndexObj.pullLoad.resetload();
        // $('#kailistObj').find('.tempWrap').css('height',$('#ul_tjians')[0].clientHeight);
        // kaijiangIndexObj.widtLeft()
        var thing = $('li.li_cont')
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        $('.d_right').css('height',imag)
        $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_two')[0].clientHeight);
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    kaijiangIndexObj.oversList = function(res){
        console.log(res)
        var dat = res
        var arrLen = res.length;
        var result = ''
        var arry = []
        var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            mathbookObj()
            var cour = test[Math.floor(Math.random()*test.length)]
                result += '<li class="li_cont" data-v="'+ dat[i].title +'" data-g="'+ dat[i].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ dat[i].poster +'" data-v="'+ dat[i].title +'" data-c="'+ dat[i].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ dat[i].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ dat[i].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ dat[i].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ dat[i].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( dat[i].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        }else{
            // me.lock();
            $.alertMsg('已經到底了，沒有更多了')
            kaijiangIndexObj.pullLoad.lock();
            // $('#kaij_hide').show()
        }
        $('#ul_zjxn').append(result)
        kaijiangIndexObj.pullLoad.resetload();
        // kaijiangIndexObj.widtLeft()
        var thing = $('li.li_cont')
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        // console.log(arryObj)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        $('.d_right').css('height',imag)
        $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_three')[0].clientHeight);
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    kaijiangIndexObj.fourList = function(res){
        console.log(res)
        var dat = res
        var arrLen = res.length;
        var result = ''
        var arry = []
        var test = ['#e84b89','#c089bc','#69abe8','#4bd89','#4ff88e','#53ca58','#f8588e','#f8a036','#6bf8de','#7cde36','#f7839b','#f74dea','#b8ea83','#d2c5','#dab614','#fbb1e5','#fb726e','#28e822','#9ad0e2','#c5ea2f']; 
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
            mathbookObj()
            var cour = test[Math.floor(Math.random()*test.length)]
                result += '<li class="li_cont" data-v="'+ dat[i].title +'" data-g="'+ dat[i].poster +'">\
                            <a class="showNow" href="javascript:void(0)" data-t="list" data-g="'+ dat[i].poster +'" data-v="'+ dat[i].title +'" data-c="'+ dat[i].id +'">\
                                <div class="link d_left">\
                                    <p class="p_number"><img class="flImg" src="images/audio/shiting.png" alt="">&nbsp;&nbsp;<span>'+ dat[i].play +'</span></p>\
                                    <img class="w100 imgfan" style="background:url('+ bookImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+bookImg+"\'"+'" src="'+ dat[i].poster +'" alt="">\
                                    <p class="center p_tit_book"><span>'+ dat[i].title +'</span></p>\
                                </div>\
                            </a>\
                            <a href="javascript:void(0)" data-t="ALove" data-c="'+ dat[i].id +'"><p class="p_offOn" ><img class="img_xing" src=" '+( dat[i].collected == '1' ? 'images/audio/heart-br.png' : 'images/audio/wei.png')+ ' " alt=""></p></a>\
                        </li>'
            }
        }else{
            // me.lock();
            $.alertMsg('已經到底了，沒有更多了')
            kaijiangIndexObj.pullLoad.lock();
            // $('#kaij_hide').show().
        }
        $('#ul_thre').append(result)
        kaijiangIndexObj.pullLoad.resetload();
        // kaijiangIndexObj.widtLeft()
        var thing = $('li.li_cont')
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        // console.log(arryObj)
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        $('.d_right').css('height',imag)
        $('#kailistObj').find('.tempWrap').css('height',$('#dv_kj_four')[0].clientHeight);
        if (ConfigObj.platForm == 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm == 'ios'){
            ios_obj.downloadCover(arryObj)
        }else{

        }

    }
    /*kaijiangIndexObj.widtLeft = function(){
        var bas = document.getElementById("tabBox1-kj");
        console.log($(bas))
        // $('.tempWrap').css('height',$(bds)[0].clientHeight)
        $('#kailistObj').find('.tempWrap').css('height','100%')
    }*/
    //储存离线数据
    function saveUnlineData(dataVal){
        localStorage.redArr = dataVal;
    }
    //获取离线数据
    function getUnlineDate(){
        var arr = [];
        if ( localStorage.redArr ){
            arr = localStorage.redArr.split(',');
            for(var i in arr ){
                arr[i] = parseInt(arr[i]);
            }
        }
        return arr;
    }
    kaijiangIndexObj.andrObj = function(typ){
        // console.log($('#ul_bfdo').find('li.li_cont'))
        if (typ == 'play') {
            var thing = $('#ul_bfdo').find('li.li_cont')
        }else if(typ == 'created_date'){
            var thing = $('#ul_zjxn').find('li.li_cont')
        }else{
            var thing = $('#ul_List').find('li.li_cont')
        }
        var arry = []
        // var thing = $('li.li_cont')
        for (var i = 0; i < thing.length; i++) {
            var poster = $(thing[i]).attr('data-g')
            var title = $(thing[i]).attr('data-v')
            arry[i] = poster+","+title
        }
        var arryObj = arry.join(';')
        var imag = Math.floor(((document.documentElement.clientWidth -32)*0.48)/0.75)
        $('.imgfan').css('height',imag)
        $('.d_right').css('height',imag)
        // console.log(arryObj)
        if (ConfigObj.platForm === 'android') {
            android_obj.downloadCover(arryObj)
        }else if(ConfigObj.platForm === 'ios'){
            ios_obj.downloadCover(arryObj)
        }
    }
    kaijiangIndexObj.categoryObj = function () {
        // console.log(client)
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            client:client,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            // url: ConfigObj.localSite+'/Book/category_book',
            url: ConfigObj.localSite+'/novel/category',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    var obj = res.info
                    // kaijiangIndexObj.ajaxData = res.info
                    kaijiangIndexObj.titleHtml(obj)
                    // $('.div_log').hide()
                    gifNone()
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    kaijiangIndexObj.Love = function (id,obj) {
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            client:client,
            novel_id:id,
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
                        // images/audio/heart-br.png' : 'images/audio/wei.png
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

    function mathbookObj() {
        var tex = [
            'images/channel/book1.png',
            'images/channel/book2.png',
            'images/channel/book3.png',
            'images/channel/book4.png',
            'images/channel/book5.png',
            'images/channel/book6.png',
        ]
        return bookImg = tex[Math.floor(Math.random()*tex.length)]
    }
    kaijiangIndexObj.kloadObj = function() {
        kaijiangIndexObj.createDomObj()
        kaijiangIndexObj.createEvent();//
        setTimeout(function() {
            gifJson()  // gifNone
            kaijiangIndexObj.categoryObj()
            kaijiangIndexObj.lisAjax(1)
            kaijiangIndexObj.lisAjax(2)
            kaijiangIndexObj.lisAjax(3)
            kaijiangIndexObj.lisAjax(4)
        },100)
    }
    //onlaod后执行函数
    kaijiangIndexObj.onloadExecution = function(){
        $('#affrimLoad').hide()
        $('#affrimLoad').parent().hide();
        $('#affrimLoad').css('opacity','0');
        kaijiangIndexObj.kloadObj()
        // kaijiangIndexObj.lisAjaxdate(1,'created_date')
        // kaijiangIndexObj.lisAjaxplay(1,'play')
    }
    kaijiangIndexObj.init = function(){
        kaijiangIndexObj.onloadExecution();
        // kaijiangIndexObj.setDefConfig();
    }
