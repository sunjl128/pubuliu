window.onload=function()
{
	waterfall('main','box');//瀑布排列
	var dataInit={'data':[
	{'src':'10.jpg'},{'src':'11.jpg'},{'src':'12.jpg'},{'src':'13.jpg'},
	{'src':'14.jpg'},{'src':'15.jpg'},{'src':'16.jpg'},{'src':'17.jpg'},
	{'src':'18.jpg'},{'src':'19.jpg'},{'src':'20.jpg'},{'src':'21.jpg'},
	{'src':'22.jpg'},{'src':'23.jpg'},{'src':'24.jpg'},{'src':'25.jpg'},
	]};
	window.onscroll=function(){
		//滚动加载图片
		//判断是否有图片，如果有则加载
		if(canScroll()){
			var parent=document.getElementById('main');
			for (var i = 0; i < dataInit.data.length; i++) 
			{
				var divbox=document.createElement("div");
				var divpic=document.createElement("div");
				var img=document.createElement("img");
				divbox.setAttribute("class","box");
				divpic.setAttribute("class","pic");
				img.setAttribute("src","../images/"+dataInit.data[i].src);
				divpic.appendChild(img);
				divbox.appendChild(divpic);
				parent.appendChild(divbox);
			};
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box)
{
	//取出所有main下面的class为box的元素
	var oparent=document.getElementById(parent);
	var oboxs=getboxdom(oparent,box);
	var winwidth=document.documentElement.clientWidth;
	var boxwidth=oboxs[0].offsetWidth;
	var cols=Math.floor(winwidth/boxwidth);
	oparent.style.cssText="width:"+cols*boxwidth+"px;margin:0 auto;";
	var arryhi=[];
	for (var i = 0; i < oboxs.length; i++) {
		if(i<cols)
		{
			arryhi.push(oboxs[i].offsetHeight);
		}
		else
		{
			var minheigt= Math.min.apply(null,arryhi);
			var minindex=getminIndex(arryhi,minheigt);
			oboxs[i].style.position="absolute";
			oboxs[i].style.top=minheigt+"px";
			oboxs[i].style.left=boxwidth*minindex+"px";
			arryhi[minindex]+=oboxs[i].offsetHeight;
		}
	};
}
function getboxdom(parent,box)
{
	var boxarry=[];
	var boxs=parent.getElementsByTagName('*');
	for (var i = 0; i <boxs.length; i++) {
		if (boxs[i].className==box) {
			boxarry.push(boxs[i]);
		};
	};
	return boxarry;
}
function getminIndex (arryhi,minheigt) {
	for (var i = 0; i < arryhi.length; i++) {
		if(arryhi[i]==minheigt)
		{
			return i;
		}
	};
}

function canScroll()
{
    var oParent=document.getElementById('main');
    var boxs=getboxdom(oParent,'box');
    //创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var lastPinH=boxs[boxs.length-1].offsetTop+Math.floor(boxs[boxs.length-1].offsetHeight/2);
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性,向上滚动的距离
    var documentH=document.documentElement.clientHeight;//页面高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}