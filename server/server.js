if (process.argv.length < 2) {
   console.log("Usage: node server.js <dir name> <port> \rport and dir are optional");
   return;
}

var
   express = require("express"),
   app = express(),
   DIR = process.argv[2] || __dirname + "/../",
   PORT = process.argv[3] || 1234,
   people =
      [
         {id: 0, name: "Bob", age: 47, favorite_color: "blue"},
         {id: 1, name: "Sally", age: 30, favorite_color: "light blue"},
         {id: 2, name: "Tommy", age: 13, favorite_color: "purple"},
         {id: 3, name: "Chaz", age: 26, favorite_color: "brown"},
         {id: 4, name: "Tim", age: 67, favorite_color: "yellow"},
         {id: 5, name: "John", age: 19, favorite_color: "red"},
         {id: 6, name: "Bertha", age: 35, favorite_color: "white"},
         {id: 7, name: "Stephen", age: 25, favorite_color: "green"}
      ];


app.configure(function() {
   app.use(express.logger());
   app.use(express.bodyParser());
   app.use(express.methodOverride());
   app.use(express.static(DIR));
   app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
   }));
   app.use(app.router);
});


/* public API */

app.get("/", function(req, res) {
   res.redirect("/index.html");
});

app.get("/students", function(req, res) {
   res.json(people);
});

app.get("/students/:studentId", function(req, res) {
   res.json(people[req.params.studentId]);
});

app.put("/students/:studentId", function(req, res) {
   console.log("body",req.body);
   people[req.params.studentId] = req.body;
   console.log("res:", people, [req.params.studentId]);
   res.json(people[req.params.studentId]);
   res.status(200);
});

app.post("/students/", function(req, res) {
   var newPerson = req.body;
   req.body.id = people.length;
   people.push(newPerson);
   res.json(newPerson);
});

app.listen(PORT);
console.log("* Server is running at port ", PORT, "\r* serving directory ", DIR);