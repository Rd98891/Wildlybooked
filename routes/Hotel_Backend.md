# Wildlybooked Backend

This project is a backend implementation for the Wildlybooked application, which is a MERN stack app for booking hotels and rentals. Below is an explanation of the key files, their roles, and how data flows between the local data source, MongoDB, and the application.

---

## File Descriptions

### 1. `server.js`
- **Role**: The entry point of the application. It initializes the Express server, connects to MongoDB, and sets up the routes for handling API requests.
- **Key Functions**:
  - **Database Connection**: 
    - Line 11: `connectDB()` connects to MongoDB using the `connectDB` function from `dbconfig.js`.
  - **Routes**:
    - Line 17: `app.use("/api/hotelsdataimport", hotelDataImportRouter)` mounts the route for importing data into the database.
    - Line 19: `app.use("/api/hotels", hotelRouter)` mounts the route for fetching hotel data from the database.
  - **Server Initialization**:
    - Line 21: Starts the server and listens on the specified port after the MongoDB connection is established.

---

### 2. `dbconfig.js`
- **Role**: Handles the connection to the MongoDB database.
- **Key Functions**:
  - **`connectDB` Function**:
    - Line 7: Connects to MongoDB using the connection string from the `.env` file (`process.env.MONGO_URI`).
    - Logs a success message if the connection is successful or exits the process if there is an error.

---

### 3. `hotel.model.js`
- **Role**: Defines the Mongoose schema and model for the `Hotel` collection in MongoDB.
- **Key Functions**:
  - **Schema Definition**:
    - Defines the structure of the `Hotel` documents, including fields like `name`, `category`, `price`, `rating`, etc.
  - **Model Creation**:
    - Line 28: Exports the `Hotel` model, which is used to interact with the `Hotel` collection in MongoDB.

---

### 4. `hoteldataimport.router.js`
- **Role**: Handles the import of local hotel data (`hotels.js`) into the MongoDB database.
- **Key Functions**:
  - **POST Route**:
    - Line 7: Defines a `POST` route (`/api/hotelsdataimport`) to import data.
    - Line 9: Clears the existing data in the `Hotel` collection using `Hotel.deleteMany({})`.
    - Line 11: Inserts the local data from `hotels.js` into the database using `Hotel.insertMany(hotels.data)`.
    - Line 12: Responds with the inserted data.

---

### 5. `hotel.router.js`
- **Role**: Handles fetching hotel data from the MongoDB database and returning it to the client.
- **Key Functions**:
  - **GET Route**:
    - Line 7: Defines a `GET` route (`/api/hotels`) to fetch all hotel data.
    - Line 9: Fetches all documents from the `Hotel` collection using `Hotel.find({})`.
    - Line 10: Responds with the fetched data or a `404` error if no data is found.

---

## Data Flow Explanation

### 1. Writing Data from Local to Database
- **File**: `hoteldataimport.router.js`
- **Code**:
  - Line 9: `Hotel.deleteMany({})` clears the existing data in the `Hotel` collection.
  - Line 11: `Hotel.insertMany(hotels.data)` inserts the local data from `hotels.js` into the MongoDB database.
- **Route**: `POST /api/hotelsdataimport`
- **Mechanism**:
  - When a `POST` request is made to `/api/hotelsdataimport`, the local data is written to the database.

---

### 2. Reading Data from Database to Application
- **File**: `hotel.router.js`
- **Code**:
  - Line 9: `Hotel.find({})` fetches all documents from the `Hotel` collection in MongoDB.
  - Line 10: Responds with the fetched data or a `404` error if no data is found.
- **Route**: `GET /api/hotels`
- **Mechanism**:
  - When a `GET` request is made to `/api/hotels`, the data is retrieved from the database and sent back to the client.

---

## POST and GET Mechanism

### POST Request (`/api/hotelsdataimport`)
- **Purpose**: Import local hotel data into the MongoDB database.
- **Flow**:
  1. The client sends a `POST` request to `/api/hotelsdataimport`.
  2. The server clears the existing data in the `Hotel` collection.
  3. The server inserts the local data (`hotels.js`) into the database.
  4. The server responds with the inserted data.

### GET Request (`/api/hotels`)
- **Purpose**: Fetch all hotel data from the MongoDB database.
- **Flow**:
  1. The client sends a `GET` request to `/api/hotels`.
  2. The server queries the `Hotel` collection for all documents.
  3. The server responds with the fetched data or an error message if no data is found.

---

## Example API Usage

### Import Data to MongoDB
- **Endpoint**: `POST /api/hotelsdataimport`
- **Request**:
  ```json
  {}