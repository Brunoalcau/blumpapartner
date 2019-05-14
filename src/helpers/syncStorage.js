import SyncStorage from 'sync-storage';

const storage = {
	get: async key => {
		const object = await SyncStorage.get(key);
		return object;
	},
	set: (key, data) => {
		SyncStorage.set(key, data);
	}
};

export default storage;
