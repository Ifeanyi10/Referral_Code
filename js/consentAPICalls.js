var urlDomain = window.localStorage.getItem("urlDomain");

function validateEmail(){
    var bt = document.getElementById('btnConcentSubmit');
    var password = $("#patEmail").val();
    var confirm_password = $("#patEmailVer").val();
    var patientNum = $("#patLNum").val();
    if(password != confirm_password) {
        $("#divCheckEmailMatch").html("Please re-enter your Email address to proceed");
        bt.disabled = true;
    } else {
        $("#divCheckEmailMatch").html(" ");
        if(patientNum != ''){
            bt.disabled = false;
        }else{
            bt.disabled = true;
            $("#divCheckEmailMatch").html("Ensure you entered your mobile number");
        }
        
    }
  }

  var radioState = false;
    function saveNotShare(element){
        if(radioState == false) {
            check();
            radioState = true;
        }else{
            uncheck();
            radioState = false;
        }
    }
    function check() {
        document.getElementById("doNotShare").checked = true;
    }
    function uncheck() {
        document.getElementById("doNotShare").checked = false;
    }

  function isEmail(email) {
    // eslint-disable-next-line no-useless-escape
    return RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(email);
  };

  function isMobile(ph) {
    //var phoneno = /^\+?([1]{1})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno = /^[+]?[1]?[-. (]?([0-9]{3})[)-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(ph.match(phoneno)){
        return true;
    }else{
        return false;
    }
  }

 
 $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var bt = document.getElementById('btnConcentSubmit');
    bt.disabled = true;
    $("#patEmailVer, #patLNum").keyup(validateEmail);
    emailIsElligible = false;

    //validate provider email
    $('#patEmail').on('blur', function(e) {
        var bt = document.getElementById('btnConcentSubmit');
        // Current email input
        var currentEmail = e.target.value,
            $emailNode = $(this),
            isValid = true;

        // Validate email
        if (!isEmail(currentEmail)){
            $("#divCheckEmailMatch").html("Invalid email address. Enter a valid email address");
            return;
        }

        let url = urlDomain + 'insomnia/v1/patient/checkEmail';
        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'
            },
            data: JSON.stringify({"code": currentEmail}),
            success: function(result){
                console.log(result);
                // Finally update the state for the current field
                if (!result) {
                    emailIsElligible = true;
                    $("#divCheckEmailMatch").html("");
                    $(this).css("border","1px solid #BCBCBC");
                } else{
                    emailIsElligible = false;
                    $("#divCheckEmailMatch").html("Email address exist");
                    sweetAlert("Email address exist!","","error");
                    bt.disabled = true;
                    $(this).css("border","1px solid red");
                } 
                
            }, 
            error: function(msg){
                emailIsElligible = false;
                $("#divCheckEmailMatch").html("Email address exist");
                sweetAlert("Email address exist!","","error");
                bt.disabled = true;
                $(this).css("border","1px solid red");
            }
        });
        
        // Validate email
        // if (!isEmail(currentEmail)){
        //     $("#divCheckEmailMatch").html("Invalid email address pattern");
        //     bt.disabled = true;
        //     $(this).css("border","1px solid red");
        // }else{
        //     $(this).css("border","1px solid #BCBCBC");
        // }
        
    });


    $('#patLNum').on('blur', function(e) {
        var bt = document.getElementById('btnConcentSubmit');
        var currentphone = e.target.value,
            $phNode = $(this),
            isValid = true;
        
        // Validate phone Number
        if (!isMobile(currentphone)){
            bt.disabled = true;
            $("#divCheckEmailMatch").html("Invalid phone number. Enter a valid phone number.");
            $(this).css("border","1px solid red");
        }else{
            bt.disabled = false;
            $("#divCheckEmailMatch").html(" ");
            $(this).css("border",".5px solid #BCBCBC");
        }

    });


    //Submit Consent
    $('#btnConcentSubmit').on('click', function(event){
        event.preventDefault();
        var patEmail = document.getElementById('patEmail').value;
        var patientNum = document.getElementById('patLNum').value;
        var patientToken = window.localStorage.getItem("patToken");
        let url = urlDomain + 'insomnia/v1/patient/consent';

        if(emailIsElligible == true){
            $.ajax({
                url: url,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                    'Accept': '*/*',
                    'Authorization': 'Bearer '+ patientToken             
                },
                data: JSON.stringify({"email": patEmail, "phoneNumber": patientNum}),
                success: function(result){
                    swal({title: "Health ensuite welcomes you!", text: "Thank you for your time. An email will be sent to you within 2 business days confirming your consent with the study information attached.", type: "success"},
                    function(){ 
                        window.location.href = "index.html";
                    }
                    );
                    
                }, 
                error: function(msg){
                    //$("#errorContainer").html("Incorrect Username or Password");
                    sweetAlert("Unable to submit consent!","Please try again shortly","error");
                }
            });
        }else{
            sweetAlert("Email address exist!","Please use another email address","error");
        }


    });


 });