"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationPrevVersionList = exports.applicationVersion = exports.setApplicationName = exports.applicationName = void 0;
const name_1 = require("./name");
const version_1 = require("./version");
const prev_version_1 = require("./prev-version");
exports.applicationName = name_1.Name.getName();
exports.setApplicationName = name_1.Name.setName;
exports.applicationVersion = version_1.Version.getVersion();
exports.applicationPrevVersionList = prev_version_1.PrevVersion.getPrevVersionList();