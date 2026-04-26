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

## Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Backend Setup

```bash
cd server
npm install
npm start
```

The server will start on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm start
```

The app will open on `http://localhost:3000`

## API Endpoints

### Get All Word Pairs
```
GET /api/word-pairs
```

### Get Random Quiz
```
GET /api/quiz/random?count=20
```

### Get Pairs by Difficulty
```
GET /api/word-pairs/difficulty/:level
```
Levels: `easy`, `medium`, `hard`

### Health Check
```
GET /api/health
```

## Word Pairs Dataset

The dataset includes:
- **50 word pairs** of similar-sounding English words
- **Definitions** for each word
- **Example sentences** for context
- **Difficulty levels**: Easy, Medium, Hard

Each pair includes:
- The two similar-sounding words
- Clear definitions
- Usage examples
- Difficulty rating

## How to Use

1. **Start the Quiz**: The app displays one question at a time
2. **Listen to Audio**: Click "Replay Audio" to hear the pronunciation
3. **Select Answer**: Choose between the two word options
4. **Review Sentence**: Each option includes an example sentence
5. **See Results**: After all questions, view your score and answer review

## Features Implemented

✅ React SPA with quiz interface  
✅ Express.js backend with API endpoints  
✅ 50 word pairs with definitions and examples  
✅ Audio playback for word pronunciations  
✅ Score calculation and grading  
✅ Answer review functionality  
✅ Progress tracking  
✅ Responsive design  
✅ Error handling  

## Future Enhancements

- Integration with Oxford Dictionary API for live audio
- Difficulty level selection before starting quiz
- User accounts and progress tracking
- Timed quiz mode
- Phonetic transcriptions
- Both US and UK accent options
- Mobile app version
- Leaderboard for scores

## Technology Stack

### Frontend
- React.js
- CSS3 with Flexbox/Grid
- Axios for API calls

### Backend
- Node.js
- Express.js
- CORS middleware

## Troubleshooting

**Error: Cannot find module**
- Make sure to run `npm install` in both server and client directories

**Port already in use**
- Change the PORT in server/index.js or use: `PORT=5001 npm start`

**Audio not playing**
- Make sure audio URLs are valid
- Check browser console for CORS errors

## License

MIT
