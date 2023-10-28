import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CoursesList = () => {
    const [courses, setCourses] = useState([]);
    const [licenses, setLicenses] = useState([]);
    const [loading, setLoading] = useState(true);
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


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
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
    );
};

export default CoursesList;