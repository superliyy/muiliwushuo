


mui.init();

mui.plusReady(function(){
	//******************攻略界面和数据处理*****************//
	//获得从上一个页面传过来的titleArr数组
	var titleArr = plus.webview.currentWebview().titleArr;
	
	//监听changePage事件
	window.addEventListener('changePage',function(evt){
		var sliderindex = 0;
		titleArr.map(function(item,index){
			if(item==evt.detail.title){
				sliderindex = index;
			}
		})
		mui('.page-slider').slider().gotoItem(sliderindex);
	});
	
	//监听page-slider的slide事件
	document.querySelector('.page-slider').addEventListener('slide', function(evt) {
		mui.fire(plus.webview.getWebviewById('category'),'changeTitle',{
			index:evt.detail.slideNumber
		})
	});
	
	window.addEventListener('shiyan',function(){
		console.log(11);
	})
	
	
	//******攻略获取网络数据*****//
	//栏目
	mui.ajax('../json/strategy.json',{
		success:function(data){
			var columsArr = JSON.parse(data).data.columns;
			var columHtml = '';
			columsArr.map(function(item,index){
				columHtml +='<div class="column-item">'+
			      	        	'<div class="colum-picture">'+
			      	        		'<img src="'+ item.banner_image_url+  '" />'+
			      	        	'</div>'+
			      	        	'<div class="colum-content">'+
			      	        		'<h6>'+item.title+'</h6>'+
			      	        		'<p>'+item.author+'</p>'+
			      	        	'</div>'+
			      	        '</div>';
			})
			document.querySelector('.column-scroll').innerHTML = columHtml;			
		},
		eerror:function(){
			console.log('strategy获取数据失败！');
		}
	});

//	mui('.page-scroll-wrapper').scroll();
	
	//攻略其他
	mui.ajax('../json/otherStrategy.json',{
		success:function(data){
			
			var otherStrategyTitles = JSON.parse(data).data.channel_groups;
			
			otherStrategyTitles.map(function(item,index){
				var otherTitleHtml = '';
				if(index == 0){
					otherTitleHtml ='<div class="class-wrapper first-class">';
				}else{
					otherTitleHtml ='<div class="class-wrapper">';
				}
				otherTitleHtml +='<div class="column-title-wrapper class-title-wrapper">'+
							      		'<h3>'+item.name+'</h3>'+
							      		'<span class="column-title-right class-title-right">查看全部<span class="iconfont icon-sanjiaoxing"></span></span>'+
						      		'</div>'+
						      		'<div class="class-content class-content'+index+'"></div>'+
						      	'</div>';
				document.querySelector('.page-scroll').innerHTML += otherTitleHtml;

				//每个类型中的content
				var otherStrategyArr = item.channels;
				var contentHtml = '';
				otherStrategyArr.map(function(item1,index1){
					if(index1>=6){
						return;
					}
					contentHtml += '<div class="class-picture">'+
					      				'<img src="'+item1.cover_image_url+'" />'+
					      			'</div>';
				})
				document.querySelector('.class-content'+index).innerHTML +=contentHtml;
			})
			mui.fire(plus.webview.currentWebview('categoryMain'),'success',null);
		},
		error:function(){
			console.log('otherStrategy获取数据失败！');
		}
	})
	
	window.addEventListener('success',function(){
		//刷新page-scroll-wrapper
		mui('.page-scroll-wrapper').scroll({
			scrollY:true,
			scrollX:false,
			deceleration: 0.0005,
			indicators: false,
			bounce: false
		});
		
		//刷新column-scroll-wrapper
		mui('.column-scroll-wrapper').scroll({
			deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			scrollX: true,
			scrollY:false,
			indicators: false,
			bounce: false
		});

	})
	//******************攻略界面和数据处理*****************//
	
	
	//******************单品界面和数据处理*****************//
	//singletitle网络数据获取
	mui.ajax('../json/single.json',{
		success:function(data){
			var titleArr = JSON.parse(data).data.categories;
			var titleHtml = '';
			var ulHtml = '';
			titleArr.map(function(item,index){
				//获取title数据
				if(index==0){
					titleHtml +='<h2 class="active-h">'+item.name+'</h2>';
				 	ulHtml = '<ul class="content-item  content-item'+index +'"></ul>';	
				}else{
					titleHtml +='<h2>'+item.name+'</h2>';	
					ulHtml = '<ul class="content-item content-title content-item'+index +'"></ul>';
				}
//				console.log(ulHtml);
				document.querySelector('.single-content-scroll').innerHTML += ulHtml;
				//获取content数据
				var contentArr = item.subcategories;
				var contentHtml = '';
				if(index>0){
					contentHtml = '<span class="c-title">'+item.name+'</span>';	
				}
				contentArr.map(function(item1,index1){
					contentHtml += '<li>'+
				              			'<div class="content-item-img"><img src="'+item1.icon_url+'" /></div>'+
				              			'<p>'+item1.name+'</p>'+
				              		'</li>';
				})
				document.querySelector('.content-item'+index).innerHTML = contentHtml;
				
			});
			document.querySelector('.single-title-scroll').innerHTML += titleHtml;
			

			//
			var domsTitleArr = document.querySelectorAll('.single-title-scroll h2');
			var domsContArr = document.querySelectorAll('.content-item');
			var contScrollDisYArr = [];
			var titleScrollDisYArr = [];
			for(var i = 0;i<domsContArr.length;i++){
				contScrollDisYArr.push(domsContArr[i].offsetTop-100);
				titleScrollDisYArr.push(domsTitleArr[i].offsetTop);
			}
			//刷新single-title-scroll-wrapper
			var titleScroll = mui('.single-title-scroll-wrapper').scroll({
				deceleration: 0.0005, 
				scrollX: false,
				scrollY:true,
				indicators: false,
				bounce: false
			});
			//刷新single-content-scroll-wrapper
			var contentScroll = mui('.single-content-scroll-wrapper').scroll({
				deceleration: 0.0005, 
				scrollX: false,
				scrollY:true,
				indicators: false,
				bounce: false
			});
			
			//给每一个title添加点击事件
			mui('.single-title-scroll').on('tap','h2',function(){
				//点击的title改变对应的样式
				var domsTitles = mui('.single-title-scroll h2');
				for(var i = 0;i<domsTitles.length;i++){
					if(this.innerText == domsTitles[i].innerText){
						domsTitles[i].className = 'active-h';
						//传值给ContentScroll
						mui.fire(plus.webview.currentWebview(),'sendToContentScroll',{
							index:i
						})
						//让titleScroll也相对应滚动
						if(i>=2&&i<=8){
							titleScroll.scrollTo(0,-titleScrollDisYArr[i-1],500);
						}
					}else{
						domsTitles[i].className = '';
					}
				}
			})
			
			//监听single-content-scroll-wrapper滚动
			document.querySelector('.single-content-scroll-wrapper').addEventListener('scroll', function(event) {
				for(var i = contScrollDisYArr.length-1;i>=0;i--){
					if(contScrollDisYArr[i]<-contentScroll.y){
						//让titleScroll也相对应滚动
//						if(i>=2&&i<=8){
//							titleScroll.scrollTo(0,-titleScrollDisYArr[i-1],500);
//						}
						//传值给ContentScroll
						mui.fire(plus.webview.currentWebview(),'sendToTitleScroll',{
							index:i
						})
						return;
					}
				}
			});
			
			//监听sendToTitleScroll事件
			window.addEventListener('sendToTitleScroll',function(evt){
				
//				//监听single-title-scroll-wrapper滚动
//				document.querySelector('.single-title-scroll-wrapper').addEventListener('scroll', function(event) {
//					
//				});
				//滚动时，title改变对应的样式
				var domsTitles = mui('.single-title-scroll h2');
				for(var i = 0;i<domsTitles.length;i++){
					if(i == evt.detail.index){
						domsTitles[i].className = 'active-h';
						if(i>=1&&i<=8){
							titleScroll.scrollTo(0,-titleScrollDisYArr[i-1],500);
						}

					}else{
						domsTitles[i].className = '';
					}
				}
			});
						
			//监听sendToContentScroll事件
			window.addEventListener('sendToContentScroll',function(evt){
				contentScroll.scrollTo(0,-contScrollDisYArr[evt.detail.index]-50,0);
			});
		},
		error:function(){
			console.log('single获取数据失败!');
		}
	});
	//******************单品界面和数据处理*****************//
	
	
})









