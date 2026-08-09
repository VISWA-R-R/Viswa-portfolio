export default async function handler(req, res) {
    try {
        const type = req.query.type || "profile";
        const username = "VISWA-R-R";

        let githubURL;

        if (type === "repositories") {
            githubURL =
                `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`;
        } else {
            githubURL =
                `https://api.github.com/users/${username}`;
        }

        const response = await fetch(githubURL, {
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${process.env.PAT_1}`,
                "X-GitHub-Api-Version": "2022-11-28"
            }
        });

        const data = await response.json();

        return res.status(response.status).json(data);

    } catch (error) {
        console.error("GitHub API Error:", error);

        return res.status(500).json({
            error: "Unable to fetch GitHub data"
        });
    }
}