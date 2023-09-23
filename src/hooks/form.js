import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();
    callback(values); 
  };

  const handleChange = (event) => {
    event.persist();

    let { name, value } = event.target;
    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
