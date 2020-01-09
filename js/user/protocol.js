    var protocolObj = new PageController({
	   'name': 'protocol',
	   'tpl' : 'template/user/protocol.html'
    });
    protocolObj.createDomObj = function(){
    	this.ClickObj = $(".pro_fan");
        this.hedsetObj = $("#protoco")

        this.ClickObj.tap(function(e){ //返回
            protocolObj.goBack()
        })
    }

    protocolObj.createEvent = function(){
        this.hedsetObj.unbind('tap').tap(function(e){
            protocolObj.sectionEvent(e);
        });
        // var url = 'http://www.0-php.com/cat_2.html';
        var domain = ConfigObj.localSite.split('/'); //以“/”进行分割
        var domurl = domain[2].split('.')
        if( domurl[1] ) {
            domurl = domurl[1];
        } 
        $('#span_url_typ').html(domurl.substring('0','3'))
    }
    protocolObj.sectionEvent = function(e){
        /*var pObj = $.oto_checkEvent(e,"LI");
        if(pObj){
            var thisObj = $(pObj);
            var thisT = thisObj.attr("data-t");
            switch (thisT){
                // case "account" : protocolObj.accountRecord();return true; //账户管理
            }
        }*/
    }

    protocolObj.onloadExecution = function(){
    	protocolObj.createDomObj()
        protocolObj.createEvent()
    }
    protocolObj.init = function(){
	 	protocolObj.onloadExecution()
    }