import codeMatrixNumbers from "../Hooks/codeMatrixNumbers.ts";
import {useState} from "react";




function gridNumbers() {
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelect = (index:number) => {
        setSelected((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        ) ;
    }

    return (
        <div className="code-matrix-numbers">
            {codeMatrixNumbers.map((number, index) => (
                <div key={index} className={selected.includes(index) ? 'cell active' : 'cell'} onClick={() => toggleSelect(index)}>{number}</div>
            ))}
        </div>
    )
}

export default gridNumbers;