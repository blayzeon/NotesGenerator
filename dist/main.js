(()=>{var e={315:e=>{(new Date).toLocaleDateString(void 0,{year:"numeric",month:"2-digit",day:"2-digit"}),e.exports=function(e,t,n,r,o){const l=document.createElement("form");function a(e){const t=document.createElement("div");if(e.label){const n=document.createElement("label");n.innerText=e.label+": ",n.setAttribute("for",`form-${e.label}`),t.appendChild(n)}const n=document.createElement(e.elm);n.setAttribute("id",`form-${e.label}`),"input"===e.elm&&n.setAttribute("type",e.type),e.text&&(n.innerText=e.text),e.placeholder&&n.setAttribute("placeholder",e.placeholder),e.datalist&&n.setAttribute("datalist",e.datalist),e.forNote&&n.setAttribute("data-note","true"),e.data&&n.setAttribute("data",e.data),t.appendChild(n);const r=e.label?t:n;if(document.querySelector("#form-container")){const e=Array.from(l.querySelectorAll("div"));lastChild=e[e.length-1],l.insertBefore(r,lastChild)}else l.appendChild(r)}function i(e){!function(e,t,n){if(!t.value)return;const r=document.createElement("span");r.innerText="copied!",r.classList.add("popup"),r.style.position="absolute",r.style.zIndex=1,r.style.top=`${e.y}px`,r.style.left=`${e.x}px`,r.style.backgroundColor="white",n.appendChild(r),t.select(),t.setSelectionRange(0,99999),navigator.clipboard.writeText(t.value),setTimeout((function(){r.remove()}),2e3)}({x:e.clientX,y:e.clientY},c,l)}l.setAttribute("id","form-container"),e.forEach((e=>{a(e)}));const c=document.createElement("textarea");c.setAttribute("placeholder","your notes will generate here"),c.addEventListener("click",(e=>{i(e)})),l.appendChild(c),l.addEventListener("change",(()=>{const e=[];l.querySelectorAll('[data-note="true"]').forEach((t=>{t.value&&e.push(t.value)}));const t=function(e,t=" ",n=!1,r=!1,o=!1){const l=[];return r&&l.push(r),e.forEach((e=>{n&&l.push(n),l.push(e),t&&l.push(t)})),o&&l.push(o),l.join(" ")}(e,"/",n,r,o);c.innerText=t}));const s=document.createElement("button");s.innerText="copy & reset",s.setAttribute("type","reset"),s.addEventListener("click",(e=>{i(e)})),l.appendChild(s);const d=document.createElement("button");return d.innerText="reset",d.setAttribute("type","reset"),d.addEventListener("click",(e=>{confirm("Are you sure you wish to reset the form?")?c.innerText="":e.preventDefault()})),l.appendChild(d),{form:l,addItem:a}}}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var l=t[r]={exports:{}};return e[r](l,l.exports,n),l.exports}(()=>{document.getElementById("version-number").innerText="2.20523";const e=n(315)([{elm:"textarea",placeholder:"scratchpad for jotting notes"},{label:"issue",type:"text",elm:"input",placeholder:"the reason for the customer's call",datalist:!1,forNote:!0},{label:"name",type:"text",elm:"input",placeholder:"enter the customer's full name",datalist:!1,forNote:!0},{label:"resolution",type:"text",elm:"input",placeholder:"the resolution you provided",datalist:!1,forNote:!0}]);document.querySelector("main").appendChild(e.form);const t={label:"passcode",type:"text",elm:"input",placeholder:"the customer's 4-to-8 digit passcode",datalist:!1,forNote:!0,data:"cn"},r=document.querySelector("#product");r.addEventListener("change",(()=>{document.querySelector("form").querySelectorAll("input").forEach((e=>{if(e.value)return a=confirm("Changing the product will reset the form.  Continue?"),!!a||(r.value,!1)})),"ConnectNetwork"===r.value?e.addItem(t):r.value,console.log(r)})),document.getElementById("fac-list")})()})();