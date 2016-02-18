$(document).ready(function(){
	if(window.innerWidth>992){
		$('#home').css('padding-top',window.innerHeight/2 - $('#home .body-text').height()/1.5);
	}else{
		var totalheight = $('#home .left-col').height() + $('#home .right-col').height();		
		$('#home').css('padding-top',window.innerHeight/2 - totalheight/2);
	}
});

$(window).resize(function(){
	if(window.innerWidth>992){
		$('#home').css('padding-top',window.innerHeight/2 - $('#home .body-text').height()/1.5);
	}else{
		var totalheight = $('#home .left-col').height() + $('#home .right-col').height();		
		$('#home').css('padding-top',window.innerHeight/2 - totalheight/2);
	}
});