mui.init({
	subpages: [
		
	]
});

mui.plusReady(function(){
	
	//实现二维码功能进入新的页面
	document.querySelector('.icon-erweimasaomiaohei').addEventListener('tap',function(){
		
		mui.openWindow({
		    url:'erweima.html',
		    id:'erweima',
		    styles:{
		      top:0,//新页面顶部位置
		      bottom:0,//新页面底部位置
		      width:'100%',//新页面宽度，默认为100%
		      height:'100%',//新页面高度，默认为100%
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
		
		
	})
	
	
	//动态获取网络数据home的title
	mui.ajax('../json/homeTitle.json',{   
		success:function(data){
			//服务器返回响应，根据响应结果，分析是否登录成功；
//			console.log(JSON.parse(data).data.channels);
			
			var titleArr = JSON.parse(data).data.channels;
			var titleHtml = '';
			titleArr.map(function(item,index){
				if(index == 0){
					titleHtml += '<span class="item item-active">'+item.name+'</span>';	
				}else{
					titleHtml += '<span class="item">'+item.name+'</span>';
				}

			})
			document.querySelector('.liwu-sub-header').innerHTML = titleHtml;
			
			//自定义事件传值
			mui('.liwu-sub-header').on('tap','.item',function(){
				mui.fire(plus.webview.getWebviewById('homeMain'),'changePage',{
					title:this.innerText
				})
				
				var domsTitle = mui('.item');
				for(var i = 0;i<domsTitle.length;i++){
					if(this.innerText == domsTitle[i].innerText){
						domsTitle[i].className = 'item item-active';
					}else{
						domsTitle[i].className = 'item';
					}
				}
				
			});
			
			//监听事件,响应页面滑动，title相对应变化
			window.addEventListener('changeTitle',function(evt){
//				console.log(evt.detail.index);
				
				var domsTitle = mui('.item');
				for(var i = 0;i<domsTitle.length;i++){
					if(evt.detail.index == i){
						domsTitle[i].className = 'item item-active';
					}else{
						domsTitle[i].className = 'item';
					}
				}
			});
			
			//打开home-main页面
			mui.openWindow({
			    url:'home-main.html',
			    id:'homeMain',
			    styles:{	
			      top:'84px',
			      bottom:'50px'
			    },
			    extras:{
			       channelArr:titleArr//自定义扩展参数，可以用来处理页面间传值
			    },
			    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
			    show:{
			      autoShow:true,//页面loaded事件发生后自动显示，默认为true
			      aniShow:'none',//页面显示动画，默认为”slide-in-right“；
			      duration:0//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
			    },
			    waiting:{
			      autoShow:true//自动显示等待框，默认为true
				}		
			})
		},
		error:function(xhr,type,errorThrown){
			//异常处理；
			console.log('homeTitle获取数据失败');
		}
	});
	
	
})


