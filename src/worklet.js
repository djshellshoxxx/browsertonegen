import {DSP} from './dsp.js';
class ToneProcessor extends AudioWorkletProcessor{
 constructor(){super();this.dsp=null;this.blocks=0;this.port.onmessage=e=>{if(e.data.type==='config'){if(this.dsp)this.dsp.set(e.data.config);else this.dsp=new DSP(e.data.config,sampleRate);}};}
 process(inputs,outputs){const out=outputs[0];if(!this.dsp||out.length<2)return true;const stats=this.dsp.process(out[0],out[1]);if(++this.blocks%16===0||stats.done)this.port.postMessage(stats);return !stats.done;}
}
registerProcessor('btg-tone-engine',ToneProcessor);
