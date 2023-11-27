  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { getQuizz, getLicense, getPointByQuizId, getLicenseById } from '../api/auth-services';
  import '../style/quiz.css'
  
  function Quiz() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = user ? user.accessToken : null;
    const [licenseData, setLicenseData] = useState([]);
    const [quizData, setQuizData] = useState([]);
    const [pointData, setPointData] = useState({}); // Modified to be an object instead of an array
  
    useEffect(() => {
      // Fetch license data and quiz data
      async function fetchData() {
        try {
          const [licenseResponse, quizResponse] = await Promise.all([getLicense(), getQuizz(accessToken)]);
        
          // setLicenseData(licenseResponse);
          setQuizData(quizResponse);
  
          // Log the fetched data
          // console.log('Fetched License Data:', licenseResponse);
          // console.log('Fetched Quiz Data:', quizResponse);
        } catch (error) {
          console.error('Error:', error);
        }
      }
  
      fetchData();
    }, [accessToken]);
  
    useEffect(() => {
      // Fetch point data for quizzes
      async function fetchPointData() {
        const points = {};
        for (const quiz of quizData) {
          try {
            
            const point = await getPointByQuizId(accessToken, quiz.id);
            points[quiz.id] = point.point; // Assuming 'point' contains the response object
            
          } catch (error) {
            console.error('Error fetching point data:', error);
            // Handle the error if needed
          }
        }
        setPointData(points);
      }
    
      if (quizData.length > 0) {
        fetchPointData();
      }
    }, [quizData, accessToken]);
    

    useEffect(() => {
      
      async function fetchLicenseData() {
        const licenseNames = {};
        for (const quiz of quizData) {
          try {
            
            const licenseName = await getLicenseById(quiz.licenseId);
            licenseNames[quiz.licenseId] = licenseName.name; 
            // console.log(licenseNames)
          } catch (error) {
            console.error('Error fetching point data:', error);
            
          }
        }
        setLicenseData(licenseNames);
      }
    
      if (quizData.length > 0) {
        fetchLicenseData();
      }
    }, [quizData]);
    
  
   
  
    return (
      <div className='box-container'>
      <div className="ant-box-quiz" >
        <div className="ant-row" >
          {quizData.map((quiz) => (
            <div className="ant-col-quiz ant-col-xs-24 ant-col-sm-12"  key={quiz.id}>
              <div className="ant-card ant-card-bordered ant-card-hoverable" style={{ background: 'white' }}>
                <div className="ant-card-body">
                  <div>
                    <Link to={`/QuizPage/${quiz.id}`}>
                      <h2>{quiz.name}</h2>
                    </Link>
                  </div>
                  <p>Thể loại: {licenseData[quiz.licenseId]}</p>
                  <p>Điểm trước: {pointData[quiz.id]} </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    );
  }
  
  export default Quiz;