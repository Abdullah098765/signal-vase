import { faCheck, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMyContext } from '../context/context';

export default function CommentSection({ signal, user, loggedIn }) {
    const [comments, setComments] = useState(signal.comments)
    const [newComment, setNewComment] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [imageLoading, setImageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        console.log(signal.comments);
    }, [])

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
    const { setRouterLoading} = useMyContext();

    async function sendNotification(signalId, commentData) {
        try {
            const response = await fetch('https://signal-hub.vercel.app/api/comment-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentData, signalId }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleCommentSubmit = async () => {
        setLoading(true)
        // Implement your comment submission logic here

        const commentData = {
            cFireBaseUid: user.fireBaseUid,
            text: newComment,
            image: imageUrl, // You can send the image data or URL here
            cDisplayName: user.displayName,
            cProfilePicture: user.profilePicture,
            createdAt: new Date(),
        };

        // Add the new comment to your signal.comments array or send it to the backend
        const signalId = signal._id; // Replace with the actual signalId
        const requestBody = { commentData, signalId };

        try {
            const response = await fetch('https://signal-hub.vercel.app/api/comment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                console.log('Comment submitted successfully');
                setLoading(false)
                sendNotification(signalId, commentData)
                comments.push(commentData)
            } else {
                console.error('Error submitting comment:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }

        // Clear the comment input and image after submission
        setNewComment('');
        setImageUrl(undefined);
        console.log(commentData);
    };
    const router = useRouter()
    return (
        <div>
            <div
                id="comment-section"
                className={`mt-4 border-t border-gray-300 pt-4 '
                    }`}
            >

                <h3 className="text-lg font-semibold mb-2 text-black">{comments.length} Comments</h3>
                {comments.map((comment, index) => (
                    <div key={index} className="mb-4">
                        <div onClick={() => {
                            setRouterLoading(true)

                            comment.cFireBaseUid &&    router.push('/signal-provider/' + comment.cFireBaseUid)
                        }} className="flex items-center cursor-pointer hover:underline text-sm">
                            {comment.cProfilePicture && (
                                <img
                                    src={comment.cProfilePicture}
                                    alt={comment.cDisplayName}
                                    className="w-6 h-6 object-cover rounded-full"
                                />
                            )}
                            <p className={`ml-2 font-semibold text-black ${comment.cProfilePicture ? 'mt-1' : ''}`}>
                                {comment.cDisplayName}
                            </p>
                        </div>
                        <p className="mt-2 text-sm text-black">{comment.text}</p>

                        {/* Display timestamp */}
                        <p className="mt-1 text-xs text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </p>

                        {/* Display the image if it exists in the comment */}
                        {comment.image && (
                            <div className="mt-2">
                                <img
                                    onClick={() => {
                                        window.open(comment.image)
                                    }}
                                    src={comment.image}
                                    alt={`Comment Image by ${comment.image}`}
                                    className="w-24 h-24 cursor-pointer hover:opacity-5 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>
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
                                {!imageUrl ?
                                    <label htmlFor="file-input" className="cursor-pointer">
                                        {imageLoading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-gray-400"></div> : <FontAwesomeIcon className='text-gray-400' icon={faImage} size="" />}

                                    </label> : <FontAwesomeIcon onClick={() => setImageUrl(undefined)} className='text-gray-400' icon={faCheck} size="" />
                                }

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
                            onClick={() => {
                                if (!loading && newComment !== '') {
                                    handleCommentSubmit()
                                }
                            }}
                        >
                            {loading ? < div className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-blue-400"></div> : <>{loggedIn && (

                                <img
                                    src={user.profilePicture}
                                    alt={user.displayName}
                                    className="w-6 h-6 object-cover rounded-full mr-2"
                                />
                            )}
                                Comment
                            </>}



                        </button>
                        {/* Remaining code... */}
                    </div>
                </div>
            </div >
        </div >
    )
}
