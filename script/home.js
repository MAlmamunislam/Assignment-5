const totalIssue = document.getElementById("issue-counter");
let allData = [];
// loading spinner
const manageSpiner = (status) => {
  if (status === true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-paren-container").classList.add("hidden");
  } else {
    document.getElementById("word-paren-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

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
    } else if (el === "help wanted") {
      colorClasses = "text-[#D97706] bg-[#FDE68A] border-orange-300";
    } else if (el === "documentation") {
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

// label for modal
const createElements = (arr) => {
  const htmlElement = arr.map((el) => {
    let colorClasses = "";
    if (el === "bug") {
      colorClasses = "text-[#EF4444] bg-[#FECACA] border-red-300";
    } else if (el === "enhancement") {
      colorClasses = "text-green-700 bg-[#BBF7D0] border-green-300";
    } else if (el === "good first issue") {
      colorClasses = "text-orange-600 bg-orange-50 border-orange-300";
    } else if (el === "help wanted") {
      colorClasses = "text-[#D97706] bg-[#FDE68A] border-orange-300";
    } else if (el === "documentation") {
      colorClasses = "text-blue-600 bg-blue-50 border-blue-300";
    }
    return `
       <span class="uppercase mr-[5px] px-3 py-1 text-[12px] font-bold rounded-full border ${colorClasses}">
          ${el}
       </span>
     `;
  });
  return htmlElement.join(" ");
};
// modal desing
const loadProblemDitals = (id) => {
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((result) => result.json())
    .then((data) => displayProblemDitals(data.data));
};
const displayProblemDitals = (ditals) => {
  const createAt = ditals.createdAt;
  // chnage prourity button color
  let priorityColorChange = " ";
  if (ditals.priority === "low") {
    priorityColorChange = "text-green-700 bg-green-300 ";
  } else if (ditals.priority === "medium") {
    priorityColorChange = "text-yellow-700 bg-yellow-100 ";
  } else if (ditals.priority === "high") {
    priorityColorChange = "text-red-700 bg-red-100";
  }
  // change status bg
  let statusColorChange = " ";
  if (ditals.status === "open") {
    statusColorChange = "text-green-700 bg-green-100 ";
  } else if (ditals.status === "closed") {
    statusColorChange = "text-yellow-700 bg-yellow-100 ";
  }

  const dateOnly = createAt.slice(0, 10);
  const detalsContainer = document.getElementById("ditals-container");

  detalsContainer.innerHTML = `
  
       <h1 class="text-2xl md:text-[24px] font-bold text-[#111827] mb-4 md:mb-6">
           ${ditals.title}
        </h1>
        
        <div class="flex flex-wrap items-center gap-2 mb-6 text-xs md:text-sm">
            <span class="btn btn-xs md:btn-sm ${statusColorChange} px-3 rounded-full font-semibold">${ditals.status}</span>
            <span class="text-gray-500"> Opened by ${ditals.assignee ? ditals.assignee : "Unassigneed"} . ${dateOnly}</span>
        </div>
        
        <div class="flex flex-wrap gap-2 mb-6 md:mb-8">
           ${createElements(ditals.labels)}
        </div>
        
        <p class="text-base md:text-xl text-[#374151] leading-relaxed  md:mb-12">
           ${ditals.description}
        </p>
        
        <div class="flex flex-col md:flex-row gap-6 md:items-start justify-between bg-[#fcf8f8] rounded-2xl p-6 md:p-8 mb-8 md:mb-10">
            <div class="space-y-1 md:space-y-3">
                <p class="text-sm md:text-[16px] text-gray-500 font-medium">Assignee:</p>
                <p class="text-lg md:text-[16px] font-semibold text-[#111827]">${ditals.assignee ? ditals.assignee : "Unassigneed"}</p>
            </div>
            
            <div class="space-y-1 md:space-y-3">
                <p class="text-sm md:text-xl text-gray-500 font-medium">Priority:</p>
                <span class="btn btn-xs md:btn-sm px-4  font-semibold ${priorityColorChange} border-none">${ditals.priority}</span>
            </div>
        </div>
  
  `;
  document.getElementById("my_modal_5").showModal();
};

// all issue get

const allIssuGet = () => {
  manageSpiner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((result) => result.json())
    .then((data) => {
      allData = data.data;
      allIssuDisplay(data.data);
    });
};
// all issue display
const allIssuDisplay = (data) => {
  // console.log(data)
  totalIssue.innerText = data.length;
  const allIssuCardParent = document.getElementById("card-container");
  allIssuCardParent.innerHTML = "";
  // if search output = 0
  if (data.length == 0) {
    allIssuCardParent.innerHTML = `
        <div
      class="flex flex-col items-center justify-center py-20 w-full text-center col-span-full"
    >
      <div class=" mb-4">
        <div class="order-2 w-[200px] rounded-3xl overflow-hidden">
          <img
            src="./assets/9214780.jpg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <h2 class="text-2xl font-bold text-gray-800">No Issues Found!</h2>
      <p class="text-gray-500 mt-2 max-w-xs">
        We couldn't find any issues matching your search. Try using different
        keywords.
      </p>
    </div>
    `;
  }
  data.forEach((element) => {
    // change border color
    const statusColor =
      element.status === "open" ? "border-t-green-500" : "border-t-purple-500";
    // change icon
    const statusIcon =
      element.status === "open"
        ? `<img src="./assets/Open-Status.png" alt=""></img>`
        : `<img src="./assets/Closed- Status .png" alt=""></img>`;
    // change priority color
    let priorityColorChange = " ";
    if (element.priority === "low") {
      priorityColorChange = "text-green-700 bg-green-100 ";
    } else if (element.priority === "medium") {
      priorityColorChange = "text-yellow-700 bg-yellow-50 ";
    } else if (element.priority === "high") {
      priorityColorChange = "text-red-700 bg-red-50";
    }
    // time convet
    const createAt = element.createdAt;
    const dateOnly = createAt.slice(0, 10);
    const updatedAt = element.updatedAt;
    const updateDate = updatedAt.slice(0, 10);

    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
           <div
           onclick="loadProblemDitals(${element.id})"
          class="max-w-md h-100 p-6 bg-white border border-gray-200 rounded-lg shadow-sm border-t-4 ${statusColor} "
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
  manageSpiner(false);
};
// filter data

const filterIssues = (status) => {
  manageSpiner(true);
  if (status !== "all") {
    const filtered = allData.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase(),
    );
    allIssuDisplay(filtered);
  } else if (status === "all") {
    allIssuDisplay(allData);
  }
};

allIssuGet();
// search data
document.getElementById("btn-search").addEventListener("click", function () {
  const input = document.getElementById("input-search");
  const inputValue = input.value.trim().toLowerCase();
  manageSpiner(true);
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((result) => result.json())
    .then((data) => {
      const allProblem = data.data;
      const filterproblem = allProblem.filter((problem) =>
        problem.title.toLowerCase().includes(inputValue),
      );
      allIssuDisplay(filterproblem);
    });
});

// search and button style change
document.getElementById("btn-search").addEventListener("click", function () {
  const allButton = document.getElementById("allbutton");
  const openButton = document.getElementById("openbutton");
  const closedButton = document.getElementById("closedbutton");

  allButton.classList.remove("btn-primary");
  openButton.classList.remove("btn-primary");
  closedButton.classList.remove("btn-primary");
});
