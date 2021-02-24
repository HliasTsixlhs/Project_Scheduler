//import useFetch from ".../customHooks/useFetch";
import { Link } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';

const SkillList = () => {

    const { error, isPending, data: skills} = useFetch('http://localhost:8000/skills')
    
    
    return (
        <div className="row">
            <div className="col s10 offset-s1 l6 offset-l3">
            { error && <div>{ error }</div> }
            { isPending && <div> Loading... </div> }
            { skills && 
                <div className="row">
                    {
                        skills.map(skill => (
                            <div className="col s12 m6 l4">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                <span className="card-title">{ skill.name}</span>
                                                <p>Date of Creation: { skill.createdAt}</p>
                                </div>
                                <div className="card-action">
                                <Link to={`/skills/${skill._id}`}> Skills's Details</Link>
                                </div>
                            </div>                           
                            </div> 
                        ))
                    }
                </div>
            
            }
            { skills && <Link to="/skills/create"> <button className="waves-effect waves-light btn col s10 offset-s1 m6" >Create New Skill</button></Link> }

            { skills && <a  href="http://localhost:8000/skills/excel" rel="noreferrer" target="_blank"><button className="waves-effect waves-light btn col s10 offset-s1 m6">Download Excel</button></a> }            
            </div>
        </div>
     );
}
 
export default SkillList;