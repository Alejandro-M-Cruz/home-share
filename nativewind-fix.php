<?php

$filePath = 'front-end/node_modules/nativewind/dist/metro/transformer.js';
$content = file_get_contents($filePath);

$issue = '`require(\'${config.nativewind.output}\');`';

if (! str_contains($content, $issue)) {
    echo 'NativeWind fix already applied!';
    return;
}

$fix = '`require(\'${config.nativewind.output.replace(/\\\\/g, \'\\\\\\\\\')}\');`';

$result = str_replace($issue, $fix, $content);

file_put_contents($filePath, $result);

echo 'NativeWind fix applied successfully!';
