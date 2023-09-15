// import NextLink from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaSkype, FaPhone, FaEnvelope, FaTwitter, FaTelegramPlane } from 'react-icons/fa';
import './nav.css'
const Topbar = () => {


    return (
        <nav className="bg-red-700 p-2 flex flex-row topbar">
            <div className='flex flex-row '>
                <a href="https://www.facebook.com/your-facebook-link" className="ml-2 text-white">
                    <FaFacebook size="1.35em" />
                </a>
                <a href="https://www.instagram.com/your-instagram-link" className="ml-2  text-white">
                    <FaInstagram size="1.35em" />
                </a>
                <a href="https://www.linkedin.com/company/your-linkedin-link" className="ml-2  text-white">
                    <FaLinkedin size="1.35em" />
                </a>
                <a href="https://www.linkedin.com/company/your-linkedin-link" className="ml-2  text-white">
                    <FaTwitter size="1.35em" />
                </a>
                <a href="https://www.linkedin.com/company/your-linkedin-link" className="ml-2  text-white">
                    <FaSkype size="1.35em" />
                </a>

                <div class="header-line-separator"></div>
                <p class="header-address">The term separator in oilfield terminology</p>
            </div>

            <div className=' flex flex-row'>
            <div class="contact-text-icon flex flex-row  text-white">
                <FaTelegramPlane size="1.35em" />
                <p class="header-address">+92 34545672323</p></div>
                <div class="contact-text-icon-next flex flex-row ml-2  text-white">
                <FaSkype size="1.35em" />

                <p class="header-address">ifbotix@gmail.com</p></div>
            </div>


        </nav>
    );
};

export default Topbar;
