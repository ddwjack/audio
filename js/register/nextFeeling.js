    var nextFeelingObj = new PageController({
	   'name': 'nextFeeling',
	   'tpl' : 'template/register/nextFeeling.html'
    });
    nextFeelingObj.createDomObj = function(){
    	this.ClickObj = $(".feelingFan");
        this.hedsetObj = $("#nextFeeling") 
        window.scrollTo(0,0)
        // var namUrl = ''
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextFeelingObj.show();
            }
            signUpObj.show();
        })*/
    }
    
    nextFeelingObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            // if (true) {}
            // console.log(namUrl)
            nextFeelingObj.goBack()
        })
        
        this.hedsetObj.unbind('tap').tap(function(e){
            nextFeelingObj.sectionEvent(e);
        });
       /* $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });*/
        var imag = Math.floor((document.documentElement.clientWidth - 20) * 0.23)
        $('.porti_li').css({"height":imag,"line-height":imag+'px'})
    }
    nextFeelingObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "Aqued" : nextFeelingObj.goAsub();return true; //密码显示*   
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "Li_fee" : nextFeelingObj.gofeeli(thisObj);return true; //密码显示*   
            }
        }
    }
    nextFeelingObj.goAsub = function(){
        var Agqzk = $('li.li_active').attr('data-v')
        var arrNm = {'emotion':Agqzk}
            Global.usNoetu(arrNm)
        // localStorage.setItem("gqzkId", $('li.li_active').attr('data-v'));
        // var gxqms = localStorage.getItem("gqzkId")
        nextFeelingObj.goBack()
    }
    nextFeelingObj.gofeeli = function(obj){
        obj.addClass('li_active').siblings().removeClass('li_active')
    }
    /*function changepic() {
        var reads= new FileReader();
        f=document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            namUrl = this.result
            // console.log(namUrl)
            document.getElementById('show').src=this.result;
        }
    }*/
    nextFeelingObj.onloadExecution = function(){
    	nextFeelingObj.createDomObj()
        nextFeelingObj.createEvent()
        // nextFeelingObj.submitlogin()
    }
    nextFeelingObj.init = function(){
	 	nextFeelingObj.onloadExecution()
    }