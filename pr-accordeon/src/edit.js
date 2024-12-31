import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import "./editor.scss";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

// AccordionItem.js
function AccordionItem({ tiroir, index, isOpen, onToggle, clientId }) {
	// Créer un identifiant unique basé sur l'ID du tiroir
	const uniqueId = `${clientId}-${tiroir.id}`;

	const innerBlocksProps = useInnerBlocksProps(
		{ className: "pr-accordeon-content-inner" },
		{
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
			// Définir une clé unique pour le template
			clientId: uniqueId,
		},
	);

	return (
		<div className="pr-accordeon-container">
			<h3>
				<button
					type="button"
					aria-expanded={isOpen}
					className="pr-accordeon-trigger js-trigger"
					aria-controls={`content-id-${tiroir.id}`}
					id={`accordeon-${tiroir.id}-id`}
					onClick={onToggle}
				>
					{tiroir.titleField || `Tiroir ${index + 1}`}
				</button>
			</h3>
			<div
				id={`content-id-${tiroir.id}`}
				role="region"
				aria-labelledby={`accordeon-${tiroir.id}-id`}
				className="pr-accordeon-content js-content"
				hidden={!isOpen}
			>
				<div {...innerBlocksProps} />
			</div>
		</div>
	);
}

// Edit.js
export default function Edit({ attributes, setAttributes, clientId }) {
	const [openAccordions, setOpenAccordions] = useState({});
	const { tiroirs } = attributes;
	const blockProps = useBlockProps();

	const toggleAccordeon = (accordionId) => {
		setOpenAccordions((prev) => ({
			...prev,
			[accordionId]: !prev[accordionId],
		}));
	};

	function addTiroir() {
		const newTiroir = {
			id: uuidv4(),
			titleField: "",
			innerBlocksTemplate: [], // Ajout d'un template vide pour les InnerBlocks
		};

		setAttributes({
			tiroirs: [...tiroirs, newTiroir],
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
			<div {...blockProps} className="pr-accordeon">
				{tiroirs.map((tiroir, index) => (
					<AccordionItem
						key={tiroir.id}
						tiroir={tiroir}
						index={index}
						isOpen={openAccordions[`content-id-${tiroir.id}`] || false}
						onToggle={() => toggleAccordeon(`content-id-${tiroir.id}`)}
						clientId={clientId}
					/>
				))}
			</div>
		</>
	);
}
