(function(){

  $(function(){

    $("#dialog").hide();

    //variable to hold current student we have selected for edit
    let currentStudent;

    //disable all input fields at first
    $("#studentAddForm :input").prop("disabled", true);

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
              <td><button data-studentid="${students[i].student_id}" class="btn btn-primary editButton">Edit Record</button></td>
            </tr>
          `)
        }

      })
    }

    //inital load of our student data in our table
    fetchStudents();

    $("#studentList").on("click", ".editButton", function(){

      //store current student in variable for when we submit the form
      //we need this to know what student we are updating
      //variable declared on line 5
      currentStudent = $(this).data("studentid");

      $.get("http://localhost:1337/student/" + currentStudent, function(student){

        //loop over the student i got back from the api
        $.each(student, function(key, val){
            //find the input field that matches the name of the key
            let el = $('[name="'+key+'"]');
            //find the type of field that we selected
            let type = el.attr('type');

            //based on the type choose how we set the value
            switch(type){
                case 'checkbox':
                    el.attr('checked', 'checked');
                    break;
                case 'radio':
                    el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    el.val(val);
            }
        });
      })

      //enable input fields after we fill out the form
      $("#studentAddForm :input").prop("disabled", false);

      //opens dialog with form
      $("#dialog").dialog({
        width: 800,
        title: "Edit Student",
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            updateStudent();
            $( this ).dialog( "close" );
          }
      }
      });
    })

    //when the submit button on the form is clicked lets prevent the default behavior
    //we want to stop the form from submitting and reloading the page
    function updateStudent(){

      $.ajax({
        url: "http://localhost:1337/student/" + currentStudent,
        data: $("#studentAddForm").serialize(),
        method: "PUT",
        success: function(data){

          //reload student table on success
          fetchStudents();

          //disable form fields again
          $("#studentAddForm :input").prop("disabled", true);

          //reset form back to empty fields
          $("#studentAddForm")[0].reset()

        }
      })

    }

  })

})()
