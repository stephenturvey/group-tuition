/*
 * TutorHome front-end
 */

var TH = {
	Pages: {},
	
	init: function() {
		thTopNavInit( $ );
		TH.common();
		TH.pageInit();
	},
	
	pageInit: function() {
		try {
			TH.Pages[ ouGlobals.pageId ].init();
		} catch( e ) {
			return false;
		}
		
		OUDebug.log( ouGlobals.pageId + ' controller loaded' );
	}
};

TH.common = function() {
	// Scripts that should run on every page
	
	OUCommon.load();
}

TH.Pages.Index = {
	init: function() {
		// Make the homepage boxes sortable
		$( 'body.home .side-panels, body.home .centre-panels' )
			.sortable( {
				'axis': 'y',
				'handle': 'h2', 
				'update': function( event, ui ) {
					// This is where you would save the new position of the box
				}
			} )
			.disableSelection()
			.find( '.box h2' )
				.css( 'cursor', 'move' );
		
		// Make the homepage boxes toggle
		$( 'body.home .toggle-content' ).prev().each( function() {
			var $h2 = $(this);
			
			$( '<a title="Show/hide" href="#" class="toggle-link">Toggle</a>' )
			.data( '$tc', $h2.next() )
			.click( function() {
				$(this).toggleClass( 'expand-icon' )
				.data( '$tc' ).slideToggle( 'fast' );
				
				return false;
			} )
			.appendTo( $h2 );
		} );
		
		$( '.news2 a.remove' ).click( function() {
			$(this).parent('li').fadeOut();
			return false;
		} );
		
		$( 'div.spotlight div.ad' ).ouCarousel( {
			aspectRatio: 0.67
		} );
	}
};

TH.Pages.AtoZ = {
	$: {},
	
	init: function() {
		this.$ = {
			azMenu: $( '#azmenu' ),
			azDirectory: $( '#azdirectory' )
		};
		
		this.$['azDirectory'].find( 'dt' ).each( function() {
			var $this = $(this);
			var $dd = $this.next();
			
			if ( $dd.text() == '' ) {
				$dd.remove();
				return true; // continue
			}
			
			$( '<a title="Show/hide" href="#" class="toggleme">Toggle</a>' )
				.click( TH.Pages.AtoZ._evtBtnToggleClick )
				.prependTo( $this );
		} );
		
		var $btnFilters = 
			$( '<div class="filters" />' )
				.insertAfter( this.$['azMenu'] );
		
		$( '<a class="button-filter-off expand" href="#"><em>Show descriptions</em></a>')
			.click( this._evtBtnFilterClick )
			.appendTo( $btnFilters );
		
		$( '<a class="button-filter-off collapse" href="#"><em>Hide descriptions</em></a>')
			.click( this._evtBtnFilterClick )
			.appendTo( $btnFilters );
	},
	
	_evtBtnToggleClick: function() {
		var $this = $(this);
		var $toggleMe = $this.parent().next();
		
		if ( $this.is( '.toggleme' ) ) {
			$toggleMe.slideDown( 120 );
			
			$this
				.addClass( 'toggleme-open' )
				.removeClass( 'toggleme' );
		} else {
			$toggleMe.slideUp( 120 );
			
			$this
				.addClass( 'toggleme' )
				.removeClass( 'toggleme-open' );
		}

		return false;
	},
	
	_evtBtnFilterClick: function() {
		var $this = $(this),
			$toggleUs = TH.Pages.AtoZ.$[ 'azDirectory' ].find( 'dd' ),
			$toggleBtns = TH.Pages.AtoZ.$[ 'azDirectory' ].find( 'a.toggleme, a.toggleme-open' );
		
		if ( $this.is( '.collapse' ) ) {
			$toggleUs.hide();
			
			$toggleBtns
				.addClass( 'toggleme' )
				.removeClass( 'toggleme-open' );
		} else {
			$toggleUs.show();
			
			$toggleBtns
				.addClass( 'toggleme-open' )
				.removeClass( 'toggleme' );
		}
		
		return false;
	}
};

