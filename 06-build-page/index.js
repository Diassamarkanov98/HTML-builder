const path = require("path");
const fs = require("fs");
const fsPromises = require("fs/promises");
const { stdout } = require("process");
const assets_from = path.join(__dirname, "assets");
const assets_to = path.join(__dirname, "project-dist", "assets");

async function readAndDelete(pathDelete) {
    const files = await fsPromises.readdir(pathDelete, {
        withFileTypes: true,
        encoding: "utf-8",
    });
    for (const file of files) {
        if (file.isFile()) {
            await fsPromises.unlink(path.join(pathDelete, file.name));
        } else {
            readAndDelete(path.join(pathDelete, file.name));
        }
    }
}

async function buildHtml() {
    try {
        const pathToFolder = path.join(__dirname, "project-dist");
        try {
            await fsPromises.access(pathToFolder);
            await readAndDelete(pathToFolder);
        } catch (err) {}
        await fsPromises.mkdir(pathToFolder, { recursive: true });

        const pathToHtml = path.join(
            __dirname,
            "project-dist",
            "index.html"
        );
        const htmlBundle = fs.createWriteStream(pathToHtml, "utf-8");
        const template = fs.createReadStream(
            path.resolve(__dirname, "template.html"),
            "utf-8"
        );
        template.on("data", async (chunk) => {
            async function getHtmlText() {
                let html = chunk.toString();
                const pathToComponents = path.join(
                    __dirname,
                    "components"
                );
                const files = await fsPromises.readdir(pathToComponents, {
                    encoding: "utf-8",
                });

                for (let file of files) {
                    const component = await fsPromises.readFile(
                        path.join(pathToComponents, file),
                        {
                            encoding: "utf-8",
                        }
                    );
                    const parsed_data = path.parse(
                        path.join(pathToComponents, file)
                    );
                    html = html.replace(
                        `{{${parsed_data.name}}}`,
                        `${component}`
                    );
                }
                return html;
            }

            const html = await getHtmlText();
            htmlBundle.write(html);
        });
    } catch (err) {
        console.log(err);
    }
}

async function buildCss() {
    try {
        const pathProject = path.join(__dirname, "project-dist");
        const cssBundle = fs.createWriteStream(
            path.join(pathProject, "style.css")
        );
        const styles_path = path.join(__dirname, "styles");

        const csses = await fsPromises.readdir(styles_path, {
            encoding: "utf-8",
            withFileTypes: true,
        });

        for (let css of csses) {
            const pathCss = path.join(styles_path, css.name);
            const parsedData = path.parse(pathCss);
            if (css.isFile() && parsedData.ext === ".css") {
                const css_DATA = await fsPromises.readFile(pathCss, {
                    encoding: "utf-8",
                });
                cssBundle.write(`${css_DATA}`);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function bundleAssets(from, to) {
    try {
        await fsPromises.mkdir(to, {
            recursive: true,
        });
        const assets = await fsPromises.readdir(from, {
            encoding: "utf-8",
            withFileTypes: true,
        });
        for (let asset of assets) {
            if (asset.isFile()) {
                await fsPromises.copyFile(
                    path.join(from, asset.name),
                    path.join(to, asset.name)
                );
            } else {
                await fsPromises.mkdir(path.join(to, asset.name), {
                    recursive: true,
                });
                await bundleAssets(
                    path.join(from, asset.name),
                    path.join(to, asset.name)
                );
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function pageBuild() {
    await buildHtml();
    await buildCss();
    await bundleAssets(assets_from, assets_to);
}

pageBuild();
