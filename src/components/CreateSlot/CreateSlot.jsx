import React, { useEffect, useState } from 'react';
import { Alert, Button, Checkbox, DatePicker, Form, Input, Modal, Select } from 'antd';
import { postSlot, getSlotTimeById, getCourse, getSlotbyMentor, postTakeAttendant, getSlotTime } from '../../api/auth-services';
import axios from 'axios';
import { Link } from 'react-router-dom';


const CreateSlot = () => {
  const [open, setOpen] = useState(false);
  const [slotTimeId, setSlotTimeId] = useState();
  const [slotTime, setSlotTime] = useState([]);
  const [courseId, setCourseId] = useState();
  const [description, setDescription] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(10);
  const [isAttended, setIsAttended] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken;
  const currentDate = new Date();

  const showModal = () => {
    setOpen(true);
  };

  function filterSlotsByDate(slotsData) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const data = slotsData
    const filteredSlots = data.filter((slot) => new Date(slot.monthYear) > currentDate);
    // console.log(currentDate)
    return filteredSlots;
  }

  // Usage
  // const filteredSlots = filterSlotsByDate(slotsData);

  async function fetchData() {
    try {
      const course = await getCourse();
      const slotsData = await getSlotbyMentor(accessToken);
      const filteredSlots = filterSlotsByDate(slotsData);
      const datatime = await getSlotTime();
      const slotsWithTimeData = await Promise.all(
        filteredSlots.map(async (slot) => {
          const slotTimeData = await getSlotTimeById(slot.slotTimeId);
          return { ...slot, slotTimeData };
        })
      );
      setSlotTime(datatime)
      setCourses(course)
      setSlots(slotsWithTimeData);
      setLoading(false);
      console.log(datatime)
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  }

  useEffect(() => {


    fetchData();

  }, []);

  const handleOk = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const accessToken = user.accessToken;
      await postSlot(slotTimeId, courseId, description, monthYear, accessToken);
      // window.location.reload();
      setOpen(false);
      fetchData();
      setSlotTimeId('')
      setCourseId('')
      setDescription('')
      setMonthYear(null)
    } catch (error) {
      // console.log(error.response)
      console.error('Error during slot creation:', error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleTakeAttend = async (slot) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const accessToken = user.accessToken;
      setIsAttended(isAttended)
      await postTakeAttendant(slot.id, isAttended, accessToken)
      // console.log(isAttended)
      window.location.reload();
    } catch (error) {
      // console.log(error.response)
      console.error('Error during slot creation:', error);
    }
  };



  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot)
    .sort((a, b) => {
      const dateComparison = new Date(a.monthYear) - new Date(b.monthYear);

      // If dates are the same, compare by SLOTid
      return dateComparison === 0 ? a.slotTimeId - b.slotTimeId : dateComparison;
    });
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Modal
                title=""
                open={open}
                onOk={handleOk}
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
                    <Form.Item label="Slot">
                      <Select
                        placeholder="Select Slot Time"
                        value={slotTimeId || undefined}
                        onChange={(value) => setSlotTimeId(value)}
                      >
                        {slotTime.map((item) => (
                          <Select.Option key={item.id} value={item.slotTimeId}>
                            {`${item?.startTime} - ${item?.endTime}`}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item label="Khoa hoc">
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
                      <DatePicker selected={monthYear} onChange={date => setMonthYear(date ? date.format("YYYY-MM-DD") : null)} />
                    </Form.Item>
                    <Form.Item label="Nội dung">
                      <Input
                        placeholder="tối đa 30 kí tự"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxlength="30" />
                    </Form.Item>
                  </Form>
                </>
                {/* <p>{modalText}</p> */}
              </Modal>

              <div>
                <div className="container">
                  <div className="row">
                    <div className="col-12 mb-3 mb-lg-5">
                      <div className="overflow-hidden card table-nowrap table-card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <h5 className="mb-0 text-center">Danh sách slot đã đăng ký</h5>
                          <Button type="primary" onClick={showModal} className="button-right">
                            Tạo mới
                          </Button>
                        </div>
                        <div className="table-responsive">
                          <table className="table mb-0">
                            <thead className="small text-uppercase bg-body text-muted">
                              <tr>
                                <th className="text-center">Ngày</th>
                                <th className="text-center">Slot</th>
                                <th className="text-center">Nội dung</th>
                                <th className="text-center">Khóa học</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td colSpan="4">Loading...</td>
                                </tr>
                              ) : (
                                currentSlots.map((slot) => (
                                  <tr key={slot.id} className="align-middle">
                                    <td className="text-center">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <div>
                                          <span><h4>{new Date(slot.monthYear).getDate()}</h4></span>
                                          <p>{new Date(slot.monthYear).toLocaleDateString('vi-VN', { month: 'long' })}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className="d-flex align-items-center justify-content-center">
                                        <div>
                                          <span><h4>{slot.slotTimeId}</h4></span>
                                          <p>{slot.slotTimeData?.startTime} - {slot.slotTimeData?.endTime}</p>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className='center-content'>
                                        <h4>{slot.description}</h4>
                                      </div>
                                    </td>
                                    <td className="text-center">
                                      <div className='center-content'>
                                        <h5>{slot.courses?.name ? slot.courses.name.toUpperCase() : 'N/A'}</h5>
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
              </div>
              <ul className="pagination justify-content-center">
                {Array.from({ length: Math.ceil(slots.length / slotsPerPage) }, (_, index) => (
                  <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <a onClick={() => paginate(index + 1)} className="page-link">
                      {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSlot;
