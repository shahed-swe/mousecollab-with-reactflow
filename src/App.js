import logo from './logo.svg';
import './App.css';
import { useLiveCursors } from './hooks/livecursor';
import Cursor from './components/Cursor';
import { COLORS } from './components/Color';
import OverviewFlow from './Flow';

function App() {
  const cursors = useLiveCursors()
  return (
    <div className="App">
      <OverviewFlow/>
      {cursors.map(({ x, y, connectionId }) => (
        <Cursor
          key={connectionId}
          color={COLORS[connectionId % COLORS.length]}
          x={x}
          y={y}
        />
      ))}
    </div>
  );
}

export default App;
