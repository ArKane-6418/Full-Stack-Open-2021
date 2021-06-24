import React from "react";

const Total = ({ exercises }) => {
    const total = exercises.reduce((sum, p) => sum + p, 0)
    return(
        <p>
            <b>
                total of {total} exercises
            </b>
        </p>
    )
}

export default Total