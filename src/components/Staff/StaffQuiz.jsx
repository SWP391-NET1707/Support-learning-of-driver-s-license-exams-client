import React, { useEffect, useState } from 'react';
import { getQuizz, postQuizz, putQuizzById, deleteQuizzById } from '../../api/auth-services'; // Import API functions
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './tableStaf.css'


const StaffQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editQuiz, setEditQuiz] = useState({ id: 0, name: '', licenseId: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newQuizData, setNewQuizData] = useState({
    name: '',
    licenseId: 0,
  });
  const [editedLicenseId, setEditedLicenseId] = useState(0);


  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken;

  const fetchQuizData = async () => {
    try {
      const quizData = await getQuizz(accessToken);
      setQuizzes(quizData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, []);

  const handleAddQuiz = async () => {
    // Validate the input
    if (!newQuizData.name || !newQuizData.licenseId) {
      alert('Please fill in all fields');
      return;
    }

    // Send a POST request to add the quiz (implement the postQuizz function)
    await postQuizz(newQuizData.name, newQuizData.licenseId, accessToken);

    // Clear the form and hide the modal
    setNewQuizData({
      name: '',
      licenseId: 0,
    });

    setIsModalVisible(false);

    // Fetch the updated quiz data
    fetchQuizData();
  };

  const handleEdit = (quiz) => {
    setIsEditing(true);
    setEditQuiz(quiz);
    setEditedLicenseId(quiz.licenseId);
  };

  const handleSaveEdit = async () => {
    try {
      // Validate the input
      if (!editQuiz.name || !editQuiz.licenseId) {
        alert('Please fill in all fields');
        return;
      }
      console.log(editQuiz.id, editQuiz.name, editQuiz.licenseId,)
      // Send a PUT request to update the quiz
      await putQuizzById(editQuiz.id, editQuiz.name, editedLicenseId, accessToken);

      // Clear the edit state
      setIsEditing(false);
      setEditQuiz({ id: 0, name: '', licenseId: 0 });

      // Fetch the updated quiz data
      fetchQuizData();
    } catch (error) {
      console.error('Error during quiz update:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Filter out the quiz with the specified ID
      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);

      // Send a DELETE request to remove the quiz (implement the deleteQuizzById function)
      await deleteQuizzById(id, accessToken);

      setQuizzes(updatedQuizzes);

      // Fetch the updated quiz data
      fetchQuizData();
    } catch (error) {
      console.error('Error during quiz deletion:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewQuizData({
      ...newQuizData,
      [name]: value,
    });
  };

  const handleLicenseIdChange = (e) => {
    const value = e.target.value;
    setEditedLicenseId(value); // Update the edited License ID
    
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'License ID',
      dataIndex: 'licenseId',
      key: 'licenseId',
      render: (licenseId, quiz) => (
        <span>
          {isEditing && editQuiz.id === quiz.id ? (
            <Input
              type="number"
              value={editedLicenseId} // Use the editedLicenseId state
              onChange={handleLicenseIdChange}
            />
          ) : (
            <span>{licenseId}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, quiz) => (
        <span>
          {isEditing && editQuiz.id === quiz.id ? (
            <Input
              value={editQuiz.name}
              onChange={(e) => setEditQuiz({ ...editQuiz, name: e.target.value })}
            />
          ) : (
            <span>{name}</span>
          )}
        </span>
      ),
    },
    
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, quiz) => (
        <span>
          {isEditing && editQuiz.id === quiz.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Save</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(quiz)}>Edit</Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(quiz.id)}>Delete</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} className="button-right">
        Add Quiz
      </Button>
      <Table columns={columns} dataSource={quizzes} />

      <Modal
        title="Add Quiz"
        visible={isModalVisible}
        onOk={handleAddQuiz}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              name="name"
              value={newQuizData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="License ID">
            <Input
              type="number"
              name="licenseId"
              value={newQuizData.licenseId}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffQuiz;
