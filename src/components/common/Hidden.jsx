
export default function Hidden({children, hide}) {
	return hide ? null : children;
}