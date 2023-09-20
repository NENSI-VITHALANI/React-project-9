import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RECORD, DELETE_RECORD, EDIT_RECORD, UPDATE_RECORD } from './action/action';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();
  const record = useSelector(state => state.crud.users);
  const single = useSelector(state => state.crud.user)
  const [alldata,setAllData] = useState(record)
  const [edit, setEdit] = useState("");
  const [input,setInput] = useState({
    name : '',
    phone : ''
})

const handleChange =(e)=>{
  const {name,value} = e.target;
  setInput({
      ...input,[name] : value
  })
}

const handleSubmit = () => {

    if(edit){
      let obj = {
        id : edit,
        name : input.name,
        phone : input.phone
      }
      dispatch(UPDATE_RECORD(obj));
      alert("Record successfully Edit");
      setEdit("");
    }else{
      let obj = {
        id : Math.floor(Math.random() * 100000),
        name : input.name,
        phone : input.phone
      }
      dispatch(ADD_RECORD(obj));
      alert("Record successfully insert");
    }  
    setInput({
      name: '',
      phone : ''
    })
  }
  useEffect(() => {
    setInput({
      name : single.name,
      phone : single.phone
   })
   setEdit(single.id)
  },[single]);

return (
    <body>
      <center>
        <h1>Crud App</h1>
        <table className='border'>
          <tbody>
            <tr>
              <td>Name  </td>
              <td>
                <input type='text' name="name" onChange={handleChange}value={input.name} />
              </td>
            </tr>
            <tr>
              <td>Phone  </td>
              <td>
                <input type='text' name="phone" onChange={handleChange} value={input.phone}/>
              </td>
            </tr>
            <tr>
              <td></td>

              {
                <td>
                  {
                    edit ? (<button type='button' className='btn btn-secondary' onClick={() => handleSubmit()}>Edit</button>) 
                     : (<button type='button'className='btn btn-secondary' onClick={() => handleSubmit()}>Submit</button>)
                  }

                </td>
              }

            </tr>
          </tbody>
        </table><br></br>


        <table border={1}>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Phone</td>
              <td>Action</td>
       
            </tr>
          </thead>
          <tbody>

            {
              record.map((val) => {
                const { id, name, phone } = val;
                return (
                  <tr>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{phone}</td>
                    <td>
                      <button className='btn btn-danger' onClick={() => dispatch(DELETE_RECORD(id))}>Delete</button> 
                      &nbsp;  &nbsp;||  &nbsp;  &nbsp;
                    <button className='btn btn-primary' onClick={() => dispatch(EDIT_RECORD(id))}>Edit</button>
                    </td>
                  
                  </tr>
                )
              })
            }

          </tbody>
        </table>


      </center>

    </body>
  );
}
export default App;
