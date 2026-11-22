# Private portfolio admin dashboard — setup guide

Your website has a public portfolio (`index.html`) and a separate private editor (`admin.html`). The editor uses Supabase Authentication and a database row protected by Row Level Security (RLS). Do **not** rely on hiding the admin URL: the database policies are what enforce access.

## 1. Create your Supabase project
1. Create a project at https://supabase.com.
2. In **Project Settings → API**, copy the Project URL and the `anon` / publishable public key.
3. Open `supabase-config.js` and replace:
   - `YOUR_SUPABASE_PROJECT_URL`
   - `YOUR_SUPABASE_ANON_PUBLIC_KEY`
4. Never use the `service_role` key in browser code.

## 2. Create your private admin login
1. In Supabase, open **Authentication → Users**.
2. Add a user using your own email address and a strong unique password.
3. Open that user and copy their **User UID**.

Do not enable public sign-ups. Only create the admin user yourself from the Supabase dashboard.

## 3. Create the content table and lock it to your user
Open **SQL Editor → New query**. Replace `PASTE-YOUR-ADMIN-USER-UUID-HERE` below with the UID from step 2, then run:

```sql
create table if not exists public.portfolio_content (
  id integer primary key check (id = 1),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;

drop policy if exists "Public can read portfolio" on public.portfolio_content;
create policy "Public can read portfolio"
on public.portfolio_content for select
to anon, authenticated
using (id = 1);

drop policy if exists "Only portfolio owner can update" on public.portfolio_content;
create policy "Only portfolio owner can update"
on public.portfolio_content for update
to authenticated
using (auth.uid() = 'PASTE-YOUR-ADMIN-USER-UUID-HERE'::uuid)
with check (auth.uid() = 'PASTE-YOUR-ADMIN-USER-UUID-HERE'::uuid);

drop policy if exists "Only portfolio owner can insert" on public.portfolio_content;
create policy "Only portfolio owner can insert"
on public.portfolio_content for insert
to authenticated
with check (auth.uid() = 'PASTE-YOUR-ADMIN-USER-UUID-HERE'::uuid);
```

## 4. Add the initial portfolio content
Run this SQL once. It inserts the starter content used by the website. You can edit it later from the admin dashboard.

