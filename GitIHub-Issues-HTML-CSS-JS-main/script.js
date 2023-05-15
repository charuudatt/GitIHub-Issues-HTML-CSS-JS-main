const issuesList = document.getElementById("issues-list");
const pageNumberHeading = document.getElementById("page-number");
let currentPageNumber = 1;

// Load the initial page of issues
loadIssues(currentPageNumber);

document.getElementById("load-prev").addEventListener("click", () => {
  // Prevent going to page number 0
  if (currentPageNumber > 1) {
    currentPageNumber--;
    loadIssues(currentPageNumber);
    pageNumberHeading.innerText = `Page number ${currentPageNumber}`;
  }
});

document.getElementById("load-next").addEventListener("click", () => {
  currentPageNumber++;
  loadIssues(currentPageNumber);
  pageNumberHeading.innerText = `Page number ${currentPageNumber}`;
});

async function loadIssues(pageNumber) {
  // Fetch issues data from GitHub API
  const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`);
  const issuesData = await response.json();

  // Clear the existing issues list
  issuesList.innerHTML = "";

  // Add each issue name to the list
  issuesData.forEach(issue => {
    const issueName = issue.title;
    const listItem = document.createElement("li");
    listItem.innerText = issueName;
    issuesList.appendChild(listItem);
  });
}
