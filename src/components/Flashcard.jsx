import React, { useState, useEffect, useRef } from 'react';

const Flashcard = props => {

    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial');


    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight = () => {
        const frontHeight = frontEl.current.getBoundingClientRect();
        const backHeight = backEl.current.getBoundingClientRect();

        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    useEffect(setMaxHeight, [props.flashcard.question, props.flashcard.answer, props.flashcard.options]);

    useEffect( () => {
        window.addEventListener('resize', setMaxHeight);
        return ()=> window.removeEventListener('resize', setMaxHeight);
    }, []);

    const toogleFlip = () =>{
        setFlip(!flip);
    }

    return (
        <div
            style={{height: height}}
            className={`card ${flip ? "flip" : ""}`}     // correct way to handle dynamic class name 
            onClick={toogleFlip}
        >
            <div className="front" ref={frontEl}>
                {props.flashcard.question}
                <div className="flashcard-options">
                    {props.flashcard.options.map( option => {
                        return (<div className="flashcard-option" key={option}>{option}</div>);
                    })}
                </div>
            </div>
            <div className="back" ref={backEl}>{props.flashcard.answer}</div>
        </div>
    )
}

export default Flashcard;
