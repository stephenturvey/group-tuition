(function($){

	//Constants
	var DATA_CONTEXT_DATA = 'OU_ContextData';
	var DATA_KEY_DATA = 'OU_KeyData';
	var DATA_DEFAULT_FORM_DATA = 'OU_DefaultContextData';
	var DATA_SELECTED_ITEM = 'OU_SelectedItem';
	
	$.fn.extend(
	{
		AddContextForm: function(options)
		{
			//Set default options
			var defaults = 
			{
				ContextForm: $('#ContextForm'), 
				CreateButton: $('#ContextCreateButton'), 
				UpdateButton: $('#ContextUpdateButton'), 
				DeleteButton: $('#ContextDeleteButton'), 
				AnimationSpeed: 'fast',
				DefaultContextData: null, 
				ValidateContextForm: function(){return true;}, 
				OnContextDataCreated: null,
				OnContextDataChanged: null,
				OnContextDataDeleted: null, 
				OnItemSelected: null
			};
			
			var o = $.extend(defaults, options);
			
			//Hide the context form
			o.ContextForm.hide();
			o.ContextForm.css('position', 'absolute');
			
			//Register contect form button click handlers
			o.CreateButton.click(SaveClickHandler);
			o.UpdateButton.click(SaveClickHandler);
			o.DeleteButton.click(DeleteClickHandler);
			
			//Create default form
			var data = ((o.DefaultContextData === null) ? CreateContextData(o.ContextForm) : o.DefaultContextData);
			o.ContextForm.data(DATA_DEFAULT_FORM_DATA, data);

            var repositionContextForm = function()
            {
                var item = o.ContextForm.data(DATA_SELECTED_ITEM);
				
				if((item !== undefined) && (item !== null))
					PositionContextForm(item);
            };

			//Register window resize event handler
			$(window).resize(repositionContextForm);
			
			//Register Poke handler (reposition context form)
			$.Poke = repositionContextForm;
			
			//Register click handler for all items
			return this.each(function()
			{	
				$(this).click(ItemClickHandler);
			});
			
			function ItemClickHandler()
			{	
				var item = $(this);
				
				if(item.hasClass('selected'))
				{
					o.ContextForm.hide(o.AnimationSpeed);
					item.removeClass('selected');
					return;
				}
				
				var prevSelectedItem = o.ContextForm.data(DATA_SELECTED_ITEM);
				
				if((prevSelectedItem !== null) && (prevSelectedItem !== undefined))
					prevSelectedItem.removeClass('selected');
					
				item.addClass('selected');
				o.ContextForm.hide();
				
				var defaultFormData = o.ContextForm.data(DATA_DEFAULT_FORM_DATA);
				var itemContextData = item.data(DATA_CONTEXT_DATA);
				
				o.ContextForm.data(DATA_SELECTED_ITEM, item);
				
				if(o.OnItemSelected !== null)
					o.OnItemSelected(item, itemContextData);
				
				if((itemContextData !== undefined) && (itemContextData !== null))
				{
					PopulateContextForm(itemContextData);
					o.UpdateButton.show();
					o.DeleteButton.show();
					o.CreateButton.hide();
				}
				else
				{
					PopulateContextForm(defaultFormData);
					o.UpdateButton.hide();
					o.DeleteButton.hide();
					o.CreateButton.show();
				}
				
				PositionContextForm(item);
				o.ContextForm.show(o.AnimationSpeed);
			}
			
			function SaveClickHandler(event)
			{
				event.preventDefault();
			
				var item = o.ContextForm.data(DATA_SELECTED_ITEM);
				
				if(!o.ValidateContextForm(item)) return;
				
				var contextData = CreateContextData(o.ContextForm);
				var originalData = item.data(DATA_CONTEXT_DATA);
				
				var actionCompletedCallback = function(result, updateCtxData)
				{
					if(result === true)
						o.ContextForm.hide(o.AnimationSpeed);
						
					if(updateCtxData === true)
					    item.data(DATA_CONTEXT_DATA, contextData);
				};
				
				//Raise data created/updated events
				var data = $.extend(GetItemKeyData(item), contextData);
				if((originalData !== null) && (originalData !== undefined))
				{
					if(o.OnContextDataChanged !== null)
						o.OnContextDataChanged(item, data, actionCompletedCallback);
				}
				else
				{
					if(o.OnContextDataCreated !== null)
						o.OnContextDataCreated(item, data, actionCompletedCallback);
				}
			}
			
			function DeleteClickHandler(event)
			{
				event.preventDefault();
			
				var item = o.ContextForm.data(DATA_SELECTED_ITEM);
				
				var actionCompletedCallback = function(result)
				{
					if(result === true)
					{
						item.data(DATA_CONTEXT_DATA, null);
						o.ContextForm.hide(o.AnimationSpeed);				
					}
				};
				
				if(o.OnContextDataDeleted !== null)
				{
					var keyData = GetItemKeyData(item);
						o.OnContextDataDeleted(item, keyData, actionCompletedCallback);
				}
			}
			
			function PopulateContextForm(data)
			{
				var inputs = o.ContextForm.find('form :input');
				
				inputs.each(function()
				{
					var input = $(this);
					
					var inputID = input.attr('id');
					input.val(data[inputID]);
				});
			}
			
			function CreateContextData(form)
			{
				var data = new Object();
				var inputs = o.ContextForm.find('form :input');
				
				inputs.each(function()
				{
					var input = $(this);
					
					var inputID = input.attr('id');
					data[inputID] = input.val();
				});
				
				return data;
			}
			
			function PositionContextForm(item)
			{
				var contextForm = o.ContextForm;
				
				var posX = item.position().left;
				var posY = item.position().top;
				
				var width = TotalWidth(item);
				var height = TotalHeight(item);
				
				var contextFormWidth = TotalWidth(contextForm);
				var contextFormHeight = TotalHeight(contextForm);
				
				var windowWidth = $(window).width();
				var windowHeight = $(window).height();
				
				var scrollTop = $(window).scrollTop();
				var scrollLeft = $(window).scrollLeft();
				
				var contextFormX = -5;
				var contextFormY = 0;
				
				//Vertical position of context form
				if((windowHeight + scrollTop) > (posY + height + contextFormHeight)) {contextFormY = posY + height;}		
				else{contextFormY = posY - contextFormHeight;}
				
				//Horizontal position of context form
				if((windowWidth + scrollLeft) > (posX + contextFormWidth)) {contextFormX = posX;}
				else{contextFormX = (posX + width) - contextFormWidth;}
				
				contextForm.css('left', contextFormX).css('top', contextFormY);
			}
			
			function TotalWidth(element)
			{
				var elem = $(element);
				var totalWidth = elem.width();
				
				totalWidth += ((isNaN(elem.css("padding-left").replace('px', '')) == false) ? parseInt(elem.css("padding-left").replace('px', '')) : 0);
				totalWidth += ((isNaN(elem.css("padding-right").replace('px', '')) == false) ? parseInt(elem.css("padding-right").replace('px', '')) : 0);
				
				totalWidth += ((isNaN(elem.css("margin-left").replace('px', '')) == false) ? parseInt(elem.css("margin-left").replace('px', '')) : 0);
				totalWidth += ((isNaN(elem.css("margin-right").replace('px', '')) == false) ? parseInt(elem.css("margin-right").replace('px', '')) : 0);
				
				totalWidth += ((isNaN(elem.css("borderLeftWidth").replace('px', '')) == false) ? parseInt(elem.css("borderLeftWidth").replace('px', '')) : 0);
				totalWidth += ((isNaN(elem.css("borderRightWidth").replace('px', '')) == false) ? parseInt(elem.css("borderRightWidth").replace('px', '')) : 0);
				
				return totalWidth;
			}
			
			function TotalHeight(element)
			{
				var elem = $(element);
				var totalHeight = elem.height();
				
				var paddingT = elem.css("padding-top");
				var paddingB = elem.css("padding-bottom");
				
				totalHeight += ((isNaN(elem.css("padding-top").replace('px', '')) == false) ? parseInt(elem.css("padding-top").replace('px', '')) : 0);
				totalHeight += ((isNaN(elem.css("padding-bottom").replace('px', '')) == false) ? parseInt(elem.css("padding-bottom").replace('px', '')) : 0);
				
				totalHeight += ((isNaN(elem.css("margin-top").replace('px', '')) == false) ? parseInt(elem.css("margin-top").replace('px', '')) : 0);
				totalHeight += ((isNaN(elem.css("margin-bottom").replace('px', '')) == false) ? parseInt(elem.css("margin-bottom").replace('px', '')) : 0);
				
				totalHeight += ((isNaN(elem.css("borderTopWidth").replace('px', '')) == false) ? parseInt(elem.css("borderTopWidth").replace('px', '')) : 0);
				totalHeight += ((isNaN(elem.css("borderBottomWidth").replace('px', '')) == false) ? parseInt(elem.css("borderBottomWidth").replace('px', '')) : 0);
				
				return totalHeight;
			}
		}, 
		SetKeyData: function(keyData)
		{
			return this.each(function()
			{
				var item = $(this);
				var itemKeyData = item.data(DATA_KEY_DATA);
				
				if((itemKeyData === undefined) || (itemKeyData === null))
					itemKeyData = new Array();
					
				itemKeyData.push(keyData);
				
				item.data(DATA_KEY_DATA, itemKeyData);
			});
		}, 
		SetContextData: function(keyData, contextData, callBack)
		{
			var matchedItems = new Array();
			
			this.each(function()
			{
				var item = $(this);
				var itemKeyData = GetItemKeyData(item);
				var match = true;
				
				for(keyDataProp in keyData)
					if(itemKeyData[keyDataProp] != keyData[keyDataProp])
					{
						match = false;
						break;
					}
					
				if(match === true)
					matchedItems.push(item);
			});
			
			for(index in matchedItems)
			{
				var matchedItem = matchedItems[index];
				
				matchedItem.data(DATA_CONTEXT_DATA ,contextData);
				callBack(matchedItem, contextData);
			}
			
			return this;
		}
	});
	
	function GetItemKeyData(item)
	{
		var itemKeyData = {};
		var keyDataArray = item.data(DATA_KEY_DATA);
		
		if((keyDataArray !== undefined) && (keyDataArray !== null))
			for(obj in keyDataArray)
				itemKeyData = $.extend(itemKeyData, keyDataArray[obj]);
				
		return itemKeyData;
	}
})(jQuery);