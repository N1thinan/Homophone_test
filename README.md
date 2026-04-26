# Homophone Quiz Exam Website

A web-based mock exam application where users listen to audio pronunciations and identify the correct word from pairs of similar-sounding words (homophones and minimal pairs).

## Features

- 🎧 **Audio Pronunciation**: Listen to word pronunciations from audio sources
- 🎯 **Quiz Format**: Multiple choice questions with two similar-sounding words
- 📊 **Score Tracking**: Displays final score, grade, and accuracy percentage
- 📝 **Answer Review**: Review all answers after completing the quiz
- 🎨 **Modern UI**: Beautiful, responsive interface with animations
- 50 **Word Pairs**: Curated set of similar-sounding English words

## Project Structure

```
app-for-final/
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   ├── data/
│   │   └── word-pairs.json # 500+ word pairs dataset
│   └── package.json
├── client/                # React.js frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── styles/        # Component CSS files
│   │   ├── App.js         # Main App component
│   │   └── index.js
│   └── package.json
└── README.md
```
