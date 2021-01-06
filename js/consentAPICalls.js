
function validateEmail(){
    var bt = document.getElementById('btnConcentSubmit');
    var password = $("#patEmail").val();
    var confirm_password = $("#patEmailVer").val();
    var patientNum = $("#patLNum").val();
    if(password != confirm_password) {
        $("#divCheckEmailMatch").html("Email do not match!");
        bt.disabled = true;
    } else {
        $("#divCheckEmailMatch").html(" ");
        if(patientNum != ''){
            bt.disabled = false;
        }else{
            bt.disabled = true;
            $("#divCheckEmailMatch").html("Ensure you entered you mobile number");
        }
        
    }
  }
 
 $(document).ready(function () {

    var bt = document.getElementById('btnConcentSubmit');
    bt.disabled = true;
    $("#patEmailVer, #patLNum").keyup(validateEmail);

    //Submit Consent
    $('#btnConcentSubmit').on('click', function(event){
        event.preventDefault();
        var patEmail = document.getElementById('patEmail').value;
        var patientNum = document.getElementById('patLNum').value;
        var patientToken = window.localStorage.getItem("patToken");
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/consent';

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
                swal({title: "Health ensuite welcomes you!!", text: "Thank you for your time. An email will be sent to you within 2 business days confirming your consent with the study information attached.", type: "success"},
                function(){ 
                    window.location.href = "index.html";
                }
                );
                
            }, 
            error: function(msg){
                //$("#errorContainer").html("Incorrect Username or Password");
                sweetAlert("Oops...","Unable to submit consent!","error");
            }
        });
    });


 });