import React from 'react';

const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-light footer my-6 mb-0 py-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6 col-md-6">
                        <h4 className="text-white mb-4">Liên lạc</h4>
                        <h2 className="text-primary mb-4"><i className="fa fa-car text-white me-2"></i>Học và thi bằng lái</h2>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Trường ĐH FPT, Quận 9, HCM</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>tranthequanganime@gmail.com</p>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <h4 className="text-light mb-4">Bản đồ nơi học lái xe</h4>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530488!2d106.80730807465963!3d10.841132857997609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1695719596032!5m2!1svi!2s" width="400" height="300" style={{ border: '0' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
