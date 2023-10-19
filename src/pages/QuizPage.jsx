import React, { useState, useEffect } from 'react';
import "../style/quizpage.css";

function QuizPage() {
  const [score, setScore] = useState(0);
  const [currentque, setCurrentQue] = useState(0);
  const [selectedOpts, setSelectedOpts] = useState(Array(quiz.JS.length).fill(''));
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds


  useEffect(() => {
    displayQuiz(currentque);
  }, [currentque]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        finishQuiz();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const displayQuiz = (cque) => {
    setCurrentQue(cque);
  };

  const checkAnswer = () => {
    const answer = quiz.JS[currentque].answer;
    const selectedOpt = selectedOpts[currentque];

    return answer === selectedOpt;
  };

  const changeQuestion = (cque) => {
    const newCurrentQue = currentque + cque;

    if (newCurrentQue >= 0 && newCurrentQue < quiz.JS.length) {
      setCurrentQue(newCurrentQue);
    }
  };

  const finishQuiz = () => {
    let totalCorrectAnswers = 0;

    for (let i = 0; i < quiz.JS.length; i++) {
      if (checkAnswer(i)) {
        totalCorrectAnswers += 1;
      }
    }

    setScore(totalCorrectAnswers);
    setIsQuizFinished(true);
  };

  const currentQuestion = quiz.JS[currentque];

  return (
    <div className="quiz-container">
        {/* Timer display */}
        <div className="timer">
        <span>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
      </div>
      <div className="question-buttons-container">
        <h3>Question IDs</h3>
        <div className="question-buttons">
          {quiz.JS.map((question, index) => (
            <button
              key={question.id}
              onClick={() => displayQuiz(index)}
              className={`question-button ${currentque === index ? 'active' : ''}`}
            >
              {question.id}
            </button>
          ))}
        </div>
      </div>
      <div className="question-display">
        {currentQuestion && (
          <div>
            <h4>{currentQuestion.id}. {currentQuestion.question}</h4>
            <div id="question-options">
              {currentQuestion.options.map((option, index) => (
                <div className="form-check option-block" key={index}>
                  <input
                    type="radio"
                    className="form-check-input"
                    name="option"
                    id={`option-${index}`}
                    value={option}
                    onChange={() => {
                      const newSelectedOpts = [...selectedOpts];
                      newSelectedOpts[currentque] = option;
                      setSelectedOpts(newSelectedOpts);
                    }}
                    checked={selectedOpts[currentque] === option}
                  />
                  <label className="form-check-label" htmlFor={`option-${index}`}>
                    <span id="optionval">{option}</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="quiz-navigation">
  <button className='prev-button' onClick={() => changeQuestion(-1)}>Previous</button>
  <button className='finish-button' onClick={finishQuiz}>Finish Quiz</button>
  <button className='next-button' onClick={() => changeQuestion(1)}>Next</button>
</div>
          </div>
        )}
      </div>
      {isQuizFinished && (
        <div>
          <h1>Total Score: {score}/{quiz.JS.length}</h1>
          {quiz.JS.map((question, index) => (
            <div key={index}>
              <div>Q {question.id}. {question.question}</div>
              <div><b>Correct answer:</b> {question.answer}</div>
              <div><b>Score:</b> {checkAnswer(index) ? '✅' : '❌'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Define the quiz state with initial values
const quiz = {
  "JS": [
    {
      "id": 1,
      "question": "What is the result of 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "answer": "4",
    },
    {
      "id": 2,
      "question": "What does DOM stand for?",
      "options": ["Document Object Model", "Data Object Model", "Digital Object Model", "Document Oriented Model"],
      "answer": "Document Object Model",
    },
    {
      "id": 3,
      "question": "Which keyword is used to declare a variable in JavaScript?",
      "options": ["var", "int", "string", "let"],
      "answer": "var",
    },
    {
      "id": 4,
      "question": "What is the purpose of the 'return' statement in a function?",
      "options": ["To declare a variable", "To exit the function and specify a return value", "To print something to the console", "To create an array"],
      "answer": "To exit the function and specify a return value",
    }
    // Add your questions here...
  ]
};

export default QuizPage;
