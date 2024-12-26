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
 * Imports the useEffect React Hook. This is used to set an attribute when the
 * block is loaded in the Editor.
 *
 * @see https://react.dev/reference/react/useEffect
 */
import { useEffect } from "react";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */

import { MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { tiles } = attributes;

	// Ajouter une nouvelle tuile
	function addTile() {
		setAttributes({
			tiles: [
				...tiles,
				{ titleField: "", textField: "", linkUrl: "", imageUrl: "" },
			],
		});
	}

	// Supprimer une tuile
	function removeTile(index) {
		const newTiles = [...tiles];
		newTiles.splice(index, 1);
		setAttributes({ tiles: newTiles });
	}

	// Mettre à jour une tuile
	function updateTile(index, field, value) {
		const newTiles = [...tiles];
		newTiles[index][field] = value;
		setAttributes({ tiles: newTiles });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "block-development-examples")}>
					{tiles.map((tile, index) => (
						<div key={index} style={{ marginBottom: "20px" }}>
							<TextControl
								label={`Titre ${index + 1}`}
								help="Phrase d'un maximum de 25 caractères"
								value={tile.titleField}
								onChange={(value) => updateTile(index, "titleField", value)}
							/>
							<TextControl
								label={`Texte ${index + 1}`}
								help="Phrase d'un maximum de 180 caractères"
								value={tile.textField}
								onChange={(value) => updateTile(index, "textField", value)}
							/>
							<TextControl
								label={__("URL du lien", "block-development-examples")}
								help={__("Entrez l'URL de la destination du lien")}
								value={tile.linkUrl}
								onChange={(value) => updateTile(index, "linkUrl", value)}
							/>
							<ToggleControl
								label={__("Afficher l'image", "block-development-examples")}
								checked={tile.showImage}
								onChange={(value) => updateTile(index, "showImage", value)}
							/>
							{tile.showImage && (
								<>
									<MediaUpload
										onSelect={(media) => {
											updateTile(index, "imageUrl", media.url);
											updateTile(index, "imageAlt", media.alt);
										}}
										allowedTypes={["image"]}
										value={tile.imageUrl}
										render={({ open }) => (
											<Button
												onClick={open}
												variant="secondary"
												style={{
													display: "block",
													marginBottom: "10px",
												}}
											>
												{tile.imageUrl
													? "Changer l'image"
													: "Choisir une image"}
											</Button>
										)}
									/>
									{tile.imageUrl && (
										<img
											src={tile.imageUrl}
											alt={tile.imageAlt || `Image ${index + 1}`}
											style={{ maxWidth: "100%", height: "auto" }}
										/>
									)}
								</>
							)}
							<button
								style={{
									background: "red",
									color: "white",
									border: "none",
									padding: "5px 10px",
									cursor: "pointer",
								}}
								onClick={() => removeTile(index)}
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
						onClick={addTile}
					>
						Ajouter une tuile
					</button>
				</PanelBody>
			</InspectorControls>
			<div class="pr-tuile-container" {...useBlockProps()}>
				{tiles.map((tile, index) => (
					<a key={index} class="pr-tuile-lien" href={tile.linkUrl}>
						{tile.showImage && (
							<div class="pr-tuile-lien-image">
								<img
									src={tile.imageUrl || "https://placecats.com/520/300"}
									alt={tile.imageAlt || ""}
								/>
							</div>
						)}
						<div class="pr-tuile-lien-text">
							<h3>{tile.titleField}</h3>
							<p>{tile.textField}</p>
						</div>
					</a>
				))}
			</div>
		</>
	);
}
