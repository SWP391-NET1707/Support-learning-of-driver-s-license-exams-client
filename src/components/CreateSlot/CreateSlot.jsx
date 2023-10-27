import React, { useEffect, useState } from 'react';
import { Alert, Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { postSlot, getSlotTimeById, getCourse, getSlotbyMentor } from '../../api/auth-services';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(10);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const accessToken = user.accessToken;
  const currentDate = new Date();

  const showModal = () => {
    setOpen(true);
  };
  
  function filterSlotsByDate(slotsData) {
    const currentDate = new Date();
    const data=slotsData
    const filteredSlots = data.filter((slot) => new Date(slot.monthYear) >= currentDate);
    return filteredSlots;
  }
  
  // Usage
  // const filteredSlots = filterSlotsByDate(slotsData);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const course = await getCourse();
        const slotsData = await getSlotbyMentor(accessToken);
        const filteredSlots = filterSlotsByDate(slotsData);
        const slotsWithTimeData = await Promise.all(
          filteredSlots.map(async (slot) => {
            const slotTimeData = await getSlotTimeById(slot.slotTimeId);
            return { ...slot, slotTimeData };
          })
        );
        setCourses(course)
        setSlots(slotsWithTimeData);
        setLoading(false);
        console.log(filteredSlots)
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    fetchData();
 
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
      
    } catch (error) {
      // console.log(error.response)
      console.error('Error during slot creation:', error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };


  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                    <Form.Item label="Slot">
                      <Input
                        placeholder="Slot Time ID"
                        value={slotTimeId}
                        onChange={(e) => setSlotTimeId(e.target.value)} />
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
                      <DatePicker selected={monthYear} onChange={date => setMonthYear(date.format("YYYY-MM-DD"))} />
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
                      {/* <th className="text-center" scope="col"></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5">Loading...</td>
                      </tr>
                    ) : (
                      currentSlots.map((slot) => (
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
                            sdsd
                          </td>
                          <td>
                            <div className="r-no">
                              <span><h5>{slot.courses?.name ? slot.courses.name.toUpperCase() : 'N/A'}</h5></span>
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
                <ul className="pagination">
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
      </div>
    </>
  );
};

export default CreateSlot;
