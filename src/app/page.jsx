import './globals.css';
import Home from './pages/index'
import Title from './components/Title';
import Input from './components/Input';
import Ul from './components/Ul';







export default function Page() {

    return (
      <div className="todo-container">
       <Title />
       <Input />
       <Ul />
      </div>
      // <Home />
    )
  }