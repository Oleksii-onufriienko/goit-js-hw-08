import throttle from 'lodash.throttle';

let currentFields = {
  email: '',
  message: '',
};

const refEmailInput = document.querySelector(
  '.feedback-form input[type=email]'
);
const refMessageInput = document.querySelector(
  '.feedback-form textarea[name=message]'
);
const refForm = document.querySelector('.feedback-form');

const currentFieldsFromStorage = localStorage.getItem('feedback-form-state');

if (currentFieldsFromStorage) {
  currentFields = JSON.parse(currentFieldsFromStorage);
}

initialFormData(currentFields);

refForm.addEventListener(
  'input',
  throttle(event => {
    currentFields[event.target.name] = event.target.value;
    localStorage.setItem('feedback-form-state', JSON.stringify(currentFields));
  }, 500)
);

refForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log(currentFields);
  localStorage.removeItem('feedback-form-state');
  initialFormData({ email: '', message: '' });
});

function initialFormData(objData) {
  refEmailInput.value = objData.email;
  refMessageInput.value = objData.message;
}
