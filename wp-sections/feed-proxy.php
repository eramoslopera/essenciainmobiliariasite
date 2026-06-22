<?php
/**
 * Proxy PHP para el feed XML del CRM de Essencia Inmobiliaria.
 * Resuelve las restricciones de CORS para permitir peticiones AJAX directas desde el navegador.
 *
 * Instrucciones:
 * 1. Sube este archivo a la carpeta raíz de tu servidor WordPress (ej. public_html/ o donde esté wp-config.php).
 * 2. En tus widgets de Elementor HTML, asegúrate de que la variable `XML_FEED_URL` apunte a '/feed-proxy.php'.
 */

// Permitir peticiones CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/xml; charset=utf-8");

// URL del XML del CRM (Kyero format)
$crm_url = 'https://procesos.apinmo.com/portal/kyeroagencias3/1909-kyero-eCSz1ipe-facilitea.xml';

// Iniciar cURL para descargar el XML
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $crm_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Evitar problemas con certificados SSL locales
curl_setopt($ch, CURLOPT_USERAGENT, 'EssenciaFeedProxy/1.0');

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Error del proxy: " . curl_error($ch) . "</error>";
} else if ($http_code >= 400) {
    http_response_code($http_code);
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Error del servidor CRM (HTTP $http_code)</error>";
} else {
    echo $response;
}

curl_close($ch);
?>
