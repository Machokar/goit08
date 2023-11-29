import throttle from 'lodash.throttle';
const { form, email, message } = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};
const FEEDBACK_KEY = 'feedback-form-state';
const storageObject = {};
form.addEventListener('input', throttle(onInputEmail, 500));
form.addEventListener('submit', onSubmitMessage);
function onSubmitMessage(form) {
  form.preventDefault();
  if (!storageObject.email || !storageObject.message) {
    return alert('Заполни поля');
  }
  form.currentTarget.reset();
  localStorage.removeItem(FEEDBACK_KEY);
  console.log(storageObject);
}

function onInputEmail(form) {
  storageObject[form.target.name] = form.target.value.trim();
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(storageObject));
}
function saveMessage(form) {
  const messageToDom = localStorage.getItem(FEEDBACK_KEY);
  const parsedMessage = JSON.parse(messageToDom);
  if (parsedMessage) {
    if (parsedMessage.email) {
      email.value = parsedMessage.email;
      storageObject.email = parsedMessage.email;
    }
    if (parsedMessage.message) {
      message.value = parsedMessage.message;
      storageObject.message = parsedMessage.message;
    }
  }
}
saveMessage();