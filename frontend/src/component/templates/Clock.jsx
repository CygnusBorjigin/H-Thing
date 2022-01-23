import React, { useState, useEffect } from 'react';

const Clock = () => {
    const time = new Date();

    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [halfDay, setHalfDay] = useState("");
    const [second, setSecond] = useState(time.getSeconds());

    const setTime = () => {
        let newHour = time.getHours();
        if (newHour > 12) {
            newHour = newHour - 12;
            setHalfDay(" PM");
        } else {
            setHalfDay(" AM");
        };
        setHour(newHour);
        setMinute(time.getMinutes());
    };

    useEffect(() => {
        setTime();
    }, [second])

    setInterval(() => {
        setSecond(time.getSeconds());
    }, 1000);

    return(
        <div className="my-auto">
            <span>{hour}</span>
            <span> : </span>
            {minute < 10 ? <span>0</span> : null}
            <span>{minute}</span>
            <span>{halfDay}</span>
        </div>
    )
}

export default Clock;