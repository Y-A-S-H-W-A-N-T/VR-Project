import express from "express"
import Asset from '../Model/3DModel.js'

const router=express.Router()

router.post('/store',async(req,res)=>{
    const { asset_link, asset_name } = req.body
    const asset = new Asset({
        asset_link,
        asset_name
      })
    const response = await asset.save()
    console.log(response)
})

router.get('/bring',async(req,res)=>{
    const data = await Asset.find({})
    console.log(data)
    res.json(data)
})



export default router;