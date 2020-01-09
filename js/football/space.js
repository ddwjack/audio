    var spaceObj = new PageController({
	   'name': 'space',
	   'tpl' : 'template/football/space.html'
    });
    spaceObj.createDomObj = function(){
    	this.ClickObj = $(".imgBut");
        this.hedsetObj = $("#space") 
        var imag = Math.floor((document.documentElement.clientWidth )/2)
        // $('.hebfb').css('height',imag)
        // $('.diNul').css('height',imag)
    }

    
    spaceObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            spaceObj.sectionEvent(e);
        });
        this.ClickObj.unbind('tap').tap(function(e){ //返回
            spaceObj.goBack()
        })
        var page = 1;
        var size = 10;
        $('#space').dropload({ 
            scrollArea : window,
            distance : 50,
            loadDownFn:function(me){
                spaceObj.pullLoad = me
                if (ConfigObj.platForm === 'android') {
                    if (android_obj.isVPN() == true) {
                        $.alertMsg('當前訪問人數過多，請稍後訪問')
                        return false;
                    }
                }
                page++;
                var postData ={  
                    channel:ConfigObj.zdid,
                    app_key:ConfigObj.appkey,
                    anchor_id:anchId,
                    user_id:ConfigObj.meId,
                    version:ConfigObj.version,
                    client:client,
                    page:page,
                    rows:'10',
                } 
                console.log(postData)
                var secretData = {
                  'info' : Global.encrypt(postData)
                };
                $.ajax({
                    url: ConfigObj.localSite+'/anchor/enclosure',
                    data: secretData,
                    type: "post",
                    dataType: "json",
                    success:function(res){
                        if (!res.err) {
                            res.info = $.parseJSON(Global.crypt(res.result));
                            // console.log(res.info)
                            spaceObj.loadObj(res.info)
                        }else{
                           $.alertMsg(res.err) 
                        }
                    },
                    error:function(xhr, type){
                        spaceObj.pullLoad.resetload();
                    }
                })
              // sowingObj.pullLoad = me; titlist
              // homeObj.getData(2)
            }
        }); 
    }
    spaceObj.sousu = function(){
        searchObj.goBack = function(){
            searchObj.destroy();
            spaceObj.show();
            Global.fixd()
        }
        searchObj.show(2);
    }
    spaceObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "user_detail" : spaceObj.goxxi(thisObj);return true; //详细动态  
                case "AGuan" : footballObj.goimgFoll(thisObj);return true; //详细动态  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                case "img_deta" : spaceObj.goimgDeta(thisObL);return true; //* 

            }
        }

        var pObL = $.oto_checkEvent(e,"P");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            switch (thisT){
                case "img_deta" : spaceObj.goimgDeta(thisObL);return true; //* 
            }
        }
    }
    
    spaceObj.goxxi = function(obj){
        offTop = obj[0].offsetTop
        var thisD = obj.attr('data-d')
        var thisN = obj.attr('data-n')
        userdetailsObj.goBack = function(){
            userdetailsObj.destroy();
            spaceObj.show(false,function(){
            });
            spaceObj.scrTop(offTop)
            Global.fixd()
        }
        userdetailsObj.show(true,function(){
            userdetailsObj.detail(thisD,thisN,offTop)
        });
    }
    spaceObj.scrTop = function(tp){
        // $('.div_log').show()
        setTimeout(function(){
            // $('.div_log').hide()
            window.scrollTo(0,tp-300)
        },70)
    }
    spaceObj.goimgDeta = function(obj){
        var offTop = obj[0].offsetTop
        var thisM = obj.attr('data-m') 
        var thisG = obj.attr('data-g') 
        var thisZ = obj.attr('data-z')  
        // $('#imgswip').show()
        nodisturbObj.goBack = function(scTop){
            nodisturbObj.destroy();
            spaceObj.show(false,function(){
                spaceObj.scrTop(scTop)
            });
            spaceObj.scrTop(scTop)
            // Global.fixd()
        }
        nodisturbObj.show(true,function(){
            // nodisturbObj.createBanner(thisM)
            nodisturbObj.Imgdetail(thisM,thisG,offTop,thisZ)
        });
    }
    spaceObj.scrTop = function(tp){
        setTimeout(function(){
            window.scrollTo(0,tp+300)
        },100)
    }
    spaceObj.goApublish = function(){
        publishObj.goBack = function(){
            publishObj.destroy();
            spaceObj.show(true);
            Global.fixd()
        }
        publishObj.show(true);
    }
    spaceObj.ajaxdeta = function(id,nm,lx){
        gifJson()
        anchId = id
        $('#sp_nme').html('@'+nm+'的空間')
        if (lx == '0') {
            $('#guanzhuA').html('<span class="Agz">+關注</span>')
        }else{
            $('#guanzhuA').html('<span class="sp_tex_gz Agz">已關注</span>')
        }
        var postData ={  
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:id,
            version:ConfigObj.version,
            client:client,
            user_id:ConfigObj.meId,
            page:'1',
            rows:'10',
        } 
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/anchor/enclosure',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info) 
                    spaceObj.centerObj(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
                // localStorage.setItem("channel", res.info.channel_id);  spaceObj.titlist
            }
        })
    }
    spaceObj.centerObj = function(res){
        console.log(res)
        if (res.length == '0') {
            $('#spacNone').show()
        }else{
            $('#spacNone').hide()
        }
        var html = ''
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i])
            $('#guanzhuA').attr('data-d',res[i].anchor_id)
            var re = res[i]
            var tim = re.created_date.replace(12,19)
            var str = re.images;
            var img = str.split(',');
            html += '<div class="div_namic">\
                <div class="p_user">\
                    <a class="link w78" href="javascript:void(0)">\
                        <img class="img_user fl" src="'+ re.avatar_url+'" alt="#">\
                        <p class="p_font">'+ re.nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                        <p class="p_lx">'+ re.craft +'</p>\
                    </a>\
                    <a class="link wid20" href="javascript:void(0)"><img style="width:16px;" src="images/room/wu.png" alt=""><span class="sp_fr">'+ re.collect +'</span></a>\
                </div>\
                <div><p class="texCent">'+ re.message +'</p></div>';
                /*if (re.video != '') {
                    html += '<video id="dy_video"  class="" poster="" controls="true"  src="'+ re.video +'"></video>'
                }*/
                if (img.length == '1' && img != '') {
                    var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                    html +='<ul class="ul_img">\
                                <li data-t="img_deta" data-m="'+ re.id +'" data-z="1" data-g="'+ img[0]+'" class="W100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></li>\
                            </ul>'
                }else if(img.length == '2'){
                        var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                    html +='<ul class="ul_img">\
                                <li data-t="img_deta" data-m="'+ re.id +'" data-z="1" data-g="'+ img[0]+'" class="w49" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;">\
                                    </li>\
                                    <li data-t="img_deta" data-m="'+ re.id +'" data-z="2" data-g="'+ img[1]+'" class="w49" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;">\
                                    </li>\
                            </ul>'
                }else if(img.length >= '3'){
                    var len = img.length - '3'
                        var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                        var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                    html += '<ul class="ul_img">\
                                <li data-t="img_deta" data-m="'+ re.id +'" data-z="1" data-g="'+ img[0]+'" class="w70" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                </li>\
                                <li class="w28">\
                                    <p data-t="img_deta" data-m="'+ re.id +'" data-z="2" data-g="'+ img[1]+'" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></p>\
                                    <p style="height: .7rem;"></p>\
                                    <p data-t="img_deta" data-m="'+ re.id +'" data-z="3" data-g="'+ img[2]+'" class="pAfter" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
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
        $('#dynac_cent').html(html)
        gifNone()
    }
    spaceObj.loadObj = function(dat){
        var re = dat
        var arrLen = dat.length;
        var result = ''
        if(arrLen > 0){
            for(var i=0; i<arrLen; i++){
                var tim = re.created_date.replace(12,19)
                var str = re.images;
                var img = str.split(',');
                result += '<div class="div_namic">\
                    <div class="p_user">\
                        <a class="link w78" href="javascript:void(0)">\
                            <img class="img_user fl" src="'+ re[i].avatar_url+'" alt="#">\
                            <p class="p_font">'+ re[i].nickname +'<i class="i_gender"></i><span class="sp_font">'+ tim +'</span></p>\
                            <p class="p_lx">'+ re[i].craft +'</p>\
                        </a>\
                        <a class="link wid20" href="javascript:void(0)"><img src="images/room/wu.png" alt=""><span class="sp_fr">658</span></a>\
                    </div>\
                    <div><p class="texCent">'+ re[i].message +'</p></div>';
                    /*if (re.video != '') {
                        result += '<video id="dy_video"  class="" poster="" controls="true"  src="'+ re[i].video +'"></video>'
                    }*/
                    console.log(img)
                    if (img.length == '1' && img != '') {
                        var hie = Math.floor(((document.documentElement.clientWidth - 20))/1.7)
                        result +='<ul class="ul_img">\
                                <li data-t="img_deta" data-m="'+ re[i].id +'" data-z="1" data-g="'+ img[0]+'" class="W100" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;width:100%;"></li>\
                            </ul>'
                    }else if(img.length == '2'){
                        var hie = Math.floor(((document.documentElement.clientWidth - 20)*0.49)/0.8)
                        result +='<ul class="ul_img">\
                                <li data-t="img_deta" data-m="'+ re[i].id +'" data-z="1" data-g="'+ img[0]+'" class="w49" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie+'px;">\
                                    </li>\
                                    <li data-t="img_deta" data-m="'+ re[i].id +'" data-z="2" data-g="'+ img[1]+'" class="w49" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie+'px;">\
                                    </li>\
                            </ul>'
                    }else if(img.length >= '3'){
                        var len = img.length - '3'
                        var hie1 = Math.floor(((document.documentElement.clientWidth - 20)*0.7)/1.2)
                        var hie2 = Math.floor(((document.documentElement.clientWidth - 20)*0.28)/1)
                        result += '<ul class="ul_img">\
                                <li data-t="img_deta" data-m="'+ re[i].id +'" data-z="1" data-g="'+ img[0]+'" class="w70" style="background:url('+ img[0] +')no-repeat center;background-size:cover;height:'+hie1+'px;">\
                                </li>\
                                <li class="w28">\
                                    <p data-t="img_deta" data-m="'+ re[i].id +'" data-z="2" data-g="'+ img[1]+'" style="background:url('+ img[1] +')no-repeat center;background-size:cover;height:'+hie2+'px;"></p>\
                                    <p style="height: .7rem;"></p>\
                                    <p data-t="img_deta" data-m="'+ re[i].id +'" data-z="3" data-g="'+ img[2]+'" class="pAfter" style="background:url('+ img[2] +')no-repeat center;background-size:cover;height:'+hie2+'px;"><span style="'+ (len == '0'? 'display:none;' : 'display:block') +'" class="spmore">+'+ len +'</span></p>\
                                </li>\
                            </ul>'
                    }
                    result += '<p class="bot_A">\
                        <a class="w60" href="javascript:void(0)">\
                            <img src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re[i].view +'</sapn>\
                        </a>\
                        <a class="w20" href="javascript:void(0)">\
                            <img src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re[i].reply +'</sapn>\
                        </a><a class="w20" href="javascript:void(0)"><img src="images/dynamic/zan.png" alt="#"><sapn class="sp_rel">'+ re[i].thumbs +'</sapn></a>\
                    </p>\
                </div>'
            }
        }else{
            spaceObj.pullLoad.lock();
            $('#space_hide').show()
            $.alertMsg('已經到底了，無更多數據')
        }
            $('#dynac_cent').append(result);
            // var imag = Math.floor(((document.documentElement.clientWidth - 20) *0.485)/1.6)
            // $('#wh_ul img').css('height',imag)
            // $('#ul_zxp i.opactiy').css('height',imag)
            spaceObj.pullLoad.resetload();
    }
    spaceObj.onloadExecution = function(){
    	spaceObj.createDomObj()
        spaceObj.createEvent()
        window.scrollTo(0,0)
    }
    spaceObj.init = function(){
	 	spaceObj.onloadExecution()
    }