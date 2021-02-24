import { useParams, useHistory } from "react-router-dom";

import { useState, useEffect } from "react";
// import useFetch from "../../customHooks/useFetch";


const SkillUpdate = () => {
        
    const { id } = useParams();

    const [skill, setSkill] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);   
    const history = useHistory();    

    useEffect( () => {
        const abortCont = new AbortController();
    
        fetch('http://localhost:8000/skills/' + id, {signal: abortCont.signal})
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
                setSkill(data);
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
        console.log(skill);
        fetch(`http://localhost:8000/skills/${id}/update`, {
            method: 'PUT',
            headers: { "content-Type" : "application/json" },
            body: JSON.stringify(skill)
        }).then( () => {
            history.goBack()
        })
    }

    return (
        <div className="row">
        { isPending && <div>Loading...</div> }
        { error && <div> { error } </div> }            
        {skill && (
        <div>

            <form className="col s10 offset-s1 l6 offset-l3" onSubmit={handleOnSubmit}>
            <h2 className="flow-text center">Update Skill</h2>
            <div className="row">
            <div className="input-field">
                <label htmlFor="skillName_Update" className="active">New skill's Name:</label>
                <input id="skillName_Update" className="validate" type="text" required value={ skill.name } onChange={(e) => {
                    setSkill(Object.assign({}, skill,{name:  e.target.value}));
                    }} />
            </div>
                
            <div className="input-field">             
                <label htmlFor="skillDescription_Update" className="active">New skill's Description:</label>
                <textarea className="materialize-textarea" id="skillDescription_Update" required value={ skill.description } onChange={(e) => {                    
                    setSkill(Object.assign({}, skill,{description:  e.target.value}));
                    }}></textarea>
            </div>
                <button className="waves-effect waves-light btn col s2 offset-s5">Update Skill!</button>
                </div>
            </form>
         </div>
        )}
    </div>        
      );
}
 
export default SkillUpdate;