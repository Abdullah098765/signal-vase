import React from 'react'

export default function CommentSection({ signal, user, loggedIn }) {
    const handleCommentSubmit = () => {
        // Implement your like logic here
    };
    return (
        <div>
            <div
                id="comment-section"
                className={`mt-4 border-t border-gray-300 pt-4  ${true ? 'max-h-screen transition-max-height ease-out duration-300' : 'max-h-0 overflow-hidden'
                    }`}
            >
                {/* Comment input form */}

                <h3 className="text-lg font-semibold mb-2 text-black">Comments</h3>
                {/* Loop through and render comments */}
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

                        <textarea
                            type="text"
                            className="w-full bg-gray-100 rounded p-2  focus:outline-none"
                            placeholder="Write your comment..."
                        />
                        <button
                            className={`bg-black text-white flex justify-center mt-3 mb-3  p-2  rounded hover:bg-gray-900 ml-2 ${true ? 'bg-gray-900' : ''
                                }`}
                            onClick={handleCommentSubmit}
                        >
                            {loggedIn && <img
                                src={user.profilePicture}
                                alt={user.displayName}
                                className="w-6 h-6 object-cover rounded-full mr-2"
                            />}

                            Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
