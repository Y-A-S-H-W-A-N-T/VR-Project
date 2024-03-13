import React from 'react'
import '../css/shareScreen.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GrDocumentDownload } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

function Assets({ toggleAssets }) {

    const [asset,setAsset] = useState({
        asset_name: '',
        asset_link: ''
    })

    const StoreAsset = async()=>{
        console.log(asset)
        await axios.post('/assets/store',asset)
        .then((res)=>{
            console.log("SENT")
        })
        .catch((err)=>{
            console.log(err)
        })
        window.location.reload(false)
    }

  return (
    <div className='modal'>
        <div className='overlay'>
            <div className='modal-content'>
                <div className='p-10 pr-3 pl-3 md:grid md:grid-cols-1 lg:grid-cols-1 xl:grid-col-1 gap-4 bg-gradient-to-r from-amber-100 to-amber-200 '>
                    <p style={{justifyContent: 'center', padding: '0px',marginLeft: 'auto',cursor: 'pointer'}} onClick={()=>toggleAssets()}><RxCross2 size={24} className='mb-4' /></p>
                    <div className='mb-4 bg-white rounded-sm p-3 w-full'>
                        <label className='font-extrabold text-3xl text-black flex '>3D Model <GrDocumentDownload className='' /></label><br/>
                        <input type='text'
                        className='
                        bg-slate-200
                        border border-gray-400 text-black-400 rounded-xl w-full p-2 mt-2 mb-2 mr-4' placeholder='Furniture name' value={asset.asset_name} onChange={(e)=>setAsset(({...asset,asset_name: e.target.value}))}/><br/>
                        <label className='font-thin text-slate-300 text-purple-400'>Upload your gltf model exported from blender {`(3D engine )`}<Link target="_blank" to='https://glitch.com/'  className='text-underline text-blue-700 font-extrabold pl-2 pr-2 hover:text-blue-500'>here</Link> to get the link of your gltf model</label><br/>
                        <Link target="_blank" to='https://youtu.be/tZQKGu4UCZM?si=yvktr_n5g47TfpCY' className='font-extrabold underline underline-blue-500 hover:text-blue-600'>watch tutorial for reference</Link><br/>
                        <input type="text"
                        className='bg-slate-200
                        border border-gray-400 rounded-xl w-full p-2 mt-2 mb-2 mr-4 text-black-400'
                         
                        placeholder='Enter link here' value={asset.asset_link} onChange={(e)=>setAsset(({...asset,asset_link: e.target.value}))}/><br/>
                        <button onClick={StoreAsset} className='bg-black rounded-xl p-4 text-white w-full'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Assets