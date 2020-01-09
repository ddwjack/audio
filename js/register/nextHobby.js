    var nextHobbyObj = new PageController({
	   'name': 'nextHobby',
	   'tpl' : 'template/register/nextHobby.html'
    });
    nextHobbyObj.createDomObj = function(){
    	this.ClickObj = $(".hobFan");
        this.hedsetObj = $("#nextHobby") 
        window.scrollTo(0,0)
        // this.butOkObj = $(".but_ok")// 
        
       /* this.spfrObj.tap(function(){
            signUpObj.goBack = function(){
                signUpObj.destroy();
                nextHobbyObj.show();
            }
            signUpObj.show();
        })*/
    }
    nextHobbyObj.createEvent = function(){
        this.ClickObj.unbind('tap').tap(function(){
            nextHobbyObj.goBack()
        })
        /*this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })*/
        this.hedsetObj.unbind('tap').tap(function(e){
            nextHobbyObj.sectionEvent(e);
        });
        
    }
    nextHobbyObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "hobqued" : nextHobbyObj.gohobqued(thisObj);return true; //密码显示*  
            }
        }

        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "liXqah" : nextHobbyObj.golxq(thisObj);return true; //密码显示*  
            }
        }
    }
    nextHobbyObj.xqloveObj = function(){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            param:'',
            handle:'before'
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/user/profile',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                console.log(res)
                // var fo = Global.crypt(res)
                if (!res.err) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    nextHobbyObj.gohtmlhobby(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    nextHobbyObj.gohtmlhobby = function(res){
        var html = ''
        for(i in res){
            html += '<li data-t="liXqah" data-v="'+ res[i] +'" class="li_bq"><span class="sp_bq">'+ res[i] +'</span></li>'
        }
        $('#ul_hobby_aih').html(html)
    }
    nextHobbyObj.gohobqued = function(obj){
        var arr = []
        var thing = $('li.lihoddye')
        for (var i = 0; i < thing.length; i++) {
            var title = $(thing[i]).attr('data-v')
            arr[i] = title
        }
       
        var arrObj = arr.join(',')
        var arrNm = {'hobby':arrObj}
            Global.usNoetu(arrNm)
        // localStorage.setItem("xqahId", arrObj);
        nextHobbyObj.goBack()
    }
    nextHobbyObj.golxq = function(obj){
        obj.toggleClass('lihoddye')
        var thinsg = $('li.lihoddye')
        // console.log(thing)
        if (thinsg.length <= '3') {
            
        }else{
            $.alertMsg('只能选择三个')
            obj.removeClass('lihoddye')
            return false;
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
    nextHobbyObj.onloadExecution = function(){
    	nextHobbyObj.createDomObj()
        nextHobbyObj.createEvent()
        nextHobbyObj.xqloveObj()
        // nextHobbyObj.submitlogin()
    }
    nextHobbyObj.init = function(){
	 	nextHobbyObj.onloadExecution()
    }