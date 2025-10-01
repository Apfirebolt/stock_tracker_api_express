import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

// 1. IMPORT SWAGGER PACKAGES
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import authRoutes from './routes/auth.js'
import accountRoutes from './routes/account.js'
import logRoutes from './routes/log.js'
import stockRoutes from './routes/stock.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:8080'
}))

const __dirname = path.resolve()


// 2. SWAGGER CONFIGURATION (OPENAPI SPECS)
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finance API Documentation',
      version: '1.0.0',
      description: 'Documentation for the Express Finance Backend API',
    },
    servers: [
      {
        url: '/api', // Use a relative path if the server handles both HTTP/HTTPS
        description: 'Primary API Server'
      },
      {
        url: 'http://localhost:5000/api', // Example URL for local development
        description: 'Development Server'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: []
    }],
  },
  apis: ['./routes/*.js'], 
};

// Generate the Swagger Specification
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// 3. SWAGGER UI ROUTE
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use('/api/auth', authRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/stocks', stockRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)

export default app