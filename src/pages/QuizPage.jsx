import React, { useState, useEffect } from 'react';
import "../style/quizpage.css"

// Import statements and CSS as before...

// Import statements and CSS as before...

function QuizPage() {
  const [score, setScore] = useState(0);
  const [qno, setQno] = useState(1);
  const [currentque, setCurrentQue] = useState(0);
  const [selectedopt, setSelectedOpt] = useState('');
  const [quiz, setQuiz] = useState({
    "JS": [
      {
        "id": 1,
        "question": "What is the result of 2 + 2?",
        "options": [
          {
            "a": "3",
            "b": "4",
            "c": "5",
            "d": "6"
          }
        ],
        "answer": "4",
        "score": 0,
        "status": ""
      },
      {
        "id": 2,
        "question": "What does DOM stand for?",
        "options": [
          {
            "a": "Document Object Model",
            "b": "Data Object Model",
            "c": "Digital Object Model",
            "d": "Document Oriented Model"
          }
        ],
        "answer": "Document Object Model",
        "score": 0,
        "status": ""
      },
      {
        "id": 3,
        "question": "Which keyword is used to declare a variable in JavaScript?",
        "options": [
          {
            "a": "var",
            "b": "int",
            "c": "string",
            "d": "let"
          }
        ],
        "answer": "var",
        "score": 0,
        "status": ""
      },
      {
        "id": 4,
        "question": "What is the purpose of the 'return' statement in a function?",
        "options": [
          {
            "a": "To declare a variable",
            "b": "To exit the function and specify a return value",
            "c": "To print something to the console",
            "d": "To create an array"
          }
        ],
        "answer": "To exit the function and specify a return value",
        "score": 0,
        "status": ""
      }
      
      // Add your questions here...
    ]
  });

  useEffect(() => {
    displayQuiz(0);
  }, []);

  const displayQuiz = (cque) => {
    setCurrentQue(cque);
    const totalque = quiz.JS.length;

    if (cque < totalque) {
      setQno(quiz.JS[cque].id);
      setSelectedOpt('');
    }

    if (cque <= 0) {
      setQno(1);
    }

    if (cque >= totalque) {
      let totalCorrectAnswers = 0;
      for (let i = 0; i < totalque; i++) {
        totalCorrectAnswers += quiz.JS[i].score;
      }
      setScore(totalCorrectAnswers);
    }
  };

  const checkAnswer = (option) => {
    const answer = quiz.JS[currentque].answer;

    if (option === answer) {
      quiz.JS[currentque].score = 1;
      quiz.JS[currentque].status = "correct";
    } else {
      quiz.JS[currentque].status = "wrong";
    }
  };

  const changeQuestion = (cque) => {
    checkAnswer(selectedopt);
    displayQuiz(currentque + cque);
  };

  const currentQuestion = quiz.JS[currentque];

  return (
    <div className="quiz-container">
  {currentque < quiz.JS.length && (
    <div>
      <h4>{qno}. {currentQuestion.question}</h4>
      <div id="question-options">
  {Object.keys(currentQuestion.options[0]).map((key, index) => (
    <div className="form-check option-block" key={index}>
      <input
        type="radio"
        className="form-check-input"
        name="option"
        id={`option-${key}`} // Add an id attribute with a unique identifier
        value={currentQuestion.options[0][key]}
        onChange={(e) => setSelectedOpt(e.target.value)}
        checked={selectedopt === currentQuestion.options[0][key]}
      />
      <label className="form-check-label" htmlFor={`option-${key}`}> {/* Associate label with radio button */}
        <span id="optionval">{currentQuestion.options[0][key]}</span>
      </label>
    </div>
  ))}
</div>
      <div className="quiz-navigation">
        <button className='prev-button' onClick={() => changeQuestion(-1)}>Previous</button>
        <button className='next-button' onClick={() => changeQuestion(1)}>Next</button>
      </div>
    </div>
  )}

  {currentque >= quiz.JS.length && (
    <div>
      <h1>Total Score: {score}/{quiz.JS.length}</h1>
      {quiz.JS.map((question, index) => (
        <div key={index}>
          <div>Q {question.id}. {question.question}</div>
          <div><b>Correct answer:</b> {question.answer}</div>
          <div><b>Score:</b> {question.score} {question.status === 'correct' ? '✅' : '❌'}</div>
        </div>
      ))}
    </div>
  )}
</div>

  );
}

export default QuizPage;
