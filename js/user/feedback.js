    var feedbackObj = new PageController({
	   'name': 'feedback',
	   'tpl' : 'template/user/feedback.html'
    });
    feedbackObj.createDomObj = function(){
    	this.ClickObj = $(".feedba_fan");
        this.hedsetObj = $("#feedback") 
        this.butUpObj = $("#butt_up")  //提交 Liwdfk
        this.uploaImg = $('#upImgBtn') 
        this.goPotato = $('#btn_pot') // 加群 
        this.gokf = $('#goAKF') // 客服 
        $('.feed_ul li').tap(function(){
            $(this).addClass('active').siblings().removeClass('active') 
        })
    }
    feedbackObj.readObj = function(obj){
        if (obj == 1) {
            $('#I_yjfk').show()
        }else{
            $('#I_yjfk').hide()
        }
    }
    feedbackObj.gohreftel = function(){
        if (ConfigObj.qq == '' || ConfigObj.qq == undefined) {
            $('#li_qq').hide()
        }
        if (ConfigObj.wx == '' || ConfigObj.wx == undefined) {
            $('#li_wx').hide()
        }
        // console.log(ConfigObj.qq)
        /*4008550921,tt_kefu0001*/
        if (ConfigObj.tel == '') {
            $('#li_tel').hide()
        }
        if (ConfigObj.pot == undefined || ConfigObj.pot == '') {
            $('#li_potato').hide()
        }
        $('#fo').val(ConfigObj.qq)
        $('#btn_foo').attr('data-clipboard-text',ConfigObj.qq)
        $('#fo2').val(ConfigObj.wx)
        $('#btn_iph').attr('data-clipboard-text',ConfigObj.wx)
        $('#in_tel').val(ConfigObj.tel)
        $('#a_tel').attr("href","tel:"+ConfigObj.tel);
        $('#pot').val(ConfigObj.pot)
        // $('#pot_fz').val(ConfigObj.pot)
        // $
        var clipboard = new ClipboardJS(document.getElementById('btn_foo'));
        clipboard.on('success', function(e) {
            var ms = e.trigger.getAttribute('aria-label');
            $.alertMsg(ms,true)
            e.clearSelection();
        });

        var clipboards = new ClipboardJS(document.getElementById('btn_iph'));
        clipboards.on('success', function(e) {
            var ms = e.trigger.getAttribute('aria-label');
            $.alertMsg(ms,true)
            e.clearSelection();
        });
        /*var clipboards = new ClipboardJS(document.getElementById('btn_iph'));
        clipboards.on('success', function(e) {
            var ms = e.trigger.getAttribute('aria-label');
            $.alertMsg(ms,true)
            e.clearSelection();
        });*/
    }
    feedbackObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            feedbackObj.sectionEvent(e);
        });
        this.ClickObj.tap(function(e){ //返回  
            feedbackObj.goBack()
        })
        this.gokf.unbind('tap').tap(function(e) {
            goToKf()
        })
        this.goPotato.unbind('tap').tap(function(e){
            gifJson()
            if (ConfigObj.platForm === 'android') {
                android_obj.intoPatato(ConfigObj.pot)
            }else{
                ios_obj.intoPatato(ConfigObj.pot)
            }
            gifNone()
        });
        this.uploaImg.unbind('tap').tap(function(){
            var $input = $("#file");
            $input.on("change" , function(){
                gifJson()
                // console.log(this)
                var files = this.files;
                chabils(files)
                var length = files.length;
                $.each(files,function(key,value){
                    var div = document.createElement("li"),
                        img = document.createElement("img");
                    div.className = "liColo";
                    var fr = new FileReader();
                    fr.onload = function(){
                        img.src=this.result;
                        div.appendChild(img);
                        $('#ul_Img_fk').append(div);
                    }
                    fr.readAsDataURL(value);
                })

            })

            $input.removeAttr("id");
            var newInput = '<input class="uploadImg test" type="file" name="file" multiple id="file">';
        })
        this.butUpObj.unbind('tap').tap(function(){
            if (ConfigObj.platForm === 'android') {
                if (android_obj.isVPN() == true) {
                    $.alertMsg('當前訪問人數過多，請稍後訪問')
                    return false;
                }
            }
            feedbackObj.butttext()
        })
    }
    function chabils(fileObj) {
        if ($('#ul_Img_fk').find('li').length >= 2) {
            $('#upImgBtn').find('input.uploadImg').attr('type','')
            $.alertMsg('最多可傳3張圖片')
            // return false;
        }
        var FileController = ConfigObj.localSite+"/common/upload";                    // 接收上传文件的后台地址
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            anchor_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            type:'user',
        }
        var form = new FormData();
        form.append("type", "video");                        // 可以增加表单数据
        form.append("file", fileObj[0]);                           // 文件对象
        form.append("info", Global.encrypt(postData));                           // 文件对象
        var xhr = new XMLHttpRequest();
        xhr.open("post", FileController, true);
        xhr.onload = function (obj) {
            var info = JSON.parse(obj.currentTarget.response)
            var obj = $.parseJSON(Global.crypt(info.result))
            gifNone()
            // console.log(obj.url)
            $('#p_Img_fk').append('<span style="display:none;">'+ obj.url +'</span>')
        }
        xhr.send(form);
    }
    feedbackObj.AsubfsObj = function(teval,imgAr){
        // console.log($('#textar').val())
        var postData ={
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            client:client,
            message:teval,
            images:imgAr,
            role:'user'
        }
        var secretData = {
          'info' : Global.encrypt(postData)
        };
        $.ajax({
                url: ConfigObj.localSite+'/User/notice_add',
                // url: ConfigObj.localSite+'/api/notice_list', 
                data: secretData,
                type: "post",
                dataType: "json",
                success:function(res){
                    if (!res.err) {
                        // res.info = $.parseJSON(Global.crypt(res.result));
                        // console.log(res.info)
                        // ConfigObj.after = '2'
                        $.alertMsg(res.suc) 
                        $('#textar').val('')
                        $('#ul_Img_fk').html('')
                    }else{
                       $.alertMsg(res.err) 
                    }
                    // localStorage.setItem("channel", res.info.channel_id);  fixed

                }
            }) 
    }
    feedbackObj.butttext = function(){
        var spappen =  $('#p_Img_fk').find('span')
        var teval = $('#textar').val()
        if (teval == '') {
            $.alertMsg('請輸入內容');
            return false;
        }
        var arrImg = []
        for (var i = 0; i < spappen.length; i++) {
            var title = $(spappen[i]).html()
            arrImg[i] = title
        }
        // console.log(arrImg)
        var arrImg = arrImg.join(',')
        feedbackObj.AsubfsObj(teval,arrImg)
    }
    feedbackObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)
            switch (thisT){
                // case "Liyjfk" : feedbackObj.goLiyjfk();return true; //意見反饋
                case "Liwdfk" : feedbackObj.goLiwdfk();return true; //我的反饋 
            }
        }
    }
    
    feedbackObj.goLiwdfk = function(ted){
        myfkjlObj.goBack = function(){
            myfkjlObj.destroy();
            feedbackObj.show();
        }
        myfkjlObj.show(true,function(){
        });
    }

    feedbackObj.onloadExecution = function(){
    	feedbackObj.createDomObj()
        feedbackObj.createEvent()
        feedbackObj.gohreftel()
    }
    feedbackObj.init = function(){
	 	feedbackObj.onloadExecution()
    }