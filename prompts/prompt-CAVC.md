As a QA analyst, create the following E2E test for @PositionDetails.js  on @Position.cy.ts  
Load page:
- verify that the title of the position is displayed correctly.
- verify that the correct columns are displayed for each phase of the hiring process.
- verify that the cards of the candidates are displayed in the correct column according to their current phase.
- - - 
on @PositionDetail.cy.ts  intercept data from /positions/*/interviewFlow api call to use data from @InterviewSteps.json  and data from /positions/${id}/candidates as @Candidates.json 
- - - 
lets verify the title from each stage as the interviewSteps using @StageColumn.js 
- - - 
on @PositionDetail.cy.ts using @StageColumn.js and @CandidateCard.js  lets verify that verify that the cards of the candidates are displayed in the correct column according to their current phase.
- - - 
Now lets create another test. it will be 'change a candidate's phase'
verify a card can be dragged from one column to another
Nota: el agente trató de usar eventos de  y una función drag() pero falló, usando stackoverflow encontré el comando dragAndDrop
- - - 
verify that the call to PUT /candidate/:id works correctly once the card is dropped