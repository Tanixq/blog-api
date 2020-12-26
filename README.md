# blog-api

### API End Points

> - **POST request For Registration/SignUp End Point - https://blog-api-tanixq.herokuapp.com/api/users/register**
> - **POST request For Login End Point - https://blog-api-tanixq.herokuapp.com/api/users/login**
> - **GET request For View Public Blogs - https://blog-api-tanixq.herokuapp.com/api/blogs**
> - **POST request For Creating New Blog (Login Token Required) End Point - https://blog-api-tanixq.herokuapp.com/api/users/create-blog**
> - **GET request For View User Blogs (Login Token Required) End Point - https://blog-api-tanixq.herokuapp.com/api/users/blogs**

# Usage

### Goto Section

- [Usage for Sign Up](#for-sign-up)
- [Usage for Log In](#for-login)
- [Usage for Creating Blog](#for-creating-blog)

## For Sign Up
Make **POST** Request for sign up on End Point - https://blog-api-tanixq.herokuapp.com/api/users/register

Set Content-Type as application/json

```
Content-Type: application/json
```

![alt set_content_type](https://github.com/Tanixq/images/blob/main/content-type.gif?raw=true)

Provide Following data in body

| Fields      | Description                 | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| name          | Name of the user.           |   String  | Yes |
| email         | Email of the user.          | String    | Yes |
| password      | Password of the user.       |   String  | Yes |

Example :- 
```
{
    "name": "Test User",
    "email": "test55@test.com",
    "password": "123456"
}
```

## For Login
Make **POST** Request for login on End Point - https://blog-api-tanixq.herokuapp.com/api/users/login

Provide Following data in body

| Fields      | Description                 | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| email         | Email of the user.          | String    | Yes |
| password      | Password of the user.       |   String  | Yes |


Example :- 
```
{
    "email": "test55@test.com",
    "password": "123456"
}
```

**Example of API Response:**

On Successful Login
```
{
    "statusCode": 7000,
    "message": "Login is successful",
    "data": {
        "user": {
            "email": "test2@test.com",
            "lastVisted": 1608982315285
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiaWF0IjoxNjA4OTgyMzE1LCJleHAiOjE2MDg5ODQxMTV9.Fuk1uubo-hHTvwymetnN1rqLgMiFeBGVCqgg2LxhrlU"
    }
}
```

## For Creating Blog
Make **POST** Request for Creating Blog on End Point - https://blog-api-tanixq.herokuapp.com/api/users/create-blog

Provide Authentication Token in Header

Generate Token by Login and Copy it.

![alt generate_token](https://github.com/Tanixq/images/blob/main/generate_token.gif?raw=true)

Provide Following data in body

| Fields         | Description                | TYPE      | Required  |
| -------------  |:-------------:             | -----:    | -----: |
| title          | Title of the blog.         |   String  | Yes |
| description    | Description of the blog.   | String    | Yes |
| thumb_image    | image url for blog thumb.  |   String  | Yes |

**Example of response:**
```
{
    "statusCode": 7000,
    "message": "Login is successful",
    "data": {
        "user": {
            "email": "test25@test.com",
            "lastVisted": 1608982765637
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyNUB0ZXN0LmNvbSIsImlhdCI6MTYwODk4Mjc2NSwiZXhwIjoxNjA4OTg0NTY1fQ.53qzbE8k04ZrY_MQuPqzRChJnZVEa4pi9bayjWXLiIs"
    }
}
```

## For Viewing User Blog
Make **Get** Request for View User Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/users/blogs

Provide Authentication Token in Header

Generate Token by Login and Copy it.

![alt generate_token](https://github.com/Tanixq/images/blob/main/generate_token.gif?raw=true)

## For Viewing Public Blog
Make **Get** Request for Public Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/blogs


**Example of response:**
```
{
    "statusCode": 7000,
    "message": [
        {
            "_id": "5fe6ff536ca27f088c0fb590",
            "title": "askdfjksd",
            "description": "hakdjflkad",
            "thumb_image": "hee",
            "author": "test@test.com",
            "approved": true,
            "__v": 0
        }
    ],
    "data": ""
}
```