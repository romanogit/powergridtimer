const PHASES = ['auctionPhase', 'buildPhase', 'resourcePhase', 'burocracyPhase', 'interleave'];

const initialState = {
    round: 0,
    currentStage: 1,
    currentPhase: 0,
    tickTime: [],
    data: []
};

function gameReducer(state = initialState, action) {
    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function formatElapsed(time) {
        time = (time - (time % 1000)) / 1000;
        let seconds = time % 60;
        time = (time - seconds) / 60;
        let minutes = time % 60;
        return `${pad(minutes)}:${pad(seconds)}`;
    }

    function createNewEntry(round, stage) {
        return {
            round: round,
            stage: stage,
            auctionPhase: '00:00',
            auctionPhaseTick: 0,
            buildPhase: '00:00',
            buildPhaseTick: 0,
            resourcePhase: '00:00',
            resourcePhaseTick: 0,
            burocracyPhase: '00:00',
            burocracyPhaseTick: 0,
            interleave: '00:00',
            interleaveTick: 0,
            total: '00:00',
            elapsedTime: 0,
        };
    }

    function updateTime(state) {
        let tickTime = new Date();
        let diff = tickTime - state.tickTime;

        let phase = PHASES[state.currentPhase];
        let idx = state.round - 1;
        let row = {
            ...state.data[idx]
        };

        row.elapsedTime = row.elapsedTime + diff;
        row[phase + 'Tick'] = row[phase + 'Tick'] + diff;

        row[phase] = formatElapsed(row[phase + 'Tick']);
        row.total = formatElapsed(row.elapsedTime);

        return {
            ...state,
            data: state.data.slice(0, idx).concat(row).concat(state.data.slice(idx + 1)),
            tickTime: tickTime
        };
    }

    switch (action.type) {
        case 'CLOCK_TICK':
            return (state.round === 0) ? state : updateTime(state);
        case 'CLOCK_START':
        case 'CLOCK_RESUME':
            return {
                ...state, tickTime: new Date()
            };
        case 'GAME_NEW_ROUND':
            let round = state.round + 1;
            return {
                ...state, tickTime: new Date(), round: round,
                    currentPhase: 0, data: state.data.concat(createNewEntry(round, state.currentStage))
            };
        case 'GAME_NEXT_PHASE':
            return {
                ...state, tickTime: new Date(),
                    currentPhase: state.currentPhase === PHASES.length - 1 ? state.currentPhase : state.currentPhase + 1
            };
        case 'GAME_NEXT_STAGE':
            return {
                ...state, currentStage: state.currentStage === 3 ? 3 : state.currentStage + 1
            };
        default:
            return state;
    }
}

export default gameReducer;