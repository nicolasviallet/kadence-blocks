/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Flex,
	FlexBlock,
	Spinner
} from '@wordpress/components';
import {
	useEffect,
	useState,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Button } from '..';

const styles = {
	wrapper: {
		boxSizing: 'border-box',
		width: '100%',
		padding: 32,
		paddingBottom: '16px',
		marginLeft: 'auto',
		marginRight: 'auto',
		border: '1px solid #DFDFDF',
		borderRadius: '4px',
		display: 'flex',
		flexDirection: 'column',
		gap: '24px',
	},
	gridWrapper: {
		maxHeight: '318px',
		overflow: 'hidden',
		overflowY: 'auto',
	},
	loading: {
		position: 'absolute',
		inset: '0 0 0 0',
		backgroundColor: 'rgba(255,255,255,0.95)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 1,
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr 1fr 1fr',
		gap: '16px'
	},
	square: {
		position: 'relative',
		width: '100%',
		height: '100%',
		backgroundColor: '#fcfcfc',
		backgroundSize: 'cover',
		aspectRatio: '1/1'
	},
	placeholder: {
		background: '#F5F5F5',
		height: '100%',
		width: '100%',
		zIndex: 2
	},
	img: {
		objectFit: 'cover',
		objectPosition: 'center',
		width: '100%',
		position: 'relative',
		zIndex: 2,
		aspectRatio: '1/1',
	},
	linkWrapper: {
		paddingTop: 16,
		textAlign: 'center',
		borderTop: '1px solid #DFDFDF'
	},
	contentWrapper: {
		gap: 8,
		textAlign: 'center'
	},
	title: {
		fontSize: '14px',
		fontWeight: 600
	},
	description: {
		fontSize: '14px',
		marginTop: '8px'
	},
}

export function PhotoCollection({ photos, collectionLink, title, description, updateCollection }) {
	const [photoGallery, setPhotoGallery] = useState();

	useEffect(() => {
		if(!photos) {
			setPhotoGallery([]);
			return;
		}

		const numPhotos = photos.length;
		if(numPhotos < 12) {
			const numToFill = 12 - numPhotos;
			const filledList = [
				...photos,
				...Array.from(Array(numToFill)).map((item, index) => ({ alt: `placeholder${index + 1}`}))
			];
			setPhotoGallery(filledList);
		} else {
			setPhotoGallery(photos);
		}
	}, [photos]);

	const mediaLibrary = window.wp.media({
		id: title,
        title: `Edit ${title}`,
        button: {
            text: 'Use These Images',
        },
		multiple: 'add',
    });

	mediaLibrary.on( 'select', function() {
		const selectedPhotos = mediaLibrary.state().get('selection').toJSON();
		const formattedPhotos = selectedPhotos.map((photo) => ({
			id: photo.id,
			alt: photo.alt || photo.name,
			sizes: [
				{ name: 'thumbnail', src: photo.sizes.thumbnail.url }
			]
		}));
		updateCollection(formattedPhotos);
	});


	return (
		<div
			style={ styles.wrapper }
		>
			<div style={ styles.contentWrapper }>
				<div style={ styles.title }>{ title} </div>
				<div style={ styles.description }>{ description }</div>
			</div>
			<div style={ styles.gridWrapper }>
				<div style={ styles.grid }>
					{ photoGallery && photoGallery.length > 0 ?
						photoGallery.map((image, index) => (
							<FlexBlock style={ styles.square } key={index}>
								<FlexBlock className="loading-behind-image" style={ styles.loading }>
									<Spinner />
								</FlexBlock>
								{
									image?.sizes ? (
										<img style={ styles.img } alt={ image.alt } src={ image.sizes[0].src } />
									) : (
										<FlexBlock style={{ ...styles.square, ...styles.placeholder }} key={image.alt} />
									)
								}
							</FlexBlock>
						)) : (
							Array.from('123456789ABC').map((item) => (
								<FlexBlock style={{ ...styles.square, ...styles.placeholder }} key={item} />
						)
					))}
				</div>
			</div>
			<Flex>
				<FlexBlock style={ styles.linkWrapper }>
					<Button
						variant="link"
						text={ __('Edit Collection', 'kadence') }
						target="_blank"
						onClick={ (_e) => mediaLibrary.open() }
						style={{ fontSize: '14px'}}
					/>
				</FlexBlock>
			</Flex>
		</div>
	);
}
