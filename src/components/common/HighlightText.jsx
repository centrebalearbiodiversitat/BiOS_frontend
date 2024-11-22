import React from "react";

export default function HighlightText({text, highlight}) {
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <span>
			{parts && parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
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