    var nextportraitObj = new PageController({
     'name': 'nextportrait',
     'tpl' : 'template/register/nextportrait.html'
    });
    nextportraitObj.createDomObj = function(){
      this.ClickObj = $(".portraitFan");
        this.hedsetObj = $("#nextportrait") 
        this.butOkObj = $(".but_ok")// 
        window.scrollTo(0,0)
    }
    nextportraitObj.createEvent = function(){
            // nextportraitObj.photoObj()
        this.ClickObj.unbind('tap').tap(function(){
            // localStorage.setItem("yhtxId", $('#show').attr('src'));
            nextportraitObj.goBack()
        })
        this.butOkObj.unbind('tap').tap(function(){
            $('.div_tk').hide()
        })
        this.hedsetObj.unbind('tap').tap(function(e){
            nextportraitObj.sectionEvent(e);
        });
        $(".zc_center").bind('input propertychange',function (e) {
            var col = e.target
            $(col).css('color','#C86DD7').parent('li').css('color','#C86DD7').siblings('li').css('color','#4A4A4A').find('input').css('color','#4A4A4A')
        })
        $(".in_colo").blur(function(){
            $('.li_inp').css("color","#4A4A4A").find('.in_colo').css("color","#4A4A4A")
        });
        var imag = Math.floor((document.documentElement.clientWidth - 20) * 0.23)
        console.log(imag)
        $('.porti_li').css({"height":imag,"line-height":imag+'px'})
        $('#show').attr('src',ConfigObj.pic)
    }
    nextportraitObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol but_sign  正在登录中 user_info_no
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true; 
                case "Asub" : nextportraitObj.goAsub();return true; //密码显示*
            }
        }
    }
    nextportraitObj.goAsub = function(){
        var urlus = localStorage.getItem("useurl");
        if (urlus == '') {
            $.alertMsg('請先上傳頭像');
            return false;
        }
        var arrNm = {'avatar_url':urlus}
            Global.usNoetu(arrNm)
        // localStorage.setItem("xqahId", arrObj);
        nextportraitObj.goBack()
    }
    nextportraitObj.submitlogin = function(url){ 
        gifJson()
        var postData = {
            channel:ConfigObj.zdid,
            app_key:ConfigObj.appkey,
            user_id:ConfigObj.meId,
            version:ConfigObj.version,
            token:ConfigObj.token,
            client:client,
            type:'anchor',
        }
        // console.log(postData)
        var secretData = {
          'info' : Global.encrypt(postData),
          'img' : url
        };
        $.ajax({
            url : ConfigObj.localSite+'/common/imageUpload',
            data : secretData,
            type : "post",
            dataType : "json",
            success : function(obj){
              if(obj.ok == true){
                obj.info = $.parseJSON(Global.crypt(obj.result));
                console.log(obj.info.url)
                gifNone()
                // urlourl = ConfigObj.localSite.replace(/\/v2/, "")
                // localStorage.setItem("userImgUrl", urlourl + obj.info.url);
                localStorage.setItem("useurl",obj.info.url);
              }else{
                $.alertMsg(obj.err)
                if (obj.code == '1000') {
                    tekenLOgin()
                }
              }
              }
        });
    }
    nextportraitObj.onloadExecution = function(){
      nextportraitObj.createDomObj()
        nextportraitObj.createEvent()
        // nextportraitObj.imgjiet()
        nextportraitObj.photoObj()
        // nextportraitObj.submitlogin()
    }
    nextportraitObj.init = function(){
    nextportraitObj.onloadExecution()
    }

    nextportraitObj.photoObj = function(){
        var relativeUrl= "common/ShearPhoto"; //你不要在后面加斜杠，系统会自动给你加上斜杠，不信看下面！   
        relativeUrl = relativeUrl.replace(/(^\s*)|(\s*$)/g, "");//去掉相对路径的所有空格
        relativeUrl === "" || (relativeUrl += "/");//在相对地址后面加斜框，不需要用户自己加
        var publicRelat= document.getElementById("relat");     //"relat"对像     
        var publicRelatImg=publicRelat.getElementsByTagName("img");  //"relat"下的两张图片对像   
        var Shear = new ShearPhoto;
        console.log(document.body.clientWidth)
        var clientWidthObj = document.body.clientWidth - 32
        Shear.configs({
            relativeUrl:relativeUrl,  
            traverse:true,
            translate3d:false,  
            HTML5:true,
            HTML5MAX:clientWidthObj, 
            HTML5Quality:0.9, 
            HTML5FilesSize:50,     
            HTML5Effects:false,
            HTML5ZIP:[900,0.9],
            preview:false,
            url:'http://38.27.103.12/common/ShearPhoto',  
            scopeWidth:clientWidthObj,                 //可拖动范围宽  也就是"main"对象的初始大小(整数型，禁止含小数点) 宽和高的值最好能一致  
            scopeHeight:clientWidthObj,                //可拖动范围高  也就是"main"对象的初始大小(整数型，禁止含小数点) 宽和高的值最好能一致      
            proportional:[1,100,133],   
            Min:50,                 
            Max:clientWidthObj,                
            backgroundColor:"#000",   //遮层色
            backgroundOpacity:0.6, //遮层透明度-数字0-1 可选
            Border:0,               //截框的边框大小 0代表动态边框。大于0表示静态边框，大于0时也代表静态边框的粗细值
            BorderStyle:"solid",    //只作用于静态边框，截框的边框类型，其实是引入CSS的border属性，和CSS2的border属性是一样的
            BorderColor:"#09F",  //只作用于静态边框，截框的边框色彩
            relat:publicRelat,              //请查看 id:"relat"对象 
            scope:document.getElementById("main"),//main范围对象 
            ImgDom:publicRelatImg[0],         //截图图片对象（小）  
            ImgMain:publicRelatImg[1],         //截图图片对象（大）
            black:document.getElementById("black"),//黑色遮层对象
            form:document.getElementById("smallbox"),//截框对象
            ZoomDist:document.getElementById("ZoomDist"),//放大工具条,可从HTML查看此对象，不作详细解释了
            ZoomBar:document.getElementById("ZoomBar"), //放大工具条，可从HTML查看此对象
            to:{
                BottomRight:document.getElementById("BottomRight"),//拉伸点中右
                TopRight:document.getElementById("TopRight"),//拉伸点上右，下面如此类推，一共8点进行拉伸,下面不再作解释
                Bottomleft:document.getElementById("Bottomleft"),
                Topleft:document.getElementById("Topleft"),
                Topmiddle:document.getElementById("Topmiddle"),
                leftmiddle:document.getElementById("leftmiddle"),
                Rightmiddle:document.getElementById("Rightmiddle"),
                Bottommiddle:document.getElementById("Bottommiddle")
            },
            Effects:document.getElementById("shearphoto_Effects") || false,
            DynamicBorder:[document.getElementById("borderTop"),document.getElementById("borderLeft"),document.getElementById("borderRight"),document.getElementById("borderBottom")],
            SelectBox:document.getElementById("SelectBox"),         //选择图片方式的对象
            Shearbar:document.getElementById("Shearbar"),          //截图工具条对象
            UpFun:function() {                   //鼠标健松开时执行函数
                Shear.MoveDiv.DivWHFun();   //把截框现时的宽高告诉JS    
            }
        });
        Shear.complete=function(serverdata) {//截图成功完成时，由shearphoto.php返回数据过来的成功包
            var sinfo = $.parseJSON(Global.crypt(serverdata.result));
            var point = this.arg.scope.childNodes[0];
            point.className === "point" && this.arg.scope.removeChild(point);
            var complete = document.createElement("div");
            complete.className = "complete";
            complete.style.height = this.arg.scopeHeight + "px";
            this.arg.scope.insertBefore(complete, this.arg.scope.childNodes[0]);
            console.log(sinfo.domain + sinfo.url)
                $('#show').attr('src',sinfo.domain + sinfo.url)
                var urlus = localStorage.setItem("useurl",sinfo.url);
                gifNone()
                $('#LiCrop,#shearphoto_main').hide()
                // localStorage.setItem("yhtxId",sinfo.url);
                // localStorage.setItem("userImgUrl", sinfo.domain + sinfo.url);
            this.HTML5.EffectsReturn();
            this.HTML5.BOLBID   &&   this.HTML5.URL.revokeObjectURL(this.HTML5.BOLBID);
            var this_ = this;
            this_.preview.close_();
        }  
        // var photoalbum = document.getElementById("photoalbum");//相册对象
        var ShearPhotoForm = document.getElementById("ShearPhotoForm");//FORM对象
        ShearPhotoForm.UpFile.onclick=function(){return false}//一开始时先不让用户点免得事件阻塞
        var up = new ShearPhoto.frameUpImg({
            FORM:ShearPhotoForm,                         //FORM对象传到设置
           
            UpType:new Array("jpg", "jpeg", "png", "gif"),//图片类限制，上传的一定是图片，你就不要更改了
           HTML5:Shear.HTML5,                       //切匆改动这句，不然你他妈又问为什么出错
            HTML5FilesSize:Shear.arg.HTML5FilesSize,//切勿改动这句 如果是HTML5切图时，选择的图片不能超过 单位M，设太大话，如果客户端HTML5加截超大图片时，会卡爆的
            HTML5ZIP:Shear.arg.HTML5ZIP,      //切勿改动这句, 把压缩设置转移到这里
            erro:function(msg) {
                Shear.pointhandle(3e3, 10, msg, 0, "#f82373", "#fff");
            },
            fileClick:function(){//先择图片被点击时，触发的事件
                Shear.pointhandle(-1);//关闭提示，防止线程阻塞事件冒泡 againIMG
            },
            preced:function(fun) { //点击选择图，载入图片时的事件
                try{
                    photoalbum.style.display = "none"; //什么情况下都关了相册
                    camClose.onclick(); //什么情况下都关了视频
                }catch (e){console.log("在加载图片时，发现相册或拍照的对象检测不到，错误代码："+e);}
                Shear.pointhandle(0, 10, "正在为你加载图片，请你稍等哦......", 2, "#307ff6", "#fff",fun);
            }
        });
        up.run(function(data,True) {//upload.php成功返回数据后
            //alert(data);你可以调试一下这个返回包
            True ||  (data = ShearPhoto.JsonString.StringToJson(data));
            if (data === false) {
                Shear.SendUserMsg("错误：请保证后端环境运行正常", 5e3, 0, "#f4102b", "#fff",  true,true);
                return;
            }
            if (data["erro"]) {
                Shear.SendUserMsg("错误：" + data["erro"], 5e3, 0, "#f4102b", "#fff",  true,true);
                return;
            }
            Shear.run(data["success"],true);
        });
        Shear.addEvent(document.getElementById("saveShear"), "click", function() { //按下截图事件，提交到后端的shearphoto.php接收
            gifJson()
            Shear.SendPHP({shearphoto:"我要传参数到服端",mingge:"我要传第二个参数到服务器"});
        });
        /*Shear.addEvent(document.getElementById("againIMG"), "click", function() {     //重新选择事件
           Shear.preview.close_();
           Shear.again();
           Shear.HTML5.EffectsReturn();
           Shear.HTML5.BOLBID   &&   Shear.HTML5.URL.revokeObjectURL(Shear.HTML5.BOLBID);
           Shear.pointhandle(3e3, 10, "已取消！重新选择", 2, "#fbeb61", "#3a414c");
        });*/
        var shearphoto_loading=document.getElementById("shearphoto_loading");
        var shearphoto_main=document.getElementById("shearphoto_main");
        shearphoto_loading && shearphoto_loading.parentNode.removeChild(shearphoto_loading);
        shearphoto_main.style.visibility="visible";
    }

   