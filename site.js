const fallback = {
 profile:{name:"Vinaytejesh Suggurthi",role:"Salesforce SRE · DevOps · CRM",intro:"Salesforce professional with around 10 years of experience across CRM administration, development, production operations and DevOps delivery.",about:"I work across the Salesforce lifecycle—from platform configuration and custom development to production support, release coordination and CI/CD automation. I enjoy making enterprise platforms more reliable, maintainable and easier for teams to deliver on.",email:"vinaytej251@gmail.com",phone:"+1 778-807-0992",location:"Vancouver, BC, Canada",linkedin:"https://linkedin.com/in/svt02d",resumeUrl:""},
 experience:[
 {role:"Consultant, Production Application Operations",company:"CIBC · Toronto, Ontario",date:"August 2024 – Present",bullets:["Support enterprise Salesforce CRM, Marketing Cloud and Loyalty Management platforms.","Improve platform reliability through incident management, monitoring and proactive health checks.","Optimize Marketing Cloud journeys, automations and campaign operations.","Create operational documentation, dashboards and support playbooks."]},
 {role:"Consultant, Production Application Operations",company:"CIBC · Toronto, Ontario",date:"January 2024 – August 2024",bullets:["Delivered production support for Salesforce CRM and Salesforce Gen AI capabilities.","Supported platform adoption, usage monitoring, data quality and operational governance.","Collaborated with Salesforce engineering and business teams to troubleshoot production issues."]},
 {role:"Consultant, Production Application Operations",company:"CIBC · Toronto, Ontario",date:"November 2021 – December 2023",bullets:["Supported Salesforce CRM and nCino banking workflows with 99.9%+ uptime experience.","Managed AutoRABIT and Azure DevOps CI/CD pipelines and coordinated production releases.","Improved deployment reliability, integrations, backup practices and root-cause analysis."]},
 {role:"Salesforce Developer / Administrator",company:"OpenText · Waterloo, Ontario",date:"November 2020 – September 2021",bullets:["Developed and administered Salesforce solutions using Apex, Visualforce and Lightning.","Supported Salesforce CPQ, integrations, data migration, GitLab and Jenkins deployments."]},
 {role:"Salesforce Administrator / Developer",company:"SOLJIT · Montréal, Quebec",date:"January 2019 – September 2020",bullets:["Designed and delivered Salesforce customizations, Apex logic, Lightning components and Flows.","Supported security, data quality, integrations, testing and production issue resolution."]},
 {role:"Salesforce Administrator",company:"CTS (Investors Group Management) · Vancouver, BC",date:"May 2017 – December 2018",bullets:["Configured Salesforce objects, profiles, roles, sharing, workflows, approvals and reports.","Supported data loading, sandbox testing, deployment and technical documentation."]}
 ],
 skills:[
 {title:"Salesforce & Development",items:["Salesforce CRM","Apex","Apex Triggers","LWC","Visualforce","Sales Cloud","Service Cloud","Marketing Cloud","Journey Builder","Loyalty Management","nCino","Salesforce CPQ","REST APIs","SOQL / SOSL"]},
 {title:"DevOps & Cloud",items:["AutoRABIT","Azure DevOps","Jenkins","Git","GitLab","CI/CD","Release Management","Microsoft Azure","App Services","Logic Apps","Key Vault","Blob Storage","Infrastructure as Code"]},
 {title:"Operations & Delivery",items:["Incident Management","Root Cause Analysis","Production Support","Monitoring","Change Management","Agile / Scrum","ITIL","Access Management","Backup & Recovery","Documentation"]}
 ],
 projects:[
 {title:"Salesforce CI/CD release pipeline",icon:"⎇",description:"An illustrative deployment flow showing source control, validation, approvals and promotion across Salesforce environments.",steps:["Developer commits metadata to Git","CI pipeline validates package and runs Apex tests","Release approval gates QA → UAT → Production","Deployment report and rollback checkpoint recorded"],tags:["Azure DevOps","Git","AutoRABIT","CI/CD"]},
 {title:"Salesforce production operations",icon:"◉",description:"A sample operations dashboard concept for incident triage, service health, change tracking and recurring issue analysis.",steps:["Monitor platform health and incoming alerts","Classify incident by severity and business impact","Investigate logs and integration dependencies","Document root cause and preventive action"],tags:["SRE","Incident Management","Monitoring"]},
 {title:"Marketing Cloud journey operations",icon:"✉",description:"A conceptual Journey Builder and Automation Studio lifecycle for campaign quality checks and operational readiness.",steps:["Prepare and validate audience segment","Run pre-send data and content checks","Execute journey / automation schedule","Review delivery, bounce and engagement metrics"],tags:["Marketing Cloud","Journey Builder","Automation Studio"]}
 ],
 articles:[
 {date:"FIELD NOTE 01",title:"A practical Salesforce release checklist",summary:"A release-readiness checklist covering metadata validation, Apex tests, approvals and post-deployment verification.",url:""},
 {date:"FIELD NOTE 02",title:"Reducing repeat incidents with root-cause analysis",summary:"How clear incident categorization, runbooks and corrective actions can improve production support.",url:""},
 {date:"FIELD NOTE 03",title:"Operating Salesforce Marketing Cloud journeys",summary:"Operational considerations for audience validation, automation monitoring and campaign performance.",url:""}
 ]
};
function esc(s=""){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function render(data){
 const p=data.profile||fallback.profile;
 document.title=`${p.name||fallback.profile.name} | Salesforce SRE & DevOps`;
 document.getElementById("hero-intro").textContent=p.intro||fallback.profile.intro;
 document.getElementById("about-text").textContent=p.about||fallback.profile.about;
 document.getElementById("resume-link").href=p.resumeUrl||"#contact";
 document.getElementById("resume-link").style.opacity=p.resumeUrl?"1":".55";
 document.getElementById("email-link").href=`mailto:${p.email||fallback.profile.email}`;
 document.querySelectorAll(".contact-links a[href^='mailto:']").forEach(a=>a.href=`mailto:${p.email||fallback.profile.email}`);
 document.getElementById("linkedin-link").href=p.linkedin||fallback.profile.linkedin;
 document.getElementById("location-text").textContent=p.location||fallback.profile.location;
 document.getElementById("experience-list").innerHTML=(data.experience||[]).map(e=>`<article class="timeline-item"><div class="timeline-date">${esc(e.date)}</div><div><h3>${esc(e.role)}</h3><div class="company">${esc(e.company)}</div><ul>${(e.bullets||[]).map(b=>`<li>${esc(b)}</li>`).join("")}</ul></div></article>`).join("");
 document.getElementById("skills-list").innerHTML=(data.skills||[]).map(s=>`<article class="skill-card"><h3>${esc(s.title)}</h3><div class="tags">${(s.items||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div></article>`).join("");
 document.getElementById("projects-list").innerHTML=(data.projects||[]).map((x,i)=>`<article class="project-card"><div class="project-visual">${esc(x.icon||"⌘")}</div><div class="project-body"><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p><div class="tags">${(x.tags||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div><div class="project-actions"><button class="demo-btn" data-demo="${i}">Explore demo ↗</button></div><div class="demo-output" id="demo-${i}">${(x.steps||[]).map((s,n)=>`${String(n+1).padStart(2,"0")}  ${esc(s)}`).join("\n")}</div></div></article>`).join("");
 document.querySelectorAll("[data-demo]").forEach(b=>b.addEventListener("click",()=>document.getElementById(`demo-${b.dataset.demo}`).classList.toggle("show")));
 document.getElementById("blog-list").innerHTML=(data.articles||[]).map(a=>`<article class="blog-card"><span class="date">${esc(a.date)}</span><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p>${a.url?`<a href="${esc(a.url)}" target="_blank" rel="noopener">Read article ↗</a>`:"<span class='admin-link'>Article preview</span>"}</article>`).join("");
}
async function loadPortfolio(){
 let data=fallback;
 if(window.supabase&&window.SUPABASE_URL&&!window.SUPABASE_URL.startsWith("YOUR_")){
  try{const client=window.supabase.createClient(window.SUPABASE_URL,window.SUPABASE_ANON_KEY);const {data:row,error}=await client.from("portfolio_content").select("content").eq("id",1).maybeSingle();if(!error&&row?.content)data=row.content;}catch(e){console.warn("Using built-in portfolio content",e);}
 }
 render(data);document.getElementById("year").textContent=new Date().getFullYear();
}
loadPortfolio();
