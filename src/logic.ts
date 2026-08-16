type TCandidate = "Augustine" | "Kosisochukwu";

const candidates: TCandidate[] = [
  "Augustine",
  "Kosisochukwu",
];

const voters = [
  "Stephanie",
  "Rita",
  "James",
  "Peter",
  "Victor",
  "Anthony",
  "Charles",
  "Augustine",
  "Lillian",
  "Gabriel",
  "Christopher",
  "Kosisochukwu",
  "Bonaventure",
  "Abigail",
  "David",
  "Amarachi",
  "Loveth",
  "Chidimma",
  "Ifeanyi",
  "Majesty",
] as const;

type TVoter = typeof voters[number]; // This creates a union type of all the voter names so that we can use it in our voting logic and ensure type safety.

type TPoll = Record<TCandidate, number>; // This creates a type that represents the poll results, where each candidate has a number of votes.

const poll: TPoll = { 
  Augustine: 0,
  Kosisochukwu: 0,
};

const votedUsers = new Set<TVoter>(); // This creates a Set to keep track of voters who have already cast their votes, ensuring that each voter can only vote once.

const votingRecord: Record<TVoter, TCandidate> = {
  Stephanie: "Augustine",
  Rita: "Kosisochukwu",
  James: "Augustine",
  Peter: "Kosisochukwu",
  Victor: "Augustine",
  Anthony: "Kosisochukwu",
  Charles: "Augustine",
  Augustine: "Kosisochukwu",
  Lillian: "Augustine",
  Gabriel: "Kosisochukwu",
  Christopher: "Augustine",
  Kosisochukwu: "Augustine",
  Bonaventure: "Augustine",
  Abigail: "Augustine",
  David: "Augustine",
  Amarachi: "Augustine",
  Loveth: "Kosisochukwu",
  Chidimma: "Augustine",
  Ifeanyi: "Kosisochukwu",
  Majesty: "Augustine",
};

interface Result {
  total: number;
  winner: TCandidate | "";
  poll: TPoll;
}

const result: Result = {
  total: 0,
  winner: "",
  poll,
};

const augustineCard = document.getElementById(
  "cardCountAugustine"
) as HTMLSpanElement;

const kosisoCard = document.getElementById(
  "cardCountKosisochukwu"
) as HTMLSpanElement;

const totalVotes = document.getElementById(
  "totalVotes"
) as HTMLSpanElement;

const winnerTitle = document.getElementById(
  "winnerTitle"
) as HTMLParagraphElement;

const winnerMessage = document.getElementById(
  "winnerMessage"
) as HTMLParagraphElement;

const voterSelect = document.getElementById(
  "option-list"
) as HTMLSelectElement;

function updateCards() {
  augustineCard.textContent =
    result.poll.Augustine.toString(); 

  kosisoCard.textContent =
    result.poll.Kosisochukwu.toString();

  totalVotes.textContent =
    result.total.toString();
}

function calculateWinner() {
  if (
    result.poll.Augustine >
    result.poll.Kosisochukwu
  ) {
    result.winner = "Augustine";
  } else if (
    result.poll.Kosisochukwu >
    result.poll.Augustine
  ) {
    result.winner = "Kosisochukwu";
  } else {
    result.winner = "";
  }
}

function refreshDialog() {
  calculateWinner();

  if (result.total === 0) {
    winnerTitle.textContent =
      "Next Head of House";

    winnerMessage.textContent =
      "No votes counted yet.";

    return;
  }

  if (result.winner === "") {
    winnerTitle.textContent = "Election Tie";

    winnerMessage.textContent =
      "Both candidates currently have the same number of votes.";

    return;
  }

  winnerTitle.textContent =
    `${result.winner} is Leading`;

  winnerMessage.textContent =
    `${result.winner} currently has the highest number of verified votes.`;
}

function getSelectedVoter(): TVoter | null {
  const voter = voterSelect.value as TVoter;

  if (!voters.includes(voter)) {
    alert("Please select a valid voter.");
    return null;
  }

  return voter;
}

function disableVoter(voter: TVoter) {
  Array.from(voterSelect.options).forEach((option) => {
    if (option.text === voter) {
      option.disabled = true;
      option.text = `${voter} ✓`;
    }
  });

  voterSelect.selectedIndex = 0;
}

function castVote(
  voter: TVoter,
  candidate: TCandidate
) {
  if (votedUsers.has(voter)) {
    alert(`${voter} has already voted.`);
    return;
  }

  votedUsers.add(voter);

  result.poll[candidate]++;
  result.total++;

  updateCards();
  refreshDialog();

  disableVoter(voter);

  console.log({
    voter,
    candidate,
    result,
  });
}

function selectCandidate(candidate: TCandidate) {
  const voter = getSelectedVoter();

  if (!voter) return;

  castVote(voter, candidate);
}

(window as any).selectCandidate = selectCandidate;

const dialog = document.getElementById(
  "election-dialog"
) as HTMLDialogElement;

const refreshButton = dialog.querySelector(
  "button"
) as HTMLButtonElement;

refreshButton.addEventListener("click", () => {
  refreshDialog();
});

updateCards();
refreshDialog();