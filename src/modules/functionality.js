import ListItem from './object-class.js';

export default class Data {
  constructor() {
    this.list = [];
    this.count = 0;
  }

  add(item, finished) {
    const newObject = new ListItem(item, finished);
    newObject.object.index = this.count + 1;
    const newList = [...this.list, newObject.object];
    this.list = newList;
    this.count += 1;
  }

  pop(index) {
    if (this.count !== 0) {
      const newList = this.list.filter((e) => e.index !== index);
      newList.forEach((e) => {
        e.index = newList.indexOf(e) + 1;
      });
      this.list = newList;
      this.count -= 1;
    }
  }

  edit(text, index) {
    this.list.forEach((e) => {
      if (e.index === parseInt(index, 10)) {
        e.description = text;
      }
    });
  }

  tog(index) {
    this.list.forEach((e) => {
      if (e.index === parseInt(index, 10)) {
        if (e.completed === true) {
          e.completed = false;
        } else {
          e.completed = true;
        }
      }
    });
  }

  clear() {
    const newList = this.list.filter((e) => e.completed !== true);
    newList.forEach((e) => {
      e.index = newList.indexOf(e) + 1;
    });
    this.list = newList;
    this.count = this.list.length;
  }
}
