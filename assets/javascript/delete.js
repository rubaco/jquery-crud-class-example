(function(){

  $("#successMessage").hide();

  $(function(){

    //put the get request in a function so it can be reused
    function fetchStudents(){
      //make request to get data from the api
      $.get("http://localhost:1337/student", function(students){

        //clear out existing student list
        $("#studentList").empty()

        //loop over students we got back from the api and add to tbody with id of studentList
        for (let i = 0; i < students.length; i++) {
          $("#studentList").append(`
            <tr>
              <td>${students[i].first_name}</td>
              <td>${students[i].last_name}</td>
              <td><button data-studentid="${students[i].student_id}" class="btn btn-danger deleteButton">Delete Record</button></td>
            </tr>
          `)
        }

      })
    }

    //inital load of the table
    fetchStudents();

    //onlick for every delete button
    $("#studentList").on("click", ".deleteButton", function(){

      //get student id off the button
      let studentId = $(this).data("studentid")

      //make delete request to the api
      $.ajax({
        url: "http://localhost:1337/student/" + studentId,
        method: "DELETE",
        success: function(data){

          //reload student table on success
          fetchStudents();

          //show success div
          $("#successMessage").slideDown();

          //make success message go away after a few seconds
          setTimeout(function(){
            $("#successMessage").slideUp();
          }, 3000)

        }
      })
    })

  })

})()









//asdfsd
