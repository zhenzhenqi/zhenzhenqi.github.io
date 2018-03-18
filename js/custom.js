var offset_width;
var plist_shown = false;
var original_bg;
var all_brief = [];
var all_bg_url = [];

$(document).ready(function(){

	//get all briefs, for live-swapping when hover on project-list-item
	var all_brief_DOM = [];	
	all_brief_DOM = document.getElementsByClassName('brief');

	var all_shortcode = [];
	all_shortcode = document.getElementsByClassName('shortcode');
	show_hide_floating_menu_button();


	for (var i=0; i<all_brief_DOM.length;i++) {
		all_brief.push($(all_brief_DOM[i]).children().eq(0).html());
	};

	//toggle project list page
	offset_width = window.innerWidth / 12 * 11 ;

	var togglelist_p_original_left = $('.toggle-plist p').css('left');
	$('.toggle-plist').hover(function(){
		$('.toggle-plist p').css({
			'opacity':'1'
		});
	},function(){
		$('.toggle-plist p').css({
			'opacity':'0'
		});
	});

	$('.toggle-plist').click(function(){
		showlist(plist_shown);
	});
	original_bg = $('.content-container').css('background-color');

	centerPL();
	showbrief_adjustheight();
	swap_exhibitgrowth_homepage_bg();
	adjustConetentWraperHeight();
});

$(window).resize(function(){
	offset_width = window.innerWidth / 12 * 11 ;
	if(plist_shown){
		$('.content-container').css('left',offset_width);
	}else{
		$('.content-container').css('left',0);
	}
	centerPL();
	adjustConetentWraperHeight();
    $('#zzContainer').width  = window.innerWidth;
    $('#zzContainer').height = window.innerHeight;
});




function showlist(_plist_shown){
	if(!_plist_shown){
		$('.content-container').css({'left':offset_width,'background-color':'#000'});
		$("body").scrollTop(0);
		plist_shown = true;
	}else{
		$('.content-container').css({'left':0,'background-color':original_bg});
		plist_shown = false;
	}
}

function centerPL(){
	var temp_margin_top = window.innerHeight/2 - $('#project-list ul').height()/2;

	if (temp_margin_top <= 10 ) {
		temp_margin_top = 10;
	};

	// $('#project-list ul').css('margin-top',temp_margin_top);
}


function showbrief_adjustheight(){
	//show brief
	$('#project-list ul a').unbind().hover(function(){
		var theindex = $(this).children().eq(1).html();
		//align brief
		$('#for-show').html(all_brief[theindex]).css({
			'display':'block',
			'margin-top' : $(this).offset().top

		});
	},
	function(){
		$('#for-show').css({'display':'none'});
	});

}

function show_hide_floating_menu_button(){
		if(window.innerHeight > $(window).scrollTop()){
			$('#floating-open-menu').css('display','none');
		}else{
			$('#floating-open-menu').css('display','block');
		}

}

function swap_exhibitgrowth_homepage_bg(){
	var counter = 0;
	var imageNames = ['Growth-8669','Growth-1660','Growth-1643','Growth-1566'];

	if('#exhibit-growth'.length){
		window.setInterval(function(){
			var url  = "url(/assets/exhibitgrowth/" + imageNames[counter] + ".jpg)";
			$('#exhibit-growth #bg-container').css({'background-image': url,});
			counter++;
			if(counter > 3)counter = 0;
		},5000);
	}
}

function adjustConetentWraperHeight(){
	$('.content-container').css('min-height',$('#project-list').height());
}
