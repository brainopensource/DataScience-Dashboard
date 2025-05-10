import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const Form = () => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { input1, input2 });
    };
    return (_jsxs("div", { className: "form-page", children: [_jsx("h2", { children: "Mock Form" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { children: "Input 1:" }), _jsx("input", { type: "text", value: input1, onChange: (e) => setInput1(e.target.value) })] }), _jsxs("div", { children: [_jsx("label", { children: "Input 2:" }), _jsx("input", { type: "text", value: input2, onChange: (e) => setInput2(e.target.value) })] }), _jsx("button", { type: "submit", children: "Submit" })] })] }));
};
export default Form;
