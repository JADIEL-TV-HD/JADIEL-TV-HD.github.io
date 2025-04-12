<?php
if (!isset($_GET['url'])) {
    http_response_code(400);
    echo "URL não especificada.";
    exit;
}

$url = $_GET['url'];

$headers = [
    "User-Agent: Mozilla/5.0",
    "Accept: */*"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
$response = curl_exec($ch);

$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
curl_close($ch);

header("Content-Type: $contentType");
echo $response;
