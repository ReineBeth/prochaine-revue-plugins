import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
	InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const [isOpen, setIsOpen] = useState(false);
	const { titleField, headingLevel, uniqueId } = attributes;

	const blockProps = useBlockProps({
		className: "pr-accordeon",
	});

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "pr-accordeon-content-inner" },
		{
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		},
	);

	const toggleAccordeon = () => {
		setIsOpen((prevState) => !prevState);
	};

	useEffect(() => {
		if (!uniqueId) {
			const newId = `accordeon-${Date.now()}`;
			setAttributes({ uniqueId: newId });
		}
	}, []);

	const HeadingTag = `h${headingLevel}`;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Paramètres de l'accordéon", "block-development-examples")}
				>
					<TextControl
						label={__("Titre de l'accordéon", "block-development-examples")}
						help={__("Maximum 25 caractères", "block-development-examples")}
						value={titleField || ""}
						onChange={(value) => setAttributes({ titleField: value })}
						maxLength={25}
					/>
					<SelectControl
						label={__("Niveau de titre", "block-development-examples")}
						value={headingLevel}
						options={[
							{ label: "Titre 2", value: "2" },
							{ label: "Titre 3", value: "3" },
							{ label: "Titre 4", value: "4" },
							{ label: "Titre 5", value: "5" },
						]}
						onChange={(value) => setAttributes({ headingLevel: value })}
						help={__(
							"Choisissez le niveau hiérarchique du titre",
							"block-development-examples",
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="pr-accordeon-container">
					<HeadingTag>
						<button
							type="button"
							aria-expanded={isOpen}
							className={`pr-accordeon-trigger js-trigger ${
								isOpen ? "is-open" : ""
							}`}
							aria-controls={`content-${uniqueId}`}
							id={`trigger-${uniqueId}`}
							onClick={toggleAccordeon}
						>
							{titleField ||
								__("Titre de l'accordéon", "block-development-examples")}
						</button>
					</HeadingTag>
					<div
						id={`content-${uniqueId}`}
						role="region"
						aria-labelledby={`trigger-${uniqueId}`}
						className={`pr-accordeon-content js-content ${
							isOpen ? "is-open" : ""
						}`}
						hidden={!isOpen}
					>
						<div {...innerBlocksProps} />
					</div>
				</div>
			</div>
		</>
	);
}
