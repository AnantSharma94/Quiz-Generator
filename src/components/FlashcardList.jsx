import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = props => {
   // console.log(flashcards);
    return (
        <div className="card-grid">
            {props.flashcards.map( flashcard => {
                return (<Flashcard flashcard={flashcard} key={flashcard.id} />);
            })}
        </div>
    )
}

export default FlashcardList;
