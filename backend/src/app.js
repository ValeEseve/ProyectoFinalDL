import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import printsRoutes from './routes/prints.routes.js'
import artistsRoutes from "./routes/artists.routes.js"
import ordersRoutes from "./routes/orders.routes.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/prints', printsRoutes)
app.use("/artists", artistsRoutes)
app.use("/orders", ordersRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API PRINTSxPRINTS OK' })
})

export default app
