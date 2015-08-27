var http_request = null;

function fpsboot()
{
	var f = document.forms["theform"];
	if (f == null) return;
	
	sb_c = document.cookie + ";";
	sb_p = sb_c.indexOf("SAMSsession");
	sb_h = 0;
	sb_ss = "";
	if (sb_p >= 0)
	{
		i = sb_c.indexOf(";", sb_p);
		sb_ss = sb_c.substr(sb_p+12,i-sb_p-12);
		for (i=sb_p+12 ; ; i++ ) 
		{
			if (sb_c.substr(i, 1) == ';') break;
			sb_h += sb_c.charCodeAt(i);
		}
		sb_p = sb_c.indexOf("%2E", sb_p);
	}
	if (sb_p >= 0)
	{
		sb_p2 = sb_c.indexOf("HS7BDF=");
		if (sb_p2 >= 0)
		{
			sb_p3 = sb_c.indexOf(";", sb_p2);
			sb_p4 = sb_c.indexOf("\\", sb_p2);
			if (sb_p4 > 0 && sb_p4 < sb_p3)
			{
				if (parseFloat(sb_c.substr(sb_p4+1)) != sb_h) sb_p2 = -1;
				sb_p3 = sb_p4;
			}
			if (sb_p2 >= 0)
			{
				sb_nm = sb_c.substr(sb_p2+7,sb_p3-sb_p2-7);
				sb_nm2 = "";
				for (i=0 ; i < sb_nm.length ; i++)
				{
					j = sb_nm.charCodeAt(i) % 256;
					if (j >= 192 && j <= 223 && i < sb_nm.length-1)
					{
						k = sb_nm.charCodeAt(i+1) % 256;
						sb_nm2 += String.fromCharCode((j-192)*64 + (k-128));
						i++;
					}
					else
						sb_nm2 += String.fromCharCode(j);
				}
				if (sb_nm2.length > 0 && f.fpsusername)
				{
					f.fpsusername.value = sb_nm2;
					f.fpsusername.readOnly=true;
					f.fpsusername.style.border="none";
				}
			}
		}
		sb_p2 = sb_c.indexOf("%2E", sb_p+3);
		if (sb_p2 - sb_p == 11)
		{
			sb_pi = sb_c.substr(sb_p+3,8);
			prefillpi(sb_pi);
		}
		else
		{
			sb_id = "";
			sb_p = sb_c.indexOf("%2E", sb_p2+3);
			if (sb_p - sb_p2 == 11) 
				sb_id = sb_c.substr(sb_p2+3,8);
			else
			{
				sb_p2 = sb_c.indexOf("%2E", sb_p+3);
				if (sb_p2 - sb_p == 11)
					sb_id = sb_c.substr(sb_p+3,8);
				else
				{
					sb_p = sb_c.indexOf("%2E", sb_p2+3);
					if (sb_p - sb_p2 == 11) sb_id = sb_c.substr(sb_p2+3,8);
				}
			}
			if (sb_id.length == 8) prefillstaffid(sb_id);
		}
	}
	
	if (sb_ss != "")
	{
		if (window.XMLHttpRequest)
			http_request = new XMLHttpRequest(); 
		else if (window.ActiveXObject)
			http_request = new ActiveXObject("Microsoft.XMLHTTP");
		if (http_request != null)
		{
			http_request.onreadystatechange = alertContents;
			http_request.open("GET", "/includes/fps-getdetailsproxy.php?ss=" + sb_ss, true);
			http_request.send(null); 
		}
	}
}

function alertContents()
{
	if (http_request.readyState == 4)
	{
		if (http_request.status == 200)
		{
			var f = document.forms["theform"];
			if (f == null) return true;
			if (http_request.responseText.length > 4 && http_request.responseText.charAt(0) == '/')
			{
				if (f.fpsemailaddress) f.fpsemailaddress.value = findvalue(http_request.responseText, "email");
				r = findvalue(http_request.responseText, "region");
				if (r >= 1 && r <= 13) setregion(r);
			}
		}
	}
}

function findvalue(s, v)
{
	i = s.indexOf("<" + v + " ");
	if (i < 0) return "";
	i += v.length + 2;
	j = s.indexOf(">", i);
	if (j < 0) return "";
	return s.substr(i, j-i);
}

function validate()
{
	var f = document.forms["theform"];
	if (f == null) return true;
	
	if (f.fpsusername)
	{
		x = f.fpsusername.value.replace(/^\s*/, "").replace(/\s*$/, "");
		if (x.length < 2)
		{
			alert("Please enter your name.");
			return false;
		}
	}

	if (f.fpsemailaddress)
	{
		x = f.fpsemailaddress.value.replace(/^\s*/, "").replace(/\s*$/, "");
		if (iss4ValidateEmail(x) == false)
		{
			alert("Please ensure your email address is entered correctly.");
			return false;
		}
	}
	
	var nf = f.fpsp6.value;
	for (i=1 ; i <= nf ; i++)
	{
		if (validatefield(i, f) == false) return false;
	}
	
	return true;
}

