

var modalactive = false;

$(document).ready(function(){
	setModalPosition();

		$('#close').click(function(){
		if(modalactive){
			$('#about-modal').css({
			'opacity':'0',
			'visibility':'hidden'
		});
			modalactive = false;
		}
	})


	$('#open-about-modal').click(function(){

		if(!modalactive){
			$('#about-modal').css({
				'opacity':'1',
				'visibility':'visible'
			});
			modalactive = true;
		}
	});



});


function setModalPosition(){
	$('#about-modal #content').css({
		'left': window.innerWidth/2 - ($('#about-modal #content').width()/2),
		'top': window.innerHeight/2.3 - ($('#about-modal #content').height()/2)
	})
}

$(window).resize(function(){
	setModalPosition();
})
