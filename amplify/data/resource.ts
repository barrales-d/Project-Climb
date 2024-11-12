import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Player: a
    .model({
      name: a.string(),
      score: a.float(),
      achievedAt: a.datetime(),
    })
    .authorization((rules) => {
      return [
        // Anyone can read players scores like for a Leaderboard
        rules.guest().to(['read']),
        // Players/Users can create and update their scores
        rules.authenticated().to(['create', 'update']),
        rules.owner().to(['update']),
      ];
    }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  }
});