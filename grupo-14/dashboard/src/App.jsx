import logo from './logo.svg';
import './App.css';
import lastProduct from './components/LastProduct/LastProduct';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <div id="wrapper">
      <SideBar />
      <ContentWrapper />
    </div>
  );
}

export default App;
