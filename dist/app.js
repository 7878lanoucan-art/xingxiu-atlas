let currentGroup='全部', query='', current=0, version=0;
const $=s=>document.querySelector(s), dialog=$('#detail');
const thumb=p=>p.replace('.webp','-thumb.webp');
const blank=()=>'<div class="placeholder"><b>觜</b><span>觜火猴 · 图像待补</span><span>星宿故事已收录</span></div>';
$('#groups').innerHTML=GROUPS.map(g=>`<button class="group-panel" data-group="${g.name}" style="--accent:${g.color}"><small>${g.direction} · 七宿</small><strong>${g.name}</strong><p>${g.desc}</p><span class="arrow">↗</span></button>`).join('');
$('#tabs').innerHTML=['全部',...GROUPS.map(g=>g.name)].map(g=>`<button data-filter="${g}" class="${g==='全部'?'active':''}" aria-pressed="${g==='全部'}">${g}</button>`).join('');
function render(){const list=STARS.filter(s=>(currentGroup==='全部'||s.group===currentGroup)&&(!query||[s.name,s.group,s.direction,s.meaning,s.visual,s.name==='心月狐'?'狐狸':''].join(' ').includes(query)));$('#grid').innerHTML=list.map(s=>`<button class="star-card" data-id="${s.id}" aria-label="查看${s.name}详情"><div class="image-wrap">${s.images.length?`<img loading="lazy" src="${thumb(s.images[0])}" alt="${s.name}国风插画">`:blank()}</div><div class="star-meta"><h3>${s.name}</h3><span>${s.direction}${s.group} · 第${s.number}宿</span></div><p class="star-sub">${s.visual}</p></button>`).join('');$('#result-label').textContent=`${currentGroup==='全部'?'二十八宿全览':GROUPS.find(g=>g.name===currentGroup).direction+currentGroup+'七宿'} / ${list.length} 宿`;$('#empty').hidden=list.length>0;document.querySelectorAll('[data-filter]').forEach(b=>{const active=b.dataset.filter===currentGroup;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)});document.querySelectorAll('[data-group]').forEach(b=>b.classList.toggle('selected',b.dataset.group===currentGroup));}
function filter(g){currentGroup=g;render()}
$('#tabs').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b)filter(b.dataset.filter)});
$('#groups').addEventListener('click',e=>{const b=e.target.closest('[data-group]');if(b){filter(b.dataset.group);$('.catalog-tools').scrollIntoView({block:'start',behavior:'smooth'})}});
$('#search').addEventListener('input',e=>{query=e.target.value.trim();render()});$('#reset').onclick=()=>{query='';$('#search').value='';filter('全部')};
function detail(id){current=id;version=0;const s=STARS[id];$('#detail-title').textContent=s.name;$('#detail-group').textContent=`${s.direction} · ${s.group}七宿 / ${String(s.number).padStart(2,'0')}`;$('#detail-reading').textContent=s.label;$('#detail-meaning').textContent=s.meaning;$('#detail-visual').textContent=s.visual;$('#versions').innerHTML=s.images.length>1?s.images.map((_,i)=>`<button data-version="${i}" class="${i===0?'active':''}">创作版本 ${i+1}</button>`).join(''):'';showImage();if(!dialog.open)dialog.showModal();document.body.style.overflow='hidden';dialog.scrollTop=0}
function showImage(){const s=STARS[current];$('#detail-art').classList.remove('expanded');$('#detail-art').innerHTML=s.images.length?`<img src="${s.images[version]}" alt="${s.name}完整卡牌，点击放大" tabindex="0" role="button" aria-label="放大或缩小${s.name}卡牌">`:blank();}
$('#grid').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)detail(Number(b.dataset.id))});
$('#versions').addEventListener('click',e=>{const b=e.target.closest('[data-version]');if(b){version=Number(b.dataset.version);showImage();$('#versions').querySelectorAll('button').forEach((x,i)=>x.classList.toggle('active',i===version))}});
$('.close').onclick=()=>dialog.close();dialog.addEventListener('close',()=>{document.body.style.overflow=''});dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
$('#detail-art').onclick=e=>{if(e.target.tagName==='IMG')$('#detail-art').classList.toggle('expanded')};$('#detail-art').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#detail-art').classList.toggle('expanded')}};$('#prev').onclick=()=>detail((current+27)%28);$('#next').onclick=()=>detail((current+1)%28);render();
const motionToggle=document.querySelector('#motion-toggle');
if(motionToggle)motionToggle.addEventListener('click',()=>{const paused=document.querySelector('.hero').classList.toggle('motion-paused');motionToggle.setAttribute('aria-pressed',String(paused));const label=paused?'播放卡牌动效 ▷':'暂停卡牌动效 Ⅱ';const mount=motionToggle.querySelector('.glass-mount');Array.from(motionToggle.childNodes).filter(n=>n!==mount).forEach(n=>n.remove());motionToggle.append(document.createTextNode(label));});

// 以整张卡片为透视平面，指针所在边角向后退。
(()=>{
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const selector='#grid .star-card, #groups .group-panel';
 let active=null,box=null,frame=0,point=null;
 function reset(){if(active){active.classList.remove('corner-active');['--corner-x','--corner-y','--light-x','--light-y','--shine-angle'].forEach(k=>active.style.removeProperty(k))}active=null;box=null;point=null;cancelAnimationFrame(frame);frame=0}
 function draw(){frame=0;if(!active||!point||!box)return;const x=Math.max(-1,Math.min(1,(point.x-box.left)/box.width*2-1));const y=Math.max(-1,Math.min(1,(point.y-box.top)/box.height*2-1));active.style.setProperty('--corner-x',(-y*15).toFixed(2)+'deg');active.style.setProperty('--corner-y',(x*15).toFixed(2)+'deg');active.style.setProperty('--light-x',((x+1)*50).toFixed(1)+'%');active.style.setProperty('--light-y',((y+1)*50).toFixed(1)+'%');active.style.setProperty('--shine-angle',(115+x*25-y*20).toFixed(1)+'deg')}
 document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||reduced.matches)return;const card=e.target.closest(selector);if(!card){if(active)reset();return}if(active!==card){reset();active=card;box=card.getBoundingClientRect();card.classList.add('corner-active')}point={x:e.clientX,y:e.clientY};if(!frame)frame=requestAnimationFrame(draw)},{passive:true});
 document.addEventListener('pointerout',e=>{if(active&&!active.contains(e.relatedTarget))reset()},{passive:true});
 window.addEventListener('blur',reset);window.addEventListener('scroll',reset,{passive:true});reduced.addEventListener('change',reset);
})();
