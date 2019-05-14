import axios from 'axios';
import moment from 'moment';

// Locals
import { apiUrl } from '~/config';

export const paymentApi = {
	async getById(id, start_date, end_date) {
		const { data } = await axios.get(
			`${apiUrl}/v3/professionals/${id}/transfers?start_date=${start_date}&end_date=${end_date}`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	}
};
