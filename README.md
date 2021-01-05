# blog-api

### API End Points

> - **POST request For SignUp End Point - https://blog-api-tanixq.herokuapp.com/api/users/signup**
> - **POST request For Login End Point - https://blog-api-tanixq.herokuapp.com/api/users/login**
> - **POST request For Logout End Point - https://blog-api-tanixq.herokuapp.com/api/users/logout**
> - **GET request For View Public Blogs - https://blog-api-tanixq.herokuapp.com/api/blogs/view/**
> - **POST request For Creating New Blog End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/create-new**
> - **GET request For View User Blogs End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/user-blogs**
> - **GET request For View User Profile End Point - https://blog-api-tanixq.herokuapp.com/api/users/profile**
> - **POST request For Verify User Account End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/verify**
> - **POST request For Resend Otp End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/resend**
> - **POST request For Edit User Bio End Point - https://blog-api-tanixq.herokuapp.com/api/users/profile/edit/bio**
> - **POST Request For Admin Login on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/login**
> - **POST Request For Admin Logout on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/logout**
> - **GET Request for View Pending Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/view/pending-blogs**
> - **GET Request for View Rejected Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/view/rejected-blogs**
> - **GET Request for View Approved Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/view/approved-blogs**
> - **POST Request for Approve Blog on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/blog/approve**
> - **POST Request for Reject Blog on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/blog/reject**
> - **POST request For Password Reset End Point - https://blog-api-tanixq.herokuapp.com/api/users/password/reset**
> - **GET request For view by category End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/category/:categoryName**
> - **GET request For blog by title End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/:blogTitle**
> - **DELETE request For Delete Blog End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/delete/by-id**


# Usage

### Goto Section

