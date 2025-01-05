import user from '../../img/user.png';
import edit from '../../img/edit.png';
import inbox from '../../img/envelope.png';
import logout from '../../img/log-out.png';
import "./Header-Admin.css";
import Name from "../../Layout/Name";
import React, {useState, useRef, useEffect} from "react";
import {PersonFill, TextCenter} from 'react-bootstrap-icons';
import {Link} from "react-router-dom";

function DropdownItem(props){
  return(
    <li className = 'dropdownItem'>
      <img src={props.img}></img>
      <a> {props.text} </a>
    </li>
  );
}


function Header() {
  const [openMenu1, setOpenMenu1] = useState(false);
  const [openMenu2, setOpenMenu2] = useState(false);

  const menuRef1 = useRef();
  const menuRef2 = useRef();

  useEffect(() => {
    const handleClickOutside1 = (event) => {
      if (menuRef1.current && !menuRef1.current.contains(event.target)) {
        setOpenMenu1(false);
      }
    };

    const handleClickOutside2 = (event) => {
      if (menuRef2.current && !menuRef2.current.contains(event.target)) {
        setOpenMenu2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside1);
    document.addEventListener("mousedown", handleClickOutside2);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside1);
      document.removeEventListener("mousedown", handleClickOutside2);
    };
  }, []);

  const toggleMenu1 = () => {
    setOpenMenu1(!openMenu1);
    setOpenMenu2(false);
  };

  const toggleMenu2 = () => {
    setOpenMenu2(!openMenu2);
    setOpenMenu1(false);
  };

  return (
      <div>
      <div className="header-container">
        <div className="icon">
<img src="data:image/png;base64,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" />
     <h1><Name /></h1> 
        </div>
        <div className="contact">
          <div className="icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADuElEQVR4nO2ZWYiOURjHfzRkmbHPZOJCWYZCiNwoW7JEGtkaV24VuZG9xnZBcodsxYWILJESLiQiDLIklEhqLFnGvoxPR/+3TtN8531f3znffCO/euvr/f7vc/bnOec58J9G6QBUAbuAq8BL4Luel3q3E5gLlFCAVAB7gM9AJuHzCdgN9KUAaAdsBn6ocr/U6yuB0Wpgez0VercKuCZtRqO1CWjTVI0wPXlHlakH9gO9U3zfBzhgNegyUE6eGao5byrwABiWg63hwEPZegYMJo8jETXiDNDZg80uwFmrMeX5WBN3rEYUebTdCjhnTbOga2azNZ18jERjI/NIZawhEBXyTvU5rok4RsgBfAS6hyhgj3rKeKfQHFRZ20JE7E/qqSQutgxYB9xUz5rnBrAWKE3oUH7pu2I8UqUeMsEujplAnSOivwdmJLBzXfo5eGSXjJqIHdeIKMAdUySPIvsY4LgVQCtjbK2WdofHdvwZiYwq5ppO0UgsceiWSvMO6ObQjZXuCh55JaP9HJp11kjEcSKBi+0nzQs88k1GXVvvWwlGrWFvGweQjRJpvuKRLzLqirYfpEniZaJKmqno2kVkdDTwRq2MugJUXYqGdLA8WDZ6SPMcj9yX0YEOzU1pjHeKY5y0NQ7NEGnu4pGTMjrboVkrzfEU9qodmnnSHMUjG2R0vUNTqqmSkYvNxnJp3gJdHbqNCRqbmtkyarbZLmYo2GXkYsdqzRRrOkUjYTTTY2xdlDZOl4oyFf5V3sRFpYJdti3K2wSV66Sdtnk64pkbqsiUBNpuCnY1cst12jtVx0yniFkqy4yKd6LIvZfwHEmw1v6a/pbvj5teudBRAdhsPnuFKqRGjTGuMRQLVcb5gGWwwEoOhKAIeKwyzBkoGMWWRzJna9/MtbYlJqsSlC0q7HDAqbuCPFBuLcZBHu1OsA5cJo7kha0BRsUs7qD5rMboaWVVRnmwV6lGvA6U+HNSbZ3yWuZgp7WVxF5AE9AWeKIKzM/BzhLZuOc5l/xX+a5anfrSUmq584k0IS2AS6qISXCnZZ++Ndv7Jmeors9+AiNTfDfJuktMc9MVlOiYez/hvYbJojzVN4soIFoDtxMchyO2W+eNXDxeEIZoitXHZFImKf6Y0+YACpQ16uknWbYZZUqBGs1iCpgi4IKVxjFeLcJModP671SD/wqSnlbSe2UjR+XaUFdqIZimdWDWy2Rgqn4bFz2eZka1RuCNUkDm9zKaIS2AQ1Y+q+GaaVaU6Mbpsu9LTf5VfgNttDSN+ivn8AAAAABJRU5ErkJggg==" />
          </div>
          <div className="content-contact">
            <span>ADDRESS</span>
            <p>192 Orchard St, Brooklyn, CA</p>
          </div>
        </div>
        <div className="contact">
          <div className="icon">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADS0lEQVR4nO2ZS0hUURjHf6ZZGJWUVqYWGbQSMlpkRYtE2oRBRAVFmGIYZLWM1tKqwih6CLWpXUXagx4LSVr0EiwhIm3Rg4qg1J5oz4lD/wuHYebOXBnvnIH5wd3M/c7c79x7vv/5vu9AlixpZR3QA4wCfcByMox84DgQibqGgVIyhOlAlxwfAVqAIuCyfrtOBjAHeCyH3wJLo+591L1GHGYa0CtHnwLzY9hs1f1PwDwcZBJwR04+AWb62Ha4vMQOyLlXQFkCW7PEBmVfj2MMybHVSdpvk70ZV4JDjMqxwgBjrmmMWWrO8FxOVQYYU6agN+M24wgdcsioUhB2aFw/jtAih84GHFekcb+BHBxgIfAX+AJMDTBuuyZi8jFn6JJTO5O0nwy8dFGGN1nrPS8J+/2yfwRMwCFylZoY55oT2M4CPsu2FgfZIOfeAQU+du2yMxmxk+QAD+TkQZ/Y+CqbJhxmCfAT+AOsimOzxyq0FuAwrVbgF8T5cldl8zDBMkx7qdsnR03JG4tCSxw6JRZOUqVS1zja4LORfpBNuyu7eywarNp9WUyL/50VL/jbcJijliTH66DUWF/vMI4yEbgtJ+/6BHad1C6iitNJioEXcvKGxCAWG63JtLkaM4uA93LyvI9K1VnL7JSrarZYm6Bx8rTPG6+xBKAzznLMlZiYpNNsvgNKXENjBfAticCutqS5J6pPVmvtU9HXRWA2IbEG+GFNJt6XqbA2zSGVxl5GEFHcmVqmSPe8jNp0NLeENZn11mTO+MSCyQCuRL114/A+JaA25RITz65DfbRQvoy3zC74qJn5YrsVNydVz/jRaMXioPpo485K66E3EySQpjWbLKVW7yyiJTmXEPIyT5rvpbj7WG91Qod9UqWU7jNeM+JNih9YYomEketQMoBuPXDUJ2seCzP0v98JMTc7Zq3tEykqvPZa+V6oNFjN8QGJwliptqR+LWmgytrBTRpyCJgS8D8qLCE5QhrJVw/gl1XXNCfZBCwGnmncLS3btGMOVu9bsdOv9my8XnO5ld70BuxJjzs5agJ6bzmixvk5HWlU6njcZM+vLbkNLYkMSp4Oh7p0ChCJc3VrYhmBCeZdwCWp24iy39aAKU2WLKSQf3jSBy3qRwNwAAAAAElFTkSuQmCC" />
          </div>
          <div className="content-contact">
            <span>PHONE</span>
            <p>(+0051) 8286 41 53</p>
          </div>
        </div>
        <div className="header-right">
        <div className="link">
        <div className="horizontal-link">
          <div className='menu-container' >
            <div className='menu-trigger' onClick={toggleMenu1}>
              <TextCenter />
            </div>
            <div className={`dropdown-menu ${openMenu1 ? 'active' : 'inactive'}`} ref={menuRef1}>
              <ul>
                <Link to = "/Dashboard" style={{ textDecoration: 'none' }} ><DropdownItem img={user} text={"Manage Dashboard"} /></Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="link">
        <div className="horizontal-link">
          <div className='menu-container' >
            <div className='menu-trigger' onClick={toggleMenu2}>
              <PersonFill />
            </div>
            <div className={`dropdown-menu ${openMenu2 ? 'active' : 'inactive'}`} ref={menuRef2}>
              <ul>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <DropdownItem img={logout} text={"Logout"} />
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>

      <div className="below">
        <div className="below-header-container">
          <div className="menu-bar">
            <ul>
              <li>
              <Link to="/home-admin" className="home-link">
              HOME
             </Link> 
              
              </li>
              <li> 
                <Link to = '/shop' className="home-link">SHOP </Link>
              </li>
              <li>
              <Link to="/blog" className="home-link">
             BLOG
             </Link>
              </li>
              <li>
              <Link to="/about" className="home-link">
             ABOUT
             </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="language">
          <select placeholder="ENGLISH">
            <option>English</option>
            <option>VietNamese</option>
            <option>Polish</option>
            <option>Franch</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Header;