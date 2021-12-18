import {createPurchaseorderService,invoicePurchaseorderService  } from "./purchase_order.services"
import AppError from '../../util/error'
import { crudControllers } from '../../util/crud'
import { PurchaseOrder } from './purchase_order.model'

const defaultController = crudControllers(PurchaseOrder)

const createPurchase = async(req,res,next)=>{
    const user_id= req.user._id
    const data= req.body
    data['createdBy']=user_id
    data["related_items"]=data["items"]
    var result;
    try{
        result= await createPurchaseorderService(data)
        return res.status(201).json(result)
    }catch(e){
        return next(new AppError(e.message,406))
    }
}

const invoicePurchaseStatus = async(req,res,next)=>{
    const data= req.body.amount
    try{
        result= await invoicePurchaseorderService(req.params.id,data)
        return res.status(200).json(result)
    }catch(e){
        return next(new AppError(e.message,400))
    }
}

const CustomControllers = {
    ...defaultController,
    createOne: createPurchase,
    invoice:invoicePurchaseStatus
}

export default CustomControllers
  