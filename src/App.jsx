import Clock from './Components/Clock.jsx';
import ClockButtonGroup from './Components/ClockButtonGroup.jsx';
import PowerGrid from './Components/PowerGrid.jsx';
import PowerChart from './Components/PowerChart.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Clock />
        <ClockButtonGroup hideReset='true' />
        <PowerGrid />
        <PowerChart />
      </header>
    </div>
  );
}

export default App;
