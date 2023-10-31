# BrewApps Books

## Book API
This is a simple API for managing a collection of books. You can add, view, fetch details of a specific book, update and delete books. Below are the API endpoints, usage instructions, and notes about the development process.

## API Endpoints
### 1. Add Book
 - Endpoint: /add
 - Method: POST
 - Data Required:
```JSON
{
  "title": "Example Book Title",
  "author": "Author Name",
  "summary": "Short summary of the book."
}
```
### 2. View All Books
 - Endpoint: /viewall
 - Method: GET
 - Response: An array of all the books in the database.
   
### 3. Fetch Details of a Specific Book
 - Endpoint: /fetchdetails?id=<BOOK_ID>
 - Method: GET
 - Response: Details of the specified book.

### 4. Update Book
 - Endpoint: /update
 - Method: POST
 - Data Required:
```JSON
{
  "id": "<BOOK_ID>",
  "title": "Updated Book Title",
  "author": "Updated Author Name",
  "summary": "Updated summary of the book."
}
```

### 5. Delete Book
 - Endpoint: /delete?id=<BOOK_ID>
 - Method: GET
 - Response: Confirmation of the deletion.

## Instructions to Set Up and Run the Application Locally

### 1. Clone the repository:
```bash
git clone <GITHUB_REPO_URL>
```


### 2. Navigate to the project directory:

```bash
cd <PROJECT_DIRECTORY>
```

### 3. Install the necessary packages:

```bash
npm install
```

### 4. Set up environment variables 


### 5. Run the application:
```bash
cd front
npm run dev

cd server
nom run dev
```

The server should now be running on the specified port, and you can access the API endpoints.
