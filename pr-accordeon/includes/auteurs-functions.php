<?php
// includes/authors-functions.php

if (!defined('ABSPATH')) exit;

// Première fonction qu'on a créée avant
	function get_articles_by_author($author_slug) {
		$args = [
			'post_type' => 'pr-article',  // 'articles' au lieu de 'article'
			'posts_per_page' => -1,
			'tax_query' => [
				[
					'taxonomy' => 'pr-auteurs',
					'field' => 'slug',
					'terms' => $author_slug
				]
			]
		];

		return new WP_Query($args);
	}

	function display_authors_with_articles() {
		$authors = get_terms([
			'taxonomy' => 'pr-auteurs',
			'hide_empty' => false
		]);

		$output = '';
		$now = time(); // Pour générer des IDs uniques

		foreach($authors as $author) {
			$accordionId = 'uid-' . $now . '-' . $author->term_id;

			// Structure de l'accordéon
			$output .= '<div class="pr-accordeon">';
			$output .= '<div class="pr-accordeon-container">';

			// En-tête de l'accordéon
			$output .= '<h3>'; // ou le niveau de titre que vous souhaitez
			$output .= '<button type="button"
							   aria-expanded="false"
							   class="pr-accordeon-trigger js-trigger"
							   aria-controls="content-' . $accordionId . '"
							   id="trigger-' . $accordionId . '">';
			$output .= esc_html($author->name);
			$output .= '</button>';
			$output .= '</h3>';

			// Contenu de l'accordéon
			$output .= '<div id="content-' . $accordionId . '"
							role="region"
							aria-labelledby="trigger-' . $accordionId . '"
							class="pr-accordeon-content js-content"
							hidden>';
			$output .= '<div class="pr-accordeon-content-inner">';

			// Liste des articles
			$articles = get_articles_by_author($author->slug);
			if($articles->have_posts()) {
				$output .= '<ul class="author-articles">';
				while($articles->have_posts()) {
					$articles->the_post();
					$output .= '<li>';
					$output .= '<a href="' . get_permalink() . '">' . get_the_title() . '</a>';

					$pdf_url = get_field('article_pdf');
					if($pdf_url) {
						$output .= ' - <a href="' . esc_url($pdf_url) . '">PDF</a>';
					}

					$output .= '</li>';
				}
				$output .= '</ul>';
			} else {
				$output .= '<p>Aucun article pour le moment</p>';
			}

			wp_reset_postdata();

			// Fermeture des divs
			$output .= '</div>'; // pr-accordeon-content-inner
			$output .= '</div>'; // pr-accordeon-content
			$output .= '</div>'; // pr-accordeon-container
			$output .= '</div>'; // pr-accordeon

			$now++; // Incrémenter pour le prochain ID unique
		}

		return $output;
	}
