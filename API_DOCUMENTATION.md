# Complete API Documentation

## Overview
This project consists of three microservices:
1. **Orders Backend** - Manages products, inventory, and orders
2. **User Backend** - Handles user authentication and Kafka integration
3. **Workflow Backend** - Manages workflow execution and automation

---

## 1. ORDERS BACKEND

### Base URL: `/app`

#### 1.1 Products API

**POST /products/add**
- Description: Add a new product
- Request Body:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "currency": "string"
}
```
- Response: 200 OK
- Error Codes: 400 (Product Exists), 500 (Server Error)

**GET /products** (implied)
- Description: Get all products

**DELETE /products/:id**
- Description: Delete a product by ID
- URL Param: `id` (Product ID)
- Response: 200 OK
- Error Codes: 404 (Product Not Found), 500 (Server Error)

**PUT /products/update**
- Description: Update product details
- Request Body:
```json
{
  "product_id": "string",
  "price": "number (optional)",
  "status": "string (optional)"
}
```
- Response: 200 OK
- Error Codes: 400 (Invalid Input), 404 (Product Not Found), 500 (Server Error)

#### 1.2 Inventory API

**PUT /inventory/:id**
- Description: Update inventory stock for a product
- URL Param: `id` (Product ID)
- Request Body:
```json
{
  "stock": "number"
}
```
- Response: 200 OK (Inventory Updated)
- Error Codes: 400 (Stock Missing), 404 (Inventory Not Found), 500 (Server Error)

#### 1.3 Orders API

**POST /orders/create**
- Description: Create a new order
- Request Body:
```json
{
  "user_id": "string",
  "product_id": "string",
  "quantity": "number"
}
```
- Response: 201 Created
- Error Codes: 
  - 400 (Missing Fields, Invalid Quantity, Product Not Available, Insufficient Stock)
  - 404 (Product Not Found)
  - 500 (Server Error)

**POST /orders/cancel**
- Description: Cancel an existing order
- Request Body:
```json
{
  "user_id": "string",
  "order_id": "string"
}
```
- Response: 200 OK
- Error Codes:
  - 400 (Cannot cancel shipped/delivered orders)
  - 404 (Order Not Found)
  - 500 (Server Error)

**GET /orders/status**
- Description: Get the status of an order
- Query Params: `user_id`, `order_id`
- Response: 200 OK with order details
- Error Codes: 404 (Order Not Found), 500 (Server Error)

**PUT /orders/update**
- Description: Update order status
- Request Body:
```json
{
  "user_id": "string",
  "order_id": "string",
  "status": "PENDING|CONFIRMED|PROCESSING|SHIPPED|DELIVERED|CANCELLED|FAILED"
}
```
- Response: 200 OK
- Error Codes:
  - 400 (Missing Fields, Invalid Status)
  - 404 (Order Not Found)
  - 500 (Server Error)

**GET /orders/user/:user_id**
- Description: Get all orders for a specific user
- URL Param: `user_id`
- Response: 200 OK with array of orders
- Error Codes: 500 (Server Error)

---

## 2. USER BACKEND

### Base URL: `/api/auth`

**POST /signin**
- Description: Sign in with email and password
- Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```
- Response: 200 OK
```json
{
  "message": "User Signed In Successfully",
  "token": "JWT_TOKEN"
}
```
- Error Codes:
  - 400 (Invalid Credentials, Missing Fields)
  - 401 (JWT_SECRET Missing)
  - 404 (User Not Registered)
  - 500 (Server Error)

**POST /signup**
- Description: Register a new user
- Request Body:
```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```
- Response: 201 Created
```json
{
  "message": "User Registered Successfully",
  "token": "JWT_TOKEN"
}
```
- Features:
  - Sends signup event to Kafka for workflow execution
  - Generates idempotent key for workflow tracking
  - Hashes password with bcryptjs
- Error Codes:
  - 400 (User Already Registered, Username Already Taken, Missing Fields)
  - 500 (Server Error)

---

## 3. WORKFLOW BACKEND

### Base URL: `/api`

#### 3.1 Workflow Management API

**POST /workflow/create**
- Description: Create a new workflow
- Request Body:
```json
{
  "workflow_name": "string",
  "description": "string (optional)",
  "nodes": [
    {
      "id": "string",
      "type": "EMAIL|HTTP|DATABASE|CONDITIONAL",
      "config": {}
    }
  ],
  "edges": [
    {
      "source": "string",
      "target": "string",
      "condition": "string (optional)"
    }
  ]
}
```
- Response: 201 Created
- Error Codes: 400 (Missing Data), 500 (Server Error)

