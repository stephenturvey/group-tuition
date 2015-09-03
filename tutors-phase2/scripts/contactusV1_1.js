$(document).ready(function () {
    $(contactus);
    $('img.normalTip').aToolTip();
    $('#ctl00_MainContent_inpPCjava, #ctl00_MainContent_hidPCjava').val(deployJava.getJREs());
});

// Tool tip config

var tooltipdesc = new Array();
tooltipdesc[0] = "The company you use to provide access to the internet. eg Virgin, AOL, Orange, Work, etc";
tooltipdesc[1] = "In the Computer section, a number with either MHz or GHz next to it.";
tooltipdesc[2] = "In the Computer section, a number and two letters (KB or GB) followed by RAM.";
tooltipdesc[3] = "In the System section, a number preceded or following the letters SP, or following the words Service Packs.";
tooltipdesc[4] = "Click on the Start button and then on All Programs and see if any of the products listed in the drop down list appear.";
tooltipdesc[5] = "Click on the Start button and then on All Programs and see if any of the products listed on the drop down list appear.";
tooltipdesc[6] = "Click on Start then Control Panel then double click on Users and Passwords. If the group name next to the username you log in with is Administrator then the answer is Yes, otherwise it's No.";

var i = 0;
$('img.tooltip').each(function() {
    $(this).attr('title',tooltipdesc[i]);
    $(this).addClass('normalTip');
    i++;
});

var contactus = function() {

    $('body').addClass('ou ou-panels template-content');
    
    $('#ctl00_MainContent_selSubject').change(function() {
        
        if ($(this).val() == "Other")
        {
            $('#otherSubject').addClass('show');
        }
        else
        {
            $('#ctl00_MainContent_inpOtherSubject').val('');
            $('#otherSubject').removeClass('show');
        }
    });
    
    $('#ctl00_MainContent_selPCfirewall').change(function() {
    
        if ($(this).val() == "Other, please specify ->")
        {
            $('#ctl00_MainContent_inpPCfirewall').addClass('show');
        }
        else
        {
            $('#ctl00_MainContent_inpPCfirewall').val('');
            $('#ctl00_MainContent_inpPCfirewall').removeClass('show');
        }

    });

    $('#ctl00_MainContent_selPCvirus').change(function() {
    
        if ($(this).val() == "Other, please specify ->")
        {
            $('#ctl00_MainContent_inpPCvirus').addClass('show');
        }
        else
        {
            $('#ctl00_MainContent_inpPCvirus').val('');
            $('#ctl00_MainContent_inpPCvirus').removeClass('show');
        }
    
    });


    
}

// Page specific settings to be executed 

function validate()
{
	var f = document.forms["theform"];
	if (f.query.value.length < 5)
	{
		alert("Please enter your query in the space provided.");
		return false;
	}
	
	if (f.selSubject.selectedIndex == 0)
	{
		alert("Please select a subject for your query.");
		return false;
	}

	if (iss4ValidateEmail(f.email2.value) == false)
	{
		alert("Please enter a valid email address.");
		return false;
	}
	
	if (f.selSubject.options[f.selSubject.selectedIndex].text == "Other")
	{
		if (f.inpOtherSubject.value.length < 2)
		{
			alert("Please specify a subject for 'Other'");
			return false;
		}
	}

	return true;
}

