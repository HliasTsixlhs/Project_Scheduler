import { useParams, useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
// import useFetch from "../../customHooks/useFetch";


const EmployeeUpdate = () => {
        
    const { id } = useParams();
    
    const [employee, setEmployee] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);   
    const history = useHistory();    

    useEffect( () => {
        const abortCont = new AbortController();
    
        fetch('http://localhost:8000/employees/' + id, {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            if(data.err){
                setIsPending(false);
                setError(data.err);
            }else{
                setIsPending(false);
                setEmployee(data);
                setError(null);
            }
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            } else {
                setIsPending(false);
                setError(err.message);
            }
        })
    
        // abort fetch
        return () => abortCont.abort();
    
    },[id])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(employee);
        fetch(`http://localhost:8000/employees/${id}/update`, {
            method: 'PUT',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(employee)
        }).then( () => {
            //history.push('/skills')
            history.goBack()
        })
    }

    return (
        <div className="row">    
            <div className="col s10 offset-s1 l6 offset-l3">              
         {/* <div className="skill-update"> */}
        { isPending && <div>Loading...</div> }
        { error && <div> { error } </div> }            
        {employee && (
        <div className="update">
            <h2 className="flow-text center">Update Employee</h2>
            <form onSubmit={handleOnSubmit}>
            <div className="input-field col s12 m6 l4"> 
                <label className="active" htmlFor="employeeFirstname_Update">FirstName:</label>
                <input id="employeeFirstname_Update" className="validate" type="text" required value={ employee.firstname } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{firstname:  e.target.value}));
                    }} />
            </div>
                
            <div className="input-field col s12 m6 l4">                
                <label className="active" htmlFor="employeeMiddlename_Update">Middlename:</label>
                <input id="employeeMiddlename_Update" className="validate" type="text" required value={ employee.middlename } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{middlename:  e.target.value}));
                    }}></input>
            </div>

            <div className="input-field col s12 m6 l4">                
                <label className="active" htmlFor="employeeLastName_Update">LastName:</label>
                <input id="employeeLastName_Update" className="validate" type="text" required value={ employee.lastname } onChange={(e) => {
                    setEmployee(Object.assign({}, employee,{lastname:  e.target.value}));
                    }} />
            </div>                    
                
            <div className="input-field col s12 m6 l4">                
                <label className="active" htmlFor="employeeAddress_Update">Address:</label>
                <input id="employeeAddress_Update" className="validate" type="text" required value={ employee.address } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{address:  e.target.value}));
                }}></input>
            </div>                
            <div className="input-field col s12 m6 l4"> 
                <label className="active" htmlFor="employeeCity_Update">City:</label>
                <input id="employeeCity_Update" className="validate" type="text" required value={ employee.City } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{City:  e.target.value}));
                }}></input>
            </div>                 
            <div className="input-field col s12 m6 l4"> 
                <label className="active" htmlFor="employeePhonenumber_Update">Phonenumber:</label>
                <input id="employeePhonenumber_Update" className="validate" type="text" required value={ employee.phonenumber } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{phonenumber:  e.target.value}));
                }}></input>
            </div>                  
            <div className="input-field col s12"> 
                <label className="active" htmlFor="employeeEmail_Update">Email:</label>
                <input id="employeeEmail_Update" className="validate" type="email" required value={ employee.email } onChange={(e) => {                    
                    setEmployee(Object.assign({}, employee,{email:  e.target.value}));
                }}></input>
            </div>                                                                                      

                <button className="waves-effect waves-light btn col s4 offset-s4">Update Employee!</button>
            </form>
        </div>
        )}
        </div>
    </div>        
      );
}
 
export default EmployeeUpdate;