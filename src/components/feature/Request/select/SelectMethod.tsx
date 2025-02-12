import { useState } from "react";

const SelectMethod: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState("GET");
    const methods = ["GET", "POST", "PUT", "DELETE"];
    const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMethod(event.target.value);
    };
    return (
        <div>
            <select
                value={selectedMethod}
                onChange={handleMethodChange}
            >
                {methods.map((method) => (
                    <option key={method} value={method}>
                        {method}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectMethod;