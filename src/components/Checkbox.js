import React from "react";
import styles from './Checkbox.module.css';

const Checkbox = ({ checked, onChange, label }) => {
    return (
        <div className={styles.checkbox}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            {label && <span className={styles.label}>{label}</span>}
        </div>
    );
};

export default Checkbox;
