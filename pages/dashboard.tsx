import * as React from 'react';
import { NextPage } from 'next';
import { useProxy, subscribe } from 'valtio';
import { useRouter } from 'next/router';

import { loginState } from '../store/Login';
import { LoginState } from '../models/Login';
import { START_LOADING, FINISH_LOADING } from '../utils/Loading';

const Dashboard: NextPage = () => {
  const [loading, setLoading] = React.useState({ type: FINISH_LOADING });
  const { email } = useProxy<LoginState>(loginState);
  const { replace } = useRouter();
  // snap is actual object of the state
  // const snap = React.useMemo(() => snapshot(loginState), [loginState]);

  React.useEffect(() => {
    setLoading({ type: START_LOADING });

    if (!email) {
      replace('/').then(() => setLoading({ type: FINISH_LOADING }));
    }

    setLoading({ type: FINISH_LOADING });
  }, []);

  React.useEffect(() => {
    const unsubscribe = subscribe(loginState, () => console.log({ loginState }));

    // unsubscribe to clean up useEffect
    return unsubscribe();
  }, []);

  if (loading.type === START_LOADING) return <p>Loading...</p>;

  const onLogout = () => {
    setLoading({ type: START_LOADING });
    loginState.email = '';
    loginState.password = '';

    setTimeout(async () => {
      await replace('/', undefined, { shallow: true });
      setLoading({ type: FINISH_LOADING });
    }, 1200);
  };

  return (
    <>
      <h1>Dashboard</h1>
      {email && <p>Welcome! {email} 👋</p>}

      <button onClick={onLogout} type="button">
        Logout
      </button>
    </>
  );
};

export default Dashboard;
