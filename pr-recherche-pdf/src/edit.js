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
 */
import { useBlockProps } from "@wordpress/block-editor";

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

import { useState } from "@wordpress/element";
import apiFetch from "@wordpress/api-fetch";

import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const { searchType } = attributes;

	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const blockProps = useBlockProps();

	console.log("searchResults", searchResults);
	console.log("setSearchResults", setSearchResults);
	console.log("isLoading", isLoading);
	console.log("setIsLoading", setIsLoading);
	console.log("blockProps", blockProps);

	return (
		<>
			<InspectorControls>
				<PanelBody title="Paramètres de recherche">
					<SelectControl
						label="Type de recherche"
						value={searchType}
						options={[
							{ label: "Articles", value: "articles" },
							{ label: "Auteurs", value: "auteurs" },
							{ label: "Tout", value: "tout" },
						]}
						onChange={(value) => setAttributes({ searchType: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<form class="pr-recherche" {...blockProps}>
				<label for="pr-recherche"> Rechercher un article </label>
				<div class="pr-recherche-input">
					<svg
						class="pr-recherche-icon"
						clip-rule="evenodd"
						fill-rule="evenodd"
						stroke-linejoin="round"
						stroke-miterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
							fill-rule="nonzero"
						/>
					</svg>
					<input
						type="search"
						id="pr-recherche"
						name="pr-recherche"
						placeholder="Entrer mot clé"
					/>
				</div>
				<button type="search" class="pr-recherche-button">
					Rechercher
				</button>
			</form>
		</>
	);
}
