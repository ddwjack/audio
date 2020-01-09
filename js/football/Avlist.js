    var AvlistObj = new PageController({
	   'name': 'Avlist',
	   'tpl' : 'template/football/Avlist.html'
    });
    AvlistObj.createDomObj = function(){
    	this.ClickObj = $(".AV_Fan");
        this.hedsetObj = $("#Avlist") 
        this.butUpObj = $("#but_up")  //退出登录 
        this.spaUpObj = $(".sp_sub")  //提交资料
        this.scrollObj = $("#numKaijiang_scrollObj");

        this.ClickObj.unbind('tap').tap(function(e){ //返回
            AvlistObj.goBack()
        })

        $('.p_w5 span.sp_pl').unbind('tap').tap(function(){
            $(this).addClass('sp_acti').siblings().removeClass('sp_acti')
        })
    }

    
    AvlistObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            AvlistObj.sectionEvent(e);
        });
        this.butUpObj.unbind('tap').tap(function(e){
            AvlistObj.secbutUp(e);
        });
        this.spaUpObj.unbind('tap').tap(function(){
            AvlistObj.spanSub()
        })
    }
    AvlistObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "qx" : $('#sec_xgnc').hide();return true; //取消*
                case "qd" : AvlistObj.paqd();return true; //确定 
                case "yzm_qx" : $('#iphon').hide();return true; //取消  
                case "yzm_qd" : AvlistObj.yzmQd();return true; //确定  
                case "log_qx" : $('#se_log').hide();return true; //取消退出登录  
                case "log_qd" : AvlistObj.logQd();return true; //确定退出登录  
            }
        }

        var pObL = $.oto_checkEvent(e,"LI");
        if(pObL){
            var thisObL = $(pObL);
            var thisT = thisObL.attr("data-t");
            console.log(thisT)//account caching current protocol
            
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "upd" : this.updateType(thisObL);return true; //*
                case "nc" : $('#sec_xgnc').show();return true; //昵称*
                case "xb" : $('#sex').show();return true; //性别
                case "sjh" : AvlistObj.pasjh();return true; //手机号
                case "xgmm" : AvlistObj.paxgmm();return true; //修改密码
                case "xbqx" : $('#sex').hide();return true; //性别取消

            }
        }
    }
    AvlistObj.updateType = function(obj){
    console.log(obj)

    var sibingObj = obj.siblings();
    sibingObj.removeClass('on');
    obj.addClass('on');
    var thisV = obj.attr("data-v");
    this.nowLotteryType = thisV;
    this.nowPage = 0;
    // this.kjListObj.html('<p class="loading_1"></p>');
    if(thisV=="ftspf"){
      this.getJCLotteryData();
    }else if(thisV =='bsksf'){
        this.getBSKLotteryData();
        }else{
      this.getLotteryData();
    }
    this.titleScrollVal();
    this.checkDateShow();
    //setTimeout(function(){
    //  $('#numKaijiang .loading_1').remove();
    //},1000);
  }
  AvlistObj.titleScroll = function () {
      this.myScroll = new iScroll(this.scrollObj[0], {
          hScrollbar: false,
          hScroll: true,
          vScroll: false
      });
  }
  AvlistObj.initIScroll = function () {
      AvlistObj.titleScroll();

      setTimeout(function () {
          AvlistObj.myScroll.refresh();
          AvlistObj.titleScrollVal();
      }, 300);
  };
  AvlistObj.titleScrollVal = function(){
    var width = 0;
    var clientWidth = document.documentElement.clientWidth;
    var titleWidth = this.scrollObj.children('ul').width();

    var allLiObj = this.scrollObj.find('li');
    for(var i=0,ilen=allLiObj.length;i<ilen;i++){
      var thisT = allLiObj.eq(i).attr("data-v");
      width += allLiObj.eq(i).width();
//    //console.log(allLiObj.eq(i).width());
      if(thisT == this.nowLotteryType)break;
    }

    // TODO 这是 jQuery/Zepto 的 一个 BUG，对于动态插入的元素可能不能获取宽度
//  //console.log('width:' + width + ' ' + 'clientWidth: ' + clientWidth + ' ' + 'titleWidth:' + titleWidth);

    if(width > clientWidth/2 && this.myScroll){
      if(titleWidth - width < clientWidth/2){
        console.log(1)
        this.myScroll.scrollTo((titleWidth-clientWidth)*-1,0,800,false);
      }else{
        console.log(2)
        // this.myScroll.scrollTo((width-clientWidth/2)*-1,0,800,false);
      }
    }else{
        console.log(3)

      this.myScroll.scrollTo(0,0,800,false);
    }
  }

    AvlistObj.yzmQd = function(){ //验证码确定发送
        changeObj.goBack = function(){
            changeObj.destroy();
            AvlistObj.show();
        }
        changeObj.show();
    }

    AvlistObj.onloadExecution = function(){
    	AvlistObj.createDomObj()
        AvlistObj.createEvent()
        AvlistObj.initIScroll()
    }
    AvlistObj.init = function(){
	 	AvlistObj.onloadExecution()
    }