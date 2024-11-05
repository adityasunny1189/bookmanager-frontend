'use client';

import { useEffect, useState } from "react";

const CounterComp = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        setCount(0);
    }, []);

    function increment() {
      setCount((c) => c + 1);
    }

    function decrement() {
      setCount((c) => c - 1);
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onMouseOut={decrement}>Decrement</button>
        </div>
    );
}

export default function Home() {
    return (
        <div>
            <h1>Bookmanager Frontend</h1>
            <CounterComp />
        </div>
    );
}
