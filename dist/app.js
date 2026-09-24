const readings=[
 {title:'欲擒故纵',sub:'给对方出口，给自己主动权',source:'三十六计 / 攻战计',quote:'“逼则反兵，走则减势。紧随勿迫，累其气力，消其斗志，散而后擒之。兵不血刃。”',note:'逼得太紧会引发反弹；适度留出口，反而能降低抵抗。真正的主动，不是把对方逼到墙角，而是让局势朝你希望的方向发展。',matter:'适合处理项目延期、谈判僵局、资源不足：不要继续在原来的冲突点上加压，先改变节奏、议题或行动顺序，让对方的阻力自然下降。',people:'适合处理同事拖延、合作方防御、家庭争执：先理解对方在保护什么，再提供一个能接受的选择，同时明确时间、责任和后果。',history:'故事中，弱势一方用反常的镇定制造疑虑，让对方不敢贸然进攻。它提醒我们：信息不足时，人会用自己的恐惧补全事实。'},
 {title:'釜底抽薪',sub:'别和表面力量硬碰，先找到真正的燃料',source:'三十六计 / 混战计',quote:'“不敌其力，而消其势，兑下乾上之象。”',note:'不与对方的表面力量正面硬拼，转而削弱它的资源、动力或补给。',matter:'项目反复延期时，先查返工源、需求变更和决策瓶颈，而不是单纯要求团队加班。',people:'当一个人持续防御，先降低让他防御的威胁感；把“你为什么不配合”改成“什么条件能让你放心推进”。',history:'赤壁之战不只是火攻的技巧，更是对曹军水土不服、连船成阵、骄傲轻敌等结构弱点的利用。'},
 {title:'知彼知己',sub:'先知道自己和对方在什么位置',source:'孙子兵法 / 谋攻篇',quote:'“知彼知己，百战不殆；不知彼而知己，一胜一负；不知彼不知己，每战必殆。”',note:'对自己的能力、资源和边界有清醒认识，同时掌握对方真实需求与约束。',matter:'做方案前先列资源、时间、能力和最坏结果，避免只凭热情下注。',people:'不要把对方的拒绝直接解释成恶意，先区分利益冲突、信息差、身份压力和情绪反应。',history:'刘邦与项羽的差异，不只在勇力，也在于对自身长处和团队结构的判断不同。'}
];
const chapters=['始计篇','作战篇','谋攻篇','军形篇','兵势篇','虚实篇','军争篇','九变篇','行军篇','地形篇','九地篇','火攻篇','用间篇'];
const plans=['瞒天过海','围魏救赵','借刀杀人','以逸待劳','趁火打劫','声东击西','无中生有','暗度陈仓','隔岸观火','笑里藏刀','李代桃僵','顺手牵羊','打草惊蛇','借尸还魂','调虎离山','欲擒故纵','抛砖引玉','擒贼擒王','釜底抽薪','混水摸鱼','金蝉脱壳','关门捉贼','远交近攻','假道伐虢','偷梁换柱','指桑骂槐','假痴不癫','上屋抽梯','树上开花','反客为主','美人计','空城计','反间计','苦肉计','连环计','走为上计'];
function readNotes(){try{const saved=JSON.parse(localStorage.getItem('兵法-notes')||'[]');return Array.isArray(saved)?saved:[]}catch(error){return []}}
function persistNotes(){try{localStorage.setItem('兵法-notes',JSON.stringify(notes));return true}catch(error){return false}}
let index=0, mode='matter', notes=readNotes(), currentReading=readings[0], currentBook='sunzi';
const $=id=>document.getElementById(id);
function renderWorkplace(){
 const chapter=currentBook==='plans'?plans[index]:chapters[index];
 const guide=workplaceGuides[chapter];
 if(!guide)return;
 const [lens,responsibilityMatter,responsibilityPeople,reluctanceMatter,reluctancePeople]=guide;
 $('work-lens').textContent=`${currentBook==='plans'?'《三十六计》':'《孙子兵法》'}·${chapter}：${lens}`;
 $('work-responsibility-matter').textContent=responsibilityMatter;
 $('work-responsibility-people').textContent=responsibilityPeople;
 $('work-reluctance-matter').textContent=reluctanceMatter;
 $('work-reluctance-people').textContent=reluctancePeople;
 $('work-responsibility-script').textContent=`沟通示例：“这一步先按‘${lens}’处理。请确认你负责的交付和时间；有阻碍我们今天一起调整。”`;
 $('work-reluctance-script').textContent=`沟通示例：“我想按‘${lens}’重新安排这项任务。请先确认目标和优先级，再定交付范围。”`;
}
function render(){const r=currentReading;$('page-title').textContent='今天读：'+r.title;$('page-subtitle').textContent=r.sub;$('quote-kind').textContent=r.placeholder?'篇目提示':'原文';$('quote-source').textContent=r.source;$('quote').textContent=r.quote;$('note-text').textContent=r.note;$('matter-text').textContent=r.matter;$('people-text').textContent=r.people;$('history-title').textContent=r.historyTitle||'历史镜像';$('history-text').textContent=r.history;$('card-num').textContent=String(index+1).padStart(2,'0');const total=currentBook==='plans'?36:13;$('progress-text').textContent=Math.round((index+1)/total*100)+'%';$('progress-bar').style.width=((index+1)/total*100)+'%';document.querySelectorAll('.chapter').forEach((x,i)=>x.classList.toggle('selected',i===index));renderWorkplace();loadDraft();}
function loadDraft(){const n=notes.find(x=>x.title===currentReading.title);$('understanding').value=n&&n.understanding||'';$('scenario').value=n&&n.scenario||'';$('experiment').value=n&&n.experiment||'';}
function save(){const r=currentReading, item={title:r.title,understanding:$('understanding').value,scenario:$('scenario').value,experiment:$('experiment').value,date:new Date().toLocaleDateString('zh-CN')};notes=[item,...notes.filter(x=>x.title!==r.title)];$('save-state').textContent=persistNotes()?'已保存 · '+item.date:'此浏览器无法保存笔记';renderRecent();}
function renderRecent(){const box=$('recent-list');box.innerHTML=notes.length?notes.slice(0,4).map(n=>`<div class="recent-item"><strong>${n.title}</strong><p>${n.understanding||'已保存阅读卡'} · ${n.date}</p></div>`).join(''):'<div class="empty">还没有阅读卡。读完第一条就保存下来吧。</div>';}
document.querySelectorAll('.mode').forEach(b=>b.onclick=()=>{mode=b.dataset.mode;document.querySelectorAll('.mode').forEach(x=>x.classList.toggle('active',x===b));});
function closeMobileNav(){document.body.classList.remove('mobile-nav-open');$('mobile-nav-toggle').setAttribute('aria-expanded','false');$('mobile-nav-backdrop').hidden=true;}
function openMobileNav(){document.body.classList.add('mobile-nav-open');$('mobile-nav-toggle').setAttribute('aria-expanded','true');$('mobile-nav-backdrop').hidden=false;$('mobile-nav-close').focus();}
$('mobile-nav-toggle').onclick=openMobileNav;
$('mobile-nav-close').onclick=()=>{closeMobileNav();$('mobile-nav-toggle').focus();};
$('mobile-nav-backdrop').onclick=closeMobileNav;
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('mobile-nav-open')){closeMobileNav();$('mobile-nav-toggle').focus();}});
function readingForChapter(c,i){
 const known=readings.find(r=>r.title===c||(currentBook==='sunzi'&&c==='谋攻篇'&&r.title==='知彼知己'));
 if(known)return currentBook==='sunzi'?Object.assign({},known,{title:c,sub:'知彼知己 · 先知道自己和对方在什么位置'}):known;
 const guide=workplaceGuides[c];
 const source=currentBook==='plans'?'三十六计 / '+(i<6?'胜战计':i<12?'敌战计':i<18?'攻战计':i<24?'混战计':i<30?'并战计':'败战计'):'孙子兵法 / '+c;
 return {title:c,sub:guide[0],source,quote:'本篇原文与逐句注释尚在整理；下方职场应用已按本篇主题更新。',note:'先把这篇的核心问题放到自己的工作场景中，辨别目标、责任、资源与沟通方式。',matter:guide[1],people:guide[2],history:'本篇的历史案例尚在整理。',historyTitle:'历史镜像',placeholder:true};
}
function renderChapters(items,title,count){currentBook=title==='三十六计'?'plans':'sunzi';$('chapter-list').innerHTML='';$('index-title').textContent=title;$('index-count').textContent=count;items.forEach((c,i)=>{const b=document.createElement('button');b.className='chapter';b.textContent=`${String(i+1).padStart(2,'0')}  ${c}`;b.onclick=()=>{index=i;currentReading=readingForChapter(c,i);render();closeMobileNav()};$('chapter-list').appendChild(b);});}
document.querySelectorAll('.section').forEach(b=>b.onclick=()=>{document.querySelectorAll('.section').forEach(x=>x.classList.remove('active'));b.classList.add('active');if(b.dataset.section==='sunzi'){renderChapters(chapters,'孙子兵法十三篇','13 篇')}else if(b.dataset.section==='plans'){renderChapters(plans,'三十六计','36 计')}const first=$('chapter-list').firstElementChild;if(first)first.click()});
document.querySelectorAll('.book').forEach(b=>b.onclick=()=>{if(b.dataset.book==='new'){alert('下一步可以在这里添加书名、作者和目录。');return}document.querySelectorAll('.book').forEach(x=>x.classList.remove('active'));b.classList.add('active');});
document.querySelector('#add-book').onclick=()=>alert('下一步可以在这里添加书名、作者和目录。');
renderChapters(chapters,'孙子兵法十三篇','13 篇');
$('chapter-list').firstElementChild.click();
$('prev-btn').onclick=()=>{const items=document.querySelectorAll('.chapter');const item=items[(index+items.length-1)%items.length];if(item)item.click()};$('next-btn').onclick=()=>{const items=document.querySelectorAll('.chapter');const item=items[(index+1)%items.length];if(item)item.click()};$('history-btn').onclick=()=>{$('history-text').textContent='换一个角度：真正的优势常常在交锋前形成。提前准备事实、节奏和退出方案，能让你不必依赖临场勇气。'};$('copy-quote').onclick=()=>{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(currentReading.quote)};$('save-card').onclick=save;$('clear-cards').onclick=()=>{notes=[];try{localStorage.removeItem('兵法-notes')}catch(error){}renderRecent()};$('reset-btn').onclick=()=>{if(confirm('确定清空本设备上的所有阅读卡吗？')){$('clear-cards').click();loadDraft();}};$('ask-btn').onclick=()=>{const q=$('question').value.trim();if(!q)return;$('answer').classList.remove('hidden');$('answer').innerHTML=`<strong>先拆开看：</strong>你问的是“${q}”。这条原则的核心不是操控对方，而是先识别局势中的阻力。处理事儿时，检查目标、路径和节奏；处理人时，检查对方的顾虑、面子和选择权。<br><br><strong>给你的追问：</strong>如果不要求对方立刻认输，你希望他下一步做出什么可验证的动作？`};$('select-help').onclick=()=>{$('question').focus();$('question').placeholder='把你选中的原文和具体场景粘贴进来……';};render();renderRecent();
