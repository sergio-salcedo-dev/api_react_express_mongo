export default class GoalStructure {
  /** @param {object} params */
  constructor(params = {}) {
    /**@type {?string} */
    this.id = params.id ?? null;

    /**@type {?string} */
    this.text = params.text ?? null;

    /**@type {boolean} */
    this.isCompleted = params.isCompleted ?? false;
  }
}
