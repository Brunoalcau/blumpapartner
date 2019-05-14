import axios from 'axios';

// Locals
import {apiUrl} from '~/config';
import {removeNotNumbers} from '~/helpers';

export const authenticationApi = {
	async signin({login, password}) {
		const {data} = await axios.post(
			`${apiUrl}/v3/authentication/get_token`,
			{
				token_params: {
					username: `55${removeNotNumbers(login)}`,
					password: password,
					access_type: 'professional'
				}
			},
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	}
};
