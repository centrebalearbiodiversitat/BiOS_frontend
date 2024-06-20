import React, {useState} from "react";
import {Image} from "@nextui-org/react";

export default function Figure({alt, src, caption, className, ...extra}) {
	const [hasNoImage, setNoImage] = useState(!src);

	if (hasNoImage)
		src = "https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg"

	return (
		<div className="w-full h-full relative transition ease-in-out hover:scale-110">
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
			<figure className={`h-full w-full flex justify-center transition ease-in-out hover:scale-125`}>
				<Image radius={"none"} className={className} onError={() => setNoImage(true)}
				       alt={alt} src={src}
				       title={caption} {...extra}/>
			</figure>
		</div>
	);
}