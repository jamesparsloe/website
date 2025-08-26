// components/CSVTable.jsx


export interface CSVTableProps {
    data: Record<string, any>[];
    className?: string;
    headerClassName?: string;
    cellClassName?: string;
    emptyMessage?: string;
}

export function CSVTable({
    data,
    className = '',
    headerClassName = '',
    cellClassName = '',
    emptyMessage = 'No data available'
}: CSVTableProps) {
    if (!data || data.length === 0) {
        return <div className="empty-state">{emptyMessage}</div>;
    }

    const headers = Object.keys(data[0]);

    return (
        <table className={className}>
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header} className={headerClassName}>
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx}>
                        {headers.map(header => (
                            <td key={header} className={cellClassName}>
                                {row[header] ?? ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}