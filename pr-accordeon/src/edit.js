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

import { v4 as uuidv4 } from "uuid";

export default function Edit({ attributes, setAttributes, clientId }) {
	const [openAccordions, setOpenAccordions] = useState({});
	const { tiroirs } = attributes;

	const toggleAccordeon = (accordionId) => {
		setOpenAccordions((prev) => ({
			...prev,
			[accordionId]: !prev[accordionId],
		}));
	};

	function addTiroir() {
		setAttributes({
			tiroirs: [...tiroirs, { id: uuidv4(), titleField: "" }],
		});
	}

	function removeTiroir(index) {
		const newTiroirs = [...tiroirs];
		newTiroirs.splice(index, 1);
		setAttributes({ tiroirs: newTiroirs });
	}

	function updateTiroir(index, field, value) {
		const newTiroirs = [...tiroirs];
		newTiroirs[index][field] = value;
		setAttributes({ tiroirs: newTiroirs });
	}

	// Obtenir un ID unique pour chaque InnerBlocks
	function getTiroirClientId(tiroir) {
		return `${clientId}-tiroir-${tiroir.id}`;
	}

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
					{tiroirs.map((tiroir, index) => (
						<div key={index} style={{ marginBottom: "20px" }}>
							<TextControl
								label={`Titre`}
								help="Phrase d'un maximum de 25 caractères"
								value={tiroir.titleField}
								onChange={(value) => updateTiroir(index, "titleField", value)}
							/>
							<button
								style={{
									background: "red",
									color: "white",
									border: "none",
									padding: "5px 10px",
									cursor: "pointer",
								}}
								onClick={() => removeTiroir(index)}
							>
								Supprimer
							</button>
						</div>
					))}
					<button
						style={{
							background: "green",
							color: "white",
							border: "none",
							padding: "10px 15px",
							cursor: "pointer",
							marginTop: "20px",
						}}
						onClick={addTiroir}
					>
						Ajouter un tiroir
					</button>
				</PanelBody>
			</InspectorControls>
			<div className="pr-accordeon">
				{tiroirs.map((tiroir, index) => (
					<div className="pr-accordeon-container" key={tiroir.id}>
						<h3>
							<button
								type="button"
								aria-expanded={
									openAccordions[`content-id-${tiroir.id}`] || false
								}
								className="pr-accordeon-trigger js-trigger"
								aria-controls={`content-id-${tiroir.id}`}
								id={`accordeon-${tiroir.id}-id`}
								onClick={() => toggleAccordeon(`content-id-${tiroir.id}`)}
							>
								{tiroir.titleField || `Tiroir ${index}`}
							</button>
						</h3>
						<div
							id={`content-id-${tiroir.id}`}
							role="region"
							aria-labelledby={`accordeon-${tiroir.id}-id`}
							className="pr-accordeon-content js-content"
							hidden={!openAccordions[`content-id-${tiroir.id}`]}
						>
							<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
						</div>
					</div>
				))}
			</div>
		</>
	);
}
