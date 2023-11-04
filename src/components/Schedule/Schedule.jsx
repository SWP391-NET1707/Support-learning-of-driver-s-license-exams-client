import React, { useState, useEffect } from 'react';
import { getSlot, getMentor, handlePaymentRequest, getCourse, postStudentSlot } from '../../api/auth-services';
import '../TakeSlot/TakeSlot.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [slots, setSlots] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [courseData, setCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(10);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transactionStatus = searchParams.get('vnp_TransactionStatus');

  const navigate = useNavigate();

  const handleRedirect = () => {
    if (transactionStatus === '00') {
      navigate('/paysuccess');
    } else {
      navigate('/payfail');
    }
  };
  useEffect(() => {
    if (location.search) {
      handleRedirect();
    }
    async function fetchData() {
      try {
        const slotData = await getSlot();
        const mentorData = await getMentor();
        const courseData = await getCourse();
    
        // Filter slots where studentId is null
        const filteredSlots = slotData.filter(slot => slot.studentId === null);
    
        // Filter slots with a monthYear that is at least tomorrow
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1); // Add one day to the current date
        const filteredSlotsTomorrow = filteredSlots.filter(slot => new Date(slot.monthYear) >= currentDate);
    
        setSlots(filteredSlotsTomorrow);
        setMentors(mentorData);
        setCourse(courseData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [location.search, transactionStatus]);

  const handleDeposit = async (selectedSlot) => {
    console.log(selectedSlot.courses.id);
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (selectedSlot && selectedSlot.courses && selectedSlot.courses.id) {
      sessionStorage.setItem("courseId", selectedSlot.courses.id);
    } else {
      console.error("Invalid selected slot data");
    }

    try {
      const accessToken = user.accessToken;
      const paymentUrl = await handlePaymentRequest(accessToken, selectedSlot.courses.price);
      if (paymentUrl) {
        setPaymentUrl(paymentUrl);
        window.location.href = paymentUrl;
      } else {
        console.error('Payment failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  function getMentorNames(mentorId) {
    if (!mentorId) {
      return 'Unknown Mentor';
    }
    const mentor = mentors.find((mentor) => mentor.id === mentorId);
    return mentor ? mentor.name : 'Unknown Mentor';
  }

  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


 const handleOk = async (slot) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    try {

      const accessToken = user.accessToken;
      await postStudentSlot(slot.id,accessToken)
      console.log()
    }
      catch{

      }
  }

  return (
    <div>
      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="table-responsive">
                  {slots.length > 0 ? (
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="text-center" scope="col">Ngày học</th>
                          <th scope="col">Giảng viên</th>
                          <th scope="col">Mô tả</th>
                          <th scope="col">Lớp học</th>
                          <th scope="col">Button</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentSlots.map((slot) => (
                          <tr key={slot.id} className="inner-box">
                            <th scope="row">
                              <div className="event-date">
                                {new Date(slot.monthYear).getDate()}
                                <p>{new Date(slot.monthYear).toLocaleDateString('en-US', { month: 'long' })}</p>
                              </div>
                            </th>
                            <td>{getMentorNames(slot.mentorId)}</td>
                            <td>{slot.courses?.description ? `${slot.courses.description}` : ''}</td>
                            <td>{slot.courses?.name || 'N/A'}</td>
                            <td>
                              <div className="primary-btn">
                                <button onClick={() => handleOk(slot)} className="btn btn-primary">Đăng kí buổi học</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Hiện chưa có lớp, xin vui lòng quay lại sau.</p>
                  )}
                </div>
              )}
  
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
  );
  
};

export default Schedule;
