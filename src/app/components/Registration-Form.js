import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc'; // Import the Google icon
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { firebaseConfig } from "../../../firebaseConfig";


const RegistrationForm = () => {
  const auth = getAuth();


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    var result = await signInWithPopup(auth, provider)
    console.log(result);
    if (result) {
      // console.log(result.user.displayName + " is Signed in.");
      try {
        // Send userData to your server to register the user
        const response = await fetch('https://signal-hub.vercel.app/api/signUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              fireBaseUid: result.user.uid,
              displayName: result.user.displayName,
              email: result.user.email, // User's email address
              profilePicture: result.user.photoURL,
              phone: result.user.phoneNumber,
              SubscribersFCMTokens:[]
            }
          ),
        });

        if (response.ok) {
          // User registration on the server was successful
          console.log('User registered on the server.', response);
          window.localStorage.setItem('uid', result.user.uid)
          window.location = 'http://localhost:3000/'
        } else {
          // Handle server registration error
          console.error('Server registration failed.');
        }
      } catch (error) {
        // Handle network or other errors
        console.error('Error registering user on the server:', error);

      };



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
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full p-2 bg-gray-900 text-white rounded-md hover:text-blue-300"
          >
            Sign Up
          </button>
        </div>
      </form>
      <p className="text-center text-gray-600">Or</p>
      <div className="mb-4">
        {/* Google Sign-Up Button */}
        <button
          className="w-full p-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 flex items-center justify-center"
          onClick={() => {
            signInWithGoogle()
            // Handle Google sign-up logic here (e.g., using Firebase).
            // You can redirect users to the Google sign-up page.
            // Then, close the modal.
            // onClose();
          }}
        >
          <FcGoogle className="mr-2" size={24} />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;
