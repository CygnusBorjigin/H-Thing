# API Doc

The api follows the REST api design pattern. It is separated into three major sections: user, authentication, and project.

Definitions:

* private endpoint is defined as an endpoint that is protected by a middle that only allows access to that endpoint if a valid json web token in present in the browser's local storage.
* public endpoint is defined as an endpoint that can process request from any origin without the protection of any middleware.

## User route

The user route has five sub-routes: register, email, info, password, username. As well as an endpoint.

### `api/user`

This is a private endpoint.

This endpoint can receive an `delete` request to remove the user from the database. Optionally, the user can choose to not only the delete their own account information from the database, but also all the information related to them from the database.

This endpoint requires a valid email address preform any action. The email address is check against the user information in the json web token to verify the correct email address in inputed.

Once the request is processed, there are four possible respond from this endpoint.

1. If the email entered matched the user information described in the json web token and the user corresponding to that email address is found in the database, the user will be removed from the database and an json object `{message : "user deleted"}` with the status code $200$ will be returned.
2. If the email entered does not match the user information described in the json web token, an json object `{message : "wrong email"}` with the status code $400$ will be returned.
3. If the body of the post request does not contain an email string, the json object `{message "A valid email is required"}` with the status code $400$ will be returned.
4. If any other error occurred during the execution, an json object `{message : "server error"}` with the status code $500$ will be returned.

### `api/user/register`

This is a public endpoint.

This endpoint can process an `post` request to register a new user.

The endpoint requires the an email address and a password. The email address will be checked against the existing email addresses in the database to ensure all the email addresses in the database is unique.

Once the request is processed, there are four possible responds:

1. If the email string entered is not an email address or if the password string contains less than six characters, the json object `{message: ["Email is required", "A password of length 6 for more is required"]}` with the status code $400$ will be returned.
2. If the email string entered already exists as a user email in the database , the json object `{message : "The user has already been registered"}` with the status code $400$ will be returned.
3. If any other error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
4. If no error occurred during the process a json web token will be returned that is valid for one day.

### `api/user/username`

This is a private endpoint.

This endpoint can precess a `put` request to change the username on a user profile. 

The endpoint requires a user name in the form of a non-empty string.

Once the request is processed, there are four possible responds:

1. If the content of the post request is an empty string, the json object `{message: ["A valid username is required"]}` with a status code $400$ will be returned.
2. If the json web token contains a user profile that cannot be found in the database, the json object `{message : "user does not exist"}` with the status code $400$ will be returned.
3. If any other error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
4. If no error occurred during the process a json object containing the updated user profile will be returned.

### `api/user/password`

This is a private endpoint

This endpoint can process a `put` request to change the password on a user profile.

This endpoint requires the query body to contain a json object that has a field titled `old_password` and a field titled `new_password`.

Once the request is processed, there are five possible responds:

1. If the content of the post request body contains strings that are less than six characters, a json object `{message : "a valid password is required"}` with a status code $400$ will be returned.
2. If the json web token contained the head of the post request contains a user information that cannot be matched with any user in the database, a json object `{message : "user does not exist"}` with a status code $400$ will be returned.
3. If the content of the `old_password` field does not match the password stored in the user profile, a json object `{message : "wrong password"}` with a status code $401$ will be returned.
4. If any other error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
5. If there is no error in the process and the password has been updated in the database, a json object `{message : "password changed"}` will be returned.

`/api/user/info`

This is a private route.

This endpoint does not expect any input, it simply return the information of the user.

There are three possible responds:

1. If the json web token contained the head of the post request contains a user information that cannot be matched with any user in the database, a json object `{message : "user does not exist"}` with a status code $400$ will be returned.
2. If any other error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
3. If there is no error in the process and the user information is obtained from the database, a json object contain the user name, email, and date created will be returned.

`api/user/email`

This is a private endpoint.

This endpoint can precess a `put` request to change the email address on a user profile. 

The endpoint requires a email address in the form of a non-empty string.

Once the request is processed, there are four possible responds:

1. If the content of the post request is an empty string, the json object `{message: ["A valid email is required"]}` with a status code $400$ will be returned.
2. If the json web token contains a user profile that cannot be found in the database, the json object `{message : "user does not exist"}` with the status code $400$ will be returned.
3. If any other error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
4. If no error occurred during the process a json object `{message : "email updated}` will be returned.


## Project route

The project route has three sub-route: list, item, and all.

`api/project/all`

