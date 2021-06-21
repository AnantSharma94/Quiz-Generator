import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './components/FlashcardList';
import './app.css';

const App = () => {

  const [flashcards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

   useEffect(() => {
     const loadCategories = async () =>{
       const requestCategories = await fetch("https://opentdb.com/api_category.php");
       const categoryData = await requestCategories.json();
       
       setCategories(categoryData.trivia_categories);
       //console.log(categoryData);
     }
     loadCategories();
   }, [])

  useEffect(() => {
   // console.log(flashcards);
  }, [flashcards])

  const decodeString = str => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(amountEl.current.value+" "+categoryEl.current.value);
    const request = await fetch(`https://opentdb.com/api.php?amount=${amountEl.current.value}&categoty=${categoryEl.current.value}`);
      const data = await request.json();  
      
      setFlashCards(data.results.map( (dataItem,  index)=>{
        const answer = decodeString(dataItem.correct_answer);
        const options = [...dataItem.incorrect_answers.map( a => decodeString(a)), answer];

        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(dataItem.question),
          answer: answer,
          options: options.sort( () => Math.random()-0.5)
        }
      }));
  }

    return (
      <React.Fragment>
        <div>
          <h1 className="header">QUIZ GENERATOR</h1>
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="category">CATEGORY</label>
              <select id="category" ref={categoryEl}>
                  {categories.map( category => {
                    return <option value={category.id} key={category.id}>{category.name}</option>
                  })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="amount">NUMBER OF QUESTIONS</label>
              <input type="number" id="amount" min="1" step="1" defaultValue={15} ref={amountEl} />
            </div>
            <div className="form-group">
              <button className="btn">Generate Test</button>
            </div>
          </form>
        </div>
        <div className="container">
          <FlashcardList flashcards={flashcards} />
        </div>
      </React.Fragment>
    );
}



export default App;
