import '../../node_modules/react-vis/dist/style.css';
import { useSelector } from 'react-redux';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineMarkSeries } from 'react-vis';

function PowerChart() {
    let data = useSelector((state) => state.game.data);

    return (
        <>
            {data.length > 1 ? (
                <XYPlot width={300} height={300}>
                    <HorizontalGridLines />
                    <LineMarkSeries
                        data={data.slice(0, data.length - 1).map((d) => ({ x: d.round, y: Math.floor(d.elapsedTime / 1000) }))}
                    />
                    <XAxis />
                    <YAxis />
                </XYPlot>
            ) : null}
        </>
    );
}

export default PowerChart;
