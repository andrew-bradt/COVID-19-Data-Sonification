import * as Tone from 'tone';
import {useState, useEffect} from 'react';
// Material UI
import {
    Button,
    Slider,
    Typography
} from '@material-ui/core';
import Muted from '@material-ui/icons/VolumeMute';
import NotMuted from '@material-ui/icons/VolumeUp';

const start = ()=>{
    Tone.start();
    Tone.Transport.start();
};

export default function Ready({changeVolume}) {
    const [prevVolume, setPrevVolume] = useState(0.8);
    const [volCache, setVolCache] = useState(prevVolume);
    
    const handleChange = (e,val)=>{
        setPrevVolume(val);
        changeVolume(val);
    };
    const toggleMute = (toggleState)=>{
        if(toggleState === 'off'){
            setVolCache(prevVolume);
            setPrevVolume(0);
            changeVolume(prevVolume);
        } else if (toggleState === 'on'){
            setPrevVolume(volCache);
            changeVolume(prevVolume);
        }
    };
    
    return (
        <>
            <Typography
                component='h1'
                variant='h4'
                align='center'
            >
                COVID-19 Data Sonification
            </Typography>
            <Typography
                variant='body1'
                align='center'
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie at elementum eu facilisis sed odio. Vel eros donec ac odio tempor orci dapibus ultrices in. Sollicitudin ac orci phasellus egestas. Lacus sed turpis tincidunt id aliquet risus. In eu mi bibendum neque. Viverra nibh cras pulvinar mattis. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Id volutpat lacus laoreet non curabitur gravida arcu ac tortor. Et magnis dis parturient montes nascetur. Malesuada fames ac turpis egestas integer eget. Erat pellentesque adipiscing commodo elit at imperdiet dui. Augue ut lectus arcu bibendum. Ultrices tincidunt arcu non sodales neque sodales ut etiam sit. Blandit turpis cursus in hac habitasse. Ac odio tempor orci dapibus ultrices in iaculis.
                Egestas dui id ornare arcu odio ut. Id porta nibh venenatis cras. Leo a diam sollicitudin tempor. Arcu non odio euismod lacinia at quis risus sed. Imperdiet dui accumsan sit amet nulla. Risus in hendrerit gravida rutrum quisque. Non pulvinar neque laoreet suspendisse interdum. Amet justo donec enim diam vulputate ut pharetra sit. Tristique senectus et netus et malesuada fames ac turpis. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus. Nullam non nisi est sit amet facilisis magna etiam tempor. Velit aliquet sagittis id consectetur. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Condimentum mattis pellentesque id nibh. Leo integer malesuada nunc vel risus. Euismod elementum nisi quis eleifend quam adipiscing vitae.
            </Typography>
            <Button
                onClick={start}
                variant='contained'
            >
                Start Audio
            </Button>
            <Slider
                min={0}
                max={1}
                step={0.0001}
                value = {prevVolume}
                onChange = {(e, val)=>handleChange(e,val)}
            />
            {
                (prevVolume) 
                ? <NotMuted
                    onClick={()=>toggleMute('off')}
                /> 
                : <Muted
                    onClick={()=>toggleMute('on')}
                />
            }
        </>
    )
}
