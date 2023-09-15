// import NextLink from 'next/link';
import { FaFacebook, FaInstagram, FaLinkedin, FaSkype, FaPhone, FaEnvelope, FaBell } from 'react-icons/fa';
// Other imports...
import './nav.css';

const NavbarLinks = () => {
  return (
    <div className="bg-white p-2 text-black text-sm p-3">
      <div className="container mx-auto flex justify-around items-center">
        <div>
          {/* <NextLink href="/"> */}
            <a className="mr-4 nav-bar-link navbarLink">Home</a>
          {/* </NextLink> */}
          {/* <NextLink href="/offers"> */}
            <a className="mr-4 nav-bar-link navbarLink">Offers</a>
          {/* </NextLink> */}
          {/* <NextLink href="/portfolio"> */}
            <a className="mr-4 nav-bar-link navbarLink">Portfolio</a>
          {/* </NextLink> */}
          {/* <NextLink href="/services"> */}
            <a className="mr-4 nav-bar-link navbarLink">Services</a>
          {/* </NextLink> */}
          {/* <NextLink href="/review"> */}
            <a className="mr-4 nav-bar-link navbarLink">Review</a>
          {/* </NextLink> */}
          {/* <NextLink href="/about"> */}
            <a className="mr-4 nav-bar-link navbarLink" >About</a>
          {/* </NextLink> */}
          {/* <NextLink href="/contact"> */}
            <a className='nav-bar-link navbarLink'>Contact Us</a>
          {/* </NextLink> */}
        </div>
        <div className='flex justify-center text-red-700 ' >
          <a href="#" className="ml-2">
            <FaBell className='outlineBell' size="1.5em" />
          </a>
          <a className='ml-5  '>Maaz</a>

      
      
        </div>
      </div>
    </div>
  );
};

export default NavbarLinks;
