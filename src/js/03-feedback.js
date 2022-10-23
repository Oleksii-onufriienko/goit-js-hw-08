import throttle from 'lodash.throttle';

let currentFields = {
  email: '',
  message: '',
};

const KEY_FEEDBACK_FORM = 'feedback-form-state';

const refForm = document.querySelector('.feedback-form');

const currentFieldsFromStorage = localStorage.getItem(KEY_FEEDBACK_FORM);

if (currentFieldsFromStorage) {
  try {
    currentFields = JSON.parse(currentFieldsFromStorage);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

initialFormData(currentFields);

refForm.addEventListener(
  'input',
  throttle(event => {
    currentFields[event.target.name] = event.target.value;
    localStorage.setItem(KEY_FEEDBACK_FORM, JSON.stringify(currentFields));
  }, 500)
);

refForm.addEventListener('submit', event => {
  event.preventDefault();
  console.log(
    `Emai: ${refForm.email.value} \nMessage: ${refForm.message.value}`
  );
  localStorage.removeItem(KEY_FEEDBACK_FORM);
  initialFormData({ email: '', message: '' });
});

function initialFormData(objData) {
  refForm.email.value = objData.email;
  refForm.message.value = objData.message;
}
