import { Manifest } from "deno-slack-sdk/mod.ts";
import AnswersMentionWorkflow from "./workflows/answers_mentions.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "bot-answers-boilerplate",
  description: "An app that answers Slack app mention",
  icon: "assets/unicorn_dab.png",
  functions: [],
  workflows: [AnswersMentionWorkflow],
  outgoingDomains: [],
  botScopes: [
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
  ],
});
