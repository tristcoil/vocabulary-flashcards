import { useState } from "react";
import "./App.css";

import SimpleFlashcard from "./SimpleFlashcard";
import ComplexFlashcard from "./ComplexFlashcard";
import LearningProgress from "./LearningProgress";
import CollectionList from "./CollectionList";

function App() {
  const [count, setCount] = useState(0);

  const simpleQuestions = [
    { question: "What is the capital of France?", answer: "Paris" },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    { question: "What is the best thing about React?", answer: "Hooks" },
    // Add more questions here
  ];

  const complexQuestions = [
    { question: "What is the capital of France?", answer: "Paris" },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    { question: "What is the best thing about React?", answer: "Hooks" },
    // Add more questions here
  ];

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h1>Flashcards</h1>
        {/* <SimpleFlashcard questions={simpleQuestions} /> */}
        <ComplexFlashcard questions={complexQuestions} />
      </div>

      <br></br>
      <div>
        <h1>Learning Progress</h1>
        {/* <SimpleFlashcard questions={simpleQuestions} /> */}
        <LearningProgress userId="user123" />
      </div>

      <div>
        <h1>Collection List (sourceDB)</h1>
        <CollectionList apiEndpoint="source-collections" />
      </div>

      <div>
        <h1>Collection List (flashcardDB)</h1>
        <CollectionList apiEndpoint="flashcard-collections" />
      </div>
    </>
  );
}

export default App;
