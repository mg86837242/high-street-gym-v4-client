import { API_URL } from "../data/constants";
import fetchRes from "../utils/fetchRes";

export default async function getAllLoginEmails() {
  const response = await fetchRes(`${API_URL}/logins/emails`);
  return response;
}
