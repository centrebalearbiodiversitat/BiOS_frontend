import React from "react";
import {Image} from "@nextui-org/react";

export default function Figure({alt, src, caption, className, onError}) {

	return (
		<figure className="m-auto">
			<Image className={className} onError={onError} alt={alt} src={src} title={caption}/>
			{/*<figcaption className="opacity-0 hover:opacity-100 text-center text-small text-gray-400 mt-1">*/}
			{/*	{caption}*/}
			{/*</figcaption>*/}
		</figure>
	);
}