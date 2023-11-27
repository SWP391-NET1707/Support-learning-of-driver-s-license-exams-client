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

  const isTimeValid = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleAddSlotTime = async () => {
    const formattedStartTime = newStartTime.format('HH:mm:00');
    const formattedEndTime = newEndTime.format('HH:mm:00');
    if (newStartTime >= newEndTime) {
      alert('Giờ bắt đầu phải bé hơn Giờ kết thúc');
      return;
    }

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
    if (!isTimeValid(editSlotTime.startTime) <= !isTimeValid(editSlotTime.endTime)) {
      alert('Xin hãy nhập đúng mẫu HH:mm');
      return;
    }else
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
          {/* <Form.Item label="Start Time">
            <Input type="text" value={newStartTime} onChange={(e) => setNewStartTime(e.target.value)} />
          </Form.Item>
          <Form.Item label="End Time">
            <Input type="text" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
          </Form.Item> */}

            <Form.Item>
              <TimeField
                label="Giờ bắt đầu"
                value={newStartTime}
                onChange={handleStartTimeChange}
                format='HH:mm'
              />
            </Form.Item>
            <Form.Item>
              <TimeField
                label="Giờ kết húc"
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
