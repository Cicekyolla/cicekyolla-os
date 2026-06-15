# DATABASE ARCHITECTURE

## Database Engine

PostgreSQL

## Core Principles

- Multi Branch Ready
- Multi Warehouse Ready
- SEO First
- CRM First
- Delivery First
- API First
- Scalable Architecture

---

# USERS

users

- id
- name
- surname
- email
- phone
- password_hash
- role_id
- branch_id
- status
- created_at
- updated_at

---

# ROLES

roles

- id
- name
- permissions

---

# CUSTOMERS

customers

- id
- customer_code
- first_name
- last_name
- phone
- email
- total_orders
- total_spent
- last_order_date
- created_at

---

# CUSTOMER ADDRESSES

customer_addresses

- id
- customer_id
- city_id
- district_id
- neighborhood_id
- address
- latitude
- longitude

---

# PRODUCTS

products

- id
- sku
