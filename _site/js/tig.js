var alllinks;
var linksName = [];
var path = "/assets/tig/";

$(document).ready(function(){

	alllinks = $('p a');

	for (var i = alllinks.length - 1; i >= 0; i--) {
		console.log($(alllinks[i]).attr('class'))
	};

	$('p a').hover(function(e){

		// console.log(path+$(this).attr('class')+".jpg");
		var full_path = path+$(this).attr('class')+".jpg";
		// $('#imagePlaceholder').attr("src",path+$(this).attr('class')+".jpg");

		if ( $(this).attr('data') == "true" ){
			$('#imagePlaceholder').css({
				'background-image':'url('+path+'interactiondemo/'+$(this).attr('class')+'.gif'+')',
			});
			console.log('url('+path+'interactiondemo/'+$(this).attr('class')+'.gif'+')');
		}else{
			$('#imagePlaceholder').css({
				'background-image':'url('+full_path+')',
			});
		}

		$('#imagePlaceholder').css({
			'top': $(this).offset().top - $(document).scrollTop() - 400
		});


	},function(){
		$('#imagePlaceholder').css({
			'background-image':'url()'
		});

	});

});


function showMyImage(name){

}