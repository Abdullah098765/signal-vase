import React from 'react'
import './tripby.css'
import logo from '../../../../assets/tripbylogo.PNG'

export default function Navbar() {
  return (
    <div className='navbar '>

      <div className='flex-row flex nv-items'>
        <div className='logo'>
          <img width="100" height="50" src={'https://scontent.fkhi16-1.fna.fbcdn.net/v/t39.30808-6/374770381_849872559878792_8817087264110250724_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6a0516&_nc_ohc=ZuN5dDqFDuIAX_E-219&_nc_ht=scontent.fkhi16-1.fna&oh=00_AfA-zd8AUB1Uz4UwrUMltX-tR181T-_AEBIbamCf7Di0JQ&oe=64F848AF'} />
        </div>
        <div className='search-bar'>
          <input type='search' className='search-input fixed' placeholder='Search Trips'></input>
          <div className='search-icon'>
            <div className='glass '>
              <svg class="w-4 h-4 text-white dark:text-white text-base" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>

            </div>
          </div>
        </div>

        <div className='profile'>
          <img className='profile-pic rounded-full' src={'https://flowbite.com/docs/images/people/profile-picture-5.jpg'} />
          <p className='profile-name text-base'>Amir Adnan</p>
          <p className='view-profile '>
            <u>View profile</u>
          </p>


        </div>
      </div>
    </div>
  )
}
