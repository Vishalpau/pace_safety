(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{e6f86f6fc12b0c9f45d4:function(o,n,e){"use strict";e.r(n);var a,t=e("8af190b70a6bc55c6f1b"),i=e.n(t),r=e("0d939196e59ed73c94e6"),d=e("c7fd554010f79f6c0ef8"),l=e.n(d),c=e("b02fe3f80d4238b52f20"),m=e.n(c),p=e("c37835866a3298466125"),f=e.n(p),s=e("16c7abd7abc407b9f247"),v=e.n(s),u=e("71786e439547641341d9"),b=e.n(u),y=e("5c0a236ca4c0b26f32cd"),g=e.n(y),h=e("c502bee2fd4be3dd7f62"),w=e.n(h),S=e("950afb07590d2729ba95"),G=e.n(S),I=e("6938d226fd372a75cbf9"),B=e("921c0b8c557fe6ba5da8"),k=e.n(B),A=e("ee6ed0b52d3b1f54c965"),O=e("6d7a478e7cc0d7712c31"),j=e("f805f7817e1df8342dad");function C(o,n,e,t){a||(a="function"===typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103);var i=o&&o.defaultProps,r=arguments.length-3;if(n||0===r||(n={children:void 0}),1===r)n.children=t;else if(r>1){for(var d=new Array(r),l=0;l<r;l++)d[l]=arguments[l+3];n.children=d}if(n&&i)for(var c in i)void 0===n[c]&&(n[c]=i[c]);else n||(n=i||{});return{$$typeof:a,type:o,key:void 0===e?null:""+e,ref:null,props:n,_owner:null}}function z(o,n){return function(o){if(Array.isArray(o))return o}(o)||function(o,n){if("undefined"===typeof Symbol||!(Symbol.iterator in Object(o)))return;var e=[],a=!0,t=!1,i=void 0;try{for(var r,d=o[Symbol.iterator]();!(a=(r=d.next()).done)&&(e.push(r.value),!n||e.length!==n);a=!0);}catch(o){t=!0,i=o}finally{try{a||null==d.return||d.return()}finally{if(t)throw i}}return e}(o,n)||function(o,n){if(!o)return;if("string"===typeof o)return E(o,n);var e=Object.prototype.toString.call(o).slice(8,-1);"Object"===e&&o.constructor&&(e=o.constructor.name);if("Map"===e||"Set"===e)return Array.from(o);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return E(o,n)}(o,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function E(o,n){(null==n||n>o.length)&&(n=o.length);for(var e=0,a=new Array(n);e<n;e++)a[e]=o[e];return a}var H=Object(I.makeStyles)((function(o){return{formControl:{width:"100%"}}})),P=C(G.a,{marginBottom:5},void 0,C(j.a,{selectedHeader:"Root cause analysis"})),T=C(k.a,{variant:"h6",gutterBottom:!0},void 0,"Immediate Causes - Hazardous acts"),$=C(G.a,{marginBottom:4,borderBottom:1},void 0,C(k.a,{variant:"body2",gutterBottom:!0},void 0,"Incident number: nnnnnnnnnn")),x=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0,"Supervision"),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),J=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0," Work package "),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),M=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0," ","Equiptment & Machinery"),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),N=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0," Behaviour Issue"),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),q=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0," Saftey Items"),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),D=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0,"Ergohomics"),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),R=C(r.Grid,{item:!0,md:6},void 0,C(v.a,{component:"fieldset"},void 0,C(f.a,{component:"legend"},void 0,"Procedure"),C(b.a,{},void 0,C(g.a,{control:C(w.a,{name:"option1"}),label:"option1"}),C(g.a,{control:C(w.a,{name:"option2"}),label:"option2"}),C(g.a,{control:C(w.a,{name:"antoine"}),label:"..."})))),U=C(r.Grid,{item:!0,md:12},void 0,C(G.a,{marginTop:4},void 0,C(r.Button,{variant:"contained",color:"primary",href:"http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/"},void 0,"Previous"),C(r.Button,{variant:"contained",color:"primary",href:"http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"},void 0,"Next"))),W=C(r.Grid,{item:!0,md:3},void 0,C(A.a,{listOfItems:O.e,selectedItem:"Hazardious acts"}));n.default=function(){var o=z(i.a.useState(new Date("2014-08-18T21:11:54")),2),n=(o[0],o[1],H());return C(r.Container,{},void 0,C(m.a,{},void 0,C(G.a,{padding:3,bgcolor:"background.paper"},void 0,P,T,$,C(r.Grid,{container:!0,spacing:3},void 0,C(r.Grid,{container:!0,item:!0,md:9,spacing:3},void 0,x,J,M,N,q,D,R,C(r.Grid,{item:!0,md:12},void 0,C(l.a,{className:n.formControl,id:"filled-basic",label:"Others",variant:"outlined",multiline:!0,rows:3})),U),W))))}}}]);