import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const PersonalInfor = ({ user }) => {
  // State to hold personal information
  const [personalInformation, setPersonalInformation] = useState(user.personalInfo);
  // Function to handle changes in personal information
  const handleChange = (e, field) => {
    setPersonalInformation({
      ...personalInformation,
      [field]: e.target.value,
    });
  };

  // Function to save the updated information
  const handleSave = () => {
    console.log('Updated Personal Information:', personalInformation);
    // Logic to save the updated personalInformation state can be added here
  };
  const [showModal, setShowModal] = useState(false);

  const AddLinkModal = () => {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [titleError, setTitleError] = useState(false);
    const [linkError, setLinkError] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleSubmit = () => {
      if (!title) {
        setTitleError(true);
      } else {
        setTitleError(false);
      }

      if (!link) {
        setLinkError(true);
      } else {
        setLinkError(false);
      }

      if (title && link) {


        personalInformation.socialMediaLinks.push({
          title,
          link
        })

        closeModal();
      }
    };

    return (
      <div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-xl mb-4">Add Link</h2>
              {titleError && <p className="text-red-500">Title is required.</p>}
              {!titleError && <p className="text-gray-500">Platform</p>}

              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setTitleError(false); // Reset error on change
                }}
                className={`mb-2 mr-2 p-2 border rounded ${titleError ? 'border-red-500' : ''}`}
              />
              {linkError && <p className="text-red-500">Link is required.</p>}
              {!linkError && <p className="text-gray-500">Account Link</p>}

              <input
                type="text"
                placeholder="Link"
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                  setLinkError(false); // Reset error on change
                }}
                className={`mb-2 p-2 border rounded ${linkError ? 'border-red-500' : ''}`}
              />
              <div className="flex justify-end">
                <button className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={handleSubmit}>
                  Add
                </button>
                <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="mt-4 w-full flex flex-col">
      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
        <span
          className="text-sm hover:text-gray-500 absolute right-12 cursor-pointer hover:text-lg transition duration-300 ease-in-out"
          onClick={handleSave}
        >
          Edit
        </span>
        <AddLinkModal />
        <h4 className="text-xl text-gray-900 font-bold">
          Personal Info
        </h4>
        <div className="mt-2 text-gray-700">
          <div className="flex border-y py-2">
            <span className="font-bold w-24">Full name: </span>
            <input
              type="text"
              value={personalInformation.fullName}
              onChange={(e) => handleChange(e, 'fullName')}
            />
          </div>
          <div className="flex border-b py-2">
            <span className="font-bold w-24">Age: </span>
            <input
              type="text"
              value={personalInformation.age}
              onChange={(e) => handleChange(e, 'age')}
            />
          </div>

          <div className="flex border-b py-2">
            <span className="font-bold w-24">Mobile: </span>
            <input
              type="text"
              value={personalInformation.mobile}
              onChange={(e) => handleChange(e, 'mobile')}
            />
          </div>
          <div className="flex border-b py-2">
            <span className="font-bold w-24">Email: </span>
            <input
              type="text"
              value={personalInformation.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className="flex border-b py-2">
            <span className="font-bold w-24">Market: </span>
            <input
              type="text"
              value={personalInformation.market}
              onChange={(e) => handleChange(e, 'market')}
            />
          </div>
          <div className="flex border-b py-2">
            <span className="font-bold w-24">Languages: </span>
            <input
              type="text"
              value={personalInformation.languages}
              onChange={(e) => handleChange(e, 'languages')}
            />
          </div>
          <div className="flex border-b py-2">
            <span className="font-bold w-24">Country: </span>
            <input
              type="text"
              value={personalInformation.country}
              onChange={(e) => handleChange(e, 'country')}
            />
          </div>
          <div className="flex border-b py-2 items-center">
            <span className="font-bold w-24 inline">Links: </span>

            {personalInformation.socialMediaLinks && personalInformation.socialMediaLinks.map((link, index) =>
              <a target="_blank" key={index} href={link.link} className="text-blue-500 ml-4 hover:text-blue-700">{link.title}</a>
            )}
            <FontAwesomeIcon className='cursor-pointer hover:text-lg mx-2' onClick={() => setShowModal(true)} icon={faAdd} />
            {/* <input
              type="text"
              value={personalInformation.socialMediaLinks}
              onChange={(e) => handleChange(e, 'socialMediaLinks')}
            /> */}
          </div>
          {/* Add more input fields for other personal information */}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfor;
