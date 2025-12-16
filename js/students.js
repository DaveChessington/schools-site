api_gateway="https://1zow4wws27.execute-api.us-east-1.amazonaws.com"

async function search(){
    let mensaje = ""; // Declare 'mensaje' outside the try block

    try{
        debugger;
        const student_name = document.getElementById('search_name').value;
        const student_last_name = document.getElementById('search_last_name').value;
        debugger;
        const response = await fetch(`${api_gateway}/dev/students/student`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"name": student_name, "last_name": student_last_name}) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const body= await response.json();
        data=JSON.parse(body.body);

        if (data.exists){
            mensaje = `Success: fetched data`;
            //debugger;
            document.getElementById('student_found').innerText =`id:${data.student.id} \nname: ${data.student.name} ${data.student.last_name} \nCourse: ${data.student.courses[0]} \nage: ${data.student.age} \nschool: ${data.student.school}`;
        }
        else{
            mensaje = 'student not Found';
        }

    }
    catch(e){
        mensaje = `Error: ${e.message}`; // Access the error message for cleaner output
    }

    alert(mensaje);
}


async function add() {
    let mensaje = "";

    try {
        debugger;
        const name = document.getElementById('name').value.trim();
        const last_name = document.getElementById('surname').value.trim();
        const age = document.getElementById('age').value.trim();
        const email = document.getElementById('email').value.trim();
        const school = document.getElementById('school').value;
        const course = document.getElementById('course').value;

        if (!name || !last_name || !age || !email || !school || !course) {
            alert("Please fill in all fields.");
            return;
        }

        const response = await fetch(`${api_gateway}/dev/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, last_name, age, email, school, courses: [course]})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const body = await response.json();
        const data = JSON.parse(body.body);
        mensaje = data.message || "Student added successfully!";
    } catch (e) {
        mensaje = `Error: ${e.message}`;
    }

    alert(mensaje);
}

async function list() {
    let mensaje = "";
    try {
        //debugger
        const response = await fetch(`${api_gateway}/dev/students`, {});
        const data = await response.json();

        // The body is a string, so we must parse it
        const students = JSON.parse(data.body);

        // Now we can safely pass it to the table function
        createTable(students);
        mensaje = "Students listed successfully!";
    } catch (e) {
        console.error(e);
        mensaje = "Error: " + e;
    }
    //alert(mensaje);
}


function createTable(data) {
    //debugger;
    const container = document.getElementById('table-container');
    container.innerHTML = ""; // Clear previous table if exists

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered', 'mt-3'); // Bootstrap styling

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers from the keys of the first object
    const headerRow = document.createElement('tr');
    for (const key in data.students[0]) {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Create table rows
    data.students.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    container.appendChild(table);
}

// Populate schools dropdown
async function loadSchools() {
    try {
        const response = await fetch(`${api_gateway}/dev/schools`);
        const data = await response.json();
        const schools = JSON.parse(data.body);

        const schoolSelect = document.getElementById('school');
        schoolSelect.innerHTML = `<option value="" disabled selected>Select School</option>`; // reset

        schools.forEach(school => {
            const option = document.createElement('option');
            option.value = school.name; // store name
            option.textContent = school.name;
            schoolSelect.appendChild(option);
        });
    } catch (e) {
        console.error("Error loading schools:", e);
    }
}

// Populate courses dropdown
async function loadCourses() {
    try {
        const response = await fetch(`${api_gateway}/dev/subjects`);
        const data = await response.json();
        const courses = JSON.parse(data.body);

        const courseSelect = document.getElementById('course');
        courseSelect.innerHTML = `<option value="" disabled selected>Select Course</option>`; // reset

        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.name; // store ID
            option.textContent = course.name;
            courseSelect.appendChild(option);
        });
    } catch (e) {
        console.error("Error loading courses:", e);
    }
}

// Call these on page load
document.addEventListener("DOMContentLoaded", () => {
   // listStudents();  // existing function
    loadSchools();
    loadCourses();
});

list();