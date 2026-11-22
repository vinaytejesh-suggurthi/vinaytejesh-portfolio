const $=id=>document.getElementById(id);
let sb=null, content=null;
const defaults={
 profile:{name:"Vinaytejesh Suggurthi",role:"Salesforce SRE · DevOps · CRM",intro:"Salesforce professional with around 10 years of experience across CRM administration, development, production operations and DevOps delivery.",about:"I work across the Salesforce lifecycle—from platform configuration and custom development to production support, release coordination and CI/CD automation. I enjoy making enterprise platforms more reliable, maintainable and easier for teams to deliver on.",email:"vinaytej251@gmail.com",phone:"+1 778-807-0992",location:"Vancouver, BC, Canada",linkedin:"https://linkedin.com/in/svt02d",resumeUrl:""},
 experience:[
 {role:"Consultant, Production Application Operations",company:"CIBC · Toronto, Ontario",date:"August 2024 – Present",bullets:["Support enterprise Salesforce CRM, Marketing Cloud and Loyalty Management platforms.","Improve platform reliability through incident management, monitoring and proactive health checks.","Optimize Marketing Cloud journeys, automations and campaign operations.","Create operational documentation, dashboards and support playbooks."]},
 {role:"Consultant, Production Application Operations",company:"CIBC · Toronto, Ontario",date:"January 2024 – August 2024",bullets:["Delivered production support for Salesforce CRM and Salesforce Gen AI capabilities.","Supported platform adoption, usage monitoring, data quality and operational governance."]},
 {role:"Consultant, Production Application Operations",company:"CIBC · Toronto, Ontario",date:"November 2021 – December 2023",bullets:["Supported Salesforce CRM and nCino banking workflows with 99.9%+ uptime experience.","Managed AutoRABIT and Azure DevOps CI/CD pipelines and coordinated production releases."]},
 {role:"Salesforce Developer / Administrator",company:"OpenText · Waterloo, Ontario",date:"November 2020 – September 2021",bullets:["Developed and administered Salesforce solutions using Apex, Visualforce and Lightning.","Supported Salesforce CPQ, integrations, data migration, GitLab and Jenkins deployments."]},
 {role:"Salesforce Administrator / Developer",company:"SOLJIT · Montréal, Quebec",date:"January 2019 – September 2020",bullets:["Designed and delivered Salesforce customizations, Apex logic, Lightning components and Flows.","Supported security, data quality, integrations, testing and production issue resolution."]},
 {role:"Salesforce Administrator",company:"CTS (Investors Group Management) · Vancouver, BC",date:"May 2017 – December 2018",bullets:["Configured Salesforce objects, profiles, roles, sharing, workflows, approvals and reports.","Supported data loading, sandbox testing, deployment and technical documentation."]}
 ],
 skills:[{title:"Salesforce & Development",items:["Salesforce CRM","Apex","Apex Triggers","LWC","Visualforce","Sales Cloud","Service Cloud","Marketing Cloud","Journey Builder","Loyalty Management","nCino","Salesforce CPQ","REST APIs","SOQL / SOSL"]},{title:"DevOps & Cloud",items:["AutoRABIT","Azure DevOps","Jenkins","Git","GitLab","CI/CD","Release Management","Microsoft Azure","App Services","Logic Apps","Key Vault","Blob Storage","Infrastructure as Code"]},{title:"Operations & Delivery",items:["Incident Management","Root Cause Analysis","Production Support","Monitoring","Change Management","Agile / Scrum","ITIL","Access Management","Backup & Recovery","Documentation"]}],
 projects:[
 {title:"Salesforce CI/CD release pipeline",icon:"⎇",description:"An illustrative deployment flow showing source control, validation, approvals and promotion across Salesforce environments.",steps:["Developer commits metadata to Git","CI pipeline validates package and runs Apex tests","Release approval gates QA → UAT → Production","Deployment report and rollback checkpoint recorded"],tags:["Azure DevOps","Git","AutoRABIT","CI/CD"]},
 {title:"Salesforce production operations",icon:"◉",description:"A sample operations dashboard concept for incident triage, service health, change tracking and recurring issue analysis.",steps:["Monitor platform health and incoming alerts","Classify incident by severity and business impact","Investigate logs and integration dependencies","Document root cause and preventive action"],tags:["SRE","Incident Management","Monitoring"]},
 {title:"Marketing Cloud journey operations",icon:"✉",description:"A conceptual Journey Builder and Automation Studio lifecycle for campaign quality checks and operational readiness.",steps:["Prepare and validate audience segment","Run pre-send data and content checks","Execute journey / automation schedule","Review delivery, bounce and engagement metrics"],tags:["Marketing Cloud","Journey Builder","Automation Studio"]}
 ],
 articles:[
 {date:"FIELD NOTE 01",title:"A practical Salesforce release checklist",summary:"A release-readiness checklist covering metadata validation, Apex tests, approvals and post-deployment verification.",url:""},
 {date:"FIELD NOTE 02",title:"Reducing repeat incidents with root-cause analysis",summary:"How clear incident categorization, runbooks and corrective actions can improve production support.",url:""},
 {date:"FIELD NOTE 03",title:"Operating Salesforce Marketing Cloud journeys",summary:"Operational considerations for audience validation, automation monitoring and campaign performance.",url:""}
 ]};
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function val(id,v){$(id).value=v??""}
function read(id){return $(id).value.trim()}
function setStatus(id,msg,error=false){$(id).textContent=msg;$(id).classList.toggle("error",error)}
function entryEditor(container,items,kind){
 const target=$(container);target.innerHTML="";
 items.forEach((item,i)=>{
  const box=document.createElement("div");box.className="entry";
  const fields=kind==="experience"?`
   <div class="admin-grid"><div class="field"><label>ROLE</label><input data-k="role" value="${esc(item.role)}"></div><div class="field"><label>COMPANY / LOCATION</label><input data-k="company" value="${esc(item.company)}"></div><div class="field"><label>DATE RANGE</label><input data-k="date" value="${esc(item.date)}"></div><div class="field full"><label>HIGHLIGHTS (ONE PER LINE)</label><textarea data-k="bullets">${esc((item.bullets||[]).join("\n"))}</textarea></div></div>`:
  kind==="project"?`<div class="admin-grid"><div class="field"><label>PROJECT TITLE</label><input data-k="title" value="${esc(item.title)}"></div><div class="field"><label>ICON / SYMBOL</label><input data-k="icon" value="${esc(item.icon||"⌘")}"></div><div class="field full"><label>DESCRIPTION</label><textarea data-k="description">${esc(item.description)}</textarea></div><div class="field"><label>DEMO STEPS (ONE PER LINE)</label><textarea data-k="steps">${esc((item.steps||[]).join("\n"))}</textarea></div><div class="field"><label>SKILL TAGS (COMMA SEPARATED)</label><textarea data-k="tags">${esc((item.tags||[]).join(", "))}</textarea></div></div>`:
  `<div class="admin-grid"><div class="field"><label>DATE / LABEL</label><input data-k="date" value="${esc(item.date)}"></div><div class="field"><label>ARTICLE TITLE</label><input data-k="title" value="${esc(item.title)}"></div><div class="field full"><label>SUMMARY</label><textarea data-k="summary">${esc(item.summary)}</textarea></div><div class="field full"><label>ARTICLE URL (OPTIONAL)</label><input data-k="url" value="${esc(item.url||"")}"></div></div>`;
  box.innerHTML=`<div class="entry-head"><strong>${kind==="experience"?"ROLE":kind==="project"?"PROJECT":"ARTICLE"} ${i+1}</strong><div class="entry-actions"><button type="button" class="admin-btn danger remove">Remove</button></div></div>${fields}`;
  box.querySelector(".remove").onclick=()=>{items.splice(i,1);entryEditor(container,items,kind)};
  target.appendChild(box);
 });
}
function renderEditor(){
 const p=content.profile||{};
 val("name",p.name);val("role",p.role);val("intro",p.intro);val("about",p.about);val("publicEmail",p.email);val("phone",p.phone);val("location",p.location);val("linkedin",p.linkedin);val("resumeUrl",p.resumeUrl);
 (content.skills||[]).forEach((s,i)=>val("skills"+i,(s.items||[]).join(", ")));
 entryEditor("experience-editor",content.experience,"experience");entryEditor("project-editor",content.projects,"project");entryEditor("article-editor",content.articles,"article");
}
function collectEntries(container,kind){
 return [...$(container).children].map(box=>{
  const get=k=>box.querySelector(`[data-k="${k}"]`)?.value.trim()||"";
  if(kind==="experience")return {role:get("role"),company:get("company"),date:get("date"),bullets:get("bullets").split("\n").map(x=>x.trim()).filter(Boolean)};
  if(kind==="project")return {title:get("title"),icon:get("icon"),description:get("description"),steps:get("steps").split("\n").map(x=>x.trim()).filter(Boolean),tags:get("tags").split(",").map(x=>x.trim()).filter(Boolean)};
  return {date:get("date"),title:get("title"),summary:get("summary"),url:get("url")};
 });
}
async function init(){
 if(!window.supabase||!window.SUPABASE_URL||window.SUPABASE_URL.startsWith("YOUR_")){setStatus("login-status","Complete Supabase setup in ADMIN-SETUP.md first.",true);$("login-form").onsubmit=e=>{e.preventDefault();setStatus("login-status","Supabase is not configured yet. Follow ADMIN-SETUP.md.",true)};return;}
 sb=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);
 const {data:{session}}=await sb.auth.getSession();if(session)await enter();
 sb.auth.onAuthStateChange((_event,session)=>{if(session)enter();else{$("editor").classList.add("hidden");$("login-panel").classList.remove("hidden")}});
}
async function enter(){
 $("login-panel").classList.add("hidden");$("editor").classList.remove("hidden");
 const {data,error}=await sb.from("portfolio_content").select("content").eq("id",1).single();
 if(error){setStatus("save-status","Could not load content. Check your Supabase table and policies.",true);return;}
 content=data.content||structuredClone(defaults);renderEditor();
}
$("login-form").addEventListener("submit",async e=>{e.preventDefault();setStatus("login-status","Signing in…");const {error}=await sb.auth.signInWithPassword({email:read("email"),password:read("password")});setStatus("login-status",error?error.message:"Signed in.",!!error)});
$("logout").onclick=async()=>sb.auth.signOut();
$("add-experience").onclick=()=>{content.experience.push({role:"",company:"",date:"",bullets:[]});entryEditor("experience-editor",content.experience,"experience")};
$("add-project").onclick=()=>{content.projects.push({title:"",icon:"⌘",description:"",steps:[],tags:[]});entryEditor("project-editor",content.projects,"project")};
$("add-article").onclick=()=>{content.articles.push({date:"NEW ARTICLE",title:"",summary:"",url:""});entryEditor("article-editor",content.articles,"article")};
$("save").onclick=async()=>{
 setStatus("save-status","Saving…");
 content.profile={name:read("name"),role:read("role"),intro:read("intro"),about:read("about"),email:read("publicEmail"),phone:read("phone"),location:read("location"),linkedin:read("linkedin"),resumeUrl:read("resumeUrl")};
 content.experience=collectEntries("experience-editor","experience");content.projects=collectEntries("project-editor","project");content.articles=collectEntries("article-editor","article");
 content.skills=[{title:"Salesforce & Development",items:read("skills0").split(",").map(x=>x.trim()).filter(Boolean)},{title:"DevOps & Cloud",items:read("skills1").split(",").map(x=>x.trim()).filter(Boolean)},{title:"Operations & Delivery",items:read("skills2").split(",").map(x=>x.trim()).filter(Boolean)}];
 const {error}=await sb.from("portfolio_content").upsert({id:1,content,updated_at:new Date().toISOString()});
 if(error)setStatus("save-status",error.message,true);else setStatus("save-status","Saved. Your public portfolio is updated.");
};
init();
