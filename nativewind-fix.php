<?php

$filePath = 'front-end/node_modules/nativewind/dist/metro/transformer.js';
$content = file_get_contents($filePath);

$search = '`require(\'${config.nativewind.output}\');`';
$replace = '`require(\'${config.nativewind.output.replace(/\\\\/g, \'\\\\\\\\\')}\');`';

$result = str_replace($search, $replace, $content);

file_put_contents($filePath, $result);
