var pathname = window.location.pathname;
// Gets the current page name
var pagename = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
var select = function(pos) { $('ul.ou-sections > li:nth-Child(' + pos + ') > a').addClass('xou-selected');} 

$('document').ready(function() {

    switch(pagename)
    {
        case "index.aspx":
            select(1);
        break;
        case "index4.aspx":
            select(1);
        break;
        case "students.aspx":
            select(2);
        break;
        case "students2.aspx":
            select(2);
        break;
        case "students3.aspx":
            select(2);
        break;
        case "students5.aspx":
            select(2);
        break;            
        case "students6.aspx":
            select(2);
        break;
        case "compose.aspx":
            select(2);
        break;
        case "refer-student.aspx":
            select(2);
        break;
        case "refer-student-updated.aspx":
            select(2);
        break;
        case "show-referrals.aspx":
            select(2);
        break;
        case "personal.aspx":
            select(6);
        break;
        case "coursepayments.aspx":
            select(6);
        break;
        case "messages.aspx":
            select(8);
        break;
        case "news.aspx":
            select(8);
        break;
        case "news2.aspx":
            select(8);
        break;
        case "news3.aspx":
            select(8);
        break;
        case "news-messages-unified.aspx":
            select(8);
        break;
        case "news-messages-unified-read.aspx":
            select(8);
        break;
        case "alias.aspx":
            select(10);
        break;
        case "university.aspx":
            select(7);
        break;
        default:
            select(1);
        break;
    }

});


if ((typeof thTopNavInit) != "undefined")
{   
    switch(pagename)
    {
        case "extensions.aspx":
        var TopNav_jQ = jQuery.noConflict(true);
        TopNav_jQ(thTopNavInit);
        break; 
        default:
        $(thTopNavInit);
    }
}

function createXMLHttpRequest() {
   try { return new XMLHttpRequest(); } catch(e) {}
   try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
   try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
   return null;
}

function show(ElementId ) 
{ 
    var xmlHttpReq= createXMLHttpRequest();
    xmlHttpReq.open("POST", "newsmessageshandler.aspx?show=" + ElementId , false);
    xmlHttpReq.onreadystatechange = function() {if (xmlHttpReq.readyState != 4)  { return; }
                                       var serverResponse = xmlHttpReq.responseText;
                                    }
    xmlHttpReq.send();
}

// Function to extract parameters from query string
function getParameterByName(name, link) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(link);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function hide(ElementId ) 
{ 
    var xmlHttpReq= createXMLHttpRequest();
    xmlHttpReq.open("POST", "newsmessageshandler.aspx?hide=" + ElementId , false);
    xmlHttpReq.onreadystatechange = function() {if (xmlHttpReq.readyState != 4)  { return; }
                                       var serverResponse = xmlHttpReq.responseText;
                                    }
    xmlHttpReq.send();
}

var coursepayments = function() {
    $('body').addClass('ou ou-panels template-content ou-pure');
    $('#ctl00_MainContent_inpCode').focus();
}

var newsunifiedread = function() {
    $('document').ready(function() {
        $('body').addClass('ou ou-panels cp');
        $( '.story a.remove' ).click( function() {
	        $(this).parent('div').fadeOut();
	        $(this).parent('div').prev().fadeOut();
	        show($(this).attr('id'));
	        return false;
        });
    });
}

var newsunified = function() {
	$('document').ready(function() {
        $('body').addClass('ou ou-panels cp');
        $( '.story a.remove' ).click( function() {
	        $(this).parent('div').fadeOut();
	        $(this).parent('div').prev().fadeOut();
	        hide($(this).attr('id'));
	        return false;
        } );
        
        if (typeof $(window.location.hash).position() != "undefined")
        {
            $('html, body').animate({ scrollTop: $(window.location.hash).position().top }, 'slow');
        }
    });
}

var boot = function () {
    $('document').ready(function () {
        alert("Although students have access to their module results on their online student record at the same time as results are available to you online, you will be receiving the results in advance of any student who does not have access to StudentHome. Module result letters are released for despatch at around the same time as this message appears.\r\n\r\nYou must not advise students of their results.");
    });
}