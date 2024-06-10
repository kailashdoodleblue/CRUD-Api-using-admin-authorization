
const Employee = require("../model/employee")
let bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.createEmployee = async (req, res) => {
  
  try {
    let hashedpass = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedpass;
    const emp = await Employee.create(req.body)
    res.status(201).json({ message: "Employee created" })
  }
  catch (err) {
    res.status(401).json({ message: err.message })
  }
}

exports.login = async (req,res)=>{
  let { empName, password } = req.body;
  let checkuser=await Employee.findAll({attributes: ['empName','password'], where:{empName:empName}})
  console.log(checkuser)
  let user = checkuser[0]
  
  if(!user){
      return res.status(401).json({ error: 'UserName not found' })
  }
  console.log(user.password)
  console.log(password)
  bcrypt.compare(password,user.password,(err,checkpass)=>{
      console.log(checkpass)
      if (!checkpass) {
          return res.status(401).json({ error: 'Invalid password' });
      }
      token=jwt.sign({ empName }, 'hello',{ expiresIn: '900s' }) 
      return res.json({token,message:`${empName} login successful`})      
  })   

}

exports.getAllEmployees = async (req, res) => {
  try {
    const emp = await Employee.findAll();
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findOne({ where: { empID: req.params.id } });
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await emp.update(req.body);
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await emp.destroy()
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

