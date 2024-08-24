

# School Management API

The School Management API provides endpoints to manage school data, including adding new schools and listing them sorted by distance. This API is designed for use in educational or personal projects.

## Hosted API

The API is hosted on Vercel. You can access it via the base URL:


https://school-rest-api-eta.vercel.app/


## Database

The database for this API is hosted on Clever Cloud. It uses MySQL to store information about schools, including their names, addresses, and geographical coordinates (latitude and longitude).


## API Endpoints

### 1. Get All Schools

**Endpoint**: `/`

- **Method**: GET
- **Description**: Retrieves a list of all schools from the database.
- **URL**: `https://school-rest-api-eta.vercel.app/`

### 2. Add a New School

**Endpoint**: `/addSchool`

- **Method**: POST
- **Description**: Adds a new school to the database with its name, address, latitude, and longitude.
- **URL**: `https://school-rest-api-eta.vercel.app/addSchool`
- **Body**: The request should include a JSON object with the following properties:
  - `name` (string): Name of the school
  - `address` (string): Address of the school
  - `latitude` (float): Latitude of the school's location
  - `longitude` (float): Longitude of the school's location

**Example Request**:

```json
{
  "name": "Springfield Elementary",
  "address": "742 Evergreen Terrace, Springfield",
  "latitude": 39.9334,
  "longitude": -75.1691
}
```

### 3. List Schools Sorted by Distance

**Endpoint**: `/listSchools`

- **Method**: GET
- **Description**: Retrieves a list of schools sorted by their distance from the given latitude and longitude.
- **URL**: `https://school-rest-api-eta.vercel.app/listSchools`
- **Query Parameters**:
  - `latitude` (float): Latitude of the reference location
  - `longitude` (float): Longitude of the reference location

**Example**:


https://school-rest-api-eta.vercel.app/listSchools?latitude=37.7749&longitude=-122.4194

## How to Access the API

You can access the API endpoints using tools like Postman or cURL. Here's how you can use Postman to interact with the API:

1. **Import the Postman Collection**:
   - You can download the Postman collection from the following link: [Postman Collection Link](https://drive.google.com/file/d/1lAwgKusPro_jfZSx1EVCLRyYeN5rBmVr/view?usp=sharing)
   - Download the collection file and import it into Postman.

2. **Using Postman**:
   - Open Postman and import the downloaded collection.
   - Choose the desired endpoint and set the request method (GET or POST).
   - For the `POST /addSchool` endpoint, provide the necessary JSON data in the body of the request.
   - Click “Send” to execute the request and view the response.

## Errors and Responses

- **Success**: The API will return a JSON response with the data requested or a success message.
- **Error**: In case of an error (e.g., invalid input or database connection issues), the API will return a JSON object with an error message and status code.

## License

This project is licensed under the MIT License.

