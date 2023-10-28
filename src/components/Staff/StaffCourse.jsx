import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourse, setNewCourse] = useState({
    name: '', price: '', duration: '', description: '', licenseId: ''
  });
  
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  const accessToken = user ? user.accessToken : null;
  console.log(accessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Course', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
        setCourses(response.data);
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
  const handleSubmit = (event) => {
    event.preventDefault();
    const newCourseData = {
      name: newCourse.name, price: newCourse.price, duration: newCourse.duration, description: newCourse.description, licenseId: newCourse.licenseId
    };
    axios.post('https://drivingschoolapi20231005104822.azurewebsites.net/api/Course', newCourseData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then((response) => {
      const createdCourse = response.data;
      setCourses([...courses, createdCourse]);
    }).catch((error) => {
      console.error('Lỗi khi tạo course mới:', error);
        
      window.alert('Lỗi khi tạo course mới');
    })
  }


  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="container">
      <div>
        <h1>Danh sách khoá học</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên khoá học</th>
              <th>Giá</th>
              <th>Thời hạn ( buổi )</th>
              <th>Mô tả</th>
              <th>Bằng</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td>{course.name}</td>
                <td>{course.price}</td>
                <td>{course.duration}</td>
                <td>{course.description}</td>
                <td>{licenses.find((license) => license.id === course.licenseId)?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Thêm khoá học mới</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên khoá học:</label>
            <input
              type="text"
              className="form-control"
              name="name"
              required
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Giá:</label>
            <input
              type="text"
              className="form-control"
              name="price"
              required
              value={newCourse.price}
              onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Thời hạn (buổi):</label>
            <input
              type="text"
              className="form-control"
              name="duration"
              required
              value={newCourse.duration}
              onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Mô tả:</label>
            <textarea
              className="form-control"
              name="description"
              required
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Bằng lái:</label>
            <select
              className="form-control"
              name="licenseId"
              required
              value={newCourse.licenseId}
              onChange={(e) => setNewCourse({ ...newCourse, licenseId: e.target.value })}
            >
              <option value="">Chọn Bằng lái</option>
              {licenses.map((license) => (
                <option key={license.id} value={license.id}>
                  {license.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Thêm
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default CoursesList;