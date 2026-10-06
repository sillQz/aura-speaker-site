const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const parts=[
['Стеклянный купол','Дымчатое стекло образует прозрачную камеру вокруг скульптурного сердечника. Мягко закруглённый верх собирает отражения без декоративного узора.','Купол открывает объект внутри и делает свет объёмным. Сквозь стекло легко считывать состояние даже сбоку.','Стекло добавляет массу и требует защиты от ударов и нагрева. Нужно определить толщину, крепление и доступ для очистки.','Проверить макет в дневном и вечернем свете, устойчивость, блики и безопасное обслуживание.'],
['Вулканический сердечник','Съёмная скульптурная вставка с фактурой обсидиана напоминает застывший кратер. Внутри неё расположен рассеянный световой модуль.','Рельеф даёт AURA собственный характер и создаёт глубину в прозрачной форме.','Вставка не должна перекрывать акустический путь или создавать дребезг. Фактуру нужно воспроизводить серийно.','Проверить 3D-макет, акустические измерения и равномерность подсветки.'],
['Свет внутри рельефа','Тёплый свет выходит из кратера и тонких разломов. Стекло отражает его, не показывая отдельные светодиоды.','Состояние видно с разных сторон, а в ожидании колонка остаётся спокойным интерьерным объектом.','Ночью слишком яркий свет мешает; на солнце слабый свет теряется. Значение нельзя передавать одним цветом.','Проверить яркость днём и ночью, движение света и понятность состояний без подсказки.'],
['Металлический обод','Узкое анодированное кольцо разделяет стекло и ткань. Поворот регулирует громкость; короткое нажатие ставит звук на паузу.','Точная кромка даёт понятное тактильное управление, не перегружая стеклянную часть кнопками.','Нужны комфортное усилие, отсутствие люфта и защита стекла от нагрузки.','Проверить влажные и сухие руки, ресурс механизма и точность изменения громкости.'],
['Приватность и подключения','На задней стороне основания — механическое отключение микрофонов и утопленный вход питания. Кабель направлен вниз.','Аппаратный контроль приватности доступен без голосовой команды; разъём не отвлекает от формы.','Переключатель должен разрывать питание микрофонов, а не менять только программный флаг.','Проверить схему отключения, доступ рукой и нагрузку на кабель.'],
['Акустическое основание','Широкое низкое основание обтянуто графитовой акустической тканью. Внутри размещаются динамики, электроника и утяжелённая опора.','Низкий центр масс поддерживает стеклянный верх. Ткань пропускает звук, а эластомерное кольцо гасит вибрацию стола.','Материал влияет на высокие частоты и собирает пыль; тяжёлое основание усложняет перевозку.','Измерить звук с тканью и без неё, проверить чистку, устойчивость и разборку.']];
let selected=0,yaw=-.44,exploded=false,state=0,micOff=false;
function choosePart(i){const previous=selected;selected=i;const detail=$('#part-detail');detail.innerHTML=`<span class="eyebrow">ДЕТАЛЬ 0${i+1}</span><h3>${parts[i][0]}</h3><p>${parts[i][1]}</p><h4>ЗАЧЕМ</h4><p>${parts[i][2]}</p><h4>КОМПРОМИСС</h4><p>${parts[i][3]}</p><h4>КАК ПРОВЕРИТЬ</h4><p>${parts[i][4]}</p>`;if(i!==previous&&!reduced){detail.getAnimations().forEach(a=>a.cancel());detail.animate([{opacity:.2,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:400,easing:'cubic-bezier(.22,.7,.3,1)'})}$$('.part-tabs button,.hotspot').forEach(b=>{const on=+b.dataset.part===i;b.classList.toggle('active',on);b.setAttribute('aria-pressed',on)})}
parts.forEach((p,i)=>{$('#part-tabs').insertAdjacentHTML('beforeend',`<button data-part="${i}" aria-label="${p[0]}">${i+1}</button>`);$('#hotspots').insertAdjacentHTML('beforeend',`<button class="hotspot" data-part="${i}" aria-label="${p[0]}">${i+1}</button>`)});$$('[data-part]').forEach(b=>b.onclick=()=>choosePart(+b.dataset.part));choosePart(0);
const scenarios=[['Утро','07:30','Начать день без телефона','Пользователь собирается на работу, руки заняты. Просит включить спокойную музыку и поставить таймер.','Голос с расстояния 1–3 м; короткое подтверждение и различимое прослушивание.','Слышимость команд при музыке, скорость ответа, успешность установки таймера.'],['Работа','13:00','Сосредоточиться на задаче','Колонка стоит рядом с монитором. Пользователь уменьшает громкость поворотом верхнего кольца и ставит паузу перед звонком.','Управление одной рукой без взгляда; короткое нажатие не должно сдвигать корпус.','Точность громкости, устойчивость, отсутствие случайных команд.'],['Вечер','20:30','Слушать вместе','В гостиной играет музыка. К устройству подходят с разных сторон; никто не должен искать маленькую кнопку на задней панели для паузы.','Верхнее управление доступно; свет заметен из нескольких точек комнаты.','Равномерность звучания, доступ с разных сторон, понятность индикации.'],['Ночь','23:15','Сохранить тишину и контроль','Пользователь снижает яркость и отключает микрофоны перед сном. Состояние должно быть понятно даже без голосового ответа.','Мягкая индикация и механический переключатель с однозначными положениями.','Комфорт яркости в темноте, проверка аппаратного отключения, отсутствие внезапных громких сигналов.']];
function chooseScenario(i){const s=scenarios[i];$('#scenario-time').textContent=s[1];$('#scenario-title').textContent=s[2];$('#scenario-desc').textContent=s[3];$('#scenario-details').innerHTML=`<h4>ТРЕБОВАНИЕ К ДИЗАЙНУ</h4><p>${s[4]}</p><h4>ЧТО ИССЛЕДОВАТЬ</h4><p>${s[5]}</p>`;$$('#scenario-tabs button').forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',i===j)})}scenarios.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s[0];b.onclick=()=>chooseScenario(i);$('#scenario-tabs').append(b)});chooseScenario(0);
const states=[['Ожидание','#e69461','Слабое свечение внутри кратера; в ночном режиме может гаснуть. Колонка готова к команде.'],['Слушает','#eab38c','Плавный световой импульс показывает, что команда принимается. Короткий сигнал подтверждает активацию.'],['Обрабатывает','#c8c7c4','Медленное движение света внутри рельефа: запрос принят, нужно подождать.'],['Ошибка связи','#e8ad75','Два коротких импульса с паузой. Голосовое или текстовое сообщение в приложении уточняет причину.'],['Микрофон выключен','#b95c52','Постоянный красноватый отсвет и положение механического переключателя подтверждают отключение.']];
function chooseState(i){state=micOff?4:i;$('#state-info').innerHTML=`<h3>${states[state][0]}</h3><p>${states[state][2]}</p>`;$$('#state-tabs button').forEach((b,j)=>{b.classList.toggle('active',j===state);b.setAttribute('aria-pressed',j===state)})}states.forEach((s,i)=>{const b=document.createElement('button');b.textContent=s[0];b.onclick=()=>chooseState(i);$('#state-tabs').append(b)});chooseState(0);
const specs=[['Габариты','Ø 160 × 220 мм; масса около 1,8 кг','Проверить на реальной мебели. Масса уточняется после выбора динамиков и основания.'],['Акустика','1 НЧ/СЧ динамик + 2 ВЧ; до 40 Вт суммарной номинальной мощности','Архитектурная гипотеза. Измерить АЧХ, искажения, направленность и тепловой режим.'],['Частотный диапазон','Цель: 60 Гц – 20 кГц, допуск ±6 дБ','Измерить в заданных условиях и указать методику; не обещать глубокий бас без прототипа.'],['Микрофоны','Массив из 4 микрофонов; сценарий 1–3 м','Проверить распознавание при бытовом шуме и музыке; расстояние не является гарантией.'],['Связь','Wi-Fi 2,4 / 5 ГГц; Bluetooth','Версию и профили выбрать по платформе. Проверить стабильность и первичное подключение.'],['Управление','Поворот громкости; нажатие паузы; переключатель микрофонов','Тест первого действия без инструкции, ресурс органов управления и аппаратное отключение.'],['Свет','Световой модуль внутри рельефа с рассеивателем и регулировкой яркости','Проверить читаемость днём, комфорт ночью и различимость без опоры только на цвет.'],['Питание','Внешний сетевой адаптер; низковольтный вход','Напряжение и мощность определяются схемой. Проверить нагрев и защиту от неисправностей.'],['Корпус','Дымчатое стекло, скульптурная вставка, акустический текстиль, алюминий, эластомер','Проверить звукопроницаемость, допуски, чистку, истирание и ремонтопригодность.']];$('#spec-body').innerHTML=specs.map(s=>`<tr>${s.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('');
const stakeholders=[['Пользователь','Ежедневный опыт','Понятные команды, приятный звук, доступное управление и приватность.','Проверять успешность задач, комфорт света и доверие к отключению микрофонов.'],['Покупатель','Выбор и владение','Цена, качество материалов, внешний вид, гарантия и срок службы.','Показать преимущества без неподтверждённых обещаний; проверить готовность платить.'],['Дизайнеры','Целостность продукта','Форма, пропорции, материалы, свет и тактильный сценарий должны работать вместе.','Согласовать макет с акустикой, антенной зоной и производственными ограничениями.'],['Инженеры','Техническая реализация','Акустика, микрофоны, питание, радиосвязь, тепло и безопасность.','Проверить параметры измерениями; зафиксировать компромиссы в техническом задании.'],['Производство','Повторяемость','Сборка, допуски, доступность материалов, стоимость и контроль качества.','Провести пробную сборку и проверку стабильности зазоров, швов и светового кольца.'],['Сервис','Срок жизни','Доступ к узлам, диагностика, запчасти и безопасный ремонт.','Проверить замену динамика, платы и тканевой оболочки без повреждения корпуса.'],['Платформа','Цифровой опыт','Голосовой сервис, музыкальные источники, обновления и обработка данных.','Определить работу без сети, региональную доступность и правила хранения голоса.'],['Регуляторы','Допуск на рынок','Безопасность, электромагнитная совместимость и ограничения материалов.','Определить применимые требования и пройти процедуры подтверждения соответствия.']];
function chooseStake(i){const s=stakeholders[i];$('#stake-detail').innerHTML=`<p class="eyebrow">0${i+1} / ${s[1].toUpperCase()}</p><h3>${s[0]}</h3><p>${s[2]}</p><h3>Что учесть в проекте</h3><p>${s[3]}</p>`;$$('.stake-wheel button').forEach((b,j)=>{b.classList.toggle('active',i===j);b.setAttribute('aria-pressed',i===j)})}stakeholders.forEach((s,i)=>{let a=(i*45+22.5-90)*Math.PI/180,b=document.createElement('button');b.textContent=s[0];b.style.left=50+36*Math.cos(a)+'%';b.style.top=50+36*Math.sin(a)+'%';b.onclick=()=>chooseStake(i);$('#stake-wheel').append(b)});chooseStake(0);
// A sculptural, parametric object. Every surface shares the same projection,
// so rotation, the exploded view and the annotated controls stay aligned.
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function render(canvas,angle,spread,zoom,time,interactive=false){
  const w=canvas.clientWidth,h=canvas.clientHeight,d=Math.min(devicePixelRatio||1,innerWidth<700?1.25:1.5);
  if(!w||!h)return;
  const W=Math.round(w*d),H=Math.round(h*d);
  if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H}
  const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,w,h);
  const scale=Math.min(w/270,h/290)*zoom,cx=w/2,cy=h*.53;
  c.save();c.translate(cx,cy);c.scale(scale,scale);
  const light=states[state][1],pulse=reduced?1:state===1?.78+.22*Math.sin(time*.003):state===3?(Math.sin(time*.008)>.2?1:.35):.9;
  const shadow=c.createRadialGradient(0,121,4,0,121,115);shadow.addColorStop(0,'#000b');shadow.addColorStop(1,'#0000');
  c.fillStyle=shadow;c.beginPath();c.ellipse(0,121,106,15,0,0,7);c.fill();
  c.save();c.translate(0,-spread*36);
  const dome=()=>{c.beginPath();c.moveTo(-83,37);c.lineTo(-83,-25);c.bezierCurveTo(-83,-91,-46,-109,0,-110);c.bezierCurveTo(46,-109,83,-91,83,-25);c.lineTo(83,37);c.closePath()};
  dome();const back=c.createLinearGradient(-83,-25,83,30);back.addColorStop(0,'#6c77802b');back.addColorStop(.5,'#d59b7620');back.addColorStop(1,'#48545c40');c.fillStyle=back;c.fill();
  c.save();dome();c.clip();
  const bloom=c.createRadialGradient(6,-26,2,6,-26,72);bloom.addColorStop(0,light);bloom.addColorStop(.17,light+'8c');bloom.addColorStop(1,'#e0833200');
  c.globalAlpha=.52*pulse;c.fillStyle=bloom;c.fillRect(-85,-105,170,150);c.globalAlpha=1;
  const shift=Math.sin(angle)*9;
  c.beginPath();c.moveTo(-75,39);c.lineTo(-65,23);c.lineTo(-50,8);c.lineTo(-42,-8);c.lineTo(-24,-26);c.lineTo(-15,-18);c.lineTo(-5+shift,-42);c.lineTo(7+shift,-26);c.lineTo(20,-30);c.lineTo(34,-12);c.lineTo(44,-4);c.lineTo(62,17);c.lineTo(74,38);c.closePath();
  const rock=c.createLinearGradient(-75,-30,70,40);rock.addColorStop(0,'#080a0b');rock.addColorStop(.3,'#242322');rock.addColorStop(.62,'#111314');rock.addColorStop(1,'#08090a');c.fillStyle=rock;c.fill();
  const cracks=[[-53,13,-39,-8,-22,-13],[-7,-28,2,-7,15,19],[25,-12,34,8,56,30],[-18,-12,-26,8,-35,26]];
  c.lineCap='round';for(const [x1,y1,x2,y2,x3,y3] of cracks){c.beginPath();c.moveTo(x1,y1);c.quadraticCurveTo(x2,y2,x3,y3);c.strokeStyle=light;c.globalAlpha=.55*pulse;c.lineWidth=1.7;c.shadowColor=light;c.shadowBlur=12;c.stroke();c.shadowBlur=0;c.globalAlpha=1}
  for(let i=0;i<85;i++){const x=((i*37.73)%138)-69,y=((i*19.41)%55)-8;c.fillStyle=i%4?'#0005':'#b9ada515';c.fillRect(x,y,.8,1.2)}
  c.restore();
  const glass=c.createLinearGradient(-85,-42,85,0);glass.addColorStop(0,'#c7e0f545');glass.addColorStop(.14,'#d9eef817');glass.addColorStop(.45,'#879ca708');glass.addColorStop(.76,'#ffe4cb0b');glass.addColorStop(1,'#d7e8f04d');dome();c.fillStyle=glass;c.fill();
  c.strokeStyle='#dbe9ec70';c.lineWidth=1.3;c.stroke();
  c.beginPath();c.moveTo(-69,15);c.bezierCurveTo(-81,-25,-72,-79,-31,-100);c.strokeStyle='#eefaff75';c.lineWidth=3;c.stroke();
  c.beginPath();c.moveTo(66,2);c.bezierCurveTo(79,-54,55,-91,38,-100);c.strokeStyle='#e7eaf54d';c.lineWidth=2;c.stroke();
  c.beginPath();c.ellipse(0,36,83,12,0,0,7);c.strokeStyle='#e9edf66b';c.lineWidth=1;c.stroke();
  c.restore();
  // Metal collar and acoustic cloth form one stable lower unit.
  c.beginPath();c.moveTo(-84,35);c.lineTo(-84,94);c.bezierCurveTo(-83,119,83,119,84,94);c.lineTo(84,35);c.bezierCurveTo(81,48,-81,48,-84,35);c.closePath();
  const fabric=c.createLinearGradient(-84,35,84,95);fabric.addColorStop(0,'#111314');fabric.addColorStop(.28,'#3a3a3b');fabric.addColorStop(.7,'#222324');fabric.addColorStop(1,'#0c0e0f');c.fillStyle=fabric;c.fill();
  c.save();c.beginPath();c.rect(-83,43,166,65);c.clip();for(let i=-82;i<84;i+=1.6){c.strokeStyle=i%5<1?'#bec3c014':'#0005';c.lineWidth=.55;c.beginPath();c.moveTo(i,42);c.lineTo(i,110);c.stroke()}c.restore();
  c.beginPath();c.ellipse(0,39,84,10,0,0,7);c.strokeStyle='#9b9994';c.lineWidth=4;c.stroke();
  c.beginPath();c.ellipse(0,106,81,11,0,0,7);c.strokeStyle='#55585a';c.lineWidth=4;c.stroke();
  c.font='6px Manrope,Arial';c.fillStyle='#c7c7c2';c.textAlign='center';c.letterSpacing='2px';c.fillText('A U R A',0,78);
  c.restore();
  if(interactive){const locs=[[-58,-66],[12,-23],[66,18],[-61,43],[62,83],[-28,108]];$$('.hotspot').forEach((b,i)=>{b.style.left=cx+(locs[i][0]+Math.sin(angle+i)*3)*scale+'px';b.style.top=cy+(locs[i][1]-(i<3?spread*36:0))*scale+'px';b.style.opacity=1})}
}
const v=$('#viewer');let drag=false,startX=0,startYaw=0;v.addEventListener('pointerdown',e=>{drag=true;startX=e.clientX;startYaw=yaw;v.setPointerCapture(e.pointerId)});v.addEventListener('pointermove',e=>{if(drag){yaw=startYaw+(e.clientX-startX)*.012;$('#rotation').value=((yaw*180/Math.PI+180)%360+360)%360-180}});v.addEventListener('pointerup',()=>drag=false);v.addEventListener('pointercancel',()=>drag=false);v.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();yaw+=(e.key==='ArrowLeft'?-.15:.15);$('#rotation').value=yaw*180/Math.PI}});$('#rotation').oninput=e=>yaw=+e.target.value*Math.PI/180;$('#reset').onclick=()=>{yaw=-.44;$('#rotation').value=-25;exploded=false;$('#explode').setAttribute('aria-pressed','false');$('#explode').textContent='Разобрать'};$('#explode').onclick=()=>{exploded=!exploded;$('#explode').setAttribute('aria-pressed',exploded);$('#explode').textContent=exploded?'Собрать':'Разобрать'};
$('#volume').oninput=e=>{$('#volume-value').textContent=e.target.value+'%';if(gain)gain.gain.value=+e.target.value/100*.05};$('#mute').onclick=()=>{micOff=!micOff;$('#mute').setAttribute('aria-pressed',micOff);$('#mute').textContent=micOff?'Включить микрофон':'Отключить микрофон';chooseState(micOff?4:0);$('#control-info').textContent=micOff?'В демонстрации микрофон отключён. В реальном устройстве переключатель должен разрывать его питание.':'Микрофон включён в демонстрации интерфейса. Сайт не записывает звук.'};let audio,gain,osc=[],playing=false;$('#play').onclick=async()=>{if(!audio){audio=new (window.AudioContext||window.webkitAudioContext)();gain=audio.createGain();gain.connect(audio.destination)}if(playing){osc.forEach(o=>o.stop());osc=[];playing=false}else{await audio.resume();gain.gain.value=+$('#volume').value/100*.05;[220,277.18,329.63].forEach(f=>{let o=audio.createOscillator();o.type='sine';o.frequency.value=f;o.connect(gain);o.start();osc.push(o)});playing=true;setTimeout(()=>{if(playing){osc.forEach(o=>o.stop());osc=[];playing=false;$('#play').textContent='Воспроизвести демо';$('#play').setAttribute('aria-pressed','false')}},5000)}$('#play').textContent=playing?'Остановить демо':'Воспроизвести демо';$('#play').setAttribute('aria-pressed',playing)};
// A single fixed stage crosses the hero and story. Scroll changes the scene,
// never the canvas box: resizing or changing positioning mid-frame caused jumps.
const stage=$('#model-stage'),story=$('#story');
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
  if(target.opacity>.005){stage.style.setProperty('--lift-neg',`${-scene.spread*38}px`);stage.style.setProperty('--lift-small',`${scene.spread*7}px`);stage.style.setProperty('--product-scale',scene.zoom);stage.style.setProperty('--rock-tilt',`${Math.sin(scene.angle)*1.5}deg`)}
  const chapter=target.progress<.34?0:target.progress<.68?1:2;
  if(chapter!==lastStoryLabel){$('.stage-label').textContent=['01 — СТЕКЛО И ОБСИДИАН','02 — КОМПОНОВКА','03 — ВНУТРЕННИЙ СВЕТ'][chapter];lastStoryLabel=chapter}
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
