import React, { useEffect, useState } from 'react';
import { DeleteMentorbyID, getMentor, postMentor, putMentorById, getLicense } from '../../api/auth-services'; // Import API functions
import { Button, Checkbox, Form, Input, Modal, Table } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Mentor = () => {
  const [mentors, setMentors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editMentor, setEditMentor] = useState({ id: 0, name: '', email: '', password: '', mentorLicenseID: 0 });
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState([]);
  const [editedLicenseId, setEditedLicenseId] = useState(0);
  const fetchLicenseData = async () => {
    try {
      const licenseData = await getLicense(accessToken);
      setLicenses(licenseData);
      // console.log(licenseData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLicenseData();
  }, []);
  const getLicenseNameById = (licenseId) => {
    const license = licenses.find((license) => license.id === licenseId);
    return license ? license.name : 'Unknown';
  };

  const [newMentorData, setNewMentorData] = useState({
    name: '',
    email: '',
    password: '',
    mentorLicenseId: '',
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
      alert('Please fill in all fields');
      return;
    }
    const mentorLicenseIDArray = newMentorData.mentorLicenseId.split(',').map(item => item.trim());
    // Send a POST request to add the mentor (implement the postMentor function)
    await postMentor(newMentorData.name, newMentorData.email, newMentorData.password, mentorLicenseIDArray, accessToken);

    // Clear the form and hide the modal
    setNewMentorData({
      name: '',
      email: '',
      password: '',
      mentorLicenseID: 0,
      active: false,
    });

    setIsModalVisible(false);

    // Fetch the updated mentor data
    fetchMentorData();
  };

  // Function to handle editing a mentor
  const handleEdit = (mentor) => {
    setIsEditing(true);
    setEditMentor(mentor);
    setEditName(mentor.name);
    setEditActive(mentor.active);


  };

  const handleSaveEdit = async () => {
    try {
      // Validate the input
      if (!editName || !editMentor.email || !editMentor.password || !editMentor.mentorLicenseID) {
        alert('Please fill in all fields');
        return;
      }

      const updatedMentor = {
        id: editMentor.id,
        name: editName,
        email: editMentor.email,
        password: editMentor.password,
        active: editActive,
        mentorLicenseID: editMentor.mentorLicenseID,
      };
      // console.log(updatedMentor)
      // Send a PUT request to update the mentor
      await putMentorById(editMentor.id, editName, editMentor.password, editActive, editMentor.mentorLicenseID, accessToken);

      // Clear the edit state
      setIsEditing(false);
      await fetchMentorData();
      setEditMentor({ id: 0, name: '', email: '', password: '', mentorLicenseID: 0 });

    } catch (error) {
      console.error('Error during mentor update:', error);
    }
  };


  // Function to handle deleting a mentor
  const handleDelete = async (id) => {
    try {
      // Filter out the mentor with the specified ID
      const updatedMentors = mentors.filter((mentor) => mentor.id !== id);

      // Send a DELETE request to remove the mentor (implement the deleteMentorById function)


      setMentors(updatedMentors);
      await DeleteMentorbyID(id, accessToken);
      await fetchMentorData();
    } catch (error) {
      console.error('Error during mentor deletion:', error);
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

    // If the input field is mentorLicenseID, just store it as a string
    if (name === 'mentorLicenseID') {
      setNewMentorData({
        ...newMentorData,
        mentorLicenseId: value,
      });
    } else {
      setNewMentorData({
        ...newMentorData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };
  const handleLicenseIdChange = (e) => {
    const value = e.target.value;
    setEditedLicenseId(value); // Update the edited License ID

  };


  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = mentors.slice(indexOfFirstMentor, indexOfLastMentor);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
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
      title: 'Password',
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
      title: 'Active',
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
            <span>{active ? 'Active' : 'Inactive'}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Mentor License',
      dataIndex: 'mentorLicenses',
      key: 'mentorLicenses',
      render: (licenses, mentor) => {
        if (isEditing && editMentor.id === mentor.id) {
          return (
            <input
              type="text"
              value={getLicenseNameById(editMentor.mentorLicenseID)}
              onChange={(e) => setEditMentor({ ...editMentor, mentorLicenseID: parseInt(e.target.value, 10) })}
            />
          );
        } else {
          const licenseNames = licenses.map((license) => getLicenseNameById(license.licenseId)).join(', ');
          return licenseNames;
        }
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, mentor) => (
        <span>
          {isEditing && editMentor.id === mentor.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Save</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(mentor)}>Edit</Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(mentor.id)}>Delete</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} className="button-right">
        Add Mentor
      </Button>
      <Table columns={columns} dataSource={currentMentors} />

      <Modal
        title="Add Mentor"
        visible={isModalVisible}
        onOk={handleAddMentor}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              name="name"
              value={newMentorData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              name="email"
              value={newMentorData.email}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Password">
            <Input
              type="password"
              name="password"
              value={newMentorData.password}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Mentor License ID">
            <Input
              type="text"
              name="mentorLicenseID"
              value={newMentorData.mentorLicenseId}
              onChange={handleInputChange}
            />
          </Form.Item>
          {/* <Form.Item label="Active">
            <Checkbox
              name="active"
              checked={newMentorData.active}
              onChange={handleInputChange}
            >
              Is Active
            </Checkbox>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );

};

export default Mentor;
