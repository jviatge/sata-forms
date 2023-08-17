<?php

/*
  Plugin Name: Sata-forms
  Version: 1.1.0
  Author: Jviatge
  Author URI: https://github.com/jviatge
  Description: Formulaire dynamique pour contacter une API
*/

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class template {

  function __construct() {
    add_action('init', array($this, 'onInit'));
    add_action('elementor/widgets/register', array($this, 'widgetElementor') );
  }

  public function encrypt_decrypt($action, $string, $secret_key) {
		$output = false;
		$encrypt_method = "AES-256-CBC";
		$secret_iv = 'This is my secret iv';
		$key = hash('sha256', $secret_key);
		$iv = substr(hash('sha256', $secret_iv), 0, 16);
		if ($action == 'encrypt') {
			$output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
			$output = base64_encode($output);
		} else if ($action == 'decrypt') {
			$output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
		}
		return $output;
	}

  // ELEMENTOR WIDGET
  function widgetElementor( $widgets_manager ) {

    wp_register_script('sataFormsMakeUpBuildIndexJS', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('sataFormsMakeUpBuildIndexCSS', plugin_dir_url(__FILE__) . 'build/index.css');

    require_once( __DIR__ . '/elementor-widget.php' );
  
    $widgets_manager->register( new \Elementor_Form_Widget() );
  
  }

  function onInit() {

    wp_register_script('sataFormsMakeUpBuildIndexJS', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
    wp_register_style('sataFormsMakeUpBuildIndexCSS', plugin_dir_url(__FILE__) . 'build/index.css');

    
    if ( isset( $_POST['cf-submitted'] ) ) {

      // DO SOMETHING WITH THE DATA
      //$url = 'http://192.168.0.159:4000/api/v1/users';
      //$url = 'http://192.168.1.100:4000/api/v1/users';
      $honeyPot = $_POST['age'];
      if ($honeyPot != "") {
        wp_redirect( home_url($_SERVER['REQUEST_URI']) . '&form_send=0' );
        exit();
      }

      $confCrypt = explode(" ", $_POST['conf-key']);

      $url = $this->encrypt_decrypt("decrypt",$confCrypt[0],"qsppiUO545sfq964klcxsH");
      $tokenAuth = $this->encrypt_decrypt("decrypt",$confCrypt[1],"qsppiUO545sfq964klcxsH");

      $data = [
        'origin' => "groupes",
        'group_name' => sanitize_text_field($_POST['group_name']), 
        'first_name' => sanitize_text_field($_POST['first_name']),
        'last_name' => sanitize_text_field($_POST['last_name']),
        'email' => sanitize_text_field($_POST['email']),
        'phone' => sanitize_text_field($_POST['phone']),
        'other_phone' => sanitize_text_field($_POST['other_phone']),
        'departure_place' => sanitize_text_field($_POST['departure_place']),
        'destination' => sanitize_text_field($_POST['destination']),
        'departure_date' => date('Y-m-d H:i:s',strtotime(sanitize_text_field($_POST['departure_date']))),
        'number_of_participants' => sanitize_text_field($_POST['number_of_participants']),
        'budget'  => sanitize_text_field($_POST['budget']),
        'number_of_night' => sanitize_text_field($_POST['number_of_night']),
        'comments' => sanitize_text_field($_POST['comments']),
      ];

      print_r($data);

      $response = wp_remote_post($url, array(
        'method'  => 'POST',
        'body'    => wp_json_encode($data),
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Basic ' . $tokenAuth,
        ),
      ));

      if (!$response) {
        $form_succes_send = false;
      };
      
      // REDIRECT TO SAME PAGE WITH SUCCESS MESSAGE
      ob_get_clean();
      
      wp_redirect( home_url($_SERVER['REQUEST_URI']) . '&form_send=' . $form_succes_send );
      exit();
    }

    register_block_type('makeupnamespace/make-up-block-name', array(
      'render_callback' => array($this, 'renderCallback'),
      'editor_script' => 'sataFormsMakeUpBuildIndexJS',
      'editor_style' => 'sataFormsMakeUpBuildIndexCSS'
    ));
  }

  function renderCallback($attributes) {

    if (!is_admin()) {
      wp_enqueue_script('sataFormsAppJS', plugin_dir_url(__FILE__) . 'build/App.jsx.js', array('wp-element'));
      wp_enqueue_style('sataFormsIndexCSS', plugin_dir_url(__FILE__) . 'build/index.css');
    }

    // success | error | notsend
    $form_send = "notsend";

    //print_r($attributes); 
    ob_start(); ?>
    <div class="sata-forms-container">
      <pre style="display: none;">
        <?php
				$data = array(
          'form_send' => $form_send,
					'title' => $attributes['title'],
					'api_url' => $this->encrypt_decrypt("encrypt",$attributes['api_url'],"qsppiUO545sfq964klcxsH"),
					'token_auth' => $this->encrypt_decrypt("encrypt",$attributes['token_auth'],"qsppiUO545sfq964klcxsH")
				);
				echo wp_json_encode($data);
				?>
      </pre>
    </div>
    <?php return ob_get_clean();
  }
}

$template = new template();