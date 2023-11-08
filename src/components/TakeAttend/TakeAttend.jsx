import React, { useState, useEffect } from 'react';
import { Button, Radio } from 'antd';
import { getSlotbyMentor, getStudentById, postTakeAttendant } from '../../api/auth-services';

const TakeAttend = () => {
    const [slotsData, setSlotsData] = useState([]);
    const [studentsData, setStudentsData] = useState({});
    const [attendance, setAttendance] = useState({});
    const currentDate = new Date().toLocaleDateString("en-US");
    const token = JSON.parse(sessionStorage.getItem('user'));
    const accessToken = token.accessToken;

    async function fetchData() {
        try {
            const slotData = await getSlotbyMentor(accessToken);
            setSlotsData(slotData);

            // Filter out slots with null studentId
            const slotsWithStudent = slotData.filter((slot) => slot.studentId !== null);

            // Fetch student data for each slot with a valid studentId
            const studentsDataPromises = slotsWithStudent.map((slot) => {
                return getStudentById(slot.studentId, accessToken);
            });

            const studentsInfo = await Promise.all(studentsDataPromises);
            const studentsInfoMap = {};

            studentsInfo.forEach((student) => {
                studentsInfoMap[student.id] = student;
            });

            setStudentsData(studentsInfoMap);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [accessToken]);

    // Function to set attendance for a student
    const setAttendanceForStudent = (studentId, isAttended) => {
        setAttendance((prevAttendance) => ({
            ...prevAttendance,
            [studentId]: isAttended,
        }));
    };

    const handleTakeAttendance = async (slotId) => {
        try {
            const isAttended = attendance[slotId] || false;
            await postTakeAttendant(slotId, isAttended, accessToken);
            // Handle any further actions if needed
            fetchData();
        } catch (error) {
            console.error('Error taking attendance:', error);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                        <div className="overflow-hidden card table-nowrap table-card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 text-center">Buổi học hôm nay</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="small text-uppercase bg-body text-muted">
                                        <tr>
                                            <th className="text-center">Tên</th>
                                            <th className="text-center">Email</th>
                                            <th className="text-center">Điểm danh</th>
                                            <th className="text-center">Ngày</th>
                                            <th className="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {slotsData.map((slot) => (
                                            slot.studentId !== null && (
                                                // Check if the slot date matches the current date
                                                new Date(slot.monthYear).toLocaleDateString("en-US") === currentDate && (
                                                    <tr key={slot.id} className="align-middle">
                                                        <td className="text-center">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <div>
                                                                    <div className="h6 mb-0 lh-1">
                                                                        {studentsData[slot.studentId]?.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">{studentsData[slot.studentId]?.email}</td>
                                                        <td className="text-center">
                                                            <Radio.Group
                                                                onChange={(e) => setAttendanceForStudent(slot.id, e.target.value)}
                                                                value={attendance[slot.id]}
                                                            >
                                                                <Radio value={true}>Có mặt</Radio>
                                                                <Radio value={false}>Vắng</Radio>
                                                            </Radio.Group>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>{new Date(slot.monthYear).toLocaleDateString("en-US")}</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <Button onClick={() => handleTakeAttendance(slot.id)}>Điểm danh</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                        <div className="overflow-hidden card table-nowrap table-card">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 text-center">Các buổi chưa được điểm danh</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table mb-0">
                                    <thead className="small text-uppercase bg-body text-muted">
                                        <tr>
                                            <th className="text-center">Tên</th>
                                            <th className="text-center">Email</th>
                                            <th className="text-center">Điểm danh</th>
                                            <th className="text-center">Ngày</th>
                                            <th className="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {slotsData.map((slot) => (
                                            // Check if both attendance is null, studentId is not null, and the date is in the past
                                            slot.attendance === null && slot.studentId !== null && new Date(slot.monthYear) < new Date() && (
                                                <tr key={slot.id} className="align-middle">
                                                    <td className="text-center">
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <div>
                                                                <div className="h6 mb-0 lh-1">
                                                                    {studentsData[slot.studentId]?.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{studentsData[slot.studentId]?.email}</td>
                                                    <td className="text-center">
                                                        <Radio.Group
                                                            onChange={(e) => setAttendanceForStudent(slot.id, e.target.value)}
                                                            value={attendance[slot.id]}
                                                        >
                                                            <Radio value={true}>Có mặt</Radio>
                                                            <Radio value={false}>Vắng</Radio>
                                                        </Radio.Group>
                                                    </td>
                                                    <td className="text-center">
                                                        <span>{new Date(slot.monthYear).toLocaleDateString("en-US")}</span>
                                                    </td>
                                                    <td className="text-center">
                                                        <Button onClick={() => handleTakeAttendance(slot.id)}>Điểm danh</Button>
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TakeAttend;
