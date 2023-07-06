import { useState } from "react";





const SimpleFlashcard = ({ questions }) => {
    const [count, setCount] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
    const handleNextQuestion = () => {
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex === questions.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const handlePreviousQuestion = () => {
      setCurrentQuestionIndex((prevIndex) =>
        prevIndex === 0 ? questions.length - 1 : prevIndex - 1
      );
    };
  
    const currentQuestion = questions[currentQuestionIndex];
  
    return (
      <div className="bg-white rounded-md shadow-lg p-6">
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-bold">Question:</div>
          <p>{currentQuestion.question}</p>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <div className="text-2xl font-bold">Answer:</div>
          <p>{currentQuestion.answer}</p>
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handlePreviousQuestion}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        </div>
  
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </div>
    );
  };
  
  export default SimpleFlashcard;