<?php
/*
Plugin Name: Code Editor Block
*/
function my_custom_block_register_block() {

	// Register JavasScript File build/index.js
	wp_register_script(
		'code-editor-block',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	// Register editor style src/editor.css
	wp_register_style(
		'code-editor-block-editor-style',
		plugins_url( 'src/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' )
	);

	// Register front end block style src/style.css
	wp_register_style(
		'code-editor-block-frontend-style',
		plugins_url( 'src/style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' )
	);

	// Register your block
	register_block_type( 'code-editor/code-editor', array(
		'editor_script' => 'code-editor-block',
		'editor_style' => 'code-editor-block-editor-style',
		'style' => 'code-editor-block-frontend-style',
	) );

}

add_action( 'init', 'my_custom_block_register_block' );