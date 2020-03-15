var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
  host: "localhost",

  //port
  port: 3306,

  //username 
  user: "root",

  //password
  password: "Glottle5832",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  processAnswers();
});

function processAnswers() {
  return inquirer
    .prompt({
      name: "todo",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add employee",
        "Add role",
        "Add department",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles"
      ]

    }).then(function (answers) {
      switch (answers.todo) {
        case "Add employee":
          addEmployee();
          break;

        case "Add role":
          addRole();
          break;

        case "Add department":
          addDept();
          break;

        case "View departments":
          viewDept();
          break;

        case "View roles":
          viewRole();
          break;

        case "View employees":
          viewEmpl();
          break;

        case "Update employee roles":
          updateEmp();
          break;

        default:
          console.log("Finish")
      }
    })
}

function addEmployee() {

  return inquirer.
  prompt([{
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName"
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName"
    },
    {
      type: "input",
      message: "Add role",
      name: "addRole"
    }
  ]).then(function (answers) {
    var values = [answers.firstName, answers.lastName, answers.addRole]
    connection.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?)", [values],
      function (err, data) {
        if (err) throw err;
        console.log("data added to employee " + data)
      })
  })
}

function addRole() {
  return inquirer.
  prompt([{
      type: "input",
      message: "Add title",
      name: "addTitle"
    },
    {
      type: "input",
      message: "List salary",
      name: "listSalary"
    },
    {
      type: "input",
      message: "Department ID",
      name: "addDept"
    }
  ]).then(function (answers) {
    var values = [answers.addTitle, answers.listSalary, answers.addDept]
    connection.query("INSERT INTO employee_role (title, salary, department) VALUES (?)", [values],
      function (err, data) {
        if (err) throw err;
        console.log("data added to employee_role " + data)
      })
  })
}

function addDept() {
  return inquirer.
  prompt([{
    type: "input",
    message: "Add department",
    name: "dept"
  }]).
  then(function (answers) {
    var values = [answers.dept]
    connection.query("INSERT INTO department (name) VALUES (?)", [values],
      function (err, data) {
        if (err) throw err;
        console.log("data added to department " + data)
      })
  })
}

function viewDept() {
  return inquirer
    .prompt({
      type: "confirm",
      message: "View department?",
      name: "deptView",
      //default: true
    })
    .then(function (answers) {
      if (answers.deptView === true) {
        //console.log(answers.deptView)
        connection.query("SELECT * FROM department",
          function (err, data) {
            if (err) throw err;
            console.table(data)
          })
      }
    })
}

function viewRole() {
  return inquirer
    .prompt({
      type: "confirm",
      message: "View roles?",
      name: "roleView",
      //default: true
    })
    .then(function (answers) {
      if (answers.roleView === true) {
        connection.query("SELECT * FROM employee_role",
          function (err, data) {
            if (err) throw err;
            console.table(data)
          })
      }
    })
}

function viewEmpl() {
  return inquirer
    .prompt({
      type: "confirm",
      message: "View employees?",
      name: "emplView",
      //default: true
    })
    .then(function (answers) {
      if (answers.emplView === true) {
        connection.query("SELECT * FROM employee",
          function (err, data) {
            if (err) throw err;
          })
      }
    })
}

function updateEmp() {
  var questions = [
    {
      type: "input",
      message: "Enter employee role new id",
      name: "roleId"
    },
    {
      type: "input",
      message: "Enter employee id number",
      name: "empId"
    }
  ];

  inquirer.prompt(questions)
    .then(function (answers) {
      console.log(answers.empId);
      console.log(answers.roleId)
      connection.query(`UPDATE employee SET role_id = ${answers.roleId} 
  WHERE id = ${answers.empId}`,
        function (err, data) {
          if (err) throw err;
          console.log("role_id updated")
        })
    })
}