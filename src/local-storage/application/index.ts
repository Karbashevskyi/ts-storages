import {Name} from "./name";
import {Version} from "./version";
import {PrevVersion} from "./prev-version";

export const applicationName: ReturnType<typeof Name.getName> = Name.getName();
export const setApplicationName: typeof Name.setName = Name.setName;

export const applicationVersion: ReturnType<typeof Version.getVersion> = Version.getVersion();
export const applicationPrevVersionList: ReturnType<typeof PrevVersion.getPrevVersionList> = PrevVersion.getPrevVersionList();
