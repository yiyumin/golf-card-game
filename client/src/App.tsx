import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import { SocketProvider } from './contexts/SocketProvider';

import Wrapper from './components/Wrapper';
import Home from './components/Home';
import Game from './components/Game';

const App = () => (
  <SocketProvider>
    <Router>
      <Wrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path=':gameId' element={<Game />} />
        </Routes>
      </Wrapper>
    </Router>
  </SocketProvider>
);

export default App;
