import { DefineFunction,Schema,SlackFunction } from "deno-slack-sdk/mod.ts";

// Function deginition
export const SanitiseFunctionDefinition = DefineFunction({
  callback_id: "send",
  title: "Send",
  description: "Send a message",
  source_file: "functions/sanitise.ts",
  input_parameters: {
    properties: {
      text: {
        type: Schema.types.string,
      },
    },
    required: ["text"],
  },
  output_parameters: {
    properties: {
      sanitisedText: {
        type: Schema.types.string,
      },
    },
    required: ["sanitisedText"],
  },

});

// This function removes the App id from the text. This method prevents an infinite loop of mention replies
// For example when you type `@eng-summit-bot Hey how are you`, the answer should be: ` You said: Hey how are you.
export default SlackFunction(SanitiseFunctionDefinition, ({ inputs }) => {

  return { outputs: { sanitisedText: inputs.text.replace(/<[^>]*> /, "")}}
});
