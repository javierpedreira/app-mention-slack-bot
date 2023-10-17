import {SanitiseFunctionDefinition} from '../functions/sanitise.ts';
import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const AnswersMentionWorkflow = DefineWorkflow({
  callback_id: "answers_mentions",
  title: "Sends a Slack message answering a mention",
  input_parameters: {
    properties: {
      channelId: { type: Schema.slack.types.channel_id },
      text: { type: Schema.types.string },
    },
    required: ["channelId", "text"],
  }  
});

const sanitisedMessage = AnswersMentionWorkflow.addStep(SanitiseFunctionDefinition, {
  text: AnswersMentionWorkflow.inputs.text,
});

AnswersMentionWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: AnswersMentionWorkflow.inputs.channelId,
  message: `Hi, this is your request: [${sanitisedMessage.outputs.sanitisedText}]`,
});

export default AnswersMentionWorkflow;
