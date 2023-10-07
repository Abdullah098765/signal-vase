"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/sidebar'
import MainDashboard from '../components/mainDashboard.js'
import '../components/components.css'
import Navbar from '../components/navbar';
import { MyContextProvider, useMyContext } from '../context/context';


const Dashboard = () => {




	return (
		<div className="text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200  w-full">
			<div>
				<MyContextProvider>
					<Navbar />
					<Sidebar />
					<MainDashboard/>
				</MyContextProvider >

			</div>
		</div>

	);
};

export default Dashboard;
