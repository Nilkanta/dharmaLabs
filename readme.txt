npm install
npm start
test APIs-

API: create
method:POST
Url: http://localhost:3000/users/signup
BODY:{
	"name":"Test",
	"email":"test@email.com",
	"password":"test"
}

API: read
method:GET
Url: http://localhost:3000/users/read?id=1

API: delete
method:POST
Url: http://localhost:3000/users/delete
BODY:{
	"id": 1
}

API: update
method:POST
Url: http://localhost:3000/users/delete
BODY:{
	"id": 1,
	"name":"DharmaLab",
	"email":"DharmaLab@email.com",
	"password":"DharmaLab"
}
