# Data Model and ERD

The following diagram reflects `backend/prisma/schema.prisma`.

```mermaid
erDiagram
  USER ||--o{ AUDIT_LOG : creates
  CUSTOMER ||--o{ SALES_CHALLAN : receives
  CUSTOMER ||--o{ FOLLOW_UP : has
  PRODUCT ||--o{ STOCK_LOG : records
  SALES_CHALLAN ||--o{ SALES_ITEM : contains
  PRODUCT ||--o{ SALES_ITEM : appears_in

  USER {
    string id PK
    string email UK
    string role
  }
  CUSTOMER {
    string id PK
    string email UK
    string status
    float totalSpent
  }
  PRODUCT {
    string id PK
    string sku UK
    int stockQuantity
    int minStockLevel
  }
  STOCK_LOG {
    string id PK
    string productId FK
    int quantity
    string type
  }
  SALES_CHALLAN {
    string id PK
    string challanNumber UK
    string customerId FK
    float grandTotal
  }
  SALES_ITEM {
    string id PK
    string challanId FK
    string productId FK
    int quantity
    float totalPrice
  }
  FOLLOW_UP {
    string id PK
    string customerId FK
    datetime dueDate
    boolean completed
  }
  AUDIT_LOG {
    string id PK
    string userId FK
    string action
    datetime createdAt
  }
```

## Relationship notes

- A customer can have many sales challans and follow-ups.
- A sales challan has one or more sales items.
- A product can appear in many sales items and stock logs.
- Deleting a product cascades to its stock logs; deleting a sales challan cascades to its sales items.
- An audit log belongs to the user whose action it records.
