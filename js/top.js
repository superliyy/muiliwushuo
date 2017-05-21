
mui.init();

mui.plusReady(function(){
	
	var titleArr = [];
	var isFirst = true;
	mui.ajax('../json/toptitle.json',{
		success:function(data){
			titleArr = JSON.parse(data);
			var titleHtml = '';
			titleArr.map(function(item,index){
				if(index == 0){
					titleHtml += '<span class="active">'+item.title+'</span>';
				}else{
					titleHtml += '<span>'+item.title+'</span>';
				}
			})
			document.querySelector('.title').innerHTML = titleHtml;
			if(isFirst){
			window.addEventListener('sendToTop',function(){
				//打开topMain页面
				mui.openWindow({
				    url:'topMain.html',
				    id:'topMain',
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
			})
			isFirst = false;
			}else{
				plus.webview.getWebviewById('categoryMain').hide();
				plus.webview.getWebviewById('topMain').show();

				
			}
			
			
			//自定义事件传值
			mui('.title').on('tap','span',function(){
				mui.fire(plus.webview.getWebviewById('topMain'),'changePage',{
					title:this.innerText
				})
				
				var domsTitle = mui('.title span');
				for(var i = 0;i<domsTitle.length;i++){
					if(this.innerText == domsTitle[i].innerText){
						domsTitle[i].className = 'active';
					}else{
						domsTitle[i].className = '';
					}
				}
				
			});
			
			//监听事件,响应页面滑动，title相对应变化
			window.addEventListener('changeTitle',function(evt){		
				var domsTitle = mui('.title span');
				for(var i = 0;i<domsTitle.length;i++){
					if(evt.detail.index == i){
						domsTitle[i].className = 'active';
					}else{
						domsTitle[i].className = '';
					}
				}
			});
		},
		error:function(){
			console.log('toptitle获取数据失败！');
		}
	})
	
	
	
	
	
	
	
	
})








