if (ConfigObj) {
    ConfigObj.local = false;

    ConfigObj.appName = 'kedoushipin';
    ConfigObj.version = '1.0.1';	//内核版本(HTML、JS)
    ConfigObj.umengChannel = '';		//从app获取
	ConfigObj.stationId='';			//从app获取
    ConfigObj.tel = "400 855 0921";
    ConfigObj.wx = "";
    ConfigObj.qq = "";
    ConfigObj.pot = "";
	ConfigObj.a1 = "";
	ConfigObj.a2 = "";
	ConfigObj.display = true;

    ConfigObj.power = '' // 是否是無限觀影
    ConfigObj.pNum = ''  //一看次數
    ConfigObj.pwat = ''  //總觀看次數
    ConfigObj.Avip = ''  // 是否是vip

    ConfigObj.yshare_url = '' //分享地址 
    ConfigObj.yshare = '' //分享文字 
    ConfigObj.dowand = '' //保存二維碼地址
    ConfigObj.be_invited = '' //綁定邀請碼 
    ConfigObj.auth_mobile = ''
    ConfigObj.bdType = '1' // 2 是記住密碼 1 是為記住密碼

    // ConfigObj.uesId = 1;  //
    ConfigObj.meId = 9534;  
    // ConfigObj.meId = 3829;  7904  9534
    // ConfigObj.meId = 1401;   1401 1430  1431  3829  8529
    ConfigObj.iVpn = true;
    ConfigObj.iphon = '';
    ConfigObj.share = '';
    ConfigObj.usName = '';
    ConfigObj.pic = ''
    ConfigObj.expiry = '' // 会员到期
    ConfigObj.userNum = '' // 邀请人数
    ConfigObj.zdid = 'JNOGEM6LWQB1RC2A'; //正式
    ConfigObj.appkey = 'XW2JSB-D6U4-5FP2-OF18-43GL21'; // 正式 
    // ConfigObj.appkey = '0911CXH1-YD42-JYWX-RYOD-GCEKB6T0X8XN7'; // 正式 
    // ConfigObj.localSite = 'https://jk.appjkou.xyz/v2';  //ip地址   安卓用戶版本視頻的 
    ConfigObj.localSite = 'https://api.dianying3.xyz/v2';  //ip地址   安卓用戶版本視頻的 
    // ConfigObj.localSite = 'https://api.rc8000.org:443/v2';  //ip地址   安卓用戶版本視頻的 
    // ConfigObj.localSite = 'http://38.27.103.12/v2';  //ip地址   安卓用戶版本視頻的 
    // ConfigObj.localuser = 'http://120.27.68.38:9001/v2';  //ip地址  安卓的聽書直播的  後面添加的

    /*ConfigObj.zdid = 'JIXDDBIN238QFMNU'; //正式
    ConfigObj.appkey = 'ODSF6YTW-FCJQ-PQMUJOGHG507Z'; // 正式
    ConfigObj.localSite = 'http://120.27.68.38:9001/v2';  //ip地址 */
    // ConfigObj.localuser = 'http://120.27.68.38:9001';  //ip地址  ios視頻聽書的  
    ConfigObj.Iemid = '86339079994'
    ConfigObj.appDLUrl = ""; // 下载页
    if (ConfigObj.local) ConfigObj.localSite = 'p.js';
    if (ConfigObj.platForm === 'android' && typeof android_obj !== 'undefined') {
        ConfigObj.umengChannel = android_obj.getUmengChannel();	//友盟ID
        ConfigObj.version = android_obj.getAppVersionName(); // 安卓应用管理上显示的版本
        ConfigObj.stationId = android_obj.getStationId();
        ConfigObj.zdid = android_obj.getStationId();
        ConfigObj.Iemid = android_obj.getIMEI();
        ConfigObj.bdType = android_obj.getPwd()
        ConfigObj.iphon = android_obj.getMobile()
            if (android_obj.isVPN() == true) {
                $.alertMsg('當前訪問人數過多，請稍後訪問')
                ConfigObj.localSite = ''
            }else{
                ConfigObj.localSite = android_obj.getDoName();
            }
        ConfigObj.meId = android_obj.getUserID();
        ConfigObj.appkey = android_obj.getChannelKey();
        // ConfigObj.hrefSite = android_obj.getVideoName();//域名
    } else if (ConfigObj.platForm === 'ios' && typeof ios_obj !== 'undefined') {
        ConfigObj.umengChannel = ios_obj.getUmengChannel(); //友盟ID
        ConfigObj.version = ios_obj.getAppVersionName(); // 安卓应用管理上显示的版本
        ConfigObj.localSite = ios_obj.getVideoName();//域名
        ConfigObj.zdid = ios_obj.getStationId(); //1
        ConfigObj.bdType = ios_obj.getPwd() // 是否记住密码 2 是记住 1 是为记住
        ConfigObj.iphon = ios_obj.getMobile() //  手机号码
        ConfigObj.Iemid = ios_obj.Iemid();
        ConfigObj.meId = ios_obj.getUserID(); //1
        ConfigObj.appkey = ios_obj.getChannelKey();//1 
    }
}
