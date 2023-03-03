# eCommerceStore App

An application for a online store with different user-roles(user, admin & super-admin) using authorization and authentication.

### Home and Login pages:
[![Welcomeandlogin.png](https://i.postimg.cc/FR1xpgLh/Welcomeandlogin.png)](https://postimg.cc/9R5TF9bk)
### Product and Add new product pages:
[![Products-And-Add-Product.png](https://i.postimg.cc/kgnKwF0L/Products-And-Add-Product.png)](https://postimg.cc/SJvnx8NG)
### Cart and SuperAdmin pages:
[![Cart-And-Super-Admin-Page.png](https://i.postimg.cc/VNvMPsLR/Cart-And-Super-Admin-Page.png)](https://postimg.cc/gw9rvWhX)
## What I wanted to solve:

When a customer enters the store - have options to login or create an account.

Different roles and protected routes (User, Admin and SuperAdmin) using
Authorization and Authentication.

Serach and Filter function for the products

Add to cart/view cart

Validation for email/password

## Technologies used:

### Backend:

- .NET webAPI 
- Entity Framework
- Microsoft SQL Server
- JWT tokens

### Frontend Specific:

- React JS
- Material UI

## Future improvements:

- Adding order functionallity
- Checkout page
- Adding a checkout page

## Setup
To run this project, clone it and follow these steps:

### Frontend
```
$ cd ../saltazonFrontend
$ npm install
$ npm run dev
```
### Backend
```
$ cd ../eCommerceStore.API
$ dotnet restore
$ dotnet run
```
