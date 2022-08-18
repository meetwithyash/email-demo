const { addUser, checkUserEmailExists } = require("../models/User");
const { validateEmail } = require("../utils");
const { responses } = require("../utils/responses");

const registerUser = (req, res, next) => {
  //for registering the user into system

  const { email } = req.body;

  if(!email || !validateEmail(email)) return res.json(responses.BAD_REQUEST("Invalid email!"));

  if(checkUserEmailExists(email)) return res.json(responses.DATA_EXIST("Email already exists in the subscriber list!"));
  
  addUser(req.body.email);
  
  res.json(responses.CREATED("Email added successfully in the subscriber list!"))
}

module.exports = {
  registerUser
}