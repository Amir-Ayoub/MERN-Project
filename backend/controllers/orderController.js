import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

// uncommet it after getting the stripe code in .env file  time video 7 44
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placeing user order from frontend
const placeOrder = async (req,response) =>{

    const frontend_url ="http://localhost:5176";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
         })
         await newOrder.save();
         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

         const line_items =req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price
            },
            quantity:item.quantity
         }))

         line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:20
            },
            quantity:1,
         })

     const session = await stripe.checkout.sessions.create({
        line_items:line_items,
        mode: 'payment',
        success_url:`${food-delivery_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
     })

     response.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        response.json({success:false,message:"Error"})
    }

}

const verifyOrder = async(req,response) =>{
   const {orderId,success}=req.body;
   try {
    if(success=="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        response.json({success:true,message:"Paid"})
    }
    else{
        await orderModel.findByIdAndDelete(orderId);
        response.json({success:false,message:"Not Paid"})
    }

   } catch (error) {
    console.log(error);
    response.json({success:false,message:"Error"})
   }
}

// user order for forntend
const userOrders = async (req,response) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    response.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    response.json({success:false,message:"Error"})
  }
}

// listing orders for admin pannel
const listOrders= async(req,response) => {
   try {
    const orders = await orderModel.find({});
    response.json({success:true,data:orders})
   } catch (error) {
      console.log(error);
      response.json({success:false,message:"Error"})
   }
}

// api for updating order status
const updateStatus = async (req,response)=>{
  try {
     await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
     response.json({success:true,message:"Status Updated"})
  } catch (error) {
    console.log(error);
    response.json({success:false,message:"Error"})
  }
}


export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
