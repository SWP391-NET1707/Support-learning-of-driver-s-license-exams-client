import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/User.css';
import jwtDecode from 'jwt-decode';
import { getRegisteredSlots, getSlotTimeById } from '../api/auth-services';
import { Table, Pagination } from 'antd';
import Column from 'antd/es/table/Column';

const User = () => {
    const [slotsdata, setSlotsdata] = useState([]);
    const user = sessionStorage.getItem("user");
    const token = JSON.parse(sessionStorage.getItem("user"));
    const accessToken = token.accessToken;

    let userToken = null;

    if (user) {
        userToken = jwtDecode(user);
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const slotdata = await getRegisteredSlots(accessToken);
                const formattedSlotsData = await Promise.all(
                    slotdata.map(async (slot) => {
                        const slotTimeData = await getSlotTimeById(slot.slotTimeId);
                        return {
                            ...slot,
                            monthYear: new Date(slot.monthYear).toLocaleDateString("en-GB"),
                            slotTimeData,
                        };
                    })
                );
                setSlotsdata(formattedSlotsData);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, []);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(slotsdata.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = slotsdata.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="user-container">
            <div className="user-banner">
                <img
                    src="https://via.placeholder.com/1200x200"
                    alt="Banner"
                    className="banner-image"
                />
                <div className="user-avatar">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="User Avatar"
                        className="avatar-image"
                    />
                </div>
            </div>
            <div className="user-content">
                <div className="user-info">
                    <div className="user-details">
                        <h1 className="user-name">{userToken.name}</h1>
                        <p className="user-email">{userToken.email}</p>
                        <p className="user-bio">
                            {userToken.role}
                        </p>
                        <Link to="/Schedule" className="btn btn-primary">
                            Go to Schedule
                        </Link>
                    </div>
                </div>
                <div className="timetable-box">
                    {currentPageData.map((slot, index) => (
                        <div className="slot" key={index}>
                            <Table
                                className="slot-table"
                                dataSource={[slot]}
                                size="small"
                                pagination={false}
                                style={{ width: '100%' }} // Set the table width to 100%
                            >
                                <Column title="Month/Year" dataIndex="monthYear" key="monthYear" width="25%" />
                                <Column title="Description" dataIndex="description" key="description" width="25%" />
                                <Column title="Course" dataIndex={["courses", "name"]} key="course" width="25%" />
                                <Column
                                    title="Slot Time"
                                    key="slotTime"
                                    render={(text, record) => {
                                        if (record.slotTimeData) {
                                            return `${record.slotTimeData.startTime} - ${record.slotTimeData.endTime}`;
                                        }
                                        return 'N/A';
                                    }}
                                    width="25%"
                                />
                            </Table>
                        </div>
                    ))}
                    <Pagination
                        current={currentPage}
                        total={slotsdata.length}
                        pageSize={itemsPerPage}
                        onChange={handlePageChange}
                        showQuickJumper
                    />
                </div>
            </div>
        </div>
    );
};

export default User;
