import './App.css';

function InputButton( {dispatch, digit, actionType }) {
    return (
        <button 
        className="input-button"
        onClick={() => dispatch({ type: actionType, payload: { digit } })}
        >
            { digit }
        </button>
    )
}

export default InputButton;