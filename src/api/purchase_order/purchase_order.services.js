import AppError from '../../util/error'
import { PurchaseOrder } from './purchase_order.model'

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
  return await PurchaseOrder.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    { new: true }
  )
    .lean()
    .exec()
}