```sql
insert into public.portfolio_content (id, content)
values (1, '{
  "profile": {
    "name": "Vinaytejesh Suggurthi",
    "role": "Salesforce SRE · DevOps · CRM",
    "intro": "Salesforce professional with around 10 years of experience across CRM administration, development, production operations and DevOps delivery.",
    "about": "I work across the Salesforce lifecycle—from platform configuration and custom development to production support, release coordination and CI/CD automation. I enjoy making enterprise platforms more reliable, maintainable and easier for teams to deliver on.",
    "email": "vinaytej251@gmail.com",
    "phone": "+1 778-807-0992",
    "location": "Vancouver, BC, Canada",
    "linkedin": "https://linkedin.com/in/svt02d",
    "resumeUrl": ""
  },
  "experience": [
    {"role":"Consultant, Production Application Operations","company":"CIBC · Toronto, Ontario","date":"August 2024 – Present","bullets":["Support enterprise Salesforce CRM, Marketing Cloud and Loyalty Management platforms.","Improve platform reliability through incident management, monitoring and proactive health checks.","Optimize Marketing Cloud journeys, automations and campaign operations.","Create operational documentation, dashboards and support playbooks."]},
    {"role":"Consultant, Production Application Operations","company":"CIBC · Toronto, Ontario","date":"January 2024 – August 2024","bullets":["Delivered production support for Salesforce CRM and Salesforce Gen AI capabilities.","Supported platform adoption, usage monitoring, data quality and operational governance."]},
    {"role":"Consultant, Production Application Operations","company":"CIBC · Toronto, Ontario","date":"November 2021 – December 2023","bullets":["Supported Salesforce CRM and nCino banking workflows with 99.9%+ uptime experience.","Managed AutoRABIT and Azure DevOps CI/CD pipelines and coordinated production releases."]},
    {"role":"Salesforce Developer / Administrator","company":"OpenText · Waterloo, Ontario","date":"November 2020 – September 2021","bullets":["Developed and administered Salesforce solutions using Apex, Visualforce and Lightning.","Supported Salesforce CPQ, integrations, data migration, GitLab and Jenkins deployments."]},
    {"role":"Salesforce Administrator / Developer","company":"SOLJIT · Montréal, Quebec","date":"January 2019 – September 2020","bullets":["Designed and delivered Salesforce customizations, Apex logic, Lightning components and Flows.","Supported security, data quality, integrations, testing and production issue resolution."]},
    {"role":"Salesforce Administrator","company":"CTS (Investors Group Management) · Vancouver, BC","date":"May 2017 – December 2018","bullets":["Configured Salesforce objects, profiles, roles, sharing, workflows, approvals and reports.","Supported data loading, sandbox testing, deployment and technical documentation."]}
  ],
  "skills": [
    {"title":"Salesforce & Development","items":["Salesforce CRM","Apex","Apex Triggers","LWC","Visualforce","Sales Cloud","Service Cloud","Marketing Cloud","Journey Builder","Loyalty Management","nCino","Salesforce CPQ","REST APIs","SOQL / SOSL"]},
    {"title":"DevOps & Cloud","items":["AutoRABIT","Azure DevOps","Jenkins","Git","GitLab","CI/CD","Release Management","Microsoft Azure","App Services","Logic Apps","Key Vault","Blob Storage","Infrastructure as Code"]},
    {"title":"Operations & Delivery","items":["Incident Management","Root Cause Analysis","Production Support","Monitoring","Change Management","Agile / Scrum","ITIL","Access Management","Backup & Recovery","Documentation"]}
  ],
  "projects": [
    {"title":"Salesforce CI/CD release pipeline","icon":"⎇","description":"An illustrative deployment flow showing source control, validation, approvals and promotion across Salesforce environments.","steps":["Developer commits metadata to Git","CI pipeline validates package and runs Apex tests","Release approval gates QA → UAT → Production","Deployment report and rollback checkpoint recorded"],"tags":["Azure DevOps","Git","AutoRABIT","CI/CD"]},
    {"title":"Salesforce production operations","icon":"◉","description":"A sample operations dashboard concept for incident triage, service health, change tracking and recurring issue analysis.","steps":["Monitor platform health and incoming alerts","Classify incident by severity and business impact","Investigate logs and integration dependencies","Document root cause and preventive action"],"tags":["SRE","Incident Management","Monitoring"]},
    {"title":"Marketing Cloud journey operations","icon":"✉","description":"A conceptual Journey Builder and Automation Studio lifecycle for campaign quality checks and operational readiness.","steps":["Prepare and validate audience segment","Run pre-send data and content checks","Execute journey / automation schedule","Review delivery, bounce and engagement metrics"],"tags":["Marketing Cloud","Journey Builder","Automation Studio"]}
  ],
  "articles": [
    {"date":"FIELD NOTE 01","title":"A practical Salesforce release checklist","summary":"A release-readiness checklist covering metadata validation, Apex tests, approvals and post-deployment verification.","url":""},
    {"date":"FIELD NOTE 02","title":"Reducing repeat incidents with root-cause analysis","summary":"How clear incident categorization, runbooks and corrective actions can improve production support.","url":""},
    {"date":"FIELD NOTE 03","title":"Operating Salesforce Marketing Cloud journeys","summary":"Operational considerations for audience validation, automation monitoring and campaign performance.","url":""}
  ]
}'::jsonb)
on conflict (id) do nothing;
```

## 5. Configure authentication
In **Authentication → URL Configuration**:
- Set the Site URL to your deployed website URL.
- Add your deployed website URL to Redirect URLs.
- Add `http://localhost:3000/**` only if you plan to test locally.

In **Authentication → Providers → Email**, keep email/password sign-in enabled. Turn off public sign-ups if the setting is available. The admin user is created manually in the Supabase dashboard.

## 6. Deploy the website
1. Upload the contents of this folder to a private GitHub repository.
2. Import the repository into https://vercel.com.
3. Deploy the site. No build command is needed for this static HTML version.
4. Test the public site and `/admin.html`.
5. Only you should know your admin login credentials. The admin route is not a secret; the Supabase RLS policy prevents other authenticated users from writing to the content row.

## How updates work
- Visit `https://YOUR-DOMAIN/admin.html`.
- Sign in with your admin email and password.
- Edit profile, experience, skills, project demos and blog entries.
- Click **Save & publish**. The public website reads the updated content from Supabase.

## Important notes
- The demo project workflows are clearly illustrative. Replace them with sanitized work samples you can publicly discuss.
- Do not publish confidential client data, internal architecture, access details, screenshots, credentials or proprietary code.
- The public resume URL should point to a PDF you are comfortable sharing.
- The profile phone and email are public contact information. Remove or change them in the admin dashboard if you do not want them public.
- Supabase free-tier limits and product settings can change. Check the current Supabase documentation when configuring the project.
