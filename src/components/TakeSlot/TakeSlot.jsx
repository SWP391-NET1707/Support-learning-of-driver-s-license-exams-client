import React from 'react'
import '../TakeSlot/TakeSlot.css'
const TakeSlot = () => {
    return (
        <div>
                                <div class="event-schedule-area-two bg-color pad100">
                                    <div class="container">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="section-title text-center">
                                                    <div class="title-text">
                                                        <h2>Event Schedule</h2>
                                                    </div>
                                                    <p>
                                                        In ludus latine mea, eos paulo quaestio an. Meis possit ea sit. Vidisse molestie<br />
                                                        cum te, sea lorem instructior at.
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="row">
                                            <div class="col-lg-12">
                                                <ul class="nav custom-tab" id="myTab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active show" id="home-taThursday" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Day 1</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Day 2</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Day 3</a>
                                                    </li>
                                                    <li class="nav-item d-none d-lg-block">
                                                        <a class="nav-link" id="sunday-tab" data-toggle="tab" href="#sunday" role="tab" aria-controls="sunday" aria-selected="false">Day 4</a>
                                                    </li>
                                                    <li class="nav-item mr-0 d-none d-lg-block">
                                                        <a class="nav-link" id="monday-tab" data-toggle="tab" href="#monday" role="tab" aria-controls="monday" aria-selected="false">Day 5</a>
                                                    </li>
                                                </ul>
                                                <div class="tab-content" id="myTabContent">
                                                    <div class="tab-pane fade active show" id="home" role="tabpanel">
                                                        <div class="table-responsive">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th class="text-center" scope="col">Date</th>
                                                                        <th scope="col">Mentor</th>
                                                                        <th scope="col">Session</th>
                                                                        <th scope="col">Venue</th>
                                                                        <th class="text-center" scope="col">Venue</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr class="inner-box">
                                                                        <th scope="row">
                                                                            <div class="event-date">
                                                                                <span>16</span>
                                                                                <p>Novembar</p>
                                                                            </div>
                                                                        </th>
                                                                        <td>
                                                                            <div class="event-img">
                                                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt />
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="event-wrap">
                                                                                <h3><a href="#">Harman Kardon</a></h3>
                                                                                <div class="meta">
                                                                                    <div class="organizers">
                                                                                        <a href="#">Aslan Lingker</a>
                                                                                    </div>
                                                                                    <div class="categories">
                                                                                        <a href="#">Inspire</a>
                                                                                    </div>
                                                                                    <div class="time">
                                                                                        <span>05:35 AM - 08:00 AM 2h 25'</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="r-no">
                                                                                <span>Room B3</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div class="primary-btn">
                                                                                <a class="btn btn-primary" href="#">Take</a>
                                                                            </div>
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

                                    </div>
                                </div>

                        )
}

                        export default TakeSlot