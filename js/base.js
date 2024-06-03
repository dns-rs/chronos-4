function radioTrigger(input) {
  var radioValue = input;
  console.log(radioValue)
  $("#orientLabel").text(radioValue);
}

function safetyProtocol() {
  if (sessionStorage['spinner_type'] == "safe") {        
    sessionStorage['spinner_type'] = "unsafe"
    console.log("turned to unsafe");
    $(".safety-indicator").hide()
    $(".safe-history").hide()
    location.reload();
  }
  else {
    sessionStorage['spinner_type'] = "safe";
    console.log("turned to safe")
    $(".safety-indicator").show()
    $(".safe-history").show()
    location.reload();
  }

}

function resetModal() {
  $(".body2hide").show();
  $(".save-button").show();
  $(".alert-success").addClass("invisible");
}

function save2db(event) {
  if($("#orientLabel").text() == "db") {
    console.log("Clipboard");
    add2Clipboard(event);
  }
  else {
    console.log("Favorites");
    add2Favorites(event);
  }
}

function add2Clipboard(event) {
  console.log(event.target)
  var imageLink = $(".image").attr("src")
  imageLink = "http://192.168.1.40/dev/2021/timetravel/"+imageLink;
  var device = "Tablet"
  console.log(imageLink)
  var imgObject = {
    "link" : imageLink,
    "device" : device,
    "date" : Date.now()
  }

  console.log("imgObject: ", imgObject)

  var form_data = new FormData();

  for ( var key in imgObject ) {
      form_data.append(key, imgObject[key]);
      console.log("img object", imgObject[key])
  }

  console.log("formdata: ", form_data)

  $.ajax({
    url         : 'inc/insert_clipboard.php',
    data        : form_data,
    processData : false,
    contentType : false,
    type: 'POST'
  }).done(function(data){
    $(".body2hide").hide()
    $(".alert-success").removeClass("invisible");
    $(".save-button").hide();
  });

}

function add2Favorites(event) {
  console.log(event.target)
  var imageName = $(".image").attr("src")
  var imgOrientation = $("#orientLabel").text();
  console.log("name: ", imageName)
  var imgObject = {
    "source" : imageName,
    "orientation" : imgOrientation
  }

  console.log("imgObject: ", imgObject)

  var form_data = new FormData();

  for ( var key in imgObject ) {
      form_data.append(key, imgObject[key]);
      console.log("img object", imgObject[key])
  }

  console.log("formdata: ", form_data)

  $.ajax({
    url         : 'inc/insert_favorite.php',
    data        : form_data,
    processData : false,
    contentType : false,
    type: 'POST'
  }).done(function(data){
    $(".body2hide").hide()
    $(".alert-success").removeClass("invisible");
    $(".save-button").hide();
  });

}
// not working properly, investigate!
function imgError(event) {
  console.log(event)
  $.ajax(
    './timemachine.php',
    {
        success: function(data) {
          $('.image').attr("src", data);
          console.log(data)
        },
        error: function() {
            console.log("error")
        }
    }
);
};
/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

function imageSpinner() {
  localStorage.setItem('counter', -9);
  $('.loader').hide();
  $.ajax(
      './timemachine.php',
      {
          success: function(data) {
            $('.image').attr("src", data);
            // $('.loader').hide();
            console.log(data)
            // imgPrepare(data)
          },
          error: function() {
              console.log("error")
          }
      }
  );

  
  
  setInterval(function(){
    $('.image').hide();
    $('.button-container').hide();
    $('.loader').fadeIn("20000");
    setTimeout(function() { 
        $('.loader').fadeOut(); 
    }, 5000);
    $.ajax(
        './timemachine.php',
        {
            success: function(data) {
              $('.image').attr("src", data);

              imgPrepare(data)

              setTimeout(function () {                    
                // console.log("loading");
                $('.loader').fadeOut("13000"); 
              }, 1000);
              setTimeout(function () {                    
                $('.button-container').show();   
              }, 1000);
              setTimeout(function () {      
                          
                // console.log("loading");
                $('.image').fadeIn("13000");
              }, 1000);
              // console.log(data)
              
              
            },
            error: function() {
                console.log("error")
            }
        }
    );
    
     
  }, 300000);
// Test
// }, 3000);
}

function imageSpinnerSafe() {
  localStorage.setItem('counter', -9);
  $('.loader').hide();
  $.ajax(
      './timemachine_safe.php',
      {
          success: function(data) {
            var image_data = JSON.parse(data)
            console.log(image_data)            
            // if (image_data["img_orientation"] === null || image_data["img_orientation"] === "") {
            //   console.log(image_data["img_source"])
            //   $('.image').attr("src", image_data["img_source"]);
            // }
            $('.image').attr("src", image_data["img_source"]);
            console.log($('.image'))
            if (image_data["img_orientation"] === "left") {
              $('.image').css("transform", "rotate(-90deg)")
              console.log("rotated left")
            } else if (image_data["img_orientation"] === "right") {
              $('.image').css("transform", "rotate(90deg)")
              console.log("rotated right")
            }
            

            // $('.loader').hide();
            
          },
          error: function() {
              console.log("error")
          }
      }
  );

  
  
  setInterval(function(){
    $('.image').hide();
    $('.button-container').hide();
    $('.loader').fadeIn("20000");    
    localStorage.setItem('counter', -9)  

    setTimeout(function() { 
        $('.loader').fadeOut(); 
    }, 5000);
    $.ajax(
        './timemachine_safe.php',
        {
            success: function(data) {              
              var dataJSON = JSON.parse(data);              

              // console.log("incoming: ", dataJSON)
              historyFiller(dataJSON);

              $('.image').attr("src", dataJSON.img_source);
              setTimeout(function () {                    
                // console.log("loading");
                $('.loader').fadeOut("13000"); 
              }, 1000);
              setTimeout(function () {                    
                $('.button-container').show();   
              }, 1000);
              setTimeout(function () {      
                          
                // console.log("loading");
                $('.image').fadeIn("13000");
              }, 1000);
              // console.log(data)
              
              
            },
            error: function() {
                console.log("error")
            }
        }
    );
    
     
  }, 300000);
// Test
// }, 3000);
}

