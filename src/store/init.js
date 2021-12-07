import { mapGetters } from "vuex";

// 参考https://cn.vuejs.org/v2/guide/plugins.html
export default{
	install(Vue){
		// 1. 添加全局方法或属性
		Vue.myGlobalMethod = function () {
		    // 逻辑...
		}

		// 2. 添加全局资源
		Vue.directive('my-directive', {
		    bind (el, binding, vnode, oldVnode) {
		    	// 逻辑...
			}
		    // ...
		})

		// 3. 注入组件选项
		Vue.mixin({
		    created: function () {
				// 更新浏览器title
				document.title = this.$config.title;
		    },
		    computed:{
	            ...mapGetters([])
	      	},
		    methods: {
                // 初始化自适应屏幕
		    	initResponsive(){
					var ua = navigator.userAgent,
			        isWindowsPhone = /(?:Windows Phone)/.test(ua),
			        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
			        isAndroid = /(?:Android)/.test(ua),
					isFireFox = /(?:Firefox)/.test(ua),
					isIPad = (ua.indexOf("iPad") > 0),  
					isChrome = /(?:Chrome|CriOS)/.test(ua), 
					// isSmallScreen = (windows.screen.width <= 1336 && windows.screen.width > 736),  
					isSmallScreen = (document.body.clientWidth <= 1440),  
					isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
					isPhone = /(?:iPhone)/.test(ua) && !isTablet,
					isPC = !isPhone && !isAndroid && !isSymbian && !isSmallScreen;
			        if ((isAndroid || isPhone) && document.body.clientWidth < 960 ) {
				    	this.$store.dispatch('responsiveHandler', 'mobile');
				    } else if ((isTablet || isIPad || isSmallScreen)) {
				    	this.$store.dispatch('responsiveHandler', 'pad');
				    } else if(isPC) {
				    	this.$store.dispatch('responsiveHandler', 'PC');
				    } else {
				    	this.$store.dispatch('responsiveHandler', 'mobile');
					}
			    },
		  	}
		})
		// 4. 添加实例方法
		Vue.prototype.init = function () {
		    // 初始化自适应屏幕
		    this.initResponsive();
		}
	}
}
