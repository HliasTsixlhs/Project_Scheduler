import { useState } from "react";

const EmployeeCreateNewCustomSkill = ({customSkill, num, parrentCallback}) => {

    const [name, setName] = useState(customSkill.name);
    const [description, setDescription] = useState(customSkill.description);


    return (
            <div>
                <h2 className="center flow-text">Custom Skill {num}</h2>
                    <div className="input-field">
                        <label htmlFor="skillName_CreateCustomSkill">Skill's Name:</label>
                        <input id="skillName_CreateCustomSkill" type="text" required value={name} onChange={(e) => {
                            setName(e.target.value)
                            parrentCallback(name, description, num)
                            }} />
                    </div>
                    <div className="input-field">                                        
                        <label htmlFor="skillDescription_CreateCustomSkill">Skill's Description:</label>
                        <textarea id="skillDescription_CreateCustomSkill" className="materialize-textarea" required value={description} onChange={(e) => {
                            setDescription(e.target.value)
                            parrentCallback(name, description, num)
                            }}></textarea>     
                    </div>                           
        </div>
      );
}
 

export default EmployeeCreateNewCustomSkill;