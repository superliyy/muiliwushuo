


mui.init({
	subpages:
	[
	{
		url:'views/top.html',
		id:'top',
		styles:{
			top:'0',
			bottom:'50px'
		}
	},
	{
		url:'views/category.html',
		id:'category',
		styles:{
			top:'0',
			bottom:'50px'
		}
	},
	{
		url:'views/me.html',
		id:'me',
		styles:{
			top:'0',
			bottom:'50px'
		}
		
	},
	{
		url:'views/home.html',
		id:'home',
		styles:{
			top:'0',
			bottom:'50px'
		}
		
	}]
})

//tab页面切换
mui.ready(function(){

	mui('.mui-bar-tab').on('tap','.mui-tab-item',function(){
		var vw = plus.webview.getWebviewById(this.id);
		vw.show();
		var homeMainvw = plus.webview.getWebviewById('homeMain');
		var topMainvw = plus.webview.getWebviewById('topMain');
		var categoryMainvw = plus.webview.getWebviewById('categoryMain');
		if(this.id == 'home'){
			homeMainvw.show();
			topMainvw.hide();
			categoryMainvw.hide();
		}
		else if(this.id == 'top'){
			homeMainvw.hide();
			mui.fire(plus.webview.getWebviewById('top'),'sendToTop',null);
		}
		else if(this.id == 'category'){
			homeMainvw.hide();
			mui.fire(plus.webview.getWebviewById('category'),'sendToCategory',null);
		}
		else{
			homeMainvw.hide();
			topMainvw.hide();
			categoryMainvw.hide();
		}
	})
})














