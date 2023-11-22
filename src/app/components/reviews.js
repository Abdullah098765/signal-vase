import React, { useEffect, useState } from 'react';
import { faCheck, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useMyContext } from '../context/context';

const Reviews = ({ provider, loggedIn }) => {
    const [reviews, setReviews] = useState(provider.reviews);
    const [newReview, setNewReview] = useState('');
    const [imageUrl, setImageUrl] = useState();
    const [imageLoading, setImageLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user, setIsModalOpen } = useMyContext();
    const [illigible, setIlligible] = useState(true);
    useEffect(() => {

        if (!provider.Subscribers.includes(user._id)) {
            setIlligible(false)
        }
    }, [user, provider])

    async function sendNotification(providerId, reviewData) {
        try {
            const response = await fetch('https://signal-hub.vercel.app/api/review-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reviewData, providerId }),
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
    const handleSelectImage = async (e) => {
        setImageLoading(true);
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            const storage = getStorage();
            const storageRef = ref(storage, `review_images/${selectedFile.name}`);

            await uploadBytes(storageRef, selectedFile);

            getDownloadURL(storageRef).then((_imageUrl) => {
                setImageUrl(_imageUrl);
                setImageLoading(false);
            });
        }
    };

    const handleReviewSubmit = async () => {
        setLoading(true);

        const reviewData = {
            rFireBaseUid: user.fireBaseUid,
            text: newReview,
            image: imageUrl,
            rDisplayName: user.displayName,
            rProfilePicture: user.profilePicture,
            createdAt: new Date(),
        };

        // Assume you have an API endpoint to handle reviews similar to the comment section
        const apiUrl = 'https://signal-hub.vercel.app/api/review';
        const requestBody = { reviewData, providerId: provider._id };

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                setReviews([...reviews, reviewData]); // Update reviews state
                setLoading(false);
                console.log('submitted');
                sendNotification(provider._id, reviewData)
                // Add any additional logic you need here, e.g., sending notifications
            } else {
                console.error('Error submitting review:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting review:', error.message);
        }

        setNewReview('');
        setImageUrl(undefined);
    };

    return (
        <div className='flex-1 bg-white shadow-xl p-8'>
            <h2 className='text-2xl font-semibold mb-4'>Reviews</h2>
            {reviews.map((review, index) => (
                <div key={index} className='mb-4'>
                    <div
                        onClick={() => {
                            // Handle click on user profile, e.g., navigate to user's profile page
                            router.push('/signal-provider/' + review.rFireBaseUid);
                        }}
                        className='flex items-center cursor-pointer hover:underline text-sm'
                    >
                        {review.rProfilePicture && (
                            <img
                                src={review.rProfilePicture}
                                alt={review.rDisplayName}
                                className='w-6 h-6 object-cover rounded-full'
                            />
                        )}
                        <p className={`ml-2 font-semibold text-black ${review.rProfilePicture ? 'mt-1' : ''}`}>
                            {review.rDisplayName}
                        </p>
                    </div>
                    <p className='mt-2 text-sm text-black'>{review.text}</p>

                    <p className='mt-1 text-xs text-gray-500'>
                        {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                    </p>

                    {review.image && (
                        <div className='mt-2'>
                            <img
                                onClick={() => {
                                    window.open(review.image);
                                }}
                                src={review.image}
                                alt={`Review Image by ${review.image}`}
                                className='w-24 h-24 cursor-pointer hover:opacity-5 object-cover rounded'
                            />
                        </div>
                    )}
                </div>
            ))}

            <div className='mt-6'>
                <div className='flex flex-col items-stretch justify-center'>
                    <div className='relative'>
                        <textarea
                            type='text'
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            className='w-full bg-gray-100 rounded p-2 focus:outline-none'
                            placeholder='Write your review...'
                        />
                        <div className='absolute bottom-0 right-3 mb-2 mr-2'>
                            {!imageUrl ? (
                                <label htmlFor='file-input' className='cursor-pointer'>
                                    {imageLoading ? (
                                        <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-gray-400'></div>
                                    ) : (
                                        <FontAwesomeIcon className='text-gray-400' icon={faImage} size='' />
                                    )}
                                </label>
                            ) : (
                                <FontAwesomeIcon onClick={() => setImageUrl(undefined)} className='text-gray-400' icon={faCheck} size='' />
                            )}

                            <input
                                id='file-input'
                                type='file'
                                onChange={handleSelectImage}
                                accept='image/*'
                                className='hidden'
                            />
                        </div>
                    </div>
                    <button
                        className={`bg-black text-white flex justify-center mt-3 mb-3 p-2 rounded hover:bg-gray-900 ml-2 ${loading ? 'bg-gray-900 cursor-not-allowed' : ''
                            }`}
                        onClick={() => {
                            if (!loading && newReview !== '') {
                                if (localStorage.getItem('uid')) {

                                    // if (illigible) {
                                    handleReviewSubmit();
                                    // }
                                    // else alert ("Only Subscribers Can review")

                                }
                                else setIsModalOpen(true)
                            }
                        }}
                        disabled={(loading || newReview === '') && provider._id === user._id}
                    >
                        {loading ? (
                            <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-blue-400'></div>
                        ) : (
                            <>
                                {localStorage.getItem('uid') && (
                                    <img
                                        src={user.profilePicture}
                                        alt={user.displayName}
                                        className='w-6 h-6 object-cover rounded-full mr-2'
                                    />
                                )}
                                Review
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
