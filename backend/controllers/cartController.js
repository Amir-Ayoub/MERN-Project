import { response } from "express";
import userModel from "../models/userModel.js"


// add items to user cart
const addToCart = async(req,response) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] =1
        }
        else{
            cartData[req.body.itemId] +=1;
        }

      await userModel.findByIdAndUpdate(req.body.userId,{cartData})
      response.json({success:true,message:"Added To Cart"})
    } catch (error) {
        response.json({success:false,message:"Error"})
    }

}


// remove items from cart
const removeFromCart = async(req,response) =>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
           cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        response.json({success:true,message:"Removed From Cart"})

    } catch (error) {
        response.json({success:false,message:"Error"})
        
    }

}

// fetch user cart
const getCart = async(req,response)=>{
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData;
        response.json({success:true,cartData})
    } catch (error) {
        response.json({success:false,message:"Error"})
        
    }

}


export {addToCart,removeFromCart,getCart};
