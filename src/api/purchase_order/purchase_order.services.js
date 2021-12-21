import { PurchaseOrder } from './purchase_order.model'
import { merge,differenceBy,unionBy } from 'lodash'
import mongoose from "mongoose"
import assert from 'assert'


export const createPurchaseorderService = async (data) => {
  data['related_items'] = data['items']
  return await PurchaseOrder.create(data)
}

export const invoicePurchaseorderService = async (id, amount) => {
  return await PurchaseOrder.findOneAndUpdate(
    {
      _id: id,
    },
    { status: 'invoiced', total_value_paid: amount },
    { new: true }
  )
    .lean()
    .exec()
}


export const editPurchaseorderService = async (data) => {
  data["related_items"]=data["items"].map(elem=>{
    return {...elem,_id:elem.id}
  })
  const db_data=await PurchaseOrder.findById(data.id).populate("related_items")
    .lean()
    .exec()
  assert.notEqual(db_data, null,"couldnt find elem with matching Id");
  db_data["related_items"]=db_data["related_items"].map(elem=>{
    elem._id=elem._id.toString()
    return elem
  })
  assert.equal(differenceBy(data["related_items"], db_data["related_items"],"_id").length,0,"item are not present in this order")
  data["related_items"]=(unionBy(db_data["related_items"],data["related_items"],"_id"))
  return await PurchaseOrder.findByIdAndUpdate(data.id,data,{new:true}).lean()
  .exec()
}