# Reactify Inventory Analyzer

## Overview

This web project leverages the FastAPI framework for the server and React for the frontend to perform inventory data analysis. The data is retrieved from a MongoDB database using the powerful aggregation framework. The frontend, built with React-Admin, displays the analysis results through interactive charts powered by Recharts.

## Features

- **Data Analysis**: Utilize MongoDB's aggregation framework to perform sophisticated data analysis on inventory data.
  
- **Server with FastAPI**: Develop a robust backend server using FastAPI to handle data requests and aggregation queries.

- **Responsive Frontend with React-Admin**: Create a user-friendly and responsive frontend using React-Admin to interact with the data and visualize the analysis.

- **Interactive Charts with Recharts**: Display analysis results in clear and interactive charts powered by Recharts for effective data representation.

## Demo

Explore a live demo of the project: [Demo Link](https://frontend-manager.vercel.app)

## Prerequisites

Before running the project locally, make sure you have the following installed:

- Node.js and npm
- Python and pip
- MongoDB
- FastAPI

## Installation

### Backend (FastAPI)

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

3. Run the FastAPI server:

    ```bash
    uvicorn main:app --reload
    ```

### Frontend (React-Admin)

1. Navigate to the `manager` directory:

    ```bash
    cd manager
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the React development server:

    ```bash
    npm run dev
    ```

## Configuration

Configure the MongoDB connection in the backend. Update the MongoDB URI in `backend/main.py`:

```python
# Replace this with your MongoDB URI
DATABASE_URI = "mongodb://your-username:your-password@your-host:your-port/your-database"
```

## Usage

Access the FastAPI backend at [http://localhost:8000](http://localhost:8000) and the React-Admin frontend at [http://localhost:5173/](http://localhost:5173/).

## Project Structure

```
inventory-data-analysis/
│
├── backend/              # FastAPI Backend
│   ├── main.py
│   ├── requirements.txt
│   └── ...
│
├── manager/             # React-Admin Frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
├── README.md
└── ...
```

## Database Query

The MongoDB aggregation framework query is implemented in `backend/app/route/house.py`. Customize the query according to your specific data analysis requirements.

## Contributing

Contributions are welcome! Fork the repository, create a new branch, and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
