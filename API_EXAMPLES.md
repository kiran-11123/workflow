# API Usage Examples & cURL Commands

## Quick Reference for Testing APIs

### 1. ORDERS BACKEND

#### Create Product
```bash
curl -X POST http://localhost:3000/app/products/add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 999.99,
    "currency": "USD"
  }'
```

#### Update Inventory
```bash
curl -X PUT http://localhost:3000/app/inventory/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 100
  }'
```

#### Create Order
```bash
curl -X POST http://localhost:3000/app/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "product_id": "PRODUCT_ID",
    "quantity": 2
  }'
```

#### Get Order Status
```bash
curl -X GET "http://localhost:3000/app/orders/status?user_id=user123&order_id=ORDER_ID"
```

#### Cancel Order
```bash
curl -X POST http://localhost:3000/app/orders/cancel \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "order_id": "ORDER_ID"
  }'
```

#### Update Order Status
```bash
curl -X PUT http://localhost:3000/app/orders/update \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user123",
    "order_id": "ORDER_ID",
    "status": "SHIPPED"
  }'
```

#### Get User Orders
```bash
curl -X GET http://localhost:3000/app/orders/user/user123
```

#### Update Product
```bash
curl -X PUT http://localhost:3000/app/products/update \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "PRODUCT_ID",
    "price": 1099.99,
    "status": "ACTIVE"
  }'
```

#### Delete Product
```bash
curl -X DELETE http://localhost:3000/app/products/PRODUCT_ID
```

---

### 2. USER BACKEND

#### Sign Up
```bash
curl -X POST http://localhost:3001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "john_doe",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "message": "User Registered Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Sign In
```bash
curl -X POST http://localhost:3001/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "securepassword123"
  }'
```

Response:
```json
{
  "message": "User Signed In Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 3. WORKFLOW BACKEND

#### Create Workflow
```bash
curl -X POST http://localhost:3002/api/workflow/create \
  -H "Content-Type: application/json" \
  -d '{
    "workflow_name": "Welcome Email Flow",
    "description": "Send welcome email to new users",
    "nodes": [
      {
        "id": "email_node_1",
        "type": "EMAIL",
        "config": {
          "template": "welcome",
          "subject": "Welcome!"
        }
      }
    ],
    "edges": []
  }'
```

#### Get All Workflows
```bash
curl -X GET http://localhost:3002/api/workflow/
```

#### Get Workflow by ID
```bash
curl -X GET http://localhost:3002/api/workflow/WORKFLOW_ID
```

#### Update Workflow
```bash
curl -X PUT http://localhost:3002/api/workflow/WORKFLOW_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "ACTIVE",
    "description": "Updated description"
  }'
```

#### Delete Workflow
```bash
curl -X DELETE http://localhost:3002/api/workflow/WORKFLOW_ID
```

#### Execute Signup Workflow
```bash
curl -X POST http://localhost:3002/api/workflow/execute/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "idempotent_key": "unique-key-12345",
    "workflow_name": "Signup Flow"
  }'
```

---

## Order Status Flow Example

```
1. Create Product
   ↓
2. Update Inventory (stock = 100)
   ↓
3. Create Order (quantity = 2)
   Status: PROCESSING
   ↓
4. Confirm Order
   PUT /orders/update → status: CONFIRMED
   ↓
5. Ship Order
   PUT /orders/update → status: SHIPPED
   ↓
6. Deliver Order
   PUT /orders/update → status: DELIVERED
   
Alternative: Cancel Order
   POST /orders/cancel → status: CANCELLED
   (Inventory automatically restored)
```

---

## User Authentication Flow

```
1. Sign Up
   POST /api/auth/signup
   ↓ (Sends signup event to Kafka)
   ↓
2. Workflow Engine Processes Event
   (Sends welcome email, etc.)
   ↓
3. Sign In
   POST /api/auth/signin
   (Returns JWT token)
   ↓
4. Use token for authenticated requests
   (Future enhancement: add JWT middleware)
```

---

## Workflow Execution Flow

```
1. Create Workflow
   POST /api/workflow/create
   ↓
2. Update Workflow Status to ACTIVE
   PUT /api/workflow/:id → status: ACTIVE
   ↓
3. Execute Workflow
   POST /api/workflow/execute/signup
   (Checks idempotency)
   (Executes nodes in sequence)
   ↓
4. Track Execution Status
   GET /api/workflow/:id
```

---

## Environment Setup

Create `.env` files in each backend:

### Orders Backend (.env)
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/orders_db
```

### User Backend (.env)
```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/users_db
JWT_SECRET=your_secret_key_here
KAFKA_BROKERS=localhost:9092
```

### Workflow Backend (.env)
```
PORT=3002
MONGODB_URI=mongodb://localhost:27017/workflow_db
KAFKA_BROKERS=localhost:9092
```

---

## Testing Checklist

- [ ] Create product
- [ ] Verify product created in database
- [ ] Update inventory
- [ ] Create order with sufficient inventory
- [ ] Verify inventory decreased
- [ ] Check order status
- [ ] Try creating order with insufficient inventory (should fail)
- [ ] Cancel order (should restore inventory)
- [ ] Sign up user
- [ ] Verify Kafka event published
- [ ] Sign in user
- [ ] Verify JWT token returned
- [ ] Create workflow
- [ ] Update workflow to ACTIVE
- [ ] Execute workflow
- [ ] Verify idempotency (same request returns same result)

---

## Performance Considerations

### Database Indexing
- User email and username are indexed
- Product ID is indexed
- Order user_id is indexed
- Workflow status is indexed

### Transaction Support
- Order creation uses MongoDB transactions
- Ensures consistency between order and inventory

### Async Processing
- User signup events published to Kafka
- Workflow execution happens asynchronously
- Improves API response time

### Rate Limiting
- User backend has rate limiting (100 requests per 15 minutes)
- Protects auth endpoints from brute force

---

## Common Error Scenarios

### Order Creation Fails
- Reason: Product not found
- Fix: Create product first, get product ID

- Reason: Insufficient stock
- Fix: Update inventory with sufficient stock

- Reason: Invalid quantity (≤ 0)
- Fix: Provide positive quantity value

### User Signup Fails
- Reason: User already registered
- Fix: Use different email or sign in instead

- Reason: Username already taken
- Fix: Choose unique username

### Workflow Execution Fails
- Reason: Workflow not found
- Fix: Create workflow first

- Reason: Workflow not ACTIVE
- Fix: Update workflow status to ACTIVE

- Reason: Idempotent key already processed
- Fix: This is expected - returns same result for idempotency

---

## Advanced Features

### Idempotency in Workflow
Workflow execution uses idempotent keys to prevent duplicate processing:
- Same idempotent_key returns cached result
- Supports safe retries without side effects

### Transactional Orders
Order creation atomically:
- Decreases inventory
- Creates order record
- Rolls back on any failure

### Event-Driven Architecture
- User signup triggers Kafka event
- Workflow engine consumes event
- Sends welcome email asynchronously

