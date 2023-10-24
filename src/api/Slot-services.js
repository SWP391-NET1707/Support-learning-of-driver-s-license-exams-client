import axios from 'axios';


const API_URL = "https://drivingschoolapi20231005104822.azurewebsites.net/api"
const Course_URL = `${API_URL}/Course`;
const accessToken = sessionStorage.getItem("user")
export async function getLicense() {
    try {
      const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/License');
  
    
  
      
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  export async function getLicenseById(id) {
    try {
      const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/License/${id}`);
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  export async function DeleteLicenseById(id) {
    try {
      const response = await axios.delete(`https://drivingschoolapi20231005104822.azurewebsites.net/api/License/${id}`);
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  
  export async function putLicenseById( name, id) {
    try {
      const response = await axios.put(`https://drivingschoolapi20231005104822.azurewebsites.net/api/License/${id}`, {
        name
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('License successfully updated');
      } else {
        console.log('License updating failed');
      }
      return response.data;
    } catch (err) {
      console.error('Error during license update:', err);
    }
  }
  
  export async function getSlot() {
    try {
      const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot');
      const data = response.data; // Store the response data in a variable
  
      console.log('Slot Data:', data); // Log the data
  
      return data;
    } catch (error) {
      console.error('Error fetching slot data:', error);
      throw error; // Rethrow the error to handle it at a higher level
    }
  }
  
  export async function getWallet(accessToken) {
    try {
      const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/Wallet/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
  
     
  
     
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  export async function getSlotTime() {
    try {
      const response = await axios.get('https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime');
  
   
  
     
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  export async function getSlotTimeById(id) {
    try {
      const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime/${id}`);
  
   
  
      
       console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  export async function postSlotTime(startTime, endTime,id) {
    try {
      const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime/update/${id}`,{
        startTime,
        endTime
      });
  
      console.log(response.data);
      return {startTime, endTime};
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  export async function DeleteSlotTimeById(id) {
    try {
      const response = await axios.delete(`https://drivingschoolapi20231005104822.azurewebsites.net/api/SlotTime/${id}`);
  
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  export async function getCourse() {
    try {
      const response = await axios.get(Course_URL);
  
   
  
      
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  export async function getCourseById(id) {
    try {
      const response = await axios.get(Course_URL+ `/${id}`);
  
   
  
      
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  export async function PostCourse(name, price, duration, description, licenseId) {
    try {
      const response = await axios.post(Course_URL, {
        name,
        price,
        duration,
        description,
        licenseId,
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Course successfully posted');
      } else {
        console.log('Course posting failed');
      }
    } catch (err) {
      console.error('Error during course posting:', err);
    }
  }
    
  export async function putCourseById(name, price, duration, description, licenseId, id) {
    try {
      const response = await axios.put(Course_URL+ `/${id}`, {
        name,
        price,
        duration,
        description,
        licenseId,
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Course successfully updated');
      } else {
        console.log('Course updating failed');
      }
    } catch (err) {
      console.error('Error during course update:', err);
    }
  }
  
  
  export async function DeleteCourseById(id) {
    try {
      const response = await axios.put(Course_URL+ `/${id}`);
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Course successfully deleted');
      } else {
        console.log('Course deletion failed');
      }
    } catch (err) {
      console.error('Error during course update:', err);
    }
  }
  
  
  export async function getMentor() {
    try {
      const response = await axios.get(`https://drivingschoolapi20231005104822.azurewebsites.net/api/User/get/mentor`);
      const data = response.data; // Store the response data in a variable
  
      console.log('Mentor Data:', data); // Log the data
  
      return data;
    } catch (error) {
      console.error('Error fetching mentor data:', error);
      throw error; // Rethrow the error to handle it at a higher level
    }
  }
  
  export async function postSlot(slotTimeId, courseId, monthYear) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          };

      const response = await axios.post(`https://drivingschoolapi20231005104822.azurewebsites.net/api/Slot/mentor`, {
        slotTimeId,
        courseId,
        monthYear
      }, {
        headers,
      });
  
      console.log('Response:', response);
  
      if (response.status === 200) {
        console.log('Slot successfully updated');
      } else {
        console.log('Slot updating failed');
      }
    } catch (err) {
      console.error('Error during slot update:', err);
    }
  }
  
  