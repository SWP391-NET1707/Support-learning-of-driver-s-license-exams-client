import React, { useEffect, useState } from 'react';
import { getCourse, postCourse, putCourseById, deleteCourseById, DeleteCourseById,getLicense } from '../../api/auth-services'; // Import API functions
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const StaffCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editedLicenseId, setEditedLicenseId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editCourse, setEditCourse] = useState({ id: 0, name: '', price: 0, duration: '', description: '', licenseId: 0 });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCourseData, setNewCourseData] = useState({
    name: '',
    price: 0,
    duration: '',
    description: '',
    licenseId: 0,
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

  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(10);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken;
  
  const fetchCourseData = async () => {
    try {
      const courseData = await getCourse(accessToken);
      setCourses(courseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const handleAddCourse = async () => {
    // Send a POST request to add the course (implement the postCourse function)
    await postCourse(newCourseData.name, newCourseData.price, newCourseData.duration, newCourseData.description, newCourseData.licenseId, accessToken);

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
  const handleLicenseIdChange = (e) => {
    const value = e.target.value;
    setEditedLicenseId(value); // Update the edited License ID

  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditCourse(course);
  };

  const handleSaveEdit = async () => {
    // Send a PUT request to update the course
    await putCourseById(editCourse.id, editCourse.name, editCourse.price, editCourse.duration, editCourse.description, editCourse.licenseId, accessToken);

    // Clear the edit state
    setIsEditing(false);
    setEditCourse({ id: 0, name: '', price: 0, duration: '', description: '', licenseId: 0 });

    fetchCourseData();
  };

  const handleDelete = async (id) => {
    // Filter out the course with the specified ID
    const updatedCourses = courses.filter((course) => course.id !== id);

    // Send a DELETE request to remove the course (implement the deleteCourseById function)
    await DeleteCourseById(id, accessToken);

    setCourses(updatedCourses);

    fetchCourseData();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewCourseData({
      ...newCourseData,
      [name]: value,
    });
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Tên khoá học',
      dataIndex: 'name',
      key: 'name',
      render: (name, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.name}
              onChange={(e) => setEditCourse({ ...editCourse, name: e.target.value })}
            />
          ) : (
            <span>{name}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Tổng giá',
      dataIndex: 'price',
      key: 'price',
      render: (price, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              type="number"
              value={editCourse.price}
              onChange={(e) => setEditCourse({ ...editCourse, price: e.target.value })}
            />
          ) : (
            <span>{price}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Thời lượng',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.duration}
              onChange={(e) => setEditCourse({ ...editCourse, duration: e.target.value })}
            />
          ) : (
            <span>{duration}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (description, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              value={editCourse.description}
              onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
            />
          ) : (
            <span>{description}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Loại bằng lái',
      dataIndex: 'licenseId',
      key: 'licenseId',
      render: (licenseId, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <Input
              type="text"
              value={getLicenseNameById(editCourse.licenseId)}
              onChange={handleLicenseIdChange}
            />
          ) : (
            <span>{getLicenseNameById(licenseId)}</span>
          )}
        </span>
      ),
    },
    {
      title: 'Tác vụ',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, course) => (
        <span>
          {isEditing && editCourse.id === course.id ? (
            <>
              <Button icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Lưu</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Huỷ</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button" onClick={() => handleEdit(course)}>Chỉnh sửa</Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(course.id)}>Xoá khoá học</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={showModal} className="button-right">
        Thêm khoá học
      </Button>
      <Table columns={columns} dataSource={currentCourses} />

      <Modal
        title="Thêm khoá học"
        visible={isModalVisible}
        onOk={handleAddCourse}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Tên khoá học">
            <Input
              type="text"
              name="name"
              value={newCourseData.name}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Tổng giá">
            <Input
              type="number"
              name="price"
              value={newCourseData.price}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Thời lượng">
            <Input
              type="text"
              name="duration"
              value={newCourseData.duration}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input
              type="text"
              name="description"
              value={newCourseData.description}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item label="Loại băng lái">
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

export default StaffCourse;
