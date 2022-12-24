# Gaac: Github as A CDN :sparkles:
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT) ![Beta](https://img.shields.io/badge/version-beta-blueviolet)

**Gaac** is an open source project that allows you to store your images/static files in your public Github repository and use them in blogs, websites, apps, etc. It is built with [NextJS](https://nextjs.org/) and relies on [GitHub API](https://docs.github.com/en/rest) to fetch the files.

### How to use
Visit [gaac.vercel.app](https://gaac.vercel.app) and follow the instructions to get started.

### Connect
You can connect your GitHub account by clicking on the `Connect` button on the homepage.
![Connect](https://raw.githubusercontent.com/toughyear/blog-uploads/main/uploads/gaac/connect.png)

### Upload
You can upload files by the file uploader on the homepage. You can also drag and drop files to upload or paste from the clipboard. All files are uploaded to the `/upload` directory in your public repository.
![Upload via Gaac](https://raw.githubusercontent.com/toughyear/blog-uploads/main/uploads/gaac/upload.gif)

### Searching
You can search for uploaded files using the UI -
![Search In Gaac](https://raw.githubusercontent.com/toughyear/blog-uploads/main/uploads/gaac/search.gif)

Fun fact, the image above was uploaded using Gaac itself.
### Self hosting
You can also host Gaac yourself.
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ftoughyear%2Fgaac)

### Run locally
This is a standard NextJS project. You can run it locally by following the instructions [here](https://nextjs.org/docs/getting-started).

You will need to set the environment variables `GITHUB_APP_CLIENT_ID` and `GITHUB_APP_CLIENT_ACCESS_TOKEN` in a `.env.local` file.

You can obtain the `GITHUB_APP_CLIENT_ID` and `GITHUB_APP_CLIENT_ACCESS_TOKEN` by creating a new GitHub OAuth app [here](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app).

### Contributing

Contributions are welcome! Please open an issue or a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.
