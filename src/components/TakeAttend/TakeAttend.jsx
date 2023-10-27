import { CheckBox } from '@mui/icons-material'
import React from 'react'
import { Button, Checkbox } from 'antd';

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
const TakeAttend = () => {
    return (
        <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3 mb-lg-5">
                            <div className="overflow-hidden card table-nowrap table-card">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">New customers</h5>
        
                                </div>
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead className="small text-uppercase bg-body text-muted">
                                            <tr>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Attended</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="align-middle">
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        {/* <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="avatar sm rounded-pill me-3 flex-shrink-0" alt="Customer"> */}
                                                            <div>
                                                                <div className="h6 mb-0 lh-1">Mark Voldov</div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td>084959485</td>
                                                <td> <span className="d-inline-block align-middle"><Checkbox onChange={onChange}>Checkbox</Checkbox></span></td>
                                                <td><span>****6231</span></td>
                                                <td className="text-end">
                                                    {/* <div className="drodown">
                                                        <a data-bs-toggle="dropdown" href="#" className="btn p-1" aria-expanded="false">
                                                            <i className="fa fa-bars" aria-hidden="true"></i>
                                                        </a>
                                                    </div> */}
                                                </td>
                                                <td>
                                                    <Button>Take</Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default TakeAttend