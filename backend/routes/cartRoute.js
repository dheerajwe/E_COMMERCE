import express from 'express';
import {addToCart,updateCart,getUserCart} from '../controllers/cartController.js'
import authUser from '../middleware/auth.js';

const cartRouter=express.Router();

cartRouter.get('/get',authUser ,getUserCart)
cartRouter.post('/addd',authUser,addToCart);
cartRouter.post('/update',authUser,updateCart)

export default cartRouter;