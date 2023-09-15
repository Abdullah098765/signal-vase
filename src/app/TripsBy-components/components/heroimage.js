import React from 'react'

export default function HeroImage() {
    return (
        <div className='hero-container'>

            <div className='fram95'>
                <p className='headLine'>We take care of the journey</p>
                <p className='services'>
                    Lorem ipsum dolor sit amet consectetur. Nisl amet libero aliquam mauris. Amet sed morbi gravid
                </p>


                <div className='play'>
                    <button className='play-button'>
                        Play My Trip
                    </button>
                </div>
            </div>
            <div className='rating'>
                <div className='star rounded-full'>
                    <svg class="w-4 h-4 text-white mr-1 star-icone" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className='rate'>5.0</p>
                </div>
            </div>
            <img className='anti' src='https://firebasestorage.googleapis.com/v0/b/olx-app-9a451.appspot.com/o/smiley-woman-posing-her-baggage%201%201.png?alt=media&token=3ec3c66c-9da6-4a18-93d4-38b102f4fc46'>
            </img>
            <img className='errow' src='https://firebasestorage.googleapis.com/v0/b/olx-app-9a451.appspot.com/o/Vector%20(2).png?alt=media&token=2a04b0d0-c38a-4b5a-9a35-b1905844f00a'>
            </img>
            <div className='trans-cart '>
                <div className='bg-icon rounded-full'>
                    <img className='bag-icon' src='https://firebasestorage.googleapis.com/v0/b/olx-app-9a451.appspot.com/o/backpack-svgrepo-com%201.png?alt=media&token=5388f8fa-581a-4fcc-92b0-09e4bced109a'/>
                </div>
                <p className='simple-step'>Get your itenrary in few simple steps</p>
            </div>
            
        </div>
    )
}
