'use strict';
(()=>{
 const sections=window.BOOK_SECTIONS;
 const notes=window.BOOK_NOTES;
 const byId=new Map(sections.map(x=>[x.tocIndex,x]));
 Object.assign(glossary,{
  ACID:['Atomicity, consistency, isolation, and durability describe transaction guarantees.','Grouped changes','Defined transaction behavior'],
  API:['An application programming interface defines how software can request an operation or exchange data.','Request','Defined response'],
  BASE:['Basically available, soft state, and eventual consistency describe a family of distributed-system design ideas.','Temporary differences','Eventual agreement'],
  BI:['Business intelligence uses data to understand and support business decisions.','Business data','Reports and analysis'],
  CAP:['Consistency, availability, and partition tolerance concern distributed-system behavior. During a network partition, full availability and linearizable consistency cannot both be guaranteed.','Network partition','Defined read and write policy'],
  CDN:['A content delivery network serves suitable content from distributed locations, often using caches.','Original content','Nearby delivery'],
  'CI/CD':['Continuous integration checks combined code changes. Continuous delivery or deployment prepares or releases verified changes through an automated process.','Reviewed change','Controlled release'],
  CPU:['A central processing unit executes program instructions.','Program instructions','Processed values'],
  CRUD:['Create, read, update, and delete are four basic operations on stored data.','Stored record','Read or change it'],
  CSV:['Comma-separated values is a family of delimited text conventions. Agree on quoting, separators, encoding, and types.','Delimited text','Parsed records'],
  DAG:['A directed acyclic graph represents dependencies without dependency cycles.','Required task','Dependent task'],
  DDL:['Data definition language creates or changes database objects.','CREATE or ALTER','Database object'],
  DML:['Data manipulation language reads or changes stored data.','SELECT or UPDATE','Rows or results'],
  DCL:['Data control language manages database permissions.','GRANT or REVOKE','Allowed access'],
  TCL:['Transaction control language manages transaction completion or cancellation.','COMMIT or ROLLBACK','Transaction state'],
  ETL:['Extract, transform, and load means preparing data before loading it into the chosen target.','Transform first','Load prepared data'],
  ELT:['Extract, load, and transform means loading data before preparing it in the chosen target environment.','Load first','Transform there'],
  GPU:['A graphics processing unit can execute many suitable operations in parallel. Its usefulness depends on the workload.','Parallel workload','Suitable accelerated processing'],
  HTTP:['Hypertext Transfer Protocol defines web request and response communication. HTTPS adds protected transport using TLS.','Web request','Web response'],
  HTTPS:['HTTPS uses TLS to protect HTTP communication. Endpoint identity and access permissions still require correct handling.','Authenticated protected connection','Data transfer'],
  IaaS:['Infrastructure as a service provides resources such as virtual machines and storage. Customers operate more of the software stack.','Provider infrastructure','Customer software'],
  PaaS:['Platform as a service provides a managed application or processing environment. Responsibilities depend on the service.','Managed platform','Deployed workload'],
  SaaS:['Software as a service provides a managed software product. Customers still manage their data use and relevant configuration.','Managed software','User task'],
  IoT:['The Internet of Things connects devices that collect or act on information.','Device measurement','Data or action'],
  IOPS:['Input/output operations per second measures an operation rate. It differs from bytes transferred per second.','Many small operations','Operation-rate limit'],
  JSON:['JavaScript Object Notation represents objects, arrays, and scalar values in text.','Text document','Structured values'],
  JSONL:['JSON Lines stores a separate complete JSON value on each line.','One value per line','Bulk records'],
  JVM:['The Java Virtual Machine runs compatible compiled programs, including much Spark code.','Compatible program','Runtime execution'],
  MDM:['Master data management maintains agreed identities and definitions for shared business entities.','Customer identities','Consistent shared entity'],
  ML:glossary['Machine learning'],
  NoSQL:['NoSQL is a broad label for database approaches beyond traditional relational designs. Capabilities differ across systems.','Selected data model','Model-specific access'],
  OSS:['Open source software makes source code available under its license. Operation and support are separate questions.','Licensed source code','Use and operation'],
  PII:['Personally identifiable information can identify or be linked to a person. Context and applicable policy affect its handling.','Personal information','Required protection'],
  RAID:['A redundant array of independent disks combines disks under a selected capacity, performance, and failure-tolerance layout. It is not an independent backup.','Multiple disks','Defined disk-array behavior'],
  REST:['Representational State Transfer is an architectural style often used for resource-oriented web APIs.','Resource request','Representation or operation'],
  RPC:['A remote procedure call asks another process or service to execute an operation.','Operation request','Remote response'],
  SLA:['A service-level agreement states agreed service expectations.','Provider and consumer','Agreed service'],
  SLO:['A service-level objective is a measurable target for service behavior.','Measured behavior','Target comparison'],
  SQL:['Structured Query Language describes operations on supported database objects and data. Dialects differ.','Requested result','Engine execution plan'],
  SSH:['Secure Shell provides authenticated, encrypted remote communication. Keys and endpoint verification still need management.','Verified remote identity','Protected connection'],
  SFTP:['SSH File Transfer Protocol moves and manages files through protected SSH-based communication.','Source file','Transferred file'],
  SCP:['Secure copy is a file-copy interface associated with SSH. Implementation and protocol behavior depend on the tool.','Source path','Target copy'],
  SSO:['Single sign-on uses a managed identity to access supported services.','Managed sign-in','Authorized service access'],
  TLS:['Transport Layer Security protects communication between endpoints using cryptographic protocols.','Verified connection','Protected transferred bytes'],
  TTL:['Time to live defines how long a record or entry remains under an expiry policy.','Stored entry','Expiry or removal'],
  UDF:['A user-defined function adds custom processing to an engine. It can have different optimization and execution costs from native operations.','Custom operation','Engine result'],
  VPC:['A virtual private cloud provides a defined virtual network environment. Private networking still needs identity and access controls.','Configured network','Allowed connections'],
  XML:['Extensible Markup Language uses tags to represent structured information.','Tagged text','Parsed structure']
 });
 const sourceRootIds={1:14,2:32,3:49,4:85,5:131,6:161,7:203,8:259,9:288,10:322,11:341,12:354,13:361};
 const chapterScene={1:'role',2:'lifecycle',3:'architecture',4:'tools',5:'sources',6:'storage',7:'cadence',8:'query',9:'serving',10:'security',11:'future',12:'formats',13:'network'};
 const linked={role:[16,23,24,27],maturity:[21],lifecycle:[33,34,35,36,37,38,39],supports:[40,41,42,43,44,45,46],architecture:[50,54,55,56,57,58,59,60,61,62,63],failure:[60,66,67],tools:[86,87,88,89,103,112],sources:[132,136,137,145],cdc:[138,232],storage:[175,181,182,183,190],consistency:[171,172],cadence:[206,207,214],push:[213,228],schema:[189,221],delivery:[223,224,227],query:[261,262,263,264],etl:[217,273],model:[267,268,269,270],scd:[270],serving:[289,296,300,310],metrics:[294,308],security:[329,330,335,337],backup:[331],future:[342,343,344,347],formats:[355,356,357,358,360],network:[362,363,364,365,367]};
 const walk={
 role:['The source produces a fact, such as an order.','The engineer makes the fact reliable and suitable for use.','The chosen user determines which result is useful.'],
 maturity:['Start creates a small, useful foundation.','Scale makes that work repeatable across growing demand.','Lead connects trusted data with decisions and products.'],
 lifecycle:['Create records one sale in the source database.','Copy brings the row into the pipeline. The source keeps its own record.','Shape checks the row and prepares its amount for analysis.','Use presents the prepared amount in a report. Storage supports several of these actions.'],
 supports:['Select one support to see its example actions.','The support applies across the pipeline, not only in one stage.','Read each supporting lesson below to see the responsibilities hidden by the short labels.'],
 architecture:['Select one of the nine design principles.','The three boxes show one way that principle affects a design.','The principle is a decision guide. A complete design also needs users, requirements, and operating limits.'],
 failure:['The source sends two sales events.','A retained queue keeps them while a worker is stopped.','Retry restores processing. Duplicate-safe logic prevents repeated effects.','The direct-connection option shows stronger dependence on the worker.'],
 tools:['The user’s need comes before a product choice.','The team creates a design to meet that need.','Build and Buy change who develops and operates the component.','The team-size control illustrates support effort. It does not calculate a real price.'],
 sources:['Application code accepts a business action.','An operational database saves the order.','An analytical workload groups many records to answer a question.','Application code, database software, and stored data have different responsibilities.'],
 cdc:['Insert, update, or delete a source row.','CDC adds the corresponding change to the log.','The target waits until a consumer applies the captured changes.','Apply changes updates the target. Capturing and applying are different responsibilities.'],
 storage:['The bottom layer retains the data.','A table-management layer can add schema, transactions, and history.','Processing engines read or change the data.','Lake, warehouse, and lakehouse are architecture patterns, not interchangeable names for one component.'],
 consistency:['The primary copy receives a new amount.','The replica still has the earlier amount until synchronization.','An eventual read can see that earlier value.','The strong option represents a policy that protects the agreed read guarantee. Real implementations use their own coordination methods.'],
 cadence:['Send several distinct events.','Batch leaves them waiting until Load batch is pressed.','Streaming moves each event without that deliberate batch wait.','Real systems still have transfer and processing delay. Streaming can also use small internal batches.'],
 push:['The source always supplies the data.','Push lets the source start the transfer.','Pull lets the target request the data.','Poll repeatedly checks for changes. The blue request arrow goes toward the source. The data arrow goes toward the target.'],
 schema:['The target starts with an integer ID and a numeric amount.','Fixed schema rejects an unexpected city column.','Allow added column accepts city and adds it to the allowed shape.','The text hello still fails the numeric amount rule. Evolution does not remove validation.'],
 delivery:['E1 represents one sale of ₹120.','Send and Replay can deliver that same event more than once.','Duplicate protection counts the stable ID only once.','A bad event goes to the error queue for inspection or repair. Changing the protection option compares policies over the displayed history.'],
 query:['The table has three daily partitions.','The filtered query asks for only 01 Mar.','Its total is ₹200. Without that filter, the total is ₹500.','The row counts illustrate pruning. A real execution plan determines physical reads and work.'],
 etl:['Extract reads four raw rows.','Transform removes a duplicate and an invalid negative sale under this example’s rule.','ETL loads the two clean rows. ELT first loads the four raw rows and then transforms them.','Both finish with the same intended prepared result.'],
 model:['The central fact table records one order item per row.','Its keys connect that event to customer, product, and date details.','Select a dimension to see the matching key.','A correct grain and correct join prevent accidental double counting.'],
 scd:['Ravi initially lives in Hyderabad.','The source changes his city to Pune on 01 Apr.','Type 1 replaces the value. Type 2 keeps dated versions. Type 3 keeps limited previous values in columns.','For Type 2, the start is included and the end is excluded in this example.'],
 serving:['The prepared sales table is the input.','Analytics makes information available for questions and reports.','Machine learning needs suitable training or inference inputs.','Reverse ETL sends prepared information into an operational application.'],
 metrics:['Two orders are paid. A third order is cancelled.','Paid sales is ₹200. All order amounts is ₹260.','Both calculations use the same source rows. Their business definitions differ.','A shared metrics layer helps reports use the same agreed rule.'],
 security:['Select a role and request the customer data.','The access check applies the example policy.','A guest gets no rows. An analyst gets masked personal information. An authorized steward gets the fuller record.','Masking, encryption, network control, and access control address different risks.'],
 backup:['The working table contains two orders.','A separate backup provides a recovery copy.','Delete the working table and restore it from the backup.','Without the backup, this example has no recovery copy. A real backup also needs restore testing and protection.'],
 future:['The chapter describes the authors’ expectations in 2022.','Select a focus to inspect the proposed direction.','The engineer still owns design, quality, protection, and useful operation.','A forecast is not evidence that every predicted change has already occurred.'],
 formats:['Each record contains an ID, city, and amount.','The row layout keeps those values together by record.','The column layout places amount values together, so an analytical reader can focus on that column.','Compression reduces encoded bytes. The logical-value counts do not measure actual file bytes or disk reads.'],
 network:['The region contains separate availability zones.','Same zone puts both copies in the same local failure area.','Separate zones places a copy in each area.','Failing Zone A leaves a copy available only in the separate-zone example. A wider regional failure has different effects.']
 };
 let view='diagram',selected=sourceRootIds[2],search='',sourcePage=58;
 let localPdfUrl='',localPdfName='',sourceError='',sourceLoading=false,sourceSelection=0;
 const hashId=Number(location.hash.replace('#section-',''));
 if(location.hash.startsWith('#section-')&&byId.has(hashId)){selected=hashId;view='reader';}
 const e=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const termPattern=/\b(ACID|API|BASE|BI|CAP|CDN|CDC|CI\/CD|CPU|CRUD|CSV|DAG|DDL|DML|DCL|TCL|ETL|ELT|GPU|HTTP|HTTPS|IaaS|PaaS|SaaS|IoT|IOPS|JSON|JSONL|JVM|MDM|ML|NoSQL|OLTP|OLAP|OSS|PII|RAID|REST|RPC|SCD|SLA|SLO|SQL|SSH|SFTP|SCP|SSO|TLS|TTL|UDF|VPC|XML)\b/g;
 const explain=v=>e(v).replace(termPattern,t=>`<button class="inline-term" data-term="${t}" aria-label="Explain ${t}">${t}</button>`);
 const paragraphs=t=>String(t||'').split(/\n\n/).map(x=>`<p>${explain(x)}</p>`).join('');
 const searchable=new Map(sections.map(s=>[s.tocIndex,[s.title,notes[s.tocIndex]?.meaning,notes[s.tocIndex]?.why,...(notes[s.tocIndex]?.details||[]),notes[s.tocIndex]?.example].join(' ').toLowerCase()]));
 const childSections=s=>{const at=sections.indexOf(s);const list=[];for(let i=at+1;i<sections.length;i++){if(sections[i].depth<=s.depth)break;list.push(sections[i]);}return list;};
 function noteHTML(id,compact=false){
  const section=byId.get(id),n=notes[id];
  if(!section||!n)return '<p>This section is unavailable.</p>';
  return `<article class="study-article"><div class="study-source">${e(section.chapter>11?'Appendix '+(section.chapter===12?'A':'B'):'Chapter '+section.chapter)} · Book p. ${section.bookPage} · PDF p. ${section.pdfPage}<button data-source-page="${section.pdfPage}">Read the source page</button></div>${compact?`<h3>${e(section.title.replace(/^Chapter \d+\. /,''))}</h3>`:''}<div class="reading-meaning">${paragraphs(n.meaning)}</div><h3>Why this matters</h3>${paragraphs(n.why)}<h3>Keep these details</h3><ul>${n.details.map(x=>`<li>${explain(x)}</li>`).join('')}</ul><div class="reading-example"><span class="example-label">EXAMPLE</span>${paragraphs(n.example)}</div></article>`;
 }
 function getChapter(){const active=window.visualGuide.getState().active;if(active==='network')return 13;if(active==='formats')return 12;return sections.find(s=>s.tocIndex===sourceRootIds[Number(chapters.find(c=>c.scenes.includes(active)).n)])?.chapter||2;}
 function matching(){const terms=search.toLowerCase().trim().split(/\s+/).filter(Boolean);return sections.filter(s=>terms.length?terms.every(t=>searchable.get(s.tocIndex).includes(t)):s.chapter===byId.get(selected).chapter);}
 function renderIndex(){const list=matching();document.getElementById('study-index').innerHTML=list.map(s=>`<button class="study-index-item depth-${s.depth}" data-study-section="${s.tocIndex}" aria-current="${s.tocIndex===selected}"><span>${e(s.title.replace(/^Chapter \d+\. /,''))}</span><small>${search?(s.chapter>11?'App. '+(s.chapter===12?'A':'B'):'Ch. '+s.chapter)+' · ':''}p. ${s.bookPage}</small></button>`).join('')||'<p class="study-empty">No section matches this text.</p>';document.getElementById('study-match-count').textContent=search?`${list.length} matching sections`:`${list.length} chapter entries`;}
 function renderReader(){
  const s=byId.get(selected),list=sections.filter(x=>x.chapter===s.chapter),at=list.indexOf(s),globalAt=sections.indexOf(s);const children=childSections(s);const chapterDiagrams=chapters.find(c=>c.scenes.includes(chapterScene[s.chapter])).scenes;
  document.getElementById('chapter-reader').innerHTML=`<div class="reader-intro"><strong>Read the explanations in book order.</strong><span>354 indexed topics · 11 chapters · 2 appendices. These lessons simplify the book. Open your original PDF to check its full details.</span></div><div class="reading-grid"><aside class="study-index"><label for="study-search">Find a book topic</label><input id="study-search" type="search" value="${e(search)}" placeholder="Type a topic name" autocomplete="off"><div id="study-match-count" class="study-count"></div><nav id="study-index" aria-label="Book sections"></nav></aside><div class="reading-content"><div class="section-step"><button data-study-step="previous" ${globalAt===0?'disabled':''}>Previous section</button><span>${at+1} of ${list.length} in this chapter</span><button data-study-step="next" ${globalAt===sections.length-1?'disabled':''}>Next section</button></div><h2 id="reading-title" tabindex="-1">${e(s.title)}</h2>${noteHTML(selected)}<div class="reader-diagrams"><h3>Explore this chapter’s diagrams</h3>${chapterDiagrams.map(id=>`<button data-scene="${id}" data-study-view="diagram">${e(lessonInfo[id][1])}</button>`).join('')}</div>${children.length?`<div class="related-sections"><h3>Continue with these sections</h3>${children.map(x=>`<button data-study-section="${x.tocIndex}">${e(x.title)}<small>p. ${x.bookPage}</small></button>`).join('')}</div>`:''}</div></div>`;
  renderIndex();
 }
 function renderSource(){
  const pageUrl=localPdfUrl?`${localPdfUrl}#page=${sourcePage}`:'';
  document.getElementById('source-reader').innerHTML=`<div class="source-file-panel"><div><h2>${localPdfUrl?'Your original PDF':'Open your copy of the book'}</h2><p id="source-file-help">Select your PDF from your computer. The file stays in this browser. The guide does not upload it.</p></div><label class="source-file-label" for="source-file">${localPdfUrl?'Choose another PDF':'Choose a PDF'}<input id="source-file" type="file" accept=".pdf,application/pdf" aria-describedby="source-file-help source-file-state" ${sourceLoading?'disabled':''}></label><p id="source-file-state" class="source-file-state" role="status">${sourceLoading?'Checking the selected file…':localPdfUrl?`Open: ${e(localPdfName)}. Select it again after you reload the page.`:'Use the same edition as this guide. Its original file has 445 PDF pages.'}</p>${sourceError?`<p class="source-file-error" role="alert">${e(sourceError)}</p>`:''}</div><div class="source-toolbar"><div><strong>Check the source page</strong><span>Use your original figures, tables, examples, notes, and references.</span></div><form id="source-jump"><label for="source-page">PDF page</label><input id="source-page" type="number" min="1" max="445" value="${sourcePage}" required><button type="submit">Go</button></form>${localPdfUrl?`<a href="${e(pageUrl)}" target="_blank" rel="noopener">Open this page in a new tab</a><button data-source-clear>Close this PDF</button>`:''}</div><p class="source-page-note">Book page numbers differ from PDF page numbers. For the numbered main text, PDF page = book page + 25. Your browser must support PDF viewing to jump to the requested page.</p>${localPdfUrl?`<object class="source-object" data="${e(pageUrl)}" type="application/pdf" aria-label="Your original PDF, page ${sourcePage}"><p>Your browser can open the PDF in a separate tab.</p><a href="${e(pageUrl)}" target="_blank" rel="noopener">Read your original PDF</a></object>`:`<div class="source-empty"><span class="eyebrow">SOURCE CHECK</span><h3>PDF page ${sourcePage} is ready.</h3><p>Choose your book PDF above to read this page.</p><p>The 354 lessons and 26 diagrams work without a PDF.</p></div>`}`;
 }
 async function loadSource(file){
  if(!file)return;
  const selection=++sourceSelection;
  sourceLoading=true;sourceError='';renderSource();
  try{
   const bytes=new Uint8Array(await file.slice(0,1024).arrayBuffer());
   if(selection!==sourceSelection)return;
   const header=String.fromCharCode(...bytes);
   if(!header.includes('%PDF-'))throw new Error('Select a valid PDF file. The selected file is not a PDF.');
   const nextUrl=URL.createObjectURL(file),oldUrl=localPdfUrl;
   localPdfUrl=nextUrl;localPdfName=file.name;
   if(oldUrl)URL.revokeObjectURL(oldUrl);
  }catch(error){
   if(selection===sourceSelection)sourceError=error.message==='Select a valid PDF file. The selected file is not a PDF.'?error.message:'The browser could not open this file. Select the PDF again.';
  }finally{
   if(selection===sourceSelection){sourceLoading=false;renderSource();}
  }
 }
 function clearSource(){
  ++sourceSelection;
  if(localPdfUrl)URL.revokeObjectURL(localPdfUrl);
  localPdfUrl='';localPdfName='';sourceError='';sourceLoading=false;
  renderSource();
 }
 function renderStudy(){
  const active=window.visualGuide.getState().active;
  document.getElementById('scene').hidden=view!=='diagram';
  document.getElementById('lesson-tabs').hidden=view!=='diagram';
  document.getElementById('diagram-lesson').hidden=view!=='diagram';
  document.getElementById('chapter-reader').hidden=view!=='reader';
  document.getElementById('source-reader').hidden=view!=='source';
  document.querySelector('.bottom-row').hidden=view!=='diagram';
  document.querySelectorAll('[data-study-view]').forEach(b=>b.setAttribute('aria-current',String(b.dataset.studyView===view)));
  if(view==='diagram'){
   document.getElementById('title').textContent=lessonInfo[active][0];
   document.getElementById('lesson-count').textContent=`Diagram ${ordered.indexOf(active)+1} / ${ordered.length}`;
   document.getElementById('diagram-lesson').innerHTML=`<div class="lesson-reading-head"><div><span class="eyebrow">UNDERSTAND THE DIAGRAM</span><h2>Read the steps. Then change the example.</h2></div><button data-study-view="reader">Read every section in this chapter</button></div><div class="walkthrough"><h3>Follow the example</h3><ol>${walk[active].map(x=>`<li>${e(x)}</li>`).join('')}</ol></div><div class="diagram-reading">${linked[active].map((id,i)=>`<details class="diagram-topic" ${i===0?'open':''}><summary>${e(byId.get(id).title)}<span>Read the explanation</span></summary>${noteHTML(id,true)}</details>`).join('')}</div>`;
  }else if(view==='reader'){
   const root=byId.get(sourceRootIds[byId.get(selected).chapter]);
   document.getElementById('title').textContent=root.title.replace(/^Chapter \d+\. /,'');
   document.getElementById('lesson-count').textContent=`${sections.filter(x=>x.chapter===root.chapter).length} section entries`;
   renderReader();
  }else{
   document.getElementById('title').textContent='Check the complete source';
   document.getElementById('lesson-count').textContent='445 PDF pages';renderSource();
  }
 }
 function selectSection(id){
  const s=byId.get(Number(id));if(!s)throw new Error('Select a valid book section.');
  selected=s.tocIndex;view='reader';search='';sourcePage=s.pdfPage;
  if(getChapter()!==s.chapter)window.visualGuide.selectScene(chapterScene[s.chapter]);
  history.replaceState(null,'','#section-'+selected);renderStudy();document.getElementById('reading-title').focus({preventScroll:true});document.getElementById('reading-title').scrollIntoView({block:'start'});
 }
 function selectView(next){if(!['diagram','reader','source'].includes(next))throw new Error('Select a valid study view.');view=next;window.visualGuide.selectScene(window.visualGuide.getState().active);if(next==='reader')history.replaceState(null,'','#section-'+selected);renderStudy();}
 window.addEventListener('diagram-rendered',()=>{const ch=getChapter();if(byId.get(selected).chapter!==ch){selected=sourceRootIds[ch];sourcePage=byId.get(selected).pdfPage;search='';}renderStudy();});
 document.addEventListener('click',event=>{
  const el=event.target.closest('[data-study-view],[data-study-section],[data-study-step],[data-source-page],[data-source-clear]');if(!el||el.disabled)return;
  if('sourceClear' in el.dataset){clearSource();return;}
  if(el.dataset.studyView){selectView(el.dataset.studyView);return;}
  if(el.dataset.studySection){selectSection(el.dataset.studySection);return;}
  if(el.dataset.sourcePage){sourcePage=Number(el.dataset.sourcePage);selectView('source');return;}
  if(el.dataset.studyStep){const list=sections;const next=list[list.findIndex(s=>s.tocIndex===selected)+(el.dataset.studyStep==='next'?1:-1)];if(next)selectSection(next.tocIndex);}
 });
 document.addEventListener('input',event=>{if(event.target.id==='study-search'){search=event.target.value;renderIndex();}});
 document.addEventListener('change',event=>{if(event.target.id==='source-file')return loadSource(event.target.files?.[0]);});
 document.addEventListener('submit',event=>{if(event.target.id!=='source-jump')return;event.preventDefault();const n=Number(document.getElementById('source-page').value);if(Number.isInteger(n)&&n>=1&&n<=445){sourcePage=n;renderSource();}});
 window.studyGuide={selectSection,selectView,getState:()=>({view,selected,sourcePage,chapter:byId.get(selected).chapter,sourceLoaded:Boolean(localPdfUrl)}),sections:sections.map(x=>({id:x.tocIndex,title:x.title,chapter:x.chapter})),coverage:()=>({indexed:sections.length,explained:sections.filter(s=>notes[s.tocIndex]).length,missing:sections.filter(s=>!notes[s.tocIndex]).map(s=>s.tocIndex),originalPdfPages:445})};
 window.addEventListener('pagehide',event=>{if(!event.persisted)clearSource();});
 window.addEventListener('hashchange',()=>{const id=Number(location.hash.replace('#section-',''));if(location.hash.startsWith('#section-')&&byId.has(id)){selectSection(id);}else if(ordered.includes(location.hash.slice(1))&&view!=='diagram'){selectView('diagram');}});
 if(view==='reader'){window.visualGuide.selectScene(chapterScene[byId.get(selected).chapter]);history.replaceState(null,'','#section-'+selected);}
 renderStudy();
})();
