import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const LearningProgress = ({ userId }) => {
  const [progressData, setProgressData] = useState([]);
  const [difficultyCounts, setDifficultyCounts] = useState({ easy: 0, medium: 0, hard: 0, unknown: 0 });

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/flashcard/${userId}`);
        setProgressData(response.data);
      } catch (error) {
        console.log("Failed to fetch learning progress data:", error);
      }
    };

    fetchProgressData();
  }, [userId]);

  useEffect(() => {
    const countDifficultyOccurrences = () => {
      const counts = { easy: 0, medium: 0, hard: 0, unknown: 0 };

      progressData.forEach((data) => {
        const difficulty = data.difficulty || "unknown";
        counts[difficulty] += 1;
      });

      setDifficultyCounts(counts);
    };

    countDifficultyOccurrences();
  }, [progressData]);

  const difficultyLabels = Object.keys(difficultyCounts);
  const difficultyValues = Object.values(difficultyCounts);

  return (
    <div>
      <h2>Learning Progress</h2>
      {progressData.map((data) => (
        <div key={data._id}>
          <p>Question: {data.question}</p>
          <p>Answer: {data.answer}</p>
          <p>Difficulty: {data.difficulty}</p>
        </div>
      ))}

      <h2>Difficulty Counts</h2>
      <Plot
        data={[
          {
            x: difficultyLabels,
            y: difficultyValues,
            type: "bar",
            marker: { color: ["green", "yellow", "red", "gray"] },
          },
        ]}
        layout={{ title: "Difficulty Counts", yaxis: { title: "Count" } }}
      />
    </div>
  );
};

export default LearningProgress;
