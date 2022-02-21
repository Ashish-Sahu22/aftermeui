import FormInput from "../controller/FormInput"


export const getInputElement = () => {
    const [
        key,
        label,
        type,
        value,
        options,
        required,
        placeholder
    ];
    return <div className="row">
        <FormInput
            key={'input_' + key + label}
            elementKey={key}
            elementValue={value}
            elementData={{
                fieldtype: type,
                label: label,
                option: options,
                order: 2,
                required: required,
                // required_message: "Enter Last Name",
                placeholder: placeholder
            }}
        />
    </div>
}