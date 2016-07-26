<?php

error_reporting(E_ERROR);

$ss = $_GET["ss"];
if ($ss === FALSE || strlen($ss) < 20)
{
	echo "-";
	exit;
}

$ip = gethostbyname("msds.open.ac.uk");
$fp = fsockopen($ip, 80);
if (!$fp)
{
	echo "-";
	exit;
}

fwrite($fp, "GET /fps/public/getdetails.aspx?ss=" . $ss . " HTTP/1.0\r\nHOST:msds.open.ac.uk\r\n\r\n");
stream_set_timeout($fp, 5);
$res = "";
while (feof($fp) == FALSE) $res .= fread($fp, 2000);
fclose($fp);

if (strpos($res, "200 OK") < 0)
{
	echo "-";
	exit;
}

$i = strpos($res, "\r\n\r\n");
if ($i < 0)
{
	echo "-";
	exit;
}

$res = substr($res, $i+4);

echo "/" . $res;

?>

