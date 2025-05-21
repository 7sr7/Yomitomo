# Yomitomo (読み友)
- Lit. Translation: "reading buddy" in Japanese

![Yomitomo Screenshot](frontend/src/assets/Yomitomo_Screenshot.png)

## Brief Overview:
A Google Chrome extension with direct ChatGPT integration and user-installed dictionaries to allow for seamless, contextual lookups of unknown words and grammar concepts in your target foreign language with user-customizable flashcard generation for the app Anki.

## Additional Information:
- Will be testing with only Japanese for now, since all members are fluent in this language
  - Eventually all languages
- In-page / realtime lookups on unknown vocabulary and grammar concepts
- AI integration (OpenAi GPT or Google Gemini integration)
  - Mainly for when context is needed for unknown concepts… grammar concepts / idioms (e.g. 肝に銘じる)
- User-Inputted Dictionary integration
- Connection with 暗記 (Anki) Flashcard app for direct flashcard integration
- UI / UX design of in-page pop-up of the extension 

## Tech Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Framer Motion (animations)
- Chrome Extension API

### Backend
- Node.js
- Express.js
- OpenAI API

## Development Environment Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)
- [Google Chrome](https://www.google.com/chrome/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Yomitomo.git
cd Yomitomo
```

2. Install dependencies for all packages:
```bash
npm run install:all
```

3. Create a `.env` file in the `backend` directory with your OpenAI API key:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### Development

1. Start the development server (both frontend and backend):
```bash
npm run dev
```

This will start:
- Frontend: Vite dev server at http://localhost:5173
- Backend: Express server at http://localhost:3000

2. To load the extension in Chrome:
   - Build the extension: `npm run build`
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `frontend/dist` directory

### Build

To build the extension for production:
```bash
npm run build
```

The built files will be in the `frontend/dist` directory, which can be loaded as an unpacked extension in Chrome.

## Authors: 
Ronin Silvestre - 7sr7
Haoyuan Chen - ChenHY1217