function validatefield(i, f)
{
	var x = f.elements["fpsb" + i].value;
	var c = x.charAt(0);
	x = x.substr(1);
	if (c == 'A') return validatefield4(i, f, x);
	if (c == 'B') return validatefield7(i, f, x);
	if (c == 'D' && x.charAt(0) == 'Y') return validatefield9(i, f, x);
	if (c == 'E' && x.charAt(0) == 'Y') return validatefield11(i, f, x);
	if (c == 'F') return validatefield13(i, f, x);
	if (c == 'H' && x.charAt(0) == 'Y') return validatefield9(i, f, x);
	if (c == 'I') return validatefield17(i, f, x.charAt(0));
	return true;
}

function validatefield4(i, f, p)
{
	var y = f.elements["fpsa" + i].value.replace(/^\s*/, "").replace(/\s*$/, "");
	i = p.indexOf(",");
	if (i < 0) return true;
	m = p.substr(0,i);
	if (y.length < m)
	{
		p = p.substr(i+1);
		i = p.indexOf("b9F4");
		if (i > 0) p = p.substr(0,i);
		alert("You must enter at least " + m + " characters for \"" + p + "\"");
		return false;
	}
	return true;
}

function validatefield7(i, f, p)
{
	var y = f.elements["fpsa" + i].value.replace(/^\s*/, "").replace(/\s*$/, "");
	i = p.indexOf(",");
	if (i < 0) return true;
	j = p.indexOf(",", i+1);
	if (j < 0) return true;
	m = p.substr(0,i);
	p = p.substr(j+1);
	k = p.indexOf("b9F4");
	if (k > 0) p = p.substr(0,k);
	if (y.length < m)
	{
		alert("You must enter at least " + m + " characters for \"" + p + "\"");
		return false;
	}
	m = p.substr(i+1,j-i-1);
	if (y.length > m)
	{
		alert("Please reduce the number of characters for \"" + p + "\".\r\nYou have entered " + y.length + " but there is a limit of " + m + ".");
		return false;
	}
	return true;
}

function validatefield9(i, f, p)
{
	var y = f.elements["fpsa" + i].selectedIndex;
	if (y == 0)
	{
		p = p.substr(1);
		i = p.indexOf("b9F4");
		if (i > 0) p = p.substr(0,i);
		alert("You must select an item for \"" + p + "\"");
		return false;
	}
	return true;
}

function validatefield11(i, f, p)
{
	for (j=0 ; j < 999 ; j++)
	{
		y = f.elements["fpsa" + i][j];
		if (y == null) break;
		if (y.checked) return true;

	}
	
	p = p.substr(1);
	i = p.indexOf("b9F4");
	if (i > 0) p = p.substr(0,i);
	alert("You must select an item for \"" + p + "\"");
	return false;
}

function validatefield13(i, f, p)
{
	var pi = f.elements["fpsa" + i].value.replace(/^\s*/, "").replace(/\s*$/, "").toUpperCase();
	if (pi.length == 0)
	{
		if (p.charAt(0) == 'Y')
		{
			alert("You must enter your Personal Identifier.");
			return false;
		}
		else
			return true;
	}
	
	if (pi.length != 8)
	{
		alert("Your Personal Identifier is not the correct length.");
		return false;
	}
	
	c = pi.charAt(0);
	if (c < 'A' || c > 'Z')
	{
		alert("Your Personal Identifier is not correct.");
		return false;
	}
	
	for (i=1 ; i < 7 ; i++)
	{
		c = pi.charAt(i);
		if (c < '0' || c > '9')
		{
			alert("Your Personal Identifier is not correct.");
			return false;
		}
	}
	
	c = pi.charAt(7);
	if ((c < '0' || c > '9') && c != 'X')
	{
		alert("Your Personal Identifier is not correct.");
		return false;
	}
		
	return true;
}

function prefillpi(pi)
{
	var f = document.forms["theform"];
	if (f == null) return true;
	
	var nf = f.fpsp6.value;
	for (i=1 ; i <= nf ; i++)
	{
		x = f.elements["fpsb" + i].value;
		c = x.charAt(0);
		if (c == 'F') 
		{
			f.elements["fpsa" + i].value = pi;
			f.elements["fpsa" + i].readOnly=true;
			f.elements["fpsa" + i].style.border="none";
		}

	}
}

function setregion(r)
{
	var f = document.forms["theform"];
	if (f == null) return;
	
	var nf = f.fpsp6.value;
	for (i=1 ; i <= nf ; i++)
	{
		x = f.elements["fpsb" + i].value;
		if (x.charAt(0) == 'H') f.elements["fpsa" + i].selectedIndex = r;
	}
}

function validatefield17(i, f, p)
{
	var pi = f.elements["fpsa" + i].value.replace(/^\s*/, "").replace(/\s*$/, "").toUpperCase();
	if (pi.length == 0)
	{
		if (p == "Y")
		{
			alert("You must enter your Staff ID.");
			return false;
		}
		else
			return true;
	}
	
	if (pi.length != 8)
	{
		alert("Your staff ID is not the correct length of 8 characters.");
		return false;
	}
			
	return true;
}

function prefillstaffid(id)
{
	var f = document.forms["theform"];
	if (f == null) return true;
	
	var nf = f.fpsp6.value;
	for (i=1 ; i <= nf ; i++)
	{
		x = f.elements["fpsb" + i].value;
		c = x.charAt(0);
		if (c == 'I') 
		{
			f.elements["fpsa" + i].value = id;
			f.elements["fpsa" + i].readOnly=true;
			f.elements["fpsa" + i].style.border="none";
		}
	}
}
