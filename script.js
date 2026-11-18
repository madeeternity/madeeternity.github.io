const root=document.documentElement,themeToggle=document.getElementById('themeToggle');
const saved=localStorage.getItem('bio-theme');if(saved)root.dataset.theme=saved;
function updateThemeLabel(){const light=root.dataset.theme==='light';themeToggle.querySelector('.theme-icon').textContent=light?'☾':'☼';themeToggle.querySelector('.theme-label').textContent=light?'Тёмная тема':'Светлая тема';document.querySelector('meta[name="theme-color"]').content=light?'#f5f7f2':'#0c100c'}
updateThemeLabel();themeToggle.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';localStorage.setItem('bio-theme',root.dataset.theme);updateThemeLabel()});

const readmes={
 scary:{title:'ScaryWorld',body:'ScaryWorld — гриферский Minecraft-сервер.\\n\\nПоддерживаемые версии: 1.21.4–26.2.\\n\\nПроект ориентирован на формат гриферского выживания и развитие игрового сообщества.'},
 eternity:{title:'EternityDLC',body:'EternityDLC — чит-клиент для Minecraft.\\n\\nВерсия клиента: 1.21.4.\\n\\nПредназначен для использования на серверах ReallyWorld и Spookytime.'},
 radi:{title:'RadiVPN',body:'RadiVPN — стабильный VPN-сервис с большим выбором локаций и удобным подключением.\\n\\nСервис ориентирован на стабильную сеть, хорошую скорость соединения и низкий пинг. Подходит для повседневного использования и доступа к привычным интернет-ресурсам.'}
};
const modal=document.getElementById('modal'),title=document.getElementById('modalTitle'),body=document.getElementById('readmeText');
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelectorAll('.readme').forEach(btn=>btn.addEventListener('click',()=>{const data=readmes[btn.dataset.project];title.textContent=data.title;body.textContent=data.body.replaceAll('\\n','\n');modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
document.getElementById('closeModal').addEventListener('click',closeModal);document.getElementById('doneModal').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const bars=document.querySelectorAll('.skill');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const bar=entry.target;bar.querySelector('em').style.width=bar.dataset.value+'%';observer.unobserve(bar)}}),{threshold:.35});bars.forEach(b=>observer.observe(b));

// Interactive lime light-field shader: responds to pointer movement and touch.
const canvas=document.getElementById('shader'),ctx=canvas.getContext('2d'),coords=document.getElementById('coords');
let pointer={x:.72,y:.48,tx:.72,ty:.48},frame=0,w=0,h=0,dpr=1;
function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,2);w=r.width;h=r.height;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
function move(e){const r=canvas.getBoundingClientRect();pointer.tx=(e.clientX-r.left)/r.width;pointer.ty=(e.clientY-r.top)/r.height;coords.textContent=Math.round(pointer.tx*100).toString().padStart(2,'0')+' / '+Math.round(pointer.ty*100).toString().padStart(2,'0')}
canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerdown',move);window.addEventListener('resize',resize);resize();
function draw(){frame+=.006;pointer.x+=(pointer.tx-pointer.x)*.045;pointer.y+=(pointer.ty-pointer.y)*.045;ctx.clearRect(0,0,w,h);
const bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#071007');bg.addColorStop(.55,'#10200c');bg.addColorStop(1,'#030803');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
const x=pointer.x*w,y=pointer.y*h;
for(let i=0;i<5;i++){const ox=x+Math.sin(frame+i*1.3)*w*.12+(i-2)*w*.09,oy=y+Math.cos(frame*.8+i)*h*.13+(i-2)*h*.07,r=Math.max(w,h)*(.25+i*.075);const g=ctx.createRadialGradient(ox,oy,0,ox,oy,r);g.addColorStop(0,`rgba(${150+i*8},255,${35+i*5},${.15-i*.018})`);g.addColorStop(.45,`rgba(75,190,15,${.09-i*.012})`);g.addColorStop(1,'rgba(20,80,5,0)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h)}
ctx.save();ctx.globalAlpha=.16;ctx.strokeStyle='#baff76';ctx.lineWidth=.6;for(let i=0;i<13;i++){ctx.beginPath();const yy=h*.18+i*h*.055;ctx.moveTo(0,yy);for(let xx=0;xx<=w;xx+=12){const wave=Math.sin(xx*.012+frame*2+i*.35)*18+Math.cos(xx*.006-frame+i)*10;ctx.lineTo(xx,yy+wave)}ctx.stroke()}ctx.restore();
const glow=ctx.createRadialGradient(x,y,0,x,y,80);glow.addColorStop(0,'rgba(220,255,170,.18)');glow.addColorStop(1,'rgba(170,255,50,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);requestAnimationFrame(draw)}
draw();
