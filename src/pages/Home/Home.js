
import './Home.scss';
import Banner from '../../components/Banner';
import { useLocation } from 'react-router';
import {useDispatch} from 'react-redux';
import {uiAction} from '../../redux/reducers/ui-slice';
import Card from '../../UI/card';


export default function HomePage() {  
  let location = useLocation();
  let dispatch = useDispatch();
  if(location.pathname === '/home') {
    dispatch(uiAction.changeTitle("Welcome to Deployment"));
  }

  return  (

    <div className="bx--grid bx--grid--full-width">
      {/* <div>
      <Banner />
      </div> */}
      <aside className="side-nav">
      </aside>

      <div className="bx--row cards-row">
        <div className="bx--col cards-col">
        <Card 
          key="newOnBoard" 
          title="Card 1"
          onClick={()=>console.log("card clicked")}
          />
        </div>
        <div className="bx--col cards-col">
        <Card 
          key="newOnBoard" 
          title="Card 2"
          onClick={()=>console.log("card clicked")}
          />
        </div>
        <div className="bx--col cards-col">
        <Card 
          key="newOnBoard" 
          title="Card 3"
          onClick={()=>console.log("card clicked")}
          />
        </div>
      </div>

      <div className="bx--row cards-row">
        <div className="bx--col cards-col">
        <span> Other Information goes here </span>
        </div>
      </div>
    </div>
       
    );
  
  }
  