
import React, { useState } from "react";
import './Header.scss'
import UserAvatar32 from "@carbon/icons-react/lib/user--avatar/20";
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import { IbmCloud32 } from "@carbon/icons-react";
import { SwitcherDivider, SwitcherItem, Switcher,HeaderPanel } from "carbon-components-react";
import {
    Header,
    HeaderName,
    HeaderGlobalAction,
    HeaderGlobalBar,
    HeaderNavigation,
    HeaderMenu,
    HeaderMenuItem,
} from "carbon-components-react/lib/components/UIShell";

const HeaderNameProps = {
    icon: <IbmCloud32 color="#FFFFFF" />,
    prefix: "IBM",
    href: "/login",
    title: process.env.REACT_APP_APPLICATION_NAME
}


const HeaderNavigationProps = {
    navigationsVisible: 3,
    navigations: [
        {
            title: "Home",
            link: "/home"
        },
        {
            title: "Admin",
            link: "/admin"
        },
    ]
}


const HeaderNameContainer = () => {
   
    return (<>
        <HeaderName href={HeaderNameProps.href} prefix={HeaderNameProps.prefix}>
            [{HeaderNameProps.title}]
        </HeaderName>
        </>
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



const GlobalHeaderContainer = () => {
    const [profilePanel,showProfilePanel]=useState(false)

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
            <HeaderGlobalAction onClick={(e)=>{showProfilePanel(!profilePanel);e.preventDefault()}} role="menu" aria-label="Profile" >
                <UserAvatar32 />
                {profilePanel?
                <HeaderPanel expanded aria-label="Header Panel" hidden={false}>
                 <Switcher aria-label="Switcher Container">
                   <SwitcherItem onClick={(e)=>{alert('compoennt1_click')}} isSelected aria-label="Link 1" href="#">
                   User Name
                   </SwitcherItem>
                   <SwitcherDivider />
                   <SwitcherItem href="#" aria-label="Link 6">
                  My Tasks
                   </SwitcherItem>
                   <SwitcherItem href="#" aria-label="Link 6">
                  Reporting
              </SwitcherItem>
              <SwitcherItem href="#" aria-label="Link 6">
                  Goals
              </SwitcherItem>
              <SwitcherDivider />
              <SwitcherItem href="#" aria-label="Link 6">
                  Logout
              </SwitcherItem>
            </Switcher>
        </HeaderPanel>:null}
            </HeaderGlobalAction>
        </HeaderGlobalBar>
        
    )
}

export const AppHeader = () => {
    
    return (
        <Header aria-label="IBM Platform Name" >
            <HeaderNameContainer />
            <HeaderNavigationContainer />
            <GlobalHeaderContainer />
        </Header>
    )
}
