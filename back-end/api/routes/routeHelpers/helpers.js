module.exports = {
  postSuccess: res => id => {
    res.status(201).json(id);
  },
  serverErrorPost: res => err => {
    res.status(422).json(err);
  },
  getSuccess: res => data => {
    res.status(200).json(data);
  },
  serverErrorGet: res => err => {
    res.status(500).json(err);
  },
  serverErrorGetID: (res, type, id) => err => {
    res.status(404).json({ message: `The ${type} with the specified ${id} does not exist.`, err: err });
  },
  serverErrorGetEmail: (res, type, email) => err => {
    res.status(404).json({ message: `The ${type} with the specified ${email} does not exist.`, err: err });
  },
  serverErrorDelete404: (res, type, id) => err => {
    res.status(404).json({
      message: `The ${type} with the specified ${id} does not exist.`,
      err: err
    });
  },
  serverErrorDelete500: (res, type) => err => {
    res.status(500).json({
      error: `The ${type} could not be removed.`,
      err: err
    });
  },
  serverErrorUpdate404: (res, type, id) => () => {
    res.status(404).json({
      message: `The ${type} with the specified ${id} does not exist.`,
      err: err
    });
  },
  serverErrorUpdate500: (res, type) => () => {
    res.status(500).json({
      error: `The ${type} information could not be modified.`,
      err: err
    });
  }
};
