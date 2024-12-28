import * as core from "@actions/core";
import { Constants } from "./constants";
import * as conan from "./conan";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function post(): Promise<void> {
    try {
        const primaryCacheHit = core.getState(Constants.PrimaryCacheHit);
        if (JSON.parse(primaryCacheHit)) {
            core.info("Cache hit on primary key. Cache will not be saved");
        } else {
            core.startGroup("Saving cache");
            const key = await conan.cache_key();
            core.debug(`Saving cache with key: ${key}`);
            await conan.save_cache(key);
            core.endGroup();
        }
    } catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) core.setFailed(error.message);
    }
}

post();
