# Thumbnail-generator-microservice
A micro-service that generates thumbnail of an image sent to its server, and also performs json-patch operations

## Endpoints
* Authentication Endpoint
* Json-Patch Endpoint
* Thumbnail Generator Endpoint

## Features
### 1. Authentication
This endpoint receives a json key value pair of the username and password. The endpints integrates a validation that makes sure both username and password is sent to its endpoint, if validation fails, it returns the status code of 400 and the error. but if all datas where sent to its endpoint where sent correctly, it sends a request header of the `Json Web Token`.

### 2. Json-Patch
This endpoint checks to make sure only a validated user can access this endpoint, it checks the request header `authorization` of the request for the token, if a non valid token is sent to its endpoint, it sends a status code 401. but if a valid token is sent, then it performs the patch with the json object and json patch sent to it. this endpoint expects a json object of key value pairs of data and patch. for example: 
```
{
	"data": {"name": "john", "scores": [1,4,6]},
	"patch": [{"op":"add", "path": "/name", "value": "doe"},{"op":"replace", "path": "/scores/1", "value": 8}]
}
```

### 3. Thumbnail Generator
This endpoint can only be accessed by authenticated user, it checks the request header `authorization` of the client. it receives the image url as a json object with a parameter of url, for example:
```
{
	"url": "https://www.joomlack.fr/images/demos/demo2/on-top-of-earth.jpg"
}
```
it checks if the url is valid and if the url points to an image, if it does, then it downloads the image and resize it to 50 x 50 and sends it back to the client as an image

## Getting Started
clone the repository from 
```
git@github.com:klexzi/thumbnail-generator-microservice.git
```
and run 
```
cd thumbnail-generator-microservice
```
then run to install all dependencies.
```
npm install
```
## Environmental Variables
To initialize the API, json secret environment variable must be set, to set this variable, in command-line run
```
set jwtSecret=yourJwtSecret
```
make sure to replace 'yourJwtSecret' with your own secret phrase and then run 
```
npm start
```
to start the server

## Running Tests
Tests is implemented with mocha, with some other dependencies like chai and request, request is used to test routes.]
To run test run the following command 
```
npm test
```
You can also see test coverage by running 
```
npm run coverage

```

## Technologies 
This Api is powered by 
- express framework
- Jimp for simple image processing
- Eslint for linting

## Licence
MIT [licence](https://github.com/klexzi/thumbnail-generator-microservice/blob/master/LICENSE)
