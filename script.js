let leads = JSON.parse(localStorage.getItem("leads")) || [];
let editIndex = -1;

function displayLeads(data = leads){

const table = document.getElementById("leadTable");
table.innerHTML = "";

data.forEach((lead,index)=>{

table.innerHTML += `
<tr>
<td>${lead.name}</td>
<td>${lead.email}</td>
<td>${lead.status}</td>

<td>
<button class="edit" onclick="editLead(${index})">Edit</button>
<button class="delete" onclick="deleteLead(${index})">Delete</button>
</td>

</tr>
`;

});

}

document.getElementById("leadForm").addEventListener("submit",function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const status = document.getElementById("status").value;

if(editIndex === -1){

leads.push({name,email,status});

}else{

leads[editIndex] = {name,email,status};
editIndex = -1;

}

localStorage.setItem("leads",JSON.stringify(leads));

displayLeads();

this.reset();

});

function deleteLead(index){

leads.splice(index,1);

localStorage.setItem("leads",JSON.stringify(leads));

displayLeads();

}

function editLead(index){

const lead = leads[index];

document.getElementById("name").value = lead.name;
document.getElementById("email").value = lead.email;
document.getElementById("status").value = lead.status;

editIndex = index;

}

function searchLeads(){

const keyword = document.getElementById("search").value.toLowerCase();

const filtered = leads.filter(lead =>
lead.name.toLowerCase().includes(keyword) ||
lead.email.toLowerCase().includes(keyword)
);

displayLeads(filtered);

}

displayLeads();