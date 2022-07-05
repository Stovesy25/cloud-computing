<script type="text/javascript">
localStorage.clear();
sessionStorage.clear()
</script>

<?php

/**
 * Script that clears the local storage and destroys the session then redirects the user to the homepage
 * 
 * @author Graham Stoves - w19025672
 */

session_destroy();

header("Location: http://20.115.25.179/index.php");
exit;