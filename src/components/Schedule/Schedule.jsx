import React, { useState, useEffect } from 'react';
import { getSlot, getMentor, handlePaymentRequest, getCourse } from '../../api/auth-services';
import '../TakeSlot/TakeSlot.css';
import { useLocation,useNavigate } from 'react-router-dom';

const Schedule = () => {
  const [slots, setSlots] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  const[courseData, setCourse]=useState([]);

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
        setSlots(slotData);
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
    const user = JSON.parse(sessionStorage.getItem("user"));
   
    if (selectedSlot && selectedSlot.courses && selectedSlot.courses.id) {
        
        // Save the courseId to session storage before redirection
        sessionStorage.setItem("courseId", selectedSlot.courses.id);
      } else {
        // Handle the case where the data is missing or invalid
        console.error("Invalid selected slot data");
        // You can provide feedback to the user or take other actions as needed.
      }
  
    try {
      const accessToken = user.accessToken;
      const paymentUrl = await handlePaymentRequest(accessToken, selectedSlot.courses.price); // Use the function
  
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
  

  return (
    <div>
      <div className="event-schedule-area-two bg-color pad100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">Date</th>
                      <th scope="col">Mentors</th>
                      <th scope="col">Description</th>
                      <th scope="col">Type</th>
                      <th scope="col">Button</th>
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
                              {new Date(slot.monthYear).getDate()}
                              <p>{new Date(slot.monthYear).toLocaleDateString('en-US', { month: 'long' })}</p>
                            </div>
                          </th>
                          <td>{getMentorNames(slot.mentorId)}</td>
                          <td>{slot.courses?.description ? `${slot.courses.description} - Price: ${slot.courses.price}` : 'N/A'}</td>
                          <td>{slot.courses?.name || 'N/A'}</td>
                          <td>
                            <div className="primary-btn">
                              <a className="btn btn-primary" onClick={() => handleDeposit(slot)}>Button</a>
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
  );
};

export default Schedule;
