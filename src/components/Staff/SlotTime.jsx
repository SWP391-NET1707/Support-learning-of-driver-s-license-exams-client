import React, { useEffect, useState } from 'react';
import { getSlotTime, postSlotTime, deleteSlotTimeById, putSlotTime } from '../../api/auth-services';
import { Button, Form, Input, Modal, Table, TimePicker } from 'antd';
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

  const isTimeValid = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleAddSlotTime = async () => {
    if (!newStartTime || !newEndTime) {
      alert('Please select both start time and end time');
      return;
    }
    const newStart = newStartTime.format('HH:mm:00').toString();
    const newEnd = newEndTime.format('HH:mm:00').toString();
  
   
    await postSlotTime(newStart, newEnd);
    fetchSlotTimeData();
    setNewStartTime(null);
    setNewEndTime(null);
    setIsModalVisible(false); // Close the modal after adding the slot time

    // await postSlotTime(formattedStartTime, formattedEndTime);
    // alert("Tạo thành công")
    // fetchSlotTimeData();
    // setNewStartTime(dayjs());
    // setNewEndTime(dayjs());
  };

  const handleEdit = (slotTime) => {
    setIsEditing(true);
    setEditSlotTime(slotTime);
    // console.log(editSlotTime)
  };

  const handleSaveEdit = async () => {
    console.log(editSlotTime.startTime, editSlotTime.endTime);
    if (!isTimeValid(editSlotTime.startTime) || !isTimeValid(editSlotTime.endTime)) {
      
      alert('Xin hãy nhập đúng mẫu HH:mm');
      return;
    }else
    if (!editSlotTime.startTime || !editSlotTime.endTime) {
      alert('Hãy nhập đủ thông tin');
      return;
    }
    
    await putSlotTime(editSlotTime.startTime, editSlotTime.endTime, editSlotTime.id);
    setIsEditing(false);
    setEditSlotTime({ id: 0, startTime: '', endTime: '' });
    fetchSlotTimeData();
  };

  const handleDelete = async (id) => {
    const updatedSlotTimes = slotTimes.filter((slotTime) => slotTime.id !== id);

    await deleteSlotTimeById(id);
    
    fetchSlotTimeData()
  };

  const onStartTimeChange = (time) => {
    setNewStartTime(time);
   
  };

  const onEndTimeChange = (time) => {
    setNewEndTime(time);
  
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Giờ bắt đầu', dataIndex: 'startTime', key: 'startTime',
      render: (startTime, slotTime) => (
        <span>
          {isEditing && editSlotTime.id === slotTime.id ? (
            <Input
              label="Giờ bắt đầu"
              value={editSlotTime.startTime}
              onChange={(e)=>setEditSlotTime({ ...editSlotTime, startTime: e.target.value})}
            />
          ) : (
            <span>{startTime}</span>
          )}
        </span>
      ),
    },
    { title: 'Giờ kết thúc', dataIndex: 'endTime', key: 'endTime',
    render: (endTime, slotTime) => (
      <span>
        {isEditing && editSlotTime.id === slotTime.id ? (
          <Input
            label="Giờ kết thúc"
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
      title: 'Tác vụ',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, slotTime) => (
        <span>
          {isEditing && editSlotTime.id === slotTime.id ? (
            <>
              <Button icon={<SaveOutlined />} onClick={handleSaveEdit}>Lưu</Button>
              <Button icon={<CloseCircleOutlined />} onClick={() => setIsEditing(false)}>Hủy</Button>
            </>
          ) : (
            <>
              <Button icon={<EditOutlined />} onClick={() => handleEdit(slotTime)}>Chỉnh sửa</Button>
              <Button icon={<DeleteOutlined />} onClick={() => handleDelete(slotTime.id)}>Xóa</Button>
            </>
          )}
        </span>
      ),
    },
  ];

  return (

    <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>Thêm khung giờ</Button>

      <Table
        dataSource={slotTimes}
        loading={loading}
        columns={columns}
      />

      <Modal
        title="Thêm khung giờ"
        visible={isModalVisible}
        onOk={handleAddSlotTime}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form>
          <Form.Item label="Start Time">
            <TimePicker
              value={newStartTime}
              onChange={onStartTimeChange}
              format="HH:mm"
            />
          </Form.Item>
          <Form.Item label="End Time">
            <TimePicker
              value={newEndTime}
              onChange={onEndTimeChange}
              format="HH:mm"
            />
          </Form.Item>
        </Form>
      </Modal>
      </LocalizationProvider>
    </div>

  );
};

export default SlotTime;
