
##### before running the project make sure you have changed the backend/.env file to
- DATABASE_URL="postgresql://user:password@postgres:5432/ft_tran?schema=public" 

### How to run the project 
`docker-compose up`

### check if user is persisting successfully in database (Prisma Studio Database Management System)
- `localhost:5555` OR `127.0.0.1:5555`

### API :
### login
- `localhost:5001/api/auth/callback`

## SWAGGER API

#### Swagger
Swagger is a tool that can be used to document and describe REST APIs. It can be used to generate documentation, client SDKs, and test cases for your APIs.

#### :stop_sign: Before running the project make sure you have the updated package.json file 
    yarn install

### SWAGGER URL (to test API's)
    localhost:${port}/api/ 

## API Reference

### AUTHENTICATION API's
* :warning: type this URL `localhost:port/api/auth/callback` on the browser, after you will be redirected to the 42-api, then press authorize and you will be redirected to another page with the ``token`` of your authentication, keep the ``token`` for future use.

### USER API's

* :warning: before running the USER api's make sure you have the `token` you get previously and go the green lock `Autorize` and put it there.

#### Get user by username

```http
  GET /api/users/{username}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Header**. get a user by it's username |

#### Update the user by ID

```http
  PATCH /api/users/${id}/update
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **URL**. Id of tha target user to update |
| `username`      | `string` | **Body**. the new username |


#### Upload the user avatar
```http
  PATCH /api/users/${id}/upload
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **URL**. Id of the target user|
| `file`      | `file` | **Body**. image to be uploaded for the tagret user |

### EXAMPLE (Click on the Authorize and put your token there)
<p><img align="center" src="https://raw.githubusercontent.com/Maiichi/ft_transcendence/develop/images/Swager_example.png" alt="swagger" /></p>
