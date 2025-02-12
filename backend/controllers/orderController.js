import orderModel from '../models/orderModel.js'
import userModel from '../models/userModel.js';
import Stripe from 'stripe'
import razorpay from 'razorpay'

//global variables

const currency='usd'
const deliveryCharge=10

//gateway initialization

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,

})




//cash on delivery
const placeOrder=async(req,res)=>{
  try{
    const {userId,items,amount,address} = req.body;
    const orderData={
      userId,items,address,amount,paymentMethod:"COD",payment:false,date:Date.now()
    }

    const newOrder=new orderModel(orderData)

    await newOrder.save()

    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({success:true,message:"Order Placed"})



  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}



//stripe
const placeOrderStripe=async(req,res)=>{
  try{
    
    const {userId,items,amount,address} = req.body;
    const {origin} =req.headers

    const orderData={
      userId,items,address,amount,paymentMethod:"Stripe",payment:false,date:Date.now()
    }

    const newOrder=new orderModel(orderData)

    await newOrder.save()

    const line_items= items.map((item)=>({
      price_data:{
        currency:currency,
        product_data:{
          name:item.name
        },
        unit_amount:item.price*100
      },
      quantity:item.quantity
    }))

    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:'Delivery Charge'
        },
        unit_amount:deliveryCharge*100
      },
      quantity:1
    })

    const session=await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode:'payment'
    })

    res.json({success:true,session_url:session.url})

  }
 catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }

}

//verify Stripe

const verifyStripe=async(req,res)=>{
  const {orderId,success,userId}=req.body;

  try{
    if(success==='true'){
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}});
      res.json({success:true})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false})
    }
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}




//Razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    
    // Prepare order data to save in DB
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    // Create a new order in the database
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Razorpay options for creating the order
    const options = {
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: newOrder._id.toString(),
    };

    // Create Razorpay order using Razorpay instance
    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }

      // Respond with the order details
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


//verify razorpay

const verifyRazorpay=async(req,res)=>{
  try{
    // console.log("razor");
    
    const {userId,razorpay_order_id} = req.body;

    const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id)

    if(orderInfo.status==='paid'){
      await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cardData:{}})
      res.json({success:true,message:"Payment Successful"})
    }
    else{
      res.json({success:false,message:"Payment Failed"})
    }
    
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

//All orders data
const allOrders=async(req,res)=>{
  try{
    const orders= await orderModel.find({})
    res.json({success:true,orders})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }

}



//user order data
const userOrders=async(req,res)=>{
  try{
    const {userId} = req.body;

    const orders= await orderModel.find({userId})

    res.json({success:true, orders})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}



//update orders by admin
const updateStatus=async(req,res)=>{
  try{
    const {orderId,status} = req.body;
    await orderModel.findByIdAndUpdate(orderId,{status})
    res.json({success:true,message:"status updated"})
  }
  catch(error){
    console.log(error);
    res.json({success:false,message:error.message})
  }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus,verifyStripe,verifyRazorpay}