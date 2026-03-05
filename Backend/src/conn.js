// import dotenv from "dotenv"
// import {PrismaClient} from "../src/generated/prisma/client"
// import {PrismaPg} from "@prisma/adapter-pg"

// dotenv.config()

// const adapter=new PrismaPg({
//   connectionString:process.env.DATABASE_URL,
// }) ;

// const prisma = new PrismaClient({adapter})

// export default prisma
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg" 
const {Pool}=pkg

// console.log("DATABASE_URL:", process.env.DATABASE_URL);
const pool=new Pool({
  connectionString:process.env.DATABASE_URL,
})

export default pool