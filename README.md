# Sales Data Backend with Node.js, Express, and MongoDB
In this project I've focused on 
1. Processing large files using fs module.
2. Keeping up with development standards.
3. Schema designing 
4. API design 

## Prerequisites
- Node.js
- MongoDB Atlas account

## Setup

1. Clone the repository:
    ```
    git clone https://github.com/yourusername/sales-data-backend.git
    cd sales-data-backend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file in the root directory:
    ```env
    MONGO_URI=mongodb+srv://myUsername:myPassword@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
    ```

4. Start the server:
    ```
    npm start
    ```

## API Endpoints

| Route                          | Method | Body              |
|--------------------------------|--------|------             |
| `/api/sales/upload`            | POST   |  Multipart (file) |
| `/api/analysis/total-revenue`  | GET    | `startDate`, `endDate` |

