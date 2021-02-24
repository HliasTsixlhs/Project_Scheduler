import { useState } from "react";
import { useHistory } from "react-router-dom";

const SkillCreate = () => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const history = useHistory();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const skill = {name, description};

        fetch('http://localhost:8000/skills/', {
            method: 'POST',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(skill)
        }).then( () => {
            //history.push('/skills')
            history.goBack()
        })
    }

    return ( 

        <div className="row"> 
            <form className="col s10 offset-s1 l6 offset-l3" onSubmit={handleOnSubmit}>
                <h2 className="flow-text center">Create a new Skill</h2> 
                                
                <div className="input-field ">
                    <label htmlFor="skillName_Create">Skill's Name:</label>
                    <input id="skillName_Create" className="validate" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-field">
                    <label htmlFor="skillDescription_Create">Skill's Description:</label>
                    <textarea className="materialize-textarea" id="skillDescription_Create" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div >
                <button className="waves-effect waves-light btn col s4 offset-s4">Add new Skill!</button>

            </form>
        </div>
     );
}
 
export default SkillCreate;