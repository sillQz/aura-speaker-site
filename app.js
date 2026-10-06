const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const parts=[
['Скульптурная форма','Слегка сужающийся силуэт без выраженного фасада. Колонку можно поставить между предметами и подойти к ней с разных сторон. Диаметр 160 мм и высота 220 мм — стартовые размеры макета.','Занимает небольшую площадь стола; верхняя панель остаётся доступной. Симметрия упрощает визуальное восприятие.','Вертикальный корпус может опрокидываться при толчке. Нужны низкий центр масс и испытание устойчивости; звук на 360° требует отдельного акустического решения.','Поставить полноразмерные макеты на тумбу и стол. Проверить доступ к управлению, устойчивость и визуальный масштаб.'],
['Вулканическая фактура','Графитовый акустический текстиль с тонким рельефом напоминает остывшую лаву. Это ткань, а не камень: оболочка остаётся звукопроницаемой и съёмной.','Мягкая поверхность уместна рядом с мебелью. Ткань пропускает звук и защищает внутренние детали от случайного контакта.','Плетение влияет на затухание высоких частот, собирает пыль и может изнашиваться. Нельзя выбирать ткань только по фотографии.','Сравнить акустические измерения с тканью и без неё. Проверить чистку, истирание, стойкость окраски и сборку шва.'],
['Тёплый световой шов','Узкий рассеиватель проходит под верхней панелью. Скрытые светодиоды дают непрерывный контур без видимых точек.','Состояние заметно с разных сторон. Свет отделён от управления и не требует отдельного экрана.','Слишком яркое кольцо мешает вечером; слишком слабое не видно днём. Ошибки нельзя кодировать одним цветом.','Проверить видимость в дневной и ночной комнате. Попросить участников назвать состояние без подсказки. Оценить равномерность рассеивания.'],
['Точная металлическая корона','Анодированный графитовый алюминий и небольшая насечка по кромке. Вращение регулирует громкость, короткое нажатие ставит звук на паузу.','Физическое действие понятно без экрана. Фактура помогает найти управление рукой; металл создаёт ощущение точной и долговечной детали.','Нужны достаточное усилие и отсутствие люфта. Металл рядом с антеннами может ухудшать радиосвязь.','Проверить влажные и сухие руки, точность малого изменения громкости и ресурс механизма. Разместить антенны в радиопрозрачной зоне.'],
['Приватность и подключения','На задней стороне — отдельный механический переключатель микрофонов и вход питания. Разъём утоплен, кабель направлен вниз.','Физическое отключение даёт контроль без голосовой команды. Задний ввод уменьшает визуальный шум на столе.','Переключатель должен разрывать питание микрофонов аппаратно; простого программного флага недостаточно. Доступ сзади не всегда удобен.','Проверить отключение на схеме и прототипе. Оценить доступ вслепую, читаемость маркировки и нагрузку на кабель.'],
['Основание и ремонт','Тяжёлое нижнее основание с эластомерным кольцом. Крепёж размещён снизу; оболочка и электронные модули должны сниматься отдельно.','Низкий центр масс повышает устойчивость, мягкая опора уменьшает передачу вибрации столу. Разборная конструкция упрощает сервис.','Чрезмерная масса усложняет перевозку. Герметизация и клеевые соединения могут конфликтовать с ремонтопригодностью.','Проверить скольжение на дереве и стекле, дребезг на высокой громкости, время разборки и возможность замены узлов.']];
let selected=0,yaw=-.44,exploded=false,state=0,micOff=false;
function choosePart(i){const previous=selected;selected=i;const detail=$('#part-detail');detail.innerHTML=`<span class="eyebrow">ДЕТАЛЬ 0${i+1}</span><h3>${parts[i][0]}</h3><p>${parts[i][1]}</p><h4>ЗАЧЕМ</h4><p>${parts[i][2]}</p><h4>КОМПРОМИСС</h4><p>${parts[i][3]}</p><h4>КАК ПРОВЕРИТЬ</h4><p>${parts[i][4]}</p>`;if(i!==previous&&!reduced){detail.getAnimations().forEach(a=>a.cancel());detail.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'cubic-bezier(.22,.7,.3,1)'})}$$('.part-tabs button,.hotspot').forEach(b=>{const on=+b.dataset.part===i;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)})}
parts.forEach((p,i)=>{$('#part-tabs').insertAdjacentHTML('beforeend',`<button data-part="${i}" aria-label="${p[0]}">${i+1}</button>`);$('#hotspots').insertAdjacentHTML('beforeend',`<button class="hotspot" data-part="${i}" aria-label="${p[0]}">${i+1}</button>`)});$$('[data-part]').forEach(b=>b.onclick=()=>choosePart(+b.dataset.part));choosePart(0);
const scenarios=[['Утро','07:30','Начать день без телефона','Пользователь собирается на работу, руки заняты. Просит включить спокойную музыку и поставить таймер.','Голос с расстояния 1–3 м; короткое подтверждение и различимое прослушивание.','Слышимость команд при музыке, скорость ответа, успешность установки таймера.'],['Работа','13:00','Сосредоточиться на задаче','Колонка стоит рядом с монитором. Пользователь уменьшает громкость поворотом верхнего кольца и ставит паузу перед звонком.','Управление одной рукой без взгляда; короткое нажатие не должно сдвигать корпус.','Точность громкости, устойчивость, отсутствие случайных команд.'],['Вечер','20:30','Слушать вместе','В гостиной играет музыка. К устройству подходят с разных сторон; никто не должен искать маленькую кнопку на задней панели для паузы.','Верхнее управление доступно; свет заметен из нескольких точек комнаты.','Равномерность звучания, доступ с разных сторон, понятность индикации.'],['Ночь','23:15','Сохранить тишину и контроль','Пользователь снижает яркость и отключает микрофоны перед сном. Состояние должно быть понятно даже без голосового ответа.','Мягкая индикация и механический переключатель с однозначными положениями.','Комфорт яркости в темноте, проверка аппаратного отключения, отсутствие внезапных громких сигналов.']];
function chooseScenario(i){const s=scenarios[i];$('#scenario-time').textContent=s[1];$('#scenario-title').textContent=s[2];$('#scenario-desc').textContent=s[3];$('#scenario-details').innerHTML=`<h4>ТРЕБОВАНИЕ К ДИЗАЙНУ</h4><p>${s[4]}</p><h4>ЧТО ИССЛЕДОВАТЬ</h4><p>${s[5]}</p>`;$$('#scenario-tabs button').forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',i===j)})}scenarios.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s[0];b.onclick=()=>chooseScenario(i);$('#scenario-tabs').append(b)});chooseScenario(0);
const states=[['Ожидание','#e69461','Слабый неподвижный контур; в ночном режиме может гаснуть. Колонка готова к команде.'],['Слушает','#eab38c','Плавный световой импульс показывает, что команда принимается. Короткий сигнал подтверждает активацию.'],['Обрабатывает','#c8c7c4','Медленное перемещение яркого участка по кольцу: запрос принят, нужно подождать.'],['Ошибка связи','#e8ad75','Два коротких импульса с паузой. Голосовое или текстовое сообщение в приложении уточняет причину.'],['Микрофон выключен','#b95c52','Постоянный красноватый контур и положение механического переключателя подтверждают отключение.']];
function chooseState(i){state=micOff?4:i;$('#state-info').innerHTML=`<h3>${states[state][0]}</h3><p>${states[state][2]}</p>`;$$('#state-tabs button').forEach((b,j)=>{b.classList.toggle('active',j===state);b.setAttribute('aria-pressed',j===state)})}states.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s[0];b.onclick=()=>chooseState(i);$('#state-tabs').append(b)});chooseState(0);
const specs=[['Габариты','Ø 160 × 220 мм; масса около 1,8 кг','Проверить на реальной мебели. Масса уточняется после выбора динамиков и основания.'],['Акустика','1 НЧ/СЧ динамик + 2 ВЧ; до 40 Вт суммарной номинальной мощности','Архитектурная гипотеза. Измерить АЧХ, искажения, направленность и тепловой режим.'],['Частотный диапазон','Цель: 60 Гц – 20 кГц, допуск ±6 дБ','Измерить в заданных условиях и указать методику; не обещать глубокий бас без прототипа.'],['Микрофоны','Массив из 4 микрофонов; сценарий 1–3 м','Проверить распознавание при бытовом шуме и музыке; расстояние не является гарантией.'],['Связь','Wi-Fi 2,4 / 5 ГГц; Bluetooth','Версию и профили выбрать по платформе. Проверить стабильность и первичное подключение.'],['Управление','Поворот громкости; нажатие паузы; переключатель микрофонов','Тест первого действия без инструкции, ресурс органов управления и аппаратное отключение.'],['Свет','RGB-кольцо с рассеивателем и регулировкой яркости','Проверить читаемость днём, комфорт ночью и различимость без опоры только на цвет.'],['Питание','Внешний сетевой адаптер; низковольтный вход','Напряжение и мощность определяются схемой. Проверить нагрев и защиту от неисправностей.'],['Корпус','Акустический текстиль с вулканической фактурой, алюминий, полимерный каркас, эластомер','Проверить звукопроницаемость, допуски, чистку, истирание и ремонтопригодность.']];$('#spec-body').innerHTML=specs.map(s=>`<tr>${s.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('');
const stakeholders=[['Пользователь','Ежедневный опыт','Понятные команды, приятный звук, доступное управление и приватность.','Проверять успешность задач, комфорт света и доверие к отключению микрофонов.'],['Покупатель','Выбор и владение','Цена, качество материалов, внешний вид, гарантия и срок службы.','Показать преимущества без неподтверждённых обещаний; проверить готовность платить.'],['Дизайнеры','Целостность продукта','Форма, пропорции, материалы, свет и тактильный сценарий должны работать вместе.','Согласовать макет с акустикой, антенной зоной и производственными ограничениями.'],['Инженеры','Техническая реализация','Акустика, микрофоны, питание, радиосвязь, тепло и безопасность.','Проверить параметры измерениями; зафиксировать компромиссы в техническом задании.'],['Производство','Повторяемость','Сборка, допуски, доступность материалов, стоимость и контроль качества.','Провести пробную сборку и проверку стабильности зазоров, швов и светового кольца.'],['Сервис','Срок жизни','Доступ к узлам, диагностика, запчасти и безопасный ремонт.','Проверить замену динамика, платы и тканевой оболочки без повреждения корпуса.'],['Платформа','Цифровой опыт','Голосовой сервис, музыкальные источники, обновления и обработка данных.','Определить работу без сети, региональную доступность и правила хранения голоса.'],['Регуляторы','Допуск на рынок','Безопасность, электромагнитная совместимость и ограничения материалов.','Определить применимые требования и пройти процедуры подтверждения соответствия.']];
function chooseStake(i){const s=stakeholders[i];$('#stake-detail').innerHTML=`<p class="eyebrow">0${i+1} / ${s[1].toUpperCase()}</p><h3>${s[0]}</h3><p>${s[2]}</p><h3>Что учесть в проекте</h3><p>${s[3]}</p>`;$$('.stake-wheel button').forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',i===j)})}stakeholders.forEach((s,i)=>{let a=(i*45+22.5-90)*Math.PI/180,b=document.createElement('button');b.textContent=s[0];b.style.left=50+36*Math.cos(a)+'%';b.style.top=50+36*Math.sin(a)+'%';b.onclick=()=>chooseStake(i);$('#stake-wheel').append(b)});chooseStake(0);
// A sculptural, parametric object. Every surface shares the same projection,
// so rotation, the exploded view and the annotated controls stay aligned.
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function render(canvas,angle,spread,zoom,time,interactive=false){
  const w=canvas.clientWidth,h=canvas.clientHeight,d=Math.min(devicePixelRatio||1,innerWidth<700?1.25:1.5);
  if(!w||!h)return;
  if(canvas.width!==Math.round(w*d)||canvas.height!==Math.round(h*d)){
    canvas.width=Math.round(w*d);canvas.height=Math.round(h*d);
  }
  const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,w,h);
  const scale=Math.min(w/310,h/320)*zoom, tilt=.29, gap=spread*42;
  const project=(x,y,z)=>{
    const xx=x*Math.cos(angle)+z*Math.sin(angle),zz=-x*Math.sin(angle)+z*Math.cos(angle);
    return [w/2+xx*scale,h*.49+(y*Math.cos(tilt)-zz*Math.sin(tilt))*scale,zz*Math.cos(tilt)+y*Math.sin(tilt)];
  };
  const shadow=c.createRadialGradient(w/2,h*.79,0,w/2,h*.79,w*.34);
  shadow.addColorStop(0,'#000b');shadow.addColorStop(1,'#0000');c.fillStyle=shadow;
  c.beginPath();c.ellipse(w/2,h*.79,w*.34,h*.055,0,0,Math.PI*2);c.fill();
  const polygons=[];
  function band(y1,y2,r1,r2,type){
    const n=64;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2,b=(i+1)/n*Math.PI*2;
      const p=[[r1*Math.cos(a),y1,r1*Math.sin(a)],[r1*Math.cos(b),y1,r1*Math.sin(b)],
        [r2*Math.cos(b),y2,r2*Math.sin(b)],[r2*Math.cos(a),y2,r2*Math.sin(a)]].map(v=>project(...v));
      polygons.push({p,depth:p.reduce((s,q)=>s+q[2],0)/4,type,i,light:Math.max(0,Math.sin((a+b)/2-angle)*.52+Math.cos((a+b)/2-angle)*.43+.13)});
    }
  }
  // Broad stone shell, sharpened crown, floating luminous joint, and plinth.
  band(-69,12,72,78,'stone');band(12,96,78,72,'stone');
  band(97,105,73,72,'plinth');band(105,111,72,68,'foot');
  band(-82-gap,-74-gap,74,73,'light');
  band(-101-gap,-83-gap,73,74,'crown');
  band(-104-gap,-101-gap,70,73,'rim');
  polygons.sort((a,b)=>a.depth-b.depth);
  for(const p of polygons){
    c.beginPath();p.p.forEach((q,i)=>i?c.lineTo(q[0],q[1]):c.moveTo(q[0],q[1]));c.closePath();
    let k;
    if(p.type==='stone'){
      const grain=Math.sin(p.i*12.9898)*43758.5453;
      k=Math.round(23+46*p.light+((grain-Math.floor(grain))-.5)*5);
      c.fillStyle=`rgb(${k},${k+1},${k+2})`;
    }else if(p.type==='crown'||p.type==='rim'){
      k=Math.round((p.type==='rim'?40:29)+68*p.light);
      c.fillStyle=`rgb(${k},${k+1},${k+2})`;
    }else if(p.type==='light'){
      c.fillStyle=states[state][1];
      c.globalAlpha=reduced?.8:state===1?.58+.4*Math.sin(time*.003):state===3?(Math.sin(time*.008)>.1?1:.15):.82;
      c.shadowColor=states[state][1];c.shadowBlur=13*scale;
    }else c.fillStyle=p.type==='plinth'?'#252729':'#101112';
    c.fill();c.shadowBlur=0;c.globalAlpha=1;
    if(p.type==='stone'&&p.light>.18){
      c.strokeStyle=`rgba(177,177,174,${.018+.032*p.light})`;c.lineWidth=.7*scale;
      c.beginPath();c.moveTo(p.p[0][0],p.p[0][1]);c.lineTo(p.p[3][0],p.p[3][1]);c.stroke();
    }
    if(p.type==='crown'&&p.i%4===0){
      c.strokeStyle='#b8b4ae28';c.lineWidth=.8*scale;c.beginPath();
      c.moveTo(p.p[0][0],p.p[0][1]);c.lineTo(p.p[3][0],p.p[3][1]);c.stroke();
    }
  }
  // Stone pores are restrained and fixed in object space as the user rotates it.
  for(let i=0;i<280;i++){
    const a=(i*.61803398875%1)*Math.PI*2,y=-68+(i*.754877666%1)*164;
    const r=y<12?72+(y+69)/81*6:78-(y-12)/84*6;
    const p=project(Math.cos(a)*r,y,Math.sin(a)*r);
    if(p[2]<0)continue;
    c.fillStyle=i%7===0?'#ada9a31b':'#00000029';
    c.fillRect(p[0],p[1],(i%5===0?1.3:.65)*scale,(i%11===0?1.6:.75)*scale);
  }
  const top=project(0,-104-gap,0);
  c.fillStyle='#191b1c';c.beginPath();c.ellipse(top[0],top[1],69*scale,17*scale,0,0,Math.PI*2);c.fill();
  c.strokeStyle='#88878445';c.lineWidth=1*scale;c.stroke();
  c.fillStyle='#27292a';c.beginPath();c.ellipse(top[0],top[1],25*scale,6.5*scale,0,0,Math.PI*2);c.fill();
  c.fillStyle='#b6b2aa';c.font=`${7.5*scale}px Manrope,Arial`;c.textAlign='center';
  c.fillText('A U R A',top[0],top[1]+2.4*scale);
  const back=project(0,61,-73);
  if(Math.cos(angle)<-.1){
    c.fillStyle='#08090a';c.fillRect(back[0]-8*scale,back[1]-5*scale,16*scale,10*scale);
    const sw=project(0,30,-77);c.fillStyle=micOff?'#b95c52':'#777978';
    c.fillRect(sw[0]-10*scale,sw[1]-3*scale,20*scale,6*scale);
  }
  if(interactive){
    const locs=[[63,-10,42],[-49,35,54],[56,-78-gap,47],[43,-98-gap,-38],[0,41,-75],[50,104,49]];
    $$('.hotspot').forEach((b,i)=>{const p=project(...locs[i]);b.style.left=p[0]+'px';b.style.top=p[1]+'px';b.style.opacity=p[2]<-38?.45:1});
  }
}
const v=$('#viewer');let drag=false,startX=0,startYaw=0;v.addEventListener('pointerdown',e=>{drag=true;startX=e.clientX;startYaw=yaw;v.setPointerCapture(e.pointerId)});v.addEventListener('pointermove',e=>{if(drag){yaw=startYaw+(e.clientX-startX)*.012;$('#rotation').value=((yaw*180/Math.PI+180)%360+360)%360-180}});v.addEventListener('pointerup',()=>drag=false);v.addEventListener('pointercancel',()=>drag=false);v.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();yaw+=(e.key==='ArrowLeft'?-.15:.15);$('#rotation').value=yaw*180/Math.PI}});$('#rotation').oninput=e=>yaw=+e.target.value*Math.PI/180;$('#reset').onclick=()=>{yaw=-.44;$('#rotation').value=-25;exploded=false;$('#explode').setAttribute('aria-pressed','false');$('#explode').textContent='Разобрать'};$('#explode').onclick=()=>{exploded=!exploded;$('#explode').setAttribute('aria-pressed',exploded);$('#explode').textContent=exploded?'Собрать':'Разобрать'};
$('#volume').oninput=e=>{$('#volume-value').textContent=e.target.value+'%';if(gain)gain.gain.value=+e.target.value/100*.05};$('#mute').onclick=()=>{micOff=!micOff;$('#mute').setAttribute('aria-pressed',micOff);$('#mute').textContent=micOff?'Включить микрофон':'Отключить микрофон';chooseState(micOff?4:0);$('#control-info').textContent=micOff?'В демонстрации микрофон отключён. В реальном устройстве переключатель должен разрывать его питание.':'Микрофон включён в демонстрации интерфейса. Сайт не записывает звук.'};let audio,gain,osc=[],playing=false;$('#play').onclick=async()=>{if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)();gain=audio.createGain();gain.connect(audio.destination)}if(playing){osc.forEach(o=>o.stop());osc=[];playing=false}else{await audio.resume();gain.gain.value=+$('#volume').value/100*.05;[220,277.18,329.63].forEach(f=>{let o=audio.createOscillator();o.type='sine';o.frequency.value=f;o.connect(gain);o.start();osc.push(o)});playing=true;setTimeout(()=>{if(playing){osc.forEach(o=>o.stop());osc=[];playing=false;$('#play').textContent='Воспроизвести демо';$('#play').setAttribute('aria-pressed','false')}},5000)}$('#play').textContent=playing?'Остановить демо':'Воспроизвести демо';$('#play').setAttribute('aria-pressed',playing)};
// A single fixed stage crosses the hero and story. Scroll changes the scene,
// never the canvas box: resizing or changing positioning mid-frame caused jumps.
const stage=$('#model-stage'),story=$('#story'),model=$('#model');
const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const smooth=n=>n*n*(3-2*n);
const mix=(a,b,n)=>a+(b-a)*n;
let scene={angle:-.5,spread:0,zoom:1},spreadValue=0,lastFrame=0,lastStoryLabel=-1;
function sceneTarget(){
  const y=scrollY,first=story.offsetTop,end=first+story.offsetHeight;
  // Smooth overlapping chapters: form -> inner structure -> status light.
  const progress=clamp((y-first+innerHeight*.42)/Math.max(1,story.offsetHeight-innerHeight*.5));
  const opening=smooth(clamp(progress/.46)),closing=smooth(clamp((progress-.45)/.55));
  const fade=smooth(clamp((end-y-innerHeight*.18)/(innerHeight*.72)));
  const entrance=smooth(clamp((y+innerHeight*.35)/(innerHeight*.45)));
  return {angle:-.5+(reduced?0:progress*2.25),spread:reduced?0:opening*(1-closing),zoom:1-.11*opening+.17*closing,opacity:Math.min(fade,entrance),progress};
}
function frame(t){
  requestAnimationFrame(frame);
  if(document.hidden||t-lastFrame<32)return;
  const dt=Math.min(64,t-lastFrame||32);lastFrame=t;
  const target=sceneTarget(),ease=reduced?1:1-Math.exp(-dt/120);
  scene.angle=mix(scene.angle,target.angle,ease);
  scene.spread=mix(scene.spread,target.spread,ease);
  scene.zoom=mix(scene.zoom,target.zoom,ease);
  stage.style.opacity=target.opacity;
  stage.style.visibility=target.opacity<.005?'hidden':'visible';
  if(target.opacity>.005)render(model,scene.angle,scene.spread,scene.zoom,t);
  const chapter=target.progress<.34?0:target.progress<.68?1:2;
  if(chapter!==lastStoryLabel){$('.stage-label').textContent=['01 — ФОРМА И МАТЕРИАЛ','02 — КОМПОНОВКА','03 — СВЕТОВАЯ ИНДИКАЦИЯ'][chapter];lastStoryLabel=chapter}
  spreadValue=mix(spreadValue,Number(exploded),ease);
  const rect=v.getBoundingClientRect();
  if(rect.bottom>0&&rect.top<innerHeight)render(v,yaw,spreadValue,1,t,true);
}
requestAnimationFrame(frame);

// Scroll choreography: product and editorial content enter at different rhythms.
const revealTargets=$$('.story-step > .eyebrow,.story-step > h2,.story-step > p,.section > .eyebrow,.section > h2,.section > .section-lead,.cards article,.scenario-view,.viewer,.design-panel,.interaction,.stake-layout');
if(!reduced&&'IntersectionObserver'in window){
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}},{threshold:.12,rootMargin:'0px 0px -7% 0px'});
  revealTargets.forEach(el=>{el.dataset.reveal='';observer.observe(el)});
}else revealTargets.forEach(el=>el.classList.add('is-visible'));
let progressScheduled=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;document.body.style.setProperty('--scroll',max>0?Math.min(1,scrollY/max):0);progressScheduled=false}
addEventListener('scroll',()=>{if(!progressScheduled){progressScheduled=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
