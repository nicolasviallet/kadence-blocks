<?php
/**
 * Class to Build the Navigation Link Block.
 *
 * @package Kadence Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class to Build the Navigation Link Block.
 *
 * @category class
 */
class Kadence_Blocks_Navigation_Link_Block extends Kadence_Blocks_Abstract_Block {

	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $instance = null;

	/**
	 * Block name within this namespace.
	 *
	 * @var string
	 */
	protected $block_name = 'navigation-link';

	/**
	 * Instance of this class
	 *
	 * @var null
	 */
	private static $seen_refs = array();

	protected $nav_link_attributes = array();

	/**
	 * Instance Control
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Builds CSS for block.
	 *
	 * @param array $attributes the blocks attributes.
	 * @param Kadence_Blocks_CSS $css the css class for blocks.
	 * @param string $unique_id the blocks attr ID.
	 * @param string $unique_style_id the blocks alternate ID for queries.
	 */
	public function build_css( $attributes, $css, $unique_id, $unique_style_id ) {

		$nav_link_attributes = $this->get_attributes_with_defaults( $unique_id, $attributes, 'kadence/' . $this->block_name );

		$css->set_style_id( 'kb-' . $this->block_name . $unique_style_id );

		$sizes = array( 'Desktop', 'Tablet', 'Mobile' );

		foreach ( $sizes as $size ) {
			$this->sized_dynamic_styles( $css, $nav_link_attributes, $unique_id, $size );
		}
		$css->set_media_state( 'desktop' );

		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container > ul li.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a' );
		$css->render_typography( $nav_link_attributes );
		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container > ul li.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a .link-highlight-label' );
		$css->render_typography( $nav_link_attributes, 'highlightTypography' );

		if ( 'custom' === $nav_link_attributes['megaMenuWidth'] ) {
			$css->set_selector(
				'.wp-block-kadence-navigation .menu-container ul.menu .wp-block-kadence-navigation-link' . $unique_id . '.kadence-menu-mega-width-custom > ul.sub-menu'
			);
			$css->add_property( 'width', $css->render_size( $nav_link_attributes['megaMenuCustomWidth'], $nav_link_attributes['megaMenuCustomWidthUnit'] ) );
			// $css->set_selector( '.header-navigation[class*="header-navigation-dropdown-animation-fade"] #menu-item-' . $item->ID . '.kadence-menu-mega-enabled > .sub-menu' );
			// $css->add_property( 'margin-left', '-' . ( $data['mega_menu_custom_width'] ? floor( $data['mega_menu_custom_width'] / 2 ) : '400' ) . 'px' );
		}

		$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a' );
		$css->render_measure_output( $nav_link_attributes, 'padding' );
		$css->render_measure_output( $nav_link_attributes, 'margin', 'margin' );

		if( ! empty( $nav_link_attributes['highlightLabel']) || ! empty($nav_link_attributes['highlightIcon']['icon'])) {
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a .link-highlight-label' );
			$css->add_property( 'transition', 'color 0.35s ease-in-out, background-color 0.35s ease-in-out' );
			if( ! empty( $nav_link_attributes['labelColor'] ) ) {
				$css->add_property( 'color', $css->render_color( $nav_link_attributes['labelColor'] ) );
			}
			if( ! empty( $nav_link_attributes['labelBackground'] ) ) {
				$css->add_property( 'background-color', $css->render_color( $nav_link_attributes['labelBackground'] ) );
			}
			if( isset( $nav_link_attributes['highlightSpacing'][0] ) && is_array( $nav_link_attributes['highlightSpacing'][0] ) ) {
				$css->render_measure_output( $nav_link_attributes['highlightSpacing'][0], 'margin', 'margin' );
				$css->render_measure_output( $nav_link_attributes['highlightSpacing'][0], 'padding' );
				$css->render_border_styles( $nav_link_attributes['highlightSpacing'][0], 'border' );
				$css->render_border_radius( $nav_link_attributes['highlightSpacing'][0] );
				$css->render_gap($nav_link_attributes['highlightSpacing'][0]);
			}

			if( ! empty($nav_link_attributes['highlightSide']) && 'left' === $nav_link_attributes['highlightSide'] ) {
				$css->add_property('order', '-1');
			}
			if( ! empty( $nav_link_attributes['highlightSideTablet'] ) && 'left' === $nav_link_attributes['highlightSideTablet'] ) {
				$css->set_media_state( 'tablet' );
				$css->add_property( 'order', '-1' );
			}
			if( ! empty( $nav_link_attributes['highlightSideMobile'] ) && 'left' === $nav_link_attributes['highlightSideMobile'] ) {
				$css->set_media_state( 'mobile' );
				$css->add_property( 'order', '-1' );
			}
			$css->set_media_state( 'desktop' );
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a:hover .link-highlight-label' );
			if( ! empty( $nav_link_attributes['labelColorHover'] ) ) {
				$css->add_property( 'color', $css->render_color( $nav_link_attributes['labelColorHover'] ) );
			}
			if( ! empty( $nav_link_attributes['labelBackgroundHover'] ) ) {
				$css->add_property( 'background-color', $css->render_color( $nav_link_attributes['labelBackgroundHover'] ) );
			}

			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a:active .link-highlight-label' );
			if( ! empty( $nav_link_attributes['labelColorActive'] ) ) {
				$css->add_property( 'color', $css->render_color( $nav_link_attributes['labelColorActive'] ) );
			}
			if( ! empty( $nav_link_attributes['labelBackgroundActive'] ) ) {
				$css->add_property( 'background-color', $css->render_color( $nav_link_attributes['labelBackgroundActive'] ) );
			}
			if(! empty($nav_link_attributes['highlightIcon'][0]['icon'])) {
				$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container > ul li.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a .link-highlight-label .link-media-container' );
				if( ! empty( $nav_link_attributes['iconSide'] ) && 'left' === $nav_link_attributes['iconSide'] ) {
					$css->add_property( 'order', '-1' );
				}
				if( ! empty( $nav_link_attributes['iconSideTablet'] ) && 'left' === $nav_link_attributes['iconSideTablet'] ) {
					$css->set_media_state( 'tablet' );
					$css->add_property( 'order', '-1' );
				}
				if( ! empty( $nav_link_attributes['iconSideMobile'] ) && 'left' === $nav_link_attributes['iconSideMobile'] ) {
					$css->set_media_state( 'mobile' );
					$css->add_property( 'order', '-1' );
				}
				$css->set_media_state( 'desktop' );

				$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container > ul li.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a .link-highlight-label .link-svg-icon svg' );
				if( isset( $nav_link_attributes['highlightIcon'][0]['size'] ) && is_numeric( $nav_link_attributes['highlightIcon'][0]['size'] ) ) {
					$css->add_property( 'width', $nav_link_attributes['highlightIcon'][0]['size'] . 'px' );
					$css->add_property( 'height', $nav_link_attributes['highlightIcon'][0]['size'] . 'px' );
				}

				if(isset( $nav_link_attributes['highlightIcon'][0]['sizeTablet'] ) && is_numeric( $nav_link_attributes['highlightIcon'][0]['sizeTablet'] ) ) {
					$css->set_media_state( 'tablet' );
					$css->add_property( 'width',  $nav_link_attributes['highlightIcon'][0]['sizeTablet'] . 'px' );
					$css->add_property( 'height',  $nav_link_attributes['highlightIcon'][0]['sizeTablet'] . 'px' );
				}
				if(isset( $nav_link_attributes['highlightIcon'][0]['sizeMobile'] ) && is_numeric( $nav_link_attributes['highlightIcon'][0]['sizeMobile'] ) ) {
					$css->set_media_state( 'mobile' );
					$css->add_property( 'width',  $nav_link_attributes['highlightIcon'][0]['sizeMobile'] . 'px' );
					$css->add_property( 'height',  $nav_link_attributes['highlightIcon'][0]['sizeMobile'] . 'px' );
				}
				$css->set_media_state( 'desktop' );
			}
		}

		// Dropdown.
		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul.sub-menu, .wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul.submenu' );
		$css->render_measure_output( $attributes, 'dropdownBorderRadius', 'border-radius', array(
			'desktop_key' => 'dropdownBorderRadius',
			'tablet_key'  => 'dropdownBorderRadiusTablet',
			'mobile_key'  => 'dropdownBorderRadiusMobile',
		) );
		$css->render_border_styles( $attributes, 'dropdownBorder' );

		//description styles
		$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' .menu-label-description:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .menu-label-description)' );
		$css->render_typography( $nav_link_attributes, 'descriptionTypography' );

