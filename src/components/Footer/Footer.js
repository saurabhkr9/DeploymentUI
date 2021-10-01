import './Footer.scss'


const UIFooter = () => {

    const footerNavigationProps=[
    {title:'Contact',link:"http://www.ibm.com/contact/us/en/"},
    {title:'Privacy',link:"http://www.ibm.com/privacy/us/en/"},
    {title:'Terms of use',link:"http://www.ibm.com/legal/us/en/"},
    {title:'Accessibility',link:"http://www.ibm.com/accessibility/us/en/"}
    ]
        
  

    return (
        <div id="ibm-footer" class="footer-default">
        <ul>
          {footerNavigationProps.map((item)=>
           <li key={item.title}><a href={item.link}>{item.title}</a></li>
          )} 
        </ul>

      </div>
    );
  };

 export default UIFooter;