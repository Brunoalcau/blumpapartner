import axios from 'axios';

// Locals
import {apiUrl} from '~/config';

export const sheduleApi = {
	async getNext(id) {
		const {data} = await axios.get(
			`${apiUrl}/v3/professionals/${id}/work_tickets/done`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	},
	async getDone(id) {
		const {data} = await axios.get(
			`${apiUrl}/v3/professionals/${id}/work_tickets/done`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	}
};
