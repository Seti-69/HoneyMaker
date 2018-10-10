// Clock script v1.0 - Feb 2018 Candidate no.:178492

window.onload= function (){
	var radius=0;
	var c;
	var angle2=0;
	var mouseY;
	var up=true;
	var h;
	var m;
	var s;
	var h2;
	var s2;
	var m2;
	var h3;
	var today;
	var h;
	var m;
	var s;
	var mouseClick=false;
	var m4;
	var m5=0;
	var t24;
	var hd=0;
	var md=0;
	var m6;
	var m3=0;
	var userSet=false;
	var mOffset=0;
	var hOffset=0;
	var newMin=0;
	var newHour=0;
	var mStore;
	var hStore;
	var alrmMset=0;
	var alrmHset=0;
	var alarmCancel=false;
	var timer01;
	var alarmClr=["3799a8","4fa7b5","6db8c3","90cad3","b7dce2","ffffff"];
	var count=0;
	var count2=alarmClr.length-1;
	var audio01=new Audio('assets/alarm.mp3');
	var timer1;
	
	// Draw out clock face
	
	var paper = new Raphael( document.getElementById("clockFace"), 400, 400);
	var backGround = paper.rect(0, 0, 400, 400);
	backGround.attr({ fill: "#2b575e",stroke:"#ffffff",'stroke-width':3});
	var face = paper.circle(200,200,150);
	face.attr({fill:"#3799a8",stroke:"#63b3bf",'stroke-width':15});
	var seconds = paper.rect(199,170,2,130);
	seconds.attr({fill:"black"});
	var minutes = paper.rect(197,170,6,110);
	minutes.attr({fill:"#8bb9c0",stroke:"#25636c",'stroke-width':1});
	var hours = paper.rect(195,170,10,90);
	hours.attr({fill:"#e6f2f4",stroke:"#ffffff",'stroke-width':1});
	var hub = paper.circle(200,200,10);
	hub.attr({fill:"white"});
	var timeNumTxt = paper.text(200, 140, "");
	timeNumTxt.attr({fill:"#367a84","font-size":45,"font-family":"Share Tech, sans-serif","font-weight":"bold"});
	var hourTxt12 = paper.text(200, 75, "12").attr({fill:"#bee0e5","font-size":35,"font-family":"Share Tech, sans-serif,Arial","font-weight":"bold"});
	var hourTxt3 = paper.text(330, 205, "3").attr({fill:"#bee0e5","font-size":35,"font-family":"Share Tech, sans-serif,Arial","font-weight":"bold"});
	var hourTxt6 = paper.text(200, 325, "6").attr({fill:"#bee0e5","font-size":35,"font-family":"Share Tech, sans-serif,Arial","font-weight":"bold"});
	var hourTxt9 = paper.text(70, 205, "9").attr({fill:"#bee0e5","font-size":35,"font-family":"Share Tech, sans-serif,Arial","font-weight":"bold"});
	var clockSet=paper.set();
	clockSet.push(
		face,seconds,minutes,hours,hub,timeNumTxt,hourTxt12,hourTxt9,hourTxt3,hourTxt6
	);
	var xOffSet=0;
	var yOffSet=-30;
	clockSet.transform("t"+xOffSet+","+yOffSet+"");
	var infoText=paper.text(200, 260, "");
	infoText.attr({fill:"#c92e2e","font-size":35,"font-family":"Share Tech, sans-serif,Arial","font-weight":"bold",stroke:"#c92e2e",'stroke-width':2});
	var image01=paper.image('assets/Alarm.png',320,270,50,50);
	image01.attr({opacity:0});
	
	
	// Create RESET button
	var button1=buttonDraw(35,310);
	var highlight = paper.circle(30,325,8).attr({fill:"white",'stroke-width':0});
	var resetTxt = paper.text(55, 350, "Reset").attr({fill:"white",'stroke-width':0,"font-size":25,"font-family":"Share Tech, sans-serif,Arial"});
	// Create listener for RESET //
	var listener02=document.createElement("div");
	listener02.style.border="0px solid black";
	listener02.style.position="absolute";
	listener02.style.width="80px";
	listener02.style.height="80px";
	listener02.style.zIndex="40";
	listener02.style.marginTop="-95px";
	listener02.style.marginLeft="15px";
	listener02.onmouseover=function(){
		button1.attr({fill: "#d2bb6b",stroke:"#e9d696",'stroke-width':3});}
	listener02.onmouseout=function(){
		button1.attr({fill: "#d1af39",stroke:"#e9d696",'stroke-width':3});}
	listener02.click=function(){
		button1.attr({fill: "#d1af39",stroke:"#e9d696",'stroke-width':3});}
	listener02.onmousedown=function(){
			userSet=false;
			mOffset=0;
			hOffset=0;
			m5=0;
		};
	document.getElementById("clockFace").appendChild(listener02);
	
	// Create ALARM button
	var btnClr="#d1af39";
	var btnClr2="#d2bb6b";
	var alarmSet=false;
	var button2=buttonDraw(325,310);
	var highlight2 = paper.circle(320,325,8).attr({fill:"white",'stroke-width':0});
	var alarmTxt = paper.text(346, 350, "Alarm").attr({fill:"white",'stroke-width':0,"font-size":25,"font-family":"Share Tech, sans-serif,Arial"});
	
	
	
	// Create listener for ALARM //
	var listener03=document.createElement("div");
	listener03.style.border="0px solid black";
	listener03.style.position="absolute";
	listener03.style.width="80px";
	listener03.style.height="80px";
	listener03.style.zIndex="40";
	listener03.style.marginTop="-95px";
	listener03.style.marginLeft="300px";
	listener03.onmouseover=function(){
			button2.attr({fill: btnClr2,stroke:"#e9d696",'stroke-width':3});}
	listener03.onmouseout=function(){
			button2.attr({fill: btnClr,stroke:"#e9d696",'stroke-width':3});}
	listener03.onmousedown=function(){
		if(!alarmSet){
			if(alarmCancel){
					alarmSet=false;
					alarmCancel=false;
					button2.attr({fill: "#d2bb6b",stroke:"#e9d696",'stroke-width':3});
					btnClr2="#d2bb6b";
					btnClr="#d1af39";
					alarmTxt.attr({text:"Alarm"});
					timer01=clearTimeout(timer01);
					face.attr({fill:"#"+alarmClr[0],stroke:"#63b3bf",'stroke-width':15});
					infoText.attr({text:""});
					image01.attr({opacity:0});
					return;
				}
			button2.attr({fill: "#76b267",stroke:"#e9d696",'stroke-width':3});
			alarmSet=true;
			btnClr2="#76b267";
			btnClr="#499536";
			alarmTxt.attr({text:"OK"});
			infoText.attr({text:"< Set Alarm Time"});
			mStore=mOffset;
			hStore=hOffset;
			}else{
				
				button2.attr({fill: "#dd6b6b",stroke:"#e9d696",'stroke-width':3});
				alarmSet=false;
				btnClr2="#dd6b6b";
				btnClr="#c92e2e";
				alarmTxt.attr({text:"Cancel"});
				infoText.attr({text:""});
				alarmCancel=true;
				alrmMset=newMin;
				alrmHset=newHour;
				console.log("Alarm set for: "+alrmHset+":"+alrmMset);
				var alarmHset2=checkTime(alrmHset);
				var alarmMset2=checkTime(alrmMset);
				infoText.attr({text:alarmHset2+":"+alarmMset2});
				mOffset=mStore;
				hOffset=hStore;
				image01.attr({opacity:1});
			}
	}	
	document.getElementById("clockFace").appendChild(listener03);
	
// Spare buttons //
	var button3=buttonDraw(130,310);
	button3.attr({opacity:0.6});
	var highlight3 = paper.circle(124,325,8).attr({opacity:0.6,fill:"white",'stroke-width':0});
	var Txt = paper.text(55, 350, "Reset").attr({fill:"white",'stroke-width':0,"font-size":25,"font-family":"Share Tech, sans-serif,Arial"});
	button3.onmouseover=function(){
			button1.attr({fill: "#d2bb6b",stroke:"#e9d696",'stroke-width':3});}
	button3.onmouseout=function(){
			button1.attr({fill: "#d1af39",stroke:"#e9d696",'stroke-width':3});}
	
	var button4=buttonDraw(227,310);
	button4.attr({opacity:0.3});
	var highlight4 = paper.circle(224,325,8).attr({opacity:0.6,fill:"white",'stroke-width':0});
	var Txt2 = paper.text(55, 350, "Reset").attr({fill:"white",'stroke-width':0,"font-size":25,"font-family":"Share Tech, sans-serif,Arial"});
	button4.onmouseover=function(){
			button1.attr({fill: "#d2bb6b",stroke:"#e9d696",'stroke-width':3});}
	button4.onmouseout=function(){
			button1.attr({fill: "#d1af39",stroke:"#e9d696",'stroke-width':3});}
			
	// Create cog graphic
	var cogTeeth=[];
	var teethNum=12;
	var angle=360/teethNum;
	var cogSet=paper.set();
	for(var a=0;a<teethNum;a++){
		cogTeeth[a]=paper.path("m"+150+","+20+"l20,0s20,0 20 20l0,20l-60,0l0,-20s0,-20 20 -20 ");
		cogTeeth[a].attr({fill:"#2f678f",stroke:"#1c415b",'stroke-width':3});
		cogTeeth[a].transform("r"+(angle*a)+",180,170");
		cogSet.push(cogTeeth[a]);
	}
	var cogFace = paper.circle(170,180,135);
	cogFace.attr({fill:"#2f678f",stroke:"#1c415b",'stroke-width':3});
	
	// Create listener  to interact with cog graphic
	var listener01=document.createElement("div");
	listener01.style.border="0px solid black";
	listener01.style.position="absolute";
	listener01.style.width="70px";
	listener01.style.height="230px";
	listener01.style.zIndex="30";
	listener01.style.marginTop="-330px";
	listener01.onmouseover=function(){overCogs();};
	listener01.onmouseout=function(){outCogs();};
	listener01.onmousedown=function(event){mouseClick=true;clickCogs(event.clientY);};
	listener01.onmouseup=function(){mouseClick=false;upCogs();};
	listener01.onmousemove=function(event){turnCog(event.clientY);};
	document.getElementById("clockFace").appendChild(listener01);
	
			
	// Layer order //
	hourTxt9.toBack();
	hourTxt12.toBack();
	hourTxt6.toBack();
	hourTxt3.toBack();
	timeNumTxt.toBack();
	infoText.toBack();
	face.toBack();
	cogFace.toBack();
	cogSet.toBack();
	backGround.toBack();
	image01.toFront();
	
//
// Loop function that updates time from system every 300 ms
//
	function startTime(){
	
	today = new Date();
	h = today.getHours();
	m = today.getMinutes();
	s = today.getSeconds();
	
	// Check time with offset  doesn't go over 60 mins or under 0 mins
		newMin=m+mOffset;
		if (newMin==60){
			newMin=0;mOffset=mOffset-60;hOffset++;
		}
		if(m+mOffset<0){mOffset=60+mOffset;console.log("Neg number at: "+h2 + ":" + m2 + ":" + s2);}
		newHour=h+hOffset;
		if (newHour==24){newHour=0;hOffset=hOffset-24;}
		//document.getElementById("debug").innerHTML="Offset hours:"+hOffset+",mins:"+mOffset;
		m2 = checkTime(newMin);
		s2 = checkTime(s);
		h2 = checkTime(newHour);
		
		if(!mouseClick){
			timeNumTxt.attr({text:(h2) + ":" + (m2) + ":" + s2});
			minutes.animate({transform: [ 'r',(newMin+30)*6,200,170]});
			hours.animate({transform: [ 'r',((newHour+6)*30)+(newMin/2),200,170]});
			}
			
			seconds.animate({transform: [ 'r',(s+30)*6,200,170]});
		for(c=0;c<teethNum;c++){
			cogTeeth[c].transform("r"+(radius+(angle*c))+",170,180")
		}
		if(newMin==alrmMset && newHour==alrmHset  && alarmCancel){
			alrmMset=0;
			alrmHset=0;
			audio01.play();
			alarm();
		}
		
	setTimeout(function(){startTime()},250);
	}

	function checkTime(i) {
		if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
		return i;
	}
	// Creates generic button shape
	function buttonDraw(x,y){
		return paper.path("M"+x+","+y+"l40,0s20,0 20 20l0,40s0,20 -20 20l-40,0s-20,0 -20,-20l0,-40s0,-20 20 -20 ")
		.attr({fill: "#d1af39",stroke:"#e9d696",'stroke-width':3});
		
		
	}
	// mouse click functions for setting cog
	function overCogs(){
		for(var c=0;c<teethNum;c++){
			cogTeeth[c].attr({fill:"#4e86af",'stroke-width':3});
			cogFace.attr({fill:"#4e86af",'stroke-width':3});
			
		}
	}
	function outCogs(){
		for(var c=0;c<teethNum;c++){
			cogTeeth[c].attr({fill:"#2f678f",'stroke-width':3});
			cogFace.attr({fill:"#2f678f",'stroke-width':3});
		}
	}
	function clickCogs(e){
		
		for(var c=0;c<teethNum;c++){
			cogTeeth[c].attr({fill:"#7bc4cf",'stroke-width':3});
			cogFace.attr({fill:"#7bc4cf",'stroke-width':3});
		}
			mouseY=e;
			m4=newMin;
			m5=newMin;
			if(newHour>12){h4=newHour-12;}else{h4=newHour}
			t24=newHour;
			up=false;
			m3==0;
			if(alarmSet){
				
				
			}
		
	}
	function upCogs(){
		for(var c=0;c<teethNum;c++){
			up=true;
		}
		mOffset+=m5-newMin;
		hOffset+=t24-newHour;
		overCogs();
	}
	function turnCog(mouseEvent){
		
		
		if (!mouseClick){return;}
		if(!up){radius=mouseY-mouseEvent;
			m3=(mouseY-mouseEvent);
			m5=m4+m3;
			if(m5>=60){mouseY=mouseEvent;m5=0;m4=0;h4++;t24++;}
			if(m5<0){mouseY=mouseEvent;m5=59;m4=60;h4--;t24--;}
			if(t24==24){t24=0;}
			if(t24==-1){t24=23;}
			var t24b = checkTime(t24);
			m6=checkTime(m5);
			timeNumTxt.attr({text:t24b + ":" + (m6) + ":" + s2})
				
		}	
		minutes.animate({transform:["r",((m5+30)*6),200,170]});
		hours.animate({transform: [ 'r',((h4+6)*30)+(m5/2),200,170]});
		for(var c=0;c<teethNum;c++){
			cogTeeth[c].transform("r"+(radius+(angle*c))+",170,180");
		}
	}
	
	function alarm(){
		face.attr({fill:"#"+alarmClr[count],stroke:"#"+alarmClr[count2],'stroke-width':15+count});
		image01.attr({width:50+(count),height:50+(count),x:(330-(count/2)),y:(250-(count/2))});
		count++;
		count2--;
		if(count>=alarmClr.length){count=0;audio01.play();}
		if(count2<=0){count2=alarmClr.length-1;}
		timer01=setTimeout(function(){alarm();},80);
	}
	startTime(); //Function call that starts the time loop.

};