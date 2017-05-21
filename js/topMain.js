
mui.init();

mui.plusReady(function(){
		//获得频道的title数组
	var currentWv = plus.webview.currentWebview();
	var titleArr = currentWv.channelArr;
	var html = '';
	titleArr.map(function(item,index){   
		html += '<div class="mui-slider-item"><div class="mui-scroll-wrapper scroll-wrapper'+index+'"><div class="mui-scroll scroll'+index+'"><div class="title-img"><img src="'+item.img+'" /></div></div></div></div>';
	})
//	console.log(html);
	document.querySelector('.mui-slider-group').innerHTML += html;
	mui('.mui-slider').slider();
//	mui('.mui-scroll-wrapper').scroll();
	
	//监听事件,点击对应的title跳到对应的页面
	window.addEventListener('changePage', function(ev){
		console.log(ev.detail.title);
		titleArr.map(function(item,index){
			if(ev.detail.title == item.title){
				mui('.mui-slider').slider().gotoItem(index,0);
			}
		})
	});
	
	//自定义事件，滑动页面，跳到对应的title
	document.querySelector('.mui-slider').addEventListener('slide',function(evt){
//		console.log(event.detail.slideNumber);
		mui.fire(plus.webview.getWebviewById('top'),'changeTitle',{
			index:event.detail.slideNumber
		});
	});
	
	//获取topContent数据
	mui.ajax('../json/topContent.json',{
		success:function(data){
			var contentArr = JSON.parse(data).data.items;
			
			titleArr.map(function(item,index){
				var ulHtml = '<ul class="content content'+index+'"></div>';
				document.querySelector('.scroll'+index).innerHTML += ulHtml;

				var contentHtml = '';
				contentArr.map(function(item1,index1){
					var obj = item1.data;
					contentHtml += '<li>'+
					      	        	'<div class="content-img">'+
					      	        		'<img src="'+obj.cover_image_url+'" />'+
					      	        	'</div>'+
					      	        	'<div class="content-wrapper">'+
						      	        	'<div class="content-top"><em>top'+(index1+1)+'</em><h3>'+obj.short_description+'</h3></div>'+
					      	        		'<h2>'+obj.name+'</h2>'+
					      	        		'<p class="price">￥'+parseInt(obj.price)+'</p>'+
				      	        		'</div>'+
				      	        	'</li>';
				});
				document.querySelector('.content'+index).innerHTML = contentHtml;
				mui('.scroll-wrapper'+index).scroll();
			});
			
			
		},
		error:function(){
			console.log('topContent获取数据失败');
		}
	})
	
})

