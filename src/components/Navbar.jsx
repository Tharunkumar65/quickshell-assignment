import React, { useState, useEffect, useRef } from 'react';
import './styles/Navbar.css';

const settingsIcon = '/icons/settings.svg';
const chevronIcon = '/icons/chevron-down.svg';

function Navbar({ grouping, ordering, setGrouping, setOrdering }) {
  const [isOpen, setIsOpen] = useState(false);
  const button = useRef(null);
  const drop = useRef(null);

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (drop.current && drop.current.contains(ev.target)) {
        setIsOpen(true);
      } else if (button.current && button.current.contains(ev.target)) {
        setIsOpen(!isOpen);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
  }

  return (
    <div className='navbar'>
      <div className='display-container' ref={button}>
        <div className='display'>
          <img src={settingsIcon} alt='Settings icon' />
          <span>Display</span>
          <img src={chevronIcon} alt='Chevron down icon' />
        </div>
        {isOpen ? (
          <div className='display-settings' ref={drop}>
            <div className='display-setting'>
              <div>Grouping</div>
              <select
                value={capitalize(grouping)}
                onChange={(e) => {
                  setGrouping(
                    e.target.children[e.target.selectedIndex].getAttribute('data-id')
                  );
                }}
              >
                <option key='status' data-id='status'>
                  Status
                </option>
                <option key='user' data-id='user'>
                  User
                </option>
                <option key='priority' data-id='priority'>
                  Priority
                </option>
              </select>
            </div>
            <div className='display-setting'>
              <div>Ordering</div>
              <select
                value={capitalize(ordering)}
                onChange={(e) => {
                  setOrdering(
                    e.target.children[e.target.selectedIndex].getAttribute('data-id')
                  );
                }}
              >
                <option key='title' data-id='title'>
                  Title
                </option>
                {grouping !== 'priority' ? (
                  <option key='priority' data-id='priority'>
                    Priority
                  </option>
                ) : null}
              </select>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
