const initialState = {
    elapsedTime: 0,
    tickTime: 0,
    timer: 0,
    started: false,
    paused: false
}

function clockReducer(state = initialState, action) {
    switch (action.type) {
        case 'CLOCK_TICK':
            let tickTime = new Date();
            let elapsedTime = state.elapsedTime + (tickTime - state.tickTime);
            return {
                ...state, elapsedTime: elapsedTime, tickTime: tickTime
            };
        case 'CLOCK_START':
            const startTimer = setInterval(action.callback, action.timeout);
            return {
                ...state, elapsedTime: 0, tickTime: new Date(), started: true, paused: false, timer: startTimer
            };
        case 'CLOCK_PAUSE':
            if (state.timer) {
                clearInterval(state.timer);
            }
            return {
                ...state, paused: true, timer: 0
            };
        case 'CLOCK_RESUME':
            const resumeTimer = setInterval(action.callback, action.timeout);
            return {
                ...state, paused: false, tickTime: new Date(), timer: resumeTimer
            };
        case 'CLOCK_STOP':
            if (state.timer) {
                clearInterval(state.timer);
            }
            return {
                ...state, started: false, paused: false, timer: 0
            };
        case 'CLOCK_RESET':
            return {
                ...state, elapsedTime: 0
            };
        default:
            return state;
    }
}

export default clockReducer;