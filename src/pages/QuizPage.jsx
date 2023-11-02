import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuestionById } from '../api/auth-services';

import '../style/quizpage.css';

function QuizPage() {
  const pathname = window.location.pathname;
  const quizId = pathname.split('/').pop();

  const [score, setScore] = useState(0);
  const [currentque, setCurrentQue] = useState(0);
  const [selectedOpts, setSelectedOpts] = useState([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [quiz, setQuiz] = useState({ JS: [] });
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;

  useEffect(() => {
    if (quizId) {
      getQuestionById(quizId, accessToken)
        .then((questions) => {
          const mappedQuestions = questions.map((question) => {
            // Exclude 'id', 'licenseId', and 'quizId' properties
            const { id, licenseId, quizId, ...rest } = question;
            return rest;
          });

          setQuiz({ JS: mappedQuestions });
          setSelectedOpts(Array(mappedQuestions.length).fill(''));
        })
        .catch((error) => {
          console.error('Error fetching questions:', error);
        });
    }
  }, [quizId, accessToken]);

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

  const checkAnswer = (index) => {
    const answer = quiz.JS[index].answer;
    const selectedOpt = selectedOpts[index];
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
              Q{index + 1} {/* Count questions from one */}
            </button>
          ))}
        </div>
      </div>
      <div className="question-display">
        {currentQuestion && (
          <div>
            <h4>Q{currentque + 1}. {currentQuestion.content}</h4> {/* Display current question number */}
            <div id="question-options">
            {currentQuestion.answer1 && (
  <div className="form-check option-block">
    <input
      type="radio"
      className="form-check-input"
      name="option"
      id={`option-1`}
      value={currentQuestion.answer1}
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = currentQuestion.answer1;
        setSelectedOpts(newSelectedOpts);
        console.log(`Option 1 selected for Q${currentque + 1}`);
      }}
      checked={selectedOpts[currentque] === currentQuestion.answer1}
    />
    <label className="form-check-label" htmlFor={`option-1`}>
      <span id="optionval">{currentQuestion.answer1}</span>
    </label>
  </div>
)}

{currentQuestion.answer2 && (
  <div className="form-check option-block">
    <input
      type="radio"
      className="form-check-input"
      name="option"
      id={`option-2`}
      value={currentQuestion.answer2}
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = currentQuestion.answer2;
        setSelectedOpts(newSelectedOpts);
        console.log(`Option 2 selected for Q${currentque + 1}`);
      }}
      checked={selectedOpts[currentque] === currentQuestion.answer2}
    />
    <label className="form-check-label" htmlFor={`option-2`}>
      <span id="optionval">{currentQuestion.answer2}</span>
    </label>
  </div>
)}

{currentQuestion.answer3 && (
  <div className="form-check option-block">
    <input
      type="radio"
      className="form-check-input"
      name="option"
      id={`option-3`}
      value={currentQuestion.answer3}
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = currentQuestion.answer3;
        setSelectedOpts(newSelectedOpts);
        console.log(`Option 3 selected for Q${currentque + 1}`);
      }}
      checked={selectedOpts[currentque] === currentQuestion.answer3}
    />
    <label className="form-check-label" htmlFor={`option-3`}>
      <span id="optionval">{currentQuestion.answer3}</span>
    </label>
  </div>
)}

{currentQuestion.answer4 && (
  <div className="form-check option-block">
    <input
      type="radio"
      className="form-check-input"
      name="option"
      id={`option-4`}
      value={currentQuestion.answer4}
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = currentQuestion.answer4;
        setSelectedOpts(newSelectedOpts);
        console.log(`Option 4 selected for Q${currentque + 1}`);
      }}
      checked={selectedOpts[currentque] === currentQuestion.answer4}
    />
    <label className="form-check-label" htmlFor={`option-4`}>
      <span id="optionval">{currentQuestion.answer4}</span>
    </label>
  </div>
)}
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
        <div>Q{index + 1}. Your answer: {selectedOpts[index] ? `Option ${selectedOpts[index]}` : 'Not answered'}</div>
        <div><b>Correct answer:</b> Option {question.correctAnswer}</div>
        <div><b>Score:</b> {checkAnswer(index) ? '✅' : '❌'}</div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default QuizPage;
