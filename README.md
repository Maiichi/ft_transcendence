

# FT_TRANSCENDENCE
## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Overview](#overviw)
- [Diagrams](#diagrams)
- [Screenshots](#screenshots)
- [Contributing](#contributing)


## Introduction

Transcendence is an all-in-one, dynamic web project that offers a seamless user experience. With its onepage fullstack design, users can enjoy engaging in real-time multiplayer Ping Pong games, along with a range of additional features. These include secure authentication through JWT / 2fa, a versatile chat system, private messaging capabilities, a friends list, user profiles, a match-making system. Furthermore, Transcendence allows users to customize their Pong game experience, with options to modify the background and explore different game modes. This website aims to deliver thrilling contests while maintaining robust security measures.

## Getting Started


Before starting, you need to configure your environment:

1.  In the root directory Rename `.env_example` to `.env`.
- rename `./Clinet/.env.example` to `./Clinet/.env` .
- rename `./backend/.env.example` to `./backend/.env`.

2. Set the `CLIENT_ID` and `CLIENT_SECRET` variables for your 42 API `ID` and `SECRET` **(backend/.env)**:
   
- For FORTY_TWO API:

    ```
    # FORTY_TWO API
    CLIENT_ID=""
    CLIENT_SECRET=""
    ```
- For Cloudinary service :
    
    ```
    # Cloudinary Service
    CLOUDINARY_NAME=""
    CLOUDINARY_API_KEY=""
    CLOUDINARY_API_SECRET=""
    ```

    You can also customize other environment variables to suit your needs.

### Prerequisites

You only need `docker-compose` to run this project. If you don't have Docker installed, you can follow the installation guide [here](https://docs.docker.com/get-docker/).

### Installation

You can run this project with a single command:

```sh
docker-compose up --build
```

## :ping_pong: Project Overview

### :adult: User Account

- Use OAuth to Authenicate Users To The Website using their 42 Intra Account.
- Choose a unique username.
- Upload a profile icon (doesn't have a profile icon, a default one must be set).
- Two-Factor Authentication (eg. Google Authenticator or Text Message to their Phone).
- Add friends and see current status (Online, Offline or In A Game).
- Stats (Wins, Losses, Ladder Level, Achievements) displayed on Profile.
- User's Match History (1 v 1 Games and Ladder - anyone who they are friends with can see this).

### :speaking_head: Chat

- Create Channels (Chat Rooms) that are either public, private or protected by a Password.
- Send Direct Messages to Other Users.
- Be able to Block Users (No More Messages from a user you blocked).
- Invite other users to play a game of pong through the chat interface.
- Access other players profiles through chat interface.

### :raising_hand: Channel Owner

- The user who creates a new channel is automatically the channel owner, until they leave.
- Channel owner sets a password required to access a channel, including changing or removing the password.
- Channel owner is channel admin and can set other users as admins as well.
- Channel admin can kick, ban and mute other users, but not other channel admins.

### :ping_pong: Game

- Users could play a live pong game vs another player directly on the website
- Matchmaking system - the user can join a queue until they get automatically matched with someone.
- 2D Pong Game.
- Customisation Options (Different Maps), however, the user should be able to select a default version of the game.
- The Pong Game is responsive.

## Screenshots

  <details>
  <summary>Profile page</summary>
     <img src="https://github.com/Maiichi/ft_transcendence/blob/develop/images/profile_.png" alt="profile" height="580" width="1080" />
  </details>

  <details>
  <summary>Chat page</summary>
    <img src="https://github.com/Maiichi/ft_transcendence/blob/develop/images/chat_.png" alt="chat" height="1000" width="1080" />
  </details>

  <details>
  <summary>Game page</summary>
    <img src="https://github.com/Maiichi/ft_transcendence/blob/develop/images/game_.png" alt="game" height="580" width="1080" />
  </details>




## Diagrams

### Use case diagram

<details>
  <summary>show diagram</summary>
    <img src="https://github.com/Maiichi/ft_transcendence/blob/develop/images/use_case_diagram.png" alt="diagram" height="1080" width="800" />
  </details>


## Contributing

If you have a suggestion that would make this project better, we welcome contributions! Please follow the guidelines below:

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b <branch-name>`).
3. Commit your Changes (`git commit -m '<commit-message>'`).
4. Push to the Branch (`git push origin <branch-name>`).
5. Open a Pull Request.

#
Before submitting a pull request, run the following command in the root directory:

```bash
yarn install
```

### Branch Naming and Commit Message Guidelines

We have added Husky to enforce specific rules for branch names and commit messages. To ensure your contributions align with our standards, please follow these guidelines:

#### Branch Naming:

Branch names should adhere to the following format:


- `<type>/<scope>/<name>` for feat or fix branches.

For example:
1. `back/feat/new-feature`
2. `front/feat/new-feature`

#### Commit Message:

Your commit messages should follow this pattern:

**<type>(FRONT | BACK | FULL): commit message**

- `<type>` should be either `feat` (for features) or `fix` (for bug fixes).
- `<scope>` should include `FRONT`, `BACK` or `FULL`.
- `<name>` is a brief, descriptive name for your commit.

Example commit message:

**feat(FRONT): implement new feature**