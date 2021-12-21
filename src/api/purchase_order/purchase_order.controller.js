import {
  createPurchaseorderService,
  invoicePurchaseorderService,
  editPurchaseorderService
} from './purchase_order.services'
import AppError from '../../util/error'
import { crudControllers } from '../../util/crud'
import { PurchaseOrder } from './purchase_order.model'

const defaultController = crudControllers(PurchaseOrder)

const createPurchase = async (req, res, next) => {
  try {
    const result = await createPurchaseorderService({...req.body,createdBy:req.user._id})
    return res.status(201).json(result)
  } catch (e) {
    return next(new AppError(e.message, 406))
  }
}

const editPurchase = async (req, res, next) => {
  try {
    const result = await editPurchaseorderService({...req.body,id:req.params.id})
    return res.status(200).json(result)
  } catch (e) {
    return next(new AppError(e.message, 406))
  }
}

const invoicePurchaseStatus = async (req, res, next) => {
  const data = req.body.amount
  try {
    result = await invoicePurchaseorderService(req.params.id, data)
    return res.status(200).json(result)
  } catch (e) {
    return next(new AppError(e.message, 400))
  }
}

const CustomControllers = {
  ...defaultController,
  createOne: createPurchase,
  invoice: invoicePurchaseStatus,
}

export default CustomControllers
