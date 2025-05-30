"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    return (
        <button
            className="hover:bg-gray-400/20 p-1 rounded absolute top-1 right-1 text-zinc-200"
            aria-label="Copy to clipboard"
            onClick={() => {
                navigator.clipboard.writeText(text)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
            }}
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
    )
}