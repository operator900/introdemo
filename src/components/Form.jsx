import Button from './Button'

const Form = ({ text, variable, functionVar, buttonType, buttonSearchText, submitType }) => {
    
    return (
        <form onSubmit={submitType}>
            <div>
                {text} <input value={variable} onChange={functionVar}/>
                {buttonType === "submit" &&
                    <Button text={buttonSearchText} type={buttonType}/>
                }
            </div>
        </form>
    )
}

export default Form