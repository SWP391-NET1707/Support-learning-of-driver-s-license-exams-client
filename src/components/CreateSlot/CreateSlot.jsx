import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { postSlot, getSlotTimeById } from '../../api/auth-services';
import { getSlot } from '../../api/auth-services';


const CreateSlot = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const [slotTimeId, setSlotTimeId] = useState();
  const [courseId, setCourseId] = useState();
  const [monthYear, setMonthYear] = useState('');
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const showModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const slotsData = await getSlot();
        const slotsWithTimeData = await Promise.all(
          slotsData.map(async (slot) => {
            const slotTimeData = await getSlotTimeById(slot.slotTimeId);
            return { ...slot, slotTimeData };
          })
        );
        setSlots(slotsWithTimeData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }

    fetchData();
    // console.log(slots)
  }, []);

  const handleOk = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {
      const accessToken = user.accessToken;
      await postSlot(slotTimeId, courseId, monthYear,accessToken);

      setModalText('The modal will be closed after two seconds');
      setConfirmLoading(true);
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
      }, 2000);
      window.location.reload();
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
                <input
                  placeholder="Slot Time ID"
                  value={slotTimeId}
                  onChange={(e) => setSlotTimeId(e.target.value)}
                />
                <input
                  placeholder="Course ID"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                />
                <input
                  placeholder="Date"
                  value={monthYear}
                  onChange={(e) => setMonthYear(e.target.value)}
                />
                <p>{modalText}</p>
              </Modal>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        Date
                      </th>
                      <th scope="col">Session</th>
                      <th scope="col">Course</th>
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
                              <p>{new Date(slot.monthYear).toLocaleDateString('en-US', { month: 'long' })}</p>
                            </div>
                          </th>
                          <td>
                            <div className="event-wrap">
                              <h3>{slot.courses?.description}</h3>
                              <div className="meta">
                                <div className="time">
                                  <span>Slot: {slot.slotTimeId}</span>
                                  {slot.slotTimeData ? (
                                    <>
                                      <div>Start Time: {slot.slotTimeData.startTime}</div>
                                      
                                      <div>End Time: {slot.slotTimeData.endTime}</div>
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
