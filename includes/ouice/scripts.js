$(document).ready(function(){$(".transcript").hide();$('<p><a href="#" class="toggle">Show transcript</a><p/>').appendTo("div.clip");$('a.toggle').click(function(){$(this).text($(this).text()=='Show transcript'?'Hide transcript':'Show transcript');$(this).parent().parent().next().toggle();return false;$(this).html(text)})});