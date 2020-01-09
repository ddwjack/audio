	var mypageObj = new PageController({
	   'name': 'mypage',
	   'tpl' : 'template/user/mypage.html',
	   'pullDistance': 220
    }); 
// mypageObj.goBack share huodong 立即登录 余额  wytg
	mypageObj.createDomObj = function(){
		this.wrapperObj = $("#mypage");
		this.userNameObj = $('#userCenter_userName'); //用户登录、名字 
		this.usersetObj = $('#setUp'); //设置 
		this.qiehuanObj = $('#sp_qie'); //   切換賬號  
		// this.spandataObj = $('#spandata'); //   是否记住密码  

		this.bannerImgObj = $("#page_bannerImgObj"); //轮播 
    	this.bannerDivObj = this.bannerImgObj.parent();
    	// $('#userCenter_wrapperObj').css('height',document.documentElement.clientHeight-57)
	    // $('.ul_jiu li.me_ul').on('touchstart',function(){
	    $('.fle_ty li.liFlex').on('mousedown',function(){
	    	$(this).addClass('activ').siblings().removeClass('activ')
	    })
	    $('.divLis ul.listUl').on('mousedown',function(){
	    	$(this).addClass('activ').siblings().removeClass('activ')
	    })
	    $('.fle_ty li.liFlex').on('touchend',function(){
	    	$('.fle_ty li.liFlex').removeClass('activ')
	    })
	    // if (pageName == 'mypage') {
	    	if (localStorage.getItem("Imtexts") == null) {
	        	$('#p_myIm').html('0')
		    }else{
		    	// alert(localStorage.getItem("Imtexts") + '緩存')
	        	$('#p_myIm').html(localStorage.getItem("Imtexts"))
		    }
	    // }
	    /*setInterval(function(){
            plusObj(10)
        },3000)*/
	}

	//banner比例
  	mypageObj.defBannerImgProportion = 640/280;

  	//ajax返回数据 
  	mypageObj.ajaxData = new Object();

  	// console.log(homeObj.ajaxData.bannel)  hgcp mypageObj.userInfo
  	//自动生成banner高度
  	mypageObj.createBannerHeight = function(){
	    var bodyWidth = $("body").width();
	    var height= bodyWidth/this.defBannerImgProportion ;
	    this.bannerImgObj.css("height",height+"px");
	    this.bannerDivObj.css("height",height+"px");
  	}

  	//生成banner  lottery.schedule. channelObj.updatePlay
  	mypageObj.createBanner = function (typ) {
  		// console.log(typ)
	    var data = typ;
	    var imgHtml = [];
	    var navHtml = [];
	    data.forEach(function (v, i) {
	        // console.log(v)
	        var url = v['target'];
	          // if ('news' === url) url += '?newsId=' + v['newsId'];
	        imgHtml.push('<li data-d="'+v['id']+'" data-x="'+ v['message']+'" data-v="'+ url +'" data-webUrl="' + (v['webUrl'] ? v['webUrl'] : '') + '"><img style="background:url(images/channel/chan_003.png);background-size:100% 100%;border-radius:10px;" src="' + v['url'] + '"></li>');
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
  	mypageObj.bannerSwipeSlide = function () {
      	this.bannerDivObj.swipeSlide({
          	continuousScroll: true,
          	speed: 3000,
          	lazyLoad: true,
          	autoSwipe:false,
          	callback : function(i){
          		// console.log(i)
            	mypageObj.bannerNavObj.removeClass('on');
            	mypageObj.bannerNavObj.eq(i).addClass('on');
          	}
      	});
  	}
  /**
   * banner 触摸事件处理
   * @param {Event} e
   * @returns {boolean}
   */
  	mypageObj.bannerEvent = function (e) {
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
	        } else {
	            var ret = parseSimpleUrl(v);
	                // console.log(ret);  //页面跳转显示 recomList_money_0
	          	if(ConfigObj.display){
	              // console.log(ret.path)
	                if (ret.path == 'video') Global.playVideo(ret.args[0],ret.args[1],ret.args[2]); //播放視頻
		            else if (ret.path == 'football') Goanchor(ret.args[0],ret.args[1],ret.args[2],ret.args[3],'dynamicObj') /*footballObj.show()*/; 
		            else if (ret.path == 'audio') Global.bookImgObj(ret.args[0],ret.args[1]);  // 聽書詳情
		            else if (ret.path == 'home') {kaijiangIndexObj.show()}
		            else if (ret.path == 'money') {
		                moneyObj.goBack = function(){
		                    moneyObj.destroy();
		                    mypageObj.show();
		                    Global.fixd()
		                }
		                moneyObj.show(true,function(){
		                    moneyObj.mobileObj(ConfigObj.iphon)
		                }); 
		            }
		            else if (ret.path == 'vip') {
		                myfreeObj.goBack = function(){
		                    myfreeObj.destroy();
		                    mypageObj.show();
		                    Global.fixd()
		                }
		                myfreeObj.show(true,function(){}); 
		            }
		            else if(ret.path == 'bannerIform'){ // /bannerIform?url=http://192.168.0.110/H5/Anchor/one/
                        bannerIformObj.goBack = function(){
                            bannerIformObj.destroy();
                            mypageObj.show();
                            Global.fixd()
                        }
                        bannerIformObj.show(true,function(){
                            bannerIformObj.urlObj(ret.args[0])
                        });
                    }
                    else if(ret.path == ''){}
	                else Global.open(v);
	            }
	        }
	        Global.pv('banner', {url: v});
	    }
  	}

  	// 請求banner數據
  	mypageObj.bannerObj = function(){
      	var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            type:'5'
        }

        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/Api/bannel_list',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                if (res.err == undefined) {
                    // res.info = $.parseJSON(Global.crypt(res.result));
                    res.info = $.parseJSON(Global.crypt(res.result));
                	mypageObj.createBanner(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
  	}
	mypageObj.createEvent = function(){
		if (ConfigObj.bdType == '2') {
            $('#spandata').addClass('offTyp')
        }else{
            $('#spandata').removeClass('offTyp')
        }
		this.wrapperObj.unbind('tap').tap(function(e){
			mypageObj.sectionEvent(e);
		});
		this.qiehuanObj.unbind('tap').tap(function(){ //切換賬號
			mypageObj.goqhzh()
		})
		this.usersetObj.tap(function(){
			setupObj.goBack = function(){
	            setupObj.destroy();
	            mypageObj.show();
	            Global.fixd()
	        }
	        setupObj.show(true,function(){
	        });
		})
		this.userNameObj.tap(function(){
			signInObj.goBack = function(){
	            signInObj.destroy();
	            mypageObj.show();
	            Global.fixd()
	        }
	        // setupeeObj.show();
	        signInObj.show();
		})
		this.bannerDivObj.unbind('tap').tap(function(e){
            mypageObj.bannerEvent(e);
        })
	    $('#userCenter_droploadWrap').dropload({  //下拉刷新 activityIdxObj.goBack goForward
			scrollArea : window,
			distance : this.pullDistance,
			loadUpFn:function(me){
				console.log(loginObj.isLogin)
				if(loginObj.isLogin){
                    mypageObj.pullLoad = me;
					mypageObj.getData();
				}else{
					me.resetload();
					mypageObj.goLogin();
				}
			}
	    })
	}

	mypageObj.sectionEvent = function(e){
		mypageObj.setime();
		// console.log($(e).find('li'))
		var pObj = $.oto_checkEvent(e,"LI");
		// return false;
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			// console.log(thisT) 
			//zhgl   
			switch (thisT){
				case "backbtn" : mypageObj.goBack();return true; 
				case "wytg" : mypageObj.wytg();return true;  //我要推广 改為充值VIP免費觀影
				case "zhgl" : mypageObj.gozhgl();return true;  //賬號管理 
				// case "qhzh" : mypageObj.goqhzh();return true;  //切換賬號  
				case "yjyqm" : mypageObj.goyjyqm();return true;  //用戶邀請  
				case "bdsj" : mypageObj.gobdsj();return true;  //切換手機號 
				case "vipSsucc" : mypageObj.govipSsucc();return true;  //vipSsucc   
				case "yjfk" : mypageObj.yjfk(thisObj);return true; //意见反馈
				case "tz" : mypageObj.tz();return true; //通知
				case "lsjls" : mypageObj.lsjls();return true;  //历史记录
				case "wdhc" : mypageObj.wdhc();return true;  //我的缓存
				case "wdxh" : mypageObj.wdxh();return true;  //我的喜欢  
				case "zcxy" : mypageObj.gozcxy();return true;  // 註冊協議   
				case "bbgx" : Global.checkUpdate(true);return true;  // 检查更新    
				case "yaoqm" : mypageObj.goyaoqm(true);return true;  // 輸入邀請碼    
				case "hbjlq" : mypageObj.gohbjlq(true);return true;  // 交流群    
				case "zbzc" : mypageObj.gozbzc(true);return true;  // 临时添加主播注册     
				case "gomoney" : mypageObj.gomoneyObj(true);return true;  // 跳转充值      
				case "guanzhu" : mypageObj.guanzhuObj(true);return true;  // 关注      
				case "liIm" : mypageObj.goliImObj(true);return true;  // im       
				case "distur" : mypageObj.disturObj();return true;  // 免打擾設置       
				case "rwzx" : mypageObj.rwzxObj();return true;  // 任務中心      
				case "AlogType" : mypageObj.offTypeObj();return true;  // 是否記住密碼      
			}
		}

		var pObj = $.oto_checkEvent(e,"A");
		if(pObj){
			var thisObj = $(pObj);
			var thisT = thisObj.attr("data-t");
			// console.log(thisT)   
			switch (thisT){
				case "Asigin" : mypageObj.goAsiginss();return true;  //登录  
				case "wytg" : mypageObj.wytg();return true;  //我要推广 
				// case "A_guan" : mypageObj.goA_guan();return true;  //我要推广  Avip
			}
		}
	}
	mypageObj.gozbzc = function(){
		zregisterObj.goBack = function(){
            zregisterObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        zregisterObj.show(true,function(){
        }); 
        /*zbrzthreeObj.goBack = function(){
            zbrzthreeObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        zbrzthreeObj.show(true,function(){
        }); */
	}
	mypageObj.offTypeObj = function(obj){
		$('#spandata').toggleClass('offTyp')
		gifJson()
		if ($('#spandata').hasClass('offTyp')) {
            ConfigObj.bdType = '2'
        }else{
            ConfigObj.bdType = '1'
        }
        bdTypeObj(ConfigObj.bdType)
	}
	mypageObj.gomoneyObj = function(obj){
		// goRecharge()
		// $.alertMsg('功能暫未開放')
		moneyObj.goBack = function(){
            moneyObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        moneyObj.show(true,function(){
        	moneyObj.mobileObj(ConfigObj.iphon)
        }); 
	}
	mypageObj.guanzhuObj = function(obj){
		myfollowObj.goBack = function(){  //我的关注
            myfollowObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        myfollowObj.show(true); 
	}
	mypageObj.goliImObj = function(obj){
		imLogout()
		/*imchatObj.goBack = function(){
			// imLogout()
			// client.logout()
            imchatObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        imchatObj.show(true,function(){
        })*/
	}
	mypageObj.disturObj = function(obj){
		$('#mian_dist').toggleClass('offTyp')
		gifJson()
		if ($('#mian_dist').hasClass('offTyp')) {
			var disTime = '23:59'+','+'23:59'
        }else{
        	var disTime = '0'
        }
        mypageObj.gosubszObj(disTime)

		/*mydisturbObj.goBack = function(){
            mydisturbObj.destroy();
            mypageObj.show(true);
            Global.fixd()
        }
        mydisturbObj.show(true,function(){
        	mydisturbObj.setdisturb(disturb)
        })*/
	}
	mypageObj.gosubszObj = function(disTime) {// 免打扰设置
		var arrNm = {'disturb':disTime}
        Global.usNoetu(arrNm)
        gifNone()
	}
	mypageObj.setime = function(){
		setTimeout(function(){ $('.licol').removeClass('activ') },1000);
	}
	/*mypageObj.goA_guan = function(){
		mycodeObj.goBack = function(){
            mycodeObj.destroy();
            mypageObj.show(true);
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        mycodeObj.show(true,function(){
            mycodeObj.goewm(invitationCode)
        });
	}*/
	mypageObj.rwzxObj = function (obj) {
		mymissionObj.goBack = function(){
            mymissionObj.destroy();
            mypageObj.show(true);
            Global.fixd()
        }
        mymissionObj.show(true,function(){
        });
	}
	mypageObj.goAsiginss = function(){
		extensionObj.goBack = function(){
            extensionObj.destroy();
            mypageObj.show(true);
            Global.fixd()
        }
        extensionObj.show(true,function(){
            // $('#bdiph').hide()
        }); 
	}
	mypageObj.gozhgl = function(){
		AccountObj.goBack = function(){
            mypageObj.show(true);
            Global.fixd()
            AccountObj.destroy();
        }
        AccountObj.show();
	}
	mypageObj.gobdsj = function(){
		/*signUpsObj.goBack = function(){
            mypageObj.show(true);
            Global.fixd()
            signUpsObj.destroy();
        }
        signUpsObj.show();*/
	}
	mypageObj.goyjyqm = function(){
		mycodeObj.goBack = function(){
            mypageObj.show(true);
            Global.fixd()
            mycodeObj.destroy();
        }
        mycodeObj.show(true,function(){
        	// console.log(invitationCode,ConfigObj.yshare_url,ConfigObj.yshare)
        	mycodeObj.goewm(invitationCode,ConfigObj.yshare_url,ConfigObj.yshare)
        });
	}
	mypageObj.goqhzh = function(){
        signInsObj.goBack = function(){
            mypageObj.show(true);
            Global.fixd()
            signInsObj.destroy();
        }
        signInsObj.show(true,function(){
        	$('#bdiph').hide()
        });
	}
	mypageObj.gozcxy = function(){
		protocolObj.goBack = function(){
            protocolObj.destroy();
            mypageObj.show(true);
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();  
        protocolObj.show();
        mypageObj.destroy();
	}
	mypageObj.gohbjlq = function(){
		/*InvitationObj.goBack = function(){
            InvitationObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        InvitationObj.show(
        	// InvitationObj.beInd(beInvited)
        );*/
        // mypageObj.destroy();
		if (ConfigObj.platForm === 'android') {
			android_obj.intoPatato('https://lynnconway.me/kdvideo')
		}else{
			ios_obj.intoPatato('https://lynnconway.me/kdvideo')
		}
		// window.location.href = 'https://pt.im/joinchat/ab17db16918761c0ea49ad1f8c92e26e' https://lynnconway.me/kdvideo
	}
	mypageObj.goyaoqm = function(){ //跳轉到邀請碼  
		console.log(beInvited)
		InvitationObj.goBack = function(){
            InvitationObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show(); vipSsucc
        // console.log(beInvited)
        InvitationObj.show(
        	InvitationObj.beInd(beInvited)
        );
        mypageObj.destroy();
	}
	mypageObj.goRegister = function(){
		registerObj.goBack = function(){
			mypageObj.show();	
		}
		registerObj.goForward = function(){
			// mypageObj.show();	wdxh
			mypageObj.show(true);	
		}
		loginObj.goBack = function(){
			mypageObj.show();	
		}
		loginObj.goForward = function(){
			// return false; updatePage
			mypageObj.show();	
		}
		registerObj.show(true);
	}
	
	mypageObj.goStation = function(){
		var self = this;
		/*if(!loginObj.isLogin ){
			mypageObj.goLogin();
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
	mypageObj.goLogin = function () {
        signInObj.goBack = function () {
            mypageObj.show(true);
            Global.fixd()
        };
        signInObj.goForward = function () {// lsjl
		    mypageObj.show(true)
            Global.fixd()
        };
        // signInObj.show(true);
    }
	
	mypageObj.wytg = function(){//跳转到我要推广页面 Asigin
		myfreeObj.goBack = function(){
            myfreeObj.destroy();
            mypageObj.show();
            Global.fixd()
        }
        myfreeObj.show(true,function(){
        	// myfreeObj.goewm(ConfigObj.pNum,ConfigObj.pwat)
            // $('#bdiph').hide() 
        }); 
		
		/*$('.right').css('background','#ecd6d4')
		mycodeObj.goBack = function(){
            mycodeObj.destroy();
            mypageObj.show();
			$('.right').css('background','transparent')
            Global.fixd()
        }
        mycodeObj.show(true,function(){
        	mycodeObj.goewm(exten,url,tex)
        });*/
	}
	mypageObj.yjfk = function(obj){//跳转到意见反馈
		var typ = obj.attr('data-c')
		feedbackObj.goBack = function(){
            feedbackObj.destroy();
            mypageObj.show(true);
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();
        feedbackObj.show(true,function(){
        	feedbackObj.readObj(typ)
        });
	}
	mypageObj.tz = function(){//跳转到通知
		detailsObj.goBack = function(){
            detailsObj.destroy();
            mypageObj.show(true);
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        // setupeeObj.show();
        detailsObj.show(true,function(){
        	detailsObj.goajplay()
        });
	}
	mypageObj.lsjls = function(){//跳转到历史记录
		/*if(!loginObj.isLogin ){
			mypageObj.goLogin();
			return false;	
		}*/
		// console.log(mypageObj.userInfo) userCenter_userName
		recordsObj.goBack = function(){
            recordsObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        recordsObj.show(true,function(){
        	recordsObj.gorecodPlay()
        });
	}
	mypageObj.wdhc = function(){//跳转到我的缓存 
		if (ConfigObj.platForm === 'android') {
			android_obj.downLoadedVideo()
		}else{
			ios_obj.downLoadedVideo()
		}
		/*OfflineObj.goBack = function(){
            OfflineObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url')
            Global.fixd()
        }
        OfflineObj.show();*/
	}
	mypageObj.wdxh = function(){//跳转到我的喜欢
		/*if(!loginObj.isLogin ){
			mypageObj.goLogin();
			return false;	
		}*/
		myloveObj.goBack = function(){
            myloveObj.destroy();
            mypageObj.show();
            // $('.me_ul').removeClass('ul_url') wytg
            Global.fixd()
        }
        myloveObj.show(true,function(){
        });
	}
	
	mypageObj.getData = function(){
		var postData = {
        	channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            imei:ConfigObj.Iemid
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
	        success:function(obj){
	    		if (!obj.err) {
	            	obj.info = $.parseJSON(Global.crypt(obj.result));
	            	console.log(obj.info) 
	            	beInvited = obj.info.be_invited
	                mypageObj.userInfo = obj.info;
	                disturb = obj.info.disturb
	                ConfigObj.iphon = obj.info.mobile
	                // console.log(obj.info) 
	                // url = obj.info.share_url 
	                // tex = obj.info.share 
	                /*surplu = obj.info.surplus_num 
	                watchs = obj.info.more_watch */
	                ConfigObj.power = obj.info.power
                    ConfigObj.pNum = obj.info.surplus_num
                    ConfigObj.pwat = obj.info.more_watch
                    ConfigObj.usName = obj.info.nickname
                    ConfigObj.pic = obj.info.avatar_url
                    ConfigObj.Avip = obj.info.vip
                    ConfigObj.be_invited = obj.info.be_invited
	                // mypageObj.formatHtmlA(obj.info);
	                //注释修改个人中心页面不展示待付款，待开奖
	                mypageObj.formatHtmlB(obj.info); 
	                mypageObj.createBanner(obj.info.banner)
	                if (disturb != '0') {
						$('#mian_dist').addClass('offTyp')
					}else{
						$('#mian_dist').removeClass('offTyp')
					}
	                userTouNam() // 传头像和名字
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
	                    mypageObj.show('reload');
	                }
	                signInObj.goBack = function () {
	                    signInObj.show();
	                }
	            }
	            if (mypageObj.pullLoad) {  
	                mypageObj.pullLoad.resetload();
	            } 
	      	}
	    })
	}
	mypageObj.formatNoLoginHtml = function(){
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
		if(ConfigObj.share == 'N'){
			$('.li_vip_cen').css('opacity','0')
		}
	}
	/*<li class="P_zuan"><img src="images/me/zuan.png" alt="">&nbsp;&nbsp;0000</li>\ touchmove
					<li data-t="qhzh" class="P_zuan"><img class="wi36_qh" src="images/me/qih.png" alt="">&nbsp;切換賬號</li>*/
	mypageObj.formatHtmlB = function(ob,dat){
		// console.log(633)
		var jin = ob.exp/ob.level.max_exp
				// <p class="my_iph">'+(ob.mobile == '' ? '暂未綁定手機號' : ob.mobile)+'</p>\
		var html1 = '<li data-t="zhgl" class="vegTop w75">\
				<img class="fl im_my" style="background:url(images/room/log.png);background-size:100% 100%;" onerror="javascript:this.src='+"\'images/room/log.png\'"+'" src="'+ob.avatar_url +'" alt="#">\
				<p class="my_nam">'+ ob.nickname+'<i class="i_xingbie '+ (ob.sex == '女' ? 'i_icon_wan' : (ob.sex == '男' ? 'i_icon_nan' : 'dip_none'))+'"></i><i class="i_xingbie i_icon_xiu"></i></p>\
				<p class="p_dengji"><span>V'+ob.grade+'</span><span class="sp_dj"><i style="width:'+(jin*100)+'%" class="sp_i_icon"></i></span></p>\
				<p class="my_jia">'+ (ob.craft == '' ? '一條有個性的簽名' : ob.craft ) +'</p>\
			</li>\
			<li data-t="yjyqm" class="vegTop w25 center fons1">\
				<img class="wi48" src="images/me/day1.png" alt="">\
				<p class="my_yjy">有奖邀请码</p>\
				<p class="my_yqm">'+ ob.invitation_code +'</p>\
			</li>'
					// <p class="p_fdb904" style="'+(ConfigObj.share == 'Z' ? 'text-indent: 10px;' : '')+'"> <span class="'+(ConfigObj.share == 'Z' ? 'sp_show' : 'sp_hide')+'" >剩餘次數</span><img style="'+(ConfigObj.share == 'Z' ? 'display:none' : 'display:inline-block')+'" src="images/img/kdsp_wd_zs.png" alt="">'+(ConfigObj.share == 'Z' ? ob.more_watch : ob.money)+'</p>\
		if (ConfigObj.power == '1' || ConfigObj.Avip != '0') {
			if (ConfigObj.power == '1') {
				$('#p_numbe').html('無限次數')
			}
			if (ConfigObj.Avip == '1') {
				$('#p_numbe').html('月卡不限次數')
			}else if (ConfigObj.Avip == '2') {
				$('#p_numbe').html('季卡不限次數')
			}else if (ConfigObj.Avip == '3') {
				$('#p_numbe').html('永久卡不限次數')
			}
		}else{
			$('#p_numbe').html('今日还剩'+ConfigObj.pNum+ '/'+ ConfigObj.pwat+'次')
		}
		$('#p_myMoney').html(ob.current_gold)
		// $('#p_myIm').html()
		$('#p_myFlo').html(ob.follow)
		// $('#pYqms').html(ob.invitation_code)
		$('#div_names').html(html1) 
		// $('#an_ban').html('版本V'+ConfigObj.version)
		if (ob.read == 0) {
			$('#yj_acti').removeClass('active_li').attr('data-c','0')
		}else{
			$('#yj_acti').addClass('active_li').attr('data-c','1')
		}
		gifNone()
		// $('.p_Anam').html('<a id="" class="a_logo" href="javascript:void(0)">L0小白</a>');	 activ 
	}
	mypageObj.mloadObj = function() {
		setTimeout(function() {
			gifJson()
			mypageObj.getData();
			mypageObj.createDomObj()
			mypageObj.createEvent()
		},100)
	}
	mypageObj.onloadExecution = function(){
		mypageObj.mloadObj()
		// mypageObj.bannerObj() 
	} 
	
	mypageObj.init = function(){
		mypageObj.onloadExecution();
		// console.log(loginObj.isLogin) 
	}
	