let generateMessage = (from, text) => {
  return {
    from: from,
    text: text,
    createdAt: new Date().getDate()
  }
}

module.exports = {
  generateMessage
};