import logo from './logo.svg';
import './App.css';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import SideBar from './components/SideBar/SideBar';
import {BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <div id="wrapper">
    
      <SideBar />
      <ContentWrapper />
    
    </div>
    </BrowserRouter>
  );
}

export default App;
