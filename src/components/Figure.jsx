import React, {useState} from "react";
import {Image} from "@nextui-org/react";

export default function Figure({alt, src, caption, className, ...extra}) {
	const [error, setError] = useState(false);
	if (error || !src) {
		src = "https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg"
	}

	return (
		<div className="w-full h-full relative overflow-hidden rounded-lg">
			<div className={`absolute w-full h-full`}
			     style={{
					 backgroundImage: `url(${src})`,
				     filter: "blur(3px) brightness(0.5)",
				     top: 0,
				     bottom: 0,
				     backgroundRepeat: 'no-repeat',
				     backgroundSize: 'cover',
				     backgroundPosition: 'center',
				}}
			/>
			<figure className={`w-full h-full object-cover transition ease-in-out hover:scale-[115%]`}>
				<Image radius={"none"} removeWrapper className={`w-full h-full object-contain`}
			        alt={alt} src={src} onError={() => setError(true)}
			        fallbackSrc="https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg"
			        title={caption} {...extra}/>
			</figure>
		</div>
	);
}