import React, { useEffect, useState } from 'react';
import { getQuizz, postQuizz, putQuizzById, deleteQuizzById, getQuestionInQuizz, updateQuestion, deleteQuestion, getLicense } from '../../api/auth-services'; // Import API functions
import { Button, Form, Input, Modal, Table, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './tableStaf.css'
import { ViewArrayOutlined } from '@mui/icons-material';


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
  const [questions, setQuestions] = useState([]);
  const [isViewingQuestions, setIsViewingQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState([]);
  const {Option} = Select;
  
const [editedQuestion, setEditedQuestion] = useState({
  id: null,
  content: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  correctAnswer: '',
  licenseId: '',
  quizId: ''
});
const fetchLicenseData = async () => {
  try {
    const licenseData = await getLicense(accessToken);
    setLicenses(licenseData);
    console.log(licenseData);
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
  const handleEditQuestion = (question) => {
    setCurrentQuestion(question);
    setEditedQuestion({
      id: question.id,
      content: question.content,
      answer1: question.answer1,
      answer2: question.answer2,
      answer3: question.answer3,
      answer4: question.answer4,
      correctAnswer: question.correctAnswer,
      licenseId: question.licenseId,
      quizId: question.quizId,
    });
    setIsEditingQuestion(true);
  };

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
  const handleSaveEditQuestion = async () => {
    try {
      // Kiểm tra xem thông tin câu hỏi đã thay đổi
      if (editedQuestion.id) {
        // Gọi API để cập nhật câu hỏi
        await updateQuestion(editedQuestion.id, accessToken, {
          content: editedQuestion.content,
          answer1: editedQuestion.answer1,
          answer2: editedQuestion.answer2,
          answer3: editedQuestion.answer3,
          answer4: editedQuestion.answer4,
          correctAnswer: editedQuestion.correctAnswer,
          licenseId: editedQuestion.licenseId,
          quizId: editedQuestion.quizId,
        });
  
        // Cập nhật thông tin câu hỏi trong danh sách hiện tại
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === editedQuestion.id ? { ...question, ...editedQuestion } : question
          )
        );
  
        setIsEditingQuestion(false); // Kết thúc chỉnh sửa
        alert('Cập nhật câu hỏi thành công');
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật câu hỏi:', error);
    }
  };
  const handleViewQuiz = async (id) => {
    try {
      const questionData = await getQuestionInQuizz(id, accessToken);
      if (questionData && questionData.length > 0) {
        setQuestions(questionData);
        setCurrentQuestion(null); // Reset current question
        setIsViewingQuestions(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    try {
      // Gọi hàm xóa câu hỏi từ API
      await deleteQuestion(questionId, accessToken);

      // Xóa câu hỏi khỏi danh sách hiện tại
      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      console.error('Error during question deletion:', error);
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
      title: 'License',
      dataIndex: 'licenseId',
      key: 'licenseId',
      render: (licenseId, quiz) => (
        <span>
          {isEditing && editQuiz.id === quiz.id ? (
            <Input
              type="text" 
              value={getLicenseNameById(editedLicenseId)} 
              onChange={handleLicenseIdChange}
            />
          ) : (
            <span>{getLicenseNameById(licenseId)}</span> 
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
              <Button icon={<ViewArrayOutlined />} className="view-button" onClick={() => handleViewQuiz(quiz.id)}>View questions</Button>
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
        <Modal
          title="Questions in Quiz"
          visible={isViewingQuestions}
          onCancel={() => setIsViewingQuestions(false)}
          footer={null}
        >
          {questions.map((question) => (
            <div key={question.id}>{question.text}</div>
          ))}
        </Modal>
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              name="name"
              value={newQuizData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="License">
  <Select
    value={newQuizData.licenseId}
    onChange={(value) => handleInputChange({ target: { name: 'licenseId', value } })}
  >
    {licenses.map((license) => (
  <Option key={license.id} value={license.id}>
    {license.name}
  </Option>
))}
  </Select>
</Form.Item>
        </Form>
      </Modal>
      <Modal
  title={isEditingQuestion ? "Edit Question" : "Questions in Quiz"}
  visible={isViewingQuestions}
  onCancel={() => setIsViewingQuestions(false)}
  footer={null}
  width={1500} // Đặt độ rộng mới cho modal
>
  {isEditingQuestion ? ( // Nếu đang chỉnh sửa câu hỏi
    <div>
      <Form>
        <Form.Item label="Content">
          <Input
            type="text"
            name="content"
            value={editedQuestion.content}
            onChange={(e) =>
              setEditedQuestion({ ...editedQuestion, content: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Answer 1">
          <Input
            type="text"
            name="answer1"
            value={editedQuestion.answer1}
            onChange={(e) =>
              setEditedQuestion({ ...editedQuestion, answer1: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Answer 2">
          <Input
            type="text"
            name="answer2"
            value={editedQuestion.answer2}
            onChange={(e) =>
              setEditedQuestion({ ...editedQuestion, answer2: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Answer 3">
          <Input
            type="text"
            name="answer3"
            value={editedQuestion.answer3}
            onChange={(e) =>
              setEditedQuestion({ ...editedQuestion, answer3: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Answer 4">
          <Input
            type="text"
            name="answer4"
            value={editedQuestion.answer4}
            onChange={(e) =>
              setEditedQuestion({ ...editedQuestion, answer4: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Correct Answer">
    <Input
      type="number"
      name="correctAnswer"
      value={editedQuestion.correctAnswer}
      onChange={(e) =>
        setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })
      }
    />
  </Form.Item>
        <Form.Item>
          <Button
            icon={<SaveOutlined />}
            className="save-button"
            onClick={handleSaveEditQuestion}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <div>
      {questions && questions.length > 0 ? (
        <Table
          dataSource={questions}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Content",
              dataIndex: "content",
              key: "content",
            },
            {
              title: "Answer 1",
              dataIndex: "answer1",
              key: "answer1",
            },
            {
              title: "Answer 2",
              dataIndex: "answer2",
              key: "answer2",
            },
            {
              title: "Answer 3",
              dataIndex: "answer3",
              key: "answer3",
            },
            {
              title: "Answer 4",
              dataIndex: "answer4",
              key: "answer4",
            },
            {
              title: "Correct answer",
              dataIndex: "correctAnswer",
              key: "correctAnswer",
            },
            {
              title: "License",
              dataIndex: "licenseId",
              key: "licenseId",
              render: (licenseId, question) => (
                <span>
                  {getLicenseNameById(licenseId)}
                </span>
              ),
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              render: (text, question) => (
                <span>
                  <Button
                    icon={<EditOutlined />}
                    className="edit-button"
                    onClick={() => handleEditQuestion(question)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon={<DeleteOutlined />}
                    className="delete-button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    Delete
                  </Button>
                </span>
              ),
            },
          ]}
        />
      ) : (
        <p>No questions available.</p>
      )}
    </div>
  )}
</Modal>
    </div>
  );
};

export default StaffQuiz;
