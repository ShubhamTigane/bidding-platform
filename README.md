
# Real-Time Bidding Platform API

This is a comprehensive RESTful API for a real-time bidding platform, developed using Node.js, Express, Socket.io, and a SQL database (MySQL). The API supports advanced CRUD operations, user authentication, role-based access control, real-time bidding, and notifications.


## Features

- User registration and authentication using JWT
- Role-based access control (user, admin)
- CRUD operations for auction items
- Real-time bidding using Socket.io
- Notifications for bid updates and outbidding
- Image upload for auction items
- Pagination and search/filtering for items
- Comprehensive error handling and validation
- Rate limiting middleware for API protection
- Logging for API requests and errors


## Installation

Install Node.js and npm.
Clone this repository.
Install dependencies using npm install.
Set up environment variables for database configuration.

```bash
  npm install my-project
  cd my-project
```
    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`
`DB_USER`
`DB_PASS`
`DB_NAME`
`JWT_SECRET`


## Database Schema
 
The database schema includes tables for users, items, bids, and notifications.
## API Reference

#### Users:

```http
POST /api/items             Register a new user.

POST /users/login           Authenticate a user and return a token.

GET  /users/profile         Get the profile of the logged-in user.

POST /users/reset-password  Reset the password for a user.
```

#### items:

```http
GET /items      Retrieve all auction items (with pagination).

GET /items/     Retrieve a single auction item by ID.

POST /items     Create a new auction item. Authenticated users. Image upload.

PUT /items/     Update an auction item by ID. Authenticated users. Only item owners or admins.

DELETE /items/  Delete an auction item by ID. Authenticated users. Only item owners or admins.
```
#### Bids:

```http
GET /items/{id}/bids   Retrieve all bids for a specific item.

POST /items/{id}/bids  Place a new bid on a specific item. Authenticated users.

```
#### Notifications:

```http

POST /notification/notify    Send notification to a user. Authenticated users.

GET /notification/           Retrieve notifications for the logged-in user. Authenticated users.

PUT /notification/mark-read  Mark all unread notifications as read for the authenticated user. Authenticated users.



```



## Authentication and Authorization
JWT is used for user authentication. Role-based access control restricts access to certain endpoints based on user roles.
## Validation and Error Handling
Incoming data is validated for required fields, and appropriate HTTP status codes and error messages are returned for errors.


## Image Upload
Image upload functionality is implemented for auction items using multer. Image URLs are stored in the database.
## Search and Filtering
Search functionality allows users to search for auction items. Filtering by status (active, ended) is also supported.
## Pagination
Pagination is implemented for retrieving all auction items.
## Project Structure
The project is organized with a clear structure, separating concerns into routes, controllers, models, services, etc.

