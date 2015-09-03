/* ####### OU Common - Dependencies ####### */

if ( ! !! window._ouCommonDependenciesLoaded ) {
	( function() {
		( function( $ ) {
			$.extend( {
				isMobile: function() {
					return ( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent ) );
				},
				
				isTouchDevice: function() { 
					try {  
						document.createEvent( 'TouchEvent' );
						return true;  
					} catch (e) {  
						return false;  
					}  
				}
			} );
			
			$.fn.isScrolledIntoView = function() {
				if ( ! this.is( ':visible' ) ) {
					return false;
				}
				
				var $window			= $( window ),
					docViewTop 		= $window.scrollTop(),
					docViewBottom 	= docViewTop + $window.height(),
					elemTop 		= this.offset().top,
					elemBottom 		= elemTop + this.height();
				
				return ( ( elemBottom > docViewTop ) && ( elemTop < docViewBottom ) );
			}
		} )( jQuery );
		
		
		// https://github.com/carhartl/jquery-cookie
		
		(function(f,b,g){var a=/\+/g;function e(h){return h}function c(h){return decodeURIComponent(h.replace(a," "))}var d=f.cookie=function(p,o,u){if(o!==g){u=f.extend({},d.defaults,u);if(o===null){u.expires=-1}if(typeof u.expires==="number"){var q=u.expires,s=u.expires=new Date();s.setDate(s.getDate()+q)}o=d.json?JSON.stringify(o):String(o);return(b.cookie=[encodeURIComponent(p),"=",d.raw?o:encodeURIComponent(o),u.expires?"; expires="+u.expires.toUTCString():"",u.path?"; path="+u.path:"",u.domain?"; domain="+u.domain:"",u.secure?"; secure":""].join(""))}var h=d.raw?e:c;var r=b.cookie.split("; ");for(var n=0,k=r.length;n<k;n++){var m=r[n].split("=");if(h(m.shift())===p){var j=h(m.join("="));return d.json?JSON.parse(j):j}}return null};d.defaults={};f.removeCookie=function(i,h){if(f.cookie(i)!==null){f.cookie(i,null,h);return true}return false}})(jQuery,document);
		
		
		/* JSON2.js - For IE7 */
		
		if(typeof JSON!=="object"){JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());
		
		
		// http://gsgd.co.uk/sandbox/jquery/easing/
		
		jQuery.easing.jswing=jQuery.easing.swing;
		jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a+c:
		b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,a,c,b,d){return-b*Math.cos(a/
		d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return 0==a?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){return 0==a?c:a==d?c+b:1>(a/=d/2)?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c},easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*
		a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){return 1>(a/=d/2)?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(1==(a/=d))return c+b;f||(f=0.3*d);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f))+c},easeOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(1==
		(a/=d))return c+b;f||(f=0.3*d);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(0==a)return c;if(2==(a/=d/2))return c+b;f||(f=d*0.3*1.5);g<Math.abs(b)?(g=b,e=f/4):e=f/(2*Math.PI)*Math.asin(b/g);return 1>a?-0.5*g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+c:0.5*g*Math.pow(2,-10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInBack:function(e,a,c,b,d,f){void 0==
		f&&(f=1.70158);return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){void 0==f&&(f=1.70158);return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){void 0==f&&(f=1.70158);return 1>(a/=d/2)?b/2*a*a*(((f*=1.525)+1)*a-f)+c:b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?
		b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){return a<d/2?0.5*jQuery.easing.easeInBounce(e,2*a,0,b,d)+c:0.5*jQuery.easing.easeOutBounce(e,2*a-d,0,b,d)+0.5*b+c}});
		
		
		// https://github.com/stephband/jquery.event.move
		
		(function(d){"function"===typeof define&&define.amd?define(["jquery"],d):d(jQuery)})(function(d,h){function I(a){function b(){d?(c(),J(b),e=!0,d=!1):e=!1}var c=a,d=!1,e=!1;this.kick=function(){d=!0;e||b()};this.end=function(a){var b=c;a&&(e?(c=d?function(){b();a()}:a,d=!0):a())}}function K(){return!0}function n(){return!1}function p(a){a.preventDefault()}function q(a){r[a.target.tagName.toLowerCase()]||a.preventDefault()}function k(a,b){var c,d;if(a.identifiedTouch)return a.identifiedTouch(b);c=-1;
		for(d=a.length;++c<d;)if(a[c].identifier===b)return a[c]}function s(a,b){var c=k(a.changedTouches,b.identifier);if(c&&!(c.pageX===b.pageX&&c.pageY===b.pageY))return c}function t(a){u(a,a.data,a,v)}function w(){v()}function v(){e(document,g.move,t);e(document,g.cancel,w)}function x(a){var b=a.data,c=s(a,b);c&&u(a,b,c,y)}function z(a){var b=a.data;k(a.changedTouches,b.identifier)&&y(b.identifier)}function y(a){e(document,"."+a,x);e(document,"."+a,z)}function u(a,b,c,e){var f=c.pageX-b.startX,g=c.pageY-
		b.startY;if(!(f*f+g*g<A*A)){var j,h;j=a.targetTouches;h=a.timeStamp-b.timeStamp;b.type="movestart";b.distX=f;b.distY=g;b.deltaX=f;b.deltaY=g;b.pageX=c.pageX;b.pageY=c.pageY;b.velocityX=f/h;b.velocityY=g/h;b.targetTouches=j;b.finger=j?j.length:1;b._handled=L;b._preventTouchmoveDefault=function(){a.preventDefault()};d.event.trigger(b,void 0,b.target);e(b.identifier)}}function L(){this._handled=K;return!1}function B(a){a._handled()}function C(a){D(a.data.event,a,a.timeStamp,a.data.timer)}function E(a){var b=
		a.data.event;a=a.data.timer;e(document,g.move,C);e(document,g.end,E);F(b,a,function(){setTimeout(function(){e(b.target,"click",n)},0)})}function G(a){var b=a.data.event,c=a.data.timer,d=s(a,b);d&&(a.preventDefault(),b.targetTouches=a.targetTouches,D(b,d,a.timeStamp,c))}function H(a){var b=a.data.event,c=a.data.timer;k(a.changedTouches,b.identifier)&&(e(document,"."+b.identifier,G),e(document,"."+b.identifier,H),F(b,c))}function D(a,b,c,d){c-=a.timeStamp;a.type="move";a.distX=b.pageX-a.startX;a.distY=
		b.pageY-a.startY;a.deltaX=b.pageX-a.pageX;a.deltaY=b.pageY-a.pageY;a.velocityX=0.3*a.velocityX+0.7*a.deltaX/c;a.velocityY=0.3*a.velocityY+0.7*a.deltaY/c;a.pageX=b.pageX;a.pageY=b.pageY;d.kick()}function F(a,b,c){b.end(function(){a.type="moveend";d.event.trigger(a,void 0,a.target);return c&&c()})}var A=6,f=d.event.add,e=d.event.remove,J=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){return window.setTimeout(function(){a()},
		25)},r={textarea:!0,input:!0,select:!0,button:!0},g={move:"mousemove",cancel:"mouseup dragstart",end:"mouseup"};d.event.special.movestart={setup:function(){f(this,"movestart.move",B);return!0},teardown:function(){e(this,"dragstart drag",p);e(this,"mousedown touchstart",q);e(this,"movestart",B);return!0},add:function(a){"move"===a.namespace||"moveend"===a.namespace||(f(this,"dragstart."+a.guid+" drag."+a.guid,p,h,a.selector),f(this,"mousedown."+a.guid,q,h,a.selector))},remove:function(a){"move"===
		a.namespace||"moveend"===a.namespace||(e(this,"dragstart."+a.guid+" drag."+a.guid),e(this,"mousedown."+a.guid))},_default:function(a){var b,c;a._handled()&&(b={target:a.target,startX:a.startX,startY:a.startY,pageX:a.pageX,pageY:a.pageY,distX:a.distX,distY:a.distY,deltaX:a.deltaX,deltaY:a.deltaY,velocityX:a.velocityX,velocityY:a.velocityY,timeStamp:a.timeStamp,identifier:a.identifier,targetTouches:a.targetTouches,finger:a.finger},c={event:b,timer:new I(function(){d.event.trigger(b,void 0,a.target)})},
		a.identifier===h?(f(a.target,"click",n),f(document,g.move,C,c),f(document,g.end,E,c)):(a._preventTouchmoveDefault(),f(document,"touchmove."+a.identifier,G,c),f(document,"touchend."+a.identifier,H,c)))}};d.event.special.move={setup:function(){f(this,"movestart.move",d.noop)},teardown:function(){e(this,"movestart.move",d.noop)}};d.event.special.moveend={setup:function(){f(this,"movestart.moveend",d.noop)},teardown:function(){e(this,"movestart.moveend",d.noop)}};f(document,"mousedown.move",function(a){1===
		a.which&&(!a.ctrlKey&&!a.altKey)&&(a={target:a.target,startX:a.pageX,startY:a.pageY,timeStamp:a.timeStamp},f(document,g.move,t,a),f(document,g.cancel,w,a))});f(document,"touchstart.move",function(a){var b;r[a.target.tagName.toLowerCase()]||(b=a.changedTouches[0],a={target:b.target,startX:b.pageX,startY:b.pageY,timeStamp:a.timeStamp,identifier:b.identifier},f(document,"touchmove."+b.identifier,x,a),f(document,"touchend."+b.identifier,z,a))});if("function"===typeof Array.prototype.indexOf)for(var l=
		["changedTouches","targetTouches"],m=l.length;m--;)-1===d.event.props.indexOf(l[m])&&d.event.props.push(l[m])});
		
		
		// https://github.com/stephband/jquery.event.swipe
		
		(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){function g(a){var c,f,d;c=a.target.offsetWidth;f=a.target.offsetHeight;d={distX:a.distX,distY:a.distY,velocityX:a.velocityX,velocityY:a.velocityY,finger:a.finger};if(a.distX>a.distY)if(a.distX>-a.distY){if(a.distX/c>e.threshold||1<a.velocityX*a.distX/c*e.sensitivity)d.type="swiperight",b.event.trigger(d,void 0,a.currentTarget)}else{if(-a.distY/f>e.threshold||1<a.velocityY*a.distY/c*e.sensitivity)d.type=
		"swipeup",b.event.trigger(d,void 0,a.currentTarget)}else if(a.distX>-a.distY){if(a.distY/f>e.threshold||1<a.velocityY*a.distY/c*e.sensitivity)d.type="swipedown",b.event.trigger(d,void 0,a.currentTarget)}else if(-a.distX/c>e.threshold||1<a.velocityX*a.distX/c*e.sensitivity)d.type="swipeleft",b.event.trigger(d,void 0,a.currentTarget)}function h(a){var c=b.data(a,"event_swipe");c||(c={count:0},b.data(a,"event_swipe",c));return c}var j=b.event.add,k=b.event.remove,e={threshold:0.4,sensitivity:6};b.event.special.swipe=
		b.event.special.swipeleft=b.event.special.swiperight=b.event.special.swipeup=b.event.special.swipedown={setup:function(a){a=h(this);if(!(0<a.count++))return j(this,"moveend",g),!0},teardown:function(){if(!(0<--h(this).count))return k(this,"moveend",g),!0},settings:e}});
		
		
		
		
		window._ouCommonDependenciesLoaded = true;
	} )();
}