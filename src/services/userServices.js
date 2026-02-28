import prisma from "#src/conn.js"
import bcrypt from "bcrypt"


export const createUser= async(req)=>{
  const {name,email,password}=req.body
  const hashedPassword= await bcrypt.hash(password,10)
  console.log("hashed password:", hashedPassword)
  const create=await prisma.user.create({
    data:{
          name:name,
          email:email,
          password:hashedPassword
    }
  })
}

export const login = async(req)=>{
  const {email,password}=req.body
  const user=await prisma.user.findUnique({
    where:{
      email:email
    }
  })
  if(!user){
    throw new Error("user not found")
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("isMatch:", isMatch);
  
  if(!isMatch){
    throw new Error("password is incorrect")
  }
// console.log("user:", user)
  return user;
}


export const createToken=async(user)=>{
  const {id,token}=user
  const createdToken=await prisma.token.create({
    data:{
      user_id:id,
      token:token
    }
  })
  console.log("creating token for user id:", id);

  if(!createdToken){
    throw new Error("failed to save token")
  }
}

export const findToken=async(token)=>{
  const find=await prisma.token.findUnique({
    where:{
      token:token
    }
  })
  return find;
}