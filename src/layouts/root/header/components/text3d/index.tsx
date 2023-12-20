import React, { useRef } from 'react'
import "./text3d.css";


export default function Index({primary, secondary}:{primary:string, secondary:string}) {

    const text1 = useRef(null);
    const text2 = useRef(null);

    return (
        <div className="textContainer">
            <p className="primary" ref={text1}>{primary}</p>
            <p className="secondary" ref={text2}>{secondary}</p>
        </div>
    )
}