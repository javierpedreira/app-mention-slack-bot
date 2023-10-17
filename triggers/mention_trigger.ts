import { Trigger } from "deno-slack-sdk/types.ts";
import {TriggerContextData, TriggerEventTypes, TriggerTypes } from "deno-slack-api/mod.ts";
import AnswersMentionWorkflow from "../workflows/answers_mentions.ts";

/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/automation/triggers
 */
const greetingTrigger: Trigger<typeof AnswersMentionWorkflow.definition> = {
  type: TriggerTypes.Event,
  name: "Answers when a user mentions the app",
  description: "Answers when a user mentions the app returning the sent message",
  workflow: `#/workflows/${AnswersMentionWorkflow.definition.callback_id}`,
  event: {
    event_type: TriggerEventTypes.AppMentioned,
    channel_ids: [ "C060MJ72E2J" ],
  },
  inputs: {
    channelId: {value: TriggerContextData.Event.AppMentioned.channel_id },
    text: { value: TriggerContextData.Event.AppMentioned.text },
  },
};

export default greetingTrigger;
