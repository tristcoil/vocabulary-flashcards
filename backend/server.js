const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// ------------------------------- DB Connections --------------------------------- //

// Connect to flashcardDB
const flashcardDBConnection = mongoose.createConnection('mongodb://localhost:27017/flashcardDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to sourceDB
const sourceDBConnection = mongoose.createConnection('mongodb://localhost:27017/sourceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// ------------------------------------- Models / Collections -------------------------------------- //


// Create a schema for flashcard state in flashcardDB
const flashcardStateSchema = new mongoose.Schema({
  userId: String,
  count: Number,
  currentQuestionIndex: Number,
  difficulty: String,
  question: String,
  answer: String,
});

// Create a model for flashcard state in flashcardDB
const FlashcardState = flashcardDBConnection.model('FlashcardState', flashcardStateSchema);


// Create a schema for vocabulary
const vocabularySchema = new mongoose.Schema({
  question: String,
  answer: String,
  tag: String,
});

// Register the vocabulary schema
sourceDBConnection.model('Vocabulary', vocabularySchema, 'vocabulary');

// Create a model for vocabulary
const Vocabulary = sourceDBConnection.model('Vocabulary');












// Create a schema for grammar
const grammarSchema = new mongoose.Schema({
  question: String,
  answer: String,
  tag: String,
});

// Create a model for grammar
const Grammar = mongoose.model('Grammar', grammarSchema, 'grammar');




// ---------------------------------- API endpoints ----------------------------------------- //

// POST endpoint to store flashcard state
app.post('/api/flashcard', async (req, res) => {
    try {
      const { userId, count, currentQuestionIndex, difficulty, question, answer } = req.body;
  
      let flashcardState = await FlashcardState.findOne({ userId, question });
  
      if (!flashcardState) {
        // Create a new document if it doesn't exist
        flashcardState = new FlashcardState({
          userId,
          count,
          currentQuestionIndex,
          difficulty,
          question,
          answer,
        });
      } else {
        // Update the existing document
        flashcardState.count = count;
        flashcardState.currentQuestionIndex = currentQuestionIndex;
        flashcardState.difficulty = difficulty;
      }
  
      await flashcardState.save();
  
      res.status(201).json({ message: 'Flashcard state stored successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to store flashcard state' });
    }
  });
  
  
  

// GET endpoint to retrieve flashcard states for a specific user
app.get('/api/flashcard/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      const flashcardStates = await FlashcardState.find({ userId });
  
      if (flashcardStates.length === 0) {
        return res.status(404).json({ error: 'Flashcard states not found' });
      }
  
      res.status(200).json(flashcardStates);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve flashcard states' });
    }
  });
  
  
// ----------------------------------------------------------------------------------- //

// GET endpoint to retrieve collections from FlashcardState
app.get('/api/flashcard-collections', async (req, res) => {
  try {
    const flashcardCollections = await flashcardDBConnection.db.listCollections().toArray();
    const collectionNames = flashcardCollections.map((collection) => collection.name);
    res.status(200).json(collectionNames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve flashcard collections' });
  }
});


// GET endpoint to retrieve collections from sourceDB
app.get('/api/source-collections', async (req, res) => {
  try {
    const collections = await sourceDBConnection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);
    res.status(200).json(collectionNames);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve source collections' });
  }
});





// --------------------------------------------------------------------------------------------- //

// WORKS AMAZING
// POST endpoint to retrieve a collection from sourceDB by name
// app.post('/api/clone-collection', async (req, res) => {
//   try {
//     const { collection } = req.body;
//     console.log(`Collection '${collection}' requested for cloning`);
//
//
//     // Fetch the selected collection from the sourceDB
//     const selectedCollection = await sourceDBConnection.db.collection(collection).find().toArray();
//
//     if (selectedCollection.length === 0) {
//       console.log(`Collection '${collection}' not found in sourceDB`);
//       return res.status(404).json({ error: 'Collection not found in sourceDB' });
//     }
//
//     res.status(200).json(selectedCollection);
//   } catch (error) {
//     console.error('Failed to retrieve collection:', error);
//     res.status(500).json({ error: 'Failed to retrieve collection' });
//   }
// });


// POST endpoint to retrieve and clone a collection from sourceDB to flashcardDB
app.post('/api/clone-collection', async (req, res) => {
  try {
    const { collection } = req.body;
    console.log(`Collection '${collection}' requested for cloning`);

    // Fetch the selected collection from the sourceDB
    const selectedCollection = await sourceDBConnection.db.collection(collection).find().toArray();

    if (selectedCollection.length === 0) {
      console.log(`Collection '${collection}' not found in sourceDB`);
      return res.status(404).json({ error: 'Collection not found in sourceDB' });
    }

    // Clone the collection by inserting the documents into the flashcardDB
    const clonedDocuments = await flashcardDBConnection.db.collection(collection).insertMany(selectedCollection);

    console.log(`Cloned ${clonedDocuments.insertedCount} documents from collection '${collection}'`);

    res.status(200).json({ message: 'Collection cloned successfully' });
  } catch (error) {
    console.error('Failed to clone collection:', error);
    res.status(500).json({ error: 'Failed to clone collection' });
  }
});











// --------------------------------------------------------------------------------------------- //

// Start the server
app.listen(8000, () => {
    console.log('Server started on port 8000');
  });  