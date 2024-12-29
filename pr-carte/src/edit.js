/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, SETTINGS_DEFAULTS, useBlockProps } from '@wordpress/block-editor';

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
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { MediaUpload } from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { useState } from "react";

export default function Edit( { attributes, setAttributes}) {
	const { titleField, subtitleField, textField, imageUrl } = attributes
	const [isFlipped, setIsFlipped] = useState(false);

	function toggleFlip(){
		setIsFlipped(!isFlipped);
	}

const styleAnimationCarte = {
	transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
	transition: 'transform 0.75s, background-color 0.75s',
	backgroundColor: isFlipped ? '#3A5A40' : '#ffffff',
	borderColor: isFlipped ? '#92d16e' : '#478245'
	};

	// Mettre à jour une tuile
	function updateCard(value) {
		setAttributes({ imageUrl: value });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={  __("Settings", "block-development-examples")}>
						<div>
							<TextControl
								label={'Titre'}
								help="Phrase d'un maximum de 25 caractères"
								value={titleField}
								onChange={(value) => setAttributes({ titleField: value })}
							/>
							<TextControl
								label={'Sous titre'}
								help="Phrase d'un maximum de 25 caractères"
								value={subtitleField}
								onChange={(value) => setAttributes({ subtitleField: value })}
							/>
							<TextControl
								label={'Texte'}
								value={textField}
								onChange={(value) => setAttributes({ textField: value })}
							/>
							<MediaUpload
								onSelect={(media) => {
									updateCard( media.url );
								}}
								allowedTypes={["image"]}
								value={imageUrl}
								render={({ open }) => (
									<Button
										onClick={open}
										variant="secondary"
										style={{
											display: "block",
											marginBottom: "10px",
										}}
									>
										{imageUrl
											? "Changer l'image"
											: "Choisir une image"}
									</Button>
								)}
							/>
							{imageUrl && (
								<img
									src={imageUrl}
									style={{ maxWidth: "100%", height: "auto" }}
								/>
							)}
						</div>
				</PanelBody>
			</InspectorControls>
			<div class="pr-carte-container" {...useBlockProps()}>
				<div class="pr-carte" style={styleAnimationCarte}>
					<div class="pr-carte-contenu" style={styleAnimationCarte}>
						<div class="pr-carte-front" style={{ display: isFlipped ? 'none' : 'flex' }}>
								<div>
									<div class="pr-carte-bloc-image">
										<img class="pr-carte-image" src={ imageUrl || "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" }/>
									</div>
									<h3 class="pr-carte-titre">{ titleField }</h3>
									<h4 class="pr-carte-soustitre">{ subtitleField }</h4>
								</div>
								<div class="pr-carte-icon">
									<button class="pr-carte-bouton" onClick={() => toggleFlip()}>
										<svg width="48" height="48"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z" fill-rule="nonzero"/></svg>
									</button>
								</div>
						</div>
						<div class="pr-carte-back" style={{ display: isFlipped ? 'flex' : 'none' }}>
								<p> { textField } </p>
							<div class="pr-carte-icon">
								<button class="pr-carte-bouton" onClick={() => toggleFlip()}>
									<svg width="48" height="48"  clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z" fill-rule="nonzero"/></svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
