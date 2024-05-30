"use client"

import {useEffect, useState} from "react";
import authorship from "@/API/authorship";

export default function Author({params: {id}}) {
	const [author, setAuthor] = useState({});

	useEffect(() => {
		authorship.get(id).then(r => setAuthor(r));
	}, [id]);

	return (
		<div>
			{JSON.stringify(author)}
		</div>
	);
}
