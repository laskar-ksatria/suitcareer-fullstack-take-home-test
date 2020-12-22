# **suitcareer-fullstack-take-home-test**



### Step by step to running this app



1. You must installed node on your OS

   Download link https://nodejs.org/en/download/

   Choose based on the Operating system on your PC or laptop

2. Install git to connect github with your terminal

   Download Link https://git-scm.com/downloads

   Choose based on the Operating system on your PC or laptop

3. Installing MongoDB

   Download link https://docs.mongodb.com/manual/installation/

   Choose based on the Operating system on your PC or laptop

4. Open terminal, type 

   ```
   git clone https://github.com/laskar-ksatria/suitcareer-fullstack-take-home-test.git
   ```

5. Open folder with your text editor. if you dont have, you can donwnload first on this https://code.visualstudio.com/download

6. Open terminal and type

   ```
   npm install
   ```

   after that type

   ```
   nodemon app.js
   ```

7. There will be text like

   ```
   Server listening on 3100
   We are connected to monggoDb
   ```

   that indicate the application is running correctly

8. Download postman for GET and POST to Application

   https://www.postman.com/downloads/

   

------



### REST API DOCUMENTATION



#### **CREATE LOCATION**

```
url: 'http://localhost:3100/location/create'
method: 'POST'
headers: {
	Content-Type: application/json
}
```

body example

```
{
	location: "Jakarta"
}
```



Success output example

```
{
  "message": "Location has been added",
  "location": {
    "events": [],
    "_id": "5fe15d6c6770273d28dc78ac",
    "location": "jakarta",
    "__v": 0
  }
}
```

Validation Error example

```
{
  "message": "jakarta already added",
  "status": 400
}
```





#### **CREATE EVENT**

```
url: 'http://localhost:3100/event/create'
method: 'POST'
headers: {
	Content-Type: application/json
}
```

body example

```
{
    "name": "Pameran Picasso",
    "location": "Jakarta",
    "start": "2020-12-31T20:00:00Z",
    "end": "2021-01-01T02:00:00Z"
}
```



Succes output example

```
{
  "message": "Event has been added",
  "newEvent": {
    "tickets": [],
    "_id": "5fe15eb0e231d72ec4000421",
    "name": "pameran picasso",
    "location": "jakarta",
    "__v": 0,
    "schedule": {
      "_id": "5fe15eb0e231d72ec4000422",
      "start": "2020-12-31T20:00:00.000Z",
      "end": "2021-01-01T02:00:00.000Z",
      "event": "5fe15eb0e231d72ec4000421",
      "__v": 0
    }
  }
}
```



Error ouput example

```
{
  "message": "Event already registered in that location"
}
```



#### **CREATE TICKET**

```
url: 'http://localhost:3100/event/ticket/create'
method: 'POST'
headers: {
	Content-Type: application/json
}
```

body example

```
{
    "price": 20000,
    "quota": 10,
    "location": "Jakarta",
    "event_name": "Pameran Picasso",
    "ticket_type": "premium"
}
```

Success Output example

```
{
  "message": "Ticket has been added",
  "ticket": {
    "_id": "5fe15f52e231d72ec4000423",
    "price": 20000,
    "quota": 10,
    "event": {
      "tickets": [
        "5fe15f52e231d72ec4000423"
      ],
      "_id": "5fe15eb0e231d72ec4000421",
      "name": "pameran picasso",
      "location": "jakarta",
      "__v": 0,
      "schedule": "5fe15eb0e231d72ec4000422"
    },
    "ticket_type": "premium",
    "__v": 0
  }
}
```



#### **EVENT GET INFO**

```
url: 'http://localhost:3100/event/get_info'
method: 'GET'
headers: {
	Content-Type: application/json
}
```

Succes output example

```
[
  {
    "events": [
      {
        "tickets": [
          {
            "_id": "5fe15f52e231d72ec4000423",
            "price": 20000,
            "quota": 10,
            "event": "5fe15eb0e231d72ec4000421",
            "ticket_type": "premium",
            "__v": 0
          },
          {
            "_id": "5fe15f68e231d72ec4000424",
            "price": 20000,
            "quota": 10,
            "event": "5fe15eb0e231d72ec4000421",
            "ticket_type": "premium",
            "__v": 0
          }
        ],
        "_id": "5fe15eb0e231d72ec4000421",
        "name": "pameran picasso",
        "location": "jakarta",
        "__v": 0,
        "schedule": {
          "_id": "5fe15eb0e231d72ec4000422",
          "start": "2020-12-31T20:00:00.000Z",
          "end": "2021-01-01T02:00:00.000Z",
          "event": "5fe15eb0e231d72ec4000421",
          "__v": 0
        }
      }
    ],
    "_id": "5fe15e65e231d72ec400041f",
    "location": "jakarta",
    "__v": 0
  }
]
```



#### PURCHASE TICKET

```
url: 'http://localhost:3100/transaction/purchase'
method: 'POST'
headers: {
	Content-Type: application/json
}
```

body example

```
{
	"username": "laskar",
	"event_name": "pameran picasso",
	"location": "jakarta",
	"ticket_info": [
		{
			"ticket_type": "regular",
			"quantity": 2
		},
		{
			"ticket_type": "premium",
			"quantity": 4
		},
	]
}
```



#### GET INFO TRANSACTION

```
url: 'http://localhost:3100/transaction/get_info'
method: 'GET'
headers: {
	Content-Type: application/json
}
```

