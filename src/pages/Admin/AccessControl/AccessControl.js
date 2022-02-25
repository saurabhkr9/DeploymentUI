import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DropdownComponent from '../../../components/DropDown';
import './AccessControl.scss';
import {fetchAction} from '../../../redux/actions/projectAction';
import { APIs } from '../../../utils';
import {dropDownAction} from '../../../redux/reducers/dropDown-slice';


const AccessControl = (props) => {
    const dispatch = useDispatch();
    const [profile , setProfile] = useState("");
    const { profiles } = useSelector(state => state.dropDown)

    useEffect(()=>{
        if(profiles.length === 0){
          dispatch(fetchAction(APIs.PROFILES, dropDownAction.updateProfiles, "Fetching Profiles!"))
        }
      },[ dispatch, profiles])

    return(
        <div className="bx--grid bx--grid--full-width">
            <div className="bx--row access-control-page">
                <div className="bx--col info-container">
                    <span className="access-control-title">Access Control</span>
                    <p className="access-control-para">
                     Here goes the discription of this page.
                    </p>
                </div>
                <div className="bx--col access-col">
                <DropdownComponent
                 id="userProfile"
                 items={profiles}
                 helperText="Select a profile"
                 label="Profile"
                 textField="profile_name"
                 onChange={(item)=>setProfile(item.ID)}
              />
                </div>
                <div className="bx--col access-col">
                
                </div>
                <div className="bx--col access-col">

                </div>
            </div>
        </div>

    )
}

export default AccessControl;