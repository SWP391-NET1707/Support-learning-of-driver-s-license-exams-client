import React, { useEffect, useState } from 'react';
import { DeleteLicenseById, getLicense, postLicense, putLicenseById } from '../../api/auth-services';
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const License = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [LicensesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState([]);
  const [newLicense, setNewLicense] = useState({ id: 0, name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editLicense, setEditLicense] = useState({ id: 0, name: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newLicenseName, setNewLicenseName] = useState('');

  const user = JSON.parse(sessionStorage.getItem('user'));
  const accessToken = user.accessToken;

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

  const handleAddLicense = async () => {
  
    if (!newLicenseName) {
      alert('Please fill in the name field');
      return;
    }

    await postLicense(newLicenseName, accessToken);
    fetchLicenseData();
    
    setNewLicense({ name: '' });

  };

  const handleEdit = (license) => {
    setIsEditing(true);
    setEditLicense(license);
  };

  const handleSaveEdit = async () => {
   
    if (!editLicense.name) {
      alert('Please fill in the name field');
      return;
    }

    await putLicenseById(editLicense.id, editLicense.name, accessToken);

    setIsEditing(false);
    setEditLicense({ id: 0, name: '' });

    fetchLicenseData();
  };

  const handleDelete = async (id) => {
    const updatedLicenses = licenses.filter((license) => license.id !== id);  
    await DeleteLicenseById(id, accessToken);
    const response = await DeleteLicenseById(id, accessToken);
    
    if (response && response.status === 200) {
      setLicenses(updatedLicenses);
    } else {
      alert("Xảy ra lỗi khi xóa bằng lái");
      return;
    }
  };

  const indexOfLastLicense = currentPage * LicensesPerPage;
  const indexOfFirstLicense = indexOfLastLicense - LicensesPerPage;
  const currentLicenses = licenses.slice(indexOfFirstLicense, indexOfLastLicense);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Tên bằng lái',
      dataIndex: 'name',
      key: 'name',
      render: (name, license) => (
        <span>
          {isEditing && editLicense.id === license.id ? (
            <Input
              value={editLicense.name}
              onChange={(e) => setEditLicense({ ...editLicense, name: e.target.value })}
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
      render: (text, license) => (
        <span>
          {isEditing && editLicense.id === license.id ? (
            <>
              <Button  icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Lưu</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Huỷ</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button"  onClick={() => handleEdit(license)}>Chỉnh sửa</Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(license.id)}>Xoá bằng lái</Button>
            </>
          )}
        </span>
      ),
    },
  ];
  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Button type="primary" className="button-right" onClick={handleShowModal}>
        Thêm bằng lái
      </Button>
      <Table columns={columns} dataSource={currentLicenses} />
      <Modal
        title="Thêm bằng lái"
        visible={isModalVisible}
        onOk={handleAddLicense}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Tên bằng lái">
            <Input
              type="text"
              value={newLicenseName}
              onChange={(e) => setNewLicenseName(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default License;
