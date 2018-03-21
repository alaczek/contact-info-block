/**
 * Contact Info Block
 *
 */
( function( blocks, i18n, element ) {
	var el = element.createElement,
		__ = i18n.__,
		RichText = wp.blocks.RichText,
		BlockControls = wp.blocks.BlockControls,
		//AlignmentToolbar = wp.blocks.AlignmentToolbar;
		BlockAlignmentToolbar = wp.blocks.BlockAlignmentToolbar,
		TextControl = wp.blocks.InspectorControls.TextControl;



	blocks.registerBlockType( 'contact-info/contact-info-block', {
		title: __( 'Example: Contact Info', 'contact-info-block' ),
		icon: 'universal-access-alt',
		category: 'layout',
		
		attributes: {
			address: {
				type: 'array',
				source: 'children',
				selector: '.contact-info-address',
			},
			phone: {
				type: 'array',
				source: 'children',
				selector: '.contact-info-phone',
			},
			email: {
				type: 'array',
				source: 'children',
				selector: '.contact-info-email'
			},
			alignment: {
				type: 'string',
				default: 'none',
			},
		},

		getEditWrapperProps( attributes ) {
			const { alignment } = attributes;
			if ( 'center' === alignment || 'wide' === alignment ) {
				return { 'data-align': alignment };
			}
		},


		edit: function( props ) {
			var phone = props.attributes.phone,
				address = props.attributes.address,
				email = props.attributes.email,
				alignment = props.attributes.alignment,
				className = props.className,
				isSelected = props.isSelected;

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}

			return [
				isSelected && el(
					BlockControls,
					{ key: 'toolbar' },
					el(
						BlockAlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
							controls: [ 'center', 'wide' ],
						}
					)
				),

				el( 'div', { className: `${ className } align${ alignment }` },
					el( 
						RichText, 
						{
							tagName: 'span',
							className: 'contact-info-address',
							inline: false,
							placeholder: i18n.__( 'Add address...' ),
							keepPlaceholderOnFocus: true,
							value: address,
							onChange: function( value ) {
								props.setAttributes( { address: value } );
							},
						} 
					),

					el(
						RichText,
						{
							tagName: 'span',
							className: 'contact-info-phone',
							placeholder: i18n.__( 'Add phone number...' ),
							keepPlaceholderOnFocus: true,
							value: phone,
							isSelected: props.isSelected,
							onChange: function( value ) {
								props.setAttributes( { phone: value } );
							},
						}
					),

					el(
						RichText,
						{
							tagName: 'span',
							className: 'contact-info-email',
							placeholder: i18n.__( 'Add email address...' ),
							keepPlaceholderOnFocus: true,
							value: email,
							isSelected: props.isSelected,
							onChange: function( value ) {
								props.setAttributes( { email: value } );
							},
						}
					),
				)
			];
		},

		save: function( props ) {
			var phone = props.attributes.phone,
				email = props.attributes.email,
				address = props.attributes.address,
				alignment = props.attributes.alignment;

			return ( 
				el( 'div', { className: `${ props.className } align${ alignment }` },
					el( 'span', { className: 'contact-info-address' }, address ), 
					el( 'span', { className: 'contact-info-phone' }, phone ),
					el( 'span', { className: 'contact-info-email' }, email ),
				)
			);
		},
	} );
} )(
	window.wp.blocks,
	window.wp.i18n,
	window.wp.element
);
