import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentQuizzesList = () => {
  const [studentQuizzes, setStudentQuizzes] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  const accessToken = user ? user.accessToken : null;
  console.log(accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Quizz', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
        setStudentQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/License', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
        setLicenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Danh sách bài quiz</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên bài quiz</th>
            <th>License ID</th>
            <th>Tuỳ chọn</th>
          </tr>
        </thead>
        <tbody>
          {studentQuizzes.map((quiz) => (
            <tr key={quiz.id}>
              <td>{quiz.id}</td>
              <td>{quiz.name}</td>
              <td>{licenses.find((license) => license.id === quiz.licenseId)?.name}</td>
              <td>
                <button type="button" class="btn btn-primary" onclick="editQuiz(${quiz.id})">Chỉnh sửa</button>
                <button type="button" class="btn btn-danger">Xoá</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentQuizzesList;