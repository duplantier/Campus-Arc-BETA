![](./public/campusarcbeta-banner.png)

# 📌 Important Notes for The EDU Chain Hackathon Judges

- ❗ Please run this project in localhost for EDU Chain evaluation purposes (guidelines are down below). While this project is live on www.campusarc.io, Open Campus has not whitelisted this domain yet, which prevents application from presenting a live demo.
- ❗ Since this is the BETA version of the Campus Arc -which is mainly built for the EDU Chain Hackathon- many concepts and features that makes application complete were skipped. This is because of the time limit of the hackathon and to focus on the Solidity-Contract side of the application, which was the crucial part of the hackathon. These features will be added in the next months and are listed down below.
- ❗ It is all-important to note that Campus Arc is not merely a hackthon project. It's roots are based on The Sustainable Development Goals of United Nations, as mentioned on the About section in detail. So, after this hackathon, Campus Arc will be held as a real start-up project which has its own economic sustainability structures, completely dynamic user experience, and all other listed features that are skipped for this hackathon.

<br>

# 🧩🪄 Campus Arc BETA

Verify your identity with Open Campus ID, stake 0.1 EDUToken, learn, and earn!

<br>

## 📖 About The Project

Campus Arc is a next-gen web-based e-learning and e-collaboration Web2/Web3 app where college students can match with their campus (or world) fellows, build meaningful projects in their field of expertise together, and increase their competency by gaining project-based experiences.

Campus Arc aims to spread project-based competency in the scope of college campuses and make graduations more meaningful. Thus, it has a relatively deeper meaning/purpose than just being one of the Learning Management Systems or hackathon projects.
<br>
<br>

### Key Web3 / Blockchain Features

1. **_Stake & Learn & Earn!:_** A student have to stake 0.1 EDU to register an Arc Module. After this, they will start to be rewarded regularly until the deadline of the module. If they can successfully complete the module (that includes tasks, projects, etc.) until the deadline, they will be able to withdraw their stake with its reward. Total return amount is calculated as following:

   - 1.1. 💰 <strong>Total Return Amount: </strong> Staking time (the deadline of the Module) &times; EDUToken amount staked times &times; Reward Rate
   - 1.2. 🎁 <strong>Reward Rate: </strong> 1e15
   - 1.3. <strong>Example Case: </strong> A student who staked 100 EDUToken for 30 days will be rewarded 2592 EDUToken per 30 days / 86,4 EDUTokens per day

2. **_Open Campus ID Verification:_** Campus Arc BETA has a simplistic authentication infrastructure that is based on OC-ID verification. No users are allowed to make any actions without OC ID verification.

3. **_Custom ERC20 Token - EDUToken:_** Campus Arc uses a custom ERC20 token, deployed on opencampus Network. Users will use this token for staking and withdrawing.

4. **_Wallet Management:_** Users can manage their wallet using WalletConnect SDK.
   <br>

### Key Web2 Features

1. **_Completely Dynamic User Experience:_** All the application data is based on PostgreSQL database, deployed on the Vercel with Prisma.
2. **_Basic Profile Management:_** Users can update basic profile details and review the Arc Modules that they are registered and the Registration Stake records.
3. **_Module Registration and Tracking:_** Dynamic registration and progress tracking.

### Key Educational Concepts & Features

- **_Arc Modules:_** An Arc Module is a high-quality course module where learning experience is smoothly integrated with hands-on practices, homeworks, projects, reward system, AI-assisted fedback system, and real-time collaboration infrastructure. Arc Modules are different from the classical course modules,
- **_Arc Designers:_** Arc Designers are the creators of the Arc Modules. Any student can become an Arc Designer, after completing Arc Designer Tutorial with the same Stake & Learn & Earn system successfully. This, again, provides both motivation to be an Arc Designer in Campus Arc and a community-based creation.
- **_Community:_** The 'Campus' side of the Campus Arc incredibly crucial part.
- **_Motivation Factor:_** Students are motivated with both a high-quality and hands-on learning experience and the idea of earning while learning. It's expected that students will be motivated to complete the course before the deadline successfully not to lose their stakes and also to earn the reward. Also, another motivation factor is, of course, gaining a blockchain certificate!

  <br>
  <br>

### Skipped Features & Concepts for the Hackathon ()

- Arc Module Contents
- AI-Assisted Learning
- Certificates Page
- Arc Designer Panel Page
- Community Page
- Statistics Page
- **_Real-Time Collaboration:_** Students can invite their friends to their own registered Arc Modules to collaborate real-time, thanks to WebSockets.
- Support Page
- Settings Page: Users will have a more comprehensive control on their account.
- Responsiveness: The application is compatible with desktop or laptop devices.
  <br>
  <br>

🔗 More on [The DoraHacks Official Showcase Page](https://dorahacks.io/buidl/15481)

🔗 [Live Demo](https://www.campusarc.io)

<br>

## 🌟 Project Development Progress

Campus Arc BETA is builded in just 6 days for the EDU Chain Hackathon of Open Campus. 🔗 [See the official hackathon page](https://dorahacks.io/hackathon/educhain/buidl)

<br>

## 🤝 Team

- **Hüseyin Karataş:** Brand Design, UI/UX Design and Development, Front-End Engineering, Back-End Engineering, Implementing Back-End Interactions, Contract Design, Development and Deployment, Contract Interactions

<br>

## 🛠️ Stack

### 🖌️🎨 Front-End

- ocid-connect SDK for Open Campus ID verification
- Next.js
- React.js
- TypeScript
- TailwindCSS
- Shadcn/ui
- Aceternity UI
- Framer Motion
- Lucide React
- WalletConnect - AppKit
- Vercel for deployment
- Figma for brand design
- Wagmi hooks for contract interactions

### ⚙️ 🗄️ Back-End

- PostgreSQL
- Vercel DB
- TypeScript
- Prisma
- Prisma ORM

### 📜 Contract

- Hardhat (Solidity)
- OpenZeppelin
- Hardhat Toolbox
- Dotenv
- Wagmi
- Viem
- Ethers

<br>

### 📜 Installation

1. Clone the project:
2. Install the dependencies:
3. Create an .env file:
   3.1. Add NEXT_PUBLIC_ADMIN_KEY
   3.2. NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=0x984661BCc677f06620d2973CfE6e8Ff828b9BBF0
   3.3. Add NEXT_PUBLIC_EDU_TOKEN_ADDRESS=0xD279Cea1B5168A0801486Be1715F547cab669113

## 🖼️ Screenshots From The App

![](./)
<br><br>
![](./)
<br><br>

![](./)
<br><br>

![](./)
<br><br>
![](./)
<br><br>
