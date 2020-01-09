    var AliveObj = new PageController({
	   'name': 'Alive',
	   'tpl' : 'template/football/Alive.html',
       'pullDistance': 220
    });

    AliveObj.createDomObj = function(){
        this.hedsetObj = $("#Alive");
        this.imgyqhyObj = $("#img_yqhy"); // 邀请好友
    }
    
    AliveObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            AliveObj.sectionEvent(e);
        });
       this.imgyqhyObj.unbind('tap').tap(function(e){
            dyShareObj.goBack = function(){
                dyShareObj.destroy();
                AliveObj.show();
                Global.fixd()
            }
            dyShareObj.show();
            Global.fixd()
        });
    }
    AliveObj.sectionEvent = function(e){
        var pObj = $.oto_checkEvent(e,"A");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            console.log(thisT)//account caching current protocol
            switch (thisT){
                case "Ayhyx" : AliveObj.goyhyx(thisObj);return true; //用户印象 
            }
        }
    }
    
    AliveObj.onloadExecution = function(){
    	AliveObj.createDomObj()
        AliveObj.createEvent()
    }
    AliveObj.init = function(){
	 	AliveObj.onloadExecution()
    }    