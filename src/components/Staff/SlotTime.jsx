import React, { useEffect, useState } from 'react';
import { getSlotTime, postSlotTime, deleteSlotTimeById, putSlotTime } from '../../api/auth-services';
import { Button, Form, Input, Modal, Table } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const SlotTime = () => {
  const [loading, setLoading] = useState(true);
  const [slotTimes, setSlotTimes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editSlotTime, setEditSlotTime] = useState({ id: 0, startTime: "", endTime: "" });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newStartTime, setNewStartTime] = useState(dayjs());
  const [newEndTime, setNewEndTime] = useState(dayjs());

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

  // const isTimeValid = (time) => {
  //   const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  //   return regex.test(time);
  // };

  const handleAddSlotTime = async () => {
    // if (!isTimeValid(newStartTime) <= !isTimeValid(newEndTime)) {
    //   alert('Xin hãy nhập đúng mẫu HH:mm');
    //   return;
    // }
    if (newStartTime >= newEndTime) {
      alert('Giờ bắt đầu phải bé hơn Giờ kết thúc');
      return;
    }
    const formattedStartTime = newStartTime.format('HH:mm:00');
    const formattedEndTime = newEndTime.format('HH:mm:00');
    await postSlotTime(formattedStartTime, formattedEndTime);
    alert("Tạo thành công")
    fetchSlotTimeData();
    setNewStartTime(dayjs());
    setNewEndTime(dayjs());
  };

  const handleEdit = (slotTime) => {
    setIsEditing(true);
    setEditSlotTime(slotTime);
    // console.log(editSlotTime)
  };

  const handleSaveEdit = async () => {
    if (!editSlotTime.startTime || !editSlotTime.endTime) {
      alert('Hãy nhập đủ thông tin');
      return;
    }
    
    await putSlotTime(editSlotTime.startTime, editSlotTime.endTime, editSlotTime.id);
    alert("Chỉnh sửa thành công")
    setIsEditing(false);
    setEditSlotTime({ id: 0, startTime: '', endTime: '' });
    fetchSlotTimeData();
  };

  const handleDelete = async (id) => {
    const updatedSlotTimes = slotTimes.filter((slotTime) => slotTime.id !== id);

    await deleteSlotTimeById(id);
    alert('Xóa thành công')
    fetchSlotTimeData()
  };

  const handleStartTimeChange = (value) => {
    // Update state with the Day.js object
    setNewStartTime(value);
  };

  const handleEndTimeChange = (value) => {
    // Update state with the Day.js object
    setNewEndTime(value);
  };


  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Start Time', dataIndex: 'startTime', key: 'startTime',
      render: (startTime, slotTime) => (
        <span>
          {isEditing && editSlotTime.id === slotTime.id ? (
            <Input
              label="Start Time"
              value={editSlotTime.startTime}
              onChange={(e)=>setEditSlotTime({ ...editSlotTime, startTime: e.target.value})}
            />
          ) : (
            <span>{startTime}</span>
          )}
        </span>
      ),
    },
    { title: 'End Time', dataIndex: 'endTime', key: 'endTime',
    render: (endTime, slotTime) => (
      <span>
        {isEditing && editSlotTime.id === slotTime.id ? (
          <Input
            label="End Time"
            value={editSlotTime.endTime}
            onChange={(e)=>setEditSlotTime({ ...editSlotTime, endTime: e.target.value })}
          />
        ) : (
          <span>{endTime}</span>
        )}
      </span>
    ),
 },
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
          {/* <Form.Item label="Start Time">
            <Input type="text" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
          </Form.Item>
          <Form.Item label="End Time">
            <Input type="text" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
          </Form.Item> */}

            <Form.Item>
              <TimeField
                label="Start Time"
                value={newStartTime}
                onChange={handleStartTimeChange}
                format='HH:mm'
              />
            </Form.Item>
            <Form.Item>
              <TimeField
                label="End Time"
                value={newEndTime}
                onChange={handleEndTimeChange}
                format='HH:mm'
              />
            </Form.Item>

        </Form>
      </Modal>
      </LocalizationProvider>
    </div>

  );
};

export default SlotTime;
