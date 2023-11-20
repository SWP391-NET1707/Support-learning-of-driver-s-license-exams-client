import React, { useEffect, useState } from 'react';
import { getSlotTime, postSlotTime, deleteSlotTimeById } from '../../api/auth-services';
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';

const SlotTime = () => {
  const [loading, setLoading] = useState(true);
  const [slotTimes, setSlotTimes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlotTime, setEditSlotTime] = useState({ id: 0, startTime: '', endTime: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');

  const fetchSlotTimeData = async () => {
    try {
      const slotTimeData = await getSlotTime();
      setSlotTimes(slotTimeData);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlotTimeData();
  }, []);

  const isTimeValid = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleAddSlotTime = async () => {
    if (!isTimeValid(newStartTime) || !isTimeValid(newEndTime)) {
      alert('Please enter valid time in HH:mm format');
      return;
    }

    await postSlotTime(newStartTime, newEndTime);
    fetchSlotTimeData();
    setNewStartTime('');
    setNewEndTime('');
  };

  const handleEdit = (slotTime) => {
    setIsEditing(true);
    setEditSlotTime(slotTime);
  };

  const handleSaveEdit = async () => {
    if (!editSlotTime.startTime || !editSlotTime.endTime) {
      alert('Please fill in both start time and end time fields');
      return;
    }

    await postSlotTime(editSlotTime.startTime, editSlotTime.endTime, editSlotTime.id);
    setIsEditing(false);
    setEditSlotTime({ id: 0, startTime: '', endTime: '' });
    fetchSlotTimeData();
  };

  const handleDelete = async (id) => {
    const updatedSlotTimes = slotTimes.filter((slotTime) => slotTime.id !== id);
    await deleteSlotTimeById(id);
    setSlotTimes(updatedSlotTimes);
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Start Time', dataIndex: 'startTime', key: 'startTime' },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime' },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, slotTime) => (
        <span>
          {isEditing && editSlotTime.id === slotTime.id ? (
            <>
              <Button icon={<SaveOutlined />} onClick={handleSaveEdit}>Save</Button>
              <Button icon={<CloseCircleOutlined />} onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} onClick={() => handleEdit(slotTime)}>Edit</Button>
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(slotTime.id)}>Delete</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Add Slot Time</Button>
      
      <Table
        dataSource={slotTimes}
        loading={loading}
        columns={columns}
      />

      <Modal
        title="Add Slot Time"
        visible={isModalVisible}
        onOk={handleAddSlotTime}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form>
          <Form.Item label="Start Time">
            <Input type="text" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
          </Form.Item>
          <Form.Item label="End Time">
            <Input type="text" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SlotTime;
