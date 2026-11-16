var v0=Object.defineProperty;var qt=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var Tn=(i,e)=>{for(var t in e)v0(i,t,{get:e[t],enumerable:!0})};function M0(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function b0(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function sr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qd(){let i=sr("canvas");return i.style.display="block",i}function Ih(...i){let e="THREE."+i.shift();rr?rr("log",e,...i):console.log(e,...i)}function Yd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function rt(...i){i=Yd(i);let e="THREE."+i.shift();if(rr)rr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ot(...i){i=Yd(i);let e="THREE."+i.shift();if(rr)rr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function _s(...i){let e=i.join(" ");e in Ou||(Ou[e]=!0,rt(...i))}function Zd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function ws(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(yn[i&255]+yn[i>>8&255]+yn[i>>16&255]+yn[i>>24&255]+"-"+yn[e&255]+yn[e>>8&255]+"-"+yn[e>>16&15|64]+yn[e>>24&255]+"-"+yn[t&63|128]+yn[t>>8&255]+"-"+yn[t>>16&255]+yn[t>>24&255]+yn[n&255]+yn[n>>8&255]+yn[n>>16&255]+yn[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function Lh(i,e){return(i%e+e)%e}function E0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function S0(i,e,t){return i!==e?(t-i)/(e-i):0}function qr(i,e,t){return(1-t)*i+t*e}function T0(i,e,t,n){return qr(i,e,1-Math.exp(-t*n))}function w0(i,e=1){return e-Math.abs(Lh(i,e*2)-e)}function R0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function A0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function C0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function P0(i,e){return i+Math.random()*(e-i)}function I0(i){return i*(.5-Math.random())}function L0(i){i!==void 0&&(Hu=i);let e=Hu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function N0(i){return i*Xr}function D0(i){return i*or}function U0(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function F0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function B0(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function O0(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*h,a*c);break;default:rt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function er(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function wn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function H0(){let i={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Rt&&(s.r=Di(s.r),s.g=Di(s.g),s.b=Di(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Rt&&(s.r=tr(s.r),s.g=tr(s.g),s.b=tr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bi?Kr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return _s("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return _s("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[$r]:{primaries:e,whitePoint:n,transfer:Kr,toXYZ:ku,fromXYZ:Gu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:e,whitePoint:n,transfer:Rt,toXYZ:ku,fromXYZ:Gu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),i}function Di(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function tr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function Nc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fa.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(rt("Texture: Unable to serialize Texture."),{})}function Fc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}function Wc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ms.fromArray(i,r);let a=s.x*Math.abs(ms.x)+s.y*Math.abs(ms.y)+s.z*Math.abs(ms.z),l=e.dot(ms),c=t.dot(ms),h=n.dot(ms);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}function tm(i,e,t,n,s,r,o,a){let l;if(e.side===gn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===ss,a),l===null)return null;ga.copy(a),ga.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ga);return c<t.near||c>t.far?null:{distance:c,point:ga.clone(),object:i}}function xa(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,da),i.getVertexPosition(l,fa),i.getVertexPosition(c,pa);let h=tm(i,e,t,n,da,fa,pa,Qu);if(h){let d=new N;$i.getBarycoord(Qu,da,fa,pa,d),s&&(h.uv=$i.getInterpolatedAttribute(s,a,l,c,d,new fe)),r&&(h.uv1=$i.getInterpolatedAttribute(r,a,l,c,d,new fe)),o&&(h.normal=$i.getInterpolatedAttribute(o,a,l,c,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new N,materialIndex:0};$i.getNormal(da,fa,pa,u.normal),h.face=u,h.barycoord=d}return h}function Nh(){let i=0,e=0,t=0,n=0;function s(r,o,a,l){i=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+e*r+t*o+n*a}}}function sd(i,e,t,n,s){let r=(n-e)*.5,o=(s-t)*.5,a=i*i,l=i*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*i+t}function sm(i,e){let t=1-i;return t*t*e}function rm(i,e){return 2*(1-i)*i*e}function om(i,e){return i*i*e}function Yr(i,e,t,n){return sm(i,e)+rm(i,t)+om(i,n)}function am(i,e){let t=1-i;return t*t*t*e}function lm(i,e){let t=1-i;return 3*t*t*i*e}function cm(i,e){return 3*(1-i)*i*i*e}function hm(i,e){return i*i*i*e}function Zr(i,e,t,n,s){return am(i,e)+lm(i,t)+cm(i,n)+hm(i,s)}function um(i,e,t=2){let n=e&&e.length,s=n?e[0]*t:i.length,r=Kd(i,0,s,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=gm(i,e,r,t)),i.length>80*t){a=i[0],l=i[1];let h=a,d=l;for(let u=t;u<s;u+=t){let f=i[u],m=i[u+1];f<a&&(a=f),m<l&&(l=m),f>h&&(h=f),m>d&&(d=m)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return uo(r,o,t,a,l,c,0),o}function Kd(i,e,t,n,s){let r;if(s===Rm(i,e,t,n)>0)for(let o=e;o<t;o+=n)r=rd(o/n|0,i[o],i[o+1],r);else for(let o=t-n;o>=e;o-=n)r=rd(o/n|0,i[o],i[o+1],r);return r&&ur(r,r.next)&&(po(r),r=r.next),r}function bs(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ur(t,t.next)||kt(t.prev,t,t.next)===0)){if(po(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function uo(i,e,t,n,s,r,o){if(!i)return;!o&&r&&Mm(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?fm(i,n,s,r):dm(i)){e.push(l.i,i.i,c.i),po(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=pm(bs(i),e),uo(i,e,t,n,s,r,2)):o===2&&mm(i,e,t,n,s,r):uo(bs(i),e,t,n,s,r,1);break}}}function dm(i){let e=i.prev,t=i,n=i.next;if(kt(e,t,n)>=0)return!1;let s=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(s,r,o),d=Math.min(a,l,c),u=Math.max(s,r,o),f=Math.max(a,l,c),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=u&&m.y>=d&&m.y<=f&&Wr(s,a,r,l,o,c,m.x,m.y)&&kt(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function fm(i,e,t,n){let s=i.prev,r=i,o=i.next;if(kt(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,l,c),m=Math.min(h,d,u),x=Math.max(a,l,c),g=Math.max(h,d,u),p=rh(f,m,e,t,n),E=rh(x,g,e,t,n),S=i.prevZ,y=i.nextZ;for(;S&&S.z>=p&&y&&y.z<=E;){if(S.x>=f&&S.x<=x&&S.y>=m&&S.y<=g&&S!==s&&S!==o&&Wr(a,h,l,d,c,u,S.x,S.y)&&kt(S.prev,S,S.next)>=0||(S=S.prevZ,y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Wr(a,h,l,d,c,u,y.x,y.y)&&kt(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=x&&S.y>=m&&S.y<=g&&S!==s&&S!==o&&Wr(a,h,l,d,c,u,S.x,S.y)&&kt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;y&&y.z<=E;){if(y.x>=f&&y.x<=x&&y.y>=m&&y.y<=g&&y!==s&&y!==o&&Wr(a,h,l,d,c,u,y.x,y.y)&&kt(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function pm(i,e){let t=i;do{let n=t.prev,s=t.next.next;!ur(n,s)&&Qd(n,t,t.next,s)&&fo(n,s)&&fo(s,n)&&(e.push(n.i,t.i,s.i),po(t),po(t.next),t=i=s),t=t.next}while(t!==i);return bs(t)}function mm(i,e,t,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Sm(o,a)){let l=ef(o,a);o=bs(o,o.next),l=bs(l,l.next),uo(o,e,t,n,s,r,0),uo(l,e,t,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function gm(i,e,t,n){let s=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:i.length,c=Kd(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Em(c))}s.sort(xm);for(let r=0;r<s.length;r++)t=_m(s[r],t);return t}function xm(i,e){let t=i.x-e.x;if(t===0&&(t=i.y-e.y,t===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(e.next.y-e.y)/(e.next.x-e.x);t=n-s}return t}function _m(i,e){let t=ym(i,e);if(!t)return e;let n=ef(t,i);return bs(n,n.next),bs(t,t.next)}function ym(i,e){let t=e,n=i.x,s=i.y,r=-1/0,o;if(ur(i,t))return t;do{if(ur(i,t.next))return t.next;if(s<=t.y&&s>=t.next.y&&t.next.y!==t.y){let d=t.x+(s-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&jd(s<c?n:r,s,l,c,s<c?r:n,s,t.x,t.y)){let d=Math.abs(s-t.y)/(n-t.x);fo(t,i)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&vm(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function vm(i,e){return kt(i.prev,i,e.prev)<0&&kt(e.next,i,i.next)<0}function Mm(i,e,t,n){let s=i;do s.z===0&&(s.z=rh(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,bm(s)}function bm(i){let e,t=1;do{let n=i,s;i=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,t*=2}while(e>1);return i}function rh(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Em(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function jd(i,e,t,n,s,r,o,a){return(s-o)*(e-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(s-o)*(n-a)}function Wr(i,e,t,n,s,r,o,a){return!(i===o&&e===a)&&jd(i,e,t,n,s,r,o,a)}function Sm(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!Tm(i,e)&&(fo(i,e)&&fo(e,i)&&wm(i,e)&&(kt(i.prev,i,e.prev)||kt(i,e.prev,e))||ur(i,e)&&kt(i.prev,i,i.next)>0&&kt(e.prev,e,e.next)>0)}function kt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ur(i,e){return i.x===e.x&&i.y===e.y}function Qd(i,e,t,n){let s=Ma(kt(i,e,t)),r=Ma(kt(i,e,n)),o=Ma(kt(t,n,i)),a=Ma(kt(t,n,e));return!!(s!==r&&o!==a||s===0&&va(i,t,e)||r===0&&va(i,n,e)||o===0&&va(t,i,n)||a===0&&va(t,e,n))}function va(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Ma(i){return i>0?1:i<0?-1:0}function Tm(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Qd(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function fo(i,e){return kt(i.prev,i,i.next)<0?kt(i,e,i.next)>=0&&kt(i,i.prev,e)>=0:kt(i,e,i.prev)<0||kt(i,i.next,e)<0}function wm(i,e){let t=i,n=!1,s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function ef(i,e){let t=oh(i.i,i.x,i.y),n=oh(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function rd(i,e,t,n){let s=oh(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function po(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function oh(i,e,t){return{i,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Rm(i,e,t,n){let s=0;for(let r=e,o=t-n;r<t;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function od(i){let e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function ad(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}function Cm(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}function Pm(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){let s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}function Rs(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(ld(s))s.isRenderTargetTexture?(rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(ld(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function bn(i){let e={};for(let t=0;t<i.length;t++){let n=Rs(i[t]);for(let s in n)e[s]=n[s]}return e}function ld(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Im(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Dh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}function $s(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Qc(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function nf(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function Dm(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Um(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=nf(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=Dm(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}function cd(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}function hd(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}function Bh(i,e,t,n){let s=Wm(n);switch(t){case Ah:return i*e;case xl:return i*e/s.components*s.byteLength;case _l:return i*e/s.components*s.byteLength;case hs:return i*e*2/s.components*s.byteLength;case yl:return i*e*2/s.components*s.byteLength;case Ch:return i*e*3/s.components*s.byteLength;case Jn:return i*e*4/s.components*s.byteLength;case vl:return i*e*4/s.components*s.byteLength;case wo:case Ro:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ao:case Co:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bl:case Sl:return Math.max(i,16)*Math.max(e,8)/4;case Ml:case El:return Math.max(i,8)*Math.max(e,8)/2;case Tl:case wl:case Al:case Cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Rl:case Po:case Pl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Il:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ll:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Nl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Dl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Bl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ol:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Hl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case zl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case kl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Gl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Wl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xl:case ql:case Yl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Zl:case Jl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Io:case $l:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wm(i){switch(i){case Nn:case Sh:return{byteLength:1,components:1};case gr:case Th:case li:return{byteLength:2,components:1};case ml:case gl:return{byteLength:2,components:4};case ai:case pl:case Zn:return{byteLength:4,components:1};case wh:case Rh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}var md,dh,gd,bo,xd,pr,ss,gn,st,bi,rs,os,fh,ph,ll,Fi,_d,yd,vd,Md,cl,mr,bd,Ed,mh,gh,Sd,Td,wd,Rd,Ad,Cd,Pd,Id,Ld,Ra,Aa,Ca,nr,Pa,Ia,La,Na,hl,Nd,Dd,oi,xh,_h,yh,Eo,vh,Mh,bh,Eh,as,Ts,ul,dl,So,gi,pi,Da,an,Ud,To,pn,fl,ls,Nn,Sh,Th,gr,pl,ai,Zn,li,ml,gl,xr,wh,Rh,Ah,Ch,Jn,xi,cs,xl,_l,hs,yl,vl,wo,Ro,Ao,Co,Ml,bl,El,Sl,Tl,wl,Rl,Al,Cl,Po,Pl,Il,Ll,Nl,Dl,Ul,Fl,Bl,Ol,Hl,zl,kl,Gl,Vl,Wl,Xl,ql,Yl,Zl,Jl,Io,$l,Jr,Ua,Sa,th,nh,ih,sh,Fd,Lo,Bd,Bi,Lt,$r,Kr,Rt,Ta,Od,Hd,zd,kd,Kl,Gd,Vd,jl,Wd,Xd,Ql,Ph,ri,ir,Ou,rr,Jd,_i,yn,Hu,Xr,or,Ut,Oh,fe,Mn,Hh,N,Ic,zu,zh,ct,Lc,ku,Gu,Mt,Hs,Fa,z0,ar,k0,Dc,jt,kh,Ht,Ba,Ln,jr,Oa,al,At,zs,ti,G0,V0,Xi,na,Fn,Vu,Wu,qn,Qr,W0,Xu,ks,Ci,ia,Or,X0,q0,qu,Yu,Zu,Ju,Y0,Gs,Uc,mn,Ze,Z0,lr,$d,qi,sa,Qe,vn,ys,ni,Pi,Bc,Ii,Vs,Ws,$u,Oc,Hc,zc,kc,Gc,Vc,$i,en,Li,ii,ra,Xs,qs,Ys,Yi,Zi,ps,Hr,oa,aa,ms,Kt,la,J0,Dt,eo,to,tt,$0,zr,Xc,yi,K0,Xn,qc,Zs,Bn,kr,on,Et,Yc,j0,Q0,si,em,Ui,Ni,Zc,ca,ha,Ha,Gt,Ku,gs,ua,ju,da,fa,pa,Jc,ma,Qu,ga,Y,no,Ki,Js,ed,_a,td,nm,Gr,Vr,vs,xs,im,ya,cr,io,Yt,ji,za,so,it,ro,On,dt,Qi,Hn,hr,ka,nd,id,$c,Kc,jc,vi,oo,Ga,ao,Va,lo,co,ho,Wa,Xa,Ms,Ot,ah,mi,Zt,Am,mo,Ct,es,Mi,ln,zn,Es,tf,Lm,Nm,Rn,qa,ue,yt,go,Ya,Za,ts,Ja,$a,Ka,ja,kn,ns,Qa,el,tl,xo,is,nl,wa,il,sf,dr,Ks,sl,Yn,_o,eh,ud,dd,yo,ba,Ea,fi,vo,Ji,fd,pd,fn,lh,Ss,fr,ch,Mo,js,Qs,rl,ol,Uh,Fm,Fh,Bm,Om,Hm,zm,km,Gm,Vm,hh,Bt,rb,Gh,uh,Vh=qt(()=>{md=0,dh=1,gd=2,bo=1,xd=2,pr=3,ss=0,gn=1,st=2,bi=0,rs=1,os=2,fh=3,ph=4,ll=5,Fi=100,_d=101,yd=102,vd=103,Md=104,cl=200,mr=201,bd=202,Ed=203,mh=204,gh=205,Sd=206,Td=207,wd=208,Rd=209,Ad=210,Cd=211,Pd=212,Id=213,Ld=214,Ra=0,Aa=1,Ca=2,nr=3,Pa=4,Ia=5,La=6,Na=7,hl=0,Nd=1,Dd=2,oi=0,xh=1,_h=2,yh=3,Eo=4,vh=5,Mh=6,bh=7,Eh=300,as=301,Ts=302,ul=303,dl=304,So=306,gi=1e3,pi=1001,Da=1002,an=1003,Ud=1004,To=1005,pn=1006,fl=1007,ls=1008,Nn=1009,Sh=1010,Th=1011,gr=1012,pl=1013,ai=1014,Zn=1015,li=1016,ml=1017,gl=1018,xr=1020,wh=35902,Rh=35899,Ah=1021,Ch=1022,Jn=1023,xi=1026,cs=1027,xl=1028,_l=1029,hs=1030,yl=1031,vl=1033,wo=33776,Ro=33777,Ao=33778,Co=33779,Ml=35840,bl=35841,El=35842,Sl=35843,Tl=36196,wl=37492,Rl=37496,Al=37488,Cl=37489,Po=37490,Pl=37491,Il=37808,Ll=37809,Nl=37810,Dl=37811,Ul=37812,Fl=37813,Bl=37814,Ol=37815,Hl=37816,zl=37817,kl=37818,Gl=37819,Vl=37820,Wl=37821,Xl=36492,ql=36494,Yl=36495,Zl=36283,Jl=36284,Io=36285,$l=36286,Jr=2300,Ua=2301,Sa=2302,th=2303,nh=2400,ih=2401,sh=2402,Fd=3200,Lo=0,Bd=1,Bi="",Lt="srgb",$r="srgb-linear",Kr="linear",Rt="srgb",Ta=7680,Od=519,Hd=512,zd=513,kd=514,Kl=515,Gd=516,Vd=517,jl=518,Wd=519,Xd=35044,Ql=35048,Ph="300 es",ri=2e3,ir=2001;Ou={},rr=null;Jd={[Ra]:Aa,[Ca]:La,[Pa]:Na,[nr]:Ia,[Aa]:Ra,[La]:Ca,[Na]:Pa,[Ia]:nr},_i=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},yn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hu=1234567,Xr=Math.PI/180,or=180/Math.PI;Ut={DEG2RAD:Xr,RAD2DEG:or,generateUUID:ws,clamp:mt,euclideanModulo:Lh,mapLinear:E0,inverseLerp:S0,lerp:qr,damp:T0,pingpong:w0,smoothstep:R0,smootherstep:A0,randInt:C0,randFloat:P0,randFloatSpread:I0,seededRandom:L0,degToRad:N0,radToDeg:D0,isPowerOfTwo:U0,ceilPowerOfTwo:F0,floorPowerOfTwo:B0,setQuaternionFromProperEuler:O0,normalize:wn,denormalize:er},Oh=class Oh{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Oh.prototype.isVector2=!0;fe=Oh,Mn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],m=r[o+2],x=r[o+3];if(d!==x||l!==u||c!==f||h!==m){let g=l*u+c*f+h*m+d*x;g<0&&(u=-u,f=-f,m=-m,x=-x,g=-g);let p=1-a;if(g<.9995){let E=Math.acos(g),S=Math.sin(E);p=Math.sin(p*E)/S,a=Math.sin(a*E)/S,l=l*p+u*a,c=c*p+f*a,h=h*p+m*a,d=d*p+x*a}else{l=l*p+u*a,c=c*p+f*a,h=h*p+m*a,d=d*p+x*a;let E=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=E,c*=E,h*=E,d*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*d+l*f-c*u,e[t+1]=l*m+h*u+c*d-a*f,e[t+2]=c*m+h*f+a*u-l*d,e[t+3]=h*m-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"YXZ":this._x=u*h*d+c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"ZXY":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d-u*f*m;break;case"ZYX":this._x=u*h*d-c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d+u*f*m;break;case"YZX":this._x=u*h*d+c*f*m,this._y=c*f*d+u*h*m,this._z=c*h*m-u*f*d,this._w=c*h*d-u*f*m;break;case"XZY":this._x=u*h*d-c*f*m,this._y=c*f*d-u*h*m,this._z=c*h*m+u*f*d,this._w=c*h*d+u*f*m;break;default:rt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Hh=class Hh{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(zu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(zu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ic.copy(this).projectOnVector(e),this.sub(Ic)}reflect(e){return this.sub(Ic.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Hh.prototype.isVector3=!0;N=Hh,Ic=new N,zu=new Mn,zh=class zh{constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],m=n[8],x=s[0],g=s[3],p=s[6],E=s[1],S=s[4],y=s[7],T=s[2],M=s[5],v=s[8];return r[0]=o*x+a*E+l*T,r[3]=o*g+a*S+l*M,r[6]=o*p+a*y+l*v,r[1]=c*x+h*E+d*T,r[4]=c*g+h*S+d*M,r[7]=c*p+h*y+d*v,r[2]=u*x+f*E+m*T,r[5]=u*g+f*S+m*M,r[8]=u*p+f*y+m*v,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,m=t*d+n*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=d*x,e[1]=(s*c-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=u*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return _s("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lc.makeScale(e,t)),this}rotate(e){return _s("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lc.makeRotation(-e)),this}translate(e,t){return _s("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};zh.prototype.isMatrix3=!0;ct=zh,Lc=new ct,ku=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gu=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Mt=H0();Fa=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Hs===void 0&&(Hs=sr("canvas")),Hs.width=e.width,Hs.height=e.height;let s=Hs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Hs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=sr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Di(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Di(t[n]/255)*255):t[n]=Di(t[n]);return{data:t,width:e.width,height:e.height}}else return rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},z0=0,ar=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=ws(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Nc(s[o].image)):r.push(Nc(s[o]))}else r=Nc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};k0=0,Dc=new N,jt=class i extends _i{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=pi,s=pi,r=pn,o=ls,a=Jn,l=Nn,c=i.DEFAULT_ANISOTROPY,h=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:k0++}),this.uuid=ws(),this.name="",this.source=new ar(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new fe(0,0),this.repeat=new fe(1,1),this.center=new fe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Dc).x}get height(){return this.source.getSize(Dc).y}get depth(){return this.source.getSize(Dc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){rt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){rt(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Eh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case gi:e.x=e.x-Math.floor(e.x);break;case pi:e.x=e.x<0?0:1;break;case Da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case gi:e.y=e.y-Math.floor(e.y);break;case pi:e.y=e.y<0?0:1;break;case Da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};jt.DEFAULT_IMAGE=null;jt.DEFAULT_MAPPING=Eh;jt.DEFAULT_ANISOTROPY=1;kh=class kh{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(c+1)/2,y=(f+1)/2,T=(p+1)/2,M=(h+u)/4,v=(d+x)/4,_=(m+g)/4;return S>y&&S>T?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=M/n,r=v/n):y>T?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=M/s,r=_/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=v/r,s=_/r),this.set(n,s,r,t),this}let E=Math.sqrt((g-m)*(g-m)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(g-m)/E,this.y=(d-x)/E,this.z=(u-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};kh.prototype.isVector4=!0;Ht=kh,Ba=class extends _i{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:pn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ht(0,0,e,t),this.scissorTest=!1,this.viewport=new Ht(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:n.depth},r=new jt(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:pn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ar(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ln=class extends Ba{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},jr=class extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Oa=class extends jt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},al=class al{constructor(e,t,n,s,r,o,a,l,c,h,d,u,f,m,x,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,d,u,f,m,x,g)}set(e,t,n,s,r,o,a,l,c,h,d,u,f,m,x,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new al().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/zs.setFromMatrixColumn(e,0).length(),r=1/zs.setFromMatrixColumn(e,1).length(),o=1/zs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,m=a*h,x=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=u-x*c,t[9]=-a*l,t[2]=x-u*c,t[6]=m+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,m=c*h,x=c*d;t[0]=u+x*a,t[4]=m*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=x+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,m=c*h,x=c*d;t[0]=u-x*a,t[4]=-o*d,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=x-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,m=a*h,x=a*d;t[0]=l*h,t[4]=m*c-f,t[8]=u*c+x,t[1]=l*d,t[5]=x*c+u,t[9]=f*c-m,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=x-u*d,t[8]=m*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+m,t[10]=u-x*d}else if(e.order==="XZY"){let u=o*l,f=o*c,m=a*l,x=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+x,t[5]=o*h,t[9]=f*d-m,t[2]=m*d-f,t[6]=a*h,t[10]=x*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(G0,e,V0)}lookAt(e,t,n){let s=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),Xi.crossVectors(n,Fn),Xi.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),Xi.crossVectors(n,Fn)),Xi.normalize(),na.crossVectors(Fn,Xi),s[0]=Xi.x,s[4]=na.x,s[8]=Fn.x,s[1]=Xi.y,s[5]=na.y,s[9]=Fn.y,s[2]=Xi.z,s[6]=na.z,s[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],m=n[2],x=n[6],g=n[10],p=n[14],E=n[3],S=n[7],y=n[11],T=n[15],M=s[0],v=s[4],_=s[8],R=s[12],C=s[1],I=s[5],P=s[9],H=s[13],F=s[2],k=s[6],V=s[10],W=s[14],j=s[3],Z=s[7],ie=s[11],se=s[15];return r[0]=o*M+a*C+l*F+c*j,r[4]=o*v+a*I+l*k+c*Z,r[8]=o*_+a*P+l*V+c*ie,r[12]=o*R+a*H+l*W+c*se,r[1]=h*M+d*C+u*F+f*j,r[5]=h*v+d*I+u*k+f*Z,r[9]=h*_+d*P+u*V+f*ie,r[13]=h*R+d*H+u*W+f*se,r[2]=m*M+x*C+g*F+p*j,r[6]=m*v+x*I+g*k+p*Z,r[10]=m*_+x*P+g*V+p*ie,r[14]=m*R+x*H+g*W+p*se,r[3]=E*M+S*C+y*F+T*j,r[7]=E*v+S*I+y*k+T*Z,r[11]=E*_+S*P+y*V+T*ie,r[15]=E*R+S*H+y*W+T*se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],m=e[3],x=e[7],g=e[11],p=e[15],E=l*f-c*u,S=a*f-c*d,y=a*u-l*d,T=o*f-c*h,M=o*u-l*h,v=o*d-a*h;return t*(x*E-g*S+p*y)-n*(m*E-g*T+p*M)+s*(m*S-x*T+p*v)-r*(m*y-x*M+g*v)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],m=e[12],x=e[13],g=e[14],p=e[15],E=t*a-n*o,S=t*l-s*o,y=t*c-r*o,T=n*l-s*a,M=n*c-r*a,v=s*c-r*l,_=h*x-d*m,R=h*g-u*m,C=h*p-f*m,I=d*g-u*x,P=d*p-f*x,H=u*p-f*g,F=E*H-S*P+y*I+T*C-M*R+v*_;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/F;return e[0]=(a*H-l*P+c*I)*k,e[1]=(s*P-n*H-r*I)*k,e[2]=(x*v-g*M+p*T)*k,e[3]=(u*M-d*v-f*T)*k,e[4]=(l*C-o*H-c*R)*k,e[5]=(t*H-s*C+r*R)*k,e[6]=(g*y-m*v-p*S)*k,e[7]=(h*v-u*y+f*S)*k,e[8]=(o*P-a*C+c*_)*k,e[9]=(n*C-t*P-r*_)*k,e[10]=(m*M-x*y+p*E)*k,e[11]=(d*y-h*M-f*E)*k,e[12]=(a*R-o*I-l*_)*k,e[13]=(t*I-n*R+s*_)*k,e[14]=(x*S-m*T-g*E)*k,e[15]=(h*T-d*S+u*E)*k,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,m=r*d,x=o*h,g=o*d,p=a*d,E=l*c,S=l*h,y=l*d,T=n.x,M=n.y,v=n.z;return s[0]=(1-(x+p))*T,s[1]=(f+y)*T,s[2]=(m-S)*T,s[3]=0,s[4]=(f-y)*M,s[5]=(1-(u+p))*M,s[6]=(g+E)*M,s[7]=0,s[8]=(m+S)*v,s[9]=(g-E)*v,s[10]=(1-(u+x))*v,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=zs.set(s[0],s[1],s[2]).length(),a=zs.set(s[4],s[5],s[6]).length(),l=zs.set(s[8],s[9],s[10]).length();r<0&&(o=-o),ti.copy(this);let c=1/o,h=1/a,d=1/l;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=d,ti.elements[9]*=d,ti.elements[10]*=d,t.setFromRotationMatrix(ti),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=ri,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s),m,x;if(l)m=r/(o-r),x=o*r/(o-r);else if(a===ri)m=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===ir)m=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=ri,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-s),u=-(t+e)/(t-e),f=-(n+s)/(n-s),m,x;if(l)m=1/(o-r),x=o/(o-r);else if(a===ri)m=-2/(o-r),x=-(o+r)/(o-r);else if(a===ir)m=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};al.prototype.isMatrix4=!0;At=al,zs=new N,ti=new At,G0=new N(0,0,0),V0=new N(1,1,1),Xi=new N,na=new N,Fn=new N,Vu=new At,Wu=new Mn,qn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Vu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Vu,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wu.setFromEuler(this),this.setFromQuaternion(Wu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};qn.DEFAULT_ORDER="XYZ";Qr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},W0=0,Xu=new N,ks=new Mn,Ci=new At,ia=new N,Or=new N,X0=new N,q0=new Mn,qu=new N(1,0,0),Yu=new N(0,1,0),Zu=new N(0,0,1),Ju={type:"added"},Y0={type:"removed"},Gs={type:"childadded",child:null},Uc={type:"childremoved",child:null},mn=class i extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:W0++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new N,t=new qn,n=new Mn,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new At},normalMatrix:{value:new ct}}),this.matrix=new At,this.matrixWorld=new At,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.multiply(ks),this}rotateOnWorldAxis(e,t){return ks.setFromAxisAngle(e,t),this.quaternion.premultiply(ks),this}rotateX(e){return this.rotateOnAxis(qu,e)}rotateY(e){return this.rotateOnAxis(Yu,e)}rotateZ(e){return this.rotateOnAxis(Zu,e)}translateOnAxis(e,t){return Xu.copy(e).applyQuaternion(this.quaternion),this.position.add(Xu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(qu,e)}translateY(e){return this.translateOnAxis(Yu,e)}translateZ(e){return this.translateOnAxis(Zu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ia.copy(e):ia.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Or.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ci.lookAt(Or,ia,this.up):Ci.lookAt(ia,Or,this.up),this.quaternion.setFromRotationMatrix(Ci),s&&(Ci.extractRotation(s.matrixWorld),ks.setFromRotationMatrix(Ci),this.quaternion.premultiply(ks.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ot("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ju),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null):ot("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Y0),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ju),Gs.child=e,this.dispatchEvent(Gs),Gs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Or,e,X0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Or,q0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};mn.DEFAULT_UP=new N(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Ze=class extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}},Z0={type:"move"},lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let g=t.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Z0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},$d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},sa={h:0,s:0,l:0};Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=Mt.workingColorSpace){if(e=Lh(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Fc(o,r,e+1/3),this.g=Fc(o,r,e),this.b=Fc(o,r,e-1/3)}return Mt.colorSpaceToWorking(this,s),this}setStyle(e,t=Lt){function n(r){r!==void 0&&parseFloat(r)<1&&rt("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:rt("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);rt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){let n=$d[e.toLowerCase()];return n!==void 0?this.setHex(n,t):rt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return Mt.workingToColorSpace(vn.copy(this),e),Math.round(mt(vn.r*255,0,255))*65536+Math.round(mt(vn.g*255,0,255))*256+Math.round(mt(vn.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(vn.copy(this),t);let n=vn.r,s=vn.g,r=vn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(vn.copy(this),t),e.r=vn.r,e.g=vn.g,e.b=vn.b,e}getStyle(e=Lt){Mt.workingToColorSpace(vn.copy(this),e);let t=vn.r,n=vn.g,s=vn.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(sa);let n=qr(qi.h,sa.h,t),s=qr(qi.s,sa.s,t),r=qr(qi.l,sa.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},vn=new Qe;Qe.NAMES=$d;ys=class extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ni=new N,Pi=new N,Bc=new N,Ii=new N,Vs=new N,Ws=new N,$u=new N,Oc=new N,Hc=new N,zc=new N,kc=new Ht,Gc=new Ht,Vc=new Ht,$i=class i{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),ni.subVectors(e,t),s.cross(ni);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){ni.subVectors(s,t),Pi.subVectors(n,t),Bc.subVectors(e,t);let o=ni.dot(ni),a=ni.dot(Pi),l=ni.dot(Bc),c=Pi.dot(Pi),h=Pi.dot(Bc),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,m=(o*h-a*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return kc.setScalar(0),Gc.setScalar(0),Vc.setScalar(0),kc.fromBufferAttribute(e,t),Gc.fromBufferAttribute(e,n),Vc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(kc,r.x),o.addScaledVector(Gc,r.y),o.addScaledVector(Vc,r.z),o}static isFrontFacing(e,t,n,s){return ni.subVectors(n,t),Pi.subVectors(e,t),ni.cross(Pi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ni.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),ni.cross(Pi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Vs.subVectors(s,n),Ws.subVectors(r,n),Oc.subVectors(e,n);let l=Vs.dot(Oc),c=Ws.dot(Oc);if(l<=0&&c<=0)return t.copy(n);Hc.subVectors(e,s);let h=Vs.dot(Hc),d=Ws.dot(Hc);if(h>=0&&d<=h)return t.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Vs,o);zc.subVectors(e,r);let f=Vs.dot(zc),m=Ws.dot(zc);if(m>=0&&f<=m)return t.copy(r);let x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),t.copy(n).addScaledVector(Ws,a);let g=h*m-f*d;if(g<=0&&d-h>=0&&f-m>=0)return $u.subVectors(r,s),a=(d-h)/(d-h+(f-m)),t.copy(s).addScaledVector($u,a);let p=1/(g+x+u);return o=x*p,a=u*p,t.copy(n).addScaledVector(Vs,o).addScaledVector(Ws,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},en=class{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ii):ii.fromBufferAttribute(r,o),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ra.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ra.copy(n.boundingBox)),ra.applyMatrix4(e.matrixWorld),this.union(ra)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Hr),oa.subVectors(this.max,Hr),Xs.subVectors(e.a,Hr),qs.subVectors(e.b,Hr),Ys.subVectors(e.c,Hr),Yi.subVectors(qs,Xs),Zi.subVectors(Ys,qs),ps.subVectors(Xs,Ys);let t=[0,-Yi.z,Yi.y,0,-Zi.z,Zi.y,0,-ps.z,ps.y,Yi.z,0,-Yi.x,Zi.z,0,-Zi.x,ps.z,0,-ps.x,-Yi.y,Yi.x,0,-Zi.y,Zi.x,0,-ps.y,ps.x,0];return!Wc(t,Xs,qs,Ys,oa)||(t=[1,0,0,0,1,0,0,0,1],!Wc(t,Xs,qs,Ys,oa))?!1:(aa.crossVectors(Yi,Zi),t=[aa.x,aa.y,aa.z],Wc(t,Xs,qs,Ys,oa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Li=[new N,new N,new N,new N,new N,new N,new N,new N],ii=new N,ra=new en,Xs=new N,qs=new N,Ys=new N,Yi=new N,Zi=new N,ps=new N,Hr=new N,oa=new N,aa=new N,ms=new N;Kt=new N,la=new fe,J0=0,Dt=class extends _i{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:J0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xd,this.updateRanges=[],this.gpuType=Zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)la.fromBufferAttribute(this,t),la.applyMatrix3(e),this.setXY(t,la.x,la.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=er(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=er(t,this.array)),t}setX(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=er(t,this.array)),t}setY(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=er(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=er(t,this.array)),t}setW(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),n=wn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),n=wn(n,this.array),s=wn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),n=wn(n,this.array),s=wn(s,this.array),r=wn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},eo=class extends Dt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},to=class extends Dt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},tt=class extends Dt{constructor(e,t,n){super(new Float32Array(e),t,n)}},$0=new en,zr=new N,Xc=new N,yi=class{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):$0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zr.subVectors(e,this.center);let t=zr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(zr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zr.copy(e.center).add(Xc)),this.expandByPoint(zr.copy(e.center).sub(Xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},K0=0,Xn=new At,qc=new mn,Zs=new N,Bn=new en,kr=new en,on=new N,Et=class i extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(M0(e)?to:eo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ct().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Xn.makeRotationFromQuaternion(e),this.applyMatrix4(Xn),this}rotateX(e){return Xn.makeRotationX(e),this.applyMatrix4(Xn),this}rotateY(e){return Xn.makeRotationY(e),this.applyMatrix4(Xn),this}rotateZ(e){return Xn.makeRotationZ(e),this.applyMatrix4(Xn),this}translate(e,t,n){return Xn.makeTranslation(e,t,n),this.applyMatrix4(Xn),this}scale(e,t,n){return Xn.makeScale(e,t,n),this.applyMatrix4(Xn),this}lookAt(e){return qc.lookAt(e),qc.updateMatrix(),this.applyMatrix4(qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zs).negate(),this.translate(Zs.x,Zs.y,Zs.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(on.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(on),on.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(on)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ot('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ot("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){let n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];kr.setFromBufferAttribute(a),this.morphTargetsRelative?(on.addVectors(Bn.min,kr.min),Bn.expandByPoint(on),on.addVectors(Bn.max,kr.max),Bn.expandByPoint(on)):(Bn.expandByPoint(kr.min),Bn.expandByPoint(kr.max))}Bn.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)on.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(on));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)on.fromBufferAttribute(a,c),l&&(Zs.fromBufferAttribute(e,c),on.add(Zs)),s=Math.max(s,n.distanceToSquared(on))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ot('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ot("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Dt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let _=0;_<n.count;_++)a[_]=new N,l[_]=new N;let c=new N,h=new N,d=new N,u=new fe,f=new fe,m=new fe,x=new N,g=new N;function p(_,R,C){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,C),u.fromBufferAttribute(r,_),f.fromBufferAttribute(r,R),m.fromBufferAttribute(r,C),h.sub(c),d.sub(c),f.sub(u),m.sub(u);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(x.copy(h).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(I),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(I),a[_].add(x),a[R].add(x),a[C].add(x),l[_].add(g),l[R].add(g),l[C].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let _=0,R=E.length;_<R;++_){let C=E[_],I=C.start,P=C.count;for(let H=I,F=I+P;H<F;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let S=new N,y=new N,T=new N,M=new N;function v(_){T.fromBufferAttribute(s,_),M.copy(T);let R=a[_];S.copy(R),S.sub(T.multiplyScalar(T.dot(R))).normalize(),y.crossVectors(M,R);let I=y.dot(l[_])<0?-1:1;o.setXYZW(_,S.x,S.y,S.z,I)}for(let _=0,R=E.length;_<R;++_){let C=E[_],I=C.start,P=C.count;for(let H=I,F=I+P;H<F;H+=3)v(e.getX(H+0)),v(e.getX(H+1)),v(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Dt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new N,r=new N,o=new N,a=new N,l=new N,c=new N,h=new N,d=new N;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),x=e.getX(u+1),g=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)on.fromBufferAttribute(e,t),on.normalize(),e.setXYZ(t,on.x,on.y,on.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)u[m++]=c[f++]}return new Dt(u,h,d)}if(this.index===null)return rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Yc=new N,j0=new N,Q0=new ct,si=class{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Yc.subVectors(n,t).cross(j0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Yc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Q0.getNormalMatrix(e),s=this.coplanarPoint(Yc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},em=0,Ui=class extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=rs,this.side=ss,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mh,this.blendDst=gh,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=nr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Od,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ta,this.stencilZFail=Ta,this.stencilZPass=Ta,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){rt(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){rt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new si().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new fe().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new fe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ni=new N,Zc=new N,ca=new N,ha=new N,Ha=class{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ni)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ni.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ni.copy(this.origin).addScaledVector(this.direction,t),Ni.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Zc.copy(e).add(t).multiplyScalar(.5),ca.copy(t).sub(e).normalize(),ha.copy(this.origin).sub(Zc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ca),a=ha.dot(this.direction),l=-ha.dot(ca),c=ha.lengthSq(),h=Math.abs(1-o*o),d,u,f,m;if(h>0)if(d=o*l-a,u=o*a-l,m=r*h,d>=0)if(u>=-m)if(u<=m){let x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-m?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=m?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Zc).addScaledVector(ca,u),f}intersectSphere(e,t){if(e.radius<0)return null;Ni.subVectors(e.center,this.origin);let n=Ni.dot(this.direction),s=Ni.dot(Ni)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ni)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=e.x-o.x,u=e.y-o.y,f=e.z-o.z,m=t.x-o.x,x=t.y-o.y,g=t.z-o.z,p=n.x-o.x,E=n.y-o.y,S=n.z-o.z,y=Math.abs(l),T=Math.abs(c),M=Math.abs(h),v,_,R,C,I,P,H,F,k,V,W,j;if(y>=T&&y>=M?(R=l,P=d,k=m,j=p,l>=0?(v=c,_=h,C=u,I=f,H=x,F=g,V=E,W=S):(v=h,_=c,C=f,I=u,H=g,F=x,V=S,W=E)):T>=M?(R=c,P=u,k=x,j=E,c>=0?(v=h,_=l,C=f,I=d,H=g,F=m,V=S,W=p):(v=l,_=h,C=d,I=f,H=m,F=g,V=p,W=S)):(R=h,P=f,k=g,j=S,h>=0?(v=l,_=c,C=d,I=u,H=m,F=x,V=p,W=E):(v=c,_=l,C=u,I=d,H=x,F=m,V=E,W=p)),R===0)return null;let Z=v/R,ie=_/R,se=1/R,we=C-Z*P,Se=I-ie*P,Ge=H-Z*k,Ve=F-ie*k,at=V-Z*j,te=W-ie*j,ae=at*Ve-te*Ge,he=we*te-Se*at,pe=Ge*Se-Ve*we;if(s){if(ae<0||he<0||pe<0)return null}else if((ae<0||he<0||pe<0)&&(ae>0||he>0||pe>0))return null;let me=ae+he+pe;if(me===0)return null;let De=se*(ae*P+he*k+pe*j);return(me>0?De<0:De>0)?null:this.at(De/me,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gt=class extends Ui{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=hl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ku=new At,gs=new Ha,ua=new yi,ju=new N,da=new N,fa=new N,pa=new N,Jc=new N,ma=new N,Qu=new N,ga=new N,Y=class extends mn{constructor(e=new Et,t=new Gt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ma.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Jc.fromBufferAttribute(d,e),o?ma.addScaledVector(Jc,h):ma.addScaledVector(Jc.sub(t),h))}t.add(ma)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(r),gs.copy(e.ray).recast(e.near),!(ua.containsPoint(gs.origin)===!1&&(gs.intersectSphere(ua,ju)===null||gs.origin.distanceToSquared(ju)>(e.far-e.near)**2))&&(Ku.copy(r).invert(),gs.copy(e.ray).applyMatrix4(Ku),!(n.boundingBox!==null&&gs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gs)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){let g=u[m],p=o[g.materialIndex],E=Math.max(g.start,f.start),S=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=E,T=S;y<T;y+=3){let M=a.getX(y),v=a.getX(y+1),_=a.getX(y+2);s=xa(this,p,e,n,c,h,d,M,v,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let E=a.getX(g),S=a.getX(g+1),y=a.getX(g+2);s=xa(this,o,e,n,c,h,d,E,S,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=u.length;m<x;m++){let g=u[m],p=o[g.materialIndex],E=Math.max(g.start,f.start),S=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=E,T=S;y<T;y+=3){let M=y,v=y+1,_=y+2;s=xa(this,p,e,n,c,h,d,M,v,_),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=m,p=x;g<p;g+=3){let E=g,S=g+1,y=g+2;s=xa(this,o,e,n,c,h,d,E,S,y),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}};no=class extends jt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=an,h=an,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ki=class extends Dt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Js=new At,ed=new At,_a=[],td=new en,nm=new At,Gr=new Y,Vr=new yi,vs=class extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ki(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,nm)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new en),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),td.copy(e.boundingBox).applyMatrix4(Js),this.boundingBox.union(td)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Js),Vr.copy(e.boundingSphere).applyMatrix4(Js),this.boundingSphere.union(Vr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Gr.geometry=this.geometry,Gr.material=this.material,Gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(n),e.ray.intersectsSphere(Vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Js),ed.multiplyMatrices(n,Js),Gr.matrixWorld=ed,Gr.raycast(e,_a);for(let o=0,a=_a.length;o<a;o++){let l=_a[o];l.instanceId=r,l.object=this,t.push(l)}_a.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ki(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new no(new Float32Array(s*this.count),s,this.count,xl,Zn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},xs=new yi,im=new fe(.5,.5),ya=new N,cr=class{constructor(e=new si,t=new si,n=new si,s=new si,r=new si,o=new si){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ri,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],m=r[8],x=r[9],g=r[10],p=r[11],E=r[12],S=r[13],y=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,p-m,T-E).normalize(),s[1].setComponents(c+o,f+h,p+m,T+E).normalize(),s[2].setComponents(c+a,f+d,p+x,T+S).normalize(),s[3].setComponents(c-a,f-d,p-x,T-S).normalize(),n)s[4].setComponents(l,u,g,y).normalize(),s[5].setComponents(c-l,f-u,p-g,T-y).normalize();else if(s[4].setComponents(c-l,f-u,p-g,T-y).normalize(),t===ri)s[5].setComponents(c+l,f+u,p+g,T+y).normalize();else if(t===ir)s[5].setComponents(l,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xs)}intersectsSprite(e){xs.center.set(0,0,0);let t=im.distanceTo(e.center);return xs.radius=.7071067811865476+t,xs.applyMatrix4(e.matrixWorld),this.intersectsSphere(xs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(ya.x=s.normal.x>0?e.max.x:e.min.x,ya.y=s.normal.y>0?e.max.y:e.min.y,ya.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ya)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},io=class extends jt{constructor(e=[],t=as,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Yt=class extends jt{constructor(e,t,n,s,r,o,a,l,c){super(e,t,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ji=class extends jt{constructor(e,t,n=ai,s,r,o,a=an,l=an,c,h=xi,d=1){if(h!==xi&&h!==cs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ar(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},za=class extends ji{constructor(e,t=ai,n=as,s,r,o=an,a=an,l,c=xi){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},so=class extends jt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},it=class i extends Et{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,s,o,2),m("x","z","y",1,-1,e,n,-t,s,o,3),m("x","y","z",1,-1,e,t,n,s,r,4),m("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(d,2));function m(x,g,p,E,S,y,T,M,v,_,R){let C=y/v,I=T/_,P=y/2,H=T/2,F=M/2,k=v+1,V=_+1,W=0,j=0,Z=new N;for(let ie=0;ie<V;ie++){let se=ie*I-H;for(let we=0;we<k;we++){let Se=we*C-P;Z[x]=Se*E,Z[g]=se*S,Z[p]=F,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[g]=0,Z[p]=M>0?1:-1,h.push(Z.x,Z.y,Z.z),d.push(we/v),d.push(1-ie/_),W+=1}}for(let ie=0;ie<_;ie++)for(let se=0;se<v;se++){let we=u+se+k*ie,Se=u+se+k*(ie+1),Ge=u+(se+1)+k*(ie+1),Ve=u+(se+1)+k*ie;l.push(we,Se,Ve),l.push(Se,Ge,Ve),j+=6}a.addGroup(f,j,R),f+=j,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},ro=class i extends Et{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,m=n*2+r,x=s+1,g=new N,p=new N;for(let E=0;E<=m;E++){let S=0,y=0,T=0,M=0;if(E<=n){let R=E/n,C=R*Math.PI/2;y=-h-e*Math.cos(C),T=e*Math.sin(C),M=-e*Math.cos(C),S=R*d}else if(E<=n+r){let R=(E-n)/r;y=-h+R*t,T=e,M=0,S=d+R*u}else{let R=(E-n-r)/n,C=R*Math.PI/2;y=h+e*Math.sin(C),T=e*Math.cos(C),M=e*Math.sin(C),S=d+u+R*d}let v=Math.max(0,Math.min(1,S/f)),_=0;E===0?_=.5/s:E===m&&(_=-.5/s);for(let R=0;R<=s;R++){let C=R/s,I=C*Math.PI*2,P=Math.sin(I),H=Math.cos(I);p.x=-T*H,p.y=y,p.z=T*P,a.push(p.x,p.y,p.z),g.set(-T*H,M,T*P),g.normalize(),l.push(g.x,g.y,g.z),c.push(C+_,v)}if(E>0){let R=(E-1)*x;for(let C=0;C<s;C++){let I=R+C,P=R+C+1,H=E*x+C,F=E*x+C+1;o.push(I,P,H),o.push(P,F,H)}}}this.setIndex(o),this.setAttribute("position",new tt(a,3)),this.setAttribute("normal",new tt(l,3)),this.setAttribute("uv",new tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},On=class i extends Et{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new N,h=new fe;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*s;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new tt(o,3)),this.setAttribute("normal",new tt(a,3)),this.setAttribute("uv",new tt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.segments,e.thetaStart,e.thetaLength)}},dt=class i extends Et{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],m=0,x=[],g=n/2,p=0;E(),o===!1&&(e>0&&S(!0),t>0&&S(!1)),this.setIndex(h),this.setAttribute("position",new tt(d,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(f,2));function E(){let y=new N,T=new N,M=0,v=(t-e)/n;for(let _=0;_<=r;_++){let R=[],C=_/r,I=C*(t-e)+e;for(let P=0;P<=s;P++){let H=P/s,F=H*l+a,k=Math.sin(F),V=Math.cos(F);T.x=I*k,T.y=-C*n+g,T.z=I*V,d.push(T.x,T.y,T.z),y.set(k,v,V).normalize(),u.push(y.x,y.y,y.z),f.push(H,1-C),R.push(m++)}x.push(R)}for(let _=0;_<s;_++)for(let R=0;R<r;R++){let C=x[R][_],I=x[R+1][_],P=x[R+1][_+1],H=x[R][_+1];(e>0||R!==0)&&(h.push(C,I,H),M+=3),(t>0||R!==r-1)&&(h.push(I,P,H),M+=3)}c.addGroup(p,M,0),p+=M}function S(y){let T=m,M=new fe,v=new N,_=0,R=y===!0?e:t,C=y===!0?1:-1;for(let P=1;P<=s;P++)d.push(0,g*C,0),u.push(0,C,0),f.push(.5,.5),m++;let I=m;for(let P=0;P<=s;P++){let F=P/s*l+a,k=Math.cos(F),V=Math.sin(F);v.x=R*V,v.y=g*C,v.z=R*k,d.push(v.x,v.y,v.z),u.push(0,C,0),M.x=k*.5+.5,M.y=V*.5*C+.5,f.push(M.x,M.y),m++}for(let P=0;P<s;P++){let H=T+P,F=I+P;y===!0?h.push(F,F+1,H):h.push(F+1,F,H),_+=3}c.addGroup(p,_,y===!0?1:2),p+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Qi=class i extends dt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new i(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Hn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){rt("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),s=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new fe:new N);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new N,s=[],r=[],o=[],a=new N,l=new At;for(let f=0;f<=e;f++){let m=f/e;s[f]=this.getTangentAt(m,new N)}r[0]=new N,o[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(mt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(mt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},hr=class extends Hn{constructor(e=0,t=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new fe){let n=t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ka=class extends hr{constructor(e,t,n,s,r,o){super(e,t,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};nd=new N,id=new N,$c=new Nh,Kc=new Nh,jc=new Nh,vi=class extends Hn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new N){let n=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(id.subVectors(s[0],s[1]).add(s[0]),c=id);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(nd.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=nd),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);x<1e-4&&(x=1),m<1e-4&&(m=x),g<1e-4&&(g=x),$c.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,m,x,g),Kc.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,m,x,g),jc.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,m,x,g)}else this.curveType==="catmullrom"&&($c.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Kc.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),jc.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set($c.calc(l),Kc.calc(l),jc.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new N().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};oo=class extends Hn{constructor(e=new fe,t=new fe,n=new fe,s=new fe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zr(e,s.x,r.x,o.x,a.x),Zr(e,s.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ga=class extends Hn{constructor(e=new N,t=new N,n=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new N){let n=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Zr(e,s.x,r.x,o.x,a.x),Zr(e,s.y,r.y,o.y,a.y),Zr(e,s.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ao=class extends Hn{constructor(e=new fe,t=new fe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new fe){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new fe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Va=class extends Hn{constructor(e=new N,t=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new N){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new N){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},lo=class extends Hn{constructor(e=new fe,t=new fe,n=new fe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new fe){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Yr(e,s.x,r.x,o.x),Yr(e,s.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},co=class extends Hn{constructor(e=new N,t=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new N){let n=t,s=this.v0,r=this.v1,o=this.v2;return n.set(Yr(e,s.x,r.x,o.x),Yr(e,s.y,r.y,o.y),Yr(e,s.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ho=class extends Hn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new fe){let n=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(sd(a,l.x,c.x,h.x,d.x),sd(a,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let s=e.points[t];this.points.push(new fe().fromArray(s))}return this}},Wa=Object.freeze({__proto__:null,ArcCurve:ka,CatmullRomCurve3:vi,CubicBezierCurve:oo,CubicBezierCurve3:Ga,EllipseCurve:hr,LineCurve:ao,LineCurve3:Va,QuadraticBezierCurve:lo,QuadraticBezierCurve3:co,SplineCurve:ho}),Xa=class extends Hn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let s=e.curves[t];this.curves.push(new Wa[s.type]().fromJSON(s))}return this}},Ms=class extends Xa{constructor(e){super(),this.type="Path",this.currentPoint=new fe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ao(this.currentPoint.clone(),new fe(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){let r=new lo(this.currentPoint.clone(),new fe(e,t),new fe(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,o){let a=new oo(this.currentPoint.clone(),new fe(e,t),new fe(n,s),new fe(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new ho(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,s,r,o),this}absarc(e,t,n,s,r,o){return this.absellipse(e,t,n,n,s,r,o),this}ellipse(e,t,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,s,r,o,a,l),this}absellipse(e,t,n,s,r,o,a,l){let c=new hr(e,t,n,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ot=class extends Ms{constructor(e){super(e),this.uuid=ws(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let s=e.holes[t];this.holes.push(new Ms().fromJSON(s))}return this}};ah=class{static triangulate(e,t,n=2){return um(e,t,n)}},mi=class i{static area(e){let t=e.length,n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return i.area(e)<0}static triangulateShape(e,t){let n=[],s=[],r=[];od(e),ad(n,e);let o=e.length;t.forEach(od);for(let l=0;l<t.length;l++)s.push(o),o+=t[l].length,ad(n,t[l]);let a=ah.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};Zt=class i extends Et{constructor(e=new Ot([new fe(.5,.5),new fe(-.5,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,s=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new tt(s,3)),this.setAttribute("uv",new tt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,E=t.UVGenerator!==void 0?t.UVGenerator:Am,S,y=!1,T,M,v,_;if(p){S=p.getSpacedPoints(h),y=!0,u=!1;let le=p.isCatmullRomCurve3?p.closed:!1;T=p.computeFrenetFrames(h,le),M=new N,v=new N,_=new N}u||(g=0,f=0,m=0,x=0);let R=a.extractPoints(c),C=R.shape,I=R.holes;if(!mi.isClockWise(C)){C=C.reverse();for(let le=0,de=I.length;le<de;le++){let xe=I[le];mi.isClockWise(xe)&&(I[le]=xe.reverse())}}function H(le){let xe=10000000000000001e-36,ye=le[0];for(let Ee=1;Ee<=le.length;Ee++){let Je=Ee%le.length,We=le[Je],nt=We.x-ye.x,$e=We.y-ye.y,D=nt*nt+$e*$e,Ue=Math.max(Math.abs(We.x),Math.abs(We.y),Math.abs(ye.x),Math.abs(ye.y)),Xe=xe*Ue*Ue;if(D<=Xe){le.splice(Je,1),Ee--;continue}ye=We}}H(C),I.forEach(H);let F=I.length,k=C;for(let le=0;le<F;le++){let de=I[le];C=C.concat(de)}function V(le,de,xe){return de||ot("ExtrudeGeometry: vec does not exist"),le.clone().addScaledVector(de,xe)}let W=C.length;function j(le,de,xe){let ye,Ee,Je,We=le.x-de.x,nt=le.y-de.y,$e=xe.x-le.x,D=xe.y-le.y,Ue=We*We+nt*nt,Xe=We*D-nt*$e;if(Math.abs(Xe)>Number.EPSILON){let L=Math.sqrt(Ue),b=Math.sqrt($e*$e+D*D),q=de.x-nt/L,J=de.y+We/L,re=xe.x-D/b,Me=xe.y+$e/b,be=((re-q)*D-(Me-J)*$e)/(We*D-nt*$e);ye=q+We*be-le.x,Ee=J+nt*be-le.y;let oe=ye*ye+Ee*Ee;if(oe<=2)return new fe(ye,Ee);Je=Math.sqrt(oe/2)}else{let L=!1;We>Number.EPSILON?$e>Number.EPSILON&&(L=!0):We<-Number.EPSILON?$e<-Number.EPSILON&&(L=!0):Math.sign(nt)===Math.sign(D)&&(L=!0),L?(ye=-nt,Ee=We,Je=Math.sqrt(Ue)):(ye=We,Ee=nt,Je=Math.sqrt(Ue/2))}return new fe(ye/Je,Ee/Je)}let Z=[];for(let le=0,de=k.length,xe=de-1,ye=le+1;le<de;le++,xe++,ye++)xe===de&&(xe=0),ye===de&&(ye=0),Z[le]=j(k[le],k[xe],k[ye]);let ie=[],se,we=Z.concat();for(let le=0,de=F;le<de;le++){let xe=I[le];se=[];for(let ye=0,Ee=xe.length,Je=Ee-1,We=ye+1;ye<Ee;ye++,Je++,We++)Je===Ee&&(Je=0),We===Ee&&(We=0),se[ye]=j(xe[ye],xe[Je],xe[We]);ie.push(se),we=we.concat(se)}let Se;if(g===0)Se=mi.triangulateShape(k,I);else{let le=[],de=[];for(let xe=0;xe<g;xe++){let ye=xe/g,Ee=f*Math.cos(ye*Math.PI/2),Je=m*Math.sin(ye*Math.PI/2)+x;for(let We=0,nt=k.length;We<nt;We++){let $e=V(k[We],Z[We],Je);he($e.x,$e.y,-Ee),ye===0&&le.push($e)}for(let We=0,nt=F;We<nt;We++){let $e=I[We];se=ie[We];let D=[];for(let Ue=0,Xe=$e.length;Ue<Xe;Ue++){let L=V($e[Ue],se[Ue],Je);he(L.x,L.y,-Ee),ye===0&&D.push(L)}ye===0&&de.push(D)}}Se=mi.triangulateShape(le,de)}let Ge=Se.length,Ve=m+x;for(let le=0;le<W;le++){let de=u?V(C[le],we[le],Ve):C[le];y?(v.copy(T.normals[0]).multiplyScalar(de.x),M.copy(T.binormals[0]).multiplyScalar(de.y),_.copy(S[0]).add(v).add(M),he(_.x,_.y,_.z)):he(de.x,de.y,0)}for(let le=1;le<=h;le++)for(let de=0;de<W;de++){let xe=u?V(C[de],we[de],Ve):C[de];y?(v.copy(T.normals[le]).multiplyScalar(xe.x),M.copy(T.binormals[le]).multiplyScalar(xe.y),_.copy(S[le]).add(v).add(M),he(_.x,_.y,_.z)):he(xe.x,xe.y,d/h*le)}for(let le=g-1;le>=0;le--){let de=le/g,xe=f*Math.cos(de*Math.PI/2),ye=m*Math.sin(de*Math.PI/2)+x;for(let Ee=0,Je=k.length;Ee<Je;Ee++){let We=V(k[Ee],Z[Ee],ye);he(We.x,We.y,d+xe)}for(let Ee=0,Je=I.length;Ee<Je;Ee++){let We=I[Ee];se=ie[Ee];for(let nt=0,$e=We.length;nt<$e;nt++){let D=V(We[nt],se[nt],ye);y?he(D.x,D.y+S[h-1].y,S[h-1].x+xe):he(D.x,D.y,d+xe)}}}at(),te();function at(){let le=s.length/3;if(u){let de=0,xe=W*de;for(let ye=0;ye<Ge;ye++){let Ee=Se[ye];pe(Ee[2]+xe,Ee[1]+xe,Ee[0]+xe)}de=h+g*2,xe=W*de;for(let ye=0;ye<Ge;ye++){let Ee=Se[ye];pe(Ee[0]+xe,Ee[1]+xe,Ee[2]+xe)}}else{for(let de=0;de<Ge;de++){let xe=Se[de];pe(xe[2],xe[1],xe[0])}for(let de=0;de<Ge;de++){let xe=Se[de];pe(xe[0]+W*h,xe[1]+W*h,xe[2]+W*h)}}n.addGroup(le,s.length/3-le,0)}function te(){let le=s.length/3,de=0;ae(k,de),de+=k.length;for(let xe=0,ye=I.length;xe<ye;xe++){let Ee=I[xe];ae(Ee,de),de+=Ee.length}n.addGroup(le,s.length/3-le,1)}function ae(le,de){let xe=le.length;for(;--xe>=0;){let ye=xe,Ee=xe-1;Ee<0&&(Ee=le.length-1);for(let Je=0,We=h+g*2;Je<We;Je++){let nt=W*Je,$e=W*(Je+1),D=de+ye+nt,Ue=de+Ee+nt,Xe=de+Ee+$e,L=de+ye+$e;me(D,Ue,Xe,L)}}}function he(le,de,xe){l.push(le),l.push(de),l.push(xe)}function pe(le,de,xe){De(le),De(de),De(xe);let ye=s.length/3,Ee=E.generateTopUV(n,s,ye-3,ye-2,ye-1);vt(Ee[0]),vt(Ee[1]),vt(Ee[2])}function me(le,de,xe,ye){De(le),De(de),De(ye),De(de),De(xe),De(ye);let Ee=s.length/3,Je=E.generateSideWallUV(n,s,Ee-6,Ee-3,Ee-2,Ee-1);vt(Je[0]),vt(Je[1]),vt(Je[3]),vt(Je[1]),vt(Je[2]),vt(Je[3])}function De(le){s.push(l[le*3+0]),s.push(l[le*3+1]),s.push(l[le*3+2])}function vt(le){r.push(le.x),r.push(le.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Cm(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Wa[s.type]().fromJSON(s)),new i(n,e.options)}},Am={generateTopUV:function(i,e,t,n,s){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[s*3],h=e[s*3+1];return[new fe(r,o),new fe(a,l),new fe(c,h)]},generateSideWallUV:function(i,e,t,n,s,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],m=e[s*3+2],x=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new fe(o,1-l),new fe(c,1-d),new fe(u,1-m),new fe(x,1-p)]:[new fe(a,1-l),new fe(h,1-d),new fe(f,1-m),new fe(g,1-p)]}};mo=class i extends Et{constructor(e=[new fe(0,-.5),new fe(.5,0),new fe(0,.5)],t=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:s},t=Math.floor(t),s=mt(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,d=new N,u=new fe,f=new N,m=new N,x=new N,g=0,p=0;for(let E=0;E<=e.length-1;E++)switch(E){case 0:g=e[E+1].x-e[E].x,p=e[E+1].y-e[E].y,f.x=p*1,f.y=-g,f.z=p*0,x.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(x.x,x.y,x.z);break;default:g=e[E+1].x-e[E].x,p=e[E+1].y-e[E].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=x.x,f.y+=x.y,f.z+=x.z,f.normalize(),l.push(f.x,f.y,f.z),x.copy(m)}for(let E=0;E<=t;E++){let S=n+E*h*s,y=Math.sin(S),T=Math.cos(S);for(let M=0;M<=e.length-1;M++){d.x=e[M].x*y,d.y=e[M].y,d.z=e[M].x*T,o.push(d.x,d.y,d.z),u.x=E/t,u.y=M/(e.length-1),a.push(u.x,u.y);let v=l[3*M+0]*y,_=l[3*M+1],R=l[3*M+0]*T;c.push(v,_,R)}}for(let E=0;E<t;E++)for(let S=0;S<e.length-1;S++){let y=S+E*e.length,T=y,M=y+e.length,v=y+e.length+1,_=y+1;r.push(T,M,_),r.push(v,_,M)}this.setIndex(r),this.setAttribute("position",new tt(o,3)),this.setAttribute("uv",new tt(a,2)),this.setAttribute("normal",new tt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.points,e.segments,e.phiStart,e.phiLength)}},Ct=class i extends Et{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=e/a,u=t/l,f=[],m=[],x=[],g=[];for(let p=0;p<h;p++){let E=p*u-o;for(let S=0;S<c;S++){let y=S*d-r;m.push(y,-E,0),x.push(0,0,1),g.push(S/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){let S=E+c*p,y=E+c*(p+1),T=E+1+c*(p+1),M=E+1+c*p;f.push(S,y,M),f.push(y,T,M)}this.setIndex(f),this.setAttribute("position",new tt(m,3)),this.setAttribute("normal",new tt(x,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},es=class i extends Et{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],c=[],h=[],d=e,u=(t-e)/s,f=new N,m=new fe;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}d+=u}for(let x=0;x<s;x++){let g=x*(n+1);for(let p=0;p<n;p++){let E=p+g,S=E,y=E+n+1,T=E+n+2,M=E+1;a.push(S,y,M),a.push(y,T,M)}}this.setIndex(a),this.setAttribute("position",new tt(l,3)),this.setAttribute("normal",new tt(c,3)),this.setAttribute("uv",new tt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Mi=class i extends Et{constructor(e=new Ot([new fe(0,.5),new fe(-.5,-.5),new fe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new tt(s,3)),this.setAttribute("normal",new tt(r,3)),this.setAttribute("uv",new tt(o,2));function c(h){let d=s.length/3,u=h.extractPoints(t),f=u.shape,m=u.holes;mi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let E=m[g];mi.isClockWise(E)===!0&&(m[g]=E.reverse())}let x=mi.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let E=m[g];f=f.concat(E)}for(let g=0,p=f.length;g<p;g++){let E=f[g];s.push(E.x,E.y,0),r.push(0,0,1),o.push(E.x,E.y)}for(let g=0,p=x.length;g<p;g++){let E=x[g],S=E[0]+d,y=E[1]+d,T=E[2]+d;n.push(S,y,T),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Pm(t,e)}static fromJSON(e,t){let n=[];for(let s=0,r=e.shapes.length;s<r;s++){let o=t[e.shapes[s]];n.push(o)}return new i(n,e.curveSegments)}};ln=class i extends Et{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new N,u=new N,f=[],m=[],x=[],g=[];for(let p=0;p<=n;p++){let E=[],S=p/n,y=o+S*a,T=e*Math.cos(y),M=Math.sqrt(e*e-T*T),v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let _=0;_<=t;_++){let R=_/t,C=s+R*r;d.x=-M*Math.cos(C),d.y=T,d.z=M*Math.sin(C),m.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),g.push(R+v,1-S),E.push(c++)}h.push(E)}for(let p=0;p<n;p++)for(let E=0;E<t;E++){let S=h[p][E+1],y=h[p][E],T=h[p+1][E],M=h[p+1][E+1];(p!==0||o>0)&&f.push(S,y,M),(p!==n-1||l<Math.PI)&&f.push(y,T,M)}this.setIndex(f),this.setAttribute("position",new tt(m,3)),this.setAttribute("normal",new tt(x,3)),this.setAttribute("uv",new tt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},zn=class i extends Et{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new N,f=new N,m=new N;for(let x=0;x<=n;x++){let g=o+x/n*a;for(let p=0;p<=s;p++){let E=p/s*r;f.x=(e+t*Math.cos(g))*Math.cos(E),f.y=(e+t*Math.cos(g))*Math.sin(E),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(E),u.y=e*Math.sin(E),m.subVectors(f,u).normalize(),h.push(m.x,m.y,m.z),d.push(p/s),d.push(x/n)}}for(let x=1;x<=n;x++)for(let g=1;g<=s;g++){let p=(s+1)*x+g-1,E=(s+1)*(x-1)+g-1,S=(s+1)*(x-1)+g,y=(s+1)*x+g;l.push(p,E,y),l.push(E,S,y)}this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Es=class i extends Et{constructor(e=new co(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new N,l=new N,c=new fe,h=new N,d=[],u=[],f=[],m=[];x(),this.setIndex(m),this.setAttribute("position",new tt(d,3)),this.setAttribute("normal",new tt(u,3)),this.setAttribute("uv",new tt(f,2));function x(){for(let S=0;S<t;S++)g(S);g(r===!1?t:0),E(),p()}function g(S){h=e.getPointAt(S/t,h);let y=o.normals[S],T=o.binormals[S];for(let M=0;M<=s;M++){let v=M/s*Math.PI*2,_=Math.sin(v),R=-Math.cos(v);l.x=R*y.x+_*T.x,l.y=R*y.y+_*T.y,l.z=R*y.z+_*T.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function p(){for(let S=1;S<=t;S++)for(let y=1;y<=s;y++){let T=(s+1)*(S-1)+(y-1),M=(s+1)*S+(y-1),v=(s+1)*S+y,_=(s+1)*(S-1)+y;m.push(T,M,_),m.push(M,v,_)}}function E(){for(let S=0;S<=t;S++)for(let y=0;y<=s;y++)c.x=S/t,c.y=y/s,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new i(new Wa[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}};tf={clone:Rs,merge:bn},Lm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Nm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Rn=class extends Ui{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Lm,this.fragmentShader=Nm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Rs(e.uniforms),this.uniformsGroups=Im(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Qe().setHex(s.value);break;case"v2":this.uniforms[n].value=new fe().fromArray(s.value);break;case"v3":this.uniforms[n].value=new N().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ht().fromArray(s.value);break;case"m3":this.uniforms[n].value=new ct().fromArray(s.value);break;case"m4":this.uniforms[n].value=new At().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},qa=class extends Rn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ue=class extends Ui{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lo,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},yt=class extends ue{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new fe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},go=class extends Ui{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lo,this.normalScale=new fe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=hl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ya=class extends Ui{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Fd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Za=class extends Ui{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};ts=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let o;t:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break e}o=t.length;break t}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}o=n,n=0;break t}break n}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ja=class extends ts{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:nh,endingEnd:nh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case ih:r=e,a=2*t-n;break;case sh:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ih:o=e,l=2*n-t;break;case sh:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(n-t)/(s-t),x=m*m,g=x*m,p=-u*g+2*u*x-u*m,E=(1+u)*g+(-1.5-2*u)*x+(-.5+u)*m+1,S=(-1-f)*g+(1.5+f)*x+.5*m,y=f*g-f*x;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+E*o[c+T]+S*o[l+T]+y*o[d+T];return r}},$a=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Ka=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},ja=class extends ts{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let m=(n-t)/(s-t),x=1-m;for(let g=0;g!==a;++g)r[g]=o[c+g]*x+o[l+g]*m;return r}let u=a*2,f=e-1;for(let m=0;m!==a;++m){let x=o[c+m],g=o[l+m],p=f*u+m*2,E=d[p],S=d[p+1],y=e*u+m*2,T=h[y],M=h[y+1],v=Um(n,t,E,T,s);r[m]=nf(v,x,S,M,g)}return r}};kn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$s(t,this.TimeBufferType),this.values=$s(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$s(e.times,Array),values:$s(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Qc(e.settings)&&(n.settings={inTangents:$s(e.settings.inTangents,Array),outTangents:$s(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $a(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new ja(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Jr:t=this.InterpolantFactoryMethodDiscrete;break;case Ua:t=this.InterpolantFactoryMethodLinear;break;case Sa:t=this.InterpolantFactoryMethodSmooth;break;case th:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return rt("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return Ua;case this.InterpolantFactoryMethodSmooth:return Sa;case this.InterpolantFactoryMethodBezier:return th}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Qc(this.settings)&&(cd(this.settings.inTangents,e),cd(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ot("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(ot("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){ot("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){ot("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&b0(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){ot("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Sa,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let m=0;m!==n;++m){let x=t[d+m];if(x!==t[u+m]||x!==t[f+m]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Qc(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};kn.prototype.ValueTypeName="";kn.prototype.TimeBufferType=Float32Array;kn.prototype.ValueBufferType=Float32Array;kn.prototype.DefaultInterpolation=Ua;ns=class extends kn{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Jr;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;Qa=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}};Qa.prototype.ValueTypeName="color";el=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}};el.prototype.ValueTypeName="number";tl=class extends ts{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Mn.slerpFlat(r,0,o,c-a,o,c,l);return r}},xo=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new tl(this.times,this.values,this.getValueSize(),e)}};xo.prototype.ValueTypeName="quaternion";xo.prototype.InterpolantFactoryMethodSmooth=void 0;is=class extends kn{constructor(e,t,n){super(e,t,n)}};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=Jr;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;nl=class extends kn{constructor(e,t,n,s){super(e,t,n,s)}};nl.prototype.ValueTypeName="vector";wa={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(hd(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!hd(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};il=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},sf=new il,dr=class{constructor(e){this.manager=e!==void 0?e:sf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};dr.DEFAULT_MATERIAL_NAME="__DEFAULT";Ks=new WeakMap,sl=class extends dr{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=wa.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Ks.get(o);d===void 0&&(d=[],Ks.set(o,d)),d.push({onLoad:t,onError:s})}return o}let a=sr("img");function l(){h(),t&&t(this);let d=Ks.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}Ks.delete(this),r.manager.itemEnd(e)}function c(d){h(),s&&s(d),wa.remove(`image:${e}`);let u=Ks.get(this)||[];for(let f=0;f<u.length;f++){let m=u[f];m.onError&&m.onError(d)}Ks.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),wa.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}},Yn=class extends dr{constructor(e){super(e)}load(e,t,n,s){let r=new jt,o=new sl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},_o=class extends mn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},eh=new At,ud=new N,dd=new N,yo=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new fe(512,512),this.mapType=Nn,this.map=null,this.mapPass=null,this.matrix=new At,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cr,this._frameExtents=new fe(1,1),this._viewportCount=1,this._viewports=[new Ht(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;ud.setFromMatrixPosition(e.matrixWorld),t.position.copy(ud),dd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){eh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(eh,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ir||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(eh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ba=new N,Ea=new Mn,fi=new N,vo=class extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new At,this.projectionMatrix=new At,this.projectionMatrixInverse=new At,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ba,Ea,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ba,Ea,fi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ba,Ea,fi),fi.x===1&&fi.y===1&&fi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ba,Ea,fi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ji=new N,fd=new fe,pd=new fe,fn=class extends vo{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=or*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return or*2*Math.atan(Math.tan(Xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-e/Ji.z)}getViewSize(e,t){return this.getViewBounds(e,fd,pd),t.subVectors(pd,fd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Xr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},lh=class extends yo{constructor(){super(new fn(90,1,.5,500)),this.isPointLightShadow=!0}},Ss=class extends _o{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new lh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},fr=class extends vo{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ch=class extends yo{constructor(){super(new fr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Mo=class extends _o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(mn.DEFAULT_UP),this.updateMatrix(),this.target=new mn,this.shadow=new ch}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},js=-90,Qs=1,rl=class extends mn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new fn(js,Qs,e,t);s.layers=this.layers,this.add(s);let r=new fn(js,Qs,e,t);r.layers=this.layers,this.add(r);let o=new fn(js,Qs,e,t);o.layers=this.layers,this.add(o);let a=new fn(js,Qs,e,t);a.layers=this.layers,this.add(a);let l=new fn(js,Qs,e,t);l.layers=this.layers,this.add(l);let c=new fn(js,Qs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ri)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ir)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,s),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},ol=class extends fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Uh="\\[\\]\\.:\\/",Fm=new RegExp("["+Uh+"]","g"),Fh="[^"+Uh+"]",Bm="[^"+Uh.replace("\\.","")+"]",Om=/((?:WC+[\/:])*)/.source.replace("WC",Fh),Hm=/(WCOD+)?/.source.replace("WCOD",Bm),zm=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Fh),km=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Fh),Gm=new RegExp("^"+Om+Hm+zm+km+"$"),Vm=["material","materials","bones","map"],hh=class{constructor(e,t,n){let s=n||Bt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Bt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Fm,"")}static parseTrackName(e){let t=Gm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Vm.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){rt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ot("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ot("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ot("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ot("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){ot("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){ot("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;ot("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ot("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Bt.Composite=hh;Bt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Bt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Bt.prototype.GetterByBindingType=[Bt.prototype._getValue_direct,Bt.prototype._getValue_array,Bt.prototype._getValue_arrayElement,Bt.prototype._getValue_toArray];Bt.prototype.SetterByBindingTypeAndVersioning=[[Bt.prototype._setValue_direct,Bt.prototype._setValue_direct_setNeedsUpdate,Bt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_array,Bt.prototype._setValue_array_setNeedsUpdate,Bt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_arrayElement,Bt.prototype._setValue_arrayElement_setNeedsUpdate,Bt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Bt.prototype._setValue_fromArray,Bt.prototype._setValue_fromArray_setNeedsUpdate,Bt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];rb=new Float32Array(1),Gh=class Gh{constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}};Gh.prototype.isMatrix2=!0;uh=Gh;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186")});function wf(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function qm(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<d.length;f++){let m=d[u],x=d[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,m=d.length;f<m;f++){let x=d[f];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}function A_(i,e,t,n,s,r){let o=new Qe(0),a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(E){let S=E.isScene===!0?E.background:null;if(S&&S.isTexture){let y=E.backgroundBlurriness>0;S=e.get(S,y)}return S}function m(E){let S=!1,y=f(E);y===null?g(o,a):y&&y.isColor&&(g(y,1),S=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(E,S){let y=f(S);y&&(y.isCubeTexture||y.mapping===So)?(c===void 0&&(c=new Y(new it(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:Rs(Si.backgroundCube.uniforms),vertexShader:Si.backgroundCube.vertexShader,fragmentShader:Si.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,M,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(R_.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Rf),c.material.toneMapped=Mt.getTransfer(y.colorSpace)!==Rt,(h!==y||d!==y.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Y(new Ct(2,2),new Rn({name:"BackgroundMaterial",uniforms:Rs(Si.background.uniforms),vertexShader:Si.background.vertexShader,fragmentShader:Si.background.fragmentShader,side:ss,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Mt.getTransfer(y.colorSpace)!==Rt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function g(E,S){E.getRGB(ec,Dh(i)),t.buffers.color.setClear(ec.r,ec.g,ec.b,S,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(E,S=1){o.set(E),a=S,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(E){a=E,g(o,a)},render:m,addToRenderList:x,dispose:p}}function C_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(I,P,H,F,k){let V=!1,W=d(I,F,H,P);r!==W&&(r=W,c(r.object)),V=f(I,F,H,k),V&&m(I,F,H,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,y(I,P,H,F),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function h(I){return i.deleteVertexArray(I)}function d(I,P,H,F){let k=F.wireframe===!0,V=n[P.id];V===void 0&&(V={},n[P.id]=V);let W=I.isInstancedMesh===!0?I.id:0,j=V[W];j===void 0&&(j={},V[W]=j);let Z=j[H.id];Z===void 0&&(Z={},j[H.id]=Z);let ie=Z[k];return ie===void 0&&(ie=u(l()),Z[k]=ie),ie}function u(I){let P=[],H=[],F=[];for(let k=0;k<t;k++)P[k]=0,H[k]=0,F[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:H,attributeDivisors:F,object:I,attributes:{},index:null}}function f(I,P,H,F){let k=r.attributes,V=P.attributes,W=0,j=H.getAttributes();for(let Z in j)if(j[Z].location>=0){let se=k[Z],we=V[Z];if(we===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(we=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(we=I.instanceColor)),se===void 0||se.attribute!==we||we&&se.data!==we.data)return!0;W++}return r.attributesNum!==W||r.index!==F}function m(I,P,H,F){let k={},V=P.attributes,W=0,j=H.getAttributes();for(let Z in j)if(j[Z].location>=0){let se=V[Z];se===void 0&&(Z==="instanceMatrix"&&I.instanceMatrix&&(se=I.instanceMatrix),Z==="instanceColor"&&I.instanceColor&&(se=I.instanceColor));let we={};we.attribute=se,se&&se.data&&(we.data=se.data),k[Z]=we,W++}r.attributes=k,r.attributesNum=W,r.index=F}function x(){let I=r.newAttributes;for(let P=0,H=I.length;P<H;P++)I[P]=0}function g(I){p(I,0)}function p(I,P){let H=r.newAttributes,F=r.enabledAttributes,k=r.attributeDivisors;H[I]=1,F[I]===0&&(i.enableVertexAttribArray(I),F[I]=1),k[I]!==P&&(i.vertexAttribDivisor(I,P),k[I]=P)}function E(){let I=r.newAttributes,P=r.enabledAttributes;for(let H=0,F=P.length;H<F;H++)P[H]!==I[H]&&(i.disableVertexAttribArray(H),P[H]=0)}function S(I,P,H,F,k,V,W){W===!0?i.vertexAttribIPointer(I,P,H,k,V):i.vertexAttribPointer(I,P,H,F,k,V)}function y(I,P,H,F){x();let k=F.attributes,V=H.getAttributes(),W=P.defaultAttributeValues;for(let j in V){let Z=V[j];if(Z.location>=0){let ie=k[j];if(ie===void 0&&(j==="instanceMatrix"&&I.instanceMatrix&&(ie=I.instanceMatrix),j==="instanceColor"&&I.instanceColor&&(ie=I.instanceColor)),ie!==void 0){let se=ie.normalized,we=ie.itemSize,Se=e.get(ie);if(Se===void 0)continue;let Ge=Se.buffer,Ve=Se.type,at=Se.bytesPerElement,te=Ve===i.INT||Ve===i.UNSIGNED_INT||ie.gpuType===pl;if(ie.isInterleavedBufferAttribute){let ae=ie.data,he=ae.stride,pe=ie.offset;if(ae.isInstancedInterleavedBuffer){for(let me=0;me<Z.locationSize;me++)p(Z.location+me,ae.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let me=0;me<Z.locationSize;me++)g(Z.location+me);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let me=0;me<Z.locationSize;me++)S(Z.location+me,we/Z.locationSize,Ve,se,he*at,(pe+we/Z.locationSize*me)*at,te)}else{if(ie.isInstancedBufferAttribute){for(let ae=0;ae<Z.locationSize;ae++)p(Z.location+ae,ie.meshPerAttribute);I.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ae=0;ae<Z.locationSize;ae++)g(Z.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Ge);for(let ae=0;ae<Z.locationSize;ae++)S(Z.location+ae,we/Z.locationSize,Ve,se,we*at,we/Z.locationSize*ae*at,te)}}else if(W!==void 0){let se=W[j];if(se!==void 0)switch(se.length){case 2:i.vertexAttrib2fv(Z.location,se);break;case 3:i.vertexAttrib3fv(Z.location,se);break;case 4:i.vertexAttrib4fv(Z.location,se);break;default:i.vertexAttrib1fv(Z.location,se)}}}}E()}function T(){R();for(let I in n){let P=n[I];for(let H in P){let F=P[H];for(let k in F){let V=F[k];for(let W in V)h(V[W].object),delete V[W];delete F[k]}}delete n[I]}}function M(I){if(n[I.id]===void 0)return;let P=n[I.id];for(let H in P){let F=P[H];for(let k in F){let V=F[k];for(let W in V)h(V[W].object),delete V[W];delete F[k]}}delete n[I.id]}function v(I){for(let P in n){let H=n[P];for(let F in H){let k=H[F];if(k[I.id]===void 0)continue;let V=k[I.id];for(let W in V)h(V[W].object),delete V[W];delete k[I.id]}}}function _(I){for(let P in n){let H=n[P],F=I.isInstancedMesh===!0?I.id:0,k=H[F];if(k!==void 0){for(let V in k){let W=k[V];for(let j in W)h(W[j].object),delete W[j];delete k[V]}delete H[F],Object.keys(H).length===0&&delete n[P]}}}function R(){C(),o=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:C,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfObject:_,releaseStatesOfProgram:v,initAttributes:x,enableAttribute:g,disableUnusedAttributes:E}}function P_(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function I_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let v=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(v.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(v){return!(v!==Jn&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(v){let _=v===li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(v!==Nn&&v!==Zn&&!_&&n.convert(v)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(v){if(v==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";v="mediump"}return v==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(rt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),E=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:E,maxVaryings:S,maxFragmentUniforms:y,maxSamples:T,samples:M}}function L_(i){let e=this,t=null,n=0,s=!1,r=!1,o=new si,a=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let m=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?h(null):c();else{let E=r?0:n,S=E*4,y=p.clippingState||null;l.value=y,y=h(m,u,S,f);for(let T=0;T!==S;++T)y[T]=t[T];p.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,m){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=l.value,m!==!0||g===null){let p=f+x*4,E=u.matrixWorldInverse;a.getNormalMatrix(E),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,y=f;S!==x;++S,y+=4)o.copy(d[S]).applyMatrix4(E,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function B_(i){let e=[],t=[],n=i,s=i-yr+1+N_;for(let r=0;r<s;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,m=new Float32Array(f*u*d),x=new Float32Array(f*u*d);for(let p=0;p<d;p++){let E=p%3*2/3-1,S=p>2?0:-1,y=[E,S,0,E+2/3,S,0,E+2/3,S+1,0,E,S,0,E+2/3,S+1,0,E,S+1,0];m.set(y,f*u*p);for(let T=0;T<u;T++){let M=h[T*2]*2-1,v=h[T*2+1]*2-1;p===0?As.set(1,v,M):p===1?As.set(-M,1,-v):p===2?As.set(-M,v,1):p===3?As.set(-1,v,-M):p===4?As.set(-M,-1,v):As.set(M,v,-1),As.toArray(x,(p*u+T)*f)}}let g=new Et;g.setAttribute("position",new Dt(m,f)),g.setAttribute("outputDirection",new Dt(x,f)),t.push(new Y(g,null)),n>yr&&n--}return{lodMeshes:t,sizeLods:e}}function of(i,e,t){let n=new Ln(i,e,t);return n.texture.mapping=So,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _r(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function O_(i,e,t){return new Rn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:U_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:sc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function H_(i,e,t){return new Rn({name:"SphericalGaussianBlur",defines:{SAMPLES:D_,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:sc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function af(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function lf(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function sc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function z_(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ul||f===dl)if(e.has(u)){let m=e.get(u).texture;return a(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let x=new nc(m.height);return x.fromEquirectangularTexture(i,u),e.set(u,x),u.addEventListener("dispose",c),a(x.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,m=f===ul||f===dl,x=f===as||f===Ts;if(m||x){let g=t.get(u),p=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new Mr(i)),g=m?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let E=u.image;return m&&E&&E.height>0||x&&E&&l(E)?(n===null&&(n=new Mr(i)),g=m?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===ul?u.mapping=as:f===dl&&(u.mapping=Ts),u}function l(u){let f=0,m=6;for(let x=0;x<m;x++)u[x]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function k_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&_s("WebGLRenderer: "+n+" extension not supported."),s}}}function G_(i,e,t,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,m=d.attributes.position,x=0;if(m===void 0)return;if(f!==null){let E=f.array;x=f.version;for(let S=0,y=E.length;S<y;S+=3){let T=E[S+0],M=E[S+1],v=E[S+2];u.push(T,M,M,v,v,T)}}else{let E=m.array;x=m.version;for(let S=0,y=E.length/3-1;S<y;S+=3){let T=S+0,M=S+1,v=S+2;u.push(T,M,M,v,v,T)}}let g=new(m.count>=65535?to:eo)(u,1);g.version=x;let p=r.get(d);p&&e.remove(p),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function V_(i,e,t){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*o),t.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let x=0;for(let g=0;g<f;g++)x+=u[g];t.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function W_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:ot("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function X_(i,e,t){let n=new WeakMap,s=new Ht;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let R=function(){v.dispose(),n.delete(a),a.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],S=0;f===!0&&(S=1),m===!0&&(S=2),x===!0&&(S=3);let y=a.attributes.position.count*S,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let M=new Float32Array(y*T*4*d),v=new jr(M,y,T,d);v.type=Zn,v.needsUpdate=!0;let _=S*4;for(let C=0;C<d;C++){let I=g[C],P=p[C],H=E[C],F=y*T*4*C;for(let k=0;k<I.count;k++){let V=k*_;f===!0&&(s.fromBufferAttribute(I,k),M[F+V+0]=s.x,M[F+V+1]=s.y,M[F+V+2]=s.z,M[F+V+3]=0),m===!0&&(s.fromBufferAttribute(P,k),M[F+V+4]=s.x,M[F+V+5]=s.y,M[F+V+6]=s.z,M[F+V+7]=0),x===!0&&(s.fromBufferAttribute(H,k),M[F+V+8]=s.x,M[F+V+9]=s.y,M[F+V+10]=s.z,M[F+V+11]=H.itemSize===4?s.w:1)}}u={count:d,texture:v,size:new fe(y,T)},n.set(a,u),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function q_(i,e,t,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}function Z_(i,e,t,n,s,r){let o=new Ln(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new Et;c.setAttribute("position",new tt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new tt([0,2,0,0,2,0],2));let h=new qa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Y(c,h),u=new fr(-1,1,1,-1,0,1),f=null,m=null,x=!1,g,p=null,E=[],S=!1;this.setSize=function(y,T){o.setSize(y,T),a!==null&&a.setSize(y,T),l!==null&&l.setSize(y,T);for(let M=0;M<E.length;M++){let v=E[M];v.setSize&&v.setSize(y,T)}},this.setEffects=function(y){E=y,S=E.length>0&&E[0].isRenderPass===!0;let T=o.width,M=o.height;E.length>0&&a===null&&(a=new Ln(T,M,{type:li,depthBuffer:!1,stencilBuffer:!1}),l=new Ln(T,M,{type:li,depthBuffer:!1,stencilBuffer:!1}));for(let v=0;v<E.length;v++){let _=E[v];_.setSize&&_.setSize(T,M)}},this.begin=function(y,T){if(x||y.toneMapping===oi&&E.length===0)return!1;if(p=T,T!==null){let M=T.width,v=T.height;(o.width!==M||o.height!==v)&&this.setSize(M,v)}return S===!1&&y.setRenderTarget(o),g=y.toneMapping,y.toneMapping=oi,!0},this.hasRenderPass=function(){return S},this.end=function(y,T){y.toneMapping=g,x=!0;let M=o,v=a;for(let _=0;_<E.length;_++){let R=E[_];R.enabled!==!1&&(R.render(y,v,M,T),R.needsSwap!==!1&&(M=v,v=v===a?l:a))}if(f!==y.outputColorSpace||m!==y.toneMapping){f=y.outputColorSpace,m=y.toneMapping,h.defines={},Mt.getTransfer(f)===Rt&&(h.defines.SRGB_TRANSFER="");let _=Y_[m];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=M.texture,y.setRenderTarget(p),y.render(d,u),p=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}function br(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=cf[s];if(r===void 0&&(r=new Float32Array(s),cf[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function tn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function nn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function rc(i,e){let t=hf[e];t===void 0&&(t=new Int32Array(e),hf[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function J_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function $_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;i.uniform2fv(this.addr,e),nn(t,e)}}function K_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;i.uniform3fv(this.addr,e),nn(t,e)}}function j_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;i.uniform4fv(this.addr,e),nn(t,e)}}function Q_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;ff.set(n),i.uniformMatrix2fv(this.addr,!1,ff),nn(t,n)}}function ey(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;df.set(n),i.uniformMatrix3fv(this.addr,!1,df),nn(t,n)}}function ty(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;uf.set(n),i.uniformMatrix4fv(this.addr,!1,uf),nn(t,n)}}function ny(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function iy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;i.uniform2iv(this.addr,e),nn(t,e)}}function sy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;i.uniform3iv(this.addr,e),nn(t,e)}}function ry(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;i.uniform4iv(this.addr,e),nn(t,e)}}function oy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function ay(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;i.uniform2uiv(this.addr,e),nn(t,e)}}function ly(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;i.uniform3uiv(this.addr,e),nn(t,e)}}function cy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;i.uniform4uiv(this.addr,e),nn(t,e)}}function hy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?($h.compareFunction=t.isReversedDepthBuffer()?jl:Kl,r=$h):r=Af,t.setTexture2D(e||r,s)}function uy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Pf,s)}function dy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||If,s)}function fy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Cf,s)}function py(i){switch(i){case 5126:return J_;case 35664:return $_;case 35665:return K_;case 35666:return j_;case 35674:return Q_;case 35675:return ey;case 35676:return ty;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return sy;case 35669:case 35673:return ry;case 5125:return oy;case 36294:return ay;case 36295:return ly;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return hy;case 35679:case 36299:case 36307:return uy;case 35680:case 36300:case 36308:case 36293:return dy;case 36289:case 36303:case 36311:case 36292:return fy}}function my(i,e){i.uniform1fv(this.addr,e)}function gy(i,e){let t=br(e,this.size,2);i.uniform2fv(this.addr,t)}function xy(i,e){let t=br(e,this.size,3);i.uniform3fv(this.addr,t)}function _y(i,e){let t=br(e,this.size,4);i.uniform4fv(this.addr,t)}function yy(i,e){let t=br(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function vy(i,e){let t=br(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function My(i,e){let t=br(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function by(i,e){i.uniform1iv(this.addr,e)}function Ey(i,e){i.uniform2iv(this.addr,e)}function Sy(i,e){i.uniform3iv(this.addr,e)}function Ty(i,e){i.uniform4iv(this.addr,e)}function wy(i,e){i.uniform1uiv(this.addr,e)}function Ry(i,e){i.uniform2uiv(this.addr,e)}function Ay(i,e){i.uniform3uiv(this.addr,e)}function Cy(i,e){i.uniform4uiv(this.addr,e)}function Py(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=$h:o=Af;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function Iy(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Pf,r[o])}function Ly(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||If,r[o])}function Ny(i,e,t){let n=this.cache,s=e.length,r=rc(t,s);tn(n,r)||(i.uniform1iv(this.addr,r),nn(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Cf,r[o])}function Dy(i){switch(i){case 5126:return my;case 35664:return gy;case 35665:return xy;case 35666:return _y;case 35674:return yy;case 35675:return vy;case 35676:return My;case 5124:case 35670:return by;case 35667:case 35671:return Ey;case 35668:case 35672:return Sy;case 35669:case 35673:return Ty;case 5125:return wy;case 36294:return Ry;case 36295:return Ay;case 36296:return Cy;case 35678:case 36198:case 36298:case 36306:case 35682:return Py;case 35679:case 36299:case 36307:return Iy;case 35680:case 36300:case 36308:case 36293:return Ly;case 36289:case 36303:case 36311:case 36292:return Ny}}function pf(i,e){i.seq.push(e),i.map[e.id]=e}function Uy(i,e,t){let n=i.name,s=n.length;for(Zh.lastIndex=0;;){let r=Zh.exec(n),o=Zh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){pf(t,c===void 0?new Kh(a,i,e):new jh(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Qh(a),pf(t,d)),t=d}}}function mf(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}function Oy(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Hy(i){Mt._getMatrix(gf,Mt.workingColorSpace,i);let e=`mat3( ${gf.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(i)){case Kr:return[e,"LinearTransferOETF"];case Rt:return[e,"sRGBTransferOETF"];default:return rt("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function xf(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Oy(i.getShaderSource(e),a)}else return r}function zy(i,e){let t=Hy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Gy(i,e){let t=ky[e];return t===void 0?(rt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Vy(){Mt.getLuminanceCoefficients(tc);let i=tc.x.toFixed(4),e=tc.y.toFixed(4),t=tc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Uo).join(`
`)}function Xy(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qy(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Uo(i){return i!==""}function _f(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yf(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function eu(i){return i.replace(Yy,Jy)}function Jy(i,e){let t=gt[e];if(t===void 0){let n=Zy.get(e);if(n!==void 0)t=gt[n],rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return eu(t)}function vf(i){return i.replace($y,Ky)}function Ky(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Mf(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Qy(i){return jy[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function tv(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":ev[i.envMapMode]||"ENVMAP_TYPE_CUBE"}function iv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":nv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}function rv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":sv[i.combine]||"ENVMAP_BLENDING_NONE"}function ov(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function av(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Qy(t),c=tv(t),h=iv(t),d=rv(t),u=ov(t),f=Wy(t),m=Xy(r),x=s.createProgram(),g,p,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Uo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Uo).join(`
`),p.length>0&&(p+=`
`)):(g=[Mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Uo).join(`
`),p=[Mf(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==oi?"#define TONE_MAPPING":"",t.toneMapping!==oi?gt.tonemapping_pars_fragment:"",t.toneMapping!==oi?Gy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",gt.colorspace_pars_fragment,zy("linearToOutputTexel",t.outputColorSpace),Vy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Uo).join(`
`)),o=eu(o),o=_f(o,t),o=yf(o,t),a=eu(a),a=_f(a,t),a=yf(a,t),o=vf(o),a=vf(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Ph?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ph?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=E+g+o,y=E+p+a,T=mf(s,s.VERTEX_SHADER,S),M=mf(s,s.FRAGMENT_SHADER,y);s.attachShader(x,T),s.attachShader(x,M),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function v(I){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(x)||"",H=s.getShaderInfoLog(T)||"",F=s.getShaderInfoLog(M)||"",k=P.trim(),V=H.trim(),W=F.trim(),j=!0,Z=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(j=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,M);else{let ie=xf(s,T,"vertex"),se=xf(s,M,"fragment");ot("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+k+`
`+ie+`
`+se)}else k!==""?rt("WebGLProgram: Program Info Log:",k):(V===""||W==="")&&(Z=!1);Z&&(I.diagnostics={runnable:j,programLog:k,vertexShader:{log:V,prefix:g},fragmentShader:{log:W,prefix:p}})}s.deleteShader(T),s.deleteShader(M),_=new vr(s,x),R=qy(s,x)}let _;this.getUniforms=function(){return _===void 0&&v(this),_};let R;this.getAttributes=function(){return R===void 0&&v(this),R};let C=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(x,Fy)),C},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=By++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=M,this}function cv(i){return i===hs||i===Po||i===Io}function hv(i,e,t,n,s,r){let o=new Qr,a=new tu,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(_){return l.add(_),_===0?"uv":`uv${_}`}function x(_,R,C,I,P,H){let F=I.fog,k=P.geometry,V=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?I.environment:null,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,j=e.get(_.envMap||V,W),Z=j&&j.mapping===So?j.image.height:null,ie=f[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&rt("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let se=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,we=se!==void 0?se.length:0,Se=0;k.morphAttributes.position!==void 0&&(Se=1),k.morphAttributes.normal!==void 0&&(Se=2),k.morphAttributes.color!==void 0&&(Se=3);let Ge,Ve,at,te;if(ie){let _e=Si[ie];Ge=_e.vertexShader,Ve=_e.fragmentShader}else{Ge=_.vertexShader,Ve=_.fragmentShader;let _e=a.getVertexShaderStage(_),ve=a.getFragmentShaderStage(_);a.update(_,_e,ve),at=_e.id,te=ve.id}let ae=i.getRenderTarget(),he=i.state.buffers.depth.getReversed(),pe=P.isInstancedMesh===!0,me=P.isBatchedMesh===!0,De=!!_.map,vt=!!_.matcap,le=!!j,de=!!_.aoMap,xe=!!_.lightMap,ye=!!_.bumpMap&&_.wireframe===!1,Ee=!!_.normalMap,Je=!!_.displacementMap,We=!!_.emissiveMap,nt=!!_.metalnessMap,$e=!!_.roughnessMap,D=_.anisotropy>0,Ue=_.clearcoat>0,Xe=_.dispersion>0,L=_.retroreflectivity>0,b=_.iridescence>0,q=_.sheen>0,J=_.transmission>0,re=D&&!!_.anisotropyMap,Me=Ue&&!!_.clearcoatMap,be=Ue&&!!_.clearcoatNormalMap,oe=Ue&&!!_.clearcoatRoughnessMap,ce=b&&!!_.iridescenceMap,Re=b&&!!_.iridescenceThicknessMap,qe=q&&!!_.sheenColorMap,Ae=q&&!!_.sheenRoughnessMap,Te=!!_.specularMap,ze=!!_.specularColorMap,je=!!_.specularIntensityMap,ht=J&&!!_.transmissionMap,w=J&&!!_.thicknessMap,z=!!_.gradientMap,U=!!_.alphaMap,B=_.alphaTest>0,X=!!_.alphaHash,O=!!_.extensions,Q=oi;_.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Q=i.toneMapping);let ne={shaderID:ie,shaderType:_.type,shaderName:_.name,vertexShader:Ge,fragmentShader:Ve,defines:_.defines,customVertexShaderID:at,customFragmentShaderID:te,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:me,batchingColor:me&&P._colorsTexture!==null,instancing:pe,instancingColor:pe&&P.instanceColor!==null,instancingMorph:pe&&P.morphTexture!==null,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:De,matcap:vt,envMap:le,envMapMode:le&&j.mapping,envMapCubeUVHeight:Z,aoMap:de,lightMap:xe,bumpMap:ye,normalMap:Ee,displacementMap:Je,emissiveMap:We,normalMapObjectSpace:Ee&&_.normalMapType===Bd,normalMapTangentSpace:Ee&&_.normalMapType===Lo,packedNormalMap:Ee&&_.normalMapType===Lo&&cv(_.normalMap.format),metalnessMap:nt,roughnessMap:$e,anisotropy:D,anisotropyMap:re,clearcoat:Ue,clearcoatMap:Me,clearcoatNormalMap:be,clearcoatRoughnessMap:oe,dispersion:Xe,retroreflection:L,iridescence:b,iridescenceMap:ce,iridescenceThicknessMap:Re,sheen:q,sheenColorMap:qe,sheenRoughnessMap:Ae,specularMap:Te,specularColorMap:ze,specularIntensityMap:je,transmission:J,transmissionMap:ht,thicknessMap:w,gradientMap:z,opaque:_.transparent===!1&&_.blending===rs&&_.alphaToCoverage===!1,alphaMap:U,alphaTest:B,alphaHash:X,combine:_.combine,mapUv:De&&m(_.map.channel),aoMapUv:de&&m(_.aoMap.channel),lightMapUv:xe&&m(_.lightMap.channel),bumpMapUv:ye&&m(_.bumpMap.channel),normalMapUv:Ee&&m(_.normalMap.channel),displacementMapUv:Je&&m(_.displacementMap.channel),emissiveMapUv:We&&m(_.emissiveMap.channel),metalnessMapUv:nt&&m(_.metalnessMap.channel),roughnessMapUv:$e&&m(_.roughnessMap.channel),anisotropyMapUv:re&&m(_.anisotropyMap.channel),clearcoatMapUv:Me&&m(_.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&m(_.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(_.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&m(_.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&m(_.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&m(_.sheenRoughnessMap.channel),specularMapUv:Te&&m(_.specularMap.channel),specularColorMapUv:ze&&m(_.specularColorMap.channel),specularIntensityMapUv:je&&m(_.specularIntensityMap.channel),transmissionMapUv:ht&&m(_.transmissionMap.channel),thicknessMapUv:w&&m(_.thicknessMap.channel),alphaMapUv:U&&m(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(Ee||D),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!k.attributes.uv&&(De||U),fog:!!F,useFog:_.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&Ee===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:he,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:we,morphTextureStride:Se,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&C.length>0,shadowMapType:i.shadowMap.type,toneMapping:Q,decodeVideoTexture:De&&_.map.isVideoTexture===!0&&Mt.getTransfer(_.map.colorSpace)===Rt,decodeVideoTextureEmissive:We&&_.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(_.emissiveMap.colorSpace)===Rt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===st,flipSided:_.side===gn,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:O&&_.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O&&_.extensions.multiDraw===!0||me)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return ne.vertexUv1s=l.has(1),ne.vertexUv2s=l.has(2),ne.vertexUv3s=l.has(3),l.clear(),ne}function g(_){let R=[];if(_.shaderID?R.push(_.shaderID):(R.push(_.customVertexShaderID),R.push(_.customFragmentShaderID)),_.defines!==void 0)for(let C in _.defines)R.push(C),R.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(p(R,_),E(R,_),R.push(i.outputColorSpace)),R.push(_.customProgramCacheKey),R.join()}function p(_,R){_.push(R.precision),_.push(R.outputColorSpace),_.push(R.envMapMode),_.push(R.envMapCubeUVHeight),_.push(R.mapUv),_.push(R.alphaMapUv),_.push(R.lightMapUv),_.push(R.aoMapUv),_.push(R.bumpMapUv),_.push(R.normalMapUv),_.push(R.displacementMapUv),_.push(R.emissiveMapUv),_.push(R.metalnessMapUv),_.push(R.roughnessMapUv),_.push(R.anisotropyMapUv),_.push(R.clearcoatMapUv),_.push(R.clearcoatNormalMapUv),_.push(R.clearcoatRoughnessMapUv),_.push(R.iridescenceMapUv),_.push(R.iridescenceThicknessMapUv),_.push(R.sheenColorMapUv),_.push(R.sheenRoughnessMapUv),_.push(R.specularMapUv),_.push(R.specularColorMapUv),_.push(R.specularIntensityMapUv),_.push(R.transmissionMapUv),_.push(R.thicknessMapUv),_.push(R.combine),_.push(R.fogExp2),_.push(R.sizeAttenuation),_.push(R.morphTargetsCount),_.push(R.morphAttributeCount),_.push(R.numSunLights),_.push(R.numDirLights),_.push(R.numPointLights),_.push(R.numSpotLights),_.push(R.numSpotLightMaps),_.push(R.numHemiLights),_.push(R.numRectAreaLights),_.push(R.numSunLightShadows),_.push(R.numDirLightShadows),_.push(R.numPointLightShadows),_.push(R.numSpotLightShadows),_.push(R.numSpotLightShadowsWithMaps),_.push(R.numLightProbes),_.push(R.shadowMapType),_.push(R.toneMapping),_.push(R.numClippingPlanes),_.push(R.numClipIntersection),_.push(R.depthPacking)}function E(_,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),_.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),_.push(o.mask)}function S(_){let R=f[_.type],C;if(R){let I=Si[R];C=tf.clone(I.uniforms)}else C=_.uniforms;return C}function y(_,R){let C=h.get(R);return C!==void 0?++C.usedTimes:(C=new av(i,R,_,s),c.push(C),h.set(R,C)),C}function T(_){if(--_.usedTimes===0){let R=c.indexOf(_);c[R]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function M(_){a.remove(_)}function v(){a.dispose()}return{getParameters:x,getProgramCacheKey:g,getUniforms:S,acquireProgram:y,releaseProgram:T,releaseShaderCache:M,programs:c,dispose:v}}function uv(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function dv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function bf(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ef(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,m,x,g,p){let E=i[e];return E===void 0?(E={id:u.id,object:u,geometry:f,material:m,materialVariant:o(u),groupOrder:x,renderOrder:u.renderOrder,z:g,group:p},i[e]=E):(E.id=u.id,E.object=u,E.geometry=f,E.material=m,E.materialVariant=o(u),E.groupOrder=x,E.renderOrder=u.renderOrder,E.z=g,E.group=p),e++,E}function l(u,f,m,x,g,p,E){E.reversedDepth===!0&&(g=-g);let S=a(u,f,m,x,g,p);m.transmission>0?n.push(S):m.transparent===!0?s.push(S):t.push(S)}function c(u,f,m,x,g,p){let E=a(u,f,m,x,g,p);m.transmission>0?n.unshift(E):m.transparent===!0?s.unshift(E):t.unshift(E)}function h(u,f){t.length>1&&t.sort(u||dv),n.length>1&&n.sort(f||bf),s.length>1&&s.sort(f||bf)}function d(){for(let u=e,f=i.length;u<f;u++){let m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function fv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new Ef,i.set(n,[o])):s>=r.length?(o=new Ef,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function pv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new N,color:new Qe};break;case"SpotLight":t={position:new N,direction:new N,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function mv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new fe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}function xv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function _v(i){let e=new pv,t=mv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new N);let s=new N,r=new At,o=new At;function a(c){let h=0,d=0,u=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let f=0,m=0,x=0,g=0,p=0,E=0,S=0,y=0,T=0,M=0,v=0,_=0,R=0,C=0;c.sort(xv);for(let P=0,H=c.length;P<H;P++){let F=c[P],k=F.color,V=F.intensity,W=F.distance,j=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===hs?j=F.shadow.map.texture:j=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)h+=k.r*V,d+=k.g*V,u+=k.b*V;else if(F.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(F.sh.coefficients[Z],V);C++}else if(F.isSunLight){let Z=e.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let ie=F.shadow,se=t.get(F);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize.copy(ie.mapSize).multiply(ie.getFrameExtents()),n.sunShadow[m]=se,n.sunShadowMap[m]=j;let we=ie.getViewportCount();for(let Se=0;Se<we;Se++)n.sunShadowMatrix[x+Se]=ie.getMatrix(Se),n.sunShadowCascade[x+Se]=ie._cascadeData[Se];x+=we,m++}n.sun[f]=Z,f++}else if(F.isDirectionalLight){let Z=e.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let ie=F.shadow,se=t.get(F);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize=ie.mapSize,n.directionalShadow[g]=se,n.directionalShadowMap[g]=j,n.directionalShadowMatrix[g]=F.shadow.matrix,T++}n.directional[g]=Z,g++}else if(F.isSpotLight){let Z=e.get(F);Z.position.setFromMatrixPosition(F.matrixWorld),Z.color.copy(k).multiplyScalar(V),Z.distance=W,Z.coneCos=Math.cos(F.angle),Z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Z.decay=F.decay,n.spot[E]=Z;let ie=F.shadow;if(F.map&&(n.spotLightMap[_]=F.map,_++,ie.updateMatrices(F),F.castShadow&&R++),n.spotLightMatrix[E]=ie.matrix,F.castShadow){let se=t.get(F);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize=ie.mapSize,n.spotShadow[E]=se,n.spotShadowMap[E]=j,v++}E++}else if(F.isRectAreaLight){let Z=e.get(F);Z.color.copy(k).multiplyScalar(V),Z.halfWidth.set(F.width*.5,0,0),Z.halfHeight.set(0,F.height*.5,0),n.rectArea[S]=Z,S++}else if(F.isPointLight){let Z=e.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity),Z.distance=F.distance,Z.decay=F.decay,F.castShadow){let ie=F.shadow,se=t.get(F);se.shadowIntensity=ie.intensity,se.shadowBias=ie.bias,se.shadowNormalBias=ie.normalBias,se.shadowRadius=ie.radius,se.shadowMapSize=ie.mapSize,se.shadowCameraNear=ie.camera.near,se.shadowCameraFar=ie.camera.far,n.pointShadow[p]=se,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=F.shadow.matrix,M++}n.point[p]=Z,p++}else if(F.isHemisphereLight){let Z=e.get(F);Z.skyColor.copy(F.color).multiplyScalar(V),Z.groundColor.copy(F.groundColor).multiplyScalar(V),n.hemi[y]=Z,y++}}S>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let I=n.hash;(I.sunLength!==f||I.directionalLength!==g||I.pointLength!==p||I.spotLength!==E||I.rectAreaLength!==S||I.hemiLength!==y||I.numSunShadows!==m||I.numDirectionalShadows!==T||I.numPointShadows!==M||I.numSpotShadows!==v||I.numSpotMaps!==_||I.numLightProbes!==C)&&(n.sun.length=f,n.directional.length=g,n.spot.length=E,n.rectArea.length=S,n.point.length=p,n.hemi.length=y,n.sunShadow.length=m,n.sunShadowMap.length=m,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.directionalShadowMatrix.length=T,n.pointShadow.length=M,n.pointShadowMap.length=M,n.pointShadowMatrix.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.spotLightMatrix.length=v+_-R,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=C,I.sunLength=f,I.directionalLength=g,I.pointLength=p,I.spotLength=E,I.rectAreaLength=S,I.hemiLength=y,I.numSunShadows=m,I.numDirectionalShadows=T,I.numPointShadows=M,I.numSpotShadows=v,I.numSpotMaps=_,I.numLightProbes=C,n.version=gv++)}function l(c,h){let d=0,u=0,f=0,m=0,x=0,g=0,p=h.matrixWorldInverse;for(let E=0,S=c.length;E<S;E++){let y=c[E];if(y.isSunLight){let T=n.sun[d];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),d++}else if(y.isDirectionalLight){let T=n.directional[u];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),u++}else if(y.isSpotLight){let T=n.spot[m];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(p),m++}else if(y.isRectAreaLight){let T=n.rectArea[x];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(o),T.halfHeight.applyMatrix4(o),x++}else if(y.isPointLight){let T=n.point[f];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let T=n.hemi[g];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(p),g++}}}return{setup:a,setupView:l,state:n}}function Sf(i){let e=new _v(i),t=[],n=[],s=[];function r(u){d.camera=u,t.length=0,n.length=0,s.length=0}function o(u){t.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function yv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new Sf(i),e.set(s,[a])):r>=o.length?(a=new Sf(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function Sv(i,e,t){let n=new cr,s=new fe,r=new fe,o=new Ht,a=new Ya,l=new Za,c={},h=t.maxTextureSize,d={[ss]:gn,[gn]:ss,[st]:st},u=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new fe},radius:{value:4}},vertexShader:vv,fragmentShader:Mv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new Et;m.setAttribute("position",new Dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Y(m,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=bo;let p=this.type;this.render=function(M,v,_){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===xd&&(rt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=bo);let R=i.getRenderTarget(),C=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),P=i.state;P.setBlending(bi),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let H=p!==this.type;H&&v.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(k=>k.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,k=M.length;F<k;F++){let V=M[F],W=V.shadow;if(W===void 0){rt("WebGLShadowMap:",V,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let j=W.getFrameExtents();s.multiply(j),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,W.mapSize.y=r.y));let Z=i.state.buffers.depth.getReversed();if(W.camera._reversedDepth=Z,W.map===null||H===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===pr){if(V.isPointLight){rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Ln(s.x,s.y,{format:hs,type:li,minFilter:pn,magFilter:pn,generateMipmaps:!1}),W.map.texture.name=V.name+".shadowMap",W.map.depthTexture=new ji(s.x,s.y,Zn),W.map.depthTexture.name=V.name+".shadowMapDepth",W.map.depthTexture.format=xi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=an,W.map.depthTexture.magFilter=an}else V.isPointLight?(W.map=new nc(s.x),W.map.depthTexture=new za(s.x,ai)):(W.map=new Ln(s.x,s.y),W.map.depthTexture=new ji(s.x,s.y,ai)),W.map.depthTexture.name=V.name+".shadowMap",W.map.depthTexture.format=xi,this.type===bo?(W.map.depthTexture.compareFunction=Z?jl:Kl,W.map.depthTexture.minFilter=pn,W.map.depthTexture.magFilter=pn):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=an,W.map.depthTexture.magFilter=an);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let ie=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();V.isPointLight!==!0&&W.updateMatrices(V,_);for(let se=0;se<ie;se++){let we=W.getCamera(se);if(V.isPointLight){let Se=W.camera,Ge=W.matrix,Ve=V.distance||Se.far;Ve!==Se.far&&(Se.far=Ve,Se.updateProjectionMatrix()),Do.setFromMatrixPosition(V.matrixWorld),Se.position.copy(Do),Jh.copy(Se.position),Jh.add(bv[se]),Se.up.copy(Ev[se]),Se.lookAt(Jh),Se.updateMatrixWorld(),Ge.makeTranslation(-Do.x,-Do.y,-Do.z),Tf.multiplyMatrices(Se.projectionMatrix,Se.matrixWorldInverse),W._frustum.setFromProjectionMatrix(Tf,Se.coordinateSystem,Se.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)i.setRenderTarget(W.map,se),i.clear();else{se===0&&(i.setRenderTarget(W.map),i.clear());let Se=W.getViewport(se);o.set(r.x*Se.x,r.y*Se.y,r.x*Se.z,r.y*Se.w),P.viewport(o)}n=W.getFrustum(se),y(v,_,we,V,this.type)}W.isPointLightShadow!==!0&&this.type===pr&&E(W,_),W.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(R,C,I)};function E(M,v){let _=e.update(x);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new Ln(s.x,s.y,{format:hs,type:li}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value.set(M.map.width,M.map.height),u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(v,null,_,u,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(v,null,_,f,x,null)}function S(M,v,_,R){let C=null,I=_.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(I!==void 0)C=I;else if(C=_.isPointLight===!0?l:a,i.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0||v.alphaToCoverage===!0){let P=C.uuid,H=v.uuid,F=c[P];F===void 0&&(F={},c[P]=F);let k=F[H];k===void 0&&(k=C.clone(),F[H]=k,v.addEventListener("dispose",T)),C=k}if(C.visible=v.visible,C.wireframe=v.wireframe,R===pr?C.side=v.shadowSide!==null?v.shadowSide:v.side:C.side=v.shadowSide!==null?v.shadowSide:d[v.side],C.alphaMap=v.alphaMap,C.alphaTest=v.alphaToCoverage===!0?.5:v.alphaTest,C.map=v.map,C.clipShadows=v.clipShadows,C.clippingPlanes=v.clippingPlanes,C.clipIntersection=v.clipIntersection,C.displacementMap=v.displacementMap,C.displacementScale=v.displacementScale,C.displacementBias=v.displacementBias,C.wireframeLinewidth=v.wireframeLinewidth,C.linewidth=v.linewidth,_.isPointLight===!0&&C.isMeshDistanceMaterial===!0){let P=i.properties.get(C);P.light=_}return C}function y(M,v,_,R,C){if(M.visible===!1)return;if(M.layers.test(v.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&C===pr)&&(!M.frustumCulled||M.intersectsFrustum(n))){M.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,M.matrixWorld);let H=e.update(M),F=M.material;if(Array.isArray(F)){let k=H.groups;for(let V=0,W=k.length;V<W;V++){let j=k[V],Z=F[j.materialIndex];if(Z&&Z.visible){let ie=S(M,Z,R,C);M.onBeforeShadow(i,M,v,_,H,ie,j),i.renderBufferDirect(_,null,H,ie,M,j),M.onAfterShadow(i,M,v,_,H,ie,j)}}}else if(F.visible){let k=S(M,F,R,C);M.onBeforeShadow(i,M,v,_,H,k,null),i.renderBufferDirect(_,null,H,k,M,null),M.onAfterShadow(i,M,v,_,H,k,null)}}let P=M.children;for(let H=0,F=P.length;H<F;H++)y(P[H],v,_,R,C)}function T(M){M.target.removeEventListener("dispose",T);for(let _ in c){let R=c[_],C=M.target.uuid;C in R&&(R[C].dispose(),delete R[C])}}}function Tv(i,e){function t(){let w=!1,z=new Ht,U=null,B=new Ht(0,0,0,0);return{setMask:function(X){U!==X&&!w&&(i.colorMask(X,X,X,X),U=X)},setLocked:function(X){w=X},setClear:function(X,O,Q,ne,_e){_e===!0&&(X*=ne,O*=ne,Q*=ne),z.set(X,O,Q,ne),B.equals(z)===!1&&(i.clearColor(X,O,Q,ne),B.copy(z))},reset:function(){w=!1,U=null,B.set(-1,0,0,0)}}}function n(){let w=!1,z=!1,U=null,B=null,X=null;return{setReversed:function(O){if(z!==O){let Q=e.get("EXT_clip_control");O?Q.clipControlEXT(Q.LOWER_LEFT_EXT,Q.ZERO_TO_ONE_EXT):Q.clipControlEXT(Q.LOWER_LEFT_EXT,Q.NEGATIVE_ONE_TO_ONE_EXT),z=O;let ne=X;X=null,this.setClear(ne)}},getReversed:function(){return z},setTest:function(O){O?ae(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(O){U!==O&&!w&&(i.depthMask(O),U=O)},setFunc:function(O){if(z&&(O=Jd[O]),B!==O){switch(O){case Ra:i.depthFunc(i.NEVER);break;case Aa:i.depthFunc(i.ALWAYS);break;case Ca:i.depthFunc(i.LESS);break;case nr:i.depthFunc(i.LEQUAL);break;case Pa:i.depthFunc(i.EQUAL);break;case Ia:i.depthFunc(i.GEQUAL);break;case La:i.depthFunc(i.GREATER);break;case Na:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}B=O}},setLocked:function(O){w=O},setClear:function(O){X!==O&&(X=O,z&&(O=1-O),i.clearDepth(O))},reset:function(){w=!1,U=null,B=null,X=null,z=!1}}}function s(){let w=!1,z=null,U=null,B=null,X=null,O=null,Q=null,ne=null,_e=null;return{setTest:function(ve){w||(ve?ae(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(ve){z!==ve&&!w&&(i.stencilMask(ve),z=ve)},setFunc:function(ve,Be,Ke){(U!==ve||B!==Be||X!==Ke)&&(i.stencilFunc(ve,Be,Ke),U=ve,B=Be,X=Ke)},setOp:function(ve,Be,Ke){(O!==ve||Q!==Be||ne!==Ke)&&(i.stencilOp(ve,Be,Ke),O=ve,Q=Be,ne=Ke)},setLocked:function(ve){w=ve},setClear:function(ve){_e!==ve&&(i.clearStencil(ve),_e=ve)},reset:function(){w=!1,z=null,U=null,B=null,X=null,O=null,Q=null,ne=null,_e=null}}}let r=new t,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,m=[],x=null,g=!1,p=null,E=null,S=null,y=null,T=null,M=null,v=null,_=new Qe(0,0,0),R=0,C=!1,I=null,P=null,H=null,F=null,k=null,V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,j=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(Z)[1]),W=j>=1):Z.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),W=j>=2);let ie=null,se={},we=i.getParameter(i.SCISSOR_BOX),Se=i.getParameter(i.VIEWPORT),Ge=new Ht().fromArray(we),Ve=new Ht().fromArray(Se);function at(w,z,U,B){let X=new Uint8Array(4),O=i.createTexture();i.bindTexture(w,O),i.texParameteri(w,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(w,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Q=0;Q<U;Q++)w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY?i.texImage3D(z,0,i.RGBA,1,1,B,0,i.RGBA,i.UNSIGNED_BYTE,X):i.texImage2D(z+Q,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,X);return O}let te={};te[i.TEXTURE_2D]=at(i.TEXTURE_2D,i.TEXTURE_2D,1),te[i.TEXTURE_CUBE_MAP]=at(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[i.TEXTURE_2D_ARRAY]=at(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),te[i.TEXTURE_3D]=at(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(nr),ye(!1),Ee(dh),ae(i.CULL_FACE),de(bi);function ae(w){h[w]!==!0&&(i.enable(w),h[w]=!0)}function he(w){h[w]!==!1&&(i.disable(w),h[w]=!1)}function pe(w,z){return u[w]!==z?(i.bindFramebuffer(w,z),u[w]=z,w===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=z),w===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=z),!0):!1}function me(w,z){let U=m,B=!1;if(w){U=f.get(z),U===void 0&&(U=[],f.set(z,U));let X=w.textures;if(U.length!==X.length||U[0]!==i.COLOR_ATTACHMENT0){for(let O=0,Q=X.length;O<Q;O++)U[O]=i.COLOR_ATTACHMENT0+O;U.length=X.length,B=!0}}else U[0]!==i.BACK&&(U[0]=i.BACK,B=!0);B&&i.drawBuffers(U)}function De(w){return x!==w?(i.useProgram(w),x=w,!0):!1}let vt={[Fi]:i.FUNC_ADD,[_d]:i.FUNC_SUBTRACT,[yd]:i.FUNC_REVERSE_SUBTRACT};vt[vd]=i.MIN,vt[Md]=i.MAX;let le={[cl]:i.ZERO,[mr]:i.ONE,[bd]:i.SRC_COLOR,[mh]:i.SRC_ALPHA,[Ad]:i.SRC_ALPHA_SATURATE,[wd]:i.DST_COLOR,[Sd]:i.DST_ALPHA,[Ed]:i.ONE_MINUS_SRC_COLOR,[gh]:i.ONE_MINUS_SRC_ALPHA,[Rd]:i.ONE_MINUS_DST_COLOR,[Td]:i.ONE_MINUS_DST_ALPHA,[Cd]:i.CONSTANT_COLOR,[Pd]:i.ONE_MINUS_CONSTANT_COLOR,[Id]:i.CONSTANT_ALPHA,[Ld]:i.ONE_MINUS_CONSTANT_ALPHA};function de(w,z,U,B,X,O,Q,ne,_e,ve){if(w===bi){g===!0&&(he(i.BLEND),g=!1);return}if(g===!1&&(ae(i.BLEND),g=!0),w!==ll){if(w!==p||ve!==C){if((E!==Fi||T!==Fi)&&(i.blendEquation(i.FUNC_ADD),E=Fi,T=Fi),ve)switch(w){case rs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case os:i.blendFunc(i.ONE,i.ONE);break;case fh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ph:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ot("WebGLState: Invalid blending: ",w);break}else switch(w){case rs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case os:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case fh:ot("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ph:ot("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ot("WebGLState: Invalid blending: ",w);break}S=null,y=null,M=null,v=null,_.set(0,0,0),R=0,p=w,C=ve}return}X=X||z,O=O||U,Q=Q||B,(z!==E||X!==T)&&(i.blendEquationSeparate(vt[z],vt[X]),E=z,T=X),(U!==S||B!==y||O!==M||Q!==v)&&(i.blendFuncSeparate(le[U],le[B],le[O],le[Q]),S=U,y=B,M=O,v=Q),(ne.equals(_)===!1||_e!==R)&&(i.blendColor(ne.r,ne.g,ne.b,_e),_.copy(ne),R=_e),p=w,C=!1}function xe(w,z){w.side===st?he(i.CULL_FACE):ae(i.CULL_FACE);let U=w.side===gn;z&&(U=!U),ye(U),w.blending===rs&&w.transparent===!1?de(bi):de(w.blending,w.blendEquation,w.blendSrc,w.blendDst,w.blendEquationAlpha,w.blendSrcAlpha,w.blendDstAlpha,w.blendColor,w.blendAlpha,w.premultipliedAlpha),o.setFunc(w.depthFunc),o.setTest(w.depthTest),o.setMask(w.depthWrite),r.setMask(w.colorWrite);let B=w.stencilWrite;a.setTest(B),B&&(a.setMask(w.stencilWriteMask),a.setFunc(w.stencilFunc,w.stencilRef,w.stencilFuncMask),a.setOp(w.stencilFail,w.stencilZFail,w.stencilZPass)),We(w.polygonOffset,w.polygonOffsetFactor,w.polygonOffsetUnits),w.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function ye(w){I!==w&&(w?i.frontFace(i.CW):i.frontFace(i.CCW),I=w)}function Ee(w){w!==md?(ae(i.CULL_FACE),w!==P&&(w===dh?i.cullFace(i.BACK):w===gd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),P=w}function Je(w){w!==H&&(W&&i.lineWidth(w),H=w)}function We(w,z,U){w?(ae(i.POLYGON_OFFSET_FILL),(F!==z||k!==U)&&(F=z,k=U,o.getReversed()&&(z=-z),i.polygonOffset(z,U))):he(i.POLYGON_OFFSET_FILL)}function nt(w){w?ae(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function $e(w){w===void 0&&(w=i.TEXTURE0+V-1),ie!==w&&(i.activeTexture(w),ie=w)}function D(w,z,U){U===void 0&&(ie===null?U=i.TEXTURE0+V-1:U=ie);let B=se[U];B===void 0&&(B={type:void 0,texture:void 0},se[U]=B),(B.type!==w||B.texture!==z)&&(ie!==U&&(i.activeTexture(U),ie=U),i.bindTexture(w,z||te[w]),B.type=w,B.texture=z)}function Ue(){let w=se[ie];w!==void 0&&w.type!==void 0&&(i.bindTexture(w.type,null),w.type=void 0,w.texture=void 0)}function Xe(){try{i.compressedTexImage2D(...arguments)}catch(w){ot("WebGLState:",w)}}function L(){try{i.compressedTexImage3D(...arguments)}catch(w){ot("WebGLState:",w)}}function b(){try{i.texSubImage2D(...arguments)}catch(w){ot("WebGLState:",w)}}function q(){try{i.texSubImage3D(...arguments)}catch(w){ot("WebGLState:",w)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(w){ot("WebGLState:",w)}}function re(){try{i.compressedTexSubImage3D(...arguments)}catch(w){ot("WebGLState:",w)}}function Me(){try{i.texStorage2D(...arguments)}catch(w){ot("WebGLState:",w)}}function be(){try{i.texStorage3D(...arguments)}catch(w){ot("WebGLState:",w)}}function oe(){try{i.texImage2D(...arguments)}catch(w){ot("WebGLState:",w)}}function ce(){try{i.texImage3D(...arguments)}catch(w){ot("WebGLState:",w)}}function Re(w){return d[w]!==void 0?d[w]:i.getParameter(w)}function qe(w,z){d[w]!==z&&(i.pixelStorei(w,z),d[w]=z)}function Ae(w){Ge.equals(w)===!1&&(i.scissor(w.x,w.y,w.z,w.w),Ge.copy(w))}function Te(w){Ve.equals(w)===!1&&(i.viewport(w.x,w.y,w.z,w.w),Ve.copy(w))}function ze(w,z){let U=c.get(z);U===void 0&&(U=new WeakMap,c.set(z,U));let B=U.get(w);B===void 0&&(B=i.getUniformBlockIndex(z,w.name),U.set(w,B))}function je(w,z){let B=c.get(z).get(w);l.get(z)!==B&&(i.uniformBlockBinding(z,B,w.__bindingPointIndex),l.set(z,B))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},ie=null,se={},u={},f=new WeakMap,m=[],x=null,g=!1,p=null,E=null,S=null,y=null,T=null,M=null,v=null,_=new Qe(0,0,0),R=0,C=!1,I=null,P=null,H=null,F=null,k=null,Ge.set(0,0,i.canvas.width,i.canvas.height),Ve.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:he,bindFramebuffer:pe,drawBuffers:me,useProgram:De,setBlending:de,setMaterial:xe,setFlipSided:ye,setCullFace:Ee,setLineWidth:Je,setPolygonOffset:We,setScissorTest:nt,activeTexture:$e,bindTexture:D,unbindTexture:Ue,compressedTexImage2D:Xe,compressedTexImage3D:L,texImage2D:oe,texImage3D:ce,pixelStorei:qe,getParameter:Re,updateUBOMapping:ze,uniformBlockBinding:je,texStorage2D:Me,texStorage3D:be,texSubImage2D:b,texSubImage3D:q,compressedTexSubImage2D:J,compressedTexSubImage3D:re,scissor:Ae,viewport:Te,reset:ht}}function wv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new fe,h=new WeakMap,d=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,b){return m?new OffscreenCanvas(L,b):sr("canvas")}function g(L,b,q){let J=1,re=Xe(L);if((re.width>q||re.height>q)&&(J=q/Math.max(re.width,re.height)),J<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let Me=Math.floor(J*re.width),be=Math.floor(J*re.height);u===void 0&&(u=x(Me,be));let oe=b?x(Me,be):u;return oe.width=Me,oe.height=be,oe.getContext("2d").drawImage(L,0,0,Me,be),rt("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+Me+"x"+be+")."),oe}else return"data"in L&&rt("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),L;return L}function p(L){return L.generateMipmaps}function E(L){i.generateMipmap(L)}function S(L){return L.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?i.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(L,b,q,J,re,Me=!1){if(L!==null){if(i[L]!==void 0)return i[L];rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let be;J&&(be=e.get("EXT_texture_norm16"),be||rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=b;if(b===i.RED&&(q===i.FLOAT&&(oe=i.R32F),q===i.HALF_FLOAT&&(oe=i.R16F),q===i.UNSIGNED_BYTE&&(oe=i.R8),q===i.UNSIGNED_SHORT&&be&&(oe=be.R16_EXT),q===i.SHORT&&be&&(oe=be.R16_SNORM_EXT)),b===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(oe=i.R8UI),q===i.UNSIGNED_SHORT&&(oe=i.R16UI),q===i.UNSIGNED_INT&&(oe=i.R32UI),q===i.BYTE&&(oe=i.R8I),q===i.SHORT&&(oe=i.R16I),q===i.INT&&(oe=i.R32I)),b===i.RG&&(q===i.FLOAT&&(oe=i.RG32F),q===i.HALF_FLOAT&&(oe=i.RG16F),q===i.UNSIGNED_BYTE&&(oe=i.RG8),q===i.UNSIGNED_SHORT&&be&&(oe=be.RG16_EXT),q===i.SHORT&&be&&(oe=be.RG16_SNORM_EXT)),b===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(oe=i.RG8UI),q===i.UNSIGNED_SHORT&&(oe=i.RG16UI),q===i.UNSIGNED_INT&&(oe=i.RG32UI),q===i.BYTE&&(oe=i.RG8I),q===i.SHORT&&(oe=i.RG16I),q===i.INT&&(oe=i.RG32I)),b===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(oe=i.RGB8UI),q===i.UNSIGNED_SHORT&&(oe=i.RGB16UI),q===i.UNSIGNED_INT&&(oe=i.RGB32UI),q===i.BYTE&&(oe=i.RGB8I),q===i.SHORT&&(oe=i.RGB16I),q===i.INT&&(oe=i.RGB32I)),b===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(oe=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(oe=i.RGBA16UI),q===i.UNSIGNED_INT&&(oe=i.RGBA32UI),q===i.BYTE&&(oe=i.RGBA8I),q===i.SHORT&&(oe=i.RGBA16I),q===i.INT&&(oe=i.RGBA32I)),b===i.RGB&&(q===i.UNSIGNED_SHORT&&be&&(oe=be.RGB16_EXT),q===i.SHORT&&be&&(oe=be.RGB16_SNORM_EXT),q===i.UNSIGNED_INT_5_9_9_9_REV&&(oe=i.RGB9_E5),q===i.UNSIGNED_INT_10F_11F_11F_REV&&(oe=i.R11F_G11F_B10F)),b===i.RGBA){let ce=Me?Kr:Mt.getTransfer(re);q===i.FLOAT&&(oe=i.RGBA32F),q===i.HALF_FLOAT&&(oe=i.RGBA16F),q===i.UNSIGNED_BYTE&&(oe=ce===Rt?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT&&be&&(oe=be.RGBA16_EXT),q===i.SHORT&&be&&(oe=be.RGBA16_SNORM_EXT),q===i.UNSIGNED_SHORT_4_4_4_4&&(oe=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(oe=i.RGB5_A1)}return(oe===i.R16F||oe===i.R32F||oe===i.RG16F||oe===i.RG32F||oe===i.RGBA16F||oe===i.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function T(L,b){let q;return L?b===null||b===ai||b===xr?q=i.DEPTH24_STENCIL8:b===Zn?q=i.DEPTH32F_STENCIL8:b===gr&&(q=i.DEPTH24_STENCIL8,rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===ai||b===xr?q=i.DEPTH_COMPONENT24:b===Zn?q=i.DEPTH_COMPONENT32F:b===gr&&(q=i.DEPTH_COMPONENT16),q}function M(L,b){return p(L)===!0||L.isFramebufferTexture&&L.minFilter!==an&&L.minFilter!==pn?Math.log2(Math.max(b.width,b.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?b.mipmaps.length:1}function v(L){let b=L.target;b.removeEventListener("dispose",v),R(b),b.isVideoTexture&&h.delete(b),b.isHTMLTexture&&d.delete(b)}function _(L){let b=L.target;b.removeEventListener("dispose",_),I(b)}function R(L){let b=n.get(L);if(b.__webglInit===void 0)return;let q=L.source,J=f.get(q);if(J){let re=J[b.__cacheKey];re.usedTimes--,re.usedTimes===0&&C(L),Object.keys(J).length===0&&f.delete(q)}n.remove(L)}function C(L){let b=n.get(L);i.deleteTexture(b.__webglTexture);let q=L.source,J=f.get(q);delete J[b.__cacheKey],o.memory.textures--}function I(L){let b=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(b.__webglFramebuffer[J]))for(let re=0;re<b.__webglFramebuffer[J].length;re++)i.deleteFramebuffer(b.__webglFramebuffer[J][re]);else i.deleteFramebuffer(b.__webglFramebuffer[J]);b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer[J])}else{if(Array.isArray(b.__webglFramebuffer))for(let J=0;J<b.__webglFramebuffer.length;J++)i.deleteFramebuffer(b.__webglFramebuffer[J]);else i.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&i.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&i.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let J=0;J<b.__webglColorRenderbuffer.length;J++)b.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(b.__webglColorRenderbuffer[J]);b.__webglDepthRenderbuffer&&i.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let q=L.textures;for(let J=0,re=q.length;J<re;J++){let Me=n.get(q[J]);Me.__webglTexture&&(i.deleteTexture(Me.__webglTexture),o.memory.textures--),n.remove(q[J])}n.remove(L)}let P=0;function H(){P=0}function F(){return P}function k(L){P=L}function V(){let L=P;return L>=s.maxTextures&&rt("WebGLTextures: Trying to use "+(L+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,L}function W(L){let b=[];return b.push(L.wrapS),b.push(L.wrapT),b.push(L.wrapR||0),b.push(L.magFilter),b.push(L.minFilter),b.push(L.anisotropy),b.push(L.internalFormat),b.push(L.format),b.push(L.type),b.push(L.generateMipmaps),b.push(L.premultiplyAlpha),b.push(L.flipY),b.push(L.unpackAlignment),b.push(L.colorSpace),b.join()}function j(L,b){let q=n.get(L);if(L.isVideoTexture&&D(L),L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&q.__version!==L.version){let J=L.image;if(J===null)rt("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)rt("WebGLRenderer: Texture marked for update but image is incomplete");else{he(q,L,b);return}}else L.isExternalTexture&&(q.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+b)}function Z(L,b){let q=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){he(q,L,b);return}else L.isExternalTexture&&(q.__webglTexture=L.sourceTexture?L.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+b)}function ie(L,b){let q=n.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&q.__version!==L.version){he(q,L,b);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+b)}function se(L,b){let q=n.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&q.__version!==L.version){pe(q,L,b);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+b)}let we={[gi]:i.REPEAT,[pi]:i.CLAMP_TO_EDGE,[Da]:i.MIRRORED_REPEAT},Se={[an]:i.NEAREST,[Ud]:i.NEAREST_MIPMAP_NEAREST,[To]:i.NEAREST_MIPMAP_LINEAR,[pn]:i.LINEAR,[fl]:i.LINEAR_MIPMAP_NEAREST,[ls]:i.LINEAR_MIPMAP_LINEAR},Ge={[Hd]:i.NEVER,[Wd]:i.ALWAYS,[zd]:i.LESS,[Kl]:i.LEQUAL,[kd]:i.EQUAL,[jl]:i.GEQUAL,[Gd]:i.GREATER,[Vd]:i.NOTEQUAL};function Ve(L,b){if(b.type===Zn&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===pn||b.magFilter===fl||b.magFilter===To||b.magFilter===ls||b.minFilter===pn||b.minFilter===fl||b.minFilter===To||b.minFilter===ls)&&rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(L,i.TEXTURE_WRAP_S,we[b.wrapS]),i.texParameteri(L,i.TEXTURE_WRAP_T,we[b.wrapT]),(L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY)&&i.texParameteri(L,i.TEXTURE_WRAP_R,we[b.wrapR]),i.texParameteri(L,i.TEXTURE_MAG_FILTER,Se[b.magFilter]),i.texParameteri(L,i.TEXTURE_MIN_FILTER,Se[b.minFilter]),b.compareFunction&&(i.texParameteri(L,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(L,i.TEXTURE_COMPARE_FUNC,Ge[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===an||b.minFilter!==To&&b.minFilter!==ls||b.type===Zn&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(L,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,s.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function at(L,b){let q=!1;L.__webglInit===void 0&&(L.__webglInit=!0,b.addEventListener("dispose",v));let J=b.source,re=f.get(J);re===void 0&&(re={},f.set(J,re));let Me=W(b);if(Me!==L.__cacheKey){re[Me]===void 0&&(re[Me]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,q=!0),re[Me].usedTimes++;let be=re[L.__cacheKey];be!==void 0&&(re[L.__cacheKey].usedTimes--,be.usedTimes===0&&C(b)),L.__cacheKey=Me,L.__webglTexture=re[Me].texture}return q}function te(L,b,q){return Math.floor(Math.floor(L/q)/b)}function ae(L,b,q,J){let Me=L.updateRanges;if(Me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,b.width,b.height,q,J,b.data);else{Me.sort((qe,Ae)=>qe.start-Ae.start);let be=0;for(let qe=1;qe<Me.length;qe++){let Ae=Me[be],Te=Me[qe],ze=Ae.start+Ae.count,je=te(Te.start,b.width,4),ht=te(Ae.start,b.width,4);Te.start<=ze+1&&je===ht&&te(Te.start+Te.count-1,b.width,4)===je?Ae.count=Math.max(Ae.count,Te.start+Te.count-Ae.start):(++be,Me[be]=Te)}Me.length=be+1;let oe=t.getParameter(i.UNPACK_ROW_LENGTH),ce=t.getParameter(i.UNPACK_SKIP_PIXELS),Re=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,b.width);for(let qe=0,Ae=Me.length;qe<Ae;qe++){let Te=Me[qe],ze=Math.floor(Te.start/4),je=Math.ceil(Te.count/4),ht=ze%b.width,w=Math.floor(ze/b.width),z=je,U=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,ht),t.pixelStorei(i.UNPACK_SKIP_ROWS,w),t.texSubImage2D(i.TEXTURE_2D,0,ht,w,z,U,q,J,b.data)}L.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,oe),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(i.UNPACK_SKIP_ROWS,Re)}}function he(L,b,q){let J=i.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),b.isData3DTexture&&(J=i.TEXTURE_3D);let re=at(L,b),Me=b.source;t.bindTexture(J,L.__webglTexture,i.TEXTURE0+q);let be=n.get(Me);if(Me.version!==be.__version||re===!0){if(t.activeTexture(i.TEXTURE0+q),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let U=Mt.getPrimaries(Mt.workingColorSpace),B=b.colorSpace===Bi?null:Mt.getPrimaries(b.colorSpace),X=b.colorSpace===Bi||U===B?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,X)}t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment);let ce=g(b.image,!1,s.maxTextureSize);ce=Ue(b,ce);let Re=r.convert(b.format,b.colorSpace),qe=r.convert(b.type),Ae=y(b.internalFormat,Re,qe,b.normalized,b.colorSpace,b.isVideoTexture);Ve(J,b);let Te,ze=b.mipmaps,je=b.isVideoTexture!==!0,ht=be.__version===void 0||re===!0,w=Me.dataReady,z=M(b,ce);if(b.isDepthTexture)Ae=T(b.format===cs,b.type),ht&&(je?t.texStorage2D(i.TEXTURE_2D,1,Ae,ce.width,ce.height):t.texImage2D(i.TEXTURE_2D,0,Ae,ce.width,ce.height,0,Re,qe,null));else if(b.isDataTexture)if(ze.length>0){je&&ht&&t.texStorage2D(i.TEXTURE_2D,z,Ae,ze[0].width,ze[0].height);for(let U=0,B=ze.length;U<B;U++)Te=ze[U],je?w&&t.texSubImage2D(i.TEXTURE_2D,U,0,0,Te.width,Te.height,Re,qe,Te.data):t.texImage2D(i.TEXTURE_2D,U,Ae,Te.width,Te.height,0,Re,qe,Te.data);b.generateMipmaps=!1}else je?(ht&&t.texStorage2D(i.TEXTURE_2D,z,Ae,ce.width,ce.height),w&&ae(b,ce,Re,qe)):t.texImage2D(i.TEXTURE_2D,0,Ae,ce.width,ce.height,0,Re,qe,ce.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){je&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,z,Ae,ze[0].width,ze[0].height,ce.depth);for(let U=0,B=ze.length;U<B;U++)if(Te=ze[U],b.format!==Jn)if(Re!==null)if(je){if(w)if(b.layerUpdates.size>0){let X=Bh(Te.width,Te.height,b.format,b.type);for(let O of b.layerUpdates){let Q=Te.data.subarray(O*X/Te.data.BYTES_PER_ELEMENT,(O+1)*X/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,U,0,0,O,Te.width,Te.height,1,Re,Q)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,U,0,0,0,Te.width,Te.height,ce.depth,Re,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,U,Ae,Te.width,Te.height,ce.depth,0,Te.data,0,0);else rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?w&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,U,0,0,0,Te.width,Te.height,ce.depth,Re,qe,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,U,Ae,Te.width,Te.height,ce.depth,0,Re,qe,Te.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{je&&ht&&t.texStorage2D(i.TEXTURE_2D,z,Ae,ze[0].width,ze[0].height);for(let U=0,B=ze.length;U<B;U++)Te=ze[U],b.format!==Jn?Re!==null?je?w&&t.compressedTexSubImage2D(i.TEXTURE_2D,U,0,0,Te.width,Te.height,Re,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,U,Ae,Te.width,Te.height,0,Te.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?w&&t.texSubImage2D(i.TEXTURE_2D,U,0,0,Te.width,Te.height,Re,qe,Te.data):t.texImage2D(i.TEXTURE_2D,U,Ae,Te.width,Te.height,0,Re,qe,Te.data)}else if(b.isDataArrayTexture)if(je){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,z,Ae,ce.width,ce.height,ce.depth),w)if(b.layerUpdates.size>0){let U=Bh(ce.width,ce.height,b.format,b.type);for(let B of b.layerUpdates){let X=ce.data.subarray(B*U/ce.data.BYTES_PER_ELEMENT,(B+1)*U/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,B,ce.width,ce.height,1,Re,qe,X)}b.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,Re,qe,ce.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ae,ce.width,ce.height,ce.depth,0,Re,qe,ce.data);else if(b.isData3DTexture)je?(ht&&t.texStorage3D(i.TEXTURE_3D,z,Ae,ce.width,ce.height,ce.depth),w&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,Re,qe,ce.data)):t.texImage3D(i.TEXTURE_3D,0,Ae,ce.width,ce.height,ce.depth,0,Re,qe,ce.data);else if(b.isFramebufferTexture){if(ht)if(je)t.texStorage2D(i.TEXTURE_2D,z,Ae,ce.width,ce.height);else{let U=ce.width,B=ce.height;for(let X=0;X<z;X++)t.texImage2D(i.TEXTURE_2D,X,Ae,U,B,0,Re,qe,null),U>>=1,B>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in i){let U=i.canvas;if(U.hasAttribute("layoutsubtree")||U.setAttribute("layoutsubtree","true"),ce.parentNode!==U){U.appendChild(ce),d.add(b),U.onpaint=B=>{let X=B.changedElements;for(let O of d)X.includes(O.image)&&(O.needsUpdate=!0)},U.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ce);else{let X=i.RGBA,O=i.RGBA,Q=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,X,O,Q,ce)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ze.length>0){if(je&&ht){let U=Xe(ze[0]);t.texStorage2D(i.TEXTURE_2D,z,Ae,U.width,U.height)}for(let U=0,B=ze.length;U<B;U++)Te=ze[U],je?w&&t.texSubImage2D(i.TEXTURE_2D,U,0,0,Re,qe,Te):t.texImage2D(i.TEXTURE_2D,U,Ae,Re,qe,Te);b.generateMipmaps=!1}else if(je){if(ht){let U=Xe(ce);t.texStorage2D(i.TEXTURE_2D,z,Ae,U.width,U.height)}w&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,Re,qe,ce)}else t.texImage2D(i.TEXTURE_2D,0,Ae,Re,qe,ce);p(b)&&E(J),be.__version=Me.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function pe(L,b,q){if(b.image.length!==6)return;let J=at(L,b),re=b.source;t.bindTexture(i.TEXTURE_CUBE_MAP,L.__webglTexture,i.TEXTURE0+q);let Me=n.get(re);if(re.version!==Me.__version||J===!0){t.activeTexture(i.TEXTURE0+q);let be=Mt.getPrimaries(Mt.workingColorSpace),oe=b.colorSpace===Bi?null:Mt.getPrimaries(b.colorSpace),ce=b.colorSpace===Bi||be===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,b.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,b.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let Re=b.isCompressedTexture||b.image[0].isCompressedTexture,qe=b.image[0]&&b.image[0].isDataTexture,Ae=[];for(let O=0;O<6;O++)!Re&&!qe?Ae[O]=g(b.image[O],!0,s.maxCubemapSize):Ae[O]=qe?b.image[O].image:b.image[O],Ae[O]=Ue(b,Ae[O]);let Te=Ae[0],ze=r.convert(b.format,b.colorSpace),je=r.convert(b.type),ht=y(b.internalFormat,ze,je,b.normalized,b.colorSpace),w=b.isVideoTexture!==!0,z=Me.__version===void 0||J===!0,U=re.dataReady,B=M(b,Te);Ve(i.TEXTURE_CUBE_MAP,b);let X;if(Re){w&&z&&t.texStorage2D(i.TEXTURE_CUBE_MAP,B,ht,Te.width,Te.height);for(let O=0;O<6;O++){X=Ae[O].mipmaps;for(let Q=0;Q<X.length;Q++){let ne=X[Q];b.format!==Jn?ze!==null?w?U&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q,0,0,ne.width,ne.height,ze,ne.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q,ht,ne.width,ne.height,0,ne.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):w?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q,0,0,ne.width,ne.height,ze,je,ne.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q,ht,ne.width,ne.height,0,ze,je,ne.data)}}}else{if(X=b.mipmaps,w&&z){X.length>0&&B++;let O=Xe(Ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,B,ht,O.width,O.height)}for(let O=0;O<6;O++)if(qe){w?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,Ae[O].width,Ae[O].height,ze,je,Ae[O].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,ht,Ae[O].width,Ae[O].height,0,ze,je,Ae[O].data);for(let Q=0;Q<X.length;Q++){let _e=X[Q].image[O].image;w?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q+1,0,0,_e.width,_e.height,ze,je,_e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q+1,ht,_e.width,_e.height,0,ze,je,_e.data)}}else{w?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,0,0,ze,je,Ae[O]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,0,ht,ze,je,Ae[O]);for(let Q=0;Q<X.length;Q++){let ne=X[Q];w?U&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q+1,0,0,ze,je,ne.image[O]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+O,Q+1,ht,ze,je,ne.image[O])}}}p(b)&&E(i.TEXTURE_CUBE_MAP),Me.__version=re.version,b.onUpdate&&b.onUpdate(b)}L.__version=b.version}function me(L,b,q,J,re,Me){let be=r.convert(q.format,q.colorSpace),oe=r.convert(q.type),ce=y(q.internalFormat,be,oe,q.normalized,q.colorSpace),Re=n.get(b),qe=n.get(q);if(qe.__renderTarget=b,!Re.__hasExternalTextures){let Ae=Math.max(1,b.width>>Me),Te=Math.max(1,b.height>>Me);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,Me,ce,Ae,Te,b.depth,0,be,oe,null):t.texImage2D(re,Me,ce,Ae,Te,0,be,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,L),$e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,re,qe.__webglTexture,0,nt(b)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,re,qe.__webglTexture,Me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(L,b,q){if(i.bindRenderbuffer(i.RENDERBUFFER,L),b.depthBuffer){let J=b.depthTexture,re=J&&J.isDepthTexture?J.type:null,Me=T(b.stencilBuffer,re),be=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;$e(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt(b),Me,b.width,b.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt(b),Me,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,Me,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,L)}else{let J=b.textures;for(let re=0;re<J.length;re++){let Me=J[re],be=r.convert(Me.format,Me.colorSpace),oe=r.convert(Me.type),ce=y(Me.internalFormat,be,oe,Me.normalized,Me.colorSpace);$e(b)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,nt(b),ce,b.width,b.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,nt(b),ce,b.width,b.height):i.renderbufferStorage(i.RENDERBUFFER,ce,b.width,b.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function vt(L,b,q){let J=b.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,L),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let re=n.get(b.depthTexture);if(re.__renderTarget=b,(!re.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),J){if(re.__webglInit===void 0&&(re.__webglInit=!0,b.depthTexture.addEventListener("dispose",v)),re.__webglTexture===void 0){re.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,re.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,b.depthTexture);let Re=r.convert(b.depthTexture.format),qe=r.convert(b.depthTexture.type),Ae;b.depthTexture.format===xi?Ae=i.DEPTH_COMPONENT24:b.depthTexture.format===cs&&(Ae=i.DEPTH24_STENCIL8);for(let Te=0;Te<6;Te++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,Ae,b.width,b.height,0,Re,qe,null)}}else j(b.depthTexture,0);let Me=re.__webglTexture,be=nt(b),oe=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+q:i.TEXTURE_2D,ce=b.depthTexture.format===cs?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(b.depthTexture.format===xi)$e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,oe,Me,0,be):i.framebufferTexture2D(i.FRAMEBUFFER,ce,oe,Me,0);else if(b.depthTexture.format===cs)$e(b)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ce,oe,Me,0,be):i.framebufferTexture2D(i.FRAMEBUFFER,ce,oe,Me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function le(L){let b=n.get(L),q=L.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==L.depthTexture){let J=L.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),J){let re=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,J.removeEventListener("dispose",re)};J.addEventListener("dispose",re),b.__depthDisposeCallback=re}b.__boundDepthTexture=J}if(L.depthTexture&&!b.__autoAllocateDepthBuffer)if(q)for(let J=0;J<6;J++)vt(b.__webglFramebuffer[J],L,J);else{let J=L.texture.mipmaps;J&&J.length>0?vt(b.__webglFramebuffer[0],L,0):vt(b.__webglFramebuffer,L,0)}else if(q){b.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[J]),b.__webglDepthbuffer[J]===void 0)b.__webglDepthbuffer[J]=i.createRenderbuffer(),De(b.__webglDepthbuffer[J],L,!1);else{let re=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=b.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,Me)}}else{let J=L.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=i.createRenderbuffer(),De(b.__webglDepthbuffer,L,!1);else{let re=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=b.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Me),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,Me)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function de(L,b,q){let J=n.get(L);b!==void 0&&me(J.__webglFramebuffer,L,L.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&le(L)}function xe(L){let b=L.texture,q=n.get(L),J=n.get(b);L.addEventListener("dispose",_);let re=L.textures,Me=L.isWebGLCubeRenderTarget===!0,be=re.length>1;if(be||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=b.version,o.memory.textures++),Me){q.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer[oe]=[];for(let ce=0;ce<b.mipmaps.length;ce++)q.__webglFramebuffer[oe][ce]=i.createFramebuffer()}else q.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){q.__webglFramebuffer=[];for(let oe=0;oe<b.mipmaps.length;oe++)q.__webglFramebuffer[oe]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(be)for(let oe=0,ce=re.length;oe<ce;oe++){let Re=n.get(re[oe]);Re.__webglTexture===void 0&&(Re.__webglTexture=i.createTexture(),o.memory.textures++)}if(L.samples>0&&$e(L)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let oe=0;oe<re.length;oe++){let ce=re[oe];q.__webglColorRenderbuffer[oe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[oe]);let Re=r.convert(ce.format,ce.colorSpace),qe=r.convert(ce.type),Ae=y(ce.internalFormat,Re,qe,ce.normalized,ce.colorSpace,L.isXRRenderTarget===!0),Te=nt(L);i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,Ae,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,q.__webglColorRenderbuffer[oe])}i.bindRenderbuffer(i.RENDERBUFFER,null),L.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),De(q.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Me){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),Ve(i.TEXTURE_CUBE_MAP,b);for(let oe=0;oe<6;oe++)if(b.mipmaps&&b.mipmaps.length>0)for(let ce=0;ce<b.mipmaps.length;ce++)me(q.__webglFramebuffer[oe][ce],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,ce);else me(q.__webglFramebuffer[oe],L,b,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);p(b)&&E(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let oe=0,ce=re.length;oe<ce;oe++){let Re=re[oe],qe=n.get(Re),Ae=i.TEXTURE_2D;(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(Ae=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Ae,qe.__webglTexture),Ve(Ae,Re),me(q.__webglFramebuffer,L,Re,i.COLOR_ATTACHMENT0+oe,Ae,0),p(Re)&&E(Ae)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(oe=L.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,J.__webglTexture),Ve(oe,b),b.mipmaps&&b.mipmaps.length>0)for(let ce=0;ce<b.mipmaps.length;ce++)me(q.__webglFramebuffer[ce],L,b,i.COLOR_ATTACHMENT0,oe,ce);else me(q.__webglFramebuffer,L,b,i.COLOR_ATTACHMENT0,oe,0);p(b)&&E(oe),t.unbindTexture()}L.depthBuffer&&le(L)}function ye(L){let b=L.textures;for(let q=0,J=b.length;q<J;q++){let re=b[q];if(p(re)){let Me=S(L),be=n.get(re).__webglTexture;t.bindTexture(Me,be),E(Me),t.unbindTexture()}}}let Ee=[],Je=[];function We(L){if(L.samples>0){if($e(L)===!1){let b=L.textures,q=L.width,J=L.height,re=i.COLOR_BUFFER_BIT,Me=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(L),oe=b.length>1;if(oe)for(let Re=0;Re<b.length;Re++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let ce=L.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Re=0;Re<b.length;Re++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),oe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[Re]);let qe=n.get(b[Re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,qe,0)}i.blitFramebuffer(0,0,q,J,0,0,q,J,re,i.NEAREST),l===!0&&(Ee.length=0,Je.length=0,Ee.push(i.COLOR_ATTACHMENT0+Re),L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&(Ee.push(Me),Je.push(Me),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),oe)for(let Re=0;Re<b.length;Re++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.RENDERBUFFER,be.__webglColorRenderbuffer[Re]);let qe=n.get(b[Re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Re,i.TEXTURE_2D,qe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.storeMultisampledDepthBuffer===!1&&l){let b=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[b])}}}function nt(L){return Math.min(s.maxSamples,L.samples)}function $e(L){let b=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function D(L){let b=o.render.frame;h.get(L)!==b&&(h.set(L,b),L.update())}function Ue(L,b){let q=L.colorSpace,J=L.format,re=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||q!==$r&&q!==Bi&&(Mt.getTransfer(q)===Rt?(J!==Jn||re!==Nn)&&rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ot("WebGLTextures: Unsupported texture color space:",q)),b}function Xe(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=H,this.getTextureUnits=F,this.setTextureUnits=k,this.setTexture2D=j,this.setTexture2DArray=Z,this.setTexture3D=ie,this.setTextureCube=se,this.rebindTextures=de,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=We,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=me,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Rv(i,e){function t(n,s=Bi){let r,o=Mt.getTransfer(s);if(n===Nn)return i.UNSIGNED_BYTE;if(n===ml)return i.UNSIGNED_SHORT_4_4_4_4;if(n===gl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===wh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Rh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Sh)return i.BYTE;if(n===Th)return i.SHORT;if(n===gr)return i.UNSIGNED_SHORT;if(n===pl)return i.INT;if(n===ai)return i.UNSIGNED_INT;if(n===Zn)return i.FLOAT;if(n===li)return i.HALF_FLOAT;if(n===Ah)return i.ALPHA;if(n===Ch)return i.RGB;if(n===Jn)return i.RGBA;if(n===xi)return i.DEPTH_COMPONENT;if(n===cs)return i.DEPTH_STENCIL;if(n===xl)return i.RED;if(n===_l)return i.RED_INTEGER;if(n===hs)return i.RG;if(n===yl)return i.RG_INTEGER;if(n===vl)return i.RGBA_INTEGER;if(n===wo||n===Ro||n===Ao||n===Co)if(o===Rt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===wo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ro)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ao)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Co)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ml||n===bl||n===El||n===Sl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===El)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Tl||n===wl||n===Rl||n===Al||n===Cl||n===Po||n===Pl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Tl||n===wl)return o===Rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Rl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Al)return r.COMPRESSED_R11_EAC;if(n===Cl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Po)return r.COMPRESSED_RG11_EAC;if(n===Pl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Il||n===Ll||n===Nl||n===Dl||n===Ul||n===Fl||n===Bl||n===Ol||n===Hl||n===zl||n===kl||n===Gl||n===Vl||n===Wl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Il)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ll)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Nl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ul)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Fl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Bl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ol)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===zl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===kl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Gl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wl)return o===Rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xl||n===ql||n===Yl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Xl)return o===Rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ql)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zl||n===Jl||n===Io||n===$l)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Zl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Jl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Io)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$l)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}function Iv(i,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Dh(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,E,S,y){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(g,p):p.isMeshLambertMaterial?(r(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(g,p),u(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,E,S):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===gn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===gn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let E=e.get(p),S=E.envMap,y=E.envMapRotation;S&&(g.envMap.value=S,g.envMapRotation.value.setFromMatrix4(Pv.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Lf),g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,E,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*E,g.scale.value=S*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function u(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,E){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===gn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.retroreflectivity>0&&(g.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=E.texture,g.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){let E=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(E.matrixWorld),g.nearDistance.value=E.shadow.camera.near,g.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Lv(i,e,t,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){let M=T.program;n.uniformBlockBinding(y,M)}function c(y,T){let M=s[y.id];M===void 0&&(g(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",E));let v=T.program;n.updateUBOMapping(y,v);let _=e.render.frame;r[y.id]!==_&&(u(y),r[y.id]=_)}function h(y){let T=d();y.__bindingPointIndex=T;let M=i.createBuffer(),v=y.__size,_=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,v,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,M),M}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return ot("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let T=s[y.id],M=y.uniforms,v=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let _=0,R=M.length;_<R;_++){let C=M[_];if(Array.isArray(C))for(let I=0,P=C.length;I<P;I++)f(C[I],_,I,v);else f(C,_,0,v)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(y,T,M,v){if(x(y,T,M,v)===!0){let _=y.__offset,R=y.value;if(Array.isArray(R)){let C=0;for(let I=0;I<R.length;I++){let P=R[I],H=p(P);m(P,y.__data,C),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(C+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(R,y.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,y.__data)}}function m(y,T,M){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,M)}function x(y,T,M,v){let _=y.value,R=T+"_"+M;if(v[R]===void 0)return typeof _=="number"||typeof _=="boolean"?v[R]=_:ArrayBuffer.isView(_)?v[R]=_.slice():v[R]=_.clone(),!0;{let C=v[R];if(typeof _=="number"||typeof _=="boolean"){if(C!==_)return v[R]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(C.equals(_)===!1)return C.copy(_),!0}}return!1}function g(y){let T=y.uniforms,M=0,v=16;for(let R=0,C=T.length;R<C;R++){let I=Array.isArray(T[R])?T[R]:[T[R]];for(let P=0,H=I.length;P<H;P++){let F=I[P],k=Array.isArray(F.value)?F.value:[F.value];for(let V=0,W=k.length;V<W;V++){let j=k[V],Z=p(j),ie=M%v,se=ie%Z.boundary,we=ie+se;M+=se,we!==0&&v-we<Z.storage&&(M+=v-we),F.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=Z.storage}}}let _=M%v;return _>0&&(M+=v-_),y.__size=M,y.__cache={},this}function p(y){let T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):rt("WebGLRenderer: Unsupported uniform value type.",y),T}function E(y){let T=y.target;T.removeEventListener("dispose",E);let M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function S(){for(let y in s)i.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:S}}function Dv(){return Ei===null&&(Ei=new no(Nv,16,16,hs,li),Ei.name="DFG_LUT",Ei.minFilter=pn,Ei.magFilter=pn,Ei.wrapS=pi,Ei.wrapT=pi,Ei.generateMipmaps=!1,Ei.needsUpdate=!0),Ei}var Ym,Zm,Jm,$m,Km,jm,Qm,eg,tg,ng,ig,sg,rg,og,ag,lg,cg,hg,ug,dg,fg,pg,mg,gg,xg,_g,yg,vg,Mg,bg,Eg,Sg,Tg,wg,Rg,Ag,Cg,Pg,Ig,Lg,Ng,Dg,Ug,Fg,Bg,Og,Hg,zg,kg,Gg,Vg,Wg,Xg,qg,Yg,Zg,Jg,$g,Kg,jg,Qg,ex,tx,nx,ix,sx,rx,ox,ax,lx,cx,hx,ux,dx,fx,px,mx,gx,xx,_x,yx,vx,Mx,bx,Ex,Sx,Tx,wx,Rx,Ax,Cx,Px,Ix,Lx,Nx,Dx,Ux,Fx,Bx,Ox,Hx,zx,kx,Gx,Vx,Wx,Xx,qx,Yx,Zx,Jx,$x,Kx,jx,Qx,e_,t_,n_,i_,s_,r_,o_,a_,l_,c_,h_,u_,d_,f_,p_,m_,g_,x_,__,y_,v_,M_,b_,E_,S_,T_,w_,gt,Ce,Si,ec,R_,Rf,yr,N_,D_,U_,No,rf,Wh,Xh,qh,Yh,F_,As,Mr,nc,Y_,Af,$h,Cf,Pf,If,cf,hf,uf,df,ff,Kh,jh,Qh,Zh,vr,Fy,By,gf,ky,tc,Yy,Zy,$y,jy,ev,nv,sv,lv,tu,nu,gv,vv,Mv,bv,Ev,Tf,Do,Jh,Av,Cv,iu,su,Pv,Lf,Nv,Ei,ic,sn=qt(()=>{Vh();Vh();Ym=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$m=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Km=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,eg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ng=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ig=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,og=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ag=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ug=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,fg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mg=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,gg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,xg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,_g=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,yg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Eg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Sg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,wg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ig=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ng=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Dg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ug=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Og=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Hg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,zg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$g=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ex=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ix=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ox=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ax=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ux=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,px=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,gx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_x=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Ex=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Rx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ax=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Cx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Px=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ix=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Lx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Dx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ux=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ox=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,kx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$x=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,e_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,t_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,n_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,i_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,s_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,a_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,l_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,c_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,h_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,u_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,d_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,f_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,p_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,m_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,g_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,__=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,b_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,E_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,gt={alphahash_fragment:Ym,alphahash_pars_fragment:Zm,alphamap_fragment:Jm,alphamap_pars_fragment:$m,alphatest_fragment:Km,alphatest_pars_fragment:jm,aomap_fragment:Qm,aomap_pars_fragment:eg,batching_pars_vertex:tg,batching_vertex:ng,begin_vertex:ig,beginnormal_vertex:sg,bsdfs:rg,iridescence_fragment:og,bumpmap_pars_fragment:ag,clipping_planes_fragment:lg,clipping_planes_pars_fragment:cg,clipping_planes_pars_vertex:hg,clipping_planes_vertex:ug,color_fragment:dg,color_pars_fragment:fg,color_pars_vertex:pg,color_vertex:mg,common:gg,cube_uv_reflection_fragment:xg,defaultnormal_vertex:_g,displacementmap_pars_vertex:yg,displacementmap_vertex:vg,emissivemap_fragment:Mg,emissivemap_pars_fragment:bg,colorspace_fragment:Eg,colorspace_pars_fragment:Sg,envmap_fragment:Tg,envmap_common_pars_fragment:wg,envmap_pars_fragment:Rg,envmap_pars_vertex:Ag,envmap_physical_pars_fragment:Hg,envmap_vertex:Cg,fog_vertex:Pg,fog_pars_vertex:Ig,fog_fragment:Lg,fog_pars_fragment:Ng,gradientmap_pars_fragment:Dg,lightmap_pars_fragment:Ug,lights_lambert_fragment:Fg,lights_lambert_pars_fragment:Bg,lights_pars_begin:Og,lights_toon_fragment:zg,lights_toon_pars_fragment:kg,lights_phong_fragment:Gg,lights_phong_pars_fragment:Vg,lights_physical_fragment:Wg,lights_physical_pars_fragment:Xg,lights_fragment_begin:qg,lights_fragment_maps:Yg,lights_fragment_end:Zg,lightprobes_pars_fragment:Jg,logdepthbuf_fragment:$g,logdepthbuf_pars_fragment:Kg,logdepthbuf_pars_vertex:jg,logdepthbuf_vertex:Qg,map_fragment:ex,map_pars_fragment:tx,map_particle_fragment:nx,map_particle_pars_fragment:ix,metalnessmap_fragment:sx,metalnessmap_pars_fragment:rx,morphinstance_vertex:ox,morphcolor_vertex:ax,morphnormal_vertex:lx,morphtarget_pars_vertex:cx,morphtarget_vertex:hx,normal_fragment_begin:ux,normal_fragment_maps:dx,normal_pars_fragment:fx,normal_pars_vertex:px,normal_vertex:mx,normalmap_pars_fragment:gx,clearcoat_normal_fragment_begin:xx,clearcoat_normal_fragment_maps:_x,clearcoat_pars_fragment:yx,iridescence_pars_fragment:vx,opaque_fragment:Mx,packing:bx,premultiplied_alpha_fragment:Ex,project_vertex:Sx,dithering_fragment:Tx,dithering_pars_fragment:wx,roughnessmap_fragment:Rx,roughnessmap_pars_fragment:Ax,shadowmap_pars_fragment:Cx,shadowmap_pars_vertex:Px,shadowmap_vertex:Ix,shadowmask_pars_fragment:Lx,skinbase_vertex:Nx,skinning_pars_vertex:Dx,skinning_vertex:Ux,skinnormal_vertex:Fx,specularmap_fragment:Bx,specularmap_pars_fragment:Ox,tonemapping_fragment:Hx,tonemapping_pars_fragment:zx,transmission_fragment:kx,transmission_pars_fragment:Gx,uv_pars_fragment:Vx,uv_pars_vertex:Wx,uv_vertex:Xx,worldpos_vertex:qx,background_vert:Yx,background_frag:Zx,backgroundCube_vert:Jx,backgroundCube_frag:$x,cube_vert:Kx,cube_frag:jx,depth_vert:Qx,depth_frag:e_,distance_vert:t_,distance_frag:n_,equirect_vert:i_,equirect_frag:s_,linedashed_vert:r_,linedashed_frag:o_,meshbasic_vert:a_,meshbasic_frag:l_,meshlambert_vert:c_,meshlambert_frag:h_,meshmatcap_vert:u_,meshmatcap_frag:d_,meshnormal_vert:f_,meshnormal_frag:p_,meshphong_vert:m_,meshphong_frag:g_,meshphysical_vert:x_,meshphysical_frag:__,meshtoon_vert:y_,meshtoon_frag:v_,points_vert:M_,points_frag:b_,shadow_vert:E_,shadow_frag:S_,sprite_vert:T_,sprite_frag:w_},Ce={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new fe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new fe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Si={basic:{uniforms:bn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:gt.meshbasic_vert,fragmentShader:gt.meshbasic_frag},lambert:{uniforms:bn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Qe(0)},envMapIntensity:{value:1}}]),vertexShader:gt.meshlambert_vert,fragmentShader:gt.meshlambert_frag},phong:{uniforms:bn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:gt.meshphong_vert,fragmentShader:gt.meshphong_frag},standard:{uniforms:bn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag},toon:{uniforms:bn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Qe(0)}}]),vertexShader:gt.meshtoon_vert,fragmentShader:gt.meshtoon_frag},matcap:{uniforms:bn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:gt.meshmatcap_vert,fragmentShader:gt.meshmatcap_frag},points:{uniforms:bn([Ce.points,Ce.fog]),vertexShader:gt.points_vert,fragmentShader:gt.points_frag},dashed:{uniforms:bn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gt.linedashed_vert,fragmentShader:gt.linedashed_frag},depth:{uniforms:bn([Ce.common,Ce.displacementmap]),vertexShader:gt.depth_vert,fragmentShader:gt.depth_frag},normal:{uniforms:bn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:gt.meshnormal_vert,fragmentShader:gt.meshnormal_frag},sprite:{uniforms:bn([Ce.sprite,Ce.fog]),vertexShader:gt.sprite_vert,fragmentShader:gt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gt.background_vert,fragmentShader:gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:gt.backgroundCube_vert,fragmentShader:gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gt.cube_vert,fragmentShader:gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gt.equirect_vert,fragmentShader:gt.equirect_frag},distance:{uniforms:bn([Ce.common,Ce.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gt.distance_vert,fragmentShader:gt.distance_frag},shadow:{uniforms:bn([Ce.lights,Ce.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:gt.shadow_vert,fragmentShader:gt.shadow_frag}};Si.physical={uniforms:bn([Si.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new fe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new fe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new fe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag};ec={r:0,b:0,g:0},R_=new At,Rf=new ct;Rf.set(-1,0,0,0,1,0,0,0,1);yr=4,N_=6,D_=20,U_=256,No=new fr,rf=new Qe,Wh=null,Xh=0,qh=0,Yh=!1,F_=new N,As=new N,Mr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=F_}=r;Wh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),qh=this._renderer.getActiveMipmapLevel(),Yh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=af(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wh,Xh,qh),this._renderer.xr.enabled=Yh,e.scissorTest=!1,_r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===as||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wh=this._renderer.getRenderTarget(),Xh=this._renderer.getActiveCubeFace(),qh=this._renderer.getActiveMipmapLevel(),Yh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:pn,minFilter:pn,generateMipmaps:!1,type:li,format:Jn,colorSpace:$r,depthBuffer:!1},s=of(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=of(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=B_(r)),this._blurMaterial=H_(r,e,t),this._ggxMaterial=O_(r,e,t)}return s}_compileMaterial(e){let t=new Y(new Et,e);this._renderer.compile(t,No)}_sceneToCubeUV(e,t,n,s,r){let l=new fn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(rf),d.toneMapping=oi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Y(new it,new Gt({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,g=x.material,p=!1,E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,p=!0):(g.color.copy(rf),p=!0);for(let S=0;S<6;S++){let y=S%3;y===0?(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[S],r.y,r.z)):y===1?(l.up.set(0,0,c[S]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[S],r.z)):(l.up.set(0,c[S],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[S]));let T=this._cubeSize;_r(s,y*T,S>2?T:0,T,T),d.setRenderTarget(s),p&&d.render(x,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=E}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===as||e.mapping===Ts;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=lf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=af());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;_r(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,No)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:m}=this,x=this._sizeLods[n],g=3*x*(n>m-yr?n-m+yr:0),p=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,_r(r,g,p,3*x,2*x),s.setRenderTarget(r),s.render(a,No),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-n,_r(e,g,p,3*x,2*x),s.setRenderTarget(e),s.render(a,No)}_blur(e,t,n,s){let r=this._pingPongRenderTarget,o=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,s,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[s];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],d=3*h*(s>this._lodMax-yr?s-this._lodMax+yr:0),u=4*(this._cubeSize-h);_r(t,d,u,3*h,2*h),o.setRenderTarget(t),o.render(l,No)}};nc=class extends Ln{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new io(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new it(5,5,5),r=new Rn({name:"CubemapFromEquirect",uniforms:Rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:gn,blending:bi});r.uniforms.tEquirect.value=t;let o=new Y(s,r),a=t.minFilter;return t.minFilter===ls&&(t.minFilter=pn),new rl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}};Y_={[xh]:"LINEAR_TONE_MAPPING",[_h]:"REINHARD_TONE_MAPPING",[yh]:"CINEON_TONE_MAPPING",[Eo]:"ACES_FILMIC_TONE_MAPPING",[Mh]:"AGX_TONE_MAPPING",[bh]:"NEUTRAL_TONE_MAPPING",[vh]:"CUSTOM_TONE_MAPPING"};Af=new jt,$h=new ji(1,1),Cf=new jr,Pf=new Oa,If=new io,cf=[],hf=[],uf=new Float32Array(16),df=new Float32Array(9),ff=new Float32Array(4);Kh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=py(t.type)}},jh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Dy(t.type)}},Qh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Zh=/(\w+)(\])?(\[|\.)?/g;vr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);Uy(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};Fy=37297,By=0;gf=new ct;ky={[xh]:"Linear",[_h]:"Reinhard",[yh]:"Cineon",[Eo]:"ACESFilmic",[Mh]:"AgX",[bh]:"Neutral",[vh]:"Custom"};tc=new N;Yy=/^[ \t]*#include +<([\w\d./]+)>/gm;Zy=new Map;$y=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;jy={[bo]:"SHADOWMAP_TYPE_PCF",[pr]:"SHADOWMAP_TYPE_VSM"};ev={[as]:"ENVMAP_TYPE_CUBE",[Ts]:"ENVMAP_TYPE_CUBE",[So]:"ENVMAP_TYPE_CUBE_UV"};nv={[Ts]:"ENVMAP_MODE_REFRACTION"};sv={[hl]:"ENVMAP_BLENDING_MULTIPLY",[Nd]:"ENVMAP_BLENDING_MIX",[Dd]:"ENVMAP_BLENDING_ADD"};lv=0,tu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nu(e),t.set(e,n)),n}},nu=class{constructor(e){this.id=lv++,this.code=e,this.usedTimes=0}};gv=0;vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Mv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,bv=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],Ev=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],Tf=new At,Do=new N,Jh=new N;Av=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,iu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new so(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Rn({vertexShader:Av,fragmentShader:Cv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new Ct(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},su=class extends _i{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,m=null,x=typeof XRWebGLBinding<"u",g=new iu,p={},E=t.getContextAttributes(),S=null,y=null,T=[],M=[],v=new fe,_=null,R=null,C=new fn;C.viewport=new Ht;let I=new fn;I.viewport=new Ht;let P=[C,I],H=new ol,F=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ae=T[te];return ae===void 0&&(ae=new lr,T[te]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function(te){let ae=T[te];return ae===void 0&&(ae=new lr,T[te]=ae),ae.getGripSpace()},this.getHand=function(te){let ae=T[te];return ae===void 0&&(ae=new lr,T[te]=ae),ae.getHandSpace()};function V(te){let ae=M.indexOf(te.inputSource);if(ae===-1)return;let he=T[ae];he!==void 0&&(he.update(te.inputSource,te.frame,c||o),he.dispatchEvent({type:te.type,data:te.inputSource}))}function W(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",j);for(let te=0;te<T.length;te++){let ae=M[te];ae!==null&&(M[te]=null,T[te].disconnect(ae))}F=null,k=null,g.reset();for(let te in p)delete p[te];if(e.setRenderTarget(S),f=null,u=null,d=null,s=null,y=null,at.stop(),n.isPresenting=!1,e.setPixelRatio(_),e.setSize(v.width,v.height,!1),R!==null){let te=R.camera;te.fov=R.fov,te.zoom=R.zoom,te.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,n.isPresenting===!0&&rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(S=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",W),s.addEventListener("inputsourceschange",j),E.xrCompatible!==!0&&await t.makeXRCompatible(),_=e.getPixelRatio(),e.getSize(v),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,pe=null,me=null;E.depth&&(me=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=E.stencil?cs:xi,pe=E.stencil?xr:ai);let De={colorFormat:t.RGBA8,depthFormat:me,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(De),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ln(u.textureWidth,u.textureHeight,{format:Jn,type:Nn,depthTexture:new ji(u.textureWidth,u.textureHeight,pe,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let he={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ln(f.framebufferWidth,f.framebufferHeight,{format:Jn,type:Nn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),at.setContext(s),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function j(te){for(let ae=0;ae<te.removed.length;ae++){let he=te.removed[ae],pe=M.indexOf(he);pe>=0&&(M[pe]=null,T[pe].disconnect(he))}for(let ae=0;ae<te.added.length;ae++){let he=te.added[ae],pe=M.indexOf(he);if(pe===-1){for(let De=0;De<T.length;De++)if(De>=M.length){M.push(he),pe=De;break}else if(M[De]===null){M[De]=he,pe=De;break}if(pe===-1)break}let me=T[pe];me&&me.connect(he)}}let Z=new N,ie=new N;function se(te,ae,he){Z.setFromMatrixPosition(ae.matrixWorld),ie.setFromMatrixPosition(he.matrixWorld);let pe=Z.distanceTo(ie),me=ae.projectionMatrix.elements,De=he.projectionMatrix.elements,vt=me[14]/(me[10]-1),le=me[14]/(me[10]+1),de=(me[9]+1)/me[5],xe=(me[9]-1)/me[5],ye=(me[8]-1)/me[0],Ee=(De[8]+1)/De[0],Je=vt*ye,We=vt*Ee,nt=pe/(-ye+Ee),$e=nt*-ye;if(ae.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX($e),te.translateZ(nt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),me[10]===-1)te.projectionMatrix.copy(ae.projectionMatrix),te.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{let D=vt+nt,Ue=le+nt,Xe=Je-$e,L=We+(pe-$e),b=de*le/Ue*D,q=xe*le/Ue*D;te.projectionMatrix.makePerspective(Xe,L,b,q,D,Ue),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function we(te,ae){ae===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ae.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let ae=te.near,he=te.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(he=g.depthFar)),H.near=I.near=C.near=ae,H.far=I.far=C.far=he,(F!==H.near||k!==H.far)&&(s.updateRenderState({depthNear:H.near,depthFar:H.far}),F=H.near,k=H.far),H.layers.mask=te.layers.mask|6,C.layers.mask=H.layers.mask&-5,I.layers.mask=H.layers.mask&-3;let pe=te.parent,me=H.cameras;we(H,pe);for(let De=0;De<me.length;De++)we(me[De],pe);me.length===2?se(H,C,I):H.projectionMatrix.copy(C.projectionMatrix),R===null&&te.isPerspectiveCamera&&(R={camera:te,fov:te.fov,zoom:te.zoom}),Se(te,H,pe)};function Se(te,ae,he){he===null?te.matrix.copy(ae.matrixWorld):(te.matrix.copy(he.matrixWorld),te.matrix.invert(),te.matrix.multiply(ae.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ae.projectionMatrix),te.projectionMatrixInverse.copy(ae.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=or*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(te){l=te,u!==null&&(u.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(H)},this.getCameraTexture=function(te){return p[te]};let Ge=null;function Ve(te,ae){if(h=ae.getViewerPose(c||o),m=ae,h!==null){let he=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let pe=!1;he.length!==H.cameras.length&&(H.cameras.length=0,pe=!0);for(let le=0;le<he.length;le++){let de=he[le],xe=null;if(f!==null)xe=f.getViewport(de);else{let Ee=d.getViewSubImage(u,de);xe=Ee.viewport,le===0&&(e.setRenderTargetTextures(y,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(y))}let ye=P[le];ye===void 0&&(ye=new fn,ye.layers.enable(le),ye.viewport=new Ht,P[le]=ye),ye.matrix.fromArray(de.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(de.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(xe.x,xe.y,xe.width,xe.height),le===0&&(H.matrix.copy(ye.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),pe===!0&&H.cameras.push(ye)}let me=s.enabledFeatures;if(me&&me.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=n.getBinding();let le=d.getDepthInformation(he[0]);le&&le.isValid&&le.texture&&g.init(le,s.renderState)}if(me&&me.includes("camera-access")&&x){e.state.unbindTexture(),d=n.getBinding();for(let le=0;le<he.length;le++){let de=he[le].camera;if(de){let xe=p[de];xe||(xe=new so,p[de]=xe);let ye=d.getCameraImage(de);xe.sourceTexture=ye}}}}for(let he=0;he<T.length;he++){let pe=M[he],me=T[he];pe!==null&&me!==void 0&&me.update(pe,ae,c||o)}Ge&&Ge(te,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),m=null}let at=new wf;at.setAnimationLoop(Ve),this.setAnimationLoop=function(te){Ge=te},this.dispose=function(){}}},Pv=new At,Lf=new ct;Lf.set(-1,0,0,0,1,0,0,0,1);Nv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ei=null;ic=class{constructor(e={}){let{canvas:t=qd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Nn}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;let x=f,g=new Set([vl,yl,_l]),p=new Set([Nn,ai,gr,xr,ml,gl]),E=new Uint32Array(4),S=new Int32Array(4),y=new N,T=null,M=null,v=[],_=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let C=this,I=!1,P=null,H=null,F=null,k=null;this._outputColorSpace=Lt;let V=0,W=0,j=null,Z=-1,ie=null,se=new Ht,we=new Ht,Se=null,Ge=new Qe(0),Ve=0,at=t.width,te=t.height,ae=1,he=null,pe=null,me=new Ht(0,0,at,te),De=new Ht(0,0,at,te),vt=!1,le=new cr,de=!1,xe=!1,ye=new At,Ee=new N,Je=new Ht,We={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},nt=!1;function $e(){return j===null?ae:1}let D=n;function Ue(A,G){return t.getContext(A,G)}let Xe,L,b,q,J,re,Me,be,oe,ce,Re,qe,Ae,Te,ze,je,ht,w,z,U,B,X,O;try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",_e,!1),t.addEventListener("webglcontextrestored",ve,!1),t.addEventListener("webglcontextcreationerror",Be,!1),D===null){let G="webgl2";if(D=Ue(G,A),D===null)throw Ue(G)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Q()}catch(A){throw t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),ot("WebGLRenderer: "+A.message),A}function Q(){Xe=new k_(D),Xe.init(),B=new Rv(D,Xe),L=new I_(D,Xe,e,B),b=new Tv(D,Xe),L.reversedDepthBuffer&&u&&b.buffers.depth.setReversed(!0),H=D.createFramebuffer(),F=D.createFramebuffer(),k=D.createFramebuffer(),q=new W_(D),J=new uv,re=new wv(D,Xe,b,J,L,B,q),Me=new z_(C),be=new qm(D),X=new C_(D,be),oe=new G_(D,be,q,X),ce=new q_(D,oe,be,X,q),w=new X_(D,L,re),ze=new L_(J),Re=new hv(C,Me,Xe,L,X,ze),qe=new Iv(C,J),Ae=new fv,Te=new yv(Xe),ht=new A_(C,Me,b,ce,m,l),je=new Sv(C,ce,L),O=new Lv(D,q,L,b),z=new P_(D,Xe,q),U=new V_(D,Xe,q),q.programs=Re.programs,C.capabilities=L,C.extensions=Xe,C.properties=J,C.renderLists=Ae,C.shadowMap=je,C.state=b,C.info=q}x!==Nn&&(R=new Z_(x,t.width,t.height,a,s,r));let ne=new su(C,D);this.xr=ne,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let A=Xe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=Xe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(A){A!==void 0&&(ae=A,this.setSize(at,te,!1))},this.getSize=function(A){return A.set(at,te)},this.setSize=function(A,G,ee=!0){if(ne.isPresenting){rt("WebGLRenderer: Can't change size while VR device is presenting.");return}at=A,te=G,t.width=Math.floor(A*ae),t.height=Math.floor(G*ae),ee===!0&&(t.style.width=A+"px",t.style.height=G+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,A,G)},this.getDrawingBufferSize=function(A){return A.set(at*ae,te*ae).floor()},this.setDrawingBufferSize=function(A,G,ee){at=A,te=G,ae=ee,t.width=Math.floor(A*ee),t.height=Math.floor(G*ee),this.setViewport(0,0,A,G)},this.setEffects=function(A){if(x===Nn){ot("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let G=0;G<A.length;G++)if(A[G].isOutputPass===!0){rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(se)},this.getViewport=function(A){return A.copy(me)},this.setViewport=function(A,G,ee,$){A.isVector4?me.set(A.x,A.y,A.z,A.w):me.set(A,G,ee,$),b.viewport(se.copy(me).multiplyScalar(ae).round())},this.getScissor=function(A){return A.copy(De)},this.setScissor=function(A,G,ee,$){A.isVector4?De.set(A.x,A.y,A.z,A.w):De.set(A,G,ee,$),b.scissor(we.copy(De).multiplyScalar(ae).round())},this.getScissorTest=function(){return vt},this.setScissorTest=function(A){b.setScissorTest(vt=A)},this.setOpaqueSort=function(A){he=A},this.setTransparentSort=function(A){pe=A},this.getClearColor=function(A){return A.copy(ht.getClearColor())},this.setClearColor=function(){ht.setClearColor(...arguments)},this.getClearAlpha=function(){return ht.getClearAlpha()},this.setClearAlpha=function(){ht.setClearAlpha(...arguments)},this.clear=function(A=!0,G=!0,ee=!0){let $=0;if(A){let K=!1;if(j!==null){let Ie=j.texture.format;K=g.has(Ie)}if(K){let Ie=j.texture.type,Ne=p.has(Ie),Pe=ht.getClearColor(),Oe=ht.getClearAlpha(),Ye=Pe.r,pt=Pe.g,_t=Pe.b;Ne?(E[0]=Ye,E[1]=pt,E[2]=_t,E[3]=Oe,D.clearBufferuiv(D.COLOR,0,E)):(S[0]=Ye,S[1]=pt,S[2]=_t,S[3]=Oe,D.clearBufferiv(D.COLOR,0,S))}else $|=D.COLOR_BUFFER_BIT}G&&($|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&($|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&D.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),P=A},this.dispose=function(){t.removeEventListener("webglcontextlost",_e,!1),t.removeEventListener("webglcontextrestored",ve,!1),t.removeEventListener("webglcontextcreationerror",Be,!1),ht.dispose(),Ae.dispose(),Te.dispose(),J.dispose(),Me.dispose(),ce.dispose(),X.dispose(),O.dispose(),Re.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",ut),ne.removeEventListener("sessionend",Jt),Pn.stop()};function _e(A){A.preventDefault(),Ih("WebGLRenderer: Context Lost."),I=!0}function ve(){Ih("WebGLRenderer: Context Restored."),I=!1;let A=q.autoReset,G=je.enabled,ee=je.autoUpdate,$=je.needsUpdate,K=je.type;Q(),q.autoReset=A,je.enabled=G,je.autoUpdate=ee,je.needsUpdate=$,je.type=K}function Be(A){ot("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ke(A){let G=A.target;G.removeEventListener("dispose",Ke),ge(G)}function ge(A){ke(A),J.remove(A)}function ke(A){let G=J.get(A).programs;G!==void 0&&(G.forEach(function(ee){Re.releaseProgram(ee)}),A.isShaderMaterial&&Re.releaseShaderCache(A))}this.renderBufferDirect=function(A,G,ee,$,K,Ie){G===null&&(G=We);let Ne=K.isMesh&&K.matrixWorld.determinantAffine()<0,Pe=x0(A,G,ee,$,K);b.setMaterial($,Ne);let Oe=ee.index,Ye=1;if($.wireframe===!0){if(Oe=oe.getWireframeAttribute(ee),Oe===void 0)return;Ye=2}let pt=ee.drawRange,_t=ee.attributes.position,He=pt.start*Ye,wt=(pt.start+pt.count)*Ye;Ie!==null&&(He=Math.max(He,Ie.start*Ye),wt=Math.min(wt,(Ie.start+Ie.count)*Ye)),Oe!==null?(He=Math.max(He,0),wt=Math.min(wt,Oe.count)):_t!=null&&(He=Math.max(He,0),wt=Math.min(wt,_t.count));let $t=wt-He;if($t<0||$t===1/0)return;X.setup(K,$,Pe,ee,Oe);let Ft,It=z;if(Oe!==null&&(Ft=be.get(Oe),It=U,It.setIndex(Ft)),K.isMesh)$.wireframe===!0?(b.setLineWidth($.wireframeLinewidth*$e()),It.setMode(D.LINES)):It.setMode(D.TRIANGLES);else if(K.isLine){let _n=$.linewidth;_n===void 0&&(_n=1),b.setLineWidth(_n*$e()),K.isLineSegments?It.setMode(D.LINES):K.isLineLoop?It.setMode(D.LINE_LOOP):It.setMode(D.LINE_STRIP)}else K.isPoints?It.setMode(D.POINTS):K.isSprite&&It.setMode(D.TRIANGLES);if(K.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))It.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let _n=K._multiDrawStarts,Le=K._multiDrawCounts,Sn=K._multiDrawCount,bt=Oe?be.get(Oe).bytesPerElement:1,Wn=J.get($).currentProgram.getUniforms();for(let di=0;di<Sn;di++)Wn.setValue(D,"_gl_DrawID",di),It.render(_n[di]/bt,Le[di])}else if(K.isInstancedMesh)It.renderInstances(He,$t,K.count);else if(ee.isInstancedBufferGeometry){let _n=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Le=Math.min(ee.instanceCount,_n);It.renderInstances(He,$t,Le)}else It.render(He,$t)};function Tt(A,G,ee,$){P!==null&&A.isNodeMaterial&&P.setObject($,A),de===!0&&ze.setState(A,ee,!1),A.transparent===!0&&A.side===st&&A.forceSinglePass===!1?(A.side=gn,A.needsUpdate=!0,Un(A,G,$),A.side=ss,A.needsUpdate=!0,Un(A,G,$),A.side=st):Un(A,G,$)}this.compile=function(A,G,ee=null){ee===null&&(ee=A),P!==null&&P.renderStart(A,G,ee),M=Te.get(ee),M.init(G),_.push(M),ee.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(M.pushLight(K),K.castShadow&&M.pushShadow(K))}),A!==ee&&A.traverseVisible(function(K){K.isLight&&K.layers.test(G.layers)&&(M.pushLight(K),K.castShadow&&M.pushShadow(K))}),M.setupLights(),P!==null&&P.updateLights(M.state.lightsArray),xe=this.localClippingEnabled,de=ze.init(this.clippingPlanes,xe),de===!0&&ze.setGlobalState(this.clippingPlanes,G),P!==null&&je.render(M.state.shadowsArray,ee,G);let $=new Set;return A.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Ie=K.material;if(Ie)if(Array.isArray(Ie))for(let Ne=0;Ne<Ie.length;Ne++){let Pe=Ie[Ne];Tt(Pe,ee,G,K),$.add(Pe)}else Tt(Ie,ee,G,K),$.add(Ie)}),M=_.pop(),P!==null&&P.renderEnd(),$},this.compileAsync=function(A,G,ee=null){let $=this.compile(A,G,ee);return new Promise(K=>{function Ie(){if($.forEach(function(Ne){let Oe=J.get(Ne).currentProgram;(Oe===void 0||Oe.isReady())&&$.delete(Ne)}),$.size===0){K(A);return}setTimeout(Ie,10)}Xe.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let lt=null;function xt(A){lt&&lt(A)}function ut(){Pn.stop()}function Jt(){Pn.start()}let Pn=new wf;Pn.setAnimationLoop(xt),typeof self<"u"&&Pn.setContext(self),this.setAnimationLoop=function(A){lt=A,ne.setAnimationLoop(A),A===null?Pn.stop():Pn.start()},ne.addEventListener("sessionstart",ut),ne.addEventListener("sessionend",Jt),this.render=function(A,G){if(G!==void 0&&G.isCamera!==!0){ot("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;P!==null&&P.renderStart(A,G);let ee=ne.enabled===!0&&ne.isPresenting===!0,$=R!==null&&(j===null||ee)&&R.begin(C,j);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(G),G=ne.getCamera()),A.isScene===!0&&A.onBeforeRender(C,A,G,j),M=Te.get(A,_.length),M.init(G),M.state.textureUnits=re.getTextureUnits(),_.push(M),ye.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),le.setFromProjectionMatrix(ye,ri,G.reversedDepth),xe=this.localClippingEnabled,de=ze.init(this.clippingPlanes,xe),T=Ae.get(A,v.length),T.init(),v.push(T),ne.enabled===!0&&ne.isPresenting===!0){let Ne=C.xr.getDepthSensingMesh();Ne!==null&&ea(Ne,G,-1/0,C.sortObjects)}ea(A,G,0,C.sortObjects),T.finish(),P!==null&&P.updateLights(M.state.lightsArray),C.sortObjects===!0&&T.sort(he,pe),nt=ne.enabled===!1||ne.isPresenting===!1||ne.hasDepthSensing()===!1,nt&&ht.addToRenderList(T,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),de===!0&&ze.beginShadows();let K=M.state.shadowsArray;if(je.render(K,A,G),de===!0&&ze.endShadows(),($&&R.hasRenderPass())===!1){let Ne=T.opaque,Pe=T.transmissive;if(M.setupLights(),G.isArrayCamera){let Oe=G.cameras;if(Pe.length>0)for(let Ye=0,pt=Oe.length;Ye<pt;Ye++){let _t=Oe[Ye];Qn(Ne,Pe,A,_t)}nt&&ht.render(A);for(let Ye=0,pt=Oe.length;Ye<pt;Ye++){let _t=Oe[Ye];xn(T,A,_t,_t.viewport)}}else Pe.length>0&&Qn(Ne,Pe,A,G),nt&&ht.render(A),xn(T,A,G)}j!==null&&W===0&&(re.updateMultisampleRenderTarget(j),re.updateRenderTargetMipmap(j)),$&&R.end(C),A.isScene===!0&&A.onAfterRender(C,A,G),X.resetDefaultState(),Z=-1,ie=null,_.pop(),_.length>0?(M=_[_.length-1],re.setTextureUnits(M.state.textureUnits),de===!0&&ze.setGlobalState(C.clippingPlanes,M.state.camera)):M=null,v.pop(),v.length>0?T=v[v.length-1]:T=null,P!==null&&P.renderEnd()};function ea(A,G,ee,$){if(A.visible===!1)return;if(A.layers.test(G.layers)){if(A.isGroup)ee=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(G);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(le)){$&&Je.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ye);let Ne=ce.update(A),Pe=A.material;Pe.visible&&T.push(A,Ne,Pe,ee,Je.z,null,G)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(le))){let Ne=ce.update(A),Pe=A.material;if($&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Je.copy(A.boundingSphere.center)):(Ne.boundingSphere===null&&Ne.computeBoundingSphere(),Je.copy(Ne.boundingSphere.center)),Je.applyMatrix4(A.matrixWorld).applyMatrix4(ye)),Array.isArray(Pe)){let Oe=Ne.groups;for(let Ye=0,pt=Oe.length;Ye<pt;Ye++){let _t=Oe[Ye],He=Pe[_t.materialIndex];He&&He.visible&&T.push(A,Ne,He,ee,Je.z,_t,G)}}else Pe.visible&&T.push(A,Ne,Pe,ee,Je.z,null,G)}}let Ie=A.children;for(let Ne=0,Pe=Ie.length;Ne<Pe;Ne++)ea(Ie[Ne],G,ee,$)}function xn(A,G,ee,$){let{opaque:K,transmissive:Ie,transparent:Ne}=A;M.setupLightsView(ee),de===!0&&ze.setGlobalState(C.clippingPlanes,ee),$&&b.viewport(se.copy($)),K.length>0&&In(K,G,ee),Ie.length>0&&In(Ie,G,ee),Ne.length>0&&In(Ne,G,ee),b.buffers.depth.setTest(!0),b.buffers.depth.setMask(!0),b.buffers.color.setMask(!0),b.setPolygonOffset(!1)}function Qn(A,G,ee,$){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[$.id]===void 0){let He=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[$.id]=new Ln(1,1,{generateMipmaps:!0,type:He?li:Nn,minFilter:ls,samples:Math.max(4,L.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}let Ie=M.state.transmissionRenderTarget[$.id],Ne=$.viewport||se;Ie.setSize(Ne.z*C.transmissionResolutionScale,Ne.w*C.transmissionResolutionScale);let Pe=C.getRenderTarget(),Oe=C.getActiveCubeFace(),Ye=C.getActiveMipmapLevel();C.setRenderTarget(Ie),C.getClearColor(Ge),Ve=C.getClearAlpha(),Ve<1&&C.setClearColor(16777215,.5),C.clear(),nt&&ht.render(ee);let pt=C.toneMapping;C.toneMapping=oi;let _t=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),M.setupLightsView($),de===!0&&ze.setGlobalState(C.clippingPlanes,$),In(A,ee,$),re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let wt=0,$t=G.length;wt<$t;wt++){let Ft=G[wt],{object:It,geometry:_n,material:Le,group:Sn}=Ft;if(Le.side===st&&It.layers.test($.layers)){let bt=Le.side;Le.side=gn,Le.needsUpdate=!0,Vn(It,ee,$,_n,Le,Sn),Le.side=bt,Le.needsUpdate=!0,He=!0}}He===!0&&(re.updateMultisampleRenderTarget(Ie),re.updateRenderTargetMipmap(Ie))}C.setRenderTarget(Pe,Oe,Ye),C.setClearColor(Ge,Ve),_t!==void 0&&($.viewport=_t),C.toneMapping=pt}function In(A,G,ee){let $=G.isScene===!0?G.overrideMaterial:null;for(let K=0,Ie=A.length;K<Ie;K++){let Ne=A[K],{object:Pe,geometry:Oe,group:Ye}=Ne,pt=Ne.material;pt.allowOverride===!0&&$!==null&&(pt=$),Pe.layers.test(ee.layers)&&Vn(Pe,G,ee,Oe,pt,Ye)}}function Vn(A,G,ee,$,K,Ie){P!==null&&K.isNodeMaterial&&P.setObject(A,K),A.onBeforeRender(C,G,ee,$,K,Ie),A.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),K.onBeforeRender(C,G,ee,$,A,Ie),K.transparent===!0&&K.side===st&&K.forceSinglePass===!1?(K.side=gn,K.needsUpdate=!0,C.renderBufferDirect(ee,G,$,K,A,Ie),K.side=ss,K.needsUpdate=!0,C.renderBufferDirect(ee,G,$,K,A,Ie),K.side=st):C.renderBufferDirect(ee,G,$,K,A,Ie),A.onAfterRender(C,G,ee,$,K,Ie)}function Un(A,G,ee){G.isScene!==!0&&(G=We);let $=J.get(A),K=M.state.lights,Ie=M.state.shadowsArray,Ne=K.state.version,Pe=Re.getParameters(A,K.state,Ie,G,ee,M.state.lightProbeGridArray),Oe=Re.getProgramCacheKey(Pe),Ye=$.programs;$.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?G.environment:null,$.fog=G.fog;let pt=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;$.envMap=Me.get(A.envMap||$.environment,pt),$.envMapRotation=$.environment!==null&&A.envMap===null?G.environmentRotation:A.envMapRotation,Ye===void 0&&(A.addEventListener("dispose",Ke),Ye=new Map,$.programs=Ye);let _t=Ye.get(Oe);if(_t!==void 0){if($.currentProgram===_t&&$.lightsStateVersion===Ne)return Br(A,Pe),_t}else Pe.uniforms=Re.getUniforms(A),P!==null&&A.isNodeMaterial&&P.build(A,ee,Pe),A.onBeforeCompile(Pe,C),_t=Re.acquireProgram(Pe,Oe),Ye.set(Oe,_t),$.uniforms=Pe.uniforms;let He=$.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(He.clippingPlanes=ze.uniform),Br(A,Pe),$.needsLights=y0(A),$.lightsStateVersion=Ne,$.needsLights&&(He.ambientLightColor.value=K.state.ambient,He.lightProbe.value=K.state.probe,He.sunLights.value=K.state.sun,He.sunLightShadows.value=K.state.sunShadow,He.directionalLights.value=K.state.directional,He.directionalLightShadows.value=K.state.directionalShadow,He.spotLights.value=K.state.spot,He.spotLightShadows.value=K.state.spotShadow,He.rectAreaLights.value=K.state.rectArea,He.ltc_1.value=K.state.rectAreaLTC1,He.ltc_2.value=K.state.rectAreaLTC2,He.pointLights.value=K.state.point,He.pointLightShadows.value=K.state.pointShadow,He.hemisphereLights.value=K.state.hemi,He.sunShadowMatrix.value=K.state.sunShadowMatrix,He.sunShadowCascade.value=K.state.sunShadowCascade,He.directionalShadowMatrix.value=K.state.directionalShadowMatrix,He.spotLightMatrix.value=K.state.spotLightMatrix,He.spotLightMap.value=K.state.spotLightMap,He.pointShadowMatrix.value=K.state.pointShadowMatrix),$.lightProbeGrid=M.state.lightProbeGridArray.length>0,$.currentProgram=_t,$.uniformsList=null,_t}function ei(A){if(A.uniformsList===null){let G=A.currentProgram.getUniforms();A.uniformsList=vr.seqWithValue(G.seq,A.uniforms)}return A.uniformsList}function Br(A,G){let ee=J.get(A);ee.outputColorSpace=G.outputColorSpace,ee.batching=G.batching,ee.batchingColor=G.batchingColor,ee.instancing=G.instancing,ee.instancingColor=G.instancingColor,ee.instancingMorph=G.instancingMorph,ee.skinning=G.skinning,ee.morphTargets=G.morphTargets,ee.morphNormals=G.morphNormals,ee.morphColors=G.morphColors,ee.morphTargetsCount=G.morphTargetsCount,ee.numClippingPlanes=G.numClippingPlanes,ee.numIntersection=G.numClipIntersection,ee.vertexAlphas=G.vertexAlphas,ee.vertexTangents=G.vertexTangents,ee.toneMapping=G.toneMapping}function ta(A,G){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(G.matrixWorld);for(let ee=0,$=A.length;ee<$;ee++){let K=A[ee];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function x0(A,G,ee,$,K){G.isScene!==!0&&(G=We),re.resetTextureUnits();let Ie=G.fog,Ne=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?G.environment:null,Pe=j===null?C.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Mt.workingColorSpace,Oe=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,Ye=Me.get($.envMap||Ne,Oe),pt=$.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,_t=!!ee.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),He=!!ee.morphAttributes.position,wt=!!ee.morphAttributes.normal,$t=!!ee.morphAttributes.color,Ft=oi;$.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ft=C.toneMapping);let It=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,_n=It!==void 0?It.length:0,Le=J.get($),Sn=M.state.lights;if(de===!0&&(xe===!0||A!==ie)){let Nt=A===ie&&$.id===Z;ze.setState($,A,Nt)}let bt=!1;$.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==Sn.state.version||Le.outputColorSpace!==Pe||K.isBatchedMesh&&Le.batching===!1||!K.isBatchedMesh&&Le.batching===!0||K.isBatchedMesh&&Le.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Le.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Le.instancing===!1||!K.isInstancedMesh&&Le.instancing===!0||K.isSkinnedMesh&&Le.skinning===!1||!K.isSkinnedMesh&&Le.skinning===!0||K.isInstancedMesh&&Le.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Le.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Le.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Le.instancingMorph===!1&&K.morphTexture!==null||Le.envMap!==Ye||$.fog===!0&&Le.fog!==Ie||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ze.numPlanes||Le.numIntersection!==ze.numIntersection)||Le.vertexAlphas!==pt||Le.vertexTangents!==_t||Le.morphTargets!==He||Le.morphNormals!==wt||Le.morphColors!==$t||Le.toneMapping!==Ft||Le.morphTargetsCount!==_n||!!Le.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(bt=!0):(bt=!0,Le.__version=$.version);let Wn=Le.currentProgram;bt===!0&&(Wn=Un($,G,K),P&&$.isNodeMaterial&&P.onUpdateProgram($,Wn,Le));let di=!1,Gi=!1,Bs=!1,Pt=Wn.getUniforms(),Xt=Le.uniforms;if(b.useProgram(Wn.program)&&(di=!0,Gi=!0,Bs=!0),$.id!==Z&&(Z=$.id,Gi=!0),Le.needsLights){let Nt=ta(M.state.lightProbeGridArray,K);Le.lightProbeGrid!==Nt&&(Le.lightProbeGrid=Nt,Gi=!0)}if(di||ie!==A){b.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Pt.setValue(D,"projectionMatrix",A.projectionMatrix),Pt.setValue(D,"viewMatrix",A.matrixWorldInverse);let Wi=Pt.map.cameraPosition;Wi!==void 0&&Wi.setValue(D,Ee.setFromMatrixPosition(A.matrixWorld)),L.logarithmicDepthBuffer&&Pt.setValue(D,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Pt.setValue(D,"isOrthographic",A.isOrthographicCamera===!0),ie!==A&&(ie=A,Gi=!0,Bs=!0)}if(Le.needsLights&&(Sn.state.sunShadowMap.length>0&&Pt.setValue(D,"sunShadowMap",Sn.state.sunShadowMap,re),Sn.state.directionalShadowMap.length>0&&Pt.setValue(D,"directionalShadowMap",Sn.state.directionalShadowMap,re),Sn.state.spotShadowMap.length>0&&Pt.setValue(D,"spotShadowMap",Sn.state.spotShadowMap,re),Sn.state.pointShadowMap.length>0&&Pt.setValue(D,"pointShadowMap",Sn.state.pointShadowMap,re)),K.isSkinnedMesh){Pt.setOptional(D,K,"bindMatrix"),Pt.setOptional(D,K,"bindMatrixInverse");let Nt=K.skeleton;Nt&&(Nt.boneTexture===null&&Nt.computeBoneTexture(),Pt.setValue(D,"boneTexture",Nt.boneTexture,re))}K.isBatchedMesh&&(Pt.setOptional(D,K,"batchingTexture"),Pt.setValue(D,"batchingTexture",K._matricesTexture,re),Pt.setOptional(D,K,"batchingIdTexture"),Pt.setValue(D,"batchingIdTexture",K._indirectTexture,re),Pt.setOptional(D,K,"batchingColorTexture"),K._colorsTexture!==null&&Pt.setValue(D,"batchingColorTexture",K._colorsTexture,re));let Vi=ee.morphAttributes;if((Vi.position!==void 0||Vi.normal!==void 0||Vi.color!==void 0)&&w.update(K,ee,Wn),(Gi||Le.receiveShadow!==K.receiveShadow)&&(Le.receiveShadow=K.receiveShadow,Pt.setValue(D,"receiveShadow",K.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&G.environment!==null&&(Xt.envMapIntensity.value=G.environmentIntensity),Xt.dfgLUT!==void 0&&(Xt.dfgLUT.value=Dv()),Gi){if(Pt.setValue(D,"toneMappingExposure",C.toneMappingExposure),Le.needsLights&&_0(Xt,Bs),Ie&&$.fog===!0&&qe.refreshFogUniforms(Xt,Ie),qe.refreshMaterialUniforms(Xt,$,ae,te,M.state.transmissionRenderTarget[A.id]),Le.needsLights&&Le.lightProbeGrid){let Nt=Le.lightProbeGrid;Xt.probesSH.value=Nt.texture,Xt.probesMin.value.copy(Nt.boundingBox.min),Xt.probesMax.value.copy(Nt.boundingBox.max),Xt.probesResolution.value.copy(Nt.resolution)}vr.upload(D,ei(Le),Xt,re)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(vr.upload(D,ei(Le),Xt,re),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Pt.setValue(D,"center",K.center),Pt.setValue(D,"modelViewMatrix",K.modelViewMatrix),Pt.setValue(D,"normalMatrix",K.normalMatrix),Pt.setValue(D,"modelMatrix",K.matrixWorld),$.uniformsGroups!==void 0){let Nt=$.uniformsGroups;for(let Wi=0,Os=Nt.length;Wi<Os;Wi++){let Bu=Nt[Wi];O.update(Bu,Wn),O.bind(Bu,Wn)}}return Wn}function _0(A,G){A.ambientLightColor.needsUpdate=G,A.lightProbe.needsUpdate=G,A.sunLights.needsUpdate=G,A.sunLightShadows.needsUpdate=G,A.directionalLights.needsUpdate=G,A.directionalLightShadows.needsUpdate=G,A.pointLights.needsUpdate=G,A.pointLightShadows.needsUpdate=G,A.spotLights.needsUpdate=G,A.spotLightShadows.needsUpdate=G,A.rectAreaLights.needsUpdate=G,A.hemisphereLights.needsUpdate=G}function y0(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(A,G,ee){let $=J.get(A);$.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),J.get(A.texture).__webglTexture=G,J.get(A.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ee,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,G){let ee=J.get(A);ee.__webglFramebuffer=G,ee.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(A,G=0,ee=0){j=A,V=G,W=ee;let $=null,K=!1,Ie=!1;if(A){let Pe=J.get(A);if(Pe.__useDefaultFramebuffer!==void 0){b.bindFramebuffer(D.FRAMEBUFFER,Pe.__webglFramebuffer),se.copy(A.viewport),we.copy(A.scissor),Se=A.scissorTest,b.viewport(se),b.scissor(we),b.setScissorTest(Se),Z=-1;return}else if(Pe.__webglFramebuffer===void 0)re.setupRenderTarget(A);else if(Pe.__hasExternalTextures)re.rebindTextures(A,J.get(A.texture).__webglTexture,J.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let pt=A.depthTexture;if(Pe.__boundDepthTexture!==pt){if(pt!==null&&J.has(pt)&&(A.width!==pt.image.width||A.height!==pt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(A)}}let Oe=A.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(Ie=!0);let Ye=J.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Ye[G])?$=Ye[G][ee]:$=Ye[G],K=!0):A.samples>0&&re.useMultisampledRTT(A)===!1?$=J.get(A).__webglMultisampledFramebuffer:Array.isArray(Ye)?$=Ye[ee]:$=Ye,se.copy(A.viewport),we.copy(A.scissor),Se=A.scissorTest}else se.copy(me).multiplyScalar(ae).floor(),we.copy(De).multiplyScalar(ae).floor(),Se=vt;if(ee!==0&&($=H),b.bindFramebuffer(D.FRAMEBUFFER,$)&&b.drawBuffers(A,$),b.viewport(se),b.scissor(we),b.setScissorTest(Se),K){let Pe=J.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+G,Pe.__webglTexture,ee)}else if(Ie){let Pe=G;for(let Oe=0;Oe<A.textures.length;Oe++){let Ye=J.get(A.textures[Oe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Oe,Ye.__webglTexture,ee,Pe)}}else if(A!==null&&ee!==0){let Pe=J.get(A.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Pe.__webglTexture,ee)}Z=-1};function Fu(A){let G=J.get(A);return(G.__readFormat!==A.format||G.__readType!==A.type)&&(G.__readFormat=A.format,G.__readType=A.type,G.__formatReadable=L.textureFormatReadable(A.format),G.__typeReadable=L.textureTypeReadable(A.type)),G}this.readRenderTargetPixels=function(A,G,ee,$,K,Ie,Ne,Pe=0){if(!(A&&A.isWebGLRenderTarget)){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Oe=Oe[Ne]),Oe){b.bindFramebuffer(D.FRAMEBUFFER,Oe);try{let Ye=A.textures[Pe],pt=Ye.format,_t=Ye.type;A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Pe);let He=Fu(Ye);if(He.__formatReadable===!1){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(He.__typeReadable===!1){ot("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=A.width-$&&ee>=0&&ee<=A.height-K&&D.readPixels(G,ee,$,K,B.convert(pt),B.convert(_t),Ie)}finally{let Ye=j!==null?J.get(j).__webglFramebuffer:null;b.bindFramebuffer(D.FRAMEBUFFER,Ye)}}},this.readRenderTargetPixelsAsync=async function(A,G,ee,$,K,Ie,Ne,Pe=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Oe=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Ne!==void 0&&(Oe=Oe[Ne]),Oe)if(G>=0&&G<=A.width-$&&ee>=0&&ee<=A.height-K){b.bindFramebuffer(D.FRAMEBUFFER,Oe);let Ye=A.textures[Pe],pt=Ye.format,_t=Ye.type;A.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+Pe);let He=Fu(Ye);if(He.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(He.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,wt),D.bufferData(D.PIXEL_PACK_BUFFER,Ie.byteLength,D.STREAM_READ),D.readPixels(G,ee,$,K,B.convert(pt),B.convert(_t),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let $t=j!==null?J.get(j).__webglFramebuffer:null;b.bindFramebuffer(D.FRAMEBUFFER,$t);let Ft=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Zd(D,Ft,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,wt),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,Ie),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(wt),D.deleteSync(Ft),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,G=null,ee=0){let $=Math.pow(2,-ee),K=Math.floor(A.image.width*$),Ie=Math.floor(A.image.height*$),Ne=G!==null?G.x:0,Pe=G!==null?G.y:0;re.setTexture2D(A,0),D.copyTexSubImage2D(D.TEXTURE_2D,ee,0,0,Ne,Pe,K,Ie),b.unbindTexture()},this.copyTextureToTexture=function(A,G,ee=null,$=null,K=0,Ie=0){let Ne,Pe,Oe,Ye,pt,_t,He,wt,$t,Ft=A.isCompressedTexture?A.mipmaps[Ie]:A.image;if(ee!==null)Ne=ee.max.x-ee.min.x,Pe=ee.max.y-ee.min.y,Oe=ee.isBox3?ee.max.z-ee.min.z:1,Ye=ee.min.x,pt=ee.min.y,_t=ee.isBox3?ee.min.z:0;else{let Xt=Math.pow(2,-K);Ne=Math.floor(Ft.width*Xt),Pe=Math.floor(Ft.height*Xt),A.isDataArrayTexture?Oe=Ft.depth:A.isData3DTexture?Oe=Math.floor(Ft.depth*Xt):Oe=1,Ye=0,pt=0,_t=0}$!==null?(He=$.x,wt=$.y,$t=$.z):(He=0,wt=0,$t=0);let It=B.convert(G.format),_n=B.convert(G.type),Le;G.isData3DTexture?(re.setTexture3D(G,0),Le=D.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(re.setTexture2DArray(G,0),Le=D.TEXTURE_2D_ARRAY):(re.setTexture2D(G,0),Le=D.TEXTURE_2D),b.activeTexture(D.TEXTURE0),b.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,G.flipY),b.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),b.pixelStorei(D.UNPACK_ALIGNMENT,G.unpackAlignment);let Sn=b.getParameter(D.UNPACK_ROW_LENGTH),bt=b.getParameter(D.UNPACK_IMAGE_HEIGHT),Wn=b.getParameter(D.UNPACK_SKIP_PIXELS),di=b.getParameter(D.UNPACK_SKIP_ROWS),Gi=b.getParameter(D.UNPACK_SKIP_IMAGES);b.pixelStorei(D.UNPACK_ROW_LENGTH,Ft.width),b.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ft.height),b.pixelStorei(D.UNPACK_SKIP_PIXELS,Ye),b.pixelStorei(D.UNPACK_SKIP_ROWS,pt),b.pixelStorei(D.UNPACK_SKIP_IMAGES,_t);let Bs=A.isDataArrayTexture||A.isData3DTexture,Pt=G.isDataArrayTexture||G.isData3DTexture;if(A.isDepthTexture){let Xt=J.get(A),Vi=J.get(G),Nt=J.get(Xt.__renderTarget),Wi=J.get(Vi.__renderTarget);b.bindFramebuffer(D.READ_FRAMEBUFFER,Nt.__webglFramebuffer),b.bindFramebuffer(D.DRAW_FRAMEBUFFER,Wi.__webglFramebuffer);for(let Os=0;Os<Oe;Os++)Bs&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,J.get(A).__webglTexture,K,_t+Os),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,J.get(G).__webglTexture,Ie,$t+Os)),D.blitFramebuffer(Ye,pt,Ne,Pe,He,wt,Ne,Pe,D.DEPTH_BUFFER_BIT,D.NEAREST);b.bindFramebuffer(D.READ_FRAMEBUFFER,null),b.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(K!==0||A.isRenderTargetTexture||J.has(A)){let Xt=J.get(A),Vi=J.get(G);b.bindFramebuffer(D.READ_FRAMEBUFFER,F),b.bindFramebuffer(D.DRAW_FRAMEBUFFER,k);for(let Nt=0;Nt<Oe;Nt++)Bs?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Xt.__webglTexture,K,_t+Nt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Xt.__webglTexture,K),Pt?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Vi.__webglTexture,Ie,$t+Nt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Vi.__webglTexture,Ie),K!==0?D.blitFramebuffer(Ye,pt,Ne,Pe,He,wt,Ne,Pe,D.COLOR_BUFFER_BIT,D.NEAREST):Pt?D.copyTexSubImage3D(Le,Ie,He,wt,$t+Nt,Ye,pt,Ne,Pe):D.copyTexSubImage2D(Le,Ie,He,wt,Ye,pt,Ne,Pe);b.bindFramebuffer(D.READ_FRAMEBUFFER,null),b.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Pt?A.isDataTexture||A.isData3DTexture?D.texSubImage3D(Le,Ie,He,wt,$t,Ne,Pe,Oe,It,_n,Ft.data):G.isCompressedArrayTexture?D.compressedTexSubImage3D(Le,Ie,He,wt,$t,Ne,Pe,Oe,It,Ft.data):D.texSubImage3D(Le,Ie,He,wt,$t,Ne,Pe,Oe,It,_n,Ft):A.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,Ie,He,wt,Ne,Pe,It,_n,Ft.data):A.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,Ie,He,wt,Ft.width,Ft.height,It,Ft.data):D.texSubImage2D(D.TEXTURE_2D,Ie,He,wt,Ne,Pe,It,_n,Ft);b.pixelStorei(D.UNPACK_ROW_LENGTH,Sn),b.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt),b.pixelStorei(D.UNPACK_SKIP_PIXELS,Wn),b.pixelStorei(D.UNPACK_SKIP_ROWS,di),b.pixelStorei(D.UNPACK_SKIP_IMAGES,Gi),Ie===0&&G.generateMipmaps&&D.generateMipmap(Le),b.unbindTexture()},this.initRenderTarget=function(A){J.get(A).__webglFramebuffer===void 0&&re.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?re.setTextureCube(A,0):A.isData3DTexture?re.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?re.setTexture2DArray(A,0):re.setTexture2D(A,0),b.unbindTexture()},this.resetState=function(){V=0,W=0,j=null,b.reset(),X.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}}});function Er(i){return new go({color:0,emissive:16777215,emissiveIntensity:i})}var oc,Nf=qt(()=>{sn();oc=class extends ys{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new it;e.deleteAttribute("uv");let t=new ue({side:gn}),n=new ue,s=new Ss(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new Y(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new vs(e,n,6),a=new mn;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Y(e,Er(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Y(e,Er(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Y(e,Er(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new Y(e,Er(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new Y(e,Er(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new Y(e,Er(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}}});function ac(i,e,t,n,s){let r=(a,l,c,h)=>new Y(new dt(a,a,l,c).rotateX(Math.PI/2),h),o=new Ze;return o.add(r(i,e,36,t),r(i*.6,e+.02,28,n),r(i*.2,e+.04,16,s)),o}function cn(i,e,t,n){let s=new N().subVectors(e,i),r=s.length(),o=new Y(new dt(t,t,r,8),n);return o.position.copy(i).addScaledVector(s,.5),o.quaternion.setFromUnitVectors(new N(0,1,0),s.normalize()),o}function Fo(i){let[,e]=et(16);e.drawImage(i,0,0,16,16);let t=(a,l)=>{let c=e.getImageData(0,a,16,l-a).data,h=0,d=0,u=0;for(let m=0;m<c.length;m+=4)h+=c[m],d+=c[m+1],u+=c[m+2];let f=c.length/4;return`rgb(${h/f|0},${d/f|0},${u/f|0})`},n=512,[s,r]=et(n),o=r.createLinearGradient(0,0,n*.3,n);return o.addColorStop(0,t(0,3)),o.addColorStop(.5,t(7,9)),o.addColorStop(1,t(13,16)),r.fillStyle=o,r.fillRect(0,0,n,n),ft(s)}function Vv(i,e,t,n){let s=i.createLinearGradient(0,0,0,t);if(s.addColorStop(0,"#12082e"),s.addColorStop(1,"#2b0f4d"),i.fillStyle=s,i.fillRect(0,0,e,t),n==="box"){let a=i.createRadialGradient(e,0,0,e,0,Math.hypot(e,t));[[0,"#ed73a5"],[.18,"#d04694"],[.35,"#a02f74"],[.65,"#69204a"],[.75,"#4c1439"],[1,"#52123a"]].forEach(([l,c])=>a.addColorStop(l,c)),i.fillStyle=a,i.fillRect(0,0,e,t);return}let r=Math.hypot(e*.5,t*.6)*.7,o=i.createRadialGradient(e/2,t*.4,0,e/2,t*.4,r);o.addColorStop(0,"rgba(255,46,136,.14)"),o.addColorStop(1,"rgba(255,46,136,0)"),i.fillStyle=o,i.fillRect(0,0,e,t)}function Bf(i,e,t=1){let n=i.querySelector("canvas"),s=i.querySelector("img"),r=matchMedia("(prefers-reduced-motion: reduce)").matches,o=new ic({canvas:n,antialias:!0,alpha:!0});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.outputColorSpace=Lt,o.toneMapping=Eo;let a=e({maxAniso:o.capabilities.getMaxAnisotropy()});o.toneMappingExposure=a.exposure??.9;let l=new ys,c=new Mr(o),h=new oc;l.environment=c.fromScene(h,.04).texture,h.dispose(),c.dispose(),l.environmentIntensity=a.envIntensity??.55;let d=new Mo(16777215,.9);d.position.set(30,40,50),l.add(d);let u=D=>{D.exposure!==void 0&&(o.toneMappingExposure=D.exposure),D.envIntensity!==void 0&&(l.environmentIntensity=D.envIntensity),D.sun!==void 0&&(d.intensity=D.sun),D.background!==void 0&&(l.background=new Qe(D.background))};a.look&&u(a.look);let f=new en().setFromObject(a.object),m=f.getSize(new N);a.object.position.sub(f.getCenter(new N));let x=new Ze;x.add(a.object),l.add(x);let g=new fn(Uf,1,1,1e3);g.zoom=t;let p=Math.tan(Ut.degToRad(Uf/2)),E=(a.fitSize??Math.max(m.x,m.y))/.8/2/p,S=D=>{let Ue=a.fitWidth?a.fitWidth/.8/2/p/D:0;g.position.set(0,0,Math.max(E,Ue)+(a.clearance??m.z))};S(1),g.lookAt(0,0,0);let y=new N(1,0,0),T=new N(0,1,0),M=new Mn,v=(D,Ue)=>{M.setFromAxisAngle(D,Ue),x.quaternion.premultiply(M)},_=D=>{M.setFromAxisAngle(T,D),x.quaternion.multiply(M)},R=Ut.degToRad(a.pose?.x??10);x.quaternion.identity(),v(T,Ut.degToRad(a.pose?.y??25)),v(y,R);let C=x.quaternion.clone(),I=a.turntable,P=R,H=(D,Ue)=>{if(!I){v(T,D),v(y,Ue);return}_(D);let Xe=Ut.degToRad(I.minDeg),L=Ut.degToRad(I.maxDeg),b=Ut.clamp(P+Ue,Xe,L);v(y,b-P),P=b},F=a.autoSway,k="show",V=0,W=0,j=0,Z=0,ie=0,se=kv*(a.fitWidth??a.fitSize??Math.max(m.x,m.y)),we=0,Se=0,Ge=!1,Ve=0,at=0,te=new Mn,ae=new Mn,he=new qn,pe=0,me=D=>{te.copy(x.quaternion),ae.copy(D),pe=0,Se=we=0,j=0,Z=0,k="settle"},De=()=>F?C:I?ae.clone().setFromAxisAngle(y,R-P).multiply(x.quaternion):(he.setFromQuaternion(x.quaternion,"XYZ"),ae.clone().setFromEuler(he.set(R,he.y,0,"XYZ"))),vt=D=>D*D*(3-2*D),le=()=>{let D=i.clientWidth,Ue=i.clientHeight;!D||!Ue||(o.setSize(D,Ue,!1),g.aspect=D/Ue,S(D/Ue),g.updateProjectionMatrix())},de=new ResizeObserver(le);de.observe(i),le(),n.style.cursor="grab",n.addEventListener("pointerdown",D=>{Ge=!0,Ve=D.clientX,at=D.clientY,n.setPointerCapture(D.pointerId),n.style.cursor="grabbing",k="user",W=0}),n.addEventListener("pointermove",D=>{if(!Ge){D.pointerType==="mouse"&&(k==="show"||k==="wait")&&(k="wait",V=performance.now());return}we=(D.clientX-Ve)*Ff,Se=(D.clientY-at)*Fv,Ve=D.clientX,at=D.clientY,H(we,Se)});let xe=()=>{Ge=!1,n.style.cursor="grab"};n.addEventListener("pointerup",xe),n.addEventListener("pointercancel",xe),n.addEventListener("dblclick",()=>me(C));let ye=0,Ee=0,Je=D=>{let Ue=Ee?Math.min((D-Ee)/1e3,.1):0;if(Ee=D,k==="user"&&!Ge?Math.abs(we)>1e-4||Math.abs(Se)>1e-4?(we*=Df,Se*=Df,H(we,Se)):(k="wait",V=D):k==="wait"&&!r&&D-V>=Bv?me(De()):k==="settle"&&(pe=Math.min(pe+Ue/Ov,1),x.quaternion.slerpQuaternions(te,ae,vt(pe)),pe>=1&&(k="show",W=0,P=R)),(k==="show"||k==="wait")&&!r){W=Ut.clamp(W+(k==="show"?Ue:-Ue)/Hv,0,1);let Xe=vt(W);if(F){j+=2*Math.PI*Ue*Xe/F.periodSec;let L=Ut.degToRad(F.amplitudeDeg)*Xe*Math.sin(j);_(L-Z),Z=L}else _(Uv*Xe*Ue)}r||(a.tick?.(Ue),ie+=Ue,x.position.y=Math.sin(2*Math.PI*ie/zv)*se),o.render(l,g),ye=requestAnimationFrame(Je)},We=new IntersectionObserver(([D])=>{cancelAnimationFrame(ye),Ee=0,D.isIntersecting&&(ye=requestAnimationFrame(Je))});We.observe(i);let nt=()=>{cancelAnimationFrame(ye),We.disconnect(),de.disconnect(),l.traverse(D=>{let Ue=D;if(Ue.isMesh){Ue.geometry.dispose();for(let Xe of[Ue.material].flat()){for(let L of Object.values(Xe))L instanceof jt&&L.dispose();Xe.dispose()}}}),l.environment?.dispose(),o.dispose(),o.forceContextLoss()};return n.hidden=!1,s&&(s.style.transition="opacity .3s",s.style.opacity="0",setTimeout(()=>{s.style.display="none"},300)),{setVariant:D=>{let Ue=a.setVariant?.(D);Ue&&u(Ue)},snapshot:()=>new Promise(D=>{o.render(l,g);let Ue=n.width,Xe=n.height,[L,b]=et(Ue,Xe);Vv(b,Ue,Xe,i.dataset.viewer),b.drawImage(n,0,0);let q=Math.max(11,Math.round(Ue*.024)),J=Math.round(Ue*.03);b.font=`600 ${q}px ui-monospace, Menlo, Consolas, monospace`,b.textAlign="right",b.textBaseline="bottom",b.shadowColor="rgba(11,6,32,.8)",b.shadowBlur=q*.4,b.fillStyle="rgba(255,158,79,.9)",b.fillText(Gv,Ue-J,Xe-J*.8),L.toBlob(re=>D(re),"image/png")}),dispose:nt}}var Uv,Df,Ff,Fv,Bv,Ov,Hv,zv,kv,Uf,et,ft,Gv,An=qt(()=>{"use strict";sn();Nf();Uv=.3,Df=.92,Ff=.008,Fv=Ff/2,Bv=5e3,Ov=1.2,Hv=1.5,zv=6,kv=.012,Uf=35,et=(i,e=i)=>{let t=document.createElement("canvas");return t.width=i,t.height=e,[t,t.getContext("2d")]},ft=i=>{let e=new Yt(i);return e.colorSpace=Lt,e};Gv="leonidainteractive.com"});var Of={};Tn(Of,{vinylModel:()=>Qv});function Wv(){let[n,s]=et(1024),r=s.createImageData(1024,1024);for(let o=0;o<1024;o++)for(let a=0;a<1024;a++){let l=a/1024-.5,c=o/1024-.5,h=Math.hypot(l,c)*2,d=h>.36&&h<.97?Math.sin(h*120*Math.PI*2)*.35:0,u=h?l/(h/2)*d:0,f=h?c/(h/2)*d:0,m=Math.hypot(u,f,1),x=(o*1024+a)*4;r.data[x]=(u/m*.5+.5)*255,r.data[x+1]=(-f/m*.5+.5)*255,r.data[x+2]=(1/m*.5+.5)*255,r.data[x+3]=255}return s.putImageData(r,0,0),new Yt(n)}function Xv(i){return()=>((i=i*16807%2147483647)-1)/2147483646}function qv(i){if(i==="black"||i==="clear")return null;let e=1024,[t,n]=et(e),s=Xv(i==="splatter"?7:11),r=(o,a)=>{let l=Math.hypot(o-e/2,a-e/2)/(e/2);return l>.34&&l<.99};if(i==="splatter"){n.fillStyle="#e3a2d8",n.fillRect(0,0,e,e);for(let o=0;o<2600;o++){let a=s()*e,l=s()*e;r(a,l)&&(n.fillStyle=s()<.6?"#2f4de0":"#6a3fe0",n.globalAlpha=.8+s()*.2,n.beginPath(),n.ellipse(a,l,2+s()*10,1.5+s()*5,s()*Math.PI,0,Math.PI*2),n.fill())}}else{n.fillStyle="#4b3db4",n.fillRect(0,0,e,e),n.fillStyle="#f2a9da";for(let o=0;o<60;o++){let a=s()*e,l=s()*e;r(a,l)&&(n.globalAlpha=.85,n.beginPath(),n.arc(a,l,12+s()*55,0,Math.PI*2),n.fill())}}return n.globalAlpha=1,ft(t)}function Yv(){let[t,n]=et(1024);if(n.fillStyle="rgba(235,245,250,0.16)",n.fillRect(0,0,1024,1024),n.createConicGradient){let s=n.createConicGradient(.5,512,512);[0,.12,.2,.32,.5,.62,.7,.82,1].forEach((r,o)=>s.addColorStop(r,o%2?"rgba(255,255,255,0.75)":"rgba(255,255,255,0.08)")),n.fillStyle=s,n.fillRect(0,0,1024,1024)}n.strokeStyle="rgba(255,255,255,0.22)",n.lineWidth=1.5;for(let s=.37;s<.97;s+=.06)n.beginPath(),n.arc(512,512,s*512,0,Math.PI*2),n.stroke();return ft(t)}function Zv(i){let[t,n]=et(512),s=n.createLinearGradient(0,0,0,512);return i==="clear"?(s.addColorStop(0,"#16111f"),s.addColorStop(1,"#0a0810")):i==="black"?(s.addColorStop(0,"#f08ac8"),s.addColorStop(1,"#ffb070")):(s.addColorStop(0,"#1b2a8f"),s.addColorStop(1,"#c2479e")),n.fillStyle=s,n.beginPath(),n.arc(512/2,512/2,512/2,0,Math.PI*2),n.fill(),n.strokeStyle="rgba(255,255,255,.85)",n.lineWidth=512*.02,n.beginPath(),n.arc(512/2,512/2,512*.4,0,Math.PI*2),n.stroke(),n.fillStyle="#000",n.beginPath(),n.arc(512/2,512/2,512*.035,0,Math.PI*2),n.fill(),ft(t)}function $v(i){let n=85.33333333333333,[s,r]=et(1024),o=c=>{r.beginPath(),r.arc(512,512,c*n,0,Math.PI*2)},a=c=>{let h=r.createConicGradient?r.createConicGradient(0,512,512):r.createLinearGradient(0,0,1024,1024);return c.forEach(([d,u])=>h.addColorStop(d,u)),h},l=r.createRadialGradient(512,512,0,512,512,512);if(l.addColorStop(0,"#e4e7ec"),l.addColorStop(1,"#b4bac5"),r.fillStyle=l,o(6),r.fill(),i)r.fillStyle=a([[0,"#f08ac8"],[.33,"#ffb070"],[.66,"#2f4de0"],[1,"#f08ac8"]]),o(5.9),r.arc(512,512,2.3*n,0,Math.PI*2,!0),r.fill("evenodd"),r.strokeStyle="rgba(255,255,255,.9)",r.lineWidth=n*.22,o(2.45),r.stroke();else{r.globalAlpha=.28,r.fillStyle=a([[0,"#8fd8ff"],[.2,"#ffb3e6"],[.4,"#fff1a8"],[.6,"#a9ffd3"],[.8,"#b9a8ff"],[1,"#8fd8ff"]]),o(5.95),r.arc(512,512,2.3*n,0,Math.PI*2,!0),r.fill("evenodd"),r.globalAlpha=1,r.strokeStyle="rgba(40,50,70,.10)",r.lineWidth=1;for(let c=2.4;c<5.85;c+=.035)o(c),r.stroke()}return r.fillStyle="#c9ced6",o(2.2),r.fill(),r.strokeStyle="rgba(40,50,70,.35)",r.lineWidth=2,o(1.75),r.stroke(),ft(s)}function Kv(){return{tint:new yt({color:14477550,transparent:!0,opacity:.14,roughness:.06,depthWrite:!1}),gloss:new yt({color:0,roughness:.04,ior:2.2,transparent:!0,blending:os,depthWrite:!1})}}function jv(i){let e=new Ze,{tint:t,gloss:n}=Kv(),s=(S,y=.5)=>new ue({color:S,roughness:y,metalness:.1}),r=(S,y,T,M,v,_,R,C=!1)=>{let I=new it(S,y,T),P=new Y(I,R);if(P.position.set(M,v,_),e.add(P),C){let H=new Y(I,n);H.position.copy(P.position),e.add(H)}return P},o=Oo/2,a=Ho/2;r(Oo,Ho,.12,0,0,.44,t,!0),r(Oo,Ho,.1,0,0,-.45,t,!0),r(Oo,.12,1,0,a-.06,0,t),r(Oo,.12,1,0,-a+.06,0,t),r(.12,Ho,1,o-.06,0,0,t),r(1.5,Ho,.8,-o+.75,0,0,s(1447451,.4));let l=new Ot;l.moveTo(-5.6,-6.1),l.lineTo(7,-6.1),l.lineTo(7,6.1),l.lineTo(-5.6,6.1),l.closePath();let c=new Ms;c.absarc(Sr,0,5.75,0,Math.PI*2,!0),l.holes.push(c);let h=s(986899,.45),d=new Y(new Zt(l,{depth:.08,bevelEnabled:!1,curveSegments:48}),h);d.position.z=-.4,e.add(d);let u=new Y(new dt(1.75,1.75,.14,48),h);u.rotation.x=Math.PI/2,u.position.set(Sr,0,-.25),e.add(u);for(let S of[90,210,330]){let y=new Y(new it(4.4,.5,.08),h),T=Ut.degToRad(S);y.position.set(Sr+Math.cos(T)*3.7,Math.sin(T)*3.7,-.36),y.rotation.z=T,e.add(y)}let f=new es(.75,6,96,1),m=S=>{let y=$v(S);return new yt({map:y,emissiveMap:y,emissive:3947580,metalness:.6,roughness:.3,iridescence:S?0:1,iridescenceIOR:1.6,iridescenceThicknessRange:[250,700]})},x=new Y(f,m(!0));x.position.set(Sr,0,-.06);let g=new Y(f,m(!1));g.position.set(Sr,0,-.18),g.rotation.y=Math.PI;let p=new Y(new dt(6,6,.12,96,1,!0),s(12765136,.3));p.rotation.x=Math.PI/2,p.position.set(Sr,0,-.12),e.add(x,g,p);let E=s(15722974,.9);return r(12,12,.06,.5,0,.33,[E,E,E,E,i,E]),e}var Bo,Oo,Ho,Jv,Sr,Qv,Hf=qt(()=>{"use strict";sn();An();Bo=14275527;Oo=14.2,Ho=12.5,Jv=2.7,Sr=.5;Qv=i=>({maxAniso:e})=>{let t=i.sleeveCm??31.4,n=i.recordCm??30,s=new Ze,r=new Ze;s.add(r);let o=()=>new ue({color:Bo,roughness:.9}),a=o(),l=o();r.add(new Y(new it(t,t,.5),[o(),o(),o(),o(),a,l]));let c=new ue({roughness:.35,metalness:.1,normalMap:Wv(),normalScale:new fe(.6,.6)}),h=new ue({roughness:.5,metalness:.1}),d=new Y(new dt(n/2,n/2,.2,96),[h,c,c]);d.rotation.x=Math.PI/2,d.position.x=n*.35,r.add(d);let u=new yt({color:16777215,map:Yv(),transparent:!0,roughness:.05,depthWrite:!1,normalMap:c.normalMap,normalScale:new fe(.3,.3)}),f=new yt({color:16055290,transparent:!0,opacity:.6,roughness:.04,depthWrite:!1}),m=new yt({color:1842208,roughness:.03,ior:2.2,clearcoat:1,clearcoatRoughness:.02,transparent:!0,blending:os,depthWrite:!1,normalMap:c.normalMap,normalScale:new fe(.3,.3)}),x=new Y(d.geometry,m);x.position.copy(d.position),x.rotation.copy(d.rotation),x.visible=!1,r.add(x);let g=new ue({roughness:.6});for(let I of[1,-1]){let P=new Y(new On(5,64),g);P.position.set(d.position.x,0,I*.11),I<0&&(P.rotation.y=Math.PI),r.add(P)}let p=new Yn,E=new Map,S=I=>(E.has(I)||E.set(I,new Promise(P=>p.load(I,H=>{H.colorSpace=Lt,H.anisotropy=e,P(H)},void 0,()=>P(null)))),E.get(I)),y=new Map,T=(I,P,H)=>{I.map=P,I.color.set(P?16777215:H),I.needsUpdate=!0},M=new en().setFromObject(r).getCenter(new N),v=null,_=o(),R=-1,C=I=>{let P=i.variants[I];if(!P||I===R)return;if(R=I,r.visible=P.id!=="cd",v&&(v.visible=P.id==="cd"),P.id==="cd"){v||(v=jv(_),v.scale.setScalar(Jv),v.position.copy(M),s.add(v)),S(P.front).then(k=>R===I&&T(_,k,Bo));return}y.has(P.id)||y.set(P.id,{map:qv(P.id),label:Zv(P.id)});let H=y.get(P.id),F=P.id==="clear";d.material=F?[f,u,u]:[h,c,c],x.visible=F,T(c,H.map,723723),T(h,null,P.id==="black"?723723:P.id==="splatter"?14260939:4930996),c.roughness=P.id==="liquid"?.15:.35,g.map=H.label,g.needsUpdate=!0,S(P.front).then(k=>{R===I&&(T(a,k,Bo),P.back?S(P.back).then(V=>R===I&&T(l,V,Bo)):T(l,k?Fo(k.image):null,Bo))})};return C(0),{object:s,setVariant:C}}});var kf={};Tn(kf,{boxModel:()=>tM});var cc,ru,zf,ou,lc,eM,tM,Gf=qt(()=>{"use strict";sn();cc=30,ru=cc*.8,zf=6.6,ou=.2,lc=12.7,eM=657930,tM=i=>({maxAniso:e})=>{let t=u=>new yt({color:u?16777215:eM,map:u,roughness:.6,metalness:0,clearcoat:.25,clearcoatRoughness:.35}),n=t(),s=t(),r=t(),o=new Yn,a=(u,f)=>o.load(u,m=>{m.colorSpace=Lt,m.anisotropy=e,f.map=m,f.color.set(16777215),f.needsUpdate=!0});a(i.front,s),a(i.lid,r);let l=new Ze,c=new Y(new it(cc,lc,ru),[n,n,n,n,s,n]);c.position.y=lc/2;let h=new Y(new it(cc-.8,ou+.4,ru-.8),new Gt({color:0}));h.position.y=lc+ou/2;let d=new Y(new it(cc,zf,ru),[n,n,r,n,n,n]);return d.position.y=lc+ou+zf/2,l.add(c,h,d),{object:l,fitSize:26,pose:{x:16,y:-28},envIntensity:.8,exposure:1}}});var Xf={};Tn(Xf,{magazineModel:()=>oM});function Vf(i){let[e,t]=i==="v"?et(32,256):et(256,32),n=e.width,s=e.height;t.fillStyle="#e9e3d8",t.fillRect(0,0,n,s);let r=i==="v"?7:13,o=()=>(r=r*16807%2147483647,r/2147483647),a=256;for(let c=0;c<a;c+=4){let h=c%32===0?.75:.3+o()*.3;t.fillStyle=`rgba(${110+o()*25|0},${100+o()*20|0},${90+o()*20|0},${h})`,i==="v"?t.fillRect(0,c,n,1+(c%32===0?1:0)):t.fillRect(c,0,1+(c%32===0?1:0),s)}let l=ft(e);return l.anisotropy=4,l}function iM(){let{W:i,H:e,T:t,R:n}=Wf,s=-i/2,r=new Ot;r.moveTo(s+n,t/2),r.absarc(s+n,t/2-n,n,Math.PI/2,Math.PI,!1),r.lineTo(s,-t/2+n),r.absarc(s+n,-t/2+n,n,Math.PI,Math.PI*1.5,!1),r.closePath();let o=new Zt(r,{depth:e,bevelEnabled:!1,curveSegments:6});o.rotateX(Math.PI/2),o.translate(0,e/2,0);let a=[[0,7240123],[.2,9339069],[.31,13472197],[.43,15179465],[1,15507914]],l=o.attributes.position,c=new Float32Array(l.count*3),h=new Qe,d=new Qe;for(let u=0;u<l.count;u++){let f=Math.min(1,Math.max(0,(e/2-l.getY(u))/e)),m=0;for(;m<a.length-2&&f>a[m+1][0];)m++;let x=(f-a[m][0])/(a[m+1][0]-a[m][0]);h.setHex(a[m][1]),d.setHex(a[m+1][1]),h.lerp(d,Math.min(1,Math.max(0,x))),c.set([h.r,h.g,h.b],u*3)}return o.setAttribute("color",new Dt(c,3)),o}function rM(){let[i,e]=et(512,64);e.fillStyle="#efe9df",e.fillRect(0,0,512,64);for(let t=0;t<64;t+=2)e.fillStyle=t%6?"rgba(120,110,100,.18)":"rgba(120,110,100,.3)",e.fillRect(0,t,512,1);return ft(i)}var nM,Wf,sM,oM,qf=qt(()=>{"use strict";sn();An();nM={standard:{W:21.3,H:27.6,T:.6,spine:1840176},large:{W:24,H:30,T:.8,spine:1907515},edge:{W:23,H:30,T:.5,spine:3811914}},Wf={W:23,H:30,T:1.8,R:.25,COVER:.04};sM=i=>({maxAniso:e})=>{let{W:t,H:n,T:s,R:r,COVER:o}=Wf,a=v=>new yt({color:v,roughness:.45,clearcoat:.4,clearcoatRoughness:.3}),l=a(14540253),c=a(3811930),h=new ue({color:15525596,roughness:.9}),d=new ue({map:Vf("u"),roughness:.9}),u=new ue({map:Vf("v"),roughness:.9}),f=new yt({vertexColors:!0,roughness:.5,clearcoat:.3,clearcoatRoughness:.35}),m=new ue({color:15525596,roughness:.9});new Yn().load(i.front,v=>{v.colorSpace=Lt,v.anisotropy=e,v.repeat.set((t-r)/t,1),v.offset.set(r/t,0),l.map=v,l.color.set(16777215),l.needsUpdate=!0,c.map=Fo(v.image),c.color.set(16777215),c.needsUpdate=!0});let x=t-r,g=r/2,p=s/2-o/2,E=new Y(new it(x,n,o),[h,h,h,h,l,h]);E.position.set(g,0,p);let S=new Y(new it(x,n,o),[h,h,h,h,h,c]);S.position.set(g,0,-p);let y=new Y(new it(x,n,s-2*o),[d,h,u,u,h,h]);y.position.set(g,0,0);let T=new Y(iM(),[m,f]),M=new Ze;return M.add(y,E,S,T),{object:M,fitSize:n,pose:{x:8,y:-24},envIntensity:.5,exposure:.95}};oM=i=>i.format==="love"?sM(i):({maxAniso:e})=>{let{W:t,H:n,T:s,spine:r}=nM[i.format==="large"||i.format==="edge"?i.format:"standard"],o=f=>new yt({color:f,roughness:.45,clearcoat:.4,clearcoatRoughness:.3}),a=o(14540253),l=o(3811930),c=o(r),h=new ue({map:rM(),roughness:.9});new Yn().load(i.front,f=>{f.colorSpace=Lt,f.anisotropy=e,a.map=f,a.color.set(16777215),a.needsUpdate=!0,l.map=Fo(f.image),l.color.set(16777215),l.needsUpdate=!0});let d=new Y(new it(t,n,s),[h,c,h,h,a,l]),u=new Ze;return u.add(d),{object:u,fitSize:n,pose:{x:8,y:-24},envIntensity:.5,exposure:.95}}});var Zf={};Tn(Zf,{postcardModel:()=>hM});function cM(i){let[e,t]=et(1500,1e3),n="#5a4a36",s="#8a7a62";t.fillStyle="#f2e9d4",t.fillRect(0,0,1500,1e3);let r=t.createRadialGradient(750,500,300,750,500,950);r.addColorStop(0,"rgba(255,250,235,0)"),r.addColorStop(1,"rgba(150,120,70,.16)"),t.fillStyle=r,t.fillRect(0,0,1500,1e3);for(let v=0;v<900;v++)t.fillStyle=`rgba(110,90,60,${.03+v*37%10/160})`,t.fillRect(v*733%1500,v*419%1e3,2,2);t.textAlign="center",t.textBaseline="middle",t.fillStyle=s,t.font='600 30px Georgia, "Times New Roman", serif',t.letterSpacing="12px",t.fillText("POST CARD",750,78),t.letterSpacing="0px",t.strokeStyle=n,t.lineWidth=3,t.globalAlpha=.75,t.beginPath(),t.moveTo(750,130),t.lineTo(750,900),t.stroke(),t.globalAlpha=1,t.textAlign="left",t.fillStyle=n,t.font='italic 64px Georgia, "Times New Roman", serif',t.fillText("Greetings from",90,380);let o=118,a=()=>{t.font=`italic 700 ${o}px Georgia, "Times New Roman", serif`};for(a();t.measureText(i).width>570&&o>40;)o-=4,a();t.fillStyle="#a2452a",t.fillText(i,90,410+o*.65);let l=410+o*.65+o*.45;t.strokeStyle="#a2452a",t.lineWidth=4,t.lineCap="round",t.globalAlpha=.8,t.beginPath(),t.moveTo(95,l),t.bezierCurveTo(240,l-14,380,l+12,520,l-6),t.stroke(),t.globalAlpha=1,t.fillStyle=s,t.font='italic 38px Georgia, "Times New Roman", serif',t.fillText("Wish you were here!",90,770);let c=1210,h=100,d=200,u=250;t.fillStyle="#f9f2e0",t.beginPath(),t.rect(c,h,d,u),t.fill(),t.save(),t.beginPath(),t.rect(c+16,h+16,d-32,u-32),t.clip();let f=t.createLinearGradient(0,h+16,0,h+u-16);f.addColorStop(0,"#ffcf8a"),f.addColorStop(.6,"#ff9a6a"),f.addColorStop(1,"#f06a7a"),t.fillStyle=f,t.fillRect(c+16,h+16,d-32,u-32);let m=c+70,x=h+100;t.strokeStyle="#fff4c8",t.lineWidth=5,t.lineCap="round";for(let v=0;v<12;v++){let _=v/12*Math.PI*2;t.beginPath(),t.moveTo(m+Math.cos(_)*34,x+Math.sin(_)*34),t.lineTo(m+Math.cos(_)*50,x+Math.sin(_)*50),t.stroke()}t.fillStyle="#fff4c8",t.beginPath(),t.arc(m,x,26,0,Math.PI*2),t.fill(),t.fillStyle="#2d7f9a",t.fillRect(c+16,h+188,d-32,46),t.strokeStyle="#8fd0d8",t.lineWidth=3;for(let v=0;v<2;v++){t.beginPath(),t.moveTo(c+16,h+202+v*18);for(let _=0;_<168;_+=28)t.quadraticCurveTo(c+16+_+7,h+194+v*18,c+16+_+14,h+202+v*18),t.quadraticCurveTo(c+16+_+21,h+210+v*18,c+16+_+28,h+202+v*18);t.stroke()}t.strokeStyle="#4a2f22",t.lineWidth=8,t.beginPath(),t.moveTo(c+138,h+190),t.quadraticCurveTo(c+128,h+150,c+146,h+108),t.stroke();let g=c+146,p=h+108;t.strokeStyle="#1f5a3a",t.lineWidth=7;for(let[v,_]of[[-44,10],[-34,-22],[-6,-36],[28,-30],[46,-2],[34,22]])t.beginPath(),t.moveTo(g,p),t.quadraticCurveTo(g+v*.55,p+_-16,g+v,p+_),t.stroke();t.restore(),t.fillStyle="#f2e9d4";let E=(v,_)=>{t.beginPath(),t.arc(v,_,7,0,Math.PI*2),t.fill()};for(let v=c;v<=c+d;v+=20)E(v,h),E(v,h+u);for(let v=h;v<=h+u;v+=20)E(c,v),E(c+d,v);t.strokeStyle="rgba(90,74,54,.35)",t.lineWidth=2,t.strokeRect(c+8,h+8,d-16,u-16);let S=1020,y=250,T=98;t.save(),t.globalAlpha=.62,t.strokeStyle="#33407a",t.fillStyle="#33407a",t.lineWidth=5,t.beginPath(),t.arc(S,y,T,0,Math.PI*2),t.stroke(),t.lineWidth=2.5,t.beginPath(),t.arc(S,y,T-12,0,Math.PI*2),t.stroke(),t.font="700 22px Georgia, serif",t.textAlign="center",t.textBaseline="middle";let M=(v,_,R,C)=>{[...v].forEach((P,H)=>{let F=_+(H-(v.length-1)/2)*.2*C;t.save(),t.translate(S+Math.cos(F)*R,y+Math.sin(F)*R),t.rotate(F+(C===1?Math.PI/2:-Math.PI/2)),t.fillText(P,0,0),t.restore()})};M("LEONIDA POST",-Math.PI/2,T-25,1),M("\u2022 SUNSHINE \u2022",Math.PI/2,T-25,-1),t.font="700 26px Georgia, serif",t.fillText("POSTED",S,y),t.lineWidth=4,t.lineCap="round";for(let v=0;v<4;v++){t.beginPath(),t.moveTo(S+T+6,y-30+v*20);for(let _=0;_<75;_+=25)t.quadraticCurveTo(S+T+6+_+6,y-40+v*20,S+T+6+_+12,y-30+v*20),t.quadraticCurveTo(S+T+6+_+18,y-20+v*20,S+T+6+_+25,y-30+v*20);t.stroke()}t.restore(),t.strokeStyle=s,t.lineWidth=2.5,t.globalAlpha=.7;for(let v of[480,580,680,780])t.beginPath(),t.moveTo(810,v),t.lineTo(1410,v),t.stroke();return t.globalAlpha=1,ft(e)}var Yf,aM,lM,hM,Jf=qt(()=>{"use strict";sn();An();Yf=15,aM=10,lM=.04;hM=i=>({maxAniso:e})=>{let n=(c=>new yt({color:c,roughness:.55,clearcoat:.2,clearcoatRoughness:.4}))(15263976),s=cM(i.region);s.anisotropy=e;let r=new ue({map:s,roughness:.9,metalness:0}),o=new ue({color:16052714,roughness:.85});new Yn().load(i.front,c=>{c.colorSpace=Lt,c.anisotropy=e,n.map=c,n.color.set(16777215),n.needsUpdate=!0});let a=new Y(new it(Yf,aM,lM),[o,o,o,o,n,r]),l=new Ze;return l.add(a),{object:l,fitSize:12,fitWidth:Yf,pose:{x:6,y:-20},envIntensity:.45,exposure:.8}}});function $n(i,e,t,n,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;zo.copy(e),zo[n]=0,zo.normalize();let c=.5*o/(o+a),h=1-zo.angleTo(i)/l;return Math.sign(zo[t])===1?h*c:a/(o+a)+c+c*(1-h)}var zo,Fe,Oi=qt(()=>{sn();zo=new N;Fe=class i extends it{constructor(e=1,t=1,n=1,s=2,r=.1){let o=s*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:s,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new N,c=new N,h=new N(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,m=d.length/6,x=new N,g=.5/o;for(let p=0,E=0;p<d.length;p+=3,E+=2)switch(l.fromArray(d,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[p+0]=h.x*Math.sign(l.x)+c.x*r,d[p+1]=h.y*Math.sign(l.y)+c.y*r,d[p+2]=h.z*Math.sign(l.z)+c.z*r,u[p+0]=c.x,u[p+1]=c.y,u[p+2]=c.z,Math.floor(p/m)){case 0:x.set(1,0,0),f[E+0]=$n(x,c,"z","y",r,n),f[E+1]=1-$n(x,c,"y","z",r,t);break;case 1:x.set(-1,0,0),f[E+0]=1-$n(x,c,"z","y",r,n),f[E+1]=1-$n(x,c,"y","z",r,t);break;case 2:x.set(0,1,0),f[E+0]=1-$n(x,c,"x","z",r,e),f[E+1]=$n(x,c,"z","x",r,n);break;case 3:x.set(0,-1,0),f[E+0]=1-$n(x,c,"x","z",r,e),f[E+1]=1-$n(x,c,"z","x",r,n);break;case 4:x.set(0,0,1),f[E+0]=1-$n(x,c,"x","y",r,e),f[E+1]=1-$n(x,c,"y","x",r,t);break;case 5:x.set(0,0,-1),f[E+0]=$n(x,c,"x","y",r,e),f[E+1]=1-$n(x,c,"y","x",r,t);break}}static fromJSON(e){return new i(e.width,e.height,e.depth,e.segments,e.radius)}}});var tp={};Tn(tp,{mailerModel:()=>gM});function ep(i){return()=>((i=i*16807%2147483647)-1)/2147483646}function jf(i){let e=(t,n)=>{let s=Math.imul(t,374761393)^Math.imul(n,668265263)^i;return s=Math.imul(s^s>>>13,1274126177),((s^s>>>16)>>>0)/4294967295};return(t,n)=>{let s=Math.floor(t),r=Math.floor(n),o=t-s,a=n-r,l=o*o*(3-2*o),c=a*a*(3-2*a),h=e(s,r),d=e(s+1,r),u=e(s,r+1),f=e(s+1,r+1);return h+(d-h)*l+(u-h)*c+(h-d-u+f)*l*c}}function dM(){let[e,t]=et(256),n=ep(5),s=t.createImageData(256,256);for(let o=0;o<256*256;o++){let a=110+n()*90;s.data[o*4]=s.data[o*4+1]=s.data[o*4+2]=a,s.data[o*4+3]=255}t.putImageData(s,0,0);let r=new Yt(e);return r.wrapS=r.wrapT=gi,r.repeat.set(10,10),r}function Qf(i){let[t,n]=et(256);n.fillStyle="#dc7300",n.fillRect(0,0,256,256),n.fillStyle="rgba(255,170,60,.35)";for(let s=0;s<256;s+=12)for(let r=s/12%2*6;r<256;r+=12)n.beginPath(),n.arc(r+3,s+3,1.6,0,Math.PI*2),n.fill();if(i){let s=n.createLinearGradient(0,0,0,256);s.addColorStop(0,"rgba(60,20,0,0)"),s.addColorStop(.45,"rgba(60,20,0,.18)"),s.addColorStop(1,"rgba(60,20,0,.62)"),n.fillStyle=s,n.fillRect(0,0,256,256)}return ft(t)}function fM(){let e=Math.round(1024*Ti/ko),[t,n]=et(1024,e);n.fillStyle=lu,n.fillRect(0,0,1024,e);let s="#f1f1f1",r=280,o=56;n.save(),n.translate(1024/2,e/2),n.strokeStyle=s,n.lineWidth=11,n.lineJoin="round",n.beginPath(),n.roundRect(-r/2,-r/2,r,r,o),n.stroke(),n.scale(2.1,2.1),n.transform(1,0,-.14,1,0,0),n.strokeStyle=s,n.lineWidth=15,n.lineJoin="miter",n.lineCap="butt",n.beginPath(),n.moveTo(-24,-30),n.lineTo(2,-30),n.arc(2,-14,16,-Math.PI/2,Math.PI/2),n.lineTo(-24,2),n.moveTo(-24,-30),n.lineTo(-24,32),n.moveTo(-4,2),n.lineTo(16,32),n.stroke();let a=24,l=24,c=17,h=7.4;n.beginPath();for(let d=0;d<10;d++){let u=-Math.PI/2+d*Math.PI/5+.15,f=d%2?h:c;n[d?"lineTo":"moveTo"](a+Math.cos(u)*f,l+Math.sin(u)*f)}return n.closePath(),n.fillStyle=lu,n.fill(),n.lineWidth=4.4,n.lineJoin="round",n.stroke(),n.restore(),ft(t)}function pM(){let[t,n]=et(512,320);n.fillStyle="#f6efe0",n.beginPath(),n.roundRect(0,0,512,320,22),n.fill();let s=["#f08a3c","#7a3fb0","#ff5aa5","#c24fb0"],r=472/4;s.forEach((o,a)=>{n.fillStyle=o,n.beginPath(),n.roundRect(14+a*(r+4),14,r-4,292,12),n.fill()}),n.fillStyle="#fbf6ea",n.beginPath(),n.roundRect(60,96,392,128,18),n.fill(),n.fillStyle="#ff5aa5",n.fillRect(86,124,190,26),n.fillStyle="#2447d6",n.fillRect(86,166,322,30),n.fillStyle="#fbf6ea";for(let[o,a,l]of[[56,252,20],[196,56,16],[330,262,18],[452,58,16]])n.beginPath(),n.arc(o,a,l,0,Math.PI*2),n.fill();return ft(t)}function mM(i,e){let t=new Ct(i,e,44,34);t.rotateX(-Math.PI/2);let n=jf(11),s=jf(23),r=ep(9),o=Array.from({length:7},()=>{let l=r()*Math.PI,c=(r()-.5)*i*.7,h=(r()-.5)*e*.7;return{nx:Math.cos(l),nz:Math.sin(l),ox:c,oz:h,amp:.6+r()*1,sign:r()<.35?-1:1}}),a=t.attributes.position;for(let l=0;l<a.count;l++){let c=a.getX(l),h=a.getZ(l),d=Math.abs(c)/(i/2),u=Math.abs(h)/(e/2),f=ci*.56+(n(c*.13+3,h*.13+7)-.5)*3.2+(1-Math.abs(2*s(c*.17,h*.17)-1))*.8;for(let m of o){let x=(c-m.ox)*m.nx+(h-m.oz)*m.nz;f+=m.sign*m.amp*Math.exp(-(x*x)/2.2)}f+=Math.pow(Math.max(d,u),3)*4.5,a.setY(l,Math.min(f,ci-1))}return t.computeVertexNormals(),t}var ko,Ti,ci,Cn,au,$f,Kf,lu,uM,gM,np=qt(()=>{"use strict";sn();Oi();An();ko=38,Ti=30,ci=15,Cn=.4,au=4.5,$f=.06,Kf=Ut.degToRad(110),lu="#0a0a0a",uM=650;gM=()=>({maxAniso:i})=>{let e=matchMedia("(prefers-reduced-motion: reduce)").matches,t=dM();t.anisotropy=i;let n=new ue({color:lu,roughness:.9,bumpMap:t,bumpScale:.5}),s=fM();s.anisotropy=i;let r=new ue({color:16777215,map:s,roughness:.85,bumpMap:t,bumpScale:.5}),o=new ue({map:Qf(!1),roughness:.6}),a=new ue({map:Qf(!0),roughness:.6}),l=new ue({color:15243290,roughness:.7}),c=(Ge,Ve,at,te)=>new Y(new it(Ge,Ve,at),[0,1,2,3,4,5].map(ae=>te[ae]??n)),h=new Ze,d=ko/2-Cn/2,u=Ti/2-Cn/2,f=ko-2*Cn,m=c(Cn,ci,Ti,{0:a,2:l});m.position.set(-d,ci/2,0);let x=c(Cn,ci,Ti,{1:a,2:l});x.position.set(d,ci/2,0);let g=c(f,ci,Cn,{4:a,2:l});g.position.set(0,ci/2,-u);let p=ci-au-$f,E=c(f,p,Cn,{5:a,2:l});E.position.set(0,p/2,u);let S=c(f,Cn,Ti-2*Cn,{2:o});S.position.set(0,Cn/2,0),h.add(m,x,g,E,S);let y=new Ze;y.position.set(0,ci+$f,-Ti/2);let T=c(ko,Cn,Ti,{2:r,3:o});T.position.set(0,Cn/2,Ti/2);let M=c(ko,au,Cn,{5:a});M.position.set(0,-au/2,Ti-Cn/2),y.add(T,M),h.add(y);let v=new Y(mM(f+.3,Ti-2*Cn+.3),new ue({color:2105379,roughness:.45,flatShading:!0,side:st}));h.add(v);let _=t.clone();_.needsUpdate=!0,_.repeat.set(5,5);let R=new Y(new Fe(25,5,18,4,1.4),new ue({color:2377686,roughness:.95,bumpMap:_,bumpScale:.8}));R.position.set(4,ci*.56+3,.5),R.rotation.y=.07;let C=pM();C.anisotropy=i;let I=new Y(new Ct(12,7.5),new ue({map:C,roughness:.8,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));I.rotation.x=-Math.PI/2,I.position.set(0,2.5+.03,.8),R.add(I),h.add(R);let P=new Ze;P.add(h);let F=new en().setFromObject(h).getCenter(new N);y.rotation.x=-Kf,h.updateMatrixWorld(!0);let k=new en().setFromObject(h),V=k.getCenter(new N),W=k.getBoundingSphere(new yi),j=Math.min(1,28/W.radius);y.rotation.x=0,h.updateMatrixWorld(!0);let Z=new N,ie=Ge=>{y.rotation.x=-Kf*Ge;let Ve=Ut.lerp(1,j,Ge);h.scale.setScalar(Ve),Z.lerpVectors(F,V,Ge),h.position.copy(F).addScaledVector(Z,-Ve)},se=0,we=0;return{object:P,fitSize:40,pose:{x:24,y:-28},envIntensity:.9,exposure:1.05,setVariant:Ge=>{cancelAnimationFrame(we);let Ve=Ge===1?1:0;if(e){se=Ve,ie(se);return}let at=se,te=performance.now(),ae=he=>{let pe=Math.min((he-te)/uM,1);se=at+(Ve-at)*(pe<.5?4*pe*pe*pe:1-Math.pow(-2*pe+2,3)/2),ie(se),pe<1&&(we=requestAnimationFrame(ae))};we=requestAnimationFrame(ae)}}}});var up={};Tn(up,{SCRIPT:()=>Cs,scriptLayout:()=>Tr,signModel:()=>RM});function vM(i){return()=>((i=i*16807%2147483647)-1)/2147483646}function MM(){let n=vM(7),[s,r]=et(512),[o,a]=et(512);for(let d=0;d<4;d++){let u=d*128,f=r.createLinearGradient(u,0,u+128,0);f.addColorStop(0,"#5f646c"),f.addColorStop(.08,"#70757d"),f.addColorStop(.5,"#787d86"),f.addColorStop(.92,"#6e737b"),f.addColorStop(1,"#585d64"),r.fillStyle=f,r.fillRect(u,0,128,512);let m=a.createLinearGradient(u,0,u+128,0);m.addColorStop(0,"#202020"),m.addColorStop(.12,"#c0c0c0"),m.addColorStop(.5,"#d8d8d8"),m.addColorStop(.88,"#c0c0c0"),m.addColorStop(1,"#202020"),a.fillStyle=m,a.fillRect(u,0,128,512)}for(let d=0;d<90;d++){let u=n()*512,f=1+n()*3,m=n()*512,x=40+n()*260;r.fillStyle=n()<.5?"rgba(20,22,26,.10)":"rgba(200,205,215,.08)",r.fillRect(u,m,f,x),m+x>512&&r.fillRect(u,m-512,f,x)}let l=r.getImageData(0,0,512,512);for(let d=0;d<512*512;d++){let u=(n()-.5)*16;l.data[d*4]+=u,l.data[d*4+1]+=u,l.data[d*4+2]+=u}r.putImageData(l,0,0);let c=ft(s),h=new Yt(o);for(let d of[c,h])d.wrapS=d.wrapT=gi,d.repeat.set(op/4,hu/4);return[c,h]}function Tr(i=xM,e=_M){let[,t]=et(8);t.font=`100px ${Cs}`;let n=0,s=1e9,r=-1e9,o=1e9,a=-1e9,l=bM.map((u,f)=>{let m=t.measureText(u.text),x=m.actualBoundingBoxLeft,g=m.actualBoundingBoxRight,p=m.actualBoundingBoxAscent,E=m.actualBoundingBoxDescent;f&&(n+=EM+x);let S=n;return s=Math.min(s,S-x),r=Math.max(r,S+g),o=Math.min(o,u.dy-p),a=Math.max(a,u.dy+E),n+=g,{text:u.text,x:S,y:u.dy}}),c=Math.min(i/(r-s||1),e/(a-o||1)),h=(s+r)/2,d=(o+a)/2;return{f:100*c,words:l.map(u=>({text:u.text,x:(u.x-h)*c,y:(u.y-d)*c}))}}function hp(i,e,t,n,s,r,o){i.font=`${e.f*t}px ${Cs}`,i.textBaseline="alphabetic",i.textAlign="left",i.lineJoin="round",i.lineCap="round",i.miterLimit=2,i.fillStyle=i.strokeStyle=o,i.lineWidth=r*t;for(let a of e.words)i.fillText(a.text,n+a.x*t,s+a.y*t),r>0&&i.strokeText(a.text,n+a.x*t,s+a.y*t)}function ip(i,e,t){let s=2048/ap,r=Math.round(lp*s),[o,a]=et(2048,r);hp(a,i,s,2048/2,r/2,e,"#fff");let l=ft(o);return l.anisotropy=t,l}function sp(i,e,t){let s=1024/dc,r=Math.round(fc*s),[o,a]=et(1024,r),l=5e3;for(let[c,h]of t)a.save(),a.globalAlpha=h,a.shadowColor=e,a.shadowBlur=c,a.shadowOffsetX=l,hp(a,i,s,1024/2-l,r/2,uu+2*cp,"#000"),a.restore();return ft(o)}function SM(){let[e,t]=et(256),n=t.createRadialGradient(256/2,256/2,0,256/2,256/2,256/2);return n.addColorStop(0,"rgba(255,60,150,.9)"),n.addColorStop(.45,"rgba(255,40,140,.35)"),n.addColorStop(1,"rgba(255,40,140,0)"),t.fillStyle=n,t.fillRect(0,0,256,256),ft(e)}function TM(){let[t,n]=et(1024,174),s=n.createLinearGradient(0,0,0,174);s.addColorStop(0,"#f3eaee"),s.addColorStop(1,"#d9ccd3"),n.fillStyle=s,n.fillRect(0,0,1024,174),n.strokeStyle="#c98aa5",n.lineWidth=3,n.strokeRect(7,7,1010,160);let r="WELCOME TO",o=118,a=16,l=[],c=0,h=()=>{n.font=`900 ${o}px ${rp}`,l=[...r].map(u=>n.measureText(u).width),c=l.reduce((u,f)=>u+f,0)+a*(r.length-1)};for(h();c>934&&o>40;)o-=4,a=o*.135,h();n.textBaseline="middle",n.lineJoin="round";let d=(1024-c)/2;return[...r].forEach((u,f)=>{n.lineWidth=o*.07,n.strokeStyle="#9b2c66",n.strokeText(u,d,174/2+4),n.fillStyle="#e9569a",n.fillText(u,d,174/2+4),d+=l[f]+a}),ft(t)}function wM(){let[t,n]=et(270,230);n.fillStyle="#e4488c",n.fillRect(0,0,270,230),n.strokeStyle="#fff",n.lineWidth=7,n.strokeRect(9,9,252,212),n.strokeStyle="#fff",n.lineCap="round",n.lineJoin="round";let s=(r,o,a,l)=>{n.lineWidth=7*a,n.beginPath(),n.moveTo(r,o),n.quadraticCurveTo(r+l*10*a,o-40*a,r+l*4*a,o-78*a),n.stroke();let c=r+l*4*a,h=o-78*a;n.lineWidth=5*a;for(let d of[-160,-125,-90,-55,-20]){let u=d*Math.PI/180,f=c+Math.cos(u)*38*a,m=h+Math.sin(u)*30*a+14*a;n.beginPath(),n.moveTo(c,h),n.quadraticCurveTo(c+Math.cos(u)*26*a,h+Math.sin(u)*34*a-8*a,f,m),n.stroke()}};return s(52,196,1,1),s(218,196,.85,-1),n.save(),n.translate(270/2,150),n.transform(1,0,-.18,1,0,0),n.fillStyle="#fff",n.font=`900 118px ${rp}`,n.textAlign="center",n.textBaseline="alphabetic",n.fillText("VI",0,0),n.restore(),ft(t)}var Cs,rp,op,hu,ap,lp,hc,uc,xM,_M,uu,cp,Go,Vo,cu,yM,bM,EM,dc,fc,RM,pc=qt(()=>{"use strict";sn();An();Cs="'Segoe Script','Brush Script MT','Snell Roundhand','Apple Chancery','Lucida Handwriting',cursive",rp="'Arial Black','Segoe UI Black','Helvetica Neue',Impact,sans-serif",op=84,hu=70,ap=22,lp=9,hc=-1.1,uc=.1,xM=20.6,_M=8.3,uu=.32,cp=.2,Go=.34,Vo=14,cu=.04,yM=16723592;bM=[{text:"Vice",dy:14},{text:"city",dy:-14}],EM=24;dc=34,fc=20;RM=()=>({maxAniso:i})=>{let e=Tr(),t=new Ze,[n,s]=MM();n.anisotropy=i;let r=new Y(new Ct(op,hu),new ue({map:n,bumpMap:s,bumpScale:.35,roughness:.78,metalness:.25,side:st}));r.rotation.x=-Math.PI/2;let o=new Y(new Ct(.09,hu),new Gt({color:1382171}));o.rotation.x=-Math.PI/2,o.position.set(-.9,.01,0),t.add(r,o);let a=new ue({color:2830133,roughness:.55,metalness:.55}),l=.14,c=(he,pe,me)=>{let De=new Y(new it(pe-he,l,l),a);De.position.set((he+pe)/2,.22,me),t.add(De)},h=(he,pe,me)=>{let De=new Y(new it(l,l,me-pe),a);De.position.set(he,.12,(pe+me)/2),t.add(De)},d=(he,pe,me,De,vt,le)=>{for(let de of vt)c(he,pe,de);for(let de of le)h(de,me,De)};d(-15,-2.6,-3.7,4.2,[-3.6,-2.1,-.55,1,2.5,4.2],[-14.93,-13.75,-10.8,-9.2,-6.5,-4.2,-2.93]),d(.3,15,-4.2,3.8,[-4.2,-1.8,-.4,1.1,2.9,3.75],[.4,3.8,5.3,7,10,11.4,13.5,14.95]);let u=[],f=(he,pe)=>(u.push({m:he,night:pe}),he),m=TM();m.anisotropy=i;let x=new ue({color:14208467,roughness:.6}),g=f(new ue({map:m,roughness:.5,emissive:16777215,emissiveMap:m,emissiveIntensity:0}),.35),p=new Y(new it(10,.22,1.7),[x,x,g,x,x,x]);p.position.set(-7.36,Go+.07,-2.9),t.add(p);let E=wM();E.anisotropy=i;let S=new ue({color:13648515,roughness:.6}),y=f(new ue({map:E,roughness:.5,emissive:16777215,emissiveMap:E,emissiveIntensity:0}),.45),T=new Y(new it(2.7,.3,2.3),[S,S,y,S,S,S]);T.position.set(11,Go+.1,2.75),t.add(T);let M=ip(e,uu+2*cp,i),v=ip(e,uu,i),_=new Ct(ap,lp),R=new Ze;R.position.set(hc,0,uc);let C=new Qe(6950712),I=new Qe(16734880);for(let he=0;he<Vo;he++){let pe=f(new ue({color:C.clone().lerp(I,he/(Vo-1)),map:M,alphaTest:.5,alphaToCoverage:!0,roughness:.45,emissive:yM,emissiveIntensity:0,side:st}),.4+.45*(he/(Vo-1))),me=new Y(_,pe);me.rotation.x=-Math.PI/2,me.position.y=Go+he*cu,R.add(me)}let P=f(new ue({color:16777215,map:v,alphaTest:.5,alphaToCoverage:!0,roughness:.4,emissive:16777215,emissiveIntensity:0,side:st}),.4),H=new Y(_,P);H.rotation.x=-Math.PI/2,H.position.y=Go+(Vo-1)*cu+.03,R.add(H),t.add(R);let F=(he,pe,me,De)=>new Y(new Ct(pe,me),new Gt({map:he,transparent:!0,blending:os,depthWrite:!1,opacity:De,toneMapped:!1})),k=new Ze,V=sp(e,"rgb(255,50,150)",[[16,1],[46,1],[90,.9]]),W=F(V,dc,fc,.95);W.rotation.x=-Math.PI/2,W.position.set(hc,.05,uc);let j=SM(),Z=F(j,40,22,.5);Z.rotation.x=-Math.PI/2,Z.position.set(-1,.04,.4);let ie=F(j,15,5,.55);ie.rotation.x=-Math.PI/2,ie.position.set(-7.36,.045,-2.9);let se=F(j,6,5.5,.6);se.rotation.x=-Math.PI/2,se.position.set(11,.045,2.75);let we=F(V,dc,fc,.16);we.rotation.x=-Math.PI/2,we.position.set(hc,Go+(Vo-1)*cu+.12,uc),k.add(Z,W,ie,se,we),k.renderOrder=1,t.add(k);let Se=F(sp(e,"rgb(0,0,0)",[[10,1],[22,.6]]),dc,fc,1);Se.material.blending=rs,Se.material.opacity=.55,Se.rotation.x=-Math.PI/2,Se.position.set(hc+.5,.06,uc+.75),t.add(Se);let Ge=[[-7,3.2,.5],[6.5,3.2,0],[-7.4,2.4,-3.2],[11,2.4,2.8]].map(([he,pe,me])=>{let De=new Ss(16727446,0,0,1.6);return De.position.set(he,pe,me),t.add(De),De}),Ve={exposure:1,envIntensity:.75,sun:1.15,background:"#a9b5c3"},at={exposure:.9,envIntensity:.1,sun:.08,background:"#090620"},te=he=>{for(let{m:pe,night:me}of u)pe.emissiveIntensity=he?me:0;k.visible=he,Se.visible=!he;for(let pe of Ge)pe.intensity=he?55:0;return he?at:Ve},ae=te(!0);return{object:t,fitSize:12,fitWidth:24.5,clearance:6,pose:{x:58,y:-4},look:ae,autoSway:{amplitudeDeg:20,periodSec:10},setVariant:he=>te(he===1)}}});var pp={};Tn(pp,{footballModel:()=>OM,pebbleNormal:()=>xc});function DM(i,e){let t=Ls(i),n=Math.PI/2,s=Math.abs((e%n+n)%n),o=Math.min(s,n-s)*t;return t-LM*Math.min(1,t/3)*Math.exp(-((o/NM)**2))}function UM(){let t=[],n=[],s=[],r=[],o=new N,a=new N,l=new N,c=new N,h=.001,d=1e-4;for(let m=0;m<=96;m++){let x=-Ri*Math.cos(Math.PI*m/96);for(let g=0;g<=288;g++){let p=wr*g/288;Ps(x,p,0,o),t.push(o.x,o.y,o.z);let E=Math.min(Ri-.002,Math.max(-Ri+.002,x));Ps(E+h,p,0,a).sub(Ps(E-h,p,0,l));let S=a.clone();Ps(E,p+d,0,a).sub(Ps(E,p-d,0,l)),c.crossVectors(a,S),c.lengthSq()<1e-12?c.set(Math.sign(x)||1,0,0):c.normalize(),n.push(c.x,c.y,c.z),s.push(fp(x),1-g/288)}}let u=289;for(let m=0;m<96;m++)for(let x=0;x<288;x++){let g=m*u+x,p=(m+1)*u+x,E=g+1,S=p+1;r.push(g,E,p,p,E,S)}let f=new Et;return f.setAttribute("position",new tt(t,3)),f.setAttribute("normal",new tt(n,3)),f.setAttribute("uv",new tt(s,2)),f.setIndex(r),f}function FM(i){return()=>((i=i*16807%2147483647)-1)/2147483646}function xc(i){let s=FM(11),r=[];for(let m=0;m<16;m++)for(let x=0;x<16;x++)r.push((x+.15+.7*s())*16,(m+.15+.7*s())*16);let o=new Float32Array(256*256),a=16*.7;for(let m=0;m<256;m++)for(let x=0;x<256;x++){let g=Math.floor(x/16),p=Math.floor(m/16),E=1e9;for(let y=-1;y<=1;y++)for(let T=-1;T<=1;T++){let M=(g+T+16)%16,v=(p+y+16)%16,_=r[(v*16+M)*2]+(g+T-M)*16,R=r[(v*16+M)*2+1]+(p+y-v)*16,C=Math.hypot(x+.5-_,m+.5-R);C<E&&(E=C)}let S=Math.max(0,1-E/a);o[m*256+x]=S*S*(3-2*S)}let[l,c]=et(256),h=c.createImageData(256,256),d=5,u=(m,x)=>o[(x+256)%256*256+(m+256)%256];for(let m=0;m<256;m++)for(let x=0;x<256;x++){let g=-(u(x+1,m)-u(x-1,m))*d,p=(u(x,m+1)-u(x,m-1))*d,E=Math.hypot(g,p,1),S=(m*256+x)*4;h.data[S]=(g/E*.5+.5)*255,h.data[S+1]=(p/E*.5+.5)*255,h.data[S+2]=(1/E*.5+.5)*255,h.data[S+3]=255}c.putImageData(h,0,0);let f=new Yt(l);return f.wrapS=f.wrapT=gi,f.repeat.set(8.5,15),f.anisotropy=i,f}function BM(i,e){i.fillStyle=IM,i.fillRect(0,0,Rr,wi),i.strokeStyle="rgba(8,52,56,.5)",i.lineWidth=5;for(let o=0;o<=4;o++)i.beginPath(),i.moveTo(0,o*wi/4),i.lineTo(Rr,o*wi/4),i.stroke();let t=o=>[-wi,0,wi].forEach(o),n=8.7,s=3.6,r=2/2.6;i.strokeStyle="#e0629d",i.lineWidth=6.5,i.lineCap="round",i.setLineDash([15,10]),t(o=>{i.beginPath();for(let a=0;a<=160;a++){let l=a/160*wr,c=Math.cos(l),h=Math.sin(l),d=n*Math.sign(c)*Math.abs(c)**r,u=s*Math.sign(h)*Math.abs(h)**r;i[a?"lineTo":"moveTo"](du(d),dp(u,d)+o)}i.stroke()}),i.setLineDash([]),i.fillStyle="rgba(6,40,44,.78)",t(o=>{for(let a of e)for(let l of[-1,1])i.beginPath(),i.ellipse(du(a),dp(l*1.7,a)+o,.28*(Rr/fu),.5*(wi/(wr*Ls(a))),0,0,wr),i.fill()})}function mc(i,e,t,n,s,r,o=!1){let a=s*(Rr/fu),l=r*(wi/(wr*Ls(t)));i.save(),i.translate(du(t),n/360*wi),o&&i.rotate(Math.PI),i.drawImage(e,-a/2,-l/2,a,l),i.restore()}var Ri,AM,CM,PM,wr,IM,LM,NM,Ls,Is,gc,fu,fp,Ps,Rr,wi,du,dp,OM,pu=qt(()=>{"use strict";sn();An();Ri=14,AM=8.6,CM=2.1,PM=.62,wr=Math.PI*2,IM="#4fb8b0",LM=.11,NM=.3,Ls=i=>AM*Math.pow(Math.max(0,1-Math.pow(Math.abs(i)/Ri,CM)),PM),Is=1200,gc=(()=>{let i=new Float32Array(Is+1);for(let e=1;e<=Is;e++){let t=-Ri+2*Ri*(e-1)/Is,n=-Ri+2*Ri*e/Is;i[e]=i[e-1]+Math.hypot(n-t,Ls(n)-Ls(t))}return i})(),fu=gc[Is],fp=i=>{let e=(i+Ri)/(2*Ri)*Is,t=Math.min(Is-1,Math.max(0,Math.floor(e)));return(gc[t]+(gc[t+1]-gc[t])*(e-t))/fu};Ps=(i,e,t=0,n=new N)=>{let s=DM(i,e)+t;return n.set(i,s*Math.cos(e),s*Math.sin(e))};Rr=1536,wi=2048,du=i=>fp(i)*Rr,dp=(i,e)=>i/Ls(e)/wr*wi;OM=i=>({maxAniso:e})=>{let t=Array.from({length:8},(f,m)=>-7+2*m),[n,s]=et(Rr,wi);BM(s,t);let r=ft(n);r.anisotropy=e;let o=new Y(UM(),new ue({map:r,normalMap:xc(e),normalScale:new fe(.75,.75),roughness:.7,metalness:0})),a=f=>new Promise(m=>{let x=new Image;x.onload=()=>m(x),x.onerror=()=>m(null),x.src=`${i.decals}${f}.webp`});Promise.all(["logo","vi","r","manatees"].map(a)).then(([f,m,x,g])=>{f&&mc(s,f,0,45,9,9),m&&mc(s,m,-8.3,45,3.6,3.6),x&&mc(s,x,7.7,45,3.2,3.2),g&&mc(s,g,0,315,14.5,4.25,!0),r.needsUpdate=!0});let l=new ue({color:15987436,roughness:.62,metalness:0}),c=new Ze,h=(f,m)=>{let x=new Es(new vi(f),18,m,8,!1);c.add(new Y(x,l));for(let g of[f[0],f[f.length-1]])c.add(new Y(new ln(m,10,8),l).translateX(g.x).translateY(g.y).translateZ(g.z))},d=[];for(let f=0;f<=14;f++)d.push(Ps(-7.5+f,0,.1));h(d,.16);for(let f of t){let m=1.5/Ls(f),x=[];for(let g=0;g<=8;g++){let p=g/8*2-1;x.push(Ps(f,p*m,.02+.3*Math.sqrt(Math.max(0,1-p*p))))}h(x,.19)}let u=new Ze;return u.add(o,c),{object:u,fitSize:28,clearance:6,pose:{x:35,y:-10},envIntensity:.6,exposure:.62,look:{sun:.8}}}});var bp={};Tn(bp,{basketballModel:()=>JM});function Mp(i,e,t){let n=Math.abs(Math.asin(mu(e))),s=Math.abs(Math.asin(mu(i))),r=Math.acos(mu(i*gp.x+t*gp.z)),o=Math.abs(r-mp),a=Math.abs(Math.PI-r-mp);return Math.min(n,s,o,a)*Hi}function XM(){let t=Math.PI*2,n=641*321,s=new Float32Array(n*3),r=new Float32Array(n*3),o=new Float32Array(n*2),a=new Float32Array(n*3),l=[],c=new N,h=new N,d=new N,u=new N,f=new N,m=.001,x=0;for(let E=0;E<=320;E++){let S=Math.PI/2-Math.PI*E/320;for(let y=0;y<=640;y++,x++){let T=t*y/640;Wo(T,S,c),s.set([c.x,c.y,c.z],x*3);let M=Math.max(-Math.PI/2+.004,Math.min(Math.PI/2-.004,S));Wo(T+m,M,h).sub(Wo(T-m,M,d)),u.copy(h),Wo(T,M+m,h).sub(Wo(T,M-m,d)),f.crossVectors(u,h),f.lengthSq()<1e-14&&f.copy(c),f.normalize(),r.set([f.x,f.y,f.z],x*3),o[x*2]=y/640,o[x*2+1]=1-E/320;let v=Math.exp(-((Mp(c.x/Hi,c.y/Hi,c.z/Hi)/kM)**2)),_=1-.94*Math.min(1,v*1.15);a.set([_,_,_],x*3)}}let g=641;for(let E=0;E<320;E++)for(let S=0;S<640;S++){let y=E*g+S,T=(E+1)*g+S;l.push(y,T,y+1,T,T+1,y+1)}let p=new Et;return p.setAttribute("position",new Dt(s,3)),p.setAttribute("normal",new Dt(r,3)),p.setAttribute("uv",new Dt(o,2)),p.setAttribute("color",new Dt(a,3)),p.setIndex(l),p}function xp(i,e,t,n,s=0){let r=new N(...n).normalize(),o=new N(0,1,0).addScaledVector(r,-r.y).normalize(),a=new N().crossVectors(o,r),l=s*Math.PI/180,c=Math.cos(l),h=Math.sin(l),d=a.clone().multiplyScalar(c).addScaledVector(o,h),u=o.clone().multiplyScalar(c).addScaledVector(a,-h),f=Math.cos(Math.min(Math.PI/2,Math.hypot(e,t)/2/Hi*1.2));return{img:i.getContext("2d").getImageData(0,0,i.width,i.height),wCm:e,hCm:t,ppc:i.width/e,qMin:f,c:r,t:d,b:u}}function qM(i,e,t,n,s){let r=e*i.c.x+t*i.c.y+n*i.c.z;if(r<.3)return!1;let o=(e*i.t.x+t*i.t.y+n*i.t.z)/r*Hi,a=(e*i.b.x+t*i.b.y+n*i.b.z)/r*Hi,l=(o+i.wCm/2)*i.ppc-.5,c=(i.hCm/2-a)*i.ppc-.5,h=i.img.width,d=i.img.height;if(l<-1||c<-1||l>h||c>d)return!1;let u=Math.floor(l),f=Math.floor(c),m=l-u,x=c-f,g=0,p=0,E=0,S=0;for(let y=0;y<2;y++)for(let T=0;T<2;T++){let M=u+T,v=f+y;if(M<0||v<0||M>=h||v>=d)continue;let _=(T?m:1-m)*(y?x:1-x),R=(v*h+M)*4,C=i.img.data[R+3]/255*_;g+=i.img.data[R]*C,p+=i.img.data[R+1]*C,E+=i.img.data[R+2]*C,S+=C}return S<1e-4?!1:(s[0]=g/S,s[1]=p/S,s[2]=E/S,s[3]=S,!0)}function _p(i,e,t,n){let[s,r]=et(i,e),o=r.createImageData(i,e),a=[0,0,0,0],l=[0,0,0],c=o.data,h=new Float32Array(i*2),d=new Float32Array(i*2);for(let m=0;m<i*2;m++){let x=(m+.5)/(i*2)*Math.PI*2;h[m]=Math.sin(x),d[m]=Math.cos(x)}let u=n??[0,0,0],f=(m,x,g,p)=>{let E=u[0],S=u[1],y=u[2];for(let T of t){if(!qM(T,m,x,g,a))continue;let M=a[3];n?(E+=(a[0]-E)*M,S+=(a[1]-S)*M,y+=(a[2]-y)*M):(E=a[0]*M,S=a[1]*M,y=a[2]*M)}p[0]+=E,p[1]+=S,p[2]+=y};for(let m=0;m<e;m++){let x=Math.PI/2-(m+.5)/e*Math.PI,g=Math.cos(x),p=Math.sin(x);for(let E=0;E<i;E++){let S=(m*i+E)*4;c[S+3]=255;let y=g*h[E*2],T=g*d[E*2],M=!1;for(let v of t)if(y*v.c.x+p*v.c.y+T*v.c.z>=v.qMin){M=!0;break}if(!M){c[S]=u[0],c[S+1]=u[1],c[S+2]=u[2];continue}l[0]=l[1]=l[2]=0;for(let v=0;v<2;v++)for(let _=0;_<2;_++){let R=Math.PI/2-(m+(v+.5)/2)/e*Math.PI,C=Math.cos(R);f(C*h[E*2+_],Math.sin(R),C*d[E*2+_],l)}c[S]=l[0]/4,c[S+1]=l[1]/4,c[S+2]=l[2]/4}}return r.putImageData(o,0,0),s}function YM(i,e,t){let[n,s]=et(Math.round(i*t),Math.round(e*t)),r=n.width,o=n.height,a=r*.86,l=o*.78,{f:c,words:h}=Tr(a,l),d=(u,f,m)=>{s.font=`${c}px ${Cs}`,s.textBaseline="alphabetic",s.textAlign="left",s.lineJoin="round",s.lineCap="round",s.fillStyle=s.strokeStyle=u,s.lineWidth=f,s.shadowColor="rgba(255,47,143,.75)",s.shadowBlur=m;for(let x of h){let g=r/2+x.x,p=o/2+x.y;s.fillText(x.text,g,p),f>0&&s.strokeText(x.text,g,p)}};return d(yp,c*.14,c*.16),d(vp,c*.035,0),n}function ZM(i,e){let t=Math.round(i*e),[n,s]=et(t),r=t/270,o=(a,l,c)=>{s.strokeStyle=s.fillStyle=a,s.shadowColor="rgba(255,47,143,.75)",s.shadowBlur=c,s.lineCap="round",s.lineJoin="round";let h=(d,u,f,m)=>{s.lineWidth=7*f*r+l,s.beginPath(),s.moveTo(d*r,u*r),s.quadraticCurveTo((d+m*10*f)*r,(u-40*f)*r,(d+m*4*f)*r,(u-78*f)*r),s.stroke();let x=d+m*4*f,g=u-78*f;s.lineWidth=5*f*r+l;for(let p of[-160,-125,-90,-55,-20]){let E=p*Math.PI/180,S=x+Math.cos(E)*38*f,y=g+Math.sin(E)*30*f+14*f;s.beginPath(),s.moveTo(x*r,g*r),s.quadraticCurveTo((x+Math.cos(E)*26*f)*r,(g+Math.sin(E)*34*f-8*f)*r,S*r,y*r),s.stroke()}};h(44,226,.85,1),h(228,226,.75,-1),s.save(),s.translate(135*r,178*r),s.transform(1,0,-.18,1,0,0),s.font=`900 ${112*r}px 'Arial Black','Segoe UI Black','Helvetica Neue',Impact,sans-serif`,s.textAlign="center",s.textBaseline="alphabetic",s.lineWidth=l,s.fillText("VI",0,0),l>0&&s.strokeText("VI",0,0),s.restore()};return o(yp,6*r,14*r),o(vp,0,0),n}var Hi,mp,gp,HM,zM,kM,GM,yp,vp,mu,VM,WM,Wo,JM,Ep=qt(()=>{"use strict";sn();An();pc();pu();Hi=12.1,mp=52*Math.PI/180,gp=new N(-.94,0,.34).normalize(),HM=.15,zM=.24,kM=.2,GM=[226,102,36],yp="#ff2f8f",vp="#ff7fbf",mu=i=>Math.max(-1,Math.min(1,i));VM=(i,e,t)=>Hi-HM*Math.exp(-((Mp(i,e,t)/zM)**2)),WM=(i,e,t=new N)=>t.set(Math.cos(e)*Math.sin(i),Math.sin(e),Math.cos(e)*Math.cos(i)),Wo=(i,e,t=new N)=>(WM(i,e,t),t.multiplyScalar(VM(t.x,t.y,t.z)));JM=()=>({maxAniso:i})=>{let e=[.4635,.4848,.7417],t=[-.4635,.4848,-.7417],n=[xp(YM(10.8,4.8,70),10.8,4.8,e,9),xp(ZM(6.4,110),6.4,6.4,t)],s=ft(_p(2048,1024,n,GM));s.anisotropy=i;let r=ft(_p(1024,512,n,null));r.anisotropy=i;let o=new ue({map:s,emissiveMap:r,emissive:16777215,emissiveIntensity:.3,vertexColors:!0,roughness:.75,metalness:0}),a=xc(i),l={value:new ct};o.onBeforeCompile=f=>{f.uniforms.pebMap={value:a},f.uniforms.pebNM=l,f.uniforms.pebK={value:1/(16*.19)},f.uniforms.pebAmp={value:.55},f.vertexShader=f.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vOP; varying vec3 vON;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vOP = position; vON = normal;`),f.fragmentShader=f.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vOP; varying vec3 vON;
uniform sampler2D pebMap; uniform mat3 pebNM; uniform float pebK; uniform float pebAmp;`).replace("#include <normal_fragment_maps>",`
        vec3 wn = normalize(vON);
        vec3 bw = pow(abs(wn), vec3(4.0)); bw /= (bw.x + bw.y + bw.z);
        vec2 tx = texture2D(pebMap, vOP.zy * pebK).xy * 2.0 - 1.0;
        vec2 ty = texture2D(pebMap, vOP.xz * pebK).xy * 2.0 - 1.0;
        vec2 tz = texture2D(pebMap, vOP.xy * pebK).xy * 2.0 - 1.0;
        vec3 pn = normalize(wn + pebAmp * (bw.x * vec3(0.0, tx.y, tx.x) + bw.y * vec3(ty.x, 0.0, ty.y) + bw.z * vec3(tz.x, tz.y, 0.0)));
        normal = normalize(pebNM * pn);`)};let c=o.dispose.bind(o);o.dispose=()=>{a.dispose(),c()};let h=new Y(XM(),o),d=new At;h.onBeforeRender=(f,m,x)=>{l.value.getNormalMatrix(d.multiplyMatrices(x.matrixWorldInverse,h.matrixWorld))};let u=new Ze;return u.add(h),{object:u,fitSize:Hi*2,clearance:6,pose:{x:29,y:-32},envIntensity:.75,exposure:.8,look:{sun:.85}}}});function Ai(i,e,t,n,s,r=1){i.lineCap="round",i.lineWidth=n*.06*r,i.beginPath(),i.moveTo(e,t),i.quadraticCurveTo(e+s*n*.14,t-n*.5,e+s*n*.05,t-n),i.stroke();let o=e+s*n*.05,a=t-n;i.lineWidth=n*.05*r;for(let l of[-170,-140,-112,-90,-68,-40,-10]){let c=KM(l),h=o+Math.cos(c)*n*.46,d=a+Math.sin(c)*n*.3+n*.18;i.beginPath(),i.moveTo(o,a),i.quadraticCurveTo(o+Math.cos(c)*n*.3,a+Math.sin(c)*n*.38-n*.06,h,d),i.stroke()}}function _c(i,e,t){let{f:n,words:s}=Tr(e,t);i.font=`${n}px ${Cs}`,i.textBaseline="alphabetic",i.textAlign="left",i.lineJoin="round",i.lineCap="round",i.miterLimit=2;for(let[r,o]of[[$M,.17],["#fff",.035]]){i.strokeStyle=i.fillStyle=r,i.lineWidth=n*o;for(let a of s)i.strokeText(a.text,a.x,a.y),i.fillText(a.text,a.x,a.y)}}function us(i){let s=(a,l)=>[a-4+(5.6-l)*.2,l-2.8],r=[[[0,0],[1.95,0],[3.2,3.6],[4.45,0],[6.4,0],[4.3,5.6],[2.1,5.6]],[[6.85,0],[8.15,0],[8.15,5.6],[6.85,5.6]]],o=()=>{i.beginPath();for(let a of r)a.forEach(([l,c],h)=>{let[d,u]=s(l,c);h?i.lineTo(d,u):i.moveTo(d,u)}),i.closePath()};i.lineJoin="round",o(),i.fillStyle="#22222c",i.fill(),i.save(),o(),i.clip(),i.strokeStyle="rgba(206,210,222,.8)";for(let[a,l]of[[1.6,5.4],[4.4,6.2],[7.5,5]]){let[c,h]=s(a,5.8);Ai(i,c,h,l,a>4?-1:1,1.9)}i.restore(),o(),i.strokeStyle="#e9ebf1",i.lineWidth=.16,i.stroke()}var $M,KM,Xo=qt(()=>{"use strict";pc();$M="#ff2f8f",KM=i=>i*Math.PI/180});var wp={};Tn(wp,{blimpModel:()=>a1});function t1(){let n=new Float32Array(26499),s=new Float32Array(8833*3),r=new Float32Array(8833*2),o=[],a=0;for(let h=0;h<=120;h++){let d=-hn/2+hn*(1-Math.cos(Math.PI*h/120))/2,u=Kn(d),f=.001*hn,m=(Kn(Math.min(d+f,hn/2))-Kn(Math.max(d-f,-hn/2)))/(Math.min(d+f,hn/2)-Math.max(d-f,-hn/2));for(let x=0;x<=72;x++,a++){let g=2*Math.PI*x/72,p=-Math.cos(g),E=Math.sin(g);n.set([d,u*p,u*E],a*3);let S=Math.hypot(m,1);s.set([-m/S,p/S,E/S],a*3),r[a*2]=(d+hn/2)/hn,r[a*2+1]=x/72}}let l=73;for(let h=0;h<120;h++)for(let d=0;d<72;d++){let u=h*l+d,f=(h+1)*l+d;o.push(u,f,u+1,f,f+1,u+1)}let c=new Et;return c.setAttribute("position",new Dt(n,3)),c.setAttribute("normal",new Dt(s,3)),c.setAttribute("uv",new Dt(r,2)),c.setIndex(o),c}function n1(i){i.save(),i.scale(1.7/100,1.7/100),i.fillStyle=i.strokeStyle="#f4f4f6",i.font=`900 100px ${gu}`,i.textBaseline="middle",i.textAlign="left";let t=4,n=88,s=l=>[...l].reduce((c,h)=>c+i.measureText(h).width+t,0),r=(l,c)=>{let h=c;for(let d of l)i.fillText(d,h,0),h+=i.measureText(d).width+t;return h},o=-(s("GOOD")+n+s("YEAR"))/2,a=r("GOOD",o);i.lineCap="round",i.lineWidth=8;for(let l=0;l<3;l++)i.beginPath(),i.moveTo(a+12+l*21,40),i.lineTo(a+30+l*21,-22-l*16),i.stroke();r("YEAR",a+n),i.restore()}function i1(i){let[e,t]=et(qo,ds),n=c=>(c+hn/2)*Ar,s=Ns*Ar;t.fillStyle="#aeb2b9",t.fillRect(0,0,qo,ds);let r=Yo(-40),o=Yo(72);t.fillStyle="#15151b",t.fillRect(0,ds*.75-o*s,qo,(o-r)*s),t.fillRect(0,ds*.25+r*s,qo,(o-r)*s),t.strokeStyle="rgba(255,255,255,.045)",t.lineWidth=1.5;for(let c=-hn/2+6;c<hn/2;c+=6)t.beginPath(),t.moveTo(n(c),0),t.lineTo(n(c),ds),t.stroke();for(let c=0;c<12;c++){let h=c/12*ds;t.beginPath(),t.moveTo(0,h),t.lineTo(qo,h),t.stroke()}let a=(c,h,d,u,f)=>{let m=c>0?ds*.75-Yo(d)*s:ds*.25+Yo(d)*s;t.save(),t.translate(n(h),m),c<0&&t.rotate(Math.PI),t.scale(Ar,Ar*u),f(),t.restore()};for(let c of[1,-1])a(c,0,16,1,()=>{t.strokeStyle="rgba(86,90,112,.26)",Ai(t,-15,5.6,9,1),Ai(t,13,5.8,8,-1),Ai(t,-4,6.2,7,1)}),a(c,-21,12,Ns/Kn(-21),()=>{t.strokeStyle="rgba(86,90,112,.22)",Ai(t,0,3.2,5.5,-1)}),a(c,1.5,17,1.06,()=>_c(t,27,11)),a(c,29,14,Ns/Kn(29),()=>us(t)),a(c,-26,-12,Ns/Kn(-26),()=>n1(t));let l=ft(e);return l.anisotropy=i,l}function s1(i){let[e,t]=et(512,200);t.textAlign="center",t.textBaseline="middle",t.fillStyle="#17317f",t.font=`900 italic 112px ${gu}`,t.fillText("N3A",256,86),t.font=`800 italic 30px ${gu}`,t.fillText("WINGFOOT THREE",256,164);let n=ft(e);return n.anisotropy=i,n}function r1(i){let[n,s]=et(1040,190),r=7,o=14,a=(980-o*(r-1))/r;for(let c=0;c<r;c++){let h=30+c*(a+o),d=s.createLinearGradient(0,24,0,120);d.addColorStop(0,"#223747"),d.addColorStop(.55,"#0c1a26"),d.addColorStop(1,"#050b12"),s.fillStyle=d,s.beginPath(),s.roundRect(h,24,a,96,12),s.fill()}s.fillStyle=e1,s.fillRect(0,136,1040,24);let l=ft(n);return l.anisotropy=i,l}function o1(){let t=new Ot;t.moveTo(-35.5,Kn(-35.5)-.4);for(let s=-35.5+3;s<-16;s+=3)t.lineTo(s,Kn(s)-.4);t.lineTo(-16,Kn(-16)-.4),t.lineTo(-24,8.2),t.lineTo(-33.5,7),t.closePath();let n=new Zt(t,{depth:.34,bevelEnabled:!0,bevelThickness:.08,bevelSize:.08,bevelSegments:2,curveSegments:4});return n.translate(0,0,-.17),n}function Tp(i,e){let t=new Ze,n=new it(.07,i,i*.2);n.translate(0,i/2+i*.1,0);let s=new ue({color:1776672,roughness:.5,metalness:.2});for(let a=0;a<3;a++){let l=new Y(n,s);l.rotation.x=a*2*Math.PI/3,l.rotation.y=.35,t.add(l)}let r=new Y(new ln(i*.14,12,8),new ue({color:9212054,roughness:.4,metalness:.5}));t.add(r);let o=new Y(new On(i*1.08,28).rotateY(Math.PI/2),new Gt({color:16777215,transparent:!0,opacity:e,depthWrite:!1,side:st}));return t.add(o),t}var hn,Ns,Zo,jM,QM,Sp,Ar,qo,ds,e1,gu,Yo,Kn,a1,Rp=qt(()=>{"use strict";sn();Oi();An();Xo();hn=75,Ns=7.1,Zo=6,jM=hn/2-Zo,QM=hn/2+Zo,Sp=1.85,Ar=36,qo=Math.round(hn*Ar),ds=Math.round(2*Math.PI*Ns*Ar),e1="#ff2f8f",gu="'Arial Black','Segoe UI Black','Helvetica Neue',Impact,sans-serif",Yo=i=>i*Math.PI/180,Kn=i=>{if(i>=Zo){let t=(i-Zo)/jM;return t>=1?0:Ns*Math.sqrt(1-t*t)}let e=(Zo-i)/QM;return e>=1?0:Ns*Math.pow(1-Math.pow(e,Sp),1/Sp)};a1=()=>({maxAniso:i})=>{let e=new Ze,t=[],n=new Y(t1(),new yt({map:i1(i),roughness:.5,metalness:.04,clearcoat:.45,clearcoatRoughness:.4}));e.add(n);let s=new ue({color:1842466,roughness:.5,metalness:.2}),r=new Y(new Qi(.7,1.4,16).rotateZ(-Math.PI/2),s);r.position.set(hn/2+.45,0,0);let o=new Y(new Qi(.75,1.8,16).rotateZ(Math.PI/2),s);o.position.set(-hn/2-.55,0,0),e.add(r,o);let a=Tp(.9,.1);a.position.set(-hn/2-1.6,0,0),e.add(a),t.push(a);let l=new ue({color:13736960,roughness:.55,metalness:0}),c=o1(),h=s1(i),d=new Gt({map:h,transparent:!0,toneMapped:!0,depthWrite:!1});for(let C of[0,2*Math.PI/3,-(2*Math.PI)/3]){let I=new Ze;if(I.rotation.x=C,I.add(new Y(c,l)),C===0)for(let P of[1,-1]){let H=new Y(new Ct(7,2.8),d);H.position.set(-28.5,6.5,P*.27),P<0&&(H.rotation.y=Math.PI),I.add(H)}e.add(I)}let u=16,f=-7.4,m=new ue({color:14474978,roughness:.32,metalness:.12}),x=new Ze;x.position.set(u,f,0),x.add(new Y(new Fe(11.5,2.8,2.6,3,.45),m));let g=r1(i),p=new ue({map:g,transparent:!0,roughness:.2,metalness:.3,depthWrite:!1});for(let C of[1,-1]){let I=new Y(new Ct(10.4,1.9),p);I.position.set(0,0,C*1.31),C<0&&(I.rotation.y=Math.PI),x.add(I)}let E=new ue({color:661282,roughness:.12,metalness:.5}),S=new Y(new Ct(1.7,1),E);S.position.set(5.76,.28,0),S.rotation.y=Math.PI/2,x.add(S);let y=new Y(new dt(.09,.09,1.1,8),s);y.position.set(.5,-1.95,0);let T=new Y(new dt(.34,.34,.22,16).rotateX(Math.PI/2),s);T.position.set(.5,-2.5,0),x.add(y,T),e.add(x);let M=Yo(-22),v=6,_=new ue({color:13225169,roughness:.35,metalness:.3});for(let C of[1,-1]){let I=new Ze;I.position.set(v,0,0),I.rotation.x=C*(Math.PI/2-M);let P=new Y(new it(.9,1.9,.22),_);P.position.set(0,Kn(v)+.55,0);let H=new Y(new ro(.62,2.4,6,14).rotateZ(Math.PI/2),_);H.position.set(0,Kn(v)+1.75,0);let F=Tp(1.45,.11);F.position.set(-2.3,Kn(v)+1.75,0),I.add(P,H,F),e.add(I),t.push(F)}let R=[7,7.4,6.6];return{object:e,fitSize:72,clearance:2,pose:{x:4,y:18},envIntensity:1,exposure:1,look:{sun:1.15},tick:C=>t.forEach((I,P)=>{I.rotation.x+=R[P]*C})}}});var Ip={};Tn(Ip,{trailerModel:()=>d1});function Mu(){let i=new Ot;return i.moveTo(.18,0),i.lineTo(Qt-.1,0),i.quadraticCurveTo(Qt,0,Qt,.1),i.lineTo(Qt,rn-.12),i.quadraticCurveTo(Qt,rn,Qt-.12,rn),i.lineTo(.78,rn),i.bezierCurveTo(.3,rn,0,rn-.35,0,rn-.95),i.lineTo(0,.12),i.quadraticCurveTo(0,0,.18,0),i}function c1(i,e){i.fillStyle=i.strokeStyle="#f1f2f6",i.lineCap="round",i.lineJoin="round";let t=[[-1,-.2,-2.6,-1.9,-1.3,-.95],[-.62,-.78,-1.5,-2.4,-.55,-1.15],[-.15,-1,.1,-2.1,.35,-1.12]];for(let[n,s,r,o,a,l]of t)i.beginPath(),i.moveTo(n*e,s*e),i.quadraticCurveTo(a*e,l*e,r*e,o*e),i.quadraticCurveTo(a*e*.55+.18*e,l*e*.55-.1*e,(n+.42)*e,(s-.35)*e),i.closePath(),i.fill();i.lineWidth=e*.2,i.beginPath(),i.arc(0,0,e,0,Math.PI*2),i.stroke(),i.save(),i.beginPath(),i.arc(0,0,e,0,Math.PI*2),i.clip(),i.lineWidth=e*.13,i.beginPath(),i.moveTo(-e,0),i.lineTo(e,0),i.moveTo(0,-e),i.lineTo(0,e),i.stroke(),i.beginPath(),i.arc(-e*1.55,0,e*1.15,-.85,.85),i.stroke(),i.beginPath(),i.arc(e*1.55,0,e*1.15,Math.PI-.85,Math.PI+.85),i.stroke(),i.restore()}function Cp(i,e){let[t,n]=et(Ap,xu),s=p=>i?Qt-p:p,r=n.createLinearGradient(0,0,0,xu);r.addColorStop(0,"#16161c"),r.addColorStop(1,"#0d0d12"),n.fillStyle=r,n.fillRect(0,0,Ap,xu),n.save(),n.scale(vc,vc),n.strokeStyle="rgba(92,96,122,.17)";for(let[p,E,S,y]of[[1,rn+.1,2.2,1],[2.7,rn+.2,1.7,-1],[4.3,rn+.15,2.3,1],[6.1,rn+.1,1.9,-1],[7,rn+.25,1.6,1]])Ai(n,s(p),E,S,i?-y:y,1.2);let o=i?Qt-1.93:.78,a=1.15,l=.2,c=rn-.42;n.fillStyle="#1a1a21",n.fillRect(o,l,a,c),n.strokeStyle="#c3c7cf",n.lineWidth=.05,n.strokeRect(o,l,a,c),n.fillStyle="#9ea2ab";let h=i?o+a-.04:o-.01;for(let p of[.4,1,1.6])n.fillRect(h,l+p,.05,.16);let d=i?o+.06:o+a-.12;n.fillStyle="#0a0a0e",n.fillRect(d,l+c*.5,.07,.34),n.strokeStyle="#8c9099",n.lineWidth=.02,n.strokeRect(d,l+c*.5,.07,.34);let u=o+a/2;n.save(),n.translate(u,l+.62),n.scale(.07,.07),us(n),n.restore(),n.save(),n.translate(u+.06,l+1.28),c1(n,.17),n.restore();let f=s(4.55),m=1.2;n.save(),n.translate(f,m),_c(n,4.4,1.75),n.restore();let x=()=>{n.beginPath(),n.moveTo(f-2,m+1.02),n.quadraticCurveTo(f+.3,m+.78,f+2.15,m+.62)};n.lineCap="round",n.strokeStyle=l1,n.lineWidth=.2,x(),n.stroke(),n.strokeStyle="#fff",n.lineWidth=.075,x(),n.stroke(),n.restore();let g=ft(t);return g.anisotropy=e,g}function h1(i){let e=new Mi(Mu(),12),t=e.getAttribute("position"),n=e.getAttribute("uv");for(let s=0;s<t.count;s++){let r=t.getX(s)/Qt;n.setXY(s,i?1-r:r,t.getY(s)/rn)}return e}function u1(i){let e=vu/2+Pr+.1,t=Pr+.1,n=.04,s=.3,r=e+n,o=t+n,a=s+n,l=-.17,c=new Ot;c.moveTo(-r,l),c.lineTo(-r,o-a),c.quadraticCurveTo(-r,o,-r+a,o),c.lineTo(r-a,o),c.quadraticCurveTo(r,o,r,o-a),c.lineTo(r,l),c.lineTo(e,l),c.lineTo(e,t-s),c.quadraticCurveTo(e,t,e-s,t),c.lineTo(-e+s,t),c.quadraticCurveTo(-e,t,-e,t-s),c.lineTo(-e,l),c.closePath();let h=new Zt(c,{depth:i,bevelEnabled:!1,curveSegments:8});return h.translate(0,0,-i/2),h}var Qt,rn,yu,Pp,yc,Cr,vc,Ap,xu,l1,Pr,_u,vu,d1,Lp=qt(()=>{"use strict";sn();Oi();An();Xo();Qt=7.3,rn=2.45,yu=2.28,Pp=.06,yc=yu/2+Pp,Cr=.5,vc=320,Ap=Math.round(Qt*vc),xu=Math.round(rn*vc),l1="#ff2f8f",Pr=.37,_u=.66*Qt,vu=.95;d1=()=>({maxAniso:i})=>{let e=new Ze,t=new yt({color:1315866,roughness:.42,metalness:.1,clearcoat:.5,clearcoatRoughness:.35}),n=new ue({color:13620186,roughness:.22,metalness:.95}),s=new ue({color:1710880,roughness:.6,metalness:.4}),r=new ue({color:1381658,roughness:.85,metalness:0}),o=new ue({color:14804202,roughness:.35,metalness:.6}),a=new Ze;a.position.y=Cr;let l=new Y(new Zt(Mu(),{depth:yu,bevelEnabled:!0,bevelThickness:Pp,bevelSize:.05,bevelSegments:3,curveSegments:48}),t);l.geometry.translate(0,0,-yu/2),a.add(l);let c=new Y(new Fe(Qt-.8,.07,2*yc+.1,2,.03),new ue({color:14343651,roughness:.4,metalness:.5}));c.position.set(.8+(Qt-.8)/2,rn+.005,0),a.add(c);let h=Mu().getSpacedPoints(180).map(H=>new N(H.x,H.y,0)),d=new Es(new vi(h,!0,"centripetal"),400,.035,8,!0),u=yc+.012;for(let H of[1,-1]){let F=new Y(d,n);F.position.z=H*u,a.add(F);let k=new Y(new it(Qt-.3,.17,.09),n);k.position.set(Qt/2,.06,H*(u+.01)),a.add(k);for(let[V,W]of[[Qt,.1],[Qt,rn-.1],[.1,.1]]){let j=new Y(new Fe(.2,.2,.2,2,.07),n);j.position.set(V,W,H*(yc-.02)),a.add(j)}}let f=[Cp(!1,i),Cp(!0,i)],m=(H,F)=>{let k=new Y(h1(F<0),H);return k.position.z=F*(yc+.004),k},x=H=>new yt({map:H,roughness:.4,metalness:.08,clearcoat:.55,clearcoatRoughness:.35,side:st});a.add(m(x(f[0]),1),m(x(f[1]),-1));let g=new ue({color:12567756,roughness:.3,metalness:.9}),p=(H,F,k)=>new N(H,F,k),E=p(.22,rn-.28,0),S=p(.04,rn+.78,0);for(let H of[-.55,.55])a.add(cn(p(E.x,E.y,H),p(S.x,S.y,H),.024,g));for(let H of[0,.36,.7,1]){let F=E.clone().lerp(S,H);a.add(cn(p(F.x,F.y,-.55),p(F.x,F.y,.55),.02,g))}e.add(a);let y=new Y(new it(Qt-.5,.1,1.7),s);y.position.set(Qt/2+.1,Cr-.06,0),e.add(y);let T=p(-1.55,Cr-.06,0);for(let H of[-.6,.6])e.add(cn(p(.3,Cr-.06,H),T,.045,s));let M=new Y(new Fe(.34,.15,.22,2,.05),s);M.position.set(T.x-.1,T.y,0);let v=new Y(new ln(.08,12,8),n);v.position.set(T.x-.12,T.y+.1,0);let _=new Y(new dt(.035,.035,.5,8),n);_.position.set(-1.05,Cr-.31,0);let R=new Y(new it(.2,.03,.14),s);R.position.set(-1.05,.06,0),e.add(M,v,_,R);let C=1.46;for(let H of[_u-vu/2,_u+vu/2]){let F=new Y(new dt(.045,.045,2*C,10).rotateX(Math.PI/2),s);F.position.set(H,Pr,0),e.add(F);for(let k of[1,-1]){let V=ac(Pr,.24,r,o,s);V.position.set(H,Pr,k*C),e.add(V)}}let I=u1(.32);for(let H of[1,-1]){let F=new Y(I,n);F.position.set(_u,Pr,H*(C+.01)),e.add(F)}let P=new ue({color:9047826,emissive:12588056,emissiveIntensity:.6,roughness:.3});for(let H of[1,-1]){let F=new Y(new it(.05,.34,.14),P);F.position.set(Qt+.045,Cr+.5,H*1.05),e.add(F)}return{object:e,fitSize:8.2,pose:{x:9,y:28},envIntensity:1,exposure:1,look:{sun:1.1}}}});var Dp={};Tn(Dp,{biplaneModel:()=>b1});function _1(){let[e,t]=et(128),n=7,s=()=>(n=n*16807%2147483647)/2147483647;for(let o=0;o<9;o++){let a=s()*Math.PI*2,l=s()*128*.2,c=128*(.18+s()*.12),h=128/2+Math.cos(a)*l,d=128/2+Math.sin(a)*l,u=t.createRadialGradient(h,d,0,h,d,c);u.addColorStop(0,"rgba(255,255,255,.55)"),u.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=u,t.fillRect(0,0,128,128)}t.globalCompositeOperation="destination-in";let r=t.createRadialGradient(128/2,128/2,128*.1,128/2,128/2,128/2);return r.addColorStop(0,"#fff"),r.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=r,t.fillRect(0,0,128,128),new Yt(e)}function y1(){let i=new Ct(1,1),e=new Ki(new Float32Array(Ir),1).setUsage(Ql),t=new Float32Array(Ir);i.setAttribute("aAlpha",e),i.setAttribute("aSeed",new Ki(t,1));let n=new Rn({uniforms:{uMap:{value:_1()}},transparent:!0,depthWrite:!1,vertexShader:`
      attribute float aAlpha; attribute float aSeed;
      varying vec2 vUv; varying float vA; varying float vS;
      void main() {
        vUv = uv; vA = aAlpha; vS = aSeed;
        vec4 mv = modelViewMatrix * instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        mv.xy += position.xy * length(instanceMatrix[0].xyz);
        gl_Position = projectionMatrix * mv;
      }`,fragmentShader:`
      uniform sampler2D uMap;
      varying vec2 vUv; varying float vA; varying float vS;
      void main() {
        vec2 c = vUv - 0.5; float s = sin(vS * 6.2832), k = cos(vS * 6.2832);
        float a = texture2D(uMap, vec2(k * c.x - s * c.y, s * c.x + k * c.y) + 0.5).a * vA;
        if (a < 0.004) discard;
        gl_FragColor = vec4(mix(vec3(0.80, 0.05, 0.30), vec3(0.97, 0.22, 0.52), vS), a);
      }`}),s=new vs(i,n,Ir);s.instanceMatrix.setUsage(Ql),s.frustumCulled=!1,s.renderOrder=1,s.boundingBox=new en(un(Mc.x-Np*.55,-1.5,-2.5),un(Mc.x,2.8,2.5));let r=11,o=()=>(r=r*16807%2147483647)/2147483647,a=Array.from({length:Ir},()=>({oy:o()*2-1,oz:o()*2-1,ph:o()*6.283,ph2:o()*6.283,sm:.75+o()*.5}));a.forEach((h,d)=>{t[d]=h.ph/6.283});let l=s.instanceMatrix.array,c=h=>{for(let d=0;d<Ir;d++){let u=a[d],f=(h/x1+d/Ir)%1,m=.2+f*1.6,x=(.8+f*3)*u.sm,g=Mc.x-f*Np,p=Mc.y+f*1.5+Math.sin(f*6+u.ph)*.3*f+u.oy*m*.8,E=u.oz*m+Math.sin(f*5+u.ph2)*.4*f;l.set([x,0,0,0,0,x,0,0,0,0,x,0,g,p,E,1],d*16),e.array[d]=.95*Ut.smoothstep(f,0,.05)*(1-Ut.smoothstep(f,.5,1))}s.instanceMatrix.needsUpdate=!0,e.needsUpdate=!0};return c(0),{mesh:s,update:c}}function v1(){let i=new mo(Lr.map(([e,t])=>new fe(e,t)),28);return i.rotateZ(-Math.PI/2),i.scale(1,1,.85),i}function M1(){let i=new Ze,e=new ue({color:f1,roughness:.55,metalness:.05}),t=new ue({color:p1,roughness:.5,metalness:.1}),n=new ue({color:m1,roughness:.6,metalness:.2}),s=new ue({color:g1,roughness:.35,metalness:.7}),r=new ue({color:2763312,roughness:.6,metalness:.3});i.add(new Y(v1(),e));let o=new Y(new dt(.66,.62,.7,28).rotateZ(-Math.PI/2),s);o.position.set(1.28,0,0),i.add(o);let a=new Y(new zn(.64,.05,8,32).rotateY(Math.PI/2),e);a.position.set(1.62,0,0);let l=new Y(new On(.58,28).rotateY(Math.PI/2),n);l.position.set(1.625,0,0),i.add(a,l);let c=new dt(.075,.075,.2,8).rotateZ(-Math.PI/2);for(let R=0;R<9;R++){let C=R/9*Math.PI*2,I=new Y(c,s);I.position.set(1.7,Math.cos(C)*.4,Math.sin(C)*.4),i.add(I)}let h=new Y(new Qi(.17,.38,14).rotateZ(-Math.PI/2),s);h.position.set(1.94,0,0),i.add(h);let d=new Ze;d.position.set(1.78,0,0),d.add(new Y(new it(.05,2.5,.17),n)),d.add(new Y(new On(1.25,32).rotateY(Math.PI/2),new Gt({color:16777215,transparent:!0,opacity:.09,depthWrite:!1,side:st}))),i.add(d);let u=new ln(1,16,8),f=new ue({color:11194592,roughness:.1,metalness:.2,transparent:!0,opacity:.35,depthWrite:!1});for(let R of[-.95,-1.95]){let C=new Y(u,n);C.scale.set(.34,.07,.2),C.position.set(R,bu(R)-.02,0);let I=new Y(new Ct(.38,.2),f);I.position.set(R+.32,bu(R)+.1,0),I.rotation.order="YXZ",I.rotation.set(-.35,Math.PI/2,0),i.add(C,I)}let m=new Y(new ln(.14,14,10),new ue({color:3877410,roughness:.7}));m.position.set(-1.95,bu(-1.95)+.1,0),i.add(m);let x=new Y(new Fe(1.55,.13,9.8,2,.05),t);x.position.set(.25,1.3,0);let g=new Y(new Fe(1.4,.13,9,2,.05),t);g.position.set(0,-.5,0),i.add(x,g);let p=1.235,E=-.435,S=3.3;for(let R of[1,-1])for(let C of[.65,-.1])i.add(cn(un(C,E,R*S),un(C,p,R*S),.045,t)),i.add(cn(un(C,E,R*.55),un(C,p,R*S),.018,r)),i.add(cn(un(C,E,R*S),un(C,p,R*.95),.018,r)),i.add(cn(un(C,.45,R*.28),un(C,p,R*.95),.04,t));let y=new Y(new Fe(1.15,.07,3.5,2,.03),t);y.position.set(-3.3,.08,0);let T=new Ot;T.moveTo(-3,.05),T.lineTo(-3.3,1.3),T.quadraticCurveTo(-3.55,1.52,-3.8,1.25),T.lineTo(-3.8,.05),T.closePath();let M=new Zt(T,{depth:.07,bevelEnabled:!1});M.translate(0,0,-.035),i.add(y,new Y(M,t));for(let R of[1,-1])i.add(cn(un(-3.5,1.2,0),un(-3.45,.1,R*1.6),.015,r));i.add(cn(un(-3.15,-.12,0),un(-3.35,-.6,0),.04,n)),i.add(new Y(new dt(.11,.11,.07,14).rotateX(Math.PI/2),n).translateX(-3.38).translateY(-.66));let v=new dt(.43,.43,.2,24).rotateX(Math.PI/2),_=new dt(.17,.17,.22,14).rotateX(Math.PI/2);for(let R of[1,-1]){let C=un(.95,-1.6,R*1.05);i.add(cn(un(.8,-.45,R*.3),C,.05,t),cn(un(.1,-.5,R*.5),C,.04,t));let I=new Y(v,n);I.position.copy(C);let P=new Y(_,s);P.position.copy(C),i.add(I,P)}return{plane:i,prop:d}}var f1,p1,m1,g1,un,Ir,x1,Np,Mc,Lr,bu,b1,Up=qt(()=>{"use strict";sn();Oi();An();f1=15130575,p1=5050651,m1=1776159,g1=10132384,un=(i,e,t)=>new N(i,e,t),Ir=110,x1=3.2,Np=12,Mc=un(-3.7,.4,0);Lr=[[.03,-3.75],[.1,-3.6],[.2,-3.1],[.34,-2.2],[.46,-1.2],[.55,-.4],[.58,.3],[.55,.85],[.6,.95]],bu=i=>{for(let e=1;e<Lr.length;e++){let[t,n]=Lr[e],[s,r]=Lr[e-1];if(i<=n)return s+(t-s)*(i-r)/(n-r)}return Lr[Lr.length-1][0]};b1=()=>()=>{let i=new Ze,{plane:e,prop:t}=M1(),n=y1();i.add(e,n.mesh);let s=0;return{object:i,fitSize:16,clearance:2,pose:{x:10,y:-42},envIntensity:1,exposure:1,look:{sun:1.1},tick:r=>{s+=r,t.rotation.x+=38*r,n.update(s),e.rotation.x=.06*Math.sin(s*.7),e.rotation.z=.025*Math.sin(s*.5+1),e.position.y=.08*Math.sin(s*.9)}}}});var kp={};Tn(kp,{busModel:()=>w1});function Su(i,e,t,n,s,r,o,a="left",l=0){i.save(),i.translate(t,n),i.scale(1/100,1/100),i.font=r.replace("{px}",`${s*100}px`),i.textAlign=a,i.textBaseline="alphabetic",i.letterSpacing=`${l*100}px`,i.lineJoin="round",i.fillStyle=o,i.fillText(e,0,0),i.restore()}function E1(i,e,t){i.save(),i.translate(e,t),i.scale(1/100,1/100),i.scale(1.3,1),i.font=`900 ${.42*100}px ${zp}`,i.textBaseline="alphabetic",i.textAlign="left",i.lineJoin="round",i.shadowColor="rgba(120,40,140,.35)",i.shadowBlur=.05*100,i.shadowOffsetY=.02*100,i.fillStyle=i.strokeStyle="#fbf8ff",i.lineWidth=.05*100;let r=[["grand",.34],["theft",.72],["auto",1.1]];for(let[o,a]of r)i.strokeText(o,0,a*100),i.fillText(o,0,a*100);i.restore()}function S1(i){i.fillStyle="#8f93df",i.beginPath(),i.moveTo(.35,0-.18),i.lineTo(3.3+.35,0-.18),i.lineTo(3.3,0),i.lineTo(0,0),i.closePath(),i.fill(),i.fillStyle="#4d52a8",i.fillRect(0,0,3.3,.32),i.fillStyle="#6a70c6",i.fillRect(0,0+.32,3.3,.05),i.fillStyle="#5a5fb8";for(let n of[.4,3.3-.55])i.fillRect(n,0+.37,.07,.7);i.fillStyle="rgba(70,60,150,.35)",i.fillRect(.1,0+.37,3.3-.2,.26),i.fillStyle="#6a63bf",i.fillRect(.9,0+.88,.16,.22),i.fillRect(3.3-1.2,0+.88,.16,.22),i.fillStyle="#f2cf7a",i.fillRect(.9,0+.98,.16,.05),i.fillRect(3.3-1.2,0+.98,.16,.05)}function T1(i,e,t,n){i.strokeStyle="rgba(70,60,150,.55)",i.lineWidth=.03,i.lineCap="round",i.beginPath(),i.moveTo(e,t),i.lineTo(e,n),i.stroke(),i.lineWidth=.022,i.beginPath(),i.moveTo(e-.28,t+.06),i.lineTo(e+.28,t+.06),i.stroke(),i.lineWidth=.012;for(let s of[0,.12])i.beginPath(),i.moveTo(e-1.3,t+.3+s),i.quadraticCurveTo(e-.65,t+.22+s,e-.28,t+.06),i.stroke(),i.beginPath(),i.moveTo(e+.28,t+.06),i.quadraticCurveTo(e+.8,t+.2+s,e+1.4,t+.34+s),i.stroke()}function Op(i,e){let[t,n]=et(Fp,Eu),s=f=>i?Vt-f:f,r=n.createLinearGradient(0,0,0,Eu);r.addColorStop(0,"#7a5fcb"),r.addColorStop(.28,"#a066c8"),r.addColorStop(.52,"#e07eb4"),r.addColorStop(.78,"#f7a384"),r.addColorStop(1,"#f29c58"),n.fillStyle=r,n.fillRect(0,0,Fp,Eu),n.save(),n.scale(fs,fs);let o=n.createLinearGradient(0,1.95,0,Nr);o.addColorStop(0,"rgba(96,88,190,0)"),o.addColorStop(.35,"rgba(96,88,190,.75)"),o.addColorStop(1,"rgba(70,64,160,.95)"),n.fillStyle=o,n.fillRect(0,1.95,Vt,Nr-1.95),n.save(),i&&(n.translate(Vt,0),n.scale(-1,1)),n.save(),n.translate(2.85,.98),S1(n),n.restore(),T1(n,6.55,1.08,2.15),n.strokeStyle="#6459b8";for(let[f,m,x,g]of[[3.25,1.95,.85,1],[7,2.12,.38,-1],[7.6,2.16,.3,1],[5.6,1.8,.4,1],[8.6,2.05,.5,-1]])Ai(n,f,m,x,g,1.25);n.restore(),Su(n,"XERO",s(2.85+1.65),.98+.255,.22,`900 {px} ${zp}`,"rgba(225,230,255,.92)","center",.06),E1(n,i?Vt-1.4-1.5:1.4,.3);let l=s(7.5);n.save(),n.translate(l,1),n.scale(.125,.125),us(n),n.restore(),Su(n,"NOVEMBER 19, 2026",l,1.5,.12,`400 {px} ${Bp}`,"rgba(255,255,255,.93)","center",.03);let c=i?Vt-3.3:2.4;n.fillStyle="#2547c4",n.beginPath(),n.roundRect(c,1.9,.9,.16,.03),n.fill(),Su(n,"PLAYS BEST ON PS5",c+.45,2.015,.065,`700 {px} ${Bp}`,"#fff","center",.008);let h=i?Vt-1.1:.2;n.fillStyle="#1b2033",n.beginPath(),n.roundRect(h,.62,.9,.82,.07),n.fill();let d=n.createLinearGradient(h,.62,h+.9,1.44);d.addColorStop(0,"rgba(160,185,255,.28)"),d.addColorStop(.45,"rgba(160,185,255,0)"),d.addColorStop(1,"rgba(160,185,255,.1)"),n.fillStyle=d,n.beginPath(),n.roundRect(h,.62,.9,.82,.07),n.fill(),n.strokeStyle="#d9dae6",n.lineWidth=.025,n.beginPath(),n.roundRect(h,.62,.9,.82,.07),n.stroke(),n.fillStyle="#14141a";for(let f of Hp)n.beginPath(),n.arc(s(f),Gn-Us,Us+.13,Math.PI,0),n.lineTo(s(f)+Us+.13,Nr+.1),n.lineTo(s(f)-Us-.13,Nr+.1),n.closePath(),n.fill();n.restore();let u=ft(t);return u.anisotropy=e,{c:t,ctx:n,map:u,flip:i,fx:s}}var Vt,hi,Ds,Gn,jn,Nr,Hp,Us,fs,Fp,Eu,zp,Bp,bc,w1,Gp=qt(()=>{"use strict";sn();Oi();An();Xo();Vt=9.6,hi=2.4,Ds=.3,Gn=2.6,jn=1.95,Nr=Gn-Ds,Hp=[1.7,7.4],Us=.5,fs=200,Fp=Math.round(Vt*fs),Eu=Math.round(Nr*fs),zp="'Arial Black','Segoe UI Black','Helvetica Neue',Impact,sans-serif",Bp="'Helvetica Neue',Arial,'Segoe UI',sans-serif",bc={cx:5,top:-.05,h:2.9};w1=i=>({maxAniso:e})=>{let t=new Ze,n=(V,W,j)=>new N(V,W,j),s=new ue({color:10842042,roughness:.5,metalness:.1}),r=new ue({color:1710882,roughness:.65,metalness:.35}),o=new ue({color:2894646,roughness:.8,metalness:.05}),a=new ue({color:3880006,roughness:.7,metalness:.05}),l=new yt({color:1317420,roughness:.12,metalness:.5,clearcoat:.8}),c=new ue({color:11739182,roughness:.4,metalness:.5}),h=new ue({color:11017006,roughness:.55,metalness:.05}),d=new ue({color:3812178,roughness:.75,metalness:0}),u=new ue({color:1381658,roughness:.85,metalness:0}),f=new ue({color:14212066,roughness:.3,metalness:.8}),m=new ue({color:16773583,emissive:16769696,emissiveIntensity:.5,roughness:.3}),x=new ue({color:9047826,emissive:12588056,emissiveIntensity:.6,roughness:.3}),g=(V,W,j,Z,ie,se,we,Se=.05)=>{let Ge=new Y(new Fe(V,W,j,2,Se),we);return Ge.position.set(Z,ie,se),t.add(Ge),Ge};g(Vt,jn-Ds,hi,Vt/2,(jn+Ds)/2,0,s,.08),g(1.45,Gn-jn,hi,.725,(Gn+jn)/2,0,s,.06),g(.25,Gn-jn,hi,Vt-.125,(Gn+jn)/2,0,s,.06);for(let V of[1,-1])g(Vt-1.7,Gn-jn,.1,1.45+(Vt-1.7)/2,(Gn+jn)/2,V*(hi/2-.05),a,.02);g(Vt-1.7,.06,hi-.2,1.45+(Vt-1.7)/2,jn+.03,0,o,.01),g(Vt-.4,.2,hi-.2,Vt/2,Ds-.1,0,r,.04);let p=[Op(!1,e),Op(!0,e)],E=V=>new yt({map:V,roughness:.42,metalness:.06,clearcoat:.45,clearcoatRoughness:.35}),S=new Ct(Vt,Nr);p.forEach((V,W)=>{let j=new Y(S,E(V.map)),Z=W===0?1:-1;j.position.set(Vt/2,(Ds+Gn)/2,Z*(hi/2+.004)),Z<0&&(j.rotation.y=Math.PI),t.add(j)});let y=new Image;y.onload=()=>{let V=bc.h*(y.naturalWidth/y.naturalHeight);for(let W of p){let j=W.fx(bc.cx);W.ctx.save(),W.ctx.drawImage(y,(j-V/2)*fs,bc.top*fs,V*fs,bc.h*fs),W.ctx.restore(),W.map.needsUpdate=!0}},y.src=i.front,g(.05,1.05,2,.02,1.35,0,l,.02);for(let V of[1,-1])g(.07,.2,.36,0,.75,V*.85,m,.03),g(.06,.2,.3,Vt+0,.7,V*.95,x,.03);g(.05,.75,1.7,Vt+.01,1.4,0,l,.02),g(.12,.1,2.2,0,Ds+.08,0,r,.03),g(.12,.1,2.2,Vt,Ds+.08,0,r,.03);let T=new Fe(.42,.1,.92,2,.03),M=new Fe(.08,.5,.92,2,.03);for(let V=2;V<=Vt-.9;V+=.85)for(let W of[-.62,.62]){let j=new Y(T,d);j.position.set(V,jn+.35,W);let Z=new Y(M,d);Z.position.set(V+.2,jn+.62,W);let ie=new Y(new it(.34,.3,.82),r);ie.position.set(V,jn+.18,W),t.add(j,Z,ie)}let v=Gn+.45,_=.4,R=Vt-.12,C=hi/2-.06;for(let V of[1,-1]){t.add(cn(n(_,v,V*C),n(R,v,V*C),.022,c));for(let W=_;W<=R+.01;W+=.8)t.add(cn(n(W,Gn,V*C),n(W,v,V*C),.018,c))}for(let V of[_,R])t.add(cn(n(V,v,-C),n(V,v,C),.022,c));let I=3.5,P=9.1,H=Gn+.85,F=new Y(new Fe(P-I,.07,hi+.06,2,.03),h);F.position.set((I+P)/2,H,0),t.add(F);for(let V=0;V<=5;V++){let W=I+.12+(P-I-.24)*V/5;for(let j of[1,-1])t.add(cn(n(W,Gn,j*(C-.02)),n(W,H,j*(C-.02)),.025,c))}let k=hi/2;for(let V of Hp){for(let j of[1,-1]){let Z=ac(Us,.3,u,f,r);Z.position.set(V,Us,j*k),t.add(Z)}let W=new Y(new dt(.06,.06,hi,10).rotateX(Math.PI/2),r);W.position.set(V,Us,0),t.add(W)}return{object:t,fitSize:8.6,pose:{x:9,y:30},envIntensity:.9,exposure:.9,look:{sun:1.1}}}});var jp={};Tn(jp,{outlineFromAlpha:()=>Kp,standeeModel:()=>V1});function D1(i){let e=[],t=Math.floor(i);for(let n=-t;n<=t;n++)for(let s=-t;s<=t;s++)s*s+n*n<=i*i&&e.push([s,n]);return e}function $p(i,e,t,n){let s=new Uint8Array(i.length),r=D1(n);for(let o=0;o<t;o++)for(let a=0;a<e;a++)if(i[o*e+a])for(let[l,c]of r){let h=a+l,d=o+c;h>=0&&h<e&&d>=0&&d<t&&(s[d*e+h]=1)}return s}function Tc(i,e,t,n,s){let[r,o]=i[e],[a,l]=i[t],c=Math.hypot(a-r,l-o)||1,h=-1,d=n;for(let u=e+1;u<t;u++){let f=Math.abs((a-r)*(o-i[u][1])-(r-i[u][0])*(l-o))/c;f>d&&(d=f,h=u)}h<0||(s[h]=1,Tc(i,e,h,n,s),Tc(i,h,t,n,s))}function Kp(i,e,t){let n=C1*t,s=P1*t,r=Math.ceil(n+s)+8,o=e+2*r,a=t+2*r,l=new Uint8Array(o*a);for(let M=0;M<a;M++)for(let v=0;v<e;v++){let _=Math.min(t-1,M-r);_>=0&&i[_*e+v]>I1&&(l[M*o+v+r]=1)}l=U1($p(l,o,a,s+n),o,a,s);for(let M=r+t-Math.ceil(L1*t);M<a;M++){let v=-1,_=-1;for(let R=0;R<o;R++)l[M*o+R]&&(v<0&&(v=R),_=R);v>=0&&l.fill(1,M*o+v,M*o+_+1)}let c=new Uint8Array(o*a),h=[0];for(c[0]=1;h.length;){let M=h.pop(),v=M%o,_=M/o|0;for(let[R,C]of[[1,0],[-1,0],[0,1],[0,-1]]){let I=v+R,P=_+C;I>=0&&I<o&&P>=0&&P<a&&!c[P*o+I]&&!l[P*o+I]&&(c[P*o+I]=1,h.push(P*o+I))}}let d=o+1,u=new Map,f=(M,v)=>M>=0&&M<o&&v>=0&&v<a&&!c[v*o+M],m=(M,v)=>(u.get(M)??u.set(M,[]).get(M)).push(v);for(let M=0;M<a;M++)for(let v=0;v<o;v++)f(v,M)&&(f(v,M-1)||m(M*d+v,M*d+v+1),f(v+1,M)||m(M*d+v+1,(M+1)*d+v+1),f(v,M+1)||m((M+1)*d+v+1,(M+1)*d+v),f(v-1,M)||m((M+1)*d+v,M*d+v));let x=[];for(;u.size;){let M=u.keys().next().value,v=[],_=M;do{v.push([_%d,_/d|0]);let R=u.get(_),C=R.pop();R.length||u.delete(_),_=C}while(_!==M&&u.has(_));v.length>x.length&&(x=v)}let g=x;for(let M=0;M<N1;M++){let v=g.length,_=g;g=_.map((R,C)=>{let I=0,P=0;for(let H=-2;H<=2;H++){let F=_[(C+H+v)%v];I+=F[0],P+=F[1]}return[I/5,P/5]})}let p=g.map(([M,v])=>[Math.min(e,Math.max(0,M-r)),Math.min(t,Math.max(0,v-r))]),E=0;for(let M=1;M<p.length;M++)Math.hypot(p[M][0]-p[0][0],p[M][1]-p[0][1])>Math.hypot(p[E][0]-p[0][0],p[E][1]-p[0][1])&&(E=M);let S=new Uint8Array(p.length);S[0]=S[E]=1,Tc(p,0,E,Wp,S);let y=p.slice(E).concat([p[0]]),T=new Uint8Array(y.length);return T[0]=T[y.length-1]=1,Tc(y,0,y.length-1,Wp,T),T.forEach((M,v)=>{M&&v<y.length-1&&(S[E+v]=1)}),p.filter((M,v)=>S[v]).map(([M,v])=>[M/e,v>=t?0:1-v/t])}function F1(i){let e=Math.round(i.naturalWidth/i.naturalHeight*Dr),[,t]=et(e,Dr);t.drawImage(i,0,0,e,Dr);let n=t.getImageData(0,0,e,Dr).data,s=new Uint8Array(e*Dr);for(let r=0;r<s.length;r++)s[r]=n[r*4+3];return Kp(s,e,Dr)}function B1(i,e){let t=i.map(([a,l])=>[a*e,l*Jo]),n=t.filter(a=>a[1]===0).map(a=>a[0]),s=Math.min(...n),r=Math.max(...n),o=-(s+r)/2;return{pts:t.map(([a,l])=>new fe(a+o,l===0?-R1:l)),shift:o,slotW:r-s+.03}}function O1(i,e,t){let n=Math.round(Sc*(e-.04)),[s,r]=et(n,Ec);r.fillStyle="#0b0713",r.fillRect(0,0,n,Ec);let o=r.createLinearGradient(0,0,n,0);o.addColorStop(0,Au),o.addColorStop(1,Jp),r.fillStyle=o,r.fillRect(0,Ec-8,n,8),r.save(),r.translate(112,68),r.scale(11,11),us(r),r.restore(),r.textBaseline="middle",r.font=`900 78px ${wu}`,r.textAlign="left",r.letterSpacing="12px",r.fillStyle="#fbf8ff";let a=i.toUpperCase(),l=n-40-330-208,c=r.measureText(a).width;c>l&&(r.font=`900 ${Math.floor(78*l/c)}px ${wu}`),r.fillText(a,208,72),r.font=`700 36px ${wu}`,r.textAlign="right",r.letterSpacing="16px",r.fillStyle=Au,r.fillText("LEONIDA",n-40,72);let h=ft(s);return h.anisotropy=t,h}function H1(){let[e,t]=et(256);t.fillStyle="rgba(207,239,255,.07)",t.fillRect(0,0,256,256);for(let[n,s,r]of[[.34,.08,.34],[.55,.025,.5]]){let o=t.createLinearGradient((n-s)*256,256,(n-s)*256+128,0),a=s*2*256/(256*.5*1);o.addColorStop(0,"rgba(255,255,255,0)"),o.addColorStop(Math.min(a,.49),`rgba(255,255,255,${r})`),o.addColorStop(Math.min(2*a,.99),"rgba(255,255,255,0)"),t.fillStyle=o,t.fillRect(0,0,256,256)}return ft(e)}function z1(i,e){let t=Math.round(Sc*(e-.04)),n=Math.round(Sc*($o-.04)),[s,r]=et(t,n);r.fillStyle="#0b0713",r.fillRect(0,0,t,n);let o=r.createLinearGradient(0,n,t,0);o.addColorStop(0,Au),o.addColorStop(1,Jp),r.globalAlpha=.34,r.fillStyle=o,r.fillRect(0,0,t,n),r.globalAlpha=1;let a=i/(e-.04)*t,l=(qp+.014)/($o-.04)*n;return r.fillStyle="#020104",r.beginPath(),r.roundRect((t-a)/2,(n-l)/2,a,l,l/2),r.fill(),ft(s)}var Jo,Ru,Xp,Vp,qp,R1,Yp,$o,Tu,A1,Sc,Ec,Zp,wu,Au,Jp,Dr,C1,P1,I1,L1,N1,Wp,U1,k1,G1,V1,Qp=qt(()=>{"use strict";sn();Oi();An();Xo();Jo=1,Ru=.026,Xp=.004,Vp=.0035,qp=Ru+2*Xp,R1=.04,Yp=.84,$o=.3,Tu=.095,A1=i=>Math.max(Yp,i+.3),Sc=1600/(Yp-.04),Ec=144,Zp={polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4},wu="'Arial Black','Segoe UI Black','Helvetica Neue',Impact,sans-serif",Au="#ff2f8f",Jp="#7a3cff",Dr=240,C1=17/1536,P1=14/1536,I1=24,L1=.04,N1=2,Wp=.3;U1=(i,e,t,n)=>$p(i.map(s=>1-s),e,t,n).map(s=>1-s);k1=(i,e)=>new Gt({map:z1(i,e),...Zp}),G1=i=>new Promise((e,t)=>{let n=new Image;n.onload=()=>e(n),n.onerror=()=>t(new Error(`standee: \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u043B\u0430\u0441\u044C ${i}`)),n.src=i}),V1=async i=>{let e=await G1(i.front),t=Jo*e.naturalWidth/e.naturalHeight,{pts:n,shift:s,slotW:r}=B1(F1(e),t),o=A1(r);return({maxAniso:a})=>{let l=new Ze,c=new Zt(new Ot(n),{depth:Ru,bevelEnabled:!0,bevelThickness:Xp,bevelSize:Vp,bevelOffset:-Vp,bevelSegments:2,curveSegments:1});c.translate(0,0,-Ru/2);let h=H1();h.repeat.set(1/t,1/Jo),h.offset.set(-s/t,0);let d=new Gt({map:h,transparent:!0,depthWrite:!1}),u=new yt({color:11134207,emissive:5883135,emissiveIntensity:.6,transparent:!0,opacity:.8,roughness:.12,clearcoat:1,clearcoatRoughness:.05,depthWrite:!1}),f=new yt({color:0,roughness:.04,metalness:0,ior:1.9,clearcoat:1,clearcoatRoughness:.03,transparent:!0,depthWrite:!1,blending:ll,blendEquation:Fi,blendSrc:mr,blendDst:mr,blendSrcAlpha:cl,blendDstAlpha:mr}),m=new Gt({visible:!1});l.add(new Y(c,[d,u]),new Y(c,[f,m]));let x=new jt(e);x.colorSpace=Lt,x.anisotropy=a,x.needsUpdate=!0;let g=new yt({map:x,roughness:.4,clearcoat:.7,clearcoatRoughness:.12,side:st,alphaTest:.5,alphaToCoverage:!0}),p=new Y(new Ct(t,Jo),g);p.position.set(t/2+s,Jo/2,qp/2+6e-4),l.add(p);let E=new yt({color:460301,roughness:.28,metalness:.2,clearcoat:1,clearcoatRoughness:.08}),S=new Y(new Fe(o,Tu,$o,3,.014),E);S.position.y=-Tu/2,l.add(S);let y=new yt({map:O1(i.subject,o,a),roughness:.35,clearcoat:.6,clearcoatRoughness:.1,...Zp}),T=new Ct(o-.04,Ec/Sc);for(let v of[1,-1]){let _=new Y(T,y);_.position.set(0,-Tu/2,v*($o/2+7e-4)),v<0&&(_.rotation.y=Math.PI),l.add(_)}let M=new Y(new Ct(o-.04,$o-.04),k1(r,o));return M.rotation.x=-Math.PI/2,M.position.y=7e-4,l.add(M),{object:l,fitSize:Math.max(1,o*.8),pose:{x:9,y:-30},envIntensity:1.1,exposure:.95,look:{sun:1}}}}});var c0={};Tn(c0,{sneakerModel:()=>K1});function Fr(i){let e=4.6+.45*Math.tanh((i-1)/6)-.55*Math.exp(-(((i+2.5)/4)**2)),t=Math.abs(i)/Wt,n=i>0?2.8:2.25;return e*(1-.09*Pu(3,15,i))*Math.pow(Math.max(0,1-Math.pow(t,n)),1/n)}function o0(i,e,t,n){let s=new Et;return s.setAttribute("position",new tt(i,3)),s.setAttribute("normal",new tt(e,3)),s.setAttribute("uv",new tt(t,2)),s.setIndex(n),s}function J1(){let e=Rc.length,t=[],n=[],s=[],r=[],o=0;for(let a of[1,-1]){let l=o;for(let c=0;c<=160;c++){let h=-Wt*Math.cos(Math.PI*c/160),d=.001,u=Fr(h),m=-((Fr(Math.min(Wt,h+d))-Fr(Math.max(-Wt,h-d)))/(Math.min(Wt,h+d)-Math.max(-Wt,h-d))),x=1,g=Math.hypot(m,x);m/=g,x/=g;for(let p=0;p<e;p++){let[E,S]=Rc[p];t.push(h+m*E,S,a*(u+x*E));let[y,T]=Rc[Math.max(0,p-1)],[M,v]=Rc[Math.min(e-1,p+1)],_=M-y,R=v-T,C=Math.hypot(R,_)||1,I=R/C,P=-_/C;n.push(m*I,P,a*x*I),s.push(a0(h,a),S/Cu)}}for(let c=0;c<160;c++)for(let h=0;h<e-1;h++){let d=l+c*e+h,u=d+e;a>0?r.push(d,d+1,u,u,d+1,u+1):r.push(d,u,d+1,u,u+1,d+1)}o+=161*e}return o0(t,n,s,r)}function e0(i,e){let s=[],r=[],o=[],a=[],l=-Wt+.35,c=Wt-.25,h=e?.32:0,d=(S,y,T)=>{let M=Fs(S),v=3.2+y*(M-3.2);return T.set(S,v,i*Math.max(5e-4,r0(S,v)-h))},u=new N,f=new N,m=new N,x=new N,g=new N;for(let S=0;S<=120;S++){let y=l+(c-l)*(.5-.5*Math.cos(Math.PI*S/120));for(let T=0;T<=28;T++){let M=T/28,v=d(y,M,m);s.push(v.x,v.y,v.z);let _=.01,R=.004;d(Math.min(c,y+_),M,u).sub(d(Math.max(l,y-_),M,f)),x.copy(u),d(y,Math.min(1,M+R),u).sub(d(y,Math.max(0,M-R),f)),g.crossVectors(u,x).normalize().multiplyScalar(i*(e?-1:1)),r.push(g.x,g.y,g.z),o.push(a0(y,i),v.y/Cu)}}let p=29,E=i>0===e;for(let S=0;S<120;S++)for(let y=0;y<28;y++){let T=S*p+y,M=T+p;E?a.push(T,T+1,M,M,T+1,M+1):a.push(T,M,T+1,M,M+1,T+1)}return o0(s,r,o,a)}function Ac(i,e,t,n=!1,s=40,r=10){let o=new vi(i,n,"catmullrom",.5),a=new N(0,1,0),l=[],c=[],h=new N,d=new N,u=new N,f=n?s:s+1;for(let x=0;x<f;x++){let g=x/s,p=o.getPointAt(g%1);h.copy(o.getTangentAt(n?g%1:Math.min(g,1))),d.crossVectors(a,h).normalize(),d.lengthSq()<1e-6&&d.set(1,0,0),u.crossVectors(h,d).normalize();for(let E=0;E<r;E++){let S=E/r*Math.PI*2,y=Math.cos(S)*e,T=Math.sin(S)*t;l.push(p.x+d.x*y+u.x*T,p.y+d.y*y+u.y*T,p.z+d.z*y+u.z*T)}}for(let x=0;x<s;x++){let g=n?(x+1)%s:x+1;for(let p=0;p<r;p++){let E=(p+1)%r,S=x*r+p,y=x*r+E,T=g*r+p,M=g*r+E;c.push(S,T,y,y,T,M)}}let m=new Et;return m.setAttribute("position",new tt(l,3)),m.setIndex(c),m.computeVertexNormals(),m}function Ko(i,e,t=!0){let n=(r,o)=>[(r[0]+o[0])/2,(r[1]+o[1])/2],s=e.length;if(i.beginPath(),t){let r=n(e[s-1],e[0]);i.moveTo(dn(r[0]),St(r[1]));for(let o=0;o<s;o++){let a=n(e[o],e[(o+1)%s]);i.quadraticCurveTo(dn(e[o][0]),St(e[o][1]),dn(a[0]),St(a[1]))}i.closePath()}else{i.moveTo(dn(e[0][0]),St(e[0][1]));for(let r=1;r<s-1;r++){let o=n(e[r],e[r+1]);i.quadraticCurveTo(dn(e[r][0]),St(e[r][1]),dn(o[0]),St(o[1]))}i.lineTo(dn(e[s-1][0]),St(e[s-1][1]))}}function n0(i,e){i.save(),i.beginPath(),i.rect(0,0,ui,Ur),i.clip(),i.fillStyle="#0e0d11",i.fillRect(0,0,ui,Ur),i.fillStyle="#efe8d6",i.fillRect(0,St(3.5),ui,St(.95)-St(3.5)),i.fillStyle=Cc(i,3.45,.95,[[0,"rgba(255,255,255,.0)"],[1,"rgba(120,105,80,.22)"]]),i.fillRect(0,St(3.5),ui,St(.95)-St(3.5)),i.fillStyle="#17161a",i.fillRect(0,St(.95),ui,St(0)-St(.95)),i.fillStyle="#6c6c72";for(let l=-Wt;l<Wt;l+=.34)i.fillRect(dn(l),St(.95),.17*Dn,.55*Dn);i.fillStyle="#4a4a50",i.fillRect(0,St(.97),ui,.06*Dn),i.strokeStyle="rgba(120,110,95,.7)",i.lineWidth=2,i.setLineDash([9,7]),i.beginPath(),i.moveTo(0,St(3.2)),i.lineTo(ui,St(3.2)),i.moveTo(0,St(1.25)),i.lineTo(ui,St(1.25)),i.stroke(),i.setLineDash([]),Ko(i,[[-1,3.2],[-.6,4.8],[.8,5.6],[4,6.3],[8,5.9],[11.5,5.4],[14,4.8],[15.2,4.2],[15.2,3.2]]),i.fillStyle=Cc(i,3.2,6.4,[[0,"#ff9a3c"],[.38,"#ff5f6d"],[.7,"#ff2f9a"],[1,"#f01f9a"]]),i.fill(),Ko(i,[[-15.3,3.2],[-15.3,11],[-10,11],[-6.5,10.3],[-3.6,9.3],[-2.2,6.4],[-2.6,3.2]]),i.fillStyle=Cc(i,3.2,11,[[0,"#ff8a46"],[.2,"#ff4d86"],[.5,"#c24ccf"],[.8,"#a05be8"],[1,"#c58cf2"]]),i.fill(),t0(i,[[-3.4,3.2],[-3.3,9],[.5,9.3],[5,8.3],[4.2,5.2],[2.4,3.2]]),i.save(),i.clip(),i.fillStyle="#3a3340",i.fillRect(0,0,ui,Ur);let t=7,n=()=>(t=t*16807%2147483647)/2147483647,s=["#26222b","#57505f","#6d5f73","#2f4a43","#8b7a8f"];for(let l=0;l<70;l++)i.fillStyle=s[l%s.length],i.globalAlpha=.85,i.beginPath(),i.ellipse(dn(-3+n()*7.5),St(3.4+n()*4.8),(.5+n()*.9)*Dn,(.25+n()*.45)*Dn,n()*3,0,7),i.fill();i.restore(),i.globalAlpha=1,i.fillStyle="rgba(255,60,160,.16)",t0(i,[[-3.4,3.2],[-3.3,9],[.5,9.3],[5,8.3],[4.2,5.2],[2.4,3.2]]),i.fill(),i.fillStyle="#2b2a31";for(let l=0;l<4;l++)for(let c=0;c<9;c++){let h=8.6+c*.55+l%2*.27,d=5+l*.38;d>Pc(h)-.55||h>14.3-l*.2||(i.beginPath(),i.arc(dn(h),l0(d),.085*Dn,0,7),i.fill())}i.strokeStyle="rgba(255,255,255,.2)",i.lineWidth=2,i.setLineDash([8,6]),Ko(i,[[7.6,5.6],[8.4,4.9],[8,4]],!1),i.stroke(),i.setLineDash([]),i.beginPath();let r=[[5.9,8.1],[3.2,6.9],[.4,5.3],[-2.6,3.9],[-6,3.55],[-9.5,3.5],[-12.4,3.6],[-13.7,4.4],[-13.2,6],[-11.4,7.6],[-10.2,7.6],[-9.9,6.2],[-8.2,5.4],[-5.8,5.4],[-2.6,5.9],[.6,7],[3.4,7.9]],o=(l,c)=>[(l[0]+c[0])/2,(l[1]+c[1])/2];i.moveTo(dn(r[0][0]),St(r[0][1]));for(let l=1;l<r.length;l++){let c=l===r.length-1?r[0]:o(r[l],r[l+1]);i.quadraticCurveTo(dn(r[l][0]),St(r[l][1]),dn(c[0]),St(c[1]))}i.closePath(),i.fillStyle=Cc(i,8,3.4,[[0,"#f7f3e8"],[1,"#e6dfcd"]]),i.fill(),i.strokeStyle="rgba(0,0,0,.35)",i.lineWidth=3,i.stroke(),i.strokeStyle="rgba(255,255,255,.28)",i.lineWidth=2,i.setLineDash([8,6]),Ko(i,[[-2.3,3.2],[-2.2,6.4],[-3.6,9.3],[-6.5,10.3],[-10,11]],!1),i.stroke(),Ko(i,[[-1,5],[.8,5.6],[4,6.3],[8,5.9],[11.5,5.4]],!1),i.stroke(),i.setLineDash([]),i.fillStyle=W1;let a=St(2);i.fillRect(dn(-8.6),a-.07*Dn,3*Dn,.14*Dn),i.fillRect(dn(-14.3),a-.07*Dn,3.1*Dn,.14*Dn),i.save(),i.translate(dn(-10),a),e&&i.scale(-1,1),i.transform(1,0,-.22,1,0,0),i.font=`900 ${1.15*Dn}px 'Arial Black','Segoe UI Black','Helvetica Neue',Impact,sans-serif`,i.textAlign="center",i.textBaseline="middle",i.fillText("GTA",0,0),i.restore(),i.restore()}function $1(){let[i,e]=et(i0,Ur);return n0(e,!1),e.save(),e.translate(ui,0),n0(e,!0),e.restore(),i}var Wt,Cu,i0,Ur,ui,Dn,W1,Pu,jo,s0,X1,Pc,q1,Y1,Z1,Fs,r0,wc,a0,Rc,dn,l0,St,t0,Cc,K1,h0=qt(()=>{"use strict";sn();Oi();An();Wt=15,Cu=15,i0=4096,Ur=1024,ui=i0/2,Dn=ui/(2*Wt),W1="#ff2f9a",Pu=(i,e,t)=>{let n=Math.max(0,Math.min(1,(t-i)/(e-i)));return n*n*(3-2*n)},jo=(i,e,t)=>i+(e-i)*t,s0=i=>{let e=i.length,t=i.map((n,s)=>{let r=i[Math.max(0,s-1)],o=i[Math.min(e-1,s+1)];return o[0]===r[0]?0:(o[1]-r[1])/(o[0]-r[0])});return n=>{if(n<=i[0][0])return i[0][1];for(let s=1;s<e;s++)if(n<=i[s][0]){let[r,o]=i[s-1],[a,l]=i[s],c=a-r,h=(n-r)/c,d=h*h,u=d*h;return(2*u-3*d+1)*o+(u-2*d+h)*c*t[s-1]+(-2*u+3*d)*l+(u-d)*c*t[s]}return i[e-1][1]}};X1=i=>Math.max(8e-4,Fr(i)*.95-.12),Pc=s0([[-15,10.5],[-11,10.9],[-4,10.6],[0,9.8],[4,8.6],[8,7.3],[12,6.2],[14.5,5],[15,4.2]]),q1=s0([[-15,9.9],[-13,10.3],[-9,9.5],[-5,9],[-1,9.2],[2.5,8.5],[5,7.7],[7,7.2]]),Y1=i=>jo(2.5,3.6,Pu(1,9,i)),Z1=.82,Fs=i=>jo(Math.min(q1(i),Pc(i)),Pc(i),Pu(5.2,8.2,i)),r0=(i,e)=>{let t=Pc(i)-3.2,n=Math.min(1,(e-3.2)/t),s=Y1(i);return X1(i)*Math.pow(Math.max(0,1-Math.pow(n,s)),1/s)},wc=i=>r0(i,Fs(i));a0=(i,e)=>(i+Wt)/(2*Wt)*.5+(e>0?0:.5),Rc=[[-.55,0],[-.3,.08],[-.05,.3],[0,.55],[0,.95],[.06,1.05],[.02,1.2],[0,1.6],[0,2.8],[.16,3.2],[-.05,3.45],[-.5,3.5],[-.75,3.46]];dn=i=>(i+Wt)*Dn,l0=i=>Ur-i/Cu*Ur,St=i=>l0(i<=3.45?i:3.45+(i-3.45)*Z1);t0=(i,e)=>{i.beginPath(),i.moveTo(dn(e[0][0]),St(e[0][1]));for(let[t,n]of e.slice(1))i.lineTo(dn(t),St(n));i.closePath()},Cc=(i,e,t,n)=>{let s=i.createLinearGradient(0,St(e),0,St(t));for(let[r,o]of n)s.addColorStop(r,o);return s};K1=()=>({maxAniso:i})=>{let e=ft($1());e.anisotropy=i;let[t,n]=et(1024,256),s=n.createImageData(1024,256);for(let P=0;P<s.data.length;P+=4){let H=128+Math.random()*127;s.data[P]=s.data[P+1]=s.data[P+2]=H,s.data[P+3]=255}n.putImageData(s,0,0);let r=new Yt(t);r.anisotropy=i;let o=new ue({map:e,roughness:.86,metalness:0,bumpMap:r,bumpScale:.35,envMapIntensity:.7}),a=new ue({color:789262,roughness:.82}),l=new ue({color:8223366,roughness:.5,metalness:.6}),c=new ue({color:1315607,roughness:.6}),h=new ue({color:657676,roughness:.95}),d=new ue({color:1775903,roughness:.9}),u=new Ze;u.add(new Y(J1(),new ue({map:e,roughness:.78,side:st})));for(let P of[1,-1])u.add(new Y(e0(P,!1),o)),u.add(new Y(e0(P,!0),h));let f=new Ot,m=[];for(let P=0;P<=60;P++){let H=-Wt+.4+(2*Wt-.8)*P/60;m.push(new fe(H,Math.max(.01,Fr(H)-.7)))}for(let P=60;P>=0;P--)m.push(new fe(-Wt+.4+(2*Wt-.8)*P/60,-Math.max(.01,Fr(-Wt+.4+(2*Wt-.8)*P/60)-.7)));f.setFromPoints(m);let x=new Y(new Mi(f).rotateX(-Math.PI/2),d);x.position.y=3.47,u.add(x);let g=new Y(new Mi(f).rotateX(Math.PI/2),d);g.position.y=.03,u.add(g);let p=[],E=[];for(let P=0;P<=28;P++)E.push(2.4-(2.4+Wt-1.3)*P/28);for(let P of E)p.push(new N(P,Fs(P)+.08,wc(P)-.1));for(let P=E.length-2;P>=0;P--)p.push(new N(E[P],Fs(E[P])+.08,-(wc(E[P])-.1)));u.add(new Y(Ac(p,.62,.55,!1,120,12),a));let S=new Ze,y=new Y(new Fe(1.1,6,4.4,4,.5),a);y.position.y=3,S.add(y),S.position.set(2.4,6.2,0),S.rotation.z=.4,u.add(S);let T=new Y(new Fe(.5,1.9,2,3,.22),a);T.position.set(-Wt+.95,Fs(-Wt+1.2)+.2,0),T.rotation.z=-.12,u.add(T);let M=[6.2,4.9,3.6,2.3,1,-.3],v=P=>({y:Fs(P)+.28,o:wc(P)+.15});for(let P=0;P<M.length;P++){let H=(F,k,V)=>{let W=v(k),j=v(V),Z=[];for(let ie=0;ie<=6;ie++){let se=ie/6,we=Math.sin(Math.PI*se)*.45;Z.push(new N(jo(k,V,se),jo(W.y,j.y,se)+we+.05,F*jo(W.o,j.o,se)*(1-2*se)))}u.add(new Y(Ac(Z,.32,.1,!1,18,8),c))};P+1<M.length&&(H(1,M[P],M[P+1]),H(-1,M[P],M[P+1]))}for(let P of M)for(let H of[1,-1]){let F=new Y(new zn(.26,.09,8,16),l);F.rotation.x=Math.PI/2,F.position.set(P,Fs(P)+.12,H*(wc(P)+.02)),u.add(F)}let _=-1,R=v(0).y+.5,C=P=>Ac([[0,0],[.9,.9],[1.3,2],[.4,2.8],[-.5,2],[-.6,.9]].map(([F,k])=>new N(_+F,R+.25+k*.12,P*(k+.3))),.3,.1,!0,30,8);u.add(new Y(C(1),c),new Y(C(-1),c));for(let P of[1,-1]){let H=[new N(_,R,0),new N(_-1.4,R-.3,P*1.4),new N(_-2.6,R-1,P*2.4),new N(_-3.2,R-1.9,P*2.6)];u.add(new Y(Ac(H,.3,.1,!1,20,8),c))}let I=new Y(new ln(.5,14,10),c);return I.scale.set(1.1,.7,.9),I.position.set(_,R,0),u.add(I),{object:u,fitSize:27,pose:{x:14,y:-28},envIntensity:.6,exposure:1,look:{sun:1}}}});var f0={};Tn(f0,{CHEETAH:()=>Du,carModel:()=>nb});function Qo(i){let e=i.map(c=>c[0]),t=Math.min(...e),n=Math.max(...e),s=.01,r=Math.round((n-t)/s),o=[...i].sort((c,h)=>c[0]-h[0]),a=c=>{let h=1;for(;h<o.length-1&&o[h][0]<c;)h++;let[d,u]=o[h-1],[f,m]=o[h];return u+(m-u)*Ut.clamp((c-d)/(f-d),0,1)},l=Array.from({length:r+1},(c,h)=>a(t+h*s));for(let c=0;c<14;c++)l=l.map((h,d)=>d===0||d===r?h:(l[d-1]+2*h+l[d+1])/4);return c=>{let h=Ut.clamp((c-t)/s,0,r),d=Math.min(Math.floor(h),r-1);return l[d]+(l[d+1]-l[d])*(h-d)}}function Nu(i,e){let t=(i.yB+i.yT)/2,n=(i.yT-i.yB)/2,s=Math.cos(e),r=Math.sin(e),o=r>=0?i.nUp:i.nLo;return[i.W*u0(s,2/o),t+n*u0(r,2/o)]}function ki(i,e={}){let t=!!e.arc,n=t?(e.ring??16)+1:e.ring??64,s=[],r=[];for(let l of i)for(let c=0;c<n;c++){let h=t?e.arc[0]+(e.arc[1]-e.arc[0])*c/(n-1):2*Math.PI*c/n,[d,u]=Nu(l,h);e.deform&&(u=e.deform(l.x,d,u)),s.push(l.x,u,d)}let o=t?n-1:n;for(let l=0;l<i.length-1;l++)for(let c=0;c<o;c++){let h=l*n+c,d=l*n+(c+1)%n,u=(l+1)*n+c,f=(l+1)*n+(c+1)%n;r.push(h,d,u,d,f,u)}if(e.caps&&!t)for(let[l,c]of[[0,!0],[i.length-1,!1]]){let h=i[l],d=s.length/3;s.push(h.x,(h.yB+h.yT)/2,0);for(let u=0;u<n;u++){let f=l*n+u,m=l*n+(u+1)%n;c?r.push(d,m,f):r.push(d,f,m)}}let a=new Et;return a.setAttribute("position",new tt(s,3)),a.setIndex(r),a.computeVertexNormals(),a}function zt(i,e,t){let n=[],s=[];for(let o=0;o<=i;o++)for(let a=0;a<=e;a++)n.push(...t(o/i,a/e));for(let o=0;o<i;o++)for(let a=0;a<e;a++){let l=o*(e+1)+a,c=l+1,h=l+e+1,d=h+1;s.push(l,c,h,c,d,h)}let r=new Et;return r.setAttribute("position",new tt(n,3)),r.setIndex(s),r.computeVertexNormals(),r}var Du,Uu,Lu,j1,Q1,eb,tb,u0,zi,Iu,d0,nb,p0=qt(()=>{"use strict";sn();Oi();Du={top:[[2.22,.5],[2,.62],[1.6,.74],[1.3,.8],[1,.8],[.6,.85],[.2,.87],[-.5,.88],[-1,.92],[-1.8,.96],[-2.12,.97],[-2.25,.92]],bottom:[[2.22,.18],[2.05,.15],[1.85,.16],[1.5,.14],[-1.8,.14],[-2.12,.2],[-2.25,.22]],half:[[2.22,.8],[2,.86],[1.6,.9],[1,.9],[.3,.91],[-.3,.95],[-.9,.99],[-1.6,.99],[-2.12,.97],[-2.25,.94]],cabinTop:[[.72,.85],[.45,.97],[.12,1.08],[-.2,1.13],[-.7,1.12],[-1,1.05],[-1.35,.94]],cabinHalf:[[.72,.68],[.4,.74],[0,.78],[-.8,.78],[-1.35,.72]],cabinDrop:.2,roof:[.14,-1],wheelR:.335,axleX:[1.32,-1.23],tireW:[.24,.3],track:[.74,.8],spokes:5,paint:[[0,"#d92f98"],[.3,"#9a38c0"],[.5,"#5a40c8"],[.66,"#2455c4"],[1,"#1f7fc4"]],rim:"#9a9da4",caliper:"#e8c32a",foglamp:"#f2d21e",tail:"#c9201f",glass:"#04070d",louver:{x0:.98,x1:1.4,hw:.36,color:"#b3283b"},strakes:{x0:.18,x1:-.95},bumper:{front:2.33,rear:-2.3}},Uu={top:[[2.22,.4],[2.05,.5],[1.75,.7],[1.3,.8],[.8,.8],[.2,.82],[-.6,.86],[-1.2,.9],[-1.9,.88],[-2.12,.84],[-2.25,.8]],bottom:[[2.22,.17],[2,.13],[1.7,.13],[-1.8,.13],[-2.12,.19],[-2.25,.22]],half:[[2.22,.74],[2,.83],[1.6,.9],[1,.93],[.3,.94],[-.5,.96],[-1.5,.96],[-2,.92],[-2.25,.86]],cabinTop:[[.9,.8],[.45,.98],[0,1.1],[-.4,1.14],[-.9,1.1],[-1.4,.98],[-1.8,.89]],cabinHalf:[[.88,.7],[.4,.76],[-.4,.78],[-1.2,.74],[-1.8,.66]],cabinDrop:.2,roof:[.3,-1.5],roofX:[.4,-1.5],wheelR:.34,axleX:[1.3,-1.32],tireW:[.245,.305],track:[.78,.8],spokes:5,paint:[[0,"#14151a"],[1,"#14151a"]],rim:"#5a5e66",caliper:"#c8202a",foglamp:"#f2d21e",tail:"#d4202a",glass:"#33506f",bumper:{front:2.33,rear:-2.32},wedge:!0,hlWing:!0,livery:{panel:"#e8eaec",x:[-.5,.78],yLo:.36,yHi:.75},lightbar:{x:0,hw:.56,a:"#e0202a",b:"#2a52ff"},underglow:"#ff1a1a",mirror:"#e8eaec"},Lu={...Uu,top:[[2.22,.5],[2.05,.56],[1.75,.7],[1.3,.78],[.8,.8],[.2,.82],[-.6,.86],[-1.2,.9],[-1.9,.88],[-2.12,.84],[-2.25,.8]],half:[[2.22,.78],[2,.86],[1.6,.93],[1,.96],[.3,.97],[-.5,.98],[-1.5,.98],[-2,.93],[-2.25,.86]],cabinTop:[[.95,.8],[.5,1],[0,1.13],[-.45,1.16],[-.95,1.1],[-1.45,.98],[-1.8,.89]],roof:[.3,-1.5],roofX:[.2,-1.5],paint:[[0,"#ff6a12"],[1,"#ff7a1c"]],rim:"#ffc82e",caliper:"#222226",glass:"#232b36",louver:{x0:1,x1:1.45,hw:.3,color:"#26262a"},livery:void 0,lightbar:void 0,underglow:void 0,mirror:"#ff6a12",senna:!0,spokes:10,spokeW:.4,intake:!0,lampTh:.07,seatDrop:.1,wing:{x:-2.2,y:1.08,hw:.93,chord:.4,strutX:[-1.98,-2.12],strutZ:.5}},j1={...Uu,paint:[[0,"#e5448f"],[1,"#e5448f"]],camo:["#e5448f","#f4a6c4","#aab4ee","#3b2a66"],rim:"#5b5e66",caliper:"#d8334a",glass:"#3a4a5c",livery:void 0,lightbar:void 0,underglow:void 0,mirror:"#e5448f",cabinTop:[[.95,.8],[.5,1],[0,1.12],[-.5,1.12],[-1,1.04],[-1.5,.94],[-1.8,.89]],top:Lu.top,half:Lu.half,spokes:10,spokeW:.45,intake:!0,lampTh:.06,senna:!0,c8:!0,seatDrop:.15,wheelR:.355,tireW:[.26,.31],wing:{x:-2.1,y:0,hw:.6,chord:.22,strutX:[-1.98,-2.12],strutZ:.5}},Q1={top:[[2.6,.8],[2.5,.92],[2.1,.98],[1,1],[.6,.99],[-.2,.96],[-1.2,.97],[-1.9,1.03],[-2.4,1.01],[-2.62,.95]],bottom:[[2.6,.3],[2.4,.2],[2,.17],[-2.2,.17],[-2.5,.22],[-2.62,.3]],half:[[2.6,.9],[2.3,.97],[1.5,.99],[0,1],[-1.5,1],[-2.3,.98],[-2.62,.92]],cabinTop:[[.55,.99],[.12,1.36],[-.3,1]],cabinHalf:[[.55,.9],[-.3,.9]],cabinDrop:.2,roof:[.1,-1],wheelR:.33,axleX:[1.65,-1.55],tireW:[.2,.22],track:[.83,.82],spokes:30,spokeW:.12,paint:[[0,"#2aa83c"],[1,"#38b946"]],rim:"#d6ac3e",caliper:"#8a1c1c",foglamp:"#f2d21e",tail:"#d4202a",glass:"#9fb88a",bumper:{front:2.74,rear:-2.78},classic:!0,bodyN:[9,3.4],open:{x0:.5,x1:-1,hw:.8,floor:.5},flake:!0,wire:!0,interior:"#e8dcc0",fit:4.7},eb={top:[[2.35,.99],[2.2,1],[1.5,1.01],[.8,1.02],[0,1.03],[-1.2,1.04],[-2.2,1.04],[-2.35,1.03]],bottom:[[2.35,.57],[2.1,.53],[1.8,.49],[-1.5,.49],[-2.1,.53],[-2.35,.57]],half:[[2.35,.79],[2.2,.82],[1.8,.83],[-1.8,.83],[-2.2,.82],[-2.35,.8]],cabinTop:[[.8,.98],[.55,1.17],[.25,1.35],[.05,1.4],[-.6,1.41],[-.85,1.38],[-1.1,1.22],[-1.32,1.05]],cabinHalf:[[.8,.74],[.3,.74],[-.6,.74],[-1.32,.72]],cabinDrop:.1,roof:[.15,-.75],roofX:[.15,-.75],wheelR:.37,axleX:[1.45,-1],tireW:[.27,.27],track:[.7,.7],spokes:12,spokeW:.6,rimFrac:.84,paint:[[0,"#2a9fa8"],[1,"#2a9fa8"]],rim:"#f2c14e",caliper:"#222226",foglamp:"#f2d21e",tail:"#c9201f",glass:"#22303a",bumper:{front:2.5,rear:-2.5},donk:{belt:.73},bodyN:[7,5],seatDrop:-.12,fit:4.3},tb={cheetah:Du,tempesta:Uu,emerus:Lu,coquette:j1,buccaneer:Q1,manana:eb};u0=(i,e)=>Math.sign(i)*Math.abs(i)**e,zi=(i,e,t)=>{let n=Ut.clamp((t-i)/(e-i),0,1);return n*n*(3-2*n)},Iu=4,d0=2.6;nb=i=>()=>{let e=tb[i??""]??Du,t=new Ze,n=e.open,s=!!n,r=e.bodyN?.[0]??Iu,o=e.bodyN?.[1]??d0,a=Qo(e.top),l=Qo(e.bottom),c=Qo(e.half),h=Qo(e.cabinTop),d=Qo(e.cabinHalf),u=e.top[0][0],f=e.top[e.top.length-1][0],m=e.paint.map(([w,z])=>({t:w,c:new Qe(z)})),x=new Qe,g=e.livery,p=g&&new Qe(g.panel),E=(w,z,U=0,B=0)=>{if(z+=U,n&&w<=n.x0+.001&&w>=n.x1-.001&&Math.abs(B)<n.hw+.001)return x.set(e.interior??"#e8dcc0");if(e.camo)return x.setRGB(1,1,1).multiplyScalar(.3+.7*zi(.14,.26,z));let X=Ut.clamp((w-f)/(u-f),0,1);X=Ut.clamp(X-.2*(1-zi(.16,.6,z)),0,1);let O=1;for(;O<m.length-1&&m[O].t<X;)O++;let Q=m[O-1],ne=m[O];return x.copy(Q.c).lerp(ne.c,Ut.clamp((X-Q.t)/(ne.t-Q.t),0,1)),g&&x.lerp(p,zi(g.x[0]-.06,g.x[0],w+.12*z)*(1-zi(g.x[1],g.x[1]+.08,w-.3*(z-.5)))*zi(g.yLo-.04,g.yLo+.04,z)*(1-zi(g.yHi-.04,g.yHi,z))*zi(.6,.78,Math.abs(B))),x.multiplyScalar(.3+.7*zi(.14,.26,z))},S=(w,z=0)=>{let U=w.attributes.position,B=new Float32Array(U.count*3);for(let X=0;X<U.count;X++)E(U.getX(X),U.getY(X),z,U.getZ(X)).toArray(B,X*3);return w.setAttribute("color",new Dt(B,3)),w},y=new yt({vertexColors:!0,side:st,roughness:.46,metalness:.15,clearcoat:.45,clearcoatRoughness:.2});if(e.camo){let w=e.camo.map(z=>new Qe(z));y.onBeforeCompile=z=>{z.uniforms.uCamo={value:w},z.vertexShader=z.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vOP;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vOP = position;`),z.fragmentShader=z.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vOP; uniform vec3 uCamo[4];
float hz(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
float vn(vec3 p){ vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hz(i), hz(i + vec3(1,0,0)), f.x), mix(hz(i + vec3(0,1,0)), hz(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hz(i + vec3(0,0,1)), hz(i + vec3(1,0,1)), f.x), mix(hz(i + vec3(0,1,1)), hz(i + vec3(1,1,1)), f.x), f.y), f.z); }
vec3 camoCol(vec3 P){
  vec3 q = vec3(P.x * 2.0, P.y * 2.6, P.z * 2.3);
  vec3 w = q + vec3(1.3 * vn(q.yzx + 5.0), 0.0, 1.3 * vn(q.zxy + 9.0));
  float n = 0.62 * vn(w) + 0.28 * vn(w * 2.1 + 7.0) + 0.1 * vn(w * 4.3 + 3.0);
  float w1 = fwidth(n) * 0.8 + 0.004;
  vec3 c = uCamo[0];
  c = mix(c, uCamo[1], smoothstep(0.4 - w1, 0.4 + w1, n));
  vec3 light = c;
  c = mix(c, uCamo[2], smoothstep(0.5 - w1, 0.5 + w1, n));
  c = mix(c, uCamo[3], smoothstep(0.6 - w1, 0.6 + w1, n));
  float sp = vn(P * 11.0 + 2.0), ws = fwidth(sp) * 0.8 + 0.004;
  float onLight = smoothstep(0.4 - w1, 0.4 + w1, n) * (1.0 - smoothstep(0.5 - w1, 0.5 + w1, n));
  return mix(c, uCamo[0], smoothstep(0.68 - ws, 0.68 + ws, sp) * onLight);
}`).replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb *= camoCol(vOP);`)}}if(e.flake){y.metalness=.5,y.roughness=.3,y.clearcoat=1,y.clearcoatRoughness=.08;let w=n?new N(n.x1,n.x0,n.hw):new N(9,9,0);y.onBeforeCompile=z=>{z.uniforms.uOpen={value:w},z.vertexShader=z.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vOP;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vOP = position;`),z.fragmentShader=z.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vOP; uniform vec3 uOpen;
float hz(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }`).replace("#include <color_fragment>",`#include <color_fragment>
bool inCab = vOP.x <= uOpen.y && vOP.x >= uOpen.x && abs(vOP.z) < uOpen.z + 0.002;
if (!inCab) { vec3 cell = floor(vOP * 110.0); float r = hz(cell), k = step(0.93, r) * (0.5 + 0.8 * hz(cell + 3.1));
  diffuseColor.rgb = diffuseColor.rgb * (1.0 + 0.8 * k) + k * vec3(0.02, 0.09, 0.03); }`)}}let T=new yt({color:e.glass,roughness:.2,metalness:.1,envMapIntensity:.4,transparent:!0,opacity:.97,depthWrite:!1}),M=new ue({color:"#0c0c11",roughness:.55,metalness:.2,side:st}),v=(w,z,U=[0,0,0])=>{let B=new Y(w,z);return B.position.set(...U),t.add(B),B},_=new ue({color:"#d9ad3c",roughness:.24,metalness:.95,side:st}),R=(w,z,U,B)=>{let X=z.clone().sub(w),O=v(new dt(U,U,X.length(),10),B,w.clone().add(z).multiplyScalar(.5).toArray());return O.quaternion.setFromUnitVectors(new N(0,1,0),X.normalize()),O},C=(w,z=.25)=>new ue({color:w,roughness:.2,metalness:.1,emissive:w,emissiveIntensity:z}),I=e.wheelR+.045,P=w=>{let z=0;for(let U of e.axleX){let B=Math.abs(w-U);B<I&&(z=Math.max(z,e.wheelR+Math.sqrt(I*I-B*B)))}return z},H=(w,z,U)=>{let B=Math.abs(z)>.5?Math.max(U,P(w)):U;return n&&w<=n.x0&&w>=n.x1&&Math.abs(z)<n.hw&&B>n.floor?n.floor:B},F=e.classic?340:g?260:150,k=Array.from({length:F},(w,z)=>{let U=u+(f-u)*z/(F-1);return{x:U,W:c(U),yB:l(U),yT:a(U),nUp:r,nLo:o}});v(S(ki(k,{caps:!0,deform:H,ring:e.classic?200:g?120:64})),y);let V=w=>({W:c(w),yB:l(w),yT:a(w)}),W=(w,z)=>{let U=V(w),B=(U.yB+U.yT)/2,X=(U.yT-U.yB)/2;return B+X*(1-Math.min(1,Math.abs(z)/U.W)**r)**(1/r)},j=(w,z)=>{let U=V(w),B=(U.yB+U.yT)/2,X=(U.yT-U.yB)/2,O=Math.min(1,Math.abs(z-B)/X);return U.W*(1-O**(z>B?r:o))**(1/(z>B?r:o))},Z=(w,z,U,B=0)=>Array.from({length:U},(X,O)=>{let Q=w+(z-w)*O/(U-1);return{x:Q,W:d(Q)+B,yB:a(Q)-e.cabinDrop,yT:h(Q)+B,nUp:3,nLo:8}});s||v(ki(Z(e.cabinTop[0][0],e.cabinTop[e.cabinTop.length-1][0],60),{caps:!0}),T);let ie=y,se=(w,z)=>{let U=w.attributes.color;for(let B=0;B<U.array.length;B++)U.array[B]*=z;return w},we=1.1,Se=e.roofX??[.22,-1.08];s||v(se(S(ki(Z(Se[0],Se[1],28,.012),{arc:[Math.PI/2+we,Math.PI/2-we],ring:20})),.85),ie);let Ge=Math.PI/2-we,Ve=(w,z,U=16,B=3)=>{for(let X of[1,-1]){let O=zt(U,B,(Q,ne)=>{let _e=w(Q,ne),ve=Z(_e,_e,2,.016)[0],[Be,Ke]=Nu(ve,z(Q,ne));return[_e,Ke,X*Be]});v(se(S(O),.85),ie)}};e.wedge&&!s&&(Ve(w=>.9-.5*w,(w,z)=>Ge-.12+.2*z,14,3),Ve(w=>-1.4-.4*w,(w,z)=>Ge-.1-.12*w+(.2+.2*w)*z,14,3)),!e.roofX&&!s&&(Ve(w=>.72-.52*w,(w,z)=>Ge-.12+.2*z,14,3),Ve(w=>-.28-.1*w,(w,z)=>-.1+(Ge+.06+.1)*z,2,6),Ve(w=>-.95-.4*w,(w,z)=>Ge-.1-.12*w+(.2+.2*w)*z,14,3)),e.senna&&(e.c8||v(S(ki(Z(-.5,e.cabinTop[e.cabinTop.length-1][0],40,.012),{caps:!0})),y),Ve(w=>.88-.3*w,(w,z)=>Ge-.14+.2*z,8,3));let at=new ue({color:"#2b2128",roughness:.8});if(!s)for(let w of[-.33,.33]){let z=e.seatDrop??0;v(new Fe(.5,.1,.46,2,.04),at,[-.3,.7-z,w]);let U=v(new Fe(.1,.5,.46,2,.04),at,[-.55,.93-z,w]);U.rotation.z=.2}s||v(new Fe(.4,.14,1.3,2,.05),at,[.5,.86,0]);let te=s?null:e.wedge?v(new zn(.1,.015,8,28),M,[.42,.8,-.33]):v(new zn(.14,.017,8,28),M,[.34,.95,-.33]);if(te&&(te.rotation.y=Math.PI/2,te.rotation.x=.35),n){let w=document.createElement("canvas");w.width=w.height=256;let z=w.getContext("2d");z.fillStyle="#efe8d8",z.fillRect(0,0,256,256),z.fillStyle="#17120f";for(let lt=0;lt<14;lt++){let xt=lt*20+4;z.beginPath(),z.moveTo(0,xt);for(let ut=1;ut<=8;ut++)z.lineTo(ut*32,xt+(ut%2?9:-2)+lt%3*2);for(let ut=8;ut>=0;ut--)z.lineTo(ut*32,xt+8+(ut%2?10:1)+lt%3*2);z.closePath(),z.fill()}let U=new ue({map:new Yt(w),roughness:.7}),B=new ue({color:e.interior??"#e8dcc0",roughness:.55}),X=n.floor;for(let[lt,xt]of[[-.18,.5],[-.78,.36]]){v(new Fe(xt,.2,1.5,3,.05),U,[lt,X+.12,0]);let ut=v(new Fe(.12,.42,1.5,3,.05),U,[lt-xt/2+.02,X+.4,0]);ut.rotation.z=.14}v(new Fe(.3,.22,1.56,3,.05),B,[n.x0-.15,X+.3,0]),v(new Fe(.3,.02,1.5,2,.01),U,[n.x0-.15,X+.42,0]),v(new Fe(.02,.07,.56,2,.01),_,[n.x0-.31,X+.34,-.38]);let O=new Ze;O.position.set(n.x0-.46,X+.5,-.38),O.rotation.z=-.45,t.add(O);let Q=new Y(new zn(.19,.017,8,32),B);Q.rotation.y=Math.PI/2,O.add(Q),O.add(new Y(new dt(.04,.04,.03,16).rotateZ(Math.PI/2),_));for(let lt=0;lt<5;lt++){let xt=new it(.014,.19,.022).translate(0,.095,0).rotateX(lt/5*Math.PI*2);O.add(new Y(xt,_))}R(new N(n.x0-.27,X+.3,-.38),new N(n.x0-.46,X+.5,-.38),.02,B);let ne=new yt({color:e.glass,roughness:.1,metalness:.1,transparent:!0,opacity:.32,side:st,depthWrite:!1}),_e=n.x0+.07,ve=_e-.42,Be=1.3,Ke=.93,ge=.87,ke=lt=>W(_e,lt)-.015;v(zt(10,1,(lt,xt)=>{let ut=(2*lt-1)*(Ke+(ge-Ke)*xt);return[_e+(ve-_e)*xt,ke(ut)+(Be-ke(ut))*xt,ut]}),ne);for(let lt of[1,-1])R(new N(_e,ke(lt*Ke),lt*Ke),new N(ve,Be,lt*ge),.018,_);R(new N(ve,Be,-ge),new N(ve,Be,ge),.018,_),v(zt(20,1,(lt,xt)=>{let ut=(2*lt-1)*Ke;return[_e-.02+.07*xt,ke(ut)+.012,ut]}),_);let Tt=new ue({color:"#10141c",roughness:.1,metalness:.8});for(let lt of[1,-1]){let xt=new N(_e-.02,ke(lt*.9)+.01,lt*.9),ut=new N(_e-.08,xt.y+.07,lt*1.06);R(xt,ut,.014,_),v(new ln(1,16,12).scale(.04,.055,.085).translate(ut.x-.01,ut.y+.02,ut.z+lt*.03),_),v(new Fe(.008,.07,.12,2,.003),Tt,[ut.x-.045,ut.y+.02,ut.z+lt*.03])}}let ae=new ue({color:"#10141c",roughness:.1,metalness:.8});for(let w of e.mirror||e.donk?[]:[1,-1]){let z=new N(.62,.86,w*.82),U=new N(.58,.95,w*.95),B=U.clone().sub(z);v(new dt(.016,.022,B.length(),10),M,z.clone().add(U).multiplyScalar(.5).toArray()).quaternion.setFromUnitVectors(new N(0,1,0),B.normalize());let O=new ln(1,20,14).scale(.07,.06,.125).translate(.56,.98,w*1);v(S(O),y),v(new Fe(.01,.075,.15,2,.004),ae,[.488,.98,w*1])}if(e.mirror&&!e.classic){let w=new ue({color:e.mirror,roughness:.35,metalness:.15});for(let z of[1,-1]){let X=new N(.7,W(.7,.8)-.03,z*.8),O=new N(.7-.02,X.y+.09,z*(.8+.13)),Q=O.clone().sub(X);v(new dt(.02,.026,Q.length(),10),w,X.clone().add(O).multiplyScalar(.5).toArray()).quaternion.setFromUnitVectors(new N(0,1,0),Q.normalize()),v(new ln(1,20,14).scale(.075,.055,.12).translate(O.x,O.y,O.z),w),v(new Fe(.01,.07,.14,2,.004),ae,[O.x-.074,O.y,O.z])}}let he=(w,z,U,B,X,O,Q=Iu,ne=3)=>Array.from({length:U},(_e,ve)=>{let Be=w+(z-w)*ve/(U-1);return{x:Be,W:B(Be),yB:X(Be),yT:O(Be),nUp:Q,nLo:ne}}),pe=e.bumper.front,me=e.bumper.rear,De=c(u),vt=a(u),le=w=>c(Math.min(w,u))+.004-(w>u?.1*((w-u)/(pe-u))**2:0),de=w=>.12+(w>u?.03*((w-u)/(pe-u)):0),xe=w=>w<=u?a(w)-.012:vt-.012-.38*(w-u),ye=e.senna?he(1.9,pe,30,le,de,xe,Iu,6):he(1.9,pe,30,le,de,xe);!e.classic&&!e.donk&&v(S(ki(ye,{caps:!0}),.1),y);let Ee=e.wedge?he(2.08,pe+.02,10,w=>le(w)-.1,()=>.1,()=>.15,4,4):he(2,pe+.035,12,w=>.74-.14*zi(2.1,pe+.035,w),()=>.085,()=>.13,4,4);!e.senna&&!e.classic&&!e.donk&&v(S(ki(Ee,{caps:!0}),.14),y);let Je=w=>c(Math.max(w,f))+.004-(w<f?.06*((f-w)/(f-me))**2:0),We=w=>w>=f?.56:.56-.05*((f-w)/(f-me)),nt=he(-1.95,me,24,Je,()=>.17,We);!e.classic&&!e.donk&&v(S(ki(nt,{caps:!0}),.12),y);let $e=pe-.004;if(e.classic){v(new Fe(.03,.78-.49+.03,1.76,2,.01),M,[u+.004,(.49+.78)/2,0]);for(let B=0;B<10;B++)v(new Fe(.036,.014,1.64,2,.006),_,[u+.01,.49+.022+B*.027,0]);v(new Fe(.04,.78-.49+.03,.035,2,.01),_,[u+.01,(.49+.78)/2,0]);for(let B of[1,-1])v(new Fe(.04,.78-.49+.03,.03,2,.01),_,[u+.01,(.49+.78)/2,B*.89]),v(new dt(.06,.06,.03,20).rotateZ(Math.PI/2),C("#efe9cf",.35),[u+.016,.6,B*.78]);v(ki(he(2.2,pe,40,B=>c(Math.min(B,u))+.016-(B>u?.1*((B-u)/(pe-u))**2:0),()=>.19,B=>.47-(B>u?.03*((B-u)/(pe-u)):0),5,5),{caps:!0}),_);for(let B of[1,-1])v(new Fe(.03,.06,.14,2,.012),C(e.tail,.5),[pe-.004,.33,B*.72])}else if(e.wedge){if(e.senna){let z=(O,Q,ne=0)=>v(new Mi(new Ot(O.map(([_e,ve])=>new fe(_e,ve)))).rotateY(-Math.PI/2).translate($e+ne,0,0),Q).material.side=st,U=new ue({color:"#101014",roughness:.7,metalness:.3});for(let O of[1,-1])e.c8?z([[O*.4,.39],[O*.6,.41],[O*.62,.25],[O*.45,.23]],U,.007):z([[O*.34,.37],[O*.55,.4],[O*.55,.21],[O*.42,.19]],U,.007),z([[O*.26,.4],[O*.57,.425],[O*.57,.41],[O*.26,.385]],M,.009);z(e.c8?[[-.22,.27],[.22,.27],[.18,.2],[-.18,.2]]:[[-.24,.26],[.24,.26],[.2,.18],[-.2,.18]],U,.007);let B=new Ot,X=(O,Q)=>[O,Q];B.moveTo(...X(pe-.4,.8)),B.lineTo(...X(pe-.08,.9)),B.lineTo(...X(pe+.06,.62)),B.lineTo(...X(pe+.06,-.62)),B.lineTo(...X(pe-.08,-.9)),B.lineTo(...X(pe-.4,-.8)),B.closePath(),v(S(new Zt(B,{depth:.022,bevelEnabled:!1}).rotateX(-Math.PI/2).translate(0,.095,0),.04),y),v(new Zt(B,{depth:.004,bevelEnabled:!1}).rotateX(-Math.PI/2).translate(0,.093,0),M)}e.senna||(v(new Fe(.02,.14,.78,2,.02),M,[$e,.27,0]),v(new Fe(.02,.04,1.1,2,.01),M,[$e-.004,.185,0]));let w=e.intake?C("#8d9aa8",.25):C("#eef3f8",.8);for(let z of[1,-1]){if(e.senna||(e.intake?(v(new Fe(.02,.17,.3,2,.02),M,[$e-.004,.29,z*.46]),v(new Fe(.02,.025,.42,2,.01),M,[$e-.004,.4,z*.45])):v(new Fe(.02,.1,.16,2,.02),M,[$e-.004,.27,z*.5])),e.hlWing){let U=(O,Q,ne,_e)=>{let ve=e.senna,Be=ve?(e.c8?.16:.115)*(1-.8*O**3):.04+.17*O,Ke=ve?e.c8?2.1-.06*O:2.17-.1*O:2.15-.22*O,ge=Ke-Be*(1-Q)+ne*(2*Q-1),ke=ve?.3:.27,Tt=z*(ke-ne+((ve?e.c8?.52:.44:.53)+2*ne)*O);return[ge,W(ge,Tt)+_e,Tt]},B=(O,Q,ne,_e)=>v(zt(8,2,(ve,Be)=>{let Ke=ge=>O[0][ge]+ve*(O[1][ge]-O[0][ge])+Be*(O[2][ge]-O[0][ge])+ve*Be*(O[3][ge]-O[1][ge]-O[2][ge]+O[0][ge]);return U(Ke(0),Ke(1),Q,ne)}),_e).material.side=st,X=(O,Q,ne,_e)=>[[O,ne],[Q,ne],[O,_e],[Q,_e]];B(X(0,1,0,1),.012,.003,M),B(X(0,1,0,1),0,.006,C("#222d39",.15)),B(X(.4,.64,.25,.7),0,.008,C("#3d4a59",.3)),B(X(.7,.94,.25,.7),0,.008,C("#3d4a59",.3)),B(X(.04,1,.88,.95),0,.01,C("#f4f8ff",1)),B([[.3,.86],[.36,.86],[.5,.2],[.56,.2]],0,.01,C("#f4f8ff",.9));continue}for(let[U,B,X]of[[.016,.003,M],[0,.006,w]]){let O=zt(18,4,(Q,ne)=>{let _e=e.lampTh??.05,ve=_e-.56*_e*Q,Be=2.12-.22*Q**1.2,Ke=.3-U+(.46+2*U)*Q,ge=Be+(ne-.5)*(ve+2*U),ke=z*Ke;return[ge,W(ge,ke)+B,ke]});v(O,X).material.side=st}}}else if(!e.donk){v(new Fe(.02,.11,1,2,.008),M,[$e,.29,0]),v(new Fe(.02,.035,1.1,2,.01),M,[$e-.012,.18,0]);let w=C(e.foglamp,.6),z=C("#e8892b",.5),U=C("#eceff2",.3);for(let B of[1,-1]){v(new Fe(.02,.1,.19,2,.015),w,[$e+.002,.3,B*.55]),v(new Fe(.02,.075,.1,2,.012),U,[$e-.014,.3,B*.66]),v(new Fe(.02,.04,.12,2,.01),z,[$e-.03,.39,B*.6]);for(let[X,O,Q]of[[.022,.005,M],[0,.013,null]]){let ne=zt(14,14,(_e,ve)=>{let Be=1.58+.42*_e+(_e-.5)*2*X,Ke=.44+.05*_e,ge=.84-.04*_e,ke=B*(Ke+(ge-Ke)*ve+(ve-.5)*2*X);return[Be,W(Be,ke)+O,ke]});v(Q?ne:S(ne),Q??y).material.side=st}}}if(e.louver){let w=e.louver,z=(a(w.x0+.02)-a(w.x0-.02))/.04;v(zt(2,2,(B,X)=>{let O=w.x0-.04+(w.x1-w.x0+.08)*B,Q=-w.hw-.03+(2*w.hw+.06)*X;return[O,W(O,Q)+.004,Q]}),M);let U=new ue({color:w.color,roughness:.4,metalness:.2});for(let B=w.x0+.02;B<w.x1;B+=.045){let X=v(new it(.026,.014,2*w.hw),U,[B,W(B,0)+.008,0]);X.rotation.z=Math.atan(z)}}let D=e.strakes,Ue=(w,z,U)=>{let B=1-.28*w;return[D.x0+(D.x1-D.x0)*w,.4+z*.44*B,.4+U*.44*B]};for(let w of[1,-1]){let z=(B,X,O,Q)=>{let ne=zt(24,2,(_e,ve)=>{let[Be,Ke,ge]=Ue(_e,B,X),ke=Ke+(ge-Ke)*ve;return[Be,ke,w*(j(Be,ke)+O)]});v(Q?ne:S(ne),Q??y).material.side=st};if(e.strakes){z(0,1,.012,M);for(let B=0;B<6;B++)z(.04+B*.16,.04+B*.16+.1,.03,null)}let U=(B,X,O)=>{v(zt(1,10,(Q,ne)=>{let _e=X+(O-X)*ne,ve=B[0]+(B[1]-B[0])*ne+(Q-.5)*.008;return[ve,_e,w*(j(ve,_e)+.002)]}),M)};if(e.wedge)if(U([.8,.72],.3,.78),U([-.55,-.5],.3,.78),e.senna&&!e.c8){let B=(O,Q)=>zt(14,6,(ne,_e)=>{let ve=.55+O*.03-(.97+2*O*.03)*ne,Be=.8+O*.03,Ke=.64-.14*ne-O*.03,ge=Ke+(Be-Ke)*_e;return[ve,ge,w*(j(ve,ge)+Q)]});v(S(B(1,.006)),y).material.side=st,v(B(0,.012),T).material.side=st;let X=(O,Q)=>zt(28,1,(ne,_e)=>{let ve=2*Math.PI*ne,Be=_e*O,Ke=-.7+.14*Be*Math.cos(ve)-.08*Be*Math.sin(ve),ge=.5+.2*Be*Math.sin(ve);return[Ke,ge,w*(j(Ke,ge)+Q)]});v(S(X(1.16,.004)),y).material.side=st,v(X(1,.022),new Gt({color:"#0d0d12",side:st})).material.side=st}else if(e.c8){let B=(X,O)=>zt(10,4,(Q,ne)=>{X<1&&(Q=.14+.72*Q,ne=.2+.6*ne);let _e=-.52-.55*Q,ve=.4+.03*Q,Be=.76-.15*Q,Ke=ve+(Be-ve)*ne;return[_e,Ke,w*(j(_e,Ke)+O)]});v(S(B(1,.012)),y).material.side=st,v(B(.7,.026),new ue({color:"#15151a",roughness:.8,metalness:.4,side:st}))}else v(zt(6,4,(B,X)=>{let O=e.intake,Q=e.c8?-.55-.5*B:O?-.6-.4*B:-.62-.3*B,ne=e.c8?.4+.05*B+(.4-.2*B)*X:O?.4+.08*B+(.2+.1*B)*X:.42+.28*X;return[Q,ne,w*(j(Q,ne)+.012)]}),M).material.side=st;else if(e.classic){U([.5,.46],.3,.96),U([-.95,-.99],.3,.96);let B=(O,Q,ne,_e,ve,Be)=>v(zt(40,1,(Ke,ge)=>{let ke=O+(Q-O)*Ke,Tt=ne+(_e-ne)*ge;return[ke,Tt,w*(j(ke,Tt)+ve)]}),Be);B(2.3,-2.5,.9,.925,.006,_),B(1.1,-1.1,.25,.285,.006,_);let X=(O,Q,ne,_e)=>zt(30,1,(ve,Be)=>{let Ke=Math.PI*ve,ge=O+(Q-O)*Be,ke=ne+ge*Math.cos(Ke),Tt=e.wheelR+ge*Math.sin(Ke);return[ke,Tt,w*(j(ke,Tt)+_e)]});for(let O of e.axleX)v(S(X(I-.005,I+.055,O,.02)),y).material.side=st,v(X(I+.055,I+.085,O,.012),M)}else e.donk||(U([.62,.55],.3,.9),U([.2,.22],.3,.9))}let Xe=f-.008,L=new ue({color:"#c6a24a",roughness:.25,metalness:.9});if(e.classic){v(ki(he(-2.3,me,36,z=>c(Math.max(z,f))+.016-(z<f?.08*((f-z)/(f-me))**2:0),()=>.19,z=>.47-(z<f?.03*((f-z)/(f-me)):0),5,5),{caps:!0}),_);for(let z of[1,-1])v(new Fe(.03,.08,.5,2,.015),C(e.tail,.5),[Xe-.004,.72,z*.52]),v(new Fe(.03,.06,.14,2,.012),C(e.tail,.5),[me+.004,.33,z*.72]);v(new Fe(.03,.035,.7,2,.01),_,[Xe-.004,.72,0])}else if(e.wedge){v(zt(2,2,(U,B)=>{let X=-1.85-.3*U,O=-.4+.8*B;return[X,W(X,O)+.004,O]}),M),e.c8||v(new it(.03,.16,1.4),M,[Xe,.65,0]);let w=C(e.tail,.9);for(let U of[1,-1])if(e.c8){v(new Fe(.03,.15,.44,2,.01),M,[Xe-.004,.68,U*.45]);for(let B of[.34,.54])v(new Fe(.03,.1,.16,2,.008),w,[Xe-.014,.685,U*B])}else v(new Fe(.02,.04,.4,2,.012),w,[Xe-.016,.71,U*.5]);e.c8||v(new Fe(.02,.09,1.1,2,.01),M,[me+.008,.4,0]),v(new Fe(.02,.1,.8,2,.01),M,[me+.008,.27,0]);let z=new ue({color:"#7d8087",roughness:.3,metalness:.9});if(e.c8)for(let U of[1,-1])for(let B of[.16,.34])v(new dt(.035,.035,.14,18).rotateZ(Math.PI/2),z,[me+0,.27,U*B]);else for(let U of[1,-1])v(new dt(.04,.04,.16,18).rotateZ(Math.PI/2),z,[me+0,.27,U*.22])}else if(!e.donk){v(new it(.03,.26,1.68),M,[Xe,.68,0]),v(new Fe(.02,.11,1.3,2,.01),M,[me+.008,.36,0]);let w=C(e.tail,.35);for(let z of[1,-1])for(let U of[.25,.45,.65])v(new dt(.1,.1,.035,24).rotateZ(Math.PI/2),M,[Xe-.004,.69,z*U]),v(new dt(.078,.078,.04,24).rotateZ(Math.PI/2),w,[Xe-.014,.69,z*U]);for(let z of[1,-1])v(new dt(.04,.04,.2,16).rotateZ(Math.PI/2),L,[me-0,.12,z*.3])}if(e.donk){let w=new ue({color:e.rim,roughness:.3,metalness:1,emissive:e.rim,emissiveIntensity:.12}),z=new ue({color:"#141416",roughness:.6,metalness:.1}),U=(ge,ke,Tt,lt,xt,ut=.008)=>v(new Fe(ge,ke,Tt,2,Math.min(ut,ge/2,ke/2,Tt/2)*.99),lt,xt),B=(ge,ke,Tt,lt)=>v(new dt(ge,ge,ke,24).rotateZ(Math.PI/2),Tt,lt),X=u,O=f,Q=pe-u;Ve(ge=>e.cabinTop[0][0]-.02-.58*ge,(ge,ke)=>Ge-.14+.22*ke,14,3),Ve(ge=>-.72-.56*ge,(ge,ke)=>-.35+(Ge+.43)*ke,16,6);for(let ge of[1,-1]){let ke=zt(30,2,(Tt,lt)=>{let xt=Se[0]+.5-(Se[0]+.5- -.55)*Tt,ut=Z(xt,xt,2,.02)[0],[Jt,Pn]=Nu(ut,Ge-.01-.035*lt);return[xt,Pn,ge*Jt]});v(ke,w)}for(let ge of[1,-1]){v(zt(40,2,(xn,Qn)=>{let In=.78-2.1*xn,Vn=ge*(d(In)+.02+.03*Qn);return[In,W(In,Math.abs(Vn))+.004,Vn]}),w).material.side=st;let ke=e.donk.belt,Tt=[[u-.03,e.axleX[0]+I+.03],[e.axleX[0]-I-.03,e.axleX[1]+I+.03],[e.axleX[1]-I-.03,f+.03]];for(let[xn,Qn]of Tt)v(zt(30,1,(In,Vn)=>{let Un=xn+(Qn-xn)*In,ei=ke-.012+.024*Vn;return[Un,ei,ge*(j(Un,ei)+.004)]}),w).material.side=st;for(let xn of e.axleX){let Qn=Math.asin(Ut.clamp((l(xn)+.02-e.wheelR)/I,-1,1));v(zt(32,1,(In,Vn)=>{let Un=Qn+(Math.PI-2*Qn)*In,ei=I+.004+.022*Vn,Br=xn+ei*Math.cos(Un),ta=e.wheelR+ei*Math.sin(Un);return[Br,ta,ge*(j(Br,ta)+.004)]}),w).material.side=st}for(let[xn,Qn]of[[.77,.74],[-.52,-.47]])v(zt(1,12,(In,Vn)=>{let Un=l(xn)+.03+(a(xn)-l(xn)-.05)*Vn,ei=xn+(Qn-xn)*Vn+(In-.5)*.008;return[ei,Un,ge*(j(ei,Un)+.003)]}),M);let lt=.6,xt=d(lt)+.05,ut=new N(lt,W(lt,xt),ge*xt),Jt=new N(lt-.01,ut.y+.1,ge*(xt+.07)),Pn=Jt.clone().sub(ut);v(new dt(.014,.02,Pn.length(),10),w,ut.clone().add(Jt).multiplyScalar(.5).toArray()).quaternion.setFromUnitVectors(new N(0,1,0),Pn.normalize()),U(.05,.08,.13,w,[Jt.x,Jt.y+.02,Jt.z],.015),U(.006,.066,.115,ae,[Jt.x-.026,Jt.y+.02,Jt.z],.003)}let ne=.835,_e=.2,ve=.44;U(.02,_e,2*ve,M,[X,ne,0],.004),U(.03,.025,2*ve+.04,w,[X+.006,ne+_e/2,0]),U(.03,.02,2*ve+.04,w,[X+.006,ne-_e/2,0]);for(let ge=0;ge<=6;ge++)U(.02,_e,.01,w,[X+.008,ne,-ve+2*ve*ge/6],.003);for(let ge=0;ge<9;ge++)U(.016,.007,2*ve,w,[X+.006,ne-_e/2+.02+ge*(_e-.04)/8,0],.003);for(let ge of[1,-1]){U(.03,.15,.33,w,[X+.006,ne+.025,ge*(ve+.175)],.012),U(.02,.13,.31,M,[X+.016,ne+.025,ge*(ve+.175)],.006);for(let ke of[ve+.095,ve+.255])B(.064,.03,w,[X+.02,ne+.025,ge*ke]),B(.054,.03,new yt({color:"#cfd6de",roughness:.08,metalness:.3,clearcoat:1,emissive:"#fff6e0",emissiveIntensity:.12}),[X+.03,ne+.025,ge*ke]);U(.025,.045,.33,M,[X+.004,ne-.075,ge*(ve+.175)],.004);for(let ke of[-1,0,1])U(.02,.006,.31,w,[X+.012,ne-.075+ke*.014,ge*(ve+.175)],.002)}let Be=(ge,ke)=>{let lt=ge+ke*Q/2,xt=c(ge)+.03;U(Q+.04,.19,2*xt-.02,w,[lt-ke*.02,.63,0],.04);for(let Jt of[1,-1])U(.34,.17,.05,w,[ge-ke*.15,.63,Jt*(c(ge-ke*.15)-.012)],.02);let ut=ge+ke*Q;U(.014,.05,2*xt-.1,z,[ut,.63+.06,0],.01),U(.014,.022,2*xt-.1,z,[ut,.63+.012,0],.006);for(let Jt of[1,-1]){U(.05,.21,.045,z,[ut+ke*.012,.63-.005,Jt*.42],.012),U(.012,.045,.14,C(ke>0?"#eeeee6":"#c9201f",.3),[ut,.63-.045,Jt*(xt-.12)],.006),U(.012,.055,.28,M,[ut,.63-.045,Jt*.23],.004);for(let Pn of[-1,0,1])U(.014,.006,.27,w,[ut+ke*.002,.63-.045+Pn*.016,Jt*.23],.002)}};Be(X,1),Be(O,-1);for(let ge of[1,-1]){U(.024,.14,.5,w,[O-.004,.86,ge*.5],.01),U(.02,.115,.47,C(e.tail,.45),[O-.012,.86,ge*.5],.008);for(let ke of[.38,.62])U(.02,.115,.008,w,[O-.016,.86,ge*ke],.002)}U(.02,.12,.48,M,[O-.002,.86,0],.004),U(.012,.09,.2,C("#e8e2c8",.1),[O-.01,.86,0],.004),v(new dt(.008,.014,.05,10),w,[u-.12,a(u-.12)+.02,0]),U(u-f-.6,.08,1,M,[(u+f)/2,l(0)-.03,0],.02);for(let ge of[0,1]){let ke=v(new dt(.045,.045,2*e.track[ge]-.1,14).rotateX(Math.PI/2),M,[e.axleX[ge],e.wheelR,0]);ke.castShadow=!1}for(let ge of[0,1])for(let ke of[1,-1]){let Tt=new N(e.axleX[ge],e.wheelR,ke*(e.track[ge]-.35)),lt=new N(e.axleX[ge],l(e.axleX[ge])-.03,ke*.42),xt=lt.clone().sub(Tt);v(new dt(.035,.035,xt.length(),10),M,Tt.clone().add(lt).multiplyScalar(.5).toArray()).quaternion.setFromUnitVectors(new N(0,1,0),xt.normalize())}let Ke=new ue({color:"#8a8d94",roughness:.3,metalness:.9});for(let ge of[1,-1])B(.035,.5,Ke,[O+.15,l(O+.15)-.03,ge*.45])}let b=new ue({color:"#141416",roughness:.85,side:st}),q=new ue({color:e.rim,roughness:e.donk?.2:.35,metalness:e.donk?1:.85,...e.donk?{emissive:e.rim,emissiveIntensity:.12}:{}}),J=new ue({color:"#25272b",roughness:.5,metalness:.7}),re=new ue({color:e.caliper,roughness:.4}),Me=new Ot,be=e.wheelR*(e.rimFrac??.64),oe=e.spokeW??1;Me.moveTo(.03,-.04*oe),Me.lineTo(be-.01,-.07*oe),Me.lineTo(be-.01,.07*oe),Me.lineTo(.03,.04*oe),Me.closePath();let ce=new Zt(Me,{depth:.03,bevelEnabled:!1}),Re=new ue({color:"#efe8d4",roughness:.7,side:st}),qe=w=>{let z=e.wheelR,U=new Ze,B=w/2,X=.03;U.add(new Y(new dt(z,z,w-2*X,48,1,!0).rotateX(Math.PI/2),b));for(let Ke of[1,-1]){let ge=new Y(new es(be,z-X,48),b);if(ge.position.z=Ke*B,U.add(ge),e.wire){let Tt=new Y(new es(be*1.06,z*.82,48),Re);Tt.position.z=Ke*(B+.002),Ke<0&&(Tt.rotation.y=Math.PI),U.add(Tt)}let ke=new Y(new zn(z-X,X,10,48),b);ke.position.z=Ke*(B-X),U.add(ke)}let O=new Y(new dt(be,be,w*.92,36,1,!0).rotateX(Math.PI/2),J);O.material.side=st,U.add(O);let Q=new Y(new On(be,36),J);Q.position.z=B-.05,U.add(Q);let ne=new Y(new zn(be,e.donk?.024:.013,8,40),q);ne.position.z=B-.02,U.add(ne);for(let Ke=0;Ke<e.spokes;Ke++){let ge=new Y(ce,q);ge.position.z=B-.06,ge.rotation.z=Ke/e.spokes*Math.PI*2+.2,U.add(ge)}let _e=new Y(new dt(.05,.05,.04,20).rotateX(Math.PI/2),e.c8?q:L);_e.position.z=B-.045,U.add(_e);let ve=new Y(new dt(be*.82,be*.82,.02,32).rotateX(Math.PI/2),q);ve.position.z=B-.16,U.add(ve);let Be=new Y(new Fe(.14,.08,.06,2,.015),re);return Be.position.set(.1,.1,B-.14),Be.rotation.z=.8,U.add(Be),U},Ae=new Y(new On(I,32,0,Math.PI),M);if([0,1].forEach(w=>{let z=e.axleX[w],U=e.tireW[w],B=e.track[w];for(let X of[1,-1]){let O=qe(U);O.position.set(z,e.wheelR,X*B),X<0&&(O.rotation.y=Math.PI),t.add(O);let Q=Ae.clone();Q.position.set(z,e.wheelR,X*(B-U/2-.02)),Q.rotation.y=X>0?0:Math.PI,t.add(Q)}}),e.wing){let w=e.wing,z=w.chord,U=-.07,B=new Ot;B.moveTo(z/2,-.006),B.quadraticCurveTo(z*.1,.05,-z/2,.022),B.lineTo(-z/2,.006),B.quadraticCurveTo(0,-.012,z/2,-.006);let X=new Zt(B,{depth:2*w.hw,bevelEnabled:!1}).translate(0,0,-w.hw);if(X.rotateZ(e.c8?-.2:U),X.translate(w.x,e.c8?W(w.x,w.hw)+.012:w.y,0),v(S(X,.3),y),!e.c8)for(let O of[1,-1]){let Q=O*w.strutZ,ne=new N(w.strutX[0],W(w.strutX[0],Q)-.05,Q),_e=new N(w.strutX[1],w.y-.012,Q),ve=_e.clone().sub(ne),Be=new it(.1,ve.length(),.035);Be.applyQuaternion(new Mn().setFromUnitVectors(new N(0,1,0),ve.clone().normalize())),Be.translate(...ne.clone().add(_e).multiplyScalar(.5).toArray()),v(S(Be,.3),y),v(new it(z*(e.c8?.6:.8),e.c8?.07:.11,.012),M,[w.x,w.y+0,O*(w.hw+.004)])}}if(e.lightbar){let w=e.lightbar,z=h(w.x)+.06;v(new Fe(.2,.05,2*w.hw,2,.015),M,[w.x,z,0]);for(let[B,X]of[[1,w.a],[-1,w.b]])v(new Fe(.208,.06,w.hw-.05,2,.02),C(X,1.3),[w.x,z+.004,B*w.hw/2]);let U=B=>{let X=a(w.x)-e.cabinDrop,O=h(w.x)+.012,Q=d(w.x)+.012;return(X+O)/2+(O-X)/2*(1-Math.min(1,Math.abs(B)/Q)**3)**(1/3)};for(let B of[-.45,-.15,.15,.45]){let X=U(B)-.01,O=z-.02-X;v(new it(.06,O,.05),M,[w.x,X+O/2,B])}}if(e.underglow){let w=C(e.underglow,1.8);w.side=st;let z=(O,Q,ne,_e,ve)=>(Q+ne)/2-(ne-Q)/2*(1-Math.min(1,Math.abs(ve)/O)**_e)**(1/_e)-.004;for(let O of[1,-1])v(zt(12,6,(Q,ne)=>{let _e=-.85+1.7*Q,ve=.66+.15*ne,Be=V(_e);return[_e,z(Be.W,Be.yB,Be.yT,d0,ve),O*ve]}),w);v(zt(2,12,(O,Q)=>{let ne=pe-.26+.05*O,_e=-.5+Q;return[ne,z(le(ne),de(ne),xe(ne),3,_e),_e]}),w),v(zt(2,12,(O,Q)=>{let ne=me+.2+.05*O,_e=-.5+Q;return[ne,z(Je(ne),.17,We(ne),3,_e),_e]}),w);let U=document.createElement("canvas");U.width=560,U.height=290;let B=U.getContext("2d");B.shadowColor=e.underglow,B.shadowBlur=34,B.shadowOffsetX=5e3,B.strokeStyle=e.underglow,B.lineWidth=16,B.beginPath(),B.roundRect(-4900,70,360,150,50),B.stroke(),B.stroke();let X=new Y(new Ct(5.6,2.9).rotateX(-Math.PI/2),new Gt({map:new Yt(U),transparent:!0,depthWrite:!1,opacity:.85}));X.position.y=.004,t.add(X)}let Te=document.createElement("canvas");Te.width=Te.height=128;let ze=Te.getContext("2d"),je=ze.createRadialGradient(64,64,4,64,64,62);je.addColorStop(0,"rgba(0,0,0,.55)"),je.addColorStop(1,"rgba(0,0,0,0)"),ze.fillStyle=je,ze.fillRect(0,0,128,128);let ht=new Y(new Ct(5.2,2.6).rotateX(-Math.PI/2),new Gt({map:new Yt(Te),transparent:!0,depthWrite:!1}));return ht.position.y=.002,t.add(ht),{object:t,fitSize:e.fit??4,pose:{x:12,y:-32},turntable:{minDeg:2,maxDeg:25},envIntensity:.5,exposure:.8,look:{sun:.6}}}});An();var m0={vinyl:async i=>(await Promise.resolve().then(()=>(Hf(),Of))).vinylModel(i),box:async i=>(await Promise.resolve().then(()=>(Gf(),kf))).boxModel(i),magazine:async i=>(await Promise.resolve().then(()=>(qf(),Xf))).magazineModel(i),postcard:async i=>(await Promise.resolve().then(()=>(Jf(),Zf))).postcardModel(i),mailer:async()=>(await Promise.resolve().then(()=>(np(),tp))).mailerModel(),sign:async()=>(await Promise.resolve().then(()=>(pc(),up))).signModel(),football:async i=>(await Promise.resolve().then(()=>(pu(),pp))).footballModel(i),basketball:async()=>(await Promise.resolve().then(()=>(Ep(),bp))).basketballModel(),blimp:async()=>(await Promise.resolve().then(()=>(Rp(),wp))).blimpModel(),trailer:async()=>(await Promise.resolve().then(()=>(Lp(),Ip))).trailerModel(),biplane:async()=>(await Promise.resolve().then(()=>(Up(),Dp))).biplaneModel(),bus:async i=>(await Promise.resolve().then(()=>(Gp(),kp))).busModel(i),standee:async i=>(await Promise.resolve().then(()=>(Qp(),jp))).standeeModel(i),sneaker:async()=>(await Promise.resolve().then(()=>(h0(),c0))).sneakerModel(),car:async i=>(await Promise.resolve().then(()=>(p0(),f0))).carModel(i?.preset)},g0=(i,e)=>(m0[i]??m0.vinyl)(e);var ib=1.2;async function YT(i,e,t){let n=Bf(i,await g0(e,t),e==="sign"?.9:ib);return e==="mailer"&&setTimeout(()=>n.setVariant(1),1200),n}export{YT as mount};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
