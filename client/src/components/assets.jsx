import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Assets({ toggleAssets }) {

    const [asset,setAsset] = useState({
        asset_name: '',
        asset_link: ''
    })

    const StoreAsset = ()=>{
        console.log(asset)
        axios.post('/assets/store',asset)
        .then(()=>{
            console.log("SENT")
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div className='flex items-center p-4 border-b border-gray-200 md:justify-between'>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleAssets()}>❌</p>
                    <div>
                        <label>3D Model</label><br/>
                        <input type='text' placeholder='furniture name' value={asset.asset_name} onChange={(e)=>setAsset(({...asset,asset_name: e.target.value}))}/><br/>
                        <label>Upload your gltf model exported from blender {`(3D engine )`}<a href='https://glitch.com/'>here</a> to get the link of your gltf model</label><br/>
                        <a href=''>watch tutorial for reference</a><br/>
                        <input type="text" placeholder='Enter link here' value={asset.asset_link} onChange={(e)=>setAsset(({...asset,asset_link: e.target.value}))}/><br/>
                        <button onClick={StoreAsset}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Assets