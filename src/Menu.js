import './Menu.css'

import { useState } from 'react';
import Logbook from './Logbook';
import Home from './Home';
import UserInfo from './UserInfo';

const Menu = () => {
    const menuItems = ['Home', 'Logbook', 'User Info']
    const [activeItem, setActiveItem] = useState(menuItems[0])
    return (
        <div>
            <div className="menu-bar">
                <div className="menu-items" id="menu-items">
                    {menuItems.map((item) => (
                        <a
                            key={item}
                            href="/#"
                            className={`menu-item ${activeItem === item ? 'active' : ''}`}
                            onClick={() => { setActiveItem(item) }}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
            <div style={{ padding: '20px' }}>
                {activeItem === 'Logbook' && <Logbook />}
                {activeItem === 'Home' && <Home />}
                {activeItem === 'User Info' && <UserInfo />}
            </div>
        </div>
    )
};

export default Menu;