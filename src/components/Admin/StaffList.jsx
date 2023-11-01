import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Modal, Table } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { EditOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

// Replace these with your actual API functions
import { postStaff, getStaff, putStaff } from '../../api/auth-services';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editStaff, setEditStaff] = useState({ id: 0, name: '', email: '', password: '', active: false });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStaffData, setNewStaffData] = useState({
    name: '',
    email: '',
    password: '',
    active: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editName, setEditName] = useState('');
  const [editActive, setEditActive] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const staffPerPage = 10; // Adjust as needed
  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken;

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const fetchStaffData = async () => {
    try {
      const staffData = await getStaff(accessToken);
      setStaff(staffData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch staff data when the component mounts
    fetchStaffData();
  }, []);

  const handleAddStaff = async () => {
    if (!newStaffData.name || !newStaffData.email || !newStaffData.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await postStaff(accessToken, newStaffData.name, newStaffData.email, newStaffData.password);
      // Handle the response or perform any necessary actions
      console.log(response);

      setNewStaffData({
        name: '',
        email: '',
        password: '',
        active: false,
      });

      setIsModalVisible(false);

      fetchStaffData();
    } catch (error) {
      console.error('Error during staff member creation:', error);
    }
  };

  const handleEdit = (staffMember) => {
    setIsEditing(true);
    setEditStaff(staffMember);
    setEditName(staffMember.name);
    setEditActive(staffMember.active);
  };

  const handleSaveEdit = async () => {
    try {
      if (!editName || !editStaff.email || !editStaff.password) {
        alert('Please fill in all fields');
        return;
      }

      const updatedStaff = {
        id: editStaff.id,
        name: editName,
        email: editStaff.email,
        password: editStaff.password,
        active: editActive,
      };

      const response = await putStaff(accessToken, updatedStaff.id, updatedStaff.name, updatedStaff.password, updatedStaff.active);

      // Handle the response or perform any necessary actions
      console.log(response);

      setIsEditing(false);
      setEditStaff({ id: 0, name: '', email: '', password: '', active: false });

      fetchStaffData();
    } catch (error) {
      console.error('Error during staff update:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setNewStaffData({
      ...newStaffData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = staff.slice(indexOfFirstStaff, indexOfLastStaff);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, staffMember) => (
        <span>
          {isEditing && editStaff.id === staffMember.id ? (
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
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      render: (password, staffMember) => (
        <span>
          {isEditing && editStaff.id === staffMember.id ? (
            <input
              type="text"
              value={editStaff.password}
              onChange={(e) => setEditStaff({ ...editStaff, password: e.target.value })}
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
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active, staffMember) => (
        <span>
          {isEditing && editStaff.id === staffMember.id ? (
            <Checkbox
              checked={editActive}
              onChange={(e) => setEditActive(e.target.checked)}
            />
          ) : (
            <span>{active ? 'Active' : 'Inactive'}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, staffMember) => (
        <span>
          {isEditing && editStaff.id === staffMember.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Save</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(staffMember)}>Edit</Button>
              {/* Delete button removed */}
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} className="button-right">
        Add Staff
      </Button>
      <Table columns={columns} dataSource={currentStaff} />

      <Modal
        title="Add Staff Member"
        visible={isModalVisible}
        onOk={handleAddStaff}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              name="name"
              value={newStaffData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              name="email"
              value={newStaffData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              type="password"
              name="password"
              value={newStaffData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Active">
            <Checkbox
              name="active"
              checked={newStaffData.active}
              onChange={handleInputChange}
            >
              Is Active
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffList;
