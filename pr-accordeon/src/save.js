/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
import { InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const { titleField } = attributes;

	return (
		<div className="pr-accordeon">
			<div className="pr-accordeon-container">
				<h3>
					<button
						type="button"
						aria-expanded="false"
						className="pr-accordeon-trigger js-trigger"
						aria-controls="content-id-1"
						id="accordeon-1-id"
					>
						{titleField || "Trigger 1"}
					</button>
				</h3>
				<div
					id="content-id-1"
					role="region"
					aria-labelledby="accordeon-1-id"
					className="pr-accordeon-content js-content"
					hidden
				>
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
