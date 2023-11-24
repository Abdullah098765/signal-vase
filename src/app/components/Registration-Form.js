import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; // Import the Google icon
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from "../../../firebaseConfig";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthernet } from '@fortawesome/free-solid-svg-icons';
import './components.css'
import { usePathname } from 'next/navigation';


const RegistrationForm = () => {
  const auth = getAuth();
  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const pathName = usePathname()

  const signInWithGoogle = async () => {
    setTimeout(() => {
      setIsGoogleClicked(false)
    }, 20000);

    const provider = new GoogleAuthProvider();
    setIsGoogleClicked(true)

    var result = await signInWithPopup(auth, provider)
    console.log(result);
    if (result) {

      const password = result.user.uid.split('').reverse().join('')
      function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomId += characters.charAt(randomIndex);
        }
      
        return randomId;
      }
      
      // Generate a 5-character random ID
      const randomId = generateRandomId(5);
      

      // console.log(result.user.displayName + " is Signed in.");
      try {
        // Send userData to your server to register the user
        const response = await fetch('https://signal-hub.vercel.app/api/signUp', {
          method: 'POST',
          body: JSON.stringify(
            {
              fireBaseUid: result.user.uid,
              displayName: result.user.displayName,
              email: result.user.email, // User's email address
              profilePicture: result.user.photoURL,
              phone: result.user.phoneNumber,
              SubscribersFCMTokens: [],
              password: password+randomId
            }
          ),

        });

        if (response.ok) {
          // User registration on the server was successful
          console.log('User registered on the server.', response);
          window.localStorage.setItem('uid', result.user.uid)
          setIsGoogleClicked(false)

          window.location = 'https://signal-hub.vercel.app/' + pathName
          console.log(pathName);
        } else {
          // Handle server registration error
          window.localStorage.setItem('uid', result.user.uid)
          window.location = 'https://signal-hub.vercel.app/' + pathName
          console.log('User Exist in Database', pathName);

        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error registering user on the server:', error);

      };



    }
    else {
      setIsGoogleClicked(false)
      alert('Unable To sign In')
    }


  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle registration logic here (e.g., using Firebase).
    // You can send the form data to your authentication service.
    // Then, close the modal.
    // onClose();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold flex justify-center mb-4">Join</h2>

      <div className="mb-4">
        {/* Google Sign-Up Button */}
        <button
          className="w-full p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center"
          onClick={() => {
            if (!isGoogleClicked) {
              signInWithGoogle();
            }
          }}
          disabled={isGoogleClicked}
        >
          {isGoogleClicked ? (
            <div className="w-5 h-5 border-t-2 border-gray-500 border-solid rounded-full animate-spin mr-2"></div>
          ) : (
            <>
              <FcGoogle className="mr-2" size={24} /> Sign Up with Google
            </>
          )}
        </button>
      </div>


      <h2 className="text-lg items-center align-middle flex justify-center font-semibold mb-4">Or Connect</h2>

      <div className="mb-4">
        {/* Metamask Sign-Up Button */}
        <button
          title='Enable Soon'
          className="w-full p-2 tooltip bg-white border border-gray-300 rounded-md cursor-not-allowed hover-bg-gray-100 flex items-center justify-center"
          onClick={() => {
            // Implement your Metamask registration logic here
          }}
          disabled={true} // Disable the button as it's not yet implemented
        >
          <div>

            <svg fill="none" height="24" className='mr-2' viewBox="0 0 35 33" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726" /><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" /><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z" /><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z" /><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z" /><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z" /><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" /><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" /></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447" /><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447" /><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228" /><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228" /><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228" /><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228" /><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525" /><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525" /><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525" /><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525" /><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f" /><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f" /><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d" /><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616" /><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a" /><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a" /><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f" /><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f" /><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f" /></g></svg>
          </div>
          <span className="mr-2">Metamask</span>

          <span class="tooltiptext">Feature Under Development</span>

        </button>
      </div>
      <div className="mb-4">
        {/* Coinbase Sign-Up Button */}
        <button
          className="w-full p-2 tooltip bg-white border border-gray-300 rounded-md hover-bg-gray-100 flex items-center justify-center cursor-not-allowed"
          onClick={() => {
            // Implement your Coinbase registration logic here
          }}
          disabled={true} // Disable the button as it's not yet implemented
        >
          <svg width="24" height="24" className='mr-2' viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <circle cx="512" cy="512" r="512" fill='#0052ff' />
            <path d="M516.3 361.83c60.28 0 108.1 37.18 126.26 92.47H764C742 336.09 644.47 256 517.27 256 372.82 256 260 365.65 260 512.49S370 768 517.27 768c124.35 0 223.82-80.09 245.84-199.28H642.55c-17.22 55.3-65 93.45-125.32 93.45-83.23 0-141.56-63.89-141.56-149.68.04-86.77 57.43-150.66 140.63-150.66z" fill='#fff' />
          </svg>
          <span className="mr-2">Coinbase</span>
          <span class="tooltiptext">Feature Under Development</span>

        </button>
      </div>
      <div className="mb-4">
        {/* Binance Wallet Sign-Up Button */}
        <button
          className="w-full p-2 bg-white tooltip border border-gray-300 rounded-md hover-bg-gray-100 cursor-not-allowed flex items-center justify-center"
          onClick={() => {
            // Implement your Binance Wallet registration logic here
          }}
          disabled={true} // Disable the button as it's not yet implemented
        >
          <svg height={24} width={24} className='mr-2' viewBox="0 0 126.61 126.61" xmlns="http://www.w3.org/2000/svg"><g fill="#f3ba2f"><path d="m38.73 53.2 24.59-24.58 24.6 24.6 14.3-14.31-38.9-38.91-38.9 38.9z" /><path d="m0 63.31 14.3-14.31 14.31 14.31-14.31 14.3z" /><path d="m38.73 73.41 24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88z" /><path d="m98 63.31 14.3-14.31 14.31 14.3-14.31 14.32z" /><path d="m77.83 63.3-14.51-14.52-10.73 10.73-1.24 1.23-2.54 2.54 14.51 14.5 14.51-14.47z" /></g></svg>
          <span className="mr-2">Binance Wallet</span>
          <span class="tooltiptext">Feature Under Development</span>

        </button>
      </div>
    </div>

  );
};

export default RegistrationForm;
