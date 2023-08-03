import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useLoaderData, useActionData } from 'react-router-dom';
import SpinnerNoNav from '../../components/ui/SpinnerNoNav';
import sleep from '../../helpers/sleep';
import UpdateAdminForm from './UpdateAdminForm';
import UpdateAdminAddrForm from './UpdateAdminAddrForm';
import UpdateTrainerForm from './UpdateTrainerForm';
import UpdateTrainerAddrForm from './UpdateTrainerAddrForm';
import UpdateMemberForm from './UpdateMemberForm';
import UpdateTrainerAddrForm from './UpdateTrainerAddrForm';

// TODO Limit the ability to edit demo users' email and pass
export default function EditAccount() {
  const auth = useContext(AuthContext);
  const [inputEmailMsg, setInputEmailMsg] = useState('');
  const [topMsg, setTopMsg] = useState('');
  const [botMsg, setBotMsg] = useState('');
  const { user } = useLoaderData();
  const actionData = useActionData();

  useEffect(() => {
    if (!actionData) {
      return;
    }
    if (actionData?.status !== 409 && actionData?.status !== 200) {
      return;
    }
    if (actionData?.status === 409) {
      setInputEmailMsg(actionData.message);
      return;
    }
    switch (actionData._action) {
      case 'updateAdminById':
        setTopMsg(`✅ ${actionData.message}`);
        sleep().then(() => setTopMsg(''));
        break;
      case 'updateAddressByAdminId':
        setBotMsg(`✅ ${actionData.message}`);
        sleep().then(() => setBotMsg(''));
        break;
      case 'updateTrainerById':
        setTopMsg(`✅ ${actionData.message}`);
        sleep().then(() => setTopMsg(''));
        break;
      case 'updateAddressByTrainerId':
        setBotMsg(`✅ ${actionData.message}`);
        sleep().then(() => setBotMsg(''));
        break;
      case 'updateMemberById':
        setTopMsg(`✅ ${actionData.message}`);
        sleep().then(() => setTopMsg(''));
        break;
      case 'updateAddressByMemberId':
        setBotMsg(`✅ ${actionData.message}`);
        sleep().then(() => setBotMsg(''));
        break;
      default:
        break;
    }

    return () => {
      setTopMsg('');
      setBotMsg('');
    };
  }, [actionData]);

  function renderSwitchUpdateUserForm(role) {
    switch (role) {
      case 'Admin':
        return (
          <UpdateAdminForm
            inputEmailMsg={inputEmailMsg}
            setInputEmailMsg={setInputEmailMsg}
            topMsg={topMsg}
            user={user}
          />
        );
      case 'Trainer':
        return (
          <UpdateTrainerForm
            inputEmailMsg={inputEmailMsg}
            setInputEmailMsg={setInputEmailMsg}
            topMsg={topMsg}
            user={user}
          />
        );
      case 'Member':
        return (
          <UpdateMemberForm
            inputEmailMsg={inputEmailMsg}
            setInputEmailMsg={setInputEmailMsg}
            topMsg={topMsg}
            user={user}
          />
        );
      default:
        return <></>;
    }
  }

  function renderSwitchUpdateUserAddrForm(role) {
    switch (role) {
      case 'Admin':
        return <UpdateAdminAddrForm botMsg={botMsg} user={user} />;
      case 'Trainer':
        return <UpdateTrainerAddrForm botMsg={botMsg} user={user} />;
      case 'Member':
        return <UpdateMemberAddrForm botMsg={botMsg} user={user} />;
      default:
        return <></>;
    }
  }

  return user ? (
    <div className='flex-grow px-4 py-6'>
      <h1 className='font-sans text-3xl text-accent'>Edit My Account</h1>
      {renderSwitchUpdateUserForm(auth.user?.role)}
      <div className='divider'></div>
      <h1 className='font-sans text-3xl text-accent'>Edit My Address</h1>
      {renderSwitchUpdateUserAddrForm(auth.user?.role)}
    </div>
  ) : (
    <SpinnerNoNav />
  );
}
