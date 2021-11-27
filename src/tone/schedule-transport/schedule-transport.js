/*
************************************************************************************************
NODE MODULES
************************************************************************************************
*/
import {Transport, Player, Channel} from 'tone';
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
export const generateSamplers = (audioPaths, output)=>{
    const samplerArray = audioPaths.map(file=>{
        const player = new Player(file);
        const channel = new Channel(1,0);
        player.connect(channel);
        channel.connect(output);
        return {player, channel};
    });
    return samplerArray;
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

