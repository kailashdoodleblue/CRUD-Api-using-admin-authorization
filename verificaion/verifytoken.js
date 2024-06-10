let bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Employee = require("../model/employee")

exports.verifytoken = async (req, res, next) => {
    const token = req.headers.authorization;
    const emp = await Employee.findAll();
    let data = emp[0]
    if (!data) {
        next()
    } else {
        if (!token) {
            return res.status(401).json({ error: 'Token is required' });
        }
        jwt.verify(token, 'hello', async (err, decoded) => {
            try {
                let username = decoded.empName

                let emp = await Employee.findOne({ where: { role: "HR", empName: username } });
                if (emp != null) {
                    next()
                }
                else {
                    return res.status(401).json({ error: 'User dont have access' });
                }
            }
            catch (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            console.log(decoded)
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }
            // next()
        });
    }
}