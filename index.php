<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <link rel="stylesheet" href="assets/css/index.css" />
  <!-- <script src="assets/js/aredotna.js"></script> -->
  <script src="assets/js/aredotna-php.js"></script>
</head>

<body>
  <?php
  include 'arena.php';
  $arena = new Arena();

  $page = $arena->set_page();
  $per = 12;
  $slug = 'xxx-hot-faces-in-your-area-xxx';

  $channel = $arena->get_channel($slug, array('page' => $page, 'per' => $per));
  ?>

  <h1><?= $channel->title; ?></h1>
  <?php $channel->each_item(function ($item) { ?>
    <!-- Item templates go here -->
  <?php }) ?>
</body>

</html>