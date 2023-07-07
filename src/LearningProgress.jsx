import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const LearningProgress = ({ collection, username }) => {
  const [progressData, setProgressData] = useState([]);
  const [difficultyCounts, setDifficultyCounts] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
    unknown: 0,
  });

  useEffect(() => {
    const fetchDataAndCountDifficulty = async () => {
      try {
        console.log("Fetching learning progress data...");
        const response = await axios.get(
          `http://localhost:8000/api/flashcards/${collection}/${username}`
        );
        console.log("Learning progress data:", response.data);
        setProgressData(response.data);

        console.log("Counting difficulty occurrences...");
        const counts = { easy: 0, medium: 0, hard: 0, unknown: 0 };
        response.data.forEach((data) => {
          const difficulty = data.difficulty || "unknown";
          counts[difficulty] += 1;
        });
        console.log("Difficulty counts:", counts);
        setDifficultyCounts(counts);
      } catch (error) {
        console.log("Failed to fetch learning progress data:", error);
      }
    };

    fetchDataAndCountDifficulty();
  }, [collection, username]);

  const difficultyLabels = Object.keys(difficultyCounts);
  const difficultyValues = Object.values(difficultyCounts);

  return (
    <div>
      <h2>Learning Progress </h2>
      {progressData.map((data) => (
        <div key={data._id}>
          <p>Question: {data.question}</p>
          <p>Answer: {data.answer}</p>
          <p>Difficulty: {data.difficulty}</p>
        </div>
      ))}

      <h2>Difficulty Counts {collection} {username}</h2>
      <Plot
        data={[
          {
            x: difficultyLabels,
            y: difficultyValues,
            type: "bar",
            marker: { color: ["#99c2e8", "#bdd7ee", "#d3e1f3", "#e8eff8"] },
          },
        ]}
        layout={{ title: "Difficulty Counts", yaxis: { title: "Count" } }}
      />

      <h2>Difficulty Count Dictionary</h2>
      <pre>{JSON.stringify(difficultyCounts, null, 2)}</pre>
    </div>
  );
};

export default LearningProgress;
