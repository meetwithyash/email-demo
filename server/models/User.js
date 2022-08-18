const messages = require("../constants");
const { getShuffledArray } = require("../utils");

const users = [];
const messageIndexes = Array(messages.length).fill().map((_, index) => index);

const checkUserEmailExists = (email) => {
  return users.filter((user) => user.email === email).length !== 0;
}

const addUser = (email) => {
  users.push({
    email,
    messages: getShuffledArray(messageIndexes)
  })
}

const getPendingUsers = () => users.filter((user) => user.messages.length > 0)

module.exports = {
  checkUserEmailExists,
  addUser,
  getPendingUsers
}