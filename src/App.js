
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDo from './ToDo/ToDo';
import { Container } from 'react-bootstrap';
import backgroundImage from "./b.png";
function App() {
      return (
        <section className="hero">
          <ToDo />
        </section>
      );
}

export default App;
