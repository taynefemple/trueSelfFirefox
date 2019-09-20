let oldName;
let newName;
let submit;
let background;
let settings;
let close;

const refresh = () => browser.tabs.reload();

const updateHandler = () => {
  settings = {
    oldName: oldName.value,
    newName: newName.value,
    enabled: submit.checked
  };
  background.settings.oldName = settings.oldName;
  background.settings.newName = settings.newName;
  background.settings.enabled = settings.enabled;
  browser.storage.local.set(settings);
};

const showIcon = (bool) => {
  if (bool) {
    browser.browserAction.setIcon({
      path: {
        16: 'images/flagSmall.png',
        48: 'images/flagMedium.png',
        128: 'images/flagLarge.png'
      }
    });
  } else {
    browser.browserAction.setIcon({
      path: {
        128: 'images/disabledIcon.png'
      }
    });
  }
};

const onInputHandler = (bool) => {
  if (!bool) {
    oldName.value = '';
    newName.value = '';
  }

  if (!oldName.value || !newName.value) {
    submit.checked = false;
  } else {
    submit.checked = true;
  }
  showIcon(submit.checked);
  updateHandler();
};

const loadHandler = () => {
  oldName = document.querySelector('.old-name');
  newName = document.querySelector('.new-name');
  submit = document.querySelector('.submit');
  close = document.querySelector('.close');

  background = browser.extension.getBackgroundPage();

  newName.addEventListener('keyup', () => onInputHandler(true), false);
  newName.value = background.settings.newName;

  oldName.addEventListener('keyup', () => onInputHandler(true), false);
  oldName.value = background.settings.oldName;

  submit.addEventListener('click', () => {
    onInputHandler(!!submit.checked);
    refresh();
  });
  submit.checked = oldName.value && newName.value;
  showIcon(submit.checked);

  const closeAndApplyChanges = () => {
    refresh();
    window.close();
  }

  close.addEventListener('click', () => {
    closeAndApplyChanges();
  })

  document.addEventListener('keydown', (evt) => {
    if (evt.code === 'Enter') {
      closeAndApplyChanges();
    }
  })
}

// init
document.addEventListener('DOMContentLoaded', loadHandler);
