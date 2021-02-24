import React, { Component } from 'react'
import EmployeeCreateCustomSkill from './EmployeeCreateCustomSkill';


class EmployeeCreate extends Component {

    constructor(props){
        super(props);

        //this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }
    // setofskills
    state = {
        firstname: '',
        middlename: '',
        lastname: '',
        address: '',
        City: '',
        phonenumber: '',
        email: '',
        // State part for checkbox
        setOfSkills: [],
        setOfPickedSkills: [],
        existingSkills: [],
        setOfPickedSkillsWithDescription: [],
        // state part for custom skills
        customSkills: [],
        // state part for error and pending        
        isPending: true,
        error: '',
      }

      componentDidMount(){
        const abortCont = new AbortController();

        fetch('http://localhost:8000/skills', {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            const newSetOfSkills = data.map(el => el.name)
            const newState = Object.assign({}, this.state, {existingSkills: data, setOfSkills: newSetOfSkills, isPending: false})
            
            this.setState(newState)
            console.log(this.state.existingSkills)
            console.log(this.state.setOfSkills)
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

    handleOnSubmit(e){
        e.preventDefault();        
        //Fisrt we need to save Custom skills in our dataBase!
        
        fetch('http://localhost:8000/skills/many', {
            method: 'POST',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(this.state.customSkills)
        })
        .then((res) => {
            return res.json()
        })
        .then(data => {
            // if(data){                
                if(data.err){
                    this.setState(data.err)
                    return console.log(data)                  
                }else{ 
                    //Saved data successfully
                    const skillsForSubmit = this.state.setOfPickedSkillsWithDescription.concat(data)
                    
                    const newEmployee = {
                        firstname: this.state.firstname,
                        middlename: this.state.middlename,
                        lastname: this.state.lastname,
                        address: this.state.address,
                        City: this.state.City,
                        phonenumber: this.state.phonenumber,
                        email: this.state.email,
                        setofskills: skillsForSubmit,
                    } 
                    console.log(newEmployee)
                    fetch('http://localhost:8000/employees/', {
                        method: 'POST',
                        headers: { "content-Type" : "application/json" },
                        body: JSON.stringify(newEmployee)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if(data.err){
                            this.setState(data.err)
                            return console.log(data)                             
                        }else{
                            // Employee Saved!!
                            this.props.history.go(-1);
                            // return console.log(data)
                            
                        }
                    }) 
                    
                }

                return console.log(data)

                                          
        })
        .catch(err => console.log(err))
        // console.log("this:",this)

    }      

    handleToggle = (e) => {
        if(this.state.setOfPickedSkills.includes(e.target.value)){
            this.setState({setOfPickedSkills: this.state.setOfPickedSkills.filter(skill => skill!== e.target.value), setOfPickedSkillsWithDescription: this.state.setOfPickedSkillsWithDescription.filter(skill => skill.name!==e.target.value)})        
        }else{
            const newSetOfPickedSkills = [...this.state.setOfPickedSkills, e.target.value]
            const newSetOfPickedSkillsWithDescription = this.state.setOfPickedSkillsWithDescription.concat(this.state.existingSkills.filter(skill => skill.name===e.target.value))
            this.setState({setOfPickedSkills: newSetOfPickedSkills, setOfPickedSkillsWithDescription: newSetOfPickedSkillsWithDescription})
        }       
    }

    handePlusClick = (e) => {

        const newCustomSkill = [{name: '', description: ''}]
        const newCustomSkills = this.state.customSkills.concat(newCustomSkill)
        this.setState({customSkills: newCustomSkills})
        console.log('hi')
        console.log(this.state.customSkills)
    
    }
    
    callback = (name, description, num) => {
        const newCustomSkill = {name, description}
        const newCustomSkills = this.state.customSkills.map((customSkill, id) => {
            if(id === num){
                return newCustomSkill
            }else{
                return customSkill
            }
        })

        this.setState({customSkills: newCustomSkills})

    }

    render() { 
        return (
        <div className="row">
            { this.state.error && <div> { this.state.error } </div> }            
            { this.state.existingSkills &&  !this.state.error &&
            <div>               
            
            <form className="col s10 offset-s1 l6 offset-l3" onSubmit={this.handleOnSubmit}>
                <div className="row">
                    <h2 className="flow-text center">Create a new Employee</h2>
                    <div className="input-field col s12 m6 l4">
                        <label htmlFor="employeeFirstname_Create">FirstName:</label>
                        <input id="employeeFirstname_Create" className="validate" type="text" required value={this.state.firstname} onChange={(e) => this.setState({firstname: e.target.value})} />
                    </div>
                    <div className="input-field col s12 m6 l4">
                        <label htmlFor="employeeMiddlename_Create">MiddleName:</label>
                        <input id="employeeMiddlename_Create" className="validate" type="text" required value={this.state.middlename} onChange={(e) => this.setState({middlename: e.target.value})} />
                    </div>
                    <div class="input-field col s12 m6 l4">
                        <label htmlFor="employeeLastname_Create">LastName:</label>
                        <input id="employeeLastname_Create" className="validate" type="text" required value={this.state.lastname} onChange={(e) => this.setState({lastname: e.target.value})} />
                    </div>
                    <div className="input-field col s12 m6 l4">
                        <label htmlFor="employeeAddress_Create">Address:</label>
                        <input id="employeeAddress_Create" className="validate" type="text" required value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />
                    </div>
                    <div className="input-field col s12 m6 l4">
                        <label htmlFor="employeeCity_Create">City:</label>
                        <input id="employeeCity_Create" className="validate" type="text" required value={this.state.City} onChange={(e) => this.setState({City: e.target.value})} />
                    </div>
                    <div className="input-field col s12 m6 l4">
                        <label htmlFor="employeePhonenumber_Create">Phonenumber:</label>
                        <input id="employeePhonenumber_Create" className="validate" type="text" required value={this.state.phonenumber} onChange={(e) => this.setState({phonenumber: e.target.value})} />
                    </div>
                    <div className="input-field col s12">
                        <label htmlFor="employeeEmail_Create">Email:</label>
                        <input id="employeeEmail_Create" className="validate" type="email" required value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                    </div>
                </div>    
                { this.state.isPending && <div> Loading... </div> }
              
                <div className="row">
                <h2 className="flow-text center">Chose existing Skills to include them in the SkillsSet:</h2>
                {this.state.setOfSkills.map((skillname,num) => 
                    <div key={num} className="col s12 m6 l4 ">
                    <label>
                    <input
                    type="checkbox"
                    onChange={this.handleToggle}
                    
                    name={skillname}
                    value={skillname}
                    id={num}
                    />
                    <span>{skillname}</span>

                    </label>
                
                    </div>
                )}                             
                </div>
                


                    <h2 className="flow-text center">Create new Skills to include them in SkillsSet (Optional):</h2>
                    <h3 className="flow-text center">Note: new skills will be submited in your skill"s database!</h3> 

                    {
                    this.state.customSkills.map((customSkill, num) => <EmployeeCreateCustomSkill key={num} customSkill={customSkill} num={num} parrentCallback={this.callback} />) 
                    }
                    <button className="waves-effect waves-light btn col s2 offset-s5" type="button" onClick={this.handePlusClick}>  <i class="material-icons">add</i></button>

                <button className="waves-effect waves-light btn col s4 offset-s4">Add new Employee!</button>
            </form>
            </div>}
        </div>            
          );
    }
}
 
export default EmployeeCreate;