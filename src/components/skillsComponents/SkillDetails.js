import { useParams, useHistory, Link } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";

const SkillDetails = () => {

    const { id } = useParams();
    const { data:skill, error, isPending } = useFetch('http://localhost:8000/skills/' + id);
    const history = useHistory();

    const handleOnClick = () => {
        fetch('http://localhost:8000/skills/' + skill._id, {
            method: 'DELETE'
        }).then( () => {
            history.goBack();
        }).catch(err => {
            console.log(err);
        })
    }
    

    return ( 
        <div className="row">  
            <div className="col s10 offset-s1 l6 offset-l3">              
            { isPending && <div>Loading...</div> }
            { error && <div> { error } </div> }
            { skill && !error && (
                <article>
                    <div class="row">
                    <div class="col s12">
                        <div class="card blue-grey darken-1">
                            <div class="card-content white-text center">  
                            <h4>Skill's name:</h4>  
                                <span class="card-title">{skill.name}</span>
                                <h5>Skill's description:</h5> 
                                 <span>{skill.description}</span>
                            </div>
                        <div class="card-action white-text center">
                            <h5>Skill's description:</h5> 
                            <p>{skill.description}</p>                           
                          
                        </div>
                        <div class="card-action white-text center">
                            <h6>Skill's createdAt:</h6> 
                            <span>{skill.createdAt}</span>                         
                        </div>                        

                        </div>
                        </div>
                    </div>
                    <button className="waves-effect waves-light btn col s10 offset-s1 m6"  onClick={handleOnClick}>Delete</button>
                    <Link to={`/skills/${skill._id}/update`}><button className="waves-effect waves-light btn col s10 offset-s1 m6">Update</button></Link>
                </article>
            )}
            </div>
        </div> 
     );
}
 
export default SkillDetails;