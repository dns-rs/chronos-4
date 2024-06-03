<!DOCTYPE html>

<html>

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Timetravel</title>
   <?php include "./inc/header.php" ?>
</head>

<body>
   <div class="image-container">
      <div class="button-container top">
         <div class="row">
            <!-- <div class="col favorite button-content" onclick="add2Favorites(event);" data-toggle="modal" data-target="#exampleModal"> -->
            <div class="col favorite first button-content">
               <button type="button" class="btn favorite" data-toggle="modal" data-target="#exampleModal"><img
                     src="img/favorite.png">
               </button>
            </div>
            <div class="col button-content flag">
               <button type="button" class="btn blacklist" onclick="blackList()"><img
                     src="img/redFlag.png">
               </button>
            </div>
            <div class="col second button-content" onclick="safetyProtocol();">               
               <button type="button expanse-button" class="btn safe"><img src="img/safe.png"><div class="safety-indicator">s</div></button>                  
            </div>
         </div>
         
      </div>
      <div class="image-content">
         <img class="image" src="" onclick="openFullscreen();" onerror="imgError(event)">
         <!-- <img class="image" src="" onclick="openFullscreen();" > -->
         <div class="loader"></div>
      </div>
      <div class="button-container bottom">
         <div class="row">
            <div class="col first button-content" onClick="window.location.reload();">
               <button type="button" class="btn reload"><img src="img/reload.png"></button>
            </div>
            <div class="col safe-history">
               <button class="btn left" onclick="historyShifter('prev')"> <img src="img/left.png"> </button>
               <button class="btn right" onclick="historyShifter('next')"><img src="img/right.png"></button>
            </div>
            <div class="col second button-content" onclick="openFullscreen();">
               <button type="button expanse-button" class="btn fullscreen"><img src="img/expand.png"></button>
            </div>
         </div>


      </div>


   </div>

   <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
               </button>
            </div>
            <div class="modal-body">
               <div class="row body2hide">
                  <div class="col">
                     <button type="button" class="btn btn-orient" onclick="radioTrigger('left')">
                        <img src="img/phoneLeft.png">
                        <!-- <input type="radio" id="imgOrient1" name="imgOrient" value="landscape"> -->
                     </button>
                  </div>

                  <div class="col">
                     <button type="button" class="btn btn-orient" onclick="radioTrigger('right')">
                        <!-- <i class="fas fa-mobile portrait"></i> -->
                        <img src="img/phoneRight.png">
                        <!-- <input type="radio" id="imgOrient2" name="imgOrient" value="portrait"> -->
                     </button>
                  </div>

                  <div class="col">
                     <button type="button" class="btn btn-orient" onclick="radioTrigger('db')">
                        <!-- <i class="fas fa-mobile portrait"></i> -->
                        <img src="img/sendDb.png">
                        <!-- <input type="radio" id="imgOrient2" name="imgOrient" value="portrait"> -->
                     </button>
                  </div>
               </div>
               <div class="alert alert-success invisible" role="alert"> Gotcha!</div>
               <div class="invisible"><label id="orientLabel"></label></div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal"
                  onclick="resetModal(event);">Close</button>
               <button type="button" class="btn btn-primary save-button" onclick="save2db(event);">Save</button>
            </div>
         </div>
      </div>
   </div>

</body>


<script>
   var elem = document.getElementsByClassName("image-container");

   function openFullscreen() {
      if (elem.requestFullscreen) {
         elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
         /* Safari */
         elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
         /* IE11 */
         elem.msRequestFullscreen();
      }
   }
</script>

</html>