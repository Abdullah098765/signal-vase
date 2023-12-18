import React from 'react';
import About from "./About.js"
import { MyContextProvider } from '../context/context.js';
import RouterLoading from '../components/routerLoading.js';
import Navbar from '../components/navbar.js';
import Sidebar from '../components/sidebar.js';
import Modal from '../components/signUp-Model.js';

const Page = () => {
      return (

            <div>
                  <MyContextProvider>
                        <RouterLoading />

                        <Navbar />
                        <div className='flex'>
                              <Sidebar />
                              <About />

                        </div>
                        <Modal />
                  </MyContextProvider>
            </div>
      );
}

export default Page;
