<?php
/**
 * Simple PHP Proxy for Essencia Inmobiliaria CRM XML Feed
 * Resolves CORS issues when hosted on a production PHP server.
 */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/xml; charset=utf-8");

$url = 'https://procesos.apinmo.com/portal/kyeroagencias3/1909-kyero-eCSz1ipe-facilitea.xml';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Ignore SSL errors if any
curl_setopt($ch, CURLOPT_USERAGENT, 'EssenciaFeedProxy/1.0');

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>Proxy error: " . curl_error($ch) . "</error>";
} else if ($httpCode >= 400) {
    http_response_code($httpCode);
    echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?><error>HTTP error $httpCode</error>";
} else {
    echo $response;
}

curl_close($ch);
?>
