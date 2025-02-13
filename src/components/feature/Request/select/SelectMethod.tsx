import { useState } from "react";
import Select from "../../../../design/selects/select/Select";

const SelectMethod: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState("GET");
    const handleMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMethod(event.target.value);
    };
    return (
        <Select
            onChange={handleMethodChange}
            value={selectedMethod}
            options={[
                { value: "GET", label: "GET" },
                { value: "POST", label: "POST" },
                { value: "PUT", label: "PUT" },
                { value: "DELETE", label: "DELETE" },
                { value: "PATCH", label: "PATCH" },
                { value: "HEAD", label: "HEAD" },
                { value: "OPTIONS", label: "OPTIONS" },
                { value: "TRACE", label: "TRACE" },
                { value: "CONNECT", label: "CONNECT" },
            ]}
        />
    );
};

export default SelectMethod;