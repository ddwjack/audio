    var mypromotionObj = new PageController({
	   'name': 'mypromotion',
	   'tpl' : 'template/user/mypromotion.html'
    });
    mypromotionObj.createDomObj = function(){
    	this.ClickObj = $(".motio_fan");
        this.hedsetObj = $("#feedback")
        this.butontgObj = $(".but_tg") //立即推广 

        this.ClickObj.tap(function(e){ //返回
            mypromotionObj.goBack()
        })
        this.butontgObj.tap(function(){
            mycodeObj.goBack = function(){
                mycodeObj.destroy();
                mypromotionObj.show();
                // Global.fixd()
            }
            // setupeeObj.show();
            mycodeObj.show();
        })
    }

    mypromotionObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            mypromotionObj.sectionEvent(e);
        });
    }
    mypromotionObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            // console.log(thisT)//account caching current protocol
            switch (thisT){
                // case "backbtn" : userCenterObj.goBack();return true;
                case "account" : mypromotionObj.accountRecord();return true; //账户管理
            }
        }
    }
   

    mypromotionObj.onloadExecution = function(){
    	mypromotionObj.createDomObj()
        mypromotionObj.createEvent()
    }
    mypromotionObj.init = function(){
	 	mypromotionObj.onloadExecution()
    }