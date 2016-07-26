// Site-wide javascripts: keeps the head area of the documents nice and clean!



// Pop-up windows for Messages, Favourites etc

function n_window(theurl)
{
// set the width and height
var the_width=420;
var the_height=500;
// set window position
var from_top=20;
var from_left=20;
// set other attributes
var has_toolbar='no';
var has_location='no';
var has_directories='no';
var has_status='no';
var has_menubar='no';
var has_scrollbars='yes';
var is_resizable='yes';
// attributes put together
var the_atts='width='+the_width+',height='+the_height+',top='+from_top+',screenY='+from_top+',left='+from_left+',screenX='+from_left;
the_atts+=',toolbar='+has_toolbar+',location='+has_location+',directories='+has_directories+',status='+has_status;
the_atts+=',menubar='+has_menubar+',scrollbars='+has_scrollbars+',resizable='+is_resizable;
// open window
window.open(theurl,'',the_atts);
}
