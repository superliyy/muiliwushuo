

mui.init();
mui.plusReady(function(){
	//获得频道的title数组
	var currentWv = plus.webview.currentWebview();
	var channleArr = currentWv.channelArr;
//	console.log(channleArr);
	
	var mainHtml = '';
	channleArr.map(function(item,index){
		mainHtml += '<div class="mui-slider-item"><div class="mui-scroll-wrapper scroller-wrapper'+index+'"><div class="mui-scroll  slider-item'+index+'"></div></div></div>';
	})
//	console.log(mainHtml);
	document.querySelector('.mui-slider-group').innerHTML = mainHtml;
	
	mui('.page-slider').slider();
	
	//监听事件,点击对应的title跳到对应的页面
	window.addEventListener('changePage', function(ev){
//		console.log(ev.detail.title);
		channleArr.map(function(item,index){
			if(ev.detail.title == item.name){
				mui('.page-slider').slider().gotoItem(index,0);
			}
		})
	});
	
	//自定义事件，滑动页面，跳到对应的title
	document.querySelector('.page-slider').addEventListener('slide',function(evt){
//		console.log(event.detail.slideNumber);
		mui.fire(plus.webview.getWebviewById('home'),'changeTitle',{
			index:event.detail.slideNumber
		});
	});
	
	document.querySelector('.slider-item0').innerHTML = '<div id="slider" class="mui-slider scroll-view" >'+
					      									'<div class="mui-slider-group mui-slider-loop"></div>'+	
														    '<div class="mui-slider-indicator"></div>'+
														 '</div>';
	document.querySelector('.slider-item0').innerHTML += ' <div class="banner2"><div class="banner-wrapper banner-wrapper1"></div><div class="banner-wrapper banner-wrapper2"></div></div>';
	
	//获取Scroll中的轮播图
	mui.ajax('../json/homeScroll.json',{
		success:function(data){
			var scrollArr = JSON.parse(data).data.banners;
			var scrollHtml = '';
			var indicatorHtml = '';
			scrollHtml +=  '<div class="mui-slider-item mui-slider-item-duplicate">'+
					          '<a href="#">'+
					           '<img src="' +scrollArr[scrollArr.length-1].image_url+' " />'+
					          '</a>'+
					        '</div>';
			scrollArr.map(function(item,index){
				scrollHtml +=  '<div class="mui-slider-item mui-slider-item-duplicate">'+
					          '<a href="#">'+
					            '<img src="' +item.image_url+' " />'+
					          '</a>'+
					        '</div>';
				if(index == 0){
					indicatorHtml += '<div class="mui-indicator mui-active"></div>';	
				}else{
					indicatorHtml += '<div class="mui-indicator"></div>';	
				}

			})
			scrollHtml +=  '<div class="mui-slider-item mui-slider-item-duplicate">'+
					          '<a href="#">'+
					            '<img src="' +scrollArr[0].image_url+' " />'+
					          '</a>'+
					        '</div>';
//			console.log(scrollHtml);
			document.querySelector('.scroll-view .mui-slider-loop').innerHTML = scrollHtml;
			document.querySelector('.scroll-view .mui-slider-indicator').innerHTML = indicatorHtml;
//			mui('.scroll-view').slider();
			
			
		},
		error:function(xhr,type,errorThrown){
			console.log('homeScroll获取数据失败');
		}
	})
	
	//获取banner中的数据
	mui.ajax('../json/homeBanner.json',{
		success:function(data){
			var bannerArr = JSON.parse(data).data.secondary_banners;
			var bannerHtml1 = '';
			var bannerHtml2 = '';
			bannerArr.map(function(item,index){
				if(index<3){
					bannerHtml1 += '<div class="banner-item">'+
							    		'<img src="'+item.image_url+'" />'+
							    	'</div>';
				}else{
					bannerHtml2 += '<div class="banner-item">'+
							    		'<img src="' +item.image_url+' " />'+
							    	'</div>';
				}
			})
			
			document.querySelector('.banner-wrapper1').innerHTML = bannerHtml1;
			document.querySelector('.banner-wrapper2').innerHTML = bannerHtml2;
			
		},
		error:function(xhr,type,errorThrown){
			console.log('homeBanner获取数据失败');
		}
	})
	
	//获取个list数据
	channleArr.map(function(item,index){
//		console.log(item.id);
		var str = "../json/homeList"+item.id+".json";
		
		mui.ajax(str,{
			success:function(data){
				console.log(item.name+'获取数据成功');
//				console.log(JSON.parse(data));
				var arr = JSON.parse(data).data.items;
				var html = '';
				arr.map(function(item,index){
					html +=  '<div class="list-warapper">'+
						    	'<div class="list-head">'+
						    		'<div class="list-icon"><img src="../icon.jpg" /></div>'+
						    		'<div class="list-cont">'+
						    			'<p>美物娘</p>'+
						    			'<p>恋各种美好事物的女汉子</p>'+
						    		'</div>	'+
						    	'</div>'+
						    	'<div class="list-img">'+
						    		'<img src="'+item.cover_webp_url+'" />'+
						    	'</div>'+
						    	'<div class="list-content">'+
						    		'<h3>'+item.title+'</h3>'+
						    		'<span>'+item.share_msg+'</span>'+
						    	'</div>'+
						    	'<div class="list-bottom"><span>栏目 <b>明天穿什么</b></span><span>'+item.likes_count+'</span></div>'+
						    '</div>';
				})
				
				document.querySelector('.slider-item'+index).innerHTML += html;

				mui('.scroller-wrapper'+index).scroll();
				
				//获得slider插件对象
				if(index==0){
					var gallery = mui('.scroll-view');
					gallery.slider({
					  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
					});
				}
				
				
			},
			error:function(xhr,type,errorThrown){
				console.log(item.name+'获取数据失败');
			}
		})
		
		
	})

	
})










