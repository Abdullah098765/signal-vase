'use client'
import React, { useEffect, useState } from 'react';
import { useMyContext } from '../context/context';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const storage = getStorage(); // Assuming 'app' is your Firebase app instance

const EditProfileModal = ({ }) => {
    const { isEditModalOpen, setIsEditModalOpen, user } = useMyContext()


    const [formData, setFormData] = useState({
        displayName: user.displayName,
        profilePicture: user.profilePicture,
        bio: user.bio,
        about: user.about,
        uid: user._id,
        market: user.market

    });
    const [isLoading, setIsLoading] = useState(false);

    const [imageUploading, setImageUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = async (e) => {

        const file = e.target.files[0];
        if (file) {
            setImageUploading(true)
            try {
                // Create a reference to the storage location for the user's profile picture
                const profilePictureRef = ref(storage, `profile-pictures/${user._id}/${file.name}`);

                // Upload the file to Firebase Storage
                await uploadBytes(profilePictureRef, file);

                // Get the download URL for the uploaded image
                const imageUrl = await getDownloadURL(profilePictureRef);

                // Update the user's profile picture URL in the local state or database
                setSelectedImage(file);
                setFormData({ ...formData, profilePicture: imageUrl });
                setImageUploading(false)
            } catch (error) {
                console.error('Errrror uploading the image to Firebase Storage:', error);
                // Handle error here
            }
        }
    };

    const handleSubmit = async (e) => {
        const origin = window.origin
        e.preventDefault(); // Prevent the default form submission
        setIsLoading(true)
        try {
            const response = await fetch('/api/edit-user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                console.log('User updated:', updatedUser);
                window.location = origin + '/profile'
                // Handle success here
            } else {
                console.error('User update failed');
                // Handle error here
            }

        } catch (error) {
            console.error('Error updating user:', error);
            // Handle error here
        }
    };



    useEffect(() => {
        formData.displayName = user.displayName
        formData.profilePicture = user.profilePicture
        formData.bio = user.bio
        formData.about = user.about
        formData.uid = user._id
        formData.market = user.market
        // setSelectedImage(user.profilePicture)
    }, [user])
    if (!isEditModalOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Dark overlay */}
            <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>

            <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
                    <svg
                        className="fill-current text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        onClick={() => {
                            setIsEditModalOpen(false)

                        }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 5.293a1 1 0 011.414 0L9 7.586l2.293-2.293a1 1 0 111.414 1.414L10.414 9l2.293 2.293a1 1 0 01-1.414 1.414L9 10.414l-2.293 2.293a1 1 0 01-1.414-1.414L7.586 9 5.293 6.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>

                <form onSubmit={handleSubmit} className="max-w-2xl">
                    <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                        <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">Edit Profile:</h2>

                        <div className="flex items-center flex-col w-full border-gray-400">
                            <div>
                                <label htmlFor="file-input" className="avatar-input">
                                    {imageUploading ? <>
                                        <div className="animate-spin rounded-full w-20 h-20  mx-4 border-t-2 border-b-2 border-blue-500"></div>
                                    </> : <img
                                        src={selectedImage ? URL.createObjectURL(selectedImage) : formData.profilePicture}
                                        className="w-20 h-20 rounded-full mx-4 border-2 border-gray-500 transition duration-300 object-cover cursor-pointer"
                                        alt={user.displayName}
                                        key={new Date().getTime()} // Use a timestamp as a unique key
                                        style={{
                                            // CSS styles for the hover state
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                    />}
                                    <label className="text-gray-600 dark:text-gray-400">Profile Picture</label>

                                    <input
                                        id="file-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="file-input hidden"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full border-gray-400">
                            <div>
                                <label className="text-gray-600 dark:text-gray-400">Display Name</label>
                                <input
                                    type="text"
                                    maxLength={15}
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                />
                            </div>

                            <div>
                                <label className="text-gray-600 dark:text-gray-400">Bio</label>
                                <textarea
                                    name="bio"
                                    maxLength={65}
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 dark:text-gray-100"
                                ></textarea>
                            </div>
                            <div>
                                <label className="text-gray-600 dark:text-gray-400">About</label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark:bg-gray-600 "
                                ></textarea>
                            </div>
                            <div className="">
                                <label htmlFor="selectField" className="text-gray-600 dark:text-gray-400">Trading Market:</label>
                                <select
                                    id="selectField"
                                    name="market"
                                    value={formData.market}
                                    onChange={handleChange}
                                    className="block w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 dark:bg-gray-600 dark:text-gray-100"
                                >
                                    <option value="Crypto/Forex" >Crypto/Forex</option>
                                    <option value="Crypto">Crypto</option>
                                    <option value="Forex">Forex</option>
                                </select>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="py-1.5 px-3 m-1 text-center bg-gray-700 border rounded-md text-white hover:bg-gray-500 hover:text-gray-100 dark:text-gray-200 dark:bg-violet-700"
                                >
                                    {isLoading ?
                                        <div className="w-5 h-5 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                                        : 'Save changes'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default EditProfileModal;

