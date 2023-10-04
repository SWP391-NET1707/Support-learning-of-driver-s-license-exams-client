import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'

const Footer = () => {
  return (
    <div class="container-fluid bg-dark text-light footer my-6 mb-0 py-6 wow fadeIn box-margin132" data-wow-delay="0.1s">
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 col-md-6">
                    <h4 class="text-white mb-4">Liên lạc</h4>
                    <h2 class="text-primary mb-4"><i class="fa fa-car text-white me-2"></i>Học và thi bằng lái</h2>
                    <p class="mb-2"><i class="fa fa-map-marker-alt me-3"></i>Trường ĐH FPT, Quận 9, HCM</p>
                    <p class="mb-2"><i class="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p class="mb-2"><i class="fa fa-envelope me-3"></i>tranthequanganime@gmail.com</p>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4 class="text-light mb-4">Quick Links</h4>
                    <a class="btn btn-link" href="/">About Us</a>
                    <a class="btn btn-link" href="/">Contact Us</a>
                    <a class="btn btn-link" href="/">Our Services</a>
                    <a class="btn btn-link" href="/">Terms & Condition</a>
                    <a class="btn btn-link" href="/">Support</a>
                </div>
                <div class="col-lg-6 col-md-6">      
                    <h4 class="text-light mb-4">Bản đồ nơi học lái xe</h4>             
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530488!2d106.80730807465963!3d10.841132857997609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1695719596032!5m2!1svi!2s" title="myFrame"></iframe>
                </div>
              <div class="col-lg-3 col-md-6">
                    <h4 class="text-light mb-4">Newsletter</h4>
                    <form action="">
                        <div class="input-group">
                            <input type="text" class="form-control p-3 border-0" placeholder="Your Email Address" />
                            <button class="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <h6 class="text-white mt-4 mb-3">Follow Us</h6>
                    <div class="d-flex pt-2">
                        <a class="btn btn-square btn-outline-light me-1" href="/"><i class="fab fa-twitter"></i></a>
                        <a class="btn btn-square btn-outline-light me-1" href="/"><i class="fab fa-facebook-f"></i></a>
                        <a class="btn btn-square btn-outline-light me-1" href="/"><i class="fab fa-youtube"></i></a>
                        <a class="btn btn-square btn-outline-light me-0" href="/"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Footer;