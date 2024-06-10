const express=require('express')
const router=express.Router()
const employeeController=require('../controller/employeeController')
const verify=require('../verificaion/verifytoken')

router.post('/',verify.verifytoken,employeeController.createEmployee)
router.post('/login',employeeController.login)
router.get('/',employeeController.getAllEmployees)
router.get('/:id',employeeController.getEmployeeById)
router.put('/:id',verify.verifytoken, employeeController.updateEmployee);
router.delete('/:id',verify.verifytoken, employeeController.deleteEmployee);
module.exports=router