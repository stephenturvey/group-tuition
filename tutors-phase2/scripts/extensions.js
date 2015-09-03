$(document).ready(function()
{	
	var defaultErrorMsg = "An unexpected error has occured. The requested action could not be performed. Please try again later.";
	var confirmDeleteMsg = "Delete this extension?";
	var confirmRequestMsg = "The extension you are requesting must be centrally authorised. Untill this has happened the extension will not appear on this page. Are you sure you wish to send a request to authorise this extension?";
	
	//Set global AJAX config
	$.ajaxSetup({
	    timeout: 8000
	});

	//Set up date picker
	$('#extensionDate').datepicker({ dateFormat: 'dd-M-yy', 
		 onSelect: function(dateText, inst) {

		    $('#ui-datepicker-div').removeClass('ui-helper-hidden-accessible');

			var cutoffDate = $('#cutoff').html();
			var extensionDate = ParseDate(dateText);
			
			var maxDate = ParseDate(cutoffDate);
			maxDate.setDate(maxDate.getDate() + MAX_TUTOR_EXT_DAYS);
			
			var ext = $('#divDescription, #divRegion');
			if(extensionDate > maxDate) {ext.show();}
			else {ext.hide();}
		 }
	});
	
	//Create context form
	$('td.cell').AddContextForm(
	{
		DefaultContextData: 
			{
				extensionDate: '', 
				reason: ''
			}, 
		OnContextDataCreated: function(item, contextData, completedCallback)
		{	
			var doAjaxSave = function(action)
			{
				$('#loader').removeClass('updateDelete').show();
			
				//AJAX Save contextData
				$.ajax({
					url: "extensionsHandler.ashx",
					type: "POST",
					data: ({Action: action, JSONData: JSON.stringify(contextData)}),
					success: function(json)
					{
						var result = jQuery.parseJSON(json);
						$('#loader').hide();
						
						if(result.WasSuccessful)
						{
		                    var updateCtxData = false;
		                    
							if(action == 'CREATE')
							{
								item.html(contextData.extensionDate);
								updateCtxData = true;
							}
							
							completedCallback(true, updateCtxData);
							$.unblockUI();
						}
						else
						{
							if((result.ErrorMessages !== null) && (result.ErrorMessages.length > 0)){
								OnAjaxError(result.ErrorMessages);
							}
							else {
								OnAjaxError([defaultErrorMsg]);
							}
						}
					},
					error: function(msg){
						OnAjaxError([defaultErrorMsg]);
					}
				});
			}
		
			//Check if we are creating or requesting an extension
			var cutoffDate = item.data('OU_CutoffDate');
			var extensionDate = ParseDate(contextData.extensionDate);
			var maxTutorDate = ParseDate(cutoffDate);
			
			maxTutorDate.setDate(maxTutorDate.getDate() + MAX_TUTOR_EXT_DAYS);
			
			if(extensionDate > maxTutorDate)
			{
				//REQUEST
				if(($.browser.msie) && ($.browser.version == '7.0'))
				{
					var result = confirm(confirmRequestMsg);
					if(result==true) doAjaxSave('REQUEST');
				}
				else
				{
					$('#confirm span').html(confirmRequestMsg);
					$('#ContextForm').block({message: $('#confirm'),
										 css:{width: '80%',
											  borderWidth: '3px',
											  backgroundColor: '#EEEEEE',
											  borderRadius: '5px'},
										 overlayCSS: {backgroundColor: '#555555',
													  opacity: 0.9,
													  borderRadius: '4px'}
										});
				
					$.blockUI({message: null, overlayCSS: {opacity: 0.0}});
					
					$('#yes').unbind();
					$('#yes').click(function()
					{
						$('#ContextForm').unblock(
						{
							onUnblock: function(){
								$('#loader').addClass('updateDelete').show();
								doAjaxSave('REQUEST');
						}});
					});
				}
			}
			else
			{
				//CREATE
				$.blockUI({message: null, overlayCSS: {opacity: 0.0}});
				doAjaxSave('CREATE');
			}
		}, 
		OnContextDataChanged: function(item, contextData, completedCallback)
		{
			$.blockUI({message: null, overlayCSS: {opacity: 0.0}});
			$('#loader').addClass('updateDelete').show();
			
			//AJAX Save contextData
			$.ajax({
				url: "extensionsHandler.ashx",
				type: "POST", 
				data: ({Action: 'UPDATE', JSONData: JSON.stringify(contextData)}),
				success: function(json)
				{
					var result = jQuery.parseJSON(json);
					$('#loader').hide();
					
					if(result.WasSuccessful)
					{
						item.html(contextData.extensionDate);
						completedCallback(true, true);
					}
					else
					{
						if((result.ErrorMessages !== null) && (result.ErrorMessages.length > 0)){
							OnAjaxError(result.ErrorMessages);
						}
						else {
							OnAjaxError([defaultErrorMsg]);
						}
					}
					
					$.unblockUI();
				}, 
				error: function(msg)
				{
					OnAjaxError([defaultErrorMsg]);
				}
			});
		}, 
		OnContextDataDeleted: function(item, keyData, completedCallback)
		{
			var doAjaxDelete = function()
			{
				$.ajax({
					url: "extensionsHandler.ashx",
					type: "POST",
					data: ({Action: 'DELETE', JSONData: JSON.stringify(keyData)}),
					success: function(json)
					{
						var result = jQuery.parseJSON(json);
						
						$('#loader').hide();
						
						if(result.WasSuccessful)
						{
							item.html('');
							completedCallback(true, true);
						}
						else
						{
							if((result.ErrorMessages !== null) && (result.ErrorMessages.length > 0)){
								OnAjaxError(result.ErrorMessages);
							}
							else {
								OnAjaxError([defaultErrorMsg]);
							}
						}
						
						$.unblockUI();
					}, 
					error: function(msg)
					{
						OnAjaxError([defaultErrorMsg]);
					}
				});
			};
			
			if(($.browser.msie) && ($.browser.version == '7.0'))
			{
				var result = confirm(confirmDeleteMsg);
				
				if(result==true)
				{
					$.blockUI({message: null, overlayCSS: {opacity: 0.0}});
					$('#loader').addClass('updateDelete').show();
					doAjaxDelete();
				}
			}
			else
			{
				$('#confirm span').html(confirmDeleteMsg);
				$('#ContextForm').block({message: $('#confirm'), 
										 css:{width: '80%',
											  borderWidth: '3px',
											  backgroundColor: '#EEEEEE',
											  borderRadius: '5px'},
										 overlayCSS: {backgroundColor: '#555555',
													  opacity: 0.9,
													  borderRadius: '4px'}
										});
				
				$.blockUI({message: null, overlayCSS: {opacity: 0.0}});
				
				$('#yes').unbind();
				$('#yes').click(function()
				{
					$('#ContextForm').unblock({
						onUnblock: function()
						{
							$('#loader').addClass('updateDelete').show();
							doAjaxDelete();
						}
					});
				});
			}
		}, 
		OnItemSelected: function(item, data, e)
		{	
		    //Reset input form
			$('.validationMessage').hide();
			$('#divDescription, #divRegion').hide();
			$('#region').val('');
			$('#description').val('');
			$('#charsLeft').html(100);
			
			var cutoffDate = item.data('OU_CutoffDate');
			$('#cutoff').html(cutoffDate);
			
			var minDate = ParseDate(cutoffDate);
			var maxDate = ParseDate(cutoffDate);
			
			minDate.setDate(minDate.getDate() + 1);
			
			//Set Create/Update date limits
			if((data !== undefined) && (data !== null))
			    {maxDate.setDate(maxDate.getDate() + MAX_TUTOR_EXT_DAYS);}
			else
			    {maxDate.setDate(maxDate.getDate() + MAX_ADMIN_EXT_DAYS);}
			
			$('#extensionDate').datepicker("option", "minDate", minDate );
			$('#extensionDate').datepicker("option", "maxDate", maxDate );
		}, 
		ValidateContextForm: function(item)
		{
			var validated = true;
			$('.validationMessage').hide();
			$('.validationMessage').html('');
			
			//Validate extension date
			if($('#extensionDate').val() === '')
			{
				$('#valDatepicker').html('*Mandatory');
				$('#valDatepicker').show();
				validated = false;
			}
	
			//Check date ranges
			var cutoffDate = item.data('OU_CutoffDate');
			var extensionDate = ParseDate($('#extensionDate').val());
			
			//Check for valid date
			if(isNaN(extensionDate.getTime()))
			{
				$('#valDatepicker').html('*Please use: dd-MMM-yyyy');
				$('#valDatepicker').show();
				validated = false;
			}
			
			var minDate = ParseDate(cutoffDate);
			var maxTutorDate = ParseDate(cutoffDate);
			var maxAdminDate = ParseDate(cutoffDate);
			
			minDate.setDate(minDate.getDate() + 1);
			maxTutorDate.setDate(maxTutorDate.getDate() + MAX_TUTOR_EXT_DAYS);
			maxAdminDate.setDate(maxAdminDate.getDate() + MAX_ADMIN_EXT_DAYS);
			
			if((extensionDate < minDate) || (extensionDate > maxAdminDate))
			{
				$('#valDatepicker').html('*Invalid date');
				$('#valDatepicker').show();
				validated = false;
			}
			
			//validate reason cat
			if($('#reason').val() === '')
			{
				$('#valReason').html('*Mandatory');
				$('#valReason').show();
				validated = false;
			}
			
			//Description and region code mandatory if extension date is greater than maxTutorDays
			if(extensionDate > maxTutorDate)
			{
			    if($('#region').val() === '')
			    {
			        $('#valRegion').html('*Mandatory');
				    $('#valRegion').show();
				    validated = false;
				}
			
				if($('#description').val() === '')
				{
					$('#valDescription').html('*Mandatory');
					$('#valDescription').show();
					validated = false;
				}
			}
			
			return validated;
		}
	});
	
	//Limit text input in the description area
	$('#description').keyup(function()
	{
	    var length = $(this).val().length;
	    
	    if(length > 100)
	        {$(this).val($(this).val().substring(0, 100));}
	        
	    if(length <= 100)
	        {$('#charsLeft').html(100 - length);}
	    else
	        {$('#charsLeft').html(0);}
	});
	
	$('#ContextForm img').click(function()
	{
		$('td.selected').removeClass('selected');
		$('#ContextForm').hide('fast');
	});
	
	$('#instructions a').click(function()
	{
		var link = $(this);
		var speed = 200;
		
		if(($.browser.msie) && ($.browser.version == '7.0'))
			speed = 0;
		
		$('#instructions div.toggle').toggle(speed, function()
		{
		    //Reposition the context form
		    $.Poke();
		    
			var isOpen = link.data('_open');
			
			if(isOpen)
			{
				link.removeClass('open');
				link.html('Show Instructions...');
			}
			else
			{
				link.addClass('open');
				link.html('Instructions');
			}
				
			isOpen = !isOpen;
			link.data('_open', isOpen);
		});
	});
	
	//Regiter confirmation dialog button click behaviours	
	$('#no').click(function()
	{
		$('#ContextForm').unblock();
		$.unblockUI();
	});
	
	$('#ok').click(function()
	{
		$('#ContextForm').unblock();
		$.unblockUI();
	});

	function ParseDate(dateString)
	{
		var split = dateString.split("-");
		var newDateString = (split[0] + ' ' + split[1] + ', ' + split[2]);
		
		return new Date(newDateString);
	}
	
	function OnAjaxError(messages)
	{
		$('#loader').hide();
	
		if(($.browser.msie) && ($.browser.version == '7.0'))
		{
			alert(messages[0]);
			$.unblockUI();
		}
		else
		{		
			var dialog = $('#ajaxErrorModal');
			$.unblockUI();
			$('#errorMsg').html(messages[0]);
			$('#ContextForm').block({message: dialog, 
											 css:{width: '80%', 
												  borderWidth: '3px', 
												  backgroundColor: '#EEEEEE', 
												  borderRadius: '5px'}, 
											 overlayCSS: {backgroundColor: '#555555', 
														  opacity: 0.9, 
														  borderRadius: '4px'}
											});
											
			$.blockUI({message: null, overlayCSS: {opacity: 0.0}});
		}
	}
});