function historyFiller(currentImage) {
  localStorage.setItem('counter', -9);
  console.log("current_image: " , currentImage)
  var imgHistory = [];  

  if ( localStorage.getItem('imgHistory')) {
   
    // The array exists
    imgHistory = JSON.parse(localStorage.getItem('imgHistory'))        
    // console.log("storage array previous: ", imgHistory)
    var counter = imgHistory.length   

    if  (counter < 10) {     
      imgHistory.push(currentImage)     
      // console.log("alternate storage array: ", imgHistory)
      localStorage.setItem('imgHistory', JSON.stringify(imgHistory))
    }
    else {      
      var storageArray = localStorage.getItem('imgHistory', JSON.parse(localStorage.getItem('imgHistory')))      
      storageArray = JSON.parse(storageArray);            
      storageArray.splice(0, 1);
      storageArray.push(currentImage)
      localStorage.setItem('imgHistory', JSON.stringify(storageArray))
    }

  } else {
    var imgHistory = [];  
    imgHistory.push(currentImage);
    // The array doesn't exist
    console.log('imgHistory array does not exist in the session storage');
      
    localStorage.setItem('imgHistory', JSON.stringify(imgHistory))
  }

  // console.log("storage array ", JSON.parse(localStorage.getItem('imgHistory')) )

}

function imgPrepare(img2prep) {
  
  var imgObject = {
    "id" : null,
    "img_orientation" : null,
    "img_source" : img2prep
  }

  // console.log("prepare: ", imgObject)

  historyFiller(imgObject)

}

function historyShifter(shifter) {
  

  var storagaArray =  JSON.parse(localStorage.getItem('imgHistory'))
  baseImage = storagaArray[storagaArray.length-1]
  console.log(storagaArray)
  console.log("base image -> ", baseImage)

  console.log('shift', shifter)

  if ((localStorage.getItem('counter') === null || isNaN(parseInt(localStorage.getItem('counter'))))) {
    var mainCounter;
    localStorage.setItem('counter', mainCounter)
    console.log("this")
  }
  else {
    var mainCounter = parseInt(localStorage.getItem('counter'))   
  }

  console.log("main counter: ", mainCounter)

  if (shifter === 'prev' ) {   
    let newCounter =  mainCounter - 1

    if (newCounter <= -10) {
      newCounter = 0;
    }
    else if (newCounter > 0) {
      newCounter = -9;
    }
    localStorage.setItem('counter', newCounter)    
  }
  else if (shifter === 'next' ){    
    let newCounter =  mainCounter + 1
    // console.log("newcounter from next", newCounter)
    if (newCounter <= -10) {
      newCounter = 0;
    }
    else if (newCounter > 0) {      
      newCounter = -9;
    }
    
    
    localStorage.setItem('counter', newCounter)    
   
  }

  console.log("counter in storage ", localStorage.getItem('counter')  )

  var storageArray = localStorage.getItem('imgHistory', JSON.parse(localStorage.getItem('imgHistory'))) 
  storageArray = JSON.parse(storageArray);

  let counter = storageArray.length  
  // counter = counter - 1

  var storageIndex = parseInt(localStorage.getItem('counter'))

  // console.log("storage index before counter: ", storageIndex)

  storageIndex = storageIndex + counter

 

  // if (storageIndex >= 9) {
  //   storageIndex = 0;
  // }
  console.log("storage index after counter: ", storageIndex)
  
  if (storageIndex < 0) {
    storageIndex = 0
    $('.image').attr("src", storageArray[storageIndex].img_source);
    console.log('previous image base', baseImage)
  }
  else {
    $('.image').attr("src", storageArray[storageIndex].img_source);
    console.log('previous image storage', storageArray[storageIndex])
  }
  



}

function blackList() {
  var imageName = $(".image").attr("src")
  var imgObject = {
    "img_source" : imageName,
    "flag" : "blacklist"
  }

  console.log("imgObject: ", imgObject)

  var form_data = new FormData();

  for ( var key in imgObject ) {
      form_data.append(key, imgObject[key]);
      console.log("img object", imgObject[key])
  }

  console.log("formdata: ", form_data)

  $.ajax({
    url         : 'inc/insert_flagged.php',
    data        : form_data,
    processData : false,
    contentType : false,
    type: 'POST'
  }).done(function(data){
    console.log("blacklisted")
    location.reload();
  });
}

$(document).ready(function(){
  
  localStorage.setItem('counter', -9);
  $(".btn").fadeIn(2000);

  if (sessionStorage['spinner_type'] == undefined) {        
    sessionStorage['spinner_type'] = "imageSpinner();"
  }

  if (sessionStorage['spinner_type'] == "safe") {        
    imageSpinnerSafe();
  }
  else {
    imageSpinner();
    $(".safety-indicator").hide()
    // $(".safe-history").hide()
  }



 
  // imageSpinner();
  // imageSpinnerSafe();
});
    