		return $css->css_output();
	}

	/**
	 * Build up the dynamic styles for a size.
	 *
	 * @param string $size The size.
	 * @return array
	 */
	public function sized_dynamic_styles( $css, $attributes, $unique_id, $size = 'Desktop' ) {
		$sized_attributes = $css->get_sized_attributes_auto( $attributes, $size, false );
		$sized_attributes_inherit = $css->get_sized_attributes_auto( $attributes, $size );

		$media_style_background = $css->get_inherited_value( $attributes['mediaStyle'][0]['background'], $attributes['mediaStyle'][0]['backgroundTablet'], $attributes['mediaStyle'][0]['backgroundMobile'], $size, true );
		$media_style_background_hover = $css->get_inherited_value( $attributes['mediaStyle'][0]['backgroundHover'], $attributes['mediaStyle'][0]['backgroundHoverTablet'], $attributes['mediaStyle'][0]['backgroundHoverMobile'], $size, true );
		$media_style_background_active = $css->get_inherited_value( $attributes['mediaStyle'][0]['backgroundActive'], $attributes['mediaStyle'][0]['backgroundActiveTablet'], $attributes['mediaStyle'][0]['backgroundActiveMobile'], $size, true );
		$media_style_color = $css->get_inherited_value( $attributes['mediaStyle'][0]['color'], $attributes['mediaStyle'][0]['colorTablet'], $attributes['mediaStyle'][0]['colorMobile'], $size, true );
		$media_style_color_hover = $css->get_inherited_value( $attributes['mediaStyle'][0]['colorHover'], $attributes['mediaStyle'][0]['colorHoverTablet'], $attributes['mediaStyle'][0]['colorHoverMobile'], $size, true );
		$media_style_color_active = $css->get_inherited_value( $attributes['mediaStyle'][0]['colorActive'], $attributes['mediaStyle'][0]['colorActiveTablet'], $attributes['mediaStyle'][0]['colorActiveMobile'], $size, true );

		$media_style_border_radius = $css->get_inherited_value( $attributes['mediaStyle'][0]['borderRadius'], $attributes['mediaStyle'][0]['borderRadiusTablet'], $attributes['mediaStyle'][0]['borderRadiusMobile'], $size, true );
		$media_style_padding = $css->get_inherited_value( $attributes['mediaStyle'][0]['padding'], $attributes['mediaStyle'][0]['paddingTablet'], $attributes['mediaStyle'][0]['paddingMobile'], $size, true );
		$media_style_margin = $css->get_inherited_value( $attributes['mediaStyle'][0]['margin'], $attributes['mediaStyle'][0]['marginTablet'], $attributes['mediaStyle'][0]['marginMobile'], $size, true );
		$media_icon_size = $css->get_inherited_value( $attributes['mediaIcon'][0]['size'], $attributes['mediaIcon'][0]['sizeTablet'], $attributes['mediaIcon'][0]['sizeMobile'], $size, true );
		$media_icon_width = $css->get_inherited_value( $attributes['mediaIcon'][0]['width'], $attributes['mediaIcon'][0]['widthTablet'], $attributes['mediaIcon'][0]['widthMobile'], $size, true );

		$is_fe_icon = 'fe' === substr( $attributes['mediaIcon'][0]['icon'], 0, 2 );

		$css->set_media_state( strtolower( $size ) );

		$css->set_selector( '.wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a, .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColor'] ), $sized_attributes['linkColor'] );
		$css->add_property( 'background', $css->render_color( $sized_attributes['background'] ) );
		$css->set_selector( '.wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap:hover > a, .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap:hover' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorHover'] ) );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundHover'] ) );
		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container > ul > li.menu-item.current-menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a, .wp-block-kadence-navigation .navigation .menu-container > ul > li.menu-item.current-menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorActive'] ) );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundActive'] ) );

		// Styles For Links in Transparent Header.
		$css->set_selector( '.header-' . strtolower( $size ) . '-transparent .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a, .header-' . strtolower( $size ) . '-transparent .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorTransparent'] ), $sized_attributes['linkColorTransparent'] );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundTransparent'] ) );
		$css->set_selector( '.header-' . strtolower( $size ) . '-transparent .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap:hover > a, .header-' . strtolower( $size ) . '-transparent .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap:hover' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorTransparentHover'] ) );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundTransparentHover'] ) );
		$css->set_selector( '.header-' . strtolower( $size ) . '-transparent .wp-block-kadence-navigation .navigation .menu-container > ul > li.menu-item.current-menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a, .header-' . strtolower( $size ) . '-transparent .wp-block-kadence-navigation .navigation .menu-container > ul > li.menu-item.current-menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorTransparentActive'] ) );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundTransparentActive'] ) );

		// Styles For Links in Sticky Header.
		$css->set_selector( '.item-is-stuck .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a, .item-is-stuck .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorSticky'] ), $sized_attributes['linkColorSticky'] );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundSticky'] ) );
		$css->set_selector( '.item-is-stuck .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap:hover > a, .item-is-stuck .wp-block-kadence-navigation .menu-container > ul > li.menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap:hover' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorStickyHover'] ) );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundStickyHover'] ) );
		$css->set_selector( '.item-is-stuck .wp-block-kadence-navigation .navigation .menu-container > ul > li.menu-item.current-menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a, .item-is-stuck .wp-block-kadence-navigation .navigation .menu-container > ul > li.menu-item.current-menu-item.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorStickyActive'] ) );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundStickyActive'] ) );

		// Dropdown logic from theme Styles Component.
		// Dropdown.
		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul.sub-menu, .wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul.submenu' );
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundDropdown'] ) );

		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul li:not(:last-of-type), .wp-block-kadence-navigation .menu-container ul.menu > li.wp-block-kadence-navigation-link' . $unique_id . '.kadence-menu-mega-enabled > ul > li.menu-item > a' );
		$css->add_property( 'border-bottom', $css->render_border( $sized_attributes['dropdownDivider'], 'bottom' ) );

		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul li.menu-item > .link-drop-wrap > a' );
		$css->add_property( 'padding-top', $css->render_size( $sized_attributes['dropdownVerticalSpacing'], $attributes['dropdownVerticalSpacingUnit'] ) );
		$css->add_property( 'padding-bottom', $css->render_size( $sized_attributes['dropdownVerticalSpacing'], $attributes['dropdownVerticalSpacingUnit'] ) );
		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul li.menu-item > .link-drop-wrap > a, .wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul.sub-menu ' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorDropdown']));

		$css->set_selector( '.wp-block-kadence-navigation .navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul li.menu-item > .link-drop-wrap > a:hover' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorDropdownHover'] ));
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundDropdownHover'] ));
		$css->set_selector( '.wp-block-kadence-navigation.navigation .menu-container ul .wp-block-kadence-navigation-link' . $unique_id . ' ul li.menu-item.current-menu-item > .link-drop-wrap > a' );
		$css->add_property( 'color', $css->render_color( $sized_attributes['linkColorDropdownActive'] ));
		$css->add_property( 'background', $css->render_color( $sized_attributes['backgroundDropdownActive']));

		//media styles (icons)
		if ( $attributes['mediaType'] && 'none' !== $attributes['mediaType'] ) {
			//normal styles
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a > .link-drop-title-wrap > .link-media-container' );
			$css->add_property( 'background-color', $css->render_color( $media_style_background ) );
			$css->add_property( 'border-radius', $css->render_size( $media_style_border_radius ) );
			$css->add_property( 'padding', $css->render_measure( $media_style_padding, 'px' ) );
			if ( $sized_attributes['mediaAlign'] == 'left' ) {
				$css->add_property( 'order', '-1' );
				$css->add_property( 'margin-right', $css->render_size( $media_style_margin[0], 'px' ) );

				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . '.kadence-menu-has-description.kadence-menu-has-icon > .link-drop-wrap > a > .link-drop-title-wrap' );
				$css->add_property( 'grid-template-columns', 'auto 1fr' );

			} else if ( $sized_attributes['mediaAlign'] == 'top' ) {
				$css->add_property( 'order', '-1' );
				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a > .link-drop-title-wrap' );
				$css->add_property( 'flex-direction', 'column' );
				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a > .link-drop-title-wrap .link-media-container' );
				$css->add_property( 'align-self', 'center' );
			} else if ( $sized_attributes['mediaAlign'] == 'bottom' ) {
				$css->add_property( 'order', '1' );
				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a > .link-drop-title-wrap' );
				$css->add_property( 'flex-direction', 'column' );
				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a > .link-drop-title-wrap .link-media-container' );
				$css->add_property( 'align-self', 'center' );
			} else {
				$css->add_property( 'margin-left', $css->render_size( $media_style_margin[0], 'px' ) );
			}

			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' > .link-drop-wrap > a > .link-drop-title-wrap > .link-media-container > .link-svg-icon > svg' );
			$css->add_property( 'width', $css->render_size( $media_icon_size, 'px' ) );
			$css->add_property( 'height', $css->render_size( $media_icon_size, 'px' ) );
			$css->add_property( 'stroke-width', $css->render_size( $is_fe_icon ? $media_icon_width : null, 'px' ) );
			$css->add_property( 'color', $css->render_color( $media_style_color ) );

			//hover style
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ':hover > .link-drop-wrap > a > .link-drop-title-wrap > .link-media-container' );
			$css->add_property( 'background-color', $css->render_color( $media_style_background_hover ) );
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ':hover > .link-drop-wrap > a > .link-drop-title-wrap > .link-media-container > .link-svg-icon > svg' );
			$css->add_property( 'color', $css->render_color( $media_style_color_hover ) );

			//active style
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . '.current-menu-item > .link-drop-wrap > a > .link-drop-title-wrap > .link-media-container' );
			$css->add_property( 'background-color', $css->render_color( $media_style_background_active ) );
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . '.current-menu-item > .link-drop-wrap > a > .link-drop-title-wrap > .link-media-container > .link-svg-icon > svg' );
			$css->add_property( 'color', $css->render_color( $media_style_color_active ) );
		}

		//icon and description placement
		if ( $sized_attributes['description'] ) {
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' .link-drop-title-wrap:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .link-drop-title-wrap)' );
			$css->add_property( 'display', 'grid' );
			$css->add_property( 'grid-template-columns', '1fr' );
		}
		if ( $sized_attributes['description'] && $sized_attributes['mediaType'] == 'icon' && ( $sized_attributes['mediaAlign'] == 'left' || $sized_attributes['mediaAlign'] == 'right' ) ) {
			$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' .link-drop-title-wrap:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .link-drop-title-wrap)' );
			$css->add_property( 'display', 'grid');
			$css->add_property( 'grid-template-columns', '1fr auto' );

			if ( $sized_attributes['descriptionPositioning'] == 'title' ) {
				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' .menu-label-description:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .menu-label-description)' );
				$css->add_property( 'grid-column', 'span 2' );
			} else {
				$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' .link-media-container:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .link-media-container)' );
				$css->add_property( 'grid-row', 'span 2' );
			}
		}

		//description styles
		$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ' .menu-label-description:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .menu-label-description)' );
		if( isset( $sized_attributes['descriptionSpacing'] ) ) {
			$css->add_property( 'padding-top', $css->render_size( $sized_attributes['descriptionSpacing'], $sized_attributes['descriptionSpacingUnit'] ?? 'px' ) );
		}

		if( isset( $sized_attributes['descriptionColor'] ) ) {
			$css->add_property( 'color', $css->render_color( $sized_attributes['descriptionColor'] ) );
		}

		//description styles hover
		$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . ':hover .menu-label-description:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .menu-label-description)' );
		if( isset( $sized_attributes['descriptionColorHover'] ) ) {
			$css->add_property( 'color', $css->render_color( $sized_attributes['descriptionColorHover'] ) );
		}

		//description styles active
		$css->set_selector( '.wp-block-kadence-navigation-link' . $unique_id . '.current-menu-item .menu-label-description:not(.wp-block-kadence-navigation-link' . $unique_id . ' .wp-block-kadence-navigation-link .menu-label-description)' );
		if( isset( $sized_attributes['descriptionColorHover'] ) ) {
			$css->add_property( 'color', $css->render_color( $sized_attributes['descriptionColorHover'] ) );
		}
	}

	/**
	 * Build HTML for dynamic blocks
	 *
	 * @param $attributes
	 * @param $unique_id
	 * @param $content
	 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
	 *
	 * @return mixed
	 */
	public function build_html( $attributes, $unique_id, $content, $block_instance ) {
		// Prevent a nav block from being rendered inside itself.
		if ( isset( $attributes['id'] ) && isset( self::$seen_refs[ $attributes['id'] ] ) ) {
			// WP_DEBUG_DISPLAY must only be honored when WP_DEBUG. This precedent
			// is set in 'wp_debug_mode()'.
			$is_debug = WP_DEBUG && WP_DEBUG_DISPLAY;

			return $is_debug ?
				// translators: Visible only in the front end, this warning takes the place of a faulty block.
				__( '[block rendering halted]', 'kadence-blocks' ) :
				'';
		}
		if ( isset( $attributes['id'] ) ) {
			self::$seen_refs[ $attributes['id'] ] = true;
		}

		$nav_link_attributes = $this->get_attributes_with_defaults( $unique_id, $attributes, 'kadence/' . $this->block_name );
		$child_info = $this->get_child_info( $block_instance );

		// Handle embeds for nav block.
		global $wp_embed;
		$content = $wp_embed->run_shortcode( $content );
		$content = $wp_embed->autoembed( $content );
		$content = do_blocks( $content );

		if ( isset( $attributes['id'] ) ) {
			unset( self::$seen_refs[ $attributes['id'] ] );
		}

		$label = $nav_link_attributes['label'];
		$url = $nav_link_attributes['url'];
		$has_children = ! empty( $content );
		$has_highlight_label = ! empty($nav_link_attributes['highlightLabel']) || ! empty($nav_link_attributes['highlightIcon'][0]['icon']);
		$temp = get_queried_object_id();
		$kind        = empty( $attributes['kind'] ) ? 'post_type' : str_replace( '-', '_', $attributes['kind'] );
		$is_active_ancestor = $child_info['has_active_child'];
		$is_active   = $this->is_current( $attributes );
		$is_mega_menu = ! empty( $nav_link_attributes['isMegaMenu'] );
		$has_icon = $nav_link_attributes['mediaType'] == 'icon' && ! empty( $nav_link_attributes['mediaIcon'][0]['icon'] );
		$mega_menu_width_class = 'kadence-menu-mega-width-' . ( $nav_link_attributes['megaMenuWidth'] ? $nav_link_attributes['megaMenuWidth'] : 'container' );

		$wrapper_classes = array();
		$wrapper_classes[] = 'wp-block-kadence-navigation-link' . $unique_id;
		$wrapper_classes[] = 'menu-item';
		$wrapper_classes[] = $has_children ? 'menu-item-has-children' : '';
		$wrapper_classes[] = $is_active ? 'current-menu-item' : '';
		$wrapper_classes[] = $is_active_ancestor ? 'current-menu-ancestor' : '';

		$wrapper_classes[] = $is_mega_menu ? 'kadence-menu-mega-enabled' : '';
		$wrapper_classes[] = $is_mega_menu ? $mega_menu_width_class : '';
		$wrapper_classes[] = ! empty($nav_link_attributes['description']) ? 'kadence-menu-has-description' : '';
		$wrapper_classes[] = $has_icon ? 'kadence-menu-has-icon' : '';

		$name = !empty( $nav_link_attributes['name'] ) ? $nav_link_attributes['name'] : '';

		$wrapper_attributes = get_block_wrapper_attributes(
			array(
				'class'      => implode( ' ', $wrapper_classes ),
				'aria-label' => $name,
			)
		);

		$down_arrow_icon = '<svg class="kadence-svg-icon kadence-arrow-down-svg" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">';
		$down_arrow_icon .= '<title>' . esc_html__( 'Expand', 'kadence' ) . '</title>';
		$down_arrow_icon .= '<path d="M5.293 9.707l6 6c0.391 0.391 1.024 0.391 1.414 0l6-6c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>';
		$down_arrow_icon .= '</svg>';

		$sub_menu_classes = array();
		$sub_menu_classes[] = 'sub-menu';
		$sub_menu_classes[] = $is_mega_menu ? 'mega-menu' : '';
		$sub_menu_attributes = $this->build_html_attributes(
			array(
				'class' => implode( ' ', $sub_menu_classes ),
			)
		);

		$sub_menu_content = $has_children ? '<ul ' . $sub_menu_attributes . '>' . $content . '</ul>' : '';

		$svg_icon   = '';
		if ( $has_icon ) {
			$type         = substr( $nav_link_attributes['mediaIcon'][0]['icon'], 0, 2 );
			$line_icon    = ( ! empty( $type ) && 'fe' == $type ? true : false );
			$fill         = ( $line_icon ? 'none' : 'currentColor' );
			$extras       = ' width="18" height="18" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"';

			$svg_icon = Kadence_Blocks_Svg_Render::render( $nav_link_attributes['mediaIcon'][0]['icon'], $fill, false, '', true, $extras );
		}
		$icon  = ! empty( $svg_icon ) ? '<div class="link-media-container"><span class="link-svg-icon link-svg-icon-' . esc_attr( $nav_link_attributes['mediaIcon'][0]['icon'] ) . '">' . $svg_icon . '</span></div>' : '';

		$description = ! empty($nav_link_attributes['description']) ? '<span class="menu-label-description">' . $nav_link_attributes['description'] . '</span>' : '';

		$highlight_icon   = '';
		if ( ! empty( $nav_link_attributes['highlightIcon'][0]['icon'] ) ) {
			$type         = substr( $nav_link_attributes['highlightIcon'][0]['icon'], 0, 2 );
			$icon_size	  = isset($nav_link_attributes['highlightIcon'][0]['size']) && is_numeric($nav_link_attributes['highlightIcon'][0]['size']) ? $nav_link_attributes['highlightIcon'][0]['size'] : '';
			$line_icon    = ( ! empty( $type ) && 'fe' == $type ? true : false );
			$fill         = ( $line_icon ? 'none' : 'currentColor' );
			$extras       = '" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"';

			$highlight_icon = Kadence_Blocks_Svg_Render::render( $nav_link_attributes['highlightIcon'][0]['icon'], $fill, false, '', true, $extras );
		}
		$hl_icon  = ! empty( $highlight_icon ) && $has_highlight_label ? '<div class="link-media-container"><span class="link-svg-icon link-svg-icon-' . esc_attr( $nav_link_attributes['highlightIcon'][0]['icon'] ) . '">' . $highlight_icon . '</span></div>' : '';
		$highlight_label = '';
		$highlight_class = '';
		if( $has_highlight_label ) {
			$highlight_class = ' has-highlight-label';
			$highlight_label = '<span class="link-highlight-label"><span class="link-highlight-label-text">' . $nav_link_attributes['highlightLabel'] . '</span>' . $hl_icon . '</span>';
		}
		$link_url = ! empty( $nav_link_attributes['disableLink'] ) && true === $nav_link_attributes['disableLink'] ? '' : ' href="' . esc_url( $url ) . '"';
		$link_label = ! empty( $nav_link_attributes['hideLabel'] ) && true === $nav_link_attributes['hideLabel'] ? '' : esc_html( $label );
		return sprintf(
			'<li %1$s><div class="link-drop-wrap"><a class="wp-block-kadence-navigation-link__content %2$s" %3$s><span class="link-drop-title-wrap">%4$s%5$s%6$s<span class="title-dropdown-navigation-toggle">%7$s</span></span>%8$s</a></div>%9$s</li>',
			$wrapper_attributes,
			$highlight_class,
			$link_url,
			$link_label,
			$icon,
			$description,
			$has_children ? $down_arrow_icon : '',
			$highlight_label,
			$sub_menu_content,
		);
	}

	/**
	 * Builds an html attribute string from an array of keys and values.
	 *
	 * @param array $attributes The database attribtues.
	 * @return array
	 */
	public function build_html_attributes( $attributes ) {
		if ( empty( $attributes ) ) {
			return '';
		}

		$normalized_attributes = array();
		foreach ( $attributes as $key => $value ) {
			$normalized_attributes[] = $key . '="' . esc_attr( $value ) . '"';
		}

		return implode( ' ', $normalized_attributes );
	}

	/**
	 * Parse content data, looking for data about child nav links.
	 *
	 * @param stdObject $block_instance This blocks instance object.
	 * @return array
	 */
	public function get_child_info( $block_instance ) {
		$child_info = array(
			'has_active_child' => false,
		);
		if ( property_exists( $block_instance, 'inner_blocks' ) && $block_instance->inner_blocks ) {
			foreach ( $block_instance->inner_blocks as $inner_block ) {
				if ( $inner_block->name == 'kadence/navigation-link' ) {
					if ( isset( $inner_block->attributes ) ) {
						if ( $this->is_current( $inner_block->attributes ) ) {
							$child_info['has_active_child'] = true;
						}
					}
				}

				$inner_child_info = $this->get_child_info( $inner_block );

				if ( $inner_child_info['has_active_child'] ) {
					$child_info['has_active_child'] = true;
				}
			}
		}

		return $child_info;
	}

	/**
	 * Checks if a nav link item is current.
	 *
	 * @param array $attributes an attributes array.
	 * @return boolean
	 */
	public function is_current( $attributes ) {
		return ! empty( $attributes['id'] ) && get_queried_object_id() === (int) $attributes['id'] && ! empty( get_queried_object()->post_type );
	}
}

Kadence_Blocks_Navigation_Link_Block::get_instance();
