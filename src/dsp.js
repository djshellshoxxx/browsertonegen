import {clamp,dbToAmp,sweepFrequency,stepFrequency,sequenceStage,routing} from './model.js';
const TAU=2*Math.PI;
function hash(s){let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return h>>>0||1;}
export function random(r){let x=r.seed;x^=x<<13;x^=x>>>17;x^=x<<5;r.seed=x>>>0;return r.seed/4294967296*2-1;}
function blep(t,dt){if(t<dt){t/=dt;return t+t-t*t-1;}if(t>1-dt){t=(t-1)/dt;return t*t+t+t+1;}return 0;}
function noise(type,r){const w=random(r);if(type==='white')return w;
 r.noiseCount++;let sum=w;for(let i=0;i<12;i++){if(r.noiseCount%(2**i)===0)r.rows[i]=random(r);sum+=r.rows[i];}const pink=sum/13;
 if(type==='pink')return pink;if(type==='brown'){r.brown=(r.brown+.04*w)/1.02;return clamp(r.brown*3,-1,1);}if(type==='blue'){const y=(pink-r.prevPink)*2;r.prevPink=pink;return y;}const y=(w-r.prevWhite)/2;r.prevWhite=w;return y;
}
export function waveSample(v,r,f,sr){const p=((r.phase+v.phase/360)%1+1)%1,dt=f/sr;
 switch(v.wave){case 'sine':return Math.sin(TAU*p);case 'sawtooth':return 2*p-1-blep(p,dt);case 'reverse saw':return -(2*p-1-blep(p,dt));case 'square':case 'pulse':{const width=v.wave==='square'?.5:v.pulseWidth;return (p<width?1:-1)+blep(p,dt)-blep((p-width+1)%1,dt)-(v.wave==='pulse'?2*width-1:0);}case 'triangle':{let sum=0;for(let h=1;h<=31&&h*f<sr/2;h+=2)sum+=(-1)**((h-1)/2)*Math.sin(TAU*h*p)/(h*h);return 8/Math.PI**2*sum;}case 'additive':{let sum=0,n=0;for(let i=0;i<v.harmonics.length;i++){const h=i+1;if(h*f>=sr/2)break;sum+=v.harmonics[i]*Math.sin(TAU*h*p);n+=Math.abs(v.harmonics[i]);}return n?sum/n:0;}default:return noise(v.wave,r);}
}
export function voiceEnvelope(v,t){if(t<0||v.duration>0&&t>=v.duration)return 0;let e=1;if(v.fadeIn>0)e*=clamp(t/v.fadeIn,0,1);if(v.duration>0&&v.fadeOut>0)e*=clamp((v.duration-t)/v.fadeOut,0,1);return e;}
export function timerTime(timer,time){if(time<timer.delay)return {time:-1,done:false};const t=time-timer.delay;if(!timer.duration)return {time:t,done:false};const cycle=timer.duration+timer.rest;if(!timer.loop&&t>=cycle*(timer.repeats-1)+timer.duration)return {time:-1,done:true};const local=t%cycle;return {time:local<timer.duration?local:-1,done:false};}
export class DSP {
 constructor(config,sr=48000){this.sr=sr;this.frame=0;this.runtime=new Map();this.set(config);this.finished=false;}
 set(config){this.config=config;const old=this.runtime;this.runtime=new Map();for(const v of config.tones){let r=old.get(v.id);if(!r)r={phase:0,seed:hash(v.id),rows:new Float64Array(12),noiseCount:0,brown:0,prevPink:0,prevWhite:0,gain:0};r.route=routing(v.pan,v.route);this.runtime.set(v.id,r);}this.solo=config.tones.some(v=>v.solo&&v.enabled&&!v.muted);let peak=0;for(const v of config.tones)if(v.enabled&&!v.muted&&(!this.solo||v.solo))peak+=v.amplitude*(v.wave==='pulse'?2:1);this.compensation=config.master.headroom?1/Math.max(1,peak):1;this.masterAmp=dbToAmp(config.master.gain);}
 process(left,right){const c=this.config,sr=this.sr;let prePeak=0,sumL=0,sumR=0,pkL=0,pkR=0;left.fill(0);right.fill(0);
 for(let j=0;j<left.length;j++){
 const absolute=this.frame/sr,clock=timerTime(c.timer,absolute);this.finished=clock.done;let l=0,rout=0;
 for(const v of c.tones){const r=this.runtime.get(v.id),local=clock.time-v.delay;let active=v.enabled&&!v.muted&&(!this.solo||v.solo)&&clock.time>=0,env=local<0||(v.duration>0&&local>=v.duration)?0:v.fadeIn?clamp(local/v.fadeIn,0,1):1,f=v.frequency,wave=v.wave;
 if(local<0)active=false;
 let effectiveDuration=v.duration;if(!v.loop&&v.kind==='sweep')effectiveDuration=effectiveDuration>0?Math.min(effectiveDuration,v.sweepDuration*(v.direction==='pingpong'?2:1)*v.repeats):v.sweepDuration*(v.direction==='pingpong'?2:1)*v.repeats;if(!v.loop&&v.kind==='steps'){const end=v.dwell*(v.direction==='pingpong'?2*v.steps-2:v.steps)*v.repeats;effectiveDuration=effectiveDuration>0?Math.min(effectiveDuration,end):end;}if(v.kind==='sequence'&&!c.sequenceLoop){const end=c.sequence.reduce((a,s)=>a+s.duration,0)*c.sequenceRepeats;effectiveDuration=effectiveDuration>0?Math.min(effectiveDuration,end):end;}if(effectiveDuration>0){if(local>=effectiveDuration)env=0;else if(v.fadeOut>0)env*=clamp((effectiveDuration-local)/v.fadeOut,0,1);}
 if(active&&env){if(v.kind==='sweep')f=sweepFrequency(v,local);else if(v.kind==='steps')f=stepFrequency(v,local);else if(v.kind==='sequence'){const stage=sequenceStage(c,local);if(!stage||stage.type==='silence')f=null;else{wave=['white','pink','brown'].includes(stage.type)?stage.type:'sine';f=stage.type==='sweep'?stage.frequency*(stage.endFrequency/stage.frequency)**(stage.time/stage.duration):stage.frequency;}}
 if(f===null){active=false;env=0;f=v.frequency;}}
 const lfo=Math.sin(TAU*v.modFrequency*Math.max(0,local));if(v.mod==='fm')f+=v.modDepth*lfo;if(v.mod==='vibrato')f*=2**(v.modDepth*lfo/1200);f=clamp(f,.1,sr/2-1);
 const target=active?v.amplitude:0;r.gain+=(target-r.gain)*Math.min(1,1/(sr*.005));let y=0;
 if(clock.time>=0&&local>=0){const original=v.wave;if(wave!==original){v.wave=wave;y=waveSample(v,r,f,sr);v.wave=original;}else y=waveSample(v,r,f,sr);r.phase=(r.phase+f/sr)%1;}
 y*=env*r.gain*(v.invert?-1:1);if(v.mod==='am'||v.mod==='tremolo')y*=(1+v.modDepth*lfo)/(1+v.modDepth);if(v.mod==='ring')y*=1-v.modDepth+v.modDepth*lfo;
 let a=r.route[0],b=r.route[1];if(v.stereoMotion==='alternate'){const side=Math.floor(Math.max(0,local)/v.motionPeriod)%2;a=side===0?1:0;b=side===1?1:0;}else if(v.stereoMotion==='pan'){const pan=Math.sin(TAU*Math.max(0,local)/v.motionPeriod);a=Math.cos((pan+1)*Math.PI/4);b=Math.sin((pan+1)*Math.PI/4);}
 l+=y*a;rout+=y*b;
 }
 let fade=c.master.fadeStart?clamp(clock.time/c.master.fadeStart,0,1):1;if(c.timer.duration&&c.master.fadeStop)fade*=clamp((c.timer.duration-clock.time)/c.master.fadeStop,0,1);const gain=c.master.muted?0:this.masterAmp*this.compensation*fade;
 l*=gain;rout*=gain;if(c.master.mono)l=rout=(l+rout)/2;prePeak=Math.max(prePeak,Math.abs(l),Math.abs(rout));l=clamp(l,-.98,.98);rout=clamp(rout,-.98,.98);left[j]=l;right[j]=rout;pkL=Math.max(pkL,Math.abs(l));pkR=Math.max(pkR,Math.abs(rout));sumL+=l*l;sumR+=rout*rout;this.frame++;
 }
 return {peak:prePeak,peakL:pkL,peakR:pkR,rmsL:Math.sqrt(sumL/left.length),rmsR:Math.sqrt(sumR/left.length),clipped:prePeak>=.98,headroom:this.compensation,time:this.frame/sr,done:this.finished};
 }
}
