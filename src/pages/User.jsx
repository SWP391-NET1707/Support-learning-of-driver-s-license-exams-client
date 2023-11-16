import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/User.css';
import avatars from '../assets/avatar.jpg'
import bg from '../assets/background_profile.jpg';
import jwtDecode from 'jwt-decode';
import { getRegisteredSlots, getSlotTimeById, putStudentProfile } from '../api/auth-services';
import { Table, Pagination, Button, Modal, Form, Input } from 'antd';
import Column from 'antd/es/table/Column';

const User = () => {
    const [slotsdata, setSlotsdata] = useState([]);
    const [open, setOpen] = useState(false);
    const [userInfo,setUserInfo] = useState({nameInfo: '', password: '', email: ''} );
    const token = JSON.parse(sessionStorage.getItem("user"));
    const accessToken = token.accessToken;
    const [userName, setUserName] = useState('')
    const [pwd, setPwd] = useState('')
   



    async function fetchData() {
        try {
            const user = sessionStorage.getItem("user");
             let userProf = null;
            if (user) {
                userProf = jwtDecode(user);
            }
            setUserInfo(userProf)
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
    
    useEffect(() => {
        
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
    //Modal
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
      };

      const handleOk = async () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        try {
          const accessToken = user.accessToken;
            await putStudentProfile(userName,pwd,accessToken)
            // console.log(userName,pwd,accessToken)
            fetchData();
        } catch (error) {
          console.error('Error during slot creation:', error);
        }
      };

    return (
        <div className="user-container">
            <div className="user-banner">
                <img
                    src={bg}
                    alt="Banner"
                    className="banner-image"
                />
                <div className="user-avatar">
                    <img
                        src={avatars}
                        alt="User Avatar"
                        className="avatar-image"
                    />
                </div>
            </div>
            <div className="user-content">
                <div className="user-info">
                    <Button className='btn-edit-profile' onClick={showModal}>Edit Profile</Button>
                    <Modal
                        title=""
                        open={open}
                        onOk={handleOk}               
                        onCancel={handleCancel}
                    >
                        <>
                            <Form
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="horizontal"
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.Item label="Tên">
                                    <Input
                                        placeholder="Nguyen Van A,.."
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="Mật Khẩu">
                                    <Input
                                        placeholder="8-16 kí tự"
                                        value={pwd}
                                        onChange={(e) => setPwd(e.target.value)}
                                        maxlength="16" />
                                </Form.Item>
                            </Form>
                        </>
                        
                    </Modal>
                    <div className="user-details">
                        <h1 className="user-name">{userInfo.name}</h1>
                        <p className="user-email">{userInfo.email}</p>
                        <p className="user-bio">
                            {userInfo.role}
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
                                <Column title="Ngày" dataIndex="monthYear" key="monthYear" width="25%" />
                                <Column title="Nội dung" dataIndex="description" key="description" width="25%" />
                                <Column title="Khóa học" dataIndex={["courses", "name"]} key="course" width="25%" />
                                <Column
                                    title="Giờ"
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
