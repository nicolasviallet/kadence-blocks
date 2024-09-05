import { KadenceBlocksCSS, getPreviewSize, getSpacingOptionOutput } from '@kadence/helpers';

export default function BackendStyles(props) {
	const { attributes, isSelected, previewDevice, metaAttributes, context } = props;

	const { uniqueID, id, templateKey } = attributes;

	const {
		padding,
		tabletPadding,
		mobilePadding,
		paddingUnit,
		margin,
		tabletMargin,
		mobileMargin,
		marginUnit,
		paddingDropdown,
		tabletPaddingDropdown,
		mobilePaddingDropdown,
		paddingDropdownUnit,
		marginDropdown,
		tabletMarginDropdown,
		mobileMarginDropdown,
		marginDropdownUnit,
		paddingLink,
		tabletPaddingLink,
		mobilePaddingLink,
		paddingLinkUnit,
		marginLink,
		tabletMarginLink,
		mobileMarginLink,
		marginLinkUnit,
		paddingDropdownLink,
		tabletPaddingDropdownLink,
		mobilePaddingDropdownLink,
		paddingDropdownLinkUnit,
		marginDropdownLink,
		tabletMarginDropdownLink,
		mobileMarginDropdownLink,
		marginDropdownLinkUnit,
		orientation,
		orientationTablet,
		orientationMobile,
		style,
		styleTablet,
		styleMobile,
		spacing,
		spacingTablet,
		spacingMobile,
		spacingUnit,
		stretch,
		fillStretch,
		parentActive,
		parentActiveTablet,
		parentActiveMobile,
		linkColor,
		linkColorHover,
		linkColorActive,
		linkColorTablet,
		linkColorHoverTablet,
		linkColorActiveTablet,
		linkColorMobile,
		linkColorHoverMobile,
		linkColorActiveMobile,
		background,
		backgroundHover,
		backgroundActive,
		backgroundTablet,
		backgroundHoverTablet,
		backgroundActiveTablet,
		backgroundMobile,
		backgroundHoverMobile,
		backgroundActiveMobile,
		linkColorDropdown,
		linkColorDropdownHover,
		linkColorDropdownActive,
		linkColorDropdownTablet,
		linkColorDropdownHoverTablet,
		linkColorDropdownActiveTablet,
		linkColorDropdownMobile,
		linkColorDropdownHoverMobile,
		linkColorDropdownActiveMobile,
		backgroundDropdown,
		backgroundDropdownHover,
		backgroundDropdownActive,
		backgroundDropdownTablet,
		backgroundDropdownHoverTablet,
		backgroundDropdownActiveTablet,
		backgroundDropdownMobile,
		backgroundDropdownHoverMobile,
		backgroundDropdownActiveMobile,
		linkColorTransparent,
		linkColorTransparentHover,
		linkColorTransparentActive,
		linkColorTransparentTablet,
		linkColorTransparentHoverTablet,
		linkColorTransparentActiveTablet,
		linkColorTransparentMobile,
		linkColorTransparentHoverMobile,
		linkColorTransparentActiveMobile,
		backgroundTransparent,
		backgroundTransparentHover,
		backgroundTransparentActive,
		backgroundTransparentTablet,
		backgroundTransparentHoverTablet,
		backgroundTransparentActiveTablet,
		backgroundTransparentMobile,
		backgroundTransparentHoverMobile,
		backgroundTransparentActiveMobile,
		linkColorSticky,
		linkColorStickyHover,
		linkColorStickyActive,
		linkColorStickyTablet,
		linkColorStickyHoverTablet,
		linkColorStickyActiveTablet,
		linkColorStickyMobile,
		linkColorStickyHoverMobile,
		linkColorStickyActiveMobile,
		backgroundSticky,
		backgroundStickyHover,
		backgroundStickyActive,
		backgroundStickyTablet,
		backgroundStickyHoverTablet,
		backgroundStickyActiveTablet,
		backgroundStickyMobile,
		backgroundStickyHoverMobile,
		backgroundStickyActiveMobile,
		typography,
		dropdownTypography,
		collapseSubMenus,
		parentTogglesMenus,
		divider,
		dividerTablet,
		dividerMobile,
		dropdownDivider,
		dropdownDividerTablet,
		dropdownDividerMobile,
		transparentDivider,
		transparentDividerTablet,
		transparentDividerMobile,
		stickyDivider,
		stickyDividerTablet,
		stickyDividerMobile,
		dropdownWidth,
		dropdownWidthTablet,
		dropdownWidthMobile,
		dropdownWidthUnit,
		dropdownVerticalSpacing,
		dropdownVerticalSpacingTablet,
		dropdownVerticalSpacingMobile,
		dropdownVerticalSpacingUnit,
		dropdownHorizontalAlignment,
		dropdownHorizontalAlignmentTablet,
		dropdownHorizontalAlignmentMobile,
		dropdownShadow,
		dropdownBorder,
		dropdownBorderTablet,
		dropdownBorderMobile,
		dropdownBorderRadius,
		dropdownBorderRadiusTablet,
		dropdownBorderRadiusMobile,
		dropdownBorderRadiusUnit,
	} = metaAttributes;

	const css = new KadenceBlocksCSS();

	const navigationHorizontalSpacing = spacing[1];
	const navigationHorizontalSpacingTablet = spacingTablet[1];
	const navigationHorizontalSpacingMobile = spacingMobile[1];
	const previewNavigationHorizontalSpacing = getPreviewSize(
		previewDevice,
		navigationHorizontalSpacing,
		navigationHorizontalSpacingTablet,
		navigationHorizontalSpacingMobile
	);
	const navigationVerticalSpacing = spacing[0];
	const navigationVerticalSpacingTablet = spacingTablet[0];
	const navigationVerticalSpacingMobile = spacingMobile[0];
	const previewNavigationVerticalSpacing = getPreviewSize(
		previewDevice,
		navigationVerticalSpacing,
		navigationVerticalSpacingTablet,
		navigationVerticalSpacingMobile
	);

	const inTemplatePreviewMode = !id && templateKey;
	const previewOrientation = inTemplatePreviewMode
		? templateKey.includes('vertical')
			? 'vertical'
			: 'horizontal'
		: getPreviewSize(previewDevice, orientation, orientationTablet, orientationMobile);
	const previewStyle = getPreviewSize(previewDevice, style, styleTablet, styleMobile);
	const previewParentActive = getPreviewSize(previewDevice, parentActive, parentActiveTablet, parentActiveMobile);
	const previewDropdownWidth = getPreviewSize(previewDevice, dropdownWidth, dropdownWidthTablet, dropdownWidthMobile);
	const previewLinkColor = getPreviewSize(previewDevice, linkColor, linkColorTablet, linkColorMobile);
	const previewBackground = getPreviewSize(previewDevice, background, backgroundTablet, backgroundMobile);
	const previewLinkColorHover = getPreviewSize(
		previewDevice,
		linkColorHover,
		linkColorHoverTablet,
		linkColorHoverMobile
	);
	const previewBackgroundHover = getPreviewSize(
		previewDevice,
		backgroundHover,
		backgroundHoverTablet,
		backgroundHoverMobile
	);
	const previewLinkColorActive = getPreviewSize(
		previewDevice,
		linkColorActive,
		linkColorActiveTablet,
		linkColorActiveMobile
	);
	const previewBackgroundActive = getPreviewSize(
		previewDevice,
		backgroundActive,
		backgroundActiveTablet,
		backgroundActiveMobile
	);
	const previewLinkColorDropdown = getPreviewSize(
		previewDevice,
		linkColorDropdown,
		linkColorDropdownTablet,
		linkColorDropdownMobile
	);
	const previewBackgroundDropdown = getPreviewSize(
		previewDevice,
		backgroundDropdown,
		backgroundDropdownTablet,
		backgroundDropdownMobile
	);
	const previewLinkColorDropdownHover = getPreviewSize(
		previewDevice,
		linkColorDropdownHover,
		linkColorDropdownHoverTablet,
		linkColorDropdownHoverMobile
	);
	const previewBackgroundDropdownHover = getPreviewSize(
		previewDevice,
		backgroundDropdownHover,
		backgroundDropdownHoverTablet,
		backgroundDropdownHoverMobile
	);
	const previewLinkColorDropdownActive = getPreviewSize(
		previewDevice,
		linkColorDropdownActive,
		linkColorDropdownActiveTablet,
		linkColorDropdownActiveMobile
	);
	const previewBackgroundDropdownActive = getPreviewSize(
		previewDevice,
		backgroundDropdownActive,
		backgroundDropdownActiveTablet,
		backgroundDropdownActiveMobile
	);
	const previewLinkColorTransparent = getPreviewSize(
		previewDevice,
		linkColorTransparent,
		linkColorTransparentTablet,
		linkColorTransparentMobile
	);
	const previewBackgroundTransparent = getPreviewSize(
		previewDevice,
		backgroundTransparent,
		backgroundTransparentTablet,
		backgroundTransparentMobile
	);
	const previewLinkColorTransparentHover = getPreviewSize(
		previewDevice,
		linkColorTransparentHover,
		linkColorTransparentHoverTablet,
		linkColorTransparentHoverMobile
	);
	const previewBackgroundTransparentHover = getPreviewSize(
		previewDevice,
		backgroundTransparentHover,
		backgroundTransparentHoverTablet,
		backgroundTransparentHoverMobile
	);
	const previewLinkColorTransparentActive = getPreviewSize(
		previewDevice,
		linkColorTransparentActive,
		linkColorTransparentActiveTablet,
		linkColorTransparentActiveMobile
	);
	const previewBackgroundTransparentActive = getPreviewSize(
		previewDevice,
		backgroundTransparentActive,
		backgroundTransparentActiveTablet,
		backgroundTransparentActiveMobile
	);
	const previewLinkColorSticky = getPreviewSize(
		previewDevice,
		linkColorSticky,
		linkColorStickyTablet,
		linkColorStickyMobile
	);
	const previewBackgroundSticky = getPreviewSize(
		previewDevice,
		backgroundSticky,
		backgroundStickyTablet,
		backgroundStickyMobile
	);
	const previewLinkColorStickyHover = getPreviewSize(
		previewDevice,
		linkColorStickyHover,
		linkColorStickyHoverTablet,
		linkColorStickyHoverMobile
	);
	const previewBackgroundStickyHover = getPreviewSize(
		previewDevice,
		backgroundStickyHover,
		backgroundStickyHoverTablet,
		backgroundStickyHoverMobile
	);
	const previewLinkColorStickyActive = getPreviewSize(
		previewDevice,
		linkColorStickyActive,
		linkColorStickyActiveTablet,
		linkColorStickyActiveMobile
	);
	const previewBackgroundStickyActive = getPreviewSize(
		previewDevice,
		backgroundStickyActive,
		backgroundStickyActiveTablet,
		backgroundStickyActiveMobile
	);
	const previewDropdownVerticalSpacing = getPreviewSize(
		previewDevice,
		dropdownVerticalSpacing,
		dropdownVerticalSpacingTablet,
		dropdownVerticalSpacingMobile
	);

	const previewDropdownBorderTopLeftRadius = getPreviewSize(
		previewDevice,
		undefined !== dropdownBorderRadius ? dropdownBorderRadius[0] : '',
		undefined !== dropdownBorderRadiusTablet ? dropdownBorderRadiusTablet[0] : '',
		undefined !== dropdownBorderRadiusMobile ? dropdownBorderRadiusMobile[0] : ''
	);
	const previewDropdownBorderTopRightRadius = getPreviewSize(
		previewDevice,
		undefined !== dropdownBorderRadius ? dropdownBorderRadius[1] : '',
		undefined !== dropdownBorderRadiusTablet ? dropdownBorderRadiusTablet[1] : '',
		undefined !== dropdownBorderRadiusMobile ? dropdownBorderRadiusMobile[1] : ''
	);
	const previewDropdownBorderBottomRightRadius = getPreviewSize(
		previewDevice,
		undefined !== dropdownBorderRadius ? dropdownBorderRadius[2] : '',
		undefined !== dropdownBorderRadiusTablet ? dropdownBorderRadiusTablet[2] : '',
		undefined !== dropdownBorderRadiusMobile ? dropdownBorderRadiusMobile[2] : ''
	);
	const previewDropdownBorderBottomLeftRadius = getPreviewSize(
		previewDevice,
		undefined !== dropdownBorderRadius ? dropdownBorderRadius[3] : '',
		undefined !== dropdownBorderRadiusTablet ? dropdownBorderRadiusTablet[3] : '',
		undefined !== dropdownBorderRadiusMobile ? dropdownBorderRadiusMobile[3] : ''
	);
	const previewDropdownHorizontalAlignment = getPreviewSize(
		previewDevice,
		dropdownHorizontalAlignment,
		dropdownHorizontalAlignmentTablet,
		dropdownHorizontalAlignmentMobile
	);
	//need to caclulate this outside of conditionals because it uses a hook underneath.
	const dividerValue = css.render_border(divider, dividerTablet, dividerMobile, previewDevice, 'bottom');
	const dropdownDividerValue = css.render_border(
		dropdownDivider,
		dropdownDividerTablet,
		dropdownDividerMobile,
		previewDevice,
		'bottom'
	);
	const transparentDividerValue = css.render_border(
		transparentDivider,
		transparentDividerTablet,
		transparentDividerMobile,
		previewDevice,
		'bottom'
	);
	const stickyDividerValue = css.render_border(
		stickyDivider,
		stickyDividerTablet,
		stickyDividerMobile,
		previewDevice,
		'bottom'
	);

	//no added specificty needed for these variables
	//these variable will slot into selectors found in the static stylesheet.
	css.set_selector(`.wp-block-kadence-navigation${uniqueID}`);
	css.render_measure_output(
		paddingDropdown,
		tabletPaddingDropdown,
		mobilePaddingDropdown,
		previewDevice,
		'--kb-nav-dropdown-padding',
		paddingDropdownUnit
	);
	css.render_measure_output(
		marginDropdown,
		tabletMarginDropdown,
		mobileMarginDropdown,
		previewDevice,
		'--kb-nav-dropdown-margin',
		marginDropdownUnit
	);
	css.add_property(
		'--kb-nav-link-padding-left',
		css.render_half_size(previewNavigationHorizontalSpacing, spacingUnit),
		previewNavigationHorizontalSpacing
	);
	css.add_property(
		'--kb-nav-link-padding-right',
		css.render_half_size(previewNavigationHorizontalSpacing, spacingUnit),
		previewNavigationHorizontalSpacing
	);

	css.add_property(
		'--kb-nav-link-underline-width',
		'calc( 100% - ' + css.render_size(previewNavigationHorizontalSpacing, spacingUnit) + ' )',
		previewNavigationHorizontalSpacing
	);
	css.add_property('--kb-nav-top-link-color', css.render_color(previewLinkColor), previewLinkColor);
	css.add_property('--kb-nav-top-link-color-hover', css.render_color(previewLinkColorHover), previewLinkColorHover);
	css.add_property(
		'--kb-nav-top-link-color-active',
		css.render_color(previewLinkColorActive),
		previewLinkColorActive
	);
	css.add_property(
		'--kb-nav-top-link-color-active-ancestor',
		css.render_color(previewLinkColorActive),
		previewParentActive && previewLinkColorActive
	);
	css.add_property(
		'--kb-nav-dropdown-link-color',
		css.render_color(previewLinkColorDropdown),
		previewLinkColorDropdown
	);
	css.add_property(
		'--kb-nav-dropdown-link-color-hover',
		css.render_color(previewLinkColorDropdownHover),
		previewLinkColorDropdownHover
	);
	css.add_property(
		'--kb-nav-dropdown-link-color-active',
		css.render_color(previewLinkColorDropdownActive),
		previewLinkColorDropdownActive
	);
	css.add_property(
		'--kb-nav-dropdown-link-color-active-ancestor',
		css.render_color(previewLinkColorDropdownActive),
		previewParentActive && previewLinkColorDropdownActive
	);

	css.add_property('--kb-nav-dropdown-background', css.render_color(previewBackgroundDropdown));
	css.add_property('--kb-nav-dropdown-link-background-hover', css.render_color(previewBackgroundDropdownHover));
	css.add_property('--kb-nav-dropdown-link-background-active', css.render_color(previewBackgroundDropdownActive));

	css.add_property(
		'--kb-nav-dropdown-border-top',
		css.render_border(dropdownBorder, dropdownBorderTablet, dropdownBorderMobile, previewDevice, 'top')
	);
	css.add_property(
		'--kb-nav-dropdown-border-right',
		css.render_border(dropdownBorder, dropdownBorderTablet, dropdownBorderMobile, previewDevice, 'right')
	);
	css.add_property(
		'--kb-nav-dropdown-border-bottom',
		css.render_border(dropdownBorder, dropdownBorderTablet, dropdownBorderMobile, previewDevice, 'bottom')
	);
	css.add_property(
		'--kb-nav-dropdown-border-left',
		css.render_border(dropdownBorder, dropdownBorderTablet, dropdownBorderMobile, previewDevice, 'left')
	);
	css.add_property(
		'--kb-nav-dropdown-border-radius-top',
		getSpacingOptionOutput(previewDropdownBorderTopLeftRadius, dropdownBorderRadiusUnit)
	);
	css.add_property(
		'--kb-nav-dropdown-border-radius-right',
		getSpacingOptionOutput(previewDropdownBorderTopRightRadius, dropdownBorderRadiusUnit)
	);
	css.add_property(
		'--kb-nav-dropdown-border-radius-bottom',
		getSpacingOptionOutput(previewDropdownBorderBottomRightRadius, dropdownBorderRadiusUnit)
	);
	css.add_property(
		'--kb-nav-dropdown-border-radius-left',
		getSpacingOptionOutput(previewDropdownBorderBottomLeftRadius, dropdownBorderRadiusUnit)
	);

	//additional dynamic logic, but still lands in a slot in the static stylesheet
	if (
		(previewOrientation == 'vertical' ||
			previewStyle === 'standard' ||
			previewStyle === 'underline' ||
			previewStyle === '') &&
		!isNaN(parseFloat(previewNavigationVerticalSpacing)) &&
		isFinite(previewNavigationVerticalSpacing)
	) {
		css.add_property(
			'--kb-nav-link-padding-top',
			css.render_half_size(previewNavigationVerticalSpacing, spacingUnit)
		);
		css.add_property(
			'--kb-nav-link-padding-bottom',
			css.render_half_size(previewNavigationVerticalSpacing, spacingUnit)
		);
	}

	if (previewOrientation != 'vertical') {
		css.add_property('--kb-nav-dropdown-link-width', css.render_size(previewDropdownWidth, dropdownWidthUnit));
		css.add_property('--kb-nav-top-not-last-link-border-right', dividerValue);

		if (dropdownShadow?.[0]?.enable) {
			css.add_property('--kb-nav-dropdown-box-shadow', css.render_shadow(dropdownShadow[0]));
		}

		//sub menus (first level only)
		css.set_selector(
			`.wp-block-kadence-navigation${uniqueID} > .navigation > .menu-container > .menu > .menu-item > .sub-menu`
		);
		if (previewDropdownHorizontalAlignment == 'center') {
			css.add_property('--kb-nav-dropdown-show-left', '50%');
			css.add_property('--kb-nav-dropdown-show-transform', 'translate(-50%, 0)');
		} else if (previewDropdownHorizontalAlignment == 'right') {
			css.add_property('--kb-nav-dropdown-show-right', '0');
		}
	} else {
		css.add_property('--kb-nav-link-border-bottom', dividerValue);
		css.add_property('--kb-nav-dropdown-toggle-border-left', dividerValue);
	}

	//placement logic where an additional selector is needed
	//container styles
	const containerActiveSelector = previewParentActive
		? `.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-item > .kb-link-wrap,
			.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-ancestor > .kb-link-wrap`
		: `.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-item > .kb-link-wrap`;
	css.render_button_styles_with_states(
		{
			backgroundBase: 'background',
			backgroundTypeBase: 'backgroundType',
			backgroundGradientBase: 'backgroundGradient',
			borderBase: 'border',
			borderRadiusBase: 'borderRadius',
			borderRadiusUnitBase: 'borderRadiusUnit',
			shadowBase: 'shadow',
			selector: `.wp-block-kadence-navigation${uniqueID} .menu-container > ul > li.menu-item > .kb-link-wrap`,
			selectorHover: `.wp-block-kadence-navigation${uniqueID} .menu-container > ul > li.menu-item > .kb-link-wrap:hover`,
			selectorActive: containerActiveSelector,
		},
		metaAttributes,
		previewDevice
	);

	if (isSelected) {
		css.set_selector(
			`.block-editor-block-popover__inbetween-container .block-editor-block-list__insertion-point.is-with-inserter`
		);
		css.add_property('display', 'none');
	}

	//nav item link(top level only)
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} > .navigation > .menu-container > .menu >  .menu-item > .kb-link-wrap > .kb-nav-link-content`
	);
	if (context?.['kadence/headerIsTransparent'] == '1') {
		css.add_property('color', css.render_color(previewLinkColorTransparent));
	}
	if (context?.['kadence/headerIsSticky'] == '1') {
		css.add_property('color', css.render_color(previewLinkColorSticky));
	}
	css.render_measure_output(
		paddingLink,
		tabletPaddingLink,
		mobilePaddingLink,
		previewDevice,
		'--kb-nav-link-padding',
		paddingLinkUnit
	);
	css.render_measure_output(
		marginLink,
		tabletMarginLink,
		mobileMarginLink,
		previewDevice,
		'--kb-nav-link-margin',
		marginLinkUnit
	);

	//nav item container (top level only)
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} > .navigation > .menu-container > .menu > .menu-item > .kb-link-wrap`
	);
	if (context?.['kadence/headerIsTransparent'] == '1') {
		css.add_property('background', css.render_color(previewBackgroundTransparent));
	}
	if (context?.['kadence/headerIsSticky'] == '1') {
		css.add_property('background', css.render_color(previewBackgroundSticky));
	}

	//nav item link hover (top level only)
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .menu-container > ul > li.menu-item > .kb-link-wrap:hover > a, .wp-block-kadence-navigation${uniqueID} .menu-container > ul > li.menu-item > .kb-link-wrap:hover`
	);
	if (context?.['kadence/headerIsTransparent'] == '1') {
		css.add_property('color', css.render_color(previewLinkColorTransparentHover));
	}
	if (context?.['kadence/headerIsSticky'] == '1') {
		css.add_property('color', css.render_color(previewLinkColorStickyHover));
	}
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .menu-container > ul > li.menu-item > .kb-link-wrap:hover`
	);
	if (context?.['kadence/headerIsTransparent'] == '1') {
		css.add_property('background', css.render_color(previewBackgroundTransparentHover));
	}
	if (context?.['kadence/headerIsSticky'] == '1') {
		css.add_property('background', css.render_color(previewBackgroundStickyHover));
	}

	if (previewParentActive) {
		css.set_selector(
			`.wp-block-kadence-navigation${uniqueID} .navigation[class*="navigation-style-underline"] .menu-container.menu-container>ul>li.current-menu-ancestor>a:after`
		);
		css.add_property('transform', 'scale(1, 1) translate(50%, 0)');
		css.set_selector(
			`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-item > .kb-link-wrap > a,
			.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-item > .kb-link-wrap,
			.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-ancestor > .kb-link-wrap > a,
			.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-ancestor > .kb-link-wrap`
		);
	} else {
		css.set_selector(
			`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-item > .kb-link-wrap > a,
			.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul > li.menu-item.current-menu-item > .kb-link-wrap`
		);
	}
	if (context?.['kadence/headerIsTransparent'] == '1') {
		css.add_property('color', css.render_color(previewLinkColorTransparentActive));
	}
	if (context?.['kadence/headerIsSticky'] == '1') {
		css.add_property('color', css.render_color(previewLinkColorStickyActive));
	}

	css.set_selector(containerActiveSelector);
	if (context?.['kadence/headerIsTransparent'] == '1') {
		css.add_property('background', css.render_color(previewBackgroundTransparentActive));
	}
	if (context?.['kadence/headerIsSticky'] == '1') {
		css.add_property('background', css.render_color(previewBackgroundStickyActive));
	}

	//can't do a slot/css var with this one. "right" messes with the margin-inline positioning.
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > .menu > .menu-item .kb-nav-dropdown-toggle-btn`
	);
	css.add_property('right', css.render_half_size(previewNavigationHorizontalSpacing, spacingUnit));

	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container > ul li.menu-item > .kb-link-wrap > a`
	);
	css.render_font(typography ? typography : [], previewDevice);

	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container ul ul li:not(:last-of-type), .wp-block-kadence-navigation${uniqueID} .menu-container ul.menu > li.kadence-menu-mega-enabled > ul > li.menu-item > a`
	);
	css.add_property('--kb-nav-menu-item-border-bottom', dropdownDividerValue);
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container ul ul li.menu-item > .kb-link-wrap > a`
	);
	css.add_property('padding-top', css.render_size(previewDropdownVerticalSpacing, dropdownVerticalSpacingUnit));
	css.add_property('padding-bottom', css.render_size(previewDropdownVerticalSpacing, dropdownVerticalSpacingUnit));
	css.render_font(dropdownTypography ? dropdownTypography : [], previewDevice);

	//dropdown nav item
	css.set_selector(
		`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container ul ul li.menu-item > .kb-link-wrap > a, .wp-block-kadence-navigation${uniqueID} .navigation .menu-container ul ul.sub-menu `
	);
	css.render_measure_output(
		paddingDropdownLink,
		tabletPaddingDropdownLink,
		mobilePaddingDropdownLink,
		previewDevice,
		'--kb-nav-link-padding',
		paddingDropdownLinkUnit
	);
	css.render_measure_output(
		marginDropdownLink,
		tabletMarginDropdownLink,
		mobileMarginDropdownLink,
		previewDevice,
		'--kb-nav-link-margin',
		marginDropdownLinkUnit
	);

	//New Logic for block
	if (previewOrientation == 'vertical') {
		css.set_selector(`.wp-block-kadence-navigation${uniqueID} .navigation .menu-container ul li .kb-link-wrap`);
		if (context?.['kadence/headerIsTransparent'] == '1') {
			css.add_property('border-bottom', transparentDividerValue);
		}
		if (context?.['kadence/headerIsSticky'] == '1') {
			css.add_property('border-bottom', stickyDividerValue);
		}
		css.set_selector(
			`.wp-block-kadence-navigation${uniqueID} .navigation:not(.drawer-navigation-parent-toggle-true) ul li .kb-link-wrap button`
		);
		if (context?.['kadence/headerIsTransparent'] == '1') {
			css.add_property('border-left', transparentDividerValue);
		}
		if (context?.['kadence/headerIsSticky'] == '1') {
			css.add_property('border-left', stickyDividerValue);
		}
	} else {
		css.set_selector(
			`.wp-block-kadence-navigation${uniqueID} .navigation > .menu-container > ul > li:not(:last-of-type) > .kb-link-wrap`
		);
		if (context?.['kadence/headerIsTransparent'] == '1') {
			css.add_property('border-right', transparentDividerValue);
		}
		if (context?.['kadence/headerIsSticky'] == '1') {
			css.add_property('border-right', stickyDividerValue);
		}
	}

	//main container
	css.set_selector(`.wp-block-kadence-navigation${uniqueID} > .navigation > .menu-container > .menu`);
	css.render_measure_output(margin, tabletMargin, mobileMargin, previewDevice, '--kb-nav-margin', marginUnit);
	css.render_measure_output(padding, tabletPadding, mobilePadding, previewDevice, '--kb-nav-padding', paddingUnit);

	if (previewStyle.includes('fullheight')) {
		css.set_selector(`.wp-block-kadence-header .wp-block-kadence-navigation${uniqueID}`);
		css.add_property('height', '100%');
	}

	const cssOutput = css.css_output();

	return <style>{`${cssOutput}`}</style>;
}
