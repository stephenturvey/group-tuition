// AJAX and toggle functionality
$(function() {

        // Reorder the HP DOM elements if viewing on a small screen (mobile)
        if ( $.isMobile() ) {
	        if ( window.matchMedia( 'only screen and (max-width: 640px)' ).matches ) {
		        var $middleColumn = $( 'div.ou-c2of3' );
		        var $middleColumnClone = $middleColumn.clone();
        		
		        var $rightColumn = $( 'div.ou-c3of3' );
		        var $rightColumnClone = $rightColumn.clone();
        		
		        var $profileBox = $( 'div.box.personal-panel' );
		        var $profileBoxClone = $profileBox
			        .clone()
				        .removeClass( 'attached' )
				        .addClass( 'type2' )
				        .find( 'div.psp-icons' )
					        .removeClass( 'psp-icons' )
						        .end();
        												
		        var $boxType5 = $middleColumnClone.find( 'div.box.type5' );
		        var $boxType5Clone = $boxType5.clone();
        		
		        // Content blocks
		        $profileBox.remove();
		        $middleColumnClone.prepend( $profileBoxClone );
        		
		        $boxType5.remove();
		        $middleColumnClone.prepend( $boxType5Clone );
        		
		        // Column blocks
		        $rightColumn.remove();
		        $( '#ou-content div.ou-grid:first' ).prepend( $rightColumnClone );
        		
		        $middleColumn.remove();
		        $( '#ou-content div.ou-grid:first' ).prepend( $middleColumnClone );
	        }
        }


		$( '.news2 a.remove' ).click( function() {
		       var $id = $(this).attr('id');
               $(this).parent('li').fadeOut( 400, function() {
                              $(this).remove(); // Remove from the DOM
                              hide($id); // Send AJAX request to hide this news post
               });

               return false;
        } );

		$( 'div.spotlight div.ad' ).ouCarousel( {
			aspectRatio: 0.67
		} );

        var state = $('#collapsed').text();

		$('.toggle-link').each(function() {
        
        var $id = $(this).attr('id');

        if(typeof $(this).attr('id') != "undefined" && $id != "") {

	            $id = $(this).attr('id');

	            $(this).data( '$tc', $(this).parent().next()).click( function() {
					        $(this).toggleClass( 'expand-icon' )
					        .data( '$tc' ).slideToggle( 'fast', function() { 
						        if ($(this).is(':hidden')) 
						        {
							        update($id);
						        } 
						        else 
						        {
							        update($id);
						        }
					        });

					        return false; 
	        		});
	        		
        			if (state.indexOf($id) != -1)
			        {
			            $("#" + $id).parent().next().css('display','block');
			            $("#" + $id).addClass('expand-icon');
			        }
    		}
        });
        
        function update(ElementId ) 
        { 
            var xmlHttpReq= createXMLHttpRequest();
            xmlHttpReq.open("POST", "homepagehandler.aspx?section=" + ElementId , false);
            xmlHttpReq.onreadystatechange = function() {if (xmlHttpReq.readyState != 4)  { return; }
                                               var serverResponse = xmlHttpReq.responseText;
                                            }
            xmlHttpReq.send();
        }

        function createXMLHttpRequest() {
           try { return new XMLHttpRequest(); } catch(e) {}
           try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
           try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
           return null;
         }

});