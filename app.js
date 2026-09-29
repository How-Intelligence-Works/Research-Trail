const SCHEMA="research-trail/0.1";
let project=null;
const $=id=>document.getElementById(id);
function go(id){["home","setup","workspace"].forEach(x=>$(x).classList.add("hidden"));$(id).classList.remove("hidden")}
function now(){return new Date().toISOString()}
async function hashText(s){const b=new TextEncoder().encode(s);const h=await crypto.subtle.digest("SHA-256",b);return [...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function uid(prefix){return prefix+"-"+crypto.randomUUID().slice(0,8)}
function startCase(c){go("setup");$("mode").value=c==="hypothesis"?"Empirical study":c==="new"?"Exploratory / conceptual":"Mixed / other"; if(c==="thought") $("startingQuestion").placeholder="What were you investigating when this changed your thinking?"; if(c==="claim") $("startingQuestion").placeholder="What claim or conclusion are you trying to trace back?";}
async function createProject(){
 const title=$("projectTitle").value.trim(), q=$("startingQuestion").value.trim(); if(!title||!q){alert("Add an investigation title and starting question/problem.");return}
 project={schema:SCHEMA,id:uid("RT"),title,starting_question:q,mode:$("mode").value,owner:$("owner").value.trim(),created_at:now(),entries:[]};
 await addSystemStart(); renderWorkspace(); go("workspace");
}
async function addSystemStart(){
 const base={id:uid("Q"),type:"question",origin:"human",title:project.starting_question,content:"Starting question / problem",status:"Open question",parent_id:"",relation:"",source_ref:"",reason:"Initial investigation question",created_at:project.created_at,previous_hash:""};
 base.hash=await hashText(JSON.stringify(base)); project.entries.push(base);
}
function renderWorkspace(){$("wsTitle").textContent=project.title;$("wsQuestion").textContent=project.starting_question;refreshParents();showCapture()}
function refreshParents(){const p=$("parent");p.innerHTML='<option value="">None / independent</option>'+project.entries.map(e=>`<option value="${e.id}">${e.id} — ${escapeHtml(e.title.slice(0,90))}</option>`).join("")}
async function saveEntry(){
 const title=$("entryTitle").value.trim(); if(!title){alert("Add a statement/title.");return}
 const prev=project.entries.length?project.entries[project.entries.length-1].hash:"";
 const e={id:uid(typePrefix($("type").value)),type:$("type").value,origin:$("origin").value,title,content:$("entryContent").value.trim(),status:$("status").value,parent_id:$("parent").value,relation:$("parent").value?$("relation").value:"",source_ref:$("sourceRef").value.trim(),reason:$("reason").value.trim(),created_at:now(),previous_hash:prev};
 e.hash=await hashText(JSON.stringify(e));project.entries.push(e);
 ["entryTitle","entryContent","sourceRef","reason"].forEach(x=>$(x).value="");$("parent").value="";refreshParents();renderTrail();alert("Added to Research Trail.");
}
function typePrefix(t){return ({question:"Q",idea:"P",source:"S",evidence:"E",observation:"O",assumption:"A",interpretation:"I",hypothesis:"H",prediction:"PR",analysis:"AN",decision:"D",finding:"F",claim:"C",note:"N"})[t]||"R"}
function showCapture(){["captureCard","trailCard","auditCard"].forEach(x=>$(x).classList.add("hidden"));$("captureCard").classList.remove("hidden")}
function showTrail(){["captureCard","trailCard","auditCard"].forEach(x=>$(x).classList.add("hidden"));$("trailCard").classList.remove("hidden");renderTrail()}
function showAudit(){["captureCard","trailCard","auditCard"].forEach(x=>$(x).classList.add("hidden"));$("auditCard").classList.remove("hidden");renderAudit()}
function renderTrail(){
 $("trail").innerHTML=project.entries.map(e=>`<div class="entry ${e.type}"><div><span class="pill">${escapeHtml(e.type)}</span> <span class="pill">${escapeHtml(e.origin)}</span> <span class="pill">${escapeHtml(e.status)}</span></div><h3 style="margin-top:9px">${escapeHtml(e.title)}</h3>${e.content?`<div>${escapeHtml(e.content)}</div>`:""}${e.parent_id?`<div class="meta"><b>${escapeHtml(e.relation)}</b> ${escapeHtml(e.parent_id)}</div>`:""}${e.source_ref?`<div class="meta">Reference: ${escapeHtml(e.source_ref)}</div>`:""}${e.reason?`<div class="meta">Note: ${escapeHtml(e.reason)}</div>`:""}<div class="meta">${e.id} · ${new Date(e.created_at).toLocaleString()}</div></div>`).join("");
}
function renderAudit(){
 const origins=new Set(project.entries.map(e=>e.origin)); const fc=project.entries.filter(e=>["finding","claim"].includes(e.type));
 $("countEntries").textContent=project.entries.length;$("countOrigins").textContent=origins.size;$("countClaims").textContent=fc.length;
 const claims=project.entries.filter(e=>e.type==="claim"), hypotheses=project.entries.filter(e=>e.type==="hypothesis"), sourced=project.entries.filter(e=>e.source_ref||["source","evidence"].includes(e.type)), linked=project.entries.filter(e=>e.parent_id);
 const checks=[
  ["Starting question recorded",!!project.starting_question],
  ["More than one provenance/origin represented",origins.size>1],
  ["Sources/evidence explicitly recorded",sourced.length>0],
  ["Relationships between entries recorded",linked.length>0],
  ["Claims have an explicit parent/derivation link",claims.length===0?null:claims.every(c=>c.parent_id)],
  ["Hypotheses are linked to prior reasoning/evidence",hypotheses.length===0?null:hypotheses.every(h=>h.parent_id)]
 ];
 $("checks").innerHTML=checks.map(([t,v])=>`<div class="entry"><b>${v===true?"✓":v===false?"○":"—"} ${escapeHtml(t)}</b><div class="meta">${v===true?"Visible in this trail.":v===false?"Not yet visible in this trail.":"Not applicable yet."}</div></div>`).join("");
}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function blobDownload(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function downloadJSON(){project.exported_at=now();blobDownload(slug(project.title)+"_research_trail.json",JSON.stringify(project,null,2),"application/json")}
function downloadCSV(){const cols=["id","type","origin","title","content","status","parent_id","relation","source_ref","reason","created_at","previous_hash","hash"];const esc=v=>'"'+String(v??"").replaceAll('"','""')+'"';const csv=[cols.join(","),...project.entries.map(e=>cols.map(c=>esc(e[c])).join(","))].join("\n");blobDownload(slug(project.title)+"_entries.csv",csv,"text/csv")}
function downloadReport(){renderAudit();const html=`<!doctype html><meta charset="utf-8"><title>Research Trail audit</title><h1>${escapeHtml(project.title)}</h1><p><b>Starting question:</b> ${escapeHtml(project.starting_question)}</p><p>Mode: ${escapeHtml(project.mode)} · Exported ${escapeHtml(now())}</p><h2>Trail</h2>${project.entries.map(e=>`<h3>${escapeHtml(e.id)} — ${escapeHtml(e.type)}: ${escapeHtml(e.title)}</h3><p>Origin: ${escapeHtml(e.origin)} · Status: ${escapeHtml(e.status)}</p><p>${escapeHtml(e.content)}</p><p>${e.parent_id?escapeHtml(e.relation+" "+e.parent_id):""}</p>`).join("")}<p><small>Research Trail diagnoses traceability; it does not certify scientific validity.</small></p>`;blobDownload(slug(project.title)+"_audit.html",html,"text/html")}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,60)||"investigation"}
function openSaved(){$("fileOpen").click()}
$("fileOpen").addEventListener("change",async ev=>{const f=ev.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!x.entries||!x.title)throw 0;project=x;renderWorkspace();go("workspace")}catch{alert("That file is not a valid Research Trail export.")}});
