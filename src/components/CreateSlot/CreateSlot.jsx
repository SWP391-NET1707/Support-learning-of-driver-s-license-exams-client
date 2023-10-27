import React, { useEffect, useState } from 'react';
import { Alert, Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { postSlot, getSlotTimeById, getCourse } from '../../api/auth-services';
import { getSlot } from '../../api/auth-services';
import CreateslotForm from './CreateslotForm';
import axios from 'axios';


const CreateSlot = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [slotTimeId, setSlotTimeId] = useState();
  const [courseId, setCourseId] = useState();
  const [description, setDescription] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const course = await getCourse();
        const slotsData = await getSlot();
        const slotsWithTimeData = await Promise.all(
          slotsData.map(async (slot) => {
            const slotTimeData = await getSlotTimeById(slot.slotTimeId);
            return { ...slot, slotTimeData };
          })
        );
        setCourses(course)
        setSlots(slotsWithTimeData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
    console.log(monthYear)
    fetchData();
    console.log(courseId)
  }, []);

  const handleOk = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const accessToken = user.accessToken;
      await postSlot(slotTimeId, courseId, description, monthYear, accessToken);

      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      // window.location.reload();
    } catch (err) {
      console.error('Error during slot creation:', err);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };


  return (
    <>
      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Button type="primary" onClick={showModal} className="button-right">
                Tạo mới
              </Button>
              <Modal
                title="Title"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              >
                <>
                  <Form
                    labelCol={{
                      span: 4,
                    }}
                    wrapperCol={{
                      span: 14,
                    }}
                    layout="horizontal"
                    style={{
                      maxWidth: 600,
                    }}
                  >
                    <Form.Item label="Input">
                      <Input
                        placeholder="Slot Time ID"
                        value={slotTimeId}
                        onChange={(e) => setSlotTimeId(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Slot">
                      {/* <Select
                        placeholder="Select Course"
                        value={courseId}
                        onChange={(value) => setCourseId(value)}>
                        <Select.Option key={courses.id} value={courses.}>{courses.name}</Select.Option>
                      </Select> */}
                      <Select
                      placeholder="Select Course"
                      value={courseId}
                      onChange={(value) => setCourseId(value)}>
                        {courses.map(item => (
                          <Select.Option key={item.id} value={item.id}>
                            {item.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Ngày">
                      <DatePicker selected={monthYear} onChange={date => setMonthYear(date.format("YYYY-MM-DD"))} />
                    </Form.Item>
                    <Form.Item label="Nội dung">
                      <Input
                        placeholder="tối đa 30 kí tự"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                  </Form>
                </>
                {/* <p>{modalText}</p> */}
              </Modal>
              <div className="table-responsive ">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        Ngày
                      </th>
                      <th scope="col">Mô tả</th>
                      <th scope="col">Học sinh</th>
                      <th scope="col">Khóa Học</th>
                      <th className="text-center" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : (
                      slots.map((slot) => (
                        <tr key={slot.id} className="inner-box">
                          <th scope="row">
                            <div className="event-date">
                              <span><h3>{new Date(slot.monthYear).getDate()}</h3></span>
                              <p>{new Date(slot.monthYear).toLocaleDateString('vi-VN', { month: 'long' })}</p>
                            </div>
                          </th>
                          <td>
                            <div className="event-wrap">
                              <h3>{slot.description}</h3>
                              <div className="meta">
                                <div className="time">
                                  <span>Slot: {slot.slotTimeId}</span>
                                  {slot.slotTimeData ? (
                                    <>
                                      <div>{slot.slotTimeData.startTime} -  {slot.slotTimeData.endTime}</div>

                                      {/* <div>End Time: {slot.slotTimeData.endTime}</div> */}
                                    </>
                                  ) : (
                                    <span>Loading Start and End Time...</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="r-no">
                              <span><h3>{slot.courses?.name ? slot.courses.name.toUpperCase() : 'N/A'}</h3></span>
                            </div>
                          </td>
                          <td>
                            <div className="primary-btn">
                              <a className="btn btn-primary" href="#">
                                Take
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSlot;
