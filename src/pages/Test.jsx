import React, {useState} from 'react'
import { getLicense, getLicenseById, getSlot, getWallet,getSlotTime,getSlotTimeById, PostCourse, getCourse,getCourseById, putCourseById, DeleteCourseById, postSlot } from '../api/Slot-services';

const Test = () => {
    const [name, setName] = useState('b2');
    const [price, setPrice] = useState(100000000);
    const [duration, setDuration] = useState(100);
    const [description, setDescription] = useState('B2');
    const [licenseId, setLicenseId] = useState(4);
    const [id, setId] =useState('2');
    const [slotTimeId,setSlotTimeId] =useState();
    const [courseId,setCourseId] =useState();
    const [monthYear, setMonthYear] =useState();

    const handleGetLicense = () => {
      getLicense();
    };

    const handleGetSlot = () => {
        getSlot();
      };
  
    const handleGetLicenseById = () => {
      
      getLicenseById(id);
    };
    const handleGetSlotTime = () => {
         
        getSlotTime();
      };
      const handleGetSlotTimeById = () => {
      
        getSlotTimeById(id);
      };

    const handleGetWallet =() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

      const accessToken = user.accessToken;
        getWallet(accessToken);
    }

    const handleGetCourse = () => {
        getCourse();
    }

    const handleGetCourseById = () => {
       
        getCourseById(id);
    }

    const handleDeleteCourse = () => {
       
        DeleteCourseById(id);
    }

    const handlePostCourse = () => {
        PostCourse(name, price, duration, description, licenseId);
      };

      const handlePutCourse = () => {
            
        putCourseById(name, price, duration, description, licenseId, id);
      };
      const handlePostSlot= ()=>{
        postSlot(slotTimeId, courseId, monthYear);
      }
  
    return (
      <div>
        <button onClick={handleGetLicense}>Fetch License Data</button>
        <div style={{ margin: '20px 0' }}></div>

        <form>
        <div>
          <label>Id: </label>
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <button onClick={handleGetLicenseById}>Fetch License by ID</button>
        </form>
        <div style={{ margin: '20px 0' }}></div>
        
        <button onClick={handleGetSlot}>Get Slot Data </button>
        <button onClick={handleGetWallet}>Get Wallet Data </button>
        <button onClick={handleGetSlotTime}>Get Slot Time </button>

        <div style={{ margin: '20px 0' }}></div>
        <form>
        <div>
          <label>Id: </label>
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <button onClick={handleGetSlotTimeById}>Get Slot Time by ID</button>
        </form>
        <div style={{ margin: '20px 0' }}></div>
       
         
         {/* Course Creation Form */}
        <form>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </div>
        <div>
          <label>Duration: </label>
          <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>License ID: </label>
          <input type="number" value={licenseId} onChange={(e) => setLicenseId(parseInt(e.target.value))} />
        </div>
        <button onClick={handlePostCourse}>Post Course</button>
      </form>
      <div style={{ margin: '20px 0' }}></div>
      <button onClick={handleGetCourse}>Get Course </button>

      <div style={{ margin: '20px 0' }}></div>
      <form>
        <div>
          <label>Id: </label>
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        </form>
      <button onClick={handleGetCourseById}>Get Course by Id </button>
      <div style={{ margin: '20px 0' }}></div>
       {/* Course Update Form */}
       <form>
       <div>
          <label>Id: </label>
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Price: </label>
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        </div>
        <div>
          <label>Duration: </label>
          <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Description: </label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>License ID: </label>
          <input type="number" value={licenseId} onChange={(e) => setLicenseId(parseInt(e.target.value))} />
        </div>
        <button onClick={handlePutCourse}>Update Course</button>
      </form>
      <div style={{ margin: '20px 0' }}></div>

      <form>
        <div>
          <label>Id: </label>
          <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        </form>
        <button onClick={handleDeleteCourse}>Delete Course by ID</button>
        <div style={{ margin: '20px 0' }}></div>



        <form>
        <div>
          <label>slotTimeId: </label>
          <input type="number" value={slotTimeId} onChange={(e) => setSlotTimeId(e.target.value)} />
        </div>
        <div>
          <label>CourseID: </label>
          <input type="number" value={courseId} onChange={(e) => setCourseId(e.target.value)} />
        </div>
        <div>
        <label>TimeSet: </label>
      <input
         type="text"
          value={monthYear}
         onChange={(e) => setMonthYear(e.target.value)}
         placeholder="dd-mm-yyyy" // Optional: Provide a placeholder for the expected format
        />
        </div>
          
        <button onClick={handlePostSlot}>Post Slot</button>
      </form>
      <div style={{ margin: '20px 0' }}></div>
      </div>

    




    );
  }

export default Test