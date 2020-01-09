    var nodisturbObj = new PageController({
       'name': 'nodisturb',
       'tpl' : 'template/dynamic/nodisturb.html',
       'pullDistance': 220
    });
    nodisturbObj.defBannerImgProportion = 640/280;

    nodisturbObj.createBannerHeight = function(){
        var bodyWidth = $("body").width();
        var height= bodyWidth/this.defBannerImgProportion ;
        this.bannerImgObj.css("height",height+"px");
        this.bannerDivObj.css("height",height+"px");
    }

    nodisturbObj.createBanner = function (typ,ig,ind) {
        // console.log(ind)
        var data = typ;
        var imgHtml = [];
        var navHtml = [];
        data.forEach(function (v, i) {
            var url = v['jump_url'];
            var html = ''
            // html += '<li style="height:70%;" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><p style="background:url('+ ig +')no-repeat center;background-size:cover;height:70%;width:100%;"><p></li>'
            imgHtml.push('<li style="'+(v == ig ? '' : '')+'" data-n="'+ (i == 0 ? " onl" : "") +'" data-l="'+ (i+1) +'" data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img src="'+ v +'" alt="" /></li>');
            navHtml.push('<a data-l="'+ (i+1) +'" class="dot' + (i == 0 ? " on" : "") + '"></a>');
        });
        this.bannerImgObj.html(imgHtml.join(''));
        var narWrapObj = $('#distu_NavWarpObj').html(navHtml.join(''));
        this.bannerNavObj = narWrapObj.children('a');
        this.bannerSwipeSlide();
        gifNone()
        $('#img_number').html($('#distu_NavWarpObj').find('a.on').attr('data-l')+'/'+ $('#distu_NavWarpObj').find('a').length)
    }

    nodisturbObj.bannerSwipeSlide = function () {
        this.bannerDivObj.swipeSlide({
            continuousScroll: true,
            speed: 3000,
            lazyLoad: false,
            autoSwipe:false,
            callback : function(i){
                nodisturbObj.bannerNavObj.removeClass('on');
                nodisturbObj.bannerNavObj.eq(i).addClass('on');
                var znum = $('#distu_NavWarpObj').find('a').length
                var dnum = $('#distu_NavWarpObj').find('a.on').attr('data-l')
                if (dnum == undefined) {
                    var dnumb = $('#distu_NavWarpObj').find('a').length
                }else{
                    var dnumb = dnum
                }
                $('#img_number').html(dnumb+'/'+znum)
            }
        });
    }
    nodisturbObj.Imgdetail = function(id,ig,top,ind){
        eventTop = top
        gifJson()
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            enclosure_id:id
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/live/enclosure_image',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // console.log(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    nodisturbObj.createBanner(res.info,ig,ind)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    nodisturbObj.createDomObj = function(){
        // this.foofaObj = $("#foot_fa"); // fseacrh 
        this.foofaObj = $("#nodisturb"); // fseacrh 
        this.ClickObj = $('.distFan');  //我的缓存
        this.bannerImgObj = $("#dists_bannerImgObj"); //轮播  hgcp
        this.bannerDivObj = this.bannerImgObj.parent(); 
        // $('#sec_fa').css('height',document.documentElement.clientHeight-135)
    }
    nodisturbObj.goBack=function(){
        nodisturbObj.destroy();
        homeObj.show(); 
    }

    nodisturbObj.createEvent = function(Vd){
        var page = 1;
        var size = 10;
        /*this.bannerDivObj.unbind('tap').tap(function(e){
            nodisturbObj.bannerEvent(e);
        })*/
        this.ClickObj.unbind('tap').tap(function(){
            nodisturbObj.goBack()
        })
        this.foofaObj.unbind('tap').tap(function(e){
            nodisturbObj.vidBo(e)
        })
        
        if (ConfigObj.platForm === 'android') {
            if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                return false;
            }
        }
    }
    nodisturbObj.vidBo = function(e){
        var AObj = $.oto_checkEvent(e,"A");
        if(AObj){
            var thisObj = $(AObj);
            var thisT = thisObj.attr("data-t");  
            console.log(thisT)  
            switch(thisT){
                case "goroom" : nodisturbObj.goroomOb(thisObj);return true;   // 已关注   
            }
            return false;
        }
        var dlObj = $.oto_checkEvent(e,"LI");
        if(dlObj){
            var thisObj = $(dlObj);
            var thisT = thisObj.attr("data-t");
            var thisD = thisObj.attr("data-d");
            var thisL = thisObj.attr("data-l");
            switch(thisT){
                case "Lmeili" : nodisturbObj.LmeiliObj(thisObj);return true; //魅力排行榜 
            }
            return false;
        }
    }
    nodisturbObj.Adeta = function(obj){
        AvdetailsObj.goBack = function(){
            AvdetailsObj.destroy();
            nodisturbObj.show();
            Global.fixd()
        }
        AvdetailsObj.show(true,function(){
            //  doOneLive
            AvdetailsObj.detaObj(obj.attr('data-d'),obj.attr('data-z'),obj.attr('data-l'))
        });
    }
    
    var isVideoFullScreen = false;
   
    nodisturbObj.onloadExecution = function(){   
        nodisturbObj.createDomObj()
        this.createEvent();
    }
   
    nodisturbObj.init = function(){
        nodisturbObj.onloadExecution()
        // nodisturbObj.football() order_add
    }
  
  
  
  

  
 
  
   
  
  

    
    
   
 

