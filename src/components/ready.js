import * as Tone from 'tone';

const start = ()=>{
    Tone.start();
    Tone.Transport.start();
};

export default function Ready() {
    return (
        <div>
            <button onClick={start}>Start Audio</button>
        </div>
    )
}
