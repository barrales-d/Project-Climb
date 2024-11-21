import { fetchUserAttributes } from "aws-amplify/auth";

export async function getUserName(): Promise<string> {
    const attributes = await fetchUserAttributes();

    if (attributes["custom:PlayerName"]) {
        return attributes["custom:PlayerName"];
    }

    return "Anonymous";
}