import { getUser } from "../firebase/main";
import { sendTweet } from "../pupetter/main";
export const listen = async () => {
  const express = (await import("express")).default;

  const app = express();
  app.use(express.json());
  const port = process.env.PORT ?? 3000;

  app.post("/", async (req, res) => {
    if (!req.body.id) return res.status(401).send("Id not found");
    if (!req.body.content) return res.status(401).send("Content not found");

    const user = await getUser(req.body.id);
    if (!user.exists) return res.status(404).send("User not found");

    const data = user.data();
    if (!data) return res.status(404).send("User data not found");

    const r = await sendTweet(JSON.parse(data.user), req.body.content).catch(
      () => undefined
    );
    if (r) return res.status(200).send("success");
    else return res.status(500).send("Error sending tweet");
  });

  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
};
