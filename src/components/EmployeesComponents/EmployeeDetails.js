import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import EmployeeCreateCustomSkill from './EmployeeCreateCustomSkill';


class EmployeeDetails extends Component {

    constructor(props){
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSkillDetach = this.handleSkillDetach.bind(this);        
    }

    state = {
        employee: [],
        isPending: true,
        error: '',
        // state part for custom skills
        customSkills: [],
        AssignSkillsButtonToggle: false,        
      }

    componentDidMount(){
        const abortCont = new AbortController();

        const id = this.props.match.params.id

        fetch(`http://localhost:8000/employees/${id}`, {signal: abortCont.signal})
        .then(res => {
            //console.log(res)
            if(!res.ok){ // Error back from our server
                throw Error('could not fetch the data for that resource')
            }
            return res.json();
        })
        .then(data => {
            if(data.err){
                this.setState({error: data.err,isPending: false})
            }else{
                const newState = Object.assign({}, this.state, {employee: data, isPending: false})
                this.setState(newState)
                console.log(this.state.employee)
            }
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


    handleOnClick(){
        fetch('http://localhost:8000/employees/' + this.state.employee._id, {
            method: 'DELETE'
        }).then( () => {
            this.props.history.go(-1);
        }).catch(err => {
            console.log(err);
        })
    }

    handleSkillDetach(skillForDetach){

            const newSetOfSkills = this.state.employee.setofskills.filter(skill => skill!==skillForDetach )
            const newEmployee = Object.assign({},this.state.employee)
            newEmployee.setofskills = newSetOfSkills
            // console.log(skillForDetach._id)
            fetch(`http://localhost:8000/employees/${newEmployee._id}/update`, {
                method: 'PUT',
                headers: { "content-Type" : "application/json" },
                body: JSON.stringify(newEmployee)
            })
            .then( res => res.json())
            .then(data => {     
                if(data.err){
                    this.setState({error: data.err})
                }else{                                     
                    this.setState({employee: newEmployee})
                } 
            })
            .catch(err => {
                console.log(err);
                this.setState({error: err})
            })
    }

    handePlusClick = (e) => {

        const newCustomSkill = [{name: '', description: ''}]
        const newCustomSkills = this.state.customSkills.concat(newCustomSkill)
        this.setState({customSkills: newCustomSkills, AssignSkillsButtonToggle: true})

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

    handeCustomSkills = () => {


        fetch('http://localhost:8000/skills/many', {
            method: 'POST',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(this.state.customSkills)
        })
        .then((res) => {
            this.setState({AssignSkillsButtonToggle: false})
            return res.json()
        })
        .then(data => {               
                if(data.err){
                    this.setState(data.err)
                    return console.log(data)                  
                }else{ 
                    const newSetOfSkills = this.state.employee.setofskills.concat(data)
                    const newEmployee = Object.assign({}, this.state.employee)
                    newEmployee.setofskills = newSetOfSkills                    
                    fetch(`http://localhost:8000/employees/${newEmployee._id}/update`, {
                        method: 'PUT',
                        headers: { "content-Type" : "application/json" },
                        body: JSON.stringify(newEmployee)
                    })
                    .then( res => res.json())
                    .then(data => {     
                        if(data.err){
                            this.setState({error: data.err})
                        }else{                                     
                            this.setState({employee: newEmployee})
                        } 
                    }) 

                    
                }
                return console.log(data)
                                          
        })
        .catch(err => console.log(err))
    }

    render() {

        return ( 
            <div className="row">    

            { this.state.isPending && <div>Loading...</div> }
            { this.state.error && <div> { this.state.error } </div> }
            { this.state.employee && !this.state.error && (
                <article>
                    {/* ----------------------------------------------------- */}
                    <div className="col s10 offset-s1 l6 offset-l3">
                    <h2 className="flow-text center">Employee's Person Details</h2>
                    <table className="highlight centered" >
                                <thead>
                                    <tr>
                                        <th>Type</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr> 
                                        <td>Firstname</td>
                                        <td>{this.state.employee.firstname}</td>
                                    </tr>
                                    <tr>                                        
                                        <td>Middlename</td>
                                        <td>{this.state.employee.middlename}</td>
                                    </tr>
                                    <tr>                                         
                                        <td>Lastname</td>
                                        <td>{this.state.employee.lastname}</td>
                                    </tr>
                                    <tr>                                         
                                        <td>City</td>
                                        <td>{this.state.employee.City}</td>                                                                                                                                                                                                                        
                                    </tr>
                                    <tr>                                         
                                        <td>Email</td>
                                        <td>{this.state.employee.address}</td>                                                                                                                                                                                                                        
                                    </tr>
                                    <tr>                                         
                                        <td>Phonenumber</td>
                                        <td>{this.state.employee.phonenumber}</td>                                                                                                                                                                                                                        
                                    </tr>
                                    <tr>                                         
                                        <td>Email</td>
                                        <td>{this.state.employee.email}</td>                                                                                                                                                                                                                        
                                    </tr>                                                                                                                                                
                                </tbody>

                            </table>
                    {/* --------------------------------------------------------------- */}
                    <Link to={`/employees/${this.state.employee._id}/update`}><button className="waves-effect waves-light btn col s4 offset-s4">Update Details</button></Link>                       
                    </div>
                    <div className="col s10 offset-s1 l6 offset-l3">                                    
                    <h1 className="flow-text center">Set of Employee's Skills:</h1>
                    {this.state.employee.setofskills && this.state.employee.setofskills.map((skill, i) => (
                            <div key={i}>                                
                                <div class="col s12 l10 offset-l1">
                                <div class="card blue-grey darken-1">
                                    <div class="card-content white-text center">  
                                    <h4>Skill's name:</h4>  
                                        <span class="card-title">{skill.name}</span>
                                    </div>
                                <div class="card-action white-text center">
                                    <h5>Skill's description:</h5> 
                                    <span>{skill.description}</span>
                                
                                </div>
                                <div class="card-action white-text center">
                                    <h6>Skill's createdAt:</h6> 
                                    <span>{skill.createdAt}</span>                         
                                </div>                        

                                </div>
                                </div>                                
                                <button className="waves-effect waves-light btn col s4 offset-s4 " onClick={() => this.handleSkillDetach(skill)}>Skill detach</button>            
                            </div>
                    ))}
                      </div>
                      <div className="col s10 offset-s1 l6 offset-l3">  
                        <h2 className="flow-text center">Create new Skills to include them in SkillsSet (Optional):</h2>
                        <h3 className="flow-text center">(Note: new skills will be submited in your skill"s database!)</h3> 

                        {
                        this.state.AssignSkillsButtonToggle && this.state.customSkills.map((customSkill, num) => <EmployeeCreateCustomSkill key={num} customSkill={customSkill} num={num} parrentCallback={this.callback} />) 
                        }
                        <button className="waves-effect waves-light btn col s4 offset-s4" type="button" onClick={this.handePlusClick}><i class="material-icons">add</i></button>
                        {this.state.AssignSkillsButtonToggle && <button className="waves-effect waves-light btn col s4 offset-s4" onClick={this.handeCustomSkills}>Assign new Skills</button>}
                 
                                                            
                    <button className="waves-effect waves-light btn col s4 offset-s4" onClick={this.handleOnClick}>Delete Employee</button>
                    </div>   

                    
                </article>
            )}
        </div>
         );
    }
}
 
export default EmployeeDetails;