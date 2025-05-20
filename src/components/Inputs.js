import React from "react";
import styles from './Inputs.module.css';

const Inputs = ({
    type = "text",
    value,
    onChange,
    placeholder = "",
    label = "",
    error = "",
    disabled = false,
    active = false,
    showPasswordToggle = false,
    className = "",
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === "password" && showPassword ? "text" : type;

    return (
        <div className={styles.container}>
            {label && <label>{label}</label>}
            <div className={styles.inputArea}>
                <input
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${styles.input} ${active ? styles.active : ''} ${error ? styles.error : ''} ${className}`}
                />
                {showPasswordToggle && type === "password" && (
                    <span className={styles.iconEye} onClick={disabled ? null : handleShowPassword}>
                        {showPassword ? "Hide" : "Show"}
                    </span>
                )}
            </div>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Inputs;
