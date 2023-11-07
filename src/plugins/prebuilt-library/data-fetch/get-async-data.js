/**
 * WordPress dependencies
 */
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { __ } from '@wordpress/i18n';
import { SafeParseJSON } from '@kadence/helpers';
const API_ROUTE_GET_IMAGES = '/kb-design-library/v1/get_images';

var { kadence_blocks_params } = window;

export function getAsyncData() {
	const [ isLoadingWizard, setLoadingWizard ] = useState(false);
	const [ isLoadingImages, setLoadingImages ] = useState(false);
	const [ isLoadingAI, setLoadingAI ] = useState(false);
	const [ error, setError ] = useState(false);

	let data_key     = ( undefined !== kadence_blocks_params && kadence_blocks_params?.proData && kadence_blocks_params?.proData?.api_key ? kadence_blocks_params.proData.api_key : '' );
	let data_email   = ( undefined !== kadence_blocks_params && kadence_blocks_params?.proData && kadence_blocks_params?.proData?.api_email ? kadence_blocks_params.proData.api_email : '' );
	const product_id = ( undefined !== kadence_blocks_params && kadence_blocks_params?.proData && kadence_blocks_params?.proData?.product_id ? kadence_blocks_params.proData.product_id : '' );
	if ( ! data_key ) {
		data_key = (  undefined !== kadence_blocks_params && kadence_blocks_params?.proData && kadence_blocks_params?.proData?.ithemes_key ? kadence_blocks_params.proData.ithemes_key : '' );
		if ( data_key ) {
			data_email = 'iThemes';
		}
	}
	/**
	 * Get remaining credits.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getAvailableCredits() {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get_remaining_credits', {
					api_key: data_key,
					api_email: data_email,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'error';
		}
	}
	/**
	 * Save wizard data to Wordpress options table.
	 *
	 * @return {Promise<boolean>}
	 */
	async function saveAIWizardData(data) {
		setLoadingWizard(true);
		setError(false);

		try {
			const response = await apiFetch({
				path: '/wp/v2/settings',
				method: 'POST',
				data: { kadence_blocks_prophecy: JSON.stringify(data) }
			});

			if (response) {
				setLoadingWizard(false);

				return true;
			}
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			setLoadingWizard(false);
			setError(true);

			return false;
		}
	}

	/**
	 * Get wizard data from database.
	 *
	 * @return {Promise<object>}
	 */
	async function getAIWizardData() {
		setLoadingWizard(true);
		setError(false);

		try {
			const response = await apiFetch({
				path: '/wp/v2/settings',
				method: 'GET',
			});

			if (response) {
				setLoadingWizard(false);

				if (response?.kadence_blocks_prophecy) {
					return response.kadence_blocks_prophecy;
				}
			}
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			setLoadingWizard(false);
			setError(true);

			return {};
		}
	}

	/**
	 * Get photo collection by industry
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getCollectionByIndustry(userData) {
		if ( ! userData?.photoLibrary ) {
			return [];
		}
		// console.log(userData);
		const localGallery = userData?.customCollections && userData?.customCollections.some(item => item.value === userData?.photoLibrary) ? userData?.customCollections.find(item => item.value === userData?.photoLibrary) : false;
		if ( localGallery ) {
			const myImages = { data: [] };
			if ( localGallery?.galleries?.[0]?.images ) {
				const aImages = localGallery?.galleries?.[0]?.images.map( ( item, index ) => {
					if ( item?.sizes?.[1]?.src ) {
						return { sizes:[ { src: item.sizes[1].src } ]};
					}
					return { sizes:[ { src: item.url } ]};
				} );
				myImages.data.push( { images: aImages } );
			}
			if ( localGallery?.galleries?.[1]?.images ) {
				const bImages = localGallery?.galleries?.[1]?.images.map( ( item, index ) => {
					if ( item?.sizes?.[1]?.src ) {
						return { sizes:[ { src: item.sizes[1].src } ]};
					}
					return { sizes:[ { src: item.url } ]};
				} );
				myImages.data.push( { images: bImages } );
			}
			return myImages;
		}
		if ( 'aiGenerated' === userData?.photoLibrary ) {
			const industries = Array.isArray(userData.photoLibrary) ? userData?.photoLibrary : [ userData.photoLibrary ];
			try {
				const response = await apiFetch( {
					path: addQueryArgs( API_ROUTE_GET_IMAGES, {
						industries: industries,
						industry: userData?.imageSearchQuery,
						api_key: data_key,
					} ),
				} );
				const responseData = SafeParseJSON( response, false );
				if ( responseData ) {
					return { data:
						[{
							name: 'featured',
							images: responseData?.data?.images.slice(0, 12),
						},
						{
							name: 'background',
							images: responseData?.data?.images.slice(12, 24),
						}]
					};
				}
				return [];
			} catch (error) {
				console.log(`ERROR: ${ error }`);
			}
		}
		const industries = Array.isArray(userData.photoLibrary) ? userData?.photoLibrary : [ userData.photoLibrary ];
		try {
			const response = await apiFetch( {
				path: addQueryArgs( API_ROUTE_GET_IMAGES, {
					industries: industries,
					api_key: data_key,
				} ),
			} );
			const responseData = SafeParseJSON( response, false );
			// console.log(responseData);
			if ( responseData ) {
				return responseData;
			}
			return [];
		} catch (error) {
			console.log(`ERROR: ${ error }`);
		}
	}

	/**
	 * Get the AI content data from the server.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getAIContentData( context ) {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get', {
					context: context,
					api_key:data_key,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}

	/**
	 * Get the AI content data from the server.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getLocalAIContentData() {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get_all_items', {
					api_key:data_key,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}
	/**
	 * Get the AI content data from the server.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getInitialAIContent() {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get_initial_jobs' , {
					api_key:data_key,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}
	/**
	 * Force a reload of the AI content data.
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function loadVerticals() {
		const response = await apiFetch( {
			path: addQueryArgs( '/kb-design-library/v1/get_verticals', {
				api_key: data_key,
			} ),
		} );
		return response;
	};
	/**
	 * Force a reload of the AI content data.
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function loadCollections() {
		const response = await apiFetch( {
			path: addQueryArgs( '/kb-design-library/v1/get_image_collections', {
				api_key: data_key,
			} ),
		} );
		return response;
	}

	/**
	 * Force a reload of the AI content data.
	 *
	 * @param {(object)} context
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getAIContentDataReload( context ) {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get', {
					force_reload: true,
					context: context,
					api_key:data_key,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}

	/**
	 * Get Remaining Contexts, or All if forcing reload.
	 *
	 * @param {(object)} context
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getAIContentRemaining( reload = false ) {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get_remaining_jobs', {
					force_reload: reload,
					api_key:data_key,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}

	/**
	 * Get library data.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getPatterns( library, reload, library_url = null, key = null ) {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get_library', {
					force_reload: reload,
					library: library,
					library_url: library_url ? library_url : '',
					key: key ? key : library,
					api_key:data_key,
					api_email:data_email,
					product_id:product_id,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}
	/**
	 * Get library data.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getPattern( library, type, item_id, style, library_url = null, key = null ) {
		try {
			const response = await apiFetch( {
				path: addQueryArgs( '/kb-design-library/v1/get_pattern_content', {
					library: library,
					library_url: library_url ? library_url : '',
					key: key ? key : library,
					pattern_id: item_id ? item_id : '',
					pattern_type: type ? type : '',
					pattern_style: style ? style : '',
					api_key: data_key,
					api_email: data_email,
					product_id: product_id,
				} ),
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}
	/**
	 * Get local contexts.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function getLocalAIContexts() {
		try {
			const response = await apiFetch( {
				path: '/kb-design-library/v1/get_local_contexts',
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}
	/**
	 * Get library data.
	 *
	 * @param {(object)} userData
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function processPattern( content, imageCollection ) {
		try {
			const response = await apiFetch( {
				path: '/kb-design-library/v1/process_pattern',
				method: 'POST',
				data: {
					content: content,
					image_library: imageCollection,
				},
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}

	/**
	 * Send Event to Backend.
	 *
	 * @param {string} event
	 * @param {object} data
	 *
	 * @return {Promise<object>} Promise returns object
	 */
	async function sendEvent( event, data ) {
		try {
			const response = await apiFetch( {
				path: '/kb-design-library/v1/handle_event',
				method: 'POST',
				data: {
					event: event,
					data: data,
				},
			} );
			return response;
		} catch (error) {
			console.log(`ERROR: ${ error }`);
			return 'failed';
		}
	}

	return {
		error,
		getAIContentData,
		getLocalAIContentData,
		getAIContentDataReload,
		saveAIWizardData,
		getAIWizardData,
		getCollectionByIndustry,
		getPatterns,
		getPattern,
		processPattern,
		getLocalAIContexts,
		getInitialAIContent,
		getAIContentRemaining,
		getAvailableCredits,
		sendEvent,
	}
}

