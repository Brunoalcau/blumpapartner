import axios from 'axios';

// Locals
import { apiUrl } from '~/config';

export const applicationApi = {
	async getRoom() {
		const { data } = await axios(`${apiUrl}v3/chatkit/get_room`);
		return data;
	}
};
