import React, {useCallback, useMemo, useState} from "react";
import {Image} from "@nextui-org/react";
import clsx from "clsx";

export default function Figure({alt, hoverEffect = true, images, className= "rounded-xl", ...extra}) {
	const [error, setError] = useState(false);
	const [i, setI] = React.useState(0);

	const onError = useCallback(() => {
		if (i === images.length - 1) {
			setError(true);
		} else {
			setI(i + 1);
		}
	}, [i, images?.length]);

	const {src, title, loading} = useMemo(() => {
		let src = "/images/image-not-found.webp";
		let title, loading;
		if (!images) {
			loading = true;
			title = 'Loading...';
		} else if (error || images.length === 0) {
			title = '';
			loading = false;
		} else {
			if (images[i].source.url) {
				src = images[i].source.url.replace('{id}', images[i].originId);
			}
			title = `${images[i].source.name} | ${images[i].attribution}`;
			loading = false;
		}

		return {src, title, loading}
	}, [images, i, error])

	return (
		<div className={clsx("w-full h-full relative overflow-hidden", className)}>
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
			<figure className={clsx(`w-full h-full object-cover`, hoverEffect && 'transition ease-in-out hover:scale-[115%]')}>
				<Image isLoading={loading} radius={"none"} removeWrapper className={`w-full h-full object-contain`}
			        alt={alt} src={src} onError={onError}
			        title={title} {...extra}/>
			</figure>
		</div>
	);
}