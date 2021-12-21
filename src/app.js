import express from 'express'
import morgan from 'morgan'
import config from './config'
import cors from 'cors'
import { connect } from './util/db'
import  AppError  from './util/error'
import errorHandler from './util/errorController'
import device from 'express-device'
import WarehouseRouter from "./api/warehouse/warehouse.route"
import ItemRouter from "./api/item/item.route"
import PurchaseOrderRouter from "./api/purchase_order/purchase_order.route"
import {signin,protect,onlyAuthorized} from './util/auth'

export const app = express()

app.disable('x-powered-by')
app.use(device.capture())

app.use(cors())

app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))
app.use(morgan('dev'))
app.post("/signin",signin)

app.use("/warehouse",onlyAuthorized,WarehouseRouter)
app.use("/item",onlyAuthorized,ItemRouter)
app.use("/purchaseorders",onlyAuthorized,PurchaseOrderRouter)

app.use((req, res, next) => {
  let err = new AppError(
    `${req.ip} tried to reach a resource at ${req.originalUrl} that is not on this server.`,
    404
  )
  next(err)
})

app.use(errorHandler);
app.use("/",(req,res)=>{
    res.status(404).end()
})

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/`)
    })
  } catch (e) {
    console.error('here is the error: ', e)
  }
}


