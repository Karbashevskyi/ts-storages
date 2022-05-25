import { Name } from "./name";
import { Version } from "./version";
import { PrevVersion } from "./prev-version";
export declare const applicationName: ReturnType<typeof Name.getName>;
export declare const setApplicationName: typeof Name.setName;
export declare const applicationVersion: ReturnType<typeof Version.getVersion>;
export declare const applicationPrevVersionList: ReturnType<typeof PrevVersion.getPrevVersionList>;
