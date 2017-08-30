(function(){

  $(function(){

    //when the submit button on the form is clicked lets prevent the default behavior
    //we want to stop the form from submitting and reloading the page
    $("#submitStudentButton").click(function(e){

      //prevents default behavior of form submitting
      e.preventDefault()

      //post request that serializes the data from the form and sends it to the API
      $.post("http://localhost:1337/student", $("#studentAddForm").serialize(), function(data){
        alert("data added son!")
      })
    })

  })

})()
