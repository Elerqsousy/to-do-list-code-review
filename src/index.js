import './style.css';
import './modules/dependencies.js';
import toDoList from './modules/data.js';
import { undoneIcon, doneEffect } from './modules/icons.js';

const insertPoint = document.querySelector('.to-do-container');

const populateStorageList = () => {
  const stringList = JSON.stringify(toDoList.list);
  localStorage.setItem('list', stringList);
};

const spitStorageList = () => {
  const parsedList = JSON.parse(localStorage.getItem('list'));

  for (let i = 0; i < parsedList.length; i += 1) {
    const text = parsedList[i].description;
    const trueFalse = parsedList[i].completed;
    toDoList.add(text, trueFalse);
  }
};

const insertlist = () => {
  const listeners = () => {
    const input = document.querySelectorAll('input');
    input.forEach((e) => {
      e.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          if (event.target.classList.contains('item')) {
            const text = event.target.value;
            const index = e.parentElement.parentElement.id;
            toDoList.edit(text, index);
            populateStorageList();
            insertlist();
          }
        }
      });
      e.addEventListener('focus', (event) => {
        if (event.target.classList.contains('item')) {
          event.target.parentElement.parentElement.classList.add('marked');
          const turnIconDelete = event.target.parentElement.nextElementSibling;
          turnIconDelete.nextElementSibling.classList.remove('hidden');
          turnIconDelete.classList.add('hidden');
        }
      });

      e.addEventListener('focusout', (event) => {
        if (event.target.classList.contains('item')) {
          event.target.parentElement.parentElement.classList.remove('marked');
          const turnIcondots = event.target.parentElement.nextElementSibling;
          const promise = new Promise((resolve) => {
            setTimeout(() => resolve('done'), 100);
          });
          promise.then(() => {
            turnIcondots.classList.remove('hidden');
            turnIcondots.nextElementSibling.classList.add('hidden');
          });
        }
      });
    });

    const trashIcon = document.querySelectorAll('.trash');
    trashIcon.forEach((e) => {
      e.addEventListener('click', () => {
        const parentID = e.parentElement.id;
        toDoList.pop(parseInt(parentID, 10));
        populateStorageList();
        insertlist();
      });
    });

    const checkBtn = document.querySelectorAll('.check');
    checkBtn.forEach((btn) => btn.addEventListener('click', () => {
      const parentID = btn.parentElement.parentElement.id;
      toDoList.tog(parentID);
      populateStorageList();

      insertlist();
    }));
  };

  const updateContent = () => {
    insertPoint.innerHTML = '';

    toDoList.list.forEach((e) => {
      const icon = () => {
        if (e.completed) {
          return doneEffect.icon;
        }
        return undoneIcon;
      };
      const linethrough = () => {
        if (e.completed) {
          return doneEffect.linethrough;
        }
        return null;
      };
      const listItem = `<li
    class="padding-l focus to-do-item display-flex-row height-50 border-bottom" id="${
  e.index
}"
  >
    <div class="width-height display-flex-row width-80" >
      <button type="button" class="check" >
        <i class="${icon()}"></i>
      </button>
      <input
        class="item display-flex-row width-height ${linethrough()}"
        type="text"
        value="${e.description}"
      />
    </div>
    <button type="button" class="to-do-button-move dots">
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </button>
    <button type="button" class="to-do-button-move trash hidden">
      <i class="fa fa-trash"></i>
    </button>
  </li>`;
      insertPoint.innerHTML += listItem;
    });
  };

  updateContent();

  listeners();
};

const staticListeners = () => {
  const input = document.querySelectorAll('input');
  const inputField = document.querySelector('.input');
  const submitBtn = document.querySelector('.submit');
  const clearAllBtn = document.querySelector('.clear-button');

  submitBtn.addEventListener('click', () => {
    const text = inputField.value;
    toDoList.add(text, false);
    inputField.value = '';
    populateStorageList();
    insertlist();
  });

  input.forEach((e) => {
    e.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        if (event.target.classList.contains('input')) {
          const text = event.target.value;
          toDoList.add(text, false);
          event.target.value = '';
          populateStorageList();
          insertlist();
        }
        event.target.parentElement.classList.remove('marked');
      }
    });

    e.addEventListener('focus', (event) => {
      if (!event.target.classList.contains('item')) {
        event.target.parentElement.classList.add('marked');
      }
    });

    e.addEventListener('focusout', (event) => {
      if (!event.target.classList.contains('item')) {
        event.target.parentElement.classList.remove('marked');
      }
    });
  });

  clearAllBtn.addEventListener('click', () => {
    toDoList.clear();
    populateStorageList();
    insertlist();
  });
};

staticListeners();

if (localStorage.getItem('list')) {
  spitStorageList();
  insertlist();
}
