const express = require('express')
const ConnectDB = require('./Db')
const cors = require('cors')
const crouter = require('./Route/CaterningRoute')
const nrouter = require('./Route/NgoRoute')
const NgoPostRouter = require('./Route/NogPostRoute')
const FoodPostRouter = require('./Route/FoodPostRouter')
const RequestFoodRouter = require('./Route/RequestFoodRoute')
const AdminrRouter = require('./Route/AdminRoute')



const app = express()
const port = 5000

ConnectDB()

app.use(express.json())
app.use(cors())

app.use('/api/caterning', crouter)
app.use('/api/ngo', nrouter)
app.use('/api/ngopost', NgoPostRouter)
app.use('/api/foodpost', FoodPostRouter)
app.use('/api/foodrequest', RequestFoodRouter)

app.use('/api/admin', AdminrRouter)


app.use("/api/image", express.static('./upload'))


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})