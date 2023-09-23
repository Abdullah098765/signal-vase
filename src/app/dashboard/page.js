"use client";
import React, { useState } from 'react';
import Sidebar from '../components/sidebar'
import '../components/components.css'
import Navbar from '../components/navbar';
import { MyContextProvider } from '../context/context';


const Dashboard =  () => {
	const currentURL = new URL(window.location.href);
	const uid = currentURL.searchParams.get('uid');
  const [user, setUser] = useState({})
	var myHeaders = new Headers();
myHeaders.append("a", "dni");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "uid": uid
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/api/get-user", requestOptions)
  .then(response => response.text())
  .then(result => setUser(JSON.parse(result)))
  .catch(error => console.log('error', error));

	return (
		<div className="text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200  w-full">
			<div>
				<MyContextProvider>
					<Navbar />
					<Sidebar />
					<div>
					{user.displayName}
					<hr/>
					{user.email}
					</div>
				</MyContextProvider >

			</div>
		</div>

	);
};

export default Dashboard;
