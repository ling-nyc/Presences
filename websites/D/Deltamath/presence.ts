const presence = new Presence({
    clientId: "929149225592307752"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let percentage: HTMLElement, assignment: string | undefined;
let totalProblems: HTMLElement, current: HTMLElement, totalPercentCorrect: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "deltamath"
  };

  function updateTimestamp() {
    delete presenceData.startTimestamp;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }
  // Working on an assignment
  if (document.location.pathname.includes("/solve")) {
    percentage = document.querySelector(
      "body > app-root > student > div.main.container > problem > problem-toolbar > div.col-md-10.col-lg-9.student-progress.paper-shadow > span.complete-area > span"
    );
    updateTimestamp()
    assignment = document.querySelector("#question_page > div > div > div.problem-header > div:nth-child(1)")?.innerHTML?.split(/<br.*>/g)[1];
    presenceData.details = assignment;
    presenceData.state = percentage.textContent;
  } 
  // Statistics page
  if (document.location.pathname.includes("/history")){
    totalProblems = document.querySelector("body > app-root > student > div.main.container > student-detail > div > div.lead > span:nth-child(1)")
    totalPercentCorrect = document.querySelector("body > app-root > student > div.main.container > student-detail > div > div.lead > span:nth-child(3)");
    updateTimestamp()
    presenceData.details = totalProblems.textContent.substring(totalProblems.innerText.length-3, totalProblems.textContent.length) + " completed, " + totalPercentCorrect.textContent.substring(totalPercentCorrect.textContent.length, totalPercentCorrect.textContent.length-5) + " correct.";
    presenceData.state = "Viewing Statistics" ;
  }
  // Settings page
  if (document.location.pathname.includes("/info")){
    delete presenceData.state;
    presenceData.details = "Viewing Settings";
    updateTimestamp()
  }
  //Miscelaneous pages not covered in other if statements
  else {
    presenceData.details = "Browsing site";
    delete presenceData.state;
    updateTimestamp();
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
