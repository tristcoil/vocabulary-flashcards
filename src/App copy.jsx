import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

import SimpleFlashcard from "./SimpleFlashcard";
import ComplexFlashcard from "./ComplexFlashcard";
import LearningProgress from "./LearningProgress";
import CollectionList from "./CollectionList";

import axios from "axios";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import config from "../config";
import Cookies from "js-cookie";

function App() {
  const [user, setUser] = useState(null);
  const clientId = config.clientId;

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      setUser({ name: username });
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const details = jwt_decode(credentialResponse.credential);
    setUser(details);
    Cookies.set("username", details.name, { expires: 7 }); // Store username in a cookie for 7 days
    Cookies.set("email", details.email, { expires: 7 }); // Store email in a cookie for 7 days
  };

  const handleLogout = () => {
    setUser(null);
    Cookies.remove("username");
    Cookies.remove("email");
  };

  return (
    <>
      {user ? (
        <div>
          <div>
            <h1>React variables:</h1>
            <h2>You are logged in as {user.name}</h2>
            <p>Email: {user.email}</p>
          </div>
          <div>
            <h1>Cookie variables:</h1>
            <h2>You are logged in as {Cookies.get("username")}</h2>
            <p>Email: {Cookies.get("email")}</p>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      ) : (
        <GoogleOAuthProvider clientId={clientId}>
          <h1>Vite + React Flashcard learning demo</h1>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      )}
    </>
  );
}

export default App;

// conditional rendering login
// function App() {
//   const [user, setUser] = useState(null);
//   const clientId = config.clientId;

//   const handleLoginSuccess = (credentialResponse) => {
//     const details = jwt_decode(credentialResponse.credential);
//     setUser(details);
//   };

//   const handleLogout = () => {
//     setUser(null);
//   };

//   return (
//     <>
//       {user ? (
//         <>
//           <h1>You are logged in as {user.name}</h1>
//           <p>Email: {user.email}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </>
//       ) : (
//         <GoogleOAuthProvider clientId={clientId}>
//           <h1>Vite + React Flashcard learning demo</h1>
//           <GoogleLogin
//             onSuccess={handleLoginSuccess}
//             onError={() => {
//               console.log("Login Failed");
//             }}
//           />
//         </GoogleOAuthProvider>
//       )}
//     </>
//   );
// }

// export default App;

// just login
// function App() {
//   const clientId = config.clientId;

//   return (
//     <>
//       <GoogleOAuthProvider clientId={clientId}>
//         <h1>Vite + React Flashcard learning demo</h1>
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             const details = jwt_decode(credentialResponse.credential);
//             console.log(credentialResponse);
//             console.log(details);
//             console.log(details.email);
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
//       </GoogleOAuthProvider>
//     </>
//   );
// }

// export default App;

// --------------------------------------------------------------------------------

// function App() {
//   const collection = "vocabulary";
//   const username = "user123";

//   const clientId = config.clientId;

//   const simpleQuestions = [
//     { question: "What is the capital of France?", answer: "Paris" },
//     {
//       question: "What is the largest planet in our solar system?",
//       answer: "Jupiter",
//     },
//     { question: "What is the best thing about React?", answer: "Hooks" },
//     // Add more questions here
//   ];

//   // const complexQuestions = [
//   //   { question: "What is the capital of France?", answer: "Paris" },
//   //   {
//   //     question: "What is the largest planet in our solar system?",
//   //     answer: "Jupiter",
//   //   },
//   //   { question: "What is the best thing about React?", answer: "Hooks" },
//   //   // Add more questions here
//   // ];

//   const useFlashcardQuestions = (collection, username) => {
//     const [questions, setQuestions] = useState(simpleQuestions); // when we give it empty list, it causes issues likely due to async

//     useEffect(() => {
//       const fetchQuestions = async () => {
//         try {
//           const url = `http://localhost:8000/api/flashcards/${collection}/${username}`;

//           const response = await axios.get(url);
//           setQuestions(response.data);
//         } catch (error) {
//           console.log("Failed to fetch flashcard questions:", error);
//         }
//       };

//       fetchQuestions();
//     }, [collection, username]);

//     return questions;
//   };

//   // export useFlashcardQuestions;

//   const complexQuestions = useFlashcardQuestions(collection, username);
//   console.log("Flashcard Questions:", complexQuestions);

//   return (
//     <>
//       <GoogleOAuthProvider clientId={clientId}>
//         <h1>Vite + React Flashcard learning demo</h1>
//         <div>
//           <p>Collection: {collection}</p>
//           <p>Username: {username}</p>
//         </div>
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             const details = jwt_decode(credentialResponse.credential);
//             console.log(credentialResponse);
//             console.log(details);
//             console.log(details.email);
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//         />
//       </GoogleOAuthProvider>
//     </>
//   );
// }

// export default App;

//   return (
//     <>
//       <h1>Vite + React Flashcard learning demo</h1>
//
//       <div>
//         <p>Collection: {collection}</p>
//         <p>Username:   {username}</p>
//       </div>
//
//
//
//       <div>
//         <h1>Flashcards</h1>
//         <ComplexFlashcard questions={complexQuestions} username={username} />
//       </div>
//
//       <br />
//
//       <div>
//         <h1>Learning Progress</h1>
//         <LearningProgress collection={collection} username={username} />
//       </div>
//
//       <div>
//         <h1>Collection List (sourceDB)</h1>
//         <CollectionList apiEndpoint="source-collections" username={username} />
//       </div>
//
//       <div>
//         <h1>Collection List (flashcardDB)</h1>
//         <CollectionList apiEndpoint="flashcard-collections" username={username} />
//       </div>
//
//
//       {/* NOTE: we should add also Sub-Collection list component
//       our collections are big, they can be sliced to sub collections
//       userId, vocabulary, adjectives
//       userId, vocabulary, verbs
//       userId, grammar, jlpt_n3
//       userId, grammar, jlpt_n4
//       we just need to provide additional props and backend will slice it for us */}
//
//
//
//
//     </>
//   );
// }
//
// export default App;
