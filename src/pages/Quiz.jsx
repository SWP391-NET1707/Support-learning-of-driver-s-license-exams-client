  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { getQuizz, getLicense, getPointByQuizId } from '../api/auth-services';

  function Quiz() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const [licenseData, setLicenseData] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [pointData, setPointData] = useState([]);

    useEffect(() => {
      // Fetch license data and quiz data
      async function fetchData() {
        try {
          const [licenseResponse, quizResponse] = await Promise.all([getLicense(), getQuizz(accessToken)]);
          setLicenseData(licenseResponse);
          setQuizData(quizResponse);
          
          // Log the fetched data
          console.log('Fetched License Data:', licenseResponse);
          console.log('Fetched Quiz Data:', quizResponse);
        } catch (error) {
          console.error('Error:', error);
        }
      }

      fetchData();
    }, [accessToken]);



    // Create a mapping of license IDs to license names
    const licenseMapping = {};
    for (const license of licenseData) {
      licenseMapping[license.licenseId] = license.name;
    }

    // Function to handle link click with the quizId
    const handleLinkClick = (id) => {
      console.log(`Clicked quizId: ${id}`);
    }
 


    return (
      <div className="ant-box" style={{ margin: '12px' }}>
        <div className="ant-row" style={{ margin: '-12px -12px 12px' }}>
          {quizData.map((quiz) => (
            <div className="ant-col ant-col-xs-24 ant-col-sm-12" style={{ padding: '12px' }} key={quiz.id}>
              <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: 'white' }}>
                <div className="ant-card-body">
                  <div>
                  <Link to={`/QuizPage/${quiz.id}`}>
                    <h2>{quiz.name}</h2>
                    </Link>
                  </div>
                  <p>Thể loại: {licenseMapping[quiz.licenseId]}</p>
                  <p>Điểm trước: {getPointByQuizId(quiz.id)} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default Quiz;
