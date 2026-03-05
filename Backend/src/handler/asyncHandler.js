export const asyncHandler=(fn)=>{
  return (req,res,next)=>{
    return Promise.resolve(fn(req,res,next)).catch(next)
  }
}

// Bagian penting:
// .catch(next)
// Artinya sama dengan:
// .catch(err => next(err))
// Jadi:
// Jika fn() error
// Error otomatis dikirim ke next(error)
// Lalu masuk ke middleware error handler Express