(self.webpackChunkgarden_by=self.webpackChunkgarden_by||[]).push([[691],{7228:function(e){e.exports=function(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n},e.exports.__esModule=!0,e.exports.default=e.exports},2858:function(e){e.exports=function(e){if(Array.isArray(e))return e},e.exports.__esModule=!0,e.exports.default=e.exports},3646:function(e,t,r){var n=r(7228);e.exports=function(e){if(Array.isArray(e))return n(e)},e.exports.__esModule=!0,e.exports.default=e.exports},9713:function(e){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e},e.exports.__esModule=!0,e.exports.default=e.exports},6860:function(e){e.exports=function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)},e.exports.__esModule=!0,e.exports.default=e.exports},3884:function(e){e.exports=function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,a,i=[],o=!0,s=!1;try{for(r=r.call(e);!(o=(n=r.next()).done)&&(i.push(n.value),!t||i.length!==t);o=!0);}catch(l){s=!0,a=l}finally{try{o||null==r.return||r.return()}finally{if(s)throw a}}return i}},e.exports.__esModule=!0,e.exports.default=e.exports},521:function(e){e.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},8206:function(e){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},e.exports.__esModule=!0,e.exports.default=e.exports},3038:function(e,t,r){var n=r(2858),a=r(3884),i=r(379),o=r(521);e.exports=function(e,t){return n(e)||a(e,t)||i(e,t)||o()},e.exports.__esModule=!0,e.exports.default=e.exports},319:function(e,t,r){var n=r(3646),a=r(6860),i=r(379),o=r(8206);e.exports=function(e){return n(e)||a(e)||i(e)||o()},e.exports.__esModule=!0,e.exports.default=e.exports},379:function(e,t,r){var n=r(7228);e.exports=function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}},e.exports.__esModule=!0,e.exports.default=e.exports},5658:function(e){"use strict";var t="%[a-f0-9]{2}",r=new RegExp(t,"gi"),n=new RegExp("("+t+")+","gi");function a(e,t){try{return decodeURIComponent(e.join(""))}catch(i){}if(1===e.length)return e;t=t||1;var r=e.slice(0,t),n=e.slice(t);return Array.prototype.concat.call([],a(r),a(n))}function i(e){try{return decodeURIComponent(e)}catch(i){for(var t=e.match(r),n=1;n<t.length;n++)t=(e=a(t,n).join("")).match(r);return e}}e.exports=function(e){if("string"!=typeof e)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var r={"%FE%FF":"��","%FF%FE":"��"},a=n.exec(e);a;){try{r[a[0]]=decodeURIComponent(a[0])}catch(t){var o=i(a[0]);o!==a[0]&&(r[a[0]]=o)}a=n.exec(e)}r["%C2"]="�";for(var s=Object.keys(r),l=0;l<s.length;l++){var u=s[l];e=e.replace(new RegExp(u,"g"),r[u])}return e}(e)}}},3297:function(e){"use strict";e.exports=function(e,t){for(var r={},n=Object.keys(e),a=Array.isArray(t),i=0;i<n.length;i++){var o=n[i],s=e[o];(a?-1!==t.indexOf(o):t(o,s,e))&&(r[o]=s)}return r}},2163:function(e,t,r){"use strict";var n=r(9713),a=r(3038),i=r(319);function o(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(!e)return;if("string"==typeof e)return s(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(e,t)}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,a=function(){};return{s:a,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,o=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return o=e.done,e},e:function(e){l=!0,i=e},f:function(){try{o||null==r.return||r.return()}finally{if(l)throw i}}}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l=r(4159),u=r(5658),c=r(187),d=r(3297),f=Symbol("encodeFragmentIdentifier");function p(e){if("string"!=typeof e||1!==e.length)throw new TypeError("arrayFormatSeparator must be single character string")}function m(e,t){return t.encode?t.strict?l(e):encodeURIComponent(e):e}function g(e,t){return t.decode?u(e):e}function h(e){return Array.isArray(e)?e.sort():"object"==typeof e?h(Object.keys(e)).sort((function(e,t){return Number(e)-Number(t)})).map((function(t){return e[t]})):e}function y(e){var t=e.indexOf("#");return-1!==t&&(e=e.slice(0,t)),e}function b(e){var t=(e=y(e)).indexOf("?");return-1===t?"":e.slice(t+1)}function v(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):!t.parseBooleans||null===e||"true"!==e.toLowerCase()&&"false"!==e.toLowerCase()||(e="true"===e.toLowerCase()),e}function x(e,t){p((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);var r=function(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=r):n[e]=r};case"bracket":return function(e,r,n){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"colon-list-separator":return function(e,r,n){t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};case"comma":case"separator":return function(t,r,n){var a="string"==typeof r&&r.includes(e.arrayFormatSeparator),i="string"==typeof r&&!a&&g(r,e).includes(e.arrayFormatSeparator);r=i?g(r,e):r;var o=a||i?r.split(e.arrayFormatSeparator).map((function(t){return g(t,e)})):null===r?r:g(r,e);n[t]=o};case"bracket-separator":return function(t,r,n){var a=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),a){var i=null===r?[]:r.split(e.arrayFormatSeparator).map((function(t){return g(t,e)}));void 0!==n[t]?n[t]=[].concat(n[t],i):n[t]=i}else n[t]=r?g(r,e):r};default:return function(e,t,r){void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}(t),n=Object.create(null);if("string"!=typeof e)return n;if(!(e=e.trim().replace(/^[?#&]/,"")))return n;var i,s=o(e.split("&"));try{for(s.s();!(i=s.n()).done;){var l=i.value;if(""!==l){var u=c(t.decode?l.replace(/\+/g," "):l,"="),d=a(u,2),f=d[0],m=d[1];m=void 0===m?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?m:g(m,t),r(g(f,t),m,n)}}}catch(k){s.e(k)}finally{s.f()}for(var y=0,b=Object.keys(n);y<b.length;y++){var x=b[y],S=n[x];if("object"==typeof S&&null!==S)for(var w=0,E=Object.keys(S);w<E.length;w++){var I=E[w];S[I]=v(S[I],t)}else n[x]=v(S,t)}return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((function(e,t){var r=n[t];return Boolean(r)&&"object"==typeof r&&!Array.isArray(r)?e[t]=h(r):e[t]=r,e}),Object.create(null))}t.extract=b,t.parse=x,t.stringify=function(e,t){if(!e)return"";p((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);for(var r=function(r){return t.skipNull&&null==e[r]||t.skipEmptyString&&""===e[r]},n=function(e){switch(e.arrayFormat){case"index":return function(t){return function(r,n){var a=r.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(i(r),null===n?[[m(t,e),"[",a,"]"].join("")]:[[m(t,e),"[",m(a,e),"]=",m(n,e)].join("")])}};case"bracket":return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(i(r),null===n?[[m(t,e),"[]"].join("")]:[[m(t,e),"[]=",m(n,e)].join("")])}};case"colon-list-separator":return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(i(r),null===n?[[m(t,e),":list="].join("")]:[[m(t,e),":list=",m(n,e)].join("")])}};case"comma":case"separator":case"bracket-separator":var t="bracket-separator"===e.arrayFormat?"[]=":"=";return function(r){return function(n,a){return void 0===a||e.skipNull&&null===a||e.skipEmptyString&&""===a?n:(a=null===a?"":a,0===n.length?[[m(r,e),t,m(a,e)].join("")]:[[n,m(a,e)].join(e.arrayFormatSeparator)])}};default:return function(t){return function(r,n){return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:[].concat(i(r),null===n?[m(t,e)]:[[m(t,e),"=",m(n,e)].join("")])}}}}(t),a={},o=0,s=Object.keys(e);o<s.length;o++){var l=s[o];r(l)||(a[l]=e[l])}var u=Object.keys(a);return!1!==t.sort&&u.sort(t.sort),u.map((function(r){var a=e[r];return void 0===a?"":null===a?m(r,t):Array.isArray(a)?0===a.length&&"bracket-separator"===t.arrayFormat?m(r,t)+"[]":a.reduce(n(r),[]).join("&"):m(r,t)+"="+m(a,t)})).filter((function(e){return e.length>0})).join("&")},t.parseUrl=function(e,t){t=Object.assign({decode:!0},t);var r=c(e,"#"),n=a(r,2),i=n[0],o=n[1];return Object.assign({url:i.split("?")[0]||"",query:x(b(e),t)},t&&t.parseFragmentIdentifier&&o?{fragmentIdentifier:g(o,t)}:{})},t.stringifyUrl=function(e,r){r=Object.assign(n({encode:!0,strict:!0},f,!0),r);var a=y(e.url).split("?")[0]||"",i=t.extract(e.url),o=t.parse(i,{sort:!1}),s=Object.assign(o,e.query),l=t.stringify(s,r);l&&(l="?".concat(l));var u=function(e){var t="",r=e.indexOf("#");return-1!==r&&(t=e.slice(r)),t}(e.url);return e.fragmentIdentifier&&(u="#".concat(r[f]?m(e.fragmentIdentifier,r):e.fragmentIdentifier)),"".concat(a).concat(l).concat(u)},t.pick=function(e,r,a){a=Object.assign(n({parseFragmentIdentifier:!0},f,!1),a);var i=t.parseUrl(e,a),o=i.url,s=i.query,l=i.fragmentIdentifier;return t.stringifyUrl({url:o,query:d(s,r),fragmentIdentifier:l},a)},t.exclude=function(e,r,n){var a=Array.isArray(r)?function(e){return!r.includes(e)}:function(e,t){return!r(e,t)};return t.pick(e,a,n)}},187:function(e){"use strict";e.exports=function(e,t){if("string"!=typeof e||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];var r=e.indexOf(t);return-1===r?[e]:[e.slice(0,r),e.slice(r+t.length)]}},4159:function(e){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,(function(e){return"%".concat(e.charCodeAt(0).toString(16).toUpperCase())}))}},9997:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return x}});var n=r(7294),a=r(9925),i=r(2163),o=r(9694),s=r(8706),l=r(5444),u=r(1496),c=a.default.article.withConfig({displayName:"PostItem__PostItemBlock",componentId:"sc-1b7lpii-0"})(["background-color:",";h2{margin:0;font-size:1.2rem;}p{font-size:0.8rem;}a{color:",";text-decoration:none;}margin:1rem;box-shadow:rgba(17,17,26,0.05) 0px 4px 16px,rgba(17,17,26,0.05) 0px 8px 32px;"],(function(e){return e.theme.color.white}),(function(e){return e.theme.color.black})),d=a.default.div.withConfig({displayName:"PostItem__Contents",componentId:"sc-1b7lpii-1"})(["padding:1.4rem 1rem;"]),f=a.default.p.withConfig({displayName:"PostItem__Summary",componentId:"sc-1b7lpii-2"})(["margin-top:0.6rem;color:",";line-height:1.66;"],(function(e){return e.theme.color.gray8})),p=a.default.p.withConfig({displayName:"PostItem__Date",componentId:"sc-1b7lpii-3"})(["margin-top:0.6rem;color:",";"],(function(e){return e.theme.color.gray4}));var m=function(e){var t,r=e.post,a=r.fields.slug,i=r.frontmatter.title,o=r.parent.modifiedTime;return n.createElement(c,null,n.createElement(l.rU,{to:a},(null===(t=r.frontmatter.thumbnail)||void 0===t?void 0:t.childImageSharp)&&n.createElement(u.Z,{fluid:r.frontmatter.thumbnail.childImageSharp.fluid,alt:"Post Item Image"}),n.createElement(d,null,n.createElement("h2",null,i),n.createElement(f,null,r.excerpt),n.createElement(p,null,o||"-"))))},g=a.default.nav.withConfig({displayName:"Navigation__NavigationBlock",componentId:"sc-17mlag7-0"})(["border-bottom:solid 1px ",";line-height:30px;span{color:",";}"],(function(e){return e.theme.color.gray2}),(function(e){return e.theme.color.gray4})),h=(0,a.default)(l.rU).withConfig({displayName:"Navigation__ToggleLink",componentId:"sc-17mlag7-1"})(["display:inline-block;line-height:30px;letter-spacing:2pt;text-decoration:none;color:",";font-size:12px;font-size:1.2rem;padding:0 10px;",""],(function(e){return e.theme.color.gray4}),(function(e){return e.isActive&&(0,a.css)(["border-bottom:solid 2px ",";color:",";"],(function(e){return e.theme.color.blue4}),(function(e){return e.theme.color.blue4}))}));var y=function(e){var t=e.pathname;return n.createElement(g,null,[{name:"posts",link:"/"},{name:"categories",link:"/categories"}].map((function(e){return n.createElement(h,{key:e.name,to:""+e.link,isActive:t===e.link},e.name)})))},b=a.default.div.withConfig({displayName:"pages__PostWrapper",componentId:"sc-172ep34-0"})(["max-width:800px;margin:0 auto;"]),v=a.default.ul.withConfig({displayName:"pages__PostUl",componentId:"sc-172ep34-1"})(["margin-top:1rem;padding-left:0;"]);var x=function(e){var t=e.location.search,r=e.data.allMarkdownRemark.edges,a=i.parse(t),l="string"==typeof a.category&&a.category?a.category:"All",u=r.filter((function(e){var t=e.node;return"All"===l||t.frontmatter.categories.includes(l)})),c=(0,o.useLocation)();return n.createElement(s.Z,{pageTitle:"Blog"},n.createElement(b,null,n.createElement(y,{pathname:c.pathname}),n.createElement(v,null,u.map((function(e){return n.createElement(m,{key:e.node.id,post:e.node})})))))}},1496:function(e,t,r){"use strict";var n=r(5318);t.Z=void 0;var a,i=n(r(1506)),o=n(r(5354)),s=n(r(7316)),l=n(r(7154)),u=n(r(7294)),c=n(r(5697)),d=["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"],f=function(e){var t=(0,l.default)({},e),r=t.resolutions,n=t.sizes,a=t.critical;return r&&(t.fixed=r,delete t.resolutions),n&&(t.fluid=n,delete t.sizes),a&&(t.loading="eager"),t.fluid&&(t.fluid=E([].concat(t.fluid))),t.fixed&&(t.fixed=E([].concat(t.fixed))),t},p=function(e){var t=e.media;return!!t&&(v&&!!window.matchMedia(t).matches)},m=function(e){var t=e.fluid,r=e.fixed,n=g(t||r||[]);return n&&n.src},g=function(e){if(v&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(p);if(-1!==t)return e[t];var r=e.findIndex((function(e){return void 0===e.media}));if(-1!==r)return e[r]}return e[0]},h=Object.create({}),y=function(e){var t=f(e),r=m(t);return h[r]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,v="undefined"!=typeof window,x=v&&window.IntersectionObserver,S=new WeakMap;function w(e){return e.map((function(e){var t=e.src,r=e.srcSet,n=e.srcSetWebp,a=e.media,i=e.sizes;return u.default.createElement(u.default.Fragment,{key:t},n&&u.default.createElement("source",{type:"image/webp",media:a,srcSet:n,sizes:i}),r&&u.default.createElement("source",{media:a,srcSet:r,sizes:i}))}))}function E(e){var t=[],r=[];return e.forEach((function(e){return(e.media?t:r).push(e)})),[].concat(t,r)}function I(e){return e.map((function(e){var t=e.src,r=e.media,n=e.tracedSVG;return u.default.createElement("source",{key:t,media:r,srcSet:n})}))}function k(e){return e.map((function(e){var t=e.src,r=e.media,n=e.base64;return u.default.createElement("source",{key:t,media:r,srcSet:n})}))}function j(e,t){var r=e.srcSet,n=e.srcSetWebp,a=e.media,i=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(a?'media="'+a+'" ':"")+'srcset="'+(t?n:r)+'" '+(i?'sizes="'+i+'" ':"")+"/>"}var O=function(e,t){var r=(void 0===a&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=new window.IntersectionObserver((function(e){e.forEach((function(e){if(S.has(e.target)){var t=S.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),S.delete(e.target),t())}}))}),{rootMargin:"200px"})),a);return r&&(r.observe(e),S.set(e,t)),function(){r.unobserve(e),S.delete(e)}},_=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',r=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSet?'srcset="'+e.srcSet+'" ':"",a=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",u=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?j(e,!0):"")+j(e)})).join("")+"<img "+u+o+s+r+n+t+i+a+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},R=u.default.forwardRef((function(e,t){var r=e.src,n=e.imageVariants,a=e.generateSources,i=e.spreadProps,o=e.ariaHidden,s=u.default.createElement(C,(0,l.default)({ref:t,src:r},i,{ariaHidden:o}));return n.length>1?u.default.createElement("picture",null,a(n),s):s})),C=u.default.forwardRef((function(e,t){var r=e.sizes,n=e.srcSet,a=e.src,i=e.style,o=e.onLoad,c=e.onError,f=e.loading,p=e.draggable,m=e.ariaHidden,g=(0,s.default)(e,d);return u.default.createElement("img",(0,l.default)({"aria-hidden":m,sizes:r,srcSet:n,src:a},g,{onLoad:o,onError:c,ref:t,loading:f,draggable:p,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))}));C.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var L=function(e){function t(t){var r;(r=e.call(this,t)||this).seenBefore=v&&y(t),r.isCritical="eager"===t.loading||t.critical,r.addNoScript=!(r.isCritical&&!t.fadeIn),r.useIOSupport=!b&&x&&!r.isCritical&&!r.seenBefore;var n=r.isCritical||v&&(b||!r.useIOSupport);return r.state={isVisible:n,imgLoaded:!1,imgCached:!1,fadeIn:!r.seenBefore&&t.fadeIn,isHydrated:!1},r.imageRef=u.default.createRef(),r.placeholderRef=t.placeholderRef||u.default.createRef(),r.handleImageLoaded=r.handleImageLoaded.bind((0,i.default)(r)),r.handleRef=r.handleRef.bind((0,i.default)(r)),r}(0,o.default)(t,e);var r=t.prototype;return r.componentDidMount=function(){if(this.setState({isHydrated:v}),this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:y(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},r.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},r.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=O(e,(function(){var e=y(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},r.handleImageLoaded=function(){var e,t,r;e=this.props,t=f(e),(r=m(t))&&(h[r]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},r.render=function(){var e=f(this.props),t=e.title,r=e.alt,n=e.className,a=e.style,i=void 0===a?{}:a,o=e.imgStyle,s=void 0===o?{}:o,c=e.placeholderStyle,d=void 0===c?{}:c,p=e.placeholderClassName,m=e.fluid,h=e.fixed,y=e.backgroundColor,b=e.durationFadeIn,v=e.Tag,x=e.itemProp,S=e.loading,E=e.draggable,j=m||h;if(!j)return null;var O=!1===this.state.fadeIn||this.state.imgLoaded,L=!0===this.state.fadeIn&&!this.state.imgCached,N=(0,l.default)({opacity:O?1:0,transition:L?"opacity "+b+"ms":"none"},s),A="boolean"==typeof y?"lightgray":y,F={transitionDelay:b+"ms"},z=(0,l.default)({opacity:this.state.imgLoaded?0:1},L&&F,s,d),T={title:t,alt:this.state.isVisible?"":r,style:z,className:p,itemProp:x},M=this.state.isHydrated?g(j):j[0];if(m)return u.default.createElement(v,{className:(n||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden",maxWidth:M.maxWidth?M.maxWidth+"px":null,maxHeight:M.maxHeight?M.maxHeight+"px":null},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(M.srcSet)},u.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/M.aspectRatio+"%"}}),A&&u.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:A,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},L&&F)}),M.base64&&u.default.createElement(R,{ariaHidden:!0,ref:this.placeholderRef,src:M.base64,spreadProps:T,imageVariants:j,generateSources:k}),M.tracedSVG&&u.default.createElement(R,{ariaHidden:!0,ref:this.placeholderRef,src:M.tracedSVG,spreadProps:T,imageVariants:j,generateSources:I}),this.state.isVisible&&u.default.createElement("picture",null,w(j),u.default.createElement(C,{alt:r,title:t,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:N,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:x,loading:S,draggable:E})),this.addNoScript&&u.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:_((0,l.default)({alt:r,title:t,loading:S},M,{imageVariants:j}))}}));if(h){var P=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:M.width,height:M.height},i);return"inherit"===i.display&&delete P.display,u.default.createElement(v,{className:(n||"")+" gatsby-image-wrapper",style:P,ref:this.handleRef,key:"fixed-"+JSON.stringify(M.srcSet)},A&&u.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:A,width:M.width,opacity:this.state.imgLoaded?0:1,height:M.height},L&&F)}),M.base64&&u.default.createElement(R,{ariaHidden:!0,ref:this.placeholderRef,src:M.base64,spreadProps:T,imageVariants:j,generateSources:k}),M.tracedSVG&&u.default.createElement(R,{ariaHidden:!0,ref:this.placeholderRef,src:M.tracedSVG,spreadProps:T,imageVariants:j,generateSources:I}),this.state.isVisible&&u.default.createElement("picture",null,w(j),u.default.createElement(C,{alt:r,title:t,width:M.width,height:M.height,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:N,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:x,loading:S,draggable:E})),this.addNoScript&&u.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:_((0,l.default)({alt:r,title:t,loading:S},M,{imageVariants:j}))}}))}return null},t}(u.default.Component);L.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var N=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),A=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string,maxWidth:c.default.number,maxHeight:c.default.number});function F(e){return function(t,r,n){var a;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+n+"`, but their values are both `undefined`.");c.default.checkPropTypes(((a={})[r]=e,a),t,"prop",n)}}L.propTypes={resolutions:N,sizes:A,fixed:F(c.default.oneOfType([N,c.default.arrayOf(N)])),fluid:F(c.default.oneOfType([A,c.default.arrayOf(A)])),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var z=L;t.Z=z}}]);
//# sourceMappingURL=component---src-pages-index-tsx-c32437ec01ed26733cb1.js.map