import { useState } from "react";

const SelectMethod: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState("GET");
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMethod(event.target.value);
    };
    return (
        <select 
            value={selectedMethod}
            onChange={handleMethodChange}
            className="form-select form-select-sm" 
            aria-label=".form-select-sm example">
            {
                methods.map((method) => (
                    <option key={method} value={method}>{method}</option>
                ))
            }
        </select>
    );
};

export default SelectMethod;