import './Menu.css'

import { useState } from 'react';

const Menu = () => {
    const menuItems = [ 'Home', 'About', 'Services', 'Contact' ]
    const [activeItem, setActiveItem] = useState(menuItems[0])
    return (
        <div className="menu-bar">
            <div className="menu-items" id="menu-items">
                {menuItems.map((item) => (
                    <a
                        key={item}
                        href="#"
                        className={`menu-item ${activeItem === item ? 'active' : ''}`}
                        onClick={() => { setActiveItem(item) }}
                    >
                        {item}
                    </a>
                ))}
            </div>
        </div>
    )
};

export default Menu;