    var nextNameObj = new PageController({
	   'name': 'nextName',
	   'tpl' : 'template/register/nextName.html'
    });
    nextNameObj.createDomObj = function(){
    	this.ClickObj = $(".nameFan");
        this.hedsetObj = $("#nextName") 
        window.scrollTo(0,0)
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextNameObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextNameObj.nameObj = function(me){
        $('#inp_name').val(me)
    }
    nextNameObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextNameObj.goBack()
        })
        
        this.hedsetObj.unbind('tap').tap(function(e){
            nextNameObj.sectionEvent(e);
        });
        /*$(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
        var imag = Math.floor((document.documentElement.clientWidth - 20) * 0.23)
        console.log(imag)
        $('.porti_li').css({"height":imag,"line-height":imag+'px'})*/
    }
    nextNameObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "Aqued" : nextNameObj.goAsub();return true; //密码显示*  
            }
        }
    }
    nextNameObj.goAsub = function(){
        var valu = $('#inp_name').val()
        if (valu.length == 0) {
            $.alertMsg('请输入您的昵称')
        }else{
            var arrNm = {'nickname':valu}
            Global.usNoetu(arrNm)
            // localStorage.setItem("yhmcId", $('#inp_name').val());
            nextNameObj.goBack()
        }
    }
    /*function changepic() {
        var reads= new FileReader();
        f=document.getElementById('file').files[0];
        reads.readAsDataURL(f);
        reads.onload=function (e) {
            console.log(this.result)
            document.getElementById('show').src=this.result;
        }
    }*/
    nextNameObj.onloadExecution = function(){
    	nextNameObj.createDomObj()
        nextNameObj.createEvent()
        // nextNameObj.submitlogin()
    }
    nextNameObj.init = function(){
	 	nextNameObj.onloadExecution()
    }