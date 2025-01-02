import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { titleField, headingLevel } = attributes;

	const blockProps = useBlockProps.save({
		className: "pr-accordeon",
	});

	const innerBlocksProps = useInnerBlocksProps.save({
		className: "pr-accordeon-content-inner",
	});

	const HeadingTag = `h${headingLevel}`;
	const accordionId = "pr-accordion-" + Date.now();

	return (
		<div {...blockProps}>
			<div className="pr-accordeon-container">
				<HeadingTag>
					<button
						type="button"
						aria-expanded="false"
						className="pr-accordeon-trigger js-trigger"
						aria-controls={`content-${accordionId}`}
						id={`trigger-${accordionId}`}
					>
						{titleField ||
							__("Titre de l'accordéon", "block-development-examples")}
					</button>
				</HeadingTag>
				<div
					id={`content-${accordionId}`}
					role="region"
					aria-labelledby={`trigger-${accordionId}`}
					className="pr-accordeon-content js-content"
					hidden
				>
					<div {...innerBlocksProps} />
				</div>
			</div>
		</div>
	);
}
