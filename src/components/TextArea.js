import React, { useState, useEffect } from "react";
import styles from './TextArea.module.css';

const TextArea = ({placeholder, onChange, value}) => {
    const [textValue, setTextValue] = useState(value || '');

    const handleChange = (e) => {
        setTextValue(e.target.value);
        onChange(e.target.value);
    };

    useEffect(() => {
        setTextValue(value || '');
    })

    return(
        <div className={styles.textArea}>
            <label>Description</label>
            <textarea
            className={styles.textAreaInput}
            placeholder={placeholder}
            value={textValue}
            onChange={handleChange}
            />
        </div>
    );
};

export default TextArea;
