import React, { useEffect, useState } from 'react';
import { DeleteMentorbyID, getMentor, postMentor, putMentorById, getLicense } from '../../api/auth-services'; // Import API functions
import { Button, Checkbox, Form, Input, Modal, Table, Select, Row, Col } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Mentor = () => {
  const [mentors, setMentors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMentor, setEditMentor] = useState({ id: 0, name: '', email: '', password: '', mentorLicenseID: [] });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState([]);
  const [licensesUpdate, setLicensesUpdate] = useState([]);
  const [editedLicenseId, setEditedLicenseId] = useState([]);
  const fetchLicenseData = async () => {
    try {
      const licenseData = await getLicense(accessToken);
      setLicenses(licenseData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLicenseData();
  }, []);
  const fetchLicenseUpdateData = async () => {
    try {
      const licenseData = await getLicense(accessToken);
      setLicensesUpdate(licenseData);
      // console.log(licenseData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLicenseUpdateData();
  }, []);
  const getLicenseNameById = (licenseId) => {
    const license = licenses.find((license) => license.id === licenseId);
    return license ? license.name : 'Không rõ';
  };

  const getLicenseNameById2 = (licenseId) => {
    const licenseUpdate = licensesUpdate.find((licenseUpdate) => licenseUpdate.id === licenseId);
    return licenseUpdate ? licenseUpdate.name : 'Không rõ';
  };

  const [newMentorData, setNewMentorData] = useState({
    name: '',
    email: '',
    password: '',
    mentorLicenseId: [],
    active: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editActive, setEditActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [mentorsPerPage] = useState(10);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken;

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const fetchMentorData = async () => {
    try {
      const mentorData = await getMentor();
      setMentors(mentorData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to fetch mentor data
  useEffect(() => {
    async function fetchData() {
      try {
        const mentorData = await getMentor();
        setMentors(mentorData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  // Function to handle adding a new mentor
  const handleAddMentor = async () => {
    // Validate the input
    if (!newMentorData.name || !newMentorData.email || !newMentorData.password || !newMentorData.mentorLicenseId) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    // let mentorLicenseIDArray = [];
  
  // if (typeof newMentorData.mentorLicenseId === 'number' ) {
  //   mentorLicenseIDArray.push(newMentorData.mentorLicenseId);
  // } else {
  //   console.error("type of value error");
  // }
   
    await postMentor(newMentorData.name, newMentorData.email, newMentorData.password, newMentorData.mentorLicenseId, accessToken);
   
    setNewMentorData({
      name: '',
      email: '',
      password: '',
      mentorLicenseID: [],
      active: true,
    });

    setIsModalVisible(false);

    fetchMentorData();
  };

  const handleEdit = (mentor) => {
    setIsEditing(true);
    setEditMentor(mentor);
    setEditName(mentor.name);
    setEditActive(mentor.active);
    setEditedLicenseId(mentor.mentorLicenseId)
  };

  const handleSaveEdit = async () => {
    try {
      
      if (!editName || !editMentor.email || !editMentor.password || !editMentor.mentorLicenseID) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }
      
      await putMentorById(editMentor.id, editName, editMentor.password, editActive, editMentor.mentorLicenseID, accessToken);

      setIsEditing(false);
      await fetchMentorData();
      setEditMentor({ id: 0, name: '', email: '', password: '', mentorLicenseID: [] });

    } catch (error) {
      console.error('Error during mentor update:', error);
    }
  };


  // Function to handle deleting a mentor
  // const handleDelete = async (id) => {
  //   try {
  //     // Filter out the mentor with the specified ID
  //     const updatedMentors = mentors.filter((mentor) => mentor.id !== id);

  //     // Send a DELETE request to remove the mentor (implement the deleteMentorById function)


  //     setMentors(updatedMentors);
  //     await DeleteMentorbyID(id, accessToken);
  //     await fetchMentorData();
  //   } catch (error) {
  //     console.error('Error during mentor deletion:', error);
  //   }
  // };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const SelectField = React.memo(({ value, onChange, licensesUpdate }) => (
    <Select
      mode="multiple"
      value={value}
      onChange={onChange}
      style={{ width: '100%' }}
    >
      {licensesUpdate.map((license) => (
        <Select.Option key={license.id} value={license.id}>
          {getLicenseNameById2(license.id)}
        </Select.Option>
      ))}
    </Select>
  ));
  

  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = mentors.slice(indexOfFirstMentor, indexOfLastMentor);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Tên giảng viên',
      dataIndex: 'name',
      key: 'name',
      render: (name, mentor) => (
        <span>
          {isEditing && editMentor.id === mentor.id ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          ) : (
            <span>{name}</span>
          )}
        </span>
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Mật khẩu',
      dataIndex: 'password',
      key: 'password',
      render: (password, mentor) => (
        <span>
          {isEditing && editMentor.id === mentor.id ? (
            <input
              type="text"
              value={editMentor.password}
              onChange={(e) => setEditMentor({ ...editMentor, password: e.target.value })}
            />
          ) : (
            <span className="password-hidden">
              {passwordVisible ? (
                <span>
                  {password} <EyeInvisibleOutlined onClick={() => handleTogglePasswordVisibility()} />
                </span>
              ) : (
                <span>
                  ******** <EyeOutlined onClick={() => handleTogglePasswordVisibility()} />
                </span>
              )}
            </span>
          )}
        </span>
      ),
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'active',
      key: 'active',
      render: (active, mentor) => (
        <span>
          {isEditing && editMentor.id === mentor.id ? (
            <Checkbox
              checked={editActive}
              onChange={(e) => setEditActive(e.target.checked)}
            />
          ) : (
            <span>{active ? 'Còn hợp đồng' : 'Hết hợp đồng'}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Bằng lái giảng viên',
      dataIndex: 'mentorLicenses',
      key: 'mentorLicenses',
      render: (licenses, mentor) => {
        if (isEditing && editMentor.id === mentor.id) {
          return (
            <SelectField
              mode="multiple"
              value={editMentor.mentorLicenseID}
              onChange={(value) => setEditMentor({ ...editMentor, mentorLicenseID: value })}
              licensesUpdate={licensesUpdate}
            />
          );
        } else {
          const licenseNames = licenses.map((license) => getLicenseNameById(license.licenseId)).join(', ');
          return licenseNames;
        }
      },
    },
    {
      title: 'Tác vụ',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, mentor) => (
        <span>
          {isEditing && editMentor.id === mentor.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Lưu</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Huỷ</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(mentor)}>Chỉnh sửa</Button>
              {/* <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(mentor.id)}>Xoá giảng viên</Button> */}
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} className="button-right">
        Thêm giảng viên
      </Button>
      <Table columns={columns} dataSource={currentMentors} />

      <Modal
  title="Thêm giảng viên"
  visible={isModalVisible}
  onOk={handleAddMentor}
  onCancel={handleCancel}
>
  <Form layout="vertical">
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Form.Item label="Tên giảng viên">
          <Input
            type="text"
            name="name"
            value={newMentorData.name}
            onChange={(e) => setNewMentorData({ ...newMentorData, name: e.target.value })}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Email">
          <Input
            type="email"
            name="email"
            value={newMentorData.email}
            onChange={(e) => setNewMentorData({ ...newMentorData, email: e.target.value })}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Mật khẩu">
          <Input
            type="password"
            name="password"
            value={newMentorData.password}
            onChange={(e) => setNewMentorData({ ...newMentorData, password: e.target.value })}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Bằng lái giảng viên">
          <Select
            mode="multiple"
            value={newMentorData.mentorLicenseId}
            onChange={(value) => setNewMentorData({ ...newMentorData, mentorLicenseId: value })}
            style={{ width: '100%' }}
          >
            {licenses.map((license) => (
              <Select.Option key={license.id} value={license.id}>
                {license.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Modal>
    </div>
  );

};

export default Mentor;
