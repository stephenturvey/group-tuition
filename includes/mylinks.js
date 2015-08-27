RequestMyLinks();

function RequestMyLinks()
{
	if (window.XMLHttpRequest)
		http_request = new XMLHttpRequest(); 
	else if (window.ActiveXObject)
		http_request = new ActiveXObject("Microsoft.XMLHTTP");
	if (http_request == null)
	{
	    alert("Sorry, this browser isn't capable!");
	    return;
	}
	http_request.onreadystatechange = DisplayMyLinks;
	requestURL = "http://intranet.open.ac.uk/oulife-home/ajax/mylinks.aspx";
	http_request.open("GET", requestURL, true);
	http_request.send(null); 
}

function DisplayMyLinks()
{
	myLinks = document.getElementById("myLinksArea");
	if (http_request.readyState == 4)
	{
		if (http_request.status == 200)
		{
			if (http_request.responseText.length > 0)
			{
				myLinks.innerHTML = http_request.responseText;
			}
			else
			{
				myLinks.innerHTML = "Sorry, an error occurred retrieving your links";
			}
		}
		else
		{
			 myLinks.innerHTML = "Sorry, web server returned an error (" + http_request.status + ")";
		}
	}
}
