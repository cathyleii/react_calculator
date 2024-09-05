
export default function OutputBox({prevOperand, currOperand}) {
    return (
        <div className='output-box'>
        <div className="previous-operand">
        <h2>{prevOperand || "\u00A0"}</h2> {/* Render a non-breaking space if prevOperand is empty */}
      </div>
      <div className="current-operand">
        <h1>{currOperand || "\u00A0"}</h1>
        
      </div>
      </div>
    )
}