import Face from './face.tsx'
import DataGridDemo from './table.tsx'

function App() {

  return (
    <div className="App">
      {/* <Face/> */}
      {/* <hr style={{width: "100vw" }} /> */}
      <div id='Face' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> 
        <DataGridDemo/>
      </div>
    </div>
  );
}

export default App;
