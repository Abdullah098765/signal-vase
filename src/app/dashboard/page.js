"use client";
import React from 'react';
import Sidebar from '../components/sidebar'
import '../components/components.css'
import Navbar from '../components/navbar';
import { MyContextProvider } from '../context/context';


const Dashboard = () => {
	const currentURL = new URL(window.location.href);


	const uid = currentURL.searchParams.get('uid');
	console.log(uid);

	return (
		<div className="text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200  w-full">
			<div>
				<MyContextProvider>
					<Navbar />
					<Sidebar />
					
				</MyContextProvider >

			</div>
		</div>

	);
};

export default Dashboard;
