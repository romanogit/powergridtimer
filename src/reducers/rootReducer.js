import { combineReducers } from 'redux';
import clockReducer from './clock';
import gameReducer from './game';

const rootReducer = combineReducers({
    clock: clockReducer,
    game: gameReducer
});

export default rootReducer;