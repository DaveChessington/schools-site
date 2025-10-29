
async function add() {
    let mensaje = ""; // Declare 'mensaje' outside the try block

    try{
        debugger;
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const description = document.getElementById('description').value;
        const response = await fetch('https://4g219ev4sc.execute-api.us-east-1.amazonaws.com/dev/schools', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: name,address:address,description:description}) 
            });
        const body= await response.json();
        data=JSON.parse(body.body);
        mensaje=data.message
    }
    catch(e){
        mensaje = `Error: ${e.message}`; // Access the error message for cleaner output
    }
    alert(mensaje);
}


async function search(){
    let mensaje = ""; // Declare 'mensaje' outside the try block

    try{
        const school_name = document.getElementById('school_name').value;
        //debugger;
        const response = await fetch('https://4g219ev4sc.execute-api.us-east-1.amazonaws.com/dev/schools/school', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"name": school_name}) 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const body= await response.json();
        data=JSON.parse(body.body);

        if (data.exists){
            mensaje = `Success: fetched data`;
            //debugger;
            document.getElementById('school_found').innerText =`id:${data.school.id} \naddress: ${data.school.address} \nDescription: ${data.school.description}`;
        }
        else{
            mensaje = 'School not Found';
        }

    }
    catch(e){
        mensaje = `Error: ${e.message}`; // Access the error message for cleaner output
    }

    alert(mensaje);
}

async function list() {
    let mensaje = "";
    try {
        const response = await fetch('https://4g219ev4sc.execute-api.us-east-1.amazonaws.com/dev/schools');
        const data = await response.json();

        // The body is a string, so we must parse it
        const schools = JSON.parse(data.body);

        // Now we can safely pass it to the table function
        createTable(schools);
        mensaje = "Schools listed successfully!";
    } catch (e) {
        console.error(e);
        mensaje = "Error: " + e;
    }
    //alert(mensaje);
}

function createTable(data) {
    const container = document.getElementById('table-container');
    container.innerHTML = ""; // Clear previous table if exists

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-bordered', 'mt-3'); // Bootstrap styling

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers from the keys of the first object
    const headerRow = document.createElement('tr');
    for (const key in data[0]) {
        const th = document.createElement('th');
        th.textContent = key.charAt(0).toUpperCase() + key.slice(1);
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);

    // Create table rows
    data.forEach(item => {
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

list()