const validateResponseParams = (response, result) => {
  if (!response || !result || !Object.keys(result).length) {
    throw new Error("Error: invalid response");
  }
};

/**
 * @param {object} response
 * @param {object} result
 */
export const handleSuccessfulResponse = (response, result = {}) => {
  if (!response || !result || !Object.keys(result).length) {
    throw new Error("Error: invalid response");
  }

  return response.status(200).json(result);
};

/**
 * @param {object} response
 * @param {object} result
 */
export const handleFailedResponse = (response, result = {}) => {
  validateResponseParams(response, result);

  return response.status(500).json(result);
};