**GET /workflow/**
- Description: Get all workflows
- Response: 200 OK with array of workflows
- Error Codes: 500 (Server Error)

**GET /workflow/:id**
- Description: Get a specific workflow by ID
- URL Param: `id`
- Response: 200 OK with workflow details
- Error Codes: 400 (ID Missing), 500 (Server Error)

**PUT /workflow/:id**
- Description: Update a workflow
- URL Param: `id`
- Request Body: Updated workflow data
- Response: 200 OK
- Error Codes: 400 (ID/Data Missing), 500 (Server Error)

**DELETE /workflow/:id**
- Description: Delete a workflow
- URL Param: `id`
- Response: 200 OK
- Error Codes: 400 (ID Missing), 500 (Server Error)

#### 3.2 Workflow Execution API

**POST /workflow/execute/signup**
- Description: Execute signup workflow
- Request Body:
```json
{
  "email": "string",
  "idempotent_key": "string",
  "workflow_name": "string"
}
```
- Response: 200 OK
- Features:
  - Implements idempotency to prevent duplicate executions
  - Tracks workflow execution status
  - Integrates with workflow engine
- Error Codes:
  - 400 (Missing Fields)
  - 500 (Server Error)
  - Custom: Workflow not found, Workflow not active

---

## 4. SERVICE LAYER IMPLEMENTATIONS

### OrderService
- `CreateOrder(user_id, product_id, quantity)` - Creates order with inventory management
- `CancelOrder(user_id, order_id)` - Cancels order and restores inventory
- `getOrderStatus(user_id, order_id)` - Retrieves current order status
- `updateOrder(user_id, order_id, status)` - Updates order status
- `getUserOrders(user_id)` - Gets all orders for user

### ProductService
- `AddProduct(name, description, price, currency)` - Adds new product
- `DeleteProduct(product_id)` - Deletes product
- `UpdateProduct(product_id, price, status)` - Updates product details

### InventoryService
- `UpdateInventory(product_id, stock)` - Updates stock count

### AuthService
- `signinService(email, password)` - Authenticates user and generates JWT
- `signupService(email, username, password)` - Registers new user with Kafka integration

### WorkFlowService
- `createWorkFlow(data)` - Creates new workflow
- `getAllWorkFlow()` - Retrieves all workflows
- `getWorkFlowById(id)` - Retrieves specific workflow
- `FindIdAndUpdateWorkFlow(id, data)` - Updates workflow
- `FindIdAndDeleteWorkFlow(id)` - Deletes workflow

### ExecuteSingupWorkFlow
- `SignupWorkflow(email, idempotent_key, to)` - Executes signup workflow with idempotency checks

---

## 5. DATA MODELS

### Order Status Enum
- PENDING
- CONFIRMED
- PROCESSING
- SHIPPED
- DELIVERED
- CANCELLED
- FAILED

### Payment Methods
- CREDITCARD
- DEBITCARD
- CASH
- UPI

### Product Status
- ACTIVE
- INACTIVE
- OUT_OF_STOCK
- DISCONTINUED

### Workflow Status
- DRAFT
- ACTIVE
- COMPLETED
- FAILED

### Node Types
- EMAIL
- HTTP
- DATABASE
- CONDITIONAL

---

## 6. MIDDLEWARE & UTILITIES

### Authentication
- JWT-based authentication in User Backend
- Cookie-based token storage
- Rate limiting on auth endpoints

### Logging
- Structured logging with configuration
- Log retention policies
- Error tracking and monitoring

### Database
- MongoDB connection management
- Mongoose schema validation
- Transaction support for complex operations

### Message Queue
- Kafka integration for async workflows
- Producer/Consumer pattern for event processing
- DLQ (Dead Letter Queue) support

---

## 7. ERROR HANDLING

All endpoints follow consistent error response format:
```json
{
  "message": "Error description"
}
```

Common HTTP Status Codes:
- 200: OK
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized (auth errors)
- 404: Not Found (resource not found)
- 500: Internal Server Error

---

## 8. DEPLOYMENT NOTES

### Environment Variables Required
```
PORT=<port_number>
MONGODB_URI=<mongodb_connection_string>
JWT_SECRET=<jwt_secret_key>
KAFKA_BROKERS=<kafka_broker_addresses>
```

### Database Collections
- products
- orders
- inventory
- users
- workflows
- workflow_status

### Kafka Topics
- workflow-topic (for signup events)
- workflow-dlq (for dead letter messages)

---

## 9. KEY FEATURES IMPLEMENTED

✅ **Transaction Support** - Orders use MongoDB transactions for atomicity
✅ **Inventory Management** - Real-time stock tracking with atomic updates
✅ **Async Workflows** - Kafka-based event processing for signup workflows
✅ **Idempotency** - Duplicate prevention for critical operations
✅ **Authentication** - JWT-based user authentication
✅ **Comprehensive Logging** - All operations logged with timestamps
✅ **Error Handling** - Graceful error handling with meaningful messages
✅ **RESTful API Design** - Standard HTTP methods and status codes
✅ **Database Indexing** - Optimized queries with proper indexes
✅ **Rate Limiting** - Protection against abuse on auth endpoints
