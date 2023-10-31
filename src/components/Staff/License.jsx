import React, { useEffect, useState } from 'react';
import { DeleteLicenseById, getLicense, postLicense, putLicenseById } from '../../api/auth-services';
import { Button, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const License = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [LicensesPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [licenses, setLicenses] = useState([]);
  const [newLicense, setNewLicense] = useState({ id: 0, name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editLicense, setEditLicense] = useState({ id: 0, name: '' });

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

  const handleAddLicense = () => {
    // Validate the input
    if (!newLicense.name) {
      alert('Please fill in the name field');
      return;
    }

    // Send a POST request to add the license
    postLicense(newLicense.name, accessToken);

    // Clear the form
    setNewLicense({ name: '' });

    // Fetch the updated license data
    fetchLicenseData();
  };

  const handleEdit = (license) => {
    setIsEditing(true);
    setEditLicense(license);
  };

  const handleSaveEdit = async () => {
    // Validate the input
    if (!editLicense.name) {
      alert('Please fill in the name field');
      return;
    }

    // Send a PUT request to update the license
    await putLicenseById(editLicense.id, editLicense.name, accessToken);

    // Clear the edit state
    setIsEditing(false);
    setEditLicense({ id: 0, name: '' });

    // Fetch the updated license data
    fetchLicenseData();
  };

  const handleDelete = async (id) => {
    // Filter out the license with the specified ID
    const updatedLicenses = licenses.filter((license) => license.id !== id);

    // Send a DELETE request to remove the license
    await DeleteLicenseById(id, accessToken);

    setLicenses(updatedLicenses);
  };

  const indexOfLastLicense = currentPage * LicensesPerPage;
  const indexOfFirstLicense = indexOfLastLicense - LicensesPerPage;
  const currentLicenses = licenses.slice(indexOfFirstLicense, indexOfLastLicense);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Name',
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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, license) => (
        <span>
          {isEditing && editLicense.id === license.id ? (
            <>
              <Button  icon={<SaveOutlined />} className="save-button" onClick={handleSaveEdit}>Save</Button>
              <Button icon={<CloseCircleOutlined />} className="close-button" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} className="edit-button"  onClick={() => handleEdit(license)}>Edit</Button>
              <Button icon={<DeleteOutlined />} className="delete-button" onClick={() => handleDelete(license.id)}>Delete</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" className="button-right">
        Add License
      </Button>
      <Table columns={columns} dataSource={currentLicenses} />
    </div>
  );
};

export default License;
