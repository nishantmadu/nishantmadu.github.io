'use strict';
const chapters=[
 {n:'01',title:'The data engineer',pages:'3–31',scenes:['role','maturity']},
 {n:'02',title:'The data lifecycle',pages:'33–68',scenes:['lifecycle','supports']},
 {n:'03',title:'Design the system',pages:'71–113',scenes:['architecture','failure']},
 {n:'04',title:'Choose the tools',pages:'115–152',scenes:['tools']},
 {n:'05',title:'Where data starts',pages:'155–188',scenes:['sources','cdc']},
 {n:'06',title:'Store the data',pages:'189–231',scenes:['storage','consistency']},
 {n:'07',title:'Move the data',pages:'233–270',scenes:['cadence','push','schema','delivery']},
 {n:'08',title:'Shape the data',pages:'271–336',scenes:['query','etl','model','scd']},
 {n:'09',title:'Use the data',pages:'337–366',scenes:['serving','metrics']},
 {n:'10',title:'Keep data safe',pages:'369–378',scenes:['security','backup']},
 {n:'11',title:'What comes next',pages:'379–390',scenes:['future']},
 {n:'A',title:'Files & compression',pages:'391–397',scenes:['formats']},
 {n:'B',title:'Cloud networks',pages:'399–402',scenes:['network']}
];
const lessonInfo={
 role:['Make data useful','The engineer’s role','Select a user. See what the engineer must supply.','Ch. 1 · pp. 3–31'],
 maturity:['Grow one step at a time','Data maturity','Select a stage. See which work comes first.','Ch. 1 · pp. 13–17'],
 lifecycle:['Follow one sales record','The main map','Press Play. Watch order 47 move through each step.','Ch. 2 · pp. 33–48'],
 supports:['Protect every step','The six undercurrents','Select a support. See how it helps the pipeline.','Ch. 2 · pp. 48–67'],
 architecture:['Design before you choose tools','Good architecture','Select a principle. See the design reason.','Ch. 3 · pp. 77–87'],
 failure:['Keep parts independent','Loose coupling','Stop a worker. See where the data waits.','Ch. 3 · pp. 79–84, 98–100'],
 tools:['Fit the tool to the task','Technology choices','Change the team size. Compare Build and Buy.','Ch. 4 · pp. 115–143'],
 sources:['A sale creates data','Source systems','Select a workload. See what the database must do.','Ch. 5 · pp. 155–184'],
 cdc:['Capture a database change','Change data capture · CDC','Change a row. Then apply the change to the target.','Ch. 5 · pp. 159–160; Ch. 7 · pp. 252–254'],
 storage:['Keep data where tools can use it','Storage architectures','Select a design. See its storage and processing layers.','Ch. 6 · pp. 215–219'],
 consistency:['Copies need time to agree','Distributed storage','Write a new value. Compare the two read policies.','Ch. 6 · pp. 198–205'],
 cadence:['Move a group or move each event','Batch and streaming','Send events. Change the mode to see when they arrive.','Ch. 7 · pp. 236–238, 244–245'],
 push:['Who starts the transfer?','Push, pull, and poll','Select a pattern. Step through the request and the data.','Ch. 7 · p. 244'],
 schema:['Control the shape of a row','Schema enforcement and evolution','Choose a policy. Test a new field or a wrong value type.','Ch. 6 · p. 219; Ch. 7 · p. 248'],
 delivery:['Handle repeats and bad events','Delivery, replay, and errors','Send the same event twice. Switch duplicate protection.','Ch. 7 · pp. 248–250; Ch. 8 · pp. 326–328'],
 query:['Read less data to get the answer','Queries and performance','Switch the filter. See which rows the query needs.','Ch. 8 · pp. 272–287'],
 etl:['Change data before or after loading','ETL and ELT','Select a pattern. Step through the same sales rows.','Ch. 7 · p. 246; Ch. 8 · pp. 309–326'],
 model:['Connect events to their details','Facts, dimensions, and grain','Select a dimension. See the key that connects it.','Ch. 8 · pp. 287–307'],
 scd:['Choose how to keep a change','Slowly changing dimensions · SCD','Move Ravi to Pune. Compare three history policies.','Ch. 8 · pp. 298–301'],
 serving:['Give data to the user','Analytics, ML, and reverse ETL','Select a use. See where the prepared data goes.','Ch. 9 · pp. 337–359'],
 metrics:['Give one measure one meaning','Semantic and metrics layers','Change the sales definition. See the report result.','Ch. 9 · pp. 342, 355–356'],
 security:['Give each person the access they need','Security and privacy','Select a role. Try to read the customer data.','Ch. 10 · pp. 369–378'],
 backup:['Make a copy you can restore','Backups and recovery','Delete the working table. Try to restore it.','Ch. 10 · p. 372'],
 future:['Tools change. The job continues.','The book’s 2022 outlook','Select a focus. See what the authors expect to remain.','Ch. 11 · pp. 379–389'],
 formats:['A file format changes how you read','Serialization and compression','Select a layout. Read only the Amount column.','Appendix A · pp. 391–398'],
 network:['Separate copies can survive a local failure','Cloud networks','Fail Zone A. Compare where the copies are placed.','Appendix B · pp. 399–402']
};
const defaults={
 role:{user:'analyst'},maturity:{level:0},lifecycle:{step:0},supports:{item:0},architecture:{item:0},failure:{failed:false,coupling:'loose',retried:false},tools:{team:2,choice:'buy'},sources:{mode:'oltp'},cdc:{rows:[{id:47,amount:120}],target:[{id:47,amount:120}],log:[],applied:0},storage:{kind:'lakehouse'},consistency:{policy:'eventual',value:120,replica:120,synced:true},cadence:{mode:'batch',sent:0,loaded:0},push:{mode:'push',step:0},schema:{policy:'enforce',test:null,hasCity:false},delivery:{dedupe:true,received:[],bad:0},query:{filter:true},etl:{mode:'elt',step:0},model:{dimension:'Customer'},scd:{type:2,moved:false},serving:{use:'analytics'},metrics:{net:true},security:{role:'analyst',attempted:false},backup:{exists:true,copy:true,restored:false},future:{focus:0},formats:{layout:'column',compressed:false},network:{separate:true,failed:false}
};
const fresh=x=>JSON.parse(JSON.stringify(x));
const sceneStates=Object.fromEntries(Object.entries(defaults).map(([k,v])=>[k,fresh(v)]));
const ordered=chapters.flatMap(c=>c.scenes);
let active=ordered.includes(location.hash.slice(1))?location.hash.slice(1):'lifecycle';
let playing=null;
const $=id=>document.getElementById(id);
const escapeHtml=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const arrow=(live=false,label='',reverse=false)=>`<div class="connector${live?' live':''}${reverse?' reverse':''}"${label?` data-label="${escapeHtml(label)}"`:''} aria-hidden="true"><svg viewBox="0 0 38 20" fill="none"><path d="M1 10H34M26 3l8 7-8 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
const node=(n,title,sub='',theme='',data='',extra='')=>`<div class="node ${theme}">${n?`<div class="node-number">${n}</div>`:''}<div class="node-title">${title}</div>${sub?`<div class="node-sub">${sub}</div>`:''}${data?`<div class="node-data">${data}</div>`:''}${extra}</div>`;
const flow=(nodes,labels=[],live=0,reverse=false)=>`<div class="flow ${['','one','two','three','four'][nodes.length]||''}">${nodes.map((n,i)=>(i?arrow(i<=live,labels[i-1],reverse):'')+n).join('')}</div>`;
const button=(label,action,value='',selected=false,disabled=false)=>`<button data-action="${action}" data-value="${escapeHtml(value)}"${selected?' class="selected" aria-pressed="true"':''}${disabled?' disabled':''}>${label}</button>`;
const terms=(...names)=>`<div class="support-chips" aria-label="Technical names">${names.map(t=>`<button data-term="${escapeHtml(t)}">${t}</button>`).join('')}</div>`;
const result=(number,label,text)=>`<div class="result"><div><div class="result-number">${number}</div><div class="result-label">${label}</div></div><div class="result-text">${text}</div></div>`;
const table=(headers,rows,classes=[])=>`<div class="table-wrap"><table class="data-table"><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r,i)=>`<tr class="${classes[i]||''}">${r.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const box=(title,body)=>`<div class="box"><h3>${title}</h3>${body}</div>`;
const packet=(label,type='')=>`<span class="record ${type}">${label}</span>`;
function shell(diagram,controls='',out='',note=''){
 const info=lessonInfo[active];
 return `<div class="scene-top"><div><div class="scene-label">${info[1]}</div><div class="instruction">${info[2]}</div></div><span class="experiment-label">Try it</span></div><div class="diagram">${diagram}</div>${controls?`<div class="controls">${controls}${button('Reset','reset','','',false).replace('<button','<button class="reset"')}</div>`:''}${out}${note?`<div class="note-line">${note}</div>`:''}`;
}
const supports=[
 ['Security','Control access','Protect data','Log access','Give the right access to the right person.'],
 ['Data management','Name the data','Track its source','Set its lifetime','Keep definitions, ownership, quality, and history clear.'],
 ['DataOps','Test a change','Release safely','Monitor the result','Use repeatable work to reduce errors and recover quickly.'],
 ['Data architecture','Set the need','Design the parts','Review the design','Connect the design to the user’s need.'],
 ['Orchestration','Load succeeds','Clean can start','Report can refresh','Start each task after its required tasks succeed.'],
 ['Software engineering','Keep versions','Review the code','Test the code','Make pipeline code easier to change and support.']
];
const principles=[
 ['Use shared parts','Reuse a tested component.','Source','Shared connector','Target'],
 ['Plan for failure','Keep a recovery path.','Worker stops','Retained data','Retry the worker'],
 ['Plan for growth','Add capacity when demand grows.','More events','More workers','Same output contract'],
 ['Lead with the design','Help teams agree on the system.','Business need','Team agreement','System design'],
 ['Review the design','Change the design as needs change.','Observe','Review','Improve'],
 ['Separate the parts','Let one part change independently.','Source','Stable contract','Replaceable worker'],
 ['Keep choices reversible','Reduce the cost of a later change.','Old tool','Open interface','New tool'],
 ['Make security part of the design','Control access from the start.','Identify user','Check access','Allow needed action'],
 ['Track cost and value','FinOps connects use, cost, and value.','Measure use','Track cost','Adjust capacity']
];
function renderScene(){
 const s=sceneStates[active];
 switch(active){
 case 'role':{
  const u={analyst:['Analyst','Explain past sales.','Report-ready tables'],scientist:['Data scientist','Train a model.','Useful training data'],app:['Application team','Use a data result.','Fresh, reliable data']}[s.user];
  return shell(flow([node('01','Source data','Sales, files, and events.','','Raw facts'),node('02','Data engineer','Build and run the pipeline.','blue','Move · store · test · shape'),node('03',u[0],u[1],'accent',u[2])]),`${button('Analyst','role-user','analyst',s.user==='analyst')}${button('Data scientist','role-user','scientist',s.user==='scientist')}${button('Application team','role-user','app',s.user==='app')}`,result('Useful','the main goal','Start with the user’s need. Supply data that the user can trust.'));
 }
 case 'maturity':{
  const m=[['Start','Make one useful data flow.','Find an owner. Check the data.'],['Scale','Make the flow repeatable.','Add tests, monitoring, and shared definitions.'],['Lead','Let teams use trusted data.','Improve access, governance, and business value.']];
  return shell(flow(m.map((x,i)=>node(`0${i+1}`,x[0],x[1],i===s.level?'blue active':'',i===s.level?x[2]:''))),m.map((x,i)=>button(x[0],'maturity-level',i,s.level===i)).join(''),result(`0${s.level+1}`,'selected stage',m[s.level][2]));
 }
 case 'lifecycle':{
  const labels=['Create','Copy','Shape','Use'];const subs=['The shop records a sale.','Bring the row into the pipeline.','Check and clean the row.','Show the daily sales result.'];
  const data=['Order 47<br>Amount: ₹120<br>Status: paid','Order 47<br>Amount: ₹120<br>Status: paid','Order 47<br>Amount: 120<br>Valid row: yes','Daily sales<br><strong>₹120</strong><br>Report: ready'];
  const nodes=labels.map((x,i)=>node(`0${i+1} · ${['Generation','Ingestion','Transformation','Serving'][i]}`,x,subs[i],i===s.step?'dark active':i<s.step?'accent':'',i<=s.step?data[i]:'Waiting',i===s.step?'<span class="token-travel" aria-hidden="true"></span>':''));
  return shell(flow(nodes,[],s.step)+`<div class="storage-floor"><strong>Storage · keep the data</strong><span>Source tables · raw copies · clean tables · report tables</span></div>`+terms('Generation','Ingestion','Transformation','Serving','Storage'),`<button class="primary" data-action="play">${playing?'Pause':'Play the flow'}</button>${button('One step','lifecycle-step','',false,s.step===3)}<span class="control-label">Step ${s.step+1} of 4</span>`,result(labels[s.step],'current action',['A business action creates a fact.','Ingestion moves the fact. The source can keep its own copy.','Transformation makes the fact suitable for its next use.','Serving makes the prepared data available to a user.'][s.step]),'This is one example path. Real systems can repeat, overlap, or change the order of steps.');
 }
 case 'supports':{
  const a=supports[s.item];
  return shell(flow([node('01',a[1],'','',''),node('02',a[2],'','blue'),node('03',a[3],'','accent')])+`<div class="storage-floor"><strong>${a[0]}</strong><span>Supports the whole lifecycle.</span></div>`,supports.map((x,i)=>button(x[0],'support-item',i,s.item===i)).join(''),result('6','shared supports',a[4]));
 }
 case 'architecture':{
  const p=principles[s.item];
  return shell(flow([node('01',p[2]),node('02',p[3],'','blue'),node('03',p[4],'','accent')])+`<div class="caption">${p[1]}</div>`,principles.map((x,i)=>button(x[0],'principle',i,s.item===i)).join(''),result(`0${s.item+1}`,'design principle',p[0]));
 }
 case 'failure':{
  const stopped=s.failed&&!s.retried;
  const wait=stopped&&s.coupling==='loose';
  return shell(flow([node('01','Source',stopped&&s.coupling==='tight'?'Waits for the worker.':'Sends sales events.',stopped&&s.coupling==='tight'?'red':'','Orders 47 · 48'),node('02',s.coupling==='loose'?'Retained queue':'Direct connection',s.coupling==='loose'?'Stores events for a consumer.':'The source calls the worker.',wait?'yellow':'',wait?'2 events wait':s.retried?'Events retained':'Ready'),node('03','Worker',stopped?'Worker stopped.':'Worker processes events.',stopped?'red':'accent',stopped?'No new output':s.retried?'Retry reads the queue':'Ready')]),`${button('Loose coupling','coupling','loose',s.coupling==='loose')}${button('Tight coupling','coupling','tight',s.coupling==='tight')}${button('Stop worker','stop-worker','',false,stopped)}${button('Retry worker','retry-worker','',false,!stopped)}`,result(stopped?'Stopped':'Running','worker state',wait?'The source can continue. The retained queue keeps events until the worker returns.':stopped?'The source depends on the worker. A failed call needs retry or other recovery.':s.retried?'A safe retry reads retained events. Duplicate protection prevents repeated effects.':'Loose coupling reduces direct dependency between the source and the worker.'),'A retained queue has limits. Retention, capacity, and consumer progress need monitoring.');
 }
 case 'tools':{
  const load=s.choice==='build'?(s.team<=3?'High':'Shared'):(s.team<=3?'Lower':'Shared');
  return shell(flow([node('01','User need','How fresh? How large? How safe?','','Daily sales report'),node('02','System design','Connect the parts before choosing products.','blue','Source · storage · processing'),node('03',s.choice==='build'?'Build a component':'Buy a managed service',s.choice==='build'?'More control. More work to own.':'Faster setup. Service fees and limits.','accent',`Team: ${s.team}<br>Support effort: ${load}`)])+`<div class="small-path"><span>Fit</span><span>Team skills</span><span>Total cost</span><span>Connections</span><span>Exit plan</span></div>`,`<label class="range-control">Team size <input type="range" min="1" max="12" value="${s.team}" data-change="team" aria-label="Team size"><output>${s.team}</output></label>${button('Build','tool-choice','build',s.choice==='build')}${button('Buy','tool-choice','buy',s.choice==='buy')}`,result(load,'support effort','Compare service fees, staff time, maintenance, and the value delivered.'),'Support effort is a teaching example. It is not a price estimate or a product recommendation.');
 }
 case 'sources':{
  const analytic=s.mode==='olap';
  return shell(flow([node('01','Shop application','Application code accepts an order.','','App server: runs code'),node('02',analytic?'Analytics database':'Transaction database',analytic?'Read many rows for analysis.':'Save and retrieve individual orders.','blue',analytic?'OLAP · read and group rows':'OLTP · insert, update, delete'),node('03',analytic?'Sales total':'Order saved',analytic?'One result from many orders.':'One business transaction.','accent',analytic?'SUM(amount)<br>GROUP BY day':'Order 47<br>Amount: ₹120')])+terms('Application server','Database','OLTP','OLAP'),`${button('Save a sale · OLTP','source-mode','oltp',!analytic)}${button('Analyze sales · OLAP','source-mode','olap',analytic)}`,result(analytic?'Many':'One',analytic?'rows per analysis':'example order','A source can be a database, file, API, or event system. Source is the role it plays.'));
 }
 case 'cdc':{
  const pending=s.log.length-s.applied;
  return shell(`<div class="split">${box('Source database',table(['Order','Amount'],s.rows.length?s.rows.map(r=>[r.id,`₹${r.amount}`]):[['—','No rows']]))}${box('Change log · CDC',s.log.length?table(['Event','Order','New amount'],s.log.map((e,i)=>[e.op,e.id,e.amount===null?'—':`₹${e.amount}`]),s.log.map((_,i)=>i<s.applied?'old':'new')):'<div class="empty">Change a source row.</div>')}</div>`+flow([node('01','Change source','Create a change event.'),node('02','Capture change','Record insert, update, or delete.','blue'),node('03','Apply change','A consumer updates the target.','accent')])+box('Target database',table(['Order','Amount'],s.target.length?s.target.map(r=>[r.id,`₹${r.amount}`]):[['—','No rows']])),`${button('Insert order 48','cdc-insert','',false,s.rows.some(r=>r.id===48))}${button('Update order 47','cdc-update','',false,!s.rows.some(r=>r.id===47))}${button('Delete order 47','cdc-delete','',false,!s.rows.some(r=>r.id===47))}<button class="primary" data-action="cdc-apply" ${pending?'':'disabled'}>Apply changes (${pending})</button>`,result(pending,'changes waiting','CDC records database changes. A downstream consumer can apply them or keep a history.'),'Log-based CDC is one method. CDC does not always use a database trigger.');
 }
 case 'storage':{
  const layers={lake:[['Query / processing engine','Read and process selected files.','dark'],['Files in object storage','Raw files and prepared files.',''],['Data lake','A place to retain many data forms.','mint']],warehouse:[['SQL processing','Query and transform data.','dark'],['Managed tables','Schema, storage, and table operations.',''],['Data warehouse','Data organized for analysis.','mint']],lakehouse:[['Query / processing engines','SQL, batch, and streaming tools.','dark'],['Table management layer','Schema · transactions · table history','mint'],['Files in object storage','Data files, often Parquet.','']]}[s.kind];
  return shell(`<div class="stack">${layers.map(x=>`<div class="stack-layer ${x[2]}"><strong>${x[0]}</strong><small>${x[1]}</small></div>`).join('<div class="layer-arrow" aria-hidden="true">↓</div>')}</div>`+terms('Object storage','Compute','Data lake','Data warehouse','Lakehouse'),`${button('Lake','storage-kind','lake',s.kind==='lake')}${button('Warehouse','storage-kind','warehouse',s.kind==='warehouse')}${button('Lakehouse','storage-kind','lakehouse',s.kind==='lakehouse')}`,result('Keep + use','storage and compute','Storage retains data. Compute runs operations on data. Some systems combine both.'),'These are architecture patterns. A real platform can combine several of them.');
 }
 case 'consistency':{
  const waiting=s.policy==='strong'&&!s.synced;
  return shell(flow([node('01','Primary copy','Receives the new write.','blue',`Amount: ₹${s.value}`),node('02','Replica copy',s.synced?'Has the same value.':'Has not received the update.',s.synced?'accent':'yellow',`Amount: ₹${s.replica}`),node('03','Reader',waiting?'This demo waits for agreement.':s.policy==='strong'?'Reads the agreed value.':'Reads this replica now.',waiting?'yellow':'',waiting?'Waiting':`Sees: ₹${s.replica}`)])+terms('Replica','Eventual consistency','Strong consistency'),`${button('Eventual','consistency-policy','eventual',s.policy==='eventual')}${button('Strong','consistency-policy','strong',s.policy==='strong')}${button('Write ₹200','consistency-write','',false,s.value===200)}${button('Sync copies','consistency-sync','',false,s.synced)}`,result(s.synced?'Same':'Different','copy values',waiting?'A strong-consistency system protects the read guarantee. It can need coordination or delay.':s.synced?'Both copies now agree.':'An eventual-consistency read can return the earlier value until the update reaches the replica.'),'The two-copy wait is simplified. Real strong-consistency systems can use leaders or quorum reads and writes.');
 }
 case 'cadence':{
  const waiting=s.sent-s.loaded;
  return shell(flow([node('01','Source events','Each event has an ID.','','Sent: '+s.sent),node('02',s.mode==='batch'?'Wait for a batch':'Process each event',s.mode==='batch'?'Move accumulated events together.':'Move events as they arrive.',waiting?'yellow':'blue',s.mode==='batch'?`Waiting: ${waiting}`:'No batch wait'),node('03','Target','Data available to the next step.','accent',`Loaded: ${s.loaded}`)])+`<div class="split">${box('Waiting events',`<div class="record-list">${Array.from({length:waiting},(_,i)=>packet('E'+(s.loaded+i+1))).join('')||'<span class="empty">None</span>'}</div>`)}${box('Loaded events',`<div class="record-list">${Array.from({length:s.loaded},(_,i)=>packet('E'+(i+1),'passed')).join('')||'<span class="empty">None</span>'}</div>`)}</div>`,`${button('Batch','cadence-mode','batch',s.mode==='batch')}${button('Streaming','cadence-mode','stream',s.mode==='stream')}${button('Send event','send-event','',false,s.sent>=8)}${button('Load batch','load-batch','',false,s.mode!=='batch'||!waiting)}`,result(s.loaded,'events at the target',s.mode==='batch'?'Batch waits for a time or size condition. This demo uses the Load batch button.':'Streaming processes events continually. This demo makes the movement immediate.'),'Streaming can still use small batches internally. Real transfer and processing take time.');
 }
 case 'push':{
  const seq=s.mode==='push'?['Ready','Source sends data','Target receives data']:s.mode==='pull'?['Ready','Target requests data','Source returns data']:['Ready','Target checks for changes','Change found: target requests data','Source returns data'];
  const req=s.mode!=='push'&&(s.step===1||(s.mode==='poll'&&s.step===2));
  return shell(flow([node('SOURCE',req?'Source receives request':'Source system',s.mode==='push'?'Starts the transfer.':'Responds to the target.','',s.step===0?'Order 47 ready':seq[s.step]),node('TARGET','Target system',s.mode==='push'?'Receives the data.':s.mode==='pull'?'Starts the request.':'Checks on a schedule.','blue',s.step===seq.length-1?'Order 47 received':'Waiting')],[req?'request':'data'],1,req)+`<div class="query-strip">${req?'Request: Target → Source':'Data: Source → Target'}</div>`+`<div class="caption">${seq[s.step]}</div>`,`${button('Push','push-mode','push',s.mode==='push')}${button('Pull','push-mode','pull',s.mode==='pull')}${button('Poll','push-mode','poll',s.mode==='poll')}${button('One step','push-step','',false,s.step===seq.length-1)}`,result(s.mode==='push'?'Source':'Target','starts the action',s.mode==='poll'?'Polling is repeated checking. When a change is found, the target can pull data.':'The data moves from source to target in both patterns. The initiator changes.'));
 }
 case 'schema':{
  const added=s.hasCity;const passed=s.test==='good'||(s.test==='column'&&added);
  const row=s.test==='type'?'id: 47<br>amount: "hello"':s.test==='column'?'id: 47<br>amount: 120<br>city: "Pune"':'id: 47<br>amount: 120';
  return shell(`<div class="split">${box('Incoming row',`<div class="query-strip" style="margin-bottom:0">${row}</div>`)}${box('Target schema',`<div class="schema-fields"><div class="field"><span>id</span><span>integer</span></div><div class="field"><span>amount</span><span>number</span></div>${added?'<div class="field new"><span>city · new field</span><span>text</span></div>':''}</div>`)}</div>`+flow([node('01','Incoming row','Names and value types.'),node('02',s.policy==='evolve'?'Allow an added field':'Keep the fixed schema',s.policy==='evolve'?'This demo allows an added text column.':'Reject an unknown field or invalid type.','blue'),node('03',s.test?(passed?'Accept':'Reject'):'Test a row',s.test?(passed?'The row fits the selected policy.':'The row does not fit the selected policy.'):'Choose a test below.',s.test?(passed?'accent':'red'):'',added?'Target schema now includes city.':'')])+terms('Schema','Schema enforcement','Schema evolution'),`${button('Fixed schema','schema-policy','enforce',s.policy==='enforce')}${button('Allow added column','schema-policy','evolve',s.policy==='evolve')}${button('Valid row','schema-test','good')}${button('New city column','schema-test','column')}${button('Wrong amount type','schema-test','type')}`,result(s.test?(passed?'Accepted':'Rejected'):'Ready','schema check',s.test==='type'?'The value "hello" is not a number. Adding a column does not fix this type error.':added?'Evolution changes the allowed schema. Enforcement checks the row against that schema.':s.test==='column'?'The fixed schema has no city column. The row fails this policy.':'A schema defines fields and types. Test what happens when the row shape changes.'),'This example permits additive evolution only. Type changes and removals need separate compatibility rules.');
 }
 case 'delivery':{
  const applied=s.dedupe?new Set(s.received).size:s.received.length;
  return shell(flow([node('01','Incoming events','Delivery can repeat an event.','','E1 · amount ₹120'),node('02','Consumer',s.dedupe?'Ignore an ID already applied.':'Apply every delivery.','blue',s.dedupe?'Duplicate protection: on':'Duplicate protection: off'),node('03','Applied result','One sale should count once.',applied>1?'red':'accent',`Sales total: ₹${applied*120}`)])+`<div class="split">${box('Delivery history',`<div class="record-list">${s.received.map((id,i)=>packet(id,i&&s.dedupe?'dim':'passed')).join('')||'<span class="empty">Send E1.</span>'}</div>`)}${box('Error queue · dead-letter queue',`<div class="record-list">${Array.from({length:s.bad},()=>packet('Bad amount','failed')).join('')||'<span class="empty">No bad events</span>'}</div>`)}</div>`,`<label class="check-control"><input type="checkbox" data-change="dedupe" ${s.dedupe?'checked':''}>Ignore repeated IDs</label>${button('Send E1','deliver','E1')}${button('Replay E1','deliver','E1')}${button('Send bad event','deliver-bad','',false,s.bad>=4)}`,result(applied,'times applied',applied>1?'The same sale has been counted more than once. Stable IDs can prevent this effect.':'Replay reads an earlier event again. A safe consumer avoids repeating its effect.'),'Bad events wait for inspection or repair. A replay alone does not repair invalid data.');
 }
 case 'query':{
  const rows=[['01 Mar',47,120],['01 Mar',48,80],['02 Mar',49,60],['02 Mar',50,40],['03 Mar',51,150],['03 Mar',52,50]];
  const used=s.filter?2:6;
  return shell(`<div class="query-strip">SELECT SUM(amount) FROM sales${s.filter?" WHERE day = '2022-03-01'":''};</div><div class="split">${box('Sales partitions',table(['Day','Order','Amount'],rows.map((r,i)=>[r[0],r[1],`₹${r[2]}`]),rows.map((_,i)=>s.filter&&i>1?'old':'new')))}${box('Query work',`<div class="metric-badges"><div class="metric-badge"><b>${used}</b><span>rows needed</span></div><div class="metric-badge"><b>₹${s.filter?200:500}</b><span>SUM(amount)</span></div></div><div class="caption">${s.filter?'Skip the other day partitions.':'Read all three day partitions.'}</div>`)}</div>`+flow([node('01','Parse','Check the SQL.'),node('02','Plan','Choose how to read.','blue'),node('03','Run','Return the result.','accent')]),`<label class="check-control"><input type="checkbox" data-change="query-filter" ${s.filter?'checked':''}>Filter to 01 Mar</label>`,result(used,'rows needed','A filter on a partition key can reduce the scanned data. Less work can improve time and cost.'),'This example partitions by day. A filter does not always reduce physical reads; layout and the query plan matter.');
 }
 case 'etl':{
  const raw=table(['Order','Amount'],[[47,'120'],[48,'80'],[47,'120'],[49,'-5']]);const clean=table(['Order','Amount'],[[47,'120'],[48,'80']],['new','new']);
  const labels=s.mode==='etl'?['Extract','Transform','Load']:['Extract','Load','Transform'];
  return shell(flow(labels.map((x,i)=>node(`0${i+1}`,x,x==='Transform'?'Remove repeated IDs and invalid sales.':x==='Load'?'Save rows in the destination.':'Read source rows.',s.step===i?'blue active':i<s.step?'accent':'',i<=s.step?(x==='Transform'?'2 clean rows':x==='Load'?(s.mode==='etl'?'2 clean rows stored':'4 raw rows stored'):'4 raw rows'):'Waiting')),[],s.step)+`<div class="split">${box('Input · 4 raw rows',raw)}${box(s.step===2?'Output · 2 clean rows':'Prepared output',s.step===2?clean:'<div class="empty">Step through the flow.</div>')}</div>`,`${button('ETL','etl-mode','etl',s.mode==='etl')}${button('ELT','etl-mode','elt',s.mode==='elt')}${button('One step','etl-step','',false,s.step===2)}`,result(labels[s.step],'current step',s.mode==='etl'?'ETL transforms data before loading the destination.':'ELT loads raw data first. Processing in the destination transforms it.'),'The validation rule here requires a positive amount. A real system must define its own business rules.');
 }
 case 'model':{
  const dims={Customer:['customer_key','Ravi · Hyderabad'],Product:['product_key','Notebook'],Date:['date_key','01 Mar · Q1']};
  return shell(`<div class="star"><div class="star-top">${node('','Date','day · month · quarter',s.dimension==='Date'?'blue active':'','date_key')}<div class="join-line"></div></div><div class="star-left">${node('','Customer','who bought it',s.dimension==='Customer'?'blue active':'','customer_key')}</div><div class="star-center">${node('','Sales fact','One row per order item.','dark','order_id · item_id<br>customer_key · product_key · date_key<br>quantity · amount')}</div><div class="star-right">${node('','Product','what was bought',s.dimension==='Product'?'blue active':'','product_key')}</div><div class="star-bottom">${node('',s.dimension+' detail',dims[s.dimension][1],'accent',`Join on ${dims[s.dimension][0]}`)}</div></div>`+terms('Fact','Dimension','Grain','Star schema','Normalization'),Object.keys(dims).map(x=>button(x,'model-dimension',x,s.dimension===x)).join(''),result('One item','the example grain','Facts record events and measures. Dimensions describe them. Keys connect matching rows.'));
 }
 case 'scd':{
  let rows,headers;
  if(s.type===2){headers=['Version','Customer','City','Valid from','Valid to'];rows=s.moved?[[1,'Ravi','Hyderabad','01 Mar','01 Apr'],[2,'Ravi','Pune','01 Apr','Current']]:[[1,'Ravi','Hyderabad','01 Mar','Current']];}
  else if(s.type===3){headers=['Customer','Previous city','Current city'];rows=[['Ravi',s.moved?'Hyderabad':'—',s.moved?'Pune':'Hyderabad']];}
  else{headers=['Customer','City'];rows=[['Ravi',s.moved?'Pune':'Hyderabad']];}
  const desc=s.type===1?'Replace the old value.':s.type===2?'Close the old period. Add a new version.':'Keep current and previous values in columns.';
  return shell(flow([node('01','Source change','Ravi moves on 01 Apr.','','Hyderabad → Pune'),node('02','History policy',desc,'blue',`SCD Type ${s.type}`),node('03','Dimension table',s.type===2?'Keep separate dated versions.':s.type===1?'Keep the current value.':'Keep limited previous values.','accent',`${rows.length} ${rows.length===1?'row':'rows'}`)])+box('Customer dimension',table(headers,rows,s.type===2&&s.moved?['old','new']:['new']))+terms('CDC','SCD'),`${button('Type 1 · replace','scd-type',1,s.type===1)}${button('Type 2 · versions','scd-type',2,s.type===2)}${button('Type 3 · columns','scd-type',3,s.type===3)}${button('Move to Pune','scd-move','',false,s.moved)}`,result(s.type===1?'Current':s.type===2?'History':'Limited history','what is retained','CDC captures the change. The SCD policy decides how the dimension represents that change.'),'Type 2 periods here include the start and exclude the end. Real designs need stable business keys and version keys.');
 }
 case 'serving':{
  const uses={analytics:['Analytics','Answer a business question.','Power BI report<br>Daily sales: ₹200'],ml:['Machine learning','Train or run a model.','Prepared examples<br>Predict a future outcome'],reverse:['Reverse ETL','Send a prepared result back to an operational tool.','Customer segment<br>CRM application']};const u=uses[s.use];
  return shell(`<div class="branch">${node('01','Prepared data','Clean rows and clear definitions.','dark','Trusted sales table')}<svg class="branch-svg" viewBox="0 0 70 230" fill="none" aria-hidden="true"><path d="M0 115H25V35H62M25 115H62M25 115V195H62" stroke="currentColor" stroke-width="2"/><path d="m56 29 6 6-6 6m0 68 6 6-6 6m0 68 6 6-6 6" stroke="currentColor" stroke-width="2"/></svg><div class="destinations">${Object.entries(uses).map(([k,x])=>node('',x[0],x[1],s.use===k?'blue active':'',s.use===k?x[2]:'')).join('')}</div></div>`+terms('Analytics','Machine learning','Reverse ETL'),Object.entries(uses).map(([k,x])=>button(x[0],'serving-use',k,s.use===k)).join(''),result(u[0],'selected use',u[1]));
 }
 case 'metrics':{
  return shell(`<div class="split">${box('The same sales rows',table(['Order','Status','Amount'],[[47,'Paid','₹120'],[48,'Paid','₹80'],[49,'Cancelled','₹60']]))}${box('Shared measure',`<div class="query-strip">Sales = ${s.net?'SUM(amount) for paid orders':'SUM(amount) for all orders'}</div><div class="metric-badges"><div class="metric-badge"><b>₹${s.net?200:260}</b><span>sales</span></div></div>`)}</div>`+flow([node('01','Prepared rows'),node('02','One definition','Use the same business rule.','blue'),node('03','Consistent reports','Use that shared measure.','accent')]),`${button('Paid sales','metrics-net','true',s.net)}${button('All order amounts','metrics-net','false',!s.net)}`,result(s.net?'₹200':'₹260','reported amount','Agree on the measure’s meaning. The same table can produce different totals under different rules.'));
 }
 case 'security':{
  const allowed=s.role!=='guest';const full=s.role==='steward';
  return shell(flow([node('01',s.role==='guest'?'Guest':s.role==='analyst'?'Analyst':'Data steward','Requests customer rows.','','Identity + role'),node('02','Access check','Allow only needed actions.','blue',allowed?'Read access: allowed':'Read access: denied'),node('03',s.attempted?(allowed?'Controlled result':'Request denied'):'Customer data',s.attempted?(allowed?full?'Authorized personal data.':'Personal data is masked.':'No rows returned.'):'Protected until access is checked.',s.attempted?(allowed?'accent':'red'):'',s.attempted?(allowed?(full?'Ravi · ravi@example.test':'Customer C7 · email: •••'):'No access'):'Restricted')])+terms('Least privilege','Encryption','Data lineage'),`${button('Guest','security-role','guest',s.role==='guest')}${button('Analyst','security-role','analyst',s.role==='analyst')}${button('Data steward','security-role','steward',s.role==='steward')}${button('Read data','security-read')}`,result(s.attempted?(allowed?'Allowed':'Denied'):'Ready','access decision','Use access controls, encryption, updates, monitoring, and clear security responsibilities.'),'Masking and encryption solve different problems. This is an access-policy example, not a production security system.');
 }
 case 'backup':{
  return shell(flow([node('01','Working table','Data used by the pipeline.',s.exists?'blue':'red',s.exists?'Orders 47 · 48':'Table deleted'),node('02','Backup copy','A separate recovery copy.',s.copy?'accent':'red',s.copy?'Orders 47 · 48':'No backup'),node('03','Recovery','Restore and verify the result.',s.restored?'accent':'',s.restored?'2 orders restored':'Ready for a restore test')]),`<label class="check-control"><input type="checkbox" data-change="backup-copy" ${s.copy?'checked':''} ${!s.exists?'disabled':''}>Keep a backup</label>${button('Delete working table','backup-delete','',false,!s.exists)}${button('Restore backup','backup-restore','',false,s.exists||!s.copy)}`,result(s.exists?'Available':'Missing','working data',s.restored?'The backup restored the rows. A real restore test also checks accuracy and recovery time.':!s.exists&&!s.copy?'The working copy is gone. This demo has no copy to restore.':'A backup helps only if you can restore the needed data. Test recovery before a failure.'),'Real backups need retention, access controls, and protection from failures that affect the working system.');
 }
 case 'future':{
  const f=[['Simpler tools','Less setup work','More attention to data value'],['Live data','Shorter delay','Closer links with applications'],['Shared data','Common interfaces','Clear ownership and rules']][s.focus];
  return shell(flow([node('01',f[0],f[1]),node('02','Engineer’s work','Design · quality · security · operations','blue'),node('03','User value',f[2],'accent')])+`<div class="storage-floor"><strong>The lifecycle stays central</strong><span>Create · move · store · shape · use</span></div>`,['Simpler tools','Live data','Shared data'].map((x,i)=>button(x,'future-focus',i,s.focus===i)).join(''),result('2022','book’s publication year','The authors describe a direction. These diagrams do not claim that every forecast has happened.'));
 }
 case 'formats':{
  const column=s.layout==='column';
  const cells=column?`<div class="column-read">${table(['ID column','City column','Amount column'],[[47,'Hyderabad','120'],[48,'Pune','80'],[49,'Hyderabad','60']])}</div>`:table(['Row','Serialized data'],[[1,'47 | Hyderabad | 120'],[2,'48 | Pune | 80'],[3,'49 | Hyderabad | 60']],['new','new','new']);
  return shell(`<div class="split">${box(column?'Column layout · example: Parquet':'Row layout · example: CSV',cells)}${box('Read the Amount values',`<div class="record-list">${[120,80,60].map(x=>packet(x,'passed')).join('')}</div><div class="metric-badges"><div class="metric-badge"><b>${column?3:9}</b><span>logical values touched</span></div></div><div class="caption">${column?'Amount values are stored together.':'Amount sits beside other fields in each row.'}</div>`)}</div>`+flow([node('01','Serialize','Put values into a file format.'),node('02',s.compressed?'Compress':'Keep original encoding',s.compressed?'Reduce size with a compression algorithm.':'Use the encoded data.','blue'),node('03','Read','Decode the format to use the data.','accent')])+terms('Serialization','Compression','Parquet'),`${button('Row layout','format-layout','row',!column)}${button('Column layout','format-layout','column',column)}<label class="check-control"><input type="checkbox" data-change="compression" ${s.compressed?'checked':''}>Add compression</label>`,result(column?'Column':'Row','selected layout',s.compressed?'Compression can reduce bytes stored or transferred. Encoding and compression are separate choices.':'Column formats can skip unused columns. Row formats keep each record’s fields together.'),'Counts show logical values in a tiny example. Physical reads depend on blocks, encoding, compression, and the engine.');
 }
 case 'network':{
  const alive=!s.failed||s.separate;
  return shell(`<div class="region"><div class="region-title">Cloud region · contains separate availability zones</div><div class="split"><div class="zone ${s.failed?'failed':''}"><div class="zone-label">ZONE A ${s.failed?'· FAILED':''}</div>${node('','Copy 1','A resource in Zone A.',s.failed?'red':'blue',s.failed?'Unavailable':'Orders 47 · 48')}${!s.separate?`<div style="height:15px"></div>${node('','Copy 2','In the same failure area.',s.failed?'red':'accent',s.failed?'Unavailable':'Orders 47 · 48')}`:''}</div><div class="zone"><div class="zone-label">ZONE B</div>${s.separate?node('','Copy 2','A resource in a separate zone.','accent','Orders 47 · 48'):'<div class="empty">No second copy here.</div>'}</div></div></div>`,`${button('Same zone','network-placement','same',!s.separate)}${button('Separate zones','network-placement','separate',s.separate)}${button('Fail Zone A','network-fail','',false,s.failed)}`,result(alive?'Available':'Unavailable','at least one copy',s.separate?'A separate zone can protect against a local zone failure. Copies still need correct replication.':'Two copies in one zone can fail together when that zone fails.'),'Zones, regions, routing, and data transfer affect reliability, time, and cost. A region-wide failure can affect multiple zones.');
 }
 }
 throw new Error('Unknown diagram');
}
function render(){
 const chapter=chapters.find(c=>c.scenes.includes(active));const index=ordered.indexOf(active);
 $('chapters').innerHTML=chapters.map((c,i)=>([0,4,9,11].includes(i)?`<div class="nav-label">${({0:'FOUNDATIONS',4:'THE LIFECYCLE',9:'PROTECTION & FUTURE',11:'APPENDICES'})[i]}</div>`:'')+`<button class="chapter" data-scene="${c.scenes[0]}" aria-current="${c===chapter}"><span>${c.n}</span><span>${c.title}</span></button>`).join('');
 $('eyebrow').textContent=`${Number(chapter.n)?'Chapter '+chapter.n:'Appendix '+chapter.n} / ${chapter.title}`;
 $('title').textContent=lessonInfo[active][0];
 $('lesson-count').textContent=`Diagram ${index+1} / ${ordered.length}`;
 $('lesson-tabs').innerHTML=chapter.scenes.map(id=>`<button data-scene="${id}" aria-current="${id===active}">${lessonInfo[id][1].split(' · ')[0]}</button>`).join('');
 $('scene').innerHTML=renderScene();
 $('reference').textContent=`Source: Reis & Housley (2022) · ${lessonInfo[active][3]} · Original teaching examples`;
 $('previous').disabled=index===0;$('next').disabled=index===ordered.length-1;
 window.dispatchEvent(new CustomEvent('diagram-rendered',{detail:{active,chapter:Number(chapter.n)||(chapter.n==='B'?13:12)}}));
}
function stopPlay(){if(playing!==null){clearInterval(playing);playing=null;}}
function selectScene(id){if(!ordered.includes(id))throw new Error('Select a valid diagram.');stopPlay();active=id;history.replaceState(null,'','#'+id);document.querySelector('.sidebar').classList.remove('open');document.querySelector('.mobile-menu').setAttribute('aria-expanded','false');render();$('status').textContent=lessonInfo[id][0];}
function action(name,value=''){
 const s=sceneStates[active];let status='Diagram updated.';
 switch(name){
 case 'reset':stopPlay();sceneStates[active]=fresh(defaults[active]);break;
 case 'previous':selectScene(ordered[Math.max(0,ordered.indexOf(active)-1)]);return;
 case 'next':selectScene(ordered[Math.min(ordered.length-1,ordered.indexOf(active)+1)]);return;
 case 'role-user':s.user=value;break;
 case 'maturity-level':s.level=Number(value);break;
 case 'play':if(active!=='lifecycle')return;if(playing){stopPlay();}else{if(s.step===3)s.step=0;playing=setInterval(()=>{s.step++;if(s.step>=3)stopPlay();render();$('status').textContent=`Flow step ${s.step+1} of 4.`;},1350);}break;
 case 'lifecycle-step':stopPlay();s.step=Math.min(3,s.step+1);break;
 case 'support-item':s.item=Number(value);break;
 case 'principle':s.item=Number(value);break;
 case 'coupling':s.coupling=value;s.failed=false;s.retried=false;break;
 case 'stop-worker':s.failed=true;s.retried=false;break;
 case 'retry-worker':s.failed=false;s.retried=true;break;
 case 'tool-choice':s.choice=value;break;
 case 'source-mode':s.mode=value;break;
 case 'cdc-insert':if(!s.rows.some(r=>r.id===48)){s.rows.push({id:48,amount:80});s.log.push({op:'INSERT',id:48,amount:80});}break;
 case 'cdc-update':{const r=s.rows.find(r=>r.id===47);if(r){r.amount=r.amount===120?150:120;s.log.push({op:'UPDATE',id:47,amount:r.amount});}break;}
 case 'cdc-delete':if(s.rows.some(r=>r.id===47)){s.rows=s.rows.filter(r=>r.id!==47);s.log.push({op:'DELETE',id:47,amount:null});}break;
 case 'cdc-apply':for(const e of s.log.slice(s.applied)){s.target=s.target.filter(r=>r.id!==e.id);if(e.op!=='DELETE')s.target.push({id:e.id,amount:e.amount});}s.applied=s.log.length;break;
 case 'storage-kind':s.kind=value;break;
 case 'consistency-policy':s.policy=value;break;
 case 'consistency-write':s.value=200;s.synced=false;break;
 case 'consistency-sync':s.replica=s.value;s.synced=true;break;
 case 'cadence-mode':s.mode=value;if(value==='stream')s.loaded=s.sent;break;
 case 'send-event':if(s.sent<8){s.sent++;if(s.mode==='stream')s.loaded=s.sent;}break;
 case 'load-batch':s.loaded=s.sent;break;
 case 'push-mode':s.mode=value;s.step=0;break;
 case 'push-step':s.step=Math.min(s.mode==='poll'?3:2,s.step+1);break;
 case 'schema-policy':s.policy=value;s.test=null;s.hasCity=false;break;
 case 'schema-test':s.test=value;if(value==='column'&&s.policy==='evolve')s.hasCity=true;break;
 case 'deliver':if(s.received.length<12)s.received.push(value);break;
 case 'deliver-bad':if(s.bad<4)s.bad++;break;
 case 'etl-mode':s.mode=value;s.step=0;break;
 case 'etl-step':s.step=Math.min(2,s.step+1);break;
 case 'model-dimension':s.dimension=value;break;
 case 'scd-type':s.type=Number(value);break;
 case 'scd-move':s.moved=true;break;
 case 'serving-use':s.use=value;break;
 case 'metrics-net':s.net=value==='true';break;
 case 'security-role':s.role=value;s.attempted=false;break;
 case 'security-read':s.attempted=true;break;
 case 'backup-delete':s.exists=false;s.restored=false;break;
 case 'backup-restore':if(s.copy){s.exists=true;s.restored=true;}break;
 case 'future-focus':s.focus=Number(value);break;
 case 'format-layout':s.layout=value;break;
 case 'network-placement':s.separate=value==='separate';s.failed=false;break;
 case 'network-fail':s.failed=true;break;
 default:throw new Error('Unknown control.');
 }
 render();$('status').textContent=status;
}
const glossary={
 'Generation':['A source creates a fact.','Shop sale','Order row'],
 'Ingestion':['Move data from a source into a system.','Source','Target copy'],
 'Transformation':['Change data into a form suitable for its next use.','Raw rows','Clean rows'],
 'Serving':['Make prepared data available to a user or application.','Prepared table','Report or app'],
 'Storage':['A system retains data so it can be used later.','Write data','Read later'],
 'Application server':['A computer or service runs application code.','Request','Application code'],
 'Database':['A managed collection of data that software can read and change.','Database engine','Stored tables'],
 'OLTP':['Online transaction processing handles business transactions.','Save order','Order row'],
 'OLAP':['Online analytical processing handles analysis over many records.','Many sales','Grouped totals'],
 'Object storage':['Store and retrieve objects by a key. An object can contain a file.','Object key','File bytes'],
 'Compute':['Processing resources run operations on data.','Stored rows','SQL / code'],
 'Data lake':['Retain raw and prepared data in several forms.','Files and events','Retained data'],
 'Data warehouse':['Organize data so users can analyze it.','Prepared tables','Analysis'],
 'Lakehouse':['Add table-management features to data-lake storage.','Data files','Managed tables'],
 'Replica':['Another maintained copy of data. It is not always a backup.','Primary','Copy'],
 'Eventual consistency':['Copies can differ for a time. Without new writes, successful replication makes them agree.','New value','Copy catches up'],
 'Strong consistency':['A read follows the system’s guarantee for the latest completed writes.','Coordinated write','Consistent read'],
 'Schema':['A definition of field names, types, and structure.','id: integer','amount: number'],
 'Schema enforcement':['Check data against the allowed schema.','Incoming row','Check names and types'],
 'Schema evolution':['Change the allowed schema under a compatibility policy.','Old schema','Allowed new schema'],
 'CDC':['Change data capture records database inserts, updates, and deletes.','Database change','Change event'],
 'SCD':['A slowly changing dimension uses a policy to represent changes to descriptive data.','City changes','Replace or keep versions'],
 'Fact':['A row records an event at a defined level of detail.','One order item','Quantity and amount'],
 'Dimension':['Descriptive data gives context to facts.','Customer key','Customer details'],
 'Grain':['The exact meaning of one fact-table row.','One row','One order item'],
 'Star schema':['Fact rows connect to dimension rows through matching keys.','Sales fact','Customer / product / date'],
 'Normalization':['Store separate kinds of facts in related tables to reduce repeated data.','Order customer key','One customer record'],
 'Analytics':['Use data to answer questions or describe patterns.','Sales rows','Daily sales'],
 'Machine learning':['Use data to train or run a model.','Prepared examples','Model output'],
 'Reverse ETL':['Move a prepared analytics result back to an operational system.','Warehouse result','CRM'],
 'Least privilege':['Give a user only the access needed for the task.','User’s task','Allowed actions'],
 'Encryption':['Encode data so the correct key is needed to read it.','Readable data','Encrypted bytes'],
 'Data lineage':['A record of where data came from and how it changed.','Source field','Report measure'],
 'Serialization':['Encode values in a format for storage or transfer.','Values in memory','File or message'],
 'Compression':['Use an algorithm to reduce the encoded size.','Encoded bytes','Fewer bytes'],
 'Parquet':['A column-oriented file format that supports efficient analytical reads.','Columns in a file','Read needed columns']
};
function openNotes(title,html){$('notes-title').textContent=title;$('notes-body').innerHTML=`<div class="dialog-body">${html}</div>`;$('notes').showModal();}
function sources(){openNotes('Book & language notes',`<p><strong>Fundamentals of Data Engineering</strong><br>Joe Reis and Matt Housley · O’Reilly Media · 2022</p><p>The guide combines original simple-English explanations with interactive diagrams. The chapter reader explains all 354 indexed topics. The lessons simplify the book. They do not reproduce every sentence. Use Original pages to open your own complete PDF. This gives you access to the original figures, tables, examples, notes, and references.</p><p>The GitHub Pages version opens the PDF in your browser. It does not upload your file or publish the book. Page links match the 445-page source file used to create this guide.</p>${chapters.map(c=>`<div class="notes-table"><span>${c.n}</span><span>${c.title}</span><span>${c.pages}</span></div>`).join('')}<p><strong>Simple English</strong><br>The lessons use short sentences, direct instructions, and consistent technical names. This is an ASD-STE100-inspired adaptation. Technical names retain their precise meanings.</p><p><button class="notes-source-link" data-action="close-notes" data-study-view="source">Open your original PDF</button></p><p><a href="https://www.asd-ste100.org/STE_faq.html" target="_blank" rel="noopener noreferrer">Official ASD-STE100 language guidance</a></p>`);}
document.addEventListener('click',event=>{
 const el=event.target.closest('[data-action],[data-scene],[data-term]');if(!el||el.disabled)return;
 if(el.dataset.scene){selectScene(el.dataset.scene);return;}
 if(el.dataset.term){const g=glossary[el.dataset.term];if(g)openNotes(el.dataset.term,`<p>${g[0]}</p>${flow([node('01',g[1],'','blue'),node('02',g[2],'','accent')])}`);return;}
 switch(el.dataset.action){case 'sources':sources();return;case 'close-notes':$('notes').close();return;case 'menu':{const open=document.querySelector('.sidebar').classList.toggle('open');el.setAttribute('aria-expanded',String(open));return;}}
 action(el.dataset.action,el.dataset.value);
});
document.addEventListener('change',event=>{
 const el=event.target;if(!el.dataset.change)return;const s=sceneStates[active];
 switch(el.dataset.change){case 'team':s.team=Math.max(1,Math.min(12,Number(el.value)));break;case 'dedupe':s.dedupe=el.checked;break;case 'query-filter':s.filter=el.checked;break;case 'backup-copy':if(s.exists)s.copy=el.checked;break;case 'compression':s.compressed=el.checked;break;}
 render();$('status').textContent='The diagram shows the new setting.';
});
window.addEventListener('hashchange',()=>{if(ordered.includes(location.hash.slice(1)))selectScene(location.hash.slice(1));});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){stopPlay();render();}});
window.visualGuide={selectScene,action,scenes:ordered.slice(),getState:()=>({active,state:fresh(sceneStates[active])})};
render();
// Structured navigation uses the same visible scenes. Browsers without WebMCP continue normally.
if(document.modelContext?.registerTool){
 const lifecycle=new AbortController();
 try{
  Promise.resolve(document.modelContext.registerTool({name:'navigate_data_diagram',title:'Open a data diagram',description:'Open one of this guide’s existing interactive diagrams.',inputSchema:{type:'object',properties:{diagram:{type:'string',enum:ordered}},required:['diagram'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).length!==1||!ordered.includes(input.diagram))throw new Error('Select a valid diagram.');selectScene(input.diagram);window.studyGuide?.selectView('diagram');return{diagram:active,title:lessonInfo[active][0]};}},{signal:lifecycle.signal})).catch(()=>{});
 }catch{}
 window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
