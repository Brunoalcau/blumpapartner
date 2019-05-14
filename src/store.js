import { init } from '@rematch/core';
import { AsyncStorage } from 'react-native';
import { createLogicMiddleware } from 'redux-logic';
import rematchLogicPlugin from 'rematch-logic';
import { combineReducers } from 'redux-seamless-immutable';
import createRematchPersist from '@rematch/persist';
import { registerOneSignal } from '~/config';
// Locals
import * as models from './models';

const logicMiddleware = createLogicMiddleware([], {});

const persistPlugin = createRematchPersist({
	throttle: 5000,
	version: 1,
	whitelist: ['authentication']
});

// console.log('models', models);
const store = init({
	models,
	plugins: [rematchLogicPlugin(logicMiddleware), persistPlugin],
	redux: {
		middlewares: [logicMiddleware]
	}
});
store.subscribe(async () => {
	registerOneSignal(store.getState().application.user);
});
export default store;
