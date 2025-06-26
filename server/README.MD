# API endpoints -> 

## AUTH ROUTER ->
    - POST/auth/signup
    - POST/auth/login
    - POST/auth/logout

## PROFILE ROUTER -> 
    - GET/profile/view
    - PATCH/profile/edit
    - DELETE/profile/delete

## REQUEST ROUTER ->
    - POST/request/send/ignore/:userID
    - POST/request/send/interested/:userID
    - POST/request/review/accept/:userID
    - POST/request/review/reject/:userID

    status -> ignore, interested, accepted, rejected

## USER ROUTER ->
    - GET/user/connections
    - GET/user/requests/recieved
    - GET/user/feed