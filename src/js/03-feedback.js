import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveToLocalStorage = () => {
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(data));
};

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email;
    messageInput.value = message;
  }
};

const throttledSave = throttle(saveToLocalStorage, 500);

form.addEventListener('input', throttledSave);

form.addEventListener('submit', (event) => {
  console.clear()
  event.preventDefault();
  if (!emailInput.value || !messageInput.value) {
        return alert('Fill in the fields');
      }
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(data);
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset()
});
loadFromLocalStorage();
// finally