- [Usage for Sign Up](#for-sign-up)
- [Usage for Log In](#for-login)
- [Usage for Log Out](#for-logout)
- [Usage for Creating Blog](#for-creating-blog)
- [Usage For Viewing User Blog](#for-viewing-user-blog)
- [Usage For Viewing User Profile](#for-viewing-user-profile)
- [Usage For Viewing Public Blog](#for-viewing-public-blog)
- [Usage For Verify User Account](#for-verify-user-account)
- [Usage For Resend otp](#for-resend-otp)
- [Usage For Edit User Bio](#for-edit-user-bio)
- [Usage For Admin Login](#for-admin-login)
- [Usage For Admin Logout](#for-admin-logout)
- [Usage For View Pending Blogs](#for-view-pending-blogs)
- [Usage For View Rejected Blogs](#for-view-rejected-blogs)
- [Usage For View Approved Blogs](#for-view-approved-blogs)
- [Usage For Approve Blog](#for-approve-blog)
- [Usage For Reject Blog](#for-reject-blog)
- [Usage For Password Reset](#for-password-reset)
- [Usage For View Blog by Category](#for-blog-view-by-category)
- [Usage For View Blog by Title](#for-view-blog-by-title)
- [Usage For Delete Blog](#for-delete-blog)



## For Sign Up
Make **POST** Request for sign up on End Point - https://blog-api-tanixq.herokuapp.com/api/users/signup

Provide Following data in body

| Fields      | Description                                          | TYPE      | Required  |
| -------------  |:-------------:                                     | -----:    | -----: |
| first_name     | First Name of the user                             |   String  | Yes      |
| last_name      | Last Name of the user                              |   String  | Yes      |
| email          | Email of the user.                                 |   String  | Yes      |
| password       | Password of the user. Must be of 8 characters.     |   String  | Yes      |
| bio            | bio of the user. Max 160 characters.               |   String  | optional |
| profilePicture | profile picture of user.                           |   file    | optional  |


## For Login
Make **POST** Request for login on End Point - https://blog-api-tanixq.herokuapp.com/api/users/login

Provide Following data in body

| Fields        | Description           | TYPE      | Required  |
| ------------- |:-------------:        | -----:    | -----: |
| email         | Email of the user.    | String    | Yes |
| password      | Password of the user. | String    | Yes |


Example :- 
```
{
    "email": "test55@test.com",
    "password": "123456"
}
```

Description of Response data

| Fields        | Description                             | TYPE      |
| ------------- |:-------------:                          | -----:    |
| id            | id of logged in the user.               | String    |
| email         | Email of logged in the user.            | String    |
| userIp        | ip Address of logged in user.           | String    |
| token         | Authentication token of logged in user  | String    |


**Example of API Response:**

On Successful Login
```
{
    "statusCode": 7000,
    "message": "Login is successful",
    "data": {
        "user": {
            "id": "5fef460f026ca8254c5f998d",
            "email": "er.tanixq@gmail.com",
            "userIp": "::1"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZWY0NjBmMDI2Y2E4MjU0YzVmOTk4ZCIsImlhdCI6MTYwOTUxNzc2MCwiZXhwIjoxNjA5NTE5NTYwfQ.w0KURaS-XAJI6PLeS3UaVf_kWkardAuyFPKwMiNpn7k"
    }
}
```

## For Logout
Make **POST** Request for logout on End Point - https://blog-api-tanixq.herokuapp.com/api/users/logout

Provide Authorization Token in header.


## For Creating Blog
Make **POST** Request for Creating Blog on End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/create-new

Provide Authentication Token in Header

Generate Token by Login and Copy it.

Provide Following data in body

| Fields         | Description                | TYPE      | Required  |
| -------------  |:-------------:             | -----:    | -----:    |
| title          | Title of the blog.         |   String  | required  |
| content        | content of the blog.       | String    | required  |
| thumb_image    | image for blog thumb.      |   file    | required  |


## For Viewing User Blog
Make **Get** Request for View User Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/user-blogs

Provide Authentication Token in Header

Generate Token by Login and Copy it.

## For Viewing User Blog
Make **Get** Request for View User Profile on End Point - https://blog-api-tanixq.herokuapp.com/api/users/profile

Provide Authentication Token in Header

Generate Token by Login and Copy it.

## For Viewing Public Blog
Make **Get** Request for Public Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/

## For Verify User Account
Make **POST** Request for Verify User Account on End Point - https://blog-api-tanixq.herokuapp.com/api/users/email/verify

Provide Following data in body

| Fields      | Description                   | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| email         | Email of the user.          | String    | Yes |
| otp           | otp received in email       |   String  | Yes |


Example :- 
```
{  
    "email": "er.tanixq@gmail.com",
    "otp": "187849"
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

## For Edit User Bio
Make **POST** Request for Resend otp on End Point - https://blog-api-tanixq.herokuapp.com/api/users/profile/edit/bio

Provide Authentication token in header
and
Provide Following data in body

| Fields        | Description                 | TYPE      | Required  |
| ------------- |:-------------:              | -----:    | -----: |
| bio           | bio of the user. (max:160)  | String    | Yes |


Example :- 
```
{  
    "bio": "loremispusm etc etc ...",
}
```

## For Admin Login
Make **POST** Request for Admin Login on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/login

Provide Following data in body

| Fields          | Description                  | TYPE      | Required  |
| -------------   |:-------------:               | -----:    | -----:    |
| admin_username  | Username of the admin.       | String    | Yes       |
| admin_password  | Password of the admin.       | String    | Yes       |

## For Admin Logout
Make **POST** Request for logout on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/logout

Provide Admin Authorization Token in header.

## For View Pending Blogs
Make **GET** Request for View Pending Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/view/pending-blogs

Provide Admin Authentication Token in Header.

Generate Token by Admin Login and Copy it.

## For View Rejected Blogs
Make **GET** Request for View Rejected Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/view/rejected-blogs

Provide Admin Authentication Token in Header.

Generate Token by Admin Login and Copy it.

## For View Approved Blogs
Make **GET** Request for View Approved Blogs on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/view/approved-blogs

Provide Admin Authentication Token in Header.

Generate Token by Admin Login and Copy it.

## For Approve Blog
Make **POST** Request for Approve Blog on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/blog/approve

Provide Admin Authentication Token in Header.
Generate Token by Admin Login and Copy it.

Provide blog_id in body.

Example: - 
```
{
    "blog_id" : "5fe77e9c6ef2010017df962a"
}
```

## For Reject Blog
Make **POST** Request for Reject Blog on End Point - https://blog-api-tanixq.herokuapp.com/api/admin/blog/reject

Provide Admin Authentication Token in Header.
Generate Token by Admin Login and Copy it.

Provide blog_id in body.

Example: - 
```
{
    "blog_id" : "5fe77e9c6ef2010017df962a"
}
```


## For Password Reset
Make **POST** Request for Password Reset on End Point - https://blog-api-tanixq.herokuapp.com/api/users/password/reset

Provide Following data in body

| Fields      | Description                          | TYPE      | Required  |
| ------------- |:-------------:                     | -----:    | -----: |
| email         | Email of the user.                 | String    | Yes |
| otp           | otp generated from resend route.   | String    | Yes |
| new_password  | new password of the user.          | String    | Yes |

Example :- 
```
{  
    "email": "er.tanixq@gmail.com",
    "otp": "122458",
    "new_password": "12354567890",
}
```

## For View Blog by Category
Make **GET** Request for View by Category on End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/category/:categoryName

replace categoryName with one of these ['fashion', 'food', 'travel', 'music', 'lifestyle', 'fitness', 'diy', 'finance', 'technology', 'other']

## For View Blog by Title
Make **GET** Request for View by Category on End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/view/:blogTitle

replace blogTitle with title of the blog.

## For Delete Blog
Make **DELETE** request For Delete Blog End Point - https://blog-api-tanixq.herokuapp.com/api/blogs/delete/by-id

Provide Authentication Token in Header.
Generate Token by Admin Login and Copy it.

Provide blog_id in body.

Example: - 
```
{
    "blog_id" : "5fe77e9c6ef2010017df962a"
}
```