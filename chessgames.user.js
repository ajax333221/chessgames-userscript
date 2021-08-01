// ==UserScript==
// @name           Chessgames IcUi replayer
// @author         ajax333221
// @description    It takes the plain-text PGN and turns it into a chess board
// @version        0.8.2
// @include        http://chessgames.com/*
// @include        http://*.chessgames.com/*
// @include        https://chessgames.com/*
// @include        https://*.chessgames.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require        https://ajax333221.github.io/isepic-chess-ui/js/isepic-chess.js
// @require        https://ajax333221.github.io/isepic-chess-ui/js/isepic-chess-ui.js
// @icon           https://github.com/ajax333221/isepic-chess-ui/raw/master/css/images/ic_ui_logo.png
// ==/UserScript==

function mParamUrl(){
	var results, rtn;
	
	rtn=0;
	
	results=new RegExp("[\?&]m=([^&#]*)").exec(window.location.href);
	
	if(results!=null){
		rtn=(decodeURI(results[1]) || 0);
	}
	
	return (rtn*1 || 0);
}

$(function(){
	var i, len, arr, temp, my_css, move_index, is_rotated;
	
	$("<link>").appendTo("head").attr({
		type : "text/css", 
		rel : "stylesheet",
		href : "https://ajax333221.github.io/isepic-chess-ui/css/isepic-chess-ui.css"
	});
	
	temp=(""+$("table tt").first().html());
	
	if(Ic && IcUi && temp.length>10){
		arr=["bp", "bn", "br", "bb", "bq", "bk", "wp", "wn", "wr", "wb", "wq", "wk"];
		
		my_css="<style type=\"text/css\">";
		my_css+=".ic_ui_board .ic_piece_holder{background-repeat: no-repeat;background-position: 50% 50%;display: block;}";
		
		for(i=0, len=arr.length; i<len; i++){
			my_css+=".ic_ui_board .ic_merida .ic_"+arr[i]+"{background-image: url(\"https://ajax333221.github.io/isepic-chess-ui/css/images/chess-fonts/merida/"+arr[i]+".png\");}";
		}
		
		my_css+="</style>";
		
		$(my_css).appendTo("head");
		
		move_index=Math.max(0, (((mParamUrl()-0.5)*2)-1));
		
		is_rotated=(move_index%2!==0);
		
		$("table tt").closest("td").css({
			"background" : "#f0f6f7",
			"padding" : "24px"
		});
		
		$("table tt").first().html("<div class=\"ic_ui_board\" style=\"height:500px; width:500px;\"><div id=\"ic_ui_board\"></div></div><br><div class=\"ic_ui_controls\"><div id=\"icbuttons\"><input id=\"ic_ui_nav_first\" value=\"|<\" type=\"button\"><input id=\"ic_ui_nav_previous\" value=\"<\" type=\"button\"><input id=\"ic_ui_nav_next\" value=\">\" type=\"button\"><input id=\"ic_ui_nav_last\" value=\">|\" type=\"button\"><input id=\"ic_ui_rotate\" value=\"rotate\" type=\"button\"><select id=\"ic_ui_promote\"><option value=\"5\" selected=\"selected\">queen</option><option value=\"4\">rook</option><option value=\"3\">bishop</option><option value=\"2\">knight</option></select></div><br><input id=\"ic_ui_fen\" value=\"\" type=\"text\"><br><br><div class=\"ic_ui_move_list\"><div id=\"ic_ui_move_list\"></div></div></div>");
		
		$("#icbuttons").css("text-align", "center");
		$("#icbuttons input").css({"margin" : "0 2px", "padding" : "8px 16px"});
		$("#ic_ui_board").parent().css("margin", "0 auto");
		
		IcUi.setCfg("arrowKeysNavigation", true);
		IcUi.setCfg("scrollNavigation", false);
		IcUi.setCfg("soundEffects", false);
		
		Ic.initBoard({
			boardName : "main",
			moveIndex : move_index,
			isRotated : is_rotated,
			pgn : temp
		});
	}
});
