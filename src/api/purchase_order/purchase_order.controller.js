import {createPurchaseorderService} from "./purchase_order.services"
import AppError from '../../util/error'

const createPurchase = async(req,res,next)=>{
    const user_id= req.user._id
    const data= req.body
    data['createdBy']=user_id
    console.log(data["items"])
    data["related_items"]=data["items"]
    var result;
    try{
        result=createPurchaseorderService(data)
        console.log("dayd")
        return res.status(201).json(result)
    }catch(e){
        console.log("message \t",e.message)
        return next(new AppError(e.message,406))
    }
    
}

const CustomControllers = {
    createOne: createPurchase,
}

export default CustomControllers
  