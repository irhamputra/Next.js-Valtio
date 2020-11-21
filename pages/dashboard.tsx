import * as React from 'react';
import { NextPage } from 'next';
import { useProxy } from 'valtio';
import { useRouter } from 'next/router';

import { loginState } from '../store/Login';
import { LoginState } from '../models/Login';
import { START_LOADING, FINISH_LOADING } from '../utils/Loading';

const Dashboard: NextPage = () => {
  const [loading, setLoading] = React.useState({ type: FINISH_LOADING });
  const { email } = useProxy<LoginState>(loginState);
  const { replace } = useRouter();

  React.useEffect(() => {
    setLoading({ type: START_LOADING });

    if (!email) {
      replace('/').then(() => setLoading({ type: FINISH_LOADING }));
    }

    setLoading({ type: FINISH_LOADING });
  }, []);

  if (loading.type === START_LOADING) return <p>Loading...</p>;

  return (
    <>
      <h1>Dashboard page</h1>
      {email && <p>Welcome! {email} 👋</p>}
    </>
  );
};

export default Dashboard;
