const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/sourceDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for vocabulary
const vocabularySchema = new mongoose.Schema({
  question: String,
  answer: String,
  tag: String,
});

// Create a model for vocabulary
const Vocabulary = mongoose.model('Vocabulary', vocabularySchema, 'vocabulary');

// Create a schema for grammar
const grammarSchema = new mongoose.Schema({
  question: String,
  answer: String,
  tag: String,
});

// Create a model for grammar
const Grammar = mongoose.model('Grammar', grammarSchema, 'grammar');

// Seed the database with Japanese vocabulary
const seedVocabulary = async () => {
  try {
    const vocabulary = [
      { question: '美しい', answer: 'beautiful', tag: 'adjective' },
      { question: '楽しい', answer: 'fun', tag: 'adjective' },
      // Add more vocabulary here
      { question: '食べる', answer: 'to eat', tag: 'verb' },
      { question: '寝る', answer: 'to sleep', tag: 'verb' },
      // Add more verbs here
    ];

    await Vocabulary.deleteMany();
    await Vocabulary.insertMany(vocabulary);

    console.log('Japanese vocabulary seeded successfully');
  } catch (error) {
    console.error('Failed to seed Japanese vocabulary:', error);
  }
};

// Seed the database with Japanese grammar
const seedGrammar = async () => {
  try {
    const grammar = [
        { question: 'JLPT_N3 Grammar Question 1', answer: 'JLPT_N3 Grammar Answer 1', tag: 'JLPT_N3' },
        { question: 'JLPT_N3 Grammar Question 2', answer: 'JLPT_N3 Grammar Answer 2', tag: 'JLPT_N3' },
        { question: 'JLPT_N4 Grammar Question 1', answer: 'JLPT_N4 Grammar Answer 1', tag: 'JLPT_N4' },
        { question: 'JLPT_N4 Grammar Question 2', answer: 'JLPT_N4 Grammar Answer 2', tag: 'JLPT_N4' },
        // Add more grammar here
      ];

    await Grammar.deleteMany();
    await Grammar.insertMany(grammar);

    console.log('Japanese grammar seeded successfully');
  } catch (error) {
    console.error('Failed to seed Japanese grammar:', error);
  }
};

// Seed the database with Japanese vocabulary and grammar
const seedDatabase = async () => {
  await seedVocabulary();
  await seedGrammar();
  mongoose.connection.close();
};

// Run the seed script
seedDatabase();