This is a private route.

The end point does not require anything in the request body.

Once the request is processed, there are two possible responds:

1. If the user described in the json web token is located in the database, the endpoint will respond with all the project that has list the user as the owner.
2. If any error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.

`api/project/item`

The endpoint can handle two request, a post request and a delete request. Both of them are private endpoints.

#### post request

The post request requires the request body to contain a json object that has two fields: "list_id" and "item_name". Both of which must contain a non-empty string.

Once the request is processed, there are five possible responds:

1. If the "list_id" is empty or if the id provided does not match any project in the database, a json object `{message : "A valid ID "}` with a status code $400$ will be returned.
2. If the "item_name" is empty, a json object `{message : "A valid item is required "}` with a status code $400$ will be returned.
3. If the user described in the json web token does not match the user information of the owner of the project this request seeks to change, a json object `{message : The user does not have write access to this list }` with the status code $500$ will be returned.
4. If any error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
5. If no error occurred in the process and the corresponding list has been updated, a json object containing the information about the updated list will be returned.

#### delete request

The delete request requires the request body to contain a json object that has two fields: "list_id" and "item_name". Both of which must contain a non-empty string.

Once the request is processed, there are five possible responds:

1. If the "list_id" is empty or if the id provided does not match any project in the database, a json object `{message : "A valid ID "}` with a status code $400$ will be returned.
2. If the "item_name" is empty, a json object `{message : "A valid item is required "}` with a status code $400$ will be returned.
3. If the user described in the json web token does not match the user information of the owner of the project this request seeks to change, a json object `{message : The user does not have write access to this list }` with the status code $500$ will be returned.
4. If any error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
5. If no error occurred in the process and the corresponding list has been updated, a json object containing the information about the updated list will be returned.

`api/project.list`

The endpoint can handle three request, a post request, a delete request, and a put request. All of them are private endpoints.

#### post request

The post request requires the request body to contain a json object that has the filed "title", which must contain a non-empty string.

Once the request is processed, there are three possible responds:

1. If the "title" is empty a json object `{message : "A title is required"}` with a status code $400$ will be returned.
2. If any error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
3. If no error occurred in the process and the corresponding list has been created, a json file with the information of the newly created list will be returned.

#### delete request

The delete request requires the request body to contain a json object that has the filed "list_id", which must contain a non-empty string.

Once the request is processed, there are three possible responds:

1. If the "list_id" is empty or if the id provided does not match any project in the database, a json object `{message : "A valid list ID is required"}` with a status code $400$ will be returned.
2. If any error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
3. If the user described in the json web token does not match the user information of the owner of the project this request seeks to delete, a json object `{message : The user does not have write access to this list }` with the status code $500$ will be returned.
4. If no error occurred in the process and the corresponding list has been deleted, a json file `{message : "List deleted"}` will be returned.

#### put request

The delete request requires the request body to contain a json object that contains two fields "list_id", and "title", which must contain a non-empty string.

Once the request is processed, there are three possible responds:

1. If the "list_id" is empty or if the id provided does not match any project in the database, a json object `{message : "A valid list ID is required"}` with a status code $400$ will be returned.
2. If the "title" is empty a json object `{message : "A title is required"}` with a status code $400$ will be returned.
3. If any error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
4. If the user described in the json web token does not match the user information of the owner of the project this request seeks to delete, a json object `{message : The user does not have write access to this list }` with the status code $500$ will be returned.
5. If no error occurred in the process and the corresponding list has been updated, a json file containing the information of the updated list will be returned.

## Auth route

The auth route has one endpoint, authenticate.

`api/auth/authenticate`

This is a public endpoint.

The endpoint can receive a post request. It requires the request body to contain two fields "email" and "password" to authenticate the user.

Once the request is processed, there are five possible responds:

1. If the "email" field of the json object in request body does not contain an email address, a json object `{message : "A valid email is required"}` with a status code $400$ will be returned.
2. If the "password" field of the json object in request body does not contain a string with less than sic characters , a json object `{message : "A valid password is required"}` with a status code $400$ will be returned.
3. If the email entered does not match any user email in the database or if the password entered does not match the password in the corresponding user profile in the database a json object `{message : "Invalid Credentials"}` with the status code $400$ will be returned.
4. If any other error arises during the process, a json object `{message: "server error"}` with the status code $500$ will be returned.
5. If no error occurred in the process , a json file containing json web token will be returned that is valid for one day.
