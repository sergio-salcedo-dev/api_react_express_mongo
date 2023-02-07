const STATUS_CODE_200 = 200;
const STATUS_CODE_201 = 201;
const STATUS_CODE_422 = 422;
const STATUS_CODE_500 = 500;

const validateResponse = (response, result) => {
  if (!response || !result || !Object.keys(result).length) {
    throw new Error("Error: invalid response");
  }
};

/**
 * @param {object} response
 * @param {object} result
 */
export const handleSucceededResponse = (response, result = {}) => {
  if (!response || !result || !Object.keys(result).length) {
    throw new Error("Error: invalid response");
  }

  return response.status(STATUS_CODE_200).json(result);
};

/**
 * @param {object} response
 * @param {object} result
 */
export const handleFailedResponse = (response, result = {}) => {
  validateResponse(response, result);

  return response.status(STATUS_CODE_500).json(result);
};

/**
 * @param {object} response
 * @param {object} result
 */
export const handleUnprocessableEntityResponse = (response, result = {}) => {
  validateResponse(response, result);

  return response.status(STATUS_CODE_422).json(result);
};

/**
 * @param {object} response
 * @param {object} result
 */
export const handleCreatedResponse = (response, result = {}) => {
  validateResponse(response, result);

  return response.status(STATUS_CODE_201).json(result);
};
