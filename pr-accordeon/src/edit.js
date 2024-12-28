/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#inspectorcontrols
 */
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";

/**
 * Imports the necessary components that will be used to create
 * the user interface for the block's settings.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/panel/#panelbody
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/text-control/
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/
 */
import { PanelBody, TextControl, ToggleControl } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { useState } from "react";

import { InnerBlocks } from "@wordpress/block-editor"; // Ajoutez cet import

export default function Edit({ attributes, setAttributes }) {
	const [openAccordions, setOpenAccordions] = useState({});
	const { titleField } = attributes;

	const toggleAccordeon = (accordionId) => {
		setOpenAccordions((prev) => ({
			...prev,
			[accordionId]: !prev[accordionId],
		}));
	};

	// Définir les blocs autorisés - laissez vide pour autoriser tous les blocs
	const ALLOWED_BLOCKS = null; // ou spécifiez ['core/paragraph', 'core/columns', etc.]

	// Template par défaut (optionnel)
	const TEMPLATE = [
		["core/paragraph", { placeholder: "Ajoutez votre contenu ici..." }],
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "block-development-examples")}>
					<TextControl
						label={`Titre`}
						help="Phrase d'un maximum de 25 caractères"
						value={titleField}
						onChange={(value) => setAttributes({ titleField: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div className="pr-accordeon">
				<div className="pr-accordeon-container">
					<h3>
						<button
							type="button"
							aria-expanded={openAccordions["content-id-1"] || false}
							className="pr-accordeon-trigger js-trigger"
							aria-controls="content-id-1"
							id="accordeon-1-id"
							onClick={() => toggleAccordeon("content-id-1")}
						>
							{titleField || "Trigger 1"}
						</button>
					</h3>
					<div
						id="content-id-1"
						role="region"
						aria-labelledby="accordeon-1-id"
						className="pr-accordeon-content js-content"
						hidden={!openAccordions["content-id-1"]}
					>
						<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
					</div>
				</div>
			</div>
		</>
	);
}
