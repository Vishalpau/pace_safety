(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{b3d5eb548439f1b3ea90:function(e,n,t){"use strict";t.r(n);var r,i=t("8af190b70a6bc55c6f1b"),o=(t("0d7f0986bcd2f33d8a2a"),t("1037a6e0d5914309f74c"),t("4dd2a92e69dcbe1bab10")),a=t("d2344b81d4686732172b"),c=(t("8a2d1b95e05b6a321e74"),t("435859b6b76fb67a754a")),d=t.n(c);function u(e,n,t,i){r||(r="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var o=e&&e.defaultProps,a=arguments.length-3;if(n||0===a||(n={children:void 0}),1===a)n.children=i;else if(a>1){for(var c=new Array(a),d=0;d<a;d++)c[d]=arguments[d+3];n.children=c}if(n&&o)for(var u in o)void 0===n[u]&&(n[u]=o[u]);else n||(n=o||{});return{$$typeof:r,type:e,key:void 0===t?null:""+t,ref:null,props:n,_owner:null}}function l(e,n,t,r,i,o,a){try{var c=e[o](a),d=c.value}catch(e){return void t(e)}c.done?n(d):Promise.resolve(d).then(r,i)}function f(e){return function(){var n=this,t=arguments;return new Promise((function(r,i){var o=e.apply(n,t);function a(e){l(o,r,i,a,c,"next",e)}function c(e){l(o,r,i,a,c,"throw",e)}a(void 0)}))}}function s(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(e)))return;var t=[],r=!0,i=!1,o=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(t.push(a.value),!n||t.length!==n);r=!0);}catch(e){i=!0,o=e}finally{try{r||null==c.return||c.return()}finally{if(i)throw o}}return t}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return v(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return v(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}n.default=function(){var e=s(Object(i.useState)([]),2),n=e[0],t=e[1];return Object(i.useEffect)(f(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.a.get("api/v1/incidents/");case 2:return n=e.sent,e.next=5,t(n.data.data.results);case 5:case"end":return e.stop()}}),e)}))),[]),u("div",{},void 0,console.log(n),Object.entries(n).map((function(e){return u(o.mb,{},void 0,u(d.a,{container:!0,spacing:3},void 0,u(d.a,{item:!0,lg:3},void 0,"Incident Number :",e[1].incidentNumber),u(d.a,{item:!0,lg:3},void 0,"Inciden on :",e[1].incidentOccuredOn),u(d.a,{item:!0,lg:3},void 0,"Reported on :",e[1].incidentReportedOn)),u(d.a,{container:!0,spacing:3},void 0,u(d.a,{item:!0,lg:3},void 0,"Reported by :",e[1].incidentReportedByName),u(d.a,{item:!0,lg:3},void 0,"Incident type :","Not found"),u(d.a,{item:!0,lg:3},void 0,"Incident title :",e[1].incidentTitle)),u(d.a,{container:!0,spacing:3},void 0,u(d.a,{item:!0,lg:3},void 0,"Incident description :",e[1].incidentDetails),u(d.a,{item:!0,lg:3},void 0,"Incident location :",e[1].incidentLocation),u(d.a,{item:!0,lg:3},void 0,"Reviewed by :",e[1].reviewedBy)),u(d.a,{container:!0,spacing:3},void 0,u(d.a,{item:!0,lg:3},void 0,"Reviewd on :",e[1].reviewDate),u(d.a,{item:!0,lg:3},void 0,"Closed by :",e[1].closedBy),u(d.a,{item:!0,lg:3},void 0,"Closed date :",e[1].closeDate)))})))}}}]);