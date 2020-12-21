const errValidator = (err) => {
    let errList = [];
    for (let e in err.errors) {
      errList.push(err.errors[e].message);
    }
    return errList.join(", ");
  };
  
  module.exports = (err, req, res, next) => {
    if (err.name === "ValidationError") {
      let message = errValidator(err);
      status = 400;
  
      res.status(status).json({ message, status });
    } else {
      let msg = err.message;
      console.log(err);
      res.status(400).json({ message: msg });
    }
  };