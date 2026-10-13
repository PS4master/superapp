(function(){
var q=document.getElementById('q'),btns=document.querySelectorAll('[data-f]'),f='all';
var secs=document.querySelectorAll('section[data-sec]'),empty=document.getElementById('empty');
var rec=document.getElementById('recent'),rg=document.getElementById('rg'),K='superapp_recent';
function load(){try{return JSON.parse(localStorage.getItem(K))||[]}catch(e){return[]}}
function drawRecent(){
  if(!rec)return;var l=load();rg.textContent='';
  l.forEach(function(r){var a=document.createElement('a');a.className='tile';a.href=r.h;a.target='_blank';a.rel='noopener';
    var i=document.createElement('img');i.src=r.i;i.alt='';var b=document.createElement('b');b.textContent=r.t;
    a.append(i,b);rg.appendChild(a)});
  rec.hidden=!l.length||f!=='all'||q.value.trim()!=='';
}
function run(){
  var t=q.value.trim().toLowerCase(),any=false;
  secs.forEach(function(s){
    var show=f==='all'||s.dataset.sec===f,n=0;
    s.querySelectorAll('.tile').forEach(function(a){var ok=!t||a.dataset.q.toLowerCase().indexOf(t)>-1;a.hidden=!ok;if(ok)n++});
    if(s.querySelector('.duos'))n=t?0:1;
    s.hidden=!show||n===0;if(!s.hidden)any=true;
  });
  empty.hidden=any;drawRecent();
}
btns.forEach(function(b){b.addEventListener('click',function(){
  if(b.dataset.f==='pc'){location.href='windows.html';return}
  f=b.dataset.f;btns.forEach(function(c){c.classList.toggle('on',c.dataset.f===f)});run();
  if(innerWidth<700)scrollTo({top:0,behavior:'smooth'});
})});
q.addEventListener('input',run);
document.querySelectorAll('main .tile').forEach(function(a,i){a.style.setProperty('--i',i%14);
  if(a.dataset.q)a.addEventListener('click',function(){
    var l=load().filter(function(r){return r.h!==a.href&&r.h!==a.getAttribute('href')});
    l.unshift({h:a.getAttribute('href'),t:a.querySelector('b').textContent,i:a.querySelector('img').getAttribute('src')});
    try{localStorage.setItem(K,JSON.stringify(l.slice(0,6)))}catch(e){}
  });
});
drawRecent();
})();
