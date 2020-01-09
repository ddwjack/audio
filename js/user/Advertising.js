    var AdvertisingObj = new PageController({
	   'name': 'Advertising',
	   'tpl' : 'template/user/Advertising.html'
    });
    AdvertisingObj.createDomObj = function(){
    	this.ClickObj = $(".devrt_fan");
        this.hedsetObj = $("#Advertising") 
    }
   
    AdvertisingObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            AdvertisingObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回  
            AdvertisingObj.goBack()
        })
    }
    AdvertisingObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "Liyjfk" : AdvertisingObj.goLiyjfk();return true; //意見反饋
                case "Liwdfk" : AdvertisingObj.goLiwdfk();$('.i_festate').hide();return true; //我的反饋
            }
        }
    }
    
    AdvertisingObj.fbdetaxq = function(obj){
        AdvertisingObj.gofkdetail(obj)
    }
    AdvertisingObj.gofkdetail = function(id){
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            id:id
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
            url: ConfigObj.localSite+'/user/notice_detail',
            data: secretData,
            type: "post",
            dataType: "json",
            success:function(res){
                // var fo = Global.crypt(res) 
                if (res.ok == true) {
                    res.info = $.parseJSON(Global.crypt(res.result));
                    // console.log(res.info)
                    AdvertisingObj.fkcontentObj(res.info)
                }else{
                   $.alertMsg(res.err) 
                }
            }
        })
    }
    AdvertisingObj.fkcontentObj = function(res){
        var imga = res.images
        var imgs = imga.split(',')
        var html = ''
        for (var i = 0; i < imgs.length; i++) {
            html += '<li class="li_img_fk"><img class="fk_img" src="'+ imgs[i] +'" alt=""></li>'
        }
        $('#ul_img_fkjl').html(html)
        $('#fk_cont').html(res.content)
        if (res.answer == '') {
            $('#hf_cont').html('平台暫未回復，請耐心等待...')
        }else{
            $('#hf_cont').html(res.content)
        }
    }
    AdvertisingObj.onloadExecution = function(){
    	AdvertisingObj.createDomObj()
        AdvertisingObj.createEvent()
    }
    AdvertisingObj.init = function(){
	 	AdvertisingObj.onloadExecution()
    }