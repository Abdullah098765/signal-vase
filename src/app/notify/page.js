"use client"


import { toast } from 'react-toastify';

export default function MyComponent() {
    const notify = () => {
        toast('Notification message');
    };

    return (
        <div>
            <button onClick={notify}>Show Notification</button>
        </div>
    );
}
