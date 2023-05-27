import { createRoot } from 'react-dom';

const App = function () {
  return <h1>Hello World</h1>;
};

const root = createRoot(document.getElementById('root'));

root.render(<App />);
