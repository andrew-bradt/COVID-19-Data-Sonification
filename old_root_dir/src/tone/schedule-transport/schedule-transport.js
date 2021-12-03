/*
************************************************************************************************
NODE MODULES
************************************************************************************************
*/
import {Transport, Players, Player} from 'tone';
import * as Tone from 'tone';
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

export const generatePlayers = (audioPaths, output)=>{
    const playersArray = audioPaths.map(file=>{
        return new Player(file).connect(output);
    });
    return playersArray;
};

export const scheduleTransport=(intervalsArray, players)=>{
    const numPlayers = players.length;
    intervalsArray.forEach(interval=>{
        const playerIndex = Math.floor(Math.random()*numPlayers);
        Transport.scheduleOnce(()=>{
            players[playerIndex].start();
        },interval);
    });
};

