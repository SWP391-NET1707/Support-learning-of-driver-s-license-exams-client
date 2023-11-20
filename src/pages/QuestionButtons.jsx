import React from 'react';
import '../style/quizpage.css'

function QuestionButtons({ quiz, displayQuiz, currentque, setSelectedOpts, selectedOpts }) {
    return (
      <div className="question-buttons-container">
        <h3>Câu hỏi</h3>
        <div className="question-buttons">
          {quiz.JS.map((question, index) => (
            <button
              key={question.id}
              onClick={() => displayQuiz(index)}
              className={`question-button ${currentque === index ? 'active' : ''} ${selectedOpts[index] !== '' ? 'chosen' : ''}`}
            >
              Q{index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default QuestionButtons;