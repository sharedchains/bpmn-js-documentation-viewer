(()=>{"use strict";var e={n:o=>{var t=o&&o.__esModule?()=>o.default:()=>o;return e.d(t,{a:t}),t},d:(o,t)=>{for(var d in t)e.o(t,d)&&!e.o(o,d)&&Object.defineProperty(o,d,{enumerable:!0,get:t[d]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o)},o={};e.d(o,{default:()=>n});const t=window.jQuery;var d=e.n(t);function n(e,o){const t=d()('<div class="doc-modal"><div class="doc-modal-content"></div><div class="doc-modal-footer"><button id="doc-close" >Close</button></div></div>');let n;function l(e){let o=e.businessObject||e;return o&&"function"==typeof o.$instanceOf&&o.$instanceOf("bpmn:Definitions")?e.rootElements[0]:o.$parent?l(o.$parent):void 0}e.on("element.hover",(i=>{let a=i.element;!a.labelTarget&&a.businessObject.$instanceOf("bpmn:FlowNode")&&setTimeout((()=>function(i){let a=d()('<div class="doc-overlay doc-overlay-border"></div>'),s=i.businessObject.$attrs["documentation:extendedDocumentation"]||i.businessObject.extendedDocumentation;s&&s.length>0&&a.addClass("full"),n&&(o.get({type:"doc-badge"}).forEach((e=>{e.html.off("click")})),o.remove(n),window?.components?.Modal||"function"==typeof d().fn.modal&&d()("#myModal").length&&document.getElementById("myModal").remove(),n=void 0),n=o.add(i,"doc-badge",{position:{bottom:0,right:0},html:a}),a.on("click",(n=>{if(window?.components?.Modal)null!=s&&e.fire("docshow",{element:i,doc:s});else if("function"==typeof d().fn.modal)document.body.appendChild(function(e){let o=document.createElement("div");o.classList.add("modal"),o.classList.add("fade"),o.setAttribute("id","myModal"),o.setAttribute("role","dialog");let t='<div class="modal-dialog modal-fullscreen" id="modalDoc" style="width: 95%; margin: auto;"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button></div><div class="modal-body">'+e+"</div></div></div>";return o.innerHTML=t,o}(s)),d()("#myModal").modal();else if(s&&s.length>0){let e=l(i),n=d()(t);n.find(".doc-modal-content").empty(),n.find(".doc-modal-content").append(s);let a=o.add(e.id,{position:{top:0,left:0},html:n});n.find("#doc-close").on("click",(()=>{o.remove(a)}))}return!1}))}(a)),0)}))}window.bootstrap,n.$inject=["eventBus","overlays"],window.DocViewer=o.default})();
//# sourceMappingURL=docViewer.bundle.js.map