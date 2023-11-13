import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getQuestionById, postStudentQuiz } from '../api/auth-services';

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
  const [userAnswers, setUserAnswers] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user ? user.accessToken : null;
  
  useEffect(() => {
    if (quizId) {
      getQuestionById(quizId, accessToken)
        .then((questions) => {
          const mappedQuestions = questions.map((question) => {
            // Exclude 'id', 'licenseId', and 'quizId' properties
            const {  licenseId, quizId, ...rest } = question;

            return rest;
            
          });
          console.log(mappedQuestions)
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
    const correctAnswer = quiz.JS[index].correctAnswer;
    
    const selectedOpt = selectedOpts[index];
    // console.log(correctAnswer === selectedOpt)
    return correctAnswer === selectedOpt;
  };

  const changeQuestion = (cque) => {
    const newCurrentQue = currentque + cque;

    if (newCurrentQue >= 0 && newCurrentQue < quiz.JS.length) {
      setCurrentQue(newCurrentQue);
    }
  };

  const finishQuiz = () => {
    if (quizId && quiz.JS.length > 0) {
      let totalCorrectAnswers = 0;
      const userAnswersData = [];
  
      for (let i = 0; i < quiz.JS.length; i++) {
        if (checkAnswer(i)) {
          totalCorrectAnswers += 1;
        }
  
        // Verify that the id property is present in quiz.JS[i]
        if (quiz.JS[i].id) {
          userAnswersData.push({ id: quiz.JS[i].id, correctAnswer: selectedOpts[i] });
        } else {
          console.error(`Missing id property in quiz.JS[${i}]`);
        }
      }
  
      setUserAnswers(userAnswersData); // Store user's answers
  
      setScore(totalCorrectAnswers);
      setIsQuizFinished(true);
  
      // Convert userAnswersData to a JSON string
      const userAnswersDataJson = JSON.stringify(userAnswersData);
  
      // Create the data structure for API call
      const quizData = {
        questions: JSON.parse(userAnswersDataJson),
        quizId: quizId
      };

      
      const sendData = JSON.stringify(quizData, null, 2)
      console.log("this is", quizData);
  
      // Send data to the API
      postStudentQuiz(accessToken, sendData)
        .then((response) => {
          // Handle success if needed
        })
        .catch((error) => {
          console.error('Error posting student quiz:', error);
        });
    } else {
      console.error('quizId is undefined or quiz.JS is empty');
    }
  };
  

  const currentQuestion = quiz.JS[currentque];

  return (
    <div>
    <div className="quiz-container">
      {/* Timer display */}
      <div className="timer">
        <span>Thời gian: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
      </div>
      <div className="question-buttons-container">
        <h3>Câu hỏi</h3>
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
      value={1} // Hard-coded option number
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = 1; // Set the selected option as 1
        setSelectedOpts(newSelectedOpts);
        // console.log(selectedOpts)
      }}
      checked={selectedOpts[currentque] === 1}
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
      value={2} // Hard-coded option number
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = 2; // Set the selected option as 2
        setSelectedOpts(newSelectedOpts);
        // console.log(selectedOpts)
      }}
      checked={selectedOpts[currentque] === 2}
    />
    <label className="form-check-label" htmlFor={`option-2`}>
      <span id="optionval">{currentQuestion.answer2}</span>
    </label>
  </div>
)}

{currentQuestion.answer3 != 'null' && (
  <div className="form-check option-block">
    <input
      type="radio"
      className="form-check-input"
      name="option"
      id={`option-3`}
      value={3} // Hard-coded option number
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = 3; // Set the selected option as 3
        setSelectedOpts(newSelectedOpts);
        // console.log(selectedOpts)
      }}
      checked={selectedOpts[currentque] === 3}
    />
    <label className="form-check-label" htmlFor={`option-3`}>
      <span id="optionval">{currentQuestion.answer3}</span>
    </label>
  </div>
)}

{currentQuestion.answer4 != 'null' && (
  <div className="form-check option-block">
    <input
      type="radio"
      className="form-check-input"
      name="option"
      id={`option-4`}
      value={4} // Hard-coded option number
      onChange={() => {
        const newSelectedOpts = [...selectedOpts];
        newSelectedOpts[currentque] = 4; // Set the selected option as 4
        
        setSelectedOpts(newSelectedOpts);
        // console.log(selectedOpts)
      }}
      checked={selectedOpts[currentque] === 4}
    />
    <label className="form-check-label" htmlFor={`option-4`}>
      <span id="optionval">{currentQuestion.answer4}</span>
    </label>
  </div>
)}
            </div>
            <div className="quiz-navigation">
              <button className='prev-button' onClick={() => changeQuestion(-1)}>Quay về</button>
              <button className='finish-button' onClick={finishQuiz}>Hoàn thành</button>
              <button className='next-button' onClick={() => changeQuestion(1)}>Tiếp</button>
            </div>
          </div>
        )}
      </div>
      </div>
      {isQuizFinished && (
  <div className='quiz-container'>
    <h1>Tổng Điểm: {score}/{quiz.JS.length}</h1>
    {quiz.JS.map((question, index) => (
      <div key={index}>
        <div>Q{index + 1}. Bạn chọn: {selectedOpts[index] ? `Đáp án ${selectedOpts[index]}` : 'Chưa chọn'}</div>
        <div><b>Đáp án đúng:</b> Đáp án {question.correctAnswer}</div>
        <div><b>Kết quả:</b> {checkAnswer(index) ? '✅' : '❌'}</div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default QuizPage;
