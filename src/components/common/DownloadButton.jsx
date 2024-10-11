import React, {useCallback, useRef, useState} from 'react';
import CBBButton from "@/components/common/CBBButton";
import Link from "next/link";

export default function DownloadButton({href}) {
	// const [isDownloading, setIsDownloading] = useState(false);
	// const [downloadLink, setDownloadLink] = useState(null);
	// const blobUrlRef = useRef(null);
	//
	// const handleDownload = useCallback(async () => {
	// 	setIsDownloading(true); // Disable the button
	//
	// 	try {
	// 		console.log(href)
	// 		const response = await fetch(href);
	// 		const blob = await response.blob();
	// 		console.log(blob)
	//
	// 		// Create a download link
	// 		// const blobUrl = window.URL.createObjectURL(new Blob([blob]));
	// 		// setDownloadLink(blobUrl)
	// 		// Create a link element
	// 		// const link = document.createElement('a');
	// 		blobUrlRef.current = window.URL.createObjectURL(blob)
	// 		// setDownloadLink()
	// 		// link.href = window.URL.createObjectURL(blob);
	// 		// link.download = filename; // Set the file name for the download
	//
	// 		// Append to the document
	// 		// document.body.appendChild(link);
	//
	// 		// Programmatically click the link to trigger the download
	// 		// link.click();
	//
	// 		// Remove the link from the document
	// 		// document.body.removeChild(link);
	//
	// 		// Revoke the Object URL to free up memory
	// 		// window.URL.revokeObjectURL(link.href);
	// 	} catch (error) {
	// 		console.error('Download failed', error);
	// 	} finally {
	// 		setIsDownloading(false); // Re-enable the button
	// 	}
	// }, [href, filename, blobUrlRef]);
	//
	// const clickToDownload = useCallback(
	// 	() => {
	// 		if (blobUrlRef.current) {
	//             window.URL.revokeObjectURL(blobUrlRef.current); // Revoke the Blob URL
	//             blobUrlRef.current = null; // Clear the ref
	//         }
	// 	}, [blobUrlRef]);

	if (href) {
		return (
			<Link href={href}>
				<CBBButton isDisabled={!href} color="primary" >
					Download
				</CBBButton>
			</Link>
		)
	} else {
		return (
			<CBBButton isDisabled={!href} color="primary" >
				Download
			</CBBButton>
		);
	}
}
