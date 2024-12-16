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

export default function Edit({ attributes, setAttributes }) {
	const { titleField, textField, linkUrl } = attributes;

	function onChangeTitleField(newValue) {
		setAttributes({ titleField: newValue });
	}

	function onChangeTextField(newValue) {
		setAttributes({ textField: newValue });
	}

	function onChangelinkUrl(newValue) {
		setAttributes({ linkUrl: newValue });
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings", "block-development-examples")}>
					<TextControl
						label="Titre"
						help="Phrase d'un maxium de 25 caractères"
						value={titleField}
						onChange={onChangeTitleField}
					/>
					<TextControl
						label="Text"
						help="Phrase d'un maxium de 180 caractères"
						value={textField}
						onChange={onChangeTextField}
					/>
					<TextControl
						label={__("URL du lien", "block-development-examples")}
						help={__("Entrez l'URL de la destination du lien")}
						value={linkUrl}
						onChange={onChangelinkUrl}
					/>
				</PanelBody>
			</InspectorControls>
			<div class="pr-tuile-container" {...useBlockProps()}>
				<a class="pr-tuile-lien" href={linkUrl}>
					<div class="pr-tuile-lien-image">
						<img src="https://placecats.com/520/300" alt="Chat" />
					</div>
					<div class="pr-tuile-lien-text">
						<h3>{titleField}</h3>
						<p>{textField}</p>
					</div>
				</a>
			</div>
		</>
	);
}

// export default function Edit() {
// 	return (
// 		<div class="pr-tuile-container">
// 			<a class="pr-tuile-lien" href="#">
// 				<div class="pr-tuile-lien-image">
// 					<img src="https://placecats.com/520/300" alt="Chat" />
// 				</div>
// 				<div class="pr-tuile-lien-text">
// 					<h3>Title</h3>
// 					<p>
// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
// 						necessitatibus, fugiat eum corporis repudiandae voluptas suscipit
// 						totam unde vero recusandae iure quo nisi ex veniam officia ut nemo
// 						optio reiciendis autem rerum quaerat labore delectus aperiam.
// 					</p>
// 				</div>
// 			</a>
// 			<a class="pr-tuile-lien" href="#">
// 				<div class="pr-tuile-lien-image">
// 					<img src="https://placecats.com/520/300" alt="Chat" />
// 				</div>
// 				<div class="pr-tuile-lien-text">
// 					<h3>Title</h3>
// 					<p>
// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
// 						necessitatibus, fugiat eum corporis repudiandae voluptas suscipit
// 						totam unde vero recusandae iure quo nisi ex veniam officia ut nemo
// 						optio reiciendis autem rerum quaerat labore delectus aperiam.
// 					</p>
// 				</div>
// 			</a>
// 			<a class="pr-tuile-lien" href="#">
// 				<div class="pr-tuile-lien-image">
// 					<img src="https://placecats.com/520/300" alt="Chat" />
// 				</div>
// 				<div class="pr-tuile-lien-text">
// 					<h3>Title</h3>
// 					<p>
// 						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
// 						necessitatibus, fugiat eum corporis repudiandae voluptas suscipit
// 						totam unde vero recusandae iure quo nisi ex veniam officia ut nemo
// 						optio reiciendis autem rerum quaerat labore delectus aperiam.
// 					</p>
// 				</div>
// 			</a>
// 		</div>
// 	);
// }
