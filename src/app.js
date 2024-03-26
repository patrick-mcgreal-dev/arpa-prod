(()=>{var F=Object.defineProperty;var $=(s,i)=>()=>(i||s((i={exports:{}}).exports,i),i.exports),H=(s,i)=>{for(var t in i)F(s,t,{get:i[t],enumerable:!0})};var P=$((at,B)=>{B.exports="./assets/waveform-JE7GDVEM.svg"});var R=()=>{let s={},i={modkeys:[],map:{}},t="",e=[];function n(a){if(e.length>3){e=[];return}let o=a.code,c=parseInt(a.key);Number.isNaN(c)||(o="Digit"),e.push(o);let r=e.join(" "),u=i.map[r];u&&(u(c)&&a.preventDefault(),e=e.filter(b=>b[0]=="*")),i.modkeys.includes(o)&&(e=[`*${o}`])}function l(a){let o;i.modkeys.includes(a.code)?(o=`-*${a.code}`,e=e.filter(r=>r!=`*${a.code}`)):(o=`-${a.code}`,e=e.filter(r=>r!=a.code));let c=i.map[o];c&&(a.preventDefault(),c()),e=e.filter(r=>r.includes("*"))}function d(){e=[]}return document.addEventListener("keydown",n),document.addEventListener("keyup",l),document.addEventListener("blur",d),{addControlMap:(a,o)=>{let c=new Array;for(let[r]of Object.entries(o)){let u=r.match(/(?<=\*)(.*?)(?=\ )/gm);u&&u.length&&!c.includes(u[0])&&c.push(u[0])}s[a]={modkeys:c,map:o}},removeControlMap:a=>{s[a]&&delete s[a]},setControlMap:(a,o=!1)=>{if(a=="")return i={modkeys:new Array,map:{}},t="",o&&(e=[]),!0;let c=s[a];return c?(i=c,t=a,o&&(e=[]),!0):!1},getControlMap:a=>s[a].map||null,get activeControlMap(){return t},close:()=>{document.removeEventListener("keydown",n),document.removeEventListener("keyup",l),document.removeEventListener("blur",d)}}};var S=class{_outModules=[];_uiModules=[];connect(i){this._outModules.push(i)}connectUI(i){this._uiModules.push(i)}},y=class{constructor(i,t){this._ac=i;this._outs=[],this._outGain=new GainNode(this._ac,{gain:1}),this._data=[],this.setData=[];for(let e=0;e<t;e++)this._data[e]=0,this.setData.push(n=>this._data[e]=n)}_data;get data(){return this._data}setData;trig(){this.schedule(this._ac.currentTime)}_srcNode;_outGain;_outs;stop(){this._outGain.gain.value=0,this._srcNode&&this._srcNode.stop(this._ac.currentTime);let i=new GainNode(this._ac,{gain:1});for(let t of this._outs)i.connect(t);this._outGain=i}connect(i){this._outs.push(i),this._outGain.connect(i)}},T=class extends S{constructor(t,e){super();this._lanes=t;this.setMult(e,1)}_tpct;_tickInterval;_pattern;_trigs;_tick=0;get trigs(){return this._trigs}setMult(t,e){this._tpct=e,this._tickInterval=1/(t/60*(e*4))}setPattern(t,e){this._trigs=new Array(t),this._pattern=new Array(t);for(let n=0;n<t;n++)this._trigs[n]=0,this._pattern[n]=new Array(this._lanes.length).fill(Number.NaN);for(let n of e)this.setTick(n.t,n.d)}setTick(t,e){if(e.length!=this._lanes.length+1)throw new Error("Not enough data supplied to PatternModule tick.");if(t-1>this._pattern.length)throw new Error(`Attempted to set data at tick ${t} on a pattern module with ${this._pattern.length+1} ticks.`);this._lanes.length?(this._trigs[t-1]=e[0],this._pattern[t-1]=e.splice(1,e.length)):this._trigs[t-1]=e[0]}schedule(t,e){for(let n=0;n<this._tpct;n++){let l=e+this._tickInterval*n;if(this._lanes.length){let d=this._pattern[this._tick];for(let a of this._outModules)for(let o=0;o<d.length;o++)a.setData[this._lanes[o]](d[o])}if(this._trigs[this._tick])for(let d of this._outModules)d.schedule(l);for(let d of this._uiModules)d.schedule(l);this._tick++,this._tick==this._pattern.length&&(this._tick=0)}}reset(){this._tick=0}},m=class extends y{constructor(t,e){super(t,3);this._samples=e}static controls={sample:0,note:1,gain:2};_semitoneRatio=Math.pow(2,1/12);_baseNote=48;_lastGain;schedule(t){this._lastGain&&this._lastGain.gain.setTargetAtTime(0,t-.01,.03),this._lastGain=new GainNode(this._ac,{gain:this._data[2]}),this._lastGain.connect(this._outGain),this._srcNode=new AudioBufferSourceNode(this._ac,{buffer:this._samples[Math.ceil(this._data[0])],playbackRate:Math.pow(this._semitoneRatio,this._data[1]-this._baseNote)}),this._srcNode.connect(this._lastGain),this._srcNode.start(t)}};var p=class s extends y{static controls={note:0,gain:1,attack:2,release:3,dist:4};_distCurve;constructor(i){super(i,4);function t(e){let l=new Float32Array(44100),d=Math.PI/180;for(let a=0;a<44100;a++){let o=a*2/44100-1;l[a]=(3+e)*o*20*d/(Math.PI+e*Math.abs(o))}return l}this.setData[s.controls.dist]=e=>{this._distCurve=t(e),this._data[s.controls.dist]=e},this.setData[s.controls.dist](0)}schedule(i){let t=i+this._data[2]+this._data[3],e=new OscillatorNode(this._ac);e.frequency.setValueAtTime(this._getNoteFreq(this._data[0]),i),e.frequency.exponentialRampToValueAtTime(1,t);let n=new GainNode(this._ac);n.gain.setValueAtTime(0,this._ac.currentTime),n.gain.linearRampToValueAtTime(this._data[1],i+this._data[2]),n.gain.linearRampToValueAtTime(0,t);let l=new WaveShaperNode(this._ac);l.curve=this._distCurve,e.connect(l),l.connect(n),n.connect(this._outGain),e.start(i),e.stop(t),this._srcNode=e}_getNoteFreq(i){return 440*(2**(1/12))**i}};var G={};H(G,{DialElement:()=>h,GridElement:()=>x,IndicatorElement:()=>I,ModuleElement:()=>g,TriggerElement:()=>f});var O={},D=class extends HTMLElement{_markup;shadow;constructor(){super(),this.attachShadow({mode:"open"}),this.shadow=this.shadowRoot}_applyMarkup(){this.shadow.innerHTML=`<style>${this._css(O[this._name])}</style>`+this._markup}element(i){return this.shadow.querySelector(i)}elements(i){return this.shadow.querySelectorAll(i)}appendElement(i){this.shadow.appendChild(i)}prependElement(i){this.shadow.prepend(i)}removeElement(i){let t=this.element(i);t&&this.shadow.removeChild(t)}},E=class extends D{constructor(t,e){super();this._w=t;this._h=e}_ctx;_ctxW;_ctxH;_initCanvas(){let t=this.element("canvas");this._ctxW=t.width=this._w*window.devicePixelRatio,this._ctxH=t.height=this._h*window.devicePixelRatio,t.style.width=`${this._w}px`,t.style.height=`${this._h}px`,this._ctx=t.getContext("2d",{alpha:!1}),this._ctx.scale(window.devicePixelRatio,window.devicePixelRatio)}},g=class extends E{_data=[];get data(){return this._data}setData=[];scheduleTime=0;schedule(i){this.scheduleTime=i}_outModules=[];_dataIndices=[];connect(i,t){this._outModules.push(i),this._dataIndices.push(t)}},h=class extends g{constructor(t,e,n,l,d,a){super(t,t);this._mask=d;if(this._applyMarkup(),this._initCanvas(),this._c=this._ctxW/4,this._startAngle=Math.PI*.751,this._endAngle=Math.PI*.251,this._ctx.lineWidth=2,this._ctx.lineCap="round",a){let r=document.createElement("div");r.classList.add("text"),r.innerText=a,this.prependElement(r)}this._valueLabel=this.element(".value"),this._scalar=n-e+e,this.setData[0]=r=>{this._data[0]=r/this._scalar;for(let u of this._outModules)u.setData[this._dataIndices[0]](this._data[0]);this.draw(),this._valueLabel.innerText=this._mask(this._data[0])},this.setData[0](l);let o=r=>{let u=this._data[0]-r.movementY/100;u>1?u=1:u<0&&(u=0),this._setScaledValue(u)},c=()=>{document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",c)};this.addEventListener("mousedown",r=>{document.addEventListener("mousemove",o),document.addEventListener("mouseup",c)})}_name="dial";_markup=`
    <canvas></canvas>
    <div class="value text"></div>
  `;_css(t){return`
      :host {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .text {
        width: 34px;
        text-align: center;
        font-size: .8em;
        font-family: sans-serif;
      }
    `}static size={small:34};_scalar;_valueLabel;_c;_startAngle;_endAngle;_setScaledValue(t){this._data[0]=t;let e=t*this._scalar;for(let n of this._outModules)n.setData[this._dataIndices[0]](e);this.draw(),this._valueLabel.innerText=this._mask(this._data[0])}draw(){let t=(Math.min(Math.max(this._data[0],0),1)*1.5+.75)*Math.PI;this._ctx.fillStyle="#434343",this._ctx.fillRect(0,0,this._w,this._h),this._data[0]>0&&(this._ctx.strokeStyle="aquamarine",this._ctx.beginPath(),this._ctx.arc(this._c,this._c,this._c-2,this._startAngle,t),this._ctx.stroke()),this._ctx.strokeStyle="#e1e0e0",this._ctx.beginPath(),this._ctx.moveTo(this._c,this._c),this._ctx.arc(this._c,this._c,this._c-2,t,this._endAngle),this._ctx.stroke()}reset(){}},I=class extends g{constructor(t,e,n){super(t,e);this._label=n}_name="indicator";_markup=`
    <canvas></canvas>
  `;_css(t){return`
      :host {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
      }
      canvas {
        border-radius: 50%;
        border: 1px solid #8b8b8b;
      }
      .label {
        text-align: center;
        font-size: .8em;
        font-family: sans-serif;
      }
    `}_rgb=[124,255,211];_interval=0;connectedCallback(){if(this._applyMarkup(),this._initCanvas(),this.setData[0]=t=>{},this._label){let t=document.createElement("div");t.classList.add("label"),t.innerText=this._label,this.appendElement(t)}this.addEventListener("click",t=>{this.draw()}),this._ctx.fillStyle="#434343",this._ctx.fillRect(0,0,this._w,this._h)}draw(){this._interval&&window.clearInterval(this._interval);let t=1;this._interval=window.setInterval(()=>{this._ctx.fillStyle="#434343",this._ctx.fillRect(0,0,this._w,this._h),this._ctx.fillStyle=`rgba(${this._rgb[0]}, ${this._rgb[1]}, ${this._rgb[2]}, ${t})`,this._ctx.fillRect(0,0,this._w,this._h),t-=.2,t<=0&&window.clearInterval(this._interval)},60),this.scheduleTime=0}reset(){}},f=class extends g{constructor(t){super(0,0);this._container=t}_name="indicator";_markup=`
  <canvas></canvas>
    <img class="icon" src=${P()} />
  `;_css(t){return`
      :host {
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        border-radius: 4px;
      }
      :host(:hover) {
        cursor: pointer;
      }
      canvas {
        border-radius: 4px;
      }
      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        width: 26px;
        height: 100%;
      }
    `}_rgb=[124,255,211];_interval=0;connectedCallback(){this._container.style.padding="0",this._container.style.height="50px",this._container.style.position="relative",this._w=this._container.offsetWidth,this._h=this._container.offsetHeight-2,this._applyMarkup(),this._initCanvas(),this.setData[0]=t=>{},this.addEventListener("click",t=>{for(let e of this._outModules)e.trig();this.draw()}),this._ctx.fillStyle="#434343",this._ctx.fillRect(0,0,this._w,this._h)}draw(){this._interval&&window.clearInterval(this._interval);let t=1;this._interval=window.setInterval(()=>{this._ctx.fillStyle="#434343",this._ctx.fillRect(0,0,this._w,this._h),this._ctx.fillStyle=`rgba(${this._rgb[0]}, ${this._rgb[1]}, ${this._rgb[2]}, ${t})`,this._ctx.fillRect(0,0,this._w,this._h),t-=.2,t<=0&&window.clearInterval(this._interval)},60),this.scheduleTime=0}reset(){}},N=class extends E{constructor(t,e,n){super(t,e);this._length=n}data=[];pos=0;scheduleTime=0;schedule(t){this.scheduleTime=t,this.pos++,this.pos==this._length&&(this.pos=0)}_outModules=[];connect(t){this._outModules.push(t)}reset(){this.pos=0,this.draw()}},x=class extends N{constructor(t,e,n){super(t*e,t*n,e*n);this._size=t;this._x=e;this._y=n;this.data=new Array(e*n).fill(0),this._applyMarkup(),this._initCanvas(),this._ctx.strokeStyle="#e1e0e0",this.draw(),this.addEventListener("click",l=>{let d=Math.floor(l.offsetX/t)+Math.floor(l.offsetY/t)*e,a=this.data[d]?0:1;this.data[d]=a;for(let o of this._outModules)o.trigs[d]=a;this.draw()})}_name="grid";_markup=`
    <canvas></canvas>
  `;_css(t){return`
      canvas {
        border: 1px dotted white;
        border-radius: 4px;
      }
    `}static size={small:20};draw(){this._ctx.fillStyle="#434343",this._ctx.fillRect(0,0,this._w,this._h),this._ctx.beginPath();for(let t=1;t<this._y;t++)this._ctx.moveTo(0,t*this._size),this._ctx.lineTo(this._w,t*this._size);for(let t=1;t<this._x;t++)this._ctx.moveTo(t*this._size,0),this._ctx.lineTo(t*this._size,this._h);this._ctx.stroke(),this._ctx.fillStyle="#e1e0e0";for(let t=0;t<this._y*this._x;t+=this._x)for(let e=0;e<this._x;e++)t+e==this.pos&&(this._ctx.fillStyle="aquamarine",this._ctx.fillRect(e*this._size,t/this._x*this._size,this._size,this._size),this._ctx.fillStyle="#e1e0e0"),this.data[t+e]&&this._ctx.fillRect(e*this._size+6,t/this._x*this._size+6,this._size-12,this._size-12)}};var C=class{constructor(i,t,e,n){this._ac=i;this._tickCallback=t;this.bpm=e;this._tpqn=n}_tickInterval;get tickInterval(){return this._tickInterval}_nextTickTime;_scheduledTickTimes;get scheduledTickTimes(){return this._scheduledTickTimes}_running=!1;_runInterval=.05;_runIntervalId;_lookaheadInterval=.1;getTickIntervalInSeconds(i){return 1/(i/60*this._tpqn)}run(){for(;this._nextTickTime<this._ac.currentTime+this._lookaheadInterval;)this._tickCallback(this._nextTickTime),this._scheduledTickTimes.push(this._nextTickTime),this._scheduledTickTimes.length>20&&this._scheduledTickTimes.shift(),this._nextTickTime+=this._tickInterval}start(){if(this._running)return;this._tickInterval=this.getTickIntervalInSeconds(this.bpm),this._nextTickTime=this._ac.currentTime+.05,this._scheduledTickTimes=new Array;let i=this;this._runIntervalId=setInterval(()=>{i.run()},this._runInterval*1e3),this._running=!0}stop(){clearInterval(this._runIntervalId),this._running=!1}setBpm(i){this.bpm=i,this._tickInterval=this.getTickIntervalInSeconds(i)}get running(){return this._running}};var k,_,A,L,w,M;window.addEventListener("DOMContentLoaded",async s=>{let i=async t=>{try{await U()}catch(e){console.log(e)}window.removeEventListener("mousedown",i)};window.addEventListener("mousedown",i)});async function U(){M=!1,W(),await j(),X(),Y(),Q()}function W(){let s=new AudioContext({sampleRate:44100}),i=s.createGain();i.gain.value=1,i.connect(s.destination);let t=1;_={ac:s,masterGain:i,clock:new C(s,e=>{for(let n of L)n.schedule(_.ac.currentTime,e);t++},120,4)}}async function j(){let s=["kick.wav","snare.wav","hh.wav"];k=[];for(let i of s){let e=await(await fetch(`./assets/samples/${i}`)).arrayBuffer();k.push(await _.ac.decodeAudioData(e))}}function Y(){_.masterGain.gain.value=.4,A=[],L=[],w=[];let s=Z();s.sound.connect(_.masterGain);let i=z();i.module.connect(s.sound),i.module.connect(s.trigger);let t=J();t.sound.connect(_.masterGain);let e=z();e.module.connect(t.sound),e.module.connect(t.trigger);let n=document.querySelector("#app");n.appendChild(i.ui),n.appendChild(s.ui),n.appendChild(e.ui),n.appendChild(t.ui)}function X(){for(let s of Object.entries(G))customElements.define(`comp-${s[1].name.toLowerCase()}`,s[1])}function z(){let s=new T([],_.clock.bpm);s.setPattern(16,[]),L.push(s);let i=document.createElement("div");i.classList.add("mod");let t=document.createElement("div");t.classList.add("mod_header"),t.innerText="Grid",i.appendChild(t);let e=document.createElement("div");e.classList.add("mod_body"),i.appendChild(e);let n=new x(x.size.small,4,4);return n.connect(s),s.connectUI(n),e.appendChild(n),w.push(n),{module:s,ui:i}}function Z(){let s=new p(_.ac);s.setData[p.controls.gain](1),s.setData[p.controls.release](.2),A.push(s);let i=document.createElement("div");i.classList.add("mod");let t=document.createElement("div");t.classList.add("mod_header"),t.innerText="Kick",i.appendChild(t);let e=document.createElement("div");e.classList.add("mod_body"),i.appendChild(e);let n=document.createElement("div");n.classList.add("mod_group"),e.appendChild(n);let l=new h(h.size.small,0,10,s.data[p.controls.note],v=>(v*10).toFixed(0).toString(),"Freq");l.connect(s,p.controls.note),n.appendChild(l);let d=new h(h.size.small,0,20,s.data[p.controls.dist],v=>(v*20).toFixed(0).toString(),"Dist");d.connect(s,p.controls.dist),n.appendChild(d);let a=document.createElement("div");a.classList.add("mod_group"),e.appendChild(a);let o=new h(h.size.small,0,.2,s.data[p.controls.attack],v=>(v*.2).toFixed(2).toString(),"Attack");o.connect(s,p.controls.attack),a.appendChild(o);let c=new h(h.size.small,0,.5,s.data[p.controls.release],v=>(v*.5).toFixed(2).toString(),"Release");c.connect(s,p.controls.release),a.appendChild(c);let r=new h(h.size.small,0,1,s.data[p.controls.gain],v=>(v*10).toFixed(1).toString(),"Volume");r.connect(s,p.controls.gain),a.appendChild(r);let u=document.createElement("div");u.classList.add("mod_group"),e.appendChild(u);let b=new f(u);return b.connect(s,0),u.appendChild(b),w.push(b),{sound:s,ui:i,trigger:b}}function J(){let s=new m(_.ac,k);s.setData[m.controls.note](48),s.setData[m.controls.gain](1),A.push(s);let i=document.createElement("div");i.classList.add("mod");let t=document.createElement("div");t.classList.add("mod_header"),t.innerText="Sample",i.appendChild(t);let e=document.createElement("div");e.classList.add("mod_body"),i.appendChild(e);let n=document.createElement("div");n.classList.add("mod_group"),e.appendChild(n);let l=new h(h.size.small,0,k.length-1,s.data[m.controls.sample],r=>(r*(k.length-1)).toFixed(0).toString(),"Sample");l.connect(s,m.controls.sample),n.appendChild(l);let d=new h(h.size.small,0,100,s.data[m.controls.note],r=>(r*100).toFixed(0).toString(),"Rate");d.connect(s,m.controls.note),n.appendChild(d);let a=new h(h.size.small,0,1,s.data[m.controls.gain],r=>(r*10).toFixed(1).toString(),"Volume");a.connect(s,m.controls.gain),n.appendChild(a);let o=document.createElement("div");o.classList.add("mod_group"),e.appendChild(o);let c=new f(o);return c.connect(s,0),o.appendChild(c),w.push(c),{sound:s,ui:i,trigger:c}}function Q(){let s=R();s.addControlMap("meta",{Space:()=>{M?et():tt()}}),s.setControlMap("meta")}function tt(){M=!0,_.clock.start(),q()}function et(){M=!1,_.clock.stop();for(let s of A)s.stop();for(let s of L)s.reset();for(let s of w)s.reset()}function q(){for(let s of w)s.scheduleTime&&s.scheduleTime<_.ac.currentTime&&s.draw();M&&window.requestAnimationFrame(q)}})();
