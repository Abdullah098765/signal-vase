import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CommentSection({ signal, user, loggedIn }) {
    const [newComment, setNewComment] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [imageLoading, setImageLoading] = useState(false);


    const handleSelectImage = async (e) => {
        setImageLoading(true)
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Initialize Firebase Storage
            const storage = getStorage();

            // Create a reference to the storage service
            const storageRef = ref(storage, `comment_images/${selectedFile.name}`);

            // Upload the image to Firebase Storage
            await uploadBytes(storageRef, selectedFile);

            // Get the download URL for the uploaded image
            getDownloadURL(storageRef).then((_imageUrl) => {
                setImageUrl(_imageUrl)
                setImageLoading(false)
            })



            // Now 'imageUrl' contains the URL of the uploaded image.
            // You can use this URL to display the image in your comments or store it in your database.
        }
    };
    const handleCommentSubmit = async () => {

        // Implement your comment submission logic here
        const commentData = {
            text: newComment,
            image: imageUrl, // You can send the image data or URL here
            user: {
                displayName: user.displayName,
                profilePicture: user.profilePicture,
            },
            createdAt: new Date(),
        };

        // Add the new comment to your signal.comments array or send it to the backend

        // Clear the comment input and image after submission
        setNewComment('');
        setImageUrl(undefined);
    };
    return (
        <div>
            <div
                id="comment-section"
                className={`mt-4 border-t border-gray-300 pt-4  ${true ? 'max-h-screen transition-max-height ease-out duration-300' : 'max-h-0 overflow-hidden'
                    }`}
            >

                <h3 className="text-lg font-semibold mb-2 text-black">Comments</h3>
                {signal.comments.map((comment, index) => (
                    <></>
                    // <div key={index} className="mb-4">
                    //     <div className="flex items-center text-sm">
                    //         <img
                    //             src={comment.user.profilePicture}
                    //             alt={comment.user.displayName}
                    //             className="w-6 h-6 object-cover rounded-full"
                    //         />
                    //         <p className="ml-2 font-semibold text-black">{comment.user.displayName}</p>
                    //     </div>
                    //     <p className="mt-2 text-sm text-black">{comment.text}

                    //     </p>

                    //     {/* Display timestamp */}
                    //     <p className="mt-1 text-xs text-gray-500">
                    //         {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    //     </p>
                    // </div>

                ))}
                <div className="mt-6">
                    <div className="flex flex-col items-stretch justify-center">

                        {/* Existing code... */}
                        <div className="relative">
                            <textarea
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="w-full bg-gray-100 rounded p-2 focus:outline-none"
                                placeholder="Write your comment..."
                            />
                            {/* Input for image upload with FontAwesome icon */}
                            <div className="absolute bottom-0 right-3 mb-2 mr-2">
                                <label htmlFor="file-input" className="cursor-pointer">
                                    {imageLoading  ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-gray-400"></div> : <FontAwesomeIcon className='text-gray-400' icon={faImage} size="" />}

                                </label>
                                <input
                                    id="file-input"
                                    type="file"
                                    onChange={handleSelectImage}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>
                        </div>
                        {/* Button to submit the comment */}
                        <button
                            className={`bg-black text-white flex justify-center mt-3 mb-3  p-2  rounded hover:bg-gray-900 ml-2 ${true ? 'bg-gray-900' : ''
                                }`}
                            onClick={handleCommentSubmit}
                        >
                            {loggedIn && (
                                <img
                                    src={user.profilePicture}
                                    alt={user.displayName}
                                    className="w-6 h-6 object-cover rounded-full mr-2"
                                />
                            )}
                            Comment
                        </button>
                        {/* Remaining code... */}
                    </div>
                </div>
            </div>
        </div>
    )
}
