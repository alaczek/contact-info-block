<?php

/**
 * Plugin Name: Contact Info Block
 * Plugin URI: 
 * Description: This is a plugin adds a simple Contact Info block.
 * Version: 0.1.0
 * Author: Aleksandra Bodera
 *
 * @package contact-info-block
 */

defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_editor_assets', 'contact_info_block_enqueue_block_editor_assets' );

function contact_info_block_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'contact-info-block',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_enqueue_style(
		'contact-info-block-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);
}

add_action( 'enqueue_block_assets', 'contact_info_block_enqueue_block_assets' );

function contact_info_block_enqueue_block_assets() {
	wp_enqueue_style(
		'contact-info-block',
		plugins_url( 'style.css', __FILE__ ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
}
