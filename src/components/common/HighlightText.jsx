import React from "react";

export default function HighlightText({text, highlight}) {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }

    const words = highlight.match(/\S+/g)?.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) || [];
    const regex = new RegExp(`(${words.length > 0 ? words.join('|') : words})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
			{parts && parts.map((part, index) =>
                highlight.toLowerCase().includes(part.toLowerCase()) ? (
                    <span key={index} className="bg-primary rounded-sm bg-opacity-80">
                        {part}
                    </span>
                    ) : (
                        part
                    )
            )}
	    </span>
    );
};