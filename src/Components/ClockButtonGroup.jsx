import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AlarmOn from '@material-ui/icons/AlarmOn';
import AlarmAdd from '@material-ui/icons/AlarmAdd';
import Snooze from '@material-ui/icons/Snooze';
import Alarm from '@material-ui/icons/Alarm';
import AlarmOff from '@material-ui/icons/AlarmOff';

function ClockButtonGroup(props) {
    const clock = useSelector((state) => state.clock);
    const dispatch = useDispatch();

    function tick() {
        dispatch({
            type: 'CLOCK_TICK',
        });
    }

    function startClock() {
        dispatch({
            type: 'CLOCK_START',
            timeout: 1000,
            callback: tick,
        });

        if (props.onStartClock) {
            props.onStartClock();
        }
    }

    function pauseClock() {
        dispatch({ type: 'CLOCK_PAUSE' });

        if (props.onPauseClock) {
            props.onPauseClock();
        }
    }

    function resumeClock() {
        dispatch({
            type: 'CLOCK_RESUME',
            timeout: 1000,
            callback: tick,
        });

        if (props.onResumeClock) {
            props.onResumeClock();
        }
    }

    function stopClock() {
        dispatch({ type: 'CLOCK_STOP' });
        if (props.onStopClock) {
            props.onStopClock();
        }
    }

    return (
        <>
            <ButtonGroup>
                <Button
                    startIcon={<Alarm />}
                    size="small"
                    disabled={clock.started}
                    onClick={() => startClock()}
                    variant="contained"
                    color="primary"
                >
                    Start
                </Button>

                {!props.hidePauseResume ? (
                    <Button
                        startIcon={<Snooze />}
                        size="small"
                        disabled={props.basicOnly || !clock.started || clock.paused}
                        onClick={() => pauseClock()}
                        variant="contained"
                        color="secondary"
                    >
                        Pause
                    </Button>
                ) : null}

                {!props.hidePauseResume ? (
                    <Button
                        startIcon={<AlarmOn />}
                        size="small"
                        disabled={!clock.started || !clock.paused}
                        onClick={() => resumeClock()}
                        variant="contained"
                        color="primary"
                    >
                        Resume
                    </Button>
                ) : null}

                {!props.hideReset ? (
                    <Button
                        startIcon={<AlarmAdd />}
                        size="small"
                        onClick={() => dispatch({ type: 'CLOCK_RESET' })}
                        disabled={props.basicOnly}
                        variant="contained"
                        color="secondary"
                    >
                        Reset
                    </Button>
                ) : null}

                <Button
                    startIcon={<AlarmOff />}
                    size="small"
                    disabled={!clock.started}
                    onClick={() => stopClock()}
                    variant="contained"
                    color="secondary"
                >
                    Stop
                </Button>
            </ButtonGroup>
        </>
    );
}

export default ClockButtonGroup;
