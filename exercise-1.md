# Cafe API Architecture Doc

## Details

There's a corner cafe that wants your help to propel itself into the digital age... The owner, Greg, has read extensively and is anxious to get started, but lacks the technical chops to get his digital transformation off the ground. He _knows_ that big data is the way to go. He is planning on tracking _everything_ in his cafe.

He needs a RESTful API to serve all of the data that he'll have and gather more! And he's asked a couple of future developers to architect this API for him. He wants to track _everything_ from the stock, the customers, the seating in the cafe.

Provide him with a series of REST endpoints that meet all, or most of the RESTful principles that you've just heard about! Your feedback will dictate how the database will eventually be built... no pressure.

Write out each endpoint, its method, and brief description of waht it should do.

| endpoint | method | Description            |
| -------- | ------ | ---------------------- |
| `/test`  | `GET`  | It is a test endpoint. |

_This activity is more about the discussion in how to best organize data endpoints. There will not be any coding._

## Your Answer

Endpoint - Method - Description
/productsForSale - GET - All products in cafe
/productsForSale/id - DELETE - product goes bad
/productsForSale/id - POST - we get our shipment for inventory
/productstoPurchase - GET - products we need to run the shop
/inventory - GET - products we have
/productsForSale/id- GET - what we are selling
/productstoPurchase/id- POST - update what we have
/inventory/id - GET - see our inventory
/customers - GET - list of all custoemrs coming in
/customers/id - GET - individual id per customer - how long customers wait during different times during the day - how much they spend
/customers - POST - new id for new customer
/customer/id - DELETE - remove customer id
/customer/id - PUT - address change for membership
/location - GET - cafe location
/location - POST - new locations for multiple coffee shops
/location - PATCH - city updating postal codes
/employees - GET - employee information
/employees/id - GET - payroll & scheduling
/employees/id - DELETE - fired / stopped working
/seating - GET - poll/list of seats
/seating/id - GET - where people sit the most / numbering chairs & tables / favorite seating spots (mode)
/bathroom - PUT - cleaned by employee and what time
/bathroom - DELETE - not for customers
