const sendResponse = (res, status: number,success: boolean, data) => {
  res.status(status).send({
    status,
    success,
   ...data,
  });
};

export default sendResponse;
