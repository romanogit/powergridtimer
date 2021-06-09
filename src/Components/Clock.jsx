import { useSelector } from 'react-redux';

function Clock() {
    function pad(number) {
        return number.toString().padStart(2, '0');
    }

    function formatElapsed(time) {
        time = (time - (time % 1000)) / 1000;
        let seconds = time % 60;
        time = (time - seconds) / 60;
        let minutes = time % 60;
        let hours = (time - minutes) / 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    const clock = useSelector((state) => state.clock);

    return (
        <>
            <h2>Time: {formatElapsed(clock.elapsedTime)}</h2>
        </>
    );
}

export default Clock;
