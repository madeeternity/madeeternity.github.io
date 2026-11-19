// Ambient shader: autonomous movement, no pointer instructions or interaction label.
(() => {
  const canvas = document.getElementById('ambient');
  const ctx = canvas.getContext('2d');
  let w, h, dpr, t = 0;
  const resize = () => { dpr = Math.min(devicePixelRatio || 1, 1.6); w = innerWidth; h = innerHeight; canvas.width = w*dpr; canvas.height = h*dpr; canvas.style.width=w+'px'; canvas.style.height=h+'px'; ctx.setTransform(dpr,0,0,dpr,0,0); };
  const blobs = [{x:.18,y:.18,r:.34,s:.00021,a:0},{x:.83,y:.42,r:.32,s:.00016,a:2.1},{x:.52,y:.92,r:.28,s:.00019,a:4.2}];
  function draw(){t+=1;ctx.clearRect(0,0,w,h);blobs.forEach((b,i)=>{const x=(b.x+Math.sin(t*b.s+b.a)*.09)*w;const y=(b.y+Math.cos(t*b.s*.8+b.a)*.08)*h;const r=b.r*Math.min(w,h);const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,i===1?'rgba(113,157,84,.13)':'rgba(151,202,105,.11)');g.addColorStop(.48,'rgba(70,110,64,.045)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)});requestAnimationFrame(draw)}
  addEventListener('resize',resize);resize();draw();
})();

const projects = {
  scary:{title:'ScaryWorld',copy:'Minecraft-сервер с собственной игровой атмосферой и поддержкой версий 1.21.4–26.2. Сообщество и новости проекта доступны в Telegram.',tags:['Minecraft','1.21.4–26.2','Game server']},
  eternity:{title:'EternityDLC',copy:'Клиент для Minecraft 1.21.4, ориентированный на ReallyWorld и Spookytime. Развитие и информация о проекте — в Telegram.',tags:['Minecraft 1.21.4','ReallyWorld','Spookytime']},
  radi:{title:'RadiVPN',copy:'VPN-сервис с несколькими локациями, стабильным подключением и фокусом на хорошую скорость и низкий пинг.',tags:['VPN','Networking','Product']}
};
const modal=document.getElementById('modal'), title=document.getElementById('modal-title'), copy=document.getElementById('modal-copy'), tags=document.getElementById('modal-tags');
document.querySelectorAll('[data-readme]').forEach(btn=>btn.addEventListener('click',()=>{const p=projects[btn.dataset.readme];title.textContent=p.title;copy.textContent=p.copy;tags.innerHTML='';p.tags.forEach(tag=>{const s=document.createElement('span');s.textContent=tag;tags.appendChild(s)});modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.getElementById('modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const form=document.getElementById('terminal-form'), input=document.getElementById('terminal-input'), history=document.getElementById('terminal-history');
const commands={
 help:'Available: help, about, skills, projects, contact, clear, date',
 about:'MadeEternity · 17 years old · Russia · Status: Active',
 skills:'Java 92% | Python 90% | MariaDB 90% | MySQL 92% | SQLite 88% | C# 50%',
 projects:'ScaryWorld · EternityDLC · RadiVPN',
 contact:'Telegram: @madeeternity — https://t.me/madeeternity',
 date:'System date: 2026 · Session: online'
};
form.addEventListener('submit',e=>{e.preventDefault();const cmd=input.value.trim().toLowerCase();if(!cmd)return;const line=document.createElement('div');line.className='terminal-history-line';line.innerHTML='<span class="terminal-user">madeeternity</span><span class="terminal-at">@</span><span class="terminal-host">arch</span> <span class="terminal-path">~</span> <span class="terminal-prompt">❯</span> <span class="cmd"></span>';line.querySelector('.cmd').textContent=cmd;history.appendChild(line);const out=document.createElement('div');out.className='terminal-history-line';if(cmd==='clear'){history.innerHTML='';input.value='';return}out.textContent=commands[cmd]||`zsh: command not found: ${cmd} · type "help"`;history.appendChild(out);input.value='';history.scrollIntoView({block:'nearest',behavior:'smooth'})});
