
async function add() {
    let mensaje = ""; // Declare 'mensaje' outside the try block

    try{
        debugger;
        const name = document.getElementById('subject_name').value;
        const description = document.getElementById('description').value;
        const response = await fetch('https://4g219ev4sc.execute-api.us-east-1.amazonaws.com/dev/subjects', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name: name,description:description}) 
            });
        const body= await response.json();
        data=JSON.parse(body.body);
        mensaje=data
    }
    catch(e){
        mensaje = `Error: ${e.message}`; // Access the error message for cleaner output
    }
    alert(mensaje);
}


async function search() {
    let mensaje = "";

    try {
        const subject_name = document.getElementById('search_subject').value.trim();

        if (!subject_name) {
            alert("Please enter a subject name");
            return;
        }
        debugger;
        const response = await fetch('https://4g219ev4sc.execute-api.us-east-1.amazonaws.com/dev/subjects/subject', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: subject_name }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const body = await response.json();

        // ✅ safer parsing in case `body.body` is already an object
        const data = typeof body.body === "string" ? JSON.parse(body.body) : body.body;

        if (data.exists) {
            mensaje = `✅ Success: fetched data`;
            document.getElementById('subject_found').innerText = 
                `ID: ${data.subject.id}\n\nDescription: ${data.subject.description}`;
        } else {
            mensaje = '❌ Subject not found';
            document.getElementById('subject_found').innerText = "";
        }

    } catch (e) {
        mensaje = `⚠️ Error: ${e.message}`;
        console.error(e);
    }

    alert(mensaje);
}
async function list() {
  let mensaje = "";
  try {
    const response = await fetch('https://4g219ev4sc.execute-api.us-east-1.amazonaws.com/dev/subjects');
    const data = await response.json();

    // Parse API Gateway's wrapped response
    const subjects = JSON.parse(data.body);

    // Display them as cards
    createCards(subjects);
    mensaje = "Subjects listed successfully!";
  } catch (e) {
    console.error(e);
    mensaje = "Error: " + e;
  }
  // alert(mensaje);
}

function createCards(data) {
  const container = document.getElementById('subjectsList');
  container.innerHTML = ""; // Clear any old cards

  if (!Array.isArray(data) || data.length === 0) {
    container.innerHTML = "<p class='text-muted'>No subjects available.</p>";
    return;
  }

  data.forEach(subject => {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'd-flex');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow-sm', 'h-100', 'flex-fill');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = subject.name || "Unnamed Subject";

    const desc = document.createElement('p');
    desc.classList.add('card-text');
    desc.textContent = subject.description || "No description available.";

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-primary', 'mt-3');
    btn.textContent = "View Details";

    // 👇 Add click behavior to show details
    btn.addEventListener("click", () => showDetails(subject));

    cardBody.appendChild(title);
    cardBody.appendChild(desc);
    cardBody.appendChild(btn);

    card.appendChild(cardBody);
    col.appendChild(card);
    container.appendChild(col);
  });
}

function showDetails(subject) {
  const toastEl = document.getElementById('subjectToast');
  const toastBody = document.getElementById('toastBody');

  if (!toastEl || !toastBody) {
    console.error("Toast element not found");
    return;
  }

  // Build the message dynamically
  toastBody.innerHTML = `
    <strong>${subject.name || "Unnamed Subject"}</strong><br>
    <small>ID:</small> ${subject.id || "N/A"}<br>
    <small>${subject.description || "No description available."}</small>
  `;

  // Initialize and show the toast using Bootstrap's JS API
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}


// Run automatically on page load
document.addEventListener("DOMContentLoaded", list);
