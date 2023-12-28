import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const PersonalInfor = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(false)
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
                maxLength={25}
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

  const handleRemoveLink = (indexToRemove) => {
    const updatedLinks = personalInformation.socialMediaLinks.filter((_, index) => index !== indexToRemove);
    // Assuming you have a way to update the state or variable holding this array
    setPersonalInformation(prevState => ({
      ...prevState,
      socialMediaLinks: updatedLinks
    }));
  };
  console.log(localStorage.getItem('uid').toLowerCase(), user.fireBaseUid);

  return (<>


    {isEditing ? <div className="mt-4 w-full flex flex-col">
      <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
        <div className='absolute right-12'>
          <button
            className="text-sm px-2 py-1 mr-2 rounded bg-gray-500 text-white hover:bg-gray-600 cursor-pointer "
            onClick={handleSave}
          >
            Reset
          </button>
          <button
            className="text-sm px-2 py-1 rounded bg-red-700 text-white hover:bg-red-900  cursor-pointer "
            onClick={handleSave}
          >
            Save
          </button>
        </div>
        <AddLinkModal />
        <h4 className="text-xl text-gray-900 font-bold">
          Personal Info
        </h4>
        <div className="mt-2 text-gray-700">
          <div className="flex border-y py-2 md:flex-row flex-col" >
            <span className="font-bold w-24">Full name: </span>
            <input
              type="text"
              value={personalInformation.fullName}
              onChange={(e) => handleChange(e, 'fullName')}
            />
          </div>
          <div className="flex border-b py-2 md:flex-row flex-col ">
            <span className="font-bold w-24">Age: </span>
            <input
              type="text"
              value={personalInformation.age}
              onChange={(e) => handleChange(e, 'age')}
            />
          </div>

          <div className="flex border-b py-2 md:flex-row flex-col ">
            <span className="font-bold w-24">Mobile: </span>
            <input
              type="text"
              value={personalInformation.mobile}
              onChange={(e) => handleChange(e, 'mobile')}
            />
          </div>
          <div className="flex border-b py-2 md:flex-row flex-col ">
            <span className="font-bold w-24">Email: </span>
            <input
              type="text"
              value={personalInformation.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>
          <div className="flex border-b py-2 md:flex-row flex-col ">
            <span className="font-bold w-24">Market: </span>
            <input
              type="text"
              value={personalInformation.market}
              onChange={(e) => handleChange(e, 'market')}
            />
          </div>
          <div className="flex border-b py-2 md:flex-row flex-col ">
            <span className="font-bold w-24">Languages: </span>
            <input
              type="text"
              value={personalInformation.languages}
              onChange={(e) => handleChange(e, 'languages')}
            />
          </div>
          <div className="flex border-b py-2 md:flex-row flex-col  ">
            <span className="font-bold w-24">Country: </span>
            <input
              type="text"
              value={personalInformation.country}
              onChange={(e) => handleChange(e, 'country')}
            />
          </div>
          <div className=" border-b py-2  flex md:flex-row flex-col ">
            <span className="font-bold  w-24 inline">Links: </span>

            {personalInformation.socialMediaLinks && personalInformation.socialMediaLinks.map((link, index) =>
              <div 
              key={index}
              className="relative text-blue-500 md:mr-4 mr-0 hover:text-blue-700">
                <a
                  target="_blank"
                  href={link.link}
                  className=""
                >
                  {link.title}
                </a>
                <span
                  onClick={() => handleRemoveLink(index)}
                  className="absolute _top-4 _right-10 cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </div>



            )}


            <svg onClick={() => setShowModal(true)} className='cursor-pointer md:mx-2 mx-0 hover:text-lg  mt-1' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
              <path d="M 25 2 C 12.264481 2 2 12.264481 2 25 C 2 37.735519 12.264481 48 25 48 C 37.735519 48 48 37.735519 48 25 C 48 12.264481 37.735519 2 25 2 z M 25 4 C 36.664481 4 46 13.335519 46 25 C 46 36.664481 36.664481 46 25 46 C 13.335519 46 4 36.664481 4 25 C 4 13.335519 13.335519 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
            </svg>
          </div>
          {/* Add more input fields for other personal information */}
        </div>
      </div>
    </div>

      :

      <div class="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div class="w-full flex flex-col 2xl:w-1/3">

          <div class="flex-1 bg-white rounded-lg shadow-xl p-8">
            <div className='absolute right-12'>
              {localStorage.getItem('uid').toLowerCase() === user.fireBaseUid && <button
                className="text-sm px-2 py-1 mr-2 rounded bg-gray-500 text-white hover:bg-gray-600 cursor-pointer "
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>}
            </div>
            <h4 class="text-xl text-gray-900 font-bold">Personal Info</h4>
            <ul class="mt-2 text-gray-700">
              <li class="flex border-y py-2  md:flex-row flex-col">
                <span className="font-bold w-24">Full name: </span>

                <span class="text-gray-700">{personalInformation.fullName}</span>
              </li>
              <li class="flex  md:flex-row flex-col border-b py-2">
                <span className="font-bold w-24">Age: </span>
                <span class="text-gray-700">{personalInformation.age}</span>
              </li>
              <li class="flex  md:flex-row flex-col border-b py-2">
                <span className="font-bold w-24">Mobile: </span>
                <span class="text-gray-700">{personalInformation.mobile}</span>
              </li>
              <li class="flex  md:flex-row flex-col border-b py-2">
                <span className="font-bold w-24">Email: </span>
                <span class="text-gray-700">{personalInformation.email}</span>
              </li>
              <li class="flex  md:flex-row flex-col border-b py-2">
                <span className="font-bold w-24">Market: </span>
                <span class="text-gray-700">{personalInformation.market}</span>
              </li>
              <li class="flex  md:flex-row flex-col border-b py-2">
                <span className="font-bold w-24">Languages: </span>
                <span class="text-gray-700">{personalInformation.languages}</span>
              </li>
              <li class="flex  md:flex-row flex-col border-b py-2">
                <span className="font-bold w-24">Country: </span>
                <span class="text-gray-700">{personalInformation.country}</span>
              </li>
              <div className=" border-b py-2  flex md:flex-row flex-col ">
                <span className="font-bold  w-24 inline">Links: </span>

                {personalInformation.socialMediaLinks && personalInformation.socialMediaLinks.map((link, index) =>
                  <div 
                  key={index}
                   className="relative text-blue-500 md:mr-4 mr-0 hover:text-blue-700">
                    <a
                      target="_blank"
                      href={link.link}
                      className=""
                    >
                      {link.title}
                    </a>
                  </div>



                )}



              </div>
            </ul>
          </div>



        </div>




      </div>}
  </>
  );
};

export default PersonalInfor;
