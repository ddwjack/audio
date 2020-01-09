<?php
error_reporting(E_ERROR | E_WARNING | E_PARSE);

$remote = 'http://a.91zibo.com/api';

$query = http_build_query($_POST, '', '&');
$remote = $remote . str_replace(array('m=', '.'), array('/', '/'), $_SERVER['QUERY_STRING']);
//$c = file_get_contents($remote.'?'.$_SERVER['QUERY_STRING'].'&'.$query.'&sessid='.$_COOKIE['PHPSESSID'].'&rnd='.rand());
$url = $remote . '?' . $_SERVER['QUERY_STRING'] . '&' . $query . '&sessid=' . $_COOKIE['PHPSESSID'] . '&rnd=' . rand();
// url 长度限制默认一般为 4k (4096 字节，内存一页的大小)，nginx 默认 4k/8k
if (strlen($url) < 4096) {
    $c = file_get_contents($url);
} else {
    // 超过长度改为 post 请求
    $opts = array(
        'http' => array(
            'method' => 'POST',
            'header' => 'Content-type: application/x-www-form-urlencoded',
            'content' => $_SERVER['QUERY_STRING'] . '&' . $query . '&sessid=' . $_COOKIE['PHPSESSID'] . '&rnd=' . rand(),
        )
    );
    // 去掉 url 后面的参数
    $url = substr($url, 0, strpos($url, '?'));
    $context = stream_context_create($opts);
    $c = file_get_contents($url, false, $context);
}
$t = json_decode($c, 1);
if ($t['userinfo_login_response']['SessionID']) setcookie('PHPSESSID', $t['userinfo_login_response']['SessionID']);
header('x-out: ' . $remote . '?' . $_SERVER['QUERY_STRING'] . '&' . $query . '&sessid=' . $_COOKIE['PHPSESSID']);

echo $c;
