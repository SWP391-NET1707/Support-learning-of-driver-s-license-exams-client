import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const StudentCourseList = () => {
    const [studentCourses, setStudentCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);
    const accessToken = user ? user.accessToken : null;
    console.log(accessToken);
    const fetchData = async () => {
        try {
            const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/StudentCourse', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(response.data);
            setStudentCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Danh sách khoá học của sinh viên</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sinh viên</th>
                        <th>Tên khoá học</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {studentCourses.map((course) => (
                        <tr key={course.Id}>
                            <td>{course.Id}</td>
                            <td>{course.StudentName}</td>
                            <td>{course.CourseName}</td>
                            <td>{new Date(course.CreatedAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentCourseList;