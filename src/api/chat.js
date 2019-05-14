import axios from 'axios';

// Locals
import { apiUrl } from '~/config';

export const chatApi = {
	async create(id) {
		const { data } = await axios.post(`${apiUrl}v3/chatkit/create_room`, {
			service_id: id
		});
		console.log(data);
		return data;
	}
};
