import {getDatabase, ref, set} from "firebase/database";
import { app } from "./firebase";
import './App.css';

const db = getDatabase(app);

function App() {
  //Testing for firebase connection and database 
  // const putData = () => {
  //   set(ref(db, "users/shubham"),{
  //     id: 1,
  //     name: "Shubham",
  //     age: 20,
  //   });
  // };
  return (
    <div className="App">
      <header className="App-header">
       <h1>Hey there!</h1>
        {/* <button onClick={putData}>Put data</button> */}
      </header>
    </div>
  );
}

export default App;
