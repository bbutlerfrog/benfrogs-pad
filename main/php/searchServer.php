<?php
require_once 'search.php';
$employeeSearch = new searchEmployees ($_POST);
die (json_encode(array ( 'data' => $employeeSearch->advancedSearch())));