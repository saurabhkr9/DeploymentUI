import {useSelector} from 'react-redux';
import './Banner.scss';


const Banner = (props) => {  

    const bannerTitle = useSelector(state=> state.ui.bannerTitle);
        return (
    
        <div className="bx--grid bx--grid--full-width">
        <div className="bx--row home-page-title">
          <div className="bx--col-lg-16">
            <h1 className="home-banner__title">{bannerTitle}</h1>
          </div>
        </div>
      </div>
           
        );
      }

      export default Banner;