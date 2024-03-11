import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Assets({ toggleAssets }) {

  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div className='flex items-center p-4 border-b border-gray-200 md:justify-between'>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleAssets()}>❌</p>
                    <div>
                        <input type='text' placeholder='Enter asset name'/>
                        <input type="text" placeholder='Enter link here' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Assets