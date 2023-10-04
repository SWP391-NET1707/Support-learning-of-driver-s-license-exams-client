import React, { useState, useEffect } from 'react';
import "../style/quizpage.css"

function QuizPage() {
  const [score, setScore] = useState(0);
  const [qno, setQno] = useState(1);
  const [currentque, setCurrentQue] = useState(0);
  const [selectedopt, setSelectedOpt] = useState('');
  const [quiz, setQuiz] = useState({
    "JS": [
      {
        "id": 1,
        "question": "Inside which HTML element do we put the JavaScript?",
        "options": [
          {
            "a": "&lt;script&gt;",
            "b": "&lt;javascript&gt;",
            "c": "&lt;scripting&gt;",
            "d": "&lt;js&gt;"
          }
        ],
        "answer": "&lt;script&gt;",
        "score": 0,
        "status": ""
      },
      // Add more quiz questions here...
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
      let totalScore = 0;
      for (let i = 0; i < totalque; i++) {
        totalScore += quiz.JS[i].score;
      }
      setScore(totalScore);
    }
  };

  const checkAnswer = (option) => {
    const answer = quiz.JS[currentque].answer;
    option = option.replace(/</g, "&lt;");
    option = option.replace(/>/g, "&gt;");
    option = option.replace(/"/g, "&quot;");

    if (option === answer) {
      if (quiz.JS[currentque].score === "") {
        quiz.JS[currentque].score = 1;
        quiz.JS[currentque].status = "correct";
      }
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
    <div>
      {currentque < quiz.JS.length && (
        <div>
          <h4>{qno}. {currentQuestion.question}</h4>
          <div id="question-options">
            {Object.keys(currentQuestion.options[0]).map((key, index) => (
              <div className="form-check option-block" key={index}>
                <label className="form-check-label">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="option"
                    id={`q${key}`}
                    value={currentQuestion.options[0][key]}
                    onChange={(e) => setSelectedOpt(e.target.value)}
                    checked={selectedopt === currentQuestion.options[0][key]}
                  />
                  <span id="optionval">{currentQuestion.options[0][key]}</span>
                </label>
              </div>
            ))}
          </div>
          <button onClick={() => changeQuestion(-1)}>Previous</button>
          <button onClick={() => changeQuestion(1)}>Next</button>
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