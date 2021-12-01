/*
************************************************************************************************
NODE MODULES
************************************************************************************************
*/
import {Transport, Player, Channel, ToneAudioBuffers} from 'tone';
/*
************************************************************************************************
CUSTOM MODULES
************************************************************************************************
*/
/*
************************************************************************************************
EXPORT FUNCTIONS
************************************************************************************************
*/

export const loadBuffers = (fileNames, callback)=>{
    const buffers = new ToneAudioBuffers({
        urls:{...fileNames},
        onload:()=>{
            callback(buffers);
        }
    });
};

export const generateSamplers = (buffers, output)=>{
    const numBuffers = buffers._buffers.size;
    const samplers = [];
    for (let i = 0; i < numBuffers; i++){
        const player = new Player(buffers.get(i));
        const channel = new Channel(1, 0);
        player.connect(channel);
        channel.connect(output);
        samplers.push({player, channel});
    };
    return samplers;
};

export const scheduleTransport=(intervalsArray, samplers)=>{
    const numSamplers = samplers.length;
    intervalsArray.forEach(interval=>{
        const samplerIndex = Math.floor(Math.random()*numSamplers);
        const randomPanPos = Math.random()*2-1;
        const {player, channel} = samplers[samplerIndex];
        Transport.scheduleOnce(()=>{
            channel.pan.rampTo(randomPanPos);
            player.start();
        },interval);
    });
};

