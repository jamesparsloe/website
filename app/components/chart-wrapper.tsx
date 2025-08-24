'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartData {
    date: string;
    value: number;
}

interface ChartWrapperProps {
    data: ChartData[];
}

export default function ChartWrapper({ data }: ChartWrapperProps) {
    // Convert ISO strings to timestamps for proper time-based charting
    const processedData = data.map(item => ({
        ...item,
        date: new Date(item.date).getTime()
    }))

    // Calculate domain to show at least 24 hours from min date
    const minDate = Math.min(...processedData.map(item => item.date))
    const maxDate = Math.max(...processedData.map(item => item.date))
    const oneDayMs = 24 * 60 * 60 * 1000
    const domainEnd = Math.max(maxDate, minDate + oneDayMs)

    return (
        <div className="w-full bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Net Worth Over Time</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                        dataKey="date"
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
                        type="number"
                        scale="time"
                        domain={[minDate, domainEnd]}
                        tickFormatter={(tickItem) => {
                            const date = new Date(tickItem);
                            const year = date.getFullYear()
                            const month = date.getUTCMonth() + 1;
                            const day = date.getUTCDate();
                            const hours = date.getUTCHours().toString().padStart(2, '0');
                            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                            return `${year}-${month}-${day} ${hours}:${minutes}`;
                        }}
                        tickCount={6}
                    />
                    <YAxis
                        stroke="#666"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        label={{ value: 'Net Worth (£)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                        labelFormatter={(value) => {
                            const date = new Date(value);
                            const year = date.getFullYear()
                            const month = date.getUTCMonth() + 1;
                            const day = date.getUTCDate();
                            const hours = date.getUTCHours().toString().padStart(2, '0');
                            const minutes = date.getUTCMinutes().toString().padStart(2, '0');
                            return `${year}-${month}-${day} ${hours}:${minutes}`;
                        }}
                        formatter={(value, name) => [`£${value}`, 'Net Worth']}
                    />
                    <Line
                        type="stepAfter"
                        dataKey="value"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, fill: '#2563eb' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}