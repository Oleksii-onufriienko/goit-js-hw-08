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

refForm.addEventListener('submit', handleSubmit);

function initialFormData(objData) {
  for (let key in objData) {
    if (objData[key] && refForm[key]) {
      refForm[key].value = objData[key];
    }
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;

  if (email.value === '' || message.value === '') {
    return console.log('Please fill in all the fields!');
  }

  console.log(`Email: ${email.value} \nMessage: ${message.value}`);
  event.currentTarget.reset();
  localStorage.removeItem(KEY_FEEDBACK_FORM);
}
