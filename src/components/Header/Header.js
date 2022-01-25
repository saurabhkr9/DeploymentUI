
import React, { useState, useEffect } from "react";
import './Header.scss';
import {useHistory, useLocation} from 'react-router';
import { Auth } from '../../assets/ProtectedRoute'
import UserAvatar32 from "@carbon/icons-react/lib/user--avatar/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import { IbmCloud32 , Fade16} from "@carbon/icons-react";
import { SwitcherItem, Switcher,HeaderPanel } from "carbon-components-react";
import {
    HeaderContainer,
    Header,
    HeaderName,
    SkipToContent,
    HeaderGlobalAction,
    HeaderMenuButton,
    HeaderGlobalBar,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem,
} from "carbon-components-react/lib/components/UIShell";
import {ToasterApi} from '../Toaster';

const HeaderNameProps = {
    icon: <IbmCloud32 color="#FFFFFF" />,
    prefix: "IBM",
    href: "/home",
    title: process.env.REACT_APP_APPLICATION_NAME
}


const HeaderNavigationProps = {
    navigationsVisible: 3,
    navigations: [
        {
            title: "Admin",
            link: "/admin"
        }
    ]
}



const HeaderNameContainer = () => {
  let history = useHistory()
    return (<div >
        <HeaderName onClick={(e)=>{history.push(HeaderNameProps.href);e.preventDefault()}} href="" prefix={HeaderNameProps.prefix}>
            [{HeaderNameProps.title}]
        </HeaderName>
        </div>
        )
}

const HeaderNavigationContainer = () => {
    const navs = HeaderNavigationProps.navigations.map((nav) =>
        <HeaderMenuItem key={nav.title}  href={nav.link}>{nav.title}</HeaderMenuItem>
    )
    return (
        <HeaderNavigation aria-label="IBM [Platform]">
            {navs.slice(0, HeaderNavigationProps.navigationsVisible)}
            {navs.length > HeaderNavigationProps.navigationsVisible ?
                <HeaderMenu aria-label="More" menuLinkName="More">
                    {navs.slice(HeaderNavigationProps.navigationsVisible)}
                </HeaderMenu>
                : null}
        </HeaderNavigation>
    )
}

const SideNavRail = (props) => {
  let history = useHistory()
    return(
        <SideNav
        aria-label="Side navigation"
        isRail
        expanded={props.isSideNavExpanded}
        onOverlayClick={props.onClickSideNavExpand}>
        <SideNavItems>
          <SideNavLink renderIcon={Fade16} onClick={(e)=>{history.push("/config");e.preventDefault();}} href="">
            Configuration
          </SideNavLink>
          <SideNavLink renderIcon={Fade16} onClick={(e)=>{history.push("/onBoarding");e.preventDefault();}} href="">
            On-Boarding
          </SideNavLink>
          <SideNavLink renderIcon={Fade16} onClick={(e)=>{history.push("/analytics");e.preventDefault();}} href="">
            Analytics
          </SideNavLink>
          <SideNavLink renderIcon={Fade16} onClick={(e)=>{history.push("/reports");e.preventDefault();}} href="">
            Reports
          </SideNavLink>
          <SideNavLink renderIcon={Fade16} onClick={(e)=>{history.push("/repositories");e.preventDefault();}} href="">
            Repositories
          </SideNavLink>
          <SideNavLink renderIcon={Fade16} onClick={(e)=>{history.push("/datamodaling");e.preventDefault();}} href="">
            Classifications Modaling
          </SideNavLink>
          <SideNavMenu
                renderIcon={Fade16}
                title="Admin"
                isActive={true}>
                  <SideNavMenuItem onClick={(e)=>{history.push("/admin/users");e.preventDefault();}} href="">
                  Manage Users
                  </SideNavMenuItem>
                  <SideNavMenuItem onClick={(e)=>{history.push("/admin/access-control");e.preventDefault();}} href="">
                  Access Control
                  </SideNavMenuItem>
          </SideNavMenu>
        </SideNavItems>
      </SideNav>
    )
}



const GlobalHeaderContainer = (props) => {
    const [profilePanel,showProfilePanel]=useState(false)
    let location = useLocation();
    const [isLogin, setIsLogin] = useState();
    useEffect(() => {
      if(location.pathname !== '/login') {
        setIsLogin(true);
    }else{
      setIsLogin(false);
    }
    },[location.pathname])
    
    return (
        <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search" onClick={() => { }}>
                <Search20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications" onClick={() => { }}>
                <Notification20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="App Switcher" onClick={() => { }}>
                <AppSwitcher20 />
            </HeaderGlobalAction>
            <HeaderGlobalAction onClick={(e)=>{showProfilePanel(!profilePanel);}} role="menu" aria-label="Profile" >
                <UserAvatar32 />
                {
                profilePanel && isLogin
                ?
                <HeaderPanel expanded aria-label="Header Panel" hidden={false}>
                 <Switcher aria-label="Switcher Container">
                    <SwitcherItem onClick={()=>{console.log("profile")}} isSelected aria-label="Link 1" href="/profile">
                  Profile
                   </SwitcherItem>
                    <SwitcherItem onClick={() => {Auth.logout();ToasterApi.success('Successfully Logged Out!')}} href="/login" aria-label="Link 6">
                  Logout
                    </SwitcherItem>
                 </Switcher>
                </HeaderPanel>
                :null
                }
            </HeaderGlobalAction>
        </HeaderGlobalBar>
    )
}

export const AppHeader = () => {
  let location = useLocation();
    const [isLogin, setIsLogin] = useState();
    useEffect(() => {
      if(location.pathname !== '/login') {
        setIsLogin(true);
    }else{
      setIsLogin(false);
    }
    },[location.pathname])
    return (
    <HeaderContainer className="header-container"
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
        <Header aria-label="IBM Platform Name" >
        <SkipToContent />
          {isLogin && <HeaderMenuButton
            aria-label="Open menu"
            isCollapsible
            onClick={()=>onClickSideNavExpand()}
            isActive={isSideNavExpanded}
          />}
            <HeaderNameContainer />
          {isLogin && <>
            <HeaderNavigationContainer />
             <SideNavRail 
              isSideNavExpanded={isSideNavExpanded}
              onClickSideNavExpand={()=>onClickSideNavExpand()}
              /> 
              <GlobalHeaderContainer />
          </>
            }
        </Header>
        </>
    )}
        />
    )
}
