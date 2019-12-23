import TodoAllButton from '../TodoComponents/TodoAllButton.js';
import TodoAllDoneButton from '../TodoComponents/TodoAllDoneButton.js';
import TodoAllUndoneButton from '../TodoComponents/TodoAllUndoneButton';

export default class WrapperFilterButtons {
  constructor (anchor) {
    this.anchor = anchor;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('filter_buttons');
    const allButton = new TodoAllButton(wrapper);
    const allDoneButton = new TodoAllDoneButton(wrapper);
    const allUndoneButton = new TodoAllUndoneButton(wrapper);
    allButton.render(wrapper);
    allDoneButton.render(wrapper);
    allUndoneButton.render(wrapper);

    this.anchor.append(wrapper);
  }
}