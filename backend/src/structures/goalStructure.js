export default class GoalStructure {
  /** @param {object} params */
  constructor(params = {}) {
    /**@type {string} */
    this.id = params.id;

    /**@type {string} */
    this.text = params.text;

    /**@type {boolean} */
    this.isCompleted = params.isCompleted;
  }
}
