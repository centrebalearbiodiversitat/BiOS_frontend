"use client"

import {Button} from "@heroui/button";
import {MdKeyboardArrowLeft} from "react-icons/md";
import {useCallback} from "react";
import {useRouter} from "next/navigation";

export default function ReturnButton({className, ...props}) {
	const router = useRouter();

	const goBack = useCallback(() => {
		router.back();
	}, [router]);

	return (
		<Button color="primary" onPress={goBack}>
			<MdKeyboardArrowLeft/>
		</Button>
	);
}
