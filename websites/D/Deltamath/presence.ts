const presence = new Presence({
    clientId: "929149225592307752"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let percentage: HTMLElement, assignment: string | undefined;
let totalProblems: HTMLElement, current: HTMLElement, totalPercentCorrect: HTMLElement;
let totalProblemsString: string, currentString: string, totalPercentCorrectString: string;
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "deltamath"
  };
  // Theres no presence for the homepage because you would really only be working on an assignment 90% of the time
  if (document.location.pathname.includes("/solve")) {
    percentage = document.querySelector(
      "body > app-root > student > div.main.container > problem > problem-toolbar > div.col-md-10.col-lg-9.student-progress.paper-shadow > span.complete-area > span"
    );
    delete presenceData.startTimestamp;
    // For if you want to reset the timer on every problem comment/uncomment above line
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    assignment = document
      .querySelector<HTMLElement>(
        "#question_page > div > div > div.problem-header > div:nth-child(1)"
      )
      ?.innerHTML?.split(/<br.*>/g)[1];
    presenceData.details = assignment;
    presenceData.state = percentage.textContent;
  } 
  
  if (document.location.pathname.includes("/history")){
    totalProblems = document.querySelector("body > app-root > student > div.main.container > student-detail > div > div.lead > span:nth-child(1)")
    totalPercentCorrect = document.querySelector("body > app-root > student > div.main.container > student-detail > div > div.lead > span:nth-child(3)");
    delete presenceData.startTimestamp;
    // For if you want to reset the timer on every page comment/uncomment above line
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    totalProblemsString = totalProblems.textContent
    totalPercentCorrectString = totalPercentCorrect.textContent
    presenceData.details = totalProblemsString.substring(totalProblemsString.length-3, totalProblemsString.length) + " completed, " + totalPercentCorrectString.substring(totalPercentCorrectString.length, totalPercentCorrectString.length-5) + " correct.";
    presenceData.state = "Viewing Statistics" ;
  }
  if (document.location.pathname.includes("/info")){
    presenceData.details = "Viewing Settings";
  }
  else {
    presenceData.details = "Browsing site";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
