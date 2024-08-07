import React from "react";

export default function HighlightText({text, highlight}) {
    console.log(text)
    // Check if the highlight string is empty
    if (!highlight.trim()) {
        return <span>{text}</span>;
    }

    // Split the text into parts around the highlight string
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return (
        <span>
			{parts && parts.map((part, index) =>
                part.toLowerCase() === highlight.toLowerCase() ? (
                    <span key={index} className="bg-primary bg-opacity-80">
				{part}
				</span>
                ) : (
                    part
                )
            )}
	    </span>
    );
};