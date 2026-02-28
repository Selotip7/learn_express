export const errorHandler=(err,req,res,next)=>{
  console.log("error:",err);
  return res.status( 400).json({
    success:false,
    message:err.message,
    code:err.code||500,
  })
}