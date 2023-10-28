import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Staff/staffQuiz.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentQuizzesList = () => {
  const [studentQuizzes, setStudentQuizzes] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editQuizId, setEditQuizId] = useState(null);
  const [editQuizName, setEditQuizName] = useState('');
  const [editLicenseId, setEditLicenseId] = useState('');
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showAddQuizForm, setShowAddQuizForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    name: '',
    licenseId: '',
  });

  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user ? user.accessToken : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Quizz', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setStudentQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/License', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        setLicenses(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
    fetchData();
  }, [accessToken]);
  const handleAddQuizClick = () => {
    
    setShowAddQuizForm(true);
  };
  const handleSaveAddQuiz = (event) => {
    
    event.preventDefault(); 
    const newQuizData = {
      name: newQuiz.name,
      licenseId: newQuiz.licenseId,
    };
  
    axios.post('https://drivingschoolapi20231005104822.azurewebsites.net/api/Quizz/create', newQuizData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        const createdQuiz = response.data;
        setStudentQuizzes([...studentQuizzes, createdQuiz]);
        setShowAddQuizForm(false); 
      })
      .catch((error) => {
        console.error('Lỗi khi tạo bài quiz mới:', error);
        
        window.alert('Lỗi khi tạo bài quiz mới');
      });
  };
  const handleCancelAddQuiz = () => {
    
    setShowAddQuizForm(false);
  };

  const handleEditClick = (quizId) => {
    const quizToEdit = studentQuizzes.find((quiz) => quiz.id === quizId);
    if (quizToEdit) {
      setEditQuizId(quizToEdit.id);
      setEditQuizName(quizToEdit.name);
      setEditLicenseId(quizToEdit.licenseId);
    }
  };

  const handleCancelEdit = () => {
    setEditQuizId(null);
  };

  const handleSaveEdit = () => {
    
    const updatedQuizzes = studentQuizzes.map((quiz) => {
      if (quiz.id === editQuizId) {
        return {
          ...quiz,
          name: editQuizName,
          licenseId: editLicenseId,
        };
      }
      return quiz;
    });
    setStudentQuizzes(updatedQuizzes);
    setEditQuizId(null);
  };

  const handleDeleteClick = (quizId) => {
    
    const confirmed = window.confirm('Bạn có chắc chắn muốn xoá bài quiz này?');
  
    if (confirmed) {
      
      axios
        .delete(`https://drivingschoolapi20231005104822.azurewebsites.net/api/Quizz/${quizId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        .then(() => {
          
          const updatedQuizzes = studentQuizzes.filter((quiz) => quiz.id !== quizId);
          setStudentQuizzes(updatedQuizzes);
          
          setQuizToDelete(null);
        })
        .catch((error) => {
          console.error('Lỗi khi xoá bài quiz:', error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setQuizToDelete(null);
  };

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
              <td>{quiz.id === editQuizId ? (
                <input
                  type="text"
                  value={editQuizName}
                  onChange={(e) => setEditQuizName(e.target.value)}
                />
              ) : quiz.name}</td>
              <td>{quiz.id === editQuizId ? (
                <select
                  value={editLicenseId}
                  onChange={(e) => setEditLicenseId(e.target.value)}
                >
                  {licenses.map((license) => (
                    <option key={license.id} value={license.id}>
                      {license.name}
                    </option>
                  ))}
                </select>
              ) : licenses.find((license) => license.id === quiz.licenseId)?.name}</td>
              <td>
                {quiz.id === editQuizId ? (
                  <div className="button-group">
                    <button className="btn btn-danger" onClick={handleSaveEdit}>Lưu chỉnh sửa</button>
                    <button className="btn btn-light" onClick={handleCancelEdit}>Hủy</button>
                  </div>
                ) : (
                  <div className="button-group">
                    <button className="btn btn-primary"  onClick={() => handleEditClick(quiz.id)}>Chỉnh sửa</button>
                    <button className="btn btn-danger"  onClick={() => handleDeleteClick(quiz.id)}>Xoá</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-info" onClick={handleAddQuizClick} >Thêm bài quiz</button>
      {showAddQuizForm && (
        <div>
          <h2>Thêm bài quiz</h2>
          <form>
            <div className="form-group">
              <label>Tên bài quiz</label>
              <input
                type="text"
                value={newQuiz.name}
                onChange={(e) => setNewQuiz({ ...newQuiz, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Bằng lái</label>
              <select
                value={newQuiz.licenseId}
                onChange={(e) => setNewQuiz({ ...newQuiz, licenseId: e.target.value })}
              >
                {licenses.map((license) => (
                  <option key={license.id} value={license.id}>
                    {license.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" onClick={handleSaveAddQuiz}>Lưu</button>
            <button className="btn btn-light" onClick={handleCancelAddQuiz}>Hủy</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentQuizzesList;