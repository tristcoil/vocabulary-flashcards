import { useState, useEffect } from "react";
import axios from "axios";

const ComplexFlashcard = ({ questions, username }) => {
  console.log('Flashcard Questions:', questions);
  console.log('Flashcard Username:', username);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [difficulty, setDifficulty] = useState(null);

  useEffect(() => {
    if (questions[currentQuestionIndex]?.difficulty) {
      setDifficulty(questions[currentQuestionIndex].difficulty);
    }
  }, [questions, currentQuestionIndex]);

  const handleNextQuestion = async () => {
    try {
      await axios.post("http://localhost:8000/api/vocabulary-flashcard", {
        userId: username,
        difficulty,
        question: currentQuestion.question,
        answer: currentQuestion.answer,
        key: currentQuestion.key,
      });

      setCurrentQuestionIndex((prevIndex) =>
        prevIndex === questions.length - 1 ? 0 : prevIndex + 1
      );
    } catch (error) {
      console.log("Failed to store flashcard state:", error);
    } finally {
      setDifficulty(null);
    }
  };

  const handlePreviousQuestion = async () => {
    try {
      await axios.post("http://localhost:8000/api/vocabulary-flashcard", {
        userId: username,
        difficulty,
        question: currentQuestion.question,
        answer: currentQuestion.answer,
        key: currentQuestion.key,
      });

      setCurrentQuestionIndex((prevIndex) =>
        prevIndex === 0 ? questions.length - 1 : prevIndex - 1
      );
    } catch (error) {
      console.log("Failed to store flashcard state:", error);
    } finally {
      setDifficulty(null);
    }
  };

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
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
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${
            !difficulty ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextQuestion}
          disabled={!difficulty}
        >
          Next
        </button>
      </div>

      <br />

      <div>
        <br />
        currentQuestionIndex is: {currentQuestionIndex}
        <br />
        questions.length is : {questions.length}
      </div>

      <div className="mt-4">
        <p className="font-bold">Select Difficulty:</p>
        <div className="flex space-x-2">
          <button
            className={`${
              difficulty === "easy"
                ? "bg-green-500"
                : "bg-gray-300 hover:bg-green-500"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleDifficultySelection("easy")}
          >
            Easy
          </button>
          <button
            className={`${
              difficulty === "medium"
                ? "bg-yellow-500"
                : "bg-gray-300 hover:bg-yellow-500"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleDifficultySelection("medium")}
          >
            Medium
          </button>
          <button
            className={`${
              difficulty === "hard"
                ? "bg-red-500"
                : "bg-gray-300 hover:bg-red-500"
            } text-white font-bold py-2 px-4 rounded`}
            onClick={() => handleDifficultySelection("hard")}
          >
            Hard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplexFlashcard;
