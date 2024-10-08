export default function CopyToClipboard(content?: string) {
	if (!content) return;

	navigator.clipboard.writeText(content);
}
