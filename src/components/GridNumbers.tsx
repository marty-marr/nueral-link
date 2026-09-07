import codeMatrixNumbers from "../Hooks/codeMatrixNumbers.ts";


function gridNumbers() {
    return (
        <div className="code-matrix-numbers">
            {codeMatrixNumbers.map((number, index) => (
                <div key={index}>{number}</div>
            ))}
        </div>
    )
}

export default gridNumbers;