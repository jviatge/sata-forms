<?php
class Elementor_Form_Widget extends \Elementor\Widget_Base {

	public function get_name() {
		return 'Form_widget';
	}

	public function get_title() {
		return esc_html__( "Sata-forms", 'elementor-addon' );
	}

	public function get_icon() {
		return 'eicon-form-horizontal';
	}

	public function get_categories() {
		return [ 'basic' ];
	}

	public function get_keywords() {
		return [ 'form', 'sata' ];
	}

	protected function register_controls() {

		// Content Tab Start

		$this->start_controls_section(
			'section_title',
			[
				'label' => esc_html__( 'Params', 'elementor-addon' ),
				'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'title',
			[
				'label' => esc_html__( 'Title', 'elementor-addon' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'My form api', 'elementor-addon' ),
			]
		);

		$this->add_control(
			'api_url',
			[
				'label' => esc_html__( 'Api url', 'elementor-addon' ),
				'type' => \Elementor\Controls_Manager::TEXT,
				'default' => esc_html__( 'https://my-web_site/api/endpoint', 'elementor-addon' ),
			]
		);

		$this->add_control(
			'token_auth',
			[
				'label' => esc_html__( 'Token auth', 'elementor-addon' ),
				'type' => \Elementor\Controls_Manager::TEXT
			]
		);

		$this->end_controls_section();

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

	protected function render() {

		wp_enqueue_script('sataFormsAppJS', plugin_dir_url(__FILE__) . 'build/App.jsx.js', array('wp-element'));
		wp_enqueue_style('sataFormsIndexCSS', plugin_dir_url(__FILE__) . 'build/index.css');

		$settings = $this->get_settings_for_display();

		// success | error | notsend
		$form_send = "notsend";

		?>
        <div class="sata-forms-container">
            <pre style="display: none;">
                <?php
				$data = array(
					'form_send' => $form_send,
					'title' => $settings['title'],
					'api_url' => $this->encrypt_decrypt("encrypt",$settings['api_url'],"qsppiUO545sfq964klcxsH"),
					'token_auth' => $this->encrypt_decrypt("encrypt",$settings['token_auth'],"qsppiUO545sfq964klcxsH")
				);
				echo wp_json_encode($data);
				?>
            </pre>
        </div>
		<?php
	}
}