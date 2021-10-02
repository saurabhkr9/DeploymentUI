import './Home.scss';
import WelcomeContent from './WelcomeContent'
import Banner from '../../components/Banner'


export default function HomePage() {  

    return (

    <div className="bx--grid bx--grid--full-width">
      <div>
      <Banner />
      </div>
      <aside class="side-nav">
      </aside>
    <div className="bx--row welcomeContent">
    <WelcomeContent />
    </div>
  </div>
       
    );
  
  }
  