TH.Pages.Sitemap = {
	$: {},
	
	init: function() {		
		this.$ = {
			ouSitemap: $( '.ou-sitemap:first' )
		};
		
		var $btnFilters = 
			$( '<div class="filters" />' )
				.insertBefore( $( '.ou-sitemap' ) );
		
		$( '<a class="button-filter-off expand" href="#"><em>Show all</em></a>')
			.click( this._evtBtnFilterClick )
			.appendTo( $btnFilters );
		
		$( '<a class="button-filter-off collapse" href="#"><em>Hide all</em></a>')
			.click( this._evtBtnFilterClick )
			.appendTo( $btnFilters );
		
		this.$['ouSitemap'].find( '> ul > li > a' ).addClass( 'top-level' );
		
		this.$['ouSitemap'].find( '> ul > li > ul li' ).each( function() {
			var $this = $(this),
				$a = $this.children( 'a:first' ),
				depth = $this.parentsUntil( '.ou-sitemap > ul', 'ul' ).length;
			
			if ( depth == 1 ) {
				$a.addClass( 'top-level' );
			}
			
			if ( $this.has( '> ul' ).length ) {
				var $toggleBtn =
					$( '<a title="Show/hide" href="#" class="toggleme">Toggle</a>' )
						.click( TH.Pages.Sitemap._evtBtnToggleClick );
				
				if ( depth == 1 ) {
					$toggleBtn.addClass( 'top-level' );
				}
				
				$toggleBtn.insertBefore( $a );
				
				$this.children( 'ul:first' ).hide();
			}
		} );
		
		TH.Pages.Sitemap.restoreToggleState();
	},
	
	saveToggleState: function() {
		if (typeof(Storage) !== "undefined") {
			var $openNodes = $( '.ou-sitemap a.toggleme-open' );
			var urls = [];
		
		  	$.each( $openNodes, function(i, v) {
				$this = $(this);
				urls.push( $this.siblings( 'a:first' ).attr( 'href' ) );
		  	} );
			
		  	sessionStorage.sitemapExpands = JSON.stringify( urls );
		}	
	}, 
	
	restoreToggleState: function() {
		if (typeof(Storage) !== "undefined") {
			if ( sessionStorage.sitemapExpands ) {
				var sitemapExpands = JSON.parse( sessionStorage.sitemapExpands );
				
				$.each(sitemapExpands, function(i, v) {
					var $link = $( '.ou-sitemap a[href="' + v + '"]' );
					var $handle = $link.prev( 'a.toggleme' );
					var $ul = $handle.siblings( 'ul:first' );
			
					$handle
						.addClass( 'toggleme-open' )
						.removeClass( 'toggleme' );
			
					$ul.show();
				});
			}
		}
	}, 
	
	_evtBtnToggleClick: function() {
		var $this = $(this),
			$ul = $this.siblings( 'ul:first' );
		
		if ( $this.is( '.toggleme' ) ) {
			$ul.slideDown( 160 );
			
			$this
				.addClass( 'toggleme-open' )
				.removeClass( 'toggleme' );
		} else {
			$ul.slideUp( 160 );
			
			$this
				.addClass( 'toggleme' )
				.removeClass( 'toggleme-open' );
		}
		
		TH.Pages.Sitemap.saveToggleState();
		
		return false;
	},
	
	_evtBtnFilterClick: function() {
		var $toggleUs = TH.Pages.Sitemap.$['ouSitemap'].find( '> ul > li > ul li > ul' ),
			$toggleBtns = TH.Pages.Sitemap.$['ouSitemap'].find( 'a.toggleme, a.toggleme-open' );
		
		if ( $(this).is( '.collapse' ) ) {
			$toggleUs.hide();
			
			$toggleBtns
				.addClass( 'toggleme' )
				.removeClass( 'toggleme-open' );
		} else {
			$toggleUs.show();
			
			$toggleBtns
				.addClass( 'toggleme-open' )
				.removeClass( 'toggleme' );
		}
		
		TH.Pages.Sitemap.saveToggleState();
		
		return false;
	}
}

TH.Pages.Quickfind = {
	init: function() {
		var $quickFind = $( '#quickSearch' ).ouQuickFind();
		if ( ! location.search ) $quickFind.focus();
	}
};

TH.Pages.Tutoring = {
	init: function() {
		$( 'div.spotlight div.ad' ).ouCarousel();
	}
}

TH.Pages.AL_Development = {
	init: function() {
		$( 'div.spotlight div.ad' ).ouCarousel();
	}
}

TH.Pages.Employment = {
	init: function() {
		$( 'div.spotlight div.ad' ).ouCarousel();
	}
}

TH.Pages.People_and_places = {
	init: function() {
		$( 'div.spotlight div.ad' ).ouCarousel();
	}
}

TH.Pages.News = {
	init: function() {
		$( 'div.spotlight div.ad' ).ouCarousel();
	}
}


$( TH.init );


// TutorHome QuickFind

( function( $ ) {
	$.fn.ouQuickFind = function() {
		return this.each( function() {
			var $this = $(this);
			
			$this
			.attr( 'placeholder', 'Search...' )
			.autocomplete( {
				autoFocus: false,
				delay: 50,
				
				source: function( request, callback ) {
					$.ajax( {
						cache: false,
						type: 'GET',
						url: '?json=1',
						data: { term: request.term },
						
						success: function( srvResp ) {
							var results = [];
							
							for ( var i in srvResp ) {
								results.push( {
									label: srvResp[i].page_title,
									value: srvResp[i].page_link
								} );
							}
							
							callback( results );
						}
					} );
				},
				
				select: function( evt, ui ) {
					$.ajax( {
						cache: false,
						type: 'POST',
						url: '?suggestLog=1',
						data: {
							term: $(this).val(),
							suggestUrl: ui.item.value
						},
						
						success: function( srvResp ) {
							window.location.href = ui.item.value;
						}
					} );
					
					return false;
				},
				
				focus: function( evt, ui ) {
					return false;
				}
			} );
		} );
	};
} )( jQuery );