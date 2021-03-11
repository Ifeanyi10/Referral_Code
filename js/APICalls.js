

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
                console.log(result);
                if(result != null) {
                    if(result.status == null){
                        window.localStorage.setItem("patToken", result.token);
                        window.location.href = "eligibility-question.html";
                    } else if(result.status.consent == false){
                        window.localStorage.setItem("patToken", result.token);
                        window.location.href = "consent.html";
                    }else{
                        sweetAlert("You have submitted your consent!","If you are yet login to your patient account, please search for the email sent to you after submitting your consent form to complete your account setup","error");
                    }
                    
                }else{
                    sweetAlert("The referral code you entered does not match with the name provided!","Please confirm the referral code and your given name then try again","error");
                }
                
            }, 
            error: function(msg){
                //$("#errorContainer").html("Incorrect Username or Password");
                sweetAlert("The referral code you entered does not match with the name provided!","Please confirm the referral code and your given name then try again","error");
            }
        });
    });


 });