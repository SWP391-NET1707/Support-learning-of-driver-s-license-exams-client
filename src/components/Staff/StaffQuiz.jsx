import React, { useEffect, useState } from 'react';
import { getQuizz, postQuizz, putQuizzById, deleteQuizzById, getQuestionInQuizz, updateQuestion, deleteQuestion, getLicense, postQuestion } from '../../api/auth-services'; // Import API functions
import { Button, Form, Input, Modal, Table, Select, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './tableStaf.css'
import { ViewArrayOutlined } from '@mui/icons-material';
import { margin } from '@mui/system';


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
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [isQuizEmpty, setIsQuizEmpty] = useState(true);
  const defaultLicense = licenses.find((license) => license.id === newQuizData.licenseId);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: '',
    licenseId: '',
    quizId: '',
  });
  const handleOpenAddQuestionModal = () => {
    setIsAddingQuestion(true);
  };

  const handleCloseAddQuestionModal = () => {
    setIsAddingQuestion(false);
  };
  const { Option } = Select;
  const handleAddQuestion = async () => {
    try {
      if (!newQuestion.content || !newQuestion.answer1 || !newQuestion.answer2 || !newQuestion.answer3 || !newQuestion.answer4 || !newQuestion.correctAnswer) {
        alert('Vui lòng điền đầy đủ thông tin câu hỏi.');
        return;
      }
      const answers = [
        newQuestion.answer1,
        newQuestion.answer2,
        newQuestion.answer3,
        newQuestion.answer4,
      ];
      if (!answers.includes(newQuestion.correctAnswer) && newQuestion.correctAnswer !== 'null') {
        alert('Đáp án đúng phải trùng với một trong các đáp án đã nhập khác "null".');
        return;
      }

      await postQuestion(accessToken, {
        content: newQuestion.content,
        answer1: newQuestion.answer1,
        answer2: newQuestion.answer2,
        answer3: newQuestion.answer3,
        answer4: newQuestion.answer4,
        correctAnswer: newQuestion.correctAnswer,
        licenseId: newQuestion.licenseId,
        quizId: newQuestion.quizId,
      });


      setNewQuestion({
        content: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: '',
        licenseId: '',
        quizId: '',
      });
      setIsAddingQuestion(false);

    } catch (error) {
      console.error('Lỗi khi thêm câu hỏi:', error);
    }
  };

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
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }
    const user = JSON.parse(sessionStorage.getItem("user"));
    const Token = user.accessToken;

    // Send a POST request to add the quiz (implement the postQuizz function)
    await postQuizz(newQuizData.name, newQuizData.licenseId, Token);
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
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }
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

      if (editedQuestion.id) {

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
        setCurrentQuestion(null);
        setIsViewingQuestions(true);
        setIsQuizEmpty(false);
      } else {
        setIsQuizEmpty(true);
        alert('Bài quiz này chưa có câu hỏi nào, hãy thêm câu hỏi cho bài quiz này')
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDeleteQuestion = async (questionId) => {
    try {

      await deleteQuestion(questionId, accessToken);


      setQuestions(questions.filter((question) => question.id !== questionId));
    } catch (error) {
      console.error('Error during question deletion:', error);
    }
  };
  const handleDelete = async (id) => {
    try {

      const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id);


      await deleteQuizzById(id, accessToken);

      setQuizzes(updatedQuizzes);

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

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Bằng lái',
      dataIndex: 'licenseId',
      key: 'licenseId',
      render: (licenseId, quiz) => (
        <span>
          {isEditing && editQuiz.id === quiz.id ? (
            <Select
              style={{ width: '100%' }}
              value={editedLicenseId}
              onChange={(value) => setEditedLicenseId(value)}
            >
              {licenses.map((license) => (
                <Select.Option key={license.id} value={license.id}>
                  {license.name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <span>{getLicenseNameById(licenseId)}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Tên bài quiz',
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
      title: 'Tác vụ',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, quiz) => (
        <span>
          {isEditing && editQuiz.id === quiz.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Lưu</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Huỷ</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(quiz)}>Chỉnh sửa</Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(quiz.id)}>Xoá bài Quiz</Button>
              <Button icon={<ViewArrayOutlined />} className="view-button" onClick={() => handleViewQuiz(quiz.id)}>Xem danh sách câu hỏi</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px' }}>
        <Button type="primary" onClick={handleOpenAddQuestionModal}>
          Thêm câu hỏi
        </Button>
        <Button type="primary" onClick={showModal}>
          Thêm bài Quiz
        </Button>
      </div>
      <Table columns={columns} dataSource={quizzes} />

      <Modal
        title="Thêm bài Quiz"
        visible={isModalVisible}
        onOk={handleAddQuiz}
        onCancel={handleCancel}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item label="Tên bài quiz">
                    <Input
                      type="text"
                      name="name"
                      value={newQuizData.name}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Loại bằng lái">
                    <Select
                      value={newQuizData.licenseId || (defaultLicense && defaultLicense.id)}
                      onChange={(value) =>
                        handleInputChange({ target: { name: 'licenseId', value } })
                      }
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
          </Col>
        </Row>
      </Modal>

      <Modal
        title={isEditingQuestion ? "Chỉnh sửa câu hỏi" : "Danh sách câu hỏi trong bài"}
        visible={isViewingQuestions}
        onCancel={() => {
          setIsEditingQuestion(false);
          setIsViewingQuestions(false);
        }}
        footer={
          isEditingQuestion ? (
            <Button
              icon={<SaveOutlined />}
              className="save-button"
              onClick={handleSaveEditQuestion}
            >
              Lưu
            </Button>
          ) : isQuizEmpty ? (
            <Button
              icon={<SaveOutlined />}
              onClick={handleOpenAddQuestionModal}
            >
              Thêm câu hỏi
            </Button>
          ) : (
            <Button
              icon={<SaveOutlined />}
              className="save-button"
              onClick={handleSaveEditQuestion}
            >
              Lưu
            </Button>
          )
        }
        width={1500}
      >
        {isEditingQuestion ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form layout="vertical">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item label="Nội dung câu hỏi">
                      <Input
                        type="text"
                        name="content"
                        value={editedQuestion.content}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, content: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Đáp án #1">
                      <Input
                        type="text"
                        name="answer1"
                        value={editedQuestion.answer1}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, answer1: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Đáp án #2">
                      <Input
                        type="text"
                        name="answer2"
                        value={editedQuestion.answer2}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, answer2: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Đáp án #3">
                      <Input
                        type="text"
                        name="answer3"
                        value={editedQuestion.answer3}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, answer3: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Đáp án #4">
                      <Input
                        type="text"
                        name="answer4"
                        value={editedQuestion.answer4}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, answer4: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Đáp án đúng">
                      <Input
                        type="text"
                        name="correctAnswer"
                        value={editedQuestion.correctAnswer}
                        onChange={(e) =>
                          setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Loại bằng lái">
                      <Select
                        value={editedQuestion.licenseId}
                        onChange={(value) =>
                          setEditedQuestion({ ...editedQuestion, licenseId: value })
                        }
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
            </Col>
          </Row>
        ) : (
          <div>
            {isViewingQuestions ? (
              <Table
                dataSource={questions}
                columns={[
                  {
                    title: "ID câu hỏi",
                    dataIndex: "id",
                    key: "id",
                  },
                  {
                    title: "Nội dung câu hỏi",
                    dataIndex: "content",
                    key: "content",
                  },
                  {
                    title: "Đáp án #1",
                    dataIndex: "answer1",
                    key: "answer1",
                  },
                  {
                    title: "Đáp án #2",
                    dataIndex: "answer2",
                    key: "answer2",
                  },
                  {
                    title: "Đáp án #3",
                    dataIndex: "answer3",
                    key: "answer3",
                    render: (text) => (text !== 'null' ? text : 'Không có đáp án'),
                  },
                  {
                    title: "Đáp án #4",
                    dataIndex: "answer4",
                    key: "answer4",
                    render: (text) => (text !== 'null' ? text : 'Không có đáp án'),
                  },
                  {
                    title: "Đáp án đúng",
                    dataIndex: "correctAnswer",
                    key: "correctAnswer",
                  },
                  {
                    title: "Loại bằng lái",
                    dataIndex: "licenseId",
                    key: "licenseId",
                    render: (licenseId, question) => (
                      <span>{getLicenseNameById(licenseId)}</span>
                    ),
                  },
                  {
                    title: "Tác vụ",
                    dataIndex: "actions",
                    key: "actions",
                    render: (text, question) => (
                      <span>
                        <Button
                          icon={<EditOutlined />}
                          className="edit-button"
                          onClick={() => handleEditQuestion(question)}
                          style={{ width: '125px' }}
                        >
                          Chỉnh sửa
                        </Button>
                        <Button
                          icon={<DeleteOutlined />}
                          className="delete-button"
                          onClick={() => handleDeleteQuestion(question.id)}
                          style={{ width: '125px' }}
                        >
                          Xoá
                        </Button>
                      </span>
                    ),
                  },
                ]}
              />
            ) : (
              <p>Bài quiz không có câu hỏi</p>
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="Thêm câu hỏi"
        visible={isAddingQuestion}
        onCancel={handleCloseAddQuestionModal}
        footer={
          <Button
            icon={<SaveOutlined />}
            className="save-button"
            onClick={handleAddQuestion}
          >
            Save
          </Button>
        }
        width={1500}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form layout="vertical">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Form.Item label="Nội dung câu hỏi">
                    <Input
                      type="text"
                      name="content"
                      value={newQuestion.content}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, content: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Đáp án #1">
                    <Input
                      type="text"
                      name="answer1"
                      value={newQuestion.answer1}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, answer1: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Đáp án #2">
                    <Input
                      type="text"
                      name="answer2"
                      value={newQuestion.answer2}
                      onChange={(e) =>
                        setNewQuestion({ ...newQuestion, answer2: e.target.value })
                      }
                    />
                  </Form.Item>
                </Col>
                {newQuestion.answer3 !== null && (
                  <Col span={12}>
                    <Form.Item label="Đáp án #3">
                      <Input
                        placeholder='Nếu câu hỏi không có đáp án #3, vui lòng điền null'
                        type="text"
                        name="answer3"
                        value={newQuestion.answer3}
                        onChange={(e) =>
                          setNewQuestion({ ...newQuestion, answer3: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                )}
                {newQuestion.answer4 !== null && (
                  <Col span={12}>
                    <Form.Item label="Đáp án #4">
                      <Input
                        placeholder='Nếu câu hỏi không có đáp án #4, vui lòng điền null'
                        type="text"
                        name="answer4"
                        value={newQuestion.answer4}
                        onChange={(e) =>
                          setNewQuestion({ ...newQuestion, answer4: e.target.value })
                        }
                      />
                    </Form.Item>
                  </Col>
                )}
                <Col span={24}>
                  <Form.Item label="Đáp án đúng">
                    <Select
                      value={newQuestion.correctAnswer}
                      onChange={(value) =>
                        setNewQuestion({ ...newQuestion, correctAnswer: value })
                      }
                    >
                      <Select.Option value="1">1</Select.Option>
                      <Select.Option value="2">2</Select.Option>
                      <Select.Option value="3">3</Select.Option>
                      <Select.Option value="4">4</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Loại bằng lái">
                    <Select
                      value={newQuestion.licenseId}
                      onChange={(value) =>
                        setNewQuestion({ ...newQuestion, licenseId: value })
                      }
                    >
                      {licenses.map((license) => (
                        <Select.Option key={license.id} value={license.id}>
                          {license.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Tên bài quiz">
                    <Select
                      value={newQuestion.quizId}
                      onChange={(value) =>
                        setNewQuestion({ ...newQuestion, quizId: value })
                      }
                    >
                      {quizzes.map((quiz) => (
                        <Select.Option key={quiz.id} value={quiz.id}>
                          {quiz.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default StaffQuiz;
