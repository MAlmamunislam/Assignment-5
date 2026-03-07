const totalIssue = document.getElementById("issue-counter");
let allData = [];
// labels with color change 
const createEkements = (arr) => {
  const htmlElements = arr.map((el) => {
    let colorClasses = ""; 
    if (el === "bug") {
      colorClasses = "text-[#EF4444] bg-[#FECACA] border-red-300";
    } else if (el === "enhancement") {
      colorClasses = "text-green-700 bg-[#BBF7D0] border-green-300";
    } else if (el === "good first issue") {
      colorClasses = "text-orange-600 bg-orange-50 border-orange-300";
      
    } 
    else if(el === "help wanted"){
           colorClasses = "text-[#D97706] bg-[#FDE68A] border-orange-300";
      }
    else if(el === "documentation"){
           colorClasses = "text-blue-600 bg-blue-50 border-blue-300";
      }
    return `
       <span class="uppercase mr-[5px] px-3 py-1 text-[12px] font-bold rounded-full border ${colorClasses}">
          ${el}
       </span>
     `;
  });
  return htmlElements.join(" "); 
};
// all issue get 

const allIssuGet = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((result) => result.json())
    .then((data) => {
     allData = data.data;
     allIssuDisplay(data.data)
});
};
// all issue display 
const allIssuDisplay = (data) => {
     // console.log(data)
     totalIssue.innerText= data.length
  const allIssuCardParent = document.getElementById("card-container");
  allIssuCardParent.innerHTML='';
  data.forEach((element) => {
     // change border color 
     const statusColor = element.status === 'open' ? 'border-t-green-500' : 'border-t-purple-500';
     // change icon  
     const statusIcon = element.status === 'open' ? `<img src="./assets/Open-Status.png" alt=""></img>` : `<img src="./assets/Closed- Status .png" alt=""></img>`
     // change priority color 
     let priorityColorChange = " " ;
     if(element.priority === 'low'){
          priorityColorChange = "text-green-700 bg-green-100 ";

     }
     else if(element.priority === 'medium'){
          priorityColorChange = "text-yellow-700 bg-yellow-50 ";
     }
     else if(element.priority === 'high'){
          priorityColorChange = "text-red-700 bg-red-50";
     }
     
    const createAt = element.createdAt;
    const dateOnly = createAt.slice(0, 10);
    const updatedAt = element.updatedAt;
    const updateDate = updatedAt.slice(0, 10);

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
           <div
          class="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm border-t-4 ${statusColor} "
        >
          <div class="flex items-center justify-between mb-4">
            <div>
              ${statusIcon}
            </div>
            <span
            id='satus'
              class="px-5 py-1.5 text-xs font-bold ${priorityColorChange} rounded-full"
            >
             ${element.priority}
            </span>
          </div>

          <div class="space-y-2 mb-5">
            <h2 class="text-2xl font-semibold text-gray-900 ">
             ${element.title}
            </h2>
            <p class="text-sm text-gray-600 line-clamp-2">
              ${element.description}
            </p>
          </div>

          <div
            class="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100"
          >
           <div>${createEkements(element.labels)}</div>

           
          </div>

          <div class="text-sm text-gray-500 space-y-1">
           <div class='flex justify-between items-center'>
            <p class="font-medium">#${element.id} by ${element.author}</p>
            <p class=>${dateOnly}</p>
           </div>
            <div class='flex justify-between items-center' >
            <p class="font-medium">Assignee: ${element.assignee ? element.assignee : "Unassigneed"} </p>
            <p class=''>${updateDate}</p>
            </div>
          </div>
        </div> 
          `;
    allIssuCardParent.appendChild(newDiv);
  });
};
// filter data 

const filterIssues = (status) => {
   if(status !== 'all') {
        // .toLowerCase() ব্যবহারের ফলে All বাটন আর হারাবে না
        const filtered = allData.filter(item => item.status.toLowerCase() === status.toLowerCase());
        allIssuDisplay(filtered);
    }
    else if(status === 'all'){
     allIssuDisplay(allData)
    }
}


allIssuGet();

document.getElementById('btn-search') .addEventListener('click' ,function () {
     const input = document.getElementById('input-search');
     const inputValue = input.value.trim().toLowerCase();
     fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
     .then(result => result.json())
     .then(data => {
          const allProblem = data.data;
          const filterproblem = allProblem.filter(problem => problem.title.toLowerCase().includes(inputValue));
           allIssuDisplay(filterproblem)
     })
     
})

