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
  serverErrorDelete404: (res, type, id) => () => {
    res.status(404).json({
      message: `The ${type} with the specified ${id} does not exist.`
    });
  },
  serverErrorDelete500: (res, type) => () => {
    res.status(500).json({
      error: `The ${type} could not be removed.`
    });
  },
  serverErrorUpdate404: (res, type, id) => () => {
    res.status(404).json({
      message: `The ${type} with the specified ${id} does not exist.`
    });
  },
  serverErrorUpdate500: (res, type) => () => {
    res.status(500).json({
      error: `The ${type} information could not be modified.`
    });
  }
};
