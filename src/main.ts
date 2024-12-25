import * as core from "@actions/core";
import * as conan from "./conan";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run(): Promise<void> {
    try {
        const version = await conan.version();
        if (version != null) {
            core.info(`conan ${version.toString()} is installed.`);
            core.startGroup("restoring cache");
            const key = await conan.cache_key();
            await conan.restore_cache(key);
        } else {
            core.setFailed("conan is not installed.");
        }
    } catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();
