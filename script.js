var CONFIG = {
  nomeDela: "",
  meuNome: "",
  quando: "A combinar",
  onde: "A combinar",
  whatsapp: "5511944428363"
};

var $ = function(id){return document.getElementById(id)};
function show(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('on')});
  $(id).classList.add('on');
}

var dias=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
var meses=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
function tick(){
  var d=new Date();
  $('clock').textContent=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
  $('date').textContent=dias[d.getDay()]+", "+d.getDate()+" de "+meses[d.getMonth()];
}
tick(); setInterval(tick,20000);

var nome=CONFIG.nomeDela, eu=CONFIG.meuNome;
if(eu){ $('who').textContent=eu; $('me').textContent=eu; }
$('when').textContent=CONFIG.quando;
$('where').textContent=CONFIG.onde;
if(nome){ document.title="Saudade detectada, "+nome; }

setTimeout(function(){ if(navigator.vibrate) try{navigator.vibrate([60,40,60])}catch(e){} },1200);

$('notif').addEventListener('click',function(){
  show('alert');
  setTimeout(function(){
    $('bar').style.width='87%';
    var n=0,t=setInterval(function(){ n+=3; if(n>=87){n=87;clearInterval(t)} $('pct').textContent=n+"%"; },34);
  },350);
});

var tries=0, msgs=[
  "Ação bloqueada: saudade não pode ser ignorada.",
  "Tentativa registrada. O nível subiu para 91%.",
  "Erro 404: coragem para ignorar não encontrada."
];
$('ignore').addEventListener('click',function(){
  $('err').textContent=msgs[Math.min(tries,msgs.length-1)];
  tries++;
  var d=document.querySelector('#alert .dialog');
  d.classList.remove('shake'); void d.offsetWidth; d.classList.add('shake');
  if(navigator.vibrate) try{navigator.vibrate(120)}catch(e){}
  if(tries>=2){ $('pct').textContent="91%"; $('bar').style.width="91%"; }
});

$('fix').addEventListener('click',function(){
  show('scan');
  var rows=document.querySelectorAll('#scan .log div'), i=0;
  (function next(){
    if(i>0){ var p=rows[i-1].querySelector('.st'); p.classList.add('ok'); p.textContent='✓'; }
    if(i<rows.length){ rows[i].classList.add('show'); i++; setTimeout(next,1100); }
    else setTimeout(function(){ show('result'); },700);
  })();
});

var thinkMsgs=["O sistema aguarda a resposta por até 5 minutos ⏳","Saudade a 94% e subindo. Recomendamos aceitar.","Nível crítico de saudade. Última chance de aceitar 😅"];
var th=0;
$('think').addEventListener('click',function(){
  $('toast').textContent=thinkMsgs[Math.min(th,thinkMsgs.length-1)]; th++;
});
$('accept').addEventListener('click',function(){
  show('done'); boom();
  if(navigator.vibrate) try{navigator.vibrate([80,50,80,50,160])}catch(e){}
  var txt="Aceitei a solução pra saudade 😄"+(CONFIG.quando!=="A combinar"?" Vamos de "+CONFIG.quando+"?":" Quando a gente marca?");
  var num=(CONFIG.whatsapp||"").replace(/\D/g,"");
  $('wa').href="https://wa.me/"+num+"?text="+encodeURIComponent(txt);
});

function boom(){
  var c=$('confetti'),x=c.getContext('2d'),W=c.width=innerWidth*devicePixelRatio,H=c.height=innerHeight*devicePixelRatio;
  var cols=["#ff453a","#ff9f0a","#ffd60a","#32d74b","#0a84ff","#bf5af2","#ffffff"],P=[];
  for(var i=0;i<150;i++)P.push({x:W/2,y:H*.42,vx:(Math.random()-.5)*22*devicePixelRatio,vy:(-Math.random()*20-5)*devicePixelRatio,s:(Math.random()*7+5)*devicePixelRatio,r:Math.random()*6,vr:(Math.random()-.5)*.4,c:cols[i%cols.length]});
  var f=0;
  (function loop(){
    x.clearRect(0,0,W,H);
    P.forEach(function(p){p.vy+=.55*devicePixelRatio;p.x+=p.vx;p.y+=p.vy;p.vx*=.992;p.r+=p.vr;
      x.save();x.translate(p.x,p.y);x.rotate(p.r);x.fillStyle=p.c;x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);x.restore()});
    if(++f<170)requestAnimationFrame(loop);else x.clearRect(0,0,W,H);
  })();
}
