"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FileDownloadInfo {
    static filter(attachments) {
        if (attachments) {
            return attachments.filter(x => x.contentType === FileDownloadInfo.contentType);
        }
        else {
            return undefined;
        }
    }
}
exports.FileDownloadInfo = FileDownloadInfo;
FileDownloadInfo.contentType = "application/vnd.microsoft.teams.file.download.info";
