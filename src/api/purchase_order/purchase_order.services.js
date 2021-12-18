import AppError from '../../util/error'
import { PurchaseOrder } from './purchase_order.model'

export const createPurchaseorderService = async (body) => {
  return await PurchaseOrder.create(body)
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
