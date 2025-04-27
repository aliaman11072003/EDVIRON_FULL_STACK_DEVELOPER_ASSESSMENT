# School Payment System API

A robust payment processing system built with NestJS, integrating with Edviron payment gateway for handling school payments and transactions.

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

## 🚀 Features

- **Secure Payment Processing**
  - JWT Authentication
  - Payment Gateway Integration (Edviron)
  - Webhook Handling
  - Transaction Management

- **Database & Storage**
  - MongoDB Integration
  - Optimized Indexes
  - Transaction Logging
  - Audit Trails

- **Security**
  - Environment-based Configuration
  - Input Validation
  - Error Handling
  - Secure API Endpoints

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Edviron API credentials

## 🛠 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd school-payment-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory with the following variables:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/school-payment

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=1d

# Edviron Payment 
SCHOOL_ID=your_school_id

# Server Configuration
APP_URL=http://localhost:3000
PORT=3000
NODE_ENV=development

# Logging Configuration
LOG_LEVEL=debug
```

4. **Database Setup**
```bash
# Start MongoDB (if not already running)
sudo service mongod start

# Create database and collections
mongosh
> use school-payment
> db.createCollection('orders')
> db.createCollection('orderstatuses')
```

5. **Start the Application**
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

## 📚 Project Structure

```
src/
├── auth/           # Authentication module
│   ├── dto/        # Data Transfer Objects
│   ├── guards/     # Authentication guards
│   └── strategies/ # JWT strategies
├── config/         # Configuration files
├── models/         # Database schemas
├── payment/        # Payment processing
│   ├── dto/        # Payment DTOs
│   └── services/   # Payment services
├── transactions/   # Transaction management
├── app.module.ts   # Root module
└── main.ts         # Application entry point
```

## 🔐 API Documentation

### Authentication
All endpoints except webhook require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Payment Endpoints

#### Create Payment
```http
POST /payment/create
Content-Type: application/json
Authorization: Bearer <token>

{
  "school_id": "string",
  "trustee_id": "string",
  "student_info": {
    "name": "string",
    "id": "string",
    "email": "string"
  },
  "gateway_name": "string",
  "order_amount": number
}
```

#### Check Payment Status
```http
GET /payment/status/:collectRequestId
Authorization: Bearer <token>
```

#### Webhook (Edviron)
```http
POST /payment/webhook
Content-Type: application/json

{
  "status": 200,
  "order_info": {
    "order_id": "string",
    "order_amount": number,
    "transaction_amount": number,
    "gateway": "string",
    "bank_reference": "string",
    "status": "string",
    "payment_mode": "string",
    "payemnt_details": "string",
    "Payment_message": "string",
    "payment_time": "string",
    "error_message": "string"
  }
}
```

### Transaction Endpoints

#### Get All Transactions
```http
GET /transactions?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Transactions by School
```http
GET /transactions/school/:schoolId?page=1&limit=10
Authorization: Bearer <token>
```

#### Get Transaction Status
```http
GET /transactions/status/:customOrderId
Authorization: Bearer <token>
```

## 🧪 Testing

1. **Install test dependencies**
```bash
npm install --save-dev @nestjs/testing jest
```

2. **Run tests**
```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔧 Development Tools

- **Postman Collection**
  - Import the Postman collection from `postman/school-payment.postman_collection.json`
  - Set up environment variables in Postman:
    - `base_url`: http://localhost:3000
    - `jwt_token`: Your JWT token after login

- **VS Code Extensions**
  - ESLint
  - Prettier
  - MongoDB for VS Code
  - REST Client

## 🛡 Security Best Practices

1. **Environment Variables**
   - Store sensitive data in .env file
   - Never commit .env to version control
   - Use different keys for development and production

2. **Input Validation**
   - Validate all incoming requests
   - Use DTOs with class-validator
   - Sanitize user input

3. **Authentication**
   - Use JWT for API authentication
   - Implement token expiration
   - Secure password hashing

4. **Database**
   - Use indexes for performance
   - Implement proper error handling
   - Regular backups

## 📦 Dependencies

```json
{
  "dependencies": {
    "@nestjs/common": "^8.0.0",
    "@nestjs/config": "^1.0.0",
    "@nestjs/mongoose": "^8.0.0",
    "@nestjs/passport": "^8.0.0",
    "@nestjs/jwt": "^8.0.0",
    "mongoose": "^6.0.0",
    "passport": "^0.4.0",
    "passport-jwt": "^4.0.0",
    "class-validator": "^0.13.0",
    "class-transformer": "^0.4.0"
  },
  "devDependencies": {
    "@nestjs/testing": "^8.0.0",
    "jest": "^27.0.0",
    "@types/jest": "^27.0.0"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Aman Ali - Initial work

## 🙏 Acknowledgments

- NestJS Team
- MongoDB Team
- Edviron Team # EDVIRON_FULL_STACK_DEVELOPER_ASSESSMENT
