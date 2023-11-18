import React, { useState, useEffect } from 'react';
import { Button, Radio } from 'antd';
import { getSlotTimeById, getSlotbyMentor, getStudentById, postTakeAttendant } from '../../api/auth-services';
import '../TakeAttend/style.css'
import Link from 'antd/es/typography/Link';

const TakeAttend = () => {
    const [slotsData, setSlotsData] = useState([]);
    const [studentsData, setStudentsData] = useState({});
    const [attendance, setAttendance] = useState({});
    const [slotTimeData, setSlotTimeData] = useState({});
    const [unattendedSlots, setUnattendedSlots] = useState([]);
    const [showUnattendedSlots, setShowUnattendedSlots] = useState(false);
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
            console.log(slotData[1].attendance)
            setStudentsData(studentsInfoMap);

            const slotTimesPromises = slotData.map((slot) => getSlotTimeById(slot.slotTimeId));
            const slotTimes = await Promise.all(slotTimesPromises);

            const slotTimesMap = {};
            slotTimes.forEach((time, index) => {
                slotTimesMap[slotData[index].id] = time;
            });

            setSlotTimeData(slotTimesMap);
            // Check if there are unattended slots
            const unattendedSlots = slotData.filter(
                (slot) =>
                    slot.attendance === null &&
                    slot.studentId !== null &&
                    new Date(slot.monthYear).toLocaleDateString("en-US") < currentDate
            );
            setUnattendedSlots(unattendedSlots);

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
                                            <th className="text-center"> Slot </th>
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
                                                        <td className="text-center" >
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <div>
                                                                    <span><h4>{slot.slotTimeId}</h4></span>
                                                                    <p>{slotTimeData[slot.id]?.startTime} - {slotTimeData[slot.id]?.endTime}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <div className="h6 mb-0 lh-1 center-content">
                                                                    {studentsData[slot.studentId]?.name}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                {studentsData[slot.studentId]?.email}
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                <Radio.Group
                                                                    onChange={(e) => setAttendanceForStudent(slot.id, e.target.value)}
                                                                    value={attendance[slot.id]}
                                                                    defaultValue={slot.attendance || null || false}
                                                                >
                                                                    <Radio value={true} >Có mặt</Radio>
                                                                    <Radio value={false}>Vắng</Radio>
                                                                </Radio.Group>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                <span>{new Date(slot.monthYear).toLocaleDateString("en-US")}</span>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                <Button onClick={() => handleTakeAttendance(slot.id)}>Điểm danh</Button>
                                                            </div>
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
            <Link onClick={() => setShowUnattendedSlots(!showUnattendedSlots)}>
                {unattendedSlots.length > 0
                    ? `Có ${unattendedSlots.length} buổi chưa được điểm danh !   >>>`
                    : 'Không có buổi nào chưa được điểm danh'}
            </Link>
            {showUnattendedSlots && unattendedSlots.length > 0 && (
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
                                                <th className="text-center"> Slot </th>
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
                                                slot.attendance === null && slot.studentId !== null && new Date(slot.monthYear).toLocaleDateString("en-US") < currentDate && (
                                                    <tr key={slot.id} className="align-middle">
                                                        <td className="text-center" >
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <div>
                                                                    <span><h4>{slot.slotTimeId}</h4></span>
                                                                    <p>{slotTimeData[slot.id]?.startTime} - {slotTimeData[slot.id]?.endTime}</p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="d-flex align-items-center justify-content-center">
                                                                <div className="h6 mb-0 lh-1 center-content">
                                                                    {studentsData[slot.studentId]?.name}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                {studentsData[slot.studentId]?.email}
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                <Radio.Group
                                                                    onChange={(e) => setAttendanceForStudent(slot.id, e.target.value)}
                                                                    value={attendance[slot.id]}
                                                                    defaultValue={slot.attendance || null || false}
                                                                >
                                                                    <Radio value={true} >Có mặt</Radio>
                                                                    <Radio value={false}>Vắng</Radio>
                                                                </Radio.Group>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                <span>{new Date(slot.monthYear).toLocaleDateString("en-US")}</span>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            <div className='center-content'>
                                                                <Button onClick={() => handleTakeAttendance(slot.id)}>Điểm danh</Button>
                                                            </div>
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
            )}
        </div>
    );
};

export default TakeAttend;
