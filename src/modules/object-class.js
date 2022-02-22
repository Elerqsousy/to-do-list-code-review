export default class ListItem {
  constructor(description, completed) {
    this.firstInput = description;
    this.secondInput = completed;
    this.object = {
      description: `${this.firstInput}`,
      completed: this.secondInput,
      index: 0,
    };
  }
}
