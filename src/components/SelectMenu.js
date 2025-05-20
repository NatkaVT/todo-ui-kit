import React, { useState, useRef } from 'react';
import styles from './SelectMenu.module.css';
import PropTypes from 'prop-types';

const SelectMenu = ({ onChange, value, isOpen: initialIsOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(initialIsOpen || false);

    const hours = [];

    for (let hour = 12; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const formattedMinute = minute < 10 ? '0' : '';
            const ampm = hour < 12 ? 'am' : 'pm';
            hours.push(`${formattedHour}:${formattedMinute}${minute} ${ampm}`);
        }
    }

    for (let hour = 0; hour < 12; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const formattedHour = hour < 10 ? `0${hour}` : hour;
            const formattedMinute = minute < 10 ? '0' : '';
            hours.push(`${formattedHour}:${formattedMinute}${minute} am`);
        }
    }

    const [selected, setSelected] = useState(value || null);
    const selectRef = useRef();

    const handleSelectClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOptionClick = (hour) => {
        setSelected(hour);
        setIsMenuOpen(false);
        if (onChange) {
            onChange(hour);
        }
    };

    return (
        <div className={styles.selectMenu} ref={selectRef}>
            <label htmlFor='time-select'>Time</label>
            <div className={styles.customSelect} onClick={handleSelectClick}>
                <div className={`${styles.selectedValue} ${styles.hover}`}>
                    {selected !== null ? selected : hours[2]}
                </div>
                {isMenuOpen && (
                    <div className={styles.options}>
                        {hours.map((hour, index) => (
                            <div
                                key={hour}
                                className={`${styles.option} ${selected === hour ? styles.active : ''} ${index === 2 ? styles.hover : ''}`}
                                onClick={() => handleOptionClick(hour)}
                            >
                                {hour}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

SelectMenu.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    isOpen: PropTypes.bool,
};

export default SelectMenu;
