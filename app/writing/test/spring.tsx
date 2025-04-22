"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

const Spring = () => {
    // Toggle the spring between relaxed and stretched states
    const [time, setTime] = useState(0);
    const width = 300;
    const height = 200;

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(t => (t + 0.01) % (2 * Math.PI));
        }, 16);
        return () => clearInterval(interval);
    }, []);

    const x = width / 2 + (width / 2) * Math.cos(time);

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: "#f0f0f0" }}>
            {/* <rect x="20" y="95" width="10" height="30" fill="#444" /> */}

            <motion.circle
                cx={x}
                cy="110"
                r="20"
                fill="#3498db"
            />
        </svg>
    );
};

export default Spring;