(function(){

  $(function(){

    //make request to get data from the api
    $.get("http://localhost:1337/student", function(students){

      //loop over students we got back from the api and add to tbody with id of studentList
      for (let i = 0; i < students.length; i++) {
        $("#studentList").append(`
          <tr>
            <td>${students[i].first_name}</td>
            <td>${students[i].last_name}</td>
          </tr>
        `)
      }

    })

  })

})()
