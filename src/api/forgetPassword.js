import axios from 'axios';

// Locals
import { apiUrl } from '~/config';
import { removeNotNumbers } from '~/helpers';

export const forgetPasswordApi = {
	async resetCode(login) {
		const url = `${apiUrl}v3/authentication/send_recovery_code/`;
		const { data } = await axios.post(
			url,
			{ login: `55${removeNotNumbers(login)}` },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	},
	async resetPassword(user) {
		const { data } = await axios.put(
			`${apiUrl}/v3/authentication/password`,
			user,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	}
};
