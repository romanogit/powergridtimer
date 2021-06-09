import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';

const columns = [
    { field: 'id', headerName: 'Round', type: 'number', width: 120 },
    { field: 'stage', headerName: 'Stage', type: 'number', width: 120 },
    { field: 'auctionPhase', headerName: 'Auction', width: 150 },
    { field: 'buildPhase', headerName: 'Build', width: 150 },
    { field: 'resourcePhase', headerName: 'Resources', width: 150 },
    { field: 'burocracyPhase', headerName: 'Burocracy', width: 150 },
    { field: 'interleave', headerName: 'Interleave', width: 150 },
    { field: 'total', headerName: 'Total', width: 150 },
];

function PowerGrid() {
    let game = useSelector((state) => state.game);
    let clock = useSelector((state) => state.clock);

    let dispatch = useDispatch();

    function newRound() {
        dispatch({
            type: 'GAME_NEW_ROUND',
        });
    }

    function nextPhase() {
        dispatch({
            type: 'GAME_NEXT_PHASE',
        });
    }

    function nextStage() {
        dispatch({
            type: 'GAME_NEXT_STAGE',
        });
    }

    return (
        <>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={game.data.map((d) => ({ ...d, id: d.round }))} columns={columns} pageSize={50} />
            </div>
            <ButtonGroup variant="outlined">
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => nextPhase()}
                    disabled={!clock.started || clock.paused || game.data.length === 0 || game.currentPhase === 4}
                    color="primary"
                >
                    Next Phase
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => newRound()}
                    disabled={!clock.started || clock.paused || (game.data.length > 0 && game.currentPhase !== 4)}
                    color="primary"
                >
                    New Round
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={() => nextStage()}
                    disabled={!clock.started || clock.paused || game.data.length === 0 || game.currentPhase === 0}
                    color="primary"
                >
                    Next Stage
                </Button>
            </ButtonGroup>
        </>
    );
}

export default PowerGrid;
