const express = require("express");
const server = express();
const PORT = process.env.PORT || 3002;
server.use(express.json());

const validatorMiddleware=(req,res,next)=>{
 let { ID, Name, Rating,Description, Genre, Cast}=req.body;
 let errormsg ="";
 if (typeof ID !== 'number') {
    errormsg +='ID should be a number';
  }

  // Name should be a string
  if (typeof Name !== 'string') {
    errormsg+='Name should be a string';
  }

  // Rating should be a number
  if (typeof Rating !== 'number') {
    errormsg+='Rating should be a number';
  }

  // Description should be a string
  if (typeof Description !== 'string') {
    errormsg+='Description should be a string';
  }

  // Genre should be a string
  if (typeof Genre !== 'string') {
    errormsg+='Genre should be a string';
  }

  // Cast should be an array of strings
  if (!Array.isArray(Cast) || Cast.some(item => typeof item !== 'string')) {
    errormsg+='Cast should be an array of strings';
  }
  if(errormsg){
    return res.status(400).json({
        message:"bad request. some data is invalid",
        note:errormsg
    });
  }
 next();
};
server.post("/",validatorMiddleware,(req,res)=>{
res.status(200).json({message:"data received"});
});
server.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
});