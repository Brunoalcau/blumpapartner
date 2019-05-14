import axios from 'axios';

// Locals
import { apiUrl } from '~/config';

export const profileApi = {
	async getById(id) {
		const { data } = await axios.get(`${apiUrl}/v3/professionals/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		return data;
	}
};
