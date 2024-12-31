/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

export default function save({ attributes }) {
    const { titleField, subtitleField, textField, imageUrl } = attributes;

    const flipIcon = <svg width="48" height="48" clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21.897 13.404.008-.057v.002c.024-.178.044-.357.058-.537.024-.302-.189-.811-.749-.811-.391 0-.715.3-.747.69-.018.221-.044.44-.078.656-.645 4.051-4.158 7.153-8.391 7.153-3.037 0-5.704-1.597-7.206-3.995l1.991-.005c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-4.033c-.414 0-.75.336-.75.75v4.049c0 .414.336.75.75.75s.75-.335.75-.75l.003-2.525c1.765 2.836 4.911 4.726 8.495 4.726 5.042 0 9.217-3.741 9.899-8.596zm-19.774-2.974-.009.056v-.002c-.035.233-.063.469-.082.708-.024.302.189.811.749.811.391 0 .715-.3.747-.69.022-.28.058-.556.107-.827.716-3.968 4.189-6.982 8.362-6.982 3.037 0 5.704 1.597 7.206 3.995l-1.991.005c-.414 0-.75.336-.75.75s.336.75.75.75h4.033c.414 0 .75-.336.75-.75v-4.049c0-.414-.336-.75-.75-.75s-.75.335-.75.75l-.003 2.525c-1.765-2.836-4.911-4.726-8.495-4.726-4.984 0-9.12 3.654-9.874 8.426z" fillRule="nonzero"/></svg>;

    return (
        <div {...useBlockProps.save()}>
            <div className="pr-carte-container">
                <div
                    role="button"
                    className="pr-carte"
                    aria-label={`Apprendre plus sur ${titleField}, ${subtitleField}`}
                    aria-live="assertive"
                >
                    <div className="pr-carte-contenu">
                        <div className="pr-carte-front">
                            <div>
                                <div className="pr-carte-bloc-image">
                                    <img
                                        className="pr-carte-image"
                                        src={imageUrl || "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"}
                                        alt={titleField}
                                    />
                                </div>
                                <h3 className="pr-carte-titre">{titleField}</h3>
                                <h4 className="pr-carte-soustitre">{subtitleField}</h4>
                            </div>
                            <div className="pr-carte-icone">
                                {flipIcon}
                            </div>
                        </div>
                        <div className="pr-carte-back">
                            <p>{textField}</p>
                            <div className="pr-carte-icone">
                                {flipIcon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
