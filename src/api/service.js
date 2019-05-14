import axios from 'axios';
import moment from 'moment';

// Locals
import { apiUrl } from '~/config';

export const serviceApi = {
	async next(id) {
		const request = await axios.get(
			`${apiUrl}/v3/professionals/${id}/next_work_ticket`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		const { data } = request;
		return data;
	},
	async getById(id) {
		const request = await axios.get(`${apiUrl}/v3/work_tickets/${id}`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { data } = request;
		return data;
	},
	async cancel(id) {
		const request = await axios.post(`${apiUrl}/v3/work_tickets/${id}/cancel`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { data } = request;
		return data;
	},
	async accept(id) {
		// work_tickets/14/accep
		const request = await axios.post(`${apiUrl}/v3/work_tickets/${id}/accept`, {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const { data } = request;
		return data;
	},
	async checkin(service) {
		const { data } = await axios.post(
			`${apiUrl}/v3/work_tickets/${service.work_ticket_id}/checkin`,
			service,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	},
	async going(id) {
		const { data } = await axios.post(
			`${apiUrl}/v3/work_tickets/${id}/set_on_the_way`,
			{ timestamp: moment().unix() },
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	},
	async checkout(service) {
		const { data } = await axios.post(
			`${apiUrl}/v3/work_tickets/${service.work_ticket_id}/checkout`,
			service,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
		//
	},
	async getservicesByProfessionals(id) {
		// /professionals/{professional_uuid}/work_tickets/waiting_matching
		const { data } = await axios.get(
			`${apiUrl}/v3/professionals/${id}/work_tickets/waiting_matching`,
			{
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return data;
	}
};
