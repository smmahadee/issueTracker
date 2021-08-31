document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function verifying(st){
  for(let i=0;i<st.length;i++){
    if(st[i]!=" "){
      return true;
    }
    console.log(st[i]);
    console.log('hello')
  }
  return false;
}

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';
  // console.log(description,'\n',assignedTo);
  if(description =="" || verifying(description) == false || assignedTo=="" || verifying(assignedTo) == false){
    alert("Invalid Issue");
    document.getElementById('issueInputForm').reset();
    return;
  }
  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues)
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  // console.log(currentIssue);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id )
  // console.log(remainingIssues);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  // console.log(issues.length,": ",issues);
  for (const issue of issues) {
    const {id, description, severity, assignedTo, status} = issue;

    issuesList.innerHTML +=   `<div class="col-md-4 card">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label ${status == "Closed" ? "label-danger" : "label-success"}"> ${status} </span></p>
                              <h3 style="${status == "Closed" ? 'text-decoration: line-through': 'text-decoration: none'}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
  // document.querySelector(".card").style.backgroundColor = "green";
  const open = issues.filter(issue => issue.status == "Open");
  const closed = issues.length - open.length;
  // console.log("open:",open.length);
  // console.log('closed:',closed);
  // console.log("total:",issues.length);
  document.querySelector('.issues').innerHTML =`<div id="issue-1"><small>Opened issues: ${open.length}</small></div>
  <div id="issue-2"><small>Closed issues: ${closed}</small></div>
  <div id="issue-3"><small>Total issues: ${issues.length}</small></div>`;
}
