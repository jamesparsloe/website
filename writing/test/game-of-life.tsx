"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

const GRID_SIZE = 32;
const CELL_SIZE = 20; // Reduced cell size to fit more cells

export default function GameOfLife() {
    const [grid, setGrid] = useState(() => {
        const rows = Array(GRID_SIZE).fill(0).map(() =>
            Array(GRID_SIZE).fill(0).map(() => Math.random() > 0.7 ? 1 : 0)
        );
        return rows;
    });
    const [isRunning, setIsRunning] = useState(false);

    const countNeighbors = useCallback((grid: number[][], x: number, y: number) => {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const newX = (x + i + GRID_SIZE) % GRID_SIZE;
                const newY = (y + j + GRID_SIZE) % GRID_SIZE;
                count += grid[newX][newY];
            }
        }
        return count;
    }, []);

    const step = useCallback(() => {
        setGrid(currentGrid => {
            const newGrid = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));

            for (let i = 0; i < GRID_SIZE; i++) {
                for (let j = 0; j < GRID_SIZE; j++) {
                    const neighbors = countNeighbors(currentGrid, i, j);
                    if (currentGrid[i][j] === 1) {
                        newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
                    } else {
                        newGrid[i][j] = neighbors === 3 ? 1 : 0;
                    }
                }
            }
            return newGrid;
        });
    }, [countNeighbors]);

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(step, 50);
        return () => clearInterval(interval);
    }, [isRunning, step]);

    const toggleCell = (i: number, j: number) => {
        setGrid(currentGrid => {
            const newGrid = [...currentGrid];
            newGrid[i] = [...newGrid[i]];
            newGrid[i][j] = currentGrid[i][j] ? 0 : 1;
            return newGrid;
        });
    };

    const resetGrid = () => {
        setGrid(Array(GRID_SIZE).fill(0).map(() =>
            Array(GRID_SIZE).fill(0).map(() => Math.random() > 0.7 ? 1 : 0)
        ));
    };

    const gridStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        width: `${GRID_SIZE * CELL_SIZE}px`,
        height: `${GRID_SIZE * CELL_SIZE}px`,
    }), []);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <div
                className="grid border border-gray-300 bg-white"
                style={gridStyle}
            >
                {grid.map((row, i) =>
                    row.map((cell, j) => (
                        <div
                            key={`${i}-${j}`}
                            onClick={() => toggleCell(i, j)}
                            className={`w-[${CELL_SIZE}px] h-[${CELL_SIZE}px] border border-gray-100 cursor-pointer ${cell ? "bg-black" : "bg-white"
                                }`}
                        />
                    ))
                )}
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 uppercase w-24"
                >
                    {isRunning ? "Stop" : "Start"}
                </button>
                <button
                    onClick={step}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 uppercase w-24"
                >
                    Step
                </button>
                <button
                    onClick={resetGrid}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-black/80 uppercase w-24"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

