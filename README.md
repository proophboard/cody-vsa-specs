# cody-vsa-specs

Spec-driven development meets [Event Modeling](https://eventmodeling.org/posts/what-is-event-modeling/)

Generate vertical slice specs with a local [prooph board](https://prooph-board.com/) Cody agent 
to unlock unmet accuracy and precision in agentic coding sessions.

## Install

Install the agent into an existing Node.js project:

```shell
npm install --save-dev @proophboard/cody-vsa-specs
````

Initialize Cody agent by creating a `cody.config.ts` in the project root:

```shell
npx cody-vsa-specs init
````

Start the agent

```shell
npx cody-vsa-specs start
````

This will start an express server running on port `3311`. 

You can use another port like this:

```shell
PORT=3333 npx cody-vsa-specs start
````

## Example & Process Overview

1. Open the [Cody VSA Specs](https://free.prooph-board.com/inspectio/boards/import/https%3A%2F%2Fraw.githubusercontent.com%2Fproophboard%2Fexample-boards%2Fmain%2FCody-VSA-Specs.xml) in the prooph board free client.
2. Choose `Cody` from the menu in the top right corner.
3. A Cody Console will open with a connect command prefilled:  `/connect http://localhost:3311`. Press enter or adjust the port if you used a different one.
4. Navigate on the board to `Todo List Example`.
5. Right-click on the command (blue card) `Write Todo` and choose `Trigger Cody` from the context menu.
6. Switch to your repo and find the generated spec files in the folder `chapters`.

Here is a short video demonstrating the steps

![Watch the video](https://github.com/proophboard/wiki/raw/refs/heads/main/assets/video/cody-vsa-specs/Cody-VSA-Specs-Intro.mp4)

### Not using Node?

No problem! Cody agent writes the specs into JSON files (can also be customized),
that can be processed in any language. Set up an empty Node.js project and install the agent.
You can point it to your other project via `cody.config.ts`. Or you run it in a docker container.

@TODO: Provide a docker image
