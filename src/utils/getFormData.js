// Use case: Submit (React Router's `useSubmit()`) a `FormData` obj to the route action, in which case, conversion from
//  plain obj (`data` obj returned by React Hook Form's `handleSubmit`) to `FormData` obj is needed
export default function getFormData(object) {
  return Object.keys(object).reduce((formData, key) => {
    // NB B/c of how zodResolver (most likely the culprit) works, empty input field shows up as null in the form data
    //  collected by React Hook Form, thus this conversion to emulate the real behavior of `FormData` where most inputs
    //  are converted to string (i.e., falsy value converted to empty string)
    object[key] ||= '';
    formData.append(key, object[key]);
    return formData;
  }, new FormData());
}

// References:
// -- https://stackoverflow.com/questions/22783108/convert-js-object-to-form-data
