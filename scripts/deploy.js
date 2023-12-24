const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed TokenMaster Contract at: ${tokenMaster.address}\n`)

  const occasions = [
    {
      name: "Mic Testing - Kannada Open Mics",
      cost: tokens(1.5),
      tickets: 125,
      date: "Dec 27 2023",
      time: "6:00PM",
      location: "The Art Gully Studio , Bengaluru"
    },
    {
      name: "Candlelight India A Tribute to Coldplay ",
      cost: tokens(1),
      tickets: 125,
      date: "Dec 29 2023",
      time: "7:30PM",
      location: "Good Shepherd Auditorium , Bengaluru"
    },
    {
      name: "Small World Big Jokes",
      cost: tokens(5),
      tickets: 0,
      date: "Dec 31 2023",
      time: "4:00PM",
      location: "Koramangala 5th Block , Bengaluru"
    },
    {
      name: "Hawaain Paradise 2024 New Yeras Eve",
      cost: tokens(3.5),
      tickets: 120,
      date: "Dec 31 2023",
      time: "8:00PM",
      location: "Tiger Tiger Brewhouse , Bengaluru"
    },
    {
      name: "Kanan Gill Experience - 2024",
      cost: tokens(1),
      tickets: 125,
      date: "Jan 19 2024",
      time: "7:30PM",
      location: "Good Shepherd Hall , Convent Road , Bengaluru"
    },
    {
      name: "Udupa Music Festival 2024",
      cost: tokens(3),
      tickets: 0,
      date: "Feb 16 2024",
      time: "6:00PM",
      location: "Chowdiah Memorial Hall , Bengaluru"
    },
    {
      name: "Lucky Ali Live",
      cost: tokens(0.25),
      tickets: 200,
      date: "Feb 17 2024",
      time: "7:00PM",
      location: "Manpho Convention Centre , Bengaluru"
    },
    {
      name: "Darshan Raval India Tour",
      cost: tokens(2.5),
      tickets: 200,
      date: "Mar 16 2024",
      time: "5:00PM",
      location: "Bengaluru"
    },
  ]

  for (var i = 0; i < 8; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});