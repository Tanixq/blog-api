# blog-api

### API End Points

> - **POST request For Registration/SignUp End Point - https://blog-api-tanixq.herokuapp.com/api/users/register**
> - **POST request For Login End Point - https://blog-api-tanixq.herokuapp.com/api/users/login**
> - **GET request For View Public Blogs - https://blog-api-tanixq.herokuapp.com/api/blogs**
> - **POST request For Creating New Blog (Login Token Required) End Point - https://blog-api-tanixq.herokuapp.com/api/users/create-blog**
> - **GET request For View User Blogs (Login Token Required) End Point - https://blog-api-tanixq.herokuapp.com/api/users/blogs**
> - **POST request For Verify Email End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/verify**
> - **POST request For Resend Email End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/resend**

# Usage

### Goto Section

- [Usage for Sign Up](#for-sign-up)
- [Usage for Log In](#for-login)
- [Usage for Creating Blog](#for-creating-blog)
- [Usage For Viewing User Blog](#for-viewing-user-blog)
- [Usage For Viewing Public Blog](#for-viewing-public-blog)
- [Usage For Verify User Account](#for-verify-user-account)
- [Usage For Resend otp](#for-resend-otp)



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

Provide Following data in body

| Fields         | Description                | TYPE      | Required  |
| -------------  |:-------------:             | -----:    | -----: |
| title          | Title of the blog.         |   String  | optional |
| description    | Description of the blog.   | String    | optional |
| thumb_image    | image url for blog thumb.  |   file    | optional |

**Example of response:**
```
{
    "statusCode": 7000,
    "message": "Blog created successfully!",
    "data": ""
}
```

## For Viewing User Blog
Make **Get** Request for View User Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/users/blogs

Provide Authentication Token in Header

Generate Token by Login and Copy it.

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

## For Verify User Account
Make **POST** Request for Verify User Account on End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/verify

Provide Following data in body

| Fields      | Description                 | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| email         | Email of the user.          | String    | Yes |
| otp           | otp received in email       |   String  | Yes |


Example :- 
```
{  
    "email": "er.tanixq@gmail.com",
    "otp": "LNoKFJ"
}
```

**Example of API Response:**

On Successful Login
```
{
    "statusCode": 7000,
    "message": "Your account verificaiton is successful.",
    "data": ""
}
```

## For Resend otp
Make **POST** Request for Resend otp on End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/resend

Provide Following data in body

| Fields      | Description                 | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| email         | Email of the user.          | String    | Yes |


Example :- 
```
{  
    "email": "er.tanixq@gmail.com",
}
```

## For Admin Login
Make **POST** Request for Admin Login on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/login

Provide Following data in body

| Fields        | Description                  | TYPE      | Required  |
| ------------- |:-------------:               | -----:    | -----:    |
| email         | Email of the admin.          | String    | Yes       |
| password      | Password of the admin.       | String    | Yes       |


Example :- 
```
{
    "email": "test55@test.com",
    "password": "123456"
}
```

## For Review Blogs
Make **GET** Request for Review Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/review-blogs

Provide Admin Authentication Token in Header.

Example :- 
```
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
```

Generate Token by Admin Login and Copy it.

## For Approve Blog
Make **POST** Request for Review Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/approve-blog

Provide Admin Authentication Token in Header.

Example :- 
```
Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX"
```

Generate Token by Admin Login and Copy it.

Provide blog_id in body.

Example: - 
```
{
    "blog_id" : "5fe77e9c6ef2010017df962a"
}
```
