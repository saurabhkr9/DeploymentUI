import './Home.scss';
import WelcomeContent from './WelcomeContent'
import Banner from '../../components/Banner'


export default function HomePage() {  

    return (

    <div className="bx--grid bx--grid--full-width">
      <div>
      <Banner />
      </div>
    <div className="bx--row welcomeContent">
    <WelcomeContent />
    </div>
  </div>
       
    );
  
  }
  