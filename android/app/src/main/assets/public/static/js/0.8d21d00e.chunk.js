(this["webpackJsonpesa-app"]=this["webpackJsonpesa-app"]||[]).push([[0],{199:function(t,e,n){"use strict";n.r(e),n.d(e,"createSwipeBackGesture",(function(){return a}));var r=n(39),a=function(t,e,n,a,i){var o=t.ownerDocument.defaultView;return Object(r.createGesture)({el:t,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:function(t){return t.startX<=50&&e()},onStart:n,onMove:function(t){var e=t.deltaX/o.innerWidth;a(e)},onEnd:function(t){var e=t.deltaX,n=o.innerWidth,r=e/n,a=t.velocityX,c=n/2,s=a>=0&&(a>.2||t.deltaX>c),u=(s?1-r:r)*n,p=0;if(u>5){var d=u/Math.abs(a);p=Math.min(d,540)}i(s,r<=0?.01:r,p)}})}}}]);
//# sourceMappingURL=0.8d21d00e.chunk.js.map