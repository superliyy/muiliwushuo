


mui.init();

mui.plusReady(function(){
	
	var titleArr = ['攻略','单品'];
	var isFirst = true;
	window.addEventListener('sendToCategory',function(){
		
		//打开categoryMain.html页面
		if(isFirst){
		mui.openWindow({
		    url:'categoryMain.html',
		    id:'categoryMain',
		    styles:{
		       	top:'84px',//mui标题栏默认高度为45px；
		    	bottom:'50px'//默认为0px，可不定义；
		    },
		    extras:{
		      titleArr:titleArr
		    },
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:'none',//页面显示动画，默认为”slide-in-right“；
		      duration:0,//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    },
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		    }
		})
		isFirst = false;
		}else{
			plus.webview.getWebviewById('topMain').hide();
			plus.webview.getWebviewById('categoryMain').show();

			
		}
	})
	
	
	//点击对应title，
	mui('.mui-title').on('tap','span',function(){
		mui.fire(plus.webview.getWebviewById('categoryMain'),'changePage',{
			title:this.innerText	
		});
		//改变点击的对应title的样式
		var domsTitles = mui('.mui-title span');
		for(var i = 0;i<domsTitles.length;i++){
			if(this.innerText == domsTitles[i].innerText){
				domsTitles[i].className = 'active-title';
			}else{
				domsTitles[i].className = '';
				
			}
		}	
	});
	
	//监听changeTitle事件
	window.addEventListener('changeTitle',function(evt){
		//改变点击的对应title的样式
		var domsTitles = mui('.mui-title span');
		for(var i = 0;i<domsTitles.length;i++){
			if(i == evt.detail.index){
				domsTitles[i].className = 'active-title';
			}else{
				domsTitles[i].className = '';
				
			}
		}
	})
	
	
	
	
})







