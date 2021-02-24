import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Fouter from './components/Fouter';

//import skill Components
import SkillList from './components/skillsComponents/SkillList';
import SkillDetails from './components/skillsComponents/SkillDetails';
import SkillCreate from './components/skillsComponents/SkillCreate';
import NotFound404 from './components/NotFound404';
import SkillUpdate from './components/skillsComponents/SkillUpdate';

//import EmployeeComponents
import EmployeeList from './components/EmployeesComponents/EmployeeList';
import EmployeeDetails from './components/EmployeesComponents/EmployeeDetails';
import EmployeeCreate from './components/EmployeesComponents/EmployeeCreate';
import EmployeeUpdate from './components/EmployeesComponents/EmployeeUpdate';

// const { default: Navbar } = require("./components/Navbar");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* --- Skills Routes --- */}
            <Route exact path="/skills">
              <SkillList />
            </Route>
            <Route exact path="/skills/create">
              <SkillCreate />
            </Route>              
            <Route exact path="/skills/:id">
              <SkillDetails />
            </Route>
            <Route exact path="/skills/:id/update">
              <SkillUpdate />
            </Route>  
            {/* --- Employees Routes --- */} 
            {/* Old School xD!!! */}     
            <Route exact path="/employees" component={EmployeeList}/>                   
            <Route exact path="/employees/create" component={EmployeeCreate}/>             
            <Route exact path="/employees/:id" component={EmployeeDetails}/>           
            {/* --- 404 Routes --- */}
            <Route exact path="/employees/:id/update">
              <EmployeeUpdate />
            </Route>                         
            <Route path="*">
              <NotFound404 />
            </Route>                                       
          </Switch>
        </div>
        <Fouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
