import codyServer from "@proophboard/cody-server/lib/src/server.js";
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
async function loadCodyConfig() {
    const configPath = resolve(process.cwd(), 'cody.config.ts');
    const configUrl = pathToFileURL(configPath).href;
    try {
        const module = await import(configUrl);
        return module.default;
    }
    catch (error) {
        console.error('Failed to load cody.config.ts: ', error);
        return undefined;
    }
}
const codyConfig = await loadCodyConfig();
if (!codyConfig) {
    console.error("No cody.config.ts found in the current working directory: " + process.cwd());
    process.exit(1);
}
const server = codyServer.default(codyConfig);
const port = process.env.PORT || 3311;
server.listen(port, () => {
    console.log('Cody Server listening at port %d', port);
});
process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down cody server');
    server.close();
    process.exit(0);
});
//# sourceMappingURL=cody-server.js.map