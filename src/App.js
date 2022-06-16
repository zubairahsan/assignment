import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [limitStart,setLimitStart] = useState(0);
  const [limitEnd,setLimitEnd] = useState(20)
  const url = "https://jsonplaceholder.typicode.com/todos";

  const getData = () => {
    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const timer = () => {
      setCount(count + 1);
    };

    // if you want it to finish at some point
    if (count === 10) {
      return getData();
    }
    const interval = setInterval(timer, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="container mt-5">
      <button
        className={`btn btn-${
          count % 2 === 1 ? "primary" : "danger"
        } py-3 px-5`}
      >
        {count}
      </button>

        {
          data.length === 0 ?null :
          <div className="container p-5 mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Completed</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.slice(limitStart,limitEnd).map((item) => {
                let {id,title,completed} = item;
                
                return  ( <tr key={id}>
                    <th scope="row">{id}</th>
                    <td>{title}</td>
                    <td>{completed ? 'Yes' : 'NO'}</td>
                   
                  </tr>);
                })
              : null}
          </tbody>
        </table>
       
       <div className="d-flex justify-content-between">
       <button onClick={()=>{
      
          setLimitEnd(limitEnd + 10)
        }} className="btn btn-dark ">Load More</button>

         <button onClick={()=>{
           {limitEnd <= 20 ? setLimitEnd(20) :  setLimitEnd(limitEnd - 10)}
          
        }} className="btn btn-dark ">Show Less</button>
       </div>
      </div>
        }

     
    </div>
  );
};

export default App;
