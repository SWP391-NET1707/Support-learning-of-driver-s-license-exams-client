import React, { useEffect, useState } from 'react';
import { getCourse, postCourse, putCourseById, deleteCourseById, DeleteCourseById, getLicense } from '../../api/auth-services'; // Import API functions
import { Button, Form, Input, Modal, Select, Table, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';

const StaffCourse = () => {
  const [courses, setCourses] = useState([]);
  const [editedLicenseId, setEditedLicenseId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editCourse, setEditCourse] = useState({ id: 0, name: '', price: 0, duration: '', description: '', licenseId: [] });
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
    if(newCourseData.duration <= 0){
      alert("Thời lượng khóa học không hợp lệ");
      return;
    }
    if(newCourseData.price <= 0){
      alert("Giá khóa học không hợp lệ");
      return;
    }
   
    await postCourse(newCourseData.name, newCourseData.price, newCourseData.duration, newCourseData.description, newCourseData.licenseId, accessToken);

    setNewCourseData({
      name: '',
      price: 0,
      duration: 0,
      description: '',
      licenseId: '',
    });

    setIsModalVisible(false);

    fetchCourseData();
  };
  const handleLicenseIdChange = (e) => {
    const value = e.target.value;
    setEditedLicenseId(value); 

  };

  const handleEdit = (course) => {
    setIsEditing(true);
    setEditCourse(course);
  };

  const handleSaveEdit = async () => {
    if(editCourse.duration <= 0){
      alert("Thời lượng khóa học không hợp lệ");
      return;
    }
    if(editCourse.price <= 0){
      alert("Giá khóa học không hợp lệ");
      return;
    }
   
    await putCourseById(editCourse.id, editCourse.name, editCourse.price, editCourse.duration, editCourse.description, editCourse.licenseId, accessToken);

    setIsEditing(false);
    setEditCourse({ id: 0, name: '', price: 0, duration: 0, description: '', licenseId: [] });

    fetchCourseData();
  };

  const handleDelete = async (id) => {
    
    const updatedCourses = courses.filter((course) => course.id !== id);

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
  const defaultLicense = licenses.find((license) => license.id === newCourseData.licenseId);

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
            <Select
              style={{ width: '100%' }}
              value={editCourse.licenseId}
              onChange={(value) => setEditCourse({ ...editCourse, licenseId: value })}
            >
              {licenses.map((license) => (
                <Option key={license.id} value={license.id}>
                  {license.name}
                </Option>
              ))}
            </Select>
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
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Tên khoá học">
                <Input
                  type="text"
                  name="name"
                  value={newCourseData.name}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tổng giá">
                <Input
                min={0}
                  type="number"
                  name="price"
                  value={newCourseData.price}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Thời lượng">
                <Input
                min={0}
                  type="number"
                  name="duration"
                  value={newCourseData.duration}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả">
                <Input
                  type="text"
                  name="description"
                  value={newCourseData.description}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Loại bằng lái">
                <Select
                  style={{ width: '100%' }}
                  type="text"
                  name="licenseId"
                  value={newCourseData.licenseId || (defaultLicense && defaultLicense.id)}
                  onChange={(value) =>
                    setNewCourseData({ ...newCourseData, licenseId: value })
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
      </Modal>
    </div>
  );
};

export default StaffCourse;
