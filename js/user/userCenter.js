	var userCenterObj = new PageController({
	   'name': 'userCenter',
	   'tpl' : 'template/user/userCenter.html',
	   'initScrollTop': true
    }); 
// userCenterObj.goBack share huodong 立即登录 余额  wytg
	userCenterObj.createDomObj = function(){
		this.wrapperObj = $("#userCenter_wrapperObj");
		this.userNameObj = $('#userCenter_userName'); //用户登录、名字 
		this.usersetObj = $('#setUp'); //设置 
		// this.imgHideObj = $('#im_fanhuius'); //取消充值    
		this.ultapObj = $('.me_ul'); //   us_show 
		this.qiehuanObj = $('#sp_qie'); //   切換賬號 

		this.bannerImgObj = $("#user_bannerImgObj"); //轮播 
    	this.bannerDivObj = this.bannerImgObj.parent();
    	// $('#userCenter_wrapperObj').css('height',document.documentElement.clientHeight-57)
		// this.gozhanghuObj = $('#img_deng2'); //賬戶管理  
	    // $('.ul_jiu li.me_ul').on('touchstart',function(){
	    $('.ul_jiu li.me_ul').on('mousedown',function(){
	    	$(this).addClass('activ').siblings().removeClass('activ')
	    })
	    $('.ul_jiu li.me_ul').on('touchend',function(){
	    	$('.ul_jiu li.me_ul').removeClass('activ')
	    })
	}

	//banner比例
  	userCenterObj.defBannerImgProportion = 640/280;

  	//ajax返回数据 
  	userCenterObj.ajaxData = new Object();

  	// console.log(homeObj.ajaxData.bannel)  hgcp
  	//自动生成banner高度
  	userCenterObj.createBannerHeight = function(){
	    var bodyWidth = $("body").width();
	    var height= bodyWidth/this.defBannerImgProportion ;
	    this.bannerImgObj.css("height",height+"px");
	    this.bannerDivObj.css("height",height+"px");
  	}

  	//生成banner  lottery.schedule. channelObj.updatePlay
  	userCenterObj.createBanner = function (typ) {
	    // console.log(typ)
	    // var data = localStorage.getItem("Hdata")
	    var data = typ;
	    // console.log(data)
	    var imgHtml = [];
	    var navHtml = [];
	    data.forEach(function (v, i) {
	        // console.log(v)
	        var url = v['jump_url'];
	          // if ('news' === url) url += '?newsId=' + v['newsId'];
	        imgHtml.push('<li data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img src="' + v['pic_url'] + '"></li>');
	          // imgHtml.push('<li  data-v="' + url + '" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img src="' + v['imgurl'] + '"></li>');
	        navHtml.push('<a class="dot' + (i === 0 ? " on" : "") + '"></a>');
	    });
	    this.bannerImgObj.html(imgHtml.join(''));
	    // console.log(this.bannerImgObj.html(imgHtml.join('')))
	    var narWrapObj = $('#user_NavWarpObj').html(navHtml.join(''));
	    this.bannerNavObj = narWrapObj.children('a');
	    this.bannerSwipeSlide();
	    delete this.ajaxData.bannel;
  	}
  	//banner轮播
  	userCenterObj.bannerSwipeSlide = function () {
      	this.bannerDivObj.swipeSlide({
          	continuousScroll: true,
          	speed: 3000,
          	lazyLoad: true,
          	callback : function(i){
          		// console.log(i)
            	userCenterObj.bannerNavObj.removeClass('on');
            	userCenterObj.bannerNavObj.eq(i).addClass('on');
          	}
      	});
  	}
  /**
   * banner 触摸事件处理
   * @param {Event} e
   * @returns {boolean}
   */
  	userCenterObj.bannerEvent = function (e) {
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
	                var tmp2 = tmp[1].split('&');
	                tmp2.forEach(function (v) {
	                    var tmp3 = v.split('=');
	                    args[tmp3[0]] = tmp3[1] ? tmp3[1] : null;
	                })
	            }

	            return {path: path, args: args};
	        };

	        if (v.indexOf('http://') == 0 || v.indexOf('https://') == 0) {
	            // 外部链接
	            Global.openUrl(v);
	            kaijiangIndexObj.gohomeObj(D)
	        } else {
	            var ret = parseSimpleUrl(v);
	            kaijiangIndexObj.gohomeObj(D)
	                // console.log(ret);  //页面跳转显示 recomList_money_0
	          	if(ConfigObj.display){
	              // console.log(ret.path)
	                if (ret.path == '/sporttery/jczq') this.gotoJczqBet(); //竟足
	                else if (ret.path == '/football') footballObj.show(); 
	                else if (ret.path == '/channel') {
	                      kaijiangIndexObj.chansobj(ret.args.id,ret.args.img,X)
	                }
	                else if (ret.path == 'news') kaijiangIndexObj.goNewsDetail(ret.args.newsId);
	                else Global.open(v);
	            }
	        }
	        Global.pv('banner', {url: v});
	    }
  	}

  	// 請求banner數據
  	userCenterObj.bannerObj = function(){
  		/*function updatePages(res){
  			if (res.ok == true) {
                res.info = $.parseJSON(Global.crypt(res.result));
                userCenterObj.createBanner(res.info)
                console.log(res.info)
            }else{
               $.alertMsg(res.err) 
            }
  		}*/
      	var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'5'
        }

        var secretData = {
          'info' : Global.encrypt(postData)
        };
        console.log(secretData)
        $.ajax({
            url: ConfigObj.localSite+'/Api/bannel_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    res.info = $.parseJSON(Global.crypt(res.result));
                	userCenterObj.createBanner(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
        /*Global.getDataPrefCache('/Api/bannel_list', secretData, function (req) {
          	updatePages(req);
        }, function (req) {
          	updatePages(req);
        }, 1);*/
  	}
	userCenterObj.createEvent = function(){
		this.wrapperObj.unbind('tap').tap(function(e){
			userCenterObj.sectionEvent(e);
		});
		this.qiehuanObj.unbind('tap').tap(function(){ //切換賬號
			userCenterObj.goqhzh()
		})
		this.ultapObj.unbind('tap').tap(function(){
			// console.log($(this))
			// $(this).addClass('ul_url').siblings().removeClass('ul_url')
			// return false;
		})
		this.usersetObj.tap(function(){
			hedSetupObj.goBack = function(){
	            hedSetupObj.destroy();
	            userCenterObj.show();
	            Global.fixd()
	        }
	        hedSetupObj.show(true,function(){
	        	hedSetupObj.gochong()
	        });
		})
		this.userNameObj.tap(function(){
			console.log(40)
			signInObj.goBack = function(){
	            signInObj.destroy();
	            userCenterObj.show();
	            Global.fixd()
	        }
	        // setupeeObj.show();
	        signInObj.show();
		})
	    $('#userCenter_droploadWrap').dropload({  //下拉刷新 activityIdxObj.goBack goForward
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				console.log(loginObj.isLogin)
				if(loginObj.isLogin){
                    userCenterObj.pullLoad = me;
					userCenterObj.getData();
				}else{
					me.resetload();
					userCenterObj.goLogin();
				}
			}
	    })
	}

	userCenterObj.sectionEvent = function(e){
		// console.log($(e).find('li'))
		var pObj = $.oto_checkEvent(e,"LI");
		// return false;
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			// console.log(thisT) 
			//zhgl   
			switch (thisT){
				case "backbtn" : userCenterObj.goBack();return true; 
				case "wytg" : userCenterObj.wytg();return true;  //我要推广 
				case "zhgls" : userCenterObj.gozhgl();return true;  //賬號管理 
				// case "qhzh" : userCenterObj.goqhzh();return true;  //切換賬號 
				case "bdsjs" : userCenterObj.gobdsj();return true;  //切換手機號 
				case "vipSsucc" : userCenterObj.govipSsucc();return true;  //vipSsucc   
				case "yjfk" : userCenterObj.yjfk(thisObj);return true; //意见反馈
				case "tz" : userCenterObj.tz();return true; //通知
				case "lsjls" : userCenterObj.lsjls();return true;  //历史记录
				case "wdhc" : userCenterObj.wdhc();return true;  //我的缓存
				case "wdxh" : userCenterObj.wdxh();return true;  //我的喜欢  
				case "zcxy" : userCenterObj.gozcxy();return true;  // 註冊協議   
				case "bbgx" : Global.checkUpdate(true);userCenterObj.setime();return true;  // 检查更新    
				case "yaoqm" : userCenterObj.goyaoqm(true);return true;  // 輸入邀請碼    
				case "hbjlq" : userCenterObj.gohbjlq(true);userCenterObj.setime();return true;  // 交流群    
				case "zbzc" : userCenterObj.gozbzc(true);return true;  // 临时添加主播注册    
			}
		}

		var pObj = $.oto_checkEvent(e,"A");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			// console.log(thisT)   
			switch (thisT){
				case "Asigin" : userCenterObj.goAsiginss();return true;  //登录  
				case "wytg" : userCenterObj.wytg();return true;  //我要推广 
				// case "A_guan" : userCenterObj.goA_guan();return true;  //我要推广  Avip
			}
		}
	}
	userCenterObj.gozbzc = function(){
		zregisterObj.goBack = function(){
            zregisterObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        zregisterObj.show(true,function(){
        }); 
        /*zbrzthreeObj.goBack = function(){
            zbrzthreeObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        zbrzthreeObj.show(true,function(){
        }); */
	}
	userCenterObj.setime = function(){
		setTimeout(function(){ $('.me_ul').removeClass('activ') },1000);
	}
	/*userCenterObj.goA_guan = function(){
		mycodeObj.goBack = function(){
            mycodeObj.destroy();
            userCenterObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        mycodeObj.show(true,function(){  userCenterObj.userInfo
            mycodeObj.goewm(invitationCode)
        });
	}*/
	userCenterObj.goAsiginss = function(){
		extensionObj.goBack = function(){
            extensionObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        extensionObj.show(true,function(){
            // $('#bdiph').hide()
        }); 
	}
	userCenterObj.gozhgl = function(){
		AccountObj.goBack = function(){
            userCenterObj.show();
            Global.fixd()
            AccountObj.destroy();
        }
        AccountObj.show();
	}
	userCenterObj.gobdsj = function(){
		signUpsObj.goBack = function(){
            userCenterObj.show();
            Global.fixd()
            signUpsObj.destroy();
        }
        signUpsObj.show();
	}
	/*userCenterObj.goqhzh = function(){
        signInsObj.goBack = function(){
            userCenterObj.show();
            Global.fixd()
            signInsObj.destroy();
        }
        signInsObj.show(true,function(){
        	$('#bdiph').hide()
        });
	}*/
	userCenterObj.gozcxy = function(){
		protocolObj.goBack = function(){
            protocolObj.destroy();
            userCenterObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();  
        protocolObj.show();
        userCenterObj.destroy();
	}
	userCenterObj.gohbjlq = function(){
		mypageObj.goBack = function(){  //我的页面  
            mypageObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        mypageObj.show(true);
		/*myfollowObj.goBack = function(){  //我的关注
            myfollowObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        myfollowObj.show(true);*/
		/*if (ConfigObj.platForm === 'android') {
			android_obj.intoPatato('https://pt.im/kdvideo')
		}else{
			ios_obj.intoPatato('https://pt.im/kdvideo')
		}*/
		// window.location.href = 'https://pt.im/joinchat/ab17db16918761c0ea49ad1f8c92e26e'
	}
	userCenterObj.goyaoqm = function(){ //跳轉到邀請碼  
		console.log(beInvited)
		InvitationObj.goBack = function(){
            InvitationObj.destroy();
            userCenterObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show(); vipSsucc
        // console.log(beInvited)
        InvitationObj.show(
        	InvitationObj.beInd(beInvited)
        );
        userCenterObj.destroy();
	}
	userCenterObj.goRegister = function(){
		registerObj.goBack = function(){
			userCenterObj.show();	
		}
		registerObj.goForward = function(){
			// userCenterObj.show();	
			userCenterObj.show(true);	
		}
		loginObj.goBack = function(){
			userCenterObj.show();	
		}
		loginObj.goForward = function(){
			console.log(92) //loginObj.goForward userCenterObj.goLogin
			// return false; updatePage
			userCenterObj.show();	
		}
		registerObj.show(true);
	}
	
	userCenterObj.goStation = function(){
		var self = this;
		/*if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}*/
		stationDetailObj.goBack = function(){
			stationDetailObj.destroy();
			self.show();	
		}
		stationDetailObj.show('reload',function(){
			stationDetailObj.getData(loginObj.userInfo.s_id);
		})	
	}
	userCenterObj.goLogin = function () {
        signInObj.goBack = function () {
            userCenterObj.show(true);
            Global.fixd()
        };
        signInObj.goForward = function () {// lsjl
		    userCenterObj.show(true)
            Global.fixd()
        };
        // signInObj.show(true);
    }
	
	userCenterObj.wytg = function(){//跳转到我要推广页面 Asigin
		socialAuthCallBack1()
		$('.right').css('background','#ecd6d4')
		mycodeObj.goBack = function(){
            // mycodeObj.destroy();
            userCenterObj.show();
			$('.right').css('background','transparent')
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        mycodeObj.show(true,function(){
        	mycodeObj.goewm(exten,url,tex)
        });
	}
	userCenterObj.yjfk = function(obj){//跳转到意见反馈
		var typ = obj.attr('data-c')
		feedbackObj.goBack = function(){
            feedbackObj.destroy();
            userCenterObj.show(true);
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();
        feedbackObj.show(true,function(){
        	feedbackObj.readObj(typ)
        });
	}
	userCenterObj.tz = function(){//跳转到通知
		detailsObj.goBack = function(){
            detailsObj.destroy();
            userCenterObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();
        detailsObj.show(true,function(){
        	detailsObj.goajplay()
        });
	}
	userCenterObj.lsjls = function(){//跳转到历史记录
		/*if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}*/
		// console.log(userCenterObj.userInfo) userCenter_userName
		recordsObj.goBack = function(){
            recordsObj.destroy();
            userCenterObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        recordsObj.show(true,function(){
        	recordsObj.gorecodPlay()
        });
	}
	userCenterObj.wdhc = function(){//跳转到我的缓存 
		OfflineObj.goBack = function(){
            OfflineObj.destroy();
            userCenterObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();  userCenterObj.goLogin
        OfflineObj.show();
	}
	userCenterObj.wdxh = function(){//跳转到我的喜欢
		/*if(!loginObj.isLogin ){
			userCenterObj.goLogin();
			return false;	
		}*/
		mycollectionObj.goBack = function(){
            mycollectionObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        mycollectionObj.show(true,function(){
        	// mycollectionObj.gorecodPlay()
        });
		/*myloveObj.goBack = function(){
            myloveObj.destroy();
            userCenterObj.show();
            Global.fixd()
        }
        myloveObj.show(true,function(){
        	myloveObj.gorecodPlay()
        });*/
	}
	
	userCenterObj.getData = function(){
		var postData = {
        	channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            imei:ConfigObj.Iemid
        }
        var secretData = {
	        'info' : Global.encrypt(postData)
	    };
        $.ajax({
	        url: ConfigObj.localSite+'/api/user_info_no',
	        data: secretData,
	        type: "post",
	        dataType: "json",
	        success:function(obj){
	    		if (obj.ok == true) {
	            	obj.info = $.parseJSON(Global.crypt(obj.result));
	            	// console.log(obj.info) 
	            	beInvited = obj.info.be_invited
	            	if (obj.info.type == '3') {
	            		var sDate1 = obj.info.now_time.substring(0,11)
		            	var sDate2 = obj.info.expiry_time.substring(0,11)
				        var dateSpan,tempDate,iDays;
				        var sDate1 = Date.parse(sDate1);
				        var sDate2 = Date.parse(sDate2);
				        var dateSpan = sDate2 - sDate1;
				        if (dateSpan >= '0') {
				        	var dateSpan = Math.abs(dateSpan);
				        	var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
				        }else{
				        	var iDays = ''
				        }
	            	}else{
	            		var iDays = ''
	            	}
	            	// var myDate = new Date(); 
	            	// var neDat = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate()
	            	// console.log(neDat)
	            	
	                userCenterObj.userInfo = obj.info;
	                exten = obj.info.invitation_code
	                // console.log(obj.info)
	                url = obj.info.share_url 
	                tex = obj.info.share 
	                // userCenterObj.formatHtmlA(obj.info);
	                //注释修改个人中心页面不展示待付款，待开奖
	                // console.log(obj.info.type)
	                if (obj.info.type == undefined) {
	                	return false;
	                }
	                userCenterObj.formatHtmlB(obj.info,iDays); 
	                if (ConfigObj.platForm == 'android' && typeof android_obj != 'undefined') {
	                    setTimeout(function () {  //获取新信息数
	                        //android_obj.getUnreadCount();
	                    }, 500)
	                } else if (ConfigObj.platForm == 'ios' && typeof ios_obj != 'undefined') {
	                    setTimeout(function () {  //获取新信息数
	                        //ios_obj.getUnreadCount();
	                        // console.log(601) zhgl
	                    }, 500)
	                }
	            } else {
	                loginObj.tokenFail();
	                signInObj.show();
	                signInObj.goForward = function () {
	                    userCenterObj.show('reload');
	                }
	                signInObj.goBack = function () {
	                    signInObj.show();
	                }
	            }
	            if (userCenterObj.pullLoad) {  
	                userCenterObj.pullLoad.resetload();
	            } 
	      	}
	    })
	}
	userCenterObj.formatNoLoginHtml = function(){
		var html = '<li class="divLink wi35" data-t="zhgl">\
					<img class="imgMy " src="images/me/hg_wd1_07.png" alt="">\
				</li>\
				<li class="divLink wi65">\
					<h3 class="h3"> </h3>\
					<p class="p_pad">\
						<a class="a_col" href="#" style="padding-left:1px;">ID:EFiOadck&nbsp;&nbsp;</a>\
						<a class="a_col" href="#">綁定手機號</a>\
					</p>\
				</li>'
		$('#div_name').html(html)
		$('#an_ban').html('版本V'+ConfigObj.version)
		if(ConfigObj.share == 'N'){
			$('.li_vip_cen').css('opacity','0')
		}
	}
	/*<li class="P_zuan"><img src="images/me/zuan.png" alt="">&nbsp;&nbsp;0000</li>\ touchmove
					<li data-t="qhzh" class="P_zuan"><img class="wi36_qh" src="images/me/qih.png" alt="">&nbsp;切換賬號</li>*/
	userCenterObj.formatHtmlB = function(ob,dat){
		if (dat >= '1') {
			var dat = '剩餘'+dat+'天'
		}else if(dat == '0'){
			var dat = '今日到期'
		}else{
			var dat = '充值VIP'
		}
		var html1 = '<li class="divLink wi35" data-t="zhgl">\
					<img class="imgMy " src="images/me/hg_wd1_07.png" alt="">\
				</li>\
				<li class="divLink wi65" data-t="'+(ob.mobile == '' ? 'bdsjs' : 'zhgls')+'">\
					<h3 class="h3">'+ ob.nickname+' </h3>\
					<p class="p_pad">\
						<a class="a_col" href="#" style="padding-left:1px;">ID:'+ ob.invitation_code+'&nbsp;</a>\
						<a class="a_col" href="#">'+(ob.mobile == '' ? '綁定手機號' : ob.mobile)+'</a>\
					</p>\
				</li>'
					// <p class="p_fdb904" style="'+(ConfigObj.share == 'Z' ? 'text-indent: 10px;' : '')+'"> <span class="'+(ConfigObj.share == 'Z' ? 'sp_show' : 'sp_hide')+'" >剩餘次數</span><img style="'+(ConfigObj.share == 'Z' ? 'display:none' : 'display:inline-block')+'" src="images/img/kdsp_wd_zs.png" alt="">'+(ConfigObj.share == 'Z' ? ob.more_watch : ob.money)+'</p>\
		$('#p_number').html(ob.surplus_num+ '/'+ ob.more_watch)
		$('#div_name').html(html1) 
		$('#an_ban').html('版本V'+ConfigObj.version)
		/*$('#Potato').html('<img class="img_icon" src="images/img/wdtg.png" alt="">\
					<p data-r="'+ Src +'" class="p_set">火爆交流群</p>')*/
		if (ob.read == 0) {
			$('#yj_acti').removeClass('active_li').attr('data-c','0')
		}else{
			$('#yj_acti').addClass('active_li').attr('data-c','1')
		}
		// $('.p_Anam').html('<a id="" class="a_logo" href="javascript:void(0)">L0小白</a>'); sp_qie	  
	}
	userCenterObj.onloadExecution = function(){
		if(loginObj.isLogin){
			this.getData();
		}else{
			this.formatNoLoginHtml();
		};
		userCenterObj.createDomObj()
		// userCenterObj.gostate()
		// userCenterObj.secEvent()
		userCenterObj.createEvent()
		userCenterObj.bannerObj()
	}
	userCenterObj.setDefConfig = function(){
		// console.log(loginObj.isLogin) 
		userCenterObj.pullLoad = '';
		if (ConfigObj.share == 'N') {
			$('#ul_fenxiang').hide()
			$('#us_shows').hide()
		}else if(ConfigObj.share == 'Z'){
			// $('#ul_fenxiang').show()
			$('#us_shows').hide()
			$('#use_show').show()
			$('#ul_Vip').hide()
		}else{

		}
	}
	userCenterObj.init = function(){
		// console.log(loginObj.isLogin) 
		userCenterObj.setDefConfig();
		userCenterObj.onloadExecution();
	}
	