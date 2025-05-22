import { JustPushTopic } from "../services/JustPushTopic";
import { ACCESS_TOKEN } from "./TestConstants.js";

const TEST_AVATAR_URL =
  "https://images.pexels.com/photos/25961190/pexels-photo-25961190/free-photo-of-the-audi-a3-sedan-parked-in-front-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=800";

const createTopicTest = async () => {
  console.log("Create test topic...");
  const justPushTopic = JustPushTopic.token(ACCESS_TOKEN)
    .title("My Test Topic")
    .avatar(TEST_AVATAR_URL);
  return await justPushTopic.create();
};

const getTopicTest = async (topicKey: string) => {
  console.log("Get topic...", topicKey);
  const topicGet = await JustPushTopic.token(ACCESS_TOKEN)
    .topic(topicKey)
    .get();
  return topicGet;
};

const updateTopicText = async (topicKey: string) => {
  console.log("Update topic...");
  return await JustPushTopic.token(ACCESS_TOKEN).topic(topicKey).update();
};

const test = async () => {
  // try {
  //     const testTopic = await createTopicTest()
  //     await new Promise((resolve) => setTimeout(resolve, 5000))
  //     const topicKey = testTopic.uuid
  //     await getTopicTest(topicKey)
  //     await updateTopicText(topicKey)
  // } catch (error: any) {
  //     console.error('Error:', error)
  //     throw new Error(error?.message)
  // }
};

test();
