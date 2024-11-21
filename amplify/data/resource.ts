import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Players: a.model({
    username: a.string().required(),
    highscore: a.integer().required(),
    achievedAt: a.date().default(() => new Date())
  })
    .authorization((allow) => [allow.publicApiKey()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    }
  }
});