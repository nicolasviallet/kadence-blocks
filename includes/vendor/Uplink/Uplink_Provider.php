<?php declare( strict_types=1 );

namespace KadenceWP\KadenceBlocks\Uplink;

use KadenceWP\KadenceBlocks\StellarWP\ProphecyMonorepo\Container\Contracts\Provider;

final class Uplink_Provider extends Provider {

	/**
	 * Uplink library related functionality.
	 *
	 * @return void
	 */
	public function register(): void {
		$this->register_multisite_configuration();
	}

	/**
	 * Store tokens/license keys at the network level if the "kadence individual multisites" setting is disabled.
	 *
	 * @return void
	 */
	private function register_multisite_configuration(): void {
		add_action( 'init', static function(): void {
			$network_enabled = ! apply_filters( 'kadence_activation_individual_multisites', true );
			if ( ! $network_enabled && defined( 'KADENCE_ACTIVATION_NETWORK_ENABLED' ) && KADENCE_ACTIVATION_NETWORK_ENABLED ) {
				$network_enabled = true;
			}
			add_filter( 'stellarwp/uplink/kadence-blocks/allows_network_subfolder_license',
				static function () use ( $network_enabled ): bool {
					return $network_enabled;
				}, 10 );

			add_filter( 'stellarwp/uplink/kadence-blocks/allows_network_subdomain_license',
				static function () use ( $network_enabled ): bool {
					return $network_enabled;
				}, 10 );

			add_filter( 'stellarwp/uplink/kadence-blocks/allows_network_domain_mapping_license',
				static function () use ( $network_enabled ): bool {
					return $network_enabled;
				}, 10 );
		} );
	}

}
