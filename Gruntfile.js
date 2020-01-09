// 包装函数
module.exports = function(grunt) {
 
  // 任务配置,所有插件的配置信息
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
	concat : {  
             bar : {  
                src : ['lib/tool/base64.js','lib/tool/md5.js','lib/zepto/zepto.js','lib/zepto/touch.js','lib/zepto/fx.js','lib/zepto/fx_methods.js','lib/zepto/alertmsg.js','lib/zepto/deferred.js','lib/zepto/callbacks.js','lib/plugin/swipeslide.js','lib/plugin/circular-progress.js','lib/plugin/cityPicker.js','lib/plugin/iscroll.js','lib/plugin/dropload.js','lib/plugin/layer.m.js','lib/plugin/mobiscroll.js','lib/plugin/dialog.js','lib/plugin/aes.js','lib/plugin/aes_1.js','lib/plugin/mobile-select-area.js',/*'lib/cordova/cordova.js',*/'lib/controller/global.js','lib/controller/pageController.js','lib/polyfill/*.js','lib/swiper3.06.jquery.min.js','lib/mobiscroll_date.js','lib/mobiscroll.js','lib/LAreaData1.js','lib/LAreaData2.js','lib/LArea.js','lib/lCalendar.js','lib/TouchSlide.1.1.js','lib/lottie.min.js','lib/ShearPhoto.js'],  
                dest : 'package/lib-source.js'  
            } ,
			
			foo :  {  
				src : ['js/*.js','js/**/*.js'],  
				dest : 'package/big-source.js'  
		}  
    },  
    
    // uglify插件的配置信息
    uglify: {
	  options: {
			// 此处定义的banner注释将插入到输出文件的顶部
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm") %> */\n'
	  },
	  bar : {
			src: ['package/lib-source.js'],
			dest: 'package/lib.js'
	  },
	  
	  foo : {
			src: ['package/big-source.js'],
			dest: 'package/big.js' 
	  }
    },
	
	
	 //压缩css
	 cssmin: {
		 //文件头部输出信息
		cssbuild:{
		  src: ['css/global.css','css/index.css','css/login.css','css/activity.css','css/dropload.min.css','css/layer.css','css/dialog.css','css/mobile-select-area.css','css/mobiscroll.select.min.css','css/my.css','css/find.css','css/channel.css','css/home.css','css/swiper3.06.min.css','css/mainStyle.css','css/register.css','css/mobiscroll_date.css','css/LArea.css','css/ShearPhoto.css'],
		  dest: 'package/big.css'
	 	},
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd hh:mm") %> */\n',
			 //美化代码
			beautify: {
				 //中文ascii化，非常有用！防止中文乱码的神配置
				 ascii_only: true
			 }
		 },
	 },
	 
	 clean :['package/lib-source.js','package/big-source.js']
  });
 
  // 告诉grunt我们将使用插件
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
 
  // 告诉grunt当我们在终端中输入grunt时需要做些什么
  grunt.registerTask('default', ['concat', 'uglify', 'cssmin','clean']);
 
};