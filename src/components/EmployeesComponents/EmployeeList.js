import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EmployeeList extends Component {
    

    // constructor(props){
    //     super(props)
    // }

    state = {
        employees: [],
        isPending: true,
        error: '',
        // State for Multiple-Delete
        deleteButtonOpen: false,
        employeesForDeletion: [],
        // State for SearchField
        searchField: '',
        initialEmployess: [],
        searchOnSkillField: '',
      }

    componentDidMount(){
        const abortCont = new AbortController();

        fetch('http://localhost:8000/employees', {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            const newState = Object.assign({}, this.state, {employees: data, initialEmployess: data, isPending: false})
            
            this.setState(newState)
            console.log(this.state.employees)
        })
        .catch(err => {
            if(err.name === 'AbortError'){
                console.log('fetch aborted')
            } else {
                const newState = Object.assign({}, this.state, {isPending: false, error: err.message})
                this.setState(newState)                
            }
        })
      }

    handleOrderByLastnameAscending = () => {
        // array.sort() is Mutator function!! So..
        console.log([...this.state.employees])
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.lastname>b.lastname)
        this.setState({employees: SortedEmployees})
    }

    handleOrderByLastnameDescending = () => {
        // array.sort() is Mutator function!! So..        
        // const SortedEmployees = [...this.state.employees].sort().reverse()
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.lastname>b.lastname).reverse()       
        this.setState({employees: SortedEmployees})
    }

    handleOrderByHiringDateAscending = () => {
        // array.sort() is Mutator function!! So..
        // By default, the sort() function sorts values as strings.
        // We fix this by providing a compare function !!! W3schools ftw xD
        console.log([...this.state.employees])
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.createdAt>b.createdAt)
        this.setState({employees: SortedEmployees})
    }

    handleOrderByHiringDateDescending = () => {
        // array.sort() is Mutator function!! So..        
        // By default, the sort() function sorts values as strings.
        // We fix this by providing a compare function !!! W3schools ftw xD
        const SortedEmployees = [...this.state.employees].sort((a, b) => a.createdAt>b.createdAt).reverse()       
        this.setState({employees: SortedEmployees})
    }   
    
    
    //Function for multi delete
    handleMultiDeleteToggle = (e) => {
        if(this.state.deleteButtonOpen === false){ //Open the button
            e.target.innerHTML = 'UnToggle multi delete'
            this.setState({deleteButtonOpen: true})

        }else{                                     //Close the button
            e.target.innerHTML = 'Toggle multi delete'       
            this.setState({deleteButtonOpen: false})

        }
    }

    handleMultiDelete = () => {
        let Ids = Object.assign({})
        Ids = this.state.employeesForDeletion.map(employee => Object.assign({}, Ids, {_id: employee._id}))
        console.log(Ids)
        // console.log(this.state.employeesForDeletion)
        fetch('http://localhost:8000/employees/manydelete', {
            method: 'DELETE',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(Ids)
        })        
        .then((res) => {
            return res.json()
        }).then(data => {
            if(data.err){
                this.setState({error: data.err})
                return console.log(data)
            }
            else{
                // After Success Deletion we need to re-GET Employees! 
                const abortCont = new AbortController();
                fetch('http://localhost:8000/employees', {signal: abortCont.signal})
                .then(res => {
                    //console.log(res)
                    if(!res.ok){ // Error back from our server
                        throw Error('could not fetch the data for that resource')
                    }
                    return res.json();
                })
                .then(data => {
                    const newState = Object.assign({}, this.state, {employees: data, initialEmployess: data, isPending: false, deleteButtonOpen: false})
                    
                    this.setState(newState)
                    console.log(this.state.employees)
                })
                .catch(err => {
                    if(err.name === 'AbortError'){
                        console.log('fetch aborted')
                    } else {
                        const newState = Object.assign({}, this.state, {isPending: false, error: err.message})
                        this.setState(newState)                
                    }
                })                
                return console.log(data)                
            }

        }).catch(err => {
            console.log(err)
            this.setState({error: err})
        })        
    }

    handleCheckboxToggle = (employeeCurrent) => {
        if(this.state.employeesForDeletion.includes(employeeCurrent)){ // remove employee if exists
            // filter isnt mutator!! So:
            this.setState({employeesForDeletion: this.state.employeesForDeletion.filter(employee => employee!== employeeCurrent)})        
        }else{                                                        // add employee if exists
            // concat isnt mutator!! So:     
            this.setState({employeesForDeletion:this.state.employeesForDeletion.concat(employeeCurrent)})
        } 
    }

    handleSearchField = (e) => {
        this.setState({searchField: e.target.value})
        if(e.target.value === ''){
            this.setState({employees: this.state.initialEmployess})
        }else{
            this.setState({employees: this.state.initialEmployess.filter(employee => employee.firstname===e.target.value || employee.lastname===e.target.value )})
        }
    }

    handleOnSkillSearchField = (e) => {
        this.setState({searchOnSkillField: e.target.value})
        if(e.target.value === ''){
            this.setState({employees: this.state.initialEmployess})
        }else{
            
            this.setState({employees: this.state.initialEmployess.filter(employee => {
                let exist = false
                employee.setofskills.forEach(skill => {
                    if(skill.name === e.target.value){
                        exist = true
                    }
                })
                return exist
                })
            })            
        }        
    }

    render() { 
        return (
            <div className="row">
                <div className="col s10 offset-s1 l6 offset-l3">
            { this.state.error && <div>{ this.state.error }</div> }
            { this.state.isPending && !this.state.error && <div> Loading... </div> }
            { this.state.employees && !this.state.error && 
                <div className="row">
                    <div className="row">
                        {   <button className="waves-effect waves-light btn col s4 offset-s1" onClick ={this.handleOrderByLastnameAscending}>Order by lastname | ascending </button> }
                        {   <button className="waves-effect waves-light btn col s4 offset-s1" onClick ={this.handleOrderByLastnameDescending}> Order by lastname | descending</button> }  
                        {   <button className="waves-effect waves-light btn col s4 offset-s1" onClick ={this.handleOrderByHiringDateAscending}>Order by hiringDate | ascending </button> }
                        {   <button className="waves-effect waves-light btn col s4 offset-s1" onClick ={this.handleOrderByHiringDateDescending}> Order by hiringDate | descending</button> }  
                    </div>
                <div className="row">
                    <div className="input-field col s8 offset-s2 l6">                                          
                        <label htmlFor="employeeSearchByName_List">FirstName|LastName:<i className="material-icons">search</i></label>
                        <input id="employeeSearchByName_List" className="validate" type="text" value={this.state.searchField} onChange={this.handleSearchField} />
                    </div>                    
                    <div className="input-field col s8 offset-s2 l6"> 
                        <label  htmlFor="employeeSearchBySkill_List">Skill's name:<i className="material-icons">search</i></label>
                        <input  id="employeeSearchBySkill_List" className="validate" type="text" value={this.state.searchOnSkillField} onChange={this.handleOnSkillSearchField} />
                    </div>
                </div> 
                    {
                        this.state.employees.map(employee => (
                        <div key={employee._id} >
                        {/* ----------------------------------------------- */}
                        {/* <div class="row"> */}
                            <div className="col s12 m6 l4">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                <span className="card-title">{ employee.firstname +" "+ employee.lastname }</span>
                                                <p>Hiring date: {employee.createdAt}</p>
                                </div>
                                <div className="card-action">
                                <Link to={`/employees/${employee._id}`}> Employees's Details</Link>
                                </div>
                            </div>

                        {/* ----------------------------------------------- */}

                                { this.state.deleteButtonOpen === true &&
                                    <label> 
                                    <input
                                    type="checkbox"
                                    onChange={() => this.handleCheckboxToggle(employee)}
                                    
                                    name={employee.lastname}
                                    value={employee}
                                    id={employee._id}
                                    />   <span><i className="material-icons">delete</i></span> 
                                    </label>                            
                                } 
                            </div>
                        </div>
                        ))
                    }

                   
                </div>
            
            }
            
                { this.state.employees && <Link to="/employees/create"> <button className="waves-effect waves-light btn col s6 m3 offset-m3 ">Create New employee</button></Link> }
                { this.state.employees && <button className="waves-effect waves-light btn col s6 m3 " onClick={this.handleMultiDeleteToggle}>Toggle multi delete</button> }
            
            { this.state.deleteButtonOpen && <button className="waves-effect waves-light btn col s12 m6 offset-m3 " onClick={this.handleMultiDelete}>Delete<i className="material-icons">delete</i></button> }       

            </div>
        </div>
        );
    }
}
 
export default EmployeeList;