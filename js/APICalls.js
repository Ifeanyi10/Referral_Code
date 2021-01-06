

 $(document).ready(function () {

    //Login Patient Ref Code
    $('#btnSignin').on('click', function(event){
        event.preventDefault();
        var refCode = document.getElementById('refCode').value;
        var patName = document.getElementById('patName').value;
        let url = 'http://health.us-east-2.elasticbeanstalk.com/insomnia/v1/patient/refCode';

        $.ajax({
            url: url,
            type: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Accept': '*/*'            
              },
            data: JSON.stringify({"code": refCode, "code1": patName}),
            success: function(result){
                if(result != null) {
                    window.localStorage.setItem("patToken", result);
                    //alert(result);
                    window.location.href = "eligibility-question.html";
                }else{
                    sweetAlert("Oops...","Invalid referral code or does not match with lastname!","error");
                }
                
            }, 
            error: function(msg){
                //$("#errorContainer").html("Incorrect Username or Password");
                sweetAlert("Oops...","Invalid referral code or does not match with lastname!","error");
            }
        });
    });


 });