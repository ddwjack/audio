    var footballObj = new PageController({
       'name': 'football',
       'tpl' : 'template/football/football.html',
       'pullDistance': 220
    });
    footballObj.defBannerImgProportion = 640/280;

    footballObj.createBannerHeight = function(){
        var bodyWidth = $("body").width();
        var height= bodyWidth/this.defBannerImgProportion ;
        this.bannerImgObj.css("height",height+"px");
        this.bannerDivObj.css("height",height+"px");
    }
    footballObj.createDomObj = function(){
        this.foofaObj = $("#foot_fa"); // fseacrh 
        this.gosou = $("#fseacrh"); //  
        this.wdhcObj = $('#img_wdhcs');  //去聊天
        this.lsjlObj = $('#img_lsjls');  //历史记录 
        this.iSearObj = $('#foot_slid');  //搜索 jiaMore
        /*this.bantwoImgObj = $("#kaijtwo_bannerImgObj"); //轮播1V1
        this.bannertwoObj = this.bantwoImgObj.parent(); */
        this.bannerImgObj = $("#kaij_bannerImgObj"); //轮播 1VN
        this.bannerDivObj = this.bannerImgObj.parent(); 
        this.zhibojian = $(".dHide3"); // 
        this.seafoot = $("#img_lsjls"); // 
    }

    footballObj.createBanner = function (typ) {
        var data = typ;
        var imgHtml = [];
        var navHtml = [];
        data.forEach(function (v, i) {
            mathbannerObj()
            // console.log(v)
            var url = v['jump_url'];
            imgHtml.push('<li data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + v['target'] + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img class="imHeigt" style="background:url('+ bannImg +');background-size:100% 100%;height:164px;" src="' + v['url'] + '"><p></li>');
            navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
        });
        this.bannerImgObj.html(imgHtml.join(''));
        // console.log(typ)
        var narWrapObj = $('#home_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        // delete this.ajaxData.bannel;
    }

    footballObj.bannerSwipeSlide = function () {
        this.bannerDivObj.swipeSlide({
            continuousScroll: true,
            speed: 3000,
            lazyLoad: true,
            autoSwipe:true,
            callback : function(i){
                footballObj.bannerNavObj.removeClass('on');
                footballObj.bannerNavObj.eq(i).addClass('on');
            }
        });
    }
    footballObj.bannerEvent = function (e) {
        var LiObj = $.oto_checkEvent(e, "LI");
        if (LiObj) {
            var thisObj = $(LiObj);
            var v = thisObj.attr('data-v');
            var X = thisObj.attr('data-x');
            var D = thisObj.attr('data-d');
            var parseSimpleUrl = function (url) {
                var tmp = url.split('?');
                var path = tmp[0];
                var args = {};
                if (tmp[1] && tmp[1].length) {
                    var tmp2 = tmp[1].split(',');
                    tmp2.forEach(function (v,index) {
                        var tmp3 = v.split('=');
                        args[index] = tmp3[0] ? tmp3[0] : null;
                    })
                }
                /*if (tmp[1] && tmp[1].length) {
                    var tmp2 = tmp[1].split('&');
                    tmp2.forEach(function (v) {
                        var tmp3 = v.split('=');
                        args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
                    })
                }*/
                return {path: path, args: args};
            };
            if (v.indexOf('http://') == 0 || v.indexOf('https://') == 0) {
                // 外部链接
                Global.openUrl(v);
                footballObj.gohomeObj(D)
            } else {
                var ret = parseSimpleUrl(v);
                // footballObj.gohomeObj(D)
                // console.log(ret.path);  //页面跳转显示 recomList_money_0
                if(ConfigObj.display){
                // console.log(ret.path)
                    if (ret.path == 'video') Global.playVideo(ret.args[0],ret.args[1],ret.args[2]); //播放視頻
                    else if (ret.path == 'football') Goanchor(ret.args[0],ret.args[1],ret.args[2],ret.args[3],'dynamicObj') /*footballObj.show()*/; 
                    else if (ret.path == 'audio') Global.bookImgObj(ret.args[0],ret.args[1]);  // 聽書詳情
                    else if (ret.path == 'home') {kaijiangIndexObj.show()}
                    else if (ret.path == 'money') {
                        moneyObj.goBack = function(){
                            moneyObj.destroy();
                            footballObj.show();
                            Global.fixd()
                        }
                        moneyObj.show(true,function(){
                            moneyObj.mobileObj(ConfigObj.iphon)
                        }); 
                    }
                    else if (ret.path == 'vip') {
                        myfreeObj.goBack = function(){
                            myfreeObj.destroy();
                            footballObj.show();
                            Global.fixd()
                        }
                        myfreeObj.show(true,function(){}); 
                    }
                    else if(ret.path == 'bannerIform'){ // /bannerIform?url=http://192.168.0.110/H5/Anchor/one/
                        bannerIformObj.goBack = function(){
                            bannerIformObj.destroy();
                            footballObj.show();
                            Global.fixd()
                        }
                        bannerIformObj.show(true,function(){
                            bannerIformObj.urlObj(ret.args[0])
                        });
                    }else if(ret.path == ''){}
                    else if (ret.path == 'news') footballObj.goNewsDetail(ret.args[0]);
                    else Global.open(v);
                }
            }
            Global.pv('banner', {url: v});
        }
    }
    footballObj.goBack=function(){
        footballObj.destroy();
        homeObj.show(); 
    }

    footballObj.createEvent = function(Vd){
        var page = 1;
        var size = 10;
        $('#football').dropload({  
            scrollArea : window,
            distance : 80,
            loadUpFn:function(me){
                footballObj.pullLoad = me;
                // me.resetload(); 
                var typ = $('#typ_list').find('li.hutp').attr('data-l')
                if (typ == '1VN') {
                    var tid = $('#typ_list').find('li.hutp').attr('data-d')
                }else{
                    var tid = $('#typ_list_lvl').find('li.hutp').attr('data-d')
                }

                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                footballObj.faEvent(tid,'2')
                footballObj.faEventLVL(tid,'2')
                footballObj.followObj('2')
                me.resetload(); 
            },
            loadDownFn:function(me){
                footballObj.pullLoad = me
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var cous = $('#ulHdearTop').find('li.on').attr('data-l') // 
                if (cous == '1') {
                     var postData ={  
                        page:page,
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
                        url: ConfigObj.localSite+'/live/followed',
                        data: secretData,
                        type: "post",
                        dataType: "json",
                        success:function(res){
                            if (res.ok == true) {
                                res.info = $.parseJSON(Global.crypt(res.result));
                                console.log(res.info)
                                footballObj.followListObj(res.info)
                                // dynamicObj.loadtext(res.info,mold)
                            }else{
                               $.alertMsg(res.err) 
                            }
                        },
                        error:function(xhr, type){
                            me.resetload();
                        }
                    })
                }else{
                    if(cous == '2'){
                        var tid = $('#typ_list').find('li.on').attr('data-d') // 
                        var mold = '1VN'
                    }else{
                        var mold = '1V1'
                        var tid = $('#typ_list_lvl').find('li.on').attr('data-d') // 
                    }
                    var postData ={  
                        page:page,
                        channel:ConfigObj.zdid,
                        app_key:ConfigObj.appkey,
                        user_id:ConfigObj.meId,
                        version:ConfigObj.version,
                        client:client,
                        type:mold,
                        category_id:tid
                    } 
                    console.log(postData)
                    var secretData = {
                      'info' : Global.encrypt(postData)
                    };
                    $.ajax({
                        url: ConfigObj.localSite+'/live/index',
                        data: secretData,
                        type: "post",
                        dataType: "json",
                        success:function(res){
                            if (res.ok == true) {
                                res.info = $.parseJSON(Global.crypt(res.result));
                                // console.log(res.info)
                                if (mold == '1V1') {
                                    footballObj.faLVLOb(res.info)
                                }else if(mold == '1VN'){
                                    footballObj.fadownf(res.info)
                                }
                                // dynamicObj.loadtext(res.info,mold)
                            }else{
                               $.alertMsg(res.err) 
                            }
                        },
                        error:function(xhr, type){
                            me.resetload();
                        }
                    })
                }
            }
        });
        this.wdhcObj.unbind('tap').tap(function(){
            gifJson()
            imLogout()
        })
        this.bannerDivObj.unbind('tap').tap(function(e){
            footballObj.bannerEvent(e);
        })
        this.foofaObj.unbind('tap').tap(function(e){
            footballObj.vidBo(e)
        })
        this.seafoot.unbind('tap').tap(function(){// 联系客服功能没有
            searchObj.goBack = function(){
                searchObj.destroy()
                footballObj.show(true);
                Global.fixd()
            }
            searchObj.show(true,function(){
                searchObj.publicObj(3)
            });
        })
        footballObj.goswiperObj()
        if (ConfigObj.platForm === 'android') {
            if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                return false;
            }
        }
    }
    footballObj.goswiperObj = function(){
        var startPosition, endPosition, moveLength;  
        $(document).bind('touchstart', function (e) {
            var touch = e.touches[0];
            startPosition = {
                x: touch.pageX,
                y: touch.pageY
            }
        });
        $(document).bind('touchmove', function (e) {
            var touch = e.touches[0];
            endPosition = {
                x: touch.pageX,
                y: touch.pageY
            }

            deltaX = endPosition.x - startPosition.x;
            deltaY = endPosition.y - startPosition.y;
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        })
        // 切换
        $('#liheigone').swipeLeft(function(){
            if(Math.abs(moveLength)>100){
                console.log(257)
                // footballObj.Arooms()
            }
        })
        $('#liheigone').swipeRight(function(){
            if(Math.abs(moveLength)>100){
                console.log(263)
                // footballObj.Avideo()
            }
        })
    }
    // 1VN上拉加载更多
    footballObj.fadownf = function(obj){
        var dat = obj.anchor_list
        var resuone = '';
        var resutwo = '';
        var arrLen = dat.length;
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
                mathliveObj()
                var onLin = dat[i]
                if (onLin.living =='ON') {
                    resuone += '<li class="w100 page" style="margin-bottom:10px;">\
                            <p class="p_relo"><span><i class="'+ (onLin.online == 'OFF' ? 'gray' : '') +'"></i>'+ (onLin.online == 'OFF' ? '离线' : '在线')+'</span><a data-t="goIm" data-l="1VN" data-I="'+ onLin.anchor_id +'" data-d="'+ onLin.anchor_no +'" data-n="'+ onLin.nickname +'" data-g="'+ onLin.avatar_url +'" href="javascript:void(0)"><span class="sp_craft">'+ onLin.studio_name +'</span><span class="span_frih"><img class="im_icon_gk" src="images/my/ico.png" alt="" />'+ onLin.user_num +'</span></a></p>\
                            <a class="diflex" data-t="goroom" data-n="'+ onLin.nickname+'" data-g="'+ onLin.avatar_url +'" data-d="'+ onLin.anchor_id +'" data-f="'+ onLin.studio_name +'" data-l="1VN" data-h="'+ onLin.anchor_no+'" href="javascript:void(0)">\
                                <img class="w100 img_names" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ onLin.cover_y +'" alt="#">\
                            </a>\
                            <div class="vid_bot">\
                                <a class="block" data-w="sp_tex_gz" data-t="imgFoll" data-d="'+ onLin.anchor_id +'" data-h="'+ onLin.anchor_no +'" href="javascript:void(0)">\
                                    <ul>\
                                        <li class="w80">\
                                            <p class="r13">'+ onLin.nickname +' \
                                            </p>\
                                            <p class="r12">'+ onLin.craft +'</p>\
                                        </li>\
                                        <li class="w19 center" style="line-height:50px;">\
                                            <span class="Agz '+(onLin.followed == '1' ? 'sp_tex_gz' : '')+'">'+ (onLin.followed == '1' ? '已關注' : '+關注')+'</span>\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
                }else{
                    resutwo += '<li class="w100 page" style="margin-bottom:10px;">\
                            <p class="p_relo"><span><i class="'+ (onLin.online == 'OFF' ? 'gray' : '') +'"></i>'+ (onLin.online == 'OFF' ? '离线' : '在线')+'</span><a data-t="goIm" data-l="1VN" data-I="'+ onLin.anchor_id +'" data-d="'+ onLin.anchor_no +'" data-n="'+ onLin.nickname +'" data-g="'+ onLin.avatar_url +'" href="javascript:void(0)"><img class="fr" src="images/room/message.png" alt=""></a></p>\
                            <a class="diflex" data-t="Adeta" data-d="'+ onLin.anchor_id +'" data-f="'+ onLin.studio_name +'" data-l="1VN" data-h="'+ onLin.anchor_no+'" href="javascript:void(0)">\
                                <img class="w100 img_names" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ onLin.cover_y +'" alt="#">\
                            </a>\
                            <div class="vid_bot">\
                                <a class="block" data-w="sp_tex_gz" data-t="imgFoll" data-d="'+ onLin.anchor_id +'" data-h="'+ onLin.anchor_no +'" href="javascript:void(0)">\
                                    <ul>\
                                        <li class="w80">\
                                            <p class="r13">'+ onLin.nickname +' \
                                            </p>\
                                            <p class="r12">'+ onLin.craft +'</p>\
                                        </li>\
                                        <li class="w19 center" style="line-height:50px;">\
                                            <span class="Agz '+(onLin.followed == '1' ? 'sp_tex_gz' : '')+'">'+ (onLin.followed == '1' ? '已關注' : '+關注')+'</span>\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
                }
            }
        }else{
                $.alertMsg('已經到底了，沒有更多了')
                footballObj.pullLoad.lock();
                $('#fix_hide').show()
            }
        $('#on_zx').append(resuone)
        $('#off_lx').append(resutwo)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
        $('#foot_fa img.img_names').css('height',imag)
        // $('.div_log').hide()
        gifNone()
        if (footballObj.pullLoad) {
            footballObj.pullLoad.resetload();
        }
        $('#foot_fa').find('.tempWrap').css('height',$('#liheigone')[0].clientHeight);
    }
    // 1V1上拉加载更多
    footballObj.faLVLOb = function(obj){
        var dat = obj.anchor_list
        var resuone = '';
        // var resutwo = '';
        var arrLen = dat.length;
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        if(arrLen > 0){
           for(var i=0; i<arrLen; i++){
                mathliveObj()
                var onLin = dat[i]
                if (onLin.living =='ON') {
                    resuone += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px">\
                                <p class="p_relo"><span><i class="'+ (onLin.online == 'OFF' ? 'gray' : '') +'"></i>'+ (onLin.online == 'OFF' ? '离线' : ( onLin.living == 'OFF' ? '空闲' : '忙线'))+'</span><a class="A_LVL_gz" data-w="A" data-t="imgFoll" data-d="'+ onLin.anchor_id +'" data-h="'+ onLin.anchor_no +'" href="javascript:void(0)"><img class="fr" src="'+(onLin.followed == '1' ? 'images/room/off.png' : 'images/room/no.png')+'" alt="" /></a></p>\
                                <a class="w100 link" data-t="Adeta" data-d="'+ onLin.anchor_id +'" data-l="1V1" data-z="'+ onLin.anchor_no+'" href="javascript:void(0)" style="background:url('+ onLin.cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                                </a>\
                                <div class="vid_bot">\
                                    <a class="block A_col_te" data-t="goroom" data-n="'+ onLin.nickname+'" data-g="'+ onLin.avatar_url +'" data-d="'+ onLin.anchor_id +'" data-f="'+ onLin.studio_name +'" data-l="1V1" data-h="'+ onLin.anchor_no+'"  href="javascript:void(0)">\
                                        <ul>\
                                            <li class="wid_li wid40">\
                                                <span>'+ onLin.nickname+'</span>\
                                            </li>\
                                            <li class="wid_li wid40 center">\
                                                <span style="font-size:1rem;">'+ onLin.fee+'币/分</span>\
                                            </li>\
                                            <li class="wid_li wid20">\
                                                <img style="width:26px;" src="'+ (onLin.online == 'OFF' ? 'images/room/lix.png' : ( onLin.living == 'OFF' ? 'images/room/camera.png' : 'images/room/lix.png'))+'" alt="">\
                                            </li>\
                                        </ul>\
                                    </a>\
                                </div>\
                            </li>'
                }else{
                        resuone += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px">\
                                <p class="p_relo"><span><i class="'+ (onLin.online == 'OFF' ? 'gray' : '') +'"></i>'+ (onLin.online == 'OFF' ? '离线' : ( onLin.living == 'OFF' ? '空闲' : '忙线'))+'</span><a class="A_LVL_gz" data-w="A" data-t="imgFoll" data-d="'+ onLin.anchor_id +'" data-h="'+ onLin.anchor_no +'" href="javascript:void(0)"><img class="fr" src="'+(onLin.followed == '1' ? 'images/room/off.png' : 'images/room/no.png')+'" alt="" /></a></p>\
                                <a class="w100 link" data-t="Adeta" data-d="'+ onLin.anchor_id +'" data-l="1V1" data-z="'+ onLin.anchor_no+'" href="javascript:void(0)" style="background:url('+ onLin.cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                                </a>\
                                <div class="vid_bot">\
                                    <a class="block A_col_te" data-t="goroom" data-n="'+ onLin.nickname+'" data-g="'+ onLin.avatar_url +'" data-d="'+ onLin.anchor_id +'" data-f="'+ onLin.studio_name +'" data-l="1V1" data-h="'+ onLin.anchor_no+'"  href="javascript:void(0)">\
                                        <ul>\
                                            <li class="wid_li wid40">\
                                                <span>'+ onLin.nickname+'</span>\
                                            </li>\
                                            <li class="wid_li wid40 center">\
                                                <span style="font-size:1rem;">'+ onLin.fee+'币/分</span>\
                                            </li>\
                                            <li class="wid_li wid20">\
                                                <img style="width:26px;" src="'+ (onLin.online == 'OFF' ? 'images/room/lix.png' : ( onLin.living == 'OFF' ? 'images/room/camera.png' : 'images/room/lix.png'))+'" alt="">\
                                            </li>\
                                        </ul>\
                                    </a>\
                                </div>\
                            </li>'
                }
            }
        }else{
                $.alertMsg('已經到底了，沒有更多了')
                // footballObj.pullLoad.lock();
                // $('#fix_hide').show()
            }
            $('#ul_1V1').append(resuone)
        /*$('#on_zx').append(resuone) ul_1V1
        $('#off_lx').append(resutwo)*/
        // var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        // $('#foot_fa img.img_namv').css('height',imag)
        // $('.div_log').hide()
        gifNone()
        if (footballObj.pullLoad) {
            footballObj.pullLoad.resetload();
        }
        $('#foot_fa').find('.tempWrap').css('height',$('#liheigtwo')[0].clientHeight);

         console.log($('#liheigtwo')[0].clientHeight)
                 // $('#foot_fa').find('.tempWrap').css('height','100%')
    }
    //  关注上拉加载更多
    footballObj.followListObj = function(res){
        $.alertMsg('已經到底了，沒有更多了')
        footballObj.pullLoad.lock();
        if (footballObj.pullLoad) {
            footballObj.pullLoad.resetload();
        }
        return false;
        var resuone = '';
        var resutwo = '';
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        /*var arrLen = res.online;
        var arrLen = res.offline;
        var zaim = res.online.multiple,lixm = res.offline.multiple,zais = res.online.single,lixs = res.offline.single*/
        if(arrLen > 0){
            for (var i = 0; i < zaim.length; i++) {
                mathliveObj()
                resuone += '<li class="w48">\
                            <p class="p_soule re1"> <i class="i_color green"></i>直播中 </p>\
                            <a data-t="goroom" data-d="'+ zaim[i].anchor_id +'" data-l="1VN" data-f="'+ zaim[i].studio_name +'" data-h="'+ zaim[i].anchor_no+'" href="javascript:void(0)">\
                                <img class="img_nam igHight" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ zaim[i].cover_y+'" alt="">\
                                <p class="botPos center back_col">'+ zaim[i].nickname +'</p>\
                            </a>\
                        </li>'
            }
            for (var i = 0; i < lixm.length; i++) {
                mathliveObj()
                resuone += '<li class="w48">\
                            <p class="p_soule re1"> <i class="i_color gray"></i>还未开播 </p>\
                            <a data-t="Adeta" data-d="'+ lixm[i].anchor_id +'" data-l="1VN" data-h="'+ lixm[i].anchor_no+'" href="javascript:void(0)">\
                                <img class="img_nam igHight" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ lixm[i].cover_y+'" alt="">\
                                <p class="botPos center back_col">'+ lixm[i].nickname +'</p>\
                            </a>\
                        </li>'
            }
            for (var i = 0; i < zais.length; i++) {
                mathliveObj()
                resutwo += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px">\
                            <p class="p_relo"><span><i></i>'+( zais[i].living == 'OFF' ? '在線' : '忙碌')+'</span><a data-t="goIm" data-l="1V1" data-I="'+ zais[i].anchor_id +'" data-d="'+ zais[i].anchor_no +'" data-n="'+ zais[i].nickname +'" data-g="'+ zais[i].avatar_url +'" data-d="'+ zais[i].anchor_no +'" data-n="'+ zais[i].nickname +'" data-g="'+ zais[i].avatar_url +'" href="javascript:void(0)"><img class="fr" src="images/room/message.png" alt=""></a></p>\
                            <a class="w100 link" data-t="Adeta" data-d="'+ zais[i].anchor_id +'" data-l="1V1" data-h="'+ zais[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ zais[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                            </a>\
                            <div class="vid_bot">\
                                <a data-t="goroom" data-n="'+ zais[i].nickname+'" data-g="'+ zais[i].avatar_url +'" data-d="'+ zais[i].anchor_id +'" data-l="1V1" data-h="'+ zais[i].anchor_no+'" class="block A_col_te" href="javascript:void(0)">\
                                    <ul>\
                                        <li class="wid_li wid40">\
                                            <span>'+ zais[i].nickname+'</span>\
                                        </li>\
                                        <li class="wid_li wid40 center">\
                                            <span style="font-size:1rem;">'+ zais[i].fee+'币/分</span>\
                                        </li>\
                                        <li class="wid_li wid20">\
                                            <img style="width:26px;" src="images/room/camera.png" alt="">\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
            }
            for (var i = 0; i < lixs.length; i++) {
                mathliveObj()
                resutwo += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px">\
                            <p class="p_relo"><span><i class="gray"></i>离线</span><a data-t="goIm" data-l="1VN" data-I="'+ lixs[i].anchor_id +'" data-d="'+ lixs[i].anchor_no +'" data-n="'+ lixs[i].nickname +'" data-g="'+ lixs[i].avatar_url +'" href="javascript:void(0)"><img class="fr" src="images/room/message.png" alt=""></a></p>\
                            <a class="w100 link" data-t="Adeta" data-d="'+ lixs[i].anchor_id +'" data-l="1V1" data-h="'+ lixs[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ lixs[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                            </a>\
                            <div class="vid_bot">\
                                <a class="block A_col_te" data-t="goroom" data-n="'+ lixs[i].nickname +'" data-g="'+ lixs[i].avatar_url+'" data-d="'+ lixs[i].anchor_id +'" data-l="1V1" data-h="'+ lixs[i].anchor_no+'"  href="javascript:void(0)">\
                                    <ul>\
                                        <li class="wid_li wid40">\
                                            <span>'+ lixs[i].nickname+'</span>\
                                        </li>\
                                        <li class="wid_li wid40 center">\
                                            <span style="font-size:1rem;">'+ lixs[i].fee+'币/分</span>\
                                        </li>\
                                        <li class="wid_li wid20">\
                                            <img style="width:26px;" src="images/room/lix.png" alt="">\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
            }
        }else{
            $.alertMsg('已經到底了，沒有更多了')
            footballObj.pullLoad.lock();
            $('#fix_hide').show()
        }
        $('#fl_onlin').html(resuone)  // 直播间关注
        $('#lVl_onlin').html(resutwo) // 1V1 关注
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        $('img.igHight').css('height',imag)
        $('img.imHeig').css('height',ighe)
        $('#foot_fa').find('.tempWrap').css('height',$('#liheigthre')[0].clientHeight);
    }
    //  直播间顶部分类
    footballObj.gohtmltex = function(info,id,vn){
        // console.log(id+'LVN')
        var category = info.category_list
        // console.log(category)
        var html = ''
        for (var i = 0; i < category.length; i++) {
            html += '<li class="link center '+ (category[i].category_id == id ? 'hutp' : '') +'" data-t="'+ (i == '0' ? 'fenlei' : 'fenLVNtj') +'" data-l="1VN" data-d="'+ category[i].category_id +'"><span class="spActi '+ (category[i].category_id == id ?'active' : '')+'">'+ category[i].name +'</span></li>'
        }
        $('#typ_list').html(html)
        $('#typ_list_lvl').find('li').eq(0).find('span').addClass('active')

    }
    footballObj.gohtmltexLVL = function(inf,id,vn){
        // console.log(id+'LVL')
        var category = inf.category_list
        // console.log(category)
        var html = ''
        for (var i = 0; i < category.length; i++) {
            html += '<li class="link center '+ (category[i].category_id == id ? 'hutp' : '') +'" data-t="'+ (i == '0' ? 'fenLVL' : 'fenLVLtj') +'" data-l="1V1" data-d="'+ category[i].category_id +'"><span class="spActi '+ (category[i].category_id == id ?'active' : '')+'">'+ category[i].name +'</span></li>'
        }
        $('#typ_list_lvl').html(html)
    }
    //1VN
    footballObj.goonline = function(info,typ){
        // console.log(info)
        var online = info.anchor_list
        var charm = info.charm
        var htm3 = ''
        var htm4 = ''
        var tex2 = ''
        if (charm.length > '4') {
            for (var i = 0; i <= 4; i++) {
                tex2 += '<li data-d="'+ charm[i].anchor_id +'" class="w20"><img class="img_bor" src="'+ charm[i].avatar_url +'" alt=""></li>'
            }
        }else{
            for (var i = 0; i < charm.length; i++) {
                tex2 += '<li data-d="'+ charm[i].anchor_id +'" class="w20"><img class="img_bor" src="'+ charm[i].avatar_url +'" alt=""></li>'
            }
        }
        $('#ul_charm').html(tex2)

        for (var i = 0; i < online.length; i++) {
            var onLin = online[i]
            mathliveObj()
            // console.log(onLin)
            if (onLin.living =='ON') {
                $('#div_zhubozaix').show()
                htm3 += '<li class="w100 page" style="margin-bottom:10px;">\
                            <p class="p_relo"><span><i class=""></i>直播中</span><a data-t="goIm" data-l="1VN" data-I="'+ onLin.anchor_id +'" data-d="'+ onLin.anchor_no +'" data-n="'+ onLin.nickname +'" data-g="'+ onLin.avatar_url +'" href="javascript:void(0)"><span class="sp_craft">'+ (onLin.studio_name == 'null' ? '' : onLin.studio_name) +'</span><span class="span_frih"><img class="im_icon_gk" src="images/my/ico.png" alt="" />'+ (onLin.user_num == 'null' ? '0' : onLin.user_num) +'</span></a></p>\
                            <a class="diflex" data-t="goroom" data-n="'+ onLin.nickname+'" data-g="'+ onLin.avatar_url +'" data-d="'+ onLin.anchor_id +'" data-f="'+ onLin.studio_name +'" data-l="1VN" data-h="'+ onLin.anchor_no+'" href="javascript:void(0)">\
                                <img class="w100 img_names" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ onLin.cover_y +'" alt="#">\
                            </a>\
                            <div class="vid_bot">\
                                <a class="block" data-w="sp_tex_gz" data-t="imgFoll" data-d="'+ onLin.anchor_id +'" data-h="'+ onLin.anchor_no +'" href="javascript:void(0)">\
                                    <ul>\
                                        <li class="w80">\
                                            <p class="r13">'+ onLin.nickname +' \
                                            </p>\
                                            <p class="r12">'+ onLin.craft +'</p>\
                                        </li>\
                                        <li class="w19 center" style="line-height:50px;">\
                                            <span class="Agz '+(onLin.followed == '1' ? 'sp_tex_gz' : '')+'">'+ (onLin.followed == '1' ? '已關注' : '+關注')+'</span>\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
            }else{
                htm4 += '<li class="w100 page" style="margin-bottom:10px;">\
                            <p class="p_relo"><span><i class="gray"></i>未開播</span><a data-t="goIm" data-l="1VN" data-I="'+ onLin.anchor_id +'" data-d="'+ onLin.anchor_no +'" data-n="'+ onLin.nickname +'" data-g="'+ onLin.avatar_url +'" href="javascript:void(0)"><img class="fr" src="images/room/message.png" alt=""></a></p>\
                            <a class="diflex" data-t="Adeta" data-d="'+ onLin.anchor_id +'" data-l="1VN" data-z="'+ onLin.anchor_no+'" href="javascript:void(0)">\
                                <img class="w100 img_names" style="background:url('+ livImg +');background-size:100% 100%;" onerror="javascript:this.src='+"\'"+livImg+"\'"+'" src="'+ onLin.cover_y +'" alt="#">\
                            </a>\
                            <div class="vid_bot">\
                                <a class="block" data-w="sp_tex_gz" data-t="imgFoll" data-d="'+ onLin.anchor_id +'" data-h="'+ onLin.anchor_no +'" href="javascript:void(0)">\
                                    <ul>\
                                        <li class="w80">\
                                            <p class="r13">'+ onLin.nickname +'\
                                            </p>\
                                            <p class="r12">'+ onLin.craft +'</p>\
                                        </li>\
                                        <li class="w19 center" style="line-height:50px;">\
                                            <span class="Agz '+(onLin.followed == '1' ? 'sp_tex_gz' : '')+'">'+ (onLin.followed == '1' ? '已關注' : '+關注')+'</span>\
                                        </li>\
                                    </ul>\
                                </a>\
                            </div>\
                        </li>'
            }
        }
        if (typ != '2') {
            footballObj.TouchSlideObj()
        }else{
            // $('#foot_fa').find('.tempWrap').css('height',$('#liheigone')[0].offsetHeight);
        }
        $('#on_zx').html(htm3)
        $('#off_lx').html(htm4)
        var imag = Math.floor(((document.documentElement.clientWidth - 20) *1)/0.75)
        $('#foot_fa img.img_names').css('height',imag)
        // console.log($('#on_zx').find('li.page').length)
        if ($('#on_zx').find('li.page').length == '0') {
            $('#div_zhubozaix').hide()
        }else{
            $('#div_zhubozaix').show()
        }
        // $('.div_log').hide() 
        gifNone()
    }
    // 1V1
    footballObj.gooffline = function(info,typ){
        $('#liheigtwo').css('padding-top','45px')
        var html = '';
        var lis = info.anchor_list
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        var charm = info.charm
        var tex1 = ''
        if (charm.length > '4') {
            for (var i = 0; i <= 4; i++) {
                tex1 += '<li data-d="'+ charm[i].anchor_id +'" class="w20"><img class="img_bor" src="'+ charm[i].avatar_url +'" alt=""></li>'
            }
        }else{
            for (var i = 0; i < charm.length; i++) {
                tex1 += '<li data-d="'+ charm[i].anchor_id +'" class="w20"><img class="img_bor" src="'+ charm[i].avatar_url +'" alt=""></li>'
            }
        }
        $('#ul_charmLVL').html(tex1)
        for (var i = 0; i < lis.length; i++) {
            mathliveObj()
            html += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px;height:'+ighe+'px">\
                    <p class="p_relo"><span><i class="'+ (lis[i].online == 'OFF' ? 'gray' : '') +'"></i>'+ (lis[i].online == 'OFF' ? '离线' : ( lis[i].living == 'OFF' ? '空闲' : '忙线'))+'</span><a class="A_LVL_gz" data-w="A" data-t="imgFoll" data-d="'+ lis[i].anchor_id +'" data-h="'+ lis[i].anchor_no +'" href="javascript:void(0)"><img class="fr" src="'+(lis[i].followed == '1' ? 'images/room/off.png' : 'images/room/no.png')+'" alt="" /></a></p>\
                    <a class="link w100" data-t="Adeta" data-d="'+ lis[i].anchor_id +'" data-l="1V1" data-z="'+ lis[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ lis[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                    </a>\
                    <div class="vid_bot">\
                        <a class="block A_col_te" data-t="goroom" data-n="'+ lis[i].nickname+'" data-g="'+ lis[i].avatar_url +'" data-d="'+ lis[i].anchor_id +'" data-f="'+ lis[i].studio_name +'" data-l="1V1" data-h="'+ lis[i].anchor_no+'"  href="javascript:void(0)">\
                            <ul>\
                                <li class="wid_li wid40">\
                                    <span>'+ lis[i].nickname+'</span>\
                                </li>\
                                <li class="wid_li wid40 center">\
                                    <span style="font-size:1rem;">'+ lis[i].fee+'币/分</span>\
                                </li>\
                                <li class="wid_li wid20">\
                                    <img style="width:26px;" src="'+ (lis[i].online == 'OFF' ? 'images/room/lix.png' : ( lis[i].living == 'OFF' ? 'images/room/camera.png' : 'images/room/lix.png'))+'" alt="">\
                                </li>\
                            </ul>\
                        </a>\
                    </div>\
                </li>'
        }
        $('#ul_1V1').html(html)
        if (typ != '2') {
            footballObj.TouchSlideObj()
        }else{
            gifNone()
        }
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        // $('img.imHeiLVL').css('height',ighe)
        
    }
    footballObj.TouchSlideObj = function(){
        TouchSlide({slideCell:"#foot_fa",
            endFun:function(i){ //高度自适应
                var bd = document.getElementById("tabBox1-ft");
                window.scrollTo(0,0)
                $('.tempWrap').css('padding-top','0')
                $('.div_pai').show()
                $('#foot_fa').find('.tempWrap').css('height',bd.children[i].children[0].offsetHeight);
                footballObj.createEvent()
                if ($('#ulHdearTop').find('li.on').attr('data-l') == '1') {
                    $('.hedGony').hide()
                }else{
                    $('.hedGony').show()
                }
                if(i>0)bd.parentNode.style.transition="200ms";//添加动画效果
                var tid = $('#typ_list').find('li.hutp').attr('data-d')
                if (i== '1') {
                    $('.dHide2,.dHide1').hide()
                    $('.dHide8').css('top','0')
                    footballObj.faEvent(tid,'2')
                    // footballObj.faEventLVL(tid,'2')
                    // console.log($('#liheigtwo')[0].clientHeight)
                    // $('#foot_fa').find('.tempWrap').css('height',$('#liheigtwo')[0].offsetHeight);
                }else if(i == '0'){
                    footballObj.faEventLVL(tid,'2')
                    // footballObj.faEvent(tid,'2')
                    $('.dHide2,.dHide1').show()
                    if ($('#typ_list').find('span.active').html() == '推荐') {
                        $('.dHide2').show()
                    }else{
                        $('.dHide2').hide()
                    }
                }
                // var bd = document.getElementById("tabBox1-ft");
            }
        })
    }
    //  直播间接口请求
    footballObj.faEvent = function(id,typ,ban){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            type:'1VN',
            category_id:id
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/index', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(749+'LVN')
                    console.log(res.info)
                    // $('.div_log').hide()
                    if (ban == '1') {
                        footballObj.createBanner(res.info.banner)
                        // console.log(737)
                    }else{
                        // footballObj.createBanner(res.info.banner)
                        // console.log(735)
                    }
                    footballObj.gohtmltex(res.info,id,'1VN')
                    footballObj.goonline(res.info,typ)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    // 1V1 接口请求
    footballObj.faEventLVL = function(id,typ){
        if (id == '10') {
            var id = '12'
        }else{
            var id = id
        }
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            type:'1V1',
            category_id:id
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/index', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    if (res.err == undefined) {
                        res.info = $.parseJSON(Global.crypt(res.result));
                        // console.log(796+'LVL')
                        // console.log(res.info)
                        // $('.div_log').hide()
                        footballObj.gohtmltexLVL(res.info,id)
                        footballObj.gooffline(res.info,typ)
                    }else{
                       $.alertMsg(res.err) 
                    }
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    // 我的关注接口请求
    footballObj.followObj = function(typ){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/followed', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    console.log(res.info)
                    // $('.div_log').hide() //live/index
                    footballObj.followgz(res.info,typ)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    // 添加关注接口
    footballObj.goimgFoll = function(obj){
        // var thisW = obj.attr('data-w')
        console.log(832)
        /*if (thisW == 'A') {
            if ($(obj).find('img.fr').attr('src') == 'images/room/no.png') {
                $(obj).find('img.fr').attr('src','images/room/off.png')
            }else{
                $(obj).find('img.fr').attr('src','images/room/no.png')
            }
        }else if(thisW == 's'){
                console.log($(obj))
            if ($(obj).html() == '已關注') {
                $(obj).html('+關注').removeClass('colGray')
            }else{
                $(obj).html('已關注').addClass('colGray')
            }
        }else{
            var txtObj = obj.find('.Agz')
            console.log(txtObj)
            if ($(txtObj).html() == '已關注') {
                $(txtObj).html('+關注').removeClass('sp_tex_gz')
            }else{
                console.log($(txtObj))
                $(txtObj).html('已關注').addClass('sp_tex_gz')
            }
        }
        */
        var thisD = obj.attr('data-d')
        var thisH = obj.attr('data-h')
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
                    var lid = $('#typ_list').find('span.active').parent('li').attr('data-d')
                    var ltp = $('#typ_list').find('span.active').parent('li').attr('data-l')
                    $.alertMsg(res.suc)
                    if (res.suc == '關注成功') {
                        footballObj.followAlert(obj,'1')
                    }else if(res.suc == '取消成功'){
                        footballObj.followAlert(obj,'2')
                    }
                    /*if ($(txtObj).html() == '已關注') {
                        $.alertMsg(res.suc) 
                    }else{
                        $.alertMsg(res.suc) 
                    }*/
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    footballObj.followAlert = function(obj,typ) {
        var thisW = obj.attr('data-w')
        console.log(thisW)
        if (thisW == 'A') {
            if ($(obj).find('img.fr').attr('src') == 'images/room/no.png') {
                $(obj).find('img.fr').attr('src','images/room/off.png')
            }else{
                $(obj).find('img.fr').attr('src','images/room/no.png')
            }
        }else if(thisW == 's'){
                console.log($(obj))
            if (typ == '2') {
                $(obj).html('+關注').removeClass('colGray')
            }else{
                $(obj).html('已關注').addClass('colGray')
            }
        }else{
            var txtObj = obj.find('.Agz')
            console.log(txtObj)
            if (typ == '2') {
                $(txtObj).html('+關注').removeClass('sp_tex_gz')
            }else{
                console.log($(txtObj))
                $(txtObj).html('已關注').addClass('sp_tex_gz')
            }
        }
    }
    //关注的
    footballObj.followgz = function(res,typ){
        // console.log(res)
        var zaim = res.online.multiple,lixm = res.offline.multiple,zais = res.online.single,lixs = res.offline.single
        var html = ''
        var htm2 = ''
        var htm3 = ''
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        for (var i = 0; i < zaim.length; i++) {
            mathliveObj()
            html += '<li style="background:url('+ livImg +');background-size:100% 100%;height:'+ighe+'px;" class="w48">\
                        <p class="p_soule re1"> <i class="i_color green"></i>直播中 </p>\
                        <a class="w100 link" data-t="goroom" data-d="'+ zaim[i].anchor_id +'" data-l="1VN" data-f="'+ zaim[i].studio_name +'" data-h="'+ zaim[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ zaim[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                        <p class="botPos center back_col">'+ zaim[i].nickname +'</p>\
                        </a>\
                    </li>'
        }
                            // <img style="height:'+ighe+'px;" src="'+ zaim[i].cover_y +'" alt="" /><p class="botPos center back_col">'+ zaim[i].nickname +'</p>\
        // <img  src="'+ zaim[i].cover_y+'" alt="">\
        for (var i = 0; i < lixm.length; i++) {
            mathliveObj()
            html += '<li style="background:url('+ livImg +');background-size:100% 100%;height:'+ighe+'px;" class="w48">\
                        <p class="p_soule re1"> <i class="i_color gray"></i>还未开播 </p>\
                        <a class="w100 link" data-t="Adeta" data-d="'+ lixm[i].anchor_id +'" data-l="1VN" data-h="'+ lixm[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ lixm[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                            <p class="botPos center back_col">'+ lixm[i].nickname +'</p>\
                        </a>\
                    </li>'
        }
        for (var i = 0; i < zais.length; i++) {
            mathliveObj()
            htm3 += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px;height:'+ighe+'px;">\
                        <p class="p_relo"><span><i></i>'+( zais[i].living == 'OFF' ? '在線' : '忙碌')+'</span><a data-t="goIm" data-l="1V1" data-I="'+ zais[i].anchor_id +'" data-d="'+ zais[i].anchor_no +'" data-n="'+ zais[i].nickname +'" data-g="'+ zais[i].avatar_url +'" data-d="'+ zais[i].anchor_no +'" data-n="'+ zais[i].nickname +'" data-g="'+ zais[i].avatar_url +'" href="javascript:void(0)"><img class="fr" src="images/room/message.png" alt=""></a></p>\
                        <a class="w100 link" data-t="Adeta" data-d="'+ zais[i].anchor_id +'" data-l="1V1" data-h="'+ zais[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ zais[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                        </a>\
                        <div class="vid_bot">\
                            <a data-t="goroom" data-n="'+ zais[i].nickname+'" data-g="'+ zais[i].avatar_url +'" data-d="'+ zais[i].anchor_id +'" data-l="1V1" data-h="'+ zais[i].anchor_no+'" class="block A_col_te" href="javascript:void(0)">\
                                <ul>\
                                    <li class="wid_li wid40">\
                                        <span>'+ zais[i].nickname+'</span>\
                                    </li>\
                                    <li class="wid_li wid40 center">\
                                        <span style="font-size:1rem;">'+ zais[i].fee+'币/分</span>\
                                    </li>\
                                    <li class="wid_li wid20">\
                                        <img style="width:26px;" src="images/room/camera.png" alt="">\
                                    </li>\
                                </ul>\
                            </a>\
                        </div>\
                    </li>'
        }
        for (var i = 0; i < lixs.length; i++) {
            mathliveObj()
            // <p class="img_nam " style="background:url('+ lixs[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">
            htm3 += '<li class="w48 page" style="background:url('+ livImg +');background-size:100% 100%;margin-bottom:10px;height:'+ighe+'px;">\
                        <p class="p_relo"><span><i class="gray"></i>离线</span><a data-t="goIm" data-l="1VN" data-I="'+ lixs[i].anchor_id +'" data-d="'+ lixs[i].anchor_no +'" data-n="'+ lixs[i].nickname +'" data-g="'+ lixs[i].avatar_url +'" href="javascript:void(0)"><img class="fr" src="images/room/message.png" alt=""></a></p>\
                        <a class="w100 link" data-t="Adeta" data-d="'+ lixs[i].anchor_id +'" data-l="1V1" data-h="'+ lixs[i].anchor_no+'" href="javascript:void(0)" style="background:url('+ lixs[i].cover_y +')repeat center;background-size: cover;height:'+ighe+'px;">\
                        </a>\
                        <div class="vid_bot">\
                            <a class="block A_col_te" data-t="goroom" data-n="'+ lixs[i].nickname +'" data-g="'+ lixs[i].avatar_url+'" data-d="'+ lixs[i].anchor_id +'" data-l="1V1" data-h="'+ lixs[i].anchor_no+'"  href="javascript:void(0)">\
                                <ul>\
                                    <li class="wid_li wid40">\
                                        <span>'+ lixs[i].nickname+'</span>\
                                    </li>\
                                    <li class="wid_li wid40 center">\
                                        <span style="font-size:1rem;">'+ lixs[i].fee+'币/分</span>\
                                    </li>\
                                    <li class="wid_li wid20">\
                                        <img style="width:26px;" src="images/room/lix.png" alt="">\
                                    </li>\
                                </ul>\
                            </a>\
                        </div>\
                    </li>'
        }
        $('#fl_onlin').html(html)  // 直播间关注
        $('#lVl_onlin').html(htm3) // 1V1 关注
        // gifNone()
       /* var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        var ighe = Math.floor(((document.documentElement.clientWidth - 20) *0.48)/0.75)
        $('img.igHight').css('height',imag)
        $('img.imHeig').css('height',ighe)*/
        // $('p.imHeig').css('height',ighe)
        if (typ != '2') {
            footballObj.TouchSlideObj()
        }
        // 忙线
    }
    footballObj.goVpn = function(id){
        isVideoFullScreen = false
        if (ConfigObj.platForm === 'android') {
            if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                return false;
            }
        }
        // footballObj.boVideo(id)
    }
    footballObj.vidBo = function(e){
        var AObj = $.oto_checkEvent(e,"A");
        if(AObj){
            var thisObj = $(AObj);
            var thisT = thisObj.attr("data-t");  
            // console.log(thisT)  
            switch(thisT){
                case "Afollow" : footballObj.Afollow(thisObj);return true; //關注
                case "Arooms" : footballObj.Arooms(thisObj);return true;   //直播间
                case "Avideo" : footballObj.Avideo(thisObj);return true;   //1V1视频
                case "Adeta" : footballObj.Adeta(thisObj);return true;   //详细信息 
                case "goIm" : footballObj.goImchat(thisObj);return true;   // im聊天  
                case "imgFoll" : footballObj.goimgFoll(thisObj);return true;   // 關注   
                case "goroom" : footballObj.goroomOb(thisObj);return true;   //    
                case "Lmeili" : footballObj.LmeiliObj(thisObj);return true; //魅力排行榜 
            }
            return false;
        }
        var dlObj = $.oto_checkEvent(e,"LI");
        if(dlObj){
            var thisObj = $(dlObj);
            var thisT = thisObj.attr("data-t");
            var thisD = thisObj.attr("data-d");
            var thisL = thisObj.attr("data-l");
            // console.log(thisT)
            switch(thisT){
                case "ldeta" : footballObj.Adeta(thisObj);return true; //魅力排行榜前五个
                case "fenlei" : footballObj.gofenlei(thisObj);return true; //1VN分类 
                case "fenLVNtj" : footballObj.fenLVNtj(thisObj);return true; //1VN推荐除外  
                // case "fenLVNtj" : footballObj.gofenlei(thisObj,'','LVN');footballObj.faEvent(thisD,thisL);return true; //推荐除外  
                case "fenLVL" : footballObj.fenLVL(thisObj);return true; //1V1分類 
                case "fenLVLtj" : footballObj.fenLVLtj(thisObj);return true; //1V1推荐除外  
            }
            return false;
        }
    }
    footballObj.goroomOb = function(obj){
        if (ConfigObj.iphon == '') {
            $('.goZhuceHide').show()
            return false;
        }
        // $('.div_log').show()
        gifJson()
        var thisD = obj.attr('data-d') //主播id
        var thisF = obj.attr('data-f') //房间名称 1VN用
        var thisH = obj.attr('data-h') // 房间号 主播号
        var thisL = obj.attr('data-l') // 主播类型 
        var thisN = obj.attr('data-n') // 主播名字
        var thisG = obj.attr('data-g') // 主播头像   主播号 主播头像 主播类型 房间名称
        //1是主播 2是用户
        if (ConfigObj.platForm === 'android') {
            if (thisL == '1VN') {
                footballObj.onliveObj(thisD,thisH,thisL,thisF)
                // android_obj.doLive("2", thisH, ConfigObj.meId, thisD, ConfigObj.usName, thisF)
            }else{
                footballObj.onliveObj(thisD,thisH,thisL,thisF)
                sendCallMsg(thisH,thisG,thisN,thisL,thisD)
            }
        }else if(ConfigObj.platForm === 'ios'){
            if (thisL == '1VN') {
                footballObj.onliveObj(thisD,thisH,thisL,thisF)
                // ios_obj.doLive("2", thisH, ConfigObj.meId, thisD, ConfigObj.usName, thisF)
            }else{
                footballObj.onliveObj(thisD,thisH,thisL,thisF)
                sendCallMsg(thisH,thisG,thisN,thisL,thisD)
            }
        }else{
            if (thisL == '1VN') {
                footballObj.onliveObj(thisD,thisH,thisL,thisF)
            }else{
                // sendCallMsg(thisH,thisG,thisN,thisL,thisD)
                footballObj.onliveObj(thisD,thisH,thisL,thisF)
            }
        }
    }
    footballObj.onliveObj = function(id,ha,lx,thisF){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            anchor_id:id,
            role:'user',
            anchor_no:ha,
            mold:lx,
            handle:'before',
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/build_connect', 
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // alert(3)
                // $('.div_log').hide()
                gifNone()
                if (res.err == undefined) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    if (ConfigObj.platForm == 'android') {
                        if (lx == '1VN') {
                            android_obj.doLive("2",ha, ConfigObj.meId, id, ConfigObj.usName, thisF,res.result,ConfigObj.pic)
                        }else{
                            android_obj.doOneLive(ha,id,res.result)
                        }   
                    }else{
                        if (lx == '1VN') {
                            ios_obj.doLive("2", ha, ConfigObj.meId, id, ConfigObj.usName, thisF,res.result,ConfigObj.pic)
                        }else{
                            ios_obj.doOneLive(ha,id,res.result)
                        }
                    }
                }else{
                    if (res.err == '余额不足') {
                        $('.moneyAlert').show()
                        $('.Agomoney').attr('data-l','footballObj')
                    }else{
                       $.alertMsg(res.err) 
                    }
                }
            },
            error:function (err) {
                gifNone()
                $.alertMsg('網絡異常，請稍後重試') 
            }
        })
    }
    footballObj.gofenlei = function(obj){
            gifJson()
            var oId = obj.attr('data-d')
            $('.dHide2,div_pai').show()
            $('#zhiboj').css('padding-top','0px')
            footballObj.faEvent(oId,'2')
            footballObj.createEvent()
    }
    footballObj.fenLVNtj = function(obj){
        gifJson()
        console.log(1145)
        var oId = obj.attr('data-d')
        $('.dHide2,div_pai').hide()
        footballObj.faEvent(oId,'2','banno')
        footballObj.createEvent()
        $('#foot_fa').find('.tempWrap').css('height','4919px');
    }
    // 1V1
    footballObj.fenLVL = function(obj){
        gifJson()
        console.log(1067)
        var oId = obj.attr('data-d')
        $('.div_pai').show()
        footballObj.faEventLVL(oId,'2')
        footballObj.createEvent()
    }
    footballObj.fenLVLtj = function(obj){
        gifJson()
        var oId = obj.attr('data-d')
        $('.div_pai').hide()
        footballObj.faEventLVL(oId,'2')
        footballObj.createEvent()
        $('#foot_fa').find('.tempWrap').css('height','1294px');
    }
    footballObj.LmeiliObj = function(obj){
        var htl = obj.attr('data-l')
        rankingObj.goBack = function(){
            rankingObj.destroy();
            footballObj.show(true);
            Global.fixd()
        }
        rankingObj.show(true,rankingObj.ranAjax(htl,'day'));
    }
    footballObj.Afollow = function(obj){
        footballObj.tabObj()
        $('.flowe').addClass('active').siblings().removeClass('active')
        // var thisT = obj.attr('data-t');
        $('.s_follow').show().siblings('.s_rooms').hide()
        footballObj.followObj()
    }    
    footballObj.tabObj = function(obj){
        // window.scrollTo(0,0)
        gifJson()
        // obj.eq($(this).index()).addClass("active").siblings().removeClass('active');
    }
    
    footballObj.opact = function(obj){
        obj.find('i').css('display','block')
        obj.siblings().find('i').css('display','none')
        setTimeout(function(){$('#sec_fa').find('.new_opac').hide()},1000);
        // console.log(obj.parents('li'))
    }
    
    footballObj.Adeta = function(obj){
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            footballObj.show(true);
            Global.fixd()
        }
        AvdetailsObj.show(true,function(){
            gifJson()
            //  doOneLive
            AvdetailsObj.detaObj(obj.attr('data-d'),obj.attr('data-z'))
        });
    }
    footballObj.goImchat = function(obj){
        imLogin(obj)
    }
    footballObj.seleObj = function(obj){
        var odds_1 = obj.attr('data-v');
        var sibingObj = obj.siblings();
        sibingObj.removeClass('i_url');
        obj.addClass('i_url');
        footballObj.goVlove(odds_1)
    }

    footballObj.goAfen = function(obj){
        var odds_1 = obj.attr('data-v');
        var odds_u = obj.attr('data-u');
        footballObj.ajaxplays()
        // var odds_u = obj.attr('data-u'); btn_gzh
        // console.log(odds_u)
    }
    footballObj.goseach = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            footballObj.show();
            Global.fixd()
        }
        searchObj.show(3); 
    }

    var isVideoFullScreen = false;
    footballObj.floadObj = function() {
        footballObj.createDomObj()
        footballObj.createEvent();
        setTimeout(function(){
            gifJson()
            footballObj.faEvent(10,'1','1')
            footballObj.followObj()
        },100)
    }
    footballObj.onloadExecution = function(){  
        footballObj.floadObj()
    }
    footballObj.init = function(){
        footballObj.onloadExecution()
    }
    function mathliveObj() {
        var tex = [
            'images/channel/live1.png',
            'images/channel/live2.png',
            'images/channel/live3.png',
            'images/channel/live4.png',
            'images/channel/live5.png',
            'images/channel/live6.png',
        ]
        return livImg = tex[Math.floor(Math.random()*tex.length)]
    }