import * as React from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';

import { loginState } from '../store/Login';
import { START_LOADING, FINISH_LOADING } from '../utils/Loading';

const Form = () => {
  const [loading, setLoading] = React.useState({ type: FINISH_LOADING });
  const { replace } = useRouter();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ password, email }) => {
      setLoading({ type: START_LOADING });

      loginState.email = email;
      loginState.password = password;

      setTimeout(async () => {
        await replace('/dashboard', undefined, { shallow: true });
        setLoading({ type: FINISH_LOADING });
      }, 1500);
    },
  });

  if (loading.type === START_LOADING) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email
            <input id="email" name="email" type="email" onChange={handleChange} value={values.email} />
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input id="password" name="password" type="password" onChange={handleChange} value={values.password} />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
