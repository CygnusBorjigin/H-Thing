import React, { useState } from 'react';
import NormalButton from '../../../buttonSection/NormalButton';
import DangerButton from '../../../buttonSection/DangerButton';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';
import DeleteUser from './DeleteUser';

const UserInfoAction = () => {
	const [changeEmail, setChangeEmail] = useState(false);
	const [changePassword, setChangePassword] = useState(false);
	const [deleteUser, setDeleteUser] = useState(false);

	const showChangeEmail = () => {
		setChangeEmail(true);
		setChangePassword(false);
		setDeleteUser(false);
	};
	const showChangePassword = () => {
		setChangeEmail(false);
		setChangePassword(true);
		setDeleteUser(false);
	};
	const showDeleteUser = () => {
		setChangeEmail(false);
		setChangePassword(false);
		setDeleteUser(true);
	};
	return(
		<div>
			<div className="grid grid-cols-3 justify-items-center">
				<NormalButton text={"change email"} func={showChangeEmail} />
				<NormalButton text={"change password"} func={showChangePassword}/>
				<DangerButton text={"Delete Account"} func={showDeleteUser}/>
			</div>
			<div>
				{changeEmail && <ChangeEmail />}
				{changePassword && <ChangePassword />}
				{deleteUser && <DeleteUser />}
			</div>
		</div>
	);
};

export default UserInfoAction;


