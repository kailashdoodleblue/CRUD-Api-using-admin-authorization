const  Sequelize  = require("sequelize");
const dotenv =require("dotenv");
dotenv.config()

const sequelize=new  Sequelize(process.env.DB_name,process.env.DB_user,process.env.DB_password,
    {
        host:process.env.DB_host,
        dialect:'mysql'
    }
)
module.exports=sequelize;