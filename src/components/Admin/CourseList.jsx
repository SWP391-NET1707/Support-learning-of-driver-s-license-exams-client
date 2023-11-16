import React, { useEffect, useState } from 'react';
import { DeleteCourseById, getCourse, postCourse, putCourseById } from '../../api/auth-services'; // Import API functions
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCourse, setEditCourse] = useState({
    id: 0,
    name: '',
    price: 0,
    duration: '',
    description: '',
    licenseId: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newCourseData, setNewCourseData] = useState({
    name: '',
    price: 0,
    duration: '',
    description: '',
    licenseId: 0,
  });

  const [editName, setEditName] = useState();

  const fetchCourseData = async () => {
    try {
      const courseData = await getCourse();
      setCourses(courseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const courseData = await getCourse();
        setCourses(courseData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  const handleAddCourse = async () => {
    // Validate the input
    if (!newCourseData.name || newCourseData.price === 0 || !newCourseData.duration || !newCourseData.description || newCourseData.licenseId === 0) {
      alert('Please fill in all fields');
      return;
    }

    // Send a POST request to add the course
    await postCourse(newCourseData.name, newCourseData.price, newCourseData.duration, newCourseData.description, newCourseData.licenseId);

    // Clear the form and hide the modal
    setNewCourseData({
      name: '',
      price: 0,
      duration: '',
      description: '',
      licenseId: 0,
    });

    setIsModalVisible(false);

    // Fetch the updated course data
    fetchCourseData();
  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditCourse(course);
    setEditName(course.name);
  };

  const handleSaveEdit = async () => {
    try {
      // Validate the input
      if (!editName || editCourse.price === 0 || !editCourse.duration || !editCourse.description || editCourse.licenseId === 0) {
        alert('Please fill in all fields');
        return;
      }

      // Send a PUT request to update the course
      await putCourseById(editCourse.id, editName, editCourse.price, editCourse.duration, editCourse.description, editCourse.licenseId);

      // Clear the edit state
      setIsEditing(false);
      setEditCourse({
        id: 0,
        name: '',
        price: 0,
        duration: '',
        description: '',
        licenseId: 0,
      });

      // Fetch the updated course data
      fetchCourseData();
    } catch (error) {
      console.error('Error during course update:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Filter out the course with the specified ID
      const updatedCourses = courses.filter((course) => course.id !== id);

      // Send a DELETE request to remove the course
      setCourses(updatedCourses);
      await DeleteCourseById(id);

      // Fetch the updated course data
      await fetchCourseData();
    } catch (error) {
      console.error('Error during course deletion:', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // If the input field is licenseId or price, parse it as a number
    if (name === 'licenseId' || name === 'price') {
      setNewCourseData({
        ...newCourseData,
        [name]: parseInt(value, 10),
      });
    } else {
      setNewCourseData({
        ...newCourseData,
        [name]: value,
      });
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
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
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.price}
              onChange={(e) =>
                setEditCourse({ ...editCourse, price: e.target.value })
              }
              type="number"
            />
          ) : (
            <span>{price}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.duration}
              onChange={(e) =>
                setEditCourse({ ...editCourse, duration: e.target.value })
              }
            />
          ) : (
            <span>{duration}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (description, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.description}
              onChange={(e) =>
                setEditCourse({ ...editCourse, description: e.target.value })
              }
            />
          ) : (
            <span>{description}</span>
          )}
        </span>
      ),
    },
    {
      title: 'License ID',
      dataIndex: 'licenseId',
      key: 'licenseId',
      render: (licenseId, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.licenseId}
              onChange={(e) =>
                setEditCourse({ ...editCourse, licenseId: e.target.value })
              }
              type="number"
            />
          ) : (
            <span>{licenseId}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>
                Save
              </Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(course)}>
                Edit
              </Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(course.id)}>
                Delete
              </Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} className="button-right">
        Add Course
      </Button>
      <Table columns={columns} dataSource={courses} />

      <Modal
        title="Add Course"
        visible={isModalVisible}
        onOk={handleAddCourse}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Name">
            <Input
              type="text"
              name="name"
              value={newCourseData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              type="number"
              name="price"
              value={newCourseData.price}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Duration">
            <Input
              type="text"
              name="duration"
              value={newCourseData.duration}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              type="text"
              name="description"
              value={newCourseData.description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="License ID">
            <Input
              type="number"
              name="licenseId"
              value={newCourseData.licenseId}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